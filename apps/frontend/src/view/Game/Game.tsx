import { useAppContext } from '@appContext';
import GameRoomWebSocketHandler from './GameRoomWebSocketHandler';
import GameRoom from './GameRoomView/GameRoom';
import GameView from './GameView/GameView';
import GameAuthWrapper from './GameAuthWrapper';

const Game = () => {
  const { gameRoom } = useAppContext();

  const isGameInProgress =
    gameRoom?.game_state === 'IN_PROGRESS' ||
    gameRoom?.game_state === 'FINISHED';

  return (
    <GameAuthWrapper>
      <GameRoomWebSocketHandler>
        {isGameInProgress ? <GameView /> : <GameRoom />}
      </GameRoomWebSocketHandler>
    </GameAuthWrapper>
  );
};

export default Game;
