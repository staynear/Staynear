import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Home, Search, Heart, User } from 'lucide-react'
import { motion } from 'framer-motion'

const BottomNav = () => {
  const location = useLocation()
  const navigate = useNavigate()

  const tabs = [
    { path: '/home', icon: Home, label: 'Home' },
    { path: '/search', icon: Search, label: 'Search' },
    { path: '/favorites', icon: Heart, label: 'Favorites' },
    { path: '/profile', icon: User, label: 'Profile' }
  ]

  return (
    <div style={{
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      zIndex: 100,
      background: 'rgba(13, 13, 13, 0.85)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      borderTop: '1px solid rgba(255, 255, 255, 0.08)',
      paddingBottom: 'env(safe-area-inset-bottom, 12px)',
      paddingTop: '8px'
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        maxWidth: 500,
        margin: '0 auto'
      }}>
        {tabs.map((tab) => {
          const isActive = location.pathname === tab.path
          const Icon = tab.icon

          return (
            <motion.button
              key={tab.path}
              onClick={() => navigate(tab.path)}
              whileTap={{ scale: 0.9 }}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '4px',
                padding: '6px 16px',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: isActive ? '#FF6B35' : '#A0A0B0',
                transition: 'color 0.3s ease',
                position: 'relative'
              }}
            >
              <Icon size={24} strokeWidth={isActive ? 2.5 : 1.5} fill={isActive ? '#FF6B35' : 'none'} />
              <span style={{ fontSize: '11px', fontWeight: isActive ? 600 : 400 }}>
                {tab.label}
              </span>
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  style={{
                    position: 'absolute',
                    bottom: -2,
                    width: '40%',
                    height: '3px',
                    background: '#FF6B35',
                    borderRadius: '3px 3px 0 0'
                  }}
                />
              )}
            </motion.button>
          )
        })}
      </div>
    </div>
  )
}

export default BottomNav
