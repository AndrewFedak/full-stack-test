import React, { useState } from 'react';
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Typography,
  CircularProgress,
  Alert,
  Chip,
} from '@mui/material';
import { Refresh, Delete, Edit } from '@mui/icons-material';
import { useProjects, useDeleteProject } from '../hooks/useProjects';
import { Project } from '../services/api';
import { AddProjectDialog } from './AddProjectDialog';
import { EditProjectDialog } from './EditProjectDialog';

export const ProjectList: React.FC = () => {
  const [editProject, setEditProject] = useState<Project | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  
  const { data: projects, isLoading, error, refetch } = useProjects();
  const deleteMutation = useDeleteProject();

  const handleDelete = (id: number) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      deleteMutation.mutate(id);
    }
  };

  const handleEdit = (project: Project) => {
    setEditProject(project);
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleDateString();
  };

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ m: 2 }}>
        Failed to load projects: {error.message}
      </Alert>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" component="h1">
          GitHub Projects
        </Typography>
        <Box>
          <IconButton onClick={() => refetch()} disabled={isLoading}>
            <Refresh />
          </IconButton>
        </Box>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Owner</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>URL</TableCell>
              <TableCell align="center">Stars</TableCell>
              <TableCell align="center">Forks</TableCell>
              <TableCell align="center">Issues</TableCell>
              <TableCell>Created</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {projects?.map((project) => (
              <TableRow key={project.id} hover>
                <TableCell>{project.owner}</TableCell>
                <TableCell>
                  <Typography variant="body2" fontWeight="medium">
                    {project.name}
                  </Typography>
                </TableCell>
                <TableCell>
                  <a href={project.url} target="_blank" rel="noopener noreferrer">
                    {project.url}
                  </a>
                </TableCell>
                <TableCell align="center">
                  <Chip label={project.stars} size="small" color="primary" />
                </TableCell>
                <TableCell align="center">
                  <Chip label={project.forks} size="small" color="secondary" />
                </TableCell>
                <TableCell align="center">
                  <Chip label={project.issues} size="small" color="warning" />
                </TableCell>
                <TableCell>{formatDate(project.createdAt)}</TableCell>
                <TableCell align="center">
                  <IconButton
                    size="small"
                    onClick={() => handleEdit(project)}
                    color="primary"
                  >
                    <Edit />
                  </IconButton>
                  <IconButton
                    size="small"
                    onClick={() => handleDelete(project.id)}
                    color="error"
                    disabled={deleteMutation.isPending}
                  >
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {projects?.length === 0 && (
        <Box textAlign="center" py={4}>
          <Typography variant="h6" color="textSecondary">
            No projects found. Add your first GitHub repository!
          </Typography>
        </Box>
      )}

      <AddProjectDialog
        open={isAddDialogOpen}
        onClose={() => setIsAddDialogOpen(false)}
      />

      {editProject && (
        <EditProjectDialog
          open={!!editProject}
          project={editProject}
          onClose={() => setEditProject(null)}
        />
      )}
    </Box>
  );
};
