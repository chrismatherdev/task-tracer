import { TaskInterface } from '../interfaces/task';

export const fetchTasks = async (user: any) => {
  console.log(user, 'fetch tasks user');
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

export const addNewTask = async (user: any, newTask: any) => {
  return await fetch('http://localhost:3001/api/task', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${user.token}`,
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
  user: any,
) => {
  return await fetch('http://localhost:3001/api/task', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${user.token}`,
    },
    body: JSON.stringify({
      taskId: task.id,
      newTitle: taskData.title,
    }),
  });
};

export const deleteTask = async (user: any, taskId: any) => {
  const response = await fetch('http://localhost:3001/api/task', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${user.token}`,
    },
    body: JSON.stringify({ id: taskId }),
  });

  return await response.json();
};
