import { Container, Text } from '@components';

interface GameRoomSectionProps {
  children: React.ReactNode;
  title: string;
}

const GameRoomSection = ({ children, title }: GameRoomSectionProps) => {
  return (
    <Container width="100%" overflow="auto" maxHeight="300px">
      <Text variant="h6" color="primary">
        {title}
      </Text>

      <Container border={1} borderRadius={1} p={2}>
        {children}
      </Container>
    </Container>
  );
};

export default GameRoomSection;
