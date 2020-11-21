import React from 'react';
import styles from './Button.less';

import { useHistory, useRouteMatch } from 'umi';

type ButtonType = {
  onClick?: Function;
  url: string;
  iconDataURL?: string;
  className?: string;
  count?: number;
};

const Button: React.FC<ButtonType> = React.memo(
  ({ url, onClick, children, iconDataURL, className, count }) => {
    const match = useRouteMatch({ path: url, exact: true });

    const history = useHistory();
    const handleClick = React.useCallback((e) => {
      count = 0;

      url && history.push(url);
      onClick?.(e);
    }, []);

    return (
      <div
        onClick={handleClick}
        className={`${className} ${styles.sidebarButton} ${match && styles.selected}`}
      >
        {iconDataURL && <img src={iconDataURL} />}
        <div style={{ fontSize: 16 }}>{children}</div>
        {/* TODO: 超过99 */}
        {count && <div className={styles['count']}>{count}</div>}
      </div>
    );
  },
);

export default Button;
