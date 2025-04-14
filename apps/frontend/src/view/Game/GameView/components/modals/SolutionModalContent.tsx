import { useState } from 'react';
import { Container, Text, Button } from '@components';
import { InputLabel, MenuItem, Select } from '@mui/material';

const SolutionModalContent = ({
  currentInGamePlayer,
  gameRoom,
  action,
}: any) => {
  const [c, setC] = useState();
  const [r, setR] = useState();
  const [w, setW] = useState();

  const handleCChange = (e: any) => {
    setC(e.target.value);
  };

  const handleRChange = (e: any) => {
    setR(e.target.value);
  };

  const handleWChange = (e: any) => {
    setW(e.target.value);
  };

  return (
    <>
      <Container display="flex" alignItems="center" gap={1} mb={2}>
        <Text>Player: {currentInGamePlayer?.character?.name}</Text>
        <Container
          sx={{
            height: '15px',
            width: '15px',
            borderRadius: '50%',
            border: '1px solid #000',
            background: currentInGamePlayer?.character.color?.toLowerCase(),
          }}
        />
      </Container>

      <Container display="flex" flexDirection="column" gap={3} mb={2}>
        <Container>
          <InputLabel id="c">Character</InputLabel>
          <Select labelId="c" value={c} onChange={handleCChange} fullWidth>
            {gameRoom?.config?.cards.map((card: any) => {
              if (card.type !== 'suspect') {
                return null;
              }
              return (
                <MenuItem
                  key={card.id}
                  value={card.name}
                  disabled={card.name === currentInGamePlayer.character.name}
                >
                  {card.name}
                </MenuItem>
              );
            })}
          </Select>
        </Container>

        <Container>
          <InputLabel id="r">Room</InputLabel>
          <Select labelId="r" value={c} onChange={handleRChange} fullWidth>
            {gameRoom?.config?.cards.map((card: any) => {
              if (card.type !== 'room') {
                return null;
              }
              return (
                <MenuItem
                  key={card.id}
                  value={card.name}
                  disabled={card.name === currentInGamePlayer.character.name}
                >
                  {card.name}
                </MenuItem>
              );
            })}
          </Select>
        </Container>

        <Container>
          <InputLabel id="w">Weapon</InputLabel>
          <Select labelId="w" value={c} onChange={handleWChange} fullWidth>
            {gameRoom?.config?.cards.map((card: any) => {
              if (card.type !== 'weapon') {
                return null;
              }
              return (
                <MenuItem
                  key={card.id}
                  value={card.name}
                  disabled={card.name === currentInGamePlayer.character.name}
                >
                  {card.name}
                </MenuItem>
              );
            })}
          </Select>
        </Container>
      </Container>

      <Button
        variant="contained"
        onClick={() => {
          if (!c || !r || !w) {
            alert('Please select all fields');
            return;
          }
          action(c, r, w);
        }}
      >
        Submit
      </Button>
    </>
  );
};

export default SolutionModalContent;
