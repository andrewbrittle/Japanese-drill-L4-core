// Japanese - the kanji (2026-11-08, step 4 of the move onto the core): the
// kanji groups, their meanings, readings and example words, and the kanji
// screens and drill. Loaded after ja/kana.js, before ja/legacy.js.

// The kanji groups, added to the kana's DATA (see ja/kana.js).
Object.assign(DATA, {
  'kanji-numbers-time': [
    {char:'一',answer:'one',disp:'survival'},
    {char:'二',answer:'two',disp:'survival'},
    {char:'三',answer:'three',disp:'survival'},
    {char:'四',answer:'four',disp:'survival'},
    {char:'五',answer:'five',disp:'survival'},
    {char:'六',answer:'six',disp:'survival'},
    {char:'七',answer:'seven',disp:'survival'},
    {char:'八',answer:'eight',disp:'survival'},
    {char:'九',answer:'nine',disp:'survival'},
    {char:'十',answer:'ten',disp:'survival'},
    {char:'円',answer:'yen',disp:'survival'},
    {char:'月',answer:'Monday / month',disp:'survival'},
    {char:'火',answer:'Tuesday',disp:'survival',altForm:'火曜日'},
    {char:'水',answer:'Wednesday',disp:'survival',altForm:'水曜日'},
    {char:'木',answer:'Thursday',disp:'survival',altForm:'木曜日'},
    {char:'金',answer:'Friday / gold',disp:'survival'},
    {char:'土',answer:'Saturday / earth',disp:'survival'},
    {char:'日',answer:'Sunday',disp:'survival',altForm:'日曜日'},
    {char:'一月',answer:'January',disp:'survival'},
    {char:'二月',answer:'February',disp:'survival'},
    {char:'三月',answer:'March',disp:'survival'},
    {char:'四月',answer:'April',disp:'survival'},
    {char:'五月',answer:'May',disp:'survival'},
    {char:'六月',answer:'June',disp:'survival'},
    {char:'七月',answer:'July',disp:'survival'},
    {char:'八月',answer:'August',disp:'survival'},
    {char:'九月',answer:'September',disp:'survival'},
    {char:'十月',answer:'October',disp:'survival'},
    {char:'十一月',answer:'November',disp:'survival'},
    {char:'十二月',answer:'December',disp:'survival'},
    {char:'年',answer:'year',disp:'survival'},
    {char:'今',answer:'now',disp:'survival'},
    {char:'時',answer:'hour / time',disp:'survival'},
    {char:'分',answer:'minute',disp:'survival'},
    {char:'前',answer:'before / front',disp:'survival'},
    {char:'後',answer:'after / back',disp:'survival'},
    {char:'計',answer:'measure / plan (時計)',disp:'survival'},
    {char:'百',answer:'hundred',disp:'kanji'},
    {char:'千',answer:'thousand',disp:'kanji'},
    {char:'万',answer:'ten thousand',disp:'kanji'},
    {char:'半',answer:'half',disp:'kanji'},
    {char:'間',answer:'interval / space (時間)',disp:'kanji'},
    {char:'午',answer:'noon (午前/午後)',disp:'kanji'},
    {char:'時計',answer:'watch / clock',disp:'survival'},
    {char:'午前',answer:'morning / AM',disp:'survival'},
    {char:'午後',answer:'afternoon / PM',disp:'survival'},
    {char:'今年',answer:'this year',disp:'survival'},
    {char:'今日',answer:'today',disp:'survival'},
  ],
  'kanji-nature-body': [
    {char:'日',answer:'sun / day',disp:'kanji'},
    {char:'山',answer:'mountain',disp:'kanji'},
    {char:'川',answer:'river',disp:'kanji'},
    {char:'水',answer:'water',disp:'kanji'},
    {char:'人',answer:'person',disp:'kanji'},
    {char:'大',answer:'big / great',disp:'kanji'},
    {char:'小',answer:'small',disp:'kanji'},
    {char:'火',answer:'fire',disp:'kanji'},
    {char:'木',answer:'tree / wood',disp:'kanji'},
    {char:'口',answer:'mouth',disp:'kanji'},
    {char:'目',answer:'eye',disp:'kanji'},
    {char:'耳',answer:'ear',disp:'kanji'},
    {char:'手',answer:'hand',disp:'kanji'},
    {char:'足',answer:'foot / leg',disp:'kanji'},
    {char:'富士山',answer:'Mt. Fuji',disp:'kanji'},
    {char:'日本人',answer:'Japanese person',disp:'kanji'},
    {char:'日本',answer:'Japan',disp:'kanji'},
    {char:'雨',answer:'rain',disp:'survival'},
    {char:'晴れ',answer:'sunny',disp:'survival'},
    {char:'曇り',answer:'cloudy',disp:'survival'},
    {char:'暑い',answer:'hot',disp:'survival'},
    {char:'寒い',answer:'cold',disp:'survival'},
    {char:'雪',answer:'snow',disp:'survival'},
    {char:'天気',answer:'weather',disp:'kanji'},
    {char:'気',answer:'spirit / feeling',disp:'kanji'},
    {char:'天',answer:'heavens / sky',disp:'kanji'},
    // SEASONS (2026-09-01) - moved here from kanji-general at Andrew's call:
    // this section already blends nature/weather/body (雨/晴れ/曇り/暑い/
    // 寒い/雪/天気 above are weather kanji sitting in "Nature" too), so
    // seasons read as the same family, not a general-vocab leftover. All
    // four checked individually on jlptsensei.com: 春/夏/秋/冬 are
    // consistently N4 kanji despite はる/なつ/あき/ふゆ being basic N5
    // vocabulary - same "word is easy, character is a notch harder" split
    // as the N4 colours in kanji-general, so altForm carries the kana as
    // the "also written" note, same convention. Added alongside matching
    // vocab-weather entries the same day (see SEASONS comment there) -
    // unlike the existing weather kanji just above, which test the bare
    // character with no altForm at all, these keep the kana note since
    // that's the convention this specific addition was built under; not
    // worth relitigating the older items to match.
    {char:'春',answer:'spring',disp:'kanji',altForm:'はる'},
    {char:'夏',answer:'summer',disp:'kanji',altForm:'なつ'},
    {char:'秋',answer:'autumn',disp:'kanji',altForm:'あき'},
    {char:'冬',answer:'winter',disp:'kanji',altForm:'ふゆ'},
  ],
  'kanji-places': [
    {char:'駅',answer:'station',disp:'survival'},
    {char:'空港',answer:'airport',disp:'survival'},
    {char:'店',answer:'shop / store',disp:'survival',altForm:'お店'},
    {char:'院',answer:'institution',disp:'survival'},
    {char:'校',answer:'school',disp:'survival',altForm:'学校'},
    {char:'公園',answer:'park',disp:'survival'},
    {char:'教室',answer:'classroom',disp:'survival'},
    {char:'食堂',answer:'canteen / cafeteria',disp:'survival'},
    {char:'地下',answer:'underground / basement',disp:'survival'},
    {char:'東京',answer:'Tokyo',disp:'survival'},
    {char:'東口',answer:'east exit',disp:'survival'},
    {char:'西口',answer:'west exit',disp:'survival'},
    {char:'南口',answer:'south exit',disp:'survival'},
    {char:'北口',answer:'north exit',disp:'survival'},
    {char:'東京駅',answer:'Tokyo Station',disp:'survival'},
    {char:'病院',answer:'hospital',disp:'survival'},
    {char:'小学校',answer:'elementary school',disp:'survival'},
    {char:'中学校',answer:'middle school',disp:'survival'},
    {char:'大学',answer:'university',disp:'survival'},
  ],
  'kanji-directions-travel': [
    {char:'上',answer:'up / above',disp:'survival'},
    {char:'下',answer:'down / below',disp:'survival'},
    {char:'左',answer:'left',disp:'survival'},
    {char:'右',answer:'right',disp:'survival'},
    {char:'中',answer:'middle / inside',disp:'survival'},
    {char:'東',answer:'east',disp:'survival'},
    {char:'西',answer:'west',disp:'survival'},
    {char:'南',answer:'south',disp:'survival'},
    {char:'北',answer:'north',disp:'survival'},
    {char:'電',answer:'electric',disp:'survival'},
    {char:'車',answer:'car / vehicle',disp:'survival'},
    {char:'線',answer:'line',disp:'survival'},
    {char:'道',answer:'road / way',disp:'survival'},
    {char:'病',answer:'sick / illness',disp:'survival'},
    {char:'行',answer:'go / bank (銀行)',disp:'survival',altForm:'銀行'},
    {char:'止',answer:'stop',disp:'survival'},
    {char:'危',answer:'dangerous',disp:'survival'},
    {char:'険',answer:'risk / steep',disp:'survival'},
    {char:'注',answer:'pour / focus (注意)',disp:'survival'},
    {char:'意',answer:'meaning / attention',disp:'survival'},
    {char:'禁',answer:'prohibit',disp:'survival'},
    {char:'開',answer:'open',disp:'survival'},
    {char:'閉',answer:'closed',disp:'survival'},
    {char:'押',answer:'push',disp:'survival'},
    {char:'引',answer:'pull',disp:'survival'},
    {char:'入',answer:'enter',disp:'survival'},
    {char:'出',answer:'exit / leave',disp:'survival'},
    {char:'階',answer:'floor / storey',disp:'survival'},
    {char:'切符',answer:'ticket',disp:'survival'},
    {char:'受付',answer:'reception',disp:'survival'},
    {char:'警告',answer:'warning',disp:'survival'},
    {char:'地震',answer:'earthquake',disp:'survival'},
    {char:'津波',answer:'tsunami',disp:'survival'},
    {char:'避難',answer:'evacuate',disp:'survival'},
    {char:'電車',answer:'train',disp:'survival'},
    {char:'地下鉄',answer:'subway',disp:'survival'},
    {char:'左折',answer:'turn left',disp:'survival'},
    {char:'右折',answer:'turn right',disp:'survival'},
    {char:'山手線',answer:'Yamanote Line',disp:'survival'},
    {char:'開く',answer:'to open',disp:'survival'},
    {char:'閉まる',answer:'to close',disp:'survival'},
    {char:'押す',answer:'to push',disp:'survival'},
    {char:'引く',answer:'to pull',disp:'survival'},
    {char:'止まれ',answer:'Stop! (sign)',disp:'survival'},
  ],
  'kanji-food': [
    {char:'食べる',answer:'to eat',disp:'survival'},
    {char:'飲む',answer:'to drink',disp:'survival'},
    {char:'魚',answer:'fish',disp:'survival'},
    {char:'野菜',answer:'vegetable',disp:'survival'},
    {char:'ご飯',answer:'rice / meal',disp:'survival'},
    {char:'朝食',answer:'breakfast',disp:'survival'},
    {char:'昼食',answer:'lunch',disp:'survival'},
    {char:'夕食',answer:'dinner',disp:'survival'},
    {char:'高い',answer:'expensive / high',disp:'survival'},
    {char:'安い',answer:'cheap',disp:'survival'},
  ],
  'kanji-people': [
    {char:'私',answer:'I / me',disp:'kanji'},
    {char:'何',answer:'what',disp:'kanji'},
    {char:'誰',answer:'who',disp:'kanji'},
    {char:'学生',answer:'student',disp:'kanji'},
    {char:'先生',answer:'teacher',disp:'kanji'},
    {char:'母',answer:'mother',disp:'kanji'},
    {char:'父',answer:'father',disp:'kanji'},
    {char:'友',answer:'friend',disp:'kanji'},
    {char:'子',answer:'child',disp:'kanji'},
    {char:'男',answer:'male',disp:'kanji'},
    {char:'女',answer:'female',disp:'kanji'},
  ],
  'kanji-general': [
    {char:'国',answer:'country',disp:'kanji'},
    {char:'名',answer:'name',disp:'kanji'},
    {char:'本',answer:'book',disp:'kanji'},
    {char:'語',answer:'language',disp:'kanji'},
    {char:'外',answer:'outside',disp:'kanji'},
    {char:'長い',answer:'long',disp:'kanji'},
    {char:'短い',answer:'short',disp:'kanji'},
    {char:'毎',answer:'every',disp:'kanji'},
    {char:'上手',answer:'skilled / good at',disp:'kanji'},
    // COLOURS (2026-09-01) - closes the long-flagged "N5 minus 白" gap:
    // the survival-kanji set had grown close to full N5 coverage but 白
    // never had anywhere to sit. Same logic as vocab-colours (Not covered
    // in lessons, kept anyway - see that category's own note) applied here
    // to the kanji side. Checked against jlptsensei.com per-kanji (not
    // per-word) levels, not assumed - kanji difficulty and word difficulty
    // aren't the same thing for colours, and it shows: 白/赤/青/黒/茶 land at
    // N5/N4 as expected, but 黄 and 緑 are N2 kanji despite "yellow" and
    // "green" being basic N5 vocabulary (きいろ/みどり are simple words that
    // just happen to almost always be written in kana), and 紫 is N1. So the
    // scope here is exactly N5 + N4, same boundary Andrew asked for:
    //   - 白 (N5) - the original gap, added plain, no alt needed.
    //   - 赤/青/黒 (N4) - each gets altForm as the kana form (あか/あお/くろ),
    //     shown as "also written" before answering per the standard altForm
    //     treatment - a step down from 白's certainty, worth the reminder.
    //   - 茶色 (N4, via 茶) - char is the two-kanji compound, not 茶 alone
    //     (茶 alone means "tea", not "brown"), same convention as 上手 above
    //     and 学生/先生 in kanji-people. altForm ちゃいろ, same treatment.
    // 黄色/緑/紫 stay kana-only (N2/N2/N1 - out of scope) and オレンジ/ピンク
    // stay untouched entirely - genuine katakana loanwords, no kanji form
    // exists to add, ever. Nothing else in vocab-colours changes; this only
    // adds parallel kanji-general entries, same words already taught there.
    {char:'白',answer:'white',disp:'kanji'},
    {char:'赤',answer:'red',disp:'kanji',altForm:'あか'},
    {char:'青',answer:'blue',disp:'kanji',altForm:'あお'},
    {char:'黒',answer:'black',disp:'kanji',altForm:'くろ'},
    {char:'茶色',answer:'brown',disp:'kanji',altForm:'ちゃいろ'},
  ],
  'kanji-verbs': [
    {char:'見る',answer:'to see',disp:'kanji'},
    {char:'聞く',answer:'to hear / ask',disp:'kanji'},
    {char:'話す',answer:'to talk',disp:'kanji'},
    {char:'読む',answer:'to read',disp:'kanji'},
    {char:'書く',answer:'to write',disp:'kanji'},
    {char:'来る',answer:'to come',disp:'kanji'},
    {char:'休む',answer:'to rest / day off',disp:'kanji'},
  ],
});

