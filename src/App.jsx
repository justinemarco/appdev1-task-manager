import { useState } from 'react'
import ListTodos from './ListTodos'
import { BrowserRouter, Routes, Route } from "react-router"

function App () {
  const [user, setUser] = useState(null)

  return(
    <>
    <BrowserRouter>
        <Routes>
          <Route path="/" element={user ? <ListTodos user={user} /> : <SignIn/> } />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App
