import React from 'react';
import cn from 'classnames';

import styles from './Button.module.scss';

import type { BUTTON_PROPS } from '../../types/button';

export const Button = ({
  content,
  variant = 'default',
  disabled,
  onClick,
}: BUTTON_PROPS): JSX.Element => (
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
