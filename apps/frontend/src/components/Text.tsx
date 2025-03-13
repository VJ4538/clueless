import { Typography, TypographyProps } from '@mui/material';

interface TextProps extends TypographyProps {
  children: TypographyProps['children'];
}

const Text = ({ children, ...props }: TextProps) => {
  return <Typography {...props}>{children}</Typography>;
};

export default Text;
