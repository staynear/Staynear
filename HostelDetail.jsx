import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, MapPin, Star, Heart, Share2, Phone, MessageCircle, Mail, Wifi, Shield, Check, X, ChevronLeft, ChevronRight, Home, Clock, Users, Ruler } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { hostels } from '../data/mockData'

const HostelDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { user, updateUser } = useAuth()
  const [hostel, setHostel] = useState(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [showContactModal, setShowContactModal] = useState(false)
  const [showBookingModal, setShowBookingModal] = useState(false)
  const [selectedRoom, setSelectedRoom] = useState('')

  useEffect(() => {
    const found = hostels.find(h => h.id === parseInt(id))
    if (found) setHostel(found)
  }, [id])

  if (!hostel) {
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
          border: '3px solid rgba(255,107,53,0.2)',
          borderTop: '3px solid #FF6B35',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite'
        }} />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    )
  }

  const isFavorite = user?.favorites?.includes(hostel.id) || false

  const toggleFavorite = () => {
    const currentFavorites = user?.favorites || []
    const newFavorites = currentFavorites.includes(hostel.id)
      ? currentFavorites.filter(fid => fid !== hostel.id)
      : [...currentFavorites, hostel.id]
    updateUser({ favorites: newFavorites })
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % hostel.images.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + hostel.images.length) % hostel.images.length)
  }

  const facilityIcons = {
    'WiFi': Wifi,
    'Security': Shield,
    'AC': Home,
    'Kitchen': Home,
    'Laundry': Home,
    'Parking': Home,
    'Gym': Home,
    'Pool': Home,
    'Study Room': Home,
    'Common Room': Users,
    'Rooftop': Home,
    'Balcony': Home,
    'Smart TV': Home,
    'Garden': Home,
    'Solar Power': Home,
    'Bicycle Storage': Home,
    'Water Supply': Home,
    'Study Area': Home,
    'CCTV': Shield
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
      {/* Image Gallery */}
      <div style={{
        position: 'relative',
        height: '300px',
        flexShrink: 0
      }}>
        <AnimatePresence mode="wait">
          <motion.img
            key={currentImageIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            src={hostel.images[currentImageIndex]}
            alt={hostel.name}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              position: 'absolute'
            }}
          />
        </AnimatePresence>

        {/* Overlay gradient */}
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '120px',
          background: 'linear-gradient(to top, #0D0D0D 0%, transparent 100%)'
        }} />

        {/* Top buttons */}
        <div style={{
          position: 'absolute',
          top: 'env(safe-area-inset-top, 16px)',
          left: 0,
          right: 0,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '12px 16px',
          zIndex: 10
        }}>
          <button
            onClick={() => navigate(-1)}
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              background: 'rgba(0,0,0,0.4)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255,255,255,0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: 'white'
            }}
          >
            <ArrowLeft size={20} />
          </button>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              onClick={toggleFavorite}
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                background: 'rgba(0,0,0,0.4)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255,255,255,0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                color: isFavorite ? '#EF4444' : 'white'
              }}
            >
              <Heart size={20} fill={isFavorite ? '#EF4444' : 'none'} />
            </button>
            <button
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                background: 'rgba(0,0,0,0.4)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255,255,255,0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                color: 'white'
              }}
            >
              <Share2 size={20} />
            </button>
          </div>
        </div>

        {/* Image navigation */}
        {hostel.images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              style={{
                position: 'absolute',
                left: '12px',
                top: '50%',
                transform: 'translateY(-50%)',
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                background: 'rgba(0,0,0,0.4)',
                border: '1px solid rgba(255,255,255,0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                color: 'white',
                zIndex: 5
              }}
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={nextImage}
              style={{
                position: 'absolute',
                right: '12px',
                top: '50%',
                transform: 'translateY(-50%)',
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                background: 'rgba(0,0,0,0.4)',
                border: '1px solid rgba(255,255,255,0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                color: 'white',
                zIndex: 5
              }}
            >
              <ChevronRight size={20} />
            </button>
            {/* Dots */}
            <div style={{
              position: 'absolute',
              bottom: '16px',
              left: '50%',
              transform: 'translateX(-50%)',
              display: 'flex',
              gap: '6px',
              zIndex: 5
            }}>
              {hostel.images.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentImageIndex(i)}
                  style={{
                    width: i === currentImageIndex ? '20px' : '8px',
                    height: '8px',
                    borderRadius: '4px',
                    background: i === currentImageIndex ? '#FF6B35' : 'rgba(255,255,255,0.5)',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Content */}
      <div style={{
        flex: 1,
        overflowY: 'auto',
        padding: '0 20px 120px',
        WebkitOverflowScrolling: 'touch',
        marginTop: '-20px',
        position: 'relative',
        zIndex: 10
      }} className="scroll-container">
        {/* Title Section */}
        <div style={{
          background: 'rgba(26, 26, 46, 0.95)',
          backdropFilter: 'blur(20px)',
          borderRadius: '20px 20px 0 0',
          padding: '24px 0 16px',
          margin: '0 -20px',
          paddingLeft: '20px',
          paddingRight: '20px'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            marginBottom: '12px'
          }}>
            <div style={{ flex: 1 }}>
              <h1 style={{
                fontSize: '24px',
                fontWeight: 700,
                color: '#F5F5F5',
                marginBottom: '8px'
              }}>
                {hostel.name}
              </h1>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}>
                <MapPin size={16} color="#FF6B35" />
                <span style={{ fontSize: '14px', color: '#A0A0B0' }}>
                  {hostel.location} · {hostel.distance}
                </span>
              </div>
            </div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              background: 'rgba(255,179,71,0.15)',
              padding: '6px 12px',
              borderRadius: '10px'
            }}>
              <Star size={16} fill="#FFB347" color="#FFB347" />
              <span style={{ fontSize: '15px', fontWeight: 700, color: '#FFB347' }}>
                {hostel.rating}
              </span>
              <span style={{ fontSize: '12px', color: '#A0A0B0' }}>
                ({hostel.reviews})
              </span>
            </div>
          </div>

          {/* Price */}
          <div style={{
            display: 'flex',
            alignItems: 'baseline',
            gap: '8px'
          }}>
            <span style={{
              fontSize: '28px',
              fontWeight: 800,
              color: '#FF6B35'
            }}>
              GHS {hostel.price.toLocaleString()}
            </span>
            <span style={{ fontSize: '14px', color: '#A0A0B0' }}>
              /{hostel.period}
            </span>
          </div>

          {/* Availability */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            marginTop: '12px'
          }}>
            <div style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: hostel.available ? '#10B981' : '#EF4444'
            }} />
            <span style={{
              fontSize: '13px',
              color: hostel.available ? '#10B981' : '#EF4444',
              fontWeight: 500
            }}>
              {hostel.available ? 'Available now' : 'Currently unavailable'}
            </span>
          </div>
        </div>

        {/* Description */}
        <div style={{ marginTop: '20px' }}>
          <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#F5F5F5', marginBottom: '10px' }}>
            About
          </h3>
          <p style={{
            fontSize: '14px',
            color: '#A0A0B0',
            lineHeight: 1.7
          }}>
            {hostel.description}
          </p>
        </div>

        {/* Room Types */}
        <div style={{ marginTop: '24px' }}>
          <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#F5F5F5', marginBottom: '12px' }}>
            Room Types
          </h3>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            {hostel.roomTypes.map((type, i) => (
              <button
                key={i}
                onClick={() => setSelectedRoom(type)}
                style={{
                  padding: '10px 18px',
                  borderRadius: '12px',
                  border: `1.5px solid ${selectedRoom === type ? '#FF6B35' : 'rgba(255,255,255,0.1)'}`,
                  background: selectedRoom === type ? 'rgba(255,107,53,0.15)' : 'rgba(255,255,255,0.03)',
                  color: selectedRoom === type ? '#FF6B35' : '#A0A0B0',
                  fontSize: '14px',
                  fontWeight: 500,
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <Users size={16} />
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* Facilities */}
        <div style={{ marginTop: '24px' }}>
          <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#F5F5F5', marginBottom: '12px' }}>
            Facilities
          </h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '10px'
          }}>
            {hostel.facilities.map((facility, i) => {
              const Icon = facilityIcons[facility] || Check
              return (
                <div
                  key={i}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    padding: '12px',
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.06)',
                    borderRadius: '12px'
                  }}
                >
                  <div style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '8px',
                    background: 'rgba(255,107,53,0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <Icon size={16} color="#FF6B35" />
                  </div>
                  <span style={{ fontSize: '14px', color: '#F5F5F5' }}>
                    {facility}
                  </span>
                </div>
              )
            })}
          </div>
        </div>

        {/* Rules */}
        <div style={{ marginTop: '24px' }}>
          <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#F5F5F5', marginBottom: '12px' }}>
            House Rules
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {hostel.rules.map((rule, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '12px',
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.06)',
                  borderRadius: '12px'
                }}
              >
                <Check size={16} color="#10B981" />
                <span style={{ fontSize: '14px', color: '#A0A0B0' }}>
                  {rule}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Owner Info */}
        <div style={{
          marginTop: '24px',
          padding: '16px',
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(255,255,255,0.06)',
          borderRadius: '16px'
        }}>
          <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#F5F5F5', marginBottom: '10px' }}>
            Hostel Owner
          </h3>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}>
            <div style={{
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #FF6B35 0%, #FFB347 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '18px',
              fontWeight: 700,
              color: 'white'
            }}>
              {hostel.owner.charAt(0)}
            </div>
            <div>
              <p style={{ fontSize: '15px', fontWeight: 600, color: '#F5F5F5' }}>
                {hostel.owner}
              </p>
              <p style={{ fontSize: '13px', color: '#A0A0B0' }}>
                Verified Owner
              </p>
            </div>
          </div>
        </div>

        {/* Map placeholder */}
        <div style={{ marginTop: '24px' }}>
          <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#F5F5F5', marginBottom: '12px' }}>
            Location
          </h3>
          <div style={{
            width: '100%',
            height: '200px',
            borderRadius: '16px',
            background: 'linear-gradient(135deg, #1A1A2E 0%, #2D1810 100%)',
            border: '1px solid rgba(255,255,255,0.08)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px'
          }}>
            <MapPin size={32} color="#FF6B35" />
            <p style={{ fontSize: '14px', color: '#A0A0B0' }}>
              {hostel.location}
            </p>
            <p style={{ fontSize: '13px', color: '#666' }}>
              {hostel.coordinates.lat}, {hostel.coordinates.lng}
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Action Bar */}
      <div style={{
        position: 'fixed',
        bottom: 'env(safe-area-inset-bottom, 0px)',
        left: 0,
        right: 0,
        padding: '16px 20px 24px',
        background: 'rgba(13, 13, 13, 0.95)',
        backdropFilter: 'blur(20px)',
        borderTop: '1px solid rgba(255,255,255,0.08)',
        display: 'flex',
        gap: '12px',
        zIndex: 100
      }}>
        <button
          onClick={() => setShowContactModal(true)}
          style={{
            flex: 1,
            padding: '14px',
            borderRadius: '14px',
            border: '1.5px solid rgba(255,255,255,0.1)',
            background: 'rgba(255,255,255,0.05)',
            color: '#F5F5F5',
            fontSize: '15px',
            fontWeight: 600,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px'
          }}
        >
          <Phone size={18} />
          Contact
        </button>
        <button
          onClick={() => setShowBookingModal(true)}
          disabled={!hostel.available}
          style={{
            flex: 2,
            padding: '14px',
            borderRadius: '14px',
            border: 'none',
            background: hostel.available
              ? 'linear-gradient(135deg, #FF6B35 0%, #FFB347 100%)'
              : 'rgba(255,255,255,0.05)',
            color: hostel.available ? 'white' : '#666',
            fontSize: '15px',
            fontWeight: 700,
            cursor: hostel.available ? 'pointer' : 'not-allowed',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            boxShadow: hostel.available ? '0 4px 15px rgba(255,107,53,0.3)' : 'none'
          }}
        >
          <Calendar size={18} />
          {hostel.available ? 'Book Now' : 'Unavailable'}
        </button>
      </div>

      {/* Contact Modal */}
      <AnimatePresence>
        {showContactModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'rgba(0,0,0,0.7)',
              backdropFilter: 'blur(10px)',
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'center',
              zIndex: 200
            }}
            onClick={() => setShowContactModal(false)}
          >
            <motion.div
              initial={{ y: 300 }}
              animate={{ y: 0 }}
              exit={{ y: 300 }}
              transition={{ type: 'spring', damping: 25 }}
              style={{
                background: 'rgba(26, 26, 46, 0.98)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '24px 24px 0 0',
                padding: '24px',
                width: '100%',
                maxWidth: '500px',
                maxHeight: '70vh',
                overflowY: 'auto'
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div style={{
                width: '40px',
                height: '4px',
                borderRadius: '2px',
                background: 'rgba(255,255,255,0.2)',
                margin: '0 auto 20px'
              }} />

              <h3 style={{
                fontSize: '20px',
                fontWeight: 700,
                color: '#F5F5F5',
                marginBottom: '8px',
                textAlign: 'center'
              }}>
                Contact Owner
              </h3>
              <p style={{
                fontSize: '14px',
                color: '#A0A0B0',
                textAlign: 'center',
                marginBottom: '24px'
              }}>
                Choose how you'd like to reach {hostel.owner}
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <a
                  href={`https://wa.me/${hostel.contact.whatsapp.replace(/\D/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '14px',
                    padding: '16px',
                    background: 'rgba(37, 211, 102, 0.1)',
                    border: '1px solid rgba(37, 211, 102, 0.2)',
                    borderRadius: '14px',
                    color: '#25D366',
                    textDecoration: 'none',
                    fontSize: '15px',
                    fontWeight: 500
                  }}
                >
                  <MessageCircle size={22} />
                  <div>
                    <p style={{ fontWeight: 600 }}>WhatsApp</p>
                    <p style={{ fontSize: '13px', opacity: 0.8, marginTop: '2px' }}>
                      {hostel.contact.whatsapp}
                    </p>
                  </div>
                </a>

                <a
                  href={`tel:${hostel.contact.phone}`}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '14px',
                    padding: '16px',
                    background: 'rgba(59, 130, 246, 0.1)',
                    border: '1px solid rgba(59, 130, 246, 0.2)',
                    borderRadius: '14px',
                    color: '#3B82F6',
                    textDecoration: 'none',
                    fontSize: '15px',
                    fontWeight: 500
                  }}
                >
                  <Phone size={22} />
                  <div>
                    <p style={{ fontWeight: 600 }}>Phone Call</p>
                    <p style={{ fontSize: '13px', opacity: 0.8, marginTop: '2px' }}>
                      {hostel.contact.phone}
                    </p>
                  </div>
                </a>

                <a
                  href={`mailto:${hostel.contact.email}`}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '14px',
                    padding: '16px',
                    background: 'rgba(239, 68, 68, 0.1)',
                    border: '1px solid rgba(239, 68, 68, 0.2)',
                    borderRadius: '14px',
                    color: '#EF4444',
                    textDecoration: 'none',
                    fontSize: '15px',
                    fontWeight: 500
                  }}
                >
                  <Mail size={22} />
                  <div>
                    <p style={{ fontWeight: 600 }}>Email</p>
                    <p style={{ fontSize: '13px', opacity: 0.8, marginTop: '2px' }}>
                      {hostel.contact.email}
                    </p>
                  </div>
                </a>
              </div>

              <button
                onClick={() => setShowContactModal(false)}
                style={{
                  width: '100%',
                  padding: '14px',
                  marginTop: '16px',
                  borderRadius: '14px',
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
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Booking Modal */}
      <AnimatePresence>
        {showBookingModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
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
            onClick={() => setShowBookingModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              style={{
                background: 'rgba(26, 26, 46, 0.98)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '20px',
                padding: '24px',
                width: '100%',
                maxWidth: '360px',
                textAlign: 'center'
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div style={{
                width: '56px',
                height: '56px',
                borderRadius: '50%',
                background: 'rgba(255,107,53,0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 16px'
              }}>
                <Calendar size={24} color="#FF6B35" />
              </div>
              <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#F5F5F5', marginBottom: '8px' }}>
                Booking Request
              </h3>
              <p style={{ fontSize: '14px', color: '#A0A0B0', marginBottom: '20px' }}>
                Your booking request for <strong style={{ color: '#FF6B35' }}>{hostel.name}</strong> will be sent to the owner.
              </p>

              {!selectedRoom && (
                <p style={{ fontSize: '13px', color: '#EF4444', marginBottom: '16px' }}>
                  Please select a room type first
                </p>
              )}

              <div style={{ display: 'flex', gap: '12px' }}>
                <button
                  onClick={() => setShowBookingModal(false)}
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
                  onClick={() => {
                    if (selectedRoom) {
                      alert(`Booking request sent for ${selectedRoom} room at ${hostel.name}!`)
                      setShowBookingModal(false)
                    }
                  }}
                  style={{
                    flex: 1,
                    padding: '12px',
                    borderRadius: '12px',
                    border: 'none',
                    background: selectedRoom
                      ? 'linear-gradient(135deg, #FF6B35 0%, #FFB347 100%)'
                      : 'rgba(255,255,255,0.05)',
                    color: selectedRoom ? 'white' : '#666',
                    fontSize: '15px',
                    fontWeight: 600,
                    cursor: selectedRoom ? 'pointer' : 'not-allowed'
                  }}
                >
                  Confirm
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default HostelDetail
