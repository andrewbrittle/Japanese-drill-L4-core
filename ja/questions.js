// Japanese - its question kinds as the core's question types (2026-11-08,
// step 3 of the move onto the core). Each kind of question Japanese asks
// (kana, kanji, words, numbers, times, counters, verb forms, particles,
// small っ) is registered here, and the core's drill screen (renderQuestion,
// choose in core/questions.js) draws and marks it. The drawing is moved
// across unchanged from Japanese's own renderQuestion; what used to be its
// one long if/else is now one type per kind.
//
// Loaded after ja/legacy.js, which still holds the helpers these call
// (markSmallKana, renderVerbFormQuestion, chooseTypedJapanese...).

// ---- Shared by every Japanese question ------------------------------------

// The badge over the question: what kind it is ("word reading", "small っ"),
// or for kana and kanji, which group.
function jaBadge(q) {
  return q.disp === 'number' ? 'numbers' : q.disp === 'word' ? 'word reading' : q.disp === 'time' ? 'time reading' : q.disp === 'counter' ? 'counter reading' : q.disp === 'verbform' ? (q.adj ? 'adjective forms' : 'verb forms') : q.disp === 'particle' ? 'particles' : q.disp === 'sokuon' ? 'small っ' : (BADGE_LABELS[q.groupKey] || q.groupKey);
}
function jaBadgeClass(q) {
  if (q.disp === 'diacritic') return 'diacritic';
  if (q.disp === 'kanji') return 'kanji';
  if (q.disp === 'survival') return 'survival';
  if (q.disp === 'number' || q.disp === 'time' || q.disp === 'counter' || q.disp === 'verbform' || q.disp === 'particle' || q.disp === 'sokuon') return 'kanji';
  return 'base';
}

// What follows "Correct!" / "Not quite": the question's hint (not for a word
// drilled by meaning), a kanji's example word, and - informational only, no
// effect on scoring - "Normally shown as" when the drilled form isn't the
// one you'd usually see written (げつようび is right, but 月曜日 is what
// turns up), or "Also seen as".
// (Where it was seen isn't repeated here: the context card sits between
// the feedback and Next, so it's already the next thing in view.)
function jaFeedbackExtra(q) {
  const suppressHint = q.disp === 'word' && drillByMeaning;
  let hint = (q.hint && !suppressHint) ? ` (${q.hint})` : '';
  if (!hint && !q.altForm && (q.disp === 'kanji' || q.disp === 'survival')) {
    const compoundWord = KANJI_COMPOUND[q.char + '|' + q.answer];
    if (compoundWord) hint = ` (example: ${compoundWord})`;
  }
  const standardNote = (q.altIsStandard && q.altForm)
    ? `<div class="feedback-standard-note">Normally shown as: ${markSmallKana(q.altForm)}</div>`
    : (q.altAfterAnswer && q.altForm)
    ? `<div class="feedback-standard-note">Also seen as: ${markSmallKana(q.altForm)}</div>`
    : '';
  return hint + standardNote;
}

// How the right answer is shown after a miss: in hiragana when a katakana
// question is showing hiragana options; with small kana sized right when the
// answer is Japanese (a reversed word, a reversed verb form).
function jaAnswerHtml(q, answer) {
  const isKanaItem = q.disp === 'base' || q.disp === 'diacritic' || q.disp === 'youon';
  const showingHiragana = !reversed && showHiraganaOnKatakana && isKanaItem &&
    q.groupKey && q.groupKey.startsWith('katakana-');
  const displayAnswer = showingHiragana ? (ROMAJI_TO_HIRAGANA[answer] || answer) : answer;
  const reversedWordItem = (q.disp === 'word' && vocabReversed) || (q.disp === 'verbform' && q.reverse);
  return reversedWordItem ? markSmallKana(displayAnswer) : displayAnswer;
}

const SANS = "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";
const JP_FONT = "'BIZ UDPGothic', sans-serif";

function registerJaType(t) {
  registerQuestionType(Object.assign({
    badge: jaBadge, badgeClass: jaBadgeClass,
    // Where a word was seen (photographed signs and menus) shows with every
    // kind of question, badge or not.
    keepsContext: true,
    feedbackExtra: jaFeedbackExtra,
    answerHtml: jaAnswerHtml,
    scoring: 'item',
  }, t));
}

