import Message from '../../../Message/Message';
import GameRoomSection from './GameRoomSection';

const GameRoomMessages = ({ messages }: any) => {
  return (
    <GameRoomSection title="Messages:">
      {messages.map((message: any) => (
        <Message key={message.id} messageData={message} />
      ))}
    </GameRoomSection>
  );
};

export default GameRoomMessages;
