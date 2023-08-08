export type BUTTON_PROPS = {
  content: string;
  variant?: 'default' | 'small';
  disabled?: boolean;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
};
