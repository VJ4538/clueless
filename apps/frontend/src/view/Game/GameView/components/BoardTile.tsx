import Container from '../../../../components/Container';
import Text from '../../../../components/Text';

interface Props {
  id: string;
  type: 'room' | 'hallway' | 'empty' | 'entry';
  players: any;
  label?: string;
  secretPassageTo?: string;
}

const entryTitlePositionMapping: any = {
  'entry-1': {
    alignSelf: 'end',
    justifySelf: 'start',
  },
  'entry-2': {
    alignSelf: 'end',
    justifySelf: 'end',
  },
  'entry-3': {
    alignSelf: 'start',
    justifySelf: 'end',
  },
  'entry-5': {
    alignSelf: 'start',
    justifySelf: 'end',
  },
  'entry-8': {
    alignSelf: 'start',
    justifySelf: 'end',
  },
};

const BoardTile = ({ id, type, label, secretPassageTo, players }: Props) => {
  const size = type === 'entry' || type === 'empty' ? '70px' : '115px';
  const finalSx = type === 'entry' ? entryTitlePositionMapping[id] : {};

  return (
    <Container
      key={id}
      width={size}
      height={size}
      bgcolor={type === 'room' ? '#E9E3E0' : '#FFFFFF'}
      display="flex"
      justifyContent="center"
      alignItems="center"
      border={type === 'empty' ? 0 : 1}
      sx={finalSx}
    >
      <Container>
        <Container alignSelf="start">
          <Text fontWeight={600} textAlign="center">
            {label}
          </Text>
        </Container>

        {players.map(
          (player: any) =>
            player.current_location === id && (
              <Container
                display="flex"
                justifyContent="center"
                alignItems="center"
                gap={0.25}
              >
                <Container
                  sx={{
                    height: '10px',
                    width: '10px',
                    minWidth: '10px',
                    borderRadius: '50%',
                    border: '1px solid #000',
                    background: player?.character.color?.toLowerCase(),
                  }}
                />
                <Text fontSize={12}>{player?.character.name}</Text>
              </Container>
            )
        )}

        {secretPassageTo && (
          <Text variant="caption" color="primary" textAlign="center">
            Shortcut {secretPassageTo}
          </Text>
        )}
      </Container>
    </Container>
  );
};

export default BoardTile;
