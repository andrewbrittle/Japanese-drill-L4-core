// Japanese - the daily card (2026-11-08, step 8 of the move onto the core):
// the greeting for the day and a sentence from the engine, shown once a
// day and now and then when idle. Loaded before ja/legacy.js.

// DAILY CARD: the greeting, date, time and a sentence to read, shown the
// first time the app is opened each day (and any time by tapping 日本語 in
// the header). It used to end with a Japanese proverb; removed 2026-10-22
// (Andrew: after a while nobody reads them). The storage key keeps its old
// name so the card doesn't show twice on the day this changed.
const DAILY_SEEN_KEY = 'jpL4ProverbLastSeen';

function maybeShowDailyCard() {
  const today = new Date().toISOString().slice(0, 10);
  let last;
  try { last = localStorage.getItem(DAILY_SEEN_KEY); } catch (e) { last = null; }
  if (last === today) return;
  try { localStorage.setItem(DAILY_SEEN_KEY, today); } catch (e) { /* worst case it shows again next load */ }
  showDailyCard();
}

// GREETING (2026-10-06) - greeting, date and time in Japanese at the top of
// the proverb screen. Reuses the app's own readings (DAYS_OF_MONTH, the
// time helpers, and the taught month/weekday words in VOCAB) so it always
// matches what's drilled elsewhere.
const PG_MONTHS_EN = ['January','February','March','April','May','June','July','August','September','October','November','December'];

const PG_DAYS_EN = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];

let proverbGreetingTimer = null;

function pgVocabByEn(en) {
  for (const k of Object.keys(VOCAB)) {
    const hit = VOCAB[k].items.find(i => i.en === en && i.tags && i.tags.includes('taught'));
    if (hit) return hit;
  }
  return null;
}

function buildGreetingParts(now) {
  const h = now.getHours();
  const hello = (h >= 18 || h < 4) ? { jp: 'こんばんは', romaji: 'konbanwa', en: 'Good evening' }
    : h < 11 ? { jp: 'おはようございます', romaji: 'ohayou gozaimasu', en: 'Good morning' }
    : { jp: 'こんにちは', romaji: 'konnichiwa', en: 'Good day' };
  const month = pgVocabByEn(PG_MONTHS_EN[now.getMonth()]);
  const wday = pgVocabByEn(PG_DAYS_EN[now.getDay()]);
  const dom = DAYS_OF_MONTH[now.getDate() - 1];
  const date = (month && wday && dom) ? {
    jp: `${month.jp} ${dom.jp} ${wday.jp}`,
    romaji: `${month.romaji} ${dom.romaji} ${wday.romaji}`,
    en: `${PG_DAYS_EN[now.getDay()]} ${now.getDate()} ${PG_MONTHS_EN[now.getMonth()]}`,
  } : null;
  const t = getCurrentTimeParts();
  const time = {
    jp: timeToKana(t.hour, t.minute, t.ampm, 'none'),
    romaji: timeToRomaji(t.hour, t.minute, t.ampm, 'none'),
    en: formatTimeDigital(t.hour, t.minute, t.ampm, 'none'),
  };
  return { hello, date, time };
}

function renderProverbGreeting() {
  const el = document.getElementById('proverb-greeting');
  if (!el) return;
  const g = buildGreetingParts(new Date());
  const line = (part, cls) => part ? `<div class="pg-line ${cls}" data-say="${part.jp}"><div class="pg-jp">${markSmallKana(part.jp)}</div><div class="pg-sub">${part.romaji} · <span class="pg-en">${part.en}</span></div></div>` : '';
  el.innerHTML = line(g.hello, 'pg-hello') + line(g.date, 'pg-date') + line(g.time, 'pg-time');
  el.querySelectorAll('.pg-line').forEach(l => { l.onclick = () => speakJapanese(l.dataset.say); });
}

function renderProverbSentence() {
  const el = document.getElementById('proverb-sentence');
  if (!el) return;
  let last = null;
  try { last = localStorage.getItem(SG_LAST_KEY); } catch (e) { last = null; }
  let lines = null;
  for (let i = 0; i < 10; i++) { lines = sgGenerate(); if (lines && lines[0].jp !== last) break; }
  if (!lines) { el.style.display = 'none'; return; }
  el.style.display = '';
  try { localStorage.setItem(SG_LAST_KEY, lines[0].jp); } catch (e) { /* fine */ }
  el.innerHTML = '<div class="proverb-sentence-label">' + (lines.length > 1 ? 'A short exchange' : 'A sentence to read') + '</div>' +
    lines.map(l => `<div class="sg-line" data-say="${sayParticles(l.jp)}"><div class="sg-jp">${markSmallKana(l.jp)}</div><div class="sg-ro">${l.ro}</div><div class="sg-en">${l.en}</div></div>`).join('');
  el.querySelectorAll('.sg-line').forEach(l => { l.onclick = () => speakJapanese(l.dataset.say); });
}

// Each panel gets its own colour from the slot palette, picked at random
// every time (2026-10-22), so the card looks a little different each day.
const DAILY_COLOURS = ['--slot-1', '--slot-2', '--slot-3', '--slot-4', '--slot-5', '--slot-6'];

function showDailyCard() {
  const overlay = document.getElementById('proverb-overlay');
  if (!overlay) return;
  const [c1, c2] = shuffle([...DAILY_COLOURS]);
  const g = document.getElementById('proverb-greeting'), sn = document.getElementById('proverb-sentence');
  if (g) g.style.setProperty('--pc', `var(${c1})`);
  if (sn) sn.style.setProperty('--pc', `var(${c2})`);
  renderProverbGreeting();
  renderProverbSentence();
  clearInterval(proverbGreetingTimer);
  proverbGreetingTimer = setInterval(renderProverbGreeting, 20000); // keeps the time current while open
  overlay.classList.add('show');
}

function dismissProverbOverlay() {
  const overlay = document.getElementById('proverb-overlay');
  if (overlay) overlay.classList.remove('show');
  clearInterval(proverbGreetingTimer);
}

// Tapping "日本語" in the header shows the daily card again on demand, with
// a fresh sentence - without counting as today's showing.
function triggerSpontaneousProverbs() { showDailyCard(); }
