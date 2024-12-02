import { useState } from 'react'
import { useEffect } from 'react';
import './App.css'
import { db } from './firebase'
import { collection, doc, getDocs, deleteDoc, updateDoc, getDoc } from 'firebase/firestore'

function App() {
  const [tasks, setTasks] = useState([]);

  //Fetch docs from Firestore
  const fetchTasks = async () => {
    const collectionRef = collection(db, 'tasks');
    const querySnapshot = await getDocs(collectionRef);
    const tasks = querySnapshot.docs.map((task) => ({
      id: task.id,
      ...task.data()
    }))
    setTasks(tasks)
  }

  useEffect(() => {
    fetchTasks();
  }, [])
  
// Delete Tasks Function
const deleteTask = async (id) => {
  const docRef = doc(db, 'tasks', id)
  await deleteDoc(docRef)
  setTasks( (prevTasks) => prevTasks.filter(task => task.id !== id) )
}

  return (
    <>
      {
        tasks.map((task) => (
          <div key={task.id}> 
            <div>
              Task Title: {task.title} 
            </div>
            <div>
              Task Body: {task.body} 
            </div>
            <div>
              Task Status: {task.status} 
            </div>
            <button onClick={() => deleteTask(task.id)}>Delete Task</button>
          </div>

        ))
      }
    </>
  )
}

export default App
