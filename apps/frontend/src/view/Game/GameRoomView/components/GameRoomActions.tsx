import { Container, Button } from '@components';
import { getTempUserData, sendWSMessage } from '@helpers';
import { useAppContext } from '@appContext';

const GameRoomActions = () => {
  const { ws } = useAppContext();
  const currentPlayer = getTempUserData();

  const handleStartGame = async () => {
    ws.game_state = "IN_PROGRESS"; // todo, forcing start of game to work on game board
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
  };

  return (
    <Container display="flex" alignItems="center" gap={2}>
      <Button
        variant="contained"
        color="primary"
        onClick={handleStartGame}
        disabled={!currentPlayer?.isHost}
      >
        Start Game
      </Button>

      <Button variant="outlined" color="primary" onClick={handleQuitGame}>
        Quit
      </Button>
    </Container>
  );
};

export default GameRoomActions;
