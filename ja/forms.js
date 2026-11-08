// Japanese - verb and adjective forms, particles and small っ (2026-11-08,
// step 6 of the move onto the core). The rules for the forms are the
// language's (lang/ja.js, LANG.forms); here they get their own names, as
// Japanese's code has always called them, beside the drills, the forms
// popup and the conjugation references. Loaded before ja/kana.js.
const { VERB_FORM_KEYS, VERB_FORM_LABELS, ENGLISH_IRREGULAR_PAST, ENGLISH_DOUBLED_PAST, englishPastWord, verbEnglishForms, verbForms, adjIStem, ADJ_FORM_KEYS, ADJ_FORM_LABELS, adjEnWord, PARTICLE_SET, PARTICLE_ROMAJI } = LANG.forms;

// Shared Japanese speech (tap-to-hear and hold-to-peek) - same voice
// settings as the drill's speakCurrent().
// SPOKEN PARTICLES (2026-10-24, Andrew: "はは は" was read "haha ha"). The
// voice can't always tell the particle は (wa) from the kana は (ha) once the
// sentence is joined up - ははは even sounds like laughing. Where the app knows
// a token is a particle (a space before it), it's spoken as わ / え. Speech only;
// nothing on screen changes.
function sayParticles(textWithSpaces) {
  return String(textWithSpaces || '').replace(/(^|\s)は(?=\s|$|。|か)/g, '$1わ').replace(/(^|\s)へ(?=\s|$|。)/g, '$1え').replace(/[\s。]/g, '');
}

// Verb forms question (see buildVerbFormDeck). Direction is stored on the
// question itself, so a resumed session renders the way it was started.
function renderVerbFormQuestion(q, charDisplay, container) {
  const promptEl = document.getElementById('q-prompt');
  if (!q.reverse) {
    charDisplay.style.fontFamily = "'BIZ UDPGothic', sans-serif";
    const len = [...q.char].length;
    charDisplay.style.fontSize = len <= 5 ? '56px' : len <= 8 ? '44px' : '34px';
    charDisplay.innerHTML = markSmallKana(q.char);
    promptEl.textContent = `Which form of the ${q.kindWord || 'verb'} is this?`;
  } else {
    charDisplay.style.fontFamily = "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";
    charDisplay.style.fontSize = '36px';
    charDisplay.innerHTML = `${q.formLabel || VERB_FORM_LABELS[q.verbForm]}<div class="vf-q-verb">${markSmallKana(q.verbJp)}</div><div class="vf-q-en">${q.verbEn}</div>`;
    promptEl.textContent = q.typed ? `Type this form of the ${q.kindWord || 'verb'}` : `Which is this form of the ${q.kindWord || 'verb'}?`;
    if (q.typed) {
      renderTypeAnswerInput(container, 'type the form…', raw => chooseTypedVerbForm(raw, q), true);
      return;
    }
  }
  q.options.forEach((o, idx) => {
    const btn = document.createElement('button');
    btn.className = 'opt';
    btn.innerHTML = o.jp
      ? `<span class="opt-num">${idx + 1}</span><span class="opt-rd opt-kana" style="font-size:${optKanaSize(o.top)}px">${markSmallKana(o.top)}</span><span class="opt-en">(${o.sub})</span>`
      : `<span class="opt-num">${idx + 1}</span><span class="opt-rd">${o.top}</span>`;
    btn.dataset.value = o.value;
    btn.onclick = () => choose(btn, o.value, q.answer, q.char);
    container.appendChild(btn);
  });
}

// Verb forms, reversed + Type: type the form itself, so it can't be answered
// from the ending alone. Same leniency as typed vocab (normaliseTypedJapanese).
function chooseTypedVerbForm(rawInput, q) {
  if (answered) return;
  answered = true;
  const input = document.getElementById('type-answer-input');
  const submitBtn = document.getElementById('type-answer-submit');
  if (input) input.disabled = true;
  if (submitBtn) submitBtn.disabled = true;
  const typed = normaliseTypedJapanese(rawInput);
  const isCorrect = !!typed && [q.formJp, ...(q.formKanji || [])].some(f => normaliseTypedJapanese(f) === typed);
  // A verb form one kana out is usually the ending itself (たべません / たべました),
  // which is the whole point of the question - so no "nearly" here.
  if (input) input.classList.add(isCorrect ? 'correct' : 'wrong');
  recordTypedAnswer(q, isCorrect ? 'exact' : 'wrong');
  const fb = document.getElementById('q-feedback');
  if (isCorrect) {
    score++;
    fb.innerHTML = `Correct! (${q.hint})`;
    fb.className = 'feedback good';
  } else {
    wrong++;
    fb.innerHTML = `Not quite — the answer is "${markSmallKana(q.formJp)}" (${q.hint})`;
    fb.className = 'feedback bad';
    const missedKey = q.char + '|' + q.answer;
    if (!missed.includes(missedKey)) { missed.push(missedKey); missedItems.push(q); }
  }
  document.getElementById('stat-correct').textContent = score;
  document.getElementById('stat-wrong').textContent = wrong;
  const nextBtn = document.getElementById('next-btn');
  nextBtn.style.visibility = 'visible';
  nextBtn.innerHTML = (current + 1 < deck.length ? 'Next →' : 'See results →') + '<span class="kbd-hint">space</span>';
}

// ます-form tense/+-/- reference. Split into two tables rather than one -
// tried as a single 20-verb list first, but the pill row got genuinely hard
// to scan, and the two halves aren't just an arbitrary batch split: CORE is
// the original Lesson 5 set (none of these take a direct object), OBJECTS
// is Week 6's set, all of which take を except あいます. That's a real
// grammatical line, not just "old words vs new words", so splitting the
// reference along it is more than a fix for a crowded screen - it's the
// more accurate way to present it. Each table's own reference screen still
// uses the same "pills up top, one selected item's detail below" pattern
// (see showVerbConjugationReferenceFor below).
//
// This conjugation is completely regular in both tables - every ます-form
// verb in Japanese follows the exact same four-way pattern (stem+ます /
// stem+ません / stem+ました / stem+ませんでした), including べんきょうします and
// します: する verbs are irregular in dictionary form, but once already in
// ます-form the suffixing is identical to everything else here. Written out
// directly rather than derived from a stem, same call as TIME_UNIT_TABLE
// above: a handful of fixed, well-known forms don't need a generator, they
// need to be right.
// Each verb also carries its たい-form ("want to ~") - stem + たい, fully
// regular for every verb here (even べんきょうします/します, since する-verbs are
// only irregular in DICTIONARY form; once you're already at the ます-stem,
// たい suffixes on exactly the same way as everywhere else). Checked every
// entry by hand for anything that reads oddly in English (おわりたい "want to
// finish", おきたい "want to get up", あいたい "want to meet" all sounded like
// candidates for being odd, but all are completely normal things to say)
// before adding. たい itself then conjugates like an い-adjective, NOT like a
// verb - たい/たくない/たかった/たくなかった - which is a genuinely different
// conjugation pattern to the ます-form grid above it, and not one the app
// has shown anywhere else yet.
const VERB_CONJUGATION_TABLE_CORE = [
  {
    key: 'kimasu', en: 'to come', nonPastAff: ['きます', 'kimasu'], nonPastNeg: ['きません', 'kimasen'],
    pastAff: ['きました', 'kimashita'], pastNeg: ['きませんでした', 'kimasendeshita'],
    tai: { nonPastAff: ['きたい', 'kitai'], nonPastNeg: ['きたくない', 'kitakunai'], pastAff: ['きたかった', 'kitakatta'], pastNeg: ['きたくなかった', 'kitakunakatta'] },
  },
  {
    key: 'owarimasu', en: 'to finish', nonPastAff: ['おわります', 'owarimasu'], nonPastNeg: ['おわりません', 'owarimasen'],
    pastAff: ['おわりました', 'owarimashita'], pastNeg: ['おわりませんでした', 'owarimasendeshita'],
    tai: { nonPastAff: ['おわりたい', 'owaritai'], nonPastNeg: ['おわりたくない', 'owaritakunai'], pastAff: ['おわりたかった', 'owaritakatta'], pastNeg: ['おわりたくなかった', 'owaritakunakatta'] },
  },
  {
    key: 'okimasu', en: 'to get up', nonPastAff: ['おきます', 'okimasu'], nonPastNeg: ['おきません', 'okimasen'],
    pastAff: ['おきました', 'okimashita'], pastNeg: ['おきませんでした', 'okimasendeshita'],
    tai: { nonPastAff: ['おきたい', 'okitai'], nonPastNeg: ['おきたくない', 'okitakunai'], pastAff: ['おきたかった', 'okitakatta'], pastNeg: ['おきたくなかった', 'okitakunakatta'] },
  },
  {
    key: 'ikimasu', en: 'to go', nonPastAff: ['いきます', 'ikimasu'], nonPastNeg: ['いきません', 'ikimasen'],
    pastAff: ['いきました', 'ikimashita'], pastNeg: ['いきませんでした', 'ikimasendeshita'],
    tai: { nonPastAff: ['いきたい', 'ikitai'], nonPastNeg: ['いきたくない', 'ikitakunai'], pastAff: ['いきたかった', 'ikitakatta'], pastNeg: ['いきたくなかった', 'ikitakunakatta'] },
  },
  {
    key: 'yasumimasu', en: 'to rest / take a day off', nonPastAff: ['やすみます', 'yasumimasu'], nonPastNeg: ['やすみません', 'yasumimasen'],
    pastAff: ['やすみました', 'yasumimashita'], pastNeg: ['やすみませんでした', 'yasumimasendeshita'],
    tai: { nonPastAff: ['やすみたい', 'yasumitai'], nonPastNeg: ['やすみたくない', 'yasumitakunai'], pastAff: ['やすみたかった', 'yasumitakatta'], pastNeg: ['やすみたくなかった', 'yasumitakunakatta'] },
  },
  {
    key: 'kaerimasu', en: 'to return / go home', nonPastAff: ['かえります', 'kaerimasu'], nonPastNeg: ['かえりません', 'kaerimasen'],
    pastAff: ['かえりました', 'kaerimashita'], pastNeg: ['かえりませんでした', 'kaerimasendeshita'],
    tai: { nonPastAff: ['かえりたい', 'kaeritai'], nonPastNeg: ['かえりたくない', 'kaeritakunai'], pastAff: ['かえりたかった', 'kaeritakatta'], pastNeg: ['かえりたくなかった', 'kaeritakunakatta'] },
  },
  {
    key: 'nemasu', en: 'to sleep / go to bed', nonPastAff: ['ねます', 'nemasu'], nonPastNeg: ['ねません', 'nemasen'],
    pastAff: ['ねました', 'nemashita'], pastNeg: ['ねませんでした', 'nemasendeshita'],
    tai: { nonPastAff: ['ねたい', 'netai'], nonPastNeg: ['ねたくない', 'netakunai'], pastAff: ['ねたかった', 'netakatta'], pastNeg: ['ねたくなかった', 'netakunakatta'] },
  },
  {
    key: 'benkyoushimasu', en: 'to study', nonPastAff: ['べんきょうします', 'benkyoushimasu'], nonPastNeg: ['べんきょうしません', 'benkyoushimasen'],
    pastAff: ['べんきょうしました', 'benkyoushimashita'], pastNeg: ['べんきょうしませんでした', 'benkyoushimasendeshita'],
    tai: { nonPastAff: ['べんきょうしたい', 'benkyoushitai'], nonPastNeg: ['べんきょうしたくない', 'benkyoushitakunai'], pastAff: ['べんきょうしたかった', 'benkyoushitakatta'], pastNeg: ['べんきょうしたくなかった', 'benkyoushitakunakatta'] },
  },
  {
    key: 'hatarakimasu', en: 'to work', nonPastAff: ['はたらきます', 'hatarakimasu'], nonPastNeg: ['はたらきません', 'hatarakimasen'],
    pastAff: ['はたらきました', 'hatarakimashita'], pastNeg: ['はたらきませんでした', 'hatarakimasendeshita'],
    tai: { nonPastAff: ['はたらきたい', 'hatarakitai'], nonPastNeg: ['はたらきたくない', 'hatarakitakunai'], pastAff: ['はたらきたかった', 'hatarakitakatta'], pastNeg: ['はたらきたくなかった', 'hatarakitakunakatta'] },
  },
];

// Week 6's object-taking verbs (all take を except あいます, which takes に -
// see the "を - the object particle" grammar note). Same regular ます-form
// conjugation pattern as VERB_CONJUGATION_TABLE_CORE above, します included:
// する is only irregular in dictionary form, and by the time it's already
// conjugated to します the suffixing behaves exactly like every other verb
// here (same reasoning as べんきょうします above).
const VERB_CONJUGATION_TABLE_OBJECTS = [
  {
    key: 'tabemasu', en: 'to eat', nonPastAff: ['たべます', 'tabemasu'], nonPastNeg: ['たべません', 'tabemasen'],
    pastAff: ['たべました', 'tabemashita'], pastNeg: ['たべませんでした', 'tabemasendeshita'],
    tai: { nonPastAff: ['たべたい', 'tabetai'], nonPastNeg: ['たべたくない', 'tabetakunai'], pastAff: ['たべたかった', 'tabetakatta'], pastNeg: ['たべたくなかった', 'tabetakunakatta'] },
  },
  {
    key: 'nomimasu', en: 'to drink', nonPastAff: ['のみます', 'nomimasu'], nonPastNeg: ['のみません', 'nomimasen'],
    pastAff: ['のみました', 'nomimashita'], pastNeg: ['のみませんでした', 'nomimasendeshita'],
    tai: { nonPastAff: ['のみたい', 'nomitai'], nonPastNeg: ['のみたくない', 'nomitakunai'], pastAff: ['のみたかった', 'nomitakatta'], pastNeg: ['のみたくなかった', 'nomitakunakatta'] },
  },
  {
    key: 'yomimasu', en: 'to read', nonPastAff: ['よみます', 'yomimasu'], nonPastNeg: ['よみません', 'yomimasen'],
    pastAff: ['よみました', 'yomimashita'], pastNeg: ['よみませんでした', 'yomimasendeshita'],
    tai: { nonPastAff: ['よみたい', 'yomitai'], nonPastNeg: ['よみたくない', 'yomitakunai'], pastAff: ['よみたかった', 'yomitakatta'], pastNeg: ['よみたくなかった', 'yomitakunakatta'] },
  },
  {
    key: 'mimasu', en: 'to watch / see', nonPastAff: ['みます', 'mimasu'], nonPastNeg: ['みません', 'mimasen'],
    pastAff: ['みました', 'mimashita'], pastNeg: ['みませんでした', 'mimasendeshita'],
    tai: { nonPastAff: ['みたい', 'mitai'], nonPastNeg: ['みたくない', 'mitakunai'], pastAff: ['みたかった', 'mitakatta'], pastNeg: ['みたくなかった', 'mitakunakatta'] },
  },
  {
    key: 'kikimasu', en: 'to listen', nonPastAff: ['ききます', 'kikimasu'], nonPastNeg: ['ききません', 'kikimasen'],
    pastAff: ['ききました', 'kikimashita'], pastNeg: ['ききませんでした', 'kikimasendeshita'],
    tai: { nonPastAff: ['ききたい', 'kikitai'], nonPastNeg: ['ききたくない', 'kikitakunai'], pastAff: ['ききたかった', 'kikitakatta'], pastNeg: ['ききたくなかった', 'kikitakunakatta'] },
  },
  {
    key: 'kakimasu', en: 'to write', nonPastAff: ['かきます', 'kakimasu'], nonPastNeg: ['かきません', 'kakimasen'],
    pastAff: ['かきました', 'kakimashita'], pastNeg: ['かきませんでした', 'kakimasendeshita'],
    tai: { nonPastAff: ['かきたい', 'kakitai'], nonPastNeg: ['かきたくない', 'kakitakunai'], pastAff: ['かきたかった', 'kakitakatta'], pastNeg: ['かきたくなかった', 'kakitakunakatta'] },
  },
  {
    key: 'kaimasu', en: 'to buy', nonPastAff: ['かいます', 'kaimasu'], nonPastNeg: ['かいません', 'kaimasen'],
    pastAff: ['かいました', 'kaimashita'], pastNeg: ['かいませんでした', 'kaimasendeshita'],
    tai: { nonPastAff: ['かいたい', 'kaitai'], nonPastNeg: ['かいたくない', 'kaitakunai'], pastAff: ['かいたかった', 'kaitakatta'], pastNeg: ['かいたくなかった', 'kaitakunakatta'] },
  },
  {
    key: 'suimasu', en: 'to smoke', nonPastAff: ['すいます', 'suimasu'], nonPastNeg: ['すいません', 'suimasen'],
    pastAff: ['すいました', 'suimashita'], pastNeg: ['すいませんでした', 'suimasendeshita'],
    tai: { nonPastAff: ['すいたい', 'suitai'], nonPastNeg: ['すいたくない', 'suitakunai'], pastAff: ['すいたかった', 'suitakatta'], pastNeg: ['すいたくなかった', 'suitakunakatta'] },
  },
  {
    key: 'torimasu', en: 'to take (a photo)', nonPastAff: ['とります', 'torimasu'], nonPastNeg: ['とりません', 'torimasen'],
    pastAff: ['とりました', 'torimashita'], pastNeg: ['とりませんでした', 'torimasendeshita'],
    tai: { nonPastAff: ['とりたい', 'toritai'], nonPastNeg: ['とりたくない', 'toritakunai'], pastAff: ['とりたかった', 'toritakatta'], pastNeg: ['とりたくなかった', 'toritakunakatta'] },
  },
  {
    key: 'shimasu', en: 'to do / play', nonPastAff: ['します', 'shimasu'], nonPastNeg: ['しません', 'shimasen'],
    pastAff: ['しました', 'shimashita'], pastNeg: ['しませんでした', 'shimasendeshita'],
    tai: { nonPastAff: ['したい', 'shitai'], nonPastNeg: ['したくない', 'shitakunai'], pastAff: ['したかった', 'shitakatta'], pastNeg: ['したくなかった', 'shitakunakatta'] },
  },
  {
    key: 'aimasu', en: 'to meet', nonPastAff: ['あいます', 'aimasu'], nonPastNeg: ['あいません', 'aimasen'],
    pastAff: ['あいました', 'aimashita'], pastNeg: ['あいませんでした', 'aimasendeshita'],
    tai: { nonPastAff: ['あいたい', 'aitai'], nonPastNeg: ['あいたくない', 'aitakunai'], pastAff: ['あいたかった', 'aitakatta'], pastNeg: ['あいたくなかった', 'aitakunakatta'] },
  },
];

// Which table the pill row/detail below are currently reading from - set by
// showVerbConjugationReferenceFor() each time either reference screen opens.
let verbConjActiveTable = VERB_CONJUGATION_TABLE_CORE;

let verbConjSelected = 'kimasu';

function populateVerbConjPills() {
  const row = document.getElementById('verb-conj-pills');
  if (!row) return;
  row.innerHTML = '';
  // Sorted alphabetically by English gloss for browsing, same as every
  // other selection screen in the app (sortItemsAlphabetically) - the
  // underlying tables stay in teaching order in storage, this is a display-
  // only sort computed fresh each time. Reused directly since these entries
  // already carry an `en` field in the same shape sortItemsAlphabetically
  // expects.
  sortItemsAlphabetically(verbConjActiveTable).forEach(v => {
    const btn = document.createElement('button');
    btn.className = 'level-pill' + (v.key === verbConjSelected ? ' active' : '');
    btn.innerHTML = markSmallKana(v.nonPastAff[0]);
    btn.onclick = () => setVerbConjVerb(v.key);
    row.appendChild(btn);
  });
}

function setVerbConjVerb(key) {
  verbConjSelected = key;
  populateVerbConjPills();
  renderVerbConjDetail();
}

function renderVerbConjDetail() {
  const container = document.getElementById('verb-conj-detail');
  if (!container) return;
  const v = verbConjActiveTable.find(x => x.key === verbConjSelected);
  const cell = (jp, romaji) => `
    <div class="tu-cell">
      <div class="tu-jp">${markSmallKana(jp)}</div><div class="tu-romaji">${romaji}</div>
    </div>
  `;
  container.innerHTML = `
    <div class="verb-conj-block">
      <div class="verb-conj-heading">${markSmallKana(v.nonPastAff[0])}<span class="verb-conj-en">${v.en}</span></div>
      <div class="verb-conj-table">
        <div class="tu-cell tu-header"></div>
        <div class="tu-cell tu-header">Affirmative</div>
        <div class="tu-cell tu-header">Negative</div>
        <div class="tu-cell tu-rowlabel">Non-past</div>
        ${cell(v.nonPastAff[0], v.nonPastAff[1])}
        ${cell(v.nonPastNeg[0], v.nonPastNeg[1])}
        <div class="tu-cell tu-rowlabel">Past</div>
        ${cell(v.pastAff[0], v.pastAff[1])}
        ${cell(v.pastNeg[0], v.pastNeg[1])}
      </div>
    </div>
    <div class="verb-conj-block">
      <div class="verb-conj-heading verb-conj-tai-heading">${markSmallKana(v.tai.nonPastAff[0])}<span class="verb-conj-en">"want to ${v.en.replace(/^to /, '')}"</span></div>
      <div class="verb-conj-table">
        <div class="tu-cell tu-header"></div>
        <div class="tu-cell tu-header">Affirmative</div>
        <div class="tu-cell tu-header">Negative</div>
        <div class="tu-cell tu-rowlabel">Non-past</div>
        ${cell(v.tai.nonPastAff[0], v.tai.nonPastAff[1])}
        ${cell(v.tai.nonPastNeg[0], v.tai.nonPastNeg[1])}
        <div class="tu-cell tu-rowlabel">Past</div>
        ${cell(v.tai.pastAff[0], v.tai.pastAff[1])}
        ${cell(v.tai.pastNeg[0], v.tai.pastNeg[1])}
      </div>
    </div>
  `;
}

// Shared by both verb-conjugation reference screens (core and object-taking
// verbs) - only the table, screen title and default-selected verb differ.
function showVerbConjugationReferenceFor(table, title, defaultKey) {
  // Only reachable through the Grammar notes hub - see showGrammarNotesHub().
  vocabRefBackTarget = 'grammar-notes-hub';
  verbConjActiveTable = table;
  verbConjSelected = defaultKey;
  document.getElementById('vocab-ref-title').textContent = title;
  const list = document.getElementById('vocab-ref-list');
  list.className = '';
  list.innerHTML = '';

  const pillRow = document.createElement('div');
  pillRow.className = 'level-filter-row';
  pillRow.id = 'verb-conj-pills';
  list.appendChild(pillRow);
  populateVerbConjPills();

  const detail = document.createElement('div');
  detail.id = 'verb-conj-detail';
  list.appendChild(detail);
  renderVerbConjDetail();

  const note = document.createElement('div');
  note.className = 'verb-conj-note';
  note.textContent = 'Only two tenses here, not three - Japanese ます-form doesn’t separate "present" from "future" the way English does. いきます alone covers both "I go" and "I will go"; context (or a time word like あした) carries the rest.';
  list.appendChild(note);

  const taiNote = document.createElement('div');
  taiNote.className = 'verb-conj-note';
  taiNote.textContent = 'The second grid ("want to ~") conjugates differently to the first - たい behaves like an い-adjective once it’s formed, not like a verb: たい → たくない (not たいません), たかった (not たいました), たくなかった. Same pattern as adjectives like たかい/たかくない/たかかった.';
  list.appendChild(taiNote);

  // Kept as taught (2026-10-07) - this grid covers the Level 2 verbs only.
  const laterNote = document.createElement('div');
  laterNote.className = 'verb-conj-note';
  laterNote.innerHTML = '<strong>Later:</strong> for every verb, including newer ones, hold it on any word list and slide towards the bubble to see all its forms. the Grammar tab has "How verbs conjugate", and the dice page has a Verb forms drill.';
  list.appendChild(laterNote);
  showScreen('vocab-reference');
}

function showVerbConjugationReference() {
  showVerbConjugationReferenceFor(VERB_CONJUGATION_TABLE_CORE, 'Verb tense & affirmative/negative', 'kimasu');
}

// Object-taking verbs (Week 6) get their own screen rather than sharing the
// core one - see the comment above VERB_CONJUGATION_TABLE_CORE for why this
// is a real grammatical split (transitivity), not just an interface fix for
// a crowded pill row.
function showObjectVerbConjugationReference() {
  showVerbConjugationReferenceFor(VERB_CONJUGATION_TABLE_OBJECTS, 'Verb tense & affirmative/negative (object verbs)', 'tabemasu');
}

// ==== VERB FORMS (2026-10-07) ====
// One generator for every taught verb, so the hold-and-slide window, the
// Level 3 "How verbs conjugate" card and the dice page's Verb forms drill
// all grow on their own as verbs are added - nothing here lists verbs.
// A word counts as a verb if it carries a verbs-* tag (verbs-l2, verbs-l3,
// verbs-l4…) and is a single ます word, so set phrases that happen to end
// in ます (わかります, おねがいします - tagged greetings/phrase) never count.
// ます-form conjugation is completely regular (see the comment above
// VERB_CONJUGATION_TABLE_CORE), so the ます and たい forms are derived from
// the stem. Later forms (dictionary, て) can't be - かえります/ねます look
// alike but split differently, and きます/します are irregular - so those
// will need a verb-group field on each verb when they're taught.
// The Level 2 cards keep their own hand-written tables, as taught.
function isVerbItem(item) {
  return !!(item && item.jp && /ます$/.test(item.jp) && !/[\s、]/.test(item.jp) &&
    (item.tags || []).some(t => /^verbs(-|$)/.test(t)));
}

// Every taught verb, once each (a verb tagged into L2 and L3 is one verb).
function getTaughtVerbs() {
  const seen = new Set();
  return getCoreVocabPool().filter(item => {
    if (!isVerbItem(item) || seen.has(item.jp)) return false;
    seen.add(item.jp);
    return true;
  });
}

// Kanji spellings for the Level 2 verbs, which were taught (and stay) kana-
// only with no altForm. Used ONLY to accept a typed answer when a phone or
// Mac keyboard converts たべませんでした to 食べませんでした by itself - never
// shown. Level 3 verbs carry altForm already, which is used the same way.
const VERB_TYPING_KANJI = {
  'きます': ['来ます'], 'おわります': ['終わります'], 'おきます': ['起きます'], 'いきます': ['行きます'],
  'やすみます': ['休みます'], 'かえります': ['帰ります'], 'ねます': ['寝ます'], 'べんきょうします': ['勉強します'],
  'はたらきます': ['働きます'], 'たべます': ['食べます'], 'のみます': ['飲みます'], 'よみます': ['読みます'],
  'みます': ['見ます'], 'ききます': ['聞きます'], 'かきます': ['書きます'], 'かいます': ['買います'],
  'すいます': ['吸います'], 'とります': ['撮ります', '取ります'], 'あいます': ['会います'],
};

function verbKanjiSpellings(item) {
  const out = [...(VERB_TYPING_KANJI[item.jp] || [])];
  if (item.altForm && /ます$/.test(item.altForm)) out.push(item.altForm);
  return out;
}

// --- The hold-and-slide window ---
// Same overlay as the daily sentence (proverb-overlay/proverb-card), so it
// looks and closes the same way. Every form can be tapped to hear it.
function verbFormsGridHtml(f, keys) {
  const cell = k => `<div class="vf-cell" data-say="${f[k][0]}"><div class="vf-jp">${markSmallKana(f[k][0])}</div><div class="vf-ro">${f[k][1]}</div><div class="vf-en">${f[k][2]}</div></div>`;
  return `<div class="vf-grid">
      <div class="vf-head"></div><div class="vf-head">Affirmative</div><div class="vf-head">Negative</div>
      <div class="vf-rowlabel">Non-past</div>${cell(keys[0])}${cell(keys[1])}
      <div class="vf-rowlabel">Past</div>${cell(keys[2])}${cell(keys[3])}
    </div>`;
}

// One row of two forms with their own headings (the inviting pair).
function verbFormsPairHtml(f, a, b, la, lb) {
  const cell = k => `<div class="vf-cell" data-say="${f[k][0]}"><div class="vf-jp">${markSmallKana(f[k][0])}</div><div class="vf-ro">${f[k][1]}</div><div class="vf-en">${f[k][2]}</div></div>`;
  return `<div class="vf-grid">
      <div class="vf-head"></div><div class="vf-head">${la}</div><div class="vf-head">${lb}</div>
      <div class="vf-rowlabel"></div>${cell(a)}${cell(b)}
    </div>`;
}

function showVerbFormsPopup(item) {
  const overlay = document.getElementById('verb-forms-overlay');
  const body = document.getElementById('verb-forms-body');
  if (!overlay || !body || !isVerbItem(item)) return;
  const f = verbForms(item);
  body.innerHTML = `
    <div class="vf-title" data-say="${item.jp}">${markSmallKana(item.jp)}</div>
    <div class="vf-title-sub">${item.romaji} · ${item.en}${item.altForm ? ' · ' + markSmallKana(item.altForm) : ''}</div>
    <div class="vf-section">ます form</div>
    ${verbFormsGridHtml(f, ['nonPastAff', 'nonPastNeg', 'pastAff', 'pastNeg'])}
    <div class="vf-note">Non-past covers "now", "usually" and "will" — the time word tells you which.</div>
    <div class="vf-section">たい — want to</div>
    ${verbFormsGridHtml(f, ['taiAff', 'taiNeg', 'taiPast', 'taiPastNeg'])}
    <div class="vf-note">たい ends like an い-adjective: たい → たくない, たかった, たくなかった.</div>
    <div class="vf-section">Inviting — ませんか / ましょう</div>
    ${verbFormsPairHtml(f, 'invite', 'lets', 'Invitation', "Let's")}
    <div class="vf-note">Answer an invitation with ええ、いいですね or ええ、〜ましょう — or 〜は ちょっと… to say no politely.</div>`;
  body.querySelectorAll('[data-say]').forEach(el => { el.onclick = () => speakJapanese(el.dataset.say); });
  overlay._openedAt = Date.now(); // the lifting finger mustn't count as a tap outside
  body.parentElement.scrollTop = 0;
  overlay.classList.add('show');
  // Each form stays on one line: step its text down until it fits the cell
  // (narrow phones and べんきょうしませんでした would otherwise wrap mid-word).
  body.querySelectorAll('.vf-jp, .vf-ro').forEach(el => {
    let px = parseFloat(getComputedStyle(el).fontSize);
    while (el.scrollWidth > el.clientWidth && px > 9) { px -= 0.5; el.style.fontSize = px + 'px'; }
  });
}

function dismissVerbFormsPopup() {
  const overlay = document.getElementById('verb-forms-overlay');
  if (overlay) overlay.classList.remove('show');
}

// --- Level 3 card: how verbs conjugate (fixed, one worked example) ---
function showVerbConjugationL3Reference() {
  const list = l3RefOpen('How verbs conjugate (ます form)');
  l3Note(list, 'Every ます verb changes the same way. Take off ます and add the ending — no exceptions, します and きます included.');
  const ex = { jp: 'たべます', romaji: 'tabemasu', en: 'to eat', tags: ['verbs'] };
  const f = verbForms(ex);
  [['ます', 'nonPastAff'], ['ません', 'nonPastNeg'], ['ました', 'pastAff'], ['ませんでした', 'pastNeg']].forEach(([end, k]) => {
    l3Example(list, f[k][0], f[k][1], VERB_FORM_LABELS[k] + ' — ' + f[k][2]);
  });
  l3Note(list, 'Non-past covers "I eat", "I usually eat" and "I will eat" — a time word like まいにち or あした tells you which.');
  l3Heading(list, 'たい — "want to"');
  l3Note(list, 'Take off ます and add たい. たい then changes like an い-adjective, not a verb:');
  ['taiAff', 'taiNeg', 'taiPast', 'taiPastNeg'].forEach(k => l3Example(list, f[k][0], f[k][1], f[k][2]));
  l3Heading(list, 'ませんか / ましょう — inviting');
  l3Note(list, 'Take off ます and add ませんか to invite ("why don\'t we…?"), or ましょう for "let\'s…". The Inviting card has the replies.');
  ['invite', 'lets'].forEach(k => l3Example(list, f[k][0], f[k][1], f[k][2]));
  l3Heading(list, 'Every verb, one at a time');
  l3Note(list, 'On any verb list, <strong>hold a verb</strong> to hear it, then <strong>slide towards the bubble</strong> and let go to see all its forms.');
  l3Note(list, 'To practise, the dice page has <strong>Verb forms</strong>: spot the form, or turn on "Reverse the drill direction" to build it.');
  showScreen('vocab-reference');
}

// --- Dice page drill: Verb forms ---
// Forward: see たべませんでした, pick "Past negative". Reversed (the page's own
// "Reverse the drill direction" toggle): see "Past negative · たべます", pick
// the form. Wrong answers are always the same verb's other forms, so
// recognising the verb alone never gives the answer away. Scored per verb
// AND form, under keys of their own ('verbform:たべます|pastNeg') that never
// touch vocab scores, so these never turn up in Weakest/Untested 20.
function verbFormScoreItems() {
  const out = [];
  getTaughtVerbs().forEach(v => VERB_FORM_KEYS.forEach(k => out.push({ jp: 'verbform:' + v.jp, en: k, verb: v, form: k })));
  return out;
}

function buildVerbFormDeck(reverse, typed) {
  const picks = weightedSampleWithoutReplacement(verbFormScoreItems(), 20,
    it => selectionWeight(decayedScore(kanaScores[it.jp + '|' + it.en])));
  return picks.map(({ verb, form }) => {
    const f = verbForms(verb);
    const base = {
      disp: 'verbform', groupKey: 'verb-forms', verbForm: form, reverse: !!reverse,
      scoreKey: 'verbform:' + verb.jp + '|' + form,
      verbJp: verb.jp, verbRomaji: verb.romaji, verbEn: verb.en, formJp: f[form][0], formRomaji: f[form][1],
      // Kanji spelling of the form (食べませんでした), so a keyboard that
      // converts by itself is still marked right when typing.
      formKanji: verbKanjiSpellings(verb).map(k => k.replace(/ます$/, '') + f[form][0].slice(verb.jp.length - 2)),
      typed: !!(reverse && typed),
      hint: f[form][1] + ' — ' + f[form][2],
    };
    if (!reverse) {
      return Object.assign(base, {
        char: f[form][0], answer: VERB_FORM_LABELS[form],
        // Always in grid order (the same six labels every time), so the
        // answer's position is learnt as part of the pattern, not hunted for.
        options: VERB_FORM_KEYS.map(k => ({ value: VERB_FORM_LABELS[k], top: VERB_FORM_LABELS[k] })),
      });
    }
    return Object.assign(base, {
      char: VERB_FORM_LABELS[form] + ' · ' + verb.jp, answer: f[form][0],
      options: shuffle(VERB_FORM_KEYS.map(k => ({ value: f[k][0], top: f[k][0], sub: f[k][1], jp: true }))),
    });
  });
}

// ==== ADJECTIVES (L4, 2026-11-04) ====
// い-adjectives change their own ending (おもしろくないです, おもしろかったです);
// な-adjectives work like nouns (しずかじゃありません, しずかでした) and take な
// before a noun (しずかな まち). A word is a な-adjective when it carries the
// adj-na tag (vocab.js); every other adjective is an い-adjective. いい (and
// かっこいい) conjugate from よい: よくないです, よかったです.
function isAdjItem(item) {
  return !!(item && item.jp && !/[\s、〜]/.test(item.jp) && (item.tags || []).some(t => /^adjectives(-|$)/.test(t) || t === 'food-adjective' || t === 'adj-na'));
}

function isNaAdj(jp) {
  const it = typeof jp === 'string' ? l3TaughtItem(jp) : jp;
  if (it && (it.tags || []).includes('adj-na')) return true;
  return ['きれい', 'すてき'].includes(typeof jp === 'string' ? jp : (it && it.jp));
}

function getTaughtAdjectives() {
  const seen = new Set();
  return getCoreVocabPool().filter(item => {
    if (!isAdjItem(item) || !(item.tags || []).includes('taught') || seen.has(item.jp)) return false;
    seen.add(item.jp);
    return true;
  });
}

// All forms of one adjective item: { key: [jp, romaji, english] }.
function adjForms(item) {
  const e = adjEnWord(item.en), na = isNaAdj(item);
  if (na) return {
    pres: [item.jp + 'です', item.romaji + ' desu', 'is ' + e],
    presNeg: [item.jp + 'じゃありません', item.romaji + ' ja arimasen', "isn't " + e],
    past: [item.jp + 'でした', item.romaji + ' deshita', 'was ' + e],
    pastNeg: [item.jp + 'じゃありませんでした', item.romaji + ' ja arimasen deshita', "wasn't " + e],
    attr: [item.jp + 'な 〜', item.romaji + ' na ~', e + ' … (before a noun)'],
  };
  const [k, rk] = adjIStem(item.jp, item.romaji);
  return {
    pres: [item.jp + 'です', item.romaji + ' desu', 'is ' + e],
    presNeg: [k + 'くないです', rk + 'kunai desu', "isn't " + e],
    past: [k + 'かったです', rk + 'katta desu', 'was ' + e],
    pastNeg: [k + 'くなかったです', rk + 'kunakatta desu', "wasn't " + e],
    attr: [item.jp + ' 〜', item.romaji + ' ~', e + ' … (before a noun)'],
  };
}

// Kanji spellings of a form (難しくないです), so a keyboard that converts
// by itself is still marked right when typing.
function adjFormKanji(item, form) {
  if (!item.altForm || form === 'attr') return [];
  const f = adjForms(item)[form][0];
  if (isNaAdj(item)) return [item.altForm + f.slice(item.jp.length)];
  if (/いい$/.test(item.jp) || !/い$/.test(item.altForm)) return [];
  return [item.altForm.slice(0, -1) + f.slice(item.jp.length - 1)];
}

// --- Dice page drill: Adjective forms --- the Verb forms drill's twin
// (same question type, disp 'verbform' with adj: true). Wrong answers are the
// same adjective's other forms. Scored under 'adjform:…' keys of their own.
function adjFormScoreItems() {
  const out = [];
  getTaughtAdjectives().forEach(a => ADJ_FORM_KEYS.forEach(k => out.push({ jp: 'adjform:' + a.jp, en: k, adj: a, form: k })));
  return out;
}

function buildAdjFormDeck(reverse, typed) {
  const picks = weightedSampleWithoutReplacement(adjFormScoreItems(), 20,
    it => selectionWeight(decayedScore(kanaScores[it.jp + '|' + it.en])));
  return picks.map(({ adj, form }) => {
    const f = adjForms(adj);
    const kind = isNaAdj(adj) ? 'な-adjective' : 'い-adjective';
    const base = {
      disp: 'verbform', adj: true, kindWord: 'adjective', groupKey: 'adj-forms', verbForm: form, reverse: !!reverse,
      formLabel: ADJ_FORM_LABELS[form],
      scoreKey: 'adjform:' + adj.jp + '|' + form,
      verbJp: adj.jp, verbRomaji: adj.romaji, verbEn: adj.en + ' · ' + kind, formJp: f[form][0], formRomaji: f[form][1],
      formKanji: adjFormKanji(adj, form),
      typed: !!(reverse && typed && form !== 'attr'),
      hint: f[form][1] + ' — ' + f[form][2] + ' (' + kind + ')',
    };
    if (!reverse) {
      return Object.assign(base, {
        char: f[form][0], answer: ADJ_FORM_LABELS[form],
        options: ADJ_FORM_KEYS.map(k => ({ value: ADJ_FORM_LABELS[k], top: ADJ_FORM_LABELS[k] })),
      });
    }
    return Object.assign(base, {
      char: ADJ_FORM_LABELS[form] + ' · ' + adj.jp, answer: f[form][0],
      options: shuffle(ADJ_FORM_KEYS.map(k => ({ value: f[k][0], top: f[k][0], sub: f[k][1], jp: true }))),
    });
  });
}

function startAdjFormDrill() {
  if (!getTaughtAdjectives().length) return;
  lastSettingsScreen = 'match-settings';
  const reverse = !!vocabReversed;
  const typed = !!typeAnswerMode;
  lastDeckBuilder = () => buildAdjFormDeck(reverse, typed);
  deck = lastDeckBuilder();
  current = 0; score = 0; wrong = 0; hints = 0; answered = false; missed = []; missedItems = [];
  showScreen('drill');
  renderQuestion();
}

// Engine-produced particles that are blanked (へ is offered but the engine
// always writes に, so へ is only ever an accepted alternative).
const PARTICLE_BLANKABLE = ['は', 'を', 'に', 'で', 'と', 'の'];

let particleTimeWords = null;

function isParticleTimeWord(tok) {
  if (!tok) return false;
  if (/(じ|はん|ふん|ぷん)$/.test(tok)) return true; // くじ, ななじ はん, じゅっぷん
  if (!particleTimeWords) {
    particleTimeWords = new Set();
    Object.values(VOCAB).forEach(cat => (cat.items || []).forEach(i => {
      if ((i.tags || []).some(t => /^(time|days|months)/.test(t))) particleTimeWords.add(i.jp);
    }));
  }
  return particleTimeWords.has(tok);
}

function isParticleDay(tok) {
  return /ようび$/.test(tok || '');
}

function particleAlternatives(p, prev, next) {
  const motion = /^(いき|き|かえり)ま/.test(next || '');
  const meet = /^あいま/.test(next || '') && !isParticleTimeWord(prev);
  if (p === 'に' && motion && !isParticleTimeWord(prev)) return ['へ']; // destination: に or へ
  if (p === 'に' && meet) return ['と'];  // ともだちに / ともだちと あいます
  // A day of the week can take は as well as に (きんようびは なにを しますか is
  // just as natural), and the English can't tell them apart.
  if (p === 'に' && isParticleDay(prev)) return ['は'];
  if (p === 'と' && meet) return ['に'];
  return [];
}

function particleScoreItems() {
  return PARTICLE_BLANKABLE.map(p => ({ jp: 'particle', en: p }));
}

function buildParticleQuestion(lines, weightOf) {
  const toks = lines.map(l => l.jp.split(' '));
  const found = [];
  toks.forEach((ts, li) => ts.forEach((t, ti) => { if (PARTICLE_BLANKABLE.includes(t) && ti > 0) found.push({ li, ti, p: t }); }));
  if (!found.length) return null;
  // Pick which particle to test (weaker ones more often), then one place it occurs.
  const kinds = [...new Set(found.map(f => f.p))];
  const p = weightedSampleWithoutReplacement(kinds, 1, weightOf)[0];
  const spots = found.filter(f => f.p === p);
  const { li, ti } = spots[Math.floor(Math.random() * spots.length)];
  const ts = toks[li];
  // Romaji: the same occurrence of the same particle in the romaji line.
  const nth = ts.slice(0, ti).filter(t => t === p).length;
  const ro = lines[li].ro.split(' ');
  let seen = -1, roIdx = -1;
  ro.forEach((w, i) => { if (roIdx < 0 && w === PARTICLE_ROMAJI[p] && ++seen === nth) roIdx = i; });
  const roLines = lines.map((l, i) => i !== li ? l.ro : ro.map((w, j) => j === roIdx ? '___' : w).join(' '));
  const blankedJp = ts.map((t, j) => j === ti ? '＿' : t).join(' ');
  const alts = particleAlternatives(p, ts[ti - 1], ts[ti + 1]);
  return {
    disp: 'particle', groupKey: 'particles', answer: p, accepted: alts,
    scoreKey: 'particle|' + p,
    char: blankedJp,
    lines: lines.map((l, i) => ({ jp: l.jp, en: l.en, blank: i === li ? ti : -1 })),
    roBlank: roLines.join('  '),
    hint: alts.length ? alts.map(a => a + ' works here too').join(', ') : '',
  };
}

function buildParticleDeck() {
  const weightOf = p => selectionWeight(decayedScore(kanaScores['particle|' + p]));
  const deck = [], seen = new Set();
  for (let tries = 0; deck.length < 20 && tries < 400; tries++) {
    const lines = sgGenerate();
    if (!lines) continue;
    const q = buildParticleQuestion(lines, weightOf);
    if (!q || seen.has(q.char)) continue;
    seen.add(q.char);
    deck.push(q);
  }
  return deck;
}

function startParticleDrill() {
  lastSettingsScreen = 'match-settings';
  lastDeckBuilder = buildParticleDeck;
  deck = buildParticleDeck();
  if (!deck.length) return;
  current = 0; score = 0; wrong = 0; hints = 0; answered = false; missed = []; missedItems = [];
  showScreen('drill');
  renderQuestion();
}

function renderParticleQuestion(q, charDisplay, container) {
  charDisplay.style.fontFamily = "'BIZ UDPGothic', sans-serif";
  charDisplay.style.fontSize = '22px';
  charDisplay.innerHTML = q.lines.map(l => {
    const jp = l.jp.split(' ').map((t, j) => j === l.blank ? '<span class="pt-blank">　</span>' : '<span class="pt-tok">' + markSmallKana(t) + '</span>').join(' ');
    return `<div class="pt-line" data-say="${sayParticles(l.jp)}"><div class="pt-jp">${jp}</div><div class="pt-en">${l.en}</div></div>`;
  }).join('');
  // Once answered, tap a line to hear the whole sentence.
  charDisplay.querySelectorAll('.pt-line').forEach(el => { el.onclick = () => { if (answered) speakJapanese(el.dataset.say); }; });
  document.getElementById('q-prompt').textContent = 'Which particle goes in the gap?';
  const speakBtn = document.getElementById('speak-btn');
  if (speakBtn) speakBtn.style.display = 'none'; // saying it would give the answer away
  const romajiBtn = document.getElementById('romaji-btn');
  if (romajiBtn) { romajiBtn.style.display = 'inline-flex'; romajiBtn.disabled = false; romajiBtn.title = 'Show romaji'; }
  container.classList.add('pt-options');
  PARTICLE_SET.forEach((p, idx) => {
    const btn = document.createElement('button');
    btn.className = 'opt';
    btn.innerHTML = `<span class="opt-num">${idx + 1}</span><span class="opt-jp">${p}</span><span class="opt-en">${PARTICLE_ROMAJI[p]}</span>`;
    btn.dataset.value = p;
    // An accepted alternative counts as the answer itself.
    btn.onclick = () => choose(btn, (q.accepted || []).includes(p) ? q.answer : p, q.answer, q.char);
    container.appendChild(btn);
  });
}

// ==== SMALL っ (2026-10-13, L3 Lesson 3 double-consonant sheet) ====
// Dice page. Pairs of real words that differ only by a small っ. With sound
// on: hear one, pick it. With sound off: read its romaji (kitte), pick the
// kana. The two buttons are always in the same order (without っ first), and
// show the English underneath, never the romaji. Scored per word
// ('sokuon|きって'), separate from vocab scores.
const SOKUON_PAIRS = [
  ['きて', 'kite', 'come (て form)', 'きって', 'kitte', 'postage stamp'],
  ['いた', 'ita', 'board / plank', 'いった', 'itta', 'went (casual)'],
  ['にし', 'nishi', 'west', 'にっし', 'nisshi', 'journal / log'],
  ['かこ', 'kako', 'the past', 'かっこ', 'kakko', 'brackets'],
  ['さか', 'saka', 'slope / hill', 'さっか', 'sakka', 'author'],
  ['おと', 'oto', 'sound', 'おっと', 'otto', 'my husband'],
  ['もと', 'moto', 'origin / former', 'もっと', 'motto', 'more'],
  ['ねこ', 'neko', 'cat', 'ねっこ', 'nekko', 'root'],
  ['かた', 'kata', 'shoulder', 'かった', 'katta', 'bought (casual)'],
  ['さき', 'saki', 'ahead / tip', 'さっき', 'sakki', 'a moment ago'],
  ['よか', 'yoka', 'spare time', 'よっか', 'yokka', 'the 4th (of the month)'],
  ['せけん', 'seken', 'society / the world', 'せっけん', 'sekken', 'soap'],
  ['はけん', 'haken', 'sending staff (dispatch)', 'はっけん', 'hakken', 'discovery'],
];

function sokuonScoreItems() {
  const out = [];
  SOKUON_PAIRS.forEach(p => { out.push({ jp: 'sokuon', en: p[0] }); out.push({ jp: 'sokuon', en: p[3] }); });
  return out;
}

function buildSokuonDeck() {
  const words = [];
  SOKUON_PAIRS.forEach(p => {
    const pair = [{ jp: p[0], romaji: p[1], en: p[2] }, { jp: p[3], romaji: p[4], en: p[5] }];
    pair.forEach(w => words.push({ w, pair }));
  });
  const picks = weightedSampleWithoutReplacement(words, 20, x => selectionWeight(decayedScore(kanaScores['sokuon|' + x.w.jp])));
  return picks.map(({ w, pair }) => ({
    disp: 'sokuon', groupKey: 'sokuon', scoreKey: 'sokuon|' + w.jp,
    char: w.jp, answer: w.jp, romaji: w.romaji, en: w.en, pair,
  }));
}

function startSokuonDrill() {
  lastSettingsScreen = 'match-settings';
  lastDeckBuilder = buildSokuonDeck;
  deck = buildSokuonDeck();
  current = 0; score = 0; wrong = 0; hints = 0; answered = false; missed = []; missedItems = [];
  showScreen('drill');
  renderQuestion();
}

function renderSokuonQuestion(q, charDisplay, container) {
  const speakBtn = document.getElementById('speak-btn');
  if (speakBtn) speakBtn.style.display = 'none';
  const romajiBtn = document.getElementById('romaji-btn');
  if (romajiBtn) romajiBtn.style.display = 'none';
  charDisplay.onclick = null;
  charDisplay.style.cursor = '';
  if (soundAllowed()) {
    const say = () => speakJapanese(q.answer);
    charDisplay.innerHTML = `<button type="button" class="listen-play" aria-label="Play again">${LISTEN_ICON}</button>`;
    charDisplay.querySelector('.listen-play').onclick = say;
    document.getElementById('q-prompt').textContent = 'Which word did you hear? Listen for the little pause';
    setTimeout(() => { if (deck[current] === q && !answered) say(); }, 120);
  } else {
    charDisplay.style.fontFamily = "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";
    charDisplay.style.fontSize = '56px';
    charDisplay.textContent = q.romaji;
    document.getElementById('q-prompt').textContent = 'Which one is this? A doubled letter means a small っ';
  }
  container.classList.add('sk-options');
  q.pair.forEach((w, idx) => {
    const btn = document.createElement('button');
    btn.className = 'opt';
    btn.innerHTML = `<span class="opt-num">${idx + 1}</span><span class="opt-jp">${markSmallKana(w.jp)}</span><span class="opt-en">${w.en}</span>`;
    btn.dataset.value = w.jp;
    btn.onclick = () => choose(btn, w.jp, q.answer, q.char);
    container.appendChild(btn);
  });
}

function startVerbFormDrill() {
  if (!getTaughtVerbs().length) return;
  lastSettingsScreen = 'match-settings';
  const reverse = !!vocabReversed;
  const typed = !!typeAnswerMode; // only used reversed: type the form
  lastDeckBuilder = () => buildVerbFormDeck(reverse, typed);
  deck = lastDeckBuilder();
  current = 0; score = 0; wrong = 0; hints = 0; answered = false; missed = []; missedItems = [];
  showScreen('drill');
  renderQuestion();
}
