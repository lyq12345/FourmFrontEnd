import React from 'react';
import styles from './style.less';

const Iframe = (props) => {
  const { pathname } = props.location;

  return (
    <iframe title="权限管理" src={`${pathname}`} className={styles.iframe} key={`${pathname}`} />
  );
};
export default Iframe;
