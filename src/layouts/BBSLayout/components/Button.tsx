import React from 'react';
import styles from './Button.less';

import { useToggle, useClickAway } from '@umijs/hooks';

type ButtonType = {
  onClick?: Function;
  iconDataURL?: string;
  isSelectedAlways?: boolean;
};

const Button: React.FC<ButtonType> = React.memo(
  ({ onClick, children, iconDataURL, isSelectedAlways }) => {
    const { state, toggle } = useToggle(isSelectedAlways);
    const handleClick = React.useCallback((e) => {
      toggle(true);

      onClick?.(e);
    }, []);

    const ref = React.useRef<HTMLDivElement>();
    useClickAway(() => {
      !isSelectedAlways && toggle(false);
    }, ref.current);

    return (
      <div
        ref={ref}
        onClick={handleClick}
        className={`${styles.sidebarButton} ${state && styles.selected}`}
      >
        {iconDataURL && <img src={iconDataURL} />}
        <div style={{ fontSize: 16 }}>{children}</div>
      </div>
    );
  },
);

export default Button;
