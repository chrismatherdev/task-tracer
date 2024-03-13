import React, { useEffect, useState } from 'react';
import { useAuthContext } from '../hooks/use-auth';
import { Button, Box, Flex, Loader } from '@mantine/core';
import Task from './task';
import { TaskInterface } from '../interfaces/task';
import { addNewTask, deleteTask, fetchTasks } from '../api/tasks';
import { fetchSubtasks } from '../api/subtasks';
import { useNavigate } from 'react-router-dom';

export type TCompletedSubtasks = {
  [taskId: string]: {
    completed: number;
    total: number;
  };
};

const Tasks = () => {
  const [loading, setLoading] = useState(false);
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const [tasks, setTasks] = useState<TaskInterface[]>([]);
  const [completedSubtasks, setCompletedSubtasks] = useState<TCompletedSubtasks>({});

  console.log(tasks, 'tasks!');

  const newTask = {
    title: '',
    completed: false,
    belongsToId: user?.id,
  };

  const getTasks = async () => {
    if (!user) {
      return;
    }

    try {
      setLoading(true);
      const taskRes = await fetchTasks(user);
      setTasks(taskRes.data);

      const subtaskCounts: {
        [taskId: string]: {
          completed: number;
          total: number;
        };
      } = {};

      await Promise.all(
        taskRes.data.map(async (task: TaskInterface) => {
          const subtaskRes = await fetchSubtasks(user, task);
          const completedCount = subtaskRes.data.filter((subtask: any) => subtask.completed).length;
          const totalCount = subtaskRes.data.length;
          subtaskCounts[task.id] = { completed: completedCount, total: totalCount };
        }),
      );

      setCompletedSubtasks(subtaskCounts);
    } catch (error) {
      console.error(error);
    }

    setLoading(false);
  };

  const onAddTask = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();

    try {
      setLoading(true);
      await addNewTask(user, newTask);
      getTasks();
    } catch (error) {
      console.error(error);
    }

    setLoading(false);
  };

  const onDeleteTask = async (taskId: string) => {
    try {
      setLoading(true);
      const { deletedTask } = await deleteTask(user, taskId);

      setTasks((prevTasks) => {
        const updatedTasks = prevTasks.filter((task) => task.id !== deletedTask.id);
        return updatedTasks;
      });
    } catch (error) {
      console.error('Error deleting task:', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (!user?.token) {
      navigate('/login');
    }
    getTasks();
  }, [user]);

  return (
    <Box p={50}>
      <Button mb={'15px'} onClick={(event) => onAddTask(event)} disabled={tasks.length >= 8} fullWidth>
        Add a new task
      </Button>
      {loading && (
        <Flex align='center' justify='center' p='20px'>
          <Loader color='blue' size='lg' />
        </Flex>
      )}
      {!loading && (
        <React.Fragment>
          {tasks.map((task) => (
            <Task
              key={Number(task.id)}
              task={task}
              getTasks={() => getTasks()}
              completedSubtasks={completedSubtasks}
              deleteTask={onDeleteTask}
              setLoading={setLoading}
            />
          ))}
        </React.Fragment>
      )}
    </Box>
  );
};

export default Tasks;
