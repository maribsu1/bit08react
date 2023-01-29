import {useState} from 'react';

import AddTaskForm from './components/AddTaskForm.jsx'
import UpdateForm from './components/UpdateForm.jsx'
import ToDo from './components/ToDo'

import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css';

function App() {

const [toDo, setToDo] = useState ([
  {"id": 1, "title": "Museo Botero", "status": false},
  {"id": 2, "title": "Parque Central Simón Bolívar", "status": false},
  {"id": 3, "title": "Salitre Mágico", "status": false},
  {"id": 4, "title": "Jardín Botánico de Bogotá José Celestino", "status": false},
  {"id": 5, "title": "Chorro de Quevedo", "status": false},
  {"id": 6, "title": "Santuario de Monserrate", "status": false},
  {"id": 7, "title": "Plaza de Bolívar", "status": false},
]);

const [newTask, setNewTask] = useState ('');
const [updateData, setUpdateData] = useState ('');

const addTask = () => {
  if (newTask) {
    let num = toDo.length + 1;
    let newEntry = { id: num, title: newTask, status: false}
    setToDo([...toDo, newEntry])
    setNewTask('');
  }
}

const deleteTask = (id) => {  
  let newTask = toDo.filter( task => task.id !== id)
  setToDo(newTask); 
}

const markDone = (id) => {
  let newTask = toDo.map ( task => {
    if( task.id === id ) {
      return ({ ...task, status: !task.status })
    }
    return task;
  })
  setToDo(newTask);
}

const cancelUpdate = () => {
  setUpdateData('');
}

const changeTask = (e) => {
  let newEntry = {
    id: updateData.id, title: e.target.value, status: updateData.status ? true : false 
  }
  setUpdateData(newEntry);
}

const updateTask = () => {
 let filterRecords = [...toDo].filter( task => task.id !== updateData.id );
 let updatedObject = [...filterRecords, updateData]
 setToDo(updatedObject);
 setUpdateData('');
}
  return (
    <div className="container App">

    <br></br>
    <h1>Lugares para visitar en Bogotá</h1>
    <h2>Lista (React Js)</h2>  
    <br></br>

    {updateData && updateData ? (
     <UpdateForm
        updateData={updateData}
        changeTask={changeTask}
        updateTask={updateTask}
        cancelUpdate={cancelUpdate}
     />

    ) : (
      <AddTaskForm
        newTask={newTask}
        setNewTask={setNewTask}
        addTask={addTask}
      />
    )}
    
    {toDo && toDo.length ? '' : 'No hay tareas...'}

      <ToDo
        toDo={toDo}
        markDone={markDone}
        setUpdateData={setUpdateData}
        deleteTask={deleteTask}
      />
    
    </div>
  );
}

export default App;
