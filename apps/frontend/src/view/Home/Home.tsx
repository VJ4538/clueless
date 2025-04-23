import JoinRoomInput from './components/JoinRoomInput';
import Header from './components/Header';
import StartNewRoom from './components/StartNewRoom';
import { Paper } from '@mui/material';

export const gameContainerStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: 2,
  p: 4,
  bgcolor: '#f5f5f5',
  border: '1px solid #ccc',
  minWidth: '600px',
};

const Home = () => {
  return (
    <Paper elevation={6} sx={gameContainerStyle}>
      <Header />
      <JoinRoomInput />
      <StartNewRoom />
    </Paper>
  );
};

export default Home;
