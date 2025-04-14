import { Container, Text, Button } from '@components';

const MovementModalContent = ({
  currentInGamePlayer,
  gameRoom,
  sendMoveMessage,
  secretPassage,
}: any) => {
  return (
    <>
      <Container display="flex" alignItems="center" gap={1}>
        <Text>Player: {currentInGamePlayer?.character?.name}</Text>
        <Container
          sx={{
            height: '15px',
            width: '15px',
            borderRadius: '50%',
            border: '1px solid #000',
            background: currentInGamePlayer?.character.color?.toLowerCase(),
          }}
        />
      </Container>
      <Text>At: {currentInGamePlayer?.current_location}</Text>

      <Container>
        <Text>Can move to:</Text>
        <Container display="flex" alignItems="center" gap={1}>
          {gameRoom?.config?.connections[
            currentInGamePlayer?.current_location
          ]?.adjacent.map((location: any) => {
            if (location.includes('entry')) {
              return null;
            }
            return (
              <Button
                key={location}
                variant="contained"
                onClick={sendMoveMessage(location)}
              >
                {location}
              </Button>
            );
          })}

          {secretPassage && (
            <Button
              variant="contained"
              onClick={sendMoveMessage(secretPassage)}
            >
              {secretPassage}
            </Button>
          )}
        </Container>
      </Container>
    </>
  );
};

export default MovementModalContent;
