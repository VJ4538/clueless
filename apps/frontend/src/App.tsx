import { useState } from 'react';
import client from './helpers/https';

function App() {
  const [message, setMessage] = useState(null);

  const handleAPICall = async (message = 'FE => BE') => {
    const apiResponse = await client.get<any>(
      `testing/formatMessage?payload=${message}`
    );
    setMessage(apiResponse?.data?.message || 'No message');
  };

  return (
    <div>
      <h1>Hello World</h1>
      <button onClick={() => handleAPICall()}>Call API</button>
      <p>Message: {message}</p>
    </div>
  );
}

export default App;
