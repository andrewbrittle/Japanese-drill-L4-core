// Japanese - the grammar pages (2026-11-08, step 7 of the move onto the
// core): the Grammar and Build tabs, the grammar cards and notes (their
// words are in ja/grammar.js), and the Level 3 sentence-order card that
// builds an example and steps through it. Loaded before ja/legacy.js.

// Grammar notes hub - single entry point for every cross-cutting sentence/
// particle rule, gathered together from where they used to be scattered
// (see the "Grammar notes hub" comment in buildMatchCategoryList). Only
// grammar-rule cards live here - reference cards that are genuinely about
// one specific word list (zodiac clock, days-in-order, counters) stay
// attached to their own category, since a hub would just add an extra tap
// to something that's already exactly where you'd look for it.
function showGrammarNotesHub() {
  const list = renderGrammarHub(2);
  // The two external notes docs (sentence structure, Japanese vs English)
  // used to be Andrew-only, appended directly in buildMatchCategoryList
  // rather than living here - Andrew originally wanted them kept out of
  // Level 2's view since most of this tagging/merging mechanism wasn't in
  // place yet and the old Andrew/Trip staging split was still active. That
  // reasoning no longer applies now that every word is properly curated or
  // encountered and gated by the single Untaught toggle, so as of
  // 2026-08-31 they moved here instead, gated by showUntaught rather than
  // by which tab you're on - visible on Level 2 (where this hub lives) the
  // moment Untaught vocabulary is switched on, gone again the moment it's
  // off. They point at standalone HTML notes living alongside index.html
  // (kept as separate documents, not part of the app's own reference-screen
  // system, since Andrew publishes them separately on GitHub too) - opened
  // in a new tab so drilling progress/state in the app itself isn't lost.
  if (appSettings.showUntaught) {
    const sentenceNoteCard = document.createElement('a');
    sentenceNoteCard.className = 'vocab-ref-card';
    sentenceNoteCard.href = './sentence-structure-notes.html';
    sentenceNoteCard.target = '_blank';
    sentenceNoteCard.rel = 'noopener';
    sentenceNoteCard.innerHTML = `<span>Notes: Japanese sentence structure</span><span class="vocab-ref-arrow">→</span>`;
    list.appendChild(sentenceNoteCard);

    const jpEnNoteCard = document.createElement('a');
    jpEnNoteCard.className = 'vocab-ref-card';
    jpEnNoteCard.href = './japanese-vs-english-notes.html';
    jpEnNoteCard.target = '_blank';
    jpEnNoteCard.rel = 'noopener';
    jpEnNoteCard.innerHTML = `<span>Notes: Japanese vs English structure</span><span class="vocab-ref-arrow">→</span>`;
    list.appendChild(jpEnNoteCard);
  }
  showScreen('vocab-reference');
}

// Not drawn from an existing vocab category (there isn't a "names" one in
// the app) - same kind of small bespoke pool as COUNTER_QUIZ_NOUNS or
// ZODIAC_HOURS earlier this session, built specifically to support this
// feature. Ten of the most common Japanese surnames, with さん attached in
// the jp/romaji forms since referring to a third person by bare surname
// without it reads as unnaturally blunt - textbooks always teach it as one
// unit. isName marks these so the English builder below skips the "the"/
// "a" article that occupations and "friend" get, and keeps the capital S
// in "-san" rather than lowercasing it mid-sentence.
const SENTENCE_NAME_POOL = [
  { jp: 'さとうさん', romaji: 'satou-san', en: 'Satou-san', isName: true },
  { jp: 'すずきさん', romaji: 'suzuki-san', en: 'Suzuki-san', isName: true },
  { jp: 'たかはしさん', romaji: 'takahashi-san', en: 'Takahashi-san', isName: true },
  { jp: 'たなかさん', romaji: 'tanaka-san', en: 'Tanaka-san', isName: true },
  { jp: 'わたなべさん', romaji: 'watanabe-san', en: 'Watanabe-san', isName: true },
  { jp: 'いとうさん', romaji: 'itou-san', en: 'Itou-san', isName: true },
  { jp: 'やまもとさん', romaji: 'yamamoto-san', en: 'Yamamoto-san', isName: true },
  { jp: 'なかむらさん', romaji: 'nakamura-san', en: 'Nakamura-san', isName: true },
];

// ==== LEVEL 3 GRAMMAR NOTES (2026-09-29) ====
// Level 3's own Grammar notes hub, shown above the L3 category list the same
// way showGrammarNotesHub is for L2 (see buildMatchCategoryList). Deliberately
// separate L3 cards rather than edits to the L2 ones, so each level's notes
// line up with Andrew's class notes for that level: where an L3 card extends
// an L2 one (を, Sentence order), the L2 card just gets a one-line pointer
// here. Back from any card below returns to this hub via the
// 'grammar-notes-hub-l3' target (see closeVocabReference).
function showGrammarNotesHubL3() {
  renderGrammarHub(3);
  showScreen('vocab-reference');
}

// GRAMMAR NOTES AS DATA (2026-10-12) - hubs and plain cards come from
// grammar.js (window.JP_DRILL_GRAMMAR); see the note at the top of that file.
const GRAMMAR = window.JP_DRILL_GRAMMAR || { hubs: {}, cards: {} };

function renderGrammarHub(level) {
  const hub = GRAMMAR.hubs[level] || { title: 'Grammar notes', entries: [] };
  vocabRefBackTarget = 'match-settings';
  document.getElementById('vocab-ref-title').textContent = hub.title;
  const list = document.getElementById('vocab-ref-list');
  list.className = '';
  list.innerHTML = '';
  hub.entries.forEach(entry => {
    const fn = entry.card ? () => showGrammarCard(entry.card) : window[entry.fn];
    if (typeof fn !== 'function') return;
    const card = document.createElement('div');
    card.className = 'vocab-ref-card';
    card.innerHTML = `<span>${entry.label}</span><span class="vocab-ref-arrow">→</span>`;
    card.onclick = fn;
    list.appendChild(card);
  });
  return list;
}

// GRAMMAR PAGE (2026-10-15, Andrew): the Grammar pill on the Vocab screen.
// Sentence-building cards first ("top" entries, Level 3 then Level 2, plus
// Desk sheets), then every other note newest first by its "added" date, so
// the latest grammar covered is always near the top. Each shows its level.
function renderGrammarPage() {
  const view = document.getElementById('match-grammar-view');
  if (!view) return;
  view.innerHTML = '';
  const all = [];
  [4, 3, 2].forEach(lvl => ((GRAMMAR.hubs[lvl] || {}).entries || []).forEach((e, i) => all.push(Object.assign({ lvl, order: all.length }, e))));
  const head = text => { const h = document.createElement('div'); h.className = 'grammar-page-head'; h.textContent = text; view.appendChild(h); };
  const card = (label, lvl, onclick, sub) => {
    const c = document.createElement('div');
    c.className = 'vocab-ref-card grammar-page-card';
    // "Inviting — ませんか / ましょう": topic bold, the rest after " — " lighter.
    const cut = label.indexOf(' — ');
    const labelHtml = cut > 0 ? `${label.slice(0, cut)}<span class="gp-label-rest"> — ${label.slice(cut + 3)}</span>` : label;
    c.innerHTML = `<span class="gp-text"><span class="gp-label">${labelHtml}</span>${sub ? `<span class="gp-sub">${sub}</span>` : ''}</span>`
      + `${lvl ? `<span class="gp-lvl gp-lvl-${lvl}">L${lvl}</span>` : ''}<span class="vocab-ref-arrow">→</span>`;
    c.onclick = onclick;
    view.appendChild(c);
  };
  const open = e => e.card ? () => showGrammarCard(e.card) : () => { const fn = window[e.fn]; if (typeof fn === 'function') fn(); };
  // Sentence building moved to its own tab, 作文 (2026-10-23) - renderBuildPage.
  head('Grammar notes — newest first');
  all.filter(e => !e.top).sort((a, b) => (b.added || '').localeCompare(a.added || '') || a.order - b.order)
    .forEach(e => card(e.label, e.lvl, open(e)));
  // TABLES (2026-11-05, Andrew): the pattern tables collected in one place -
  // the same screens still open from their own word lists and the すうじ tab.
  // Back from here returns to the Grammar page.
  head('Tables');
  [['Day / week / month / year — せん, こん, らい…', 2, showTimeUnitsReference],
   ['Minute endings — ふん / ぷん, 1–10', 2, showMinuteReference],
   ['Days of the month — ついたち, ふつか… はつか', 2, showDaysOfMonthReference],
   ['Counters — people, objects, animals', 0, showItemCountersReference],
   ['Counting time — minutes, hours, days, weeks, months, years', 0, showCountersReference],
  ].forEach(([label, lvl, fn]) => card(label, lvl, () => { fn(); vocabRefBackTarget = 'grammar-notes-hub'; }));
  // The two standalone notes pages, as before only with Untaught switched on.
  if (appSettings.showUntaught) {
    [['./sentence-structure-notes.html', 'Notes: Japanese sentence structure'], ['./japanese-vs-english-notes.html', 'Notes: Japanese vs English structure']].forEach(([href, label]) => {
      const a = document.createElement('a');
      a.className = 'vocab-ref-card grammar-page-card'; a.href = href; a.target = '_blank'; a.rel = 'noopener';
      a.innerHTML = `<span class="gp-text"><span class="gp-label">${label.replace('Notes: ', 'Notes<span class="gp-label-rest"> — ') + '</span>'}</span></span><span class="vocab-ref-arrow">→</span>`;
      view.appendChild(a);
    });
  }
}

function showGrammarPage() {
  showScreen('grammar');
  renderGrammarPage();
}

// 作文 TAB (2026-10-23): the Sentence builder and its part scores, Sentence
// order (the grammar hub's "top" entries) and the Desk sheets. Same card
// style as the Grammar page.
function showBuildPage() {
  showScreen('build');
  renderBuildPage();
}

function renderBuildPage() {
  const view = document.getElementById('build-view');
  if (!view) return;
  view.innerHTML = '';
  const head = text => { const h = document.createElement('div'); h.className = 'grammar-page-head'; h.textContent = text; view.appendChild(h); };
  const card = (label, lvl, onclick, sub) => {
    const c = document.createElement('div');
    c.className = 'vocab-ref-card grammar-page-card';
    const cut = label.indexOf(' — ');
    const labelHtml = cut > 0 ? `${label.slice(0, cut)}<span class="gp-label-rest"> — ${label.slice(cut + 3)}</span>` : label;
    c.innerHTML = `<span class="gp-text"><span class="gp-label">${labelHtml}</span>${sub ? `<span class="gp-sub">${sub}</span>` : ''}</span>`
      + `${lvl ? `<span class="gp-lvl gp-lvl-${lvl}">L${lvl}</span>` : ''}<span class="vocab-ref-arrow">→</span>`;
    c.onclick = onclick;
    view.appendChild(c);
  };
  // (2026-10-23, Andrew) The references first, a fine line, then the two
  // ways to practise - the builder (free) and the challenge (tested), with
  // the challenge's part scores under it.
  [4, 3, 2].forEach(lvl => ((GRAMMAR.hubs[lvl] || {}).entries || []).filter(e => e.top).forEach(e =>
    card(e.label, lvl, e.card ? () => showGrammarCard(e.card) : () => { const fn = window[e.fn]; if (typeof fn === 'function') fn(); })));
  card('Desk sheets', null, showDeskSheets, 'Printable word lists for putting sentences together yourself');
  view.insertAdjacentHTML('beforeend', '<div class="section-divider build-divider"></div>');
  card('Sentence builder', null, () => showSentenceBuilder(false), 'Tap a word from each column to make any sentence, and hear it');
  card('Sentence challenge', null, () => showSentenceBuilder(true), 'An English sentence to build in Japanese, checked part by part');
  const partsHtml = sbPartsPanelHtml(false);
  if (partsHtml) view.insertAdjacentHTML('beforeend', partsHtml);
  card('Answer it', null, () => showSentenceBuilder('answer'), 'A question in Japanese, like the ones in class — build your answer');
  card('Reading challenge', null, () => showSentenceBuilder('reverse'), 'A Japanese sentence to read: pick the English for each part');
  card('Reading passage', null, showReadingPassage, 'A short diary of someone\'s day to read, then true or false — like the handouts');
  const partsHtmlR = sbPartsPanelHtml(true);
  if (partsHtmlR) view.insertAdjacentHTML('beforeend', partsHtmlR);
}

