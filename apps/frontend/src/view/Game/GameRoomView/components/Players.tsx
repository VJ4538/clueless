import { Text } from '@components';
import GameRoomSection from './GameRoomSection';
import { getTempUserData } from '@helpers';

interface Player {
  id: string;
  name: string;
  character: string | null;
  is_host: boolean;
  current_location: string | null;
  has_moved: boolean;
  cards: string[];
}

interface PlayersProps {
  players: Player[];
}

const Players = ({ players }: PlayersProps) => {
  const currentPlayer = getTempUserData();

  if (!currentPlayer) {
    return null;
  }

  return (
    <GameRoomSection title="Players:">
      {players.map((player: any, index: number) => (
        <Text key={player.id}>
          {index + 1}. {player.name}
          {player.is_host
            ? ' ⭐ (Host)'
            : currentPlayer.id === player.id && ' (You)'}
        </Text>
      ))}
    </GameRoomSection>
  );
};

export default Players;
