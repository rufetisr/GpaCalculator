import { useState } from 'react'
import './App.css'
import Navbar from './Components/Navbar'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './Components/Home'
import Faq from './Components/Faq'
import Setting from './Components/Setting'
import User from './Components/User'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='app'>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home/>}></Route>
          <Route path='/faq' element={<Faq/>}></Route>
          <Route path='/setting' element={<Setting/>}></Route>
          <Route path='/user' element={<User/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