function showGrammarCard(key) {
  const card = GRAMMAR.cards[key];
  if (!card) return;
  const level = Object.keys(GRAMMAR.hubs).find(l => GRAMMAR.hubs[l].entries.some(e => e.card === key));
  const list = l3RefOpen(card.title);
  vocabRefBackTarget = String(level) === '3' ? 'grammar-notes-hub-l3' : 'grammar-notes-hub';
  card.blocks.forEach(([type, a, b, c, d]) => {
    if (type === 'heading') l3Heading(list, a);
    else if (type === 'note') l3Note(list, a);
    else if (type === 'ex') l3Example(list, a, b, c);
    else if (type === 'two') l3TwoCol(list, a, b, c, d);
    else if (type === 'two-en') {
      const row = document.createElement('div');
      row.className = 'vocab-ref-row two-col minute-row';
      row.innerHTML = `
      <div class="vocab-ref-col-left">
        <div>
          <div class="vocab-ref-jp minute-jp">${markSmallKana(a)}</div>
          <div class="vocab-ref-romaji minute-romaji">${b}</div>
        </div>
      </div>
      <div class="vocab-ref-col-right">
        <div class="vocab-ref-romaji minute-romaji">${c}</div>
        <div class="vocab-ref-romaji minute-romaji">${markSmallKana(d)}</div>
      </div>
    `;
      list.appendChild(row);
    }
  });
  showScreen('vocab-reference');
}

// Small shared builders for the L3 cards below - same row/note styles the
// L2 grammar cards use, just pulled into helpers since there are seven pages.
function l3RefOpen(title) {
  vocabRefBackTarget = 'grammar-notes-hub-l3';
  document.getElementById('vocab-ref-title').textContent = title;
  const list = document.getElementById('vocab-ref-list');
  list.className = 'tight-list';
  list.innerHTML = '';
  return list;
}

function l3Note(list, html) {
  const d = document.createElement('div');
  d.className = 'verb-conj-note';
  // Notes carry their own HTML (<strong>), so markSmallKana (which escapes)
  // can't wrap the whole string - wrap just the small kana characters,
  // which never appear inside a tag. (2026-10-06: notes like "しゅじん and
  // かない" were showing ゅ full size.)
  d.innerHTML = [...String(html)].map(ch => SMALL_KANA_CHARS.has(ch) ? '<span class="small-kana">' + ch + '</span>' : ch).join('');
  list.appendChild(d);
}

function l3Heading(list, text) {
  const d = document.createElement('div');
  d.className = 'verb-conj-heading';
  d.style.marginTop = '0.9rem';
  d.innerHTML = markSmallKana(text); // innerHTML so っ/ゃ/ゅ/ょ in headings get the small-kana span
  list.appendChild(d);
}

// Grammar-card Japanese may carry <strong>/<em> for emphasis (2026-11-06:
// grammar.js "two" rows showed the tags as text). Only those tags pass
// through; everything else is escaped as before.
function markSmallKanaHtml(text) {
  return String(text ?? '').split(/(<\/?(?:strong|em)>)/).map((part, i) => i % 2 ? part : markSmallKana(part)).join('');
}

function l3Example(list, jp, romaji, en) {
  const row = document.createElement('div');
  row.className = 'vocab-ref-row minute-row';
  row.innerHTML = `
    <div class="vocab-ref-jp minute-jp">${markSmallKanaHtml(jp)}</div>
    <div class="vocab-ref-romaji minute-romaji">${romaji}${en ? ' — ' + en : ''}</div>
  `;
  list.appendChild(row);
}

function l3TwoCol(list, leftJp, leftSub, rightJp, rightSub) {
  const row = document.createElement('div');
  row.className = 'vocab-ref-row two-col minute-row';
  row.innerHTML = `
    <div class="vocab-ref-col-left">
      <div>
        <div class="vocab-ref-jp minute-jp">${markSmallKanaHtml(leftJp)}</div>
        <div class="vocab-ref-romaji minute-romaji">${leftSub}</div>
      </div>
    </div>
    <div class="vocab-ref-col-right">
      <div class="vocab-ref-jp minute-jp qneg-example-jp">${markSmallKanaHtml(rightJp)}</div>
      <div class="vocab-ref-romaji minute-romaji">${rightSub}</div>
    </div>
  `;
  list.appendChild(row);
}

// --- Frequency words (L3 Lesson 1) ---
const L3_FREQ_WORDS = [
  { jp: 'いつも', romaji: 'itsumo', en: 'always', neg: false },
  { jp: 'よく', romaji: 'yoku', en: 'often', neg: false },
  { jp: 'ときどき', romaji: 'tokidoki', en: 'sometimes', neg: false },
  { jp: 'あまり', romaji: 'amari', en: 'not often / seldom', neg: true },
  { jp: 'ぜんぜん', romaji: 'zenzen', en: 'never / not at all', neg: true },
];

// --- Sentence order, L3 version (を + object + frequency) ---
// Began as an extension of the L2 "Sentence order (を + object)" card
// (retired 2026-10-15) with a Frequency slot. Tapping Frequency steps through
// the five words and "skipped", and the verb flips to its ません form by
// itself for あまり/ぜんぜん - that automatic flip is the point of the card.
// Object pools are curated per verb (same "no drinking a photograph" idea as
// OBJECT_SENTENCE_VERB_POOLS) and each carries its own natural English
// phrase, since habitual English needs plurals/idioms ("eat apples", "go
// skiing", "take medicine") that can't be derived from the vocab glosses.
// Words are looked up by kana among TAUGHT items, wherever they live - most
// L3 words are tagged forward from L1/L2/trip categories rather than stored
// in the L3 ones.
// (2026-10-07) The Sentence order card's own word list (L3_SENTENCE_VERBS), time
// pool and English helper were removed: the card now draws verbs/objects,
// places, times and frequency words from the daily-sentence engine
// (SG_OBJECT_VERBS, sgTime, sgPlaceTimeOk, sgActTimeOk, SG_FREQ = L3_FREQ_WORDS)
// so both follow one set of rules and grow together.
// A place word, preferring its place meaning: いま is both "now" and "living
// room" (居間), and a place column wants the room (Andrew, 2026-10-22).
function l3PlaceItem(jp) {
  for (const key of Object.keys(VOCAB)) {
    const hit = VOCAB[key].items.find(i => i.jp === jp && (i.tags || []).includes('taught') && (i.tags || []).some(t => /^places/.test(t)));
    if (hit) return hit;
  }
  return l3TaughtItem(jp);
}

function l3TaughtItem(jp) {
  for (const key of Object.keys(VOCAB)) {
    const hit = VOCAB[key].items.find(i => i.jp === jp && (i.tags || []).includes('taught'));
    if (hit) return hit;
  }
  return null;
}

// Location (2026-10-06, Lesson 2 = place で): picked to suit the verb AND
// object, from the daily sentence generator's own place lists
// (SG_OBJECT_VERBS) - it used to be any Places-to-go word, so "eat sushi at
// the bank" was possible once Location was switched on. Objects with no
// listed place fall back to うち for verbs that are fine at home, and are
// skipped otherwise (so golf/karaoke just don't come up here).
const L3_HOME_OK_VERBS = ['たべます', 'のみます', 'みます', 'ききます', 'よみます', 'かきます'];

function l3PlacesFor(verbJp, objJp) {
  const set = new Set();
  SG_OBJECT_VERBS.forEach(e => {
    if (e.v === verbJp && e.objs.some(o => o[0] === objJp)) e.places.forEach(p => set.add(p));
  });
  let places = [...set].filter(p => SG_PLACE_EN[p] && !SG_PLACE_EN[p][1] && l3TaughtItem(p));
  if (!places.length && L3_HOME_OK_VERBS.includes(verbJp) && l3TaughtItem('うち')) places = ['うち'];
  return places.map(p => Object.assign({}, l3TaughtItem(p), { atEn: SG_PLACE_EN[p][0] }));
}

// ==== SENTENCE ORDER, LEVEL 3 - the combined card (2026-10-07) ====
// Replaces the Level 3 "を + object + frequency" card. One card for the whole
// basic sentence, in the class order (handout, Lesson 2):
//   Topic は → Time → Frequency → Companion と → Place で / Means で →
//   Object を / Destination に → Verb
// with a switch between "Doing something" (place + object) and "Going
// somewhere" (means + destination), since the two don't mix at this level.
// Every word comes from the daily-sentence engine (sgSubject, sgTime,
// sgCompanion, SG_OBJECT_VERBS, SG_DEST, SG_TRANSPORT and their rules), so
// the card and the daily sentence always agree and grow together.
// Tense follows the time word (きのう -> ました, あした -> ます "going to");
// a frequency word means habitual, so turning Frequency on picks a habitual
// time word. Slots cycle on / skipped / asked as a question; Frequency steps
// through the five words; the verb toggles か.
const L3C_SLOTS = {
  do: [
    { role: 'Topic (who)', particle: 'は', q: ['だれ', 'dare', 'が', 'ga'], note: 'who it\'s about' },
    { role: 'Time (when)', q: ['いつ', 'itsu', '', ''], note: 'に after a day (にちようびに) — no particle after あした, きのう, まいにち, あさ…' },
    { role: 'Frequency (how often)', note: 'no particle — あまり and ぜんぜん turn the verb negative' },
    { role: 'Companion (with whom)', particle: 'と', q: ['だれ', 'dare', 'と', 'to'], note: 'who with — ひとりで for "on my own"' },
    { role: 'Place or tool (where / with what)', particle: 'で', q: ['どこ', 'doko', 'で', 'de'], qTool: ['なん', 'nan', 'で', 'de'], note: 'where it happens — or what it\'s done with: はしで, ペンで, えいごで (in English)' },
    { role: 'Object (what)', particle: 'を', q: ['なに', 'nani', 'を', 'o'], note: 'the thing being eaten, drunk, watched, done…' },
    { role: 'Verb', note: 'tense follows the time word — tap for か, ませんか, ましょう' },
  ],
  go: [
    { role: 'Topic (who)', particle: 'は', q: ['だれ', 'dare', 'が', 'ga'], note: 'who it\'s about' },
    { role: 'Time (when)', q: ['いつ', 'itsu', '', ''], note: 'に after a day (にちようびに) — no particle after あした, きのう, まいにち, あさ…' },
    { role: 'Frequency (how often)', note: 'no particle — あまり and ぜんぜん turn the verb negative' },
    { role: 'Companion (with whom)', particle: 'と', q: ['だれ', 'dare', 'と', 'to'], note: 'who with — ひとりで for "on my own"' },
    { role: 'Means (how)', particle: 'で', q: ['なに', 'nani', 'で', 'de'], note: 'by train, by bus, by bike…' },
    { role: 'Destination (where to)', particle: 'に', q: ['どこ', 'doko', 'に', 'ni'], note: 'where you\'re going — へ also works' },
    { role: 'Verb', note: 'tense follows the time word — tap for か, ませんか, ましょう' },
  ],
  // Giving & receiving (L3 Lesson 4, 2026-10-20). Same seven slot positions
  // (so colours and Step through line up), but slot 4 isn't used: it stays
  // 'off' and its row is hidden. Slot 3 is the other person, with に.
  // Lesson 6 (2026-11-03): slot 4 is now used too - means で (メールで, にほんごで), off by default.
  give: [
    { role: 'Topic (who)', particle: 'は', q: ['だれ', 'dare', 'が', 'ga'], note: 'who it\'s about' },
    { role: 'Time (when)', q: ['いつ', 'itsu', '', ''], note: 'に after a day or an occasion (たんじょうびに, クリスマスに) — none after あした, きのう…' },
    { role: 'Frequency (how often)', note: 'no particle — あまり and ぜんぜん turn the verb negative' },
    { role: 'Person (to / from whom)', particle: 'に', q: ['だれ', 'dare', 'に', 'ni'], note: 'に = <strong>to</strong> with あげます, かします, おしえます; <strong>from</strong> with もらいます, かります, ならいます' },
    { role: 'With what (means)', particle: 'で', q: ['なん', 'nan', 'で', 'de'], note: 'by email, on the phone, in Japanese — メールで, スマホで, にほんごで (writing, sending, phoning)' },
    { role: 'Object (what)', particle: 'を', q: ['なに', 'nani', 'を', 'o'], note: 'the present, the thing lent, the subject taught…' },
    { role: 'Verb', note: 'tense follows the time word — tap for か' },
  ],
  // Being (2026-10-24): "X is Y". Slots 2-4 aren't used; 5 is what they are
  // / what it's like, always there; the verb is です and its endings.
  // L4 (2026-11-04): slot 2 is とても / あまり, slot 4 a describing word before
  // a noun (しんせつな ひと) - both off until tapped.
  being: [
    { role: 'Topic (who / what)', particle: 'は', q: ['だれ', 'dare', 'が', 'ga'], note: 'a person — or a thing or place to describe' },
    { role: 'Time (when)', note: 'いま, きょねん, らいねん — no particle; goes with jobs (きょねん → でした)' },
    { role: 'How much (とても / あまり)', note: 'とても = very · あまり + a negative = not very' },
    { role: '', hidden: true, note: '' },
    { role: 'Describing word (+ a noun)', particle: 'な', note: 'before a noun: しんせつな ひと, にぎやかな まち — な-words add な, い-words don\'t' },
    { role: 'What they are / what it\'s like', fixed: true, note: 'a job, a nationality (〜じん) or a describing word — then です' },
    { role: 'です', note: 'です / じゃありません / でした / じゃありませんでした — い-words: 〜くないです, 〜かったです — tap for か' },
  ],
};

