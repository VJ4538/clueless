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
    {id}
    <div>
      {players?.map(({}) => (
        <div> x </div>
      ))}
    </div>
  </div>
  );
};

export default Hallway;
