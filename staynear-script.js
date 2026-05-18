// ==================== STAYNEAR JAVASCRIPT ====================
// StayNear - Smart Hotel & Hostel Booking App

// ==================== MOCK HOTEL DATA ====================
const hotels = [
    {id:1,name:"Sunrise Hotel",location:"Cape Coast",price:2500,pricePeriod:"/year",rating:4.5,reviews:128,image:"https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=300&fit=crop",distance:"1.2km from UCC",category:"near-school",description:"A beautiful hotel located just minutes from the University of Cape Coast. Features modern amenities, 24/7 security, and a serene environment perfect for students.",facilities:["WiFi","AC","Kitchen","Security","Parking","Laundry"],verified:true,available:true},
    {id:2,name:"Ocean View Hotel",location:"Accra",price:3200,pricePeriod:"/year",rating:4.8,reviews:96,image:"https://images.unsplash.com/photo-1582719508461-905c673771fd?w=400&h=300&fit=crop",distance:"0.8km from Legon",category:"premium",description:"Premium hotel with stunning ocean views. Fully furnished rooms with modern appliances and excellent security.",facilities:["WiFi","AC","Kitchen","Security","Parking","Gym"],verified:true,available:true},
    {id:3,name:"Campus Nest",location:"Kumasi",price:1800,pricePeriod:"/year",rating:4.2,reviews:85,image:"https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&h=300&fit=crop",distance:"0.5km from KNUST",category:"budget",description:"Affordable and comfortable hotel perfect for students on a budget. Clean rooms and friendly environment.",facilities:["WiFi","Fan","Kitchen","Security"],verified:false,available:true},
    {id:4,name:"Royal Suites",location:"Cape Coast",price:4500,pricePeriod:"/year",rating:4.9,reviews:210,image:"https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400&h=300&fit=crop",distance:"2.1km from UCC",category:"premium",description:"Luxury self-contained apartments with premium finishes. Each unit comes with a private kitchen, bathroom, and study area.",facilities:["WiFi","AC","Kitchen","Security","Parking","Gym","Pool"],verified:true,available:false},
    {id:5,name:"Student Hub",location:"Accra",price:1500,pricePeriod:"/year",rating:4.0,reviews:64,image:"https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=400&h=300&fit=crop",distance:"1.5km from Legon",category:"shared",description:"Vibrant shared hotel with a strong community feel. Perfect for students who enjoy socializing and making friends.",facilities:["WiFi","Fan","Kitchen","Security","Laundry"],verified:true,available:true},
    {id:6,name:"Green Valley",location:"Kumasi",price:2800,pricePeriod:"/year",rating:4.6,reviews:142,image:"https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?w=400&h=300&fit=crop",distance:"1.0km from KNUST",category:"self-contained",description:"Spacious self-contained rooms surrounded by greenery. Quiet and peaceful environment ideal for focused study.",facilities:["WiFi","AC","Kitchen","Security","Parking"],verified:true,available:true},
    {id:7,name:"City Central",location:"Accra",price:3500,pricePeriod:"/year",rating:4.4,reviews:178,image:"https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=400&h=300&fit=crop",distance:"0.3km from Central",category:"near-school",description:"Located in the heart of the city with easy access to everything. Modern facilities and excellent transport links.",facilities:["WiFi","AC","Kitchen","Security","Parking","Gym"],verified:true,available:true},
    {id:8,name:"Palm Residence",location:"Cape Coast",price:2200,pricePeriod:"/year",rating:4.3,reviews:95,image:"https://images.unsplash.com/photo-1484154218962-a1c002085d2f?w=400&h=300&fit=crop",distance:"1.8km from UCC",category:"self-contained",description:"Charming hotel with palm tree surroundings. Comfortable self-contained units with all essential amenities.",facilities:["WiFi","AC","Kitchen","Security","Laundry"],verified:true,available:true},
    {id:9,name:"Metro Living",location:"Kumasi",price:1900,pricePeriod:"/year",rating:4.1,reviews:72,image:"https://images.unsplash.com/photo-1499916078039-922301b0eb9b?w=400&h=300&fit=crop",distance:"1.3km from KNUST",category:"budget",description:"Modern budget hotel with clean facilities and reliable services. Great value for money.",facilities:["WiFi","Fan","Kitchen","Security"],verified:false,available:true},
    {id:10,name:"Elite Towers",location:"Accra",price:5000,pricePeriod:"/year",rating:4.9,reviews:256,image:"https://images.unsplash.com/photo-1512918760513-95f1926315f0?w=400&h=300&fit=crop",distance:"0.6km from Legon",category:"premium",description:"The ultimate student living experience. Top-tier amenities, rooftop lounge, and premium security.",facilities:["WiFi","AC","Kitchen","Security","Parking","Gym","Pool","Laundry"],verified:true,available:true}
];

// ==================== STATE ====================
let favorites = new Set();
let currentModalHotel = null;
let currentCategory = 'all';
let currentUserType = 'traveler';
let currentUser = {name:'John Doe',email:'john@example.com',phone:'+233 20 123 4567',avatar:null};
let twoFactorEnabled = false;
let darkMode = true;
let bookingGuests = 1;
let activeFilters = {roomTypes:[],amenities:[],rating:null,priceMax:10000};

// ==================== SPLASH SCREEN ====================
setTimeout(() => {
    document.getElementById('splashScreen').classList.add('hidden');
    setTimeout(() => {
        document.getElementById('splashScreen').style.display = 'none';
        document.getElementById('authScreen').classList.add('active');
    }, 800);
}, 3000);

// ==================== AUTH ====================
function switchAuthTab(tab) {
    document.querySelectorAll('.auth-tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.auth-form').forEach(f => f.classList.remove('active'));
    event.target.classList.add('active');
    document.getElementById(tab + 'Form').classList.add('active');
}

function selectUserType(btn, type) {
    document.querySelectorAll('.user-type-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentUserType = type;
}

function togglePassword(inputId, btn) {
    const input = document.getElementById(inputId);
    if (input.type === 'password') {
        input.type = 'text';
        btn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>';
    } else {
        input.type = 'password';
        btn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>';
    }
}

async function handleLogin(e) {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    try {
        if (window.firebaseAuth) {
            await window.firebaseSignIn(window.firebaseAuth, email, password);
        }
        enterApp();
        showToast('Welcome back!');
    } catch (err) {
        showToast('Login failed: ' + err.message);
    }
}

async function handleSignup(e) {
    e.preventDefault();
    const name = document.getElementById('signupName').value;
    const email = document.getElementById('signupEmail').value;
    const phone = document.getElementById('signupPhone').value;
    const password = document.getElementById('signupPassword').value;
    const confirm = document.getElementById('signupConfirm').value;

    if (password !== confirm) {
        showToast('Passwords do not match!');
        return;
    }

    try {
        if (window.firebaseAuth) {
            const cred = await window.firebaseCreateUser(window.firebaseAuth, email, password);
            await window.firebaseUpdateProfile(cred.user, {displayName: name});
            await window.firebaseSetDoc(window.firebaseDoc(window.firebaseDb, 'users', cred.user.uid), {
                name, email, phone, userType: currentUserType, createdAt: new Date().toISOString()
            });
        }
        currentUser = {name, email, phone, avatar: null};
        updateProfileDisplay();
        enterApp();
        showToast('Account created successfully!');
    } catch (err) {
        showToast('Signup failed: ' + err.message);
    }
}

function showForgotPassword() {
    document.getElementById('authScreen').classList.remove('active');
    document.getElementById('forgotScreen').classList.add('active');
}

function showAuth() {
    document.getElementById('forgotScreen').classList.remove('active');
    document.getElementById('authScreen').classList.add('active');
}

async function handleForgotPassword(e) {
    e.preventDefault();
    const email = document.getElementById('forgotEmail').value;
    try {
        if (window.firebaseAuth) {
            await window.firebaseSendReset(window.firebaseAuth, email);
        }
        showToast('Password reset link sent!');
        setTimeout(showAuth, 2000);
    } catch (err) {
        showToast('Error: ' + err.message);
    }
}

function enterApp() {
    document.getElementById('authScreen').classList.remove('active');
    document.getElementById('forgotScreen').classList.remove('active');
    document.getElementById('appContainer').classList.add('active');
    document.getElementById('bottomNav').style.display = 'flex';
    renderHotels();
    detectLocation();
}

function handleLogout() {
    document.getElementById('appContainer').classList.remove('active');
    document.getElementById('bottomNav').style.display = 'none';
    document.getElementById('authScreen').classList.add('active');
    if (window.firebaseAuth) window.firebaseAuth.signOut();
    switchTab('home');
    showToast('Logged out successfully');
}

// ==================== LOCATION ====================
function detectLocation() {
    const locEl = document.getElementById('userLocation');
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (pos) => {
                // Mock reverse geocoding - in production use a geocoding API
                locEl.textContent = 'Cape Coast, Ghana';
            },
            () => {
                locEl.textContent = 'Cape Coast, Ghana';
            }
        );
    } else {
        locEl.textContent = 'Cape Coast, Ghana';
    }
}