let l3cMode = 'do';

let l3cBeingDegree = 'とても'; // Being's slot 2 when on: とても or あまり (L4)

let l3SentStates = ['on', 'on', 'off', 'on', 'on', 'on', 'stmt'];

let l3FreqIdx = 0;

let l3SentWords = null;

function showL3SentenceOrderReference() {
  const list = l3RefOpen('Sentence order');
  l3SentStates = ['on', 'on', 'off', 'on', 'on', 'on', 'stmt'];
  l3FreqIdx = 0;

  const modeRow = document.createElement('div');
  modeRow.className = 'level-filter-row';
  modeRow.id = 'l3c-mode-row';
  list.appendChild(modeRow);

  const hint = document.createElement('div');
  hint.className = 'sentence-structure-hint';
  hint.textContent = 'Tap a slot to include it, skip it, or ask it as a question. Frequency steps through いつも → よく → ときどき → あまり → ぜんぜん → skipped. The verb steps through statement → question → もう (already) → もう…か (yet?) → invitation (ませんか) → "let\'s" (ましょう) — no inviting for giving, and statement and question only for being.';
  list.appendChild(hint);

  const rowsWrap = document.createElement('div');
  rowsWrap.id = 'sentence-structure-rows';
  list.appendChild(rowsWrap);

  const example = document.createElement('div');
  example.className = 'sentence-structure-example';
  example.innerHTML = `
    <div class="sentence-structure-example-jp" id="sentence-structure-example-jp"></div>
    <div class="sentence-structure-example-romaji" id="sentence-structure-example-romaji"></div>
    <div class="sentence-structure-example-en" id="sentence-structure-example-en"></div>
  `;
  list.appendChild(example);

  const shuffleBtn = document.createElement('button');
  shuffleBtn.className = 'sentence-shuffle-btn';
  shuffleBtn.textContent = '🔀 Try another example';
  shuffleBtn.onclick = shuffleL3SentenceExample;
  const playBtn = document.createElement('button');
  playBtn.className = 'sentence-shuffle-btn l3c-play-btn';
  playBtn.id = 'l3c-play-btn';
  playBtn.textContent = '▶ Step through';
  playBtn.onclick = l3cTogglePlay;
  list.appendChild(playBtn);
  list.appendChild(shuffleBtn);

  l3Note(list, 'One order for doing and going: <strong>who → when → how often → with whom → where / how → what / where to → verb</strong>. Doing something uses place で + object を; going somewhere uses means で + destination に (or へ). Anything you skip just drops out — the order of the rest never changes.');
  l3Note(list, 'で has two jobs in a Doing sentence: where it happens (<strong>としょかんで</strong> よみます) or what it\'s done with — a tool or a language (<strong>はしで</strong> たべます, <strong>えいごで</strong> かきます). The question is どこで for a place, <strong>なんで</strong> for a tool. One or the other here, in the same spot.');
  l3Note(list, '<strong>もう</strong> (Lesson 6): もう 〜ましたか = have you … yet? — answer はい、もう 〜ました or いいえ、まだです (never 〜ませんでした). もう sits where How often goes, the verb is always 〜ました, and the time word is きょう, こんしゅう, こんげつ or ことし: こんしゅう もう スーパーへ いきましたか.');
  l3Note(list, 'Giving can say how, too (Lesson 6): <strong>メールで</strong> レポートを おくります, <strong>にほんごで</strong> てがみを かきます, <strong>スマホで</strong> でんわを かけます. Tap the "With what" row to add it.');
  l3Note(list, 'Put the companion after the topic: わたしは あねと デパートへ いきます, never ✗ わたしと あねは… The time word sets the tense: きのう → いきました, あした → いきます ("going to").');
  l3Note(list, 'Giving &amp; receiving: <strong>who → when → how often → to / from whom に → what を → verb</strong>. に means "to" with あげます, かします, おしえます, かきます, おくります and でんわを かけます, and "from" with もらいます, かります, ならいます. Nobody あげます to わたし — say it the other way round with もらいます: わたしは ともだちに はなを もらいました.');
  l3Note(list, 'Being, Level 4: い-words change their own ending — おもしろ<strong>くない</strong>です (isn\'t), おもしろ<strong>かった</strong>です (was), いい → <strong>よくない</strong>です. Before a noun, な-words add な: <strong>しずかな</strong> まち, <strong>しんせつな</strong> ひと; い-words don\'t: おもしろい ひと. とても = very; あまり + a negative = not very: あまり おもしろくないです. Tap the How much and Describing rows to add them.');
  l3Note(list, 'Being — "X is Y": <strong>who / what は → (when) → what they are / what it\'s like → です</strong>. A job (あには いしゃです), a nationality (〜じん) or a describing word (えいがは おもしろいです). です changes for the tense: じゃありません (isn\'t), でした (was), じゃありませんでした (wasn\'t). い-words like おもしろい change their own ending instead (see the Level 4 note above).');
  l3Note(list, 'Going somewhere also uses きます (come) where "come" fits — to my house, to school, to a party: たなかさんは うちに きます. Invitations always use いきます.');
  l3Note(list, 'Romaji: を is written "o" here, as it\'s said. Level 2 wrote it "wo", as it was taught then — same particle, same sound.');

  renderL3ModeRow();
  pickFreshL3SentenceWords();
  renderL3SentenceRows();
  renderL3SentenceExample();
  showScreen('vocab-reference');
}

function renderL3ModeRow() {
  const row = document.getElementById('l3c-mode-row');
  if (!row) return;
  row.innerHTML = '';
  [['do', 'Doing'], ['go', 'Going'], ['give', 'Giving'], ['being', 'Being']].forEach(([key, label]) => {
    const btn = document.createElement('button');
    btn.className = 'level-pill' + (key === l3cMode ? ' active' : '');
    btn.textContent = label;
    btn.onclick = () => {
      if (l3cMode === key) return;
      const before = L3C_SLOTS[l3cMode];
      l3cMode = key;
      // Slots this mode doesn't use go off; ones it uses again come back on
      // (Frequency stays as it was, off by default).
      L3C_SLOTS[key].forEach((sl, i) => {
        if (sl.hidden) l3SentStates[i] = 'off';
        else if (before[i] && before[i].hidden) l3SentStates[i] = i === 2 ? 'off' : 'on';
      });
      // Giving's means で starts off (only some verbs have one); back to the place slot on.
      if (key === 'give') l3SentStates[4] = 'off';
      else if (before === L3C_SLOTS.give && l3SentStates[4] === 'off') l3SentStates[4] = 'on';
      if (l3cMou() && (key === 'being')) l3SentStates[6] = 'stmt';
      if (key === 'being') { l3SentStates[5] = 'on'; l3SentStates[2] = 'off'; l3SentStates[4] = 'off'; if (l3SentStates[1] === 'q') l3SentStates[1] = 'on'; }
      else if (before === L3C_SLOTS.being) { l3SentStates[2] = 'off'; l3SentStates[4] = key === 'give' ? 'off' : 'on'; }
      if ((key === 'give' || key === 'being') && l3cInviting()) l3SentStates[6] = 'stmt';
      renderL3ModeRow(); shuffleL3SentenceExample();
    };
    row.appendChild(btn);
  });
}

// Segments from the engine come as 'ともだち の' / 'tomodachi no'; the card
// attaches particles to their word in kana (ともだちの) as the other cards do.
const l3cJp = s => s.jp.replace(/ (は|の|と|で|に|を|が|へ)$/, '$1').replace(/ (の) /g, '$1');

function l3cSubjectSegs(subj) {
  return subj.segs.length ? subj.segs : [sgSeg('わたし', 'は', 'wa')];
}

// Picks words for the current mode. Tense: habitual when Frequency is on,
// otherwise any of habitual / past / future (the time word decides).
// A question never has わたし as its topic (you'd be asking about yourself,
// and はは/ちち companions only make sense for わたし), and never uses
// あまり/ぜんぜん: a negative question (いきませんか) is an invitation, "won't you
// come?", not a question about habits.
const L3C_MOU_TIMES = { きょう: 'today', こんしゅう: 'this week', こんげつ: 'this month', ことし: 'this year' };

// Which "this …" suits a もう sentence: everyday things today / this week,
// outings this week / month, day trips and presents this month / year.
function l3cMouTime(w) {
  let pool;
  if (w.mode === 'go') pool = w.kind === 'daytrip' ? ['こんげつ', 'ことし'] : ['outing', 'event', 'bar', 'church'].includes(w.kind) ? ['こんしゅう', 'こんげつ'] : ['きょう', 'こんしゅう'];
  else if (w.mode === 'give') pool = w.G.gift ? ['こんげつ', 'ことし'] : ['きょう', 'こんしゅう'];
  else pool = w.V.outing ? ['こんしゅう', 'こんげつ', 'ことし'] : ['きょう', 'こんしゅう'];
  const jp = sgPick(pool.filter(j => sgW(j)));
  return jp ? { seg: sgSeg(jp), en: L3C_MOU_TIMES[jp], jp, t: {} } : null;
}

