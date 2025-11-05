// Check authentication on page load
document.addEventListener('DOMContentLoaded', function() {
    checkAuth();
    loadUserData();
    setupImagePreview();
    setupFormValidation();
});

// Check if user is authenticated
function checkAuth() {
    const userId = sessionStorage.getItem('userId');
    const userName = sessionStorage.getItem('userName');
    
    if (!userId || !userName) {
        alert('Please log in first');
        window.location.href = 'index.html';
        return;
    }
    
    // Display user name in header
    document.getElementById('userName').textContent = userName;
}

// Load user data (from API or sessionStorage)
async function loadUserData() {
    const userId = sessionStorage.getItem('userId');
    
    try {
        // In production, fetch from API
        // const response = await fetch(`php/api/profile.php?id=${userId}`);
        // const data = await response.json();
        
        // For now, use dummy data or sessionStorage
        const userData = {
            firstName: sessionStorage.getItem('userFirstName') || '',
            lastName: sessionStorage.getItem('userLastName') || '',
            email: sessionStorage.getItem('userEmail') || '',
            cell: sessionStorage.getItem('userPhone') || '',
            refNo: '61251'
        };
        
        // Populate form fields
        if (userData.firstName) document.getElementById('firstName').value = userData.firstName;
        if (userData.lastName) document.getElementById('lastName').value = userData.lastName;
        if (userData.email) document.getElementById('email').value = userData.email;
        if (userData.cell) document.getElementById('cell').value = userData.cell;
        if (userData.refNo) document.getElementById('refNo').value = userData.refNo;
        
    } catch (error) {
        console.error('Error loading user data:', error);
        showMessage('Error loading user data', 'error');
    }
}

// Setup image preview
function setupImagePreview() {
    const imageInput = document.getElementById('profileImage');
    const imagePreview = document.getElementById('imagePreview');
    
    imageInput.addEventListener('change', function(e) {
        const file = e.target.files[0];
        
        if (file) {
            // Validate file type
            if (!file.type.startsWith('image/')) {
                showMessage('Please select an image file', 'error');
                return;
            }
            
            // Validate file size (max 5MB)
            if (file.size > 5 * 1024 * 1024) {
                showMessage('Image size must be less than 5MB', 'error');
                return;
            }
            
            // Preview image
            const reader = new FileReader();
            reader.onload = function(e) {
                imagePreview.innerHTML = `<img src="${e.target.result}" alt="Profile" style="width: 100%; height: 100%; object-fit: cover; border-radius: 10px;">`;
            };
            reader.readAsDataURL(file);
        }
    });
}

// Setup form validation
function setupFormValidation() {
    const form = document.getElementById('employeeForm');
    
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Validate required fields
        if (!validateForm()) {
            return;
        }
        
        // Collect form data
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        
        // Save data
        await saveEmployeeData(data);
    });
}

// Validate form
function validateForm() {
    const requiredFields = ['firstName', 'lastName', 'idNumber', 'passportNumber', 'cell', 'address'];
    let isValid = true;
    
    requiredFields.forEach(fieldId => {
        const field = document.getElementById(fieldId);
        if (!field.value.trim()) {
            field.style.borderColor = '#dc2626';
            isValid = false;
        } else {
            field.style.borderColor = '#d1d5db';
        }
    });
    
    if (!isValid) {
        showMessage('Please fill in all required fields', 'error');
    }
    
    return isValid;
}

// Save employee data
async function saveEmployeeData(data) {
    showMessage('Saving data...', 'info');
    
    try {
        // In production, send to API
        /*
        const response = await fetch('php/api/profile.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });
        
        const result = await response.json();
        
        if (result.success) {
            showMessage('Profile updated successfully!', 'success');
            // Update sessionStorage
            sessionStorage.setItem('userFirstName', data.firstName);
            sessionStorage.setItem('userLastName', data.lastName);
            sessionStorage.setItem('userName', `${data.firstName} ${data.lastName}`);
        } else {
            showMessage(result.message || 'Failed to save data', 'error');
        }
        */
        
        // Simulated save (for testing without backend)
        console.log('Data to be saved:', data);
        
        setTimeout(() => {
            showMessage('Profile updated successfully! (Simulated)', 'success');
            
            // Update sessionStorage
            sessionStorage.setItem('userFirstName', data.firstName);
            sessionStorage.setItem('userLastName', data.lastName);
            sessionStorage.setItem('userName', `${data.firstName} ${data.lastName}`);
            sessionStorage.setItem('userEmail', data.email);
            sessionStorage.setItem('userPhone', data.cell);
        }, 1500);
        
    } catch (error) {
        console.error('Error saving data:', error);
        showMessage('An error occurred while saving', 'error');
    }
}

// Copy to clipboard
function copyToClipboard(inputId) {
    const input = document.getElementById(inputId);
    
    if (input && input.value) {
        // Select text
        input.select();
        input.setSelectionRange(0, 99999); // For mobile
        
        try {
            // Copy to clipboard
            document.execCommand('copy');
            showMessage('Copied to clipboard!', 'success');
        } catch (err) {
            showMessage('Failed to copy', 'error');
            console.error('Copy failed:', err);
        }
        
        // Deselect
        input.blur();
    } else {
        showMessage('Nothing to copy', 'error');
    }
}

// Tab switching
function switchTab(tabName) {
    // This is a placeholder for tab switching functionality
    // In a full implementation, you would show/hide different form sections
    showMessage(`Switching to ${tabName} tab...`, 'info');
    
    // Update active tab style
    const tabs = document.querySelectorAll('.tab-btn');
    tabs.forEach(tab => {
        tab.classList.remove('active');
    });
    event.target.classList.add('active');
}

// View compliance
function viewCompliance() {
    showMessage('Opening compliance view...', 'info');
    // Navigate to compliance page or open modal
    // window.location.href = 'compliance.html';
}

// Edit roles
function editRoles() {
    showMessage('Opening role editor...', 'info');
    // Open modal or navigate to roles page
}

// Go back to dashboard
function goBack() {
    window.location.href = 'dashboard.html';
}

// Show message toast
function showMessage(message, type) {
    const toast = document.getElementById('messageToast');
    
    toast.textContent = message;
    toast.className = `message-toast ${type}`;
    toast.style.display = 'block';
    
    // Auto-hide after 3 seconds
    setTimeout(() => {
        toast.style.display = 'none';
    }, 3000);
}