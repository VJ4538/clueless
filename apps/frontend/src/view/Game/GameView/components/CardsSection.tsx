import { useAppContext } from '@appContext';
import { capFirstLetter, getTempUserData } from '@helpers';
import { Text, Container } from '@components';
import GameRoomSection from '../../GameRoomView/components/GameRoomSection';

const CardsSection = ({ isRevealedCards }: any) => {
  const { gameRoom } = useAppContext();
  const currentPlayer = getTempUserData();

  const playerCards = gameRoom?.players?.find(
    (player: any) => player.id === currentPlayer?.id
  );

  const currentPlayerCards = isRevealedCards
    ? gameRoom?.revealved_cards || []
    : playerCards?.cards.slice(0, 4);

  return (
    <GameRoomSection
      title={isRevealedCards ? '💡 Revealed Cards' : '🧩 Your Cards'}
    >
      {currentPlayerCards?.length === 0 && isRevealedCards ? (
        <Text variant="h6">Make a suggestion to reveal cards</Text>
      ) : (
        isRevealedCards && (
          <Text mb={1}>Solution is not one of the below cards:</Text>
        )
      )}
      <Container display="flex" gap={1}>
        {currentPlayerCards?.map((card: any) => (
          <Container
            key={card?.id}
            border={1}
            borderRadius={1}
            width="100px"
            sx={{
              filter: `grayscale(${isRevealedCards ? '100%' : '0%'})`,
            }}
          >
            <Container width="100%" bgcolor="primary.main">
              <Text textAlign="center" p={0.5} color="#fff">
                {card.type === 'suspect' && '🕵️‍♀️'}
                {card.type === 'weapon' && '🔪'}
                {card.type === 'room' && '🏠'} {capFirstLetter(card.type)}
              </Text>
            </Container>
            <Container
              display="flex"
              height="50px"
              alignItems="center"
              justifyContent="center"
            >
              <Text>{card.name}</Text>
            </Container>
          </Container>
        ))}
      </Container>
    </GameRoomSection>
  );
};

export default CardsSection;