function pickFreshL3SentenceWords() {
  if (l3cMou() && l3cMode !== 'being') {
    // もう: past, no frequency word, nothing asked.
    l3SentStates[2] = 'off';
    [0, 1, 3, 4, 5].forEach(i => { if (l3SentStates[i] === 'q') l3SentStates[i] = 'on'; });
  }
  if (l3cIsQ() && l3SentStates[2] === 'on' && L3_FREQ_WORDS[l3FreqIdx].neg) l3FreqIdx = 0;
  const freqOn = l3SentStates[2] === 'on';
  const freq = freqOn ? L3_FREQ_WORDS[l3FreqIdx] : null;
  const inviting = l3cInviting();
  for (let tries = 0; tries < 120; tries++) {
    const tense = inviting ? 'fut' : l3cMou() ? 'past' : freqOn ? 'hab' : sgPick(['hab', 'hab', 'past', 'fut']);
    const w = l3cMode === 'being' ? beingPick({ needTime: l3SentStates[1] === 'on' && l3SentStates[2] !== 'on' && sgChance(0.7), person: l3SentStates[0] === 'q', adjNoun: l3SentStates[4] === 'on', degree: l3SentStates[2] === 'on' ? l3cBeingDegree : null })
      : l3cMode === 'do' ? l3cPickDo(tense, freq) : l3cMode === 'give' ? l3cPickGive(tense, freq) : l3cPickGo(tense, freq);
    if (w && l3cMou() && w.mode !== 'being') { if (w.V && w.V.once) continue; w.time = l3cMouTime(w); if (!w.time) continue; }
    if (w && !(l3cIsQ() && w.subj.me) && l3cComeOk(w) && l3cPhoneOk(w)) { l3SentWords = w; return; }
  }
}

function l3cPickDo(tense, freq) {
  const entries = SG_OBJECT_VERBS.filter(V => !V.intrans && !V.routine && !V.workObj && sgW(V.v) && !(tense === 'hab' && V.once)
    && !(freq && V.outing) && V.objs.some(o => sgW(o[0])));
  const V = sgPick(entries);
  if (!V) return null;
  let places = V.places.filter(p => sgW(p));
  if (!places.length && L3_HOME_OK_VERBS.includes(V.v) && sgW('うち')) places = ['うち'];
  if (!places.length) return null;
  let subj = sgSubject({ famFilter: m => !(V.adult && m.child) });
  if (V.adult && subj.child) return null;
  const time = sgTime(tense, (jp, t) => sgActTimeOk(V, jp, t, tense) && !(freq && freq.neg && SG_DAYS.some(d => d[0] === jp))
    && places.some(p => sgPlaceTimeOk(p, jp, t)), { freq: !!freq, l6: true });
  if (!time) return null;
  const okPlaces = places.filter(p => sgPlaceTimeOk(p, time.jp, time.t) && !(SG_PLACE_EN[p][1] && !subj.me)
    && !((subj.elderly || subj.child) && SG_PLACE_WORK.includes(p)));
  if (!okPlaces.length) return null;
  const place = sgPick(okPlaces);
  const o = sgPick(V.objs.filter(x => sgW(x[0])));
  const comp = sgCompanion(subj, place, !!V.adult, SG_PLACE_WORK.includes(place));
  // Tool で (Lesson 5): half the time, when the verb and object have one.
  const tools = sgToolsFor(V, o);
  const tool = tools.length && sgChance(0.5) ? sgPick(tools) : null;
  return {
    mode: 'do', tense, subj, time, comp, V, o,
    slot4: tool ? { seg: sgSeg(tool, 'で', 'de'), en: SG_TOOLS[tool], tool: true } : { seg: sgSeg(place, 'で', 'de'), en: sgPlaceEn(place) },
    slot5: { seg: sgSeg(o[0], 'を', 'o') },
    verb: V.v,
    phrase: sgActPhrase(V, o, tense),
    phraseQ: V.phrase ? 'do' : (V.futHave && tense !== 'hab' ? 'have' : V.en), // "What do you eat?"
  };
}

// きます (2026-10-15, from the retired Level 2 motion card): "come" only
// suits a place the speaker is at or is hosting - my house, school, a party.
// Never with わたし or the speaker's own family as the subject ("my mother
// comes to my house"), and never in an invitation (きませんか means "won't
// you come?", not "why don't we...?"). [English, kind for the time rules]
const L3C_COME_DEST = { うち: ['to my house', 'outing'], がっこう: ['to school', 'work'], パーティー: ['to the party', 'event', 'to parties'] };

// With no topic, a statement means "I": "I come to my house" makes no sense,
// so うち + きます needs a topic or a question. Checked again whenever a slot
// is tapped, since turning the topic off doesn't pick new words by itself.
const l3cPhoneOk = w => !(w && w.G && w.G.phone && l3SentStates[5] === 'q');

const l3cComeOk = w => !(w && w.verb === 'きます' && w.dest === 'うち' && l3SentStates[0] !== 'on' && !l3cIsQ());

function l3cPickGo(tense, freq) {
  const subj = sgSubject();
  const come = !l3cInviting() && !subj.me && !/^my (?!friend)/i.test(subj.en || '') && sgW('きます') && sgChance(0.1); // only used briefly in one lesson, so kept rare (Andrew)
  const ok = Object.entries(come ? L3C_COME_DEST : SG_DEST).filter(([jp, v]) => sgW(jp) && sgDestSubjOk(jp, v[1], subj)
    && !(freq && ['outing', 'daytrip', 'event'].includes(v[1]) && freq.jp === 'いつも'));
  const pick = sgPick(ok);
  if (!pick) return null;
  const [dest, [destEn0, kind, habEn]] = pick;
  const destEn = habEn && tense === 'hab' ? habEn : destEn0; // "often comes to parties"
  if (freq && kind === 'work') return null;
  const time = sgTime(tense, (jp, t) => sgDestTimeOk(kind, jp, t, tense, freq), { freq: !!freq, l6: true });
  if (!time) return null;
  const tr = sgPick(SG_TRANSPORT.filter(t => sgW(t[0]) && !t[2] && !(subj.child && ['くるま', 'バイク'].includes(t[0]))));
  if (!tr) return null;
  const comp = sgCompanion(subj, dest, kind === 'bar', kind === 'work');
  return {
    mode: 'go', tense, subj, time, comp, dest, kind,
    slot4: { seg: sgSeg(tr[0], 'で', 'de'), en: tr[1] },
    slot5: { seg: sgSeg(dest, 'に', 'ni'), en: destEn },
    verb: come ? 'きます' : 'いきます',
    phrase: (come ? 'come ' : 'go ') + destEn,
    phraseQ: come ? 'come' : 'go',
  };
}

// GIVING & RECEIVING (L3 Lesson 4, 2026-10-20): Topic は, Time, Frequency,
// Person に, Object を, Verb. Each verb: English (base word), the preposition
// its に turns into ('to' / 'from'; '' for phone, where English has none),
// whether English needs "it" when the object is skipped, the tenses it suits
// (lending isn't a habit; gifts are habitual only on an occasion), and its
// objects as [kana, habitual English, one-off English].
const L3C_GIFTS = [['はな', 'flowers', 'flowers'], ['ほん', 'books', 'a book'], ['チョコレート', 'chocolate', 'chocolate'], ['ケーキ', 'cakes', 'a cake'],
  ['CD', 'CDs', 'a CD'], ['カード', 'cards', 'a card'], ['ぼうし', 'hats', 'a hat'], ['とけい', 'watches', 'a watch'], ['かばん', 'bags', 'a bag'],
  ['ハンカチ', 'handkerchiefs', 'a handkerchief'], ['おかし', 'sweets', 'sweets'], ['シャツ', 'shirts', 'a shirt'], ['マグカップ', 'mugs', 'a mug'],
  ['ぬいぐるみ', 'soft toys', 'a soft toy'], ['プレゼント', 'presents', 'a present'], ['さいふ', 'wallets', 'a wallet'], ['キーホルダー', 'keyrings', 'a keyring']];

const L3C_LENDS = [['かさ', 'umbrellas', 'an umbrella'], ['ほん', 'books', 'a book'], ['くるま', 'cars', 'a car', 'adult'], ['おかね', 'money', 'money'],
  ['バッテリー', 'batteries', 'a battery'], ['ゲーム', 'games', 'a game'], ['ふく', 'clothes', 'clothes'], ['ペン', 'pens', 'a pen'], ['CD', 'CDs', 'a CD']];

const L3C_SKILLS = [['えいご', 'English', 'English'], ['にほんご', 'Japanese', 'Japanese'], ['ドイツご', 'German', 'German'], ['ちゅうごくご', 'Chinese', 'Chinese'],
  ['ダンス', 'dance', 'dance'], ['テニス', 'tennis', 'tennis'], ['ピアノ', 'the piano', 'the piano'], ['りょうり', 'cooking', 'cooking'], ['かんじ', 'kanji', 'kanji'], ['ゴルフ', 'golf', 'golf']];

const L3C_GIVE = [
  { v: 'あげます', en: 'give', prep: 'to', it: true, gift: true, tenses: ['hab', 'past', 'fut'], objs: L3C_GIFTS },
  { v: 'もらいます', en: 'get', prep: 'from', it: true, gift: true, tenses: ['hab', 'past', 'fut'], objs: L3C_GIFTS },
  { v: 'かします', en: 'lend', prep: 'to', it: true, tenses: ['past', 'fut'], objs: L3C_LENDS },
  { v: 'かります', en: 'borrow', prep: 'from', it: true, tenses: ['past', 'fut'], objs: L3C_LENDS },
  { v: 'おしえます', en: 'teach', prep: 'to', skill: true, tenses: ['hab', 'past', 'fut'], objs: L3C_SKILLS },
  { v: 'ならいます', en: 'learn', prep: 'from', skill: true, tenses: ['hab', 'past', 'fut'], objs: L3C_SKILLS },
  { v: 'かきます', en: 'write', prep: 'to', contact: true, tenses: ['hab', 'past', 'fut'], objs: [['てがみ', 'letters', 'a letter'], ['メール', 'emails', 'an email'], ['カード', 'cards', 'a card']] },
  { v: 'おくります', en: 'send', prep: 'to', it: true, contact: true, tenses: ['hab', 'past', 'fut'], objs: [['メール', 'emails', 'an email'], ['てがみ', 'letters', 'a letter'], ['カード', 'cards', 'a card'], ['プレゼント', 'presents', 'a present'], ['レポート', 'reports', 'the report'], ['しゃしん', 'photos', 'some photos']] },
  { v: 'かけます', en: 'phone', prep: '', phone: true, contact: true, tenses: ['hab', 'past', 'fut'], objs: [['でんわ', '', '']] },
];

// MEANS で FOR GIVING (L3 Lesson 6, 2026-11-03): the check sheet's メールで
// レポートを おくります and にほんごで てがみを かきます. Slot 4 (the で slot) is
// used in this mode now, off unless tapped on: verb -> object -> tools.
const L3C_GIVE_TOOLS = {
  かきます: { てがみ: ['ペン', 'にほんご', 'えいご'], カード: ['ペン', 'ふで', 'にほんご', 'えいご'], メール: ['パソコン', 'スマホ', 'にほんご', 'えいご'] },
  おくります: { レポート: ['メール'], しゃしん: ['メール', 'スマホ'], メール: ['パソコン', 'スマホ'] },
  かけます: { でんわ: ['スマホ', 'けいたい', 'にほんご', 'えいご'] },
};

const l3cGiveTools = (G, o) => ((L3C_GIVE_TOOLS[G.v] || {})[o[0]] || []).filter(t => sgW(t));

// Occasions for the time slot (with に). Gifts, and cards sent or written.
// mum/dad: only for わたし giving to (or writing to) はは / ちち. objs: only these things.
// birthday: handled in l3cGiveTime (whose birthday decides the English).
const L3C_OCCASIONS = [
  { jp: 'クリスマス', en: 'at Christmas' }, { jp: 'バレンタインデー', en: 'on Valentine\'s Day' }, { jp: 'おしょうがつ', en: 'at New Year' },
  { jp: 'イースター', en: 'at Easter', objs: ['チョコレート', 'カード', 'おかし', 'ケーキ'] },
  { jp: 'ははのひ', en: 'on Mother\'s Day', mum: true }, { jp: 'ちちのひ', en: 'on Father\'s Day', dad: true },
  { jp: 'けっこんいわい', en: 'as a wedding present', giftOnly: true, verbs: ['あげます', 'もらいます'], one: true },
  { jp: 'おみまい', en: 'as a get-well present', giftOnly: true, verbs: ['あげます'], one: true, objs: ['はな', 'おかし', 'ほん', 'カード'] },
];

