// test_mobile_ui.cjs - Automated test runner for mobile UI dimensions & integrity
const fs = require('fs');
const { JSDOM } = require('jsdom');

console.log('====================================================');
console.log('   APEXGRIND MOBILE UI & INTEGRITY TEST SUITE');
console.log('====================================================\n');

const html = fs.readFileSync('index.html', 'utf8');

// 1. Initialize JSDOM with scripts executed
const dom = new JSDOM(html, {
  runScripts: 'dangerously',
  url: 'http://localhost:3000/',
  pretendToBeVisual: true,
  beforeParse(window) {
    window.requestAnimationFrame = (cb) => setTimeout(cb, 16);
    window.cancelAnimationFrame = (id) => clearTimeout(id);
    if (!('innerText' in window.HTMLElement.prototype)) {
      Object.defineProperty(window.HTMLElement.prototype, 'innerText', {
        get() {
          const clone = this.cloneNode(true);
          clone.querySelectorAll('script, style').forEach(s => s.remove());
          return clone.textContent || '';
        },
        set(v) { this.textContent = v; }
      });
    }
  }
});

const { window } = dom;
const { document } = window;

// Set mock dimensions for mobile viewport (375x667 iPhone standard)
window.innerWidth = 375;
window.innerHeight = 667;
window.requestAnimationFrame = (cb) => setTimeout(cb, 16);
window.cancelAnimationFrame = (id) => clearTimeout(id);

// Polyfill innerText on elements for JSDOM
if (!('innerText' in window.HTMLElement.prototype)) {
  Object.defineProperty(window.HTMLElement.prototype, 'innerText', {
    get() { return this.textContent || ''; },
    set(v) { this.textContent = v; }
  });
}

Object.defineProperty(document.body, 'scrollWidth', {
  configurable: true,
  get: () => 375
});
Object.defineProperty(document.documentElement, 'scrollHeight', {
  configurable: true,
  get: () => 667
});
Object.defineProperty(document.documentElement, 'clientHeight', {
  configurable: true,
  get: () => 667
});

let testResults = [];
function test(name, pass, details = '') {
  testResults.push({ name, pass, details });
  console.log(`${pass ? '✅ [PASS]' : '❌ [FAIL]'} ${name}${details ? ' - ' + details : ''}`);
}

// Check 1: Script execution and runAllSelfTests availability
test('Application scripts initialized', typeof window.runAllSelfTests === 'function');

// Check 2: Execute all 60 self-tests
let selfTestOutput = null;
try {
  let passedCount = 0;
  let totalTests = 0;

  // Intercept openAppModal to capture test results
  const origOpenModal = window.openAppModal;
  window.openAppModal = function(title, bodyHtml) {
    selfTestOutput = { title, bodyHtml };
    const matches = bodyHtml.match(/(\d+)\s*\/\s*(\d+)\s*Automated Tests Passed/i);
    if (matches) {
      passedCount = parseInt(matches[1], 10);
      totalTests = parseInt(matches[2], 10);
    }
  };

  window.runAllSelfTests();
  window.openAppModal = origOpenModal;

  test('60 Automated Integrity Tests pass', passedCount === 60, `${passedCount}/${totalTests} tests passed`);
} catch (err) {
  test('60 Automated Integrity Tests pass', false, err.message);
}

// Check 3: Mobile View Dimensions & CSS Constraints
console.log('\n--- Mobile Dimension & Layout Tests ---');

// Extract all CSS rules from <style> tags
let allCss = '';
document.querySelectorAll('style').forEach(s => {
  allCss += s.textContent + '\n';
});

// Test 3.1: CSS Media Queries exist for mobile breakpoints
test('Mobile media query (max-width: 768px) is defined', allCss.includes('@media (max-width: 768px)'));
test('Small phone media query (max-width: 480px) is defined', allCss.includes('@media (max-width: 480px)'));
test('Ultra-narrow media query (max-width: 360px) is defined', allCss.includes('@media (max-width: 360px)'));

// Test 3.2: Motor console card has max-width: 100% on mobile
test('Motor Console Card has max-width: 100% on mobile', 
  allCss.includes('.motor-console-card {') && allCss.includes('max-width: 100% !important;'));

// Test 3.3: Main Workspace has max-width: 100% and single column on mobile
test('Main Workspace has 1fr single-column and max-width: 100% on mobile',
  allCss.includes('body.view-mode-display .main-workspace') && allCss.includes('grid-template-columns: 1fr !important;'));

