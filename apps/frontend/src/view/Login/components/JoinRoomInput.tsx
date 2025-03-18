import { Button, Container } from '@components';
import { TextField } from '@mui/material';
import useLoginPage from '../hook/useLoginPage';

const JoinRoomInput = () => {
  const { enableJoinRoom, gameRoomId, handleSetGameRoomId, handleJoinRoom } =
    useLoginPage();

  return (
    <Container display="flex" justifyContent="center" alignItems="center">
      <TextField
        fullWidth
        size="small"
        placeholder="Enter room id"
        value={gameRoomId}
        onChange={handleSetGameRoomId}
      />

      <Button
        variant="contained"
        color="primary"
        // disabled={!enableJoinRoom}
        onClick={handleJoinRoom}
      >
        Join
      </Button>
    </Container>
  );
};

export default JoinRoomInput;
