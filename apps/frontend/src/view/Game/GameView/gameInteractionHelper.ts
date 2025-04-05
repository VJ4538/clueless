const sendGameMove = (
  ws: WebSocket,
  player: string,
  location: string,
  roomId: string
) => {
  const message = {
    action: 'move',
    player,
    room_id: roomId,
    payload: {
      location,
    },
  };

  ws.send(JSON.stringify(message));
};




