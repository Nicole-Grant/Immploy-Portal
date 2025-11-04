Synergy CRM & Booking System
Project Structure
synergy/
├── index.html                  # Login page
├── dashboard.html              # Main dashboard (to be created)
├── css/
│   ├── login.css              # Login page styles
│   └── dashboard.css          # Dashboard styles (to be created)
├── js/
│   ├── login.js               # Login functionality
│   ├── medical-icons.js       # Background medical icons
│   └── dashboard.js           # Dashboard functionality (to be created)
├── php/
│   ├── config.php             # Database configuration
│   ├── login.php              # Login handler
│   ├── logout.php             # Logout handler (to be created)
│   └── api/                   # API endpoints (to be created)
│       ├── shifts.php
│       ├── payslips.php
│       ├── availability.php
│       └── profile.php
├── database/
│   └── schema.sql             # Database schema
└── README.md                  # This file
Setup Instructions
1. Prerequisites

Web server (Apache/Nginx)
PHP 7.4 or higher
MySQL 5.7 or higher
Modern web browser

2. Database Setup

Create the database and tables:

bashmysql -u root -p < database/schema.sql

Update database credentials in php/config.php:

phpdefine('DB_HOST', 'localhost');
define('DB_USER', 'your_database_user');
define('DB_PASS', 'your_database_password');
define('DB_NAME', 'synergy_db');
3. File Permissions
Ensure proper permissions for PHP files:
bashchmod 644 php/*.php
chmod 755 php/
4. Default Login Credentials
Username: admin
Password: admin123
⚠️ IMPORTANT: Change this password immediately after first login!
5. Generate New Password Hashes
To create new user passwords in PHP:
php<?php
$password = 'your_password_here';
$hash = password_hash($password, PASSWORD_DEFAULT);
echo $hash;
?>
Security Considerations
Production Checklist

 Change default admin password
 Update php/config.php with production database credentials
 Disable error display in php/login.php (set ini_set('display_errors', 0);)
 Enable HTTPS/SSL
 Implement rate limiting on login attempts
 Set up proper file permissions
 Configure CORS headers appropriately
 Implement CSRF tokens
 Add input sanitization
 Set up regular database backups
 Configure session timeout
 Implement logging for security events

Session Security
Add to php/config.php for enhanced session security:
php// Session security settings
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
Development Roadmap
Phase 1: Core Login System ✓

 Login page design
 Database schema
 PHP authentication
 Session management

Phase 2: Dashboard (Next)

 Create dashboard.html
 Implement dashboard.css
 Add dashboard.js
 Create logout functionality

Phase 3: Features

 My Shifts module
 My Payslips module
 My Availability module
 My Profile module

Phase 4: Admin Panel

 User management
 Shift scheduling
 Payroll processing
 Reports

API Endpoints (To Be Created)
Authentication

POST /php/login.php - User login
POST /php/logout.php - User logout

Shifts

GET /php/api/shifts.php - Get user shifts
POST /php/api/shifts.php - Create shift
PUT /php/api/shifts.php - Update shift
DELETE /php/api/shifts.php - Delete shift

Payslips

GET /php/api/payslips.php - Get user payslips
GET /php/api/payslips.php?id={id} - Download specific payslip

Availability

GET /php/api/availability.php - Get user availability
POST /php/api/availability.php - Update availability

Profile

GET /php/api/profile.php - Get user profile
PUT /php/api/profile.php - Update profile

Testing
Test Database Connection
Create php/test-db.php:
php<?php
require_once 'config.php';
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
echo "Database connected successfully!";
$conn->close();
?>
Visit: http://yourdomain.com/php/test-db.php
Test Login

Navigate to index.html
Enter credentials: admin / admin123
Should redirect to dashboard

Troubleshooting
Common Issues
1. "Database connection failed"

Check MySQL service is running
Verify credentials in php/config.php
Ensure database exists

2. "Invalid username or password"

Verify user exists in database
Check password hash matches

3. Session not persisting

Check PHP session configuration
Ensure cookies are enabled in browser
Verify session directory permissions

4. Medical icons not appearing

Check js/medical-icons.js is loaded
Verify browser console for errors
Ensure JavaScript is enabled

Browser Compatibility

Chrome 90+
Firefox 88+
Safari 14+
Edge 90+

Support
For technical support, contact your development team lead.
License
Proprietary - Immploy Recruitment © 2025