const KANJI_KEYS = Object.keys(DATA).filter(k => k.startsWith('kanji-'));

let showHiraganaOnKanji = false;

function toggleHiraganaOnKanji() {
  showHiraganaOnKanji = !showHiraganaOnKanji;
  const card = document.getElementById('kanji-hiragana-answers-card');
  if (card) card.classList.toggle('selected', showHiraganaOnKanji);
}

const KANJI_SECTIONS = {
  'numbers-time': { label: 'Numbers', dataKey: 'kanji-numbers-time' },
  'nature-body': { label: 'Nature', dataKey: 'kanji-nature-body' },
  'directions-travel': { label: 'Travel', dataKey: 'kanji-directions-travel' },
  'food': { label: 'Food', dataKey: 'kanji-food' },
  'places': { label: 'Places', dataKey: 'kanji-places' },
  'people': { label: 'People', dataKey: 'kanji-people' },
  'general': { label: 'General', dataKey: 'kanji-general' },
  'verbs': { label: 'Verbs', dataKey: 'kanji-verbs' },
};

const KANJI_SECTION_KEYS = Object.keys(KANJI_SECTIONS);

// Verbs is a computed cross-section pool, not a fixed one - it surfaces every
// "to ___" verb wherever it actually lives (e.g. eat/drink stay defined in
// Food, open/push stay defined in Travel) alongside the general verbs that
// only live here, with nothing duplicated into a second DATA array. Single
// source of truth per item, so scoring, romaji, and Random Kanji's own
// distractor pool are all unaffected. Each item keeps its true home section
// as groupKey (via Object.assign below), same convention buildRandomKanjiPool
// already uses, so the drill badge shows where a verb actually belongs.
function getKanjiSectionPool(sectionKey) {
  if (sectionKey !== 'verbs') return DATA[KANJI_SECTIONS[sectionKey].dataKey];
  const pool = [];
  KANJI_KEYS.forEach(k => {
    DATA[k].forEach(item => {
      if (item.answer.startsWith('to ')) pool.push(Object.assign({groupKey: k}, item));
    });
  });
  return pool;
}

