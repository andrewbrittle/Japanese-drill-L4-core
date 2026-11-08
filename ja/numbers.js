// Japanese - numbers, times and counters (2026-11-08, step 5 of the move onto
// the core). The rules for saying them are the language's (lang/ja.js,
// LANG.numbers); here they get their own names, as Japanese's code has always
// called them. Loaded before ja/kana.js.
const { HIRA_TO_ROMA, numReadingToRomaji, numToJapanese, HOUR_KANA, HOUR_ROMAJI, MINUTE_ONES_KANA, MINUTE_ONES_SUFFIX_KANA, MINUTE_ONES_ROMAJI, MINUTE_ONES_SUFFIX_ROMAJI, MINUTE_TENS_KANA, MINUTE_TENS_ROMAJI, MINUTE_TENS_KANA_CONTRACTED, MINUTE_TENS_ROMAJI_CONTRACTED, minuteToKana, minuteToRomaji, timeToKana, timeToRomaji, COUNTER_ITEM_UNITS, COUNTER_TENS_JP, COUNTER_TENS_ROMAJI, COUNTER_TENS_MULT_JP, COUNTER_TENS_MULT_ROMAJI, COUNTER_COMPOUND_ONES_OVERRIDE, counterReading } = LANG.numbers;

function showNumbersScreen() {
  lastSettingsScreen = 'numbers';
  showScreen('numbers');
}

// Numbers/Times/Counters pill split - the page was getting long as one
// continuous scroll covering three unrelated things at once. Defaults to
// 'times' (see the init call at the bottom of the script) since Specific
// time always has something live on screen already, rather than landing on
// a blank state. Persists across visits within the session, same as
// currentMatchLevel on the Vocab screen, rather than resetting to Times
// every single time - once you've picked a section you probably want to
// stay there.
let currentNumbersSection = 'times';

// COUNTERS HIDDEN (2026-10-08, Andrew): added because an L2 teacher said
// "we can do some counters next week", which never happened - Minna no
// Nihongo reaches them in lesson 11. Everything is kept (reading drill,
// references, specific-counter tool, scores); this just hides the Counters
// pill. Set to true to bring them back - check them against how the class
// teaches them first (なな for 7 etc.).
const COUNTERS_ENABLED = false;

function setNumbersSection(section) {
  if (section === 'counters' && !COUNTERS_ENABLED) section = 'times';
  currentNumbersSection = section;
  const counterPill = document.getElementById('numbers-section-pill-counters');
  if (counterPill) counterPill.style.display = COUNTERS_ENABLED ? '' : 'none';
  ['numbers', 'times', 'counters', 'money'].forEach(key => {
    const el = document.getElementById('numbers-section-' + key);
    if (el) el.style.display = key === section ? 'flex' : 'none';
    const pill = document.getElementById('numbers-section-pill-' + key);
    if (pill) pill.classList.toggle('active', key === section);
  });
}

// The Numbers nav pill needs to double as a resume shortcut for ANY
// in-progress drill (kana, kanji, vocab, or numbers), not just a numbers one
// - mirrors tryResume(), but lands on the Numbers menu instead of
// goBackToSettings() when nothing's in progress, since that's this pill's
// own home screen now rather than a shared fallback.
// Checks whether the current deck (if any) is actually a numbers/time
// challenge, by looking at the question shape rather than lastSettingsScreen
// - lastSettingsScreen gets overwritten just by visiting the Numbers screen
// itself (see showNumbersScreen), so it can't reliably answer "is the
// pending drill genuinely mine" the way this needs.
function isPendingDrillNumbers() {
  return deck.length > 0 && current < deck.length && deck[0] && (deck[0].disp === 'number' || deck[0].disp === 'time' || deck[0].disp === 'counter');
}

function tryResumeOrNumbers() {
  // Only treats it as "resume" if the in-progress drill is genuinely a
  // numbers/time challenge - otherwise (a kana/kanji/vocab drill left
  // mid-way from some other tab) this pill would become a dead end, always
  // jumping back into that unrelated drill with no way to actually reach
  // the Numbers menu. Numbers is this pill's own home screen, so it always
  // wins unless the pending drill is genuinely its own.
  if (isPendingDrillNumbers()) showScreen('drill');
  else showNumbersScreen();
}

/* ---------- Number challenge ---------- */


function genNumberDistractors(n) {
  // Generate 3 plausible wrong readings by mutating one component
  const m = Math.floor(n / 10000);
  const s = Math.floor((n % 10000) / 1000);
  const h = Math.floor((n % 1000) / 100);
  const t = Math.floor((n % 100) / 10);
  const o = n % 10;

  // Try swapping each non-zero component with a close alternative
  const candidates = new Set();
  const tries = [
    [m, s, h, t, o === 0 ? 0 : (o % 9) + 1],
    [m, s, h, t === 0 ? 0 : (t % 9) + 1, o],
    [m, s, h === 0 ? 0 : (h % 9) + 1, t, o],
    [m, s === 0 ? 0 : (s % 9) + 1, h, t, o],
    [m === 0 ? 0 : (m % 9) + 1, s, h, t, o],
    [m, s, h, t === 0 ? 1 : 0, o],
    [m, s, h === 0 ? 1 : 0, t, o],
    [m, s === 0 ? 1 : 0, h, t, o],
  ];
  for (const [tm, ts, th, tt, to] of tries) {
    const candidate = tm * 10000 + ts * 1000 + th * 100 + tt * 10 + to;
    if (candidate !== n && candidate > 0 && candidate <= 50000) {
      candidates.add(candidate);
      if (candidates.size >= 3) break;
    }
  }
  // Pad if needed
  while (candidates.size < 3) {
    const r = Math.floor(Math.random() * 9999) + 1;
    if (r !== n) candidates.add(r);
  }
  return [...candidates].slice(0, 3).map(c => numToJapanese(c));
}

function pickChallengeNumber() {
  if (Math.random() < 0.05) {
    return Math.floor(Math.random() * (50000 - 10000 + 1)) + 10000;
  }
  return Math.floor(Math.random() * 9999) + 1;
}

function buildNumberChallengeDeck() {
  const nums = [];
  while (nums.length < 10) {
    const n = pickChallengeNumber();
    if (!nums.includes(n)) nums.push(n);
  }
  return nums.map(n => {
    const correct = numToJapanese(n);
    const distractors = genNumberDistractors(n);
    const opts = shuffle([correct, ...distractors]);
    return {
      char: n.toLocaleString(),
      answer: correct,
      disp: 'number',
      groupKey: 'numbers',
      options: opts.map(o => ({en: o, jp: o, rd: o})),
    };
  });
}

