import { TCompletedSubtasks } from '../components/tasks';

export interface TaskInterface {
  belongsToId: string;
  completed: boolean;
  id: string;
  title: string;
  userId: string | null;
}

export interface TaskProps {
  task: TaskInterface;
  completedSubtasks: TCompletedSubtasks;
  getTasks: () => Promise<void>;
  deleteTask: (taskId: string) => Promise<void>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}
