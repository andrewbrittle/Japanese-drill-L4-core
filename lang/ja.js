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

export default {
  id: 'ja',
  code: 'ja-JP',
  rate: 0.85,         // spoken a little slower than the core's 0.9
  reading,
  displayHtml,      // small kana sized right
  normalise,
  compareTyped,
  pickVoice,
};
