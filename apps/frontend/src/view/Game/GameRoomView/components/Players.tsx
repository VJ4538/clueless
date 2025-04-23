import { Text, Container } from '@components';
import GameRoomSection from './GameRoomSection';
import { getTempUserData } from '@helpers';
import StarIcon from '@mui/icons-material/Star';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material';

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

const Max_PLAYER = 6;

const Players = ({ players }: PlayersProps) => {
  const currentPlayer = getTempUserData();

  if (!currentPlayer) {
    return null;
  }

  return (
    <GameRoomSection
      title={`👥 Players ( ${players?.length}/ ${Max_PLAYER})`}
      p={0}
    >
      <Table size="small" padding="normal">
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: 600 }}>Name</TableCell>
            <TableCell sx={{ fontWeight: 600 }}>Role</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {players.map((player: any) => (
            <TableRow key={player.id}>
              <TableCell>
                <Container display="flex" alignItems="center" gap={1}>
                  {currentPlayer.id === player.id && (
                    <StarIcon color="warning" />
                  )}

                  <Text>{player.name}</Text>
                </Container>
              </TableCell>

              <TableCell>
                <Text> {player.is_host ? 'Host' : 'Player'}</Text>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </GameRoomSection>
  );
};

export default Players;
