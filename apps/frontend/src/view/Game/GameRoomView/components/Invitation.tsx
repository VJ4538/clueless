import { Container, Text } from '@components';
import { IconButton, Tooltip } from '@mui/material';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const Invitation = () => {
  const { roomId } = useParams();

  const handleCopyToClipboard = () => {
    if (roomId) {
      try {
        navigator.clipboard.writeText(roomId);
        toast.dismiss();
        toast('Code Copied');
      } catch (err) {
        console.error('Failed to copy: ', err);
      }
    }
  };

  return (
    roomId && (
      <Container display="flex" gap={1} alignItems="center">
        <Text variant="h6" color="primary" fontWeight={500}>
          #️⃣ Invitation:
        </Text>

        <Tooltip title="Click to Copy">
          <IconButton
            onClick={handleCopyToClipboard}
            size="small"
            disableRipple
          >
            {roomId}
          </IconButton>
        </Tooltip>
      </Container>
    )
  );
};

export default Invitation;
