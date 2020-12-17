import { IconFont } from '@/utils/utilsBBS';
import React from 'react';
import { useHistory, useRouteMatch } from 'umi';
import styles from './Button.less';

type ButtonType = {
  onClick?: Function;
  url: string;
  iconFontType?: string;
  className?: string;
  count?: number;
  exact?: boolean;
};

const Button: React.FC<ButtonType> = React.memo(
  ({ url, onClick, children, iconFontType, className, count, exact = false }) => {
    const match = useRouteMatch({ path: url, exact });

    const history = useHistory();
    const handleClick = React.useCallback(
      (e) => {
        url && history.push(url);
        window.scrollTo(0, 0);
        onClick?.(e);
      },
      [url, history, onClick],
    );

    const countElement = React.useMemo(() => {
      if (count && !match) {
        return count < 99 ? (
          <div className={styles['count']}>{count}</div>
        ) : (
          <div className={styles['count-more']}>99+</div>
        );
      } else {
        return null;
      }
    }, [count, match]);

    return (
      <div
        onClick={handleClick}
        className={`${className} ${styles.sidebarButton} ${match && styles.selected}`}
      >
        {iconFontType && (
          <IconFont type={iconFontType} style={{ marginLeft: 22, marginRight: 7, fontSize: 20 }} />
        )}
        <div style={iconFontType ? { fontSize: 16 } : { fontSize: 16, paddingLeft: 24 }}>
          {children}
        </div>
        {countElement}
      </div>
    );
  },
);

export default Button;
