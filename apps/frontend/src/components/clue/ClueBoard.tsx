import Room from './Room';
import Hallway from './Hallway';

const Spacer = () => <div style={{ backgroundColor: 'transparent' }} />;

const ClueBoard = ( gameBoard: any ) => {
  console.log(gameBoard);
  gameBoard = gameBoard.gameBoard;
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(7, 1fr)',
      gridTemplateRows: 'repeat(7, 1fr)',
      gap: '1px',
      width: '100%',
      maxWidth: '800px',
      margin: 'auto',
      padding: '1rem',
    }}>

      <Spacer />
      <Spacer />
      <Spacer />
      <Spacer />
      <Hallway id="hallway-0" players={gameBoard?.players}/>
      <Spacer />
      <Spacer />
      

      <Spacer />
      <Room name="Study" shortcutTo='Kitchen' players={gameBoard.players}/>
      <Hallway id="hallway-1" players={gameBoard?.players}/>
      <Room name="Hall" players={gameBoard?.players}/>
      <Hallway id="hallway-2" players={gameBoard?.players}/>
      <Room name="Lounge" shortcutTo='Conservatory' players={gameBoard?.players}/>
      <Spacer />

      <Hallway id="hallway-3"/>
      <Hallway id="hallway-4"/>
      <Spacer />
      <Hallway id="hallway-5"/>
      <Spacer />
      <Hallway id="hallway-6"/>
      <Hallway id="hallway-7"/>

      <Spacer />
      <Room name="Library" />
      <Hallway id="hallway-8"/>
      <Room name="Billiard Room" />
      <Hallway id="hallway-9"/>
      <Room name="Dining Room" />
      <Spacer />

      <Hallway id="hallway-10"/>
      <Hallway id="hallway-11"/>
      <Spacer />
      <Hallway id="hallway-12"/>
      <Spacer />
      <Hallway id="hallway-13"/>
      <Spacer />

      <Spacer />
      <Room name="Conservatory" shortcutTo='Lounge' />
      <Hallway id="hallway-14"/>
      <Room name="Ballroom" />
      <Hallway id="hallway-15"/>
      <Room name="Kitchen" shortcutTo='Study' />
      <Spacer />

      <Spacer />
      <Spacer />
      <Hallway id="hallway-16"/>
      <Spacer />
      <Hallway id="hallway-17"/>
      <Spacer />
      <Spacer />
    </div>
  );
};

export default ClueBoard;
