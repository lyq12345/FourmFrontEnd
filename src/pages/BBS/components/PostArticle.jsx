import React, { useState, useEffect } from 'react';
import { Input, Button, Popover, Select, Divider } from 'antd';
const { TextArea } = Input;
const { Option } = Select;
import styles from './style.less';

const blocks = [
  { value: '0', label: '销售类' },
  { value: '1', label: '市场类' },
  { value: '2', label: '人事类' },
  { value: '3', label: '工厂类' },
  { value: '4', label: '物流类' },
];
const PostArticle = () => {
  const [visible, setVisible] = useState(false);

  const handleVisibleChange = () => {
    setVisible(visible);
  };
  return (
    <div className={styles.post_container}>
      <div>
        <Input className={styles.title} bordered={false} placeholder="标题" />
      </div>
      <div style={{ height: '1px', backgroundColor: '#D8D8D8' }} />
      <div>
        <TextArea
          className={styles.content}
          bordered={false}
          placeholder="有什么新鲜事想告诉大家？"
        />
      </div>
      <div className={styles.post_bottom}>
        <span>图片</span>
        <div style={{ flex: 1 }}></div>
        <Select placeholder="请选择板块" bordered={false} dropdownStyle={{}}>
          {blocks.map((item) => (
            <Option value={item.value}>{item.label}</Option>
          ))}
        </Select>

        <Button style={{ width: '62px', height: '28px', color: '#FF5000' }}>发送</Button>
      </div>
    </div>
  );
};

export default PostArticle;
