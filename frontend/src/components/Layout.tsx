import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
  Fab,
} from '@mui/material';
import { Add, Logout } from '@mui/icons-material';
import { ProjectList } from './ProjectList';
import { AddProjectDialog } from './AddProjectDialog';

export const Layout: React.FC = () => {
  const [isAddDialogOpen, setIsAddDialogOpen] = React.useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            GitHub CRM
          </Typography>
          <Button
            color="inherit"
            startIcon={<Logout />}
            onClick={handleLogout}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      
      <Container maxWidth="xl" sx={{ mt: 2, mb: 2 }}>
        <ProjectList />
      </Container>

      <Fab
        color="primary"
        aria-label="add"
        sx={{ position: 'fixed', bottom: 16, right: 16 }}
        onClick={() => setIsAddDialogOpen(true)}
      >
        <Add />
      </Fab>

      <AddProjectDialog
        open={isAddDialogOpen}
        onClose={() => setIsAddDialogOpen(false)}
      />
    </Box>
  );
};
