// apply_ui_polish.cjs
const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf-8');

console.log('Original index.html length:', html.length);

// 1. Move jarViewPills from stage-header-row to floating at bottom of stageJarContainer
const oldJarHeaderPattern = `<div class="stage-header-row">
              <div class="stage-tabs" role="tablist">
                <button type="button" class="stage-tab-btn active" id="btnTabJarAssembly" role="tab" aria-selected="true">🍶 Jar</button>
                <button type="button" class="stage-tab-btn" id="btnTabBladeStudio" role="tab" aria-selected="false">⚙️ 3D Studio</button>
              </div>
              <div class="jar-view-pills" id="jarViewPills">
                <button type="button" class="btn-view-mode active" id="btnJarMatte">Matte</button>
                <button type="button" class="btn-view-mode" id="btnJarXRay">X-Ray</button>
                <button type="button" class="btn-view-mode" id="btnJarCutaway">Cutaway</button>
              </div>
            </div>`;

const newJarHeader = `<div class="stage-header-row">
              <div class="stage-tabs" role="tablist" aria-label="Visual Mode">
                <button type="button" class="stage-tab-btn active" id="btnTabJarAssembly" role="tab" aria-selected="true">🍶 Jar View</button>
                <button type="button" class="stage-tab-btn" id="btnTabBladeStudio" role="tab" aria-selected="false">⚙️ 3D Studio</button>
              </div>
              <div class="stage-jar-indicator" id="stageJarIndicator">Cap: Speed 5</div>
            </div>`;

if (html.includes(oldJarHeaderPattern)) {
  html = html.replace(oldJarHeaderPattern, newJarHeader);
  console.log('✓ Updated stage-header-row (clean separation)');
} else {
  console.log('Notice: oldJarHeaderPattern exact match not found, looking for alternative match');
  // Regex replacement
  html = html.replace(
    /<div class="stage-header-row">[\s\S]*?<div class="stage-tabs"[\s\S]*?<\/div>[\s\S]*?<div class="jar-view-pills" id="jarViewPills">[\s\S]*?<\/div>[\s\S]*?<\/div>/,
    newJarHeader
  );
  console.log('✓ Applied regex update for stage-header-row');
}

// Now insert jar-view-floating-bar inside stageJarContainer
const oldStageJarContainer = `<div class="stage-visual-container" id="stageJarContainer">`;
const newStageJarContainer = `<div class="stage-visual-container" id="stageJarContainer">
              <!-- Floating Jar View Pills (Matte / X-Ray / Cutaway) -->
              <div class="jar-view-floating-bar" id="jarViewPills" role="radiogroup" aria-label="Jar Render Mode">
                <button type="button" class="btn-view-mode active" id="btnJarMatte" role="radio" aria-checked="true">Matte</button>
                <button type="button" class="btn-view-mode" id="btnJarXRay" role="radio" aria-checked="false">X-Ray</button>
                <button type="button" class="btn-view-mode" id="btnJarCutaway" role="radio" aria-checked="false">Cutaway</button>
              </div>`;

if (!html.includes('class="jar-view-floating-bar"')) {
  html = html.replace(oldStageJarContainer, newStageJarContainer);
  console.log('✓ Added floating jar view pills inside stageJarContainer');
}

// 2. Knob center cap and needle isolation to avoid collision
const oldKnobDial = `<div class="rotary-knob-dial" id="hardwareKnobDial">
                    <div class="knob-pointer-needle" id="knobPointerNeedle"></div>
                    <div class="knob-center-label" id="knobCenterCap">START</div>
                  </div>`;

const newKnobDial = `<div class="rotary-knob-dial" id="hardwareKnobDial">
                    <div class="knob-pointer-needle" id="knobPointerNeedle"></div>
                    <div class="knob-center-hub">
                      <div class="knob-center-label" id="knobCenterCap">START</div>
                    </div>
                  </div>`;

if (html.includes(oldKnobDial)) {
  html = html.replace(oldKnobDial, newKnobDial);
  console.log('✓ Updated rotary knob with dedicated center hub');
}

