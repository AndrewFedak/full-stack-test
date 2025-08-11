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
import { useUpdateProject } from '../hooks/useProjects';
import { ApiError, Project } from '../services/api';

interface EditProjectDialogProps {
  open: boolean;
  project: Project;
  onClose: () => void;
}

export const EditProjectDialog: React.FC<EditProjectDialogProps> = ({ open, project, onClose }) => {
  const [repoPath, setRepoPath] = useState(`${project.owner}/${project.name}`);
  const updateProjectMutation = useUpdateProject();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateProjectMutation.mutate(
      { id: project.id, data: { repoPath } },
      {
        onSuccess: () => {
          onClose();
        },
      }
    );
  };

  const handleClose = () => {
    if (!updateProjectMutation.isPending) {
      setRepoPath(`${project.owner}/${project.name}`);
      onClose();
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>Update GitHub Repository</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <Typography variant="body2" color="textSecondary" gutterBottom>
            Enter the new repository path in the format: owner/repository
          </Typography>
          <Typography variant="body2" color="textSecondary" gutterBottom>
            Example: facebook/react
          </Typography>
          
          {updateProjectMutation.isError && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {(updateProjectMutation.error as ApiError).message || 'Failed to update project'}
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
            disabled={updateProjectMutation.isPending}
            helperText="Format: owner/repository"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} disabled={updateProjectMutation.isPending}>
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            disabled={!repoPath.trim() || updateProjectMutation.isPending}
          >
            {updateProjectMutation.isPending ? <CircularProgress size={20} /> : 'Update Project'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};
