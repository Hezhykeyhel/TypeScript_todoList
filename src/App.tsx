import React, { FC, ChangeEvent, useState } from 'react';
import './App.css';
import { ITask } from './interface';
import TodoTask from './Component/TodoTask';

const App: FC = () => {

  const [task, setTask] = useState<string>("");
  const [deadline, setdeadline] = useState<number>(0);
  const [todoList, setTodoList] = useState<ITask[]>([]);
  const [error, setErrors] = useState({});


  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    if (event.target.name === "task"){
      setTask(event.target.value);
    } else{
      setdeadline(Number(event.target.value));
    }
  }

  const addTask = ():void => {
    const newTask = { taskName : task, deadline: deadline };
    setTodoList([...todoList, newTask]);
    setTask("");
    setdeadline(0);
    console.log(todoList);
  }


  const completeTask = (taskNameToDelete: string):void => {
    setTodoList(todoList.filter((task) => {
      return task.taskName != taskNameToDelete
    }))
  }

  return (
    <div className="App">
      <div className='header'>
        <h1>Typescript Todolist</h1>
        <div className='inputContainer'>
          <input id='text' type='text' placeholder='Task...' name="task" value={task} onChange={handleChange}></input>
          <input id='dead' type='number' placeholder='Deadline in (in days)...' value={deadline} name="deadline" onChange={handleChange}></input>
          </div>
          <button onClick={addTask}>Add task</button>
      </div>
      <div className='todoList'>
          {todoList.map((task: ITask, key:number) => {
            return <TodoTask key={key} task={task} completeTask={completeTask}/>;
          })}
      </div>
      </div>
  );
}

export default App;
