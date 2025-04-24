import React from 'react';
import { Text, Container } from '@components';
import { useAppContext } from '@appContext';
import GameInfo from './components/GameInfo';
import GameRoomMessages from '../GameRoomView/components/GameRoomMessages';
import ClueBoard from './components/ClueBoard';
import PlayerActions from './components/PlayerActions';
import CardsSection from './components/CardsSection';
import { Paper } from '@mui/material';

const GameView: React.FC = () => {
  const { debugMode, gameRoom } = useAppContext();

  if (!gameRoom) {
    return <Text>Loading game state...</Text>;
  }

  return (
    <Paper
      sx={{
        display: 'flex',
        bgcolor: '#f5f5f5',
        border: '1px solid #ccc',
      }}
    >
      <ClueBoard />

      <Container
        display="flex"
        flexDirection="column"
        justifyContent="start"
        height="100%"
        width="700px"
        gap={2}
        p={2}
        pr={6}
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

        <GameInfo />

        <GameRoomMessages
          messages={gameRoom?.game_activities}
          maxHeight="200px"
          minHeight="200px"
        />

        <CardsSection isRevealedCards />

        <CardsSection />

        <PlayerActions />
      </Container>
    </Paper>
  );
};

export default GameView;
