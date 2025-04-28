import { memo } from 'react';
import Container from '../../../../components/Container';
import Text from '../../../../components/Text';
import { nanoid } from 'nanoid';
import { Tooltip } from '@mui/material';
import PlayersOnTile from './PlayersOnTile';
import {
  entryTilePositionMapping,
  hallwayTilePositionMapping,
} from './boardConst';

interface Props {
  id: string;
  type: 'room' | 'hallway' | 'empty' | 'entry';
  players: any;
  label?: string;
  secretPassageTo?: string;
  backgroundImage?: string;
}

const verticalHallwayId = [
  'hallway-3',
  'hallway-4',
  'hallway-5',
  'hallway-8',
  'hallway-9',
  'hallway-10',
];

const BoardTile = ({ id, type, label, secretPassageTo, backgroundImage, players }: Props) => {
  const placementSx =
    type === 'entry'
      ? { ...entryTilePositionMapping[id], width: '80px', height: '80px' }
      : hallwayTilePositionMapping[id];

  return (
    <Container
      key={nanoid()}
      width="150px"
      height="150px"
      display="flex"
      flexDirection="column"
      justifyContent={type === 'hallway' ? 'center' : 'space-between'}
      alignItems="center"
      position="relative"
      bgcolor={type === 'room' ? '#E9E3E0' : '#f5f5f5'}
      border={type === 'empty' ? 0 : 1}
      p={0.2}
      sx={{
        ...placementSx,
        ...(type === 'hallway' && {
          height: verticalHallwayId.includes(id) ? '100%' : '80px',
          width: verticalHallwayId.includes(id) ? '80px' : '100%',
          margin: 'auto',
        }),
        ...(type === 'room' && {border: '6px inset white'}),
        ...(backgroundImage && {
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }),
      }}
    >
      <Text fontWeight={700} fontSize={type==='room'?16:12} color={type==='room'||type==='hallway'?'white':'black'}
        sx={{
          ...(type==='room'&&{marginTop:'15%'})
      }}>
        {label}
        {type === 'entry' && id}
      </Text>

      <Tooltip
        arrow
        title={
          ['hallway', 'room'].includes(type) && (
            <Container p={1} minWidth="150px">
              <Text mb={1}>Players Detail</Text>
              <PlayersOnTile tileId={id} players={players} toolTip />
            </Container>
          )
        }
      >
        <Container>
          <PlayersOnTile tileId={id} players={players} />
        </Container>
      </Tooltip>

      {secretPassageTo && (
        <Text variant="caption" textAlign="center" color={'white'}>
          🌀 Secret Portal ({secretPassageTo})
        </Text>
      )}
    </Container>
  );
};

export default memo(BoardTile);
