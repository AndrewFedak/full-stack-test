import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Alert,
  CircularProgress,
  Typography,
} from '@mui/material';
import { useAddProject } from '../hooks/useProjects';

interface AddProjectDialogProps {
  open: boolean;
  onClose: () => void;
}

export const AddProjectDialog: React.FC<AddProjectDialogProps> = ({ open, onClose }) => {
  const [repoPath, setRepoPath] = useState('');
  const addProjectMutation = useAddProject();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addProjectMutation.mutate({ repoPath }, {
      onSuccess: () => {
        setRepoPath('');
        onClose();
      },
    });
  };

  const handleClose = () => {
    if (!addProjectMutation.isPending) {
      setRepoPath('');
      onClose();
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>Add GitHub Repository</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <Typography variant="body2" color="textSecondary" gutterBottom>
            Enter the repository path in the format: owner/repository
          </Typography>
          <Typography variant="body2" color="textSecondary" gutterBottom>
            Example: facebook/react
          </Typography>
          
          {addProjectMutation.isError && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {addProjectMutation.error?.response?.data?.message || 'Failed to add project'}
            </Alert>
          )}

          <TextField
            autoFocus
            margin="dense"
            label="Repository Path"
            type="text"
            fullWidth
            variant="outlined"
            value={repoPath}
            onChange={(e) => setRepoPath(e.target.value)}
            placeholder="facebook/react"
            disabled={addProjectMutation.isPending}
            helperText="Format: owner/repository"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} disabled={addProjectMutation.isPending}>
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            disabled={!repoPath.trim() || addProjectMutation.isPending}
          >
            {addProjectMutation.isPending ? <CircularProgress size={20} /> : 'Add Project'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};
