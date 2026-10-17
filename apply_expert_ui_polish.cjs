// apply_expert_ui_polish.cjs
const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf-8');

console.log('Original index.html length:', html.length);

// 1. Add sleek phone speaker bar inside the top of phone frame for authentic industrial product feel
const oldPhoneHeader = `<div class="phone-frame" id="companionPhoneFrame" aria-label="Companion Phone App (Monitoring Only)">
        <!-- 3.0 PHONE HEADER (44px) -->
        <header class="phone-header">`;

const newPhoneHeader = `<div class="phone-frame" id="companionPhoneFrame" aria-label="Companion Phone App (Monitoring Only)">
        <!-- Authentic Hardware Speaker Earpiece -->
        <div class="phone-speaker-earpiece" aria-hidden="true"></div>
        <!-- 3.0 PHONE HEADER (44px) -->
        <header class="phone-header">`;

if (html.includes(oldPhoneHeader)) {
  html = html.replace(oldPhoneHeader, newPhoneHeader);
  console.log('✓ Added phone speaker earpiece');
}

// 2. Comprehensive Senior UI Expert Styling Overhaul
// We replace the refined styles section with standardized card border-radii, subtle padding increases,
// enhanced spatial rhythm, and premium surface elevation.

const expertDesignTokens = `
    /* -------------------------------------------------------------
       SENIOR UI EXPERT DESIGN SYSTEM: STANDARDIZED SPATIAL MATH & RADII
       ------------------------------------------------------------- */
    :root {
      --app-w: 100vw;
      --app-h: 100dvh;
      --ui-scale: 1.0;
      --font-scale: 13px;

      /* Chromatic Palette */
      --bg: #070B14;
      --panel: #0D1424;
      --panel-2: #131E33;
      --panel-3: #1A2845;
      --panel-elevated: #16233B;
      --border: #1E2D4A;
      --border-subtle: #17243C;
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

      /* Standardized Nested Radius Math */
      --radius-chassis: 16px;
      --radius-phone: 36px;
      --radius-card: 12px;       /* Primary cards: stage, controls, touchscreen, tabbed panel, live card, chart, presets */
      --radius-inner: 8px;       /* Inner tiles: sensors, chips, rows, session cards, form items */
      --radius-control: 6px;     /* Buttons, segmented tabs, small pills */
      --radius-xs: 4px;
      --radius-sm: 6px;
      --radius-md: 10px;
      --radius-lg: 12px;
      --radius-xl: 16px;

      --font-sans: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
      --font-mono: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;

      /* Lighting & Elevation */
      --surface-specular: inset 0 1px 0 rgba(255, 255, 255, 0.06);
      --surface-inner-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.4);
      --card-shadow: 0 4px 16px rgba(0, 0, 0, 0.45);
    }

    /* 1.2 MAIN WORKSPACE SPATIAL PADDING INCREASE */
    .main-workspace {
      display: grid;
      grid-template-columns: minmax(0, 56fr) minmax(0, 44fr);
      gap: 16px;
      padding: 10px 16px;
      height: 100%;
      min-height: 0;
      overflow: hidden;
      align-items: stretch;
    }

    /* 2.0 MACHINE PANEL: HARDWARE CHASSIS */
    .machine-panel {
      background: var(--panel);
      border: 1px solid var(--border);
      border-radius: var(--radius-chassis);
      padding: 12px 14px;
      display: grid;
      grid-template-rows: minmax(0, 44fr) minmax(0, 56fr);
      gap: 12px;
      height: 100%;
      min-height: 0;
      overflow: hidden;
      position: relative;
      box-shadow: var(--card-shadow);
    }

    /* Top Grid: Jar (left ~42%) and Display/Controls (right ~58%) */
    .machine-top-grid {
      display: grid;
      grid-template-columns: minmax(0, 42fr) minmax(0, 58fr);
      gap: 12px;
      height: 100%;
      min-height: 0;
      overflow: hidden;
      align-items: stretch;
    }

    /* LEFT: Jar Visual Stage Card */
    .jar-stage-card {
      background: var(--panel-2);
      border: 1px solid var(--border);
      border-radius: var(--radius-card);
      padding: 10px 12px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      height: 100%;
      min-height: 0;
      overflow: hidden;
      position: relative;
      box-shadow: var(--surface-specular);
    }
    .stage-header-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-shrink: 0;
      gap: 8px;
      height: 28px;
    }
    .stage-tabs {
      display: flex;
      background: var(--panel);
      border: 1px solid var(--border);
      border-radius: var(--radius-control);
      padding: 2px;
      gap: 3px;
    }
    .stage-tab-btn {
      height: 24px;
      padding: 0 10px;
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
      padding: 2px 8px;
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
      gap: 4px;
      background: rgba(9, 14, 25, 0.9);
      backdrop-filter: blur(10px);
      border: 1px solid rgba(255, 255, 255, 0.14);
      border-radius: 20px;
      padding: 3px 6px;
      z-index: 10;
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.6);
      transition: opacity 0.2s ease;
    }
    .jar-view-floating-bar .btn-view-mode {
      height: 22px;
      padding: 0 9px;
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

    /* RIGHT: Display & Hardware Controls Card */
    .controls-display-card {
      background: var(--panel-2);
      border: 1px solid var(--border);
      border-radius: var(--radius-card);
      padding: 10px 12px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      height: 100%;
      min-height: 0;
      overflow: hidden;
      gap: 8px;
      box-shadow: var(--surface-specular);
    }

    /* OLED TOUCHSCREEN DISPLAY (Standardized Card Radius 12px) */
    .machine-touchscreen {
      background: #040710;
      border: 1.5px solid #1C283F;
      border-radius: var(--radius-card);
      padding: 8px 12px;
      display: flex;
      flex-direction: column;
      gap: 4px;
      box-shadow: inset 0 0 16px rgba(0, 0, 0, 0.95), 0 2px 6px rgba(0, 0, 0, 0.5);
      flex-shrink: 0;
      position: relative;
      overflow: hidden;
    }
    /* Subtle OLED Glass Sheen */
    .machine-touchscreen::after {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 40%;
      background: linear-gradient(180deg, rgba(255, 255, 255, 0.04) 0%, rgba(255, 255, 255, 0) 100%);
      pointer-events: none;
    }
    .screen-top-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
      z-index: 2;
    }
    .screen-dish-title {
      font-size: 13px;
      font-weight: 700;
      color: #F8FAFC;
      letter-spacing: -0.01em;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      flex: 1;
    }
    .screen-status-badge {
      font-size: 11px;
      font-weight: 700;
      padding: 2px 8px;
      border-radius: 12px;
      background: rgba(20, 184, 166, 0.15);
      color: var(--teal);
      border: 1px solid var(--teal);
      text-transform: uppercase;
      letter-spacing: 0.6px;
      white-space: nowrap;
      box-shadow: 0 0 8px rgba(20, 184, 166, 0.25);
    }
    .screen-status-badge.grinding {
      background: rgba(16, 185, 129, 0.2);
      color: var(--green);
      border-color: var(--green);
      box-shadow: 0 0 10px rgba(16, 185, 129, 0.35);
    }
    .screen-status-badge.paused {
      background: rgba(245, 158, 11, 0.2);
      color: var(--amber);
      border-color: var(--amber);
      box-shadow: 0 0 10px rgba(245, 158, 11, 0.35);
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
      box-shadow: 0 0 10px rgba(239, 68, 68, 0.35);
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
      z-index: 2;
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
      background: rgba(255, 255, 255, 0.05);
      padding: 1px 7px;
      border-radius: var(--radius-xs);
      border: 1px solid rgba(255, 255, 255, 0.09);
    }

    .screen-progress-bar-wrap {
      display: flex;
      flex-direction: column;
      gap: 3px;
      margin-top: 2px;
      z-index: 2;
    }
    .screen-progress-track {
      height: 5px;
      background: rgba(255, 255, 255, 0.08);
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

    /* HARDWARE QUICK CONTROLS: SUBTLE PADDING INCREASE & SPATIAL BALANCE */
    .machine-quick-controls {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      flex-shrink: 0;
      padding: 3px 0;
    }
    .knob-stop-group {
      display: flex;
      align-items: center;
      gap: 10px;
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
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.65), inset 0 1px 2px rgba(255, 255, 255, 0.2);
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
      box-shadow: 0 4px 12px rgba(239, 68, 68, 0.45), inset 0 1px 2px rgba(255, 255, 255, 0.3);
      transition: all 0.1s ease;
      touch-action: manipulation;
      flex-shrink: 0;
    }
    .btn-stop-machine:active {
      transform: scale(0.94);
      box-shadow: 0 2px 6px rgba(239, 68, 68, 0.6);
    }

    /* Texture Selection (2x2 grid with Standardized Radius) */
    .quick-params-group {
      display: flex;
      flex-direction: column;
      gap: 5px;
      flex: 1;
      min-width: 0;
    }
    .texture-pill-row {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 4px;
    }
    .btn-texture-pill {
      height: 23px;
      padding: 0 6px;
      font-size: 11px;
      font-weight: 600;
      background: var(--panel);
      border: 1px solid var(--border);
      color: var(--text-dim);
      border-radius: var(--radius-inner);
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
      gap: 4px;
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
      box-shadow: 0 0 5px rgba(20, 184, 166, 0.45);
    }
    .speed-label-text {
      font-size: 11px;
      font-weight: 700;
      color: var(--teal);
      min-width: 44px;
      text-align: right;
      white-space: nowrap;
    }

    /* Fixed-Height Tabbed Panel Below Controls (Standardized Card Radius 12px) */
    .machine-tabbed-panel {
      background: var(--panel-2);
      border: 1px solid var(--border);
      border-radius: var(--radius-card);
      padding: 8px 12px;
      display: grid;
      grid-template-rows: 28px minmax(0, 1fr);
      gap: 8px;
      height: 100%;
      min-height: 0;
      overflow: hidden;
      box-shadow: var(--surface-specular);
    }
    .machine-tabs-bar {
      display: flex;
      align-items: center;
      background: var(--panel);
      border: 1px solid var(--border);
      border-radius: var(--radius-control);
      padding: 2px;
      gap: 3px;
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

    /* Tab forms & sensor cards: Standardized Inner Radius 8px & Subtle Gaps */
    .grid-setup {
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 8px 10px;
    }
    .form-item select, .form-item input {
      height: 28px;
      padding: 0 8px;
      font-size: 12px;
      background: var(--panel);
      border: 1px solid var(--border);
      color: var(--text);
      border-radius: var(--radius-control);
      min-width: 0;
      transition: border-color 0.15s ease;
    }
    .form-item select:focus, .form-item input:focus {
      outline: none;
      border-color: var(--teal);
    }
    .grid-sensors {
      grid-template-columns: repeat(5, minmax(0, 1fr));
      gap: 7px;
    }
    .sensor-card {
      background: var(--panel);
      border: 1px solid var(--border);
      border-radius: var(--radius-inner);
      padding: 6px 8px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      gap: 2px;
      min-width: 0;
      transition: border-color 0.15s ease;
      box-shadow: var(--surface-inner-shadow);
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
    .grid-faults {
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 8px;
    }
    .fault-toggle-row {
      background: var(--panel);
      border: 1px solid var(--border);
      border-radius: var(--radius-inner);
      padding: 5px 9px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 6px;
    }
    .btn-power-cut {
      grid-column: span 2;
      height: 28px;
      background: #7F1D1D;
      border: 1px solid #DC2626;
      color: #FEE2E2;
      border-radius: var(--radius-inner);
      font-size: 12px;
      font-weight: 700;
      cursor: pointer;
      transition: background 0.15s ease;
    }
    .btn-power-cut:hover {
      background: #991B1B;
    }
    .grid-env, .grid-adv {
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 8px;
    }
    .env-card {
      background: var(--panel);
      border: 1px solid var(--border);
      border-radius: var(--radius-inner);
      padding: 6px 9px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 6px;
    }
    .btn-adv-feature {
      height: 30px;
      background: var(--panel);
      border: 1px solid var(--border);
      color: var(--text);
      border-radius: var(--radius-inner);
      font-size: 12px;
      font-weight: 600;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 5px;
      white-space: nowrap;
      transition: all 0.15s ease;
    }
    .btn-adv-feature:hover {
      border-color: var(--teal);
      color: var(--teal);
    }

    /* 3.0 COMPANION PHONE APP: STANDARDIZED RADII & SUBTLE PADDING INCREASE */
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
      min-width: min(312px, 100%);
      max-width: 420px;
      background: var(--panel);
      border: 6px solid #182335;
      border-radius: var(--radius-phone);
      box-shadow: 0 20px 48px rgba(0, 0, 0, 0.85), 0 0 0 1px rgba(255, 255, 255, 0.08);
      display: grid;
      grid-template-rows: 44px minmax(0, 1fr) 54px;
      overflow: hidden;
      position: relative;
    }
    .phone-speaker-earpiece {
      position: absolute;
      top: 6px;
      left: 50%;
      transform: translateX(-50%);
      width: 48px;
      height: 3px;
      background: #090E17;
      border-radius: 2px;
      z-index: 40;
      border: 1px solid rgba(255, 255, 255, 0.06);
    }
    .phone-body {
      height: 100%;
      min-height: 0;
      overflow: hidden;
      position: relative;
      background: var(--bg);
      padding: 8px 10px;
      display: flex;
      flex-direction: column;
    }

    /* Phone Cards Standardized to 12px with Subtle Padding Increase */
    .live-card-top {
      background: var(--panel-2);
      border: 1px solid var(--border);
      border-radius: var(--radius-card);
      padding: 8px 11px;
      display: flex;
      align-items: baseline;
      justify-content: space-between;
      flex-shrink: 0;
      gap: 8px;
      box-shadow: var(--surface-specular);
    }
    .live-chart-box {
      flex: 1;
      min-height: 75px;
      background: var(--panel-2);
      border: 1px solid var(--border);
      border-radius: var(--radius-card);
      padding: 6px 9px;
      display: flex;
      flex-direction: column;
      overflow: hidden;
      gap: 3px;
      box-shadow: var(--surface-specular);
    }
    .live-progress-box {
      background: var(--panel-2);
      border: 1px solid var(--border);
      border-radius: var(--radius-inner);
      padding: 5px 8px;
      display: flex;
      flex-direction: column;
      gap: 2px;
      flex-shrink: 0;
    }
    .live-three-chips-row {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 5px;
      flex-shrink: 0;
    }
    .live-chip-item {
      background: var(--panel-2);
      border: 1px solid var(--border);
      border-radius: var(--radius-inner);
      padding: 5px 6px;
      text-align: center;
      display: flex;
      flex-direction: column;
      gap: 1px;
      min-width: 0;
      box-shadow: var(--surface-inner-shadow);
    }
    .history-insights-card {
      background: var(--panel-2);
      border: 1px solid var(--border);
      border-radius: var(--radius-card);
      padding: 8px 11px;
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 6px 10px;
      flex-shrink: 0;
      box-shadow: var(--surface-specular);
    }
    .session-card-item {
      background: var(--panel-2);
      border: 1px solid var(--border);
      border-radius: var(--radius-inner);
      padding: 7px 10px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: space-between;
      transition: all 0.15s ease;
      flex-shrink: 0;
      box-shadow: var(--surface-inner-shadow);
    }
    .session-card-item:hover {
      border-color: var(--teal);
      background: var(--panel-elevated);
    }
    .health-row-item {
      height: 39px;
      background: var(--panel-2);
      border: 1px solid var(--border);
      border-radius: var(--radius-inner);
      padding: 0 10px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 6px;
      flex-shrink: 0;
      box-shadow: var(--surface-inner-shadow);
    }
    .preset-detail-card {
      background: var(--panel-2);
      border: 1px solid var(--border);
      border-radius: var(--radius-card);
      padding: 10px 12px;
      display: flex;
      flex-direction: column;
      gap: 6px;
      flex: 1;
      min-height: 0;
      justify-content: space-around;
      box-shadow: var(--surface-specular);
    }
    .settings-row {
      background: var(--panel-2);
      border: 1px solid var(--border);
      border-radius: var(--radius-inner);
      padding: 6px 9px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 6px;
      flex-shrink: 0;
      box-shadow: var(--surface-inner-shadow);
    }

    /* Fixed Tab Bar */
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
      filter: drop-shadow(0 0 5px rgba(20, 184, 166, 0.45));
    }
`;

// Replace the previous REFINED EXECUTIVE block with this new SENIOR UI EXPERT block
const startMarker = '/* -------------------------------------------------------------\n       REFINED EXECUTIVE INDUSTRIAL DESIGN & ANTI-CONGESTION SYSTEM';
const endMarker = '</style>';

if (html.includes(startMarker)) {
  const startIdx = html.indexOf(startMarker);
  const endIdx = html.indexOf(endMarker, startIdx);
  html = html.slice(0, startIdx) + expertDesignTokens + '\n' + html.slice(endIdx);
  console.log('✓ Successfully replaced styles with Senior UI Expert Standardized System');
} else {
  // If not found, inject before </style>
  const styleEndIdx = html.indexOf('</style>');
  html = html.slice(0, styleEndIdx) + '\n' + expertDesignTokens + '\n' + html.slice(styleEndIdx);
  console.log('✓ Injected Senior UI Expert Standardized System before </style>');
}

fs.writeFileSync('index.html', html, 'utf-8');
console.log('Saved updated index.html! New length:', html.length);
