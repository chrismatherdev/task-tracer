import Router from 'express';
import { createTask, removeTask, getTasks, updateTask } from './handlers/task';
import { createSubtask, removeSubtask, getSubtasks, updateSubtask } from './handlers/subtask';

const router = Router();

router.get('/task', getTasks);
router.delete('/task', removeTask);
router.post('/task', createTask);
router.put('/task', updateTask);

router.get('/subtask', getSubtasks);
router.delete('/subtask', removeSubtask);
router.post('/subtask', createSubtask);
router.put('/subtask', updateSubtask);

export default router;
