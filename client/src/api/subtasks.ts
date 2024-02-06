import { TaskInterface } from '../interfaces/task';

export const fetchSubtasks = async (user: any, task: TaskInterface) => {
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

export const addNewSubtask = async (user: any, blankTask: any) => {
  return await fetch('http://localhost:3001/api/subtask', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${user.token}`,
    },
    body: JSON.stringify(blankTask),
  });
};

export const deleteSubtask = async (user: any, taskId: any) => {
  return await fetch('http://localhost:3001/api/subtask', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${user.token}`,
    },
    body: JSON.stringify({ id: taskId }),
  });
};

export const updateSubtask = async (task: any, taskData: any, user: any) => {
  return await fetch('http://localhost:3001/api/subtask', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${user.token}`,
    },
    body: JSON.stringify({
      id: task.id,
      title: taskData.title,
      completed: taskData.completed,
    }),
  });
};
