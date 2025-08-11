import { Router } from 'express';
import { authenticateToken } from '../middleware/auth';
import { addProject, listProjects, updateProjectData, removeProject } from '../controllers/projectController';

const router = Router();

router.get('/', authenticateToken, listProjects);
router.post('/', authenticateToken, addProject);
router.put('/:id', authenticateToken, updateProjectData);
router.delete('/:id', authenticateToken, removeProject);

export default router;
