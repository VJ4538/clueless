import { Container, Button, Text } from '@components';
import GameRoomSection from '../../GameRoomView/components/GameRoomSection';
import { getTempUserData } from '@helpers';
import { useAppContext } from '@appContext';
import { Modal } from '@mui/material';
import { useMemo, useState } from 'react';

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius: 2,
  p: 4,
};

const PlayerActions = () => {
  const { gameRoom, ws } = useAppContext();
  const currentPlayer = getTempUserData();
  const [open, setOpen] = useState(false);

  const disabled = gameRoom?.current_turn !== currentPlayer?.name;

  const currentInGamePlayer = useMemo(() => {
    return gameRoom?.players?.find(
      (player: any) => player.id === currentPlayer?.id
    );
  }, [currentPlayer, gameRoom]);

  console.log('Curren', currentInGamePlayer);

  const updateGameState = (actionType: any) => async () => {
    setOpen(true);
  };

  const sendMoveMessage = (targetLocation: string) => () => {
    ws.send(
      JSON.stringify({
        action: 'PLAYER_MOVE',
        player_id: currentPlayer?.name,
        character_name: currentInGamePlayer?.character?.name,
        source_location: currentInGamePlayer?.current_location,
        target_location: targetLocation,
      })
    );
    setOpen(false);
  };

  const sendSuggestionMessage = (targetLocation: string) => () => {
    ws.send(
      JSON.stringify({
        action: 'PLAYER_SUGGESTION',
        player_name: currentPlayer?.name,
        character_name: currentInGamePlayer?.character?.name,
        source_location: currentInGamePlayer?.current_location,
        target_location: targetLocation,
      })
    );
    setOpen(false);
  };

  const sendAccusationMessage = (character: string, room: string, weapon: string) => () => {
    ws.send(
      JSON.stringify({
        action: 'PLAYER_ACCUSATION',
        player_name: currentPlayer?.name,
        character: character,
        room: room,
        weapon: weapon,
      })
    );
    setOpen(false);
  };

  const secretPassage =
    gameRoom?.config?.connections[currentInGamePlayer?.current_location]
      ?.secretPassage;

  return (
    <>
      <GameRoomSection title="Player Actions:">
        {disabled && (
          <Text p={1} color="info">
            Waiting for {gameRoom?.current_turn}'s turn
          </Text>
        )}
        <Container display="flex" gap={2}>
          <Button
            onClick={updateGameState('move')}
            variant="contained"
            disabled={disabled}
          >
            Make a move
          </Button>
          <Button
            onClick={updateGameState('suggestion')}
            variant="contained"
            disabled={disabled}
          >
            Make a suggestion
          </Button>

          <Button
            onClick={updateGameState('suggestion')}
            variant="contained"
            disabled={disabled}
          >
            Make a acusation
          </Button>
        </Container>
      </GameRoomSection>

      <Modal open={open} onClose={() => setOpen(false)}>
        <Container sx={modalStyle}>
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
        </Container>
      </Modal>
    </>
  );
};

export default PlayerActions;
