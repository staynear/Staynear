import React from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Heart, MapPin, Star, Trash2 } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { hostels } from '../data/mockData'

const Favorites = () => {
  const navigate = useNavigate()
  const { user, updateUser } = useAuth()

  const favoriteHostels = hostels.filter(h => user?.favorites?.includes(h.id))

  const removeFavorite = (hostelId) => {
    const newFavorites = user.favorites.filter(id => id !== hostelId)
    updateUser({ favorites: newFavorites })
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
          My Favorites
        </h2>
        <p style={{ fontSize: '14px', color: '#A0A0B0', marginTop: '4px' }}>
          {favoriteHostels.length} saved hostel{favoriteHostels.length !== 1 ? 's' : ''}
        </p>
      </div>

      {/* Favorites List */}
      <div style={{
        flex: 1,
        overflowY: 'auto',
        padding: '16px 20px 100px',
        WebkitOverflowScrolling: 'touch'
      }} className="scroll-container">
        {favoriteHostels.length > 0 ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {favoriteHostels.map((hostel, index) => (
              <motion.div
                key={hostel.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                style={{
                  display: 'flex',
                  gap: '14px',
                  background: 'rgba(255,255,255,0.05)',
                  backdropFilter: 'blur(16px)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: '16px',
                  padding: '12px',
                  position: 'relative'
                }}
              >
                {/* Thumbnail */}
                <div
                  onClick={() => navigate(`/hostel/${hostel.id}`)}
                  style={{
                    width: '100px',
                    height: '100px',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    flexShrink: 0,
                    cursor: 'pointer'
                  }}
                >
                  <img
                    src={hostel.images[0]}
                    alt={hostel.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>

                {/* Info */}
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <h4
                      onClick={() => navigate(`/hostel/${hostel.id}`)}
                      style={{
                        fontSize: '15px',
                        fontWeight: 600,
                        color: '#F5F5F5',
                        cursor: 'pointer'
                      }}
                    >
                      {hostel.name}
                    </h4>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      marginTop: '4px'
                    }}>
                      <MapPin size={12} color="#A0A0B0" />
                      <span style={{ fontSize: '12px', color: '#A0A0B0' }}>
                        {hostel.location} · {hostel.distance}
                      </span>
                    </div>
                  </div>

                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}>
                      <Star size={14} fill="#FFB347" color="#FFB347" />
                      <span style={{ fontSize: '13px', fontWeight: 600, color: '#FFB347' }}>
                        {hostel.rating}
                      </span>
                      <span style={{ fontSize: '12px', color: '#A0A0B0' }}>
                        ({hostel.reviews})
                      </span>
                    </div>
                    <span style={{
                      fontSize: '14px',
                      fontWeight: 700,
                      color: '#FF6B35'
                    }}>
                      GHS {hostel.price.toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* Remove button */}
                <button
                  onClick={() => removeFavorite(hostel.id)}
                  style={{
                    position: 'absolute',
                    top: '8px',
                    right: '8px',
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    background: 'rgba(239,68,68,0.15)',
                    border: '1px solid rgba(239,68,68,0.3)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    color: '#EF4444'
                  }}
                >
                  <Trash2 size={14} />
                </button>
              </motion.div>
            ))}
          </div>
        ) : (
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '60vh',
            textAlign: 'center',
            padding: '0 40px'
          }}>
            <div style={{
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              background: 'rgba(255,255,255,0.05)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '20px'
            }}>
              <Heart size={36} color="#A0A0B0" />
            </div>
            <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#F5F5F5', marginBottom: '8px' }}>
              No Favorites Yet
            </h3>
            <p style={{ fontSize: '14px', color: '#A0A0B0', lineHeight: 1.6 }}>
              Save hostels you like by tapping the heart icon on any listing
            </p>
            <button
              onClick={() => navigate('/home')}
              className="btn-primary"
              style={{ marginTop: '24px', maxWidth: '200px' }}
            >
              Explore Hostels
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Favorites
