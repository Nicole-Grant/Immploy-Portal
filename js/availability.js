// Global variables
let currentWeekStart = new Date();
let selectedSlots = {};
let availabilityData = {};

// Time slots configuration (8 AM to 8 PM)
const timeSlots = [
    '08:00', '09:00', '10:00', '11:00', '12:00', 
    '13:00', '14:00', '15:00', '16:00', '17:00', 
    '18:00', '19:00', '20:00'
];

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    loadUserInfo();
    setWeekStart();
    loadAvailability();
    renderCalendar();
});

// Load user information
function loadUserInfo() {
    const userName = 'Test User';
    document.getElementById('userName').textContent = userName;
}

// Set the start of the current week (Monday)
function setWeekStart() {
    const today = new Date();
    const day = today.getDay();
    const diff = today.getDate() - day + (day === 0 ? -6 : 1);
    currentWeekStart = new Date(today.setDate(diff));
    currentWeekStart.setHours(0, 0, 0, 0);
}

// Get dates for the current week
function getWeekDates() {
    const dates = [];
    for (let i = 0; i < 7; i++) {
        const date = new Date(currentWeekStart);
        date.setDate(currentWeekStart.getDate() + i);
        dates.push(date);
    }
    return dates;
}

// Format date for display
function formatDate(date) {
    const options = { month: 'short', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}

// Format date for storage key
function getDateKey(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

// Update current period display
function updatePeriodDisplay() {
    const weekDates = getWeekDates();
    const startDate = formatDate(weekDates[0]);
    const endDate = formatDate(weekDates[6]);
    document.getElementById('currentPeriod').textContent = `${startDate} - ${endDate}`;
}

// Render the calendar
function renderCalendar() {
    const grid = document.getElementById('calendarGrid');
    grid.innerHTML = '';
    
    const weekDates = getWeekDates();
    const dayNames = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    
    // Create header row
    const timeHeader = document.createElement('div');
    timeHeader.className = 'calendar-header time-column';
    timeHeader.textContent = 'Time';
    grid.appendChild(timeHeader);
    
    weekDates.forEach((date, index) => {
        const header = document.createElement('div');
        header.className = 'calendar-header';
        header.innerHTML = `
            <div class="day-header">
                <div class="day-name">${dayNames[index]}</div>
                <div class="day-date">${formatDate(date)}</div>
            </div>
        `;
        grid.appendChild(header);
    });
    
    // Create time slots
    timeSlots.forEach(time => {
        const timeLabel = document.createElement('div');
        timeLabel.className = 'time-label';
        timeLabel.textContent = time;
        grid.appendChild(timeLabel);
        
        weekDates.forEach(date => {
            const slot = document.createElement('div');
            slot.className = 'time-slot';
            
            const dateKey = getDateKey(date);
            const slotKey = `${dateKey}_${time}`;
            
            // Check if slot is in saved availability
            if (availabilityData[dateKey] && availabilityData[dateKey][time]) {
                slot.classList.add('available');
            }
            
            // Check if slot is currently selected
            if (selectedSlots[slotKey]) {
                slot.classList.add('selected');
            }
            
            slot.dataset.date = dateKey;
            slot.dataset.time = time;
            slot.dataset.key = slotKey;
            
            slot.addEventListener('click', function() {
                toggleSlot(this);
            });
            
            grid.appendChild(slot);
        });
    });
    
    updatePeriodDisplay();
}

// Toggle time slot selection
function toggleSlot(slotElement) {
    if (slotElement.classList.contains('unavailable')) {
        return;
    }
    
    const slotKey = slotElement.dataset.key;
    
    if (selectedSlots[slotKey]) {
        delete selectedSlots[slotKey];
        slotElement.classList.remove('selected');
    } else {
        selectedSlots[slotKey] = {
            date: slotElement.dataset.date,
            time: slotElement.dataset.time
        };
        slotElement.classList.add('selected');
    }
}

// Clear all selections
function clearSelection() {
    selectedSlots = {};
    const slots = document.querySelectorAll('.time-slot.selected');
    slots.forEach(slot => {
        slot.classList.remove('selected');
    });
    showMessage('Selection cleared', 'success');
}

// Navigate to previous week
function previousWeek() {
    currentWeekStart.setDate(currentWeekStart.getDate() - 7);
    renderCalendar();
}

// Navigate to next week
function nextWeek() {
    currentWeekStart.setDate(currentWeekStart.getDate() + 7);
    renderCalendar();
}

// Update weekly availability
function updateWeekly() {
    showMessage('Updating weekly availability...', 'success');
    // This would typically make an API call to fetch latest availability
    setTimeout(() => {
        loadAvailability();
        renderCalendar();
        showMessage('Availability updated successfully!', 'success');
    }, 500);
}

// Save availability to database
function saveAvailability() {
    if (Object.keys(selectedSlots).length === 0) {
        showMessage('Please select at least one time slot', 'error');
        return;
    }
    
    // Organize selected slots by date
    Object.keys(selectedSlots).forEach(key => {
        const slot = selectedSlots[key];
        if (!availabilityData[slot.date]) {
            availabilityData[slot.date] = {};
        }
        availabilityData[slot.date][slot.time] = true;
    });
    
    // Save to database (simulated with variable storage)
    try {
        // In a real application, this would be an API call
        const dataToSave = {
            userId: 'test_user_123',
            availability: availabilityData,
            lastUpdated: new Date().toISOString()
        };
        
        // Simulate saving to database
        console.log('Saving availability data:', dataToSave);
        
        // Clear selections after save
        selectedSlots = {};
        
        // Re-render calendar to show saved availability
        renderCalendar();
        
        showMessage('Availability saved successfully!', 'success');
    } catch (error) {
        console.error('Error saving availability:', error);
        showMessage('Error saving availability. Please try again.', 'error');
    }
}

// Load availability from database
function loadAvailability() {
    try {
        // In a real application, this would be an API call
        // Simulating loaded data for demonstration
        
        // Example: Load some pre-existing availability
        // availabilityData = {
        //     '2025-11-10': { '09:00': true, '10:00': true },
        //     '2025-11-11': { '14:00': true, '15:00': true }
        // };
        
        console.log('Loaded availability data:', availabilityData);
    } catch (error) {
        console.error('Error loading availability:', error);
        showMessage('Error loading availability data', 'error');
    }
}

// Show message toast
function showMessage(message, type = 'success') {
    const toast = document.getElementById('messageToast');
    toast.textContent = message;
    toast.className = `message-toast ${type} show`;
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// Go back to dashboard
function goBack() {
    // In a real application, this would navigate to the dashboard
    window.location.href = 'dashboard.html';
}

// Export functions for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        getDateKey,
        formatDate,
        toggleSlot,
        saveAvailability,
        loadAvailability
    };
}