// Choice buttons: one per option, the value it answers with, its content.
function jaOptions(container, opts, q, html, value) {
  opts.forEach((o, idx) => {
    const btn = document.createElement('button');
    btn.className = 'opt';
    btn.innerHTML = html(o, idx);
    const val = value(o);
    btn.dataset.value = val;
    btn.onclick = () => choose(btn, val, q.answer, q.char);
    container.appendChild(btn);
  });
}

// ---- Kana and kanji -----------------------------------------------------------
// Kana and kanji questions aren't kept for Drill missed only: it builds them
// again from the missed list instead.

function renderKanaKanjiQuestion(q, ui) {
  const { charDisplay, container, promptEl } = ui;
  const isKanjiLike = q.disp === 'kanji' || q.disp === 'survival';
  if (!isKanjiLike && reversed) {
    // Romaji -> kana: 4 distinct kana, the answer and 3 others from the
    // groups in this deck (so there are always enough to choose from).
    charDisplay.style.fontFamily = SANS;
    charDisplay.style.fontSize = '56px';
    charDisplay.textContent = q.answer;
    promptEl.textContent = 'Which character is this?';
    const poolGroups = [...new Set(deck.map(item => item.groupKey))];
    let pool = [];
    poolGroups.forEach(gk => { pool.push(...DATA[gk]); });
    // Fallback: if the pool is too small (shouldn't happen), all kana.
    if (pool.length < 4) {
      [...HIRAGANA_KEYS, ...KATAKANA_KEYS].forEach(gk => { pool.push(...DATA[gk]); });
    }
    const otherChars = pool.map(item => item.char).filter(c => c !== q.char);
    const distractors = shuffle([...new Set(otherChars)]).slice(0, 3);
    const opts = shuffle([q.char, ...distractors]);
    opts.forEach((kanaChar, idx) => {
      const btn = document.createElement('button');
      btn.className = 'opt';
      btn.style.fontFamily = JP_FONT;
      btn.style.fontSize = '28px';
      btn.innerHTML = `<span class="opt-num">${idx + 1}</span>${markSmallKana(kanaChar)}`;
      btn.dataset.value = kanaChar;
      btn.onclick = () => choose(btn, kanaChar, q.char, q.char);
      container.appendChild(btn);
    });
    return;
  }
  // Character -> romaji (kana) or meaning (kanji).
  charDisplay.style.fontFamily = JP_FONT;
  const len = [...q.char].length;
  charDisplay.style.fontSize = len <= 2 ? '100px' : len === 3 ? '72px' : '56px';
  charDisplay.innerHTML = markSmallKana(q.char);
  promptEl.textContent = isKanjiLike ? 'What does this kanji mean?' : 'What is this character?';
  const showHiragana = !isKanjiLike && showHiraganaOnKatakana && q.groupKey && q.groupKey.startsWith('katakana-');
  const opts = shuffle(q.options);
  opts.forEach((o, idx) => {
    const btn = document.createElement('button');
    btn.className = 'opt';
    const val = isKanjiLike ? o.en : o;
    btn.dataset.value = val;
    if (isKanjiLike) {
      const rdDisplay = showHiraganaOnKanji ? (KANJI_READINGS[o.jp + '|' + o.en] || o.rd) : o.rd;
      btn.innerHTML = `<span class="opt-num">${idx + 1}</span><span class="opt-rd">${o.en}</span><span class="opt-en">(${markSmallKana(rdDisplay)})</span>`;
    } else if (showHiragana) {
      btn.style.fontFamily = JP_FONT;
      btn.style.fontSize = '28px';
      btn.innerHTML = `<span class="opt-num">${idx + 1}</span>${markSmallKana(ROMAJI_TO_HIRAGANA[o] || o)}`;
    } else {
      btn.innerHTML = `<span class="opt-num">${idx + 1}</span>${o}`;
    }
    btn.onclick = () => choose(btn, val, q.answer, q.char);
    container.appendChild(btn);
  });
}
['base', 'diacritic', 'youon', 'kanji', 'survival'].forEach(id =>
  registerJaType({ id, render: renderKanaKanjiQuestion, missedItem: false }));

// ---- Words ----------------------------------------------------------------------

