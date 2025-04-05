import { Container, Text } from '@components';
import dayjs from 'dayjs';
import { useMemo } from 'react';

export interface MessageProps {
  id: string;
  message: string;
  player_name: string;
  timeStamp: string;
}

interface Props {
  messageData: MessageProps;
}

const Message = ({ messageData }: Props) => {
  const { id, message, player_name, timeStamp } = messageData;
  const formattedTime = useMemo(() => {
    return dayjs(timeStamp).format('MM-DD-YYYY : HH:mm:ss');
  }, [timeStamp]);

  return (
    <Container key={id} display="flex" alignItems="center" gap={2}>
      <Container>
        <Text color="textDisabled">{formattedTime} :</Text>
      </Container>

      <Container display="flex" alignItems="center" gap={0.5}>
        <Text fontWeight={600}>{player_name}</Text>
        <Text>{message}</Text>
      </Container>
    </Container>
  );
};

export default Message;
