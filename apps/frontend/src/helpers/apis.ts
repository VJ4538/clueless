import client from './https';

// Web Socket 

// Game Room Api
export const creatRoom = async () =>{
  try{
    
  }catch(e){
    console.error(e);
  }
}

export const joinRoom = async ()=>{
  try{

  }catch(e){

  }
}

interface StartGameAPIResponse {
  is_started: boolean;
  message: 'Game started' | 'Game conditions not met';
}

export const startGame = async () => {
  try {
    const response = await client.post<StartGameAPIResponse>('room/start-game');

    return response.data.is_started;
  } catch (e) {
    console.error(e);
    return false;
  }
};
