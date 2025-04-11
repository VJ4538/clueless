import React from 'react';

type HallwayProps = {
  id: string;
  players?: { id: number; name: string; color: string }[]; //TODO
};


const Hallway = ({ id, players = [] }: HallwayProps) => {
  return (
    <div style={{
      backgroundColor: '#E9E3E0',
      border: '1px dashed #666',
      height: '80px',
    }}>
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
    {id}
  </div>
  );
};

export default Hallway;
