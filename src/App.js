import { isEmpty, size } from "lodash"
import React, { useState } from "react"
import shortid from "shortid"

const App = () => {
  const [task, setTask] = useState("")
  const [tasks, setTasks] = useState([])

  const addTask = (e) => {
    e.preventDefault()
    if(isEmpty(task)){
      console.log("task empty")
      return
    }

    const newTask = {
      id: shortid.generate(),
      name: task
    }

    setTasks([ ...tasks, newTask])
    setTask("")
  }

  const handleDeleteTask = (idTask) => {
    console.log(idTask)
    const filteredTasks = tasks.filter(task => task.id !== idTask)
    setTasks(filteredTasks)
  }

  return (
    <div className="container mt-5">
      <h1>Tasks</h1>
      <hr/>
      <div className="row">
        <div className="col-8">
          <h4 className="text-center">Tasks list</h4>
          {size(tasks) === 0 ? (
            <li className="list-group-item text-center">without tasks</li>
          ) : (
            <ul className="list-group">
            {tasks.map((task) => (
             <li className="list-group-item" key={task.id}>
              <span className="lead">{task.name}</span>
              <button 
                className="btn btn-danger btn-sm float-right mx-2"
                onClick={() => handleDeleteTask(task.id)}
              >
                Delete
              </button>
              <button className="btn btn-warning btn-sm float-right">
                Edit
              </button>
            </li>
          ))
          }
          </ul>)}
        </div>
        <div className="col-4">
          <h4 className="text-center">Add Task</h4>
          <form onSubmit={addTask}>
            <input 
              type="text"
              className="form-control mb-2"
              placeholder="Enter the task"
              onChange={(text) => setTask(text.target.value)}
              value={task}>
            </input>
            <button 
              className="btn btn-dark btn-block" 
              type="submit">
              Add
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
