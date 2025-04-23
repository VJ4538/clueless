import { Button } from '@components';
import useLoginPage from '../hook/useLoginPage';
import { useAppContext } from '@appContext';
import GamesIcon from '@mui/icons-material/Games';

const StartNewRoom = () => {
  const { userInputGameRoomId } = useAppContext();
  const { handleStartNewRoom } = useLoginPage();

  return (
    <Button
      variant="contained"
      color="primary"
      onClick={handleStartNewRoom}
      disabled={Boolean(userInputGameRoomId)}
      sx={{
        fontWeight: 600,
        py: 1.5,
      }}
    >
      <GamesIcon sx={{ pr: 1 }} /> Start a New Game
    </Button>
  );
};

export default StartNewRoom;
