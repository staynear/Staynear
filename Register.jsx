import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { User, Mail, Phone, Lock, Eye, EyeOff, Building2, GraduationCap } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import Logo from '../components/Logo'

const Register = () => {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    userType: 'traveler'
  })
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleRegister = (e) => {
    e.preventDefault()
    setError('')

    if (!formData.fullName || !formData.email || !formData.phone || !formData.password) {
      setError('Please fill in all fields')
      return
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      return
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters')
      return
    }

    setIsLoading(true)

    setTimeout(() => {
      login({
        id: '2',
        name: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        type: formData.userType,
        avatar: null,
        favorites: [],
        bookings: []
      })
      setIsLoading(false)
      navigate('/home')
    }, 1500)
  }

  const inputStyle = (icon) => ({
    position: 'relative',
    width: '100%'
  })

  const iconStyle = {
    position: 'absolute',
    left: '16px',
    top: '50%',
    transform: 'translateY(-50%)',
    color: '#A0A0B0',
    zIndex: 2
  }

  return (
    <div style={{
      width: '100%',
      height: '100vh',
      background: 'linear-gradient(180deg, #0D0D0D 0%, #1A1A2E 100%)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
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
        background: 'radial-gradient(circle, rgba(255,107,53,0.15) 0%, transparent 70%)',
        top: '5%',
        right: '-50px'
      }} />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{
          width: '100%',
          maxWidth: '380px',
          zIndex: 10,
          overflowY: 'auto',
          maxHeight: '100vh',
          paddingTop: '40px',
          paddingBottom: '40px'
        }}
        className="scroll-container"
      >
        {/* Logo */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '30px' }}>
          <Logo size={80} showText={false} />
        </div>

        <h1 style={{
          fontSize: '26px',
          fontWeight: 700,
          color: '#F5F5F5',
          textAlign: 'center',
          marginBottom: '8px'
        }}>
          Create Account
        </h1>
        <p style={{
          fontSize: '14px',
          color: '#A0A0B0',
          textAlign: 'center',
          marginBottom: '28px'
        }}>
          Join Stay Near today
        </p>

        {/* User Type Toggle */}
        <div style={{
          display: 'flex',
          gap: '12px',
          marginBottom: '24px'
        }}>
          <button
            type="button"
            onClick={() => setFormData({ ...formData, userType: 'traveler' })}
            style={{
              flex: 1,
              padding: '12px',
              borderRadius: '12px',
              border: `1.5px solid ${formData.userType === 'traveler' ? '#FF6B35' : 'rgba(255,255,255,0.1)'}`,
              background: formData.userType === 'traveler' ? 'rgba(255,107,53,0.1)' : 'rgba(255,255,255,0.05)',
              color: formData.userType === 'traveler' ? '#FF6B35' : '#A0A0B0',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '6px',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
          >
            <GraduationCap size={22} />
            <span style={{ fontSize: '13px', fontWeight: 500 }}>Student/Traveler</span>
          </button>
          <button
            type="button"
            onClick={() => setFormData({ ...formData, userType: 'owner' })}
            style={{
              flex: 1,
              padding: '12px',
              borderRadius: '12px',
              border: `1.5px solid ${formData.userType === 'owner' ? '#FF6B35' : 'rgba(255,255,255,0.1)'}`,
              background: formData.userType === 'owner' ? 'rgba(255,107,53,0.1)' : 'rgba(255,255,255,0.05)',
              color: formData.userType === 'owner' ? '#FF6B35' : '#A0A0B0',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '6px',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
          >
            <Building2 size={22} />
            <span style={{ fontSize: '13px', fontWeight: 500 }}>Hostel Owner</span>
          </button>
        </div>

        <form onSubmit={handleRegister} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {/* Full Name */}
          <div style={inputStyle(User)}>
            <User size={18} style={iconStyle} />
            <input
              type="text"
              name="fullName"
              placeholder="Full name"
              value={formData.fullName}
              onChange={handleChange}
              className="glass-input"
              style={{ paddingLeft: '48px' }}
            />
          </div>

          {/* Email */}
          <div style={inputStyle(Mail)}>
            <Mail size={18} style={iconStyle} />
            <input
              type="email"
              name="email"
              placeholder="Email address"
              value={formData.email}
              onChange={handleChange}
              className="glass-input"
              style={{ paddingLeft: '48px' }}
            />
          </div>

          {/* Phone */}
          <div style={inputStyle(Phone)}>
            <Phone size={18} style={iconStyle} />
            <input
              type="tel"
              name="phone"
              placeholder="Phone number"
              value={formData.phone}
              onChange={handleChange}
              className="glass-input"
              style={{ paddingLeft: '48px' }}
            />
          </div>

          {/* Password */}
          <div style={{ position: 'relative', width: '100%' }}>
            <Lock size={18} style={iconStyle} />
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
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

          {/* Confirm Password */}
          <div style={{ position: 'relative', width: '100%' }}>
            <Lock size={18} style={iconStyle} />
            <input
              type={showPassword ? 'text' : 'password'}
              name="confirmPassword"
              placeholder="Confirm password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="glass-input"
              style={{ paddingLeft: '48px' }}
            />
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
            style={{ opacity: isLoading ? 0.7 : 1, marginTop: '8px' }}
          >
            {isLoading ? 'Creating account...' : 'Create Account'}
          </button>
        </form>

        <p style={{
          textAlign: 'center',
          marginTop: '24px',
          fontSize: '14px',
          color: '#A0A0B0'
        }}>
          Already have an account?{' '}
          <button
            onClick={() => navigate('/login')}
            style={{
              background: 'none',
              border: 'none',
              color: '#FF6B35',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: 600
            }}
          >
            Log In
          </button>
        </p>
      </motion.div>
    </div>
  )
}

export default Register
