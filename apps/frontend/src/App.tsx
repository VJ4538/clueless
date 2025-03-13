import { useState } from 'react';
import { client } from '@helpers';
import { Text, Button, Container } from '@components';

function App() {
  const [message, setMessage] = useState<string | null>(null);

  const handleAPICall = async (message = 'FE => BE') => {
    try {
      const apiResponse = await client.get<any>(
        `testing/formatMessage?payload=${message}`
      );
      setMessage(apiResponse?.data?.message || 'No message');
    } catch (error: any) {
      console.error(error);
      setMessage(error?.message || 'Error calling API');
    }
  };

  return (
    <Container>
      <Text variant="h2" color="primary">
        Hello World
      </Text>
      <Button onClick={() => handleAPICall()} variant="outlined" size="small">
        Call API
      </Button>
      <Text variant="body1">Message: {message}</Text>
    </Container>
  );
}

export default App;
