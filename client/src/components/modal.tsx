import React, { useEffect, useState } from 'react';
import { Button, Modal, Flex, Loader, Text, TextInput } from '@mantine/core';
import { TaskInterface } from '../interfaces/task';
import { TaskModalProps } from '../interfaces/task-modal';
import Subtask from './subtask';
import { addNewSubtask, deleteSubtask, fetchSubtasks } from '../api/subtasks';
import { updateTask } from '../api/tasks';
import { useAuthContext } from '../hooks/use-auth';
import { useNavigate } from 'react-router-dom';

const TaskModal: React.FC<TaskModalProps> = ({
  task,
  taskData,
  opened,
  completedString,
  onClose,
  getTasks,
  setData,
}) => {
  const [loading, setLoading] = useState(false);
  const [subtasks, setSubtasks] = useState<TaskInterface[]>([]);
  const [modalTitle, setModalTitle] = useState('');
  const { user } = useAuthContext();
  const navigate = useNavigate();

  const [subtaskData, setSubtaskData] = useState({
    title: '',
    completed: false,
  });

  const blankTask = {
    title: '',
    completed: false,
    taskId: task?.id,
  };

  const getSubtasks = async () => {
    try {
      setLoading(true);
      const response = await fetchSubtasks(user, task);
      setSubtasks(response.data);
    } catch (error) {
      navigate('/error');
    }
    setLoading(false);
  };

  const onAddSubtask = async () => {
    try {
      setLoading(true);
      await addNewSubtask(user, blankTask);
      getSubtasks();
    } catch (error) {
      navigate('/error');
    }
    setLoading(false);
  };

  const onDeleteTask = async (taskId: string) => {
    try {
      setLoading(true);
      await deleteSubtask(user, taskId);
    } catch (error) {
      navigate('/error');
    }
    setLoading(false);
  };

  const onModalClose = async () => {
    onClose();

    if (modalTitle !== taskData.title) {
      await updateTask(task, { title: modalTitle, completed: taskData.completed }, user);
      setData((prevData) => ({
        ...prevData,
        title: modalTitle,
      }));
    }

    await getTasks();
  };

  useEffect(() => {
    setModalTitle(taskData.title);
    getSubtasks();
  }, [opened]);

  return (
    <Modal.Root opened={opened} onClose={onModalClose} size={'xl'} centered>
      <Modal.Overlay />
      <Modal.Content>
        <Modal.Header>
          <Modal.Title style={{ fontSize: '25px', marginBottom: '-10px' }}>
            <TextInput
              variant='unstyled'
              size='xl'
              placeholder='Enter your task'
              value={modalTitle}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => setModalTitle(event.target.value)}
            />
          </Modal.Title>
          <Modal.CloseButton />
        </Modal.Header>
        <Modal.Body>
          <Text size='sm' mb={'15px'}>
            {completedString}
          </Text>
          <Button mb={'15px'} onClick={() => onAddSubtask()} fullWidth disabled={subtasks.length >= 8}>
            Add a new subtask
          </Button>
          {loading && (
            <Flex align='center' justify='center' p='20px'>
              <Loader color='blue' size='lg' />
            </Flex>
          )}
          {!loading && (
            <React.Fragment>
              {subtasks.map((task) => (
                <Subtask
                  key={Number(task.id)}
                  getSubtasks={() => getSubtasks()}
                  setLoading={setLoading}
                  task={task}
                  deleteSubtask={() => onDeleteTask(task.id)}
                  subtaskData={subtaskData}
                  setSubtaskData={setSubtaskData}
                />
              ))}
            </React.Fragment>
          )}
        </Modal.Body>
      </Modal.Content>
    </Modal.Root>
  );
};

export default TaskModal;
