import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../../../context/appContext';
import { useMemo } from 'react';
import { client } from '@helpers';

const useLoginPage = () => {
  const { gameRoom, setGameRoom, gameRoomId, setGameRoomId } = useAppContext();
  const navigate = useNavigate();

  const enableJoinRoom = useMemo(() => gameRoom, [gameRoom]);

  const handleSetGameRoomId = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGameRoomId(e?.target?.value || '');
  };

  const handleStartNewRoom = async () => {
    setGameRoomId('');
    // TODO: API call to create a new room
    // Game ID is returned from the API call
    try {
      const apiResponse: any = await client.post('room/create');
      const room = apiResponse?.data?.response;

      setGameRoom(room);

      navigate(`/room/${room.id}`);
    } catch (error) {
      console.error('Error creating new room', error);
    }
  };

  const handleJoinRoom = async () => {
    // TODO: API call to join a room
    // Validate the room id
    // If valid, navigate to the game page
    try {
      const apiResponse: any = await client.get(
        `room/join?room_id=${gameRoomId}`
      );

      const room = apiResponse?.data;

      console.log('Join Room', room);

      setGameRoom(room);

      navigate(`/room/${room?.id}`);

      // const mockApiResponse = 'success';
      // if (mockApiResponse === 'success') {
      // } else {
      //   throw new Error('Error joining room');
      // }
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
