import { Button, Container, Text } from '@components';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppContext } from '../../context/appContext';
import { useEffect, useState } from 'react';

const GameRoom = () => {
  const { setGameRoomId } = useAppContext();
  const { roomId } = useParams();
  const navigate = useNavigate();
  const [roomStatus, setRoomStatus] = useState<any>(null);

  console.log('GameRoomId', roomId);

  const handleStartGame = async () => {
    // TODO: API call to start the game
    const mockStartGameResponse = 'success';

    if (mockStartGameResponse === 'success') {
      navigate(`/game/${roomId}`);
    }
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
    const mockRoomStatusResponse = {
      owner: 'Player 1',
      players: [
        {
          name: 'Player 1',
          character: 'Character 1',
          current_room: 'Room 1',
        },
        {
          name: 'Player 2',
          character: 'Character 2',
          current_room: 'Room 2',
        },
      ],
    };
    setRoomStatus(mockRoomStatusResponse);
  };

  const isRoomOwner = roomStatus?.owner === 'Player 1';
  const players = roomStatus?.players;

  useEffect(() => {
    getRoomStatus();
  }, [roomId]);

  return (
    <Container
      display="flex"
      flexDirection="column"
      alignItems="center"
      gap={2}
      m={2}
    >
      <Text>Game Room: {roomId}</Text>
      <Text>Players: {JSON.stringify(players, null, 2)}</Text>

      <Container display="flex" alignItems="center" gap={2}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleStartGame}
          disabled={!isRoomOwner}
        >
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
