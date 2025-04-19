import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import MyTimeLine from './Pages/MyTimeLine'
import CreateEntry from './Pages/CreateEntry'
import AvailableAudios from './Pages/AvailableAudios'
import Signup from './Pages/Signup'
import Login from './Pages/Login'
import GetStarted from './Pages/GetStarted'
import HomePage from './Pages/HomePage'
import Profile from './Pages/Profile'
import ProtectedUserWrapper from './Components/ProtectedUserWrapper'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Routes>
      <Route path='/' element={<GetStarted/>}/> {/*Home page*/}
      <Route path='/my-timeline' element={<ProtectedUserWrapper><MyTimeLine/></ProtectedUserWrapper>}/> {/*All locked and unlocked audios*/}
      <Route path='/create-secret' element={<ProtectedUserWrapper><CreateEntry/></ProtectedUserWrapper>}/> {/*Create a future audio*/}
      <Route path='/home' element={<ProtectedUserWrapper><HomePage/></ProtectedUserWrapper>}/>
      <Route path='/profile' element={<ProtectedUserWrapper><Profile/></ProtectedUserWrapper>}/>
      {/* <Route path='/unlocked-audios' element={<AvailableAudios/>}/>*/}
      <Route path='/login' element={<Login/>}/>
      <Route path='/signup' element={<Signup/>}/>
      <Route path='*' element={<h1>404 Not Found</h1>}/>
    </Routes>
  )
}

export default App