function startNumberChallenge() {
  lastSettingsScreen = 'numbers';
  lastDeckBuilder = buildNumberChallengeDeck;
  deck = buildNumberChallengeDeck();
  current = 0; score = 0; wrong = 0; hints = 0; answered = false; missed = []; missedItems = [];
  showScreen('drill');
  renderQuestion();
}

/* ---------- end Number challenge ---------- */

/* ---------- Time challenge ---------- */


// Frame appears less than the old uniform 1-in-5 - "none" is now the most
// common case, giving occasional bare-time relief from constructing a full
// "around 8:00 am" every time.
function pickTimeFrame() {
  const r = Math.random();
  if (r < 0.40) return 'none';
  if (r < 0.55) return 'kara';
  if (r < 0.70) return 'made';
  if (r < 0.85) return 'ni';
  return 'goro';
}

// AM/PM is sometimes omitted entirely (real Japanese often drops it when
// context is clear). Omitted more often specifically when a frame is also
// present, since that's the "from/until/at/around AND am/pm" stacked
// complexity that's the actual thing worth easing off.
function pickAmpm(frame) {
  const omitChance = frame === 'none' ? 0.2 : 0.45;
  if (Math.random() < omitChance) return null;
  return Math.random() < 0.5 ? 'gozen' : 'gogo';
}


function formatTimeDigital(hour, minute, ampm, frame) {
  const mins = String(minute).padStart(2, '0');
  const ap = ampm === 'gozen' ? ' am' : ampm === 'gogo' ? ' pm' : '';
  const base = `${hour}:${mins}${ap}`;
  if (frame === 'kara') return `From ${base}`;
  if (frame === 'made') return `Until ${base}`;
  if (frame === 'ni') return `At ${base}`;
  if (frame === 'goro') return `Around ${base}`;
  return base;
}

// Mostly lands on a clean 5-minute mark, with an occasional genuinely odd one
// for extra challenge — matches how minutes actually get introduced in lessons.
function pickMinute() {
  if (Math.random() < 0.7) {
    return [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55][Math.floor(Math.random() * 12)];
  }
  return Math.floor(Math.random() * 60);
}

function genTimeDistractors(hour, minute, ampm, frame) {
  const key = (h, m, ap, fr) => `${h}-${m}-${ap}-${fr}`;
  const seen = new Set([key(hour, minute, ampm, frame)]);
  const distractors = [];

  const tryAdd = (h, m, ap, fr) => {
    const k = key(h, m, ap, fr);
    if (!seen.has(k)) { seen.add(k); distractors.push({ hour: h, minute: m, ampm: ap, frame: fr }); return true; }
    return false;
  };

  // 1) Wrong time (hour or minute changed), same am/pm and frame — tests time reading itself
  const timeOptions = shuffle([
    [hour === 12 ? 1 : hour + 1, minute],
    [hour === 1 ? 12 : hour - 1, minute],
    [hour, (minute + 5) % 60],
    [hour, (minute + 55) % 60],
  ]);
  for (const [h, m] of timeOptions) { if (tryAdd(h, m, ampm, frame)) break; }

  // 2) Same time & frame, opposite am/pm — tests gozen/gogo (skipped if ampm is omitted, nothing to invert)
  if (ampm !== null) {
    const oppAmpm = ampm === 'gozen' ? 'gogo' : 'gozen';
    tryAdd(hour, minute, oppAmpm, frame);
  }

  // 3) Same time & am/pm, different frame — tests から/まで/に (can't just match on the time)
  const otherFrames = shuffle(['none', 'kara', 'made', 'ni', 'goro'].filter(f => f !== frame));
  for (const fr of otherFrames) { if (tryAdd(hour, minute, ampm, fr)) break; }

  // Fallback padding (shouldn't normally trigger)
  while (distractors.length < 3) {
    const h = Math.floor(Math.random() * 12) + 1;
    const m = pickMinute();
    const fr = pickTimeFrame();
    const ap = pickAmpm(fr);
    tryAdd(h, m, ap, fr);
  }

  return distractors.slice(0, 3);
}

function buildTimeChallengeDeck() {
  const usedKeys = new Set();
  const times = [];
  while (times.length < 10) {
    const hour = Math.floor(Math.random() * 12) + 1;
    const minute = pickMinute();
    const frame = pickTimeFrame();
    const ampm = pickAmpm(frame);
    const key = hour + '-' + minute + '-' + ampm + '-' + frame;
    if (usedKeys.has(key)) continue;
    usedKeys.add(key);
    times.push({ hour, minute, ampm, frame });
  }
  return times.map(t => {
    const correctKana = timeToKana(t.hour, t.minute, t.ampm, t.frame);
    const correctRomaji = timeToRomaji(t.hour, t.minute, t.ampm, t.frame);
    const distractorCombos = genTimeDistractors(t.hour, t.minute, t.ampm, t.frame);
    const distractorOpts = distractorCombos.map(d => ({
      kana: timeToKana(d.hour, d.minute, d.ampm, d.frame),
      romaji: timeToRomaji(d.hour, d.minute, d.ampm, d.frame),
    }));
    const allOpts = shuffle([{ kana: correctKana, romaji: correctRomaji }, ...distractorOpts]);
    return {
      char: formatTimeDigital(t.hour, t.minute, t.ampm, t.frame),
      answer: correctKana,
      disp: 'time',
      groupKey: 'time-challenge',
      options: allOpts.map(o => ({ en: o.kana, jp: o.kana, rd: o.romaji })),
    };
  });
}

function startTimeChallenge() {
  lastSettingsScreen = 'numbers';
  lastDeckBuilder = buildTimeChallengeDeck;
  deck = buildTimeChallengeDeck();
  current = 0; score = 0; wrong = 0; hints = 0; answered = false; missed = []; missedItems = [];
  showScreen('drill');
  renderQuestion();
}
/* ---------- end Time challenge ---------- */

/* ---------- Specific-time lookup tool (Vocab page, under Reading times) ----------
   Not a drill - a free-input reference. Reuses the same timeToKana/timeToRomaji
   conversion functions the time-reading drill above already relies on, so the
   two can never disagree with each other. */
let timeToolFrame = 'none';
let timeToolAmpm = null;

// Real device clock -> the tool's own {1-12, 0-59, gozen/gogo} shape.
function getCurrentTimeParts() {
  const now = new Date();
  const h24 = now.getHours();
  const hour12 = h24 % 12 === 0 ? 12 : h24 % 12;
  return { hour: hour12, minute: now.getMinutes(), ampm: h24 < 12 ? 'gozen' : 'gogo' };
}

