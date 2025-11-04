// Medical icon SVG templates
const medicalIcons = [
    // Medical Cross
    `<svg viewBox="0 0 100 100" fill="currentColor">
        <rect x="35" y="10" width="30" height="80"/>
        <rect x="10" y="35" width="80" height="30"/>
    </svg>`,
    
    // Heart
    `<svg viewBox="0 0 100 100" fill="currentColor">
        <path d="M50,90 C50,90 10,60 10,35 C10,20 20,10 32.5,10 C42.5,10 50,17.5 50,17.5 C50,17.5 57.5,10 67.5,10 C80,10 90,20 90,35 C90,60 50,90 50,90 Z"/>
    </svg>`,
    
    // Stethoscope
    `<svg viewBox="0 0 100 100" fill="currentColor">
        <circle cx="50" cy="75" r="10"/>
        <path d="M50,65 L50,45 M30,45 Q30,25 45,15 M70,45 Q70,25 55,15" stroke="currentColor" fill="none" stroke-width="6"/>
        <circle cx="45" cy="15" r="8"/>
        <circle cx="55" cy="15" r="8"/>
    </svg>`,
    
    // Capsule
    `<svg viewBox="0 0 100 100" fill="currentColor">
        <ellipse cx="50" cy="50" rx="20" ry="40" transform="rotate(45 50 50)"/>
        <line x1="30" y1="30" x2="70" y2="70" stroke="#4a5568" stroke-width="4"/>
    </svg>`,
    
    // DNA
    `<svg viewBox="0 0 100 100" fill="currentColor">
        <path d="M30,10 Q50,30 70,10 M30,30 Q50,50 70,30 M30,50 Q50,70 70,50 M30,70 Q50,90 70,70" stroke="currentColor" fill="none" stroke-width="5"/>
        <circle cx="30" cy="10" r="5"/>
        <circle cx="70" cy="50" r="5"/>
    </svg>`,
    
    // Syringe
    `<svg viewBox="0 0 100 100" fill="currentColor">
        <rect x="20" y="40" width="50" height="20" rx="2"/>
        <rect x="65" y="45" width="20" height="10"/>
        <polygon points="15,45 20,40 20,60 15,55"/>
        <line x1="30" y1="40" x2="30" y2="60" stroke="#4a5568" stroke-width="3"/>
        <line x1="45" y1="40" x2="45" y2="60" stroke="#4a5568" stroke-width="3"/>
    </svg>`,
    
    // Clipboard
    `<svg viewBox="0 0 100 100" fill="currentColor">
        <rect x="25" y="15" width="50" height="70" rx="5"/>
        <rect x="35" y="10" width="30" height="10" rx="3" fill="#4a5568"/>
        <line x1="35" y1="35" x2="65" y2="35" stroke="#4a5568" stroke-width="4"/>
        <line x1="35" y1="50" x2="65" y2="50" stroke="#4a5568" stroke-width="4"/>
        <line x1="35" y1="65" x2="55" y2="65" stroke="#4a5568" stroke-width="4"/>
    </svg>`,
    
    // Microscope
    `<svg viewBox="0 0 100 100" fill="currentColor">
        <rect x="35" y="70" width="30" height="5"/>
        <rect x="45" y="55" width="10" height="15"/>
        <circle cx="50" cy="45" r="12"/>
        <rect x="42" y="25" width="16" height="15"/>
        <rect x="45" y="15" width="10" height="10"/>
    </svg>`
];

// Generate icon positions and animations
function generateMedicalIcons() {
    const container = document.getElementById('medicalIcons');
    if (!container) return;
    
    const rows = 7;
    const cols = 10;
    const iconCount = rows * cols;
    
    for (let i = 0; i < iconCount; i++) {
        const row = Math.floor(i / cols);
        const col = i % cols;
        
        const iconDiv = document.createElement('div');
        iconDiv.className = 'medical-icon';
        iconDiv.style.top = `${2 + (row * 13)}%`;
        iconDiv.style.left = `${2 + (col * 10)}%`;
        iconDiv.style.animation = `float ${18 + Math.random() * 8}s ease-in-out infinite ${Math.random() * 8}s`;
        
        // Randomly select an icon from the array
        const randomIcon = medicalIcons[i % medicalIcons.length];
        iconDiv.innerHTML = randomIcon;
        
        container.appendChild(iconDiv);
    }
}

// Initialize icons when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', generateMedicalIcons);
} else {
    generateMedicalIcons();
}