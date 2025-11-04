// --------- TEST MODE: bypass backend for local testing ---------
// Add this at the VERY TOP of login.js
const TEST_MODE = true; // set to false when ready to use real backend
const TEST_USER = {
    username: 'test',
    password: '1234',
    id: '1',
    name: 'Test User',
    role: 'Employee',
    email: 'test@example.com',
    phone: '1234567890'
};

// Override form submission for testing
if (TEST_MODE) {
    document.getElementById('loginForm').addEventListener('submit', function (e) {
        e.preventDefault();
        const username = document.getElementById('username').value.trim();
        const password = document.getElementById('password').value;
        const errorMessage = document.getElementById('errorMessage');
        errorMessage.style.display = 'none';

        if (!username || !password) {
            errorMessage.textContent = 'Please enter both username and password';
            errorMessage.style.display = 'block';
            return;
        }

        if (username === TEST_USER.username && password === TEST_USER.password) {
            // Store session info for dashboard
            sessionStorage.setItem('userId', TEST_USER.id);
            sessionStorage.setItem('userName', TEST_USER.name);
            sessionStorage.setItem('userRole', TEST_USER.role);
            sessionStorage.setItem('userEmail', TEST_USER.email);
            sessionStorage.setItem('userPhone', TEST_USER.phone);

            // Redirect to dashboard
            window.location.href = 'dashboard.html';
        } else {
            errorMessage.textContent = 'Invalid test credentials (try: test / 1234)';
            errorMessage.style.display = 'block';
        }
    });
}
// -----------------------------------------------------------------


// Handle login form submission
document.getElementById('loginForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('errorMessage');

    // Hide any previous error messages
    errorMessage.style.display = 'none';

    // Basic validation
    if (!username || !password) {
        showError('Please enter both username and password');
        return;
    }

    // Disable button during submission
    const loginButton = document.querySelector('.login-button');
    loginButton.disabled = true;
    loginButton.querySelector('.button-text').textContent = 'Logging in...';

    try {
        // Send login request to PHP backend
        const response = await fetch('php/login.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        });

        const data = await response.json();

        if (data.success) {
            // Store user info if needed (be careful with sensitive data)
            sessionStorage.setItem('userId', data.user.id);
            sessionStorage.setItem('userName', data.user.name);
            sessionStorage.setItem('userRole', data.user.role);

            // Redirect to dashboard
            window.location.href = 'dashboard.html';
        } else {
            showError(data.message || 'Invalid username or password');
            loginButton.disabled = false;
            loginButton.querySelector('.button-text').textContent = 'Login';
        }
    } catch (error) {
        console.error('Login error:', error);
        showError('An error occurred. Please try again.');
        loginButton.disabled = false;
        loginButton.querySelector('.button-text').textContent = 'Login';
    }
});

function showError(message) {
    const errorMessage = document.getElementById('errorMessage');
    errorMessage.textContent = message;
    errorMessage.style.display = 'block';
}

function handleClose() {
    if (confirm('Are you sure you want to close the application?')) {
        window.close();
    }
}