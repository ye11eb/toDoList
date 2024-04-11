import React, { useEffect, useState } from "react";
import AddTask from "./components/AddTask";
import List from "./components/List";
import { Task } from "./utils/GenTypes";
import axios, { AxiosResponse } from "axios";

function App() {
  const [todos, setTodos] = useState<Task[]>([]);
  const [addTodo, setAddTodo] = useState(false)
  const [addTaskText, setAddTaskText] = useState('')

  const fetchData = async () => {
    
    try {
      
      const response: AxiosResponse = await axios.get('http://localhost:8000/api/tasks');
      
      const responseData: Task[] = response.data.sort((a: Task, b: Task) => {
        const dateA = new Date(a.createdAt);
        const dateB = new Date(b.createdAt);
        return dateB.getTime() - dateA.getTime();
    });
    
      console.log(responseData);
      setTodos(responseData)
      
      

    } catch (error) {   
      console.log(error);
      
    }
    
  };

  const handleAddTask = async () => {
    if (addTaskText.length > 0) {
      try {
        const response: AxiosResponse = await axios.post('http://localhost:8000/api/tasks', {task: addTaskText, stage: 'pending'});
        
        if (response.data.status === 201) {
          setAddTaskText('')
          fetchData()
        }else{
          console.log('something went wrong');
        }
        
      } catch (error) {
        console.log(error);
      
      }
    }

  }

  const handleDeleteTask = async (id: number) => {
    try {
      const response: AxiosResponse = await axios.delete(`http://localhost:8000/api/tasks/${id}`);

      if (response.data.status === 200) {
        fetchData()
      }else{
        console.log('something went wrong');
      }

    } catch (error) {
      console.log(error);
    
    }
  }

  const handleUpdateTask = async (id: number, updatedStage: string) => {
    try {
      const response: AxiosResponse = await axios.patch(`http://localhost:8000/api/tasks/${id}`, {stage: updatedStage});

      if (response.data.status === 200) {
        fetchData()
      }else{
        console.log('something went wrong');
      }

    } catch (error) {
      console.log(error);
    
    }
  }

  useEffect(() => {
    fetchData()
  }, [])
    
  return (
    <div className="w-[1000px] m-auto h-[100vh] flex flex-col bg-slate-500 items-center relative">
      <h1 className="text-5xl text-white my-5">Todolist</h1>
      {addTodo && <AddTask 
        addTaskText={addTaskText} 
        setAddTaskText={setAddTaskText}
        setAddTodo={setAddTodo}
        handleAddTask={handleAddTask}
      />}
      <List 
        todos={todos} 
        handleDeleteTask={handleDeleteTask}
        handleUpdateTask={handleUpdateTask}
      />
      <div className="rounded-full h-20 w-20 bg-blue-500 flex justify-center items-center absolute bottom-10 right-10"
        onClick={() => setAddTodo(!addTodo)}
      >
        <p className="text-[50px] pb-[10px] text-white cursor-pointer">+</p>
      </div>
    </div>
  );
}
export default App;