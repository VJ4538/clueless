type RoomProps = {
  name: string;
  players?:{ id: number; name: string; color: string }[]; //TODO
  shortcutTo?: string;
};


const Room = ({ name, shortcutTo, players }: RoomProps) => {

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
      </div>
      <div>
        {shortcutTo && (
          <div className="shortcut">Shortcut to {shortcutTo}</div>
        )}
      </div>
      <div>
        {players?.map(({}) => (
          <div> x </div>
        ))}
      </div>
    </div>
  );
};

export default Room;
