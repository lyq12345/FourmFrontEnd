import React from 'react';
import { Button } from 'antd';
import { CompDemoProps } from '../data.d';

import styles from './style.less';

/**
 * TODO: 仅示例 建议删除或重命名
 */
const CompDemo: React.FC<CompDemoProps> = (props) => {
  return (
    <div className={styles.demoComp}>
      <Button className={styles.buttonText}>{props.buttonText}</Button>
    </div>
  );
};

export default CompDemo;
