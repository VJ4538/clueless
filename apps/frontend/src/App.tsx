import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { Login, Game, GameRoom, TestApi } from './view/index';

function App() {
  return (
    <Router>
      <div>
        {/* Navigation links */}
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/game">Game</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/test-api">Test API</Link>
            </li>
          </ul>
        </nav>

        {/* Define Routes for different views */}
        <Routes>
          <Route path="/" element={<Game />} />
          <Route path="/game" element={<GameRoom />} />
          <Route path="/login" element={<Login />} />
          <Route path="/test-api" element={<TestApi />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
