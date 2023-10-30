import {BrowserRouter, Routes, Route} from 'react-router-dom'
import './App.css'
import './style.css'
import Home from './pages/home/home'
import Login from './pages/login/login'
import Register from './pages/register/register'
import Profile from './pages/profile/profile'
import Layout from './components/layout'
import SearchProfile from './pages/searchProfile/searchProfile'

function App() {

  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Layout/>}>
        <Route path='/:userId' element={<Home/>}/>
        <Route path='/user' element={<SearchProfile/>}/>
        <Route path='/profile/:userId' element={<Profile/>}/>
      </Route>
      <Route path='/login' element={<Login/>}/>
      <Route path='/register' element={<Register/>}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App