const l3cHer = en => /mother|sister|grandmother|wife|daughter/.test(en) ? 'her' : /father|brother|grandfather|husband|son/.test(en) ? 'his' : 'their';

// The other person (に). Never the subject; never わたし (so nobody あげます to
// me - the lesson's trap); your own family (はは) only when わたし is the topic.
function l3cGivePerson(G, subj) {
  const inSubj = jp => (subj.segs || []).some(s => s.jp.split(' ')[0] === jp);
  const pool = [];
  const add = (jp, en, wgt = 1) => { if (sgW(jp) && !inSubj(jp)) for (let i = 0; i < wgt; i++) pool.push({ jp, en }); };
  if (G.v === 'おしえます' && /teacher/.test(subj.en || '') && sgW('がくせい')) return { jp: 'がくせい', en: 'the students' };
  add('ともだち', 'a friend', 3);
  SENTENCE_NAME_POOL.forEach(n => add(n.jp, n.en));
  if (!subj.child) add('どうりょう', 'a colleague', 2);
  if (G.v === 'ならいます') add('せんせい', 'the teacher', 4);
  else if (G.v !== 'おしえます' && (!G.gift || subj.me)) add('せんせい', 'the teacher');
  if (subj.me || subj.myFam) {
    // My family: twice the weight of a single name (2026-10-23).
    sgMyFamily(m => m.jp !== subj.myFam && 'my ' + m.en !== subj.en && !(subj.spouse && m.spouse)).forEach(m => add(m.jp, 'my ' + m.en, 2));
    if (subj.me && !G.skill) add('じょうし', 'my boss');
  }
  return pool.length ? sgPick(pool) : null;
}

function l3cGiveTime(G, subj, person, o, tense, freq) {
  // Occasions: gifts (habitual only on an occasion), and cards.
  const canOcc = G.gift || (G.contact && o[0] === 'カード');
  if (canOcc && (tense === 'hab' || sgChance(0.6))) {
    const pool = L3C_OCCASIONS.filter(x => sgW(x.jp) && !(x.giftOnly && !G.gift) && !(x.verbs && !x.verbs.includes(G.v))
      && !(x.objs && !x.objs.includes(o[0])) && !(x.one && tense === 'hab')
      && !(x.mum && !(subj.me && person.jp === 'はは' && G.prep === 'to')) && !(x.dad && !(subj.me && person.jp === 'ちち' && G.prep === 'to')))
      .map(x => ({ seg: sgSeg(x.jp, 'に', 'ni'), en: x.en, jp: x.jp, t: {} }));
    // Birthdays: my own (getting presents), or the person I give to.
    if (sgW('たんじょうび')) {
      if (G.prep === 'from' && subj.me && G.gift) pool.push({ seg: sgSeg('たんじょうび', 'に', 'ni'), en: 'on my birthday', jp: 'たんじょうび', t: {} });
      if (G.prep === 'to' && subj.me) pool.push({ seg: sgSeg('たんじょうび', 'に', 'ni'), en: `for ${l3cHer(person.en)} birthday`, jp: 'たんじょうび', t: {} });
    }
    if (pool.length) return sgPick(pool);
    if (tense === 'hab') return null;
  }
  // Ordinary time words: days and weekends for habits (phone and email also
  // every day / in the evening); past and future words for one-offs.
  const daily = G.phone || o[0] === 'メール';
  return sgTime(tense, (jp, t) => {
    if (freq && freq.neg && SG_DAYS.some(d => d[0] === jp)) return false;
    if (t.rare && !G.contact) return false;
    if (tense !== 'hab') return !t.morning && !t.evening || G.contact;
    if (G.gift) return false;
    if (jp === 'まいにち' || jp === 'よる') return daily;
    return !t.morning && jp !== 'ひる' && jp !== 'まいあさ';
  }, { freq: !!freq, l6: true });
}

function l3cPickGive(tense, freq) {
  const wantTool = l3SentStates[4] !== 'off';
  const defs = L3C_GIVE.filter(G => sgW(G.v) && G.tenses.includes(tense) && G.objs.some(o => sgW(o[0]) && (!wantTool || l3cGiveTools(G, o).length)));
  const G = sgPick(defs);
  if (!G) return null;
  const subj = sgSubject();
  const objs = G.objs.filter(o => sgW(o[0]) && !(o[3] === 'adult' && subj.child) && !(subj.me && G.v === 'ならいます' && o[0] === 'えいご')
    && (!wantTool || l3cGiveTools(G, o).length));
  const o = sgPick(objs);
  if (!o) return null;
  const person = l3cGivePerson(G, subj);
  if (!person) return null;
  const time = l3cGiveTime(G, subj, person, o, tense, freq);
  if (!time) return null;
  return {
    mode: 'give', tense, subj, time, G, o, V: { v: G.v },
    comp: { seg: sgSeg(person.jp, 'に', 'ni'), en: person.en },
    slot4: (() => { const tl = l3cGiveTools(G, o); if (!tl.length) return null; const t = sgPick(tl); return { seg: sgSeg(t, 'で', 'de'), en: SG_TOOLS[t], tool: true }; })(),
    // A present is one thing even as a habit ("I give my mother a watch at Christmas").
    slot5: { seg: sgSeg(o[0], 'を', 'o'), en: tense === 'hab' && !G.gift ? o[1] : o[2] },
    verb: G.v,
  };
}

// English for the giving & receiving mode - the same three shapes as
// l3cEnglish (Who…? / question / statement), with to / from in place of "with".
function l3cEnglishGive(w, st, f, tense, isQ) {
  const G = w.G, neg = !!(f && f.neg), isAmari = !!(f && f.jp === 'あまり');
  const whoQ = st[0] === 'q';
  const asked = [5, 3, 4, 1].filter(i => st[i] === 'q');
  const me = st[0] !== 'on' || w.subj.me;
  const S = st[0] === 'on' ? mk(0, w.subj.me ? 'I' : w.subj.en) : (isQ ? 'you' : 'I');
  const third = st[0] === 'on' ? !w.subj.me : false;
  // "teach a friend" (no object) but "teach English to a friend".
  const prep = G.v === 'おしえます' && st[5] === 'off' ? '' : G.prep;
  let obj = '';
  if (G.phone) obj = '';
  else if (st[5] === 'on') obj = mk(5, w.slot5.en);
  else if (st[5] === 'q') obj = asked[0] === 5 && !whoQ ? '' : 'something';
  else obj = G.it ? 'it' : '';
  const P = G.en + (obj ? ' ' + obj : '');
  const toWhom = prep === 'to' ? 'to whom' : prep === 'from' ? 'from whom' : 'who';
  const extraWord = { 1: 'when', 3: toWhom, 4: 'with what', 5: 'what' };
  const extrasText = list => list.length ? ', and ' + list.map(i => mk(i, extraWord[i])).join(', and ') : '';
  const tail = [];
  if (st[3] === 'on') tail.push(mk(3, (prep ? prep + ' ' : '') + w.comp.en));
  if (st[4] === 'on' && w.slot4) tail.push(mk(4, w.slot4.en));
  if (st[1] === 'on') tail.push(mk(1, w.time.en));
  const T = tail.length ? ' ' + tail.join(' ') : '';
  const third3 = p => l3cVerb(p, 'third');
  const base = p => l3cVerb(p, null);
  const F = t => mk(2, t);
  if (whoQ) {
    let vp;
    if (tense === 'past') vp = l3cVerb(P, 'past');
    else if (tense === 'fut') vp = 'is going to ' + base(P);
    else if (!f) vp = third3(P);
    else if (!neg) vp = F(f.en) + ' ' + third3(P);
    else vp = isAmari ? "doesn't " + F('often') + ' ' + base(P) : F('never') + ' ' + third3(P);
    return mk(0, 'Who') + ' ' + vp + T + extrasText(asked) + '?';
  }
  if (isQ) {
    let aux, mid;
    const bP = base(P);
    if (tense === 'past') { aux = 'did'; mid = bP; }
    else if (tense === 'fut') { aux = third ? 'is' : 'are'; mid = 'going to ' + bP; }
    else { aux = third ? 'does' : 'do'; mid = !f ? bP : !neg ? F(f.en) + ' ' + bP : isAmari ? F('often') + ' ' + bP : F('never') + ' ' + bP; if (isAmari) aux = third ? "doesn't" : "don't"; }
    if (asked.length) {
      const one = asked[0];
      const wh = mk(one, one === 4 && T ? 'With what' : { 1: 'When', 3: 'Who', 4: 'What', 5: 'What' }[one]);
      // A comma after a stranded to / from keeps "from next week" from reading as one phrase.
      return `${wh} ${aux} ${S} ${mid}${one === 3 && prep ? ' ' + mk(3, prep) + (T ? ',' : '') : ''}${one === 4 && !T ? ' ' + mk(4, 'with') : ''}${T}${extrasText(asked.slice(1))}?`;
    }
    return `${sgCap(aux)} ${S} ${mid}${T}?`;
  }
  let vp;
  if (tense === 'past') vp = l3cVerb(P, 'past');
  else if (tense === 'fut') vp = (me && l3cEnPlain(S) === 'I' ? "'m going to " : 'is going to ') + base(P);
  else if (!f) vp = third ? third3(P) : base(P);
  else if (!neg) vp = F(f.en) + ' ' + (third ? third3(P) : base(P));
  else vp = isAmari ? (third ? "doesn't" : "don't") + ' ' + F('often') + ' ' + base(P) : F('never') + ' ' + (third ? third3(P) : base(P));
  return l3cCap(`${S}${vp.startsWith("'") ? '' : ' '}${vp}${T}.`);
}

// あまり/ぜんぜん + a day with に is stiff (Japanese would say げつようびは) -
// swap in a time word without a particle, as the daily sentence does.
function l3FixTimeForFreq() {
  const w = l3SentWords;
  if (!w || w.mode === 'give' || w.mode === 'being' || l3SentStates[2] !== 'on' || !L3_FREQ_WORDS[l3FreqIdx].neg || !SG_DAYS.some(d => d[0] === w.time.jp)) return;
  const filt = w.mode === 'do'
    ? (jp, t) => !SG_DAYS.some(d => d[0] === jp) && sgActTimeOk(w.V, jp, t, 'hab') && sgPlaceTimeOk(l3cPlaceJp(w), jp, t)
    : (jp, t) => !SG_DAYS.some(d => d[0] === jp) && sgDestTimeOk(w.kind, jp, t, 'hab', null);
  const t = sgTime('hab', filt, { freq: true });
  if (t) w.time = t;
}

const l3cPlaceJp = w => w.slot4.seg.jp.replace(/ で$/, '');

// The question word for a slot: なんで for a tool (Lesson 5), else the slot's own.
const l3cQOf = i => { const sl = L3C_SLOTS[l3cMode][i]; return sl.qTool && l3SentWords && l3SentWords.slot4 && l3SentWords.slot4.tool ? sl.qTool : sl.q; };

