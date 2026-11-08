// Japanese - the sentence engine (2026-11-08, step 8 of the move onto the
// core): sentences made from the taught words (times, places, verbs, family,
// gifts, invitations...), their questions and answers, and Being (X is Y).
// The daily card, reading passages, desk sheets and the builder all draw
// on it. Loaded before ja/legacy.js.

const SG_TIMES = {
  // tenses: which verb tenses the word can go with. span: 'day' (ordinary
  // outings and activities), 'long' (trips abroad only).
  まいにち: { en: 'every day', tenses: ['hab'] },
  まいあさ: { en: 'every morning', tenses: ['hab'], morning: true },
  あさ: { en: 'in the morning', tenses: ['hab'], morning: true, freqOk: true },
  ひる: { en: 'at lunchtime', tenses: ['hab'], freqOk: true },
  よる: { en: 'in the evening', tenses: ['hab'], evening: true, freqOk: true },
  しゅうまつ: { en: { hab: 'at weekends', fut: 'at the weekend', past: 'at the weekend' }, tenses: ['hab', 'fut', 'past'], weekend: true, freqOk: true },
  きょう: { en: 'today', tenses: ['fut'] },
  あした: { en: 'tomorrow', tenses: ['fut'] },
  あさって: { en: 'the day after tomorrow', tenses: ['fut'] },
  こんばん: { en: 'tonight', tenses: ['fut'], evening: true },
  らいしゅう: { en: 'next week', tenses: ['fut'], outing: true },
  きのう: { en: 'yesterday', tenses: ['past'] },
  おととい: { en: 'the day before yesterday', tenses: ['past'] },
  けさ: { en: 'this morning', tenses: ['past'], morning: true },
  せんしゅう: { en: 'last week', tenses: ['past'], outing: true },
  らいげつ: { en: 'next month', tenses: ['fut'], long: true },
  らいねん: { en: 'next year', tenses: ['fut'], long: true },
  せんげつ: { en: 'last month', tenses: ['past'], long: true },
  きょねん: { en: 'last year', tenses: ['past'], long: true },
  // Lesson 6 (2026-11-03). Opt-in (l6): only the generators that check
  // sgActTimeOk / sgDestTimeOk / l3cGiveTime ask for them, so routines and
  // the older patterns never say "gets up every month". weekly: not with
  // routines; rare: only occasional things; soon: not with day trips.
  こんしゅう: { en: 'this week', tenses: ['past', 'fut'], l6: true },
  まいしゅう: { en: 'every week', tenses: ['hab'], l6: true, weekly: true },
  まいつき: { en: 'every month', tenses: ['hab'], l6: true, rare: true },
  まいとし: { en: 'every year', tenses: ['hab'], l6: true, rare: true },
  これから: { en: 'now', tenses: ['fut'], l6: true, soon: true },
  あとで: { en: 'later', tenses: ['fut'], l6: true, soon: true },
  こんげつ: { en: 'this month', tenses: ['past', 'fut'], long: true },
  ことし: { en: 'this year', tenses: ['past', 'fut'], long: true },
};

const SG_DAYS = [['げつようび', 'Monday'], ['かようび', 'Tuesday'], ['すいようび', 'Wednesday'], ['もくようび', 'Thursday'], ['きんようび', 'Friday'], ['どようび', 'Saturday', true], ['にちようび', 'Sunday', true]];

// (2026-10-07) The same five words as the Frequency card / Sentence order card
// (L3_FREQ_WORDS) - one list. Only positive words' .en reaches the English.
const SG_FREQ = L3_FREQ_WORDS;

// English verb forms, keyed by the first word of a phrase.
const SG_VERB_EN = {
  eat: ['eats', 'ate'], drink: ['drinks', 'drank'], have: ['has', 'had'], watch: ['watches', 'watched'], listen: ['listens', 'listened'],
  read: ['reads', 'read'], write: ['writes', 'wrote'], buy: ['buys', 'bought'], take: ['takes', 'took'], play: ['plays', 'played'],
  do: ['does', 'did'], go: ['goes', 'went'], cook: ['cooks', 'cooked'], study: ['studies', 'studied'], dance: ['dances', 'danced'],
  get: ['gets', 'got'], work: ['works', 'worked'], rest: ['rests', 'rested'], meet: ['meets', 'met'], come: ['comes', 'came'],
  swim: ['swims', 'swam'], exercise: ['exercises', 'exercised'], sing: ['sings', 'sang'],
  // Lesson 4 (2026-10-20): giving & receiving
  give: ['gives', 'gave'], lend: ['lends', 'lent'], borrow: ['borrows', 'borrowed'], teach: ['teaches', 'taught'],
  learn: ['learns', 'learned'], send: ['sends', 'sent'], phone: ['phones', 'phoned'],
  // Lesson 5 (2026-10-27)
  cut: ['cuts', 'cut'], draw: ['draws', 'drew'],
};

function sgVerbEn(phrase, form) { // form: base | third | past
  if (form === 'base') return phrase;
  const [first, ...rest] = phrase.split(' ');
  const f = SG_VERB_EN[first];
  const w = f ? f[form === 'third' ? 0 : 1] : (form === 'third' ? first + 's' : first + 'ed');
  return [w, ...rest].join(' ');
}

// Verbs with their own object lists. Each obj = [kana, English (habitual),
// English (one-off, optional)]. list = objects can be joined with と/や.
// places = where the activity can happen (で) - only places that genuinely
// fit every object in that entry, which is why some verbs are split into
// several entries (sushi isn't eaten at a café, golf isn't played in the
// park, beer isn't drunk at a coffee shop). Flags:
//   intrans  - no object (およぎます, うんどうします, うたいます)
//   outing   - not an everyday thing: never with まいにち/まいあさ/morning words
//   dayOnly  - not in the evening either (skiing, picnics)
//   noLunch  - takes longer than a lunch hour (golf, skiing, a play...)
//   routine  - a daily routine (medicine): every day / morning / evening, not weekly
//   adult    - never with a subject or companion who might be a child
//   noMorning - not with morning or lunchtime words (alcohol)
//   workObj  - しごと: subjects who work only
// Lesson 2 (2026-10-06): place で + verb is the lesson's grammar, so the
// place lists grew (rooms, the sea, mountains, the zoo...). Homework that
// week used にわ で サッカー / ビール and うち で しゅくだい with それから -
// deliberately not generated (see scan-sentences.py).
const SG_OBJECT_VERBS = [
  // (2026-10-07) This is now the ONE activity list: the Level 3 Sentence
  // order card draws from it too (it used to have its own), so anything
  // added here reaches both.
  { v: 'たべます', en: 'eat', list: true, objs: [['パン', 'bread'], ['たまご', 'eggs'], ['サラダ', 'salad'], ['サンドイッチ', 'sandwiches'], ['くだもの', 'fruit'], ['パンケーキ', 'pancakes'], ['オムレツ', 'omelettes']], places: ['うち', 'カフェ', 'きっさてん', 'しょくどう', 'レストラン'], futHave: true },
  { v: 'たべます', en: 'eat', list: true, objs: [['ごはん', 'rice'], ['さかな', 'fish'], ['にく', 'meat'], ['やさい', 'vegetables'], ['ラーメン', 'ramen'], ['パスタ', 'pasta'], ['すし', 'sushi'], ['カレー', 'curry'], ['てんぷら', 'tempura'], ['ピザ', 'pizza'],
    ['ステーキ', 'steak'], ['ぎょうざ', 'gyoza'], ['ぶたにく', 'pork'], ['ぎゅうにく', 'beef'], ['とりにく', 'chicken'], ['えび', 'prawns'], ['たこ', 'octopus'], ['いか', 'squid']], places: ['うち', 'レストラン', 'しょくどう'], futHave: true },
  { v: 'たべます', en: 'eat', list: true, objs: [['りんご', 'apples'], ['バナナ', 'bananas'], ['シリアル', 'cereal'], ['ヨーグルト', 'yoghurt'], ['なっとう', 'natto']], places: ['うち'], futHave: true },
  { v: 'のみます', en: 'drink', list: true, objs: [['コーヒー', 'coffee'], ['アイスコーヒー', 'iced coffee'], ['おちゃ', 'green tea'], ['にほんちゃ', 'Japanese tea'], ['こうちゃ', 'black tea'], ['ジュース', 'juice'], ['ぎゅうにゅう', 'milk'], ['みず', 'water']], places: ['うち', 'カフェ', 'きっさてん', 'レストラン'], futHave: true },
  { v: 'のみます', en: 'drink', objs: [['スポーツドリンク', 'sports drinks', 'a sports drink']], places: ['ジム', 'うち'], futHave: true },
  { v: 'のみます', en: 'drink', list: true, objs: [['ビール', 'beer'], ['ワイン', 'wine']], places: ['うち', 'レストラン', 'バー', 'パブ'], futHave: true, adult: true, noMorning: true },
  { v: 'のみます', en: 'drink', objs: [['おさけ', 'alcohol']], places: ['うち', 'レストラン', 'バー', 'パブ'], adult: true, noMorning: true },
  { v: 'のみます', phrase: true, objs: [['スープ', 'have soup']], places: ['うち', 'レストラン'] },
  { v: 'のみます', phrase: true, objs: [['くすり', 'take medicine']], places: ['うち'], routine: true },
  { v: 'かいます', en: 'buy', list: true, objs: [['パン', 'bread'], ['たまご', 'eggs'], ['ぎゅうにゅう', 'milk'], ['ジュース', 'juice']], places: ['スーパー', 'コンビニ'] },
  { v: 'かいます', en: 'buy', list: true, objs: [['たべもの', 'food'], ['のみもの', 'drinks']], places: ['スーパー', 'コンビニ'] },
  { v: 'かいます', en: 'buy', list: true, objs: [['やさい', 'vegetables'], ['くだもの', 'fruit'], ['にく', 'meat'], ['さかな', 'fish']], places: ['スーパー'] }, // fresh food: not a konbini thing
  { v: 'かいます', en: 'buy', list: true, objs: [['くつ', 'shoes', 'shoes'], ['ふく', 'clothes', 'clothes']], places: ['デパート'], outing: true }, // not an everyday/"always" purchase
  { v: 'かいます', en: 'buy', objs: [['ほん', 'books', 'a book'], ['ざっし', 'magazines', 'a magazine']], places: ['ほんや', 'コンビニ'] },
  { v: 'かいます', en: 'buy', objs: [['カメラ', 'cameras', 'a camera']], places: ['カメラや', 'デパート'], once: true },
  { v: 'みます', en: 'watch', objs: [['テレビ', 'TV', 'TV'], ['ニュース', 'the news', 'the news'], ['ドラマ', 'dramas', 'a drama'], ['スポーツ', 'sport', 'sport'], ['ビデオ', 'videos', 'a video']], places: ['うち', 'いま'] },
  { v: 'みます', en: 'watch', objs: [['えいが', 'films', 'a film']], places: ['うち', 'えいがかん'] },
  { v: 'みます', en: 'watch', objs: [['おしばい', 'plays', 'a play']], places: [], outing: true, noLunch: true },
  { v: 'ききます', en: 'listen to', objs: [['おんがく', 'music', 'music'], ['ラジオ', 'the radio', 'the radio'], ['ポップス', 'pop music', 'pop music'], ['オペラ', 'opera', 'opera']], places: ['うち', 'へや', 'いま'] },
  { v: 'よみます', en: 'read', objs: [['ほん', 'books', 'a book'], ['しんぶん', 'the newspaper', 'the newspaper'], ['ざっし', 'magazines', 'a magazine']], places: ['うち', 'へや', 'しんしつ', 'カフェ', 'きっさてん', 'としょかん', 'こうえん'] },
  { v: 'かきます', en: 'write', objs: [['メール', 'emails', 'an email'], ['てがみ', 'letters', 'a letter'], ['レポート', 'reports', 'a report']], places: ['うち', 'かいしゃ', 'じむしょ'] },
  { v: 'とります', en: 'take', objs: [['しゃしん', 'photos', 'photos'], ['セルフィー', 'selfies', 'selfies']], places: ['こうえん', 'うみ', 'やま', 'いなか', 'どうぶつえん'] },
  // Lesson 5 (2026-10-27): tool で - things to cut, write and draw, so the
  // tools (はさみで, ペンで, ふでで) have something to do.
  { v: 'きります', en: 'cut', objs: [['かみ', 'paper', 'the paper'], ['パン', 'bread', 'the bread'], ['にく', 'meat', 'the meat'], ['ピザ', 'pizza', 'the pizza'], ['りんご', 'apples', 'an apple'], ['はな', 'flowers', 'the flowers']], places: ['うち', 'だいどころ'] },
  { v: 'かきます', en: 'write', objs: [['カード', 'cards', 'a card'], ['メモ', 'notes', 'a note'], ['でんごん', 'messages', 'a message']], places: ['うち', 'かいしゃ', 'じむしょ'] },
  { v: 'かきます', phrase: true, objs: [['え', 'draw pictures']], places: ['うち', 'へや', 'こうえん'] },
  // します: English phrase is whole (play tennis, go swimming).
  { v: 'します', phrase: true, objs: [['テニス', 'play tennis'], ['サッカー', 'play football'], ['ジョギング', 'go jogging']], places: ['こうえん'] },
  { v: 'します', phrase: true, objs: [['ゴルフ', 'play golf']], places: [], outing: true, noLunch: true },
  { v: 'します', phrase: true, objs: [['スポーツ', 'do sport']], places: ['ジム', 'こうえん'] },
  { v: 'します', phrase: true, objs: [['じゅうどう', 'do judo']], places: [], noLunch: true },
  { v: 'します', phrase: true, objs: [['ウォーキング', 'go walking']], places: ['こうえん', 'いなか'] },
  { v: 'します', phrase: true, objs: [['パーティー', 'have a party']], places: ['うち'], outing: true, noLunch: true },
  { v: 'します', phrase: true, objs: [['すいえい', 'go swimming']], places: ['プール'] },
  { v: 'します', phrase: true, objs: [['ピクニック', 'have a picnic']], places: ['こうえん', 'うみ'], outing: true, dayOnly: true },
  { v: 'します', phrase: true, objs: [['バーベキュー', 'have a barbecue']], places: ['こうえん', 'うみ', 'にわ'], outing: true },
  { v: 'します', phrase: true, objs: [['スキー', 'go skiing']], places: ['やま'], outing: true, dayOnly: true, noLunch: true },
  { v: 'します', phrase: true, objs: [['ドライブ', 'go for a drive']], places: ['いなか'], outing: true, noLunch: true },
  { v: 'します', phrase: true, objs: [['サイクリング', 'go cycling']], places: ['いなか', 'こうえん'], outing: true },
  { v: 'します', phrase: true, objs: [['ゲーム', 'play games'], ['ガーデニング', 'do some gardening']], places: ['うち'] },
  { v: 'します', phrase: true, objs: [['りょうり', 'cook']], places: ['うち', 'だいどころ'] },
  { v: 'します', phrase: true, objs: [['べんきょう', 'study']], places: ['うち', 'へや', 'としょかん', 'だいがく', 'きょうしつ'] },
  // Lesson 6 (2026-11-03): from the もう practice
  { v: 'します', phrase: true, objs: [['しゅくだい', 'do the homework']], places: ['うち', 'へや', 'としょかん'] },
  { v: 'します', phrase: true, objs: [['さんぽ', 'go for a walk']], places: ['こうえん', 'いなか'] },
  { v: 'します', phrase: true, objs: [['かいもの', 'go shopping']], places: ['デパート', 'スーパー'] },
  { v: 'します', phrase: true, objs: [['しごと', 'work']], places: ['うち', 'かいしゃ', 'じむしょ'], workObj: true },
  { v: 'します', phrase: true, objs: [['カラオケ', 'do karaoke']], places: [], outing: true, noLunch: true },
  { v: 'します', phrase: true, objs: [['ダンス', 'dance']], places: [] },
  { v: 'およぎます', en: 'swim', intrans: true, objs: [], places: ['うみ', 'プール'] },
  { v: 'うんどうします', en: 'exercise', intrans: true, objs: [], places: ['ジム', 'こうえん'] },
  { v: 'うたいます', en: 'sing', intrans: true, objs: [], places: ['カラオケ', 'きょうかい'] },
];

// [English, me-only]. へや is "my room", so only with わたし as the subject.
const SG_PLACE_EN = {
  うち: ['at home'], レストラン: ['at a restaurant'], カフェ: ['at a café'], きっさてん: ['at a coffee shop'], しょくどう: ['in the canteen'],
  スーパー: ['at the supermarket'], コンビニ: ['at the convenience store'], デパート: ['at the department store'], ほんや: ['at the bookshop'],
  カメラや: ['at the camera shop'], えいがかん: ['at the cinema'], としょかん: ['at the library'], だいがく: ['at university'],
  かいしゃ: ['at the office'], じむしょ: ['at the office'], きょうしつ: ['in the classroom'], こうえん: ['in the park'], プール: ['at the pool'],
  へや: ['in my room', true], いま: ['in the living room'], しんしつ: ['in the bedroom'], だいどころ: ['in the kitchen'], にわ: ['in the garden'],
  うみ: ['at the seaside'], やま: ['in the mountains'], いなか: ['in the countryside'], どうぶつえん: ['at the zoo'], ジム: ['at the gym'],
  バー: ['at a bar'], パブ: ['at the pub'], カラオケ: ['at karaoke'], きょうかい: ['at church'],
};

// TOOL で (L3 Lesson 5, 2026-10-27): "with what" - はしで たべます, ペンで
// かきます, えいごで かきます (a language is a tool too). The Doing sentences
// put a tool where the place goes (slot 5), never both: the lesson's point is
// that both are で. [English]. SG_TOOL_USE says which tools suit which verb
// and object (no chopsticks for soup, no pizza cutter for paper).
const SG_TOOLS = {
  はし: 'with chopsticks', フォーク: 'with a fork', スプーン: 'with a spoon', ナイフ: 'with a knife', ほうちょう: 'with a kitchen knife',
  はさみ: 'with scissors', ピザカッター: 'with a pizza cutter', ペン: 'with a pen', えんぴつ: 'with a pencil', ふで: 'with a brush',
  シャーペン: 'with a mechanical pencil', パソコン: 'on the computer', タブレット: 'on a tablet', スマホ: 'on a smartphone', カメラ: 'with a camera',
  えいご: 'in English', にほんご: 'in Japanese',
  メール: 'by email', けいたい: 'on a mobile', // Lesson 6: Giving's means で
};

const SG_TOOL_USE = [
  { v: 'たべます', objs: ['すし', 'ラーメン', 'ごはん', 'てんぷら', 'ぎょうざ', 'さかな', 'やさい', 'なっとう'], tools: ['はし'] },
  { v: 'たべます', objs: ['パスタ', 'サラダ', 'オムレツ', 'パンケーキ'], tools: ['フォーク'] },
  { v: 'たべます', objs: ['ステーキ', 'ぶたにく', 'ぎゅうにく', 'とりにく'], tools: ['ナイフ', 'フォーク'] },
  { v: 'たべます', objs: ['カレー', 'シリアル', 'ヨーグルト'], tools: ['スプーン'] },
  { v: 'のみます', objs: ['スープ'], tools: ['スプーン'] },
  { v: 'きります', objs: ['かみ', 'はな'], tools: ['はさみ'] },
  { v: 'きります', objs: ['パン', 'にく', 'りんご'], tools: ['ほうちょう', 'ナイフ'] },
  { v: 'きります', objs: ['ピザ'], tools: ['ピザカッター', 'ナイフ'] },
  { v: 'かきます', objs: ['メール'], tools: ['パソコン', 'スマホ', 'タブレット', 'えいご', 'にほんご'] },
  { v: 'かきます', objs: ['レポート'], tools: ['パソコン', 'えいご', 'にほんご'] },
  { v: 'かきます', objs: ['てがみ', 'カード'], tools: ['ペン', 'ふで', 'えいご', 'にほんご'] },
  { v: 'かきます', objs: ['メモ', 'でんごん'], tools: ['ペン', 'えんぴつ', 'シャーペン', 'えいご', 'にほんご'] },
  { v: 'かきます', objs: ['え'], tools: ['えんぴつ', 'ふで', 'ペン'] },
  { v: 'よみます', objs: ['ほん', 'しんぶん', 'ざっし'], tools: ['タブレット', 'スマホ', 'えいご', 'にほんご'] },
  { v: 'みます', objs: ['えいが', 'ドラマ', 'ニュース', 'ビデオ'], tools: ['タブレット', 'パソコン', 'スマホ'] },
  { v: 'ききます', objs: ['おんがく', 'ラジオ', 'ポップス'], tools: ['スマホ'] },
  { v: 'とります', objs: ['しゃしん'], tools: ['スマホ', 'カメラ'] },
  { v: 'とります', objs: ['セルフィー'], tools: ['スマホ'] },
  { v: 'します', objs: ['べんきょう', 'しごと'], tools: ['パソコン'] },
];

const sgToolsFor = (V, o) => !V || !o ? [] : SG_TOOL_USE.filter(u => u.v === V.v && u.objs.includes(o[0])).flatMap(u => u.tools).filter(t => sgW(t));

const sgIsTool = jp => Object.prototype.hasOwnProperty.call(SG_TOOLS, jp);

// Which time words a PLACE can go with, whatever the activity.
const SG_PLACE_OUTING = ['うみ', 'やま', 'いなか', 'どうぶつえん'];

const SG_PLACE_WORK = ['かいしゃ', 'じむしょ', 'だいがく', 'きょうしつ', 'しょくどう']; // しょくどう = the work/school canteen

function sgPlaceTimeOk(p, jp, t) {
  if (!jp) return true;
  t = t || {};
  if (SG_PLACE_OUTING.includes(p) && (jp === 'まいにち' || jp === 'まいあさ' || t.evening)) return false;
  if (SG_PLACE_WORK.includes(p) && t.weekend) return false;
  if (p === 'きょうかい' && !['にちようび', 'しゅうまつ'].includes(jp)) return false;
  if ((p === 'バー' || p === 'パブ') && (t.morning || jp === 'ひる' || jp === 'まいにち')) return false;
  if (p === 'カラオケ' && (t.morning || jp === 'ひる' || jp === 'まいにち')) return false;
  return true;
}

// Time-word veto for an activity entry (outing / dayOnly / noMorning).
function sgActTimeOk(V, jp, t, tense) {
  if ((V.outing || V.noMorning) && (t.morning || jp === 'まいにち' || jp === 'まいあさ')) return false;
  if (V.noMorning && jp === 'ひる') return false;
  // a habitual outing on a weekday reads oddly ("has a picnic on Mondays")
  if (V.outing && tense === 'hab' && SG_DAYS.some(d => d[0] === jp && !d[2])) return false;
  if (V.dayOnly && t.evening) return false;
  if (V.noLunch && jp === 'ひる') return false;
  if (V.routine && (t.weekend || SG_DAYS.some(d => d[0] === jp) || jp === 'ひる' || jp === 'しゅうまつ')) return false;
  if (t.weekly && V.routine) return false;
  if (t.rare && !V.outing) return false; // "every year" only for occasional things
  if (t.soon && (V.outing || V.dayOnly)) return false;
  return true;
}

// Destinations for いきます: [English, kind]. kind: daily (fine every day /
// every morning), outing (occasional), event (go to a show), weekday (closed
// evenings and weekends), daytrip (an outing that takes the day - not at
// lunchtime or in the evening), work (not at weekends), bar (evenings, adults
// only), church (Sundays / weekends only).
const SG_DEST = {
  がっこう: ['to school', 'work'], だいがく: ['to university', 'work'], かいしゃ: ['to work', 'work'],
  えき: ['to the station', 'daily'], ジム: ['to the gym', 'daily'], こうえん: ['to the park', 'daily'], スーパー: ['to the supermarket', 'daily'],
  コンビニ: ['to the convenience store', 'daily'], カフェ: ['to a café', 'daily'], きっさてん: ['to a coffee shop', 'daily'], としょかん: ['to the library', 'daily'],
  プール: ['to the pool', 'daily'],
  レストラン: ['to a restaurant', 'outing'], デパート: ['to the department store', 'outing'], ほんや: ['to the bookshop', 'outing'],
  カメラや: ['to the camera shop', 'outing'], えいがかん: ['to the cinema', 'outing'], びじゅつかん: ['to the art museum', 'daytrip'],
  ゆうえんち: ['to an amusement park', 'daytrip'],
  うみ: ['to the seaside', 'daytrip'], やま: ['to the mountains', 'daytrip'], いなか: ['to the countryside', 'daytrip'], どうぶつえん: ['to the zoo', 'daytrip'],
  ぎんこう: ['to the bank', 'weekday'], ゆうびんきょく: ['to the post office', 'weekday'], びょういん: ['to the hospital', 'weekday'],
  ロックコンサート: ['to a rock concert', 'event'], ミュージカル: ['to a musical', 'event'], オペラ: ['to the opera', 'event'], コンサート: ['to a concert', 'event'],
  バー: ['to a bar', 'bar'], パブ: ['to the pub', 'bar'],
  きょうかい: ['to church', 'church'],
};

// Places where going with a colleague (どうりょう と) sounds natural.
const SG_COLLEAGUE_OK = ['レストラン', 'カフェ', 'きっさてん', 'バー', 'パブ'];

function sgDestTimeOk(kind, jp, t, tense, freq) {
  const isDay = SG_DAYS.some(d => d[0] === jp);
  if (kind === 'daytrip') { if (jp === 'ひる' || t.evening) return false; kind = 'outing'; }
  if (kind === 'work' && (t.weekend || t.evening)) return false;
  if (kind === 'weekday' && (t.weekend || t.evening)) return false;
  if (['outing', 'event', 'weekday', 'bar', 'church'].includes(kind) && (jp === 'まいにち' || jp === 'まいあさ' || t.morning)) return false;
  if (kind === 'bar' && jp === 'ひる') return false;
  if (kind === 'church' && !['にちようび', 'しゅうまつ'].includes(jp)) return false;
  if (freq && freq.neg && isDay) return false;
  if ((kind === 'event' || kind === 'outing') && tense === 'hab' && isDay) return false;
  if (kind === 'event' && tense === 'hab' && !freq) return false;
  if (t.rare && !['outing', 'daytrip', 'event'].includes(kind)) return false;
  if (t.soon && ['daytrip', 'event', 'church'].includes(kind)) return false;
  return true;
}

// Who can go where: children (younger siblings, sons, daughters) never to
// bars or work; grandparents not to school/university/work; parents and
// husbands/wives not to school/university ("my mother went to school").
function sgDestSubjOk(dest, kind, subj) {
  if (subj.child && (kind === 'bar' || dest === 'かいしゃ')) return false;
  if (subj.elderly && kind === 'work') return false;
  if ((subj.parent || subj.spouse) && (dest === 'がっこう' || dest === 'だいがく')) return false;
  return true;
}

const SG_TRANSPORT = [['でんしゃ', 'by train'], ['バス', 'by bus'], ['ちかてつ', 'by underground'], ['じてんしゃ', 'by bike'], ['くるま', 'by car'], ['タクシー', 'by taxi'], ['バイク', 'by motorbike'], ['あるいて', 'on foot', true]];

const SG_COUNTRIES = ['にほん', 'フランス', 'イタリア', 'スペイン', 'ドイツ', 'アメリカ', 'カナダ', 'オーストラリア', 'かんこく', 'ちゅうごく', 'タイ', 'ベトナム', 'メキシコ', 'ブラジル', 'インド', 'シンガポール'];

// Family (Lesson 2, 2026-10-06). Two sets, never mixed:
// SG_FAMILY - polite forms for SOMEONE ELSE'S family, so they only ever
// appear as ともだちの / [name]の + word ("my friend's mother").
// SG_MY_FAMILY - plain forms for YOUR OWN family, used bare: ちち は = "my
// father". As a companion (はは と) only when わたし is the subject, since
// はは always means the speaker's mother.
// child: might be a child (no bars, alcohol or work). elderly: grandparents
// (no school/work). spouse: the only family subjects given work routines.
const SG_FAMILY = [
  { jp: 'おかあさん', en: 'mother', parent: true }, { jp: 'おとうさん', en: 'father', parent: true }, { jp: 'おにいさん', en: 'older brother' }, { jp: 'おねえさん', en: 'older sister' },
  { jp: 'おじいさん', en: 'grandfather', elderly: true }, { jp: 'おばあさん', en: 'grandmother', elderly: true },
  { jp: 'おとうとさん', en: 'younger brother', child: true }, { jp: 'いもうとさん', en: 'younger sister', child: true },
  { jp: 'ごしゅじん', en: 'husband', spouse: true }, { jp: 'おくさん', en: 'wife', spouse: true },
  { jp: 'むすこさん', en: 'son', child: true }, { jp: 'むすめさん', en: 'daughter', child: true },
];

const SG_MY_FAMILY = [
  { jp: 'ちち', en: 'father', parent: true }, { jp: 'はは', en: 'mother', parent: true }, { jp: 'あに', en: 'older brother' }, { jp: 'あね', en: 'older sister' },
  { jp: 'おとうと', en: 'younger brother', child: true }, { jp: 'いもうと', en: 'younger sister', child: true },
  { jp: 'そふ', en: 'grandfather', elderly: true }, { jp: 'そぼ', en: 'grandmother', elderly: true },
  { jp: 'しゅじん', en: 'husband', spouse: true }, { jp: 'おっと', en: 'husband', spouse: true },
  { jp: 'かない', en: 'wife', spouse: true }, { jp: 'つま', en: 'wife', spouse: true },
  { jp: 'むすこ', en: 'son', child: true }, { jp: 'むすめ', en: 'daughter', child: true },
];

// Jobs, each with the workplace that goes with it.
const SG_JOBS = [['いしゃ', 'a doctor', 'びょういん', 'at the hospital'], ['ぎんこういん', 'a bank clerk', 'ぎんこう', 'at the bank'], ['かいしゃいん', 'an office worker', 'かいしゃ', 'at the office'],
  ['エンジニア', 'an engineer', 'かいしゃ', 'at the office'], ['デザイナー', 'a designer', 'かいしゃ', 'at the office'], ['せんせい', 'a teacher', 'がっこう', 'at the school'],
  ['がくせい', 'a student', 'だいがく', 'at university'], ['けんきゅうしゃ', 'a researcher', 'だいがく', 'at the university'], ['べんごし', 'a lawyer', 'じむしょ', 'at the office'],
  // Lesson 2 homework reading task (only jobs whose workplace is taught):
  ['かんごし', 'a nurse', 'びょういん', 'at the hospital'], ['やくざいし', 'a pharmacist', 'びょういん', 'at the hospital'],
  ['てんいん', 'a shop assistant', 'デパート', 'at the department store'], ['じむいん', 'an office worker', 'かいしゃ', 'at the office'],
  ['けんちくし', 'an architect', 'じむしょ', 'at the office'], ['ぜいりし', 'a tax accountant', 'じむしょ', 'at the office']];

// "What kind of...?" (どんな, Lesson 2). Each answer: [[words], habitual
// English, one-off English]. Words are separate segments, so みそ ラーメン and
// かんこく の ドラマ line up with their romaji word for word.
const SG_DONNA = [
  { v: 'たべます', noun: 'ラーメン', en: ['ramen', 'ramen'], vEn: 'eat', noMorning: true, answers: [[['みそ', 'ラーメン'], 'miso ramen'], [['とんこつ', 'ラーメン'], 'tonkotsu ramen'], [['しょうゆ', 'ラーメン'], 'soy-sauce ramen']] },
  { v: 'たべます', noun: 'サンドイッチ', en: ['sandwiches', 'sandwich'], vEn: 'eat', answers: [[['たまごサンド'], 'egg sandwiches', 'an egg sandwich'], [['ツナサンド'], 'tuna sandwiches', 'a tuna sandwich'], [['ハムサンド'], 'ham sandwiches', 'a ham sandwich']] },
  { v: 'します', noun: 'スポーツ', en: ['sport', 'sport'], phrase: true, answers: [[['テニス'], 'play tennis'], [['ゴルフ'], 'play golf'], [['サッカー'], 'play football'], [['すいえい'], 'go swimming'], [['スキー'], 'go skiing'], [['じゅうどう'], 'do judo']] },
  { v: 'ききます', noun: 'おんがく', en: ['music', 'music'], vEn: 'listen to', answers: [[['ポップス'], 'pop music'], [['オペラ'], 'opera']] },
  { v: 'みます', noun: 'ドラマ', en: ['dramas', 'drama'], vEn: 'watch', answers: [[['かんこく', 'の', 'ドラマ'], 'Korean dramas', 'a Korean drama'], [['にほん', 'の', 'ドラマ'], 'Japanese dramas', 'a Japanese drama'], [['イギリス', 'の', 'ドラマ'], 'British dramas', 'a British drama']] },
  { v: 'みます', noun: 'えいが', en: ['films', 'film'], vEn: 'watch', answers: [[['にほん', 'の', 'えいが'], 'Japanese films', 'a Japanese film'], [['フランス', 'の', 'えいが'], 'French films', 'a French film'], [['イタリア', 'の', 'えいが'], 'Italian films', 'an Italian film'], [['インド', 'の', 'えいが'], 'Indian films', 'an Indian film']] },
];

// ---------------------------------------------------------------------
let sgRand = Math.random;

const sgPick = arr => arr[Math.floor(sgRand() * arr.length)];

const sgChance = p => sgRand() < p;

function sgW(jp) { // taught word -> {jp, ro}; null if not taught
  if (jp === 'わたし') return { jp, ro: 'watashi' };
  const name = SENTENCE_NAME_POOL.find(n => n.jp === jp);
  if (name) return { jp, ro: name.romaji.replace(/^(.)/, c => c.toUpperCase()).replace('-san', '-san') };
  const it = l3TaughtItem(jp);
  return it ? { jp, ro: it.romaji } : null;
}

function sgOk(...jps) { return jps.every(j => sgW(j)); }

// A sentence is built as segments {jp, ro} joined with spaces; particles are
// attached to their word (わたしは, がっこうに) as the app writes them.
function sgSeg(word, particle = '', particleRo = '') {
  const w = sgW(word);
  return { jp: w.jp + (particle ? ' ' + particle : ''), ro: w.ro + (particleRo ? ' ' + particleRo : '') };
}

function sgJoin(segs, end, q) {
  segs = segs.filter(Boolean);
  const jp = segs.map(s => s.jp).join(' ') + (q ? ' か。' : '。');
  let ro = segs.map(s => s.ro).join(' ') + (q ? ' ka?' : '.');
  ro = ro.charAt(0).toUpperCase() + ro.slice(1);
  return { jp, ro };
}

const sgCap = s => s.charAt(0).toUpperCase() + s.slice(1);

// Verb in a given tense/polarity: たべます -> たべません / たべました / たべませんでした
function sgVerb(v, tense, neg) {
  const w = sgW(v); const stemJ = w.jp.slice(0, -2), stemR = w.ro.slice(0, -4);
  const endJ = tense === 'past' ? (neg ? 'ませんでした' : 'ました') : (neg ? 'ません' : 'ます');
  const endR = tense === 'past' ? (neg ? 'masendeshita' : 'mashita') : (neg ? 'masen' : 'masu');
  return { jp: stemJ + endJ, ro: stemR + endR };
}

const sgMyFamily = (f = () => true) => SG_MY_FAMILY.filter(m => sgW(m.jp) && f(m));

const sgPoliteFamily = (f = () => true) => SG_FAMILY.filter(m => sgW(m.jp) && f(m));

const sgFamFlags = m => ({ family: true, child: !!m.child, elderly: !!m.elderly, spouse: !!m.spouse, parent: !!m.parent });

// Subjects: {segs, en, third, me, family, child, elderly, spouse}
// WHO TURNS UP (2026-10-23, Andrew: "it feels more likely I'd want to talk
// about my mum than my friend's younger sister or Tanaka-san"). Your own
// family now comes up about twice as often as before, other people's family
// and the named people a little less. Roughly: I 28%, my family 24%, my
// friend 16%, names 18%, someone else's family 8%, the teacher 6%.
function sgSubject(opts = {}) {
  const r = sgRand();
  if (r < 0.28) return { segs: sgChance(0.5) ? [sgSeg('わたし', 'は', 'wa')] : [], en: 'I', third: false, me: true };
  if (r < 0.52) { // my own family: ちち は = "my father"
    const pool = sgMyFamily(opts.famFilter);
    if (pool.length) { const m = sgPick(pool); return { segs: [sgSeg(m.jp, 'は', 'wa')], en: 'my ' + m.en, third: true, myFam: m.jp, ...sgFamFlags(m) }; }
  }
  if (r < 0.68) return { segs: [sgSeg('ともだち', 'は', 'wa')], en: 'my friend', third: true };
  if (r < 0.74 && !opts.noTeacher) return { segs: [sgSeg('せんせい', 'は', 'wa')], en: 'the teacher', third: true };
  if (r < 0.82) { // someone else's family: ともだち の おかあさん は
    const pool = sgPoliteFamily(opts.famFilter);
    if (pool.length) {
      const owner = sgChance(0.5) ? ['ともだち', "my friend's"] : (n => [n.jp, n.en + "'s"])(sgPick(SENTENCE_NAME_POOL));
      const m = sgPick(pool);
      return { segs: [sgSeg(owner[0], 'の', 'no'), sgSeg(m.jp, 'は', 'wa')], en: `${owner[1]} ${m.en}`, third: true, ...sgFamFlags(m) };
    }
  }
  const n = sgPick(SENTENCE_NAME_POOL);
  return { segs: [sgSeg(n.jp, 'は', 'wa')], en: n.en, third: true };
}

// Companion (と "with"). adultOnly: the destination is a bar etc.
function sgCompanion(subj, dest, adultOnly, noFamily) {
  // noFamily: going to school / university / work - "with my mother" would be odd.
  const famOk = m => !noFamily && !(adultOnly && m.child);
  // Never the person who is already in the subject (やまもとさんは やまもとさんと…,
  // or たなかさんの おくさんは たなかさんと…).
  const inSubj = n => (subj.segs || []).some(s => s.jp.split(' ')[0] === n.jp);
  const names = SENTENCE_NAME_POOL.filter(n => !inSubj(n));
  const r = sgRand();
  // One of MY family doing something - often with another of my family
  // (ははは ちちと…), since the plain words all mean "my" (2026-10-23).
  if (subj.myFam && r < 0.45) {
    const pool = sgMyFamily(m => famOk(m) && m.jp !== subj.myFam && 'my ' + m.en !== subj.en && !(subj.spouse && m.spouse)); // not しゅじん with おっと, or つま with しゅじん
    if (pool.length) { const m = sgPick(pool); return { seg: sgSeg(m.jp, 'と', 'to'), en: 'with my ' + m.en }; }
  }
  if (subj.me) {
    // (2026-10-23) My family up from 20% to 32%.
    if (r < 0.18) return { seg: sgSeg('ともだち', 'と', 'to'), en: 'with a friend' };
    if (r < 0.30) { const n = sgPick(names); return { seg: sgSeg(n.jp, 'と', 'to'), en: 'with ' + n.en }; }
    if (r < 0.62) { const pool = sgMyFamily(famOk); if (pool.length) { const m = sgPick(pool); return { seg: sgSeg(m.jp, 'と', 'to'), en: 'with my ' + m.en }; } }
    if (r < 0.72 && SG_COLLEAGUE_OK.includes(dest) && sgW('どうりょう')) return { seg: sgSeg('どうりょう', 'と', 'to'), en: 'with a colleague' };
    if (r < 0.88) return { seg: { jp: 'ひとり で', ro: 'hitori de' }, en: 'on my own' };
    const pool = noFamily ? [] : sgPoliteFamily(m => !m.child && !m.elderly);
    if (pool.length) { const m = sgPick(pool); return { segs: [sgSeg('ともだち', 'の', 'no'), sgSeg(m.jp, 'と', 'to')], en: `with my friend's ${m.en}` }; }
    return { seg: sgSeg('ともだち', 'と', 'to'), en: 'with a friend' };
  }
  // Anyone else: sometimes with one of MY family too ("my friend goes with
  // my mother") - about a quarter of the time (2026-10-23).
  if (r < 0.25 && !subj.child) {
    const pool = sgMyFamily(m => famOk(m) && m.jp !== subj.myFam && !(subj.spouse && m.spouse));
    if (pool.length) { const m = sgPick(pool); return { seg: sgSeg(m.jp, 'と', 'to'), en: 'with my ' + m.en }; }
  }
  if (/friend/.test(subj.en || '') || r < 0.65) { const n = sgPick(names); return { seg: sgSeg(n.jp, 'と', 'to'), en: 'with ' + n.en }; }
  return { seg: sgSeg('ともだち', 'と', 'to'), en: 'with a friend' };
}

// Time word for a tense. filter(t) can veto words (e.g. no weekends).
function sgTime(tense, filter = () => true, opts = {}) {
  const pool = [];
  Object.entries(SG_TIMES).forEach(([jp, t]) => {
    if (!t.tenses.includes(tense) || !!t.long !== !!opts.long) return;
    if (opts.freq && !t.freqOk) return;
    if (t.l6 && !opts.l6) return;
    if (!sgW(jp) || !filter(jp, t)) return;
    pool.push({ seg: sgSeg(jp), en: typeof t.en === 'string' ? t.en : t.en[tense], jp, t });
  });
  if (!opts.long) SG_DAYS.forEach(([jp, en, wkend]) => {
    const t = { weekend: !!wkend, freqOk: true };
    if (!sgW(jp) || !filter(jp, t)) return;
    pool.push({ seg: sgSeg(jp, 'に', 'ni'), en: 'on ' + en + (tense === 'hab' ? 's' : ''), jp, t });
  });
  return pool.length ? sgPick(pool) : null;
}

// English subject + verb phrase, with tense/frequency/negative.
function sgEnClause(subj, phrase, tense, freq, neg) {
  const S = subj.me ? 'I' : subj.en;
  if (tense === 'past') return neg ? `${S} didn't ${phrase}` : `${S} ${sgVerbEn(phrase, 'past')}`;
  if (tense === 'fut') return neg ? `${S} ${subj.me ? "won't" : "won't"} ${phrase}` : `${S} ${subj.me ? "'m going to" : 'is going to'} ${phrase}`.replace("I 'm", "I'm");
  if (freq) {
    if (freq.jp === 'ぜんぜん') return `${S} never ${subj.third ? sgVerbEn(phrase, 'third') : phrase}`;
    if (freq.jp === 'あまり') return `${S} ${subj.third ? "doesn't" : "don't"} often ${phrase}`;
    return `${S} ${freq.en} ${subj.third ? sgVerbEn(phrase, 'third') : phrase}`;
  }
  if (neg) return `${S} ${subj.third ? "doesn't" : "don't"} ${phrase}`;
  return `${S} ${subj.third ? sgVerbEn(phrase, 'third') : phrase}`;
}

function sgEnFinish(parts) { return sgCap(parts.filter(Boolean).join(' ')) + '.'; }

// English verb phrase for an object-verb entry + one object.
function sgActPhrase(V, o, tense) {
  if (V.intrans) return V.en;
  if (V.workObj && tense !== 'hab') return 'do some work';
  if (V.phrase) return o[1];
  const objEn = tense === 'hab' ? o[1] : (o[2] || o[1]);
  return `${V.futHave && tense !== 'hab' ? 'have' : V.en} ${objEn}`;
}

const sgPlaceEn = p => SG_PLACE_EN[p][0];

// ---------------- patterns ----------------
function sgObjectSentence() {
  const V = sgPick(SG_OBJECT_VERBS.filter(v => sgW(v.v)));
  const objs = V.objs.filter(o => sgW(o[0]));
  if (!V.intrans && !objs.length) return null;
  const tense = sgPick(['hab', 'hab', 'fut', 'past']);
  if (tense === 'hab' && V.once) return null;
  let subj = sgSubject({ famFilter: m => !(V.adult && m.child) && !(V.workObj) });
  if ((V.workObj && subj.family) || (V.adult && subj.child)) subj = { segs: [sgSeg('ともだち', 'は', 'wa')], en: 'my friend', third: true };
  let freq = null, time = null;
  if (tense === 'hab' && sgChance(0.55)) {
    freq = sgPick(SG_FREQ.filter(f => !(V.outing && f.jp === 'いつも'))); // no "always has a picnic"
    if (!freq.neg && sgChance(0.6)) time = sgTime('hab', (jp, t) => sgActTimeOk(V, jp, t, 'hab'), { freq: true });
  } else {
    time = sgTime(tense, (jp, t) => sgActTimeOk(V, jp, t, tense), { l6: true });
    if (!time && tense !== 'hab') return null;
  }
  const neg = freq ? freq.neg : (tense === 'past' && sgChance(0.15));
  // object(s)
  let objSegs = [], phrase;
  const o1 = V.intrans ? null : sgPick(objs);
  if (V.intrans) phrase = V.en;
  else if (V.list && objs.length > 1 && sgChance(0.3)) {
    const o2 = sgPick(objs.filter(o => o[0] !== o1[0]));
    const ya = sgChance(0.5);
    objSegs = [{ jp: o1[0] + (ya ? ' や' : ' と'), ro: sgW(o1[0]).ro + (ya ? ' ya' : ' to') }, sgSeg(o2[0], 'を', 'o')];
    phrase = `${V.en} ${ya ? 'things like ' : ''}${o1[1]} and ${o2[1]}`;
  } else {
    objSegs = [sgSeg(o1[0], 'を', 'o')];
    phrase = sgActPhrase(V, o1, tense);
  }
  // place: must suit the time word and (for へや) the subject
  let placeSeg = null, placeEn = '', placeJp = null;
  const places = V.places.filter(p => sgW(p) && sgPlaceTimeOk(p, time && time.jp, time && time.t) && !(SG_PLACE_EN[p][1] && !subj.me)
    && !((subj.elderly || subj.child) && (p === 'かいしゃ' || p === 'じむしょ')));
  if (places.length && !neg && (V.intrans || sgChance(freq && time ? 0.25 : 0.5))) {
    const p = sgPick(places); placeSeg = sgSeg(p, 'で', 'de'); placeEn = sgPlaceEn(p); placeJp = p;
  }
  // Companion (と / ひとりで) - added 2026-10-07 with the combined Sentence
  // order card, which has a Companion slot for "doing something" sentences
  // too (handout: ははと くつを かいます). Not for routines or work.
  let comp = null;
  // Not with a と-list of objects (Aさん と ヨーグルト と りんご を reads as one list).
  if (!neg && !V.routine && !V.workObj && objSegs.length < 2 && sgChance(freq ? 0.15 : 0.25)) {
    comp = sgCompanion(subj, placeJp, !!V.adult, SG_PLACE_WORK.includes(placeJp));
  }
  // Tool で (Lesson 5): sometimes, when there's no place - one or the other.
  let toolSeg = null, toolEn = '';
  if (!placeSeg && o1 && objSegs.length === 1 && sgChance(0.45)) {
    const tl = sgToolsFor(V, o1);
    if (tl.length) { const t = sgPick(tl); toolSeg = sgSeg(t, 'で', 'de'); toolEn = SG_TOOLS[t]; }
  }
  // A verb with no object needs its place ("I sing" alone is too bare) - except
  // in a negative ("I never swim"), where no place reads naturally.
  if (V.intrans && !neg && !placeSeg) return null;
  const verb = sgVerb(V.v, tense, neg);
  const segs = [...subj.segs, time && time.seg, freq && { jp: freq.jp, ro: sgW(freq.jp).ro }, ...(comp ? (comp.segs || [comp.seg]) : []), placeSeg, toolSeg, ...objSegs, verb].filter(Boolean);
  const out = sgJoin(segs);
  out.en = sgEnFinish([sgEnClause(subj, phrase, tense, freq, neg && !freq), comp && comp.en, placeEn, toolEn, time && time.en]);
  return [out];
}

function sgMotionSentence() {
  const tense = sgPick(['hab', 'hab', 'fut', 'past']);
  const subj = sgSubject();
  const longTrip = tense !== 'hab' && sgChance(0.15);
  let time, dest, destEn;
  if (longTrip) {
    time = sgTime(tense, () => true, { long: true });
    const c = sgPick(SG_COUNTRIES.filter(c => sgW(c)));
    dest = c; destEn = 'to ' + l3TaughtItem(c).en.replace('UK / England', 'the UK').replace('USA', 'the USA');
  } else {
    let freq = null;
    const goHome = tense !== 'hab' && sgChance(0.15);
    const ok = Object.entries(SG_DEST).filter(([jp, v]) => sgW(jp) && sgDestSubjOk(jp, v[1], subj));
    let pick = goHome ? null : sgPick(ok);
    const kind = pick ? pick[1][1] : 'daily';
    if (tense === 'hab' && sgChance(0.4) && kind !== 'work') freq = sgPick(SG_FREQ.filter(f => !(['outing', 'daytrip', 'event'].includes(kind) && f.jp === 'いつも')));
    const plainNeg = freq && freq.neg;
    time = plainNeg ? { seg: null, en: '' } : sgTime(tense, (jp, t) => {
      if (goHome && !['きょう', 'こんばん', 'きのう'].includes(jp)) return false;
      return sgDestTimeOk(kind, jp, t, tense, freq);
    }, { freq: !!freq });
    if (!time) return null;
    const neg = freq ? freq.neg : (tense === 'past' && sgChance(0.1));
    const segs = [...subj.segs, time.seg, freq && { jp: freq.jp, ro: sgW(freq.jp).ro }];
    let comp = null, tr = null;
    if (!plainNeg && sgChance(freq ? 0.2 : 0.35)) { comp = sgCompanion(subj, pick && pick[0], kind === 'bar', kind === 'work'); segs.push(...(comp.segs || [comp.seg])); }
    else if (!plainNeg && sgChance(freq ? 0.2 : 0.35)) {
      const t = sgPick(SG_TRANSPORT.filter(t => sgW(t[0]) && !(subj.child && ['くるま', 'バイク'].includes(t[0]))));
      tr = { seg: t[2] ? sgSeg(t[0]) : sgSeg(t[0], 'で', 'de'), en: t[1] };
      segs.push(tr.seg);
    }
    let phrase;
    if (goHome) { segs.push(sgSeg('うち', 'に', 'ni'), sgVerb('かえります', tense, neg)); phrase = 'go home'; }
    else { segs.push(sgSeg(pick[0], 'に', 'ni'), sgVerb('いきます', tense, neg)); phrase = 'go ' + pick[1][0]; }
    const out = sgJoin(segs);
    out.en = sgEnFinish([sgEnClause(subj, phrase, tense, freq, neg && !freq), comp && comp.en, tr && tr.en, time.en]);
    return [out];
  }
  if (!time) return null;
  const segs = [...subj.segs, time.seg];
  let tr = null;
  if (sgChance(0.4) && sgW('ひこうき')) { tr = { seg: sgSeg('ひこうき', 'で', 'de'), en: 'by plane' }; segs.push(tr.seg); }
  segs.push(sgSeg(dest, 'に', 'ni'), sgVerb('いきます', tense, false));
  const out = sgJoin(segs);
  out.en = sgEnFinish([sgEnClause(subj, 'go ' + destEn, tense, null, false), tr && tr.en, time.en]);
  return [out];
}

// Daily routine with clock times: get up / go to bed / work from-until.
function sgRoutineSentence() {
  const kind = sgPick(['okimasu', 'nemasu', 'hatarakimasu', 'hatarakimasu']);
  const tense = sgPick(['hab', 'hab', 'fut', 'past']);
  let subj = sgSubject();
  // Work routines: no family members except husbands/wives (as before Lesson 2).
  if (kind === 'hatarakimasu' && subj.family && !subj.spouse) subj = { segs: [sgSeg('ともだち', 'は', 'wa')], en: 'my friend', third: true };
  const time = sgChance(0.6) ? sgTime(tense, (jp, t) => {
    const isDay = SG_DAYS.some(d => d[0] === jp);
    if ((kind === 'okimasu' || kind === 'nemasu') && (isDay || ['あさ', 'ひる', 'よる', 'まいあさ'].includes(jp))) return false;
    if (kind === 'okimasu' && t.evening) return false;
    if (kind === 'nemasu' && t.morning) return false;
    if (kind === 'hatarakimasu' && (t.morning || t.evening || jp === 'ひる')) return false;
    return !t.long;
  }) : null;
  if (tense !== 'hab' && !time) return null;
  const clock = (h, m) => ({ jp: timeToKana(h, m, null, 'none'), ro: timeToRomaji(h, m, null, 'none'), en: `${h}:${String(m).padStart(2, '0')}` });
  const segs = [...subj.segs, time && time.seg];
  let phrase;
  if (kind === 'okimasu') {
    const c = clock(sgPick([5, 6, 6, 7, 7, 8]), sgPick([0, 0, 15, 30, 30, 45]));
    segs.push({ jp: c.jp + ' に', ro: c.ro + ' ni' }, sgVerb('おきます', tense, false)); phrase = `get up at ${c.en}`;
  } else if (kind === 'nemasu') {
    const c = clock(sgPick([10, 10, 11, 11, 12]), sgPick([0, 0, 15, 30, 30, 45]));
    segs.push({ jp: c.jp + ' に', ro: c.ro + ' ni' }, sgVerb('ねます', tense, false)); phrase = `go to bed at ${c.en}`;
  } else {
    if (time && time.t.weekend) return null;
    const a = clock(sgPick([8, 8, 9, 9, 10]), sgPick([0, 0, 30])), b = clock(sgPick([4, 5, 5, 6]), sgPick([0, 0, 30]));
    segs.push({ jp: a.jp + ' から', ro: a.ro + ' kara' }, { jp: b.jp + ' まで', ro: b.ro + ' made' }, sgVerb('はたらきます', tense, false));
    phrase = `work from ${a.en} to ${b.en}`;
  }
  const out = sgJoin(segs.filter(Boolean));
  out.en = sgEnFinish([sgEnClause(subj, phrase, tense, null, false), time && time.en]);
  return [out];
}

// Job profile: two sentences. "Tanaka-san is an engineer. Goes to the office…"
function sgJobProfile() {
  const job = sgPick(SG_JOBS.filter(j => sgOk(j[0], j[2])));
  const who = sgChance(0.35) ? { jp: 'ともだち', en: 'My friend' } : (n => ({ jp: n.jp, en: n.en }))(sgPick(SENTENCE_NAME_POOL));
  const first = sgJoin([sgSeg(who.jp, 'は', 'wa'), { jp: job[0] + ' です', ro: sgW(job[0]).ro + ' desu' }]);
  const r = sgRand(); let segs, en;
  const goes = r < 0.5;
  const time = sgTime('hab', jp => jp === 'まいにち' || (goes && jp === 'まいあさ'));
  if (goes) {
    const t = sgChance(0.6) ? sgPick(SG_TRANSPORT.filter(t => sgW(t[0]))) : null;
    segs = [time.seg, t && (t[2] ? sgSeg(t[0]) : sgSeg(t[0], 'で', 'de')), sgSeg(job[2], 'に', 'ni'), sgVerb('いきます', 'hab', false)];
    en = `goes ${SG_DEST[job[2]] ? SG_DEST[job[2]][0] : 'to ' + job[3].replace(/^at /, '')}${t ? ' ' + t[1] : ''} ${time.en}`;
  } else {
    const study = job[0] === 'がくせい';
    segs = [time.seg, sgSeg(job[2], 'で', 'de'), sgVerb(study ? 'べんきょうします' : 'はたらきます', 'hab', false)];
    en = `${study ? 'studies' : 'works'} ${job[3]} ${time.en}`;
  }
  const second = sgJoin(segs.filter(Boolean));
  return [{ jp: first.jp + second.jp, ro: first.ro + ' ' + second.ro, en: `${who.en} is ${job[1]} and ${en}.` }];
}

// Meeting someone: [time] [place で] [person] に あいます
function sgMeetSentence() {
  const tense = sgPick(['hab', 'fut', 'fut', 'past']);
  const subj = sgSubject({ noTeacher: false });
  const time = sgTime(tense, (jp, t) => !t.long && jp !== 'まいあさ');
  if (!time) return null;
  const r = sgRand(); let pSegs, pEn;
  const subjFriend = /friend/.test(subj.en);
  const myFam = subj.me ? sgMyFamily() : [];
  if (r < 0.2 && myFam.length) { const m = sgPick(myFam); pSegs = [sgSeg(m.jp, 'に', 'ni')]; pEn = 'my ' + m.en; }
  else if (r < 0.45 && !subjFriend) { pSegs = [sgSeg('ともだち', 'に', 'ni')]; pEn = 'a friend'; }
  else if (r < 0.78 || subjFriend) { const n = sgPick(SENTENCE_NAME_POOL.filter(n => !subj.segs.some(s => s.jp.split(' ')[0] === n.jp))); pSegs = [sgSeg(n.jp, 'に', 'ni')]; pEn = n.en; } // never meets themselves
  else { const f = sgPick(sgPoliteFamily()); pSegs = [sgSeg('ともだち', 'の', 'no'), sgSeg(f.jp, 'に', 'ni')]; pEn = subj.me ? `my friend's ${f.en}` : `a friend's ${f.en}`; }
  let placeSeg = null, placeEn = '';
  if (sgChance(0.5)) { const p = sgPick(['えき', 'カフェ', 'きっさてん', 'レストラン', 'こうえん'].filter(p => sgW(p) && !(p === 'レストラン' && time.t.morning))); placeSeg = sgSeg(p, 'で', 'de'); placeEn = { えき: 'at the station', カフェ: 'at a café', きっさてん: 'at a coffee shop', レストラン: 'at a restaurant', こうえん: 'in the park' }[p]; }
  const segs = [...subj.segs, time.seg, placeSeg, ...pSegs, sgVerb('あいます', tense, false)];
  const out = sgJoin(segs.filter(Boolean));
  out.en = sgEnFinish([sgEnClause(subj, `meet ${pEn}`, tense, null, false), placeEn, time.en]);
  return [out];
}

// どんな (Lesson 2): "What kind of ramen do you eat?" - "I eat miso ramen."
// Habitual, or past with a time word. Sometimes led in by the class's own
// yes/no opener (ラーメン を たべます か。 はい、たべます。).
function sgDonnaQA() {
  if (!sgW('どんな')) return null;
  const D = sgPick(SG_DONNA.filter(d => sgOk(d.v, d.noun)));
  const answers = D.answers.filter(a => a[0].every(w => w === 'の' || sgW(w)));
  if (!answers.length) return null;
  const A = sgPick(answers);
  const past = sgChance(0.3);
  const tense = past ? 'past' : 'hab';
  const t = past ? sgTime('past', (jp, tt) => !tt.long && !(D.noMorning && tt.morning)) : null;
  if (past && !t) return null;
  const qv = sgVerb(D.v, tense, false);
  const out = [];
  if (!past && sgChance(0.35)) {
    const lead = sgJoin([sgSeg(D.noun, 'を', 'o'), qv], null, true);
    lead.en = D.phrase ? 'Do you do sport?' : `Do you ${D.vEn} ${D.en[0]}?`;
    const yes = sgJoin([{ jp: 'はい、' + qv.jp, ro: 'hai, ' + qv.ro }]);
    yes.en = 'Yes, I do.';
    out.push(lead, yes);
  }
  const q = sgJoin([t && t.seg, sgSeg('どんな'), sgSeg(D.noun, 'を', 'o'), qv], null, true);
  const qNoun = past ? D.en[1] : D.en[0];
  q.en = past ? `What kind of ${qNoun} did you ${D.phrase ? 'do' : D.vEn} ${t.en}?` : `What kind of ${qNoun} do you ${D.phrase ? 'do' : D.vEn}?`;
  const words = A[0];
  const aSegs = words.map((w, i) => {
    if (w === 'の') return null;
    const last = i === words.length - 1;
    if (last) return sgSeg(w, 'を', 'o');
    if (words[i + 1] === 'の') return sgSeg(w, 'の', 'no');
    return sgSeg(w);
  });
  const a = sgJoin([...aSegs, qv]);
  const aPhrase = D.phrase ? A[1] : `${D.vEn} ${past ? (A[2] || A[1]) : A[1]}`;
  a.en = sgEnFinish([sgEnClause({ me: true, en: 'I' }, aPhrase, tense, null, false)]);
  out.push(q, a);
  return out;
}

// Pick one activity + object that can happen at a place (for the two
// place-で questions below). Returns {V, o, phrase(tense)} or null.
function sgActivitiesAt(p, timeJp, timeT, tense) {
  const acts = [];
  SG_OBJECT_VERBS.forEach(V => {
    if (!sgW(V.v) || !V.places.includes(p) || (V.once && tense === 'hab')) return;
    if (timeJp && !sgActTimeOk(V, timeJp, timeT)) return;
    if (V.intrans) acts.push({ V, o: null });
    else V.objs.filter(o => sgW(o[0])).forEach(o => acts.push({ V, o }));
  });
  return acts;
}

// どこ で (Lesson 2): "Where do you read books?" - "At the library."
function sgWhereDeQA() {
  const past = sgChance(0.3);
  const tense = past ? 'past' : 'hab';
  const t = past ? sgTime('past', (jp, tt) => !tt.long && !tt.morning) : null;
  if (past && !t) return null;
  const opts = [];
  SG_OBJECT_VERBS.forEach(V => {
    if (!sgW(V.v) || V.once || V.workObj) return;
    if (t && !sgActTimeOk(V, t.jp, t.t)) return;
    const places = V.places.filter(p => sgW(p) && sgPlaceTimeOk(p, t && t.jp, t && t.t));
    if (places.length < 2) return; // one possible place makes a non-question
    if (V.intrans) opts.push({ V, o: null, places });
    else V.objs.filter(o => sgW(o[0])).forEach(o => opts.push({ V, o, places }));
  });
  if (!opts.length) return null;
  const { V, o, places } = sgPick(opts);
  const p = sgPick(places);
  const qv = sgVerb(V.v, tense, false);
  const objSeg = o ? sgSeg(o[0], 'を', 'o') : null;
  const q = sgJoin([t && t.seg, { jp: 'どこ で', ro: 'doko de' }, objSeg, qv], null, true);
  const ph = sgActPhrase(V, o, tense);
  q.en = past ? `Where did you ${ph} ${t.en}?` : `Where do you ${ph}?`;
  const a = sgJoin([sgSeg(p, 'で', 'de'), objSeg, qv]);
  a.en = sgEnFinish([sgEnClause({ me: true, en: 'I' }, ph, tense, null, false), sgPlaceEn(p)]);
  return [q, a];
}

// PLACE で なに を しますか (Lesson 2): "What do you do at the seaside?" - "I swim."
function sgWhatAtQA() {
  const past = sgChance(0.35);
  const tense = past ? 'past' : 'hab';
  const t = past ? sgTime('past', (jp, tt) => !tt.long && !tt.morning) : null;
  if (past && !t) return null;
  // (not the bedroom - "what did you do in the bedroom?" reads the wrong way)
  const places = Object.keys(SG_PLACE_EN).filter(p => sgW(p) && !SG_PLACE_EN[p][1] && p !== 'しんしつ' && sgPlaceTimeOk(p, t && t.jp, t && t.t) && sgActivitiesAt(p, t && t.jp, t && t.t, tense).length);
  if (!places.length) return null;
  const p = sgPick(places);
  const { V, o } = sgPick(sgActivitiesAt(p, t && t.jp, t && t.t, tense));
  const q = sgJoin([t && t.seg, sgSeg(p, 'で', 'de'), { jp: 'なに を', ro: 'nani o' }, sgVerb('します', tense, false)], null, true);
  q.en = past ? `What did you do ${sgPlaceEn(p)} ${t.en}?` : `What do you do ${sgPlaceEn(p)}?`;
  const a = sgJoin([o ? sgSeg(o[0], 'を', 'o') : null, sgVerb(V.v, tense, false)]);
  a.en = sgEnFinish([sgEnClause({ me: true, en: 'I' }, sgActPhrase(V, o, tense), tense, null, false)]);
  return [q, a];
}

// Question and answer pairs.
// もう Q&A (L3 Lesson 6, 2026-11-03): "もう しゅくだいを しましたか。" with
// はい、もう 〜ました or いいえ、まだです + when (これから, あとで, こんばん…).
function sgMouQA() {
  if (!sgW('もう') || !sgW('まだ')) return null;
  const pool = [];
  SG_OBJECT_VERBS.filter(V => !V.intrans && !V.routine && !V.workObj && !V.once && sgW(V.v)).forEach(V => V.objs.forEach(o => { if (sgW(o[0])) pool.push({ V, o }); }));
  if (sgW('おふろ') && sgW('はいります')) for (let i = 0; i < 6; i++) pool.push({ bath: true });
  const pk = sgPick(pool);
  if (!pk) return null;
  const outing = !!(pk.V && pk.V.outing);
  const objSeg = pk.bath ? sgSeg('おふろ', 'に', 'ni') : sgSeg(pk.o[0], 'を', 'o');
  const verbJp = pk.bath ? 'はいります' : pk.V.v;
  const phrase = pk.bath ? 'have a bath' : sgActPhrase(pk.V, pk.o, 'past');
  const tj = sgPick((outing ? ['こんしゅう', 'こんげつ', 'ことし'] : ['きょう', 'きょう', 'こんしゅう', '']).filter(j => !j || sgW(j)));
  const q = sgJoin([tj ? sgSeg(tj) : null, { jp: 'もう', ro: 'mou' }, objSeg, sgVerb(verbJp, 'past', false)], null, true);
  q.en = `Have you ${sgPP(phrase)} yet${tj ? ' ' + L3C_MOU_TIMES[tj] : ''}?`;
  let a;
  if (sgChance(0.35)) {
    a = sgJoin([{ jp: 'はい、 もう', ro: 'hai, mou' }, sgVerb(verbJp, 'past', false)]);
    a.en = 'Yes, I already have.';
  } else {
    const soon = sgPick((outing ? [['らいしゅう', 'next week'], ['あした', 'tomorrow']] : [['これから', 'now'], ['あとで', 'later'], ['こんばん', 'tonight']]).filter(x => sgW(x[0])));
    if (!soon) return null;
    a = sgJoin([{ jp: 'いいえ、 まだ です。', ro: 'iie, mada desu.' }, sgSeg(soon[0]), sgVerb(verbJp, 'fut', false)]);
    const doIt = pk.bath || pk.V.phrase ? phrase : `${pk.V.en} it`;
    a.en = `Not yet. I'm going to ${doIt} ${soon[1]}.`;
  }
  return [q, a];
}

// ADJECTIVES in the daily sentence (L4, 2026-11-04): Being sentences with
// describing words (beingPick / beingBuild, so the card and the daily
// sentence agree), and 〜が "but" joining two of them about one thing.
function sgBeingToLine(ex) {
  const jp = ex.parts.map(pt => pt.slot === 0 && /.は$/.test(pt.jp) ? pt.jp.replace(/は$/, ' は') : pt.jp).join(' ') + (ex.q ? '' : '。');
  return { jp: ex.q ? jp.replace(/か$/, ' か。') : jp, ro: sgCap(ex.romaji), en: l3cEnPlain(ex.enM) };
}

function sgAdjSentence() {
  const w = beingPick({ random: true, adjNoun: sgChance(0.35) });
  if (!w || (w.kind !== 'adj' && w.kind !== 'adjnoun')) return null;
  return [sgBeingToLine(beingBuild(w, ['on', w.time ? 'on' : 'off', w.degree ? 'on' : 'off', 'off', w.adj ? 'on' : 'off', 'on', 'stmt']))];
}

// 〜ですが、〜です: one good thing and one bad thing about the same topic.
const SG_BUT_GOOD = ['おいしい', 'おもしろい', 'きれい', 'べんり', 'たのしい', 'やすい', 'しずか', 'にぎやか', 'あたらしい', 'ゆうめい', 'いい', 'すてき', 'かわいい'];

const SG_BUT_BAD = ['たかい', 'むずかしい', 'ふるい', 'ちいさい', 'さむい', 'あつい', 'いそがしい'];

// Never "new, but old": opposites can't be joined with が.
const SG_BUT_OPPOSITES = [['あたらしい', 'ふるい'], ['おおきい', 'ちいさい'], ['たかい', 'やすい'], ['しずか', 'にぎやか'], ['むずかしい', 'やさしい'], ['さむい', 'あつい'], ['いい', 'わるい']];

function sgButSentence() {
  if (!sgW('〜が')) return null;
  const groups = BEING_THINGS.map(g => ({ objs: g.objs.filter(o => sgW(o)), good: g.adjs.filter(a => sgW(a) && SG_BUT_GOOD.includes(a)), bad: g.adjs.filter(a => sgW(a) && SG_BUT_BAD.includes(a)), place: g.place }))
    .filter(g => g.objs.length && g.good.length && g.bad.length);
  const g = sgPick(groups);
  if (!g) return null;
  const o = sgPick(g.objs);
  const pairs = [];
  g.good.forEach(x => g.bad.forEach(y => { if (!SG_BUT_OPPOSITES.some(p => p.includes(x) && p.includes(y)) && beingAdjFits(o, x) && beingAdjFits(o, y)) pairs.push([x, y]); }));
  if (!pairs.length) return null;
  let [a1, a2] = sgPick(pairs);
  if (sgChance(0.5)) [a1, a2] = [a2, a1];
  const topicEn = beingTopicEn(o);
  const plural = /^the \S.*s$/i.test(topicEn) && !/(ss|us)$/i.test(topicEn);
  const be = plural ? 'are' : 'is', pron = plural ? 'they' : 'it';
  const seg = sgSeg(o, 'は', 'wa');
  const w1 = sgW(a1), w2 = sgW(a2);
  return [{ jp: `${seg.jp} ${w1.jp}ですが、 ${w2.jp}です。`, ro: sgCap(`${seg.ro} ${w1.ro} desu ga, ${w2.ro} desu.`),
    en: sgCap(`${topicEn} ${be} ${beingAdjEn(a1)}, but ${pron} ${be} ${beingAdjEn(a2)}.`) }];
}

function sgQA() {
  const kind = sgPick(['what', 'what', 'where', 'where', 'who', 'who', 'when', 'freq', 'freq', 'whattime']);
  const tense = sgPick(['fut', 'past', 'hab']);
  if (kind === 'what') {
    const t = sgTime(tense, (jp, tt) => !tt.long && jp !== 'まいあさ' && jp !== 'まいにち');
    if (!t) return null;
    const V = sgPick(SG_OBJECT_VERBS.filter(v => v.v === 'します' && !v.workObj && sgActTimeOk(v, t.jp, t.t, tense)));
    const o = sgPick(V.objs.filter(o => sgW(o[0])));
    const qv = sgVerb('します', tense, false);
    const q = sgJoin([t.seg, { jp: 'なに を', ro: 'nani o' }, qv], null, true);
    q.en = tense === 'past' ? `What did you do ${t.en}?` : tense === 'fut' ? `What are you doing ${t.en}?` : `What do you do ${t.en}?`;
    const a = sgJoin([sgSeg(o[0], 'を', 'o'), qv]);
    a.en = sgEnFinish([sgEnClause({ me: true, en: 'I' }, o[1], tense, null, false)]);
    return [q, a];
  }
  if (kind === 'where') {
    const t = sgTime(tense === 'hab' ? 'fut' : tense, (jp, tt) => !tt.long && !tt.morning);
    if (!t) return null;
    const tn = tense === 'hab' ? 'fut' : tense;
    const d = sgPick(Object.entries(SG_DEST).filter(([jp, v]) => sgW(jp) && v[1] !== 'work' && sgDestTimeOk(v[1], t.jp, t.t, tn, null)));
    const qv = sgVerb('いきます', tn, false);
    const q = sgJoin([t.seg, { jp: 'どこ に', ro: 'doko ni' }, qv], null, true);
    q.en = tn === 'past' ? `Where did you go ${t.en}?` : `Where are you going ${t.en}?`;
    const a = sgJoin([sgSeg(d[0], 'に', 'ni'), qv]);
    a.en = tn === 'past' ? `I went ${d[1][0]}.` : `I'm going ${d[1][0]}.`;
    return [q, a];
  }
  if (kind === 'who') {
    const d = sgPick(Object.entries(SG_DEST).filter(([jp, v]) => sgW(jp) && v[1] !== 'work' && v[1] !== 'weekday'));
    const tn = tense === 'hab' ? 'fut' : tense;
    const qv = sgVerb('いきます', tn, false);
    const q = sgJoin([{ jp: 'だれ と', ro: 'dare to' }, sgSeg(d[0], 'に', 'ni'), qv], null, true);
    q.en = tn === 'past' ? `Who did you go ${d[1][0]} with?` : `Who are you going ${d[1][0]} with?`;
    const c = sgCompanion({ me: true }, d[0], d[1][1] === 'bar');
    if (c.en === 'on my own') { const a = sgJoin([c.seg, qv]); a.en = tn === 'past' ? 'I went on my own.' : "I'm going on my own."; return [q, a]; }
    const a = sgJoin([...(c.segs || [c.seg]), qv]);
    a.en = (tn === 'past' ? 'I went ' : "I'm going ") + c.en + '.';
    return [q, a];
  }
  if (kind === 'when') {
    const tn = tense === 'hab' ? 'fut' : tense;
    const d = sgPick(Object.entries(SG_DEST).filter(([jp, v]) => sgW(jp) && v[1] !== 'work'));
    const t = sgTime(tn, (jp, tt) => !tt.long && sgDestTimeOk(d[1][1], jp, tt, tn, null));
    if (!t) return null;
    const qv = sgVerb('いきます', tn, false);
    const q = sgJoin([{ jp: 'いつ', ro: 'itsu' }, sgSeg(d[0], 'に', 'ni'), qv], null, true);
    q.en = tn === 'past' ? `When did you go ${d[1][0]}?` : `When are you going ${d[1][0]}?`;
    const a = sgJoin([t.seg, qv]);
    a.en = tn === 'past' ? `I went ${t.en}.` : `I'm going ${t.en}.`;
    return [q, a];
  }
  if (kind === 'whattime') {
    const which = sgPick([['おきます', 'get up', [6, 7, 8]], ['ねます', 'go to bed', [10, 11, 12]]]);
    const h = sgPick(which[2]), m = sgPick([0, 0, 30]);
    const q = sgJoin([{ jp: 'なんじ に', ro: 'nanji ni' }, sgVerb(which[0], 'hab', false)], null, true);
    q.en = `What time do you ${which[1]}?`;
    const a = sgJoin([{ jp: timeToKana(h, m, null, 'none') + ' に', ro: timeToRomaji(h, m, null, 'none') + ' ni' }, sgVerb(which[0], 'hab', false)]);
    a.en = `I ${which[1]} at ${h}:${String(m).padStart(2, '0')}.`;
    return [q, a];
  }
  // freq yes/no
  const V = sgPick(SG_OBJECT_VERBS.filter(v => !v.once && !v.intrans && v.v !== 'します' && sgW(v.v)));
  const o = sgPick(V.objs.filter(o => sgW(o[0])));
  const f = sgPick(SG_FREQ.filter(f => !(V.outing && f.jp === 'いつも')));
  const q = sgJoin([sgSeg(o[0], 'を', 'o'), sgVerb(V.v, 'hab', false)], null, true);
  q.en = `Do you ${sgActPhrase(V, o, 'hab')}?`;
  const a = sgJoin([{ jp: (f.neg ? 'いいえ、' : 'はい、') + f.jp, ro: (f.neg ? 'iie, ' : 'hai, ') + sgW(f.jp).ro }, sgVerb(V.v, 'hab', f.neg)]);
  a.en = f.jp === 'ぜんぜん' ? 'No, never.' : f.jp === 'あまり' ? 'No, not often.' : `Yes, ${f.en}.`;
  return [q, a];
}

// INVITING (L3 Lesson 3, 2026-10-13): A invites with ませんか (future time
// word, optional いっしょに and place), B says yes (いいですね / ましょう) or a
// polite no (〜は ちょっと…). Same activity and destination lists and time
// rules as the other patterns, so it grows with them.
function sgInviteQA() {
  if (!['ええ', 'いいですね', 'ちょっと'].every(w => sgW(w))) return null;
  const together = sgChance(0.5) && sgW('いっしょに');
  const segs = [];
  let phrase, placeEn = '', verbJp, thing, timeEn;
  if (sgChance(0.6)) {
    // Only things you'd actually invite someone to: not reading/writing/
    // everyday shopping, and not things that only happen at home (breakfast,
    // TV, games) - outings are always fine.
    const homeOnly = V => V.places.length && V.places.every(p => ['うち', 'へや', 'いま', 'しんしつ', 'だいどころ', 'にわ'].includes(p));
    const V = sgPick(SG_OBJECT_VERBS.filter(V => !V.intrans && !V.routine && !V.workObj && sgW(V.v) && V.objs.some(o => sgW(o[0]))
      && (V.outing || (!['よみます', 'かきます', 'かいます'].includes(V.v) && !homeOnly(V)))));
    if (!V) return null;
    const time = sgTime('fut', (jp, t) => sgActTimeOk(V, jp, t, 'fut'));
    if (!time) return null;
    const o = sgPick(V.objs.filter(x => sgW(x[0]) && !['スポーツドリンク', 'みず', 'ぎゅうにゅう'].includes(x[0])));
    if (!o) return null;
    const places = V.places.filter(p => sgW(p) && sgPlaceTimeOk(p, time.jp, time.t) && !SG_PLACE_EN[p][1] && !SG_PLACE_WORK.includes(p));
    segs.push(time.seg);
    if (together) segs.push(sgSeg('いっしょに'));
    if (places.length && sgChance(0.5)) { const p = sgPick(places); segs.push(sgSeg(p, 'で', 'de')); placeEn = sgPlaceEn(p); }
    segs.push(sgSeg(o[0], 'を', 'o'));
    phrase = sgActPhrase(V, o, 'fut'); verbJp = V.v; thing = o[0];
    timeEn = time.en;
  } else {
    // Everyday destinations only where you'd go together (not the supermarket or station).
    const ok = Object.entries(SG_DEST).filter(([jp, v]) => sgW(jp) && (['outing', 'daytrip', 'event', 'bar'].includes(v[1])
      || ['カフェ', 'きっさてん', 'こうえん', 'ジム', 'プール', 'としょかん'].includes(jp)));
    const pick = sgPick(ok);
    if (!pick) return null;
    const [dest, [destEn, kind]] = pick;
    const time = sgTime('fut', (jp, t) => sgDestTimeOk(kind, jp, t, 'fut', null));
    if (!time) return null;
    segs.push(time.seg);
    if (together) segs.push(sgSeg('いっしょに'));
    segs.push(sgSeg(dest, 'に', 'ni'));
    phrase = 'go ' + destEn; verbJp = 'いきます'; thing = dest;
    timeEn = time.en;
  }
  const v = sgW(verbJp);
  segs.push({ jp: v.jp.replace(/ます$/, 'ません'), ro: v.ro.replace(/masu$/, 'masen') });
  const q = sgJoin(segs, null, true);
  q.en = `Why don't we ${[phrase, together && 'together', placeEn, timeEn].filter(Boolean).join(' ')}?`;
  const r = sgRand();
  let a;
  if (r < 0.4) { a = { jp: 'ええ、いいですね。', ro: 'Ee, ii desu ne.', en: 'Yes, that sounds good.' }; }
  else if (r < 0.75) { a = { jp: 'ええ、' + v.jp.replace(/ます$/, 'ましょう') + '。', ro: 'Ee, ' + v.ro.replace(/masu$/, 'mashou') + '.', en: "Yes, let's!" }; }
  else { const t = sgW(thing); a = { jp: t.jp + ' は ちょっと…', ro: sgCap(t.ro) + ' wa chotto…', en: "Hmm, that's a bit… (a polite no)" }; }
  return [q, a];
}

// ARRANGING TO MEET (L3 Lesson 3): an invitation, yes, then fixing the time
// (なんじに あいますか → Xじに あいましょう) or the place (どこで あいますか →
// えきの かいさつは どうですか). Reuses sgInviteQA's first line.
const SG_MEET_POINTS = [
  ['かいさつ', 'the station ticket gates'], ['いりぐち', 'the station entrance'], ['でぐち', 'the station exit'],
  ['キオスク', 'the kiosk at the station'], ['きっぷうりば', 'the ticket office at the station'],
];

function sgMeetPlanQA() {
  const ex = sgInviteQA();
  if (!ex) return null;
  const inv = ex[0];
  const yes = { jp: 'ええ、いいですね。', ro: 'Ee, ii desu ne.', en: 'Yes, that sounds good.' };
  if (sgChance(0.5)) {
    const evening = /こんばん|よる/.test(inv.jp) || /bar|pub|concert|musical|opera|party|karaoke|drink|beer|wine|alcohol/.test(inv.en);
    const h = sgPick(evening ? [6, 7, 8] : [10, 11, 1, 2, 3]);
    const half = sgChance(0.3);
    const tJp = HOUR_KANA[h] + 'じ' + (half ? ' はん' : ''), tRo = HOUR_ROMAJI[h] + 'ji' + (half ? ' han' : '');
    const tEn = h + (half ? ':30' : " o'clock");
    const q = { jp: 'なんじ に あいます か。', ro: 'Nanji ni aimasu ka?', en: 'What time shall we meet?' };
    const a = sgChance(0.5)
      ? { jp: tJp + ' に あいましょう。', ro: sgCap(tRo) + ' ni aimashou.', en: `Let's meet at ${tEn}.` }
      : { jp: tJp + ' は どうです か。', ro: sgCap(tRo) + ' wa dou desu ka?', en: `How about ${tEn}?` };
    return [inv, yes, q, a];
  }
  if (!sgW('えき')) return null;
  const pts = SG_MEET_POINTS.filter(p => sgW(p[0]));
  if (!pts.length) return null;
  const p = sgPick(pts);
  const q = { jp: 'どこ で あいます か。', ro: 'Doko de aimasu ka?', en: 'Where shall we meet?' };
  const a = { jp: 'えき の ' + p[0] + ' は どうです か。', ro: 'Eki no ' + sgW(p[0]).ro + ' wa dou desu ka?', en: `How about ${p[1]}?` };
  return [inv, yes, q, a];
}

// CHOOSING A BIRTHDAY PRESENT (L3 Lesson 3): whose birthday it is, an
// invitation to buy a present together, a suggestion (この Xは どうですか) and a
// reaction with an adjective that suits the present.
const SG_GIFTS = [
  ['キーホルダー', 'keyring', ['かわいい', 'すてき']], ['マグカップ', 'mug', ['かわいい', 'すてき', 'いい']],
  ['ぬいぐるみ', 'soft toy', ['かわいい']], ['ハンカチ', 'handkerchief', ['きれい', 'すてき', 'かわいい']],
  ['スマホケース', 'phone case', ['かっこいい', 'かわいい', 'すてき']], ['ポーチ', 'pouch', ['かわいい', 'きれい', 'すてき']],
  ['ぼうし', 'hat', ['かっこいい', 'すてき', 'かわいい']], ['さいふ', 'wallet', ['かっこいい', 'すてき', 'いい']],
];

const SG_ADJ_EN = { かわいい: 'cute', すてき: 'lovely', いい: 'nice', きれい: 'pretty', かっこいい: 'cool' };

function sgGiftQA() {
  if (!sgW('たんじょうび') || !sgW('プレゼント')) return null;
  const gifts = SG_GIFTS.filter(g => sgW(g[0]) && g[2].some(a => sgW(a)));
  if (!gifts.length) return null;
  const g = sgPick(gifts);
  const adj = sgPick(g[2].filter(a => sgW(a)));
  const n = sgPick(SENTENCE_NAME_POOL);
  const when = sgPick([['あした', 'tomorrow'], ['あさって', 'the day after tomorrow']].filter(w => sgW(w[0])));
  if (!when) return null;
  const nRo = sgW(n.jp).ro;
  const l1 = {
    jp: `${when[0]} は ${n.jp} の たんじょうび です。 いっしょに プレゼント を かいません か。`,
    ro: `${sgCap(sgW(when[0]).ro)} wa ${nRo} no tanjoubi desu. Issho ni purezento o kaimasen ka?`,
    en: `It's ${n.en}'s birthday ${when[1]}. Why don't we buy a present together?`,
  };
  const l2 = { jp: 'いいですね。 かいましょう。', ro: 'Ii desu ne. Kaimashou.', en: "Good idea. Let's buy one." };
  const l3 = { jp: 'なに を かいます か。', ro: 'Nani o kaimasu ka?', en: 'What shall we buy?' };
  const l4 = { jp: `この ${g[0]} は どうです か。`, ro: `Kono ${sgW(g[0]).ro} wa dou desu ka?`, en: `How about this ${g[1]}?` };
  const l5 = { jp: `${adj}ですね。 じゃあ、 これ を かいましょう。`, ro: `${sgCap(sgW(adj).ro)} desu ne. Jaa, kore o kaimashou.`, en: `It's ${SG_ADJ_EN[adj]}! OK, let's buy this one.` };
  return [l1, l2, l3, l4, l5];
}

// GIVING & RECEIVING (L3 Lesson 4, 2026-10-20): the same words and rules as
// the Sentence order card's Giving mode (l3cPickGive / l3cEnglishGive), so the
// two always agree. A sentence, or a question with its answer.
const SG_GIVE_ALL_ON = ['on', 'on', 'off', 'on', 'off', 'on', 'stmt'];

function sgGiveWords() {
  const tense = sgPick(['hab', 'past', 'past', 'fut']);
  for (let i = 0; i < 40; i++) { const w = l3cPickGive(tense, null); if (w) return w; }
  return null;
}

function sgGiveSentence() {
  const w = sgGiveWords();
  if (!w) return null;
  const out = sgJoin([...w.subj.segs, w.time.seg, w.comp.seg, w.slot5.seg, sgVerb(w.verb, w.tense === 'past' ? 'past' : 'hab', false)]);
  out.en = l3cEnPlain(l3cEnglishGive(w, SG_GIVE_ALL_ON, null, w.tense, false));
  return [out];
}

// "What did Tanaka-san get from a friend at Christmas?" - "A hat." Or "Who
// did ... give it to?" - "To my mother." (never asked about わたし).
function sgGiveQA() {
  let w = null;
  for (let i = 0; i < 20 && (!w || w.subj.me || w.G.phone); i++) w = sgGiveWords();
  if (!w || w.subj.me || w.G.phone) return null;
  const v = sgVerb(w.verb, w.tense === 'past' ? 'past' : 'hab', false);
  const askWhat = sgChance(0.6);
  const st = SG_GIVE_ALL_ON.slice(); st[askWhat ? 5 : 3] = 'q';
  const qSegs = askWhat ? [...w.subj.segs, w.time.seg, w.comp.seg, { jp: 'なに を', ro: 'nani o' }, v]
    : [...w.subj.segs, w.time.seg, { jp: 'だれ に', ro: 'dare ni' }, w.slot5.seg, v];
  const q = sgJoin(qSegs, null, true);
  q.en = l3cEnPlain(l3cEnglishGive(w, st, null, w.tense, true));
  const a = sgJoin(askWhat ? [w.slot5.seg, v] : [w.comp.seg, v]);
  const prep = w.G.v === 'おしえます' ? 'to' : w.G.prep;
  a.en = askWhat ? sgCap(w.slot5.en) + '.' : sgCap((prep ? prep + ' ' : '') + w.comp.en) + '.';
  return [q, a];
}

// ==== BEING: "X is Y" (です) SENTENCES (2026-10-24, Andrew) ====
// A fourth kind of sentence beside Doing / Going / Giving, for words that
// only make sense in context: jobs (たなかさんは けんちくしです), nationalities
// (イギリスじん) and describing words (この えいがは おもしろいです - written here
// without この, which isn't taught yet: えいがは おもしろいです).
// Slots: 0 who / what は, 1 when (いま, きょねん, らいねん), 5 what they are /
// what it's like, 6 です and its endings. 2, 3 and 4 aren't used.
// Describing words: い-words (おもしろい) only take です here - their own
// negative and past (おもしろくない, おもしろかった) aren't taught yet; な-words
// (きれい, すてき) take all four endings like a noun.
const BEING_ENDS = [['です', 'desu', 'hab', false], ['じゃありません', 'ja arimasen', 'hab', true], ['でした', 'deshita', 'past', false], ['じゃありませんでした', 'ja arimasen deshita', 'past', true],
  // L4 (2026-11-04): い-adjectives change their own ending. 4-6 are those, shown
  // joined to the word (おもしろくない + です). Only right after an い-word.
  ['くないです', 'kunai desu', 'hab', true, 'i'], ['かったです', 'katta desu', 'past', false, 'i'], ['くなかったです', 'kunakatta desu', 'past', true, 'i']];

// Ending index for a tense / negative pair: nouns and な-words 0-3, い-words 0 / 4-6.
const beingEndIdx = (isI, past, neg) => isI ? [0, 4, 5, 6][(past ? 2 : 0) + (neg ? 1 : 0)] : (past ? 2 : 0) + (neg ? 1 : 0);

// An い-word joined to an ending 4-6: [jp, romaji] without です (おもしろくない).
function beingIForm(jp, ro, endIdx) {
  const [k, rk] = adjIStem(jp, ro);
  const tail = { 4: ['くない', 'kunai'], 5: ['かった', 'katta'], 6: ['くなかった', 'kunakatta'] }[endIdx];
  return tail ? [k + tail[0], rk + tail[1]] : [jp, ro];
}

const BEING_NA = ['きれい', 'すてき'];

const BEING_SKIP_JOBS = ['きょうし', 'しゃいん']; // two "teacher"s / vague

const BEING_DEMONYM = { オーストラリア: 'Australian', ブラジル: 'Brazilian', カナダ: 'Canadian', ちゅうごく: 'Chinese', エジプト: 'Egyptian', フランス: 'French',
  ドイツ: 'German', インド: 'Indian', インドネシア: 'Indonesian', イラン: 'Iranian', イタリア: 'Italian', にほん: 'Japanese', かんこく: 'Korean', マレーシア: 'Malaysian',
  メキシコ: 'Mexican', フィリピン: 'Filipino', ポーランド: 'Polish', ロシア: 'Russian', シンガポール: 'Singaporean', スペイン: 'Spanish', スイス: 'Swiss',
  タイ: 'Thai', イギリス: 'British', アメリカ: 'American', ベトナム: 'Vietnamese' };

// Things to describe, and the describing words that suit them.
const BEING_THINGS = [
  { objs: ['かばん', 'とけい', 'ぼうし', 'カップ', 'マグカップ', 'ハンカチ', 'シャツ', 'コート', 'ふく', 'くつ', 'さいふ'], adjs: ['あたらしい', 'ふるい', 'かわいい', 'かっこいい', 'きれい', 'すてき', 'あかい', 'しろい', 'いい'] },
  { objs: ['くるま', 'いえ', 'じてんしゃ'], adjs: ['あたらしい', 'ふるい', 'かっこいい', 'きれい', 'すてき', 'すごい', 'あかい', 'しろい'] },
  { objs: ['ほん', 'えいが', 'ドラマ', 'しんぶん', 'ざっし'], adjs: ['おもしろい', 'いい', 'すごい', 'ながい', 'みじかい', 'ふるい', 'あたらしい'] },
  { objs: ['にんぎょう', 'ぬいぐるみ', 'え'], adjs: ['かわいい', 'きれい', 'すてき', 'ふるい', 'あたらしい'] },
  { objs: ['ビール', 'ジュース', 'みず', 'アイスコーヒー'], adjs: ['つめたい'] },
  // L4 (Lesson 8 preview, 2026-11-04): places, food, study and work.
  { objs: ['とうきょう', 'きょうと', 'おおさか', 'ロンドン', 'マンチェスター', 'まち'], adjs: ['にぎやか', 'しずか', 'きれい', 'ゆうめい', 'おおきい', 'ちいさい', 'ふるい', 'あたらしい', 'いい', 'さむい', 'あつい'], place: true },
  { objs: ['えき', 'こうえん', 'レストラン', 'デパート', 'がっこう'], adjs: ['にぎやか', 'しずか', 'きれい', 'べんり', 'おおきい', 'ちいさい', 'あたらしい', 'ふるい', 'ゆうめい'] },
  { objs: ['すし', 'ケーキ', 'カレー', 'ピザ', 'パン', 'たべもの'], adjs: ['おいしい', 'たかい', 'やすい'] },
  { objs: ['にほんご', 'えいご', 'しゅくだい', 'しごと'], adjs: ['むずかしい', 'やさしい', 'おもしろい', 'たのしい'] },
];

const BEING_PEOPLE_ADJS = ['おもしろい', 'かっこいい', 'きれい', 'すてき', 'かわいい', 'すごい', 'しんせつ', 'げんき', 'ひま', 'いそがしい', 'ハンサム', 'ゆうめい'];

// Describing a person: words whose first English meaning is the wrong one here.
const BEING_PEOPLE_EN = { やさしい: 'kind', いそがしい: 'busy', げんき: 'well' };

// Adjective + noun (しんせつな ひと, にぎやかな まち, ゆうめいな いしゃ): [noun, adjectives].
const BEING_ADJ_NOUN_PEOPLE = ['しんせつ', 'おもしろい', 'げんき', 'いい', 'ゆうめい', 'ハンサム', 'きれい', 'やさしい', 'いそがしい', 'すてき'];

const BEING_ADJ_NOUN_JOBS = ['ゆうめい', 'いい', 'しんせつ', 'いそがしい'];

const BEING_ADJ_NOUN_PLACES = ['にぎやか', 'しずか', 'きれい', 'ゆうめい', 'おおきい', 'ちいさい', 'ふるい', 'あたらしい', 'いい'];

// とても / あまり in the How-much spot (slot 2) - あまり takes a negative.
const BEING_DEGREE = { とても: { ro: 'totemo', en: 'very' }, あまり: { ro: 'amari', en: 'very', neg: true } };

// English for an adjective (first meaning, before any comma or slash).
// Topics whose English isn't "the" + the word list's first meaning.
const BEING_TOPIC_EN = { にほんご: 'Japanese', えいご: 'English', しごと: 'work', しゅくだい: 'the homework', まち: 'the town' };

function beingTopicEn(o) {
  if (BEING_TOPIC_EN[o]) return BEING_TOPIC_EN[o];
  const g = BEING_THINGS.find(x => x.objs.includes(o));
  return (g && g.place ? '' : 'the ') + beingEnWord(l3TaughtItem(o) || { en: o }).replace('UK / England', 'the UK');
}

// Big cities aren't small or quiet (Tokyo, London, Osaka).
const BEING_BIG_CITIES = ['とうきょう', 'ロンドン', 'おおさか'];

const beingAdjFits = (o, a) => !(BEING_BIG_CITIES.includes(o) && ['ちいさい', 'しずか'].includes(a));

const beingAdjEn = (jp, person) => (person && BEING_PEOPLE_EN[jp]) || adjEnWord((l3TaughtItem(jp) || { en: jp }).en);

const beingEnWord = it => String(it.en || '').split(' / ')[0].replace(/\s*\(.*\)$/, '').trim();

const beingArticle = w => (/^[aeiou]/i.test(w) ? 'an ' : 'a ') + w;

// An い-adjective (not a noun that happens to end in い: がくせい, せんせい, とけい).
const beingIsI = jp => /い$/.test(jp) && !isNaAdj(jp) && isAdjItem(l3TaughtItem(jp));

function beingJobs() {
  return (VOCAB_ALL_TAUGHT_CACHE.jobs = VOCAB_ALL_TAUGHT_CACHE.jobs || Object.values(VOCAB).flatMap(v => v.items || [])
    .filter(i => (i.tags || []).includes('taught') && (i.tags || []).some(t => /^occupations/.test(t)) && !BEING_SKIP_JOBS.includes(i.jp))
    .filter((i, k, a) => a.findIndex(x => x.jp === i.jp) === k));
}

const VOCAB_ALL_TAUGHT_CACHE = {};

function beingNations() {
  return Object.keys(BEING_DEMONYM).filter(c => sgW(c)).map(c => ({ jp: c + 'じん', ro: sgW(c).ro + 'jin', en: BEING_DEMONYM[c] }));
}

// English: subject + be + complement (+ when).
function beingEnglish(S, me, you, kind, compEn, tense, neg, q, timeEn, third, marked) {
  // "The shoes ARE lovely" (Andrew, 2026-10-24): a plural thing takes are /
  // were, like "you" - くつ (shoes) and ふく (clothes) so far.
  if (/^the \S.*s$/i.test(l3cEnPlain(String(S))) && !/(ss|us)$/i.test(l3cEnPlain(String(S)))) { third = false; me = false; you = false; }
  const C = marked ? compEn : mk(5, compEn), T = timeEn ? ' ' + mk(1, timeEn) : '';
  if (q) {
    if (tense === 'past') return `${neg ? ((me && !you) || third ? "Wasn't" : "Weren't") : (me && !you ? 'Was' : third ? 'Was' : 'Were')} ${S} ${C}${T}?`.replace(/^Wasn't (you)/, "Weren't $1").replace(/^Was (you)/, 'Were $1');
    if (tense === 'fut') return `${neg ? "Won't" : 'Will'} ${S} be ${C}${T}?`;
    return `${neg ? (third ? "Isn't" : "Aren't") : (third ? 'Is' : (me && !you ? 'Am' : 'Are'))} ${S} ${C}${T}?`;
  }
  let be;
  if (tense === 'past') be = me ? (neg ? "wasn't" : 'was') : third ? (neg ? "wasn't" : 'was') : (neg ? "weren't" : 'were');
  else if (tense === 'fut') be = neg ? "won't be" : 'will be';
  else be = me ? (neg ? "'m not" : "'m") : third ? (neg ? "isn't" : 'is') : (neg ? "aren't" : 'are');
  return l3cCap(`${S}${be.startsWith("'") ? '' : ' '}${mk(6, be)} ${C}${T}.`);
}

// Being sentences in two steps (2026-10-24): beingPick chooses the words,
// beingBuild lays them out - so the Sentence order card can switch slots on
// and off and ask questions with the same words, and the challenges use the
// same pair. opts.needTime: a time word is wanted (jobs only); opts.person:
// the topic must be a person (for だれが…?). L4 (2026-11-04): opts.adjNoun -
// an adjective before a noun (しんせつな ひと, slot 4 + slot 5); opts.degree -
// とても or あまり (slot 2, with a describing word); opts.random - the
// challenges and the daily sentence choose those themselves.
function beingPick(opts = {}) {
  if (opts.random) {
    if (!opts.needTime && sgChance(0.22)) opts = Object.assign({}, opts, { adjNoun: true });
    if (!opts.needTime && sgChance(0.25)) opts = Object.assign({}, opts, { degree: sgChance(0.5) ? 'とても' : 'あまり' });
  }
  const r = sgRand();
  let kind = r < 0.38 ? 'job' : r < 0.55 ? 'nation' : 'adj';
  if (opts.needTime) kind = 'job'; // time words only go with jobs (2026-10-24: "the shirt was lovely last year" read oddly)
  if (opts.degree && kind !== 'adj') kind = 'adj';
  if (opts.adjNoun) kind = 'adjnoun';
  let subj, topicWord = null, topicEn = null, comp, adj = null;
  if (kind === 'adjnoun') {
    // A person (+ ひと or their job) or a city (+ まち).
    if (!opts.person && sgChance(0.35) && sgW('まち')) {
      const cities = ['とうきょう', 'きょうと', 'おおさか', 'ロンドン', 'マンチェスター'].filter(c => sgW(c));
      const c = sgPick(cities), a = sgPick(BEING_ADJ_NOUN_PLACES.filter(x => sgW(x) && beingAdjFits(c, x)));
      if (!c || !a) return null;
      topicWord = c; topicEn = beingEnWord(l3TaughtItem(c)).replace('UK / England', 'the UK');
      subj = { segs: [sgSeg(c, 'は', 'wa')], en: topicEn, third: true, thing: true };
      adj = { jp: a, ro: sgW(a).ro, en: beingAdjEn(a) };
      comp = { jp: 'まち', ro: sgW('まち').ro, en: 'town', noun: true };
    } else {
      subj = sgSubject({ noTeacher: true });
      const useJob = sgChance(0.35) && !subj.child;
      if (useJob) {
        let jobs = beingJobs();
        if (subj.elderly) jobs = jobs.filter(j => j.jp !== 'がくせい');
        const j = sgPick(jobs), a = sgPick(BEING_ADJ_NOUN_JOBS.filter(x => sgW(x)));
        if (!j || !a) return null;
        adj = { jp: a, ro: sgW(a).ro, en: beingAdjEn(a, true) };
        comp = { jp: j.jp, ro: j.romaji, en: beingEnWord(j), jobEn: beingEnWord(j), noun: true };
      } else {
        if (!sgW('ひと')) return null;
        const a = sgPick(BEING_ADJ_NOUN_PEOPLE.filter(x => sgW(x)));
        if (!a) return null;
        adj = { jp: a, ro: sgW(a).ro, en: beingAdjEn(a, true) };
        comp = { jp: 'ひと', ro: 'hito', en: 'person', noun: true };
      }
    }
  } else if (kind === 'adj' && !opts.person && sgChance(0.65)) {
    const groups = BEING_THINGS.map(g => ({ objs: g.objs.filter(o => sgW(o)), adjs: g.adjs.filter(a => sgW(a) && !(opts.needTime && !isNaAdj(a))), place: g.place })).filter(g => g.objs.length && g.adjs.length);
    if (!groups.length) return null;
    const g = sgPick(groups), o = sgPick(g.objs), a = sgPick(g.adjs.filter(x => beingAdjFits(o, x)));
    if (!a) return null;
    topicWord = o; topicEn = beingTopicEn(o);
    subj = { segs: [sgSeg(o, 'は', 'wa')], en: topicEn, third: true, thing: true };
    comp = { jp: a, ro: sgW(a).ro, en: beingAdjEn(a) };
  } else {
    subj = sgSubject({ noTeacher: true });
    if (kind === 'adj') {
      const a = sgPick(BEING_PEOPLE_ADJS.filter(a => sgW(a) && !(opts.needTime && !isNaAdj(a))));
      if (!a) return null;
      comp = { jp: a, ro: sgW(a).ro, en: beingAdjEn(a, true) };
    } else if (kind === 'job') {
      let jobs = beingJobs();
      if (subj.child) jobs = jobs.filter(j => j.jp === 'がくせい');
      if (subj.elderly) jobs = jobs.filter(j => j.jp !== 'がくせい');
      const j = sgPick(jobs);
      if (!j) return null;
      comp = { jp: j.jp, ro: j.romaji, en: beingArticle(beingEnWord(j)), jobEn: beingEnWord(j) };
    } else {
      const n = sgPick(beingNations());
      if (!n) return null;
      comp = n;
    }
  }
  // Time words: jobs only (with or without a describing word).
  const canTime = kind === 'job' || (kind === 'adjnoun' && comp.jobEn);
  const isI = kind === 'adj' && beingIsI(comp.jp);
  let tense = kind === 'nation' ? 'hab' : sgPick(['hab', 'hab', 'hab', 'past']);
  let time = null;
  if (canTime) {
    const tr = sgRand();
    const opt = [];
    if (sgW('いま')) opt.push({ jp: 'いま', ro: 'ima', en: 'now', tense: 'hab' });
    if (sgW('きょねん')) opt.push({ jp: 'きょねん', ro: 'kyonen', en: 'last year', tense: 'past' });
    if (sgW('らいねん') && !subj.elderly) opt.push({ jp: 'らいねん', ro: 'rainen', en: 'next year', tense: 'fut' });
    if (opt.length && (opts.needTime || tr < 0.55)) { time = sgPick(opt); tense = time.tense; }
  }
  if (opts.needTime && !time) return null;
  const degree = opts.degree && (kind === 'adj' || kind === 'adjnoun') ? opts.degree : null;
  const neg = degree ? !!BEING_DEGREE[degree].neg : sgChance(0.25);
  if (kind === 'adjnoun' && !time) tense = sgChance(0.2) ? 'past' : 'hab';
  return { mode: 'being', kind, subj, topicWord, topicEn, comp, adj, degree, time, tense, neg, isI };
}

// st: the card's slot states (0 on/off/q, 1 on/off, 2 degree on/off, 4
// describing on/off, 6 stmt/q). Returns the engine's {parts, end, jp,
// romaji, enM} plus endIdx / q for the challenges.
function beingBuild(w, st) {
  const q = st[6] === 'q' || st[0] === 'q';
  const whoQ = st[0] === 'q';
  const neg = w.neg && !whoQ; // "Who isn't a doctor?" is a strange question
  const isI = w.kind === 'adj' && beingIsI(w.comp.jp);
  const endIdx = beingEndIdx(isI, w.tense === 'past', neg);
  const e = BEING_ENDS[endIdx];
  const parts = [];
  const topicOn = st[0] === 'on' && w.subj.segs.length;
  if (whoQ) parts.push({ slot: 0, jp: 'だれが', ro: 'dare ga' });
  else if (topicOn) w.subj.segs.forEach(sg => parts.push({ slot: 0, jp: l3cJp(sg), ro: sg.ro }));
  if (st[1] === 'on' && w.time) parts.push({ slot: 1, jp: w.time.jp, ro: w.time.ro });
  if (w.degree) parts.push({ slot: 2, jp: w.degree, ro: BEING_DEGREE[w.degree].ro });
  if (w.adj) { const na = isNaAdj(w.adj.jp); parts.push({ slot: 4, jp: w.adj.jp + (na ? 'な' : ''), ro: w.adj.ro + (na ? ' na' : '') }); }
  if (isI && endIdx >= 4) {
    const [fj, fr] = beingIForm(w.comp.jp, w.comp.ro, endIdx);
    parts.push({ slot: 5, jp: fj, ro: fr });
    parts.push({ slot: 6, jp: 'です' + (q ? 'か' : ''), ro: 'desu' + (q ? ' ka' : '') });
  } else {
    parts.push({ slot: 5, jp: w.comp.jp, ro: w.comp.ro });
    parts.push({ slot: 6, jp: e[0] + (q ? 'か' : ''), ro: e[1] + (q ? ' ka' : '') });
  }
  parts[0].ro = sgCap(parts[0].ro);
  // English. No topic in a question = "you"; in a statement = "I".
  const me = !whoQ && (!topicOn ? !q : !!w.subj.me);
  const you = !whoQ && !topicOn && q;
  const S = whoQ ? mk(0, 'Who') : topicOn ? mk(0, w.subj.me ? 'I' : w.subj.en) : (q ? 'you' : 'I');
  const third = whoQ || (!me && !you);
  const timeEn = st[1] === 'on' && w.time ? w.time.en : '';
  const compEn = beingCompEn(w);
  let enM;
  if (whoQ) {
    const be = w.tense === 'past' ? 'was' : w.tense === 'fut' ? 'will be' : 'is';
    enM = `${S} ${mk(6, be)} ${compEn}${timeEn ? ' ' + mk(1, timeEn) : ''}?`;
  } else enM = beingEnglish(S, me && !you, you, w.kind, compEn, w.tense, neg, q, timeEn, third, true);
  return { parts, end: q ? ['。', '?'] : ['。', '.'], jp: parts.map(x => x.jp).join(' ') + '。', romaji: parts.map(x => x.ro).join(' ') + (q ? '?' : '.'), enM, endIdx, q };
}

// The complement's English, slot-coloured: "very kind" (2 + 5), "a famous
// doctor" (4 + 5), "a very lively town".
function beingCompEn(w) {
  const deg = w.degree ? mk(2, 'very') + ' ' : '';
  if (w.adj) {
    const noun = w.comp.jobEn || w.comp.en;
    const first = (w.degree ? 'very' : w.adj.en);
    return (/^[aeiou]/i.test(first) ? 'an ' : 'a ') + deg + mk(4, w.adj.en) + ' ' + mk(5, noun);
  }
  return deg + mk(5, w.comp.en);
}

function sgGenerate() {
  const makers = [[sgObjectSentence, 4], [sgMotionSentence, 3], [sgRoutineSentence, 1], [sgJobProfile, 1], [sgMeetSentence, 1], [sgQA, 3],
    [sgDonnaQA, 1.5], [sgWhereDeQA, 1.5], [sgWhatAtQA, 1.5], [sgInviteQA, 1.5], [sgMeetPlanQA, 1], [sgGiftQA, 0.75],
    [sgGiveSentence, 2], [sgGiveQA, 1], [sgMouQA, 2], [sgAdjSentence, 3], [sgButSentence, 1.5]];
  const total = makers.reduce((a, m) => a + m[1], 0);
  for (let tries = 0; tries < 50; tries++) {
    let r = sgRand() * total, fn = makers[0][0];
    for (const [f, w] of makers) { if ((r -= w) < 0) { fn = f; break; } }
    try { const out = fn(); if (out) return out; } catch (e) { /* a pool came up empty - try another pattern */ }
  }
  return null;
}

// Picks a sentence, avoiding the one shown last time (remembered on this
// device only - harmless if storage is unavailable).
const SG_LAST_KEY = 'jpL4LastSentence';
