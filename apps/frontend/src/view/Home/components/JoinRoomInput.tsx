import { Button, Container } from '@components';
import { TextField } from '@mui/material';
import useLoginPage from '../hook/useLoginPage';
import { useAppContext } from '../../../context/appContext';

const JoinRoomInput = () => {
  const { handleUpdateUserInputGameRoomId, userInputGameRoomId } =
    useAppContext();

  const { handleJoinRoom } = useLoginPage();

  return (
    <Container display="flex" justifyContent="center" alignItems="center">
      <TextField
        fullWidth
        size="small"
        placeholder="Enter room id"
        value={userInputGameRoomId}
        onChange={handleUpdateUserInputGameRoomId}
      />

      <Button
        variant="contained"
        color="primary"
        disabled={!userInputGameRoomId}
        onClick={handleJoinRoom}
      >
        Join
      </Button>
    </Container>
  );
};

export default JoinRoomInput;
