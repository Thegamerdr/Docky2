import { FC, ReactNode } from 'react';

const Button: FC<{
  onClick: () => void;
  children: ReactNode;
  type?: "button" | "submit" | "reset";
}>;
export default Button;