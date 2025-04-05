import { Container } from '@components';
import JoinRoomInput from './components/JoinRoomInput';
import Header from './components/Header';
import StartNewRoom from './components/StartNewRoom';

const Home = () => {
  return (
    <Container display="flex" flexDirection="column" gap={2} sx={{ m: 2 }}>
      <Header />
      <JoinRoomInput />
      <StartNewRoom />
    </Container>
  );
};

export default Home;