function renderL3SentenceRows() {
  const wrap = document.getElementById('sentence-structure-rows');
  if (!wrap) return;
  wrap.innerHTML = '';
  const w = l3SentWords;
  let shown = 0;
  L3C_SLOTS[l3cMode].forEach((slot, idx) => {
    const state = l3SentStates[idx];
    const row = document.createElement('div');
    // A slot this mode doesn't use stays in the list (so rows[i] is still
    // slot i for Step through) but isn't shown.
    if (slot.hidden) { row.className = 'sentence-slot-row l3c-row-hidden'; row.style.display = 'none'; wrap.appendChild(row); return; }
    shown++;
    row.className = 'vocab-ref-row minute-row sentence-slot-row l3c-row' + (state === 'off' && !(idx === 2 && l3cMou() && l3cMode !== 'being') ? ' sentence-slot-off' : '');
    row.style.setProperty('--slot', `var(--slot-${idx + 1})`);
    row.onclick = () => cycleL3SentenceSlot(idx);
    let badgeText, badgeClass = 'sentence-particle-badge', stateLabel = '';
    if (idx === 6) {
      const forcedQ = state === 'stmt' && l3cQWord();
      if (forcedQ) { badgeText = 'か'; stateLabel = '(question — a question word needs か)'; }
      else badgeText = { q: 'か', inv: 'ませんか', lets: 'ましょう', mou: 'ました', mouq: 'ましたか' }[state] || '。';
      if (!forcedQ)
      stateLabel = { q: '(question)', inv: '(inviting: "why don\'t we…?")', lets: '("let\'s…")', mou: '(もう: "has already…")', mouq: '(もう…か: "have you … yet?")' }[state] || '(statement)';
    } else if (l3cInviting() && (idx === 0 || idx === 2)) {
      badgeText = '–'; badgeClass += ' sentence-particle-badge-off'; stateLabel = '(not used when inviting)';
      row.className += ' sentence-slot-off';
    } else if (idx === 3 && state === 'on' && l3cInviting()) {
      badgeText = 'いっしょに'; stateLabel = '(together)';
    } else if (idx === 2 && l3cMou() && l3cMode !== 'being') {
      badgeText = 'もう'; badgeClass += ' sentence-particle-badge-freq'; stateLabel = '(already — the verb goes 〜ました)';
    } else if (state === 'off') {
      badgeText = '–'; badgeClass += ' sentence-particle-badge-off'; stateLabel = '(skipped)';
    } else if (idx === 2) {
      const f = L3_FREQ_WORDS[l3FreqIdx];
      badgeText = f.jp; badgeClass += ' sentence-particle-badge-freq';
      stateLabel = `(${f.en}${f.neg ? ' — verb goes negative' : ''})`;
    } else if (state === 'q') {
      const q = l3cQOf(idx); badgeText = q[0] + q[2]; badgeClass += ' sentence-particle-badge-q'; stateLabel = '(asked as a question)';
    } else if (l3cMode === 'being' && idx === 2 && state === 'on') {
      badgeText = l3cBeingDegree; badgeClass += ' sentence-particle-badge-freq'; stateLabel = l3cBeingDegree === 'あまり' ? '(not very — the ending goes negative)' : '(very)';
    } else if (l3cMode === 'being' && idx === 4 && state === 'on') {
      badgeText = w && w.adj && isNaAdj(w.adj.jp) ? 'な' : '∅'; stateLabel = w && w.adj ? (isNaAdj(w.adj.jp) ? '(a な-word: add な)' : '(an い-word: nothing added)') : '';
    } else if (l3cMode === 'being' && (idx === 1 || idx === 5)) {
      badgeText = idx === 1 ? '∅' : '–';
    } else if (idx === 1) {
      badgeText = w && w.time && w.time.seg && / に$/.test(w.time.seg.jp) ? 'に' : '∅';
    } else if (idx === 3 && l3cMode === 'give') {
      badgeText = 'に';
    } else if (idx === 3) {
      badgeText = w && w.comp && /ひとり/.test((w.comp.seg || {}).jp || '') ? 'で' : 'と';
    } else {
      badgeText = slot.particle;
    }
    row.innerHTML = `
      <div class="sentence-structure-inner">
        <div class="vocab-ref-num-big">${shown}</div>
        <div class="sentence-structure-text">
          <div class="sentence-structure-role">${slot.role}</div>
          <div class="sentence-structure-note">${slot.note}${stateLabel ? ` <span class="sentence-structure-state">${stateLabel}</span>` : ''}</div>
        </div>
        <div class="${badgeClass}">${markSmallKana(badgeText)}</div>
      </div>
    `;
    wrap.appendChild(row);
  });
}

function cycleL3SentenceSlot(idx) {
  l3cStopPlay();
  if (idx === 6) {
    // statement -> question -> invitation (ませんか) -> let's (ましょう) -> statement
    const vOrder = l3cMode === 'being' ? ['stmt', 'q'] : l3cMode === 'give' ? ['stmt', 'q', 'mou', 'mouq'] : ['stmt', 'q', 'mou', 'mouq', 'inv', 'lets'];
    // With a question word showing, statement and question look the same (か
    // either way), so the next tap goes straight on to inviting.
    if (l3cQWord() && (l3SentStates[6] === 'stmt' || l3SentStates[6] === 'q')) l3SentStates[6] = 'q';
    l3SentStates[6] = vOrder[(vOrder.indexOf(l3SentStates[6]) + 1) % vOrder.length];
    if (l3SentStates[6] === 'mou' || (l3SentStates[6] === 'mouq' && l3SentWords && l3SentWords.subj.me)) pickFreshL3SentenceWords();
    if (l3SentStates[6] === 'q' && ((l3SentWords && l3SentWords.subj.me) || (l3SentStates[2] === 'on' && L3_FREQ_WORDS[l3FreqIdx].neg))) pickFreshL3SentenceWords();
    if (l3SentStates[6] === 'inv') {
      // Inviting: no topic or frequency, nothing asked, and a future time word.
      [1, 3, 4, 5].forEach(i => { if (l3SentStates[i] === 'q') l3SentStates[i] = 'on'; });
      if (!l3SentWords || l3SentWords.tense !== 'fut') pickFreshL3SentenceWords();
    }
  } else if (l3cMou() && idx === 2) {
    // もう holds the How often spot - tap the verb to leave it.
  } else if (l3cMou()) {
    l3SentStates[idx] = l3SentStates[idx] === 'on' ? 'off' : 'on';
    if (l3cMode === 'give' && idx === 4 && l3SentStates[4] === 'on' && !(l3SentWords && l3SentWords.slot4)) pickFreshL3SentenceWords();
  } else if (l3cInviting() && (idx === 0 || idx === 2)) {
    // Topic and Frequency aren't part of an invitation - nothing to cycle.
  } else if (l3cInviting()) {
    l3SentStates[idx] = l3SentStates[idx] === 'on' ? 'off' : 'on';
  } else if (idx === 2) {
    const wasOff = l3SentStates[2] === 'off';
    // In a question, Frequency only steps through いつも / よく / ときどき.
    const last = l3cIsQ() ? L3_FREQ_WORDS.findIndex(f => f.neg) - 1 : L3_FREQ_WORDS.length - 1;
    if (wasOff) { l3SentStates[2] = 'on'; l3FreqIdx = 0; }
    else if (l3FreqIdx < last) l3FreqIdx++;
    else l3SentStates[2] = 'off';
    // Frequency only goes with habits: a past/future example gets new words.
    if (l3SentStates[2] === 'on' && l3SentWords && l3SentWords.tense !== 'hab') pickFreshL3SentenceWords();
    // Some words can't take every frequency word (no "always goes to a
    // concert") - pick again if this one doesn't fit.
    else if (l3SentStates[2] === 'on' && !l3cFreqFits()) pickFreshL3SentenceWords();
    l3FixTimeForFreq();
  } else if (L3C_SLOTS[l3cMode][idx].hidden || L3C_SLOTS[l3cMode][idx].fixed) {
    // not used in this mode / always there
  } else if (l3cMode === 'being' && idx === 2) {
    // off -> とても -> あまり -> off
    if (l3SentStates[2] !== 'on') { l3SentStates[2] = 'on'; l3cBeingDegree = 'とても'; }
    else if (l3cBeingDegree === 'とても') l3cBeingDegree = 'あまり';
    else l3SentStates[2] = 'off';
    if (l3SentStates[2] === 'on') l3SentStates[1] = 'off'; // degree words go with describing words, not jobs + time
    pickFreshL3SentenceWords();
  } else if (l3cMode === 'being' && idx === 4) {
    l3SentStates[4] = l3SentStates[4] === 'on' ? 'off' : 'on';
    pickFreshL3SentenceWords();
  } else if (l3cMode === 'being' && idx === 1) {
    // Time: on or off. Switching it on wants a time word - jobs and な-words.
    l3SentStates[1] = l3SentStates[1] === 'on' ? 'off' : 'on';
    if (l3SentStates[1] === 'on' && !(l3SentWords && l3SentWords.time)) pickFreshL3SentenceWords();
  } else if (l3cMode === 'being' && idx === 0) {
    const order = ['on', 'off', 'q'];
    l3SentStates[0] = order[(order.indexOf(l3SentStates[0]) + 1) % 3];
    // だれが…? needs a person, not "the bag"; and questions never ask about わたし.
    if (l3SentStates[0] === 'q' && l3SentWords && (l3SentWords.subj.thing || l3SentWords.subj.me)) pickFreshL3SentenceWords();
  } else {
    // でんわを かけます: "what do you phone?" isn't a question, so the
    // object there is only on or skipped.
    const order = idx === 5 && l3SentWords && l3SentWords.G && l3SentWords.G.phone ? ['on', 'off'] : ['on', 'off', 'q'];
    l3SentStates[idx] = order[(order.indexOf(l3SentStates[idx]) + 1) % order.length];
    // Asking something turns it into a question: questions never use わたし
    // as the topic or あまり / ぜんぜん (see pickFreshL3SentenceWords).
    if (l3cIsQ() && ((l3SentWords && l3SentWords.subj.me) || (l3SentStates[2] === 'on' && L3_FREQ_WORDS[l3FreqIdx].neg))) pickFreshL3SentenceWords();
    // Giving's means で: only some verbs have one - new words when it comes on.
    else if (l3cMode === 'give' && idx === 4 && l3SentStates[4] !== 'off' && !(l3SentWords && l3SentWords.slot4)) pickFreshL3SentenceWords();
  }
  if (!l3cComeOk(l3SentWords)) pickFreshL3SentenceWords();
  if (!l3cPhoneOk(l3SentWords)) pickFreshL3SentenceWords();
  renderL3SentenceRows();
  renderL3SentenceExample();
}

function l3cFreqFits() {
  const w = l3SentWords, f = L3_FREQ_WORDS[l3FreqIdx];
  if (!w) return false;
  if (l3cMou()) return false;
  if (w.mode === 'being') return false;
  if (w.mode === 'do') return !w.V.outing;
  if (w.mode === 'give') return w.G.tenses.includes('hab') && !(f.neg && SG_DAYS.some(d => d[0] === w.time.jp));
  const kind = w.kind;
  if (kind === 'work') return false;
  return !(['outing', 'daytrip', 'event'].includes(kind) && f.jp === 'いつも') && sgDestTimeOk(kind, w.time.jp, w.time.t, 'hab', f.neg ? null : f);
}

// en = plain English (tests, anything else that reads it); enM = with slot markers.
function buildL3SentenceExample() {
  const r = buildL3SentenceExampleM();
  r.en = l3cEnPlain(r.enM);
  return r;
}

