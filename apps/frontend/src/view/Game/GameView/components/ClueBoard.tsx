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
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${boardSize}, 1fr)`,
        gridTemplateRows: `repeat(${boardSize}, 1fr)`,
        width: '100%',
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
          />
        ))}
    </Container>
  );
};

export default memo(ClueBoard);
