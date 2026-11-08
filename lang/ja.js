// Japanese - the language module (2026-11-08, step 3 of the move onto the
// core). The rules of Japanese the core asks for. For now Japanese's own code
// (ja/legacy.js) still does its own typing, peeks and speech, so these only
// need to be right for the parts of the core it doesn't replace; they grow
// as that code moves here (romaji, small kana, numbers, times, counters).

// A word's Latin face: Japanese stores romaji with every word, so it's
// looked up rather than worked out (a kanji's reading can't be worked out
// from the kanji). Words not in the lists have none.
function reading(text) {
  const V = window.DRILL_VOCAB || window.JP_DRILL_VOCAB || {};
  for (const k of Object.keys(V)) for (const i of V[k].items || []) if (i.jp === text) return i.romaji || '';
  return '';
}

// A typed answer tidied for comparing: full-width to half-width, spaces and
// punctuation gone, katakana as hiragana (what ja/legacy.js does today).
function normalise(str) {
  return (str || '').normalize('NFKC')
    .replace(/[\s。、．，.,!?！？・〜~「」()（）]/g, '')
    .replace(/[ァ-ヶ]/g, ch => String.fromCharCode(ch.charCodeAt(0) - 0x60));
}

// A typed answer counts in kana or kanji (any accepted form) or in romaji.
function compareTyped(accepted, given) {
  const typed = normalise(given);
  if (!typed) return { match: null, wrongArticle: null };
  const roma = s => String(s || '').toLowerCase().replace(/[\s'-]/g, '');
  for (const f of accepted) {
    if (typed === normalise(f.form) || roma(given) === roma(reading(f.form))) return { match: { kind: f.kind, accentSlip: false, noArticle: false, form: f.form }, wrongArticle: null };
  }
  return { match: null, wrongArticle: null };
}

// How a word is shown: small kana (っ ゃ ゅ ょ, ァ ィ...) print visibly
// smaller than their neighbours in real Japanese typography, but the font
// barely does it - so each goes in its own <span class="small-kana">.
// Everything else is escaped as plain text. The core calls this wherever it
// shows a word (displayWordHtml), so it can't be missed in one place again.
const SMALL_KANA = new Set(['っ', 'ッ', 'ゃ', 'ゅ', 'ょ', 'ャ', 'ュ', 'ョ', 'ぁ', 'ぃ', 'ぅ', 'ぇ', 'ぉ', 'ァ', 'ィ', 'ゥ', 'ェ', 'ォ', 'ゎ', 'ヮ']);
const ESC = { '&': '&amp;', '<': '&lt;', '>': '&gt;' }; // as the core's escapeHtmlText
function displayHtml(text) {
  if (text === undefined || text === null) return '';
  return [...String(text)].map(ch => SMALL_KANA.has(ch) ? '<span class="small-kana">' + ch + '</span>' : (ESC[ch] || ch)).join('');
}

function pickVoice(voices) {
  const v = voices.find(x => x.lang && x.lang.toLowerCase().startsWith('ja'));
  return { voice: v || null, fallback: false };
}

// ---- Numbers, times and counters (step 5) ---------------------------------
// How Japanese says a number, a clock time and a count of things - in kana
// and in romaji. Shared with Japanese's own code as LANG.numbers (ja/numbers.js
// gives each its own name there, as before).

const HIRA_TO_ROMA = {
  'ぜろ':'zero',
  'いち':'ichi','に':'ni','さん':'san','よん':'yon','ご':'go','ろく':'roku','なな':'nana','はち':'hachi','きゅう':'kyuu','じゅう':'juu',
  'にじゅう':'nijuu','さんじゅう':'sanjuu','よんじゅう':'yonjuu','ごじゅう':'gojuu','ろくじゅう':'rokujuu','ななじゅう':'nanajuu','はちじゅう':'hachijuu','きゅうじゅう':'kyuujuu',
  'ひゃく':'hyaku','にひゃく':'nihyaku','さんびゃく':'sanbyaku','よんひゃく':'yonhyaku','ごひゃく':'gohyaku','ろっぴゃく':'roppyaku','ななひゃく':'nanahyaku','はっぴゃく':'happyaku','きゅうひゃく':'kyuuhyaku',
  'せん':'sen','にせん':'nisen','さんぜん':'sanzen','よんせん':'yonsen','ごせん':'gosen','ろくせん':'rokusen','ななせん':'nanasen','はっせん':'hassen','きゅうせん':'kyuusen',
  'いちまん':'ichiman','にまん':'niman','さんまん':'sanman','よんまん':'yonman','ごまん':'goman','ろくまん':'rokuman','ななまん':'nanaman','はちまん':'hachiman','きゅうまん':'kyuuman',
};

function numReadingToRomaji(reading) {
  const keys = Object.keys(HIRA_TO_ROMA).sort((a,b) => b.length - a.length);
  return reading.split(' ').map(part => {
    let r = part, result = '';
    while (r.length > 0) {
      const match = keys.find(k => r.startsWith(k));
      if (match) { result += HIRA_TO_ROMA[match]; r = r.slice(match.length); }
      else { result += r[0]; r = r.slice(1); }
    }
    return result;
  }).join(' ');
}

function numToJapanese(n) {
  if (n === 0) return 'ぜろ';
  const ones = ['','いち','に','さん','よん','ご','ろく','なな','はち','きゅう'];
  const tens = ['','じゅう','にじゅう','さんじゅう','よんじゅう','ごじゅう','ろくじゅう','ななじゅう','はちじゅう','きゅうじゅう'];
  const hyaku = ['','ひゃく','にひゃく','さんびゃく','よんひゃく','ごひゃく','ろっぴゃく','ななひゃく','はっぴゃく','きゅうひゃく'];
  const sen   = ['','せん','にせん','さんぜん','よんせん','ごせん','ろくせん','ななせん','はっせん','きゅうせん'];
  const man   = ['','いちまん','にまん','さんまん','よんまん','ごまん','ろくまん','ななまん','はちまん','きゅうまん'];

  const m = Math.floor(n / 10000);
  const s = Math.floor((n % 10000) / 1000);
  const h = Math.floor((n % 1000) / 100);
  const t = Math.floor((n % 100) / 10);
  const o = n % 10;

  const parts = [];
  if (m) parts.push(man[m]);
  if (s) parts.push(sen[s]);
  if (h) parts.push(hyaku[h]);
  if (t) parts.push(tens[t]);
  if (o) parts.push(ones[o]);
  return parts.join(' ');
}

const HOUR_KANA = ['','いち','に','さん','よ','ご','ろく','なな','はち','く','じゅう','じゅういち','じゅうに'];

const HOUR_ROMAJI = ['','ichi','ni','san','yo','go','roku','nana','hachi','ku','juu','juuichi','juuni'];

// Minute readings have their own irregular voicing (ふん/ぷん alternation based on
// the ones digit), plus a phonological contraction for exact tens (10/20/40/50 —
// じゅう shortens to じゅ before っぷん). 30 is a special case: almost always はん
// (half) rather than さんじゅっぷん in real usage.
const MINUTE_ONES_KANA = ['', 'いっ', 'に', 'さん', 'よん', 'ご', 'ろっ', 'なな', 'はっ', 'きゅう'];

const MINUTE_ONES_SUFFIX_KANA = ['', 'ぷん', 'ふん', 'ぷん', 'ふん', 'ふん', 'ぷん', 'ふん', 'ぷん', 'ふん'];

const MINUTE_ONES_ROMAJI = ['', 'ip', 'ni', 'san', 'yon', 'go', 'rop', 'nana', 'hap', 'kyuu'];

const MINUTE_ONES_SUFFIX_ROMAJI = ['', 'pun', 'fun', 'pun', 'fun', 'fun', 'pun', 'fun', 'pun', 'fun'];

const MINUTE_TENS_KANA = ['','じゅう','にじゅう','さんじゅう','よんじゅう','ごじゅう'];

const MINUTE_TENS_ROMAJI = ['','juu','nijuu','sanjuu','yonjuu','gojuu'];

const MINUTE_TENS_KANA_CONTRACTED = ['','じゅ','にじゅ','さんじゅ','よんじゅ','ごじゅ'];

const MINUTE_TENS_ROMAJI_CONTRACTED = ['','ju','niju','sanju','yonju','goju'];

function minuteToKana(min) {
  if (min === 0) return '';
  if (min === 30) return 'はん';
  const tens = Math.floor(min / 10), ones = min % 10;
  if (ones === 0) return MINUTE_TENS_KANA_CONTRACTED[tens] + 'っぷん';
  return (tens > 0 ? MINUTE_TENS_KANA[tens] : '') + MINUTE_ONES_KANA[ones] + MINUTE_ONES_SUFFIX_KANA[ones];
}

function minuteToRomaji(min) {
  if (min === 0) return '';
  if (min === 30) return 'han';
  const tens = Math.floor(min / 10), ones = min % 10;
  if (ones === 0) return MINUTE_TENS_ROMAJI_CONTRACTED[tens] + 'ppun';
  return (tens > 0 ? MINUTE_TENS_ROMAJI[tens] : '') + MINUTE_ONES_ROMAJI[ones] + MINUTE_ONES_SUFFIX_ROMAJI[ones];
}

function timeToKana(hour, minute, ampm, frame) {
  const ampmPrefix = ampm === 'gozen' ? 'ごぜん ' : ampm === 'gogo' ? 'ごご ' : '';
  const minPart = minuteToKana(minute);
  let s = `${ampmPrefix}${HOUR_KANA[hour]}じ${minPart ? ' ' + minPart : ''}`;
  if (frame === 'kara') s += ' から';
  else if (frame === 'made') s += ' まで';
  else if (frame === 'ni') s += ' に';
  else if (frame === 'goro') s += ' ごろ';
  return s;
}

function timeToRomaji(hour, minute, ampm, frame) {
  const ampmPrefix = ampm === 'gozen' ? 'gozen ' : ampm === 'gogo' ? 'gogo ' : '';
  const minPart = minuteToRomaji(minute);
  let s = `${ampmPrefix}${HOUR_ROMAJI[hour]}ji${minPart ? ' ' + minPart : ''}`;
  if (frame === 'kara') s += ' kara';
  else if (frame === 'made') s += ' made';
  else if (frame === 'ni') s += ' ni';
  else if (frame === 'goro') s += ' goro';
  return s;
}

// Item-type counters (助数詞) - a second, separate flavour from the duration
// counters above: these attach to a TYPE of object (flat things, long thin
// things, small animals...) rather than a stretch of time. Kept as its own
// entry point/pill set for now rather than merged into one screen with the
// duration units - 16 pills in one row would be too many; combining them
// into a sectioned layout is a later step. Ten most common per Minna no
// Nihongo's own early counter lesson (人/枚/本/冊/台/匹) plus つ/個/回/歳,
// cross-checked against a Japanese-counters reference site for the sound
// changes (音便: gemination on 1/6/8/10, h→p/b shifts on 本/匹).
const COUNTER_ITEM_UNITS = {
  tsu: {
    label: 'つ', desc: 'general things', items: [
      ['ひとつ', 'hitotsu'], ['ふたつ', 'futatsu'], ['みっつ', 'mittsu'],
      ['よっつ', 'yottsu'], ['いつつ', 'itsutsu'], ['むっつ', 'muttsu'],
      ['ななつ', 'nanatsu'], ['やっつ', 'yattsu'], ['ここのつ', 'kokonotsu'],
      ['とお', 'too'],
    ]
  },
  nin: {
    label: '人', desc: 'people', items: [
      ['ひとり', 'hitori'], ['ふたり', 'futari'], ['さんにん', 'sannin'],
      ['よにん', 'yonin'], ['ごにん', 'gonin'], ['ろくにん', 'rokunin'],
      ['ななにん', 'nananin'], ['はちにん', 'hachinin'], ['きゅうにん', 'kyuunin'],
      ['じゅうにん', 'juunin'],
    ]
  },
  ko: {
    label: '個', desc: 'small objects (general)', items: [
      ['いっこ', 'ikko'], ['にこ', 'niko'], ['さんこ', 'sanko'],
      ['よんこ', 'yonko'], ['ごこ', 'goko'], ['ろっこ', 'rokko'],
      ['ななこ', 'nanako'], ['はっこ', 'hakko'], ['きゅうこ', 'kyuuko'],
      ['じゅっこ', 'jukko'],
    ]
  },
  hon: {
    label: '本', desc: 'long, thin things', items: [
      ['いっぽん', 'ippon'], ['にほん', 'nihon'], ['さんぼん', 'sanbon'],
      ['よんほん', 'yonhon'], ['ごほん', 'gohon'], ['ろっぽん', 'roppon'],
      ['ななほん', 'nanahon'], ['はっぽん', 'happon'], ['きゅうほん', 'kyuuhon'],
      ['じゅっぽん', 'juppon'],
    ]
  },
  mai: {
    label: '枚', desc: 'flat things', items: [
      ['いちまい', 'ichimai'], ['にまい', 'nimai'], ['さんまい', 'sanmai'],
      ['よんまい', 'yonmai'], ['ごまい', 'gomai'], ['ろくまい', 'rokumai'],
      ['ななまい', 'nanamai'], ['はちまい', 'hachimai'], ['きゅうまい', 'kyuumai'],
      ['じゅうまい', 'juumai'],
    ]
  },
  hiki: {
    label: '匹', desc: 'small animals', items: [
      ['いっぴき', 'ippiki'], ['にひき', 'nihiki'], ['さんびき', 'sanbiki'],
      ['よんひき', 'yonhiki'], ['ごひき', 'gohiki'], ['ろっぴき', 'roppiki'],
      ['ななひき', 'nanahiki'], ['はっぴき', 'happiki'], ['きゅうひき', 'kyuuhiki'],
      ['じゅっぴき', 'juppiki'],
    ]
  },
  satsu: {
    label: '冊', desc: 'books', items: [
      ['いっさつ', 'issatsu'], ['にさつ', 'nisatsu'], ['さんさつ', 'sansatsu'],
      ['よんさつ', 'yonsatsu'], ['ごさつ', 'gosatsu'], ['ろくさつ', 'rokusatsu'],
      ['ななさつ', 'nanasatsu'], ['はっさつ', 'hassatsu'], ['きゅうさつ', 'kyuusatsu'],
      ['じゅっさつ', 'jussatsu'],
    ]
  },
  dai: {
    label: '台', desc: 'machines, vehicles', items: [
      ['いちだい', 'ichidai'], ['にだい', 'nidai'], ['さんだい', 'sandai'],
      ['よんだい', 'yondai'], ['ごだい', 'godai'], ['ろくだい', 'rokudai'],
      ['ななだい', 'nanadai'], ['はちだい', 'hachidai'], ['きゅうだい', 'kyuudai'],
      ['じゅうだい', 'juudai'],
    ]
  },
  kai: {
    label: '回', desc: 'times, occurrences', items: [
      ['いっかい', 'ikkai'], ['にかい', 'nikai'], ['さんかい', 'sankai'],
      ['よんかい', 'yonkai'], ['ごかい', 'gokai'], ['ろっかい', 'rokkai'],
      ['ななかい', 'nanakai'], ['はっかい', 'hakkai'], ['きゅうかい', 'kyuukai'],
      ['じゅっかい', 'jukkai'],
    ]
  },
  sai: {
    label: '歳', desc: 'age', items: [
      ['いっさい', 'issai'], ['にさい', 'nisai'], ['さんさい', 'sansai'],
      ['よんさい', 'yonsai'], ['ごさい', 'gosai'], ['ろくさい', 'rokusai'],
      ['ななさい', 'nanasai'], ['はっさい', 'hassai'], ['きゅうさい', 'kyuusai'],
      ['じゅっさい', 'jussai'],
    ],
    // 20 is the one genuinely irregular age in Japanese - a fossilised
    // native reading (はたち) that doesn't follow the さい pattern at all.
    // The moment anything's added to it the irregularity disappears (21 =
    // にじゅういっさい, regular), and every other decade (30/40/50...) is a
    // perfectly regular combination of the 1-10 table above, so this is the
    // only extra row needed rather than a full second reference page.
    extra: [{ num: 20, jp: 'はたち', romaji: 'hatachi' }],
  },
};

// Extends the 1-10 tables above to any number 11-50, for the Specific
// counter lookup tool. This is genuinely regular, not guesswork: Japanese
// builds compound counter readings as [tens word] + [the SAME onbin form
// already used for that ones digit 1-10] - e.g. 23本 is nijuu + sanbon =
// nijuusanbon, 十一本 is juu + ippon = juuippon. Exact multiples of ten
// (20/30/40/50) instead prefix directly onto the existing "10" reading,
// because it's the "juu" itself that triggers the sound change (十本＝
// じゅっぽん), and that contraction happens the same way regardless of what
// precedes it (二十本＝にじゅっぽん, not にじゅうっぽん).
//
// One real exception: 人 (nin) has its own standalone irregular words for
// exactly 1 and 2 (ひとり hitori, ふたり futari) - but those don't carry into
// compounds. 11/12/21/22/etc people revert to the regular ichinin/ninin
// forms (十一人＝じゅういちにん, not じゅうひとり) - COUNTER_COMPOUND_ONES_OVERRIDE
// exists solely to cover that one case.
//
// つ doesn't get a formula at all - native Japanese counting (ひとつ..とお)
// simply stops at 10, there's no juuhitotsu construction to fall back on.
const COUNTER_TENS_JP = ['', 'じゅう', 'にじゅう', 'さんじゅう', 'よんじゅう', 'ごじゅう'];

const COUNTER_TENS_ROMAJI = ['', 'juu', 'nijuu', 'sanjuu', 'yonjuu', 'gojuu'];

const COUNTER_TENS_MULT_JP = ['', '', 'に', 'さん', 'よん', 'ご'];

const COUNTER_TENS_MULT_ROMAJI = ['', '', 'ni', 'san', 'yon', 'go'];

const COUNTER_COMPOUND_ONES_OVERRIDE = {
  nin: { 1: ['いちにん', 'ichinin'], 2: ['ににん', 'ninin'] },
};

function counterReading(unitKey, n) {
  const unit = COUNTER_ITEM_UNITS[unitKey];
  if (!unit) return null;
  if (n >= 1 && n <= 10) return unit.items[n - 1];
  // Irregular one-offs (currently just はたち for 20 sai) always win, at
  // whatever number they're pinned to.
  if (unit.extra) {
    const ex = unit.extra.find(e => e.num === n);
    if (ex) return [ex.jp, ex.romaji];
  }
  if (unitKey === 'tsu') return null; // no valid reading past 10
  const tens = Math.floor(n / 10);
  const ones = n % 10;
  if (tens < 1 || tens > 5 || n > 50) return null;
  if (ones === 0) {
    const [jp10, romaji10] = unit.items[9];
    if (tens === 1) return [jp10, romaji10];
    return [COUNTER_TENS_MULT_JP[tens] + jp10, COUNTER_TENS_MULT_ROMAJI[tens] + romaji10];
  }
  const override = COUNTER_COMPOUND_ONES_OVERRIDE[unitKey] && COUNTER_COMPOUND_ONES_OVERRIDE[unitKey][ones];
  const [jpOnes, romajiOnes] = override || unit.items[ones - 1];
  return [COUNTER_TENS_JP[tens] + jpOnes, COUNTER_TENS_ROMAJI[tens] + romajiOnes];
}

// ---- Verb and adjective forms, particles (step 6) ---------------------------
// A polite verb's forms (たべます -> たべません, たべました...) and an い- or
// な-adjective's, each with romaji and English; the particles drilled.
// Shared as LANG.forms (ja/forms.js gives each its own name, as before).

const VERB_FORM_KEYS = ['nonPastAff', 'nonPastNeg', 'pastAff', 'pastNeg', 'invite', 'lets']; // + inviting forms (L3 Lesson 3)

// Same terms as the Level 2 grid (Non-past / Past x affirmative / negative).
const VERB_FORM_LABELS = {
  nonPastAff: 'Non-past', nonPastNeg: 'Non-past negative',
  pastAff: 'Past', pastNeg: 'Past negative',
  invite: 'Invitation', lets: "Let's",
};

// English for each form, built from the verb's own gloss ("to eat" ->
// eat / don't eat / ate / didn't eat). Regular verbs need nothing; the
// irregular past tenses live in this one list.
const ENGLISH_IRREGULAR_PAST = {
  be: 'was', become: 'became', begin: 'began', bring: 'brought', build: 'built', buy: 'bought',
  catch: 'caught', choose: 'chose', come: 'came', cut: 'cut', do: 'did', draw: 'drew',
  drink: 'drank', drive: 'drove', eat: 'ate', fall: 'fell', feel: 'felt', find: 'found',
  fly: 'flew', forget: 'forgot', get: 'got', give: 'gave', go: 'went', have: 'had',
  hear: 'heard', hold: 'held', keep: 'kept', know: 'knew', lend: 'lent', leave: 'left',
  lose: 'lost', make: 'made', meet: 'met', pay: 'paid', put: 'put', read: 'read',
  ride: 'rode', ring: 'rang', run: 'ran', say: 'said', see: 'saw', sell: 'sold',
  send: 'sent', sing: 'sang', sit: 'sat', sleep: 'slept', speak: 'spoke', spend: 'spent',
  stand: 'stood', swim: 'swam', take: 'took', teach: 'taught', tell: 'told', think: 'thought',
  understand: 'understood', wake: 'woke', wear: 'wore', win: 'won', write: 'wrote',
};

const ENGLISH_DOUBLED_PAST = { chat: 'chatted', jog: 'jogged', plan: 'planned', shop: 'shopped', stop: 'stopped', travel: 'travelled' };

function englishPastWord(w) {
  const lw = w.toLowerCase();
  if (ENGLISH_IRREGULAR_PAST[lw]) return ENGLISH_IRREGULAR_PAST[lw];
  if (ENGLISH_DOUBLED_PAST[lw]) return ENGLISH_DOUBLED_PAST[lw];
  if (/e$/.test(lw)) return w + 'd';
  if (/[^aeiou]y$/.test(lw)) return w.slice(0, -1) + 'ied';
  return w + 'ed';
}

function verbEnglishForms(en) {
  const base = String(en || '').replace(/^to /, '').trim();
  const parts = base.split(' / ').map(p => p.replace(/^to /, ''));
  const past = parts.map(p => p.replace(/^(\S+)/, w => englishPastWord(w))).join(' / ');
  return {
    nonPastAff: base, nonPastNeg: "don't " + base, pastAff: past, pastNeg: "didn't " + base,
    taiAff: 'want to ' + base, taiNeg: "don't want to " + base,
    taiPast: 'wanted to ' + base, taiPastNeg: "didn't want to " + base,
    invite: "why don't we " + base + '?', lets: "let's " + base,
  };
}

// All forms of one verb item: { key: [jp, romaji, english] }.
function verbForms(item) {
  const st = item.jp.replace(/ます$/, '');
  const rs = item.romaji.replace(/masu$/, '');
  const en = verbEnglishForms(item.en);
  return {
    nonPastAff: [item.jp, item.romaji, en.nonPastAff],
    nonPastNeg: [st + 'ません', rs + 'masen', en.nonPastNeg],
    pastAff: [st + 'ました', rs + 'mashita', en.pastAff],
    pastNeg: [st + 'ませんでした', rs + 'masendeshita', en.pastNeg],
    taiAff: [st + 'たい', rs + 'tai', en.taiAff],
    taiNeg: [st + 'たくない', rs + 'takunai', en.taiNeg],
    taiPast: [st + 'たかった', rs + 'takatta', en.taiPast],
    taiPastNeg: [st + 'たくなかった', rs + 'takunakatta', en.taiPastNeg],
    // Inviting (L3 Lesson 3, 2026-10-13): ませんか invites, ましょう = let's.
    invite: [st + 'ませんか', rs + 'masen ka', en.invite],
    lets: [st + 'ましょう', rs + 'mashou', en.lets],
  };
}

// The い-adjective stem the endings join: おもしろ(い), よ(い) for いい / かっこいい.
function adjIStem(jp, ro) {
  if (/いい$/.test(jp)) return [jp.slice(0, -2) + 'よ', ro.replace(/ii$/, 'yo')];
  return [jp.slice(0, -1), ro.replace(/i$/, '')];
}

const ADJ_FORM_KEYS = ['pres', 'presNeg', 'past', 'pastNeg', 'attr'];

const ADJ_FORM_LABELS = { pres: 'Present', presNeg: 'Present negative', past: 'Past', pastNeg: 'Past negative', attr: 'Before a noun' };

const adjEnWord = en => String(en || '').split(' / ')[0].split(',')[0].replace(/\s*\(.*\)$/, '').trim();

// ==== PARTICLE DRILL (2026-10-07) ====
// Dice page. A sentence from the daily-sentence engine (sgGenerate) with one
// particle blanked out; pick it. Because the sentences come from the shared
// engine, the drill grows with every lesson's words and patterns for free.
// The buttons are the same fixed set every time (in this order), so which
// particles are on screen never gives the answer away. The English is shown
// under the sentence, which settles the cases where another particle would
// be grammatical with a different meaning (も "also", contrastive は).
// Where a second particle is genuinely just as right, it's accepted too
// (particleAlternatives) and the feedback says so.
// To add a newly taught particle (が, から, まで…): add it to PARTICLE_SET and
// PARTICLE_ROMAJI. Only particles in PARTICLE_SET are ever blanked.
const PARTICLE_SET = ['は', 'を', 'に', 'へ', 'で', 'と', 'の'];

const PARTICLE_ROMAJI = { は: 'wa', を: 'o', に: 'ni', へ: 'e', で: 'de', と: 'to', の: 'no' };

export default {
  id: 'ja',
  code: 'ja-JP',
  rate: 0.85,         // spoken a little slower than the core's 0.9
  reading,
  displayHtml,      // small kana sized right
  normalise,
  compareTyped,
  pickVoice,
  forms: { VERB_FORM_KEYS, VERB_FORM_LABELS, ENGLISH_IRREGULAR_PAST, ENGLISH_DOUBLED_PAST, englishPastWord, verbEnglishForms, verbForms, adjIStem, ADJ_FORM_KEYS, ADJ_FORM_LABELS, adjEnWord, PARTICLE_SET, PARTICLE_ROMAJI },
  numbers: { HIRA_TO_ROMA, numReadingToRomaji, numToJapanese, HOUR_KANA, HOUR_ROMAJI, MINUTE_ONES_KANA, MINUTE_ONES_SUFFIX_KANA, MINUTE_ONES_ROMAJI, MINUTE_ONES_SUFFIX_ROMAJI, MINUTE_TENS_KANA, MINUTE_TENS_ROMAJI, MINUTE_TENS_KANA_CONTRACTED, MINUTE_TENS_ROMAJI_CONTRACTED, minuteToKana, minuteToRomaji, timeToKana, timeToRomaji, COUNTER_ITEM_UNITS, COUNTER_TENS_JP, COUNTER_TENS_ROMAJI, COUNTER_TENS_MULT_JP, COUNTER_TENS_MULT_ROMAJI, COUNTER_COMPOUND_ONES_OVERRIDE, counterReading },
};
