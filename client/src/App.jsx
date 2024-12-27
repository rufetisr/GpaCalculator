import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Navbar from './components/Navbar/Navbar'
import Home from './components/Home/Home'
import Faq from './components/Faq/Faq'
import Setting from './components/Setting/Setting'
import User from './components/User/User'

import Login from './pages/Login/Login'
import Register from './pages/Register/Register'
import Context from "./context/Context";

import './App.css'
import Saved from './components/Saved/Saved'
import isTokenExpired from './utils/isTokenExpired'
import { toast } from 'react-toastify'

function App() {
  const [count, setCount] = useState(3)
  const [cred, setCred] = useState();
  const [po, setPo] = useState();
  const [showModal, setShowModal] = useState(false);
  const [modalText, setModalText] = useState('You need to login first!');
  const server_url = import.meta.env.VITE_SERVER_URL;
  let token = localStorage.getItem('token');

  const [user, setUser] = useState({
    username: "",
    email: "",
  });

  // 

  // const location = useLocation()

  const data = {
    count, setCount,
    cred, setCred,
    po, setPo,
    user, setUser,
    showModal, setShowModal,
    modalText, setModalText
  }

  const Layout = ({ children }) => (
    <div>
      <Navbar />
      <div>{children}</div>
    </div>
  );

  return (
    <BrowserRouter>
      <div className='app'>
        <Context.Provider value={data} >
          <Routes>
            <Route path='/' element={<Layout><Home /></Layout>}></Route>
            <Route path='/home' element={<Layout><Home /></Layout>}></Route>
            <Route path='/faq' element={<Layout><Faq /></Layout>}></Route>
            <Route path='/setting' element={<Layout><Setting /></Layout>}></Route>
            <Route path='/saved' element={<Layout><Saved /></Layout>}></Route>
            <Route path='/user' element={<Layout><User /></Layout>}></Route>
            <Route path='/login' element={<Login />}></Route>
            <Route path='/register' element={<Register />}></Route>
            {/* <Route path="/*" element={<Layout><Home /></Layout>} /> */}
          </Routes>
        </Context.Provider>
      </div>
    </BrowserRouter>
  )
}

export default App
