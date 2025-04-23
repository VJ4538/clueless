import React, { useMemo } from 'react';
import { getTempUserData } from '@helpers';
import { Container, Text } from '@components';
import { useAppContext } from '@appContext';
import GameRoomSection from '../../GameRoomView/components/GameRoomSection';

const PlayerTurn: React.FC = () => {
  const { gameRoom } = useAppContext();
  const currentPlayer = getTempUserData();

  const playerTurn = useMemo(() => {
    if (currentPlayer?.name === gameRoom.current_turn) {
      return 'Your turn!';
    }
    return `${gameRoom.current_turn}'s turn`;
  }, [currentPlayer, gameRoom.current_turn]);

  return (
    <GameRoomSection>
      <Container display="flex" gap={1} alignItems="center">
        {/* <Text variant="h6" color="primary" textAlign="center">
          {playerTurn}
        </Text> */}
        <Container>
          {gameRoom?.players?.map((player: any) => (
            <Container
              display="flex"
              alignItems="center"
              gap={1}
              key={player.id}
            >
              <Text key={player.id} textAlign="center">
                {player.name}
                {currentPlayer?.id === player.id && ' (You)'} :
              </Text>
              <Text fontWeight={600}>{player?.character?.name}</Text>
              <Container
                sx={{
                  height: '15px',
                  width: '15px',
                  borderRadius: '50%',
                  border: '1px solid #000',
                  background: player?.character.color?.toLowerCase(),
                }}
              />
            </Container>
          ))}
        </Container>
      </Container>
    </GameRoomSection>
  );
};

export default PlayerTurn;
