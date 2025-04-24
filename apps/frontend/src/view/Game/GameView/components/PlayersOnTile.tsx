import { Container, Text } from '@components';
import { nanoid } from 'nanoid';
import { memo, useMemo } from 'react';

export const PlayerIndicator = ({ color, size = '13px' }: any) => {
  return (
    <Container
      sx={{
        height: size,
        width: size,
        minWidth: size,
        borderRadius: '50%',
        border: '1px solid #000',
        background: color,
      }}
    />
  );
};

const PlayersOnTile = ({ players, tileId, toolTip }: any) => {
  const playersInTile = useMemo(() => {
    const tempPlayers: any[] = [];

    players.forEach((player: any) => {
      if (player?.current_location === tileId) {
        tempPlayers.push(player);
      }
    });

    return tempPlayers;
  }, [players, tileId]);

  const fontSize = toolTip ? 15 : 12;

  if (playersInTile.length === 1) {
    return (
      <Container
        display="flex"
        justifyContent="center"
        alignItems="center"
        gap={0.25}
      >
        <PlayerIndicator
          color={playersInTile[0].character.color?.toLowerCase()}
        />
        <Text fontSize={fontSize}>{playersInTile[0]?.character.name}</Text>
      </Container>
    );
  }

  return (
    <Container
      display="flex"
      flexDirection={toolTip ? 'column' : 'row'}
      justifyContent="center"
      alignItems="center"
      gap={0.5}
    >
      {playersInTile.map((player: any) => (
        <Container key={nanoid()}>
          {toolTip ? (
            <Container display="flex" alignItems="center" gap={0.5}>
              <PlayerIndicator color={player.character.color?.toLowerCase()} />
              <Text fontSize={fontSize}>{player?.character.name}</Text>
            </Container>
          ) : (
            <PlayerIndicator color={player.character.color?.toLowerCase()} />
          )}
        </Container>
      ))}
    </Container>
  );
};

export default memo(PlayersOnTile);
