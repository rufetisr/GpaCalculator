import { useState } from 'react'
import './App.css'
import Navbar from './Components/Navbar'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './Components/Home'
import Faq from './Components/Faq'
import Setting from './Components/Setting'
import User from './Components/User'
import Context from "./Context/Context";

function App() {
  const [count, setCount] = useState(3)
  const [cred, setCred] = useState();
  const [po, setPo] = useState();

  const data = {
    count, setCount,
    cred, setCred,
    po, setPo,
  }

  return (
    <div className='app'>
      <Context.Provider value={ data} >
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path='/' element={<Home />}></Route>
            <Route path='/faq' element={<Faq />}></Route>
            <Route path='/setting' element={<Setting />}></Route>
            <Route path='/user' element={<User />}></Route>
          </Routes>
        </BrowserRouter>
      </Context.Provider>
    </div>
  )
}

export default App
