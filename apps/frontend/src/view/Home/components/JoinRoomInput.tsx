import { Button } from '@components';
import { TextField, Stack } from '@mui/material';
import useLoginPage from '../hook/useLoginPage';
import { useAppContext } from '../../../context/appContext';

const JoinRoomInput = () => {
  const { handleUpdateUserInputGameRoomId, userInputGameRoomId } =
    useAppContext();

  const { handleJoinRoom } = useLoginPage();

  return (
    <Stack direction="row" spacing={1} mb={3}>
      <TextField
        fullWidth
        size="small"
        variant="outlined"
        placeholder="Enter Room Code"
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
    </Stack>
  );
};

export default JoinRoomInput;