function populateTimeToolSelects() {
  const hourSel = document.getElementById('time-tool-hour');
  const minSel = document.getElementById('time-tool-minute');
  if (!hourSel || !minSel) return;
  if (hourSel.options.length === 0) {
    for (let h = 1; h <= 12; h++) {
      const opt = document.createElement('option');
      opt.value = String(h);
      opt.textContent = String(h);
      hourSel.appendChild(opt);
    }
  }
  if (minSel.options.length === 0) {
    for (let m = 0; m < 60; m++) {
      const opt = document.createElement('option');
      opt.value = String(m);
      opt.textContent = String(m).padStart(2, '0');
      minSel.appendChild(opt);
    }
  }
}

// Sets the selects/frame to the current moment and re-renders - used both
// for the initial load and the "Reset to current time" button. AM/PM is
// deliberately left off (not auto-picked from the real clock) - having it
// light up on its own on every load/reset drew too much attention; leaving
// it blank also matches how real Japanese often drops it when clear from context.
function resetTimeToolToNow() {
  const hourSel = document.getElementById('time-tool-hour');
  const minSel = document.getElementById('time-tool-minute');
  if (!hourSel || !minSel) return;
  const parts = getCurrentTimeParts();
  hourSel.value = String(parts.hour);
  minSel.value = String(parts.minute);
  timeToolAmpm = null;
  timeToolFrame = 'none';
  updateTimeTool();
}

function setTimeToolFrame(frame) {
  timeToolFrame = (timeToolFrame === frame) ? 'none' : frame;
  updateTimeTool();
}

function setTimeToolAmpm(ampm) {
  timeToolAmpm = (timeToolAmpm === ampm) ? null : ampm;
  updateTimeTool();
}

function updateTimeTool() {
  const hourSel = document.getElementById('time-tool-hour');
  const minSel = document.getElementById('time-tool-minute');
  const output = document.getElementById('time-tool-output');
  if (!hourSel || !minSel || !output) return;

  ['ni', 'made', 'goro', 'kara'].forEach(f => {
    const btn = document.getElementById('time-tool-frame-' + f);
    if (btn) btn.classList.toggle('active', timeToolFrame === f);
  });
  ['gozen', 'gogo'].forEach(a => {
    const btn = document.getElementById('time-tool-ampm-' + a);
    if (btn) btn.classList.toggle('active', timeToolAmpm === a);
  });

  const hour = parseInt(hourSel.value, 10);
  const minute = parseInt(minSel.value, 10);
  const kana = timeToKana(hour, minute, timeToolAmpm, timeToolFrame);
  const romaji = timeToRomaji(hour, minute, timeToolAmpm, timeToolFrame);
  output.innerHTML = `<span class="time-tool-jp">${markSmallKana(kana)}</span><span class="time-tool-rd">${romaji}</span>`;
}
/* ---------- end Specific-time lookup tool ---------- */

/* ---------- Specific-number lookup tool ---------- */
// Same idea as the time tool above, but free text entry rather than
// dropdowns - the range (0-99,999) is too wide for a picker to make sense
// of. Reuses numToJapanese/numReadingToRomaji, the exact same functions the
// Reading numbers challenge itself uses, so this always matches what you'd
// be quizzed on.
function updateNumberTool() {
  const input = document.getElementById('number-tool-input');
  const output = document.getElementById('number-tool-output');
  if (!input || !output) return;
  const raw = input.value;
  if (raw === '') { output.innerHTML = ''; return; }
  const n = Math.floor(Number(raw));
  if (!Number.isFinite(n) || n < 0 || n > 99999) {
    output.innerHTML = `<span class="number-tool-rd">Enter a number from 0 to 99,999</span>`;
    return;
  }
  const kana = numToJapanese(n);
  const romaji = numReadingToRomaji(kana);
  output.innerHTML = `<span class="number-tool-jp">${markSmallKana(kana)}</span><span class="number-tool-rd">${romaji}</span>`;
}
/* ---------- end Specific-number lookup tool ---------- */

/* ---------- Specific-counter lookup tool ---------- */
// Same idea as Specific number, but with a counter-type pill row alongside
// the digit entry. Scoped to the item-type counters (COUNTER_ITEM_UNITS -
// つ/人/個/本/枚/匹/冊/台/回/歳). Range is 1-50 for every counter except つ,
// which is capped at 10 - native Japanese counting genuinely has no reading
// past とお (see counterReading() above for the composition rule and the
// exceptions it handles). Pills are kanji-only, same as the reference
// screen right next to this tool, which is judged enough context for now.
let specificCounterUnit = 'tsu';

function counterToolMax(unitKey) {
  return unitKey === 'tsu' ? 10 : 50;
}

function populateCounterToolPills() {
  const row = document.getElementById('counter-tool-pills');
  const desc = document.getElementById('counter-tool-desc');
  if (!row) return;
  row.innerHTML = '';
  Object.keys(COUNTER_ITEM_UNITS).forEach(key => {
    const btn = document.createElement('button');
    btn.className = 'level-pill' + (key === specificCounterUnit ? ' active' : '');
    btn.textContent = COUNTER_ITEM_UNITS[key].label;
    btn.onclick = () => setSpecificCounterUnit(key);
    row.appendChild(btn);
  });
  // English gloss under the pills, always shown alongside whichever kanji
  // pill is selected - this is what makes kanji-only pills workable here
  // (unlike a future quiz, where the Japanese and English wouldn't be on
  // screen at the same time).
  if (desc) desc.textContent = COUNTER_ITEM_UNITS[specificCounterUnit].desc;
  const input = document.getElementById('counter-tool-input');
  const hint = document.getElementById('counter-tool-hint');
  const max = counterToolMax(specificCounterUnit);
  if (input) {
    input.max = max;
    // Existing value would now be out of range for the newly-picked
    // counter (e.g. had "23" showing, switched to つ which tops out at 10) -
    // clamp it down rather than leaving an invalid number sitting in the box.
    if (input.value !== '' && Number(input.value) > max) input.value = max;
  }
  if (hint) hint.textContent = `1–${max}`;
}

function setSpecificCounterUnit(key) {
  specificCounterUnit = key;
  populateCounterToolPills();
  updateCounterTool();
}

