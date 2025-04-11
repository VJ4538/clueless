import React, { useState, useEffect } from 'react';
import { client, getTempUserData } from '@helpers';
import { Text, Container, Button, ClueBoard } from '@components';
import { useParams } from 'react-router-dom';
import { useAppContext } from '@appContext';

const mockGameState = {
  current_turn: 'Player 1',
  players: [],
  suggestions: [],
  rooms: [],
};

const GameView: React.FC = () => {
  const { roomId } = useParams();
  const [loading, setLoading] = useState<boolean>(true);
  const { gameRoom, setGameRoom } = useAppContext();
  const currentPlayer = getTempUserData();

  console.log('Move to Game View');
  console.log(gameRoom);

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

      {
        <div>
          <Text variant="body1">
            Current Players:
            {gameRoom?.players?.map((player: any, index: number) => (
              <span key={index}> {player.name} </span>
            ))}
          </Text>

          <div>
            <h2 style={{ textAlign: 'center' }}>Clueless Board</h2>
            <ClueBoard gameBoard={gameRoom} />
          </div>

          <Button onClick={updateGameState('move')} variant="contained">
            Make a move
          </Button>
          <Button onClick={updateGameState('suggestion')} variant="contained">
            Make a suggestion
          </Button>

          <Container>
            <Text>
              {currentPlayer?.name}'s Cards:
              {currentPlayer?.cards?.map((card: any) => (
                <Text key={card.id}>{card.name}</Text>
              ))}
            </Text>
          </Container>

          <Container style={{ marginTop: '20px' }}>
            <Text variant="body1">Notifications:</Text>
            <Text variant="body1">
              {gameRoom?.game_activities?.map((activity: any) => (
                <div key={1000 + activity?.id}>
                  {activity?.player_name} {activity?.message}{' '}
                  {activity?.timeStamp}
                </div>
              ))}
            </Text>
          </Container>
        </div>
      }
    </Container>
  );
};

export default GameView;
