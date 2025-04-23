import { Container, Button, Text } from '@components';
import { getTempUserData, sendWSMessage } from '@helpers';
import { useAppContext } from '@appContext';
import { Alert } from '@mui/material';
import { useNavigate } from 'react-router';

const MIN_PLAYER_TO_START_GAME = 4;

const GameRoomActions = () => {
  const navigate = useNavigate();
  const { ws, gameRoom, debugMode } = useAppContext();
  const currentPlayer = getTempUserData();

  const handleStartGame = async () => {
    if (ws && currentPlayer) {
      sendWSMessage(ws, {
        action: 'START_GAME',
      });
    }
  };

  const handleQuitGame = async () => {
    if (ws && currentPlayer) {
      sendWSMessage(ws, {
        action: 'QUIT_FROM_ROOM',
        player_id: currentPlayer.id,
      });
    }
    navigate('/');
  };

  const numberOfPlayers = gameRoom?.players?.length || 0;

  const isUserHost = currentPlayer?.isHost;

  const notEnoughUser =
    numberOfPlayers < (debugMode ? 2 : MIN_PLAYER_TO_START_GAME);

  const disableStartGame = notEnoughUser || !isUserHost;

  return (
    <>
      <Container
        display="flex"
        alignItems="center"
        gap={2}
        justifyContent="space-between"
      >
        <Button variant="outlined" color="primary" onClick={handleQuitGame}>
          Quit
        </Button>

        <Button
          variant="contained"
          color="primary"
          onClick={handleStartGame}
          disabled={Boolean(disableStartGame)}
        >
          {!isUserHost && !notEnoughUser
            ? 'Waiting for Host to Start'
            : 'Start'}
        </Button>
      </Container>
      {gameRoom?.players?.length > 1 && notEnoughUser && (
        <Alert severity="info">
          <Text>Minimum 2 player to start the game</Text>
        </Alert>
      )}
    </>
  );
};

export default GameRoomActions;
