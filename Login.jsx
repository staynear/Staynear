import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Mail, Lock, Eye, EyeOff } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import Logo from '../components/Logo'

const Login = () => {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = (e) => {
    e.preventDefault()
    setError('')

    if (!email || !password) {
      setError('Please fill in all fields')
      return
    }

    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      login({
        id: '1',
        name: 'John Doe',
        email: email,
        phone: '+233 24 000 0000',
        type: 'traveler',
        avatar: null,
        favorites: [],
        bookings: []
      })
      setIsLoading(false)
      navigate('/home')
    }, 1500)
  }

  return (
    <div style={{
      width: '100%',
      height: '100vh',
      background: 'linear-gradient(180deg, #0D0D0D 0%, #1A1A2E 100%)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Background glow */}
      <div style={{
        position: 'absolute',
        width: '300px',
        height: '300px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(255,107,53,0.2) 0%, transparent 70%)',
        top: '10%',
        left: '50%',
        transform: 'translateX(-50%)'
      }} />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{
          width: '100%',
          maxWidth: '380px',
          zIndex: 10
        }}
      >
        {/* Logo */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '40px' }}>
          <Logo size={100} showText={false} />
        </div>

        <h1 style={{
          fontSize: '28px',
          fontWeight: 700,
          color: '#F5F5F5',
          textAlign: 'center',
          marginBottom: '8px'
        }}>
          Welcome Back
        </h1>
        <p style={{
          fontSize: '14px',
          color: '#A0A0B0',
          textAlign: 'center',
          marginBottom: '32px'
        }}>
          Sign in to find your perfect hostel
        </p>

        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Email Input */}
          <div style={{ position: 'relative' }}>
            <Mail size={18} style={{
              position: 'absolute',
              left: '16px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: '#A0A0B0',
              zIndex: 2
            }} />
            <input
              type="email"
              placeholder="Email or phone number"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="glass-input"
              style={{ paddingLeft: '48px' }}
            />
          </div>

          {/* Password Input */}
          <div style={{ position: 'relative' }}>
            <Lock size={18} style={{
              position: 'absolute',
              left: '16px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: '#A0A0B0',
              zIndex: 2
            }} />
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="glass-input"
              style={{ paddingLeft: '48px', paddingRight: '48px' }}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              style={{
                position: 'absolute',
                right: '16px',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'none',
                border: 'none',
                color: '#A0A0B0',
                cursor: 'pointer',
                zIndex: 2
              }}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {error && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              style={{
                color: '#EF4444',
                fontSize: '13px',
                textAlign: 'center'
              }}
            >
              {error}
            </motion.p>
          )}

          <button
            type="submit"
            className="btn-primary"
            disabled={isLoading}
            style={{ opacity: isLoading ? 0.7 : 1 }}
          >
            {isLoading ? (
              <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                <span style={{
                  width: '18px',
                  height: '18px',
                  border: '2px solid rgba(255,255,255,0.3)',
                  borderTop: '2px solid white',
                  borderRadius: '50%',
                  animation: 'spin 1s linear infinite'
                }} />
                Signing in...
              </span>
            ) : 'Log In'}
          </button>
        </form>

        <p style={{
          textAlign: 'center',
          marginTop: '20px',
          fontSize: '14px',
          color: '#A0A0B0'
        }}>
          <button
            onClick={() => {}}
            style={{
              background: 'none',
              border: 'none',
              color: '#FF6B35',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: 500
            }}
          >
            Forgot password?
          </button>
        </p>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
          margin: '24px 0'
        }}>
          <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.1)' }} />
          <span style={{ color: '#A0A0B0', fontSize: '13px' }}>or</span>
          <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.1)' }} />
        </div>

        <button
          onClick={() => navigate('/register')}
          className="btn-outline"
        >
          Create new account
        </button>
      </motion.div>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  )
}

export default Login
