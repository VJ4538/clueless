import { client, getTempUserData } from '@helpers';
import { useEffect, memo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const GameAuthWrapper = ({ children }: any) => {
  const navigate = useNavigate();
  const user = getTempUserData();
  const { roomId } = useParams();

  useEffect(() => {
    const checkRoomStatus = async () => {
      try {
        const response = await client.get(`room/status?room_id=${roomId}`, {
          headers: {
            Authorization: user?.id || 'None',
          },
        });

        const isAuthed = response?.data?.is_valid_room;
        console.log('is', isAuthed);

        if (!isAuthed) {
          navigate('/');
        }
      } catch (e) {
        console.error(e);
      }
    };
    checkRoomStatus();
  }, [roomId]);

  return children;
};

export default memo(GameAuthWrapper);
