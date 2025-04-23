import { createContext, useContext, useState, useMemo } from 'react';
import { User } from '@helpers';

interface AppContextData {
  debugMode: boolean;
  toggleDebugMode: () => void;
  user: User | null;
  setUser: (user: User) => void;
  userInputGameRoomId: string;
  setUserInputGameRoomId: (id: string) => void;
  handleUpdateUserInputGameRoomId: (e: any) => void;
  gameRoom: any;
  setGameRoom: (room: any) => void;
  ws: any;
  setWs: any;
}

const AppContext = createContext<AppContextData | undefined>(undefined);

export default function AppContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<User | null>(null);
  const [debugMode, setDebugMode] = useState(true);
  const [userInputGameRoomId, setUserInputGameRoomId] = useState('');
  const [gameRoom, setGameRoom] = useState<any>(null);
  const [ws, setWs] = useState<any>(null);

  const handleUpdateUserInputGameRoomId = (e: any) => {
    setUserInputGameRoomId(e.target.value);
  };

  const toggleDebugMode = () => {
    setDebugMode(prev => !prev);
  };

  const values = useMemo(
    () => ({
      debugMode,
      toggleDebugMode,
      user,
      setUser,
      userInputGameRoomId,
      setUserInputGameRoomId,
      handleUpdateUserInputGameRoomId,
      gameRoom,
      setGameRoom,
      ws,
      setWs,
    }),
    [gameRoom, userInputGameRoomId, user, debugMode, toggleDebugMode]
  );

  return <AppContext.Provider value={values}>{children}</AppContext.Provider>;
}

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppContextProvider');
  }
  return context;
};
