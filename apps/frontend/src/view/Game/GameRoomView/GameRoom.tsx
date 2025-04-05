import { Container, Text } from '@components';
import { useAppContext } from '../../../context/appContext';
import Players from './components/Players';
import GameRoomActions from './components/GameRoomActions';
import Invitation from './components/Invitation';
import GameRoomMessages from './components/GameRoomMessages';
import GameRoomWebSocketHandler from '../GameRoomWebSocketHandler';

const GameRoom = () => {
  const { gameRoom } = useAppContext();

  return (
    <GameRoomWebSocketHandler>
      <Container
        display="flex"
        flexDirection="column"
        alignItems="center"
        gap={2}
        m={2}
      >
        <Text variant="h4" color="primary">
          Game Room View
        </Text>

        <Invitation />

        {gameRoom?.players && <Players players={gameRoom.players} />}
        {gameRoom?.activities && (
          <GameRoomMessages messages={gameRoom?.activities} />
        )}

        <GameRoomActions />
      </Container>
    </GameRoomWebSocketHandler>
  );
};

export default GameRoom;
