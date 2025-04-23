import { Login, Game } from '@view';
import {
  Routes as RouterRoutes,
  Route,
  Navigate,
  useParams,
} from 'react-router-dom';
import Layout from './view/Layout/Layout';

const gameRoutes = [{ path: '/room/:roomId', element: <Game /> }];

const authRoutes = [{ path: '/', element: <Login /> }];

const ProtectedRoute = ({ element }: { element: React.ReactElement }) => {
  const { roomId } = useParams();

  const isAuthenticated = Boolean(roomId);

  if (!isAuthenticated) {
    console.log('Not authenticated');
  }

  return isAuthenticated ? element : <Navigate to="/" replace />;
};

function AppRoutes() {
  return (
    <RouterRoutes>
      <Route element={<Layout />}>
        {authRoutes.map(({ path, element }) => (
          <Route key={path} path={path} element={element} />
        ))}

        {gameRoutes.map(({ path, element }) => (
          <Route
            key={path}
            path={path}
            element={<ProtectedRoute element={element} />}
          />
        ))}
      </Route>

      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </RouterRoutes>
  );
}

export default AppRoutes;