// ==================== NAVIGATION ====================
function switchTab(tab) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.querySelectorAll('.nav-item').forEach(n => {
        n.classList.remove('active');
        n.classList.add('inactive');
    });
    document.getElementById(tab + 'Page').classList.add('active');
    const navItem = document.querySelector('[data-tab="' + tab + '"]');
    if (navItem) {
        navItem.classList.remove('inactive');
        navItem.classList.add('active');
    }

    if (tab === 'favorites') renderFavorites();
    if (tab === 'search') renderSearchResults();
    if (tab === 'messages') renderMessages();
}

// ==================== RENDER HOTELS ====================
function renderHotels(filtered = hotels) {
    const grid = document.getElementById('hotelGrid');
    grid.innerHTML = filtered.map(h => createHotelCard(h)).join('');
}

function createHotelCard(hotel) {
    const isFav = favorites.has(hotel.id);
    const verifiedBadge = hotel.verified ? `
        <div class="verified-badge">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>
            Verified
        </div>` : '';
    const availBadge = `
        <div class="availability-badge ${hotel.available ? '' : 'booked'}">
            <span class="dot"></span>
            ${hotel.available ? 'Available' : 'Booked'}
        </div>`;

    return `
    <div class="hotel-card" onclick="openModal(${hotel.id})">
        <div class="image-wrap">
            <img src="${hotel.image}" alt="${hotel.name}" loading="lazy">
            ${verifiedBadge}
            ${availBadge}
            <button class="favorite-btn ${isFav ? 'active' : ''}" onclick="event.stopPropagation();toggleFavorite(${hotel.id})">
                <svg viewBox="0 0 24 24" fill="${isFav ? '#FF3B30' : 'none'}" stroke="currentColor" stroke-width="2">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                </svg>
            </button>
        </div>
        <div class="info">
            <div class="name">${hotel.name}</div>
            <div class="location">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                ${hotel.location}
            </div>
            <div class="price-rating">
                <span class="price">GHS ${hotel.price.toLocaleString()}${hotel.pricePeriod}</span>
                <span class="rating">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                    ${hotel.rating}
                </span>
            </div>
        </div>
    </div>`;
}

// ==================== FILTERING ====================
function filterHotels(query) {
    const q = query.toLowerCase();
    const filtered = hotels.filter(h => 
        h.name.toLowerCase().includes(q) || 
        h.location.toLowerCase().includes(q)
    );
    renderHotels(filtered);
    renderSearchResults(filtered);
}

