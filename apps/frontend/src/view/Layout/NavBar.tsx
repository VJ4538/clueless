import { List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import { Link } from 'react-router-dom';

const NavBar = () => (
  <List sx={{ display: 'flex', flexDirection: 'row' }}>
    <ListItem disablePadding sx={{ width: 'auto' }}>
      <ListItemButton component={Link} to="/">
        <ListItemText primary="Home" />
      </ListItemButton>
    </ListItem>
    {/* <ListItem disablePadding sx={{ width: 'auto' }}>
      <ListItemButton component={Link} to="/game">
        <ListItemText primary="Game" />
      </ListItemButton>
    </ListItem>
    <ListItem disablePadding sx={{ width: 'auto' }}>
      <ListItemButton component={Link} to="/game">
        <ListItemText primary="GameRoom" />
      </ListItemButton>
    </ListItem> */}
  </List>
);

export default NavBar;