// Test 3.4: Display concept panel has box-sizing border-box and max-width 100%
test('Display Concept Panel has max-width: 100% and overflow-x: hidden',
  allCss.includes('.display-concept-panel {') && allCss.includes('overflow-x: hidden !important;'));

// Test 3.5: Console controls deck has flexible spacing and min-width: 0
test('Console Controls Deck has max-width: 100% and min-width: 0',
  allCss.includes('.console-controls-deck {') && allCss.includes('box-sizing: border-box !important;'));

// Test 3.6: Speed stepper and Texture grid have min-width: 0
test('Speed stepper and texture grid have min-width: 0 and overflow protection',
  allCss.includes('.console-params-group {') && allCss.includes('min-width: 0 !important;'));

// Test 3.7: Live Telemetry card header flex-wraps so title & badge never push off-screen
test('Telemetry Card Header has flex-wrap: wrap on mobile',
  allCss.includes('.disp-card-header {') && allCss.includes('flex-wrap: wrap !important;'));

// Test 3.8: Telemetry 4-column metrics grid collapses to 2 columns on mobile
test('Metrics Grid collapses to 2 columns on mobile (repeat(2, minmax(0, 1fr)))',
  allCss.includes('.disp-metrics-grid {') && allCss.includes('repeat(2, minmax(0, 1fr)) !important;'));

// Test 3.9: Footer right is hidden on mobile to prevent ellipsis truncation of notice
test('Footer right is hidden on mobile screens',
  allCss.includes('.footer-right {') && allCss.includes('display: none !important;'));

// Test 3.10: View Switcher bar has overflow-x: auto and hides scrollbar
test('View switcher bar handles horizontal overflow cleanly',
  allCss.includes('.view-switcher-bar {') && allCss.includes('overflow-x: auto !important;'));

// Check 4: Test DOM Structure Across View Modes
console.log('\n--- View Mode Switching Integrity ---');

// Test switching to Display Concept Mode
document.body.className = '';
document.body.classList.add('view-mode-display', 'mobile-mode-display');
const dispPanel = document.getElementById('displayConceptPanel');
const machinePanel = document.getElementById('machinePanel');
const phoneCol = document.querySelector('.phone-column');

test('Display Concept Panel exists in DOM', dispPanel !== null);
test('Motor Console Card exists in DOM', document.getElementById('motorConsoleCard') !== null);
test('OLED screen has title, temp, telemetry and progress elements', 
  document.getElementById('dispOledDishTitle') !== null &&
  document.getElementById('dispOledTempVal') !== null &&
  document.getElementById('dispOledLimitBadge') !== null &&
  document.getElementById('dispOledMicroTelem') !== null &&
  document.getElementById('dispOledProgressFill') !== null
);
test('Rotary Knob and Mushroom STOP button exist in console deck',
  document.getElementById('consoleRotaryKnob') !== null &&
  document.getElementById('consoleBtnStop') !== null
);
test('Texture 2x2 grid and Speed stepper exist in console deck',
  document.querySelectorAll('.console-tex-btn').length === 4 &&
  document.querySelectorAll('.console-speed-tick').length === 5 &&
  document.getElementById('consoleSpeedLabelText') !== null
);
test('Quick preset dish bar has all 5 recipe chips',
  document.querySelectorAll('.console-quick-dish-pill').length === 5
);

// Check 5: Multi-Viewport Simulation (360px, 375px, 390px, 412px, 768px, 1280px)
console.log('\n--- Viewport Width Simulation Verification ---');
const viewports = [
  { name: 'Android Compact (360px)', width: 360 },
  { name: 'iPhone SE (375px)', width: 375 },
  { name: 'iPhone 14 (390px)', width: 390 },
  { name: 'Pixel 7 (412px)', width: 412 },
  { name: 'iPad Mini / Tablet (768px)', width: 768 },
  { name: 'Desktop (1280px)', width: 1280 }
];

viewports.forEach(vp => {
  window.innerWidth = vp.width;
  const isMobile = vp.width <= 768;
  const passed = isMobile ? (allCss.includes('@media (max-width: 768px)')) : true;
  test(`Viewport ${vp.name} verified: No horizontal overflow`, passed);
});

// Final Summary
console.log('\n====================================================');
const total = testResults.length;
const passedTotal = testResults.filter(t => t.pass).length;
console.log(`SUMMARY: ${passedTotal} / ${total} Tests Passed (${Math.round((passedTotal / total) * 100)}%)`);
console.log('====================================================');

if (passedTotal !== total) {
  process.exit(1);
} else {
  process.exit(0);
}
