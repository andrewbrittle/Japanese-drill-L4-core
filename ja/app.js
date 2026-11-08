// Japanese drill (L4) - this app's settings for the core (2026-11-08, step 3
// of the move onto the core). Same shape as pt/app.js and bg/app.js.
// Japanese's own code (ja/legacy.js) still draws most screens itself, so
// some of these only matter once that code moves onto the core.
window.APP = {
  // Saved data is stored under names starting with this (jpL4KanaScores,
  // jpL4Settings...) - the names the L4 app has always used, so your scores
  // are found as they are. Never change it.
  storagePrefix: 'jpL4',
  backupName: 'japanese-drill-backup',
  latestChangelog: '2026-11-06-L4',

  vocabTabLabel: 'ことば',
  vocabPills: [],

  // The app's own settings, with their defaults, beside the core's.
  settings: { showKanji: true, showExtra: true, showAndrewMode: false, showUntaught: null, showTourist: null, gbpJpyRate: 215, tileShowRomaji: false },
  // Drill by meaning, beside the core's reversed / type / listen.
  randomModes: { meaning: false },
  // Filled in by ja/legacy.js once its reference pages exist.
  categoryLinks: {},
  // L1 blue, L2 orange, L3 teal, L4 purple, Tourist, Untaught, Genki -
  // filled in by ja/legacy.js.
  levelColors: {},

  // The tabs' main pages (Back starts again there), and where Back goes
  // from an inner page with no history.
  screens: {
    // onShow: each page's score shading brought up to date as it's shown.
    'kana-selection': { root: true, onShow: () => refreshKanaSelectionSwatches() },
    'kanji-index': { root: true, onShow: () => refreshKanjiIndexSwatches() },
    numbers: { root: true, onShow: () => updateNumberTimeSwatches() },
    build: { root: true },
    grammar: { root: true },
    'hiragana-selection': { home: 'kana-selection', onShow: () => Object.keys(HIRAGANA_SECTIONS).forEach(key => refreshKanaScoreShading('hiragana-grid-' + key)) },
    'katakana-selection': { home: 'kana-selection', onShow: () => Object.keys(KATAKANA_SECTIONS).forEach(key => refreshKanaScoreShading('katakana-grid-' + key)) },
    'kanji-selection': { home: 'kanji-index', onShow: () => KANJI_SECTION_KEYS.forEach(key => refreshKanaScoreShading('kanji-grid-' + key)) },
    'counter-quiz-selection': { home: 'numbers', onShow: () => buildCounterQuizSelectionList() },
    'desk-sheets': { home: 'build' },
    'sentence-builder': { home: 'build' },
  },
  // Random's own drills beside All / Weakest / Untested: each level, Untaught
  // and Tourist (shown when their setting is on), verb and adjective forms,
  // particles, small っ. Verb forms are always multiple choice with nothing
  // to drill by meaning or listen to; particles and small っ have fixed
  // buttons - so those switches fade for them.
  randomDrills: Object.assign(
    ...[1, 2, 3, 4].map(n => ({ ['L' + n]: { items: () => scanVocabByTag('L' + n), swatch: 'random-l' + n + '-swatch', start: () => startRandomForLevel(n) } })),
    {
      untaught: { items: () => scanVocabByTag(UNTAUGHT_ONLY_QUERY), swatch: 'random-untaught-swatch', card: 'random-untaught-card', shown: () => !!appSettings.showUntaught, start: () => startRandomForLevel('untaught') },
      tourist: { items: () => scanVocabByTag('tourist'), swatch: 'random-tourist-swatch', card: 'random-tourist-card', shown: () => !!appSettings.showTourist, start: () => startRandomForLevel('tourist') },
      verbforms: { items: () => verbFormScoreItems(), swatch: 'random-verbforms-swatch', start: () => startVerbFormDrill(), notFor: ['drill-mode-toggle-card', 'listen-toggle-card'] },
      adjforms: { items: () => adjFormScoreItems(), swatch: 'random-adjforms-swatch', start: () => startAdjFormDrill(), notFor: ['drill-mode-toggle-card', 'listen-toggle-card'] },
      particles: { items: () => particleScoreItems(), swatch: 'random-particles-swatch', start: () => startParticleDrill(), notFor: ['drill-mode-toggle-card', 'listen-toggle-card', 'type-answer-toggle-card', 'reversed-mode-toggle-card'] },
      sokuon: { items: () => sokuonScoreItems(), swatch: 'random-sokuon-swatch', start: () => startSokuonDrill(), notFor: ['drill-mode-toggle-card', 'listen-toggle-card', 'type-answer-toggle-card', 'reversed-mode-toggle-card'] },
    }),
  untestedCount: () => jaUntestedCount(),
  // The Vocab page's level pills and their lists (see jaPickMatchLevel).
  matchLevel: { pick: l => jaPickMatchLevel(l), pills: l => jaMatchLevelPills(l), lists: ['l12', 1, 2, 3, 4, 'andrew', 'untaught', 'tourist'], list: (c, l) => jaLevelList(c, l) },
  // Word lists: Latest words defaults to the last week; Groups sorted by
  // name; what Back calls each word-list view.
  // Optional tiers: words shown only when their setting is on. The first
  // match decides (a Tourist word is also Untaught, so it comes first).
  tiers: [
    { when: t => t.includes('untaught') && t.includes('tourist'), setting: 'showTourist' },
    { when: t => t.includes('untaught'), setting: 'showUntaught' },
    { when: t => t.includes('andrew'), setting: 'showAndrewMode' },
    { when: t => t.includes('genki') && !t.includes('taught'), setting: 'showUntaught' },
  ],
  pickUntested: () => pickUntested20(),
  groupCardCounts: false,
  // Tiles: Groups' Random picks 20; tap-to-hear only on the lists with
  // romaji tiles; level edges (a taught word takes its earliest level),
  // dashed for Tourist, Untaught and Genki; the drill button keeps its
  // wording; holding a card shows the reading (and, on a verb, its forms).
  // Drill by meaning: options in English instead of romaji. Rules out
  // typing; can't be used reversed or typed. Normally the options show the
  // reading (romaji); reversed, the Japanese.
  modeCards: [{ id: 'drill-mode-toggle-card', mode: 'meaning', disabledWhen: m => m.reversed || m.type, blocks: ['type'], apply: on => { drillByMeaning = on; } }],
  tileModeCards: [{ id: 'vocab-tile-drill-mode-card', on: k => !!vocabTileDrillMode[k], off: k => { vocabTileDrillMode[k] = false; }, disabledWhen: s => s.reversed || s.type, blocks: ['type'] }],
  optionField: () => vocabReversed ? 'jp' : (drillByMeaning ? 'en' : 'romaji'),
  // Saved with an unfinished drill: drill by meaning, kana direction, and
  // hiragana shown over katakana and kanji.
  sessionState: {
    save: () => ({ drillByMeaning, reversed, showHiraganaOnKatakana, showHiraganaOnKanji }),
    restore: s => { drillByMeaning = !!s.drillByMeaning; reversed = !!s.reversed; showHiraganaOnKatakana = !!s.showHiraganaOnKatakana; showHiraganaOnKanji = !!s.showHiraganaOnKanji; },
  },
  // Typing: the box for typing Japanese (not romaji) is styled as Japanese.
  // (Question kinds, and how each is scored, are in ja/questions.js.)
  targetInputClass: 'type-answer-jp',
  // Back closes the daily card or the verb-forms popup first; returns to a
  // screen exactly as it was left; a reference opened from the grammar
  // notes goes back to the grammar page.
  onBack: () => {
    const pop = document.querySelector('.proverb-overlay.show');
    if (!pop) return false;
    if (pop.id === 'verb-forms-overlay') dismissVerbFormsPopup(); else dismissProverbOverlay();
    return true;
  },
  navRestore: target => NAV_RESTORE[target],
  // Shown with every question: "also written", the romaji button, which
  // counters are in play - see ja/questions.js.
  beforeQuestion: (q, ui) => jaBeforeQuestion(q, ui),
  // Latest words are taught words only; drilling chosen tiles takes that
  // list's drill-by-meaning switch (never for lists that don't offer it).
  latestWordsFrom: items => items.filter(i => (i.tags || []).includes('taught')),
  latestRanges: [['batch', 'Newest'], ['1w', '1 week'], ['2w', '2 weeks'], ['level', 'This level']],
  // A word list's screen: no Select all on Groups (too big to be worth it);
  // Show romaji only on the lists with romaji tiles; Drill by meaning
  // except on lists that don't offer it.
  groupSelectAll: false,
  // A tile: the word with small kana sized right (ちょっと once read as
  // chi-yo-tsu-to), or with Show romaji on, its romaji (Latin runs wider, so
  // its own size steps); the meaning under it.
  tileHtml: (item, key) => {
    const romajiView = !!appSettings.tileShowRomaji && ROMAJI_VIEW_CATEGORIES.includes(key);
    const size = romajiView ? tileRomajiFontSize(item.romaji) : tileKanaFontSize(item.jp);
    return `<span class="kana-ref-char" style="font-size:${size};">${romajiView ? item.romaji : markSmallKana(item.jp)}</span><span class="kana-ref-rom">${item.en}</span>`;
  },
  onTileScreen: (key, cat) => {
    const romajiCard = document.getElementById('vocab-tile-romaji-card');
    if (romajiCard) {
      romajiCard.style.display = ROMAJI_VIEW_CATEGORIES.includes(key) ? 'flex' : 'none';
      romajiCard.classList.toggle('selected', !!appSettings.tileShowRomaji);
    }
    const modeCard = document.getElementById('vocab-tile-drill-mode-card');
    if (modeCard) modeCard.style.display = cat.noMeaningMode ? 'none' : 'flex';
  },
  onTileDrill: (key, cat) => { drillByMeaning = cat.noMeaningMode ? false : !!vocabTileDrillMode[key]; },
  // Screens: what happens on leaving one, which tab is lit, the すうじ tab.
  beforeShowScreen: id => jaBeforeShowScreen(id),
  pillFor: id => jaPillFor(id),
  onShowScreen: id => jaOnShowScreen(id),
  // A drill started with no deck is kana, from the kana settings; Drill
  // missed only rebuilds the kana and kanji; Back from a drill clears the
  // kana tables' and kanji's selections.
  defaultDeck: { build: () => buildDeck(), screen: 'hiragana-selection' },
  rebuildMissed: set => jaRebuildMissed(set),
  clearSelection: screen => jaClearSelection(screen),
  refBack: t => (t === 'grammar-notes-hub' || t === 'grammar-notes-hub-l3') ? () => showGrammarPage() : null,
  groupRandomPick: 20,
  tapToHearIn: key => ROMAJI_VIEW_CATEGORIES.includes(key),
  itemColorKey: item => jaItemColorKey(item),
  dashedLevels: ['curated', 'encountered', 'genki'],
  drillButtonCounts: false,
  tilePeekHint: key => jaTilePeekHint(key),
  onPeekHide: () => { peekStrokeToken++; },
  // Holding a word: its reading (or a kana drawn stroke by stroke); on a
  // verb, slide towards the bubble and let go for every form (2026-10-07).
  peekFill: (b, item) => jaPeekFill(b, item),
  peekSlide: item => isVerbItem(item) ? () => showVerbFormsPopup(item) : null,
  latestWordsDefault: '1w',
  // Private word lists (the Genki file): its format, and what a word must have.
  privateVocab: { format: 'jp-drill-private-vocab', wordOk: it => typeof it.jp === 'string' && typeof it.romaji === 'string' },
  groupOrder: 'alphabetical',
  vocabLabel: 'Vocabulary',
  matchLevelLabels: { grammar: 'Grammar', l12: 'L1/L2', 1: 'L1', 2: 'L2', 3: 'L3', 4: 'L4', tourist: 'Tourist', untaught: 'Untaught', andrew: 'Andrew' },
  // Japanese's own settings, applied with the core's.
  onApplySettings: [() => applyShowKanjiVisibility(), () => applyShowAndrewModeVisibility(), () => applyShowUntaughtVisibility(), () => applyShowTouristVisibility()],
  voiceNotes: {
    fallback: '',
    none: "This device doesn't seem to have a Japanese voice installed - add one in your phone's text-to-speech / spoken content settings.",
  },
};
