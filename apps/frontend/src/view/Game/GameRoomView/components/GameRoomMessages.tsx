import Message from '../../../Message/Message';
import GameRoomSection from './GameRoomSection';

const GameRoomMessages = ({ messages, minHeight, maxHeight }: any) => {
  return (
    <GameRoomSection
      title="💬 Messages"
      minHeight={minHeight}
      maxHeight={maxHeight}
    >
      {messages.map((message: any) => (
        <Message key={message.id} messageData={message} />
      ))}
    </GameRoomSection>
  );
};

export default GameRoomMessages;
