import { PostEventContext } from '@/layouts/BBSLayout/store';
import { IconFont, useDebounceFn, formatTextArea } from '@/utils/utilsBBS';
import { CloseOutlined } from '@ant-design/icons';
import { Button, Form, Input, message, Popover, Select } from 'antd';
import { FormProps } from 'antd/lib/form';
import { InputProps, TextAreaProps } from 'antd/lib/input';
import { SelectProps, SelectValue } from 'antd/lib/select';
import { UploadFile } from 'antd/lib/upload/interface';
import React, { CSSProperties, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { CreatePostParams, Post, requestCreatePost, requestType } from '../../api';
import ImageUpload from './ImageUpload';
import styles from './PostCreator.less';

const { TextArea } = Input;

const InputStyle: InputProps = {
  bordered: false,
  placeholder: '标题',
  autoComplete: 'off',
  style: { caretColor: 'red' },
};
const TextAreaStyle: TextAreaProps = {
  style: { resize: 'none', caretColor: 'red' },
  bordered: false,
  placeholder: '有什么新鲜事想告诉大家？',
  autoSize: { minRows: 4, maxRows: 13 },
};
const SelectStyle: SelectProps<SelectValue> = {
  style: { marginLeft: 'auto' },
  bordered: false,
  placeholder: '选择发布广场',
};

// 校验
function validatePost(values: {
  title: string;
  content: string;
  typeId: number;
  attachUnresolved: [];
}): { isPassed: boolean; msg?: string } {
  if (!values.title) {
    return { isPassed: false, msg: '请输入标题' };
  }
  if ('' === values.title.trim()) {
    return { isPassed: false, msg: '标题不能全为空哦' };
  }
  if (values.title.length > 40) {
    return { isPassed: false, msg: '标题上限40个字符' };
  }
  if (!values.content && !values.attachUnresolved?.length) {
    return { isPassed: false, msg: '请输入正文或上传图片' };
  }
  if (!values.attachUnresolved?.length && '' === values.content.trim()) {
    return { isPassed: false, msg: '正文不能全为空哦' };
  }
  if (!values.typeId) {
    return { isPassed: false, msg: '请选择发布广场' };
  }
  return { isPassed: true };
}

export default React.memo<{
  oldFormObject?: Post;
  onSuccess?: () => void;
  isInnerPrimaryColorUsed?: boolean;
  style?: CSSProperties;
  onValuesChange?: (values: any) => void;
}>(({ oldFormObject, onSuccess, isInnerPrimaryColorUsed = true, style, onValuesChange }) => {
  const postEvent$ = useContext(PostEventContext);
  const [form] = Form.useForm();

  const [dataTypeList, setDataTypeList] = useState<SelectProps<SelectValue>['options']>([]);
  useEffect(() => {
    requestType().then((res) => {
      if (res.success) {
        setDataTypeList(res.data.map(({ name, id }) => ({ label: name, value: id })));
      }
    });
  }, []);

  // 发送按钮的样式
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [isButtonLoading, setIsButtonLoading] = useState(false);
  const handleFormValuesChange: FormProps['onValuesChange'] = (_, values) => {
    const { isPassed, msg } = validatePost(values);
    console.log('msg', msg);
    setIsButtonDisabled(!isPassed);
    onValuesChange?.(values);
  };

  const { run: handleFinished }: FormProps['onFinish'] = useDebounceFn((values: any) => {
    if (isButtonLoading) {
      return false;
    }
    // 校验
    const { isPassed, msg } = validatePost(values);
    if (!isPassed) {
      message.warning({
        content: msg,
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

    setIsButtonLoading(true);
    requestCreatePost(data)
      .then((res) => {
        if (res.success) {
          message.success('发布成功');
          onSuccess?.();
          form.resetFields();
          setIsButtonDisabled(true);

          // 发帖成功事件
          postEvent$?.emit('success');
        } else {
          message.error('发布出错');
        }
      })
      .finally(() => {
        setIsButtonLoading(false);
      });
  });

  // 编辑
  useEffect(() => {
    if (oldFormObject) {
      setVisiblePopover(true);
      form.setFieldsValue({
        title: formatTextArea(oldFormObject.title),
        content: formatTextArea(oldFormObject.content),
        typeId: oldFormObject.typeId,

        // attach 要特殊加工，满足 RcFile 的类型才能正常回显
        attachUnresolved: oldFormObject.attachsBig?.map<UploadFile>((v, i) => {
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
      setIsButtonDisabled(false);
    }
  }, [oldFormObject]);

  // 文件列表长度，展示用
  const [fileListLength, setFileListLength] = useState(oldFormObject?.attach?.length ?? 0);
  const handleUploadChange = useCallback((fileList) => {
    setFileListLength(fileList.length);
  }, []);

  // 控制上传图片的显隐
  const [visiblePopover, setVisiblePopover] = useState(false);

  return (
    <div className={styles['container']} style={style}>
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
              <div
                className={styles['popover-content']}
                style={isInnerPrimaryColorUsed ? { '--bbs-primary-color': '#ff5000' } : null}
              >
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
            <div
              className={styles['upload']}
              onClick={() => {
                setVisiblePopover(true);
              }}
            >
              <IconFont type="icontupian" className={styles['icon-pic']} />
              <span>图片</span>
            </div>
          </Popover>

          <Form.Item noStyle name="typeId">
            <Select
              {...SelectStyle}
              options={dataTypeList}
              className={styles['select']}
              dropdownClassName={`${styles['select-dropdown']}`}
              dropdownStyle={isInnerPrimaryColorUsed ? { '--bbs-primary-color': '#ff5000' } : null}
            />
          </Form.Item>
          <Button
            htmlType="submit"
            className={`${styles['submit-button']} ${isButtonDisabled ? styles['disabled'] : ''}`}
            loading={isButtonLoading}
          >
            发送
          </Button>
        </div>
      </Form>
    </div>
  );
});
