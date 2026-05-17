import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { User, Settings, HelpCircle, LogOut, ChevronRight, Shield, Building2, Heart, Calendar, Star, MapPin } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

const Profile = () => {
  const navigate = useNavigate()
  const { user, logout, updateUser } = useAuth()
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false)

  const menuItems = [
    {
      icon: Heart,
      label: 'My Favorites',
      value: `${user?.favorites?.length || 0} saved`,
      onClick: () => navigate('/favorites'),
      color: '#EF4444'
    },
    {
      icon: Calendar,
      label: 'My Bookings',
      value: '0 active',
      onClick: () => {},
      color: '#3B82F6'
    },
    {
      icon: Star,
      label: 'My Reviews',
      value: '0 reviews',
      onClick: () => {},
      color: '#FFB347'
    },
    {
      icon: MapPin,
      label: 'Saved Locations',
      value: '0 saved',
      onClick: () => {},
      color: '#10B981'
    },
    {
      icon: Shield,
      label: 'Account Security',
      value: '',
      onClick: () => {},
      color: '#8B5CF6'
    },
    {
      icon: Settings,
      label: 'Settings',
      value: '',
      onClick: () => {},
      color: '#A0A0B0'
    },
    {
      icon: HelpCircle,
      label: 'Help & Support',
      value: '',
      onClick: () => {},
      color: '#06B6D4'
    }
  ]

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <div style={{
      width: '100%',
      height: '100vh',
      background: 'linear-gradient(180deg, #0D0D0D 0%, #1A1A2E 100%)',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden'
    }}>
      {/* Header */}
      <div style={{
        padding: '16px 20px',
        paddingTop: 'env(safe-area-inset-top, 16px)',
        background: 'rgba(13, 13, 13, 0.8)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(255,255,255,0.05)',
        zIndex: 50
      }}>
        <h2 style={{ fontSize: '22px', fontWeight: 700, color: '#F5F5F5' }}>
          Profile
        </h2>
      </div>

      {/* Profile Content */}
      <div style={{
        flex: 1,
        overflowY: 'auto',
        padding: '20px',
        paddingBottom: '100px',
        WebkitOverflowScrolling: 'touch'
      }} className="scroll-container">
        {/* User Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            background: 'rgba(255,255,255,0.05)',
            backdropFilter: 'blur(16px)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: '20px',
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginBottom: '24px'
          }}
        >
          {/* Avatar */}
          <div style={{
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #FF6B35 0%, #FFB347 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '16px',
            border: '3px solid rgba(255,255,255,0.1)'
          }}>
            <User size={36} color="white" />
          </div>

          <h3 style={{
            fontSize: '20px',
            fontWeight: 700,
            color: '#F5F5F5',
            marginBottom: '4px'
          }}>
            {user?.name || 'Guest User'}
          </h3>
          <p style={{
            fontSize: '14px',
            color: '#A0A0B0',
            marginBottom: '4px'
          }}>
            {user?.email}
          </p>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            marginTop: '8px',
            padding: '4px 12px',
            background: user?.type === 'owner' ? 'rgba(255,107,53,0.15)' : 'rgba(59,130,246,0.15)',
            borderRadius: '20px'
          }}>
            {user?.type === 'owner' ? (
              <Building2 size={14} color="#FF6B35" />
            ) : (
              <User size={14} color="#3B82F6" />
            )}
            <span style={{
              fontSize: '12px',
              fontWeight: 600,
              color: user?.type === 'owner' ? '#FF6B35' : '#3B82F6',
              textTransform: 'capitalize'
            }}>
              {user?.type || 'Traveler'}
            </span>
          </div>
        </motion.div>

        {/* Menu Items */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {menuItems.map((item, index) => {
            const Icon = item.icon
            return (
              <motion.button
                key={item.label}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                onClick={item.onClick}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '14px',
                  padding: '14px 16px',
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.06)',
                  borderRadius: '14px',
                  cursor: 'pointer',
                  width: '100%',
                  textAlign: 'left',
                  transition: 'all 0.3s ease'
                }}
                whileHover={{ background: 'rgba(255,255,255,0.06)', scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
              >
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '12px',
                  background: `${item.color}15`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Icon size={20} color={item.color} />
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: '15px', fontWeight: 500, color: '#F5F5F5' }}>
                    {item.label}
                  </p>
                  {item.value && (
                    <p style={{ fontSize: '13px', color: '#A0A0B0', marginTop: '2px' }}>
                      {item.value}
                    </p>
                  )}
                </div>
                <ChevronRight size={18} color="#A0A0B0" />
              </motion.button>
            )
          })}
        </div>

        {/* Logout Button */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          onClick={() => setShowLogoutConfirm(true)}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px',
            width: '100%',
            padding: '16px',
            marginTop: '24px',
            background: 'rgba(239,68,68,0.1)',
            border: '1px solid rgba(239,68,68,0.2)',
            borderRadius: '14px',
            color: '#EF4444',
            fontSize: '15px',
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'all 0.3s ease'
          }}
          whileHover={{ background: 'rgba(239,68,68,0.2)' }}
          whileTap={{ scale: 0.98 }}
        >
          <LogOut size={18} />
          Log Out
        </motion.button>

        <p style={{
          textAlign: 'center',
          marginTop: '20px',
          fontSize: '12px',
          color: '#666'
        }}>
          Stay Near v1.0.0
        </p>
      </div>

      {/* Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0,0,0,0.7)',
            backdropFilter: 'blur(10px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 200,
            padding: '20px'
          }}
          onClick={() => setShowLogoutConfirm(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            style={{
              background: 'rgba(26, 26, 46, 0.95)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '20px',
              padding: '24px',
              width: '100%',
              maxWidth: '320px',
              textAlign: 'center'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{
              width: '56px',
              height: '56px',
              borderRadius: '50%',
              background: 'rgba(239,68,68,0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 16px'
            }}>
              <LogOut size={24} color="#EF4444" />
            </div>
            <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#F5F5F5', marginBottom: '8px' }}>
              Log Out?
            </h3>
            <p style={{ fontSize: '14px', color: '#A0A0B0', marginBottom: '24px' }}>
              Are you sure you want to log out of Stay Near?
            </p>
            <div style={{ display: 'flex', gap: '12px' }}>
              <button
                onClick={() => setShowLogoutConfirm(false)}
                style={{
                  flex: 1,
                  padding: '12px',
                  borderRadius: '12px',
                  border: '1px solid rgba(255,255,255,0.1)',
                  background: 'rgba(255,255,255,0.05)',
                  color: '#A0A0B0',
                  fontSize: '15px',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                style={{
                  flex: 1,
                  padding: '12px',
                  borderRadius: '12px',
                  border: 'none',
                  background: '#EF4444',
                  color: 'white',
                  fontSize: '15px',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                Log Out
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  )
}

export default Profile
