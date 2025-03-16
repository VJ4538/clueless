import React, { useState, useEffect } from 'react';
import { client } from '@helpers';
import { Text, Container, Button } from '@components';
import { GameState } from '../../types/GameState';
import { useParams } from 'react-router-dom';

const mockGameState = {
  current_turn: 'Player 1',
  players: [],
  suggestions: [],
  rooms: [],
};

const Game: React.FC = () => {
  const { roomId } = useParams();
  const [gameState, setGameState] = useState<GameState | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchGameState = async () => {
      try {
        console.log('Fetching game state...', roomId);
        // const response = await client.get<any>(
        //   'testing/getMockGameState?payload=gettingGameState'
        // );

        // setGameState(response.data);
        setGameState(mockGameState);
      } catch (error) {
        console.error('Error fetching game state:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchGameState();
  }, []);

  if (loading) {
    return <Text>Loading game state...</Text>;
  }

  if (!gameState) {
    return <Text>Error: No game state found</Text>;
  }

  return (
    <Container
      display="flex"
      flexDirection="column"
      alignItems="center"
      gap={2}
      m={2}
    >
      <Text variant="h2" color="primary">
        Game Room
      </Text>

      {/* Current Turn */}
      <Text variant="body1">Current Turn: {gameState?.current_turn}</Text>

      {/* Players */}
      <Text variant="body1">
        Players:
        {gameState?.players?.map((player: any, index: number) => (
          <div key={index}>
            <strong>{player.name}</strong> ({player.character}) - Currently in:{' '}
            {player.current_room}
            {player.has_made_suggestion ? ' - Has made a suggestion' : ''}
          </div>
        ))}
      </Text>

      {/* Suggestions */}
      <Text variant="body1">
        Suggestions:
        {gameState?.suggestions?.map((suggestion: any, index: number) => (
          <div key={index}>
            <strong>{suggestion.player}:</strong> {suggestion.suggestion}
          </div>
        ))}
      </Text>

      {/* Button to make a move */}
      <Button onClick={() => alert('[TODO] Make your move!')}>
        Make a Move
      </Button>
    </Container>
  );
};

export default Game;
