import { useAppContext } from '@appContext';
import { getTempUserData } from '@helpers';
import { Text, Container } from '@components';
import GameRoomSection from '../../GameRoomView/components/GameRoomSection';

const PlayerCard = () => {
  const { gameRoom } = useAppContext();
  const currentPlayer = getTempUserData();

  const playerCards = gameRoom?.players?.find(
    (player: any) => player.id === currentPlayer?.id
  );
  const currentPlayerCards = playerCards?.cards.slice(0, 4);

  return (
    <GameRoomSection title="🧩 Your Cards">
      <Container display="flex" gap={1}>
        {currentPlayerCards?.map((card: any) => (
          <Container key={card?.id} border={1} borderRadius={1} minWidth={100}>
            <Container width="100%" bgcolor="primary.main">
              <Text textAlign="center" p={0.5} color="#fff">
                {card.type === 'suspect' && '🕵️‍♀️'}
                {card.type === 'weapon' && '🔪'}
                {card.type === 'room' && '🏠'} {card.type}
              </Text>
            </Container>

            <Text key={card.id} p={0.5}>
              {card.name}
            </Text>
          </Container>
        ))}
      </Container>
    </GameRoomSection>
  );
};

export default PlayerCard;
