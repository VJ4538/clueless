export interface User {
  id: string;
  name: string;
  gameRoomId: string | null;
  isHost: boolean;
  cards: Card[];
}

type AuthUser = Pick<User, 'id' | 'name' | 'gameRoomId' | 'isHost'>;

interface Card {
  id: string;
  name: string;
  color: string;
  type: string;
}

const storeTempUserData = (user: AuthUser) => {
  try {
    sessionStorage.setItem('user', JSON.stringify(user));
  } catch (e) {
    console.error('Failed to store user:', e);
  }
};

const getTempUserData = () => {
  try {
    const stored = sessionStorage.getItem('user');
    return stored ? (JSON.parse(stored) as User) : null;
  } catch (e) {
    console.error('Failed to retrieve user:', e);
    return null;
  }
};

export { storeTempUserData, getTempUserData };
