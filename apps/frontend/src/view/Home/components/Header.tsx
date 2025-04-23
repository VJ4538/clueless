import { Container, Text } from '@components';

const Header = () => {
  return (
    <Container>
      <Text variant="h4" color="primary" textAlign="center" gutterBottom>
        🕵️ Welcome to Clue Online
      </Text>

      <Text textAlign="center" variant="body2" color="textSecondary" mb={4}>
        Solve the mystery… if you dare.
      </Text>
    </Container>
  );
};

export default Header;
