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

// Sample payslips data for last 12 months
const payslipsData = [
    {
        id: 1,
        period: 'October 2025',
        payPeriodStart: '2025-10-01',
        payPeriodEnd: '2025-10-31',
        grossPay: 25000.00,
        deductions: 5000.00,
        netPay: 20000.00,
        paymentDate: '2025-10-31',
        status: 'paid'
    },
    {
        id: 2,
        period: 'September 2025',
        payPeriodStart: '2025-09-01',
        payPeriodEnd: '2025-09-30',
        grossPay: 25000.00,
        deductions: 5000.00,
        netPay: 20000.00,
        paymentDate: '2025-09-30',
        status: 'paid'
    },
    {
        id: 3,
        period: 'August 2025',
        payPeriodStart: '2025-08-01',
        payPeriodEnd: '2025-08-31',
        grossPay: 24500.00,
        deductions: 4900.00,
        netPay: 19600.00,
        paymentDate: '2025-08-31',
        status: 'paid'
    },
    {
        id: 4,
        period: 'July 2025',
        payPeriodStart: '2025-07-01',
        payPeriodEnd: '2025-07-31',
        grossPay: 25000.00,
        deductions: 5000.00,
        netPay: 20000.00,
        paymentDate: '2025-07-31',
        status: 'paid'
    },
    {
        id: 5,
        period: 'June 2025',
        payPeriodStart: '2025-06-01',
        payPeriodEnd: '2025-06-30',
        grossPay: 25000.00,
        deductions: 5000.00,
        netPay: 20000.00,
        paymentDate: '2025-06-30',
        status: 'paid'
    },
    {
        id: 6,
        period: 'May 2025',
        payPeriodStart: '2025-05-01',
        payPeriodEnd: '2025-05-31',
        grossPay: 24800.00,
        deductions: 4960.00,
        netPay: 19840.00,
        paymentDate: '2025-05-31',
        status: 'paid'
    },
    {
        id: 7,
        period: 'April 2025',
        payPeriodStart: '2025-04-01',
        payPeriodEnd: '2025-04-30',
        grossPay: 25000.00,
        deductions: 5000.00,
        netPay: 20000.00,
        paymentDate: '2025-04-30',
        status: 'paid'
    },
    {
        id: 8,
        period: 'March 2025',
        payPeriodStart: '2025-03-01',
        payPeriodEnd: '2025-03-31',
        grossPay: 25000.00,
        deductions: 5000.00,
        netPay: 20000.00,
        paymentDate: '2025-03-31',
        status: 'paid'
    },
    {
        id: 9,
        period: 'February 2025',
        payPeriodStart: '2025-02-01',
        payPeriodEnd: '2025-02-28',
        grossPay: 23000.00,
        deductions: 4600.00,
        netPay: 18400.00,
        paymentDate: '2025-02-28',
        status: 'paid'
    },
    {
        id: 10,
        period: 'January 2025',
        payPeriodStart: '2025-01-01',
        payPeriodEnd: '2025-01-31',
        grossPay: 25000.00,
        deductions: 5000.00,
        netPay: 20000.00,
        paymentDate: '2025-01-31',
        status: 'paid'
    },
    {
        id: 11,
        period: 'December 2024',
        payPeriodStart: '2024-12-01',
        payPeriodEnd: '2024-12-31',
        grossPay: 26000.00,
        deductions: 5200.00,
        netPay: 20800.00,
        paymentDate: '2024-12-31',
        status: 'paid'
    },
    {
        id: 12,
        period: 'November 2024',
        payPeriodStart: '2024-11-01',
        payPeriodEnd: '2024-11-30',
        grossPay: 25000.00,
        deductions: 5000.00,
        netPay: 20000.00,
        paymentDate: '2024-11-30',
        status: 'paid'
    }
];

let currentFilter = 'all';

// Format currency
function formatCurrency(amount) {
    return 'R ' + amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

// Format date
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-ZA', { year: 'numeric', month: 'long', day: 'numeric' });
}

// Update summary cards
function updateSummary() {
    const totalPayslips = payslipsData.length;
    const latestPayslip = payslipsData[0];
    
    document.getElementById('totalPayslips').textContent = totalPayslips;
    document.getElementById('latestPayment').textContent = formatCurrency(latestPayslip.netPay);
    document.getElementById('lastPayDate').textContent = formatDate(latestPayslip.paymentDate);
}

