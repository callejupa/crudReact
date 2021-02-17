import { isEmpty, size } from "lodash"
import React, { useState, useEffect } from "react"
import shortid from "shortid"
import { getCollection } from "./actions"

const App = () => {
  const [task, setTask] = useState("")
  const [tasks, setTasks] = useState([])
  const [editMode, setEditMode ] = useState(false)
  const [id, setId] = useState("")
  const [error , setError] = useState(null)

  useEffect(() => {
    (async () => {
      const result = await getCollection("tasks")
      console.log(result)
    })()
  }, [])

  const validForm = () => {
    let isValid = true
    setError(null)

    if(isEmpty(task)){
      setError("Debes ingresar una tarea")
      isValid = false
    }

    return isValid
  }

  const addTask = (e) => {
    e.preventDefault()
    
    if(!validForm()) return

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

  const handleEditTask = (theTask) => {
    setTask(theTask.name)
    setEditMode(true)
    setId(theTask.id)
  }

  const saveTask = (e) => {
    e.preventDefault()
    if(!validForm) return

    const editedTasks = tasks.map(item => item.id === id ? {id, name: task} : item)
    setTasks(editedTasks)
    setEditMode(false)
    setTask("")
    setId("")
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
              <button 
                className="btn btn-warning btn-sm float-right"
                onClick={() => handleEditTask(task)}>
                Edit
              </button>
            </li>
          ))
          }
          </ul>)}
        </div>
        <div className="col-4">
          <h4 className="text-center">
            {!editMode ? "Add Task" : "Edit Task"}
          </h4>
          <form onSubmit={!editMode ? addTask : saveTask }>
            { error && <span className="text-danger">{error}</span>}
            <input 
              type="text"
              className="form-control mb-2"
              placeholder="Enter the task"
              onChange={(text) => setTask(text.target.value)}
              value={task}>
            </input>
            <button 
              className={ !editMode ? "btn btn-dark btn-block" : "btn btn-warning btn-block" }
              type="submit">
              { !editMode ? "Add" : "Save" }
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
