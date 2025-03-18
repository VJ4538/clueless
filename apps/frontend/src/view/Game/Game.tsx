import React, { useState, useEffect } from 'react';
import { client } from '@helpers';
import { Text, Container, Button } from '@components';
import { GameState } from '../../types/GameState';
import { useParams } from 'react-router-dom';
import { useAppContext } from '../../context/appContext';

const mockGameState = {
  current_turn: 'Player 1',
  players: [],
  suggestions: [],
  rooms: [],
};

let interval: any;

const Game: React.FC = () => {
  const { roomId } = useParams();
  const [loading, setLoading] = useState<boolean>(true);
  const { gameRoom, setGameRoom } = useAppContext();

  useEffect(() => {
    const fetchGameState = async () => {
      try {
        console.log('Fetching game state...', roomId);
        const response = await client.get<any>(`game/status?room_id=${roomId}`);
        console.log('Game State:', response.data);
        setGameRoom(response.data);
      } catch (error) {
        console.error('Error fetching game state:', error);
      } finally {
        setLoading(false);
      }
    };

    const interval = setInterval(fetchGameState, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  // if (loading) {
  //   return <Text>Loading game state...</Text>;
  // }

  // if (!gameState) {
  //   return <Text>Error: No game state found</Text>;
  // }

  const mockPlayerMoves: any = {
    '0': 'Player 1',
    '1': 'Player 2',
    '2': 'Player 3',
    '3': 'Player 4',
  };

  const updateGameState = (actionType: any) => async () => {
    const response = await client.post<any>(`game/status/update`, {
      room_id: roomId,
      player_id:
        gameRoom?.current_turn === 'Player 2' ? 'Player 1' : 'Player 2',
      action_type: actionType,
    });

    console.log('Game State Test:', response.data.response);
  };

  return (
    <Container
      display="flex"
      flexDirection="column"
      alignItems="center"
      gap={2}
      m={2}
    >
      <Text variant="h4" color="primary">
        Game View
      </Text>

      {/* Players */}
      <Text variant="body1">
        Current Players:
        {gameRoom?.players?.map((player: any, index: number) => (
          <span key={index}>{player.name}</span>
        ))}
      </Text>

      {/* Current Turn */}
      <Text variant="body1" color="error">
        Current Turn: {gameRoom?.current_turn}
      </Text>

      <Container>
        <Text variant="body1">Notifications:</Text>
        <Text variant="body1">
          {gameRoom?.notifications?.map((notification: any, index: number) => (
            <div key={index}>{notification}</div>
          ))}
        </Text>
      </Container>

      {/* Button to make a move */}
      <Button onClick={updateGameState('move')} variant="contained">
        Make a move
      </Button>
      <Button onClick={updateGameState('suggestion')} variant="contained">
        Make a suggestion
      </Button>
    </Container>
  );
};

export default Game;
