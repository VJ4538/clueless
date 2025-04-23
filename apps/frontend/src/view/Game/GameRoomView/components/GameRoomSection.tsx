import { Container, Text } from '@components';

interface GameRoomSectionProps {
  children: React.ReactNode;
  title?: string;
  maxHeight?: string;
  minHeight?: string;
  p?: number;
}

const GameRoomSection = ({
  children,
  title,
  minHeight,
  maxHeight = '300px',
  p = 2,
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
        p={p}
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
