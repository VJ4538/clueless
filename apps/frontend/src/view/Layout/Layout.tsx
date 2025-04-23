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
      display="flex"
      width="100vw"
      height="100vh"
      justifyContent="center"
      alignItems="center"
    >
      <Container>
        {debugMode && <DebugMode />}
        <Container border={1} borderRadius={1} minWidth={500}>
          <Outlet />
        </Container>
        <LearnMoreAboutGame />
      </Container>
      <SpecialCodeListener onTrigger={toggleDebugMode} />
    </Container>
  );
};

export default memo(Layout);
