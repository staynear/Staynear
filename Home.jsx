import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Search, MapPin, Star, Heart, Filter, Bell } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { hostels, categories } from '../data/mockData'

const Home = () => {
  const navigate = useNavigate()
  const { user, updateUser } = useAuth()
  const [searchQuery, setSearchQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState('all')
  const [featuredHostels, setFeaturedHostels] = useState(hostels)

  useEffect(() => {
    let filtered = hostels

    if (searchQuery) {
      filtered = filtered.filter(h => 
        h.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        h.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        h.nearSchool.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    if (activeCategory === 'budget') {
      filtered = filtered.filter(h => h.price <= 2000)
    } else if (activeCategory === 'premium') {
      filtered = filtered.filter(h => h.price >= 3500)
    } else if (activeCategory === 'near-campus') {
      filtered = filtered.filter(h => parseFloat(h.distance) <= 1.0)
    }

    setFeaturedHostels(filtered)
  }, [searchQuery, activeCategory])

  const toggleFavorite = (hostelId) => {
    const currentFavorites = user?.favorites || []
    const newFavorites = currentFavorites.includes(hostelId)
      ? currentFavorites.filter(id => id !== hostelId)
      : [...currentFavorites, hostelId]
    updateUser({ favorites: newFavorites })
  }

  const isFavorite = (hostelId) => user?.favorites?.includes(hostelId) || false

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
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '16px'
        }}>
          <div>
            <p style={{ fontSize: '13px', color: '#A0A0B0', marginBottom: '2px' }}>Good morning,</p>
            <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#F5F5F5' }}>
              {user?.name?.split(' ')[0] || 'Guest'}
            </h2>
          </div>
          <button style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#F5F5F5',
            cursor: 'pointer',
            position: 'relative'
          }}>
            <Bell size={20} />
            <span style={{
              position: 'absolute',
              top: '8px',
              right: '8px',
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: '#EF4444'
            }} />
          </button>
        </div>

        {/* Search Bar */}
        <div style={{
          position: 'relative',
          width: '100%'
        }}>
          <Search size={18} style={{
            position: 'absolute',
            left: '16px',
            top: '50%',
            transform: 'translateY(-50%)',
            color: '#A0A0B0',
            zIndex: 2
          }} />
          <input
            type="text"
            placeholder="Search hostels, locations, schools..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="glass-input"
            style={{ paddingLeft: '48px', paddingRight: '48px' }}
          />
          <button
            onClick={() => navigate('/search')}
            style={{
              position: 'absolute',
              right: '12px',
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'rgba(255,107,53,0.2)',
              border: '1px solid rgba(255,107,53,0.3)',
              borderRadius: '8px',
              padding: '6px',
              color: '#FF6B35',
              cursor: 'pointer'
            }}
          >
            <Filter size={16} />
          </button>
        </div>
      </div>

      {/* Categories */}
      <div style={{
        display: 'flex',
        gap: '10px',
        padding: '16px 20px',
        overflowX: 'auto',
        scrollbarWidth: 'none',
        WebkitOverflowScrolling: 'touch'
      }}>
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            style={{
              padding: '8px 16px',
              borderRadius: '20px',
              border: `1.5px solid ${activeCategory === cat.id ? '#FF6B35' : 'rgba(255,255,255,0.1)'}`,
              background: activeCategory === cat.id ? 'rgba(255,107,53,0.15)' : 'rgba(255,255,255,0.03)',
              color: activeCategory === cat.id ? '#FF6B35' : '#A0A0B0',
              fontSize: '13px',
              fontWeight: 500,
              whiteSpace: 'nowrap',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              backdropFilter: 'blur(10px)'
            }}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Hostel List */}
      <div style={{
        flex: 1,
        overflowY: 'auto',
        padding: '0 20px 100px',
        WebkitOverflowScrolling: 'touch'
      }} className="scroll-container">
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '16px'
        }}>
          <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#F5F5F5' }}>
            {searchQuery ? 'Search Results' : 'Featured Hostels'}
          </h3>
          <span style={{ fontSize: '13px', color: '#A0A0B0' }}>
            {featuredHostels.length} found
          </span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {featuredHostels.map((hostel, index) => (
            <motion.div
              key={hostel.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => navigate(`/hostel/${hostel.id}`)}
              style={{
                background: 'rgba(255,255,255,0.05)',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '16px',
                overflow: 'hidden',
                cursor: 'pointer',
                transition: 'transform 0.3s ease'
              }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Image */}
              <div style={{ position: 'relative', height: '180px', overflow: 'hidden' }}>
                <img
                  src={hostel.images[0]}
                  alt={hostel.name}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }}
                />
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 50%)'
                }} />

                {/* Favorite button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    toggleFavorite(hostel.id)
                  }}
                  style={{
                    position: 'absolute',
                    top: '12px',
                    right: '12px',
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    background: 'rgba(0,0,0,0.4)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255,255,255,0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    color: isFavorite(hostel.id) ? '#EF4444' : '#F5F5F5'
                  }}
                >
                  <Heart size={18} fill={isFavorite(hostel.id) ? '#EF4444' : 'none'} />
                </button>

                {/* Price badge */}
                <div style={{
                  position: 'absolute',
                  bottom: '12px',
                  left: '12px',
                  padding: '6px 12px',
                  background: 'rgba(255,107,53,0.9)',
                  borderRadius: '20px',
                  fontSize: '14px',
                  fontWeight: 700,
                  color: 'white'
                }}>
                  GHS {hostel.price.toLocaleString()}/{hostel.period}
                </div>
              </div>

              {/* Info */}
              <div style={{ padding: '16px' }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  marginBottom: '8px'
                }}>
                  <h4 style={{
                    fontSize: '17px',
                    fontWeight: 600,
                    color: '#F5F5F5',
                    flex: 1
                  }}>
                    {hostel.name}
                  </h4>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    background: 'rgba(255,179,71,0.15)',
                    padding: '4px 8px',
                    borderRadius: '8px'
                  }}>
                    <Star size={14} fill="#FFB347" color="#FFB347" />
                    <span style={{ fontSize: '13px', fontWeight: 600, color: '#FFB347' }}>
                      {hostel.rating}
                    </span>
                  </div>
                </div>

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  marginBottom: '8px'
                }}>
                  <MapPin size={14} color="#A0A0B0" />
                  <span style={{ fontSize: '13px', color: '#A0A0B0' }}>
                    {hostel.location} · {hostel.distance}
                  </span>
                </div>

                <p style={{
                  fontSize: '13px',
                  color: '#A0A0B0',
                  lineHeight: 1.5,
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden'
                }}>
                  {hostel.description}
                </p>

                {/* Facilities preview */}
                <div style={{
                  display: 'flex',
                  gap: '8px',
                  marginTop: '12px',
                  flexWrap: 'wrap'
                }}>
                  {hostel.facilities.slice(0, 3).map((facility, i) => (
                    <span key={i} style={{
                      padding: '4px 10px',
                      background: 'rgba(255,255,255,0.05)',
                      borderRadius: '8px',
                      fontSize: '12px',
                      color: '#A0A0B0'
                    }}>
                      {facility}
                    </span>
                  ))}
                  {hostel.facilities.length > 3 && (
                    <span style={{
                      padding: '4px 10px',
                      background: 'rgba(255,255,255,0.05)',
                      borderRadius: '8px',
                      fontSize: '12px',
                      color: '#A0A0B0'
                    }}>
                      +{hostel.facilities.length - 3}
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {featuredHostels.length === 0 && (
          <div style={{
            textAlign: 'center',
            padding: '60px 20px'
          }}>
            <Search size={48} color="#A0A0B0" style={{ marginBottom: '16px', opacity: 0.5 }} />
            <p style={{ color: '#A0A0B0', fontSize: '16px' }}>No hostels found</p>
            <p style={{ color: '#666', fontSize: '14px', marginTop: '8px' }}>Try adjusting your search</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Home