function updateCounterTool() {
  const input = document.getElementById('counter-tool-input');
  const output = document.getElementById('counter-tool-output');
  if (!input || !output) return;
  const raw = input.value;
  if (raw === '') { output.innerHTML = ''; return; }
  const n = Math.floor(Number(raw));
  const max = counterToolMax(specificCounterUnit);
  if (!Number.isFinite(n) || n < 1 || n > max) {
    output.innerHTML = `<span class="number-tool-rd">Enter a number from 1 to ${max}</span>`;
    return;
  }
  const pair = counterReading(specificCounterUnit, n);
  if (!pair) {
    output.innerHTML = `<span class="number-tool-rd">Not available for this number</span>`;
    return;
  }
  const [jp, romaji] = pair;
  output.innerHTML = `<span class="number-tool-jp">${markSmallKana(jp)}</span><span class="number-tool-rd">${romaji}</span>`;
}
/* ---------- end Specific-counter lookup tool ---------- */

/* ---------- Money: currency converter + shopping-cost tools ---------- */
// Both cards below read appSettings.gbpJpyRate directly rather than keeping
// their own copy, so editing the rate updates whichever output is currently
// on screen immediately, and the rate is remembered next time via
// saveSettings() (same persistence as every other setting).
function populateMoneyRate() {
  const input = document.getElementById('money-rate-input');
  if (input) input.value = appSettings.gbpJpyRate;
}

function updateMoneyRate() {
  const input = document.getElementById('money-rate-input');
  if (!input) return;
  const n = Number(input.value);
  if (Number.isFinite(n) && n > 0) {
    appSettings.gbpJpyRate = n;
    saveSettings();
  }
  updateMoneyConverter();
}

let moneyDirection = 'jpy-gbp';

function setMoneyDirection(dir) {
  moneyDirection = dir;
  ['jpy-gbp', 'gbp-jpy'].forEach(key => {
    const pill = document.getElementById('money-dir-pill-' + key);
    if (pill) pill.classList.toggle('active', key === dir);
  });
  const input = document.getElementById('money-convert-input');
  if (input) input.placeholder = dir === 'jpy-gbp' ? '¥0' : '£0';
  updateMoneyConverter();
}

// One entry point now instead of two - whatever's typed in becomes a JPY
// amount either directly (¥→£) or via the rate (£→¥), and the tax-free
// price is always derived from that same JPY amount, so there's no second
// box to re-enter the figure into. Tax-free removes the embedded 10%
// consumption tax properly (÷1.1, e.g. ¥1,100 -> ¥1,000) rather than a flat
// 10% off - that's the actual discount a tax-free till gives, not an
// approximation of it.
function updateMoneyConverter() {
  const input = document.getElementById('money-convert-input');
  const output = document.getElementById('money-convert-output');
  if (!input || !output) return;
  const raw = input.value;
  if (raw === '') { output.innerHTML = ''; return; }
  const n = Number(raw);
  if (!Number.isFinite(n) || n < 0) {
    output.innerHTML = `<span class="number-tool-rd">Enter a positive number</span>`;
    return;
  }
  const rate = appSettings.gbpJpyRate;
  const jpy = moneyDirection === 'jpy-gbp' ? n : n * rate;
  const gbp = jpy / rate;
  const taxFreeJpy = jpy / 1.1;
  const taxFreeGbp = taxFreeJpy / rate;

  let mainLine;
  if (moneyDirection === 'jpy-gbp') {
    mainLine = `<span class="number-tool-jp">£${gbp.toFixed(2)}</span><span class="number-tool-rd">¥${n.toLocaleString()}</span>`;
  } else {
    mainLine = `<span class="number-tool-jp">¥${Math.round(jpy).toLocaleString()}</span><span class="number-tool-rd">£${n.toLocaleString()}</span>`;
  }
  output.innerHTML = `
    ${mainLine}
    <div class="money-output-secondary">
      <span class="number-tool-jp">¥${Math.round(taxFreeJpy).toLocaleString()}</span><span class="number-tool-rd">tax-free price (£${taxFreeGbp.toFixed(2)})</span>
    </div>
  `;
}
/* ---------- end Money ---------- */


// Numbers/Times/Counters each track ONE aggregate score (right/wrong
// answers add to or take away from a single running value - see the big
// confidenceBand comment), not a per-word spread, so per Andrew (2026-09-22)
// this is "just a bar of a single shade" rather than a multi-segment one -
// always exactly one full-width segment, but built with the exact same
// renderCategoryBar/getCategoryBandCounts machinery and the same eight
// band boundaries as every other confidence display ("the score ranges
// should follow the same rules"), rather than a separate colour system.
// Never-drilled reads as one full-width grey segment (same "grey means
// untested" convention as the category bars), not a bare empty bar.
function setSingleScoreBar(id, entry) {
  const bar = document.getElementById(id);
  if (!bar) return;
  const band = confidenceBand(displayScore(entry));
  const counts = { untested: band ? 0 : 1, neg3: 0, neg2: 0, neg1: 0, neutral: 0, pos1: 0, pos2: 0, pos3: 0, pos4: 0 };
  if (band) counts[band] = 1;
  renderCategoryBar(bar, counts, true); // always show - it's the only segment there is
}

function updateNumberTimeSwatches() {
  setSingleScoreBar('numbers-score-swatch', kanaScores['numbers-consistency']);
  setSingleScoreBar('times-score-swatch', kanaScores['times-consistency']);
  setSingleScoreBar('counters-score-swatch', kanaScores['counters-consistency']);
}

// Day/week/month/year x past/present/future - the classic "kinou/kyou/ashita"
// style table. Content mirrors the actual vocab-time-l2 items (see the day,
// week, month, and year sets there) rather than being computed, since these
// are fixed vocabulary, not a pattern like minute endings.
const TIME_UNIT_TABLE = [
  { label: 'Day', past: ['きのう', 'kinou'], present: ['きょう', 'kyou'], future: ['あした', 'ashita'] },
  { label: 'Week', past: ['せんしゅう', 'senshuu'], present: ['こんしゅう', 'konshuu'], future: ['らいしゅう', 'raishuu'] },
  { label: 'Month', past: ['せんげつ', 'sengetsu'], present: ['こんげつ', 'kongetsu'], future: ['らいげつ', 'raigetsu'] },
  { label: 'Year', past: ['きょねん', 'kyonen'], present: ['ことし', 'kotoshi'], future: ['らいねん', 'rainen'] },
];

