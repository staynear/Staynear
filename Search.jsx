import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Search, MapPin, Star, Heart, SlidersHorizontal, X, ChevronDown } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { hostels, schools, locations } from '../data/mockData'

const Search = () => {
  const navigate = useNavigate()
  const { user, updateUser } = useAuth()
  const [query, setQuery] = useState('')
  const [results, setResults] = useState(hostels)
  const [showFilters, setShowFilters] = useState(false)
  const [filters, setFilters] = useState({
    school: '',
    location: '',
    minPrice: '',
    maxPrice: '',
    roomType: '',
    rating: 0
  })

  useEffect(() => {
    let filtered = hostels

    if (query) {
      filtered = filtered.filter(h =>
        h.name.toLowerCase().includes(query.toLowerCase()) ||
        h.location.toLowerCase().includes(query.toLowerCase()) ||
        h.nearSchool.toLowerCase().includes(query.toLowerCase())
      )
    }

    if (filters.school) {
      filtered = filtered.filter(h => h.nearSchool === filters.school)
    }

    if (filters.location) {
      filtered = filtered.filter(h => h.location === filters.location)
    }

    if (filters.minPrice) {
      filtered = filtered.filter(h => h.price >= parseInt(filters.minPrice))
    }

    if (filters.maxPrice) {
      filtered = filtered.filter(h => h.price <= parseInt(filters.maxPrice))
    }

    if (filters.roomType) {
      filtered = filtered.filter(h => h.roomTypes.includes(filters.roomType))
    }

    if (filters.rating > 0) {
      filtered = filtered.filter(h => h.rating >= filters.rating)
    }

    setResults(filtered)
  }, [query, filters])

  const toggleFavorite = (hostelId) => {
    const currentFavorites = user?.favorites || []
    const newFavorites = currentFavorites.includes(hostelId)
      ? currentFavorites.filter(id => id !== hostelId)
      : [...currentFavorites, hostelId]
    updateUser({ favorites: newFavorites })
  }

  const isFavorite = (hostelId) => user?.favorites?.includes(hostelId) || false

  const clearFilters = () => {
    setFilters({
      school: '',
      location: '',
      minPrice: '',
      maxPrice: '',
      roomType: '',
      rating: 0
    })
  }

  const roomTypes = ['Single', 'Double', '4-Bed Shared', '6-Bed Shared', 'Suite', 'Studio']

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
        <h2 style={{ fontSize: '22px', fontWeight: 700, color: '#F5F5F5', marginBottom: '16px' }}>
          Search
        </h2>

        <div style={{ display: 'flex', gap: '10px' }}>
          <div style={{ flex: 1, position: 'relative' }}>
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
              placeholder="Search hostels, schools, locations..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="glass-input"
              style={{ paddingLeft: '48px' }}
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                style={{
                  position: 'absolute',
                  right: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  color: '#A0A0B0',
                  cursor: 'pointer'
                }}
              >
                <X size={18} />
              </button>
            )}
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            style={{
              width: '44px',
              height: '44px',
              borderRadius: '12px',
              background: showFilters ? 'rgba(255,107,53,0.2)' : 'rgba(255,255,255,0.05)',
              border: `1.5px solid ${showFilters ? '#FF6B35' : 'rgba(255,255,255,0.1)'}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: showFilters ? '#FF6B35' : '#A0A0B0',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
          >
            <SlidersHorizontal size={20} />
          </button>
        </div>
      </div>

      {/* Filters Panel */}
      {showFilters && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          style={{
            background: 'rgba(26, 26, 46, 0.95)',
            backdropFilter: 'blur(20px)',
            borderBottom: '1px solid rgba(255,255,255,0.05)',
            padding: '16px 20px',
            overflow: 'hidden'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <span style={{ fontSize: '14px', fontWeight: 600, color: '#F5F5F5' }}>Filters</span>
            <button
              onClick={clearFilters}
              style={{
                background: 'none',
                border: 'none',
                color: '#FF6B35',
                fontSize: '13px',
                cursor: 'pointer',
                fontWeight: 500
              }}
            >
              Clear all
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {/* School filter */}
            <div>
              <label style={{ fontSize: '12px', color: '#A0A0B0', marginBottom: '6px', display: 'block' }}>Near School</label>
              <select
                value={filters.school}
                onChange={(e) => setFilters({ ...filters, school: e.target.value })}
                className="glass-input"
                style={{ padding: '10px 14px', fontSize: '14px' }}
              >
                <option value="" style={{ background: '#1A1A2E' }}>All Schools</option>
                {schools.map(s => (
                  <option key={s} value={s} style={{ background: '#1A1A2E' }}>{s}</option>
                ))}
              </select>
            </div>

            {/* Location filter */}
            <div>
              <label style={{ fontSize: '12px', color: '#A0A0B0', marginBottom: '6px', display: 'block' }}>Location</label>
              <select
                value={filters.location}
                onChange={(e) => setFilters({ ...filters, location: e.target.value })}
                className="glass-input"
                style={{ padding: '10px 14px', fontSize: '14px' }}
              >
                <option value="" style={{ background: '#1A1A2E' }}>All Locations</option>
                {locations.map(l => (
                  <option key={l} value={l} style={{ background: '#1A1A2E' }}>{l}</option>
                ))}
              </select>
            </div>

            {/* Price range */}
            <div style={{ display: 'flex', gap: '10px' }}>
              <div style={{ flex: 1 }}>
                <label style={{ fontSize: '12px', color: '#A0A0B0', marginBottom: '6px', display: 'block' }}>Min Price (GHS)</label>
                <input
                  type="number"
                  placeholder="0"
                  value={filters.minPrice}
                  onChange={(e) => setFilters({ ...filters, minPrice: e.target.value })}
                  className="glass-input"
                  style={{ padding: '10px 14px', fontSize: '14px' }}
                />
              </div>
              <div style={{ flex: 1 }}>
                <label style={{ fontSize: '12px', color: '#A0A0B0', marginBottom: '6px', display: 'block' }}>Max Price (GHS)</label>
                <input
                  type="number"
                  placeholder="5000"
                  value={filters.maxPrice}
                  onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })}
                  className="glass-input"
                  style={{ padding: '10px 14px', fontSize: '14px' }}
                />
              </div>
            </div>

            {/* Room type */}
            <div>
              <label style={{ fontSize: '12px', color: '#A0A0B0', marginBottom: '6px', display: 'block' }}>Room Type</label>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {roomTypes.map(type => (
                  <button
                    key={type}
                    onClick={() => setFilters({ ...filters, roomType: filters.roomType === type ? '' : type })}
                    style={{
                      padding: '6px 12px',
                      borderRadius: '8px',
                      border: `1.5px solid ${filters.roomType === type ? '#FF6B35' : 'rgba(255,255,255,0.1)'}`,
                      background: filters.roomType === type ? 'rgba(255,107,53,0.15)' : 'rgba(255,255,255,0.03)',
                      color: filters.roomType === type ? '#FF6B35' : '#A0A0B0',
                      fontSize: '12px',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* Rating */}
            <div>
              <label style={{ fontSize: '12px', color: '#A0A0B0', marginBottom: '6px', display: 'block' }}>Minimum Rating</label>
              <div style={{ display: 'flex', gap: '8px' }}>
                {[1, 2, 3, 4, 5].map(star => (
                  <button
                    key={star}
                    onClick={() => setFilters({ ...filters, rating: filters.rating === star ? 0 : star })}
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '10px',
                      border: `1.5px solid ${filters.rating === star ? '#FF6B35' : 'rgba(255,255,255,0.1)'}`,
                      background: filters.rating === star ? 'rgba(255,107,53,0.15)' : 'rgba(255,255,255,0.03)',
                      color: filters.rating === star ? '#FF6B35' : '#A0A0B0',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      fontSize: '14px',
                      fontWeight: 600
                    }}
                  >
                    {star}+
                  </button>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Results */}
      <div style={{
        flex: 1,
        overflowY: 'auto',
        padding: '16px 20px 100px',
        WebkitOverflowScrolling: 'touch'
      }} className="scroll-container">
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '16px'
        }}>
          <span style={{ fontSize: '14px', color: '#A0A0B0' }}>
            {results.length} hostel{results.length !== 1 ? 's' : ''} found
          </span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {results.map((hostel, index) => (
            <motion.div
              key={hostel.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              onClick={() => navigate(`/hostel/${hostel.id}`)}
              style={{
                display: 'flex',
                gap: '14px',
                background: 'rgba(255,255,255,0.05)',
                backdropFilter: 'blur(16px)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '16px',
                padding: '12px',
                cursor: 'pointer',
                transition: 'transform 0.3s ease'
              }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Thumbnail */}
              <div style={{
                width: '100px',
                height: '100px',
                borderRadius: '12px',
                overflow: 'hidden',
                flexShrink: 0
              }}>
                <img
                  src={hostel.images[0]}
                  alt={hostel.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>

              {/* Info */}
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start'
                  }}>
                    <h4 style={{ fontSize: '15px', fontWeight: 600, color: '#F5F5F5' }}>
                      {hostel.name}
                    </h4>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        toggleFavorite(hostel.id)
                      }}
                      style={{
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        color: isFavorite(hostel.id) ? '#EF4444' : '#A0A0B0',
                        padding: '4px'
                      }}
                    >
                      <Heart size={18} fill={isFavorite(hostel.id) ? '#EF4444' : 'none'} />
                    </button>
                  </div>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    marginTop: '4px'
                  }}>
                    <MapPin size={12} color="#A0A0B0" />
                    <span style={{ fontSize: '12px', color: '#A0A0B0' }}>
                      {hostel.location}
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
            </motion.div>
          ))}
        </div>

        {results.length === 0 && (
          <div style={{ textAlign: 'center', padding: '60px 20px' }}>
            <Search size={48} color="#A0A0B0" style={{ marginBottom: '16px', opacity: 0.5 }} />
            <p style={{ color: '#A0A0B0', fontSize: '16px' }}>No hostels match your criteria</p>
            <button
              onClick={clearFilters}
              style={{
                marginTop: '12px',
                background: 'none',
                border: 'none',
                color: '#FF6B35',
                fontSize: '14px',
                cursor: 'pointer',
                fontWeight: 500
              }}
            >
              Clear filters
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Search
