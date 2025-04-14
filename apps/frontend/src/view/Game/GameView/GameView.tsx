import React from 'react';
import { getTempUserData } from '@helpers';
import { Text, Container, Button } from '@components';
import { useAppContext } from '@appContext';
import PlayerTurnSection from './components/PlayerTurn';
import GameRoomMessages from '../GameRoomView/components/GameRoomMessages';
import ClueBoard from './components/ClueBoard';
import PlayerCard from './components/PlayerCardSection';
import PlayerActions from './components/PlayerActions';

const GameView: React.FC = () => {
  const { gameRoom } = useAppContext();

  const updateGameState = (actionType: any) => async () => {};

  if (!gameRoom) {
    return <Text>Loading game state...</Text>;
  }

  console.log('GAME ROOM:', gameRoom);

  return (
    <Container display="flex" alignItems="center" gap={5}>
      <Container p={1}>
        <PlayerTurnSection />
        <ClueBoard />
      </Container>

      <Container
        display="flex"
        flexDirection="column"
        width="100%"
        height="100%"
        gap={2}
        p={1}
      >
        <Container>
          <Text color="error" variant="h6">
            Debug Solution:
          </Text>
          <Text>
            {gameRoom?.solution?.suspect?.name} -{' '}
            {gameRoom?.solution?.weapon?.name} -{' '}
            {gameRoom?.solution?.room?.name}
          </Text>
        </Container>
        <GameRoomMessages
          messages={gameRoom?.game_activities}
          minHeight="200px"
        />

        <PlayerCard />

        <PlayerActions />
      </Container>
    </Container>
  );
};

export default GameView;