function showTimeUnitsReference() {
  // vocab-tile-selection (2026-08-31, was match-settings) - this reference
  // now opens from inside Time vocabulary's own selection screen (see
  // CATEGORY_REFERENCE_LINKS), so Back should return there, not the list.
  vocabRefBackTarget = 'vocab-tile-selection';
  document.getElementById('vocab-ref-title').textContent = 'Day / week / month / year';
  const list = document.getElementById('vocab-ref-list');
  list.className = '';
  list.innerHTML = '';
  const grid = document.createElement('div');
  grid.className = 'time-unit-table';
  const cell = (jp, romaji, extraClass) => `
    <div class="tu-cell${extraClass ? ' ' + extraClass : ''}">
      ${jp ? `<div class="tu-jp">${markSmallKana(jp)}</div><div class="tu-romaji">${romaji}</div>` : ''}
    </div>
  `;
  grid.innerHTML =
    `<div class="tu-cell tu-header"></div>
     <div class="tu-cell tu-header">Past</div>
     <div class="tu-cell tu-header">Present</div>
     <div class="tu-cell tu-header">Future</div>` +
    TIME_UNIT_TABLE.map(row => `
      <div class="tu-cell tu-rowlabel">${row.label}</div>
      ${cell(row.past[0], row.past[1])}
      ${cell(row.present[0], row.present[1])}
      ${cell(row.future[0], row.future[1])}
    `).join('');
  list.appendChild(grid);
  showScreen('vocab-reference');
}

// Duration-counter reference (Numbers > Counters reference). Each unit's
// 1-10 readings have their own irregular sound changes (gemination, the
// yon/yo and kyuu/ku substitutions, etc.) so - unlike minutes, which are a
// computable pattern - these are fixed lookup tables, cross-checked against
// a Japanese grammar reference rather than derived. Minutes reuses the
// existing minuteToKana/minuteToRomaji functions instead of duplicating
// that data here.
// 7 uses なな throughout (ななじかん, ななにん, ななじ in the time drills) -
// how the class teaches it (Andrew, 2026-10-06). しち is also correct for these;
// しちがつ (July) and じゅうしちにち (17th) have no なな form and stay as they are.
const COUNTER_UNITS = {
  minutes: { label: 'Mins', items: Array.from({ length: 10 }, (_, i) => [minuteToKana(i + 1), minuteToRomaji(i + 1)]) },
  hours: {
    label: 'Hours', items: [
      ['いちじかん', 'ichijikan'], ['にじかん', 'nijikan'], ['さんじかん', 'sanjikan'],
      ['よじかん', 'yojikan'], ['ごじかん', 'gojikan'], ['ろくじかん', 'rokujikan'],
      ['ななじかん', 'nanajikan'], ['はちじかん', 'hachijikan'], ['くじかん', 'kujikan'],
      ['じゅうじかん', 'juujikan'],
    ]
  },
  days: {
    label: 'Days', items: [
      ['いちにち', 'ichinichi'], ['ふつか', 'futsuka'], ['みっか', 'mikka'],
      ['よっか', 'yokka'], ['いつか', 'itsuka'], ['むいか', 'muika'],
      ['なのか', 'nanoka'], ['ようか', 'youka'], ['ここのか', 'kokonoka'],
      ['とおか', 'tooka'],
    ]
  },
  weeks: {
    label: 'Weeks', items: [
      ['いっしゅうかん', 'isshuukan'], ['にしゅうかん', 'nishuukan'], ['さんしゅうかん', 'sanshuukan'],
      ['よんしゅうかん', 'yonshuukan'], ['ごしゅうかん', 'goshuukan'], ['ろくしゅうかん', 'rokushuukan'],
      ['ななしゅうかん', 'nanashuukan'], ['はちしゅうかん', 'hachishuukan'], ['きゅうしゅうかん', 'kyuushuukan'],
      ['じゅっしゅうかん', 'jusshuukan'],
    ]
  },
  months: {
    label: 'Months', items: [
      ['いっかげつ', 'ikkagetsu'], ['にかげつ', 'nikagetsu'], ['さんかげつ', 'sankagetsu'],
      ['よんかげつ', 'yonkagetsu'], ['ごかげつ', 'gokagetsu'], ['ろっかげつ', 'rokkagetsu'],
      ['ななかげつ', 'nanakagetsu'], ['はちかげつ', 'hachikagetsu'], ['きゅうかげつ', 'kyuukagetsu'],
      ['じゅっかげつ', 'jukkagetsu'],
    ]
  },
  years: {
    label: 'Years', items: [
      ['いちねん', 'ichinen'], ['にねん', 'ninen'], ['さんねん', 'sannen'],
      ['よねん', 'yonen'], ['ごねん', 'gonen'], ['ろくねん', 'rokunen'],
      ['ななねん', 'nananen'], ['はちねん', 'hachinen'], ['きゅうねん', 'kyuunen'],
      ['じゅうねん', 'juunen'],
    ]
  },
};

let activeCounterUnit = 'minutes';

function switchCounterUnit(unit) {
  activeCounterUnit = unit;
  renderCountersReference();
}

function renderCountersReference() {
  document.getElementById('vocab-ref-title').textContent = 'Counters (1–10)';
  const list = document.getElementById('vocab-ref-list');
  list.className = 'tight-list';
  list.innerHTML = '';
  const pillRow = document.createElement('div');
  pillRow.className = 'level-filter-row counter-unit-pills';
  Object.keys(COUNTER_UNITS).forEach(key => {
    const btn = document.createElement('button');
    btn.className = 'level-pill' + (key === activeCounterUnit ? ' active' : '');
    btn.textContent = COUNTER_UNITS[key].label;
    btn.onclick = () => switchCounterUnit(key);
    pillRow.appendChild(btn);
  });
  list.appendChild(pillRow);

  COUNTER_UNITS[activeCounterUnit].items.forEach((pair, idx) => {
    const row = document.createElement('div');
    row.className = 'vocab-ref-row two-col minute-row';
    row.innerHTML = `
      <div class="vocab-ref-col-left">
        <div class="vocab-ref-num-big">${idx + 1}</div>
      </div>
      <div class="vocab-ref-col-right">
        <div class="vocab-ref-jp minute-jp">${markSmallKana(pair[0])}</div>
        <div class="vocab-ref-romaji minute-romaji">${pair[1]}</div>
      </div>
    `;
    list.appendChild(row);
  });
}

function showCountersReference() {
  vocabRefBackTarget = 'numbers';
  renderCountersReference();
  showScreen('vocab-reference');
}

let activeItemCounterUnit = 'tsu';

function switchItemCounterUnit(unit) {
  activeItemCounterUnit = unit;
  renderItemCountersReference();
}

