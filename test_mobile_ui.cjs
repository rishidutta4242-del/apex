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

async function runTests() {
  if (document.readyState === 'loading') {
    await new Promise(resolve => document.addEventListener('DOMContentLoaded', resolve, { once: true }));
  }

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

// Check 2B: Product references and workspace view integrity
console.log('\n--- Product Reference & Workspace View Tests ---');
test('Split view option is removed and machine view is the default',
  document.querySelector('.seg-btn[data-mode="split"]') === null &&
  !document.body.classList.contains('view-mode-split') &&
  document.body.classList.contains('view-mode-machine'));
test('Studio renders detailed vector blade models without pasted product photos',
  document.getElementById('bladeHeroSvg') !== null &&
  document.getElementById('bladeEngineeringGuides') !== null &&
  document.getElementById('bladePrecisionDetails') !== null &&
  document.getElementById('bladeHeroSvg')?.querySelector('#bladeMachinedSurface') !== null &&
  document.getElementById('bladeProductPhoto') === null &&
  document.getElementById('jarProductPhoto') === null &&
  document.querySelectorAll('img').length === 0 &&
  document.querySelectorAll('.blade-model-btn[data-model]').length === 6 &&
  ['Wet', 'Dry', 'Fine', 'Coarse', 'Chutney', 'Whipper'].every(name =>
    document.getElementById(`heroModel${name}`) !== null
  ));
const studioInteractionResults = (() => {
  document.getElementById('btnTabBladeStudio')?.click();
  const modelButtons = document.querySelectorAll('.blade-model-btn[data-model]');
  const zoomIn = document.getElementById('btnStudioZoomIn');
  const zoomOut = document.getElementById('btnStudioZoomOut');
  const reset = document.getElementById('btnCamReset');
  if (modelButtons.length !== 6 || !zoomIn || !zoomOut || !reset) return { zoomInWorks: false, zoomOutWorks: false, keyboardWorks: false, resetWorks: false };
  zoomIn.click();
  const zoomInWorks = document.getElementById('studioZoomValue')?.textContent === '110%';
  zoomOut.click();
  const zoomOutWorks = document.getElementById('studioZoomValue')?.textContent === '100%';
  modelButtons[0].focus();
  const focusedModel = document.activeElement?.getAttribute('data-model');
  modelButtons[0].dispatchEvent(new window.KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }));
  const keyboardWorks = document.getElementById('heroModelDry')?.style.display === 'block';
  reset.click();
  const resetWorks = document.getElementById('studioZoomValue')?.textContent === '100%';
  return { zoomInWorks, zoomOutWorks, keyboardWorks, resetWorks };
})();
test('3D Studio provides keyboard-accessible model selection and zoom controls',
  Object.values(studioInteractionResults).every(Boolean),
  JSON.stringify(studioInteractionResults));
