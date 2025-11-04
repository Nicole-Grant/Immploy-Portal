// Check if user is logged in when page loads
document.addEventListener('DOMContentLoaded', function () {
    checkAuth();
    loadUserInfo();
});

// Check if user is authenticated
function checkAuth() {
    // Check if user data exists in sessionStorage
    const userId = sessionStorage.getItem('userId');
    const userName = sessionStorage.getItem('userName');

    // If no user data, redirect to login
    if (!userId || !userName) {
        alert('Please log in first');
        window.location.href = 'index.html';
        return;
    }
}

// Load user information and display on page
function loadUserInfo() {
    // Get user data from sessionStorage
    const userName = sessionStorage.getItem('userName');
    const userEmail = sessionStorage.getItem('userEmail') || 'Not provided';
    const userPhone = sessionStorage.getItem('userPhone') || 'Not provided';
    const userRole = sessionStorage.getItem('userRole') || 'Employee';

    // Display user name in header
    document.getElementById('userName').textContent = userName;

    // Display user details in the info card
    document.getElementById('userEmail').textContent = userEmail;
    document.getElementById('userPhone').textContent = userPhone;
    document.getElementById('userRole').textContent = capitalizeFirst(userRole);

    // In production, you would fetch this data from the server:
    // fetchUserData();
}

// Function to fetch user data from server (for production use)
async function fetchUserData() {
    try {
        const userId = sessionStorage.getItem('userId');
        const response = await fetch(`php/api/profile.php?id=${userId}`);
        const data = await response.json();

        if (data.success) {
            // Update UI with fetched data
            document.getElementById('userName').textContent = data.user.name;
            document.getElementById('userEmail').textContent = data.user.email;
            document.getElementById('userPhone').textContent = data.user.phone || 'Not provided';
            document.getElementById('userRole').textContent = capitalizeFirst(data.user.role);
        }
    } catch (error) {
        console.error('Error fetching user data:', error);
    }
}

// Navigate to different sections
function navigateTo(page) {
    // Check if the page file exists before navigating
    window.location.href = page;
}

// Handle logout
function handleLogout() {
    if (confirm('Are you sure you want to logout?')) {
        // Clear session data
        sessionStorage.clear();

        // In production, also call the server to destroy the session:
        // fetch('php/logout.php', { method: 'POST' });

        // Redirect to login page
        window.location.href = 'index.html';
    }
}

// Helper function to capitalize first letter
function capitalizeFirst(string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}