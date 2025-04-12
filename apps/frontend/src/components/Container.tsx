import { Box, BoxProps } from '@mui/material';

interface ContainerProps extends BoxProps {
  children?: BoxProps['children'];
}

const Container = ({ children, ...props }: ContainerProps) => {
  return <Box {...props}>{children}</Box>;
};

export default Container;
