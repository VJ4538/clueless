import { useAppContext } from '@appContext';
import GameRoomWebSocketHandler from './GameRoomWebSocketHandler';
import GameRoom from './GameRoomView/GameRoom';
import GameView from './GameView/GameView';

const Game = () => {
  const { gameRoom } = useAppContext();

  const isGameInProgress =
    gameRoom?.game_state === 'IN_PROGRESS' ||
    gameRoom?.game_state === 'FINISHED';

  return (
    <GameRoomWebSocketHandler>
      {isGameInProgress ? <GameView /> : <GameRoom />}
    </GameRoomWebSocketHandler>
  );
};

export default Game;
