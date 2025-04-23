import React from 'react';
import { Text, Container } from '@components';
import { useAppContext } from '@appContext';
import PlayerTurnSection from './components/PlayerTurn';
import GameRoomMessages from '../GameRoomView/components/GameRoomMessages';
import ClueBoard from './components/ClueBoard';
import PlayerCard from './components/PlayerCardSection';
import PlayerActions from './components/PlayerActions';

const GameView: React.FC = () => {
  const { debugMode, gameRoom } = useAppContext();

  if (!gameRoom) {
    return <Text>Loading game state...</Text>;
  }

  return (
    <Container display="flex" width="100%">
      <Container p={2} minWidth="700px">
        <ClueBoard />
      </Container>

      <Container
        display="flex"
        flexDirection="column"
        justifyContent="start"
        maxWidth="500px"
        height="100%"
        gap={2}
        p={2}
      >
        {debugMode && (
          <Container>
            <Text color="error" variant="h6">
              Debug Solution:
            </Text>
            <Text variant="h6" color="error">
              {gameRoom?.solution?.suspect?.name} -{' '}
              {gameRoom?.solution?.room?.name} -{' '}
              {gameRoom?.solution?.weapon?.name}
            </Text>
          </Container>
        )}

        <PlayerTurnSection />

        <GameRoomMessages
          messages={gameRoom?.game_activities}
          minHeight="130px"
        />

        <PlayerCard />

        <PlayerActions />
      </Container>
    </Container>
  );
};

export default GameView;
