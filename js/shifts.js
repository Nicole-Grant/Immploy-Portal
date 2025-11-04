// Check if user is logged in
function checkAuth() {
    const userId = sessionStorage.getItem('userId');
    if (!userId) {
        window.location.href = 'index.html';
        return false;
    }
    return true;
}

// Load user information
function loadUserInfo() {
    const userName = sessionStorage.getItem('userName') || 'User';
    document.getElementById('userName').textContent = userName;
}

// Navigate to another page
function navigateTo(page) {
    window.location.href = page;
}

// Sample shifts data (replace with API call later)
const shiftsData = [
    {
        id: 1,
        date: '2025-11-05',
        startTime: '08:00',
        endTime: '16:00',
        location: 'City Hospital',
        position: 'Registered Nurse',
        status: 'scheduled'
    },
    {
        id: 2,
        date: '2025-11-07',
        startTime: '14:00',
        endTime: '22:00',
        location: 'General Clinic',
        position: 'Healthcare Assistant',
        status: 'scheduled'
    },
    {
        id: 3,
        date: '2025-11-10',
        startTime: '06:00',
        endTime: '14:00',
        location: 'Community Care Center',
        position: 'Care Giver',
        status: 'scheduled'
    }
];

// Render calendar
function renderCalendar() {
    const calendarDiv = document.getElementById('calendar');
    const today = new Date();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();
    
    // Get first day of month and total days
    const firstDay = new Date(currentYear, currentMonth, 1);
    const lastDay = new Date(currentYear, currentMonth + 1, 0);
    const totalDays = lastDay.getDate();
    const startDay = firstDay.getDay();
    
    // Week day headers
    const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    weekDays.forEach(day => {
        const dayHeader = document.createElement('div');
        dayHeader.className = 'calendar-day-header';
        dayHeader.textContent = day;
        dayHeader.style.fontWeight = '700';
        dayHeader.style.textAlign = 'center';
        dayHeader.style.padding = '10px';
        dayHeader.style.color = '#2d3748';
        calendarDiv.appendChild(dayHeader);
    });
    
    // Empty cells before first day
    for (let i = 0; i < startDay; i++) {
        const emptyDay = document.createElement('div');
        emptyDay.className = 'calendar-day empty';
        emptyDay.style.visibility = 'hidden';
        calendarDiv.appendChild(emptyDay);
    }
    
    // Render days
    for (let day = 1; day <= totalDays; day++) {
        const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        const hasShift = shiftsData.some(shift => shift.date === dateStr);
        
        const dayDiv = document.createElement('div');
        dayDiv.className = `calendar-day ${hasShift ? 'has-shift' : ''}`;
        dayDiv.innerHTML = `
            <div style="font-weight: 700; margin-bottom: 5px;">${day}</div>
            ${hasShift ? '<div style="font-size: 11px;">✓ Shift</div>' : ''}
        `;
        calendarDiv.appendChild(dayDiv);
    }
}

// Render shifts list
function renderShiftsList() {
    const shiftsListDiv = document.getElementById('shiftsList');
    shiftsListDiv.innerHTML = '';
    
    if (shiftsData.length === 0) {
        shiftsListDiv.innerHTML = '<p style="text-align: center; color: #6b7280;">No upcoming shifts found.</p>';
        return;
    }
    
    shiftsData.forEach(shift => {
        const shiftCard = document.createElement('div');
        shiftCard.className = 'shift-card';
        shiftCard.innerHTML = `
            <div class="shift-header">
                <div class="shift-date">${new Date(shift.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</div>
                <div class="shift-status ${shift.status}">${shift.status.toUpperCase()}</div>
            </div>
            <div class="shift-details">
                <div class="shift-detail">
                    <span class="shift-label">Start Time:</span>
                    <span class="shift-value">${shift.startTime}</span>
                </div>
                <div class="shift-detail">
                    <span class="shift-label">End Time:</span>
                    <span class="shift-value">${shift.endTime}</span>
                </div>
                <div class="shift-detail">
                    <span class="shift-label">Location:</span>
                    <span class="shift-value">${shift.location}</span>
                </div>
                <div class="shift-detail">
                    <span class="shift-label">Position:</span>
                    <span class="shift-value">${shift.position}</span>
                </div>
            </div>
        `;
        shiftsListDiv.appendChild(shiftCard);
    });
}

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    if (!checkAuth()) return;
    
    loadUserInfo();
    renderCalendar();
    renderShiftsList();
});