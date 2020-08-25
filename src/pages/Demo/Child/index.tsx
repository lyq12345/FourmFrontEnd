import React from 'react';
import CompDemo from './components/CompDemo/index.tsx';

import styles from './style.less';

/**
 * TODO: 仅示例 建议删除或重命名
 */
const Demo: React.FC<{}> = () => {
  return (
    <div className={styles.demoPage}>
      <CompDemo buttonText="测试按钮" />
    </div>
  );
};

export default Demo;
