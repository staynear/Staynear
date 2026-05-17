import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './context/AuthContext'
import Splash from './pages/Splash'
import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'
import Search from './pages/Search'
import Favorites from './pages/Favorites'
import Profile from './pages/Profile'
import HostelDetail from './pages/HostelDetail'
import BottomNav from './components/BottomNav'

function App() {
  const { user, isLoading } = useAuth()

  if (isLoading) {
    return (
      <div style={{
        width: '100%',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#0D0D0D'
      }}>
        <div style={{
          width: '40px',
          height: '40px',
          border: '3px solid rgba(255, 107, 53, 0.2)',
          borderTop: '3px solid #FF6B35',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite'
        }} />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    )
  }

  return (
    <div style={{ width: '100%', height: '100vh', overflow: 'hidden', position: 'relative' }}>
      <Routes>
        <Route path="/" element={!user ? <Splash /> : <Navigate to="/home" />} />
        <Route path="/login" element={!user ? <Login /> : <Navigate to="/home" />} />
        <Route path="/register" element={!user ? <Register /> : <Navigate to="/home" />} />
        <Route path="/home" element={user ? <Home /> : <Navigate to="/" />} />
        <Route path="/search" element={user ? <Search /> : <Navigate to="/" />} />
        <Route path="/favorites" element={user ? <Favorites /> : <Navigate to="/" />} />
        <Route path="/profile" element={user ? <Profile /> : <Navigate to="/" />} />
        <Route path="/hostel/:id" element={user ? <HostelDetail /> : <Navigate to="/" />} />
      </Routes>
      {user && <BottomNav />}
    </div>
  )
}

export default App
