// ===============================================
// MODERN UNIT CONVERTER - COMPLETE JAVASCRIPT
// ===============================================

// ========== CONVERSION DATA STRUCTURE ==========
const conversionData = {
    weight: {
        kilogram: { factor: 1, name: 'Kilogram (kg)' },
        gram: { factor: 1000, name: 'Gram (g)' },
        milligram: { factor: 1000000, name: 'Milligram (mg)' },
        metricTon: { factor: 0.001, name: 'Metric Ton (t)' },
        pound: { factor: 2.20462, name: 'Pound (lb)' },
        ounce: { factor: 35.274, name: 'Ounce (oz)' }
    },
    length: {
        meter: { factor: 1, name: 'Meter (m)' },
        kilometer: { factor: 0.001, name: 'Kilometer (km)' },
        centimeter: { factor: 100, name: 'Centimeter (cm)' },
        millimeter: { factor: 1000, name: 'Millimeter (mm)' },
        inch: { factor: 39.3701, name: 'Inch (in)' },
        foot: { factor: 3.28084, name: 'Foot (ft)' },
        yard: { factor: 1.09361, name: 'Yard (yd)' },
        mile: { factor: 0.000621371, name: 'Mile (mi)' }
    },
    temperature: {
        celsius: { name: 'Celsius (°C)', special: true },
        fahrenheit: { name: 'Fahrenheit (°F)', special: true },
        kelvin: { name: 'Kelvin (K)', special: true }
    },
    area: {
        squareMeter: { factor: 1, name: 'Square Meter (m²)' },
        squareKilometer: { factor: 0.000001, name: 'Square Kilometer (km²)' },
        squareFoot: { factor: 10.7639, name: 'Square Foot (ft²)' },
        acre: { factor: 0.000247105, name: 'Acre' },
        hectare: { factor: 0.0001, name: 'Hectare (ha)' }
    },
    volume: {
        liter: { factor: 1, name: 'Liter (L)' },
        milliliter: { factor: 1000, name: 'Milliliter (mL)' },
        cubicMeter: { factor: 0.001, name: 'Cubic Meter (m³)' },
        gallon: { factor: 0.264172, name: 'Gallon (gal)' },
        pint: { factor: 2.11338, name: 'Pint (pt)' }
    },
    time: {
        second: { factor: 1, name: 'Second (s)' },
        minute: { factor: 0.0166667, name: 'Minute (min)' },
        hour: { factor: 0.000277778, name: 'Hour (hr)' },
        day: { factor: 0.0000115741, name: 'Day' }
    }
};

// ========== GLOBAL VARIABLES ==========
let currentCategory = 'weight';
let isDarkMode = false;
let conversionHistory = [];
const MAX_HISTORY = 10;

// ========== DOM ELEMENTS ==========
const tabButtons = document.querySelectorAll('.tab-btn');
const fromValue = document.getElementById('fromValue');
const toValue = document.getElementById('toValue');
const fromUnit = document.getElementById('fromUnit');
const toUnit = document.getElementById('toUnit');
const convertBtn = document.getElementById('convertBtn');
const swapBtn = document.getElementById('swapBtn');
const resultBox = document.getElementById('resultBox');
const resultText = document.getElementById('resultText');
const successPopup = document.getElementById('successPopup');
const darkModeToggle = document.getElementById('darkModeToggle');
const loadingShimmer = document.getElementById('loadingShimmer');
const conversionCard = document.getElementById('conversionCard');

// ========== INITIALIZATION ==========
document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
});

function initializeApp() {
    // Load saved dark mode preference
    const savedDarkMode = localStorage.getItem('darkMode');
    if (savedDarkMode === 'true') {
        enableDarkMode();
    }
    
    // Initialize first category
    loadCategory(currentCategory);
    
    // Setup event listeners
    setupEventListeners();
}

// ========== EVENT LISTENERS ==========
function setupEventListeners() {
    // Tab switching
    tabButtons.forEach(btn => {
        btn.addEventListener('click', () => handleTabSwitch(btn));
    });
    
    // Convert button
    convertBtn.addEventListener('click', performConversion);
    
    // Swap button
    swapBtn.addEventListener('click', handleSwap);
    
    // Real-time conversion on input
    fromValue.addEventListener('input', performConversion);
    fromUnit.addEventListener('change', performConversion);
    toUnit.addEventListener('change', performConversion);
    
    // Dark mode toggle
    darkModeToggle.addEventListener('click', toggleDarkMode);
    
    // Enter key trigger conversion
    fromValue.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            performConversion();
        }
    });
}

// ========== TAB SWITCHING ==========
function handleTabSwitch(clickedBtn) {
    const category = clickedBtn.dataset.category;
    
    // Don't reload if same category
    if (category === currentCategory) return;
    
    // Update active tab
    tabButtons.forEach(btn => btn.classList.remove('active'));
    clickedBtn.classList.add('active');
    
    // Show loading shimmer
    showLoadingShimmer();
    
    // Simulate loading delay for smooth animation
    setTimeout(() => {
        currentCategory = category;
        loadCategory(category);
        hideLoadingShimmer();
        
        // Clear inputs
        fromValue.value = '';
        toValue.value = '';
        resultText.textContent = 'Enter a value to convert';
        resultBox.classList.remove('active');
    }, 500);
}

