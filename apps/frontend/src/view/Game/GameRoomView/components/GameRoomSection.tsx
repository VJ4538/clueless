import { Container, Text } from '@components';

interface GameRoomSectionProps {
  children: React.ReactNode;
  title?: string;
  maxHeight?: string;
  minHeight?: string;
}

const GameRoomSection = ({
  children,
  title,
  minHeight,
  maxHeight = '300px',
}: GameRoomSectionProps) => {
  return (
    <Container width="100%">
      {title && (
        <Text variant="h6" color="primary">
          {title}
        </Text>
      )}

      <Container
        border={1}
        borderRadius={1}
        p={2}
        overflow="auto"
        minHeight={minHeight}
        maxHeight={maxHeight}
      >
        {children}
      </Container>
    </Container>
  );
};

export default GameRoomSection;
