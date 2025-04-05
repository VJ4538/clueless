const roomWebSocketConnector = (
  roomId: string,
  helpers: {
    setWs: any;
    setGameRoom: any;
    navigate: any;
    currentPlayer: any;
    setUserInputGameRoomId: any;
  }
) => {
  const {
    setGameRoom,
    setWs,
    navigate,
    currentPlayer,
    setUserInputGameRoomId,
  } = helpers;

  const ws = new WebSocket(`ws://localhost:8000/ws/${roomId}`);
  setWs(ws);

  ws.onopen = () => {
    console.log('✅ WebSocket connected');
    ws.send(JSON.stringify({ action: 'REQUSET_ROOM_DATA' }));
  };

  ws.onmessage = (event: any) => {
    const message = JSON.parse(event.data);
    console.log('Message from server:', message);

    switch (message.type) {
      case 'UPDATE_ROOM_DATA':
        const roomData = JSON.parse(message.payload);
        console.log('UPDATE_ROOM_DATA', roomData);
        setGameRoom(roomData);
        break;

      case 'QUIT_FROM_ROOM_SUCCESS':
        if (currentPlayer.id === message.player_id) {
          navigate('/');
          setUserInputGameRoomId('');
        }
        break;

      default:
        console.log('No action');
    }
  };

  ws.onclose = () => {
    console.log('WebSocket disconnected');
  };

  ws.onerror = (error: any) => {
    console.error('WebSocket error:', error);
  };
};

const sendWSMessage = (ws: WebSocket, message: Object) => {
  const stringifyMessage = JSON.stringify(message);
  ws.send(stringifyMessage);
};

export { sendWSMessage, roomWebSocketConnector };
