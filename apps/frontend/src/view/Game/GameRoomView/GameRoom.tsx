import { Text } from '@components';
import { useAppContext } from '../../../context/appContext';
import Players from './components/Players';
import GameRoomActions from './components/GameRoomActions';
import Invitation from './components/Invitation';
import GameRoomMessages from './components/GameRoomMessages';
import GameRoomWebSocketHandler from '../GameRoomWebSocketHandler';
import { Paper } from '@mui/material';
import { gameContainerStyle } from './../../Home/Home';

const GameRoom = () => {
  const { gameRoom } = useAppContext();

  return (
    <GameRoomWebSocketHandler>
      <Paper elevation={6} sx={gameContainerStyle}>
        <Text variant="h4" color="primary" textAlign="center" gutterBottom>
          Game Room View
        </Text>

        <Invitation />

        {gameRoom?.players && <Players players={gameRoom.players} />}

        {gameRoom?.waiting_room_activities && (
          <GameRoomMessages messages={gameRoom?.waiting_room_activities} />
        )}

        <GameRoomActions />
      </Paper>
    </GameRoomWebSocketHandler>
  );
};

export default GameRoom;
