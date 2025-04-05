import { Button, Container, Text } from '@components';
import { useParams } from 'react-router-dom';

const Invitation = () => {
  const { roomId } = useParams();

  const handleCopyToClipboard = () => {
    if (roomId) {
      try {
        navigator.clipboard.writeText(roomId);
      } catch (err) {
        console.error('Failed to copy: ', err);
      }
    }
  };

  return (
    roomId && (
      <Container display="flex" gap={1} alignItems="center">
        <Text>Share Game Room Invite: {roomId}</Text>
        <Button
          onClick={handleCopyToClipboard}
          variant="contained"
          size="small"
        >
          Copy
        </Button>
      </Container>
    )
  );
};

export default Invitation;
