import { useAppContext } from '@appContext';
import Container from '../../../../components/Container';
import BoardTile from './BoardTile';
import { memo } from 'react';

const ClueBoard = () => {
  const { gameRoom } = useAppContext();

  const gameBoard = gameRoom?.config?.gameboard;
  const boardSize = gameRoom?.config?.gameboard_size;
  const players = gameRoom?.players;

  return (
    <Container
      sx={{
        display: 'grid',
        gridTemplateColumns: `repeat(${boardSize}, 1fr)`,
        gridTemplateRows: `repeat(${boardSize}, 1fr)`,
      }}
    >
      {gameBoard &&
        gameBoard.map(({ id, type, label, secretPassageTo }: any) => (
          <BoardTile
            key={id}
            id={id}
            type={type}
            label={label}
            players={players}
            secretPassageTo={secretPassageTo}
            backgroundImage={
              type === 'room'
                ? `/images/${label.replace(/\s/g, '')}.png`
                : type === 'hallway'
                ? `/images/Hallway.png`
                : undefined
            }
          />
        ))}
    </Container>
  );
};

export default memo(ClueBoard);