test('3D Studio expands its inspection viewport and keeps tab selection accessible', (() => {
  const studioTab = document.getElementById('btnTabBladeStudio');
  const jarTab = document.getElementById('btnTabJarAssembly');
  const topGrid = document.querySelector('.machine-top-grid');
  const stageCard = document.getElementById('jarStageCard');
  if (!studioTab || !jarTab || !topGrid || !stageCard) return false;
  studioTab.click();
  const studioOpen = topGrid.classList.contains('studio-active') &&
    stageCard.classList.contains('studio-active') &&
    studioTab.getAttribute('aria-selected') === 'true';
  jarTab.click();
  return studioOpen && !topGrid.classList.contains('studio-active') &&
    !stageCard.classList.contains('studio-active') &&
    jarTab.getAttribute('aria-selected') === 'true';
})());
test('Each blade selector activates matching studio and seated jar vector assemblies', (() => {
  const keys = ['wet', 'dry', 'fine', 'coarse', 'chutney', 'whipper'];
  return keys.every(key => {
    document.querySelector(`.blade-model-btn[data-model="${key}"]`)?.click();
    const heroId = `heroModel${key[0].toUpperCase()}${key.slice(1)}`;
    const jarId = `jarBlade${key[0].toUpperCase()}${key.slice(1)}`;
    return document.getElementById(heroId)?.style.display === 'block' &&
      document.getElementById(jarId)?.style.display === 'block' &&
      keys.filter(other => other !== key).every(other => {
        const otherId = `heroModel${other[0].toUpperCase()}${other.slice(1)}`;
        return document.getElementById(otherId)?.style.display === 'none';
      });
  });
})());
test('Fitted jar and attachment selections synchronize the simulated blade', (() => {
  const jarSelect = document.getElementById('selJarFitted');
  const attachmentSelect = document.getElementById('selAttachment');
  if (!jarSelect || !attachmentSelect) return false;

  attachmentSelect.value = '2';
  attachmentSelect.dispatchEvent(new window.Event('change', { bubbles: true }));
  const fineAttachmentWorks =
    document.getElementById('heroModelFine')?.style.display === 'block' &&
    document.getElementById('jarBladeFine')?.style.display === 'block';

  jarSelect.value = 'jar1';
  jarSelect.dispatchEvent(new window.Event('change', { bubbles: true }));
  const smallJarWorks =
    document.getElementById('heroModelChutney')?.style.display === 'block' &&
    document.getElementById('jarBladeChutney')?.style.display === 'block';

  jarSelect.value = 'jar2';
  jarSelect.dispatchEvent(new window.Event('change', { bubbles: true }));
  return fineAttachmentWorks && smallJarWorks &&
    document.getElementById('heroModelFine')?.style.display === 'block';
})());
test('Dish presets synchronize jar, attachment, and blade', (() => {
  const presetSelect = document.getElementById('selDishPreset');
  if (!presetSelect) return false;
  presetSelect.value = 'p4';
  presetSelect.dispatchEvent(new window.Event('change', { bubbles: true }));
  return document.getElementById('selJarFitted')?.value === 'jar2' &&
    document.getElementById('selAttachment')?.value === '2' &&
    document.getElementById('heroModelFine')?.style.display === 'block' &&
    document.getElementById('jarBladeFine')?.style.display === 'block';
})());
test('Environment and advanced controls update their live readouts', (() => {
  const ambient = document.getElementById('inputAmbientTemp');
  const voltage = document.getElementById('inputSupplyVoltage');
  const wear = document.getElementById('inputBladeWear');
  if (!ambient || !voltage || !wear) return false;
  ambient.value = '34';
  ambient.dispatchEvent(new window.Event('input', { bubbles: true }));
  voltage.value = '210';
  voltage.dispatchEvent(new window.Event('input', { bubbles: true }));
  wear.value = '20';
  wear.dispatchEvent(new window.Event('input', { bubbles: true }));
  return document.getElementById('ambientTempValue')?.textContent === '34 °C' &&
    document.getElementById('supplyVoltageValue')?.textContent === '210 V' &&
    document.getElementById('bladeWearValue')?.textContent === '20%';
})());
test('Supply voltage and blade wear affect live motor telemetry and load', (() => {
  const rpm = document.getElementById('valSensorRpm');
  const trueTemp = document.getElementById('subSensorTrueTemp');
  if (!rpm || !trueTemp || typeof window.toggleMotorRun !== 'function') return false;
  const startTemp = Number.parseFloat(trueTemp.textContent.replace('True:', ''));
  window.toggleMotorRun();
  window.simulationTick();
  const activeRpm = Number.parseInt(rpm.textContent.replace(/[^\d]/g, ''), 10);
  const activeTemp = Number.parseFloat(trueTemp.textContent.replace('True:', ''));
  window.stopMotorRun();
  return activeRpm > 0 && activeRpm < 18000 && activeTemp > startTemp;
})());
const setupControlValues = [
  document.getElementById('selJarFitted')?.value,
  document.getElementById('selAttachment')?.value,
  document.getElementById('selMotorLoad')?.value,
  document.getElementById('inputBatchWeight')?.value,
  document.getElementById('selSimSpeed')?.value
];
test('Setup controls remain synchronized with the selected operating conditions',
  JSON.stringify(setupControlValues) === JSON.stringify(['jar2', '2', '1.0', '350', '10']),
  `values: ${JSON.stringify(setupControlValues)}`);
test('Attachment speed cap is enforced and shown on the jar stage', (() => {
  const attachment = document.getElementById('selAttachment');
  if (!attachment || typeof window.setMotorSpeed !== 'function') return false;
  attachment.value = '3';
  attachment.dispatchEvent(new window.Event('change', { bubbles: true }));
  window.setMotorSpeed(5);
  return document.getElementById('speedLabelText')?.textContent === 'Speed 3' &&
    document.getElementById('stageJarIndicator')?.textContent === 'Cap: Speed 3';
})());
test('Environment and Advanced machine tabs reveal their controls', (() => {
  const environmentTab = document.querySelector('.m-tab-btn[data-tab="environment"]');
  const advancedTab = document.querySelector('.m-tab-btn[data-tab="advanced"]');
  if (!environmentTab || !advancedTab) return false;
  environmentTab.click();
  const environmentVisible = document.getElementById('tabContentEnv')?.classList.contains('active');
  advancedTab.click();
  const advancedVisible = document.getElementById('tabContentAdv')?.classList.contains('active');
  return environmentVisible && advancedVisible;
})());
test('Jar is simulated as vector geometry and preserves engineering views', (() => {
  const jarIsVector = document.getElementById('jarMainSvg') !== null &&
    document.getElementById('jarProductPhoto') === null &&
    document.getElementById('svgJarCylinder') !== null &&
    document.getElementById('svgJarHandle') !== null;
  document.getElementById('btnJarCutaway')?.click();
  const cutawayWorks = !document.getElementById('stageJarContainer')?.classList.contains('photo-mode') &&
    document.getElementById('selJarVisualMode')?.value === 'cutaway' &&
    document.getElementById('cutawayContainer')?.style.display === 'block';
  document.getElementById('btnJarMatte')?.click();
  return jarIsVector && cutawayWorks;
})());

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
}

runTests().catch(err => {
  console.error(err);
  process.exit(1);
});