const kanjiSelectedTiles = {};

KANJI_SECTION_KEYS.forEach(k => { kanjiSelectedTiles[k] = new Set(); });

let activeKanjiSection = 'numbers-time';

// Kanji index (2026-10-08): cards with confidence bars, like the Kana index.
function showKanjiIndex() {
  showScreen('kanji-index');
}

function refreshKanjiIndexSwatches() {
  KANJI_SECTION_KEYS.forEach(key => setupCatBar(document.getElementById('kanji-index-swatch-' + key), getCategoryBandCountsKanji(getKanjiSectionPool(key))));
  setupCatBar(document.getElementById('kanji-index-swatch-all'), getCategoryBandCountsKanji(getAllKanjiFlat()));
}

// One set's selection screen - entered with a fixed section, like
// showHiraganaSelection(section). The per-section grids stay built and
// cached as before; only the chosen one is shown.
function showKanjiSectionSelection(sectionKey) {
  activeKanjiSection = sectionKey || activeKanjiSection;
  showScreen('kanji-selection');
  KANJI_SECTION_KEYS.forEach(key => {
    buildKanjiTileGrid(key);
    refreshKanaScoreShading('kanji-grid-' + key);
    const el = document.getElementById('kanji-grid-' + key);
    if (el) el.style.display = key === activeKanjiSection ? '' : 'none';
  });
  const titleEl = document.getElementById('kanji-selection-title');
  if (titleEl) titleEl.textContent = 'Kanji — ' + KANJI_SECTIONS[activeKanjiSection].label;
  document.getElementById('kanji-selection-drill-btn').disabled = kanjiSelectedTiles[activeKanjiSection].size === 0;
  updateSelectAllKanjiLabel();
}

