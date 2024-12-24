import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route, useNavigate  } from 'react-router-dom'

import Navbar from './components/Navbar'
import Home from './components/Home'
import Faq from './components/Faq'
import Setting from './components/Setting'
import User from './components/User'

import Login from './pages/Login/Login'
import Register from './pages/Register/Register'
import Context from "./context/Context";

import './App.css'
import Saved from './components/Saved'
import isTokenExpired from './utils/isTokenExpired'
import { toast } from 'react-toastify'

function App() {
  const [count, setCount] = useState(3)
  const [cred, setCred] = useState();
  const [po, setPo] = useState();
  const [showModal, setShowModal] = useState(false);
  const [modalText, setModalText] = useState('You need to login first!');
   const navigate = useNavigate();
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

  const fetchUser = async () => {
    try {
      const res = await fetch(`${server_url}/get-userdata`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          "Authorization": `Bearer ${token}`
        },
      })

      if (!res.ok) {
        const data = await res.json();
        if (res.status == 429) {

          throw new Error(data.message)
        }
        throw new Error(data.message || 'Something went wrong!')

      }
      // console.log(data.data);
      const data = await res.json();
      setUser(prev => ({
        ...prev,
        username: data?.username,
        email: data?.email,
      }));
       navigate(0);
    } catch (error) {
      toast.warn('Something went wrong!')
    }
  }

  useEffect(() => {
    setShowModal(false)
    if (token) {
      // setModalText('Your session has expired. Please sign in again.')
      // setShowModal(true)
      fetchUser();
    }


  }, []);



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
