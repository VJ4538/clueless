import React from 'react';

type RoomProps = {
  name: string;
  players?:{ id: number; name: string; color: string }[]; //TODO
  shortcutTo?: string;
};

const Room = ({ name, players = [], shortcutTo }: RoomProps) => {
  return (
    <div style={{
      backgroundColor: '#DBE6FC',
      border: '2px solid #333',
      borderRadius: '1px',
      height: '80px',
    }}>
      <div style={{
        textAlign: 'center',
        fontWeight: 'bold',
      }}>
        {name}
        {players.map(player => (
          <div
            key={player.id}
            title={player.name}
            style={{
              width: '12px',
              height: '12px',
              borderRadius: '50%',
              backgroundColor: player.color,
              border: '1px solid black',
              margin: '2px',
            }}>
          {player.name} </div>
        ))}
      </div>
      <div>
        {shortcutTo && (
          <div className="shortcut">Shortcut to {shortcutTo}</div>
        )}
      </div>
    </div>
  );
};

export default Room;
