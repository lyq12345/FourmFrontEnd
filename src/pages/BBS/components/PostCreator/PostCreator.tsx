import styles from './PostCreator.less';
import React, { useEffect, useState, useCallback } from 'react';
import { Input, Button, Popover, Select, Form, message } from 'antd';
import { InputProps, TextAreaProps } from 'antd/lib/input';
import { IconFont } from '@/utils/utilsBBS';
import { SelectProps, SelectValue } from 'antd/lib/select';

const { TextArea } = Input;

import { requestType } from '@/layouts/BBSLayout/api';
import ImageUpload from './ImageUpload';
import { FormProps } from 'antd/lib/form';
import { UploadFile } from 'antd/lib/upload/interface';
import { Post, CreatePostParams, requestCreatePost } from '../../api';
import { CloseOutlined } from '@ant-design/icons';

const InputStyle: InputProps = {
  bordered: false,
  placeholder: '标题',
  autoComplete: 'off',
};
const TextAreaStyle: TextAreaProps = {
  style: { resize: 'none' },
  bordered: false,
  placeholder: '有什么新鲜事想告诉大家？',
  autoSize: { minRows: 4, maxRows: 13 },
};
const SelectStyle: SelectProps<SelectValue> = {
  style: { marginLeft: 'auto' },
  bordered: false,
  placeholder: '请选择板块',
};

// 校验
const map = {
  title: '请输入标题',
  content: '请输入正文',
  typeId: '请选择要发送的板块',
};
function validatePost(values: {
  title: string;
  content: string;
  typeId: number;
}): { isPassed: boolean; firstNotPassedKey?: string; firstNotPassedMapValue?: any } {
  for (const [key, value] of Object.entries(map)) {
    if (!values[key]) {
      return { isPassed: false, firstNotPassedKey: key, firstNotPassedMapValue: value };
    }
  }
  return { isPassed: true };
}

export default React.memo<{ oldFormObject?: Post; onSuccess?: () => void }>(
  ({ oldFormObject, onSuccess }) => {
    const [form] = Form.useForm();

    const [dataTypeList, setDataTypeList] = useState<SelectProps<SelectValue>['options']>([]);
    useEffect(() => {
      requestType().then((res) => {
        setDataTypeList(res.data.map(({ name, id }) => ({ label: name, value: id })));
      });
    }, []);

    // 发送按钮的样式
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    const handleFormValuesChange: FormProps['onValuesChange'] = (_, values) => {
      const { isPassed } = validatePost(values);
      setIsButtonDisabled(!isPassed);
    };

    const handleFinished: FormProps['onFinish'] = useCallback((values: any) => {
      // 校验
      const { isPassed, firstNotPassedMapValue } = validatePost(values);
      if (!isPassed) {
        message.warning({
          content: firstNotPassedMapValue,
          style: { marginTop: '20vh' },
        });
        return;
      }

      // 处理文件
      const attach = values.attachUnresolved?.map((v: UploadFile) => v.url);
      Reflect.deleteProperty(values, 'attachUnresolved');

      const data: CreatePostParams = {
        ...values,
        attach,
        threadId: oldFormObject ? oldFormObject.threadId : 0, // 发帖是0
      };
      console.table(data);

      requestCreatePost(data)
        .then(() => {
          message.success('发布成功');
          onSuccess?.();
          form.resetFields();
        })
        .catch(() => {
          message.error('发布出错');
        });
    }, []);

    // 编辑
    useEffect(() => {
      if (oldFormObject) {
        form.setFieldsValue({
          title: oldFormObject.title,
          content: oldFormObject.content,
          typeId: oldFormObject.typeId,

          // attach 要特殊加工，满足 RcFile 的类型才能正常回显
          attach: oldFormObject.attach.map<UploadFile>((v, i) => {
            return {
              uid: '' + -i,
              type: '',
              thumbUrl: v,
              size: 0,
              name: v,
              url: v,
            };
          }),
        });
      }
    }, [oldFormObject]);

    // 文件列表长度，展示用
    const [fileListLength, setFileListLength] = useState(0);
    const handleUploadChange = useCallback((fileList) => {
      setFileListLength(fileList.length);
    }, []);

    // 控制上传图片的显隐
    const [visiblePopover, setVisiblePopover] = useState(false);

    return (
      <div className={styles['container']}>
        <Form
          onFinish={handleFinished}
          form={form}
          onValuesChange={handleFormValuesChange}
          initialValues={{ attachUnresolved: [] }}
        >
          <Form.Item noStyle name="title">
            <Input {...InputStyle} />
          </Form.Item>
          <div className={styles['hr']} />
          <Form.Item noStyle name="content">
            <TextArea {...TextAreaStyle} />
          </Form.Item>

          <div className={styles['bottom']}>
            <Popover
              content={
                <div className={styles['popover-content']}>
                  本地上传{' '}
                  <span>
                    <span>{fileListLength}</span>/9
                  </span>
                  <CloseOutlined
                    className={styles['popover-close']}
                    onClick={() => setVisiblePopover(false)}
                  />
                  <Form.Item noStyle name="attachUnresolved">
                    <ImageUpload onChange={handleUploadChange} />
                  </Form.Item>
                </div>
              }
              visible={visiblePopover}
              placement="bottomLeft"
              overlayClassName={styles['upload-overlay']}
              trigger="click"
              onVisibleChange={setVisiblePopover}
            >
              <div className={styles['upload']} onClick={() => setVisiblePopover(true)}>
                <IconFont type="icontupian" className={styles['icon-pic']} />
                <span>图片</span>
              </div>
            </Popover>

            <Form.Item noStyle name="typeId">
              <Select
                {...SelectStyle}
                options={dataTypeList}
                className={styles['select']}
                dropdownClassName={styles['select-dropdown']}
              />
            </Form.Item>
            <Button
              color="#FF5000"
              htmlType="submit"
              className={`${styles['submit-button']} ${isButtonDisabled ? styles['disabled'] : ''}`}
            >
              发送
            </Button>
          </div>
        </Form>
      </div>
    );
  },
);
