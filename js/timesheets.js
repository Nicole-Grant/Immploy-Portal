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

// Sample timesheets data for last 12 months
const timesheetsData = [
    {
        id: 1,
        period: 'October 2025',
        weekStart: '2025-10-01',
        weekEnd: '2025-10-31',
        regularHours: 160,
        overtimeHours: 8,
        totalHours: 168,
        submissionDate: '2025-10-31',
        status: 'approved'
    },
    {
        id: 2,
        period: 'September 2025',
        weekStart: '2025-09-01',
        weekEnd: '2025-09-30',
        regularHours: 160,
        overtimeHours: 12,
        totalHours: 172,
        submissionDate: '2025-09-30',
        status: 'approved'
    },
    {
        id: 3,
        period: 'August 2025',
        weekStart: '2025-08-01',
        weekEnd: '2025-08-31',
        regularHours: 152,
        overtimeHours: 6,
        totalHours: 158,
        submissionDate: '2025-08-31',
        status: 'approved'
    },
    {
        id: 4,
        period: 'July 2025',
        weekStart: '2025-07-01',
        weekEnd: '2025-07-31',
        regularHours: 160,
        overtimeHours: 10,
        totalHours: 170,
        submissionDate: '2025-07-31',
        status: 'approved'
    },
    {
        id: 5,
        period: 'June 2025',
        weekStart: '2025-06-01',
        weekEnd: '2025-06-30',
        regularHours: 160,
        overtimeHours: 8,
        totalHours: 168,
        submissionDate: '2025-06-30',
        status: 'approved'
    },
    {
        id: 6,
        period: 'May 2025',
        weekStart: '2025-05-01',
        weekEnd: '2025-05-31',
        regularHours: 160,
        overtimeHours: 5,
        totalHours: 165,
        submissionDate: '2025-05-31',
        status: 'approved'
    },
    {
        id: 7,
        period: 'April 2025',
        weekStart: '2025-04-01',
        weekEnd: '2025-04-30',
        regularHours: 160,
        overtimeHours: 7,
        totalHours: 167,
        submissionDate: '2025-04-30',
        status: 'approved'
    },
    {
        id: 8,
        period: 'March 2025',
        weekStart: '2025-03-01',
        weekEnd: '2025-03-31',
        regularHours: 160,
        overtimeHours: 9,
        totalHours: 169,
        submissionDate: '2025-03-31',
        status: 'approved'
    },
    {
        id: 9,
        period: 'February 2025',
        weekStart: '2025-02-01',
        weekEnd: '2025-02-28',
        regularHours: 144,
        overtimeHours: 4,
        totalHours: 148,
        submissionDate: '2025-02-28',
        status: 'approved'
    },
    {
        id: 10,
        period: 'January 2025',
        weekStart: '2025-01-01',
        weekEnd: '2025-01-31',
        regularHours: 160,
        overtimeHours: 8,
        totalHours: 168,
        submissionDate: '2025-01-31',
        status: 'approved'
    },
    {
        id: 11,
        period: 'December 2024',
        weekStart: '2024-12-01',
        weekEnd: '2024-12-31',
        regularHours: 168,
        overtimeHours: 12,
        totalHours: 180,
        submissionDate: '2024-12-31',
        status: 'approved'
    },
    {
        id: 12,
        period: 'November 2024',
        weekStart: '2024-11-01',
        weekEnd: '2024-11-30',
        regularHours: 160,
        overtimeHours: 8,
        totalHours: 168,
        submissionDate: '2024-11-30',
        status: 'approved'
    }
];

let currentFilter = 'all';

// Format date
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-ZA', { year: 'numeric', month: 'long', day: 'numeric' });
}

// Update summary cards
function updateSummary() {
    const totalTimesheets = timesheetsData.length;
    const totalHours = timesheetsData.reduce((sum, timesheet) => sum + timesheet.totalHours, 0);
    const latestTimesheet = timesheetsData[0];

    document.getElementById('totalTimesheets').textContent = totalTimesheets;
    document.getElementById('totalHours').textContent = totalHours + ' hrs';
    document.getElementById('lastSubmission').textContent = formatDate(latestTimesheet.submissionDate);
}

// Filter timesheets by year
function filterTimesheets(filter) {
    currentFilter = filter;

    // Update active button
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');

    renderTimesheetsList();
}

// Render timesheets list
function renderTimesheetsList() {
    const timesheetsListDiv = document.getElementById('timesheetsList');
    timesheetsListDiv.innerHTML = '';

    // Filter data based on current filter
    let filteredData = timesheetsData;
    if (currentFilter !== 'all') {
        filteredData = timesheetsData.filter(timesheet => 
            timesheet.weekStart.startsWith(currentFilter)
        );
    }

    if (filteredData.length === 0) {
        timesheetsListDiv.innerHTML = `
            <div class="empty-state">
                <div class="empty-state-icon">📋</div>
                <div class="empty-state-text">No timesheets found for this period</div>
            </div>
        `;
        return;
    }

    filteredData.forEach(timesheet => {
        const timesheetCard = document.createElement('div');
        timesheetCard.className = 'timesheet-card';
        timesheetCard.innerHTML = `
            <div class="timesheet-info">
                <div class="timesheet-period">${timesheet.period}</div>
                <div class="timesheet-details">
                    <div class="timesheet-detail">
                        <span class="timesheet-label">Period:</span>
                        <span class="timesheet-value">${formatDate(timesheet.weekStart)} - ${formatDate(timesheet.weekEnd)}</span>
                    </div>
                    <div class="timesheet-detail">
                        <span class="timesheet-label">Regular Hours:</span>
                        <span class="timesheet-value">${timesheet.regularHours} hrs</span>
                    </div>
                    <div class="timesheet-detail">
                        <span class="timesheet-label">Overtime:</span>
                        <span class="timesheet-value">${timesheet.overtimeHours} hrs</span>
                    </div>
                    <div class="timesheet-detail">
                        <span class="timesheet-label">Total Hours:</span>
                        <span class="timesheet-value hours">${timesheet.totalHours} hrs</span>
                    </div>
                    <div class="timesheet-detail">
                        <span class="timesheet-label">Submitted:</span>
                        <span class="timesheet-value">${formatDate(timesheet.submissionDate)}</span>
                    </div>
                    <div class="timesheet-detail">
                        <span class="timesheet-label">Status:</span>
                        <span class="timesheet-value" style="color: #10b981; text-transform: capitalize;">${timesheet.status}</span>
                    </div>
                </div>
            </div>
            <div class="timesheet-actions">
                <button class="view-btn" onclick="viewTimesheet(${timesheet.id})">
                    👁️ View Details
                </button>
            </div>
        `;
        timesheetsListDiv.appendChild(timesheetCard);
    });
}

// View timesheet details (placeholder)
function viewTimesheet(timesheetId) {
    const timesheet = timesheetsData.find(t => t.id === timesheetId);
    if (timesheet) {
        alert(`Viewing timesheet for ${timesheet.period}\n\nRegular Hours: ${timesheet.regularHours}\nOvertime: ${timesheet.overtimeHours}\nTotal: ${timesheet.totalHours} hours\n\nThis would open a detailed timesheet view in a real application.`);
        // In production: window.location.href = `timesheet-detail.html?id=${timesheetId}`;
    }
}

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    if (!checkAuth()) return;

    loadUserInfo();
    updateSummary();
    renderTimesheetsList();
});