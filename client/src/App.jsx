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
import { useTranslation } from 'react-i18next'
import Privacy from './pages/Privacy/Privacy'

function App() {
  const { t, i18n } = useTranslation();
  const [count, setCount] = useState(3)
  const [cred, setCred] = useState();
  const [po, setPo] = useState();
  const [showModal, setShowModal] = useState(false);
  const [modalText, setModalText] = useState(t("login_required"));

  const [user, setUser] = useState({
    username: "",
    email: "",
  });

  // 

  useEffect(() => {
    const savedLang = localStorage.getItem('lang') || 'en';
    i18n.changeLanguage(savedLang);
  }, []);
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
      <div className='right-side-website'>{children}</div>
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
            <Route path='/privacy-policy' element={<Layout><Privacy /></Layout>}></Route>
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
