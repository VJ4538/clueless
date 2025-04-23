import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './AppRoutes';
import AppContextProvider from './context/appContext';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <Router>
      <AppContextProvider>
        <AppRoutes />
        <ToastContainer
          position="top-center"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          pauseOnHover={false}
          theme="dark"
        />
      </AppContextProvider>
    </Router>
  );
}

export default App;
