import { TaskInterface } from './task';

export interface SubtaskProps {
  key: number;
  subtaskData: {
    title: string;
    completed: boolean;
  };
  task: TaskInterface;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setSubtaskData: React.Dispatch<
    React.SetStateAction<{
      title: string;
      completed: boolean;
    }>
  >;
  getSubtasks: () => Promise<void>;
  deleteSubtask: (taskId: string) => Promise<void>;
}
