import { Button } from '@components';
import useLoginPage from '../hook/useLoginPage';

const StartNewRoom = () => {
  const { handleStartNewRoom } = useLoginPage();
  return (
    <Button variant="contained" color="primary" onClick={handleStartNewRoom}>
      Start a new room
    </Button>
  );
};

export default StartNewRoom;
