import { Button, Text } from '@components';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import { useState } from 'react';

const LearnMoreAboutGame = () => {
  const [openLearnMore, setOpenLearnMore] = useState(false);

  const handleOpenLearnMore = () => {
    setOpenLearnMore(true);
  };

  const handleCloseLearnMore = () => {
    setOpenLearnMore(false);
  };

  return (
    <>
      <Button
        variant="text"
        fullWidth
        onClick={handleOpenLearnMore}
        sx={{ textTransform: 'unset' }}
      >
        About the game
      </Button>

      <Dialog
        open={openLearnMore}
        onClose={handleCloseLearnMore}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>About Clue</DialogTitle>
        <DialogContent dividers>
          <Text gutterBottom>
            Clue is a classic detective game where players aim to solve a murder
            mystery by deducing three key elements:
          </Text>

          <List dense>
            <ListItem>
              <ListItemText primary="Who committed the crime?" />
            </ListItem>
            <ListItem>
              <ListItemText primary="With what weapon was the crime committed?" />
            </ListItem>
            <ListItem>
              <ListItemText primary="In which room did the crime take place?" />
            </ListItem>
          </List>

          <Text gutterBottom mt={2}>
            At the start, one card from each category (Suspect, Weapon, Room) is
            placed in a confidential envelope. The remaining cards are
            distributed among players. By moving through the mansion, making
            suggestions, and observing other players' responses, you gather
            clues to identify the cards in the envelope.
          </Text>
          <Text>
            Be cautious—making an incorrect accusation can eliminate you from
            the game!
          </Text>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleCloseLearnMore} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default LearnMoreAboutGame;
