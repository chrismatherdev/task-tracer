import { TaskInterface } from '../interfaces/task';
import { User } from '../interfaces/user';

export const fetchTasks = async (user?: any) => {
  const response = await fetch('http://localhost:3001/api/task', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${user?.token}`,
      user: user?.id,
    },
  });

  return await response.json();
};

export const addNewTask = async (
  user: User | null,
  newTask?: {
    title: string;
    completed: boolean;
    belongsToId: number | undefined;
  },
) => {
  return await fetch('http://localhost:3001/api/task', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${user?.token}`,
    },
    body: JSON.stringify(newTask),
  });
};

export const updateTask = async (
  task: TaskInterface,
  taskData: {
    title: string;
    completed: boolean;
  },
  user: User | null,
) => {
  return await fetch('http://localhost:3001/api/task', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${user?.token}`,
    },
    body: JSON.stringify({
      taskId: task.id,
      newTitle: taskData.title,
    }),
  });
};

export const deleteTask = async (user: User | null, taskId: string) => {
  const response = await fetch('http://localhost:3001/api/task', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${user?.token}`,
    },
    body: JSON.stringify({ id: taskId }),
  });

  return await response.json();
};
