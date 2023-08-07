// Button.tsx
import React from 'react';
import cn from 'classnames';

import styles from './Button.module.scss';

type Props = {
  content: string;
  variant?: 'default' | 'small';
  disabled?: boolean;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
};

export const Button = ({
  content,
  variant = 'default',
  disabled,
  onClick,
}: Props): JSX.Element => (
  <button
    onClick={onClick}
    className={cn(styles.button, {
      [styles[`button--${variant}`]]: variant,
      [styles.disabled]: disabled,
    })}
    disabled={disabled}
  >
    {content}
  </button>
);
