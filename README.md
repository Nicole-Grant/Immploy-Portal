# Synergy CRM & Booking System

Project Structure
synergy/
├── index.html                  # Login page
├── dashboard.html              # Main dashboard (to be created)
├── css/
│   ├── login.css               # Login page styles
│   └── dashboard.css           # Dashboard styles (to be created)
├── js/
│   ├── login.js                # Login functionality
│   ├── medical-icons.js        # Background medical icons
│   └── dashboard.js            # Dashboard functionality (to be created)
├── php/
│   ├── config.php              # Database configuration
│   ├── login.php               # Login handler
│   ├── logout.php              # Logout handler (to be created)
│   └── api/                    # API endpoints (to be created)
│       ├── shifts.php
│       ├── payslips.php
│       ├── availability.php
│       └── profile.php
├── database/
│   └── schema.sql              # Database schema
└── README.md                   # This file

Setup Instructions
1. Prerequisites
- Web server (Apache/Nginx)
- PHP 7.4 or higher
- MySQL 5.7 or higher
- Modern web browser

2. Database Setup
Create the database and tables:
mysql -u root -p < database/schema.sql
Update database credentials in php/config.php:
define('DB_HOST', 'localhost');
define('DB_USER', 'your_database_user');
define('DB_PASS', 'your_database_password');
define('DB_NAME', 'synergy_db');

3. File Permissions
chmod 644 php/*.php
chmod 755 php/

4. Default Login Credentials
Username: admin
Password: admin123
⚠️ IMPORTANT: Change this password immediately after first login!

5. Generate New Password Hashes
<?php
$password = 'your_password_here';
$hash = password_hash($password, PASSWORD_DEFAULT);
echo $hash;
?>

Security Considerations
Production Checklist
- Change default admin password
- Update php/config.php with production database credentials
- Disable error display in php/login.php (set ini_set('display_errors', 0);)
- Enable HTTPS/SSL
- Implement rate limiting on login attempts
- Set up proper file permissions
- Configure CORS headers appropriately
- Implement CSRF tokens
- Add input sanitization
- Set up regular database backups
- Configure session timeout
- Implement logging for security events

Session Security
Add to php/config.php:
<?php
ini_set('session.cookie_httponly', 1);
ini_set('session.use_only_cookies', 1);
ini_set('session.cookie_secure', 1); // Only if using HTTPS
session_set_cookie_params([
    'lifetime' => 3600,
    'path' => '/',
    'domain' => $_SERVER['HTTP_HOST'],
    'secure' => true,
    'httponly' => true,
    'samesite' => 'Strict'
]);
?>

Development Roadmap
Phase 1: Core Login System ✓
- Login page design
- Database schema
- PHP authentication
- Session management
Phase 2: Dashboard (Next)
- Create dashboard.html
- Implement dashboard.css
- Add dashboard.js
- Create logout functionality
Phase 3: Features
- My Shifts module
- My Payslips module
- My Availability module
- My Profile module
Phase 4: Admin Panel
- User management
- Shift scheduling
- Payroll processing
- Reports

API Endpoints (To Be Created)
Authentication
- POST /php/login.php - User login
- POST /php/logout.php - User logout
Shifts
- GET /php/api/shifts.php - Get user shifts
- POST /php/api/shifts.php - Create shift
- PUT /php/api/shifts.php - Update shift
- DELETE /php/api/shifts.php - Delete shift
Payslips
- GET /php/api/payslips.php - Get user payslips
- GET /php/api/payslips.php?id={id} - Download specific payslip
Availability
- GET /php/api/availability.php - Get user availability
- POST /php/api/availability.php - Update availability
Profile
- GET /php/api/profile.php - Get user profile
- PUT /php/api/profile.php - Update profile

Testing
Test Database Connection
Create php/test-db.php:
<?php
require_once 'config.php';
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
echo "Database connected successfully!";
$conn->close();
?>
Visit: http://yourdomain.com/php/test-db.php

Test Login (With Database)
Navigate to index.html
Enter credentials: admin / admin123
Should redirect to dashboard

Test Login Without Database (Local Testing)
To test the login without connecting to a database, use the temporary test credentials:
Add at the top of js/login.js:

// --------- TEST MODE: bypass backend for local testing ---------
const TEST_MODE = true; // set to false for real backend
const TEST_USER = {
    username: 'test',
    password: '1234',
    id: '1',
    name: 'Test User',
    role: 'Employee',
    email: 'test@example.com',
    phone: '1234567890'
};

// Overrides login form submission to use test credentials
if (TEST_MODE) {
    document.getElementById('loginForm').addEventListener('submit', function(e) {
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
            sessionStorage.setItem('userId', TEST_USER.id);
            sessionStorage.setItem('userName', TEST_USER.name);
            sessionStorage.setItem('userRole', TEST_USER.role);
            sessionStorage.setItem('userEmail', TEST_USER.email);
            sessionStorage.setItem('userPhone', TEST_USER.phone);

            window.location.href = 'dashboard.html';
        } else {
            errorMessage.textContent = 'Invalid test credentials (try: test / 1234)';
            errorMessage.style.display = 'block';
        }
    });
}
// -----------------------------------------------------------------

Test Dashboard Directly (UI/Design Testing)
Open browser DevTools → Console
Run:
sessionStorage.setItem('userId','1');
sessionStorage.setItem('userName','Test User');
sessionStorage.setItem('userRole','Employee');
sessionStorage.setItem('userEmail','test@example.com');
sessionStorage.setItem('userPhone','1234567890');
Navigate directly to dashboard.html
Dashboard will load with the test user info
⚠️ Important: These methods are only for local testing. Remove or disable before connecting to a real backend or deploying.

Troubleshooting
Common Issues
- "Database connection failed": Check MySQL service is running, verify credentials in php/config.php, ensure database exists
- "Invalid username or password": Verify user exists in database, check password hash matches
- Session not persisting: Check PHP session configuration, ensure cookies are enabled in browser, verify session directory permissions
- Medical icons not appearing: Check js/medical-icons.js is loaded, verify browser console for errors, ensure JavaScript is enabled

Browser Compatibility
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

Support
For technical support, contact your development team lead.

License
Proprietary - Immploy Recruitment © 2025