function renderItemCountersReference() {
  const unit = COUNTER_ITEM_UNITS[activeItemCounterUnit];
  document.getElementById('vocab-ref-title').textContent = `${unit.label} — ${unit.desc} (1–10)`;
  const list = document.getElementById('vocab-ref-list');
  list.className = 'tight-list';
  list.innerHTML = '';
  const pillRow = document.createElement('div');
  pillRow.className = 'level-filter-row counter-unit-pills';
  Object.keys(COUNTER_ITEM_UNITS).forEach(key => {
    const btn = document.createElement('button');
    btn.className = 'level-pill' + (key === activeItemCounterUnit ? ' active' : '');
    btn.textContent = COUNTER_ITEM_UNITS[key].label;
    btn.onclick = () => switchItemCounterUnit(key);
    pillRow.appendChild(btn);
  });
  list.appendChild(pillRow);

  unit.items.forEach((pair, idx) => {
    const row = document.createElement('div');
    row.className = 'vocab-ref-row two-col minute-row';
    row.innerHTML = `
      <div class="vocab-ref-col-left">
        <div class="vocab-ref-num-big">${idx + 1}</div>
      </div>
      <div class="vocab-ref-col-right">
        <div class="vocab-ref-jp minute-jp">${markSmallKana(pair[0])}</div>
        <div class="vocab-ref-romaji minute-romaji">${pair[1]}</div>
      </div>
    `;
    list.appendChild(row);
  });

  // Irregular one-offs (currently just はたち for 20) - set apart with a
  // divider so it reads as "here's the odd one out", not another item in
  // the regular 1-10 sequence above.
  if (unit.extra && unit.extra.length) {
    const divider = document.createElement('div');
    divider.className = 'section-divider';
    list.appendChild(divider);
    unit.extra.forEach(item => {
      const row = document.createElement('div');
      row.className = 'vocab-ref-row two-col minute-row';
      row.innerHTML = `
        <div class="vocab-ref-col-left">
          <div class="vocab-ref-num-big">${item.num}</div>
        </div>
        <div class="vocab-ref-col-right">
          <div class="vocab-ref-jp minute-jp">${markSmallKana(item.jp)}</div>
          <div class="vocab-ref-romaji minute-romaji">${item.romaji}</div>
        </div>
      `;
      list.appendChild(row);
    });
  }
}

function showItemCountersReference() {
  vocabRefBackTarget = 'numbers';
  activeItemCounterUnit = 'tsu';
  renderItemCountersReference();
  showScreen('vocab-reference');
}

// Eight of the ten item counters have a real noun to swap in (same number,
// different object - tests whether you know which counter that object
// takes). Singular/plural stored explicitly rather than derived, since a
// couple are irregular (mouse/mice) and getting that wrong would be its own
// small credibility problem in a vocab app. 回 and 歳 have no object to
// swap - see COUNTER_QUIZ_NO_NOUN below for how their variety works instead.
const COUNTER_QUIZ_NOUNS = {
  tsu: [['chair', 'chairs'], ['bag', 'bags'], ['box', 'boxes'], ['stone', 'stones']],
  nin: [['person', 'people'], ['man', 'men'], ['woman', 'women'], ['child', 'children']],
  ko: [['egg', 'eggs'], ['apple', 'apples'], ['ball', 'balls'], ['orange', 'oranges']],
  hon: [['pencil', 'pencils'], ['pen', 'pens'], ['bottle', 'bottles'], ['umbrella', 'umbrellas']],
  mai: [['sheet of paper', 'sheets of paper'], ['ticket', 'tickets'], ['photo', 'photos'], ['plate', 'plates']],
  // Snake and monkey added alongside the zodiac-animals vocab category -
  // both are genuinely 匹-counted animals (unlike e.g. cow/horse/boar from
  // that same category, which take 頭 as large animals - deliberately left
  // out here so this quiz doesn't teach the wrong counter for them).
  hiki: [['dog', 'dogs'], ['cat', 'cats'], ['fish', 'fish'], ['mouse', 'mice'], ['snake', 'snakes'], ['monkey', 'monkeys']],
  satsu: [['book', 'books'], ['magazine', 'magazines'], ['notebook', 'notebooks'], ['dictionary', 'dictionaries']],
  dai: [['car', 'cars'], ['computer', 'computers'], ['TV', 'TVs'], ['bicycle', 'bicycles']],
};

// 回 (times/occurrences) and 歳 (age) don't attach to an object, so there's
// no noun pool to draw variety from - instead, a question drawing on one of
// these varies which NUMBER gets shown ("8 years old" / "10 times") rather
// than which noun, which is the equivalent trick for a counter whose only
// "object" is the number itself.
const COUNTER_QUIZ_NO_NOUN = new Set(['kai', 'sai']);

// Spelled out ("six things") rather than digits ("6 things") - the answer
// options are meant to read as plain English phrases, not a mix of digit
// and word.
const COUNTER_QUIZ_NUMBER_WORDS = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten'];

function counterQuizPhrase(unitKey, n) {
  const word = COUNTER_QUIZ_NUMBER_WORDS[n] || String(n);
  if (unitKey === 'kai') return word + ' time' + (n === 1 ? '' : 's');
  if (unitKey === 'sai') return word + ' year' + (n === 1 ? '' : 's') + ' old';
  const pool = COUNTER_QUIZ_NOUNS[unitKey];
  const [sg, pl] = pool[Math.floor(Math.random() * pool.length)];
  return word + ' ' + (n === 1 ? sg : pl);
}

let counterQuizSelected = new Set();

function buildCounterQuizSelectionList() {
  const list = document.getElementById('counter-quiz-selection-list');
  if (!list) return;
  list.innerHTML = '';
  Object.keys(COUNTER_ITEM_UNITS).forEach(key => {
    const unit = COUNTER_ITEM_UNITS[key];
    const card = document.createElement('div');
    card.className = 'match-card-select' + (counterQuizSelected.has(key) ? ' selected' : '');
    const desc = unit.desc.charAt(0).toUpperCase() + unit.desc.slice(1);
    card.innerHTML = `<div class="group-info"><div class="group-name">${desc}</div><div class="group-chars">${unit.label}</div></div>`;
    card.onclick = () => toggleCounterQuizSelection(key, card);
    list.appendChild(card);
  });
  updateCounterQuizSelectionCount();
}

function toggleCounterQuizSelection(key, card) {
  if (counterQuizSelected.has(key)) {
    counterQuizSelected.delete(key);
  } else {
    if (counterQuizSelected.size >= 4) return; // deselect one first - exactly 4 required
    counterQuizSelected.add(key);
  }
  card.classList.toggle('selected', counterQuizSelected.has(key));
  updateCounterQuizSelectionCount();
}

function updateCounterQuizSelectionCount() {
  const n = counterQuizSelected.size;
  const countEl = document.getElementById('counter-quiz-selection-count');
  if (countEl) countEl.textContent = n + ' of 4 selected';
  const startBtn = document.getElementById('counter-quiz-start-btn');
  if (startBtn) startBtn.disabled = n !== 4;
}

function showCounterQuizSelection() {
  lastSettingsScreen = 'numbers';
  showScreen('counter-quiz-selection');
}

function startCounterQuizFromSelection() {
  if (counterQuizSelected.size !== 4) return;
  startCounterQuizChallenge([...counterQuizSelected]);
}

function buildCounterQuizDeck(selectedKeys) {
  const questions = [];
  const usedCombos = new Set();
  let attempts = 0;
  while (questions.length < 10 && attempts < 300) {
    attempts++;
    const n = Math.floor(Math.random() * 10) + 1;
    const correctKey = selectedKeys[Math.floor(Math.random() * selectedKeys.length)];
    const combo = n + '-' + correctKey;
    if (usedCombos.has(combo)) continue;

    const correctItem = COUNTER_ITEM_UNITS[correctKey].items[n - 1];
    const correctPhrase = counterQuizPhrase(correctKey, n);

    const otherKeys = selectedKeys.filter(k => k !== correctKey);
    const distractorPhrases = otherKeys.map(k => {
      if (COUNTER_QUIZ_NO_NOUN.has(k)) {
        let dn;
        let tries = 0;
        do { dn = Math.floor(Math.random() * 10) + 1; tries++; } while (dn === n && tries < 10);
        return counterQuizPhrase(k, dn);
      }
      return counterQuizPhrase(k, n);
    });

    // Rare but possible (e.g. two noun pools both roll the same word) -
    // just retry the whole question rather than ship 4 options with a
    // literal duplicate in them.
    const allPhrases = [correctPhrase, ...distractorPhrases];
    if (new Set(allPhrases).size < 4) continue;

    usedCombos.add(combo);
    questions.push({
      char: correctItem[1],
      kana: correctItem[0],
      answer: correctPhrase,
      disp: 'counter',
      groupKey: 'counter-quiz',
      quizCounters: selectedKeys,
      options: shuffle(allPhrases.map(p => ({ en: p }))),
    });
  }
  return questions;
}

function startCounterQuizChallenge(selectedKeys) {
  lastSettingsScreen = 'numbers';
  const builder = () => buildCounterQuizDeck(selectedKeys);
  lastDeckBuilder = builder;
  deck = builder();
  current = 0; score = 0; wrong = 0; hints = 0; answered = false; missed = []; missedItems = [];
  showScreen('drill');
  renderQuestion();
}

function showMinuteReference() {
  // vocab-tile-selection (2026-08-31, was match-settings) - same reasoning
  // as showTimeUnitsReference above; also opens from Time vocabulary's own
  // selection screen now.
  vocabRefBackTarget = 'vocab-tile-selection';
  document.getElementById('vocab-ref-title').textContent = 'Minute endings (1–10)';
  const list = document.getElementById('vocab-ref-list');
  list.className = 'tight-list';
  list.innerHTML = '';
  for (let i = 1; i <= 10; i++) {
    const row = document.createElement('div');
    row.className = 'vocab-ref-row two-col minute-row';
    row.innerHTML = `
      <div class="vocab-ref-col-left">
        <div class="vocab-ref-num-big">${i}</div>
      </div>
      <div class="vocab-ref-col-right">
        <div class="vocab-ref-jp minute-jp">${markSmallKana(minuteToKana(i))}</div>
        <div class="vocab-ref-romaji minute-romaji">${minuteToRomaji(i)}</div>
      </div>
    `;
    list.appendChild(row);
  }
  showScreen('vocab-reference');
}

// Days of the MONTH (calendar dates, ついたち/ふつか/みっか...), not to be
// confused with the counter-days table above (durations, いちにち/ふつか/
// みっか...) - they share readings 2nd-10th, but the 1st is genuinely
// different: いちにち means "one day" (a duration), ついたち means "the 1st
// of the month" and is never used for a duration. Source-checked against
// a live reference (cotoacademy.com) rather than relied on from memory,
// given how easy it'd be to get one of the 14th/19th/20th/24th/29th
// exceptions wrong. 1st-10th use their own native-Japanese-number set
// entirely (not derived from anything); 11th-31st are regular
// number+にち EXCEPT those five, which keep the native-style よっか/くにち/
// はつか readings instead of the expected じゅうよんにち/じゅうきゅうにち/
// にじゅうにち/にじゅうよんにち/にじゅうきゅうにち.
const DAYS_OF_MONTH = [
  { day: 1, jp: 'ついたち', romaji: 'tsuitachi', irregular: true },
  { day: 2, jp: 'ふつか', romaji: 'futsuka', irregular: true },
  { day: 3, jp: 'みっか', romaji: 'mikka', irregular: true },
  { day: 4, jp: 'よっか', romaji: 'yokka', irregular: true },
  { day: 5, jp: 'いつか', romaji: 'itsuka', irregular: true },
  { day: 6, jp: 'むいか', romaji: 'muika', irregular: true },
  { day: 7, jp: 'なのか', romaji: 'nanoka', irregular: true },
  { day: 8, jp: 'ようか', romaji: 'youka', irregular: true },
  { day: 9, jp: 'ここのか', romaji: 'kokonoka', irregular: true },
  { day: 10, jp: 'とおか', romaji: 'tooka', irregular: true },
  { day: 11, jp: 'じゅういちにち', romaji: 'juuichinichi' },
  { day: 12, jp: 'じゅうににち', romaji: 'juuninichi' },
  { day: 13, jp: 'じゅうさんにち', romaji: 'juusannichi' },
  { day: 14, jp: 'じゅうよっか', romaji: 'juuyokka', irregular: true },
  { day: 15, jp: 'じゅうごにち', romaji: 'juugonichi' },
  { day: 16, jp: 'じゅうろくにち', romaji: 'juurokunichi' },
  { day: 17, jp: 'じゅうしちにち', romaji: 'juushichinichi' },
  { day: 18, jp: 'じゅうはちにち', romaji: 'juuhachinichi' },
  { day: 19, jp: 'じゅうくにち', romaji: 'juukunichi', irregular: true },
  { day: 20, jp: 'はつか', romaji: 'hatsuka', irregular: true },
  { day: 21, jp: 'にじゅういちにち', romaji: 'nijuuichinichi' },
  { day: 22, jp: 'にじゅうににち', romaji: 'nijuuninichi' },
  { day: 23, jp: 'にじゅうさんにち', romaji: 'nijuusannichi' },
  { day: 24, jp: 'にじゅうよっか', romaji: 'nijuuyokka', irregular: true },
  { day: 25, jp: 'にじゅうごにち', romaji: 'nijuugonichi' },
  { day: 26, jp: 'にじゅうろくにち', romaji: 'nijuurokunichi' },
  { day: 27, jp: 'にじゅうしちにち', romaji: 'nijuushichinichi' },
  { day: 28, jp: 'にじゅうはちにち', romaji: 'nijuuhachinichi' },
  { day: 29, jp: 'にじゅうくにち', romaji: 'nijuukunichi', irregular: true },
  { day: 30, jp: 'さんじゅうにち', romaji: 'sanjuunichi' },
  { day: 31, jp: 'さんじゅういちにち', romaji: 'sanjuuichinichi' },
];

