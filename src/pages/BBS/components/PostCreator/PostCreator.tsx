import styles from './PostCreator.less';
import React from 'react';
import { Input, Button, Popover, Select, Divider, Card, Form } from 'antd';
import { InputProps, TextAreaProps } from 'antd/lib/input';
import { IconFont } from '@/utils/utilsBBS';
import { SelectProps, SelectValue } from 'antd/lib/select';

const { TextArea } = Input;

import { requestType } from '@/layouts/BBSLayout/api';

const InputStyle: InputProps = {
  bordered: false,
  placeholder: '标题',
};
const TextAreaStyle: TextAreaProps = {
  style: { resize: 'none' },
  bordered: false,
  placeholder: '有什么新鲜事想告诉大家？',
  autoSize: { minRows: 4 },
};
const SelectStyle: SelectProps<SelectValue> = {
  style: { marginLeft: 'auto' },
  bordered: false,
  placeholder: '请选择板块',
};

export default React.memo(({}) => {
  const [dataTypeList, setDataTypeList] = React.useState<SelectProps<SelectValue>['options']>([]);
  React.useEffect(() => {
    requestType().then((res) => {
      setDataTypeList(res.data.map(({ name, id }) => ({ label: name, value: id })));
    });
  }, []);

  const [isButtonDisabled, setIsButtonDisabled] = React.useState(true);

  return (
    <div className={styles['container']}>
      <Form>
        <Form.Item noStyle name="title">
          <Input {...InputStyle} />
        </Form.Item>

        <div className={styles['hr']} />

        <Form.Item noStyle name="content">
          <TextArea {...TextAreaStyle} />
        </Form.Item>

        <div className={styles['bottom']}>
          <IconFont type="icontupian" className={styles['icon-pic']} />
          <p>图片</p>

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
});
