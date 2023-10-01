import React from 'react'
import { ITask } from '../Interfaces'

interface Props {
  task:ITask;
  deleteTask(taskNameToDelete:string):void;
  completTask(taskNameMarkAsComplete:string):void;
}

const TodoTask = ({task, deleteTask, completTask}:Props) => {
  return (
    <div className="task">
      <div className="content">
        <span>
          {task.completedTask
            ? <del>{task.taskName}</del>
            : task.taskName
          }
        </span>
      </div>
      <button onClick={()=> {
        deleteTask(task.taskName, task._id)
      }}>Usuń</button>
      <input type="checkbox" defaultChecked={task.completedTask} onClick={()=> {
        completTask(task.taskName, task._id)
      }} />
    </div>
  )
}

export default TodoTask
