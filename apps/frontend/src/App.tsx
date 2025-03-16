import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './AppRoutes';
import AppContextProvider from './context/appContext';

function App() {
  return (
    <Router>
      <AppContextProvider>
        <AppRoutes />
      </AppContextProvider>
    </Router>
  );
}

export default App;
