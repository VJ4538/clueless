import { Container, Button, Text } from '@components';
import GameRoomSection from '../../GameRoomView/components/GameRoomSection';
import { getTempUserData } from '@helpers';
import { useAppContext } from '@appContext';
import { Modal } from '@mui/material';
import { useMemo, useState } from 'react';
import MovementModalContent from './modals/MovementModalContent';
import SolutionModalContent from './modals/SolutionModalContent';
import { useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate();
  const { gameRoom, ws } = useAppContext();
  const currentPlayer = getTempUserData();
  const [modalType, setModalType] = useState(null);

  const isCurrenPlayerTurn = gameRoom?.current_turn === currentPlayer?.name;

  const currentInGamePlayer = useMemo(() => {
    return gameRoom?.players?.find(
      (player: any) => player.id === currentPlayer?.id
    );
  }, [currentPlayer, gameRoom]);

  const openModal = (modaType: any) => async () => {
    setModalType(modaType);
  };

  const sendEndTurnMessage = () => {
    ws.send(
      JSON.stringify({
        action: 'END_TURN',
      })
    );
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
    setModalType(null);
  };

  const sendSuggestionMessage = (
    character: string,
    room: string,
    weapon: string
  ) => {
    ws.send(
      JSON.stringify({
        action: 'PLAYER_SUGGESTION',
        player_name: currentPlayer?.name,
        character: character,
        room: room,
        weapon: weapon,
      })
    );
    setModalType(null);
  };

  const sendAccusationMessage = (
    character: string,
    room: string,
    weapon: string
  ) => {
    ws.send(
      JSON.stringify({
        action: 'PLAYER_ACCUSATION',
        player_name: currentPlayer?.name,
        character: character,
        room: room,
        weapon: weapon,
      })
    );
    setModalType(null);
  };

  const secretPassage =
    gameRoom?.config?.connections[currentInGamePlayer?.current_location]
      ?.secretPassage;

  const disableMove = !isCurrenPlayerTurn || currentInGamePlayer?.has_moved;

  const disableSuggestion =
    !isCurrenPlayerTurn || currentInGamePlayer?.has_suggested;

  // Not in hallway or entry
  const isPlayerInHallwayOrEntry =
    currentInGamePlayer?.current_location.includes('hallway') ||
    currentInGamePlayer?.current_location.includes('entry');

  const disableAccusation =
    !isCurrenPlayerTurn || currentInGamePlayer?.has_accused;

  const isEliminated =
    currentInGamePlayer?.is_eliminated || gameRoom.game_state === 'FINISHED';

  return (
    <>
      <GameRoomSection title="🎮  Player Actions">
        <Container display="flex" gap={2}>
          <Button
            onClick={openModal('movement')}
            variant="contained"
            disabled={isEliminated || disableMove}
          >
            Move
          </Button>
          <Button
            onClick={openModal('suggestion')}
            variant="contained"
            disabled={
              isEliminated || disableSuggestion || isPlayerInHallwayOrEntry
            }
          >
            Suggest
          </Button>

          <Button
            onClick={openModal('accusation')}
            variant="contained"
            disabled={isEliminated || disableAccusation}
          >
            Accusate
          </Button>

          <Button
            onClick={sendEndTurnMessage}
            variant="contained"
            disabled={gameRoom.game_state === 'FINISHED' || !isCurrenPlayerTurn}
          >
            End Turn
          </Button>

          {gameRoom.game_state === 'FINISHED' && (
            <Button
              variant="contained"
              color="error"
              onClick={() => {
                navigate('/');
              }}
            >
              Game Ended: Exit Game
            </Button>
          )}
        </Container>

        <Container p={1}>
          {!isCurrenPlayerTurn && !isEliminated && (
            <Text color="info" fontWeight="bold">
              Waiting for {gameRoom?.current_turn} to move
            </Text>
          )}

          {currentInGamePlayer?.is_eliminated && (
            <Text color="error">You have been eliminated</Text>
          )}

          {isCurrenPlayerTurn && isPlayerInHallwayOrEntry && (
            <Text>You must be in a room to make suggestion</Text>
          )}
        </Container>
      </GameRoomSection>

      <Modal open={Boolean(modalType)} onClose={() => setModalType(null)}>
        <Container sx={modalStyle}>
          {modalType === 'movement' && (
            <MovementModalContent
              currentInGamePlayer={currentInGamePlayer}
              gameRoom={gameRoom}
              sendMoveMessage={sendMoveMessage}
              secretPassage={secretPassage}
            />
          )}
          {modalType === 'suggestion' && (
            <SolutionModalContent
              currentInGamePlayer={currentInGamePlayer}
              gameRoom={gameRoom}
              action={sendSuggestionMessage}
            />
          )}

          {modalType === 'accusation' && (
            <SolutionModalContent
              currentInGamePlayer={currentInGamePlayer}
              gameRoom={gameRoom}
              action={sendAccusationMessage}
            />
          )}
        </Container>
      </Modal>
    </>
  );
};

export default PlayerActions;
