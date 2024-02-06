import React, { useEffect, useState } from 'react';
import { ActionIcon, Paper, Flex, Text, TextInput, RingProgress } from '@mantine/core';
import { IconEdit, IconTrash } from '@tabler/icons-react';
import { TaskProps } from '../interfaces/task';
import TaskModal from './modal';
import { useDisclosure } from '@mantine/hooks';
import { updateTask } from '../api/tasks';
import { useAuthContext } from '../hooks/use-auth';

const Task: React.FC<TaskProps> = ({ task, completedSubtasks, getTasks, deleteTask, setLoading }) => {
  const [opened, { open, close }] = useDisclosure(false);
  const [prevTitle, setPrevTitle] = useState('');
  const { user } = useAuthContext();
  const [editing, setEditing] = useState(false);

  const completedCount = completedSubtasks[task.id]?.completed || 0;
  const totalCount = completedSubtasks[task.id]?.total || 0;
  const completedString =
    completedCount === 0
      ? 'You have no subtasks yet. Add one now!'
      : `You have completed ${completedCount} out of ${totalCount} tasks. Add a maximum of 8 tasks.`;

  const percentage = totalCount !== 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  let backgroundColor = '';

  if (editing) {
    backgroundColor = 'var(--mantine-color-yellow-light)';
  } else if (percentage === 100) {
    backgroundColor = 'var(--mantine-color-green-light)';
  }

  const [taskData, setTaskData] = useState({
    title: '',
    completed: false,
  });

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = event.currentTarget.value;
    setTaskData((prevData) => ({
      ...prevData,
      title: newTitle,
    }));
  };

  const onEditing = () => {
    setEditing(true);
    setPrevTitle(taskData.title);
  };

  const onEdited = async () => {
    if (taskData.title !== prevTitle) {
      try {
        setLoading(true);
        await updateTask(task, taskData, user);
      } catch (error) {
        console.error('Error making API call:', error);
      }
    } else if (taskData.title === prevTitle) {
      setPrevTitle('');
      setEditing(false);
      setLoading(false);
      return;
    }

    await getTasks();

    setPrevTitle('');
    setEditing(false);
    setLoading(false);
  };

  useEffect(() => {
    if (task.title !== '') {
      setTaskData((prevData) => ({
        ...prevData,
        title: task.title,
      }));
    }
  }, []);

  return (
    <React.Fragment>
      <Paper
        style={{ justifyContent: 'space-between' }}
        bg={backgroundColor}
        display='flex'
        shadow='xs'
        withBorder
        p='lg'
        mb={20}
      >
        <Flex align='center'>
          <TextInput
            variant='unstyled'
            size='xl'
            placeholder='Enter your task'
            value={taskData.title}
            onBlur={() => onEdited()}
            onFocus={onEditing}
            onChange={handleTitleChange}
          />
          <RingProgress
            sections={[{ value: percentage, color: 'blue' }]}
            label={
              <Text c='blue' fw={700} ta='center' size='xl'>
                {percentage}%
              </Text>
            }
          />
        </Flex>
        <Flex align='center'>
          {!editing && (
            <React.Fragment>
              <ActionIcon variant='light' onClick={() => open()} size={'lg'} mr='10px' aria-label='Edit'>
                <IconEdit style={{ width: '70%', height: '70%' }} stroke={1.5} />
              </ActionIcon>
              <ActionIcon
                variant='light'
                size={'lg'}
                onClick={() => deleteTask(task.id)}
                color='red'
                aria-label='Delete'
              >
                <IconTrash style={{ width: '70%', height: '70%' }} stroke={1.5} />
              </ActionIcon>
            </React.Fragment>
          )}
        </Flex>
      </Paper>
      <TaskModal
        open={open}
        opened={opened}
        task={task}
        completedString={completedString}
        getTasks={getTasks}
        onClose={close}
        setData={setTaskData}
        taskData={taskData}
      />
    </React.Fragment>
  );
};

export default Task;