function showKanjiSelection() { showKanjiSectionSelection(activeKanjiSection); }

// Individual-tile selection, unlike kana's row-selection — kanji categories
// are thematic groupings with no internal structure to select by row.
function buildKanjiTileGrid(sectionKey) {
  const container = document.getElementById('kanji-grid-' + sectionKey);
  if (!container || container.children.length > 0) return;
  const data = getKanjiSectionPool(sectionKey);

  const grid = document.createElement('div');
  grid.className = 'kanji-tile-grid';

  data.forEach((item, idx) => {
    const tile = document.createElement('div');
    tile.className = 'kana-ref-card';
    tile.innerHTML = `<span class="kana-ref-char">${markSmallKana(item.char)}</span><span class="kana-ref-rom">${item.answer}</span>`;
    const scoreKey = item.char + '|' + item.answer;
    tile.dataset.scoreKey = scoreKey;
    const scoreClass = kanaScoreClass(scoreKey);
    if (scoreClass) tile.classList.add(scoreClass);
    tile.onclick = () => toggleKanjiTile(sectionKey, idx, tile);
    grid.appendChild(tile);
  });

  container.appendChild(grid);
}

function toggleKanjiTile(sectionKey, idx, tileEl) {
  const set = kanjiSelectedTiles[sectionKey];
  if (set.has(idx)) {
    set.delete(idx);
    tileEl.classList.remove('selected');
  } else {
    set.add(idx);
    tileEl.classList.add('selected');
  }
  document.getElementById('kanji-selection-drill-btn').disabled = set.size === 0;
  updateSelectAllKanjiLabel();
}

// The section pills are gone (2026-10-08); kept as a name for anything
// that still switches section directly.
function switchKanjiSection(sectionKey) { showKanjiSectionSelection(sectionKey); }

function toggleSelectAllKanji() {
  const total = getKanjiSectionPool(activeKanjiSection).length;
  const set = kanjiSelectedTiles[activeKanjiSection];
  const grid = document.getElementById('kanji-grid-' + activeKanjiSection);
  const allSelected = set.size === total;
  if (allSelected) {
    set.clear();
    if (grid) grid.querySelectorAll('.kana-ref-card').forEach(t => t.classList.remove('selected'));
  } else {
    for (let i = 0; i < total; i++) set.add(i);
    if (grid) grid.querySelectorAll('.kana-ref-card').forEach(t => t.classList.add('selected'));
  }
  document.getElementById('kanji-selection-drill-btn').disabled = set.size === 0;
  updateSelectAllKanjiLabel();
}

function updateSelectAllKanjiLabel() {
  const section = KANJI_SECTIONS[activeKanjiSection];
  const total = getKanjiSectionPool(activeKanjiSection).length;
  const set = kanjiSelectedTiles[activeKanjiSection];
  const allSelected = set.size === total;
  document.getElementById('kanji-select-all-label').textContent =
    (allSelected ? 'Deselect all — ' : 'Select all — ') + section.label;
}

// Builds options by drawing 3 other real kanji from the given pool, rather
// than using the item's own hand-authored options - every distractor is now
// something genuinely drillable in its own right, not an invented phrase
// with no backing anywhere else in the app.
function buildKanjiOptionsFromPool(item, pool) {
  const candidates = pool.filter(w => !(w.char === item.char && w.answer === item.answer));
  const distractorItems = shuffle(candidates).slice(0, 3);
  const allItems = shuffle([item, ...distractorItems]);
  return allItems.map(w => ({
    en: w.answer,
    jp: w.char,
    rd: KANJI_ROMAJI[w.char + '|' + w.answer] || '',
  }));
}

function drillKanjiSelection() {
  const section = KANJI_SECTIONS[activeKanjiSection];
  const selectedIdx = kanjiSelectedTiles[activeKanjiSection];
  if (selectedIdx.size === 0) return;
  const data = getKanjiSectionPool(activeKanjiSection);
  const customDeck = [...selectedIdx].sort((a, b) => a - b).map(idx => {
    const item = data[idx];
    return Object.assign({ groupKey: section.dataKey }, item, { options: buildKanjiOptionsFromPool(item, data) });
  });
  lastSettingsScreen = 'kanji-selection';
  startDrill(shuffle(customDeck));
}

// Pulled out of buildRandomKanjiPool so the "All kanji" card on the Themes
// screen can compute its confidence swatch from the exact same full,
// unsliced pool the actual drill draws its 20 from - rather than a second,
// separately-maintained copy of "every kanji everywhere" that could drift
// out of sync with it.
function getAllKanjiFlat() {
  const allKanji = [];
  KANJI_KEYS.forEach(k => DATA[k].forEach(q => allKanji.push(Object.assign({groupKey: k}, q))));
  return allKanji;
}

function buildRandomKanjiPool() {
  const allKanji = getAllKanjiFlat();
  // See the WEIGHTED RANDOM SELECTION and DECAY entries above kanaScoreClass -
  // same weighted draw as buildVocabReadingDeck, keyed the kanji way
  // (char+answer, matching getScoreKey/getItemsAverageScoreKanji), always
  // reading the decayed score regardless of the colours setting.
  const pool = weightedSampleWithoutReplacement(allKanji, 20, item => selectionWeight(decayedScore(kanaScores[item.char + '|' + item.answer])));
  return pool.map(item => Object.assign({}, item, { options: buildKanjiOptionsFromPool(item, allKanji) }));
}

function startRandomKanji() {
  lastSettingsScreen = 'kanji-index'; // back to the Kanji list after a Random 20 (2026-10-08)
  startDrill(buildRandomKanjiPool(), buildRandomKanjiPool);
}

function tryResumeKanji() {
  if (!appSettings.showKanji) return; // backstop - pill is also hidden via CSS
  showKanjiIndex();
}

// Same as getCategoryBandCounts, but for kanji items (char/answer key,
// matching getItemsAverageScoreKanji) - Collections' All kanji card is the
// only cat-bar user needing this shape rather than the jp/en vocab one.
function getCategoryBandCountsKanji(items) {
  const counts = { untested: 0, neg3: 0, neg2: 0, neg1: 0, neutral: 0, pos1: 0, pos2: 0, pos3: 0, pos4: 0 };
  (items || []).forEach(item => {
    const key = item.char + '|' + item.answer;
    const entry = kanaScores[key];
    if (!entry) { counts.untested++; return; }
    counts[confidenceBand(displayScore(entry))]++;
  });
  return counts;
}

// Same averaging rule as getItemsAverageScore, but for raw kanji DATA items
// (char/answer) rather than VOCAB items (jp/en) - getScoreKey() uses
// char+'|'+answer for kanji, so this mirrors that exactly rather than
// reusing the vocab version, which would build the wrong key for these.
function getItemsAverageScoreKanji(items) {
  if (!items || !items.length) return null;
  let total = 0, count = 0;
  items.forEach(item => {
    const key = item.char + '|' + item.answer;
    if (key in kanaScores) { total += displayScore(kanaScores[key]); count++; }
  });
  return count ? total / count : null;
}

// Explicit hiragana readings for every kanji/survival item, keyed by "char|answer"
// (unique across the whole kanji dataset). Needed because feeding a bare kanji
// character to the browser's TTS is unreliable — kanji can have multiple possible
// readings, and the engine often guesses wrong or truncates. Some entries here are
// compound-word readings (e.g. 日|sun / day → にほん, testing "Japan" in context)
// rather than the character's isolated reading — that matches what the app's own
// answer options already test, so the audio says exactly what's shown on screen.
// Romaji for every kanji item, mined from the existing hand-authored options
// (each item already lists itself as one of its own options, so this is safe
// - already-verified data, not a new hiragana-to-romaji converter to debug).
// Used to generate distractor options dynamically drawn from real kanji in
// the same section, rather than one-off invented flavour phrases.
const KANJI_ROMAJI = {
  '一|one': 'ichi',
  '二|two': 'ni',
  '三|three': 'san',
  '四|four': 'shi',
  '五|five': 'go',
  '六|six': 'roku',
  '七|seven': 'shichi',
  '八|eight': 'hachi',
  '九|nine': 'ku',
  '十|ten': 'juu',
  '円|yen': 'en',
  '月|Monday / month': 'getsuyoubi',
  '火|Tuesday': 'kayoubi',
  '水|Wednesday': 'suiyoubi',
  '木|Thursday': 'mokuyoubi',
  '金|Friday / gold': 'kinyoubi',
  '土|Saturday / earth': 'doyoubi',
  '日|Sunday': 'nichiyoubi',
  '一月|January': 'ichigatsu',
  '二月|February': 'nigatsu',
  '三月|March': 'sangatsu',
  '四月|April': 'shigatsu',
  '五月|May': 'gogatsu',
  '六月|June': 'rokugatsu',
  '七月|July': 'shichigatsu',
  '八月|August': 'hachigatsu',
  '九月|September': 'kugatsu',
  '十月|October': 'juugatsu',
  '十一月|November': 'juuichigatsu',
  '十二月|December': 'juunigatsu',
  '年|year': 'toshi',
  '今|now': 'ima',
  '時|hour / time': 'toki',
  '分|minute': 'fun',
  '前|before / front': 'mae',
  '後|after / back': 'ato',
  '計|measure / plan (時計)': 'kei',
  '百|hundred': 'hyaku',
  '千|thousand': 'sen',
  '万|ten thousand': 'man',
  '半|half': 'han',
  '間|interval / space (時間)': 'kan',
  '午|noon (午前/午後)': 'go',
  '日|sun / day': 'hi',
  '山|mountain': 'yama',
  '川|river': 'kawa',
  '水|water': 'mizu',
  '人|person': 'hito',
  '大|big / great': 'dai',
  '小|small': 'shou',
  '火|fire': 'hi',
  '木|tree / wood': 'ki',
  '口|mouth': 'kuchi',
  '目|eye': 'me',
  '耳|ear': 'mimi',
  '手|hand': 'te',
  '足|foot / leg': 'ashi',
  '上|up / above': 'ue',
  '下|down / below': 'shita',
  '左|left': 'hidari',
  '右|right': 'migi',
  '中|middle / inside': 'naka',
  '東|east': 'higashi',
  '西|west': 'nishi',
  '南|south': 'minami',
  '北|north': 'kita',
  '駅|station': 'eki',
  '電|electric': 'den',
  '車|car / vehicle': 'kuruma',
  '線|line': 'sen',
  '道|road / way': 'michi',
  '空港|airport': 'kuukou',
  '店|shop / store': 'mise',
  '病|sick / illness': 'byou',
  '院|institution': 'in',
  '校|school': 'kou',
  '行|go / bank (銀行)': 'iku',
  '公園|park': 'kouen',
  '止|stop': 'shi',
  '危|dangerous': 'abunai',
  '険|risk / steep': 'ken',
  '注|pour / focus (注意)': 'chuu',
  '意|meaning / attention': 'i',
  '禁|prohibit': 'kin',
  '開|open': 'hiraku',
  '閉|closed': 'shimaru',
  '押|push': 'osu',
  '引|pull': 'hiku',
  '入|enter': 'hairu',
  '出|exit / leave': 'deru',
  '階|floor / storey': 'kai',
  '切符|ticket': 'kippu',
  '受付|reception': 'uketsuke',
  '教室|classroom': 'kyoushitsu',
  '食堂|canteen / cafeteria': 'shokudou',
  '男|male': 'otoko',
  '女|female': 'onna',
  '警告|warning': 'keikoku',
  '地震|earthquake': 'jishin',
  '津波|tsunami': 'tsunami',
  '避難|evacuate': 'hinan',
  '地下|underground / basement': 'chika',
  '食べる|to eat': 'taberu',
  '飲む|to drink': 'nomu',
  '魚|fish': 'sakana',
  '野菜|vegetable': 'yasai',
  'ご飯|rice / meal': 'gohan',
  '朝食|breakfast': 'choushoku',
  '昼食|lunch': 'chuushoku',
  '夕食|dinner': 'yuushoku',
  '高い|expensive / high': 'takai',
  '安い|cheap': 'yasui',
  '雨|rain': 'ame',
  '晴れ|sunny': 'hare',
  '曇り|cloudy': 'kumori',
  '暑い|hot': 'atsui',
  '寒い|cold': 'samui',
  '雪|snow': 'yuki',
  '天気|weather': 'tenki',
  '気|spirit / feeling': 'ki',
  '天|heavens / sky': 'ten',
  '私|I / me': 'watashi',
  '何|what': 'nan',
  '誰|who': 'dare',
  '学生|student': 'gakusei',
  '先生|teacher': 'sensei',
  '母|mother': 'haha',
  '父|father': 'chichi',
  '友|friend': 'tomo',
  '子|child': 'ko',
  '国|country': 'kuni',
  '名|name': 'na',
  '本|book': 'hon',
  '語|language': 'go',
  '外|outside': 'soto',
  '長い|long': 'nagai',
  '短い|short': 'mijikai',
  '毎|every': 'mai',
  '見る|to see': 'miru',
  '聞く|to hear / ask': 'kiku',
  '話す|to talk': 'hanasu',
  '読む|to read': 'yomu',
  '書く|to write': 'kaku',
  '来る|to come': 'kuru',
  '休む|to rest / day off': 'yasumu',

  // Promoted compound words - previously only shown as passive "(example:
  // ...)" text under their parent single kanji, now real drillable items in
  // their own right (parent kanji items are untouched and still drill their
  // own standalone reading/meaning separately).
  '富士山|Mt. Fuji': 'fujisan',
  '日本人|Japanese person': 'nihonjin',
  '日本|Japan': 'nihon',
  '大学|university': 'daigaku',
  '小学校|elementary school': 'shougakkou',
  '電車|train': 'densha',
  '中学校|middle school': 'chuugakkou',
  '上手|skilled / good at': 'jouzu',
  '地下鉄|subway': 'chikatetsu',
  '左折|turn left': 'sasetsu',
  '右折|turn right': 'usetsu',
  '東京|Tokyo': 'toukyou',
  '東口|east exit': 'higashiguchi',
  '西口|west exit': 'nishiguchi',
  '南口|south exit': 'minamiguchi',
  '北口|north exit': 'kitaguchi',
  '東京駅|Tokyo Station': 'toukyoueki',
  '山手線|Yamanote Line': 'yamanotesen',
  '病院|hospital': 'byouin',
  '時計|watch / clock': 'tokei',
  '午前|morning / AM': 'gozen',
  '午後|afternoon / PM': 'gogo',
  '今年|this year': 'kotoshi',
  '今日|today': 'kyou',
  '開く|to open': 'hiraku',
  '閉まる|to close': 'shimaru',
  '押す|to push': 'osu',
  '引く|to pull': 'hiku',
  '止まれ|Stop! (sign)': 'tomare',
};