function buildL3SentenceExampleM() {
  const w = l3SentWords, st = l3SentStates, S = L3C_SLOTS[l3cMode];
  const f = st[2] === 'on' ? L3_FREQ_WORDS[l3FreqIdx] : null;
  const neg = !!(f && f.neg);
  if (l3cMode === 'being') return beingBuild(l3SentWords, l3SentStates);
  if (l3cInviting()) return buildL3InviteExample();
  if (l3cMou()) return buildL3MouExample();
  const isQ = l3cIsQ();
  const tense = f ? 'hab' : w.tense;
  // Each piece remembers its slot (0-6), so the sentence can be coloured
  // and stepped through slot by slot (2026-10-09).
  const parts = [];
  const add = (slot, segs) => segs.forEach(s => parts.push({ slot, jp: l3cJp(s), ro: s.ro }));
  const addQ = i => { const q = l3cQOf(i); parts.push({ slot: i, jp: q[0] + q[2], ro: (q[1] + ' ' + q[3]).trim() }); };
  if (st[0] === 'on') add(0, l3cSubjectSegs(w.subj)); else if (st[0] === 'q') addQ(0);
  if (st[1] === 'on') add(1, [w.time.seg]); else if (st[1] === 'q') addQ(1);
  if (f) parts.push({ slot: 2, jp: f.jp, ro: f.romaji });
  if (st[3] === 'on') add(3, w.comp.segs || [w.comp.seg]); else if (st[3] === 'q') addQ(3);
  if (st[4] === 'on') add(4, [w.slot4.seg]); else if (st[4] === 'q') addQ(4);
  if (st[5] === 'on') add(5, [w.slot5.seg]); else if (st[5] === 'q') addQ(5);
  const v = sgVerb(w.verb, tense === 'past' ? 'past' : 'hab', neg);
  parts.push({ slot: 6, jp: v.jp + (isQ ? 'か' : ''), ro: v.ro + (isQ ? ' ka' : '') });
  parts[0].ro = sgCap(parts[0].ro);
  return {
    parts, end: isQ ? ['。', '?'] : ['。', '.'],
    jp: parts.map(x => x.jp).join(' ') + '。', romaji: parts.map(x => x.ro).join(' ') + (isQ ? '?' : '.'),
    enM: l3cEnglish(w, st, f, tense, isQ),
  };
}

// English for any combination of slots. Habitual uses the present ("always
// eats"), past the past ("ate"), future "is going to".
// Inviting (L3 Lesson 3, 2026-10-13): the verb slot's ませんか / ましょう states.
const l3cInviting = () => l3SentStates[6] === 'inv' || l3SentStates[6] === 'lets';

// もう (L3 Lesson 6, 2026-11-03): two more verb states - もう 〜ました ("has
// already") and もう 〜ましたか ("have you … yet?"). もう takes the How often
// spot (slot 2), the verb goes past, and the time word comes from L3C_MOU_TIMES.
const l3cMou = () => l3SentStates[6] === 'mou' || l3SentStates[6] === 'mouq';

// A question word in any slot (だれと, どこで…) makes the sentence a question,
// so the verb takes か whatever its own state (Andrew, 2026-10-14).
const l3cQWord = () => [0, 1, 3, 4, 5].some(i => l3SentStates[i] === 'q');

const l3cIsQ = () => l3SentStates[6] === 'q' || l3SentStates[6] === 'mouq' || (l3SentStates[6] === 'stmt' && l3cQWord());

function buildL3MouExample() {
  const w = l3SentWords, st = l3SentStates, isQ = st[6] === 'mouq';
  const parts = [];
  const add = (slot, segs) => segs.forEach(s => parts.push({ slot, jp: l3cJp(s), ro: s.ro }));
  if (st[0] === 'on') add(0, l3cSubjectSegs(w.subj));
  if (st[1] === 'on' && w.time) add(1, [w.time.seg]);
  parts.push({ slot: 2, jp: 'もう', ro: 'mou' });
  if (st[3] === 'on') add(3, w.comp.segs || [w.comp.seg]);
  if (st[4] === 'on' && w.slot4) add(4, [w.slot4.seg]);
  if (st[5] === 'on') add(5, [w.slot5.seg]);
  const v = sgVerb(w.verb, 'past', false);
  parts.push({ slot: 6, jp: v.jp + (isQ ? 'か' : ''), ro: v.ro + (isQ ? ' ka' : '') });
  parts[0].ro = sgCap(parts[0].ro);
  return {
    parts, end: isQ ? ['。', '?'] : ['。', '.'],
    jp: parts.map(x => x.jp).join(' ') + '。', romaji: parts.map(x => x.ro).join(' ') + (isQ ? '?' : '.'),
    enM: l3cEnglishMou(w, st, isQ),
  };
}

// English past participles for もう: "Have you eaten…", "has already sent…".
const SG_VERB_PP = { eat: 'eaten', drink: 'drunk', have: 'had', read: 'read', write: 'written', buy: 'bought', take: 'taken', do: 'done',
  go: 'been', get: 'got', meet: 'met', come: 'come', swim: 'swum', sing: 'sung', give: 'given', lend: 'lent', teach: 'taught', send: 'sent',
  cut: 'cut', draw: 'drawn', see: 'seen', learn: 'learned' };

const sgPP = p => { const i = p.indexOf(' '), f = i < 0 ? p : p.slice(0, i), r = i < 0 ? '' : p.slice(i); return (SG_VERB_PP[f] || sgVerbEn(f, 'past')) + r; };

const l3cVerbPP = p => { const r = sgPP(p); const i = r.indexOf(' '); return i < 0 ? mk(6, r) : mk(6, r.slice(0, i)) + r.slice(i); };

function l3cEnglishMou(w, st, isQ) {
  const S = st[0] === 'on' ? mk(0, w.subj.me ? 'I' : w.subj.en) : (isQ ? 'you' : 'I');
  const third = st[0] === 'on' && !w.subj.me;
  let P, tail = [];
  if (w.mode === 'give') {
    const G = w.G, prep = G.v === 'おしえます' && st[5] === 'off' ? '' : G.prep;
    const obj = G.phone ? '' : st[5] === 'on' ? mk(5, w.slot5.en) : (G.it ? 'it' : '');
    P = G.en + (obj ? ' ' + obj : '');
    if (st[3] === 'on') tail.push(mk(3, (prep ? prep + ' ' : '') + w.comp.en));
  } else {
    const bare = w.mode === 'do' ? (L3C_BARE[w.V.v] || w.phraseQ) : w.phraseQ;
    P = st[5] === 'on' ? l3cSplitPhrase(w.mode === 'do' ? w.phrase : w.phrase) : bare + (w.mode === 'do' && L3C_NEEDS_OBJ.includes(bare) ? ' it' : '');
    if (st[3] === 'on') tail.push(mk(3, w.comp.en));
  }
  if (st[4] === 'on' && w.slot4) tail.push(mk(4, w.slot4.en));
  const T = tail.length ? ' ' + tail.join(' ') : '';
  const TM = st[1] === 'on' && w.time ? ' ' + mk(1, w.time.en) : '';
  if (isQ) return `${third ? 'Has' : 'Have'} ${S} ${l3cVerbPP(P)}${T} ${mk(2, 'yet')}${TM}?`;
  const aux = l3cEnPlain(S) === 'I' ? "'ve" : third ? ' has' : ' have';
  return l3cCap(`${S}${aux} ${mk(2, 'already')} ${l3cVerbPP(P)}${T}${TM}.`);
}

function buildL3InviteExample() {
  const w = l3SentWords, st = l3SentStates, lets = st[6] === 'lets';
  const parts = [];
  const add = (slot, segs) => segs.forEach(s => parts.push({ slot, jp: l3cJp(s), ro: s.ro }));
  if (st[1] === 'on') add(1, [w.time.seg]);
  const together = st[3] === 'on' && sgW('いっしょに');
  if (together) add(3, [sgSeg('いっしょに')]);
  if (st[4] === 'on') add(4, [w.slot4.seg]);
  if (st[5] === 'on') add(5, [w.slot5.seg]);
  const v = sgVerb(w.verb, 'hab', false);
  parts.push({ slot: 6, jp: v.jp.replace(/ます$/, lets ? 'ましょう' : 'ませんか'), ro: v.ro.replace(/masu$/, lets ? 'mashou' : 'masen ka') });
  parts[0].ro = sgCap(parts[0].ro);
  // Object left out: the plain verb, + "it" where English needs an object
  // ("Let's do it", not "Let's do") - same rule as the questions (2026-10-15).
  const bareInv = () => { const v = L3C_BARE[w.V.v] || (w.V.phrase ? w.phrase.split(' ')[0] : w.phraseQ); return L3C_NEEDS_OBJ.includes(v) ? v + ' it' : v; };
  let P = l3cVerb(st[5] === 'on' ? l3cSplitPhrase(w.phrase) : (w.mode === 'do' ? bareInv() : 'go'), null);
  const tail = [together && mk(3, 'together'), st[4] === 'on' && mk(4, w.slot4.en), st[1] === 'on' && mk(1, w.time.en)].filter(Boolean);
  const T = tail.length ? ' ' + tail.join(' ') : '';
  return {
    parts, end: lets ? ['。', '.'] : ['。', '?'],
    jp: parts.map(x => x.jp).join(' ') + '。', romaji: parts.map(x => x.ro).join(' ') + (lets ? '.' : '?'),
    enM: lets ? `Let's ${P}${T}.` : `Why don't we ${P}${T}?`,
  };
}

// COLOURED ENGLISH (2026-10-15): each English piece is wrapped in a slot
// marker while the sentence is built (mk), so it can be shown in its slot's
// colour - plain coloured text, no underline, so the English stays quieter
// than the Japanese. Words that belong to no slot (I, do, is going to, it,
// something) stay grey. The verb slot colours only the main verb word; in a
// phrase like "play tennis" the first word is the verb and the rest is the
// object (slot 5). l3cEnPlain strips the markers, l3cEnHtml turns them into
// spans.
const L3C_MK_OPEN = '\uE000', L3C_MK_CLOSE = '\uE001';

const mk = (slot, text) => text ? L3C_MK_OPEN + slot + text + L3C_MK_CLOSE : text;

const l3cEnPlain = s => s.replace(/\uE000\d/g, '').replace(/\uE001/g, '');

function l3cEnHtml(s) {
  const esc = t => t.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  return esc(s).replace(/\uE000(\d)([^\uE001]*)\uE001/g, (m, slot, t) =>
    `<span class="l3c-en" data-slot="${slot}" style="--slot:var(--slot-${+slot + 1})">${t}</span>`);
}

// Capitalise the first letter even when it's inside a marker.
const l3cCap = s => s.replace(/^(\uE000\d)?([a-z])/, (m, a, c) => (a || '') + c.toUpperCase());

// "play tennis" -> verb word (slot 6) + the rest as the object/destination (slot 5).
const l3cSplitPhrase = p => { const i = p.indexOf(' '); return i < 0 ? p : p.slice(0, i) + ' ' + mk(5, p.slice(i + 1)); };

// Conjugate (sgVerbEn only changes the first word) and colour that word as the verb.
const l3cVerb = (p, form) => { const r = form ? sgVerbEn(p, form) : p; const i = r.indexOf(' '); return i < 0 ? mk(6, r) : mk(6, r.slice(0, i)) + r.slice(i); };

const L3C_BARE = { たべます: 'eat', のみます: 'drink', みます: 'watch', ききます: 'listen', よみます: 'read', かきます: 'write', かいます: 'buy', とります: 'take', します: 'do' };

const L3C_NEEDS_OBJ = ['write', 'buy', 'take', 'do'];

