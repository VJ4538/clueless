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
      <Container
        sx={{ border: '1px solid black', borderRadius: 2, width: '500px' }}
      >
        <NavBar />
        <Outlet />
      </Container>
    </Container>
  );
};

export default Layout;
