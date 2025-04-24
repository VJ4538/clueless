import { Login, Game } from '@view';
import { Routes as RouterRoutes, Route, Navigate } from 'react-router-dom';
import Layout from './view/Layout/Layout';

const gameRoutes = [{ path: '/room/:roomId', element: <Game /> }];

const authRoutes = [{ path: '/', element: <Login /> }];

function AppRoutes() {
  return (
    <RouterRoutes>
      <Route element={<Layout />}>
        {authRoutes.map(({ path, element }) => (
          <Route key={path} path={path} element={element} />
        ))}

        {gameRoutes.map(({ path, element }) => (
          <Route key={path} path={path} element={element} />
        ))}
      </Route>

      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </RouterRoutes>
  );
}

export default AppRoutes;
