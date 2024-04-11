import React from 'react';

type AddTaskProps = {
  addTaskText: string;
  setAddTaskText: React.Dispatch<React.SetStateAction<string>>;
  setAddTodo: React.Dispatch<React.SetStateAction<boolean>>;
  handleAddTask: () => Promise<void>
};

const AddTask: React.FC<AddTaskProps> = ({
  addTaskText,
  setAddTaskText,
  setAddTodo,
  handleAddTask
}) => {

  return (
    <div className="absolute top-[calc(50%-200px)] h-[200px] w-[300px] bg-slate-300 rounded-lg">
      <div className='flex flex-col justify-evenly relative h-[200px] w-[300px]'>
      <div className="absolute text-4xl rotate-45 top-0 right-1 cursor-pointer"
        onClick={() => setAddTodo(false)}
      >+</div>
        <h2 className='text-2xl text-center'>NEW TASK</h2>
        <input
          type="text"
          value={addTaskText}
          onChange={(event) => setAddTaskText(event.target.value)}
        />
        <button 
          onClick={() => {
            handleAddTask()
          }} 
          className='bg-slate-500 w-[100px] mx-auto rounded-md text-white h-[30px]'
        >
          <p>add task</p>
        </button>
      </div>
    </div>

  );
};

export default AddTask;