registerJaType({
  id: 'word',
  render: (q, ui) => {
    const { charDisplay, container, promptEl } = ui;
    if (vocabReversed) {
      // Reversed: the prompt is always the English meaning and the options
      // are Japanese. Not tied to drill by meaning (that's forward only).
      // q.char stays the Japanese throughout (scoring and hints read it);
      // only what's shown as the prompt changes.
      const promptText = q.answerEn;
      charDisplay.style.fontFamily = SANS;
      const len = promptText.length;
      charDisplay.style.fontSize = len <= 8 ? '56px' : len <= 16 ? '40px' : '30px';
      charDisplay.textContent = promptText;
      promptEl.textContent = typeAnswerMode ? 'Type this in Japanese' : 'Which word matches this meaning?';
      q.answer = q.char;
      if (typeAnswerMode) {
        renderTypeAnswerInput(container, 'type it in Japanese…', raw => chooseTypedJapanese(raw, q), true);
        return;
      }
      // The line under each option must not be the prompt's own field, or
      // the answer could be found by matching text without reading any
      // Japanese - the prompt is English, so it's the romaji.
      jaOptions(container, q.options, q,
        (o, idx) => `<span class="opt-num">${idx + 1}</span><span class="opt-rd opt-kana" style="font-size:${optKanaSize(o.jp)}px">${markSmallKana(o.jp)}</span><span class="opt-en">(${o.rd})</span>`,
        o => o.jp);
      return;
    }
    charDisplay.style.fontFamily = JP_FONT;
    const len = [...q.char].length;
    charDisplay.style.fontSize = len <= 4 ? '72px' : len <= 6 ? '56px' : '40px';
    charDisplay.innerHTML = markSmallKana(q.char);
    promptEl.textContent = drillByMeaning ? 'What does this word mean?' : 'How do you read this word?';
    if (listenMode && soundAllowed()) renderListenPrompt(q, charDisplay);
    const topField = drillByMeaning ? 'en' : 'rd';
    const bottomField = drillByMeaning ? 'rd' : 'en';
    q.answer = drillByMeaning ? q.answerEn : q.answerRomaji;
    if (typeAnswerMode) {
      // Typing rules out drill by meaning, so this always asks for the reading.
      renderTypeAnswerInput(container, 'type the romaji…', raw => chooseTyped(raw, q.answer, q.char), false);
      return;
    }
    jaOptions(container, q.options, q,
      (o, idx) => `<span class="opt-num">${idx + 1}</span><span class="opt-rd">${o[topField]}</span><span class="opt-en">(${o[bottomField]})</span>`,
      o => o[topField]);
  },
});

// ---- Numbers, times, counters (scored in small steps) -------------------------

registerJaType({
  id: 'number', scoring: 'consistency',
  render: (q, { charDisplay, container, promptEl }) => {
    charDisplay.style.fontFamily = SANS;
    charDisplay.style.fontSize = '72px';
    charDisplay.textContent = q.char;
    promptEl.textContent = 'How do you read this number in Japanese?';
    jaOptions(container, q.options, q,
      (o, idx) => `<span class="opt-num">${idx + 1}</span><span class="opt-jp">${markSmallKana(o.en)}</span><span class="opt-rd">${numReadingToRomaji(o.en)}</span>`,
      o => o.en);
  },
});
registerJaType({
  id: 'time', scoring: 'consistency',
  render: (q, { charDisplay, container, promptEl }) => {
    charDisplay.style.fontFamily = SANS;
    const len = q.char.length;
    charDisplay.style.fontSize = len <= 8 ? '56px' : len <= 13 ? '40px' : '36px';
    charDisplay.textContent = q.char;
    promptEl.textContent = 'How do you say this time in Japanese?';
    jaOptions(container, q.options, q,
      (o, idx) => `<span class="opt-num">${idx + 1}</span><span class="opt-jp">${markSmallKana(o.jp)}</span><span class="opt-rd">${o.rd}</span>`,
      o => o.en);
  },
});
// The mirror image of numbers and times: those test reading the number;
// this tests the counter, so the prompt is the reading (in romaji - kana
// would bring reading back in) and the options are English, one per
// counter in play this round.
registerJaType({
  id: 'counter', scoring: 'consistency',
  render: (q, { charDisplay, container, promptEl }) => {
    charDisplay.style.fontFamily = SANS;
    const len = q.char.length;
    charDisplay.style.fontSize = len <= 8 ? '56px' : len <= 14 ? '44px' : '34px';
    charDisplay.textContent = q.char;
    promptEl.textContent = 'What is this counter counting, and how many?';
    jaOptions(container, q.options, q,
      (o, idx) => `<span class="opt-num">${idx + 1}</span><span class="opt-rd">${o.en}</span>`,
      o => o.en);
  },
});

// ---- Verb forms, particles, small っ -------------------------------------------

registerJaType({ id: 'verbform', render: (q, ui) => renderVerbFormQuestion(q, ui.charDisplay, ui.container) });
registerJaType({ id: 'sokuon', render: (q, ui) => renderSokuonQuestion(q, ui.charDisplay, ui.container) });
registerJaType({
  id: 'particle',
  render: (q, ui) => renderParticleQuestion(q, ui.charDisplay, ui.container),
  // Fill the gap; accepted alternatives light up too, so it's clear both
  // are right.
  reveal: q => {
    const answer = q.answer;
    const blank = document.querySelector('#q-char .pt-blank');
    if (blank) { blank.textContent = answer; blank.classList.add('filled'); }
    (q.accepted || []).forEach(a => {
      const b = document.querySelector(`#q-options .opt[data-value="${a}"]`);
      if (b) b.classList.add('correct');
    });
  },
});

// ---- Shown with every question (APP.beforeQuestion) ----------------------------

function jaBeforeQuestion(q, ui) {
  const reversedWordItem = q.disp === 'word' && vocabReversed;
  // "also written:" - held back for altIsStandard (it becomes "Normally
  // shown as" after answering, so it isn't shown twice), for altAfterAnswer
  // (loanwords now in katakana keep the early hiragana spelling, which would
  // give the reading away), and on any reversed word (Japanese shown before
  // answering would give away what's being tested).
  const altEl = document.getElementById('q-alt-form');
  if (altEl) {
    if (q.altForm && !q.altIsStandard && !q.altAfterAnswer && !reversedWordItem) {
      altEl.innerHTML = 'also written: ' + markSmallKana(q.altForm);
      altEl.style.display = 'block';
    } else {
      altEl.style.display = 'none';
    }
  }

  // The romaji button: forward word questions only. A kanji word has it
  // greyed out only when there's no reading breakdown and no recorded reason
  // why not. The revealed reading always starts hidden, so it can never
  // carry over from the previous question.
  const romajiBtn = document.getElementById('romaji-btn');
  if (romajiBtn) {
    const eligible = q.disp === 'word' && !vocabReversed && q.answerRomaji;
    romajiBtn.style.display = eligible ? 'inline-flex' : 'none';
    const hasKanji = eligible && KANJI_CHAR_RE.test(q.char);
    romajiBtn.disabled = hasKanji && !q.kanjiReading && !q.kanjiReadingBlocked;
    romajiBtn.title = romajiBtn.disabled
      ? 'Reading breakdown not available yet for this word'
      : (hasKanji && !q.kanjiReading ? 'Show reading breakdown (or why it\'s not available)' : 'Show romaji');
  }
  const romajiReveal = document.getElementById('q-romaji-reveal');
  if (romajiReveal) {
    romajiReveal.style.display = 'none';
    romajiReveal.textContent = '';
  }

  // The particle drill's 4-across layout and small っ's big kana are set by
  // those questions only.
  ui.container.classList.remove('pt-options');
  ui.container.classList.remove('sk-options');

  // Counter quiz: which counters are in play this round (the prompt and
  // options don't say). One unbreakable chip per counter; "(general)" is
  // left to the selection screen.
  const reminderEl = document.getElementById('q-counter-quiz-reminder');
  if (reminderEl) {
    if (q.disp === 'counter' && q.quizCounters) {
      reminderEl.innerHTML = '<span class="cq-testing">Testing:</span> ' + q.quizCounters.map(k => {
        const unit = COUNTER_ITEM_UNITS[k];
        const desc = unit.desc.replace(/\s*\(general\)$/, '');
        return '<span class="cq-chip">' + markSmallKana(unit.label + ' ' + desc) + '</span>';
      }).join(' ');
      reminderEl.style.display = 'block';
    } else {
      reminderEl.style.display = 'none';
    }
  }
}
