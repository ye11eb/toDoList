import React from 'react';
import { Task } from '../utils/GenTypes';

type TaskComponentProps = {
  task: Task;
  handleDeleteTask: (id: number) => Promise<void>
  handleUpdateTask: (id: number, updatedStage: string) => Promise<void>
};

const TaskComponent: React.FC<TaskComponentProps> = ({ task, handleDeleteTask, handleUpdateTask}) => {
  return (
    <div className='flex-row w-full bg-slate-400 flex justify-between h-[40px] border-slate-500 border-b-[1px]'>
        <p className='text-2xl mx-2 text-white'>{task.task}</p>
        <div className="flex justify-between">
          <select name="select" className='bg-slate-400 text-white text-xl'
            value={task.stage}
            onChange={(e) => handleUpdateTask(task.id, e.target.value)}
          >
            {task.stage === 'pending' ? 
                <option value="pending" selected className='w-1 text-white'>pending</option> : 
                <option value="pending">pending</option>
            }
            {task.stage === 'In process' ? 
                <option value="In process" selected>In process</option> :
                <option value="In process">In process</option>
            }
            {task.stage === 'completed' ? 
                <option value="completed" selected>completed</option> :
                <option value="completed">completed</option>
            }
          </select>
          <img src="./imgs/deleteIcon.png" alt="" className=' m-[10px] grayscale hover:grayscale-0' 
            onClick={() => handleDeleteTask(task.id)}
          />
        </div>
    </div>
  );
};

export default TaskComponent;
