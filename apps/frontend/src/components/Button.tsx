import {
  Button as MUIButton,
  ButtonProps as MUIButtonProps,
} from '@mui/material';

interface ButtonProps extends MUIButtonProps {
  children: MUIButtonProps['children'];
}

const Button = ({ children, ...props }: ButtonProps) => {
  return <MUIButton {...props}>{children}</MUIButton>;
};

export default Button;
