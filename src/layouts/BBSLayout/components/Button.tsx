import React from 'react';
import styles from './Button.less';

import { useToggle, useClickAway } from '@umijs/hooks';

type ButtonType = {
  onClick?: Function;
  iconDataURL?: string;
  className?: string;
};

const Button: React.FC<ButtonType> = React.memo(({ onClick, children, iconDataURL, className }) => {
  const { state, toggle } = useToggle(false);
  const handleClick = React.useCallback((e) => {
    toggle(true);

    onClick?.(e);
  }, []);

  const ref = React.useRef<HTMLDivElement>();
  useClickAway(() => {
    toggle(false);
  }, ref.current);

  return (
    <div
      ref={ref}
      onClick={handleClick}
      className={`${className} ${styles.sidebarButton} ${state && styles.selected}`}
    >
      {iconDataURL && <img src={iconDataURL} />}
      <div style={{ fontSize: 16 }}>{children}</div>
    </div>
  );
});

export default Button;
