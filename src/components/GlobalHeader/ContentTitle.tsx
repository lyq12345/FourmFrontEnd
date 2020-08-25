import { Card } from 'antd';
import React from 'react';
import styles from './index.less';

export interface ContentTitleProps {
  title: string;
  subtitle?: string;
  customClass?: string;
}

const ContentTitle: React.SFC<ContentTitleProps> = (props) => {
  const { title, subtitle, customClass } = props;

  return (
    <Card className={`${styles.ContentTitleWrap} ${customClass}`}>
      <span className={styles.title}>{title}</span>
      <span className={styles.subtitle}>{subtitle}</span>
    </Card>
  );
};

export default ContentTitle;