// Filter payslips by year
function filterPayslips(filter) {
    currentFilter = filter;
    
    // Update active button
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
    
    renderPayslipsList();
}

// Render payslips list
function renderPayslipsList() {
    const payslipsListDiv = document.getElementById('payslipsList');
    payslipsListDiv.innerHTML = '';
    
    // Filter data based on current filter
    let filteredData = payslipsData;
    if (currentFilter !== 'all') {
        filteredData = payslipsData.filter(payslip => 
            payslip.payPeriodStart.startsWith(currentFilter)
        );
    }
    
    if (filteredData.length === 0) {
        payslipsListDiv.innerHTML = `
            <div class="empty-state">
                <div class="empty-state-icon">📄</div>
                <div class="empty-state-text">No payslips found for this period</div>
            </div>
        `;
        return;
    }
    
    filteredData.forEach(payslip => {
        const payslipCard = document.createElement('div');
        payslipCard.className = 'payslip-card';
        payslipCard.innerHTML = `
            <div class="payslip-info">
                <div class="payslip-period">${payslip.period}</div>
                <div class="payslip-details">
                    <div class="payslip-detail">
                        <span class="payslip-label">Pay Period:</span>
                        <span class="payslip-value">${formatDate(payslip.payPeriodStart)} - ${formatDate(payslip.payPeriodEnd)}</span>
                    </div>
                    <div class="payslip-detail">
                        <span class="payslip-label">Gross Pay:</span>
                        <span class="payslip-value">${formatCurrency(payslip.grossPay)}</span>
                    </div>
                    <div class="payslip-detail">
                        <span class="payslip-label">Deductions:</span>
                        <span class="payslip-value">${formatCurrency(payslip.deductions)}</span>
                    </div>
                    <div class="payslip-detail">
                        <span class="payslip-label">Net Pay:</span>
                        <span class="payslip-value amount">${formatCurrency(payslip.netPay)}</span>
                    </div>
                    <div class="payslip-detail">
                        <span class="payslip-label">Payment Date:</span>
                        <span class="payslip-value">${formatDate(payslip.paymentDate)}</span>
                    </div>
                </div>
            </div>
            <div class="payslip-actions">
                <button class="view-btn" onclick="viewPayslip(${payslip.id})">
                    👁️ View
                </button>
                <button class="download-btn" onclick="downloadPayslip(${payslip.id})">
                    ⬇️ Download
                </button>
            </div>
        `;
        payslipsListDiv.appendChild(payslipCard);
    });
}

// View payslip (opens in new tab - placeholder)
function viewPayslip(payslipId) {
    const payslip = payslipsData.find(p => p.id === payslipId);
    if (payslip) {
        alert(`Viewing payslip for ${payslip.period}\n\nThis would open a PDF viewer in a real application.`);
        // In production: window.open(`/api/payslips/${payslipId}/view`, '_blank');
    }
}

// Download payslip
function downloadPayslip(payslipId) {
    const payslip = payslipsData.find(p => p.id === payslipId);
    if (payslip) {
        // Create a simple text representation (in production, this would download actual PDF)
        const content = `
PAYSLIP - ${payslip.period}
=====================================

Pay Period: ${formatDate(payslip.payPeriodStart)} - ${formatDate(payslip.payPeriodEnd)}
Payment Date: ${formatDate(payslip.paymentDate)}

Gross Pay:      ${formatCurrency(payslip.grossPay)}
Deductions:     ${formatCurrency(payslip.deductions)}
=====================================
Net Pay:        ${formatCurrency(payslip.netPay)}
=====================================

Employee: ${sessionStorage.getItem('userName') || 'Employee'}
Status: ${payslip.status.toUpperCase()}
        `;
        
        // Create blob and download
        const blob = new Blob([content], { type: 'text/plain' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `Payslip_${payslip.period.replace(' ', '_')}.txt`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
        
        // Show success message
        alert(`✅ Payslip for ${payslip.period} has been downloaded!`);
        
        // In production: 
        // window.location.href = `/api/payslips/${payslipId}/download`;
    }
}

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    if (!checkAuth()) return;
    
    loadUserInfo();
    updateSummary();
    renderPayslipsList();
});