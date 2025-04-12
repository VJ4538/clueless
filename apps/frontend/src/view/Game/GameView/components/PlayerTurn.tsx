import React, { useMemo } from 'react';
import { getTempUserData } from '@helpers';
import { Container, Text } from '@components';
import { useAppContext } from '@appContext';

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
    <Container
      display="flex"
      border={1}
      borderRadius={1}
      p={1}
      width="100%"
      justifyContent="space-between"
      alignItems="center"
    >
      <Container>
        {gameRoom?.players?.map((player: any) => (
          <Container display="flex" alignItems="center" gap={1}>
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

      <Text variant="h6" color="primary" textAlign="center">
        {playerTurn}
      </Text>
      <Container />
    </Container>
  );
};

export default PlayerTurn;
