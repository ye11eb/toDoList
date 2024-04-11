export type Task = {
  id: number;
  task: string;
  stage: 'completed' | 'In process' | 'pending';
  updatedAt: Date;
  createdAt: Date;
};