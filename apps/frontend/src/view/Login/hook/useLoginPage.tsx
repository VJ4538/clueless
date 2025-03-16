import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../../../context/appContext';
import { useMemo } from 'react';

const useLoginPage = () => {
  const { gameRoomId, setGameRoomId } = useAppContext();
  const navigate = useNavigate();

  const enableJoinRoom = useMemo(() => gameRoomId !== '', [gameRoomId]);

  const handleSetGameRoomId = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGameRoomId(e?.target?.value || '');
  };

  const handleStartNewRoom = async () => {
    setGameRoomId('');
    // TODO: API call to create a new room
    // Game ID is returned from the API call
    try {
      const mockApiResponse = 'newGameRoomId';
      navigate(`/room/${mockApiResponse}`);
    } catch (error) {
      console.error('Error creating new room', error);
    }
  };

  const handleJoinRoom = async () => {
    // TODO: API call to join a room
    // Validate the room id
    // If valid, navigate to the game page
    try {
      const mockApiResponse = 'success';
      if (mockApiResponse === 'success') {
        navigate(`/room/${gameRoomId}`);
      } else {
        throw new Error('Error joining room');
      }
    } catch (error) {
      console.error('Error creating new room', error);
    }
  };

  return {
    handleSetGameRoomId,
    enableJoinRoom,
    handleStartNewRoom,
    gameRoomId,
    handleJoinRoom,
  };
};

export default useLoginPage;
