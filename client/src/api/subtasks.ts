import { TaskInterface } from '../interfaces/task';
import { User } from '../interfaces/user';

export const fetchSubtasks = async (user: User | null, task: TaskInterface) => {
  const response = await fetch('http://localhost:3001/api/subtask', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${user?.token}`,
      task: task?.id,
    },
  });

  return await response.json();
};

export const addNewSubtask = async (user: User | null, blankTask: any) => {
  return await fetch('http://localhost:3001/api/subtask', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${user?.token}`,
    },
    body: JSON.stringify(blankTask),
  });
};

export const deleteSubtask = async (user: User | null, taskId: string) => {
  return await fetch('http://localhost:3001/api/subtask', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${user?.token}`,
    },
    body: JSON.stringify({ id: taskId }),
  });
};

export const updateSubtask = async (
  task: TaskInterface,
  taskData: {
    title: string;
    completed: boolean;
  },
  user: User | null,
) => {
  return await fetch('http://localhost:3001/api/subtask', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${user?.token}`,
    },
    body: JSON.stringify({
      id: task.id,
      title: taskData.title,
      completed: taskData.completed,
    }),
  });
};
