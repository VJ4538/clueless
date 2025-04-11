export interface User {
  id: string;
  name: string;
  gameRoomId: string | null;
  isHost: boolean;
}

const storeTempUserData = (user: User) => {
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
