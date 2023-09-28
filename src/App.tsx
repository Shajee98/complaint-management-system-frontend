import './App.scss'
import Header from './components/header/Header'
import Navbar from './components/navbar/Navbar'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Complaints from './pages/complaints/Complaints';
import Departments from './pages/departments/Departments';
import Settings from './pages/settings/Settings';
import ProtectedRoute from './ProtectedRoute'
import Login from './pages/login/Login';
import { useState } from 'react';
import Signup from './pages/signup/Signup';

function App() {
  const [loggedIn, SetLoggedIn] = useState(true)
  return (
    <div className='parent-container'>
      {loggedIn ? <Header /> : null}
      <div className={`${loggedIn ? "child-container-loggedIn" : "child-container-loggedOut"}`}>
        <Router>
          {loggedIn ? <Navbar /> : null}
          <div className={`${loggedIn ? 'left-container' : ""}`}>
            <Routes>
              <Route element={<ProtectedRoute user={loggedIn} redirectPath='/login' />}>
              <Route path="/complaints" element={<Complaints />} />
              <Route path="/departments" element={<Departments />} />
              <Route path="/settings" element={<Settings />} />
              </Route>
              {/* <Route element={<ProtectedRoute user={loggedIn} redirectPath='/complaints' />}> */}
              <Route path='/login' element={<Login />}/>
              <Route path='/signup' element={<Signup />}/>
              {/* </Route> */}
            </Routes>
          </div>
        </Router>
      </div>
    </div>
  )
}

export default App