// ========== CATEGORY LOADING ==========
function loadCategory(category) {
    const units = conversionData[category];
    
    // Clear existing options
    fromUnit.innerHTML = '';
    toUnit.innerHTML = '';
    
    // Populate dropdowns
    Object.keys(units).forEach((key, index) => {
        const option1 = document.createElement('option');
        option1.value = key;
        option1.textContent = units[key].name;
        fromUnit.appendChild(option1);
        
        const option2 = document.createElement('option');
        option2.value = key;
        option2.textContent = units[key].name;
        toUnit.appendChild(option2);
        
        // Set default selections (first and second units)
        if (index === 0) fromUnit.value = key;
        if (index === 1) toUnit.value = key;
    });
    
    // If only one unit exists, select the same for both
    if (Object.keys(units).length === 1) {
        toUnit.value = fromUnit.value;
    }
    
    // Auto-focus on input after category change
    setTimeout(() => fromValue.focus(), 600);
}

// ========== CONVERSION LOGIC ==========
function performConversion() {
    const value = parseFloat(fromValue.value);
    
    // Validate input
    if (isNaN(value) || fromValue.value === '') {
        toValue.value = '';
        resultText.textContent = 'Enter a value to convert';
        resultBox.classList.remove('active');
        return;
    }
    
    const fromUnitValue = fromUnit.value;
    const toUnitValue = toUnit.value;
    
    let result;
    
    // Special handling for temperature
    if (currentCategory === 'temperature') {
        result = convertTemperature(value, fromUnitValue, toUnitValue);
    } else {
        // Standard conversion using factors
        const units = conversionData[currentCategory];
        const fromFactor = units[fromUnitValue].factor;
        const toFactor = units[toUnitValue].factor;
        
        // Convert to base unit, then to target unit
        result = (value / fromFactor) * toFactor;
    }
    
    // Round to 6 decimal places and remove trailing zeros
    result = parseFloat(result.toFixed(6));
    
    // Update result
    toValue.value = result;
    
    // Update result box with animation
    const fromUnitName = conversionData[currentCategory][fromUnitValue].name;
    const toUnitName = conversionData[currentCategory][toUnitValue].name;
    
    resultText.innerHTML = `
        <strong>${value}</strong> ${fromUnitName.split('(')[0]} = 
        <strong style="color: var(--primary-green);">${result}</strong> ${toUnitName.split('(')[0]}
        <button onclick="copyResult('${result}')" class="copy-result-btn" title="Copy result">
            <i class="fas fa-copy"></i>
        </button>
    `;
    resultBox.classList.add('active');
    
    // Add to history
    addToHistory(value, fromUnitValue, result, toUnitValue);
    
    // Show success popup
    showSuccessPopup();
}

// ========== TEMPERATURE CONVERSION ==========
function convertTemperature(value, from, to) {
    // Convert to Celsius first
    let celsius;
    
    switch(from) {
        case 'celsius':
            celsius = value;
            break;
        case 'fahrenheit':
            celsius = (value - 32) * 5/9;
            break;
        case 'kelvin':
            celsius = value - 273.15;
            break;
    }
    
    // Convert from Celsius to target
    let result;
    
    switch(to) {
        case 'celsius':
            result = celsius;
            break;
        case 'fahrenheit':
            result = (celsius * 9/5) + 32;
            break;
        case 'kelvin':
            result = celsius + 273.15;
            break;
    }
    
    return result;
}

// ========== SWAP UNITS ==========
function handleSwap() {
    // Animate swap button
    swapBtn.style.transform = 'rotate(180deg)';
    setTimeout(() => {
        swapBtn.style.transform = 'rotate(0deg)';
    }, 400);
    
    // Swap unit selections
    const tempUnit = fromUnit.value;
    fromUnit.value = toUnit.value;
    toUnit.value = tempUnit;
    
    // Swap values
    const tempValue = fromValue.value;
    fromValue.value = toValue.value;
    toValue.value = tempValue;
    
    // Recalculate if there's a value
    if (fromValue.value !== '') {
        performConversion();
    }
}

// ========== SUCCESS POPUP ==========
function showSuccessPopup() {
    successPopup.classList.add('show');
    
    setTimeout(() => {
        successPopup.classList.remove('show');
    }, 2000);
}

// ========== LOADING SHIMMER ==========
function showLoadingShimmer() {
    loadingShimmer.classList.add('active');
    conversionCard.classList.add('hidden');
}

function hideLoadingShimmer() {
    loadingShimmer.classList.remove('active');
    conversionCard.classList.remove('hidden');
}

// ========== DARK MODE ==========
function toggleDarkMode() {
    if (isDarkMode) {
        disableDarkMode();
    } else {
        enableDarkMode();
    }
}

