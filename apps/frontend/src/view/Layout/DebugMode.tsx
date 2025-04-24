import { useAppContext } from '@appContext';
import { Button, Container, Text } from '@components';

const DebugMode = () => {
  const { toggleDebugMode } = useAppContext();

  return (
    <Container p={1} display="flex" alignItems="center" gap={1}>
      <Text color="error" fontWeight={700}>
        {' '}
        Debug Mode On
      </Text>

      <Container>
        <Container display="flex" alignItems="center" gap={1}>
          <Text color="error" my={0.5}>
            Min player to start game: 2 (debug mode) 4 (Non debug mode)
          </Text>
        </Container>

        <Container display="flex" alignItems="center" gap={1}>
          <Button variant="outlined" color="error" size="small" href="/">
            Reset Game
          </Button>

          <Button
            variant="outlined"
            color="error"
            size="small"
            onClick={toggleDebugMode}
          >
            Turn Debug Mode off
          </Button>
        </Container>
      </Container>
    </Container>
  );
};

export default DebugMode;