// 3. Update CSS in index.html to eliminate congestion and achieve executive-tier polish
// We will replace key CSS classes with refined styles
const refinedStyles = `
    /* -------------------------------------------------------------
       REFINED EXECUTIVE INDUSTRIAL DESIGN & ANTI-CONGESTION SYSTEM
       ------------------------------------------------------------- */
    :root {
      --app-w: 100vw;
      --app-h: 100dvh;
      --ui-scale: 1.0;
      --font-scale: 13px;
      --bg: #080D1A;
      --panel: #0E1626;
      --panel-2: #141F36;
      --panel-3: #1B2B4A;
      --border: #22324F;
      --border-subtle: #19263E;
      --border-focus: #14B8A6;
      --text: #F8FAFC;
      --text-dim: #94A3B8;
      --text-muted: #64748B;
      --teal: #14B8A6;
      --teal-hover: #2DD4BF;
      --cyan: #38BDF8;
      --green: #10B981;
      --amber: #F59E0B;
      --red: #EF4444;
      --radius-xs: 4px;
      --radius-sm: 6px;
      --radius-md: 10px;
      --radius-lg: 14px;
      --radius-xl: 18px;
      --font-sans: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
      --font-mono: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", monospace;
      --shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.4);
      --shadow-md: 0 4px 12px rgba(0, 0, 0, 0.5);
      --shadow-lg: 0 12px 32px rgba(0, 0, 0, 0.7);
    }

    /* Machine Top Grid (Jar on left ~40%, Display & Controls on right ~60%) */
    .machine-top-grid {
      display: grid;
      grid-template-columns: minmax(0, 42fr) minmax(0, 58fr);
      gap: 10px;
      height: 100%;
      min-height: 0;
      overflow: hidden;
      align-items: stretch;
    }

    /* LEFT: Jar Visual Stage */
    .jar-stage-card {
      background: var(--panel-2);
      border: 1px solid var(--border);
      border-radius: var(--radius-md);
      padding: 8px 10px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      height: 100%;
      min-height: 0;
      overflow: hidden;
      position: relative;
    }
    .stage-header-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-shrink: 0;
      gap: 6px;
      height: 28px;
    }
    .stage-tabs {
      display: flex;
      background: var(--panel);
      border: 1px solid var(--border);
      border-radius: var(--radius-sm);
      padding: 2px;
      gap: 2px;
    }
    .stage-tab-btn {
      height: 24px;
      padding: 0 9px;
      font-size: 12px;
      font-weight: 600;
      background: transparent;
      border: none;
      color: var(--text-dim);
      border-radius: 4px;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 5px;
      white-space: nowrap;
      transition: all 0.15s ease;
    }
    .stage-tab-btn:hover {
      color: var(--text);
    }
    .stage-tab-btn.active {
      background: var(--teal);
      color: #070B14;
      font-weight: 700;
      box-shadow: 0 1px 4px rgba(20, 184, 166, 0.4);
    }
    .stage-jar-indicator {
      font-size: 11px;
      font-weight: 600;
      color: var(--text-dim);
      background: var(--panel);
      padding: 2px 7px;
      border-radius: 10px;
      border: 1px solid var(--border);
      white-space: nowrap;
    }

    /* Floating Jar View Selector at bottom of Jar Canvas */
    .jar-view-floating-bar {
      position: absolute;
      bottom: 8px;
      left: 50%;
      transform: translateX(-50%);
      display: flex;
      gap: 3px;
      background: rgba(10, 15, 26, 0.88);
      backdrop-filter: blur(8px);
      border: 1px solid rgba(255, 255, 255, 0.12);
      border-radius: 20px;
      padding: 3px 5px;
      z-index: 10;
      box-shadow: 0 4px 14px rgba(0, 0, 0, 0.6);
      transition: opacity 0.2s ease;
    }
    .jar-view-floating-bar .btn-view-mode {
      height: 22px;
      padding: 0 8px;
      font-size: 11px;
      font-weight: 600;
      background: transparent;
      border: none;
      color: var(--text-dim);
      border-radius: 12px;
      cursor: pointer;
      white-space: nowrap;
      transition: all 0.15s ease;
    }
    .jar-view-floating-bar .btn-view-mode:hover {
      color: var(--text);
    }
    .jar-view-floating-bar .btn-view-mode.active {
      background: var(--teal);
      color: #070B14;
      font-weight: 700;
      box-shadow: 0 1px 4px rgba(20, 184, 166, 0.4);
    }

    /* RIGHT: Display & Hardware Controls */
    .controls-display-card {
      background: var(--panel-2);
      border: 1px solid var(--border);
      border-radius: var(--radius-md);
      padding: 8px 10px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      height: 100%;
      min-height: 0;
      overflow: hidden;
      gap: 6px;
    }

    /* OLED TOUCHSCREEN DISPLAY */
    .machine-touchscreen {
      background: #050811;
      border: 1.5px solid #1D2A42;
      border-radius: var(--radius-sm);
      padding: 8px 10px;
      display: flex;
      flex-direction: column;
      gap: 4px;
      box-shadow: inset 0 0 14px rgba(0, 0, 0, 0.9), 0 1px 3px rgba(0, 0, 0, 0.4);
      flex-shrink: 0;
    }
    .screen-top-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
    }
    .screen-dish-title {
      font-size: 13px;
      font-weight: 700;
      color: #F8FAFC;
      letter-spacing: 0.2px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      flex: 1;
    }
    .screen-status-badge {
      font-size: 11px;
      font-weight: 700;
      padding: 2px 8px;
      border-radius: 10px;
      background: rgba(20, 184, 166, 0.15);
      color: var(--teal);
      border: 1px solid var(--teal);
      text-transform: uppercase;
      letter-spacing: 0.6px;
      white-space: nowrap;
      box-shadow: 0 0 8px rgba(20, 184, 166, 0.2);
    }
    .screen-status-badge.grinding {
      background: rgba(16, 185, 129, 0.2);
      color: var(--green);
      border-color: var(--green);
      box-shadow: 0 0 10px rgba(16, 185, 129, 0.3);
    }
    .screen-status-badge.paused {
      background: rgba(245, 158, 11, 0.2);
      color: var(--amber);
      border-color: var(--amber);
      box-shadow: 0 0 10px rgba(245, 158, 11, 0.3);
    }
    .screen-status-badge.done {
      background: rgba(20, 184, 166, 0.25);
      color: var(--teal);
      border-color: var(--teal);
    }
    .screen-status-badge.fault {
      background: rgba(239, 68, 68, 0.25);
      color: var(--red);
      border-color: var(--red);
      box-shadow: 0 0 10px rgba(239, 68, 68, 0.3);
    }
    .screen-status-badge.poweroff {
      background: rgba(148, 163, 184, 0.15);
      color: var(--text-dim);
      border-color: var(--text-dim);
    }

    .screen-temp-row {
      display: flex;
      align-items: baseline;
      justify-content: space-between;
      margin-top: 1px;
    }
    .screen-temp-val {
      font-family: var(--font-mono);
      font-size: 21px;
      font-weight: 800;
      color: #38BDF8;
      letter-spacing: -0.5px;
      white-space: nowrap;
      font-variant-numeric: tabular-nums;
    }
    .screen-temp-val .unit {
      font-size: 12px;
      font-weight: 500;
      color: var(--text-dim);
      margin-left: 3px;
    }
    .screen-temp-limit {
      font-size: 12px;
      font-weight: 600;
      color: #94A3B8;
      white-space: nowrap;
      background: rgba(255, 255, 255, 0.04);
      padding: 1px 6px;
      border-radius: 4px;
      border: 1px solid rgba(255, 255, 255, 0.08);
    }

    .screen-progress-bar-wrap {
      display: flex;
      flex-direction: column;
      gap: 3px;
      margin-top: 2px;
    }
    .screen-progress-track {
      height: 5px;
      background: rgba(255, 255, 255, 0.07);
      border-radius: 3px;
      overflow: hidden;
    }
    .screen-progress-fill {
      height: 100%;
      background: linear-gradient(90deg, var(--teal), #38BDF8);
      width: 0%;
      transition: width 0.1s linear;
      box-shadow: 0 0 6px rgba(56, 189, 248, 0.5);
    }
    .screen-progress-labels {
      display: flex;
      justify-content: space-between;
      font-size: 11px;
      font-weight: 500;
      color: var(--text-dim);
    }

    /* HARDWARE QUICK CONTROLS UNDER DISPLAY */
    .machine-quick-controls {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 10px;
      flex-shrink: 0;
      padding-top: 2px;
    }
    .knob-stop-group {
      display: flex;
      align-items: center;
      gap: 8px;
      flex-shrink: 0;
    }
    .rotary-knob-wrapper {
      position: relative;
      width: 52px;
      height: 52px;
      cursor: pointer;
      user-select: none;
      touch-action: manipulation;
      flex-shrink: 0;
    }
    .rotary-knob-dial {
      width: 52px;
      height: 52px;
      border-radius: 50%;
      background: radial-gradient(circle at 35% 35%, #222F42, #0A0F1A);
      border: 2.5px solid #364966;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.6), inset 0 1px 2px rgba(255, 255, 255, 0.18);
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      transition: transform 0.05s ease;
    }
    .rotary-knob-dial:focus-visible {
      outline: 2px solid var(--teal);
    }
    .knob-pointer-needle {
      position: absolute;
      top: 3px;
      left: calc(50% - 1.5px);
      width: 3px;
      height: 8px;
      background: var(--teal);
      border-radius: 1.5px;
      box-shadow: 0 0 6px var(--teal);
      pointer-events: none;
    }
    .knob-center-hub {
      width: 28px;
      height: 28px;
      border-radius: 50%;
      background: #0B111E;
      border: 1px solid rgba(255, 255, 255, 0.12);
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.7);
      pointer-events: none;
    }
    .knob-center-label {
      font-size: 10px;
      font-weight: 800;
      color: var(--text);
      letter-spacing: 0.5px;
      text-align: center;
    }
    .btn-stop-machine {
      width: 48px;
      height: 48px;
      border-radius: 50%;
      background: radial-gradient(circle at 35% 35%, #EF4444, #991B1B);
      border: 2.5px solid #FCA5A5;
      color: #FFFFFF;
      font-weight: 800;
      font-size: 11px;
      letter-spacing: 0.5px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 4px 12px rgba(239, 68, 68, 0.4), inset 0 1px 2px rgba(255, 255, 255, 0.3);
      transition: all 0.1s ease;
      touch-action: manipulation;
      flex-shrink: 0;
    }
    .btn-stop-machine:active {
      transform: scale(0.94);
      box-shadow: 0 2px 6px rgba(239, 68, 68, 0.6);
    }

    /* Texture Selection (2x2 grid for generous width and zero clipping) */
    .quick-params-group {
      display: flex;
      flex-direction: column;
      gap: 4px;
      flex: 1;
      min-width: 0;
    }
    .texture-pill-row {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 3px;
    }
    .btn-texture-pill {
      height: 22px;
      padding: 0 6px;
      font-size: 11px;
      font-weight: 600;
      background: var(--panel);
      border: 1px solid var(--border);
      color: var(--text-dim);
      border-radius: var(--radius-xs);
      cursor: pointer;
      white-space: nowrap;
      text-align: center;
      transition: all 0.15s ease;
    }
    .btn-texture-pill:hover {
      color: var(--text);
      border-color: var(--teal);
    }
    .btn-texture-pill.active {
      background: var(--teal);
      color: #070B14;
      border-color: var(--teal);
      font-weight: 700;
      box-shadow: 0 1px 4px rgba(20, 184, 166, 0.35);
    }
    .speed-bars-row {
      display: flex;
      align-items: center;
      gap: 3px;
      height: 18px;
      margin-top: 1px;
    }
    .speed-tick {
      flex: 1;
      height: 7px;
      background: var(--panel);
      border: 1px solid var(--border);
      border-radius: 2px;
      cursor: pointer;
      transition: all 0.15s ease;
    }
    .speed-tick:hover {
      border-color: var(--teal);
    }
    .speed-tick.active {
      background: var(--teal);
      border-color: var(--teal);
      box-shadow: 0 0 4px rgba(20, 184, 166, 0.4);
    }
    .speed-label-text {
      font-size: 11px;
      font-weight: 700;
      color: var(--teal);
      min-width: 44px;
      text-align: right;
      white-space: nowrap;
    }

    /* Fixed-Height Tabbed Panel Below Controls */
    .machine-tabbed-panel {
      background: var(--panel-2);
      border: 1px solid var(--border);
      border-radius: var(--radius-md);
      padding: 6px 10px;
      display: grid;
      grid-template-rows: 28px minmax(0, 1fr);
      gap: 6px;
      height: 100%;
      min-height: 0;
      overflow: hidden;
    }
    .machine-tabs-bar {
      display: flex;
      align-items: center;
      background: var(--panel);
      border: 1px solid var(--border);
      border-radius: var(--radius-sm);
      padding: 2px;
      gap: 2px;
      overflow: hidden;
    }
    .m-tab-btn {
      flex: 1;
      height: 24px;
      padding: 0 4px;
      font-size: 12px;
      font-weight: 600;
      background: transparent;
      border: none;
      color: var(--text-dim);
      border-radius: 4px;
      cursor: pointer;
      text-align: center;
      white-space: nowrap;
      transition: all 0.15s ease;
      letter-spacing: -0.2px;
    }
    .m-tab-btn:hover {
      color: var(--text);
    }
    .m-tab-btn.active {
      background: var(--teal);
      color: #070B14;
      font-weight: 700;
      box-shadow: 0 1px 4px rgba(20, 184, 166, 0.4);
    }

    /* Tab forms & sensor cards */
    .grid-setup {
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 6px 8px;
    }
    .grid-sensors {
      grid-template-columns: repeat(5, minmax(0, 1fr));
      gap: 6px;
    }
    .sensor-card {
      background: var(--panel);
      border: 1px solid var(--border);
      border-radius: var(--radius-sm);
      padding: 5px 7px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      gap: 2px;
      min-width: 0;
      transition: border-color 0.15s ease;
    }
    .sensor-card:hover {
      border-color: rgba(20, 184, 166, 0.4);
    }
    .sensor-card-val {
      font-family: var(--font-mono);
      font-size: 14px;
      font-weight: 700;
      color: #F8FAFC;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    /* COMPANION PHONE APP FRAME */
    .phone-column {
      display: flex;
      justify-content: center;
      align-items: stretch;
      height: 100%;
      min-height: 0;
      overflow: hidden;
      position: relative;
    }
    .phone-frame {
      height: 100%;
      max-height: 100%;
      aspect-ratio: 9 / 19.5;
      min-width: min(310px, 100%);
      max-width: 420px;
      background: var(--panel);
      border: 5px solid #182335;
      border-radius: 34px;
      box-shadow: 0 16px 40px rgba(0, 0, 0, 0.8), 0 0 0 1px rgba(255, 255, 255, 0.08);
      display: grid;
      grid-template-rows: 44px minmax(0, 1fr) 54px;
      overflow: hidden;
      position: relative;
    }
    .phone-body {
      height: 100%;
      min-height: 0;
      overflow: hidden;
      position: relative;
      background: var(--bg);
      padding: 6px 9px;
    }

    /* Phone Fixed Tab Bar */
    .phone-tab-bar {
      height: 54px;
      background: var(--panel-2);
      border-top: 1px solid var(--border);
      display: flex;
      align-items: stretch;
      flex-shrink: 0;
      z-index: 10;
    }
    .tab-bar-item {
      flex: 1 1 0;
      min-width: 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      background: transparent;
      border: none;
      color: var(--text-dim);
      cursor: pointer;
      gap: 2px;
      padding: 2px 2px;
      overflow: hidden;
      transition: color 0.15s ease;
    }
    .tab-bar-item svg {
      width: 17px;
      height: 17px;
      stroke: currentColor;
      fill: none;
      stroke-width: 2;
      flex-shrink: 0;
    }
    .tab-bar-item span {
      font-size: 11px;
      font-weight: 600;
      line-height: 1;
      white-space: nowrap;
      text-align: center;
      letter-spacing: -0.2px;
      overflow: hidden;
      text-overflow: clip;
    }
    .tab-bar-item:hover {
      color: var(--text);
    }
    .tab-bar-item.active {
      color: var(--teal);
    }
    .tab-bar-item.active svg {
      stroke: var(--teal);
      filter: drop-shadow(0 0 4px rgba(20, 184, 166, 0.4));
    }
`;

// Insert or replace in <style>
const styleEndIdx = html.indexOf('</style>');
if (styleEndIdx !== -1) {
  html = html.slice(0, styleEndIdx) + '\n' + refinedStyles + '\n' + html.slice(styleEndIdx);
  console.log('✓ Successfully appended refined styles before </style>');
}

fs.writeFileSync('index.html', html, 'utf-8');
console.log('Saved updated index.html! New length:', html.length);
