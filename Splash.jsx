import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import Logo from '../components/Logo'

const Splash = () => {
  const navigate = useNavigate()
  const [showContent, setShowContent] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowContent(false)
      setTimeout(() => {
        navigate('/login')
      }, 500)
    }, 3000)

    return () => clearTimeout(timer)
  }, [navigate])

  return (
    <div style={{
      width: '100%',
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(180deg, #0D0D0D 0%, #1A1A2E 40%, #2D1810 70%, #FF6B35 100%)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Animated background particles */}
      <div style={{
        position: 'absolute',
        width: '100%',
        height: '100%',
        overflow: 'hidden'
      }}>
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            style={{
              position: 'absolute',
              width: `${80 + i * 40}px`,
              height: `${80 + i * 40}px`,
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(255,107,53,0.15) 0%, transparent 70%)',
              left: `${15 + i * 15}%`,
              top: `${20 + i * 12}%`
            }}
            animate={{
              y: [0, -30, 0],
              scale: [1, 1.1, 1],
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.5
            }}
          />
        ))}
      </div>

      <AnimatePresence>
        {showContent && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9, y: -20 }}
            transition={{ duration: 0.5 }}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              zIndex: 10
            }}
          >
            <Logo size={160} showText={true} showTagline={true} />

            {/* Loading dots */}
            <div style={{
              display: 'flex',
              gap: '8px',
              marginTop: '40px'
            }}>
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    background: '#FF6B35'
                  }}
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.5, 1, 0.5]
                  }}
                  transition={{
                    duration: 1.2,
                    repeat: Infinity,
                    delay: i * 0.3
                  }}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Splash
