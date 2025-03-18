import { Button, Container, Text } from '@components';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppContext } from '../../context/appContext';
import { useEffect, useState } from 'react';
import { client } from '@helpers';

const GameRoom = () => {
  const { setGameRoomId, gameRoom, setGameRoom } = useAppContext();
  const { roomId } = useParams();
  const navigate = useNavigate();
  const [roomStatus, setRoomStatus] = useState<any>(null);

  console.log('GameRoomId', roomId);

  const handleStartGame = async () => {
    // TODO: API call to start the game
    const apiResponse: any = await client.get(`room/update?room_id=${roomId}`);
    console.log('Start Game request', apiResponse);

    if (apiResponse.data.response.game_state === 'in_progress') {
      navigate(`/game/${roomId}`);
    }

    setGameRoom(apiResponse.data.response);
  };

  const handleQuitGame = async () => {
    // TODO: API call to quit the game
    const mockQuiteGameResponse = 'success';

    if (mockQuiteGameResponse === 'success') {
      setGameRoomId('');
      navigate('/');
    }
  };

  const getRoomStatus = async () => {
    // TODO: API call to get room status
    // Should also create temp user when join or create a room
    // Should return who is the owner of the room and how many players are in the room

    const apiResponse: any = await client.get(`room/status?room_id=${roomId}`);

    console.log('Room Status', apiResponse.data);

    if (apiResponse.data.game_state === 'in_progress') {
      console.log('Game in progress, navigating to game page');
      navigate(`/game/${roomId}`);
    }

    setRoomStatus(apiResponse.data);
  };

  const players = roomStatus?.players;

  useEffect(() => {
    const interval = setInterval(getRoomStatus, 1000);

    return () => clearInterval(interval);
  }, [roomId]);

  console.log('game room', gameRoom);

  return (
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
      <Text>Share Game Room Invite: {roomId}</Text>
      <Text>
        Players:{' '}
        {players?.map((player: any, index: number) => (
          <Container key={player.id}>
            {index + 1}. {player.name}
            {player.is_owner && ' (Owner)'}
            {player.name === 'Player 2' && ' (You)'}
          </Container>
        ))}
      </Text>

      <Container display="flex" alignItems="center" gap={2}>
        <Button variant="contained" color="primary" onClick={handleStartGame}>
          Start Game
        </Button>

        <Button variant="outlined" color="primary" onClick={handleQuitGame}>
          Quit
        </Button>
      </Container>
    </Container>
  );
};

export default GameRoom;
