import { Container } from '@components';
import Message from '../../../Message/Message';
import GameRoomSection from './GameRoomSection';

const GameRoomMessages = ({ messages, minHeight }: any) => {
  return (
    <Container mb={2}>
      <GameRoomSection title="💬 Messages" minHeight={minHeight}>
        {messages.map((message: any) => (
          <Message key={message.id} messageData={message} />
        ))}
      </GameRoomSection>
    </Container>
  );
};

export default GameRoomMessages;
