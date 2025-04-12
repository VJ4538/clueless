import { Container } from '@components';
import { Outlet } from 'react-router-dom';
import NavBar from './NavBar';

const Layout = () => {
  return (
    <Container
      width="100vw"
      height="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <NavBar />
      <Container border={1} borderRadius={1} minWidth={400}>
        <Outlet />
      </Container>
    </Container>
  );
};

export default Layout;
