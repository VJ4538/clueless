import { Container } from '@components';
import { Outlet } from 'react-router-dom';
import { useAppContext } from '@appContext';
import SpecialCodeListener from '../Game/SpecialCodeListener';
import LearnMoreAboutGame from '../Home/components/LearnMoreAboutGame';
import { memo } from 'react';
import DebugMode from './DebugMode';

const Layout = () => {
  const { debugMode, toggleDebugMode } = useAppContext();

  return (
    <Container
      width="100vw"
      height="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Container
        p={1}
        width="100%"
        display="flex"
        flexDirection="column"
        alignItems="center"
      >
        {debugMode && <DebugMode />}
        <Outlet />
        <LearnMoreAboutGame />
      </Container>
      <SpecialCodeListener onTrigger={toggleDebugMode} />
    </Container>
  );
};

export default memo(Layout);
