import React, { useMemo } from 'react';
import { getTempUserData } from '@helpers';
import { Container, Text } from '@components';
import { useAppContext } from '@appContext';
import GameRoomSection from '../../GameRoomView/components/GameRoomSection';
import { PlayerIndicator } from './PlayersOnTile';
import StarIcon from '@mui/icons-material/Star';

const GameInfo: React.FC = () => {
  const { gameRoom } = useAppContext();
  const currentPlayer = getTempUserData();

  const playerTurn = useMemo(() => {
    return gameRoom?.players.find(
      (player: any) => player.name === gameRoom.current_turn
    );
  }, [currentPlayer, gameRoom?.players]);

  return (
    <GameRoomSection>
      <Container
        display="flex"
        gap={1}
        alignItems="center"
        justifyContent="space-evenly"
      >
        <Container display="flex" alignItems="center" gap={1}>
          <PlayerIndicator
            size="16px"
            color={playerTurn?.character?.color?.toLowerCase()}
          />
          <Text variant="h6" textAlign="center" color="Info" fontWeight={600}>
            {gameRoom?.current_turn === currentPlayer?.name
              ? 'Your trurn'
              : `${playerTurn?.character?.name}'s turn`}
          </Text>
        </Container>

        <Container>
          {gameRoom?.players?.map((player: any) => (
            <Container
              display="flex"
              alignItems="center"
              gap={0.5}
              key={player.id}
            >
              <PlayerIndicator
                size="16px"
                color={player?.character?.color?.toLowerCase()}
              />

              <Text fontWeight={600}>{player?.character?.name}</Text>
              <Text textAlign="center">({player.name})</Text>
              {currentPlayer?.id === player.id && <StarIcon color="warning" />}
            </Container>
          ))}
        </Container>
      </Container>
    </GameRoomSection>
  );
};

export default GameInfo;
