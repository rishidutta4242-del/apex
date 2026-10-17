// apply_card_padding_vars.cjs
const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf-8');
console.log('Original length:', html.length);

// 1. Add CSS variables to the initial :root definition (around line 16)
const oldInitialRoot = `    :root {
      --app-w: 100vw;
      --app-h: 100dvh;
      --ui-scale: 1.0;
      --font-scale: 13px;
      --bg: #0A0E17;
      --panel: #111726;
      --panel-2: #162034;
      --panel-3: #1D2A44;
      --border: #243452;
      --border-focus: #12B5AE;
      --text: #F1F5F9;
      --text-dim: #94A3B8;
      --teal: #12B5AE;
      --teal-hover: #15D1C8;
      --green: #2FBF71;
      --amber: #FFB84D;
      --red: #E5484D;
      --radius-sm: 6px;
      --radius-md: 10px;
      --radius-lg: 14px;
      --font-sans: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      --font-mono: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
      --capture-scale: 1.0;
    }`;

const newInitialRoot = `    :root {
      --app-w: 100vw;
      --app-h: 100dvh;
      --ui-scale: 1.0;
      --font-scale: 13px;
      --bg: #0A0E17;
      --panel: #111726;
      --panel-2: #162034;
      --panel-3: #1D2A44;
      --border: #243452;
      --border-focus: #12B5AE;
      --text: #F1F5F9;
      --text-dim: #94A3B8;
      --teal: #12B5AE;
      --teal-hover: #15D1C8;
      --green: #2FBF71;
      --amber: #FFB84D;
      --red: #E5484D;

      /* Standardized Card Internal Padding Variables */
      --card-pad-xs: 6px 10px;       /* Compact chips, badges, mini sensor cards, status tags */
      --card-pad-sm: 8px 12px;       /* Secondary cards, display screen rows, compact sub-cards */
      --card-pad-md: 12px 14px;      /* Standard card bodies, hardware controls, phone widget cards */
      --card-pad-lg: 14px 18px;      /* Prominent primary cards, jar stage visual container, modal sheets */
      --card-pad: var(--card-pad-md); /* Standard default card padding */

      /* Standardized Border Radius Scale */
      --radius-chassis: 16px;
      --radius-phone: 36px;
      --radius-card: 12px;           /* Unified standard card border radius across entire application */
      --radius-inner: 8px;           /* Standard sub-card / tile / row border radius */
      --radius-control: 6px;         /* Standard input / button / segmented tab border radius */
      --radius-pill: 9999px;
      --radius-xs: 4px;
      --radius-sm: 6px;
      --radius-md: 10px;
      --radius-lg: 12px;
      --radius-xl: 16px;

      --font-sans: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      --font-mono: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
      --capture-scale: 1.0;
    }`;

if (html.includes(oldInitialRoot)) {
  html = html.replace(oldInitialRoot, newInitialRoot);
  console.log('✓ Updated initial :root with standardized card padding and radius tokens');
} else {
  console.log('⚠ Initial :root exact match not found, looking for partial match');
}

// 2. Update the expert styling :root definition
const oldExpertRoot = `    :root {
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
    }`;

const newExpertRoot = `    :root {
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

      /* Consistent Card Internal Padding System */
      --card-pad-xs: 6px 10px;       /* Compact chips, badges, mini sensor cards, status tags */
      --card-pad-sm: 8px 12px;       /* Secondary cards, display screen rows, compact sub-cards */
      --card-pad-md: 12px 14px;      /* Standard card bodies, hardware controls, phone widget cards */
      --card-pad-lg: 14px 18px;      /* Prominent primary cards, jar stage visual container, modal sheets */
      --card-pad: var(--card-pad-md); /* Standard default card padding */

      /* Standardized Nested Radius Math */
      --radius-chassis: 16px;
      --radius-phone: 36px;
      --radius-card: 12px;       /* Primary cards: stage, controls, touchscreen, tabbed panel, live card, chart, presets */
      --radius-inner: 8px;       /* Inner tiles: sensors, chips, rows, session cards, form items */
      --radius-control: 6px;     /* Buttons, segmented tabs, small pills */
      --radius-pill: 9999px;
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
    }`;

if (html.includes(oldExpertRoot)) {
  html = html.replace(oldExpertRoot, newExpertRoot);
  console.log('✓ Updated expert :root with standardized card padding tokens');
} else {
  console.log('⚠ Expert :root exact match not found');
}

