import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import { getTempUserData, roomWebSocketConnector } from '@helpers';
import { useAppContext } from '../../context/appContext';

const GameRoomWebSocketHandler = ({ children }: any) => {
  const currentPlayer = getTempUserData();
  const navigate = useNavigate();
  const { setGameRoom, setWs, setUserInputGameRoomId} = useAppContext();
  const { roomId } = useParams();

  useEffect(() => {
    roomWebSocketConnector(roomId || '', {
      setGameRoom,
      setWs,
      navigate,
      currentPlayer,
      setUserInputGameRoomId,
    });
  }, [roomId]);

  return children;
};

export default GameRoomWebSocketHandler;