function enableDarkMode() {
    document.body.classList.add('dark-mode');
    darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    isDarkMode = true;
    localStorage.setItem('darkMode', 'true');
    
    // Add smooth transition animation
    animateTransition();
}

function disableDarkMode() {
    document.body.classList.remove('dark-mode');
    darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    isDarkMode = false;
    localStorage.setItem('darkMode', 'false');
    
    // Add smooth transition animation
    animateTransition();
}

function animateTransition() {
    const overlay = document.createElement('div');
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: ${isDarkMode ? 'rgba(0,0,0,0.3)' : 'rgba(255,255,255,0.3)'};
        pointer-events: none;
        z-index: 9999;
        opacity: 1;
        transition: opacity 0.5s ease;
    `;
    document.body.appendChild(overlay);
    
    setTimeout(() => {
        overlay.style.opacity = '0';
        setTimeout(() => overlay.remove(), 500);
    }, 100);
}

// ========== UTILITY FUNCTIONS ==========

// Format number with commas
function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// Copy result to clipboard
function copyResult(text) {
    navigator.clipboard.writeText(text).then(() => {
        showNotification('Copied to clipboard! ✓', 'success');
    }).catch(() => {
        showNotification('Failed to copy', 'error');
    });
}

window.copyResult = copyResult;

// Add to history
function addToHistory(fromValue, fromUnit, toValue, toUnit) {
    const entry = {
        from: `${fromValue} ${fromUnit}`,
        to: `${toValue} ${toUnit}`,
        category: currentCategory,
        timestamp: new Date().toLocaleTimeString()
    };
    
    conversionHistory.unshift(entry);
    
    if (conversionHistory.length > MAX_HISTORY) {
        conversionHistory.pop();
    }
}

// Show notification
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
        <span>${message}</span>
    `;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 30px;
        padding: 16px 22px;
        background: ${type === 'success' ? '#1ABA85' : '#EF4444'};
        color: white;
        border-radius: 12px;
        display: flex;
        align-items: center;
        gap: 10px;
        font-size: 16px;
        font-weight: 500;
        box-shadow: 0 5px 20px rgba(0, 0, 0, 0.3);
        z-index: 10000;
        animation: slideInRight 0.4s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.4s ease';
        setTimeout(() => notification.remove(), 400);
    }, 2000);
}

// ========== KEYBOARD SHORTCUTS ==========
document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + S to swap
    if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        handleSwap();
    }
    
    // Ctrl/Cmd + D to toggle dark mode
    if ((e.ctrlKey || e.metaKey) && e.key === 'd') {
        e.preventDefault();
        toggleDarkMode();
    }
    
    // Ctrl/Cmd + C to copy result (when focus is on result)
    if ((e.ctrlKey || e.metaKey) && e.key === 'c' && document.activeElement === toValue) {
        e.preventDefault();
        if (toValue.value) {
            copyResult(toValue.value);
        }
    }
    
    // Escape to clear inputs
    if (e.key === 'Escape') {
        fromValue.value = '';
        toValue.value = '';
        resultText.textContent = 'Enter a value to convert';
        resultBox.classList.remove('active');
        fromValue.focus();
    }
    
    // Arrow keys to navigate between tabs
    if (e.key === 'ArrowRight' && e.altKey) {
        e.preventDefault();
        navigateTabs('next');
    }
    
    if (e.key === 'ArrowLeft' && e.altKey) {
        e.preventDefault();
        navigateTabs('prev');
    }
});

// Navigate tabs
function navigateTabs(direction) {
    const tabs = Array.from(tabButtons);
    const currentIndex = tabs.findIndex(tab => tab.classList.contains('active'));
    
    let newIndex;
    if (direction === 'next') {
        newIndex = (currentIndex + 1) % tabs.length;
    } else {
        newIndex = (currentIndex - 1 + tabs.length) % tabs.length;
    }
    
    tabs[newIndex].click();
}

// ========== CONSOLE WELCOME MESSAGE ==========
console.log('%c🎉 Modern Unit Converter Loaded Successfully!', 'color: #1ABA85; font-size: 16px; font-weight: bold;');
console.log('%c✨ Features: Real-time conversion | Dark mode | Smooth animations | History tracking', 'color: #1FA2FF; font-size: 12px;');
console.log('%c⌨️ Keyboard Shortcuts:', 'color: #6B7280; font-size: 12px; font-weight: bold;');
console.log('%c  • Ctrl+S: Swap units', 'color: #6B7280; font-size: 11px;');
console.log('%c  • Ctrl+D: Toggle dark mode', 'color: #6B7280; font-size: 11px;');
console.log('%c  • Ctrl+C: Copy result (when focused)', 'color: #6B7280; font-size: 11px;');
console.log('%c  • Alt+→/←: Navigate tabs', 'color: #6B7280; font-size: 11px;');
console.log('%c  • Escape: Clear inputs', 'color: #6B7280; font-size: 11px;');
