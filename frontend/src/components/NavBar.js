import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <AppBar position="static" sx={{ backgroundColor: "#2C3E50" }}>
      <Toolbar style={{ display: "flex", justifyContent: "space-between" }}>
        <div>
          <Button variant="h3" component={Link} to="/">
            <Typography
              variant="h9"
              sx={{ fontSize: "1.5rem", fontWeight: "bold" }}
            >
              Service Center
            </Typography>
            
          </Button>
        </div>
        <div>
          <Button color="inherit" component={Link} to="/components">
            Components
          </Button>
          <Button color="inherit" component={Link} to="/vehicles">
            Vehicles
          </Button>
          <Button color="inherit" component={Link} to="/issues">
            Issues
          </Button>
          <Button color="inherit" component={Link} to="/report">
            Reports
          </Button>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar