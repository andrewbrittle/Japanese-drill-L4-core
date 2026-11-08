// Japanese - the kana (2026-11-08, step 4 of the move onto the core): the
// hiragana and katakana, their sections and rows, the kana drill and its
// screens. Loaded before ja/legacy.js.
//
// DATA: each group of characters (hiragana-base, katakana-youon...), every
// character with its reading and the readings offered beside it. The kanji
// groups are added to it in ja/kanji.js.
const DATA = {
  'hiragana-base': [
    {char:'あ',answer:'a',disp:'base',options:['a','i','u','e']},
    {char:'い',answer:'i',disp:'base',options:['a','i','o','u']},
    {char:'う',answer:'u',disp:'base',options:['e','o','u','i']},
    {char:'え',answer:'e',disp:'base',options:['a','e','i','ya']},
    {char:'お',answer:'o',disp:'base',options:['u','a','o','wo']},
    {char:'か',answer:'ka',disp:'base',options:['ka','ga','ki','ku']},
    {char:'き',answer:'ki',disp:'base',options:['ka','ki','gi','ke']},
    {char:'く',answer:'ku',disp:'base',options:['ki','ku','gu','ko']},
    {char:'け',answer:'ke',disp:'base',options:['ka','ke','ge','ko']},
    {char:'こ',answer:'ko',disp:'base',options:['ku','ko','go','ke']},
    {char:'さ',answer:'sa',disp:'base',options:['sa','za','shi','se']},
    {char:'し',answer:'shi',disp:'base',options:['sa','shi','ji','so']},
    {char:'す',answer:'su',disp:'base',options:['shi','su','zu','so']},
    {char:'せ',answer:'se',disp:'base',options:['sa','se','ze','shi']},
    {char:'そ',answer:'so',disp:'base',options:['su','se','so','sa']},
    {char:'た',answer:'ta',disp:'base',options:['ta','da','chi','te']},
    {char:'ち',answer:'chi',disp:'base',options:['ta','chi','ji','to']},
    {char:'つ',answer:'tsu',disp:'base',options:['chi','tsu','zu','to']},
    {char:'て',answer:'te',disp:'base',options:['ta','te','de','tsu']},
    {char:'と',answer:'to',disp:'base',options:['chi','to','do','te']},
    {char:'な',answer:'na',disp:'base',options:['na','ni','nu','ne']},
    {char:'に',answer:'ni',disp:'base',options:['na','ni','nu','no']},
    {char:'ぬ',answer:'nu',disp:'base',options:['ni','nu','ne','no']},
    {char:'ね',answer:'ne',disp:'base',options:['na','ne','no','ni']},
    {char:'の',answer:'no',disp:'base',options:['nu','na','no','ne']},
    {char:'は',answer:'ha',disp:'base',options:['ha','ba','pa','he']},
    {char:'ひ',answer:'hi',disp:'base',options:['ha','hi','bi','ho']},
    {char:'ふ',answer:'fu',disp:'base',options:['hi','fu','bu','ho']},
    {char:'へ',answer:'he',disp:'base',options:['ha','he','be','fu']},
    {char:'ほ',answer:'ho',disp:'base',options:['hi','ho','bo','he']},
    {char:'ま',answer:'ma',disp:'base',options:['ma','mi','mu','me']},
    {char:'み',answer:'mi',disp:'base',options:['ma','mi','mu','mo']},
    {char:'む',answer:'mu',disp:'base',options:['mi','mu','me','mo']},
    {char:'め',answer:'me',disp:'base',options:['ma','me','mo','mi']},
    {char:'も',answer:'mo',disp:'base',options:['mu','ma','mo','me']},
    {char:'や',answer:'ya',disp:'base',options:['ya','yu','yo','wa']},
    {char:'ゆ',answer:'yu',disp:'base',options:['ya','yu','yo','wo']},
    {char:'よ',answer:'yo',disp:'base',options:['yu','ya','yo','n']},
    {char:'ら',answer:'ra',disp:'base',options:['ra','ri','ru','re']},
    {char:'り',answer:'ri',disp:'base',options:['ra','ri','ru','ro']},
    {char:'る',answer:'ru',disp:'base',options:['ri','ru','re','ro']},
    {char:'れ',answer:'re',disp:'base',options:['ra','re','ro','ri']},
    {char:'ろ',answer:'ro',disp:'base',options:['ru','ra','ro','re']},
    {char:'わ',answer:'wa',disp:'base',options:['wa','wo','ya','ra']},
    {char:'を',answer:'wo',disp:'base',options:['wa','wo','o','no']},
    {char:'ん',answer:'n',disp:'base',options:['n','na','ni','nu']},
  ],
  'hiragana-diacritics': [
    {char:'が',answer:'ga',disp:'diacritic',options:['ga','ka','gi','gu']},
    {char:'ぎ',answer:'gi',disp:'diacritic',options:['ka','gi','ki','ge']},
    {char:'ぐ',answer:'gu',disp:'diacritic',options:['ki','gu','ku','go']},
    {char:'げ',answer:'ge',disp:'diacritic',options:['ka','ge','ke','go']},
    {char:'ご',answer:'go',disp:'diacritic',options:['ku','go','ko','ge']},
    {char:'ざ',answer:'za',disp:'diacritic',options:['za','sa','ji','ze']},
    {char:'じ',answer:'ji',disp:'diacritic',options:['za','ji','shi','zo']},
    {char:'ず',answer:'zu',disp:'diacritic',options:['ji','zu','su','zo']},
    {char:'ぜ',answer:'ze',disp:'diacritic',options:['za','ze','se','zo']},
    {char:'ぞ',answer:'zo',disp:'diacritic',options:['zu','zo','so','ze']},
    {char:'だ',answer:'da',disp:'diacritic',options:['da','ta','di','de']},
    {char:'ぢ',answer:'di',disp:'diacritic',options:['da','di','chi','du']},
    {char:'づ',answer:'du',disp:'diacritic',options:['di','du','tsu','do']},
    {char:'で',answer:'de',disp:'diacritic',options:['da','de','te','do']},
    {char:'ど',answer:'do',disp:'diacritic',options:['di','do','to','de']},
    {char:'ば',answer:'ba',disp:'diacritic',options:['ba','ha','bi','bu']},
    {char:'び',answer:'bi',disp:'diacritic',options:['ba','bi','hi','be']},
    {char:'ぶ',answer:'bu',disp:'diacritic',options:['bi','bu','fu','bo']},
    {char:'べ',answer:'be',disp:'diacritic',options:['ba','be','he','bo']},
    {char:'ぼ',answer:'bo',disp:'diacritic',options:['bi','bo','ho','be']},
    {char:'ぱ',answer:'pa',disp:'diacritic',options:['pa','ba','ha','pi']},
    {char:'ぴ',answer:'pi',disp:'diacritic',options:['pa','pi','bi','hi']},
    {char:'ぷ',answer:'pu',disp:'diacritic',options:['pi','pu','bu','fu']},
    {char:'ぺ',answer:'pe',disp:'diacritic',options:['pa','pe','be','he']},
    {char:'ぽ',answer:'po',disp:'diacritic',options:['pi','po','bo','ho']},
  ],
  'hiragana-youon': [
    {char:'きゃ',answer:'kya',disp:'youon',options:['kya','sha','cha','nya']},
    {char:'きゅ',answer:'kyu',disp:'youon',options:['kyu','shu','chu','nyu']},
    {char:'きょ',answer:'kyo',disp:'youon',options:['kyo','sho','cho','nyo']},
    {char:'しゃ',answer:'sha',disp:'youon',options:['sha','kya','cha','ja']},
    {char:'しゅ',answer:'shu',disp:'youon',options:['shu','kyu','chu','ju']},
    {char:'しょ',answer:'sho',disp:'youon',options:['sho','kyo','cho','jo']},
    {char:'ちゃ',answer:'cha',disp:'youon',options:['cha','sha','ja','nya']},
    {char:'ちゅ',answer:'chu',disp:'youon',options:['chu','shu','ju','nyu']},
    {char:'ちょ',answer:'cho',disp:'youon',options:['cho','sho','jo','nyo']},
    {char:'にゃ',answer:'nya',disp:'youon',options:['nya','mya','rya','hya']},
    {char:'にゅ',answer:'nyu',disp:'youon',options:['nyu','myu','ryu','hyu']},
    {char:'にょ',answer:'nyo',disp:'youon',options:['nyo','myo','ryo','hyo']},
    {char:'ひゃ',answer:'hya',disp:'youon',options:['hya','mya','rya','nya']},
    {char:'ひゅ',answer:'hyu',disp:'youon',options:['hyu','myu','ryu','nyu']},
    {char:'ひょ',answer:'hyo',disp:'youon',options:['hyo','myo','ryo','nyo']},
    {char:'みゃ',answer:'mya',disp:'youon',options:['mya','hya','rya','nya']},
    {char:'みゅ',answer:'myu',disp:'youon',options:['myu','hyu','ryu','nyu']},
    {char:'みょ',answer:'myo',disp:'youon',options:['myo','hyo','ryo','nyo']},
    {char:'りゃ',answer:'rya',disp:'youon',options:['rya','mya','hya','gya']},
    {char:'りゅ',answer:'ryu',disp:'youon',options:['ryu','myu','hyu','gyu']},
    {char:'りょ',answer:'ryo',disp:'youon',options:['ryo','myo','hyo','gyo']},
    {char:'ぎゃ',answer:'gya',disp:'youon',options:['gya','kya','ja','bya']},
    {char:'ぎゅ',answer:'gyu',disp:'youon',options:['gyu','kyu','ju','byu']},
    {char:'ぎょ',answer:'gyo',disp:'youon',options:['gyo','kyo','jo','byo']},
    {char:'じゃ',answer:'ja',disp:'youon',options:['ja','sha','gya','bya']},
    {char:'じゅ',answer:'ju',disp:'youon',options:['ju','shu','gyu','byu']},
    {char:'じょ',answer:'jo',disp:'youon',options:['jo','sho','gyo','byo']},
    {char:'びゃ',answer:'bya',disp:'youon',options:['bya','pya','gya','ja']},
    {char:'びゅ',answer:'byu',disp:'youon',options:['byu','pyu','gyu','ju']},
    {char:'びょ',answer:'byo',disp:'youon',options:['byo','pyo','gyo','jo']},
    {char:'ぴゃ',answer:'pya',disp:'youon',options:['pya','bya','kya','hya']},
    {char:'ぴゅ',answer:'pyu',disp:'youon',options:['pyu','byu','kyu','hyu']},
    {char:'ぴょ',answer:'pyo',disp:'youon',options:['pyo','byo','kyo','hyo']},
  ],
  'katakana-base': [
    {char:'ア',answer:'a',disp:'base',options:['a','i','u','e']},
    {char:'イ',answer:'i',disp:'base',options:['a','i','o','u']},
    {char:'ウ',answer:'u',disp:'base',options:['e','o','u','i']},
    {char:'エ',answer:'e',disp:'base',options:['a','e','i','ya']},
    {char:'オ',answer:'o',disp:'base',options:['u','a','o','wo']},
    {char:'カ',answer:'ka',disp:'base',options:['ka','ga','ki','ku']},
    {char:'キ',answer:'ki',disp:'base',options:['ka','ki','gi','ke']},
    {char:'ク',answer:'ku',disp:'base',options:['ki','ku','gu','ko']},
    {char:'ケ',answer:'ke',disp:'base',options:['ka','ke','ge','ko']},
    {char:'コ',answer:'ko',disp:'base',options:['ku','ko','go','ke']},
    {char:'サ',answer:'sa',disp:'base',options:['sa','za','shi','se']},
    {char:'シ',answer:'shi',disp:'base',options:['sa','shi','ji','so']},
    {char:'ス',answer:'su',disp:'base',options:['shi','su','zu','so']},
    {char:'セ',answer:'se',disp:'base',options:['sa','se','ze','shi']},
    {char:'ソ',answer:'so',disp:'base',options:['su','se','so','sa']},
    {char:'タ',answer:'ta',disp:'base',options:['ta','da','chi','te']},
    {char:'チ',answer:'chi',disp:'base',options:['ta','chi','ji','to']},
    {char:'ツ',answer:'tsu',disp:'base',options:['chi','tsu','zu','to']},
    {char:'テ',answer:'te',disp:'base',options:['ta','te','de','tsu']},
    {char:'ト',answer:'to',disp:'base',options:['chi','to','do','te']},
    {char:'ナ',answer:'na',disp:'base',options:['na','ni','nu','ne']},
    {char:'ニ',answer:'ni',disp:'base',options:['na','ni','nu','no']},
    {char:'ヌ',answer:'nu',disp:'base',options:['ni','nu','ne','no']},
    {char:'ネ',answer:'ne',disp:'base',options:['na','ne','no','ni']},
    {char:'ノ',answer:'no',disp:'base',options:['nu','na','no','ne']},
    {char:'ハ',answer:'ha',disp:'base',options:['ha','ba','pa','he']},
    {char:'ヒ',answer:'hi',disp:'base',options:['ha','hi','bi','ho']},
    {char:'フ',answer:'fu',disp:'base',options:['hi','fu','bu','ho']},
    {char:'ヘ',answer:'he',disp:'base',options:['ha','he','be','fu']},
    {char:'ホ',answer:'ho',disp:'base',options:['hi','ho','bo','he']},
    {char:'マ',answer:'ma',disp:'base',options:['ma','mi','mu','me']},
    {char:'ミ',answer:'mi',disp:'base',options:['ma','mi','mu','mo']},
    {char:'ム',answer:'mu',disp:'base',options:['mi','mu','me','mo']},
    {char:'メ',answer:'me',disp:'base',options:['ma','me','mo','mi']},
    {char:'モ',answer:'mo',disp:'base',options:['mu','ma','mo','me']},
    {char:'ヤ',answer:'ya',disp:'base',options:['ya','yu','yo','wa']},
    {char:'ユ',answer:'yu',disp:'base',options:['ya','yu','yo','wo']},
    {char:'ヨ',answer:'yo',disp:'base',options:['yu','ya','yo','n']},
    {char:'ラ',answer:'ra',disp:'base',options:['ra','ri','ru','re']},
    {char:'リ',answer:'ri',disp:'base',options:['ra','ri','ru','ro']},
    {char:'ル',answer:'ru',disp:'base',options:['ri','ru','re','ro']},
    {char:'レ',answer:'re',disp:'base',options:['ra','re','ro','ri']},
    {char:'ロ',answer:'ro',disp:'base',options:['ru','ra','ro','re']},
    {char:'ワ',answer:'wa',disp:'base',options:['wa','wo','ya','ra']},
    {char:'ヲ',answer:'wo',disp:'base',options:['wa','wo','o','no']},
    {char:'ン',answer:'n',disp:'base',options:['n','na','ni','nu']},
  ],
  'katakana-diacritics': [
    {char:'ガ',answer:'ga',disp:'diacritic',options:['ga','ka','gi','gu']},
    {char:'ギ',answer:'gi',disp:'diacritic',options:['ka','gi','ki','ge']},
    {char:'グ',answer:'gu',disp:'diacritic',options:['ki','gu','ku','go']},
    {char:'ゲ',answer:'ge',disp:'diacritic',options:['ka','ge','ke','go']},
    {char:'ゴ',answer:'go',disp:'diacritic',options:['ku','go','ko','ge']},
    {char:'ザ',answer:'za',disp:'diacritic',options:['za','sa','ji','ze']},
    {char:'ジ',answer:'ji',disp:'diacritic',options:['za','ji','shi','zo']},
    {char:'ズ',answer:'zu',disp:'diacritic',options:['ji','zu','su','zo']},
    {char:'ゼ',answer:'ze',disp:'diacritic',options:['za','ze','se','zo']},
    {char:'ゾ',answer:'zo',disp:'diacritic',options:['zu','zo','so','ze']},
    {char:'ダ',answer:'da',disp:'diacritic',options:['da','ta','di','de']},
    {char:'ヂ',answer:'di',disp:'diacritic',options:['da','di','chi','du']},
    {char:'ヅ',answer:'du',disp:'diacritic',options:['di','du','tsu','do']},
    {char:'デ',answer:'de',disp:'diacritic',options:['da','de','te','do']},
    {char:'ド',answer:'do',disp:'diacritic',options:['di','do','to','de']},
    {char:'バ',answer:'ba',disp:'diacritic',options:['ba','ha','bi','bu']},
    {char:'ビ',answer:'bi',disp:'diacritic',options:['ba','bi','hi','be']},
    {char:'ブ',answer:'bu',disp:'diacritic',options:['bi','bu','fu','bo']},
    {char:'ベ',answer:'be',disp:'diacritic',options:['ba','be','he','bo']},
    {char:'ボ',answer:'bo',disp:'diacritic',options:['bi','bo','ho','be']},
    {char:'ヴ',answer:'vu',disp:'diacritic',options:['vu','bu','fu','u']},
    {char:'パ',answer:'pa',disp:'diacritic',options:['pa','ba','ha','pi']},
    {char:'ピ',answer:'pi',disp:'diacritic',options:['pa','pi','bi','hi']},
    {char:'プ',answer:'pu',disp:'diacritic',options:['pi','pu','bu','fu']},
    {char:'ペ',answer:'pe',disp:'diacritic',options:['pa','pe','be','he']},
    {char:'ポ',answer:'po',disp:'diacritic',options:['pi','po','bo','ho']},
  ],
  'katakana-youon': [
    {char:'キャ',answer:'kya',disp:'youon',options:['kya','sha','cha','nya']},
    {char:'キュ',answer:'kyu',disp:'youon',options:['kyu','shu','chu','nyu']},
    {char:'キョ',answer:'kyo',disp:'youon',options:['kyo','sho','cho','nyo']},
    {char:'シャ',answer:'sha',disp:'youon',options:['sha','kya','cha','ja']},
    {char:'シュ',answer:'shu',disp:'youon',options:['shu','kyu','chu','ju']},
    {char:'ショ',answer:'sho',disp:'youon',options:['sho','kyo','cho','jo']},
    {char:'チャ',answer:'cha',disp:'youon',options:['cha','sha','ja','nya']},
    {char:'チュ',answer:'chu',disp:'youon',options:['chu','shu','ju','nyu']},
    {char:'チョ',answer:'cho',disp:'youon',options:['cho','sho','jo','nyo']},
    {char:'ニャ',answer:'nya',disp:'youon',options:['nya','mya','rya','hya']},
    {char:'ニュ',answer:'nyu',disp:'youon',options:['nyu','myu','ryu','hyu']},
    {char:'ニョ',answer:'nyo',disp:'youon',options:['nyo','myo','ryo','hyo']},
    {char:'ヒャ',answer:'hya',disp:'youon',options:['hya','mya','rya','nya']},
    {char:'ヒュ',answer:'hyu',disp:'youon',options:['hyu','myu','ryu','nyu']},
    {char:'ヒョ',answer:'hyo',disp:'youon',options:['hyo','myo','ryo','nyo']},
    {char:'ミャ',answer:'mya',disp:'youon',options:['mya','hya','rya','nya']},
    {char:'ミュ',answer:'myu',disp:'youon',options:['myu','hyu','ryu','nyu']},
    {char:'ミョ',answer:'myo',disp:'youon',options:['myo','hyo','ryo','nyo']},
    {char:'リャ',answer:'rya',disp:'youon',options:['rya','mya','hya','gya']},
    {char:'リュ',answer:'ryu',disp:'youon',options:['ryu','myu','hyu','gyu']},
    {char:'リョ',answer:'ryo',disp:'youon',options:['ryo','myo','hyo','gyo']},
    {char:'ギャ',answer:'gya',disp:'youon',options:['gya','kya','ja','bya']},
    {char:'ギュ',answer:'gyu',disp:'youon',options:['gyu','kyu','ju','byu']},
    {char:'ギョ',answer:'gyo',disp:'youon',options:['gyo','kyo','jo','byo']},
    {char:'ジャ',answer:'ja',disp:'youon',options:['ja','sha','gya','bya']},
    {char:'ジュ',answer:'ju',disp:'youon',options:['ju','shu','gyu','byu']},
    {char:'ジョ',answer:'jo',disp:'youon',options:['jo','sho','gyo','byo']},
    {char:'ビャ',answer:'bya',disp:'youon',options:['bya','pya','gya','ja']},
    {char:'ビュ',answer:'byu',disp:'youon',options:['byu','pyu','gyu','ju']},
    {char:'ビョ',answer:'byo',disp:'youon',options:['byo','pyo','gyo','jo']},
    {char:'ピャ',answer:'pya',disp:'youon',options:['pya','bya','kya','hya']},
    {char:'ピュ',answer:'pyu',disp:'youon',options:['pyu','byu','kyu','hyu']},
    {char:'ピョ',answer:'pyo',disp:'youon',options:['pyo','byo','kyo','hyo']},
  ],
};

const BADGE_LABELS = {
  'hiragana-base': 'hiragana base',
  'hiragana-diacritics': 'hiragana ゛゜',
  'hiragana-youon': 'hiragana きゃ',
  'katakana-base': 'katakana base',
  'katakana-diacritics': 'katakana ゛゜',
  'katakana-youon': 'katakana キャ',
  'kanji-numbers-time': 'numbers / time',
  'kanji-nature-body': 'nature / body',
  'kanji-directions-travel': 'directions / travel',
  'kanji-food': 'food / dining',
  'kanji-places': 'places',
  'kanji-people': 'people / questions',
  'kanji-general': 'general',
  'kanji-verbs': 'verbs',
};

const HIRAGANA_KEYS = ['hiragana-base','hiragana-diacritics','hiragana-youon'];

const KATAKANA_KEYS = ['katakana-base','katakana-diacritics','katakana-youon'];

// Maps a romaji reading (e.g. 'ka') to its hiragana character (e.g. 'か'),
// used when showing hiragana instead of romaji on katakana answer options.
// Note: katakana-only sounds with no hiragana equivalent (e.g. 'vu' for ヴ)
// simply fall back to displaying romaji.
const ROMAJI_TO_HIRAGANA = {};

HIRAGANA_KEYS.forEach(k => DATA[k].forEach(item => { ROMAJI_TO_HIRAGANA[item.answer] = item.char; }));

const selected = new Set(['katakana-base']);

let reversed = false;

function toggleDirection() {
  reversed = !reversed;
  const label = reversed ? 'Romaji → kana' : 'Kana → romaji';
  const sub = reversed ? 'See a reading, pick the character. Tap to reverse.' : 'See a character, pick the reading. Tap to reverse.';
  ['direction-card-ref', 'direction-card-ref-hira'].forEach(id => {
    const card = document.getElementById(id);
    if (card) card.classList.toggle('selected', reversed);
  });
  document.getElementById('direction-name-ref').textContent = label;
  document.getElementById('direction-sub-ref').textContent = sub;
  document.getElementById('direction-name-ref-hira').textContent = label;
  document.getElementById('direction-sub-ref-hira').textContent = sub;
  updateHiraganaAnswersVisibility();
}

let showHiraganaOnKatakana = false;

function toggleHiraganaOnKatakana() {
  showHiraganaOnKatakana = !showHiraganaOnKatakana;
  const refCard = document.getElementById('hiragana-answers-card-ref');
  if (refCard) refCard.classList.toggle('selected', showHiraganaOnKatakana);
}

function updateHiraganaAnswersVisibility() {
  const refCard = document.getElementById('hiragana-answers-card-ref');
  if (refCard) refCard.style.display = reversed ? 'none' : 'flex';
}

function updateDirectionVisibility() {
  updateHiraganaAnswersVisibility();
}

// Stroke order, drawn one stroke after another (from the Kanji Strokes app):
// every stroke faint first, then each drawn in turn and held.
let peekStrokeToken = 0;

const PEEK_REDUCED_MOTION = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Where each character sits when several are drawn in a row. KanjiVG draws
// small kana (ゃ, っ…) at about 80% size in the middle of the box; printed
// ones are smaller and sit low, close to the character before - so after
// another character they're scaled to 75% from the bottom-left and moved in.
const PEEK_SMALL_KANA = 'ぁぃぅぇぉゃゅょっゎァィゥェォャュョッヮ';

function peekGlyphLayout(chars, n) {
  const pos = []; let x = 0;
  for (let i = 0; i < n; i++) {
    const small = i > 0 && PEEK_SMALL_KANA.includes(chars[i] || '');
    if (small) x -= 22;
    pos.push({ x, small });
    x += small ? 87 : 109;
  }
  return { pos, width: x };
}

// WORD STROKES (2026-10-17, stage 2): holding a course or tourist word
// writes it out underneath, on its own shaded strip in gold so it doesn't
// read as a second copy of the word above. Kana are drawn stroke by stroke,
// quickly; anything without stroke data (a kanji like 北, 〜, …, digits)
// just appears, in grey, when the writing reaches it. Not for the untaught
// authentic materials (Andrew). Long phrases wrap, breaking at a space
// where there is one.
const PEEK_WORD_UNIT = 28;             // px per character

const PEEK_WORD_ROW_UNITS = 109 * 9;   // up to 9 characters a line

function peekWordStrip(item) {
  const tags = item.tags || [];
  if (!(tags.includes('taught') || tags.includes('tourist'))) return null;
  const S = window.JP_DRILL_KANA_STROKES || {};
  const chars = [...(item.jp || '')];
  if (!chars.some(c => S[c])) return null;
  // Lay out: each character gets an x/row; small kana tuck in after a character.
  const cells = []; const rows = [[]];
  let x = 0, row = 0, lastSpace = -1, prevChar = false;
  chars.forEach(c => {
    if (c === ' ' || c === '\u3000') { if (x > 0) { x += 45; lastSpace = cells.length; } prevChar = false; return; }
    const small = prevChar && PEEK_SMALL_KANA.includes(c);
    const narrow = '、。…・'.includes(c);
    const latin = /[0-9A-Za-z]/.test(c);   // digits and letters (100円, DIY) are half width
    if (small) x -= 22;
    const adv = small ? 87 : latin ? 62 : narrow ? 70 : 109;
    if (x + adv > PEEK_WORD_ROW_UNITS && x > 0) {
      // wrap: move everything after the last space (if on this row) down a line
      const from = lastSpace > -1 && cells[lastSpace] && cells[lastSpace].row === row ? lastSpace : cells.length;
      row++; let nx = 0;
      for (let i = from; i < cells.length; i++) { cells[i].row = row; cells[i].x = nx + (cells[i].small ? -22 : 0); nx = cells[i].x + cells[i].adv; }
      x = nx; lastSpace = -1;
      if (small) x -= 22;
    }
    cells.push({ c, x, row, small, adv, strokes: S[c] || null });
    x += adv; prevChar = true;
  });
  const rowCount = Math.max(...cells.map(cl => cl.row)) + 1;
  const width = Math.max(...cells.map(cl => cl.x + cl.adv));
  const NS = 'http://www.w3.org/2000/svg';
  const svg = document.createElementNS(NS, 'svg');
  svg.setAttribute('class', 'peek-word-svg');
  svg.setAttribute('viewBox', `0 0 ${width} ${109 * rowCount}`);
  svg.setAttribute('aria-hidden', 'true');
  svg.style.width = Math.round(PEEK_WORD_UNIT * width / 109) + 'px';
  svg.style.height = Math.round(PEEK_WORD_UNIT * rowCount) + 'px';
  return { svg, cells };
}

async function playPeekWord(strip) {
  const token = ++peekStrokeToken;
  const NS = 'http://www.w3.org/2000/svg';
  for (const cl of strip.cells) {
    if (token !== peekStrokeToken) return;
    const g = document.createElementNS(NS, 'g');
    g.setAttribute('transform', `translate(${cl.x},${109 * cl.row})` + (cl.small ? ' translate(14,100) scale(0.75) translate(-14,-100)' : ''));
    strip.svg.appendChild(g);
    if (!cl.strokes) {
      const t = document.createElementNS(NS, 'text');
      t.setAttribute('x', String(cl.adv / 2)); t.setAttribute('y', '88'); t.setAttribute('text-anchor', 'middle');
      t.setAttribute('class', 'peek-word-static'); t.textContent = cl.c;
      g.appendChild(t);
      if (!PEEK_REDUCED_MOTION) await new Promise(r => setTimeout(r, 120));
      continue;
    }
    for (const d of cl.strokes) {
      if (token !== peekStrokeToken) return;
      const p = document.createElementNS(NS, 'path');
      p.setAttribute('d', d); p.setAttribute('class', 'peek-stroke word');
      g.appendChild(p);
      if (PEEK_REDUCED_MOTION) continue;
      const L = p.getTotalLength(), ms = Math.round(60 + L * 1.5);
      p.style.strokeDasharray = L + ' ' + L; p.style.strokeDashoffset = L;
      p.getBoundingClientRect();
      p.style.transition = 'stroke-dashoffset ' + ms + 'ms ease-in-out'; p.style.strokeDashoffset = 0;
      await new Promise(r => setTimeout(r, ms + 20));
    }
  }
}

// glyphs = one list of stroke paths per character, drawn left to right.
async function playPeekStrokes(svg, glyphs, lay) {
  const token = ++peekStrokeToken;
  const NS = 'http://www.w3.org/2000/svg';
  lay = lay || peekGlyphLayout([], glyphs.length);
  const groups = glyphs.map((g, i) => {
    const el = document.createElementNS(NS, 'g');
    const p = lay.pos[i];
    el.setAttribute('transform', `translate(${p.x},0)` + (p.small ? ' translate(14,100) scale(0.75) translate(-14,-100)' : ''));
    svg.appendChild(el); return el;
  });
  const mk = (d, cls, gi) => { const p = document.createElementNS(NS, 'path'); p.setAttribute('d', d); p.setAttribute('class', 'peek-stroke ' + cls); groups[gi].appendChild(p); return p; };
  glyphs.forEach((g, gi) => g.forEach(d => mk(d, 'ghost', gi)));
  for (const [gi, g] of glyphs.entries()) for (const d of g) {
    if (token !== peekStrokeToken) return;
    const p = mk(d, 'done', gi);
    if (PEEK_REDUCED_MOTION) continue;
    const L = p.getTotalLength(), ms = Math.round(120 + L * 3.5);
    p.style.strokeDasharray = L + ' ' + L; p.style.strokeDashoffset = L;
    p.getBoundingClientRect();
    p.style.transition = 'stroke-dashoffset ' + ms + 'ms ease-in-out'; p.style.strokeDashoffset = 0;
    await new Promise(r => setTimeout(r, ms + 40));
  }
}

// New index page (2026-09-22) sitting in front of Hiragana/Katakana -
// see the comment on screen-kana-selection and on showHiraganaSelection.
function showKanaSelection() {
  showScreen('kana-selection');
  refreshKanaSelectionSwatches();
}

// One confidence bar per row on the Kana index page, computed the same way
// as every other confidence display (getCategoryBandCounts/getCategoryBand
// CountsKanji) but keyed the way kana items actually score - see
// getScoreKey's fallback (bare q.char), matching kanaScoreClass's own
// per-tile lookup in buildKanaSectionGrid.
function getKanaSectionBandCounts(section) {
  const counts = { untested: 0, neg3: 0, neg2: 0, neg1: 0, neutral: 0, pos1: 0, pos2: 0, pos3: 0, pos4: 0 };
  DATA[section.dataKey].forEach(item => {
    const entry = kanaScores[item.char];
    if (!entry) { counts.untested++; return; }
    counts[confidenceBand(displayScore(entry))]++;
  });
  return counts;
}

function refreshKanaSelectionSwatches() {
  [['kana-hiragana-base-swatch', HIRAGANA_SECTIONS.base],
   ['kana-hiragana-diacritics-swatch', HIRAGANA_SECTIONS.diacritics],
   ['kana-hiragana-youon-swatch', HIRAGANA_SECTIONS.youon],
   ['kana-katakana-base-swatch', KATAKANA_SECTIONS.base],
   ['kana-katakana-diacritics-swatch', KATAKANA_SECTIONS.diacritics],
   ['kana-katakana-youon-swatch', KATAKANA_SECTIONS.youon]]
    .forEach(([id, section]) => setupCatBar(document.getElementById(id), getKanaSectionBandCounts(section)));
}

function buildDeck() {
  let d = [];
  selected.forEach(k => { if (DATA[k]) DATA[k].forEach(q => d.push(Object.assign({groupKey: k}, q))); });
  return shuffle(d);
}

// Row layouts for each hiragana section. rowDataIndices maps each displayed
// row to the DATA[dataKey] indices it contains (base's order differs from
// display order, hence the explicit mapping there; diacritics/youon are
// already in matching sequential order in their DATA arrays).
const HIRAGANA_SECTIONS = {
  base: {
    label: 'Base',
    dataKey: 'hiragana-base',
    rows: [
      [['あ','a'],['い','i'],['う','u'],['え','e'],['お','o']],
      [['か','ka'],['き','ki'],['く','ku'],['け','ke'],['こ','ko']],
      [['さ','sa'],['し','shi'],['す','su'],['せ','se'],['そ','so']],
      [['た','ta'],['ち','chi'],['つ','tsu'],['て','te'],['と','to']],
      [['な','na'],['に','ni'],['ぬ','nu'],['ね','ne'],['の','no']],
      [['は','ha'],['ひ','hi'],['ふ','fu'],['へ','he'],['ほ','ho']],
      [['ま','ma'],['み','mi'],['む','mu'],['め','me'],['も','mo']],
      [['や','ya'],[null,null],['ゆ','yu'],[null,null],['よ','yo']],
      [['ら','ra'],['り','ri'],['る','ru'],['れ','re'],['ろ','ro']],
      [['わ','wa'],[null,null],[null,null],[null,null],['を','wo']],
      [['ん','n'],[null,null],[null,null],[null,null],[null,null]],
    ],
    rowDataIndices: [
      [0,1,2,3,4],[5,6,7,8,9],[10,11,12,13,14],[15,16,17,18,19],[20,21,22,23,24],
      [25,26,27,28,29],[30,31,32,33,34],[35,36,37],[38,39,40,41,42],[43,44],[45],
    ],
  },
  diacritics: {
    label: 'Dakuten / handakuten',
    dataKey: 'hiragana-diacritics',
    rows: [
      [['が','ga'],['ぎ','gi'],['ぐ','gu'],['げ','ge'],['ご','go']],
      [['ざ','za'],['じ','ji'],['ず','zu'],['ぜ','ze'],['ぞ','zo']],
      [['だ','da'],['ぢ','di'],['づ','du'],['で','de'],['ど','do']],
      [['ば','ba'],['び','bi'],['ぶ','bu'],['べ','be'],['ぼ','bo']],
      [['ぱ','pa'],['ぴ','pi'],['ぷ','pu'],['ぺ','pe'],['ぽ','po']],
    ],
    rowDataIndices: [[0,1,2,3,4],[5,6,7,8,9],[10,11,12,13,14],[15,16,17,18,19],[20,21,22,23,24]],
  },
  youon: {
    label: 'Contracted',
    dataKey: 'hiragana-youon',
    rows: [
      [['きゃ','kya'],['きゅ','kyu'],['きょ','kyo']],
      [['しゃ','sha'],['しゅ','shu'],['しょ','sho']],
      [['ちゃ','cha'],['ちゅ','chu'],['ちょ','cho']],
      [['にゃ','nya'],['にゅ','nyu'],['にょ','nyo']],
      [['ひゃ','hya'],['ひゅ','hyu'],['ひょ','hyo']],
      [['みゃ','mya'],['みゅ','myu'],['みょ','myo']],
      [['りゃ','rya'],['りゅ','ryu'],['りょ','ryo']],
      [['ぎゃ','gya'],['ぎゅ','gyu'],['ぎょ','gyo']],
      [['じゃ','ja'],['じゅ','ju'],['じょ','jo']],
      [['びゃ','bya'],['びゅ','byu'],['びょ','byo']],
      [['ぴゃ','pya'],['ぴゅ','pyu'],['ぴょ','pyo']],
    ],
    rowDataIndices: [
      [0,1,2],[3,4,5],[6,7,8],[9,10,11],[12,13,14],[15,16,17],
      [18,19,20],[21,22,23],[24,25,26],[27,28,29],[30,31,32],
    ],
  },
};

const hiraganaSelectedRows = { base: new Set(), diacritics: new Set(), youon: new Set() };

let activeHiraganaSection = 'base';

// Takes the section to open directly (2026-09-22) - entered from the Kana
// index page now (one row per section) rather than always landing on Base
// and switching via an in-screen pill row, so the section is known up
// front. activeHiraganaSection/hiraganaSelectedRows/hira-selection-drill-btn
// etc. are otherwise untouched - they already tracked state per section,
// keyed off activeHiraganaSection, so nothing downstream (drillHiragana
// Selection, goBackToSettings, ...) needed to change at all.
// Base kana have stroke order on hold (2026-10-16); the line under the title says so.
function kanaSelectionSub(id, section) {
  const el = document.getElementById(id);
  if (el) el.textContent = 'Tap a row to select it for drilling. Touch and hold a character to see its strokes.';
}

function showHiraganaSelection(sectionKey) {
  activeHiraganaSection = sectionKey || 'base';
  kanaSelectionSub('hiragana-selection-sub', activeHiraganaSection);
  showScreen('hiragana-selection');
  Object.keys(HIRAGANA_SECTIONS).forEach(key => {
    buildKanaSectionGrid('hiragana-grid-' + key, HIRAGANA_SECTIONS[key]);
    refreshKanaScoreShading('hiragana-grid-' + key);
    const el = document.getElementById('hiragana-grid-' + key);
    if (el) el.style.display = key === activeHiraganaSection ? 'block' : 'none';
  });
  const titleEl = document.getElementById('hiragana-selection-title');
  if (titleEl) titleEl.textContent = activeHiraganaSection === 'base' ? 'Hiragana' : 'Hiragana — ' + HIRAGANA_SECTIONS[activeHiraganaSection].label;
  document.getElementById('hira-selection-drill-btn').disabled = hiraganaSelectedRows[activeHiraganaSection].size === 0;
  syncDirectionCardRefHira();
  updateSelectAllHiraganaLabel();
  const refCard = document.getElementById('hiragana-voicing-ref-card');
  if (refCard) refCard.style.display = activeHiraganaSection === 'base' ? 'none' : 'flex';
}

// Shared by hiragana and katakana reference screens: builds a selectable,
// score-shaded grid for one section into the given container (once; cached).
function buildKanaSectionGrid(containerId, section) {
  const container = document.getElementById(containerId);
  if (!container || container.children.length > 0) return;

  const grid = document.createElement('div');
  grid.className = 'kana-ref-grid';

  section.rows.forEach((rowData, rowIdx) => {
    const rowEl = document.createElement('div');
    rowEl.className = 'kana-ref-row';
    rowEl.dataset.row = rowIdx;
    // The tap after a hold-to-peek is swallowed so it doesn't select the row.
    rowEl.onclick = () => { if (Date.now() < tilePeekSuppressClickUntil) return; toggleKanaSectionRow(section, containerId, rowIdx, rowEl); };

    rowData.forEach(([char, rom]) => {
      const card = document.createElement('div');
      card.className = char ? 'kana-ref-card' : 'kana-ref-card empty';
      if (char) {
        card.innerHTML = `<span class="kana-ref-char">${markSmallKana(char)}</span><span class="kana-ref-rom">${rom}</span>`;
        card.dataset.scoreKey = char;
        const scoreClass = kanaScoreClass(char);
        if (scoreClass) card.classList.add(scoreClass);
        // Hold to see the stroke order (base kana 2026-10-16; dakuten,
        // handakuten and contracted 2026-10-17). Every character in the cell
        // needs stroke data, else no bubble.
        const S = window.JP_DRILL_KANA_STROKES || {};
        const glyphs = [...char].map(c => S[c]);
        if (glyphs.every(Boolean)) attachTilePeek(card, { jp: char, romaji: rom, en: '', glyphs, chars: [...char] });
      }
      rowEl.appendChild(card);
    });

    grid.appendChild(rowEl);
  });

  container.appendChild(grid);
}

function toggleSelectAllHiragana() {
  const section = HIRAGANA_SECTIONS[activeHiraganaSection];
  const set = hiraganaSelectedRows[activeHiraganaSection];
  const grid = document.getElementById('hiragana-grid-' + activeHiraganaSection);
  const allSelected = set.size === section.rows.length;
  if (allSelected) {
    set.clear();
    if (grid) grid.querySelectorAll('.kana-ref-row').forEach(r => r.classList.remove('selected'));
  } else {
    section.rows.forEach((_, idx) => set.add(idx));
    if (grid) grid.querySelectorAll('.kana-ref-row').forEach(r => r.classList.add('selected'));
  }
  document.getElementById('hira-selection-drill-btn').disabled = set.size === 0;
  updateSelectAllHiraganaLabel();
}

function updateSelectAllHiraganaLabel() {
  const section = HIRAGANA_SECTIONS[activeHiraganaSection];
  const set = hiraganaSelectedRows[activeHiraganaSection];
  const allSelected = set.size === section.rows.length;
  document.getElementById('hiragana-select-all-label').textContent =
    (allSelected ? 'Deselect all — ' : 'Select all — ') + section.label;
  const card = document.getElementById('hiragana-select-all-card');
  if (card) card.classList.toggle('selected', allSelected);
}

function toggleKanaSectionRow(section, containerId, rowIdx, rowEl) {
  const isHiragana = containerId.startsWith('hiragana-');
  const sections = isHiragana ? HIRAGANA_SECTIONS : KATAKANA_SECTIONS;
  const rowState = isHiragana ? hiraganaSelectedRows : katakanaSelectedRows;
  const sectionKey = Object.keys(sections).find(k => sections[k] === section);
  const set = rowState[sectionKey];
  if (set.has(rowIdx)) {
    set.delete(rowIdx);
    rowEl.classList.remove('selected');
  } else {
    set.add(rowIdx);
    rowEl.classList.add('selected');
  }
  const drillBtnId = isHiragana ? 'hira-selection-drill-btn' : 'kata-selection-drill-btn';
  document.getElementById(drillBtnId).disabled = set.size === 0;
  const updateLabel = isHiragana ? updateSelectAllHiraganaLabel : updateSelectAllKatakanaLabel;
  updateLabel();
}

// switchHiraganaSection removed (2026-09-22) - its job (pick the section,
// show that grid, update the drill button / Select-all label / voicing-ref
// card visibility) is now done by showHiraganaSelection(sectionKey) above,
// called directly from the Kana index page's rows instead of from an
// in-screen pill row that no longer exists.
function drillHiraganaSelection() {
  const section = HIRAGANA_SECTIONS[activeHiraganaSection];
  const selectedRows = hiraganaSelectedRows[activeHiraganaSection];
  if (selectedRows.size === 0) return;
  const data = DATA[section.dataKey];
  const customDeck = [];
  [...selectedRows].sort((a, b) => a - b).forEach(rowIdx => {
    section.rowDataIndices[rowIdx].forEach(dataIdx => {
      const entry = data[dataIdx];
      if (entry) customDeck.push(Object.assign({ groupKey: section.dataKey }, entry));
    });
  });
  lastSettingsScreen = 'hiragana-selection';
  startDrill(shuffle(customDeck));
}

function syncDirectionCardRefHira() {
  const label = reversed ? 'Romaji → kana' : 'Kana → romaji';
  const sub = reversed ? 'See a reading, pick the character. Tap to reverse.' : 'See a character, pick the reading. Tap to reverse.';
  const card = document.getElementById('direction-card-ref-hira');
  if (card) card.classList.toggle('selected', reversed);
  document.getElementById('direction-name-ref-hira').textContent = label;
  document.getElementById('direction-sub-ref-hira').textContent = sub;
}

// Map each row index to the DATA['katakana-base'] character indices it contains
const KATAKANA_SECTIONS = {
  base: {
    label: 'Base',
    dataKey: 'katakana-base',
    rows: [
      [['ア','a'],['イ','i'],['ウ','u'],['エ','e'],['オ','o']],
      [['カ','ka'],['キ','ki'],['ク','ku'],['ケ','ke'],['コ','ko']],
      [['サ','sa'],['シ','shi'],['ス','su'],['セ','se'],['ソ','so']],
      [['タ','ta'],['チ','chi'],['ツ','tsu'],['テ','te'],['ト','to']],
      [['ナ','na'],['ニ','ni'],['ヌ','nu'],['ネ','ne'],['ノ','no']],
      [['ハ','ha'],['ヒ','hi'],['フ','fu'],['ヘ','he'],['ホ','ho']],
      [['マ','ma'],['ミ','mi'],['ム','mu'],['メ','me'],['モ','mo']],
      [['ヤ','ya'],[null,null],['ユ','yu'],[null,null],['ヨ','yo']],
      [['ラ','ra'],['リ','ri'],['ル','ru'],['レ','re'],['ロ','ro']],
      [['ワ','wa'],[null,null],[null,null],[null,null],['ヲ','wo']],
      [['ン','n'],[null,null],[null,null],[null,null],[null,null]],
    ],
    rowDataIndices: [
      [0,1,2,3,4],[5,6,7,8,9],[10,11,12,13,14],[15,16,17,18,19],[20,21,22,23,24],
      [25,26,27,28,29],[30,31,32,33,34],[35,36,37],[38,39,40,41,42],[43,44],[45],
    ],
  },
  diacritics: {
    label: 'Dakuten / handakuten',
    dataKey: 'katakana-diacritics',
    rows: [
      [['ガ','ga'],['ギ','gi'],['グ','gu'],['ゲ','ge'],['ゴ','go']],
      [['ザ','za'],['ジ','ji'],['ズ','zu'],['ゼ','ze'],['ゾ','zo']],
      [['ダ','da'],['ヂ','di'],['ヅ','du'],['デ','de'],['ド','do']],
      [['バ','ba'],['ビ','bi'],['ブ','bu'],['ベ','be'],['ボ','bo']],
      [['ヴ','vu']],
      [['パ','pa'],['ピ','pi'],['プ','pu'],['ペ','pe'],['ポ','po']],
    ],
    // Note: 26 items, one more than hiragana's 25 — ヴ (vu) is a katakana-only
    // sound with no hiragana equivalent, so it gets its own single-tile row.
    rowDataIndices: [[0,1,2,3,4],[5,6,7,8,9],[10,11,12,13,14],[15,16,17,18,19],[20],[21,22,23,24,25]],
  },
  youon: {
    label: 'Contracted',
    dataKey: 'katakana-youon',
    rows: [
      [['キャ','kya'],['キュ','kyu'],['キョ','kyo']],
      [['シャ','sha'],['シュ','shu'],['ショ','sho']],
      [['チャ','cha'],['チュ','chu'],['チョ','cho']],
      [['ニャ','nya'],['ニュ','nyu'],['ニョ','nyo']],
      [['ヒャ','hya'],['ヒュ','hyu'],['ヒョ','hyo']],
      [['ミャ','mya'],['ミュ','myu'],['ミョ','myo']],
      [['リャ','rya'],['リュ','ryu'],['リョ','ryo']],
      [['ギャ','gya'],['ギュ','gyu'],['ギョ','gyo']],
      [['ジャ','ja'],['ジュ','ju'],['ジョ','jo']],
      [['ビャ','bya'],['ビュ','byu'],['ビョ','byo']],
      [['ピャ','pya'],['ピュ','pyu'],['ピョ','pyo']],
    ],
    rowDataIndices: [
      [0,1,2],[3,4,5],[6,7,8],[9,10,11],[12,13,14],[15,16,17],
      [18,19,20],[21,22,23],[24,25,26],[27,28,29],[30,31,32],
    ],
  },
};

const katakanaSelectedRows = { base: new Set(), diacritics: new Set(), youon: new Set() };

let activeKatakanaSection = 'base';

// Takes the section to open directly (2026-09-22) - same reasoning as
// showHiraganaSelection above, which this mirrors.
function showKatakanaSelection(sectionKey) {
  activeKatakanaSection = sectionKey || 'base';
  kanaSelectionSub('katakana-selection-sub', activeKatakanaSection);
  showScreen('katakana-selection');
  Object.keys(KATAKANA_SECTIONS).forEach(key => {
    buildKanaSectionGrid('katakana-grid-' + key, KATAKANA_SECTIONS[key]);
    refreshKanaScoreShading('katakana-grid-' + key);
    const el = document.getElementById('katakana-grid-' + key);
    if (el) el.style.display = key === activeKatakanaSection ? 'block' : 'none';
  });
  const titleEl = document.getElementById('katakana-selection-title');
  if (titleEl) titleEl.textContent = activeKatakanaSection === 'base' ? 'Katakana' : 'Katakana — ' + KATAKANA_SECTIONS[activeKatakanaSection].label;
  document.getElementById('kata-selection-drill-btn').disabled = katakanaSelectedRows[activeKatakanaSection].size === 0;
  syncDirectionCardRef();
  updateSelectAllKatakanaLabel();
  const refCard = document.getElementById('katakana-voicing-ref-card');
  if (refCard) refCard.style.display = activeKatakanaSection === 'base' ? 'none' : 'flex';
  const hiraRefCard = document.getElementById('hiragana-answers-card-ref');
  if (hiraRefCard) hiraRefCard.classList.toggle('selected', showHiraganaOnKatakana);
}

function syncDirectionCardRef() {
  const label = reversed ? 'Romaji → kana' : 'Kana → romaji';
  const sub = reversed ? 'See a reading, pick the character. Tap to reverse.' : 'See a character, pick the reading. Tap to reverse.';
  const card = document.getElementById('direction-card-ref');
  if (card) card.classList.toggle('selected', reversed);
  document.getElementById('direction-name-ref').textContent = label;
  document.getElementById('direction-sub-ref').textContent = sub;
}

function toggleSelectAllKatakana() {
  const section = KATAKANA_SECTIONS[activeKatakanaSection];
  const set = katakanaSelectedRows[activeKatakanaSection];
  const grid = document.getElementById('katakana-grid-' + activeKatakanaSection);
  const allSelected = set.size === section.rows.length;
  if (allSelected) {
    set.clear();
    if (grid) grid.querySelectorAll('.kana-ref-row').forEach(r => r.classList.remove('selected'));
  } else {
    section.rows.forEach((_, idx) => set.add(idx));
    if (grid) grid.querySelectorAll('.kana-ref-row').forEach(r => r.classList.add('selected'));
  }
  document.getElementById('kata-selection-drill-btn').disabled = set.size === 0;
  updateSelectAllKatakanaLabel();
}

function updateSelectAllKatakanaLabel() {
  const section = KATAKANA_SECTIONS[activeKatakanaSection];
  const set = katakanaSelectedRows[activeKatakanaSection];
  const allSelected = set.size === section.rows.length;
  document.getElementById('katakana-select-all-label').textContent =
    (allSelected ? 'Deselect all — ' : 'Select all — ') + section.label;
}

// switchKatakanaSection removed (2026-09-22) - see the equivalent comment
// by drillHiraganaSelection above; showKatakanaSelection(sectionKey) now
// does this job directly.
function drillKatakanaSelection() {
  const section = KATAKANA_SECTIONS[activeKatakanaSection];
  const selectedRows = katakanaSelectedRows[activeKatakanaSection];
  if (selectedRows.size === 0) return;
  const data = DATA[section.dataKey];
  const customDeck = [];
  [...selectedRows].sort((a, b) => a - b).forEach(rowIdx => {
    section.rowDataIndices[rowIdx].forEach(dataIdx => {
      const entry = data[dataIdx];
      if (entry) customDeck.push(Object.assign({ groupKey: section.dataKey }, entry));
    });
  });
  lastSettingsScreen = 'katakana-selection';
  startDrill(shuffle(customDeck));
}

// Which base row (in HIRAGANA_SECTIONS.base / KATAKANA_SECTIONS.base) feeds
// which diacritics row (in ...SECTIONS.diacritics), grouped under a
// romaji-only label - there's no kana glyph for a bare consonant on its own,
// so "h -> b" is written with letters rather than trying to show it in kana.
// Katakana's diacritics list has an extra row (ヴ/vu, its own single-tile
// row with no hiragana equivalent) sitting between ba and pa, hence the
// diaRow index for "h -> p" differing between the two scripts.
const KANA_VOICING_GROUPS = {
  hiragana: [
    { label: 'k → g', baseRow: 1, diaRow: 0 },
    { label: 's → z', baseRow: 2, diaRow: 1 },
    { label: 't → d', baseRow: 3, diaRow: 2 },
    { label: 'h → b', baseRow: 5, diaRow: 3 },
    { label: 'h → p', baseRow: 5, diaRow: 4 },
  ],
  katakana: [
    { label: 'k → g', baseRow: 1, diaRow: 0 },
    { label: 's → z', baseRow: 2, diaRow: 1 },
    { label: 't → d', baseRow: 3, diaRow: 2 },
    { label: 'h → b', baseRow: 5, diaRow: 3 },
    { label: 'h → p', baseRow: 5, diaRow: 5 },
  ],
};

// Reference page for the dakuten/handakuten sound shifts - opened from the
// Hiragana and Katakana selection screens whenever the Dakuten/handakuten or
// Contracted tab is active (contracted sounds are built on top of the voiced
// row too, e.g. ぎゃ needs the き -> ぎ shift, so it's useful there as well).
function showKanaVoicingReference(kind) {
  vocabRefBackTarget = kind === 'hiragana' ? 'hiragana-selection' : 'katakana-selection';
  const sections = kind === 'hiragana' ? HIRAGANA_SECTIONS : KATAKANA_SECTIONS;
  document.getElementById('vocab-ref-title').textContent = 'Dakuten & handakuten';
  const list = document.getElementById('vocab-ref-list');
  list.className = 'tight-list';
  list.innerHTML = '';
  KANA_VOICING_GROUPS[kind].forEach(group => {
    const heading = document.createElement('div');
    heading.className = 'kana-transform-group-label';
    heading.textContent = group.label;
    list.appendChild(heading);
    const baseRow = sections.base.rows[group.baseRow];
    const diaRow = sections.diacritics.rows[group.diaRow];
    baseRow.forEach(([baseChar, baseRom], i) => {
      const voiced = diaRow[i];
      if (!baseChar || !voiced) return;
      const [voicedChar, voicedRom] = voiced;
      const row = document.createElement('div');
      row.className = 'kana-transform-row';
      row.innerHTML = `
        <span class="kana-transform-side">
          <span class="kana-transform-char">${baseChar}</span>
          <span class="kana-transform-rom">${baseRom}</span>
        </span>
        <span class="kana-transform-arrow">→</span>
        <span class="kana-transform-side">
          <span class="kana-transform-char accent">${voicedChar}</span>
          <span class="kana-transform-rom">${voicedRom}</span>
        </span>
      `;
      list.appendChild(row);
    });
  });
  showScreen('vocab-reference');
}