function filterCategory(chip, category) {
    document.querySelectorAll('.category-chip').forEach(c => c.classList.remove('active'));
    chip.classList.add('active');
    currentCategory = category;

    if (category === 'all') {
        renderHotels();
    } else {
        const filtered = hotels.filter(h => h.category === category);
        renderHotels(filtered);
    }
}

function renderSearchResults(filtered = hotels) {
    const grid = document.getElementById('searchGrid');
    const countEl = document.getElementById('resultsCount');
    if (grid) {
        grid.innerHTML = filtered.map(h => createHotelCard(h)).join('');
    }
    if (countEl) {
        countEl.textContent = '(' + filtered.length + ' results)';
    }
}

function updatePriceLabel(val) {
    document.getElementById('priceLabel').textContent = 'GHS ' + parseInt(val).toLocaleString();
    activeFilters.priceMax = parseInt(val);
}

function toggleFilterChip(btn) {
    btn.classList.toggle('active');
    const filterType = btn.dataset.filter;
    const value = btn.textContent.trim();

    if (filterType === 'room-type') {
        if (btn.classList.contains('active')) {
            activeFilters.roomTypes.push(value);
        } else {
            activeFilters.roomTypes = activeFilters.roomTypes.filter(t => t !== value);
        }
    } else if (filterType === 'amenity') {
        if (btn.classList.contains('active')) {
            activeFilters.amenities.push(value);
        } else {
            activeFilters.amenities = activeFilters.amenities.filter(a => a !== value);
        }
    } else if (filterType === 'rating') {
        document.querySelectorAll('[data-filter="rating"]').forEach(b => {
            if (b !== btn) b.classList.remove('active');
        });
        activeFilters.rating = btn.classList.contains('active') ? parseFloat(value) : null;
    }
}

function applyFilters() {
    let filtered = hotels.filter(h => h.price <= activeFilters.priceMax);

    if (activeFilters.amenities.length > 0) {
        filtered = filtered.filter(h => 
            activeFilters.amenities.some(a => h.facilities.includes(a))
        );
    }

    if (activeFilters.rating) {
        filtered = filtered.filter(h => h.rating >= activeFilters.rating);
    }

    renderSearchResults(filtered);
    showToast('Filters applied: ' + filtered.length + ' results');
}

function openFilterModal() {
    switchTab('search');
}

// ==================== FAVORITES ====================
function toggleFavorite(id) {
    if (favorites.has(id)) {
        favorites.delete(id);
        showToast('Removed from favorites');
    } else {
        favorites.add(id);
        showToast('Added to favorites');
    }
    renderHotels();
    if (document.getElementById('favoritesPage').classList.contains('active')) {
        renderFavorites();
    }
}

function renderFavorites() {
    const favHotels = hotels.filter(h => favorites.has(h.id));
    const emptyState = document.getElementById('emptyFavorites');
    const grid = document.getElementById('favoritesGrid');

    if (favHotels.length === 0) {
        emptyState.style.display = 'flex';
        grid.style.display = 'none';
    } else {
        emptyState.style.display = 'none';
        grid.style.display = 'grid';
        grid.innerHTML = favHotels.map(h => createHotelCard(h)).join('');
    }
}

// ==================== MESSAGES ====================
const mockMessages = [
    {id:1,name:"Sunrise Hotel",preview:"Hello, is the room still available?",time:"2m ago",unread:2,avatar:"SH"},
    {id:2,name:"Ocean View Hotel",preview:"Your booking has been confirmed!",time:"1h ago",unread:0,avatar:"OV"},
    {id:3,name:"Royal Suites",preview:"Thank you for your interest...",time:"3h ago",unread:1,avatar:"RS"},
];

