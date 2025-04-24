import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../../../context/appContext';
import { client } from '@helpers';
import { storeTempUserData } from '@helpers';
import { toast } from 'react-toastify';

const useLoginPage = () => {
  const { userInputGameRoomId, setUserInputGameRoomId } = useAppContext();
  const navigate = useNavigate();

  const createRoom = async () => {
    try {
      const { data: apiResponse }: any = await client.post('room/create');
      const room = apiResponse?.room;

      return {
        room,
        user: apiResponse?.user,
      };
    } catch (error) {
      console.error('Error creating new room', error);
      return {
        room: null,
        user: null,
      };
    }
  };

  const setTempUser = (userData: any, gameRoomId: string) => {
    const { id, name, is_host } = userData;

    const user = {
      id,
      name,
      gameRoomId,
      isHost: is_host,
    };

    storeTempUserData(user);
  };

  const handleStartNewRoom = async () => {
    setUserInputGameRoomId('');
    try {
      const { room, user } = await createRoom();

      if (room && user) {
        setTempUser(user, room.id);
        navigate(`/room/${room.id}`);
      }
    } catch (error) {
      console.error('Error creating new room', error);
    }
  };

  const handleJoinRoom = async () => {
    try {
      const { data: apiResponse } = await client.post(`room/join`, {
        game_id: userInputGameRoomId,
      });

      if (apiResponse.message !== 'Joined Room') {
        throw Error(apiResponse.message);
      }

      const room = apiResponse?.room;

      setTempUser(apiResponse?.user, room?.id);

      navigate(`/room/${room?.id}`);
    } catch (error) {
      toast.error(`${error}`);
      console.error('Error joining new room', error);
    }
  };

  return {
    handleStartNewRoom,
    handleJoinRoom,
  };
};

export default useLoginPage;
