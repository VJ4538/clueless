import { createContext, useContext, useState, useMemo } from 'react';

interface AppContextData {
  gameRoomId: string | null;
  setGameRoomId: (id: string) => void;
}

const AppContext = createContext<AppContextData | undefined>(undefined);

export default function AppContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [gameRoomId, setGameRoomId] = useState<string>('');

  const values = useMemo(
    () => ({
      gameRoomId,
      setGameRoomId,
    }),
    [gameRoomId]
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
