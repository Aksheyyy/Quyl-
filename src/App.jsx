import { BrowserRouter, Routes, Route } from "react-router-dom"
import Dashboard from "./Pages/Dashboard"
import AddStudent from "./Pages/AddStudent"
import ViewStudent from "./Pages/ViewStudent"
function App() {
 
  return (
    <>
     <BrowserRouter>
        <Routes>
          <Route path='/' element={<Dashboard/>}/>
          <Route path='/add' element={<AddStudent/>}/>
          <Route path='/add/:id' element={<AddStudent/>}/>
          <Route path='/student/:id' element={<ViewStudent/>}/>
        </Routes>
     </BrowserRouter>
    </>
  )
}

export default App