function l3cEnglish(w, st, f, tense, isQ) {
  if (w.mode === 'give') return l3cEnglishGive(w, st, f, tense, isQ);
  const neg = !!(f && f.neg), isAmari = !!(f && f.jp === 'あまり');
  const whoQ = st[0] === 'q';
  // Several question words (2026-10-14): English asks one and tags the rest
  // on - "Who is the teacher going to have a party with on Sunday, and where?"
  // Priority for the one asked first: what / where-to, who with, where / how, when.
  const asked = [5, 3, 4, 1].filter(i => st[i] === 'q');
  const doMode = w.mode === 'do';
  const tool = !!(w.slot4 && w.slot4.tool);
  const extraWord = { 1: 'when', 3: 'with whom', 4: tool ? 'with what' : doMode ? 'where' : 'how', 5: doMode ? 'what' : 'where' };
  const extrasText = list => list.length ? ', and ' + list.map(i => mk(i, extraWord[i])).join(', and ') : '';
  const me = st[0] !== 'on' || w.subj.me;
  const S = st[0] === 'on' ? mk(0, w.subj.me ? 'I' : w.subj.en) : (isQ ? 'you' : 'I');
  const third = st[0] === 'on' ? !w.subj.me : false;
  // verb phrase (object / destination may be asked or skipped)
  let P;
  // Object asked or left out (2026-10-14): the plain verb, with "it" where
  // English can't drop the object ("buys it"), or "something" when the object
  // is one of the extra question words ("Who drinks something…, and what?").
  const bare = doMode ? (L3C_BARE[w.V.v] || w.phraseQ) : w.phraseQ; // go / come
  const needsObj = L3C_NEEDS_OBJ.includes(bare);
  if (st[5] === 'on') P = l3cSplitPhrase(w.phrase);
  else if (st[5] === 'q') P = doMode ? (asked[0] === 5 && !whoQ ? bare : bare + ' something') : bare;
  else P = doMode ? bare + (needsObj ? ' it' : '') : bare;
  const tail = [];
  if (st[3] === 'on') tail.push(mk(3, w.comp.en));
  if (st[4] === 'on') tail.push(mk(4, w.slot4.en));
  if (st[1] === 'on') tail.push(mk(1, w.time.en));
  const T = tail.length ? ' ' + tail.join(' ') : '';
  const third3 = p => l3cVerb(p, 'third');
  const base = p => l3cVerb(p, null);
  const F = t => mk(2, t);
  if (whoQ) {
    let vp;
    if (tense === 'past') vp = l3cVerb(P, 'past');
    else if (tense === 'fut') vp = 'is going to ' + base(P);
    else if (!f) vp = third3(P);
    else if (!neg) vp = F(f.en) + ' ' + third3(P);
    else vp = isAmari ? "doesn't " + F('often') + ' ' + base(P) : F('never') + ' ' + third3(P);
    return mk(0, 'Who') + ' ' + vp + T + extrasText(asked) + '?';
  }
  if (isQ) {
    let aux, mid;
    const bP = base(P);
    if (tense === 'past') { aux = 'did'; mid = bP; }
    else if (tense === 'fut') { aux = third ? 'is' : 'are'; mid = 'going to ' + bP; }
    else { aux = third ? 'does' : 'do'; mid = !f ? bP : !neg ? F(f.en) + ' ' + bP : isAmari ? F('often') + ' ' + bP : F('never') + ' ' + bP; if (isAmari) aux = third ? "doesn't" : "don't"; }
    if (asked.length) {
      const one = asked[0];
      // Tool で: "What do you eat sushi with?" - or, with more after the verb,
      // "With what does … ?" so it never reads "with with a friend".
      // Always "with": なんで doesn't say whether the answer is a tool or a language.
      const prep4 = 'with';
      const toolFront = one === 4 && tool && T;
      const wh = mk(one, toolFront ? 'With what' : { 1: 'When', 3: 'Who', 4: tool ? 'What' : doMode ? 'Where' : 'How', 5: doMode ? 'What' : 'Where' }[one]);
      const strand = one === 3 ? ' ' + mk(3, 'with') : one === 4 && tool && !toolFront ? ' ' + mk(4, prep4) : '';
      return `${wh} ${aux} ${S} ${mid}${strand}${T}${extrasText(asked.slice(1))}?`;
    }
    return `${sgCap(aux)} ${S} ${mid}${T}?`;
  }
  let vp;
  if (tense === 'past') vp = l3cVerb(P, 'past');
  else if (tense === 'fut') vp = (me && l3cEnPlain(S) === 'I' ? "'m going to " : 'is going to ') + base(P);
  else if (!f) vp = third ? third3(P) : base(P);
  else if (!neg) vp = F(f.en) + ' ' + (third ? third3(P) : base(P));
  else vp = isAmari ? (third ? "doesn't" : "don't") + ' ' + F('often') + ' ' + base(P) : F('never') + ' ' + (third ? third3(P) : base(P));
  return l3cCap(`${S}${vp.startsWith("'") ? '' : ' '}${vp}${T}.`);
}

// COLOURED SLOTS (2026-10-09): each slot has its own colour (--slot-1..7),
// shown on its row and as a highlighter behind its words in the Japanese
// and romaji, so a skipped slot shows up as a missing colour. Pieces of one
// slot (ともだちの おかあさんは) are joined into one coloured run. Tapping a
// run lights up its slot (and says it).
function renderL3SentenceExample() {
  l3cStopPlay();
  const { parts, end, enM } = buildL3SentenceExample();
  const runs = [];
  parts.forEach(p => {
    const last = runs[runs.length - 1];
    if (last && last.slot === p.slot) { last.jp.push(p.jp); last.ro.push(p.ro); }
    else runs.push({ slot: p.slot, jp: [p.jp], ro: [p.ro] });
  });
  const html = (field, sep, endMark, kana) => runs.map((r, i) =>
    `<span class="l3c-chunk" data-slot="${r.slot}" style="--slot:var(--slot-${r.slot + 1})">${kana ? markSmallKana(r[field].join(sep)) : r[field].join(sep)}${i === runs.length - 1 ? endMark : ''}</span>`
  ).join(' ');
  const jpEl = document.getElementById('sentence-structure-example-jp');
  const romajiEl = document.getElementById('sentence-structure-example-romaji');
  const enEl = document.getElementById('sentence-structure-example-en');
  if (jpEl) jpEl.innerHTML = html('jp', ' ', end[0], true);
  if (romajiEl) romajiEl.innerHTML = html('ro', ' ', end[1], false);
  if (enEl) enEl.innerHTML = `"${l3cEnHtml(enM)}"`;
  document.querySelectorAll('#sentence-structure-example-jp .l3c-chunk, #sentence-structure-example-romaji .l3c-chunk').forEach(el => {
    el.onclick = () => l3cFlashSlot(+el.dataset.slot, true);
  });
}

// --- Step through (2026-10-09) ---
// Lights each switched-on slot in turn (row + its words), saying it if sound
// is on; skipped slots get a brief grey flash, so the fixed order still shows.
// Ends with the whole sentence lit and said. Any tap on the card stops it.
var l3cPlay = null; // var, not let: showScreen checks it, and runs before this line at start-up

const L3C_STEP_MS = 1500, L3C_SKIP_MS = 550;

// Move on after BOTH minMs has passed and the speech has finished (+ a short
// pause), so a long chunk - or the whole sentence at the end - is never cut
// off or un-lit while it's still being read. Falls back to a length-based
// cap if the browser never reports the end.
function l3cAfterSpeech(utter, text, minMs, cb) {
  let spoke = !utter, waited = false, fired = false;
  const go = () => { if (!fired && spoke && waited) { fired = true; cb(); } };
  if (utter) {
    utter.onend = () => setTimeout(() => { spoke = true; go(); }, 350);
    utter.onerror = () => { spoke = true; go(); };
  }
  const cap = setTimeout(() => { spoke = true; waited = true; go(); }, Math.min(15000, minMs + 600 + text.length * 260));
  setTimeout(() => { waited = true; go(); }, minMs);
  return cap;
}

function l3cMark(slot, on) {
  const row = document.querySelectorAll('#sentence-structure-rows .sentence-slot-row')[slot];
  if (row) row.classList.toggle('l3c-row-active', on);
  document.querySelectorAll(`.sentence-structure-example .l3c-chunk[data-slot="${slot}"], .sentence-structure-example .l3c-en[data-slot="${slot}"]`).forEach(el => el.classList.toggle('l3c-chunk-active', on));
}

function l3cClearMarks() {
  document.querySelectorAll('.l3c-row-active, .l3c-row-skip').forEach(el => el.classList.remove('l3c-row-active', 'l3c-row-skip'));
  document.querySelectorAll('.l3c-chunk-active').forEach(el => el.classList.remove('l3c-chunk-active'));
  const ex = document.querySelector('.sentence-structure-example');
  if (ex) ex.classList.remove('l3c-playing');
}

function l3cSayText(slot) {
  const t = [...document.querySelectorAll(`#sentence-structure-example-jp .l3c-chunk[data-slot="${slot}"]`)].map(e => e.textContent).join('').replace(/[\s。]/g, '');
  return slot === 0 ? t.replace(/は$/, 'わ') : t; // topic は said "wa"
}

function l3cFlashSlot(slot, say) {
  if (l3cPlay) return;
  l3cClearMarks();
  const ex = document.querySelector('.sentence-structure-example');
  if (ex) ex.classList.add('l3c-playing');
  l3cMark(slot, true);
  if (say) speakJapanese(l3cSayText(slot));
  clearTimeout(l3cFlashSlot.t);
  l3cFlashSlot.t = setTimeout(l3cClearMarks, L3C_STEP_MS);
}

function l3cStopPlay() {
  if (l3cPlay) { clearTimeout(l3cPlay.timer); l3cPlay = null; }
  l3cClearMarks();
  const btn = document.getElementById('l3c-play-btn');
  if (btn) btn.textContent = '▶ Step through';
}

function l3cTogglePlay() {
  if (l3cPlay) { l3cStopPlay(); return; }
  clearTimeout(l3cFlashSlot.t);
  l3cClearMarks();
  const ex = document.querySelector('.sentence-structure-example');
  if (!ex) return;
  const rows = document.getElementById('sentence-structure-rows');
  if (rows) rows.scrollIntoView({ block: 'start', behavior: 'smooth' });
  ex.classList.add('l3c-playing');
  document.getElementById('l3c-play-btn').textContent = '■ Stop';
  l3cPlay = { step: 0, timer: null };
  const next = () => {
    if (!l3cPlay || !document.body.contains(ex)) { l3cStopPlay(); return; }
    const i = l3cPlay.step++;
    if (i > 0) { l3cMark(i - 1, false); const prev = document.querySelectorAll('#sentence-structure-rows .sentence-slot-row')[i - 1]; if (prev) prev.classList.remove('l3c-row-skip'); }
    if (i === 7) { // finale: the whole sentence, lit until it has been read out
      for (let k = 0; k < 7; k++) l3cMark(k, true);
      const all = [0, 1, 2, 3, 4, 5, 6].map(l3cSayText).join('');
      const play = l3cPlay;
      l3cPlay.timer = l3cAfterSpeech(speakJapanese(all), all, 2000, () => { if (l3cPlay === play) l3cStopPlay(); });
      return;
    }
    const present = !!document.querySelector(`#sentence-structure-example-jp .l3c-chunk[data-slot="${i}"]`);
    if (L3C_SLOTS[l3cMode][i] && L3C_SLOTS[l3cMode][i].hidden) { l3cPlay.timer = setTimeout(next, 0); return; }
    if (!present) {
      const row = document.querySelectorAll('#sentence-structure-rows .sentence-slot-row')[i];
      if (row) row.classList.add('l3c-row-skip');
      l3cPlay.timer = setTimeout(next, L3C_SKIP_MS);
      return;
    }
    l3cMark(i, true);
    const t = l3cSayText(i), play = l3cPlay;
    l3cPlay.timer = l3cAfterSpeech(speakJapanese(t), t, L3C_STEP_MS, () => { if (l3cPlay === play) next(); });
  };
  next();
}

function shuffleL3SentenceExample() {
  // A new example also gets a new frequency word if that slot is on.
  if (l3SentStates[2] === 'on') {
    const n = l3cIsQ() ? L3_FREQ_WORDS.filter(f => !f.neg).length : L3_FREQ_WORDS.length;
    l3FreqIdx = Math.floor(Math.random() * n);
  }
  pickFreshL3SentenceWords();
  l3FixTimeForFreq();
  renderL3SentenceRows(); // time/companion badges depend on the words picked
  renderL3SentenceExample();
}
