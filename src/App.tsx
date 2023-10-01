import { useState, ChangeEvent, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { ITask } from './Interfaces'
import TodoTask from './Components/TodoTask';

const App:React.FC = () => {
  const [task, setTask] = useState<string>("");
  const [todo, setTodo] = useState<ITask[]>([]);
  const [completeTask, setCompleteTask] = useState<boolean>(false);

  const handleChange = (event:ChangeEvent<HTMLInputElement>) => {
    if(event.target.name="task") {
      setTask(event.target.value);
    }
  }

  const addTask = async () => {
    const newTask = {
      taskName:task,
      completedTask:false
    }
    //setTodo([... todo, newTask]);
    setTask("");
    try {
      const response = await fetch(`http://localhost:5000/todo/task`, {
        method: "post",
        headers: new Headers({
          "Content-Type": "application/json",
          "Accept": "application/json"
        }),
        body: JSON.stringify(newTask)
      });
      const response2 = await fetch(`http://localhost:5000/todo/tasks`);
      const json = await response2.json();
      setTodo(json);
      return response.ok;
    } catch (ex) {
      return false;
    }
  }

  const deleteTask = async (taskNameToDelete:string, id: string):void =>{
    /*
    setTodo(todo.filter((task)=>{
      return task.taskName !=taskNameToDelete
    }));
    */
    await fetch(`http://localhost:5000/todo/delete?taskID=${id}`, {
      method: "delete",
      headers: new Headers({
        "Content-Type": "application/json",
        Accept: "application/json"
      })
    });
    const response2 = await fetch(`http://localhost:5000/todo/tasks`);
    const json = await response2.json();
    setTodo(json);
  }

  const completTask =  (taskNameMarkAsComplete:string, id: string):void => {
     /*
     let mapped = todo.map(task => {
       return task.taskName == taskNameMarkAsComplete ? { ...task, completedTask: !task.completedTask } : { ...task};
     });
     setTodo(mapped);
     */
     const fetchTask = async (): Promise<any> => {
       const response = await fetch(`http://localhost:5000/todo/task/${id}`);
       const json = await response.json();
       let completedTask = !json.completedTask;
       const editedTask = {
         completedTask:completedTask
       }
       const response2 = await fetch(`http://localhost:5000/todo/edit?taskID=${id}`, {
        method: "put",
        headers: new Headers({
          "Content-Type": "application/json",
          Accept: "application/json"
        }),
        body: JSON.stringify(editedTask)
      });
      const response3 = await fetch(`http://localhost:5000/todo/tasks`);
      const json2 = await response3.json();
      setTodo(json2);
     }
     fetchTask();

 }

 useEffect(() => {
    const fetchTasks = async (): Promise<any> => {
      const response = await fetch(`http://localhost:5000/todo/tasks`);
      const json = await response.json();
      setTodo(json)
    }
    fetchTasks();
  }, [])

  return (
    <div className="App">
      <div className="header">
        <span>Spis zadań</span>
        <div className="inputContainer">
          <input type="text" name="task" value={task} onChange={handleChange} placeholder="dodaj zadanie" />
        </div>
        <button onClick={addTask}>Dodaj</button>
      </div>
      <div className="todoList">
        {todo.map((task:ITask, key:number)=>{
          return <TodoTask key={task._id} task={task} deleteTask={deleteTask} completTask={completTask} />
        })}
      </div>
    </div>
  )
}

export default App
