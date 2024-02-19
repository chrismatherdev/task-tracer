import React, { useEffect, useState } from 'react';
import { ActionIcon, Flex, Tooltip, Paper, TextInput } from '@mantine/core';
import { IconCircleCheck, IconCircleX, IconTrash } from '@tabler/icons-react';
import { updateSubtask } from '../api/subtasks';
import { SubtaskProps } from '../interfaces/subtask';
import { useAuthContext } from '../hooks/use-auth';
import { useNavigate } from 'react-router-dom';

const Subtask: React.FC<SubtaskProps> = ({ task, subtaskData, deleteSubtask, getSubtasks, setLoading }) => {
  const [editing, setEditing] = useState(false);
  const [prevTitle, setPrevTitle] = useState('');
  const { user } = useAuthContext();
  const navigate = useNavigate();

  const [taskData, setTaskData] = useState({
    title: '',
    completed: false,
  });

  let backgroundColor = '';

  if (editing) {
    backgroundColor = 'var(--mantine-color-yellow-light)';
  } else if (taskData.completed) {
    backgroundColor = 'var(--mantine-color-green-light)';
  }

  const resetTitle = () => {
    setPrevTitle('');
    setEditing(false);
    setLoading(false);
  };

  const onEditing = () => {
    setEditing(true);
    console.log(subtaskData.title, 'subtaskData.title');
    setPrevTitle(subtaskData.title);
  };

  const onEdited = async () => {
    if (taskData.title !== prevTitle) {
      try {
        setLoading(true);
        await updateSubtask(task, taskData, user);
      } catch (error) {
        navigate('/error');
      }
    } else if (taskData.title === prevTitle) {
      resetTitle();
      return;
    }

    await getSubtasks();
    resetTitle();
  };

  const onComplete = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();

    const updatedTaskData = {
      title: task.title,
      completed: !task.completed,
    };

    setTaskData((prevData) => ({
      ...prevData,
      completed: !task.completed,
    }));

    try {
      await updateSubtask(task, updatedTaskData, user);
    } catch (error) {
      console.error(error);
    }

    await getSubtasks();
  };

  useEffect(() => {
    if (task?.title !== '') {
      setTaskData((prevData) => ({
        ...prevData,
        title: task.title,
      }));
    }

    if (task?.completed !== false) {
      setTaskData((prevData) => ({
        ...prevData,
        completed: task.completed,
      }));
    }
  }, [task]);

  return (
    <Paper
      style={{ justifyContent: 'space-between' }}
      variant='light'
      bg={backgroundColor}
      display='flex'
      shadow='xs'
      withBorder
      p='lg'
      mb={20}
    >
      <Flex align={'center'}>
        <TextInput
          variant='unstyled'
          placeholder='Enter your task'
          onFocus={() => onEditing()}
          onBlur={() => onEdited()}
          value={taskData.title}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setTaskData((prevData) => ({
              ...prevData,
              title: event.target.value,
            }))
          }
        />
      </Flex>
      <Flex align='center'>
        {!editing && (
          <React.Fragment>
            <Tooltip label={taskData.completed ? 'Unmark as complete' : 'Mark as complete'}>
              <ActionIcon
                variant='light'
                onClick={(event) => onComplete(event)}
                size={'lg'}
                color={taskData.completed ? 'yellow' : 'green'}
                mr='10px'
                aria-label='Edit'
              >
                {taskData.completed ? (
                  <IconCircleX style={{ width: '70%', height: '70%' }} stroke={1.5} />
                ) : (
                  <IconCircleCheck style={{ width: '70%', height: '70%' }} stroke={1.5} />
                )}
              </ActionIcon>
            </Tooltip>
            <ActionIcon
              variant='light'
              size={'lg'}
              onClick={async () => {
                await deleteSubtask(task.id);
                getSubtasks();
              }}
              color='red'
              aria-label='Delete'
            >
              <IconTrash style={{ width: '70%', height: '70%' }} stroke={1.5} />
            </ActionIcon>
          </React.Fragment>
        )}
      </Flex>
    </Paper>
  );
};

export default Subtask;