// Compound-word form for items whose tested reading differs from the bare
// character (e.g. 月 tests via 月曜日) - feeds the "(example: ...)" feedback
// note. Only 47 entries, since most kanji are tested via their own bare
// character and need no separate compound form here. (7 former entries -
// 校/店/行/火/水/木/日 - moved to using the item's own `altForm` field instead,
// since their compound's English meaning is a word-for-word duplicate of the
// parent kanji's own tested answer; altForm shows it up front via the gold
// "also written:" box rather than only after answering, and there's no
// ambiguity to soften with an "(example: ...)" hedge in these cases.)
const KANJI_COMPOUND = {
  '円|yen': '千円',
  '月|Monday / month': '月曜日',
  '金|Friday / gold': '金曜日',
  '土|Saturday / earth': '土曜日',
  '年|year': '今年',
  '今|now': '今日',
  '時|hour / time': '時間',
  '分|minute': '三分',
  '前|before / front': '午前',
  '後|after / back': '午後',
  '計|measure / plan (時計)': '時計',
  '間|interval / space (時間)': '時間',
  '午|noon (午前/午後)': '午後',
  '日|sun / day': '日本',
  '山|mountain': '富士山',
  '人|person': '日本人',
  '大|big / great': '大学',
  '小|small': '小学校',
  '上|up / above': '上手',
  '下|down / below': '地下鉄',
  '左|left': '左折',
  '右|right': '右折',
  '中|middle / inside': '中学校',
  '東|east': '東京',
  '西|west': '西口',
  '南|south': '南口',
  '北|north': '北口',
  '駅|station': '東京駅',
  '電|electric': '電車',
  '車|car / vehicle': '電車',
  '線|line': '山手線',
  '病|sick / illness': '病院',
  '院|institution': '病院',
  '止|stop': '止まれ',
  '危|dangerous': '危険',
  '険|risk / steep': '危険',
  '注|pour / focus (注意)': '注意',
  '意|meaning / attention': '注意',
  '禁|prohibit': '禁止',
  '開|open': '開く',
  '閉|closed': '閉まる',
  '押|push': '押す',
  '引|pull': '引く',
  '入|enter': '入口',
  '出|exit / leave': '出口',
  '階|floor / storey': '二階',
  '毎|every': '毎日',
};

