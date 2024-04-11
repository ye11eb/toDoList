import React from 'react';
import { Task } from '../utils/GenTypes';
import TaskComponent from './Task';

type ListProps = {
  todos: Task[];
  handleDeleteTask: (id: number) => Promise<void>;
  handleUpdateTask: (id: number, updatedStage: string) => Promise<void>
};

const List: React.FC<ListProps> = ({ todos, handleDeleteTask, handleUpdateTask }) => {
  return (
    <div className='w-full'>
      {todos.map(task => (
        <TaskComponent 
          key={task.id}
          task={task} 
          handleDeleteTask={handleDeleteTask} 
          handleUpdateTask={handleUpdateTask} 
        />
      ))}
    </div>
  );
};

export default List;