// 3. Update base CSS rules to use the variables
// .machine-panel base
html = html.replace(
  /\.machine-panel\s*\{\s*background:\s*var\(--panel\);\s*border:\s*1px solid var\(--border\);\s*border-radius:\s*[^;]+;\s*padding:\s*[^;]+;/g,
  `.machine-panel {
      background: var(--panel);
      border: 1px solid var(--border);
      border-radius: var(--radius-chassis);
      padding: var(--card-pad-md);`
);

// .jar-stage-card base
html = html.replace(
  /\.jar-stage-card\s*\{\s*background:\s*var\(--panel-2\);\s*border:\s*1px solid var\(--border\);\s*border-radius:\s*[^;]+;\s*padding:\s*[^;]+;/g,
  `.jar-stage-card {
      background: var(--panel-2);
      border: 1px solid var(--border);
      border-radius: var(--radius-card);
      padding: var(--card-pad-md);`
);

// .controls-display-card base
html = html.replace(
  /\.controls-display-card\s*\{\s*background:\s*var\(--panel-2\);\s*border:\s*1px solid var\(--border\);\s*border-radius:\s*[^;]+;\s*padding:\s*[^;]+;/g,
  `.controls-display-card {
      background: var(--panel-2);
      border: 1px solid var(--border);
      border-radius: var(--radius-card);
      padding: var(--card-pad-md);`
);

// .machine-touchscreen base
html = html.replace(
  /\.machine-touchscreen\s*\{\s*background:\s*#06090F;\s*border:\s*1\.5px solid #24354F;\s*border-radius:\s*[^;]+;\s*padding:\s*[^;]+;/g,
  `.machine-touchscreen {
      background: #040710;
      border: 1.5px solid #1C283F;
      border-radius: var(--radius-card);
      padding: var(--card-pad-sm);`
);

// .machine-tabbed-panel base
html = html.replace(
  /\.machine-tabbed-panel\s*\{\s*background:\s*var\(--panel-2\);\s*border:\s*1px solid var\(--border\);\s*border-radius:\s*[^;]+;\s*padding:\s*[^;]+;/g,
  `.machine-tabbed-panel {
      background: var(--panel-2);
      border: 1px solid var(--border);
      border-radius: var(--radius-card);
      padding: var(--card-pad-sm);`
);

// .live-card-top base
html = html.replace(
  /\.live-card-top\s*\{\s*background:\s*var\(--panel-2\);\s*border:\s*1px solid var\(--border\);\s*border-radius:\s*[^;]+;\s*padding:\s*[^;]+;/g,
  `.live-card-top {
      background: var(--panel-2);
      border: 1px solid var(--border);
      border-radius: var(--radius-card);
      padding: var(--card-pad-sm);`
);

// .history-insights-card base
html = html.replace(
  /\.history-insights-card\s*\{\s*background:\s*var\(--panel-2\);\s*border:\s*1px solid var\(--border\);\s*border-radius:\s*[^;]+;\s*padding:\s*[^;]+;/g,
  `.history-insights-card {
      background: var(--panel-2);
      border: 1px solid var(--border);
      border-radius: var(--radius-card);
      padding: var(--card-pad-sm);`
);

// .preset-detail-card base
html = html.replace(
  /\.preset-detail-card\s*\{\s*background:\s*var\(--panel-2\);\s*border:\s*1px solid var\(--border\);\s*border-radius:\s*[^;]+;\s*padding:\s*[^;]+;/g,
  `.preset-detail-card {
      background: var(--panel-2);
      border: 1px solid var(--border);
      border-radius: var(--radius-card);
      padding: var(--card-pad-md);`
);

// .empty-state-card
html = html.replace(
  /\.empty-state-card\s*\{([^}]+)\}/g,
  `.empty-state-card {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 6px;
      background: var(--panel-2);
      border: 1px dashed var(--border);
      border-radius: var(--radius-card);
      padding: var(--card-pad-lg);
      text-align: center;
      color: var(--text-dim);
    }`
);

// .health-last-alert-card
html = html.replace(
  /\.health-last-alert-card\s*\{([^}]+)\}/g,
  `.health-last-alert-card {
      background: rgba(229, 72, 77, 0.1);
      border: 1px solid rgba(229, 72, 77, 0.3);
      border-radius: var(--radius-card);
      padding: var(--card-pad-sm);
      display: flex;
      align-items: center;
      justify-content: space-between;
      cursor: pointer;
      flex-shrink: 0;
      height: 36px;
    }`
);

// .gallery-tile-card
html = html.replace(
  /\.gallery-tile-card\s*\{([^}]+)\}/g,
  `.gallery-tile-card {
      background: var(--panel);
      border: 1px solid var(--border);
      border-radius: var(--radius-card);
      padding: var(--card-pad-xs);
      overflow: hidden;
      display: flex;
      flex-direction: column;
      position: relative;
    }`
);

// .in-phone-sheet and modal sheet
html = html.replace(
  /\.in-phone-sheet\s*\{\s*background:\s*var\(--panel\);\s*border-radius:\s*[^;]+;\s*border:\s*1px solid var\(--border\);\s*padding:\s*[^;]+;/g,
  `.in-phone-sheet {
      background: var(--panel);
      border-radius: var(--radius-card) var(--radius-card) 0 0;
      border: 1px solid var(--border);
      padding: var(--card-pad-sm);`
);

html = html.replace(
  /\.sheet-content-scroll\s*\{\s*padding:\s*[^;]+;/g,
  `.sheet-content-scroll {
      padding: var(--card-pad-md);`
);

// Update appModalSheet inline style
html = html.replace(
  'id="appModalSheet" style="max-width:540px;margin:0 auto;border-radius:14px;"',
  'id="appModalSheet" style="max-width:540px;margin:0 auto;border-radius:var(--radius-card);padding:var(--card-pad-md);"'
);

// 4. Update the Expert Design System section rules to use the padding variables
// .jar-stage-card in expert section
html = html.replace(
  /\/\* LEFT: Jar Visual Stage Card \*\/\s*\.jar-stage-card\s*\{[^}]+\}/,
  `/* LEFT: Jar Visual Stage Card (Standardized Card Radius & Padding) */
    .jar-stage-card {
      background: var(--panel-2);
      border: 1px solid var(--border);
      border-radius: var(--radius-card);
      padding: var(--card-pad-md);
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      height: 100%;
      min-height: 0;
      overflow: hidden;
      position: relative;
      box-shadow: var(--surface-specular);
    }`
);

// .controls-display-card in expert section
html = html.replace(
  /\/\* RIGHT: Display & Hardware Controls Card \*\/\s*\.controls-display-card\s*\{[^}]+\}/,
  `/* RIGHT: Display & Hardware Controls Card (Standardized Card Radius & Padding) */
    .controls-display-card {
      background: var(--panel-2);
      border: 1px solid var(--border);
      border-radius: var(--radius-card);
      padding: var(--card-pad-md);
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      height: 100%;
      min-height: 0;
      overflow: hidden;
      gap: 8px;
      box-shadow: var(--surface-specular);
    }`
);

// .machine-touchscreen in expert section
html = html.replace(
  /\/\* OLED TOUCHSCREEN DISPLAY \(Standardized Card Radius 12px\) \*\/\s*\.machine-touchscreen\s*\{[^}]+\}/,
  `/* OLED TOUCHSCREEN DISPLAY (Standardized Card Radius & Padding) */
    .machine-touchscreen {
      background: #040710;
      border: 1.5px solid #1C283F;
      border-radius: var(--radius-card);
      padding: var(--card-pad-sm);
      display: flex;
      flex-direction: column;
      gap: 4px;
      box-shadow: inset 0 0 16px rgba(0, 0, 0, 0.95), 0 2px 6px rgba(0, 0, 0, 0.5);
      flex-shrink: 0;
      position: relative;
      overflow: hidden;
    }`
);

// .machine-tabbed-panel in expert section
html = html.replace(
  /\/\* Fixed-Height Tabbed Panel Below Controls \(Standardized Card Radius 12px\) \*\/\s*\.machine-tabbed-panel\s*\{[^}]+\}/,
  `/* Fixed-Height Tabbed Panel Below Controls (Standardized Card Radius & Padding) */
    .machine-tabbed-panel {
      background: var(--panel-2);
      border: 1px solid var(--border);
      border-radius: var(--radius-card);
      padding: var(--card-pad-sm);
      display: grid;
      grid-template-rows: 28px minmax(0, 1fr);
      gap: 8px;
      height: 100%;
      min-height: 0;
      overflow: hidden;
      box-shadow: var(--surface-specular);
    }`
);

// .sensor-card in expert section
html = html.replace(
  /\.sensor-card\s*\{\s*background:\s*var\(--panel\);\s*border:\s*1px solid var\(--border\);\s*border-radius:\s*var\(--radius-inner\);\s*padding:\s*[^;]+;/g,
  `.sensor-card {
      background: var(--panel);
      border: 1px solid var(--border);
      border-radius: var(--radius-inner);
      padding: var(--card-pad-xs);`
);

// .fault-toggle-row
html = html.replace(
  /\.fault-toggle-row\s*\{\s*background:\s*var\(--panel\);\s*border:\s*1px solid var\(--border\);\s*border-radius:\s*var\(--radius-inner\);\s*padding:\s*[^;]+;/g,
  `.fault-toggle-row {
      background: var(--panel);
      border: 1px solid var(--border);
      border-radius: var(--radius-inner);
      padding: var(--card-pad-xs);`
);

// .env-card
html = html.replace(
  /\.env-card\s*\{\s*background:\s*var\(--panel\);\s*border:\s*1px solid var\(--border\);\s*border-radius:\s*var\(--radius-inner\);\s*padding:\s*[^;]+;/g,
  `.env-card {
      background: var(--panel);
      border: 1px solid var(--border);
      border-radius: var(--radius-inner);
      padding: var(--card-pad-xs);`
);

// .live-card-top in expert section
html = html.replace(
  /\.live-card-top\s*\{\s*background:\s*var\(--panel-2\);\s*border:\s*1px solid var\(--border\);\s*border-radius:\s*var\(--radius-card\);\s*padding:\s*[^;]+;/g,
  `.live-card-top {
      background: var(--panel-2);
      border: 1px solid var(--border);
      border-radius: var(--radius-card);
      padding: var(--card-pad-sm);`
);

// .live-chart-box in expert section
html = html.replace(
  /\.live-chart-box\s*\{\s*flex:\s*1;\s*min-height:\s*[^;]+;\s*background:\s*var\(--panel-2\);\s*border:\s*1px solid var\(--border\);\s*border-radius:\s*var\(--radius-card\);\s*padding:\s*[^;]+;/g,
  `.live-chart-box {
      flex: 1;
      min-height: 75px;
      background: var(--panel-2);
      border: 1px solid var(--border);
      border-radius: var(--radius-card);
      padding: var(--card-pad-xs);`
);

// .live-progress-box in expert section
html = html.replace(
  /\.live-progress-box\s*\{\s*background:\s*var\(--panel-2\);\s*border:\s*1px solid var\(--border\);\s*border-radius:\s*var\(--radius-inner\);\s*padding:\s*[^;]+;/g,
  `.live-progress-box {
      background: var(--panel-2);
      border: 1px solid var(--border);
      border-radius: var(--radius-inner);
      padding: var(--card-pad-xs);`
);

// .live-chip-item in expert section
html = html.replace(
  /\.live-chip-item\s*\{\s*background:\s*var\(--panel-2\);\s*border:\s*1px solid var\(--border\);\s*border-radius:\s*var\(--radius-inner\);\s*padding:\s*[^;]+;/g,
  `.live-chip-item {
      background: var(--panel-2);
      border: 1px solid var(--border);
      border-radius: var(--radius-inner);
      padding: var(--card-pad-xs);`
);

// .history-insights-card in expert section
html = html.replace(
  /\.history-insights-card\s*\{\s*background:\s*var\(--panel-2\);\s*border:\s*1px solid var\(--border\);\s*border-radius:\s*var\(--radius-card\);\s*padding:\s*[^;]+;/g,
  `.history-insights-card {
      background: var(--panel-2);
      border: 1px solid var(--border);
      border-radius: var(--radius-card);
      padding: var(--card-pad-sm);`
);

// .session-card-item in expert section
html = html.replace(
  /\.session-card-item\s*\{\s*background:\s*var\(--panel-2\);\s*border:\s*1px solid var\(--border\);\s*border-radius:\s*var\(--radius-inner\);\s*padding:\s*[^;]+;/g,
  `.session-card-item {
      background: var(--panel-2);
      border: 1px solid var(--border);
      border-radius: var(--radius-inner);
      padding: var(--card-pad-sm);`
);

// .health-row-item in expert section
html = html.replace(
  /\.health-row-item\s*\{\s*height:\s*39px;\s*background:\s*var\(--panel-2\);\s*border:\s*1px solid var\(--border\);\s*border-radius:\s*var\(--radius-inner\);\s*padding:\s*[^;]+;/g,
  `.health-row-item {
      height: 39px;
      background: var(--panel-2);
      border: 1px solid var(--border);
      border-radius: var(--radius-inner);
      padding: var(--card-pad-xs);`
);

// .preset-detail-card in expert section
html = html.replace(
  /\.preset-detail-card\s*\{\s*background:\s*var\(--panel-2\);\s*border:\s*1px solid var\(--border\);\s*border-radius:\s*var\(--radius-card\);\s*padding:\s*[^;]+;/g,
  `.preset-detail-card {
      background: var(--panel-2);
      border: 1px solid var(--border);
      border-radius: var(--radius-card);
      padding: var(--card-pad-md);`
);

// .settings-row in expert section
html = html.replace(
  /\.settings-row\s*\{\s*background:\s*var\(--panel-2\);\s*border:\s*1px solid var\(--border\);\s*border-radius:\s*var\(--radius-inner\);\s*padding:\s*[^;]+;/g,
  `.settings-row {
      background: var(--panel-2);
      border: 1px solid var(--border);
      border-radius: var(--radius-inner);
      padding: var(--card-pad-xs);`
);

fs.writeFileSync('index.html', html, 'utf-8');
console.log('✓ Successfully wrote updated index.html, new length:', html.length);
