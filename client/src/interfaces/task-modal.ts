import { TaskInterface } from './task';

export interface TaskModalProps {
  task: TaskInterface;
  completedString: string;
  opened: boolean;
  taskData: {
    title: string;
    completed: boolean;
  };
  open: (title: string) => void;
  onClose: () => void;
  getTasks: () => Promise<void>;
  setData: React.Dispatch<
    React.SetStateAction<{
      title: string;
      completed: boolean;
    }>
  >;
}