function renderMessages() {
    const list = document.getElementById('messagesList');
    if (mockMessages.length === 0) return;

    list.innerHTML = mockMessages.map(m => `
        <div class="message-item" onclick="showToast('Chat with ${m.name} opening...')">
            <div class="message-avatar">${m.avatar}</div>
            <div class="message-info">
                <div class="message-name">${m.name}</div>
                <div class="message-preview">${m.preview}</div>
            </div>
            <div class="message-meta">
                <span class="message-time">${m.time}</span>
                ${m.unread > 0 ? `<span class="message-unread">${m.unread}</span>` : ''}
            </div>
        </div>
    `).join('');
}

// ==================== HOTEL MODAL ====================
function openModal(id) {
    const hotel = hotels.find(h => h.id === id);
    if (!hotel) return;
    currentModalHotel = hotel;

    document.getElementById('modalImage').src = hotel.image;
    document.getElementById('modalTitle').textContent = hotel.name;
    document.getElementById('modalLocation').textContent = hotel.location;
    document.getElementById('modalRating').textContent = hotel.rating + ' (' + hotel.reviews + ' reviews)';
    document.getElementById('modalDistance').textContent = hotel.distance;
    document.getElementById('modalPrice').textContent = 'GHS ' + hotel.price.toLocaleString() + hotel.pricePeriod;
    document.getElementById('modalDescription').textContent = hotel.description;

    const availEl = document.getElementById('modalAvailability');
    if (hotel.available) {
        availEl.innerHTML = '<span class="availability-dot available"></span><span>Available Now</span>';
        availEl.style.color = 'var(--success)';
    } else {
        availEl.innerHTML = '<span class="availability-dot booked"></span><span>Fully Booked</span>';
        availEl.style.color = 'var(--danger)';
    }

    const badgesEl = document.getElementById('modalBadges');
    badgesEl.innerHTML = '';
    if (hotel.verified) {
        badgesEl.innerHTML += '<span class="modal-badge verified"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" style="width:10px;height:10px;display:inline;vertical-align:middle;margin-right:3px"><polyline points="20 6 9 17 4 12"/></svg>Verified</span>';
    }
    badgesEl.innerHTML += `<span class="modal-badge ${hotel.available ? 'available' : 'booked'}">${hotel.available ? 'Available' : 'Booked'}</span>`;

    const favBtn = document.getElementById('modalFavBtn');
    favBtn.innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" fill="${favorites.has(id) ? '#FF3B30' : 'none'}" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>`;

    const facilitiesGrid = document.getElementById('modalFacilities');
    const facilityIcons = {
        WiFi: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12.55a11 11 0 0 1 14.08 0"/><path d="M1.42 9a16 16 0 0 1 21.16 0"/><path d="M8.53 16.11a6 6 0 0 1 6.95 0"/><line x1="12" y1="20" x2="12.01" y2="20"/></svg>',
        AC: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 3v18"/><path d="M6 8a6 6 0 0 1 12 0c0 3-2 4.5-2 8"/><path d="M6 16a6 6 0 0 0 12 0c0-3 2-4.5 2-8"/></svg>',
        Kitchen: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 3v18"/><path d="M5 3v18"/><path d="M5 12h14"/><path d="M5 7h14"/><path d="M5 17h14"/></svg>',
        Security: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>',
        Parking: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><path d="M9 17V7h4a3 3 0 0 1 0 6H9"/></svg>',
        Laundry: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16v16H4z"/><circle cx="12" cy="12" r="6"/><path d="M12 6v12"/></svg>',
        Gym: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 5v14"/><path d="M18 5v14"/><path d="M2 12h20"/></svg>',
        Pool: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 12c2-2 4-2 6 0s4 2 6 0 4-2 6 0 4 2 6 0"/><path d="M2 18c2-2 4-2 6 0s4 2 6 0 4-2 6 0 4 2 6 0"/></svg>',
        Fan: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M12 2v4"/><path d="M12 18v4"/><path d="M4.93 4.93l2.83 2.83"/><path d="M16.24 16.24l2.83 2.83"/><path d="M2 12h4"/><path d="M18 12h4"/><path d="M4.93 19.07l2.83-2.83"/><path d="M16.24 7.76l2.83-2.83"/></svg>'
    };

    facilitiesGrid.innerHTML = hotel.facilities.map(f => `
        <div class="facility-item">
            ${facilityIcons[f] || facilityIcons.WiFi}
            ${f}
        </div>
    `).join('');

    document.getElementById('hotelModal').classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal(e) {
    if (e && e.target !== e.currentTarget) return;
    document.getElementById('hotelModal').classList.remove('active');
    document.body.style.overflow = '';
}

function toggleModalFavorite() {
    if (currentModalHotel) {
        toggleFavorite(currentModalHotel.id);
        const favBtn = document.getElementById('modalFavBtn');
        favBtn.innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" fill="${favorites.has(currentModalHotel.id) ? '#FF3B30' : 'none'}" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>`;
    }
}

// ==================== BOOKING ====================
function bookHotel() {
    if (!currentModalHotel) return;
    if (!currentModalHotel.available) {
        showToast('This hotel is currently fully booked');
        return;
    }
    closeModal();

    const hotel = currentModalHotel;
    document.getElementById('bookingHotelInfo').innerHTML = `
        <img src="${hotel.image}" alt="${hotel.name}">
        <div>
            <div class="booking-hotel-name">${hotel.name}</div>
            <div class="booking-hotel-price">GHS ${hotel.price.toLocaleString()}${hotel.pricePeriod}</div>
        </div>
    `;

    // Set default dates
    const today = new Date();
    const tomorrow = new Date(today); tomorrow.setDate(tomorrow.getDate() + 1);
    document.getElementById('checkInDate').value = today.toISOString().split('T')[0];
    document.getElementById('checkOutDate').value = tomorrow.toISOString().split('T')[0];
    document.getElementById('checkInDate').min = today.toISOString().split('T')[0];
    document.getElementById('checkOutDate').min = tomorrow.toISOString().split('T')[0];

    bookingGuests = 1;
    document.getElementById('guestCount').textContent = bookingGuests;
    updateBookingSummary();

    document.getElementById('bookingModal').classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeBookingModal(e) {
    if (e && e.target !== e.currentTarget) return;
    document.getElementById('bookingModal').classList.remove('active');
    document.body.style.overflow = '';
}

function adjustGuests(delta) {
    bookingGuests = Math.max(1, Math.min(10, bookingGuests + delta));
    document.getElementById('guestCount').textContent = bookingGuests;
    updateBookingSummary();
}

function updateBookingSummary() {
    if (!currentModalHotel) return;
    const checkIn = new Date(document.getElementById('checkInDate').value);
    const checkOut = new Date(document.getElementById('checkOutDate').value);
    const nights = Math.max(1, Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24)));
    const total = currentModalHotel.price * nights;

    document.getElementById('summaryPrice').textContent = 'GHS ' + currentModalHotel.price.toLocaleString();
    document.getElementById('summaryNights').textContent = nights;
    document.getElementById('summaryTotal').textContent = 'GHS ' + total.toLocaleString();
}