function showDaysOfMonthReference() {
  // vocab-tile-selection (2026-08-31, was match-settings) - opens from
  // Days of the month's own selection screen now (see
  // CATEGORY_REFERENCE_LINKS), so Back should land there, not the list.
  vocabRefBackTarget = 'vocab-tile-selection';
  document.getElementById('vocab-ref-title').textContent = 'Days of the month (1st–31st)';
  const list = document.getElementById('vocab-ref-list');
  list.className = 'tight-list';
  list.innerHTML = '';

  const note = document.createElement('div');
  note.className = 'verb-conj-note';
  note.textContent = 'The 1st–10th don’t follow the number+日 pattern at all - they’re their own set. From the 11th on it’s regular (number+にち), except five days highlighted below: the 14th and 24th (じゅうよっか, にじゅうよっか) and the 20th (はつか) borrow the special readings, and the 19th and 29th use く instead of きゅう (じゅうくにち, にじゅうくにち).';
  list.appendChild(note);

  const grid = document.createElement('div');
  grid.className = 'days-month-grid';
  DAYS_OF_MONTH.forEach(d => {
    const cell = document.createElement('div');
    cell.className = 'days-month-cell' + (d.irregular ? ' days-month-irregular' : '');
    cell.innerHTML = `
      <div class="days-month-num">${d.day}${d.day === 1 ? 'st' : d.day === 2 ? 'nd' : d.day === 3 ? 'rd' : d.day === 21 ? 'st' : d.day === 22 ? 'nd' : d.day === 23 ? 'rd' : d.day === 31 ? 'st' : 'th'}</div>
      <div class="tu-jp">${markSmallKana(d.jp)}</div>
      <div class="tu-romaji">${d.romaji}</div>
    `;
    grid.appendChild(cell);
  });
  list.appendChild(grid);
  showScreen('vocab-reference');
}

// The traditional zodiac clock (十二支) - each animal marks a 2-hour block,
// laid out like positions on a clock face rather than literal hours of the
// day. 午 (uma, horse) sits at the noon position, which is the actual origin
// of 午前/午後 (gozen/gogo) taught in Time vocabulary - "before the horse"
// and "after the horse". Kept as a reference rather than drillable
// vocabulary since five of these readings (ね/う/たつ/み/い) are zodiac-only
// and not the everyday word for the animal - see vocab-animals-l2 for that.
// Emoji picked to match Unicode's own standard "face" style where one
// exists (mouse/cow/tiger/rabbit/dragon/horse/monkey face) so the row stays
// visually consistent - snake/sheep/boar don't have a "face" variant, but
// their plain glyphs are the same size/style family so they don't stand out.
const ZODIAC_HOURS = [
  { kanji: '子', reading: 'ね', romaji: 'ne', animal: 'Rat', hours: '11pm–1am', emoji: '🐭' },
  { kanji: '丑', reading: 'うし', romaji: 'ushi', animal: 'Ox', hours: '1am–3am', emoji: '🐮' },
  { kanji: '寅', reading: 'とら', romaji: 'tora', animal: 'Tiger', hours: '3am–5am', emoji: '🐯' },
  { kanji: '卯', reading: 'う', romaji: 'u', animal: 'Rabbit', hours: '5am–7am', emoji: '🐰' },
  { kanji: '辰', reading: 'たつ', romaji: 'tatsu', animal: 'Dragon', hours: '7am–9am', emoji: '🐲' },
  { kanji: '巳', reading: 'み', romaji: 'mi', animal: 'Snake', hours: '9am–11am', emoji: '🐍' },
  { kanji: '午', reading: 'うま', romaji: 'uma', animal: 'Horse', hours: '11am–1pm', pivot: true, emoji: '🐴' },
  { kanji: '未', reading: 'ひつじ', romaji: 'hitsuji', animal: 'Sheep', hours: '1pm–3pm', emoji: '🐑' },
  { kanji: '申', reading: 'さる', romaji: 'saru', animal: 'Monkey', hours: '3pm–5pm', emoji: '🐵' },
  { kanji: '酉', reading: 'とり', romaji: 'tori', animal: 'Rooster', hours: '5pm–7pm', emoji: '🐓' },
  { kanji: '戌', reading: 'いぬ', romaji: 'inu', animal: 'Dog', hours: '7pm–9pm', emoji: '🐶' },
  { kanji: '亥', reading: 'い', romaji: 'i', animal: 'Boar', hours: '9pm–11pm', emoji: '🐗' },
];

function showZodiacClockReference() {
  // vocab-tile-selection (2026-08-31, was match-settings) - opens from
  // Animals' own selection screen now (see CATEGORY_REFERENCE_LINKS), so
  // Back should land there, not the list.
  vocabRefBackTarget = 'vocab-tile-selection';
  document.getElementById('vocab-ref-title').textContent = '12 zodiac animals & the clock';
  const list = document.getElementById('vocab-ref-list');
  list.className = 'tight-list';
  list.innerHTML = '';
  ZODIAC_HOURS.forEach(z => {
    const row = document.createElement('div');
    row.className = 'vocab-ref-row two-col minute-row zodiac-row' + (z.pivot ? ' zodiac-pivot-row' : '');
    row.innerHTML = `
      <div class="vocab-ref-col-left">
        <div class="zodiac-emoji">${z.emoji}</div>
        <div>
          <div class="vocab-ref-jp minute-jp">${markSmallKana(z.kanji + '（' + z.reading + '）')}</div>
          <div class="vocab-ref-romaji minute-romaji">${z.romaji} — ${z.animal}</div>
        </div>
      </div>
      <div class="vocab-ref-col-right">
        <div class="vocab-ref-en">${z.hours}</div>
      </div>
    `;
    list.appendChild(row);
  });
  const note = document.createElement('div');
  note.className = 'zodiac-clock-note';
  note.textContent = '午 (horse) marks noon - everything before it is 午前 (gozen, "before the horse" = AM), everything after is 午後 (gogo, "after the horse" = PM).';
  list.appendChild(note);
  showScreen('vocab-reference');
}