const KANJI_READINGS = {
  '一|one': 'いち', '二|two': 'に', '三|three': 'さん', '四|four': 'し', '五|five': 'ご',
  '六|six': 'ろく', '七|seven': 'しち', '八|eight': 'はち', '九|nine': 'く', '十|ten': 'じゅう',
  '円|yen': 'えん', '月|Monday / month': 'げつようび', '火|Tuesday': 'かようび',
  '水|Wednesday': 'すいようび', '木|Thursday': 'もくようび', '金|Friday / gold': 'きんようび',
  '土|Saturday / earth': 'どようび', '日|Sunday': 'にちようび', '年|year': 'とし', '今|now': 'いま', '時|hour / time': 'とき',
  '一月|January': 'いちがつ', '二月|February': 'にがつ', '三月|March': 'さんがつ', '四月|April': 'しがつ',
  '五月|May': 'ごがつ', '六月|June': 'ろくがつ', '七月|July': 'しちがつ', '八月|August': 'はちがつ',
  '九月|September': 'くがつ', '十月|October': 'じゅうがつ', '十一月|November': 'じゅういちがつ', '十二月|December': 'じゅうにがつ',

  '今年|this year': 'ことし', '今日|today': 'きょう',
  '午前|morning / AM': 'ごぜん', '午後|afternoon / PM': 'ごご',
  '時計|watch / clock': 'とけい',
  '日本|Japan': 'にほん', '富士山|Mt. Fuji': 'ふじさん',
  '大学|university': 'だいがく', '日本人|Japanese person': 'にほんじん',
  '小学校|elementary school': 'しょうがっこう', '上手|skilled / good at': 'じょうず', '地下鉄|subway': 'ちかてつ',
  '左折|turn left': 'させつ', '右折|turn right': 'うせつ',
  '中学校|middle school': 'ちゅうがっこう',
  '東京|Tokyo': 'とうきょう',
  '東口|east exit': 'ひがしぐち',
  '西口|west exit': 'にしぐち', '南口|south exit': 'みなみぐち',
  '北口|north exit': 'きたぐち',
  '東京駅|Tokyo Station': 'とうきょうえき',
  '電車|train': 'でんしゃ',
  '山手線|Yamanote Line': 'やまのてせん',
  '病院|hospital': 'びょういん',
  '止まれ|Stop! (sign)': 'とまれ',
  '開く|to open': 'ひらく', '閉まる|to close': 'しまる',
  '押す|to push': 'おす', '引く|to pull': 'ひく',
  '分|minute': 'ふん', '前|before / front': 'まえ', '後|after / back': 'あと',
  '計|measure / plan (時計)': 'けい', '百|hundred': 'ひゃく', '千|thousand': 'せん', '万|ten thousand': 'まん',
  '半|half': 'はん', '間|interval / space (時間)': 'かん', '午|noon (午前/午後)': 'ご',

  '日|sun / day': 'ひ', '山|mountain': 'やま', '川|river': 'かわ', '水|water': 'みず',
  '人|person': 'ひと', '大|big / great': 'だい', '小|small': 'しょう', '火|fire': 'ひ',
  '木|tree / wood': 'き', '口|mouth': 'くち', '目|eye': 'め', '耳|ear': 'みみ', '手|hand': 'て', '足|foot / leg': 'あし',

  '上|up / above': 'うえ', '下|down / below': 'した', '左|left': 'ひだり', '右|right': 'みぎ',
  '中|middle / inside': 'なか', '東|east': 'ひがし', '西|west': 'にし', '南|south': 'みなみ',
  '北|north': 'きた', '駅|station': 'えき', '電|electric': 'でん', '車|car / vehicle': 'くるま',
  '線|line': 'せん', '道|road / way': 'みち', '空港|airport': 'くうこう', '店|shop / store': 'みせ',
  '病|sick / illness': 'びょう', '院|institution': 'いん', '校|school': 'こう',
  '行|go / bank (銀行)': 'いく', '公園|park': 'こうえん', '止|stop': 'し', '危|dangerous': 'あぶない',
  '険|risk / steep': 'けん', '注|pour / focus (注意)': 'ちゅう', '意|meaning / attention': 'い',
  '禁|prohibit': 'きん', '開|open': 'ひらく', '閉|closed': 'しまる', '押|push': 'おす', '引|pull': 'ひく',
  '入|enter': 'はいる', '出|exit / leave': 'でる', '階|floor / storey': 'かい',
  '切符|ticket': 'きっぷ', '受付|reception': 'うけつけ', '教室|classroom': 'きょうしつ',
  '食堂|canteen / cafeteria': 'しょくどう', '男|male': 'おとこ', '女|female': 'おんな',
  '警告|warning': 'けいこく', '地震|earthquake': 'じしん', '津波|tsunami': 'つなみ',
  '避難|evacuate': 'ひなん', '地下|underground / basement': 'ちか',

  '食べる|to eat': 'たべる', '飲む|to drink': 'のむ', '魚|fish': 'さかな', '野菜|vegetable': 'やさい',
  'ご飯|rice / meal': 'ごはん', '朝食|breakfast': 'ちょうしょく', '昼食|lunch': 'ちゅうしょく',
  '夕食|dinner': 'ゆうしょく', '高い|expensive / high': 'たかい', '安い|cheap': 'やすい',

  '雨|rain': 'あめ', '晴れ|sunny': 'はれ', '曇り|cloudy': 'くもり', '暑い|hot': 'あつい',
  '寒い|cold': 'さむい', '雪|snow': 'ゆき', '天気|weather': 'てんき', '気|spirit / feeling': 'き', '天|heavens / sky': 'てん',

  '私|I / me': 'わたし', '何|what': 'なん', '誰|who': 'だれ', '学生|student': 'がくせい',
  '先生|teacher': 'せんせい', '母|mother': 'はは', '父|father': 'ちち', '友|friend': 'とも', '子|child': 'こ',

  '国|country': 'くに', '名|name': 'な', '本|book': 'ほん', '語|language': 'ご', '外|outside': 'そと',
  '長い|long': 'ながい', '短い|short': 'みじかい', '毎|every': 'まい',

  '見る|to see': 'みる', '聞く|to hear / ask': 'きく', '話す|to talk': 'はなす', '読む|to read': 'よむ',
  '書く|to write': 'かく', '来る|to come': 'くる', '休む|to rest / day off': 'やすむ',
};

// A second trigger for the exact same hint as speakCurrent() - reveals the
// reading as text instead of audio. Deliberately shares hintUsedThisQuestion
// and hints with speakCurrent() rather than tracking its own count, so using
// either (or both) on the same question only ever costs one hint, same as
// pressing speak twice already costs only one. Never touches q.char or
// anything the score key reads (see getScoreKey) - this only ever changes
// what's rendered in q-romaji-reveal, nothing the deck/scoring sees.
// Matches the same CJK ideograph range used when this word's kanjiReading
// data was generated - kept in sync with that build process, not guessed.
const KANJI_CHAR_RE = /[一-鿿㐀-䶿]/;