// Update summary when dates change
document.addEventListener('change', function(e) {
    if (e.target.id === 'checkInDate' || e.target.id === 'checkOutDate') {
        updateBookingSummary();
    }
});

function confirmBooking() {
    showToast('Booking confirmed! Check your notifications.');
    closeBookingModal();
    addNotification('booking', 'Booking Confirmed', 'Your booking at ' + currentModalHotel.name + ' has been confirmed!');
}

// ==================== PROFILE ====================
function updateProfileDisplay() {
    document.getElementById('profileName').textContent = currentUser.name;
    document.getElementById('profileType').textContent = currentUserType === 'traveler' ? 'Traveler' : 'Hotel Owner';

    const initials = currentUser.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0,2);
    document.getElementById('profileAvatarText').textContent = initials;
    document.getElementById('editAvatarText').textContent = initials;

    if (currentUser.avatar) {
        document.getElementById('profileAvatarImg').src = currentUser.avatar;
        document.getElementById('profileAvatarImg').style.display = 'block';
        document.getElementById('profileAvatarText').style.display = 'none';
        document.getElementById('editAvatarImg').src = currentUser.avatar;
        document.getElementById('editAvatarImg').style.display = 'block';
        document.getElementById('editAvatarText').style.display = 'none';
    }
}

function openEditProfile() {
    document.getElementById('editName').value = currentUser.name;
    document.getElementById('editEmail').value = currentUser.email;
    document.getElementById('editPhone').value = currentUser.phone;
    document.getElementById('editProfileModal').classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeEditProfile(e) {
    if (e && e.target !== e.currentTarget) return;
    document.getElementById('editProfileModal').classList.remove('active');
    document.body.style.overflow = '';
}

function changeProfilePicture() {
    document.getElementById('profilePicInput').click();
}

function handleProfilePicChange(e) {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(event) {
        currentUser.avatar = event.target.result;
        updateProfileDisplay();
        showToast('Profile picture updated!');
    };
    reader.readAsDataURL(file);
}

function saveProfile() {
    currentUser.name = document.getElementById('editName').value;
    currentUser.email = document.getElementById('editEmail').value;
    currentUser.phone = document.getElementById('editPhone').value;
    updateProfileDisplay();
    closeEditProfile();
    showToast('Profile updated successfully!');
}

function toggleTwoFactor() {
    twoFactorEnabled = !twoFactorEnabled;
    const toggle = document.getElementById('twoFactorToggle');
    if (twoFactorEnabled) {
        toggle.classList.add('active');
        showToast('Two-step verification enabled');
    } else {
        toggle.classList.remove('active');
        showToast('Two-step verification disabled');
    }
}

function toggleTheme() {
    darkMode = !darkMode;
    const toggle = document.getElementById('themeToggle');
    if (darkMode) {
        document.documentElement.removeAttribute('data-theme');
        toggle.classList.remove('active');
        showToast('Dark mode enabled');
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
        toggle.classList.add('active');
        showToast('Light mode enabled');
    }
}

// ==================== NOTIFICATIONS ====================
let notifications = [];

function addNotification(type, title, text) {
    notifications.unshift({type, title, text, time: 'Just now'});
    renderNotifications();
    showToast('New notification!');
}

function renderNotifications() {
    const list = document.getElementById('notificationsList');
    if (notifications.length === 0) {
        list.innerHTML = `
            <div class="empty-state" style="padding:40px 20px">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="width:48px;height:48px"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
                <p style="font-size:14px;color:var(--text-secondary)">No notifications yet</p>
            </div>`;
        return;
    }

    const iconMap = {
        booking: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>',
        message: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>',
        alert: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>'
    };

    list.innerHTML = notifications.map(n => `
        <div class="notification-item">
            <div class="notification-icon ${n.type}">${iconMap[n.type] || iconMap.alert}</div>
            <div class="notification-content">
                <div class="notification-title">${n.title}</div>
                <div class="notification-text">${n.text}</div>
                <div class="notification-time">${n.time}</div>
            </div>
        </div>
    `).join('');
}

function openNotifications() {
    document.getElementById('notificationsPanel').classList.add('active');
}

function closeNotifications() {
    document.getElementById('notificationsPanel').classList.remove('active');
}

// ==================== TOAST ====================
function showToast(message) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 2500);
}

// ==================== INITIALIZE ====================
renderHotels();
updateProfileDisplay();

// Add some demo notifications after a delay
setTimeout(() => {
    addNotification('booking', 'Welcome to StayNear!', 'Start exploring hotels near you.');
}, 5000);
