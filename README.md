# 🏠 Stay Near — Smart Hostel Finder

> **THE SMARTER WAY TO FIND HOSTELS**

A modern, glassmorphism-styled web application for finding and booking hostels near universities in Ghana.

## ✨ Features

### For Students & Travelers
- 🔍 **Smart Search** — Find hostels by school, location, price, room type
- 🏠 **Hostel Listings** — Browse with photos, prices, ratings & reviews
- ❤️ **Favorites** — Save hostels to your wishlist
- 📞 **Contact Owners** — WhatsApp, Call, or Email directly
- 📍 **Location Info** — Distance from campus, map view
- ⭐ **Ratings & Reviews** — Make informed decisions
- 🛏️ **Room Types** — Single, Double, Shared, Suite, Studio
- 📱 **Mobile-First** — iOS 26 glassmorphism design

### For Hostel Owners
- 📝 **Add Listings** — Upload photos, set prices, describe facilities
- 📊 **Manage Bookings** — Track reservations and inquiries
- 📈 **Analytics Dashboard** — View performance metrics

## 🎨 Design System

### Color Palette (Sunset Ember)
| Token | Hex | Usage |
|-------|-----|-------|
| Primary | `#FF6B35` | Buttons, active states, accents |
| Secondary | `#FFB347` | Highlights, gradients |
| Background | `#0D0D0D` | App background |
| Surface | `#1A1A2E` | Cards, panels |
| Text Primary | `#F5F5F5` | Headings, body text |
| Text Secondary | `#A0A0B0` | Labels, captions |

### Glassmorphism
- Background blur: `20px`
- Surface opacity: `5-10%`
- Border: `1px solid rgba(255,255,255,0.08)`
- Border radius: `12-20px`

## 🛠️ Tech Stack

- **React 18** + Vite
- **Tailwind CSS** — Utility-first styling
- **Framer Motion** — Animations & transitions
- **React Router** — Navigation
- **Lucide React** — Icons

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## 📱 Screens

1. **Splash Screen** — Logo animation with 3s duration
2. **Login** — Email/phone + password
3. **Register** — Full signup with user type selection
4. **Home** — Featured hostels, search, categories
5. **Search** — Advanced filters (school, price, location, room type)
6. **Hostel Detail** — Gallery, info, facilities, contact, booking
7. **Favorites** — Saved hostels list
8. **Profile** — User info, bookings, settings

## 📂 Project Structure

```
stay-near/
├── index.html
├── vite.config.js
├── package.json
├── src/
│   ├── main.jsx
│   ├── App.jsx
│   ├── styles.css
│   ├── context/
│   │   └── AuthContext.jsx
│   ├── components/
│   │   ├── Logo.jsx
│   │   └── BottomNav.jsx
│   ├── pages/
│   │   ├── Splash.jsx
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── Home.jsx
│   │   ├── Search.jsx
│   │   ├── Favorites.jsx
│   │   ├── Profile.jsx
│   │   └── HostelDetail.jsx
│   └── data/
│       └── mockData.js
```

## 🗺️ Future Integrations

- Google Maps API — Real location display
- Payment Gateway — Mobile money / card payments
- Push Notifications — Booking updates
- Admin Dashboard — Full owner management

---

Built with ❤️ for students in Ghana
