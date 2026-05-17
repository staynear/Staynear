import React from 'react'

const Logo = ({ size = 120, showText = true, showTagline = false }) => {
  const scale = size / 120

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <svg width={120 * scale} height={showText ? 140 * scale : 100 * scale} viewBox="0 0 120 140" fill="none">
        {/* Building (left) */}
        <rect x="15" y="35" width="28" height="50" rx="2" fill="url(#buildingGrad)" stroke="white" strokeWidth="1.5"/>
        <rect x="18" y="30" width="22" height="5" rx="1" fill="#FFB347" stroke="white" strokeWidth="1"/>
        {/* Building windows */}
        <rect x="20" y="42" width="6" height="8" rx="1" fill="#FFB347" stroke="white" strokeWidth="0.5"/>
        <rect x="32" y="42" width="6" height="8" rx="1" fill="#FFB347" stroke="white" strokeWidth="0.5"/>
        <rect x="20" y="55" width="6" height="8" rx="1" fill="#FFB347" stroke="white" strokeWidth="0.5"/>
        <rect x="32" y="55" width="6" height="8" rx="1" fill="#FFB347" stroke="white" strokeWidth="0.5"/>
        <rect x="20" y="68" width="6" height="8" rx="1" fill="#FFB347" stroke="white" strokeWidth="0.5"/>
        <rect x="32" y="68" width="6" height="8" rx="1" fill="#FFB347" stroke="white" strokeWidth="0.5"/>

        {/* House (right) */}
        <polygon points="50,55 75,35 100,55" fill="url(#houseGrad)" stroke="white" strokeWidth="1.5"/>
        <rect x="55" y="55" width="40" height="30" rx="2" fill="#1A1A2E" stroke="white" strokeWidth="1.5"/>
        {/* House window */}
        <rect x="62" y="62" width="12" height="10" rx="1" fill="#FFB347" stroke="white" strokeWidth="0.8"/>
        <line x1="68" y1="62" x2="68" y2="72" stroke="white" strokeWidth="0.5"/>
        <line x1="62" y1="67" x2="74" y2="67" stroke="white" strokeWidth="0.5"/>
        {/* Door */}
        <rect x="68" y="72" width="10" height="13" rx="1" fill="url(#doorGrad)" stroke="white" strokeWidth="0.8"/>
        <circle cx="75" cy="78" r="1" fill="white"/>

        {/* Swoosh */}
        <path d="M 10 90 Q 60 100 110 90" stroke="url(#swooshGrad)" strokeWidth="2.5" fill="none" strokeLinecap="round"/>

        {/* Gradients */}
        <defs>
          <linearGradient id="buildingGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FF6B35"/>
            <stop offset="100%" stopColor="#FFB347"/>
          </linearGradient>
          <linearGradient id="houseGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FF6B35"/>
            <stop offset="100%" stopColor="#FFB347"/>
          </linearGradient>
          <linearGradient id="doorGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FF6B35"/>
            <stop offset="100%" stopColor="#FFB347"/>
          </linearGradient>
          <linearGradient id="swooshGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FF6B35"/>
            <stop offset="50%" stopColor="#FFB347"/>
            <stop offset="100%" stopColor="#FF6B35"/>
          </linearGradient>
        </defs>
      </svg>

      {showText && (
        <div style={{ marginTop: 8 * scale, textAlign: 'center' }}>
          <div style={{ 
            fontSize: 22 * scale, 
            fontWeight: 800, 
            color: 'white',
            letterSpacing: '1px'
          }}>
            Stay<span style={{ color: '#FF6B35' }}>Near</span>
          </div>
          {showTagline && (
            <div style={{ 
              fontSize: 8 * scale, 
              color: '#A0A0B0', 
              marginTop: 4 * scale,
              letterSpacing: '2px',
              textTransform: 'uppercase'
            }}>
              THE SMARTER WAY TO FIND HOSTELS
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default Logo
