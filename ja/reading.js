// Japanese - reading passages and desk sheets (2026-11-08, step 7 of the
// move onto the core): short passages made from the sentence engine with
// questions on them, and the printable desk sheets. Loaded before
// ja/legacy.js.

// ==== READING PASSAGES (L4, 2026-11-04) ====
// Like the handouts' reading tasks: a short diary of one day (four or five
// linked sentences, all from the engine's own words and rules), then four
// English statements to mark true or false. Every statement comes from one
// fact in the passage; a false one changes that single detail.
function rpEn(jp, fallback) { const it = l3TaughtItem(jp); return it ? beingEnWord(it) : fallback || jp; }

function rpPassage() {
  // Day
  const days = [['きのう', 'yesterday', ''], ['どようび', 'on Saturday', 'に'], ['にちようび', 'on Sunday', 'に'], ['せんしゅうの どようび', 'last Saturday', 'に']]
    .filter(d => sgW(d[0].split(' ').pop()) && (d[0].indexOf(' ') < 0 || sgW('せんしゅう')));
  const day = sgPick(days);
  if (!day) return null;
  const dayJp = day[0] + (day[2] ? day[2] : ''), dayRo = day[0].split(' ').map(x => sgW(x) ? sgW(x).ro : 'no').join(' ') + (day[2] ? ' ni' : '');
  // Where: a destination that's also a place where something happens
  const placeActs = Object.keys(SG_DEST).filter(d => sgW(d) && !['work', 'weekday', 'church'].includes(SG_DEST[d][1]))
    .map(d => ({ d, acts: SG_OBJECT_VERBS.filter(V => !V.intrans && !V.routine && !V.workObj && sgW(V.v) && V.places.includes(d) && V.objs.some(o => sgW(o[0]))) }))
    .filter(x => x.acts.length);
  const pa = sgPick(placeActs);
  if (!pa) return null;
  const dest = pa.d, destEn = SG_DEST[dest][0], kind = SG_DEST[dest][1];
  const V = sgPick(pa.acts), objs = V.objs.filter(o => sgW(o[0])), o = sgPick(objs);
  const tr = sgPick(SG_TRANSPORT.filter(t => sgW(t[0]) && !t[2]));
  const comp = sgCompanion({ me: true, segs: [] }, dest, kind === 'bar', false);
  if (!tr || !comp) return null;
  const compSegs = comp.segs || [comp.seg];
  const lines = [], facts = [];
  const J = segs => segs.map(x => l3cJp(x)).join(' ');
  const R = segs => segs.map(x => x.ro).join(' ');
  // 1. went there
  const go = sgVerb('いきます', 'past', false);
  lines.push({ jp: `${dayJp} ${J(compSegs)} ${tr[0]}で ${dest}に ${go.jp}。`, ro: sgCap(`${dayRo} ${R(compSegs)} ${sgW(tr[0]).ro} de ${sgW(dest).ro} ni ${go.ro}.`), en: `${sgCap(day[1])}, I went ${destEn} ${comp.en} ${tr[1]}.` });
  const alt = (list, cur) => sgPick(list.filter(x => x !== cur));
  const otherTr = alt(SG_TRANSPORT.filter(t => sgW(t[0]) && !t[2]).map(t => t[1]), tr[1]);
  facts.push({ t: `I went ${destEn} ${tr[1]}.`, f: otherTr && `I went ${destEn} ${otherTr}.` });
  if (comp.en !== 'on my own') facts.push({ t: `I went ${comp.en}.`, f: 'I went on my own.' });
  else facts.push({ t: 'I went on my own.', f: 'I went with a friend.' });
  // 2. did something there
  const vb = sgVerb(V.v, 'past', false), ph = sgActPhrase(V, o, 'past');
  lines.push({ jp: `${dest}で ${o[0]}を ${vb.jp}。`, ro: sgCap(`${sgW(dest).ro} de ${sgW(o[0]).ro} o ${vb.ro}.`), en: sgCap(`I ${sgVerbEn(ph, 'past')} ${sgPlaceEnSafe(dest)}.`) });
  const o2 = alt(objs, o);
  facts.push({ t: sgCap(`I ${sgVerbEn(ph, 'past')} ${sgPlaceEnSafe(dest)}.`), f: o2 && sgCap(`I ${sgVerbEn(sgActPhrase(V, o2, 'past'), 'past')} ${sgPlaceEnSafe(dest)}.`) });
  // 3. a comment on it, if there's a describing word for that thing or place
  const g = BEING_THINGS.find(x => x.objs.includes(o[0])) || BEING_THINGS.find(x => x.objs.includes(dest));
  if (g) {
    const thing = g.objs.includes(o[0]) ? o[0] : dest;
    const adjs = g.adjs.filter(a => sgW(a) && beingAdjFits(thing, a));
    const a = sgPick(adjs.filter(x => SG_BUT_GOOD.includes(x))) || sgPick(adjs);
    if (a) {
      const isI = beingIsI(a), pa2 = isI ? beingIForm(a, sgW(a).ro, 5) : [a, sgW(a).ro];
      const deg = sgChance(0.4) && sgW('とても');
      const tEn = beingTopicEn(thing), plural = /^the \S.*s$/i.test(tEn) && !/(ss|us)$/i.test(tEn);
      lines.push({ jp: `${thing}は ${deg ? 'とても ' : ''}${pa2[0]}${isI ? 'です' : 'でした'}。`, ro: sgCap(`${sgW(thing).ro} wa ${deg ? 'totemo ' : ''}${pa2[1]} ${isI ? 'desu' : 'deshita'}.`), en: sgCap(`${tEn} ${plural ? 'were' : 'was'} ${deg ? 'very ' : ''}${beingAdjEn(a)}.`) });
      facts.push({ t: sgCap(`${tEn} ${plural ? 'were' : 'was'} ${beingAdjEn(a)}.`), f: sgCap(`${tEn} ${plural ? "weren't" : "wasn't"} ${beingAdjEn(a)}.`) });
    }
  }
  // 4. then something at home, or home
  const homeActs = SG_OBJECT_VERBS.filter(H => !H.intrans && !H.routine && !H.workObj && sgW(H.v) && H.places.includes('うち') && H !== V && H.objs.some(x => sgW(x[0])));
  if (sgW('それから') && homeActs.length && sgChance(0.75)) {
    const H = sgPick(homeActs), ho = sgPick(H.objs.filter(x => sgW(x[0]))), hv = sgVerb(H.v, 'past', false), hph = sgActPhrase(H, ho, 'past');
    lines.push({ jp: `それから うちで ${ho[0]}を ${hv.jp}。`, ro: `Sorekara uchi de ${sgW(ho[0]).ro} o ${hv.ro}.`, en: sgCap(`After that, I ${sgVerbEn(hph, 'past')} at home.`) });
    const H2 = sgPick(homeActs.filter(x => x !== H && x.v !== H.v));
    const ho2 = H2 && sgPick(H2.objs.filter(x => sgW(x[0])));
    facts.push({ t: sgCap(`After that, I ${sgVerbEn(hph, 'past')} at home.`), f: ho2 && sgCap(`After that, I ${sgVerbEn(sgActPhrase(H2, ho2, 'past'), 'past')} at home.`) });
  } else if (sgW('かえります')) {
    const kv = sgVerb('かえります', 'past', false);
    lines.push({ jp: `${sgW('ごご') ? 'ごご ' : ''}うちに ${kv.jp}。`, ro: sgCap(`${sgW('ごご') ? 'gogo ' : ''}uchi ni ${kv.ro}.`), en: `${sgW('ごご') ? 'In the afternoon, I' : 'I'} went home.` });
  }
  // Four statements, each true or false at random.
  const claims = shuffle(facts.filter(f => f.t && f.f)).slice(0, 4).map(f => { const truth = sgChance(0.5); return { en: truth ? f.t : f.f, truth }; });
  if (claims.length < 3) return null;
  return { title: day[0], lines, claims };
}

const sgPlaceEnSafe = p => (SG_PLACE_EN[p] && SG_PLACE_EN[p][0]) || 'at ' + rpEn(p);

let rpCur = null, rpShow = { ro: false, en: false }, rpStats = { right: 0, total: 0 };

function showReadingPassage() {
  for (let i = 0; i < 30 && !(rpCur = rpPassage()); i++);
  rpShow = { ro: false, en: false };
  const list = l3RefOpen('Reading passage');
  vocabRefBackTarget = 'build';
  list.className = 'tight-list rp-wrap';
  rpRender();
  showScreen('vocab-reference');
  window.scrollTo(0, 0);
}

function rpRender() {
  const list = document.getElementById('vocab-ref-list');
  if (!list || !rpCur) return;
  const done = rpCur.claims.every(c => c.ans !== undefined);
  const say = t => t.replace(/'/g, '');
  list.innerHTML = `
    <div class="verb-conj-note">Read the diary, then decide whether each sentence underneath is true or false. Tap a line to hear it.</div>
    <div class="rp-passage">
      <div class="rp-title">${markSmallKana(rpCur.title)}</div>
      ${rpCur.lines.map(l => `<div class="rp-line" onclick="speakJapanese('${say(l.jp.replace(/\s/g, ''))}')"><div class="rp-jp">${markSmallKana(l.jp)}</div>${rpShow.ro || done ? `<div class="rp-ro">${l.ro}</div>` : ''}${rpShow.en || done ? `<div class="rp-en">${l.en}</div>` : ''}</div>`).join('')}
    </div>
    <div class="ds-buttons">
      <button type="button" class="ds-btn" onclick="speakJapanese('${say(rpCur.lines.map(l => l.jp.replace(/\s/g, '')).join(''))}')">🔊 Hear it all</button>
      ${done ? '' : `<button type="button" class="ds-btn" onclick="rpShow.ro=!rpShow.ro;rpRender()">${rpShow.ro ? 'Hide' : 'Show'} romaji</button><button type="button" class="ds-btn" onclick="rpShow.en=!rpShow.en;rpRender()">${rpShow.en ? 'Hide' : 'Show'} English</button>`}
    </div>
    <div class="rp-claims">
      ${rpCur.claims.map((c, k) => {
        const res = c.ans === undefined ? '' : c.ans === c.truth ? ' rp-right' : ' rp-wrong';
        return `<div class="rp-claim${res}"><div class="rp-claim-en">${k + 1}. ${c.en}</div><div class="rp-tf">
          <button type="button" class="rp-btn${c.ans === true ? ' active' : ''}" onclick="rpAnswer(${k}, true)" ${c.ans !== undefined ? 'disabled' : ''}>True</button>
          <button type="button" class="rp-btn${c.ans === false ? ' active' : ''}" onclick="rpAnswer(${k}, false)" ${c.ans !== undefined ? 'disabled' : ''}>False</button></div>
          ${c.ans !== undefined ? `<div class="rp-verdict">${c.ans === c.truth ? 'Right' : 'Not this time'} — it's ${c.truth ? 'true' : 'false'}.</div>` : ''}</div>`;
      }).join('')}
    </div>
    ${done ? `<div class="sb-verdict${rpCur.claims.every(c => c.ans === c.truth) ? ' good' : ''}">${rpCur.claims.filter(c => c.ans === c.truth).length} of ${rpCur.claims.length} right · this session ${rpStats.right} of ${rpStats.total}</div>` : ''}
    <div class="ds-buttons"><button type="button" class="ds-btn ds-btn-main" onclick="showReadingPassage()">${done ? 'Next passage →' : 'A different passage'}</button></div>`;
}

function rpAnswer(k, val) {
  const c = rpCur && rpCur.claims[k];
  if (!c || c.ans !== undefined) return;
  c.ans = val;
  rpStats.total++; if (val === c.truth) rpStats.right++;
  rpRender();
}

// ==== DESK SHEETS (2026-10-13) ====
// Two printable pages for class: the sentence skeleton across the top (same
// slots and colours as the Level 3 Sentence order card) and word cards under
// each slot, so you choose words from the sheet and spend your effort on the
// grammar. Words come from the daily-sentence lists (only taught words, via
// sgW), objects grouped under the verb they go with. Each column always has a
// few core words plus a random pick of the rest, so every sheet differs;
// Shuffle picks again.
function dsItem(jp, enOverride) {
  const w = sgW(jp);
  if (!w) return null;
  const it = l3TaughtItem(jp);
  return { jp, ro: w.ro, en: enOverride || (it ? it.en : '') };
}

function dsPick(pool, anchors, n) {
  const seen = new Set(), out = [];
  const add = x => { if (x && !seen.has(x.jp) && out.length < n) { seen.add(x.jp); out.push(x); } };
  anchors.forEach(a => add(pool.find(p => p && p.jp === a)));
  shuffle(pool.filter(Boolean)).forEach(add);
  return out;
}

function dsWhoPool(withMe) {
  const pool = [];
  if (withMe) pool.push({ jp: 'わたし', ro: 'watashi', en: 'I' });
  pool.push(dsItem('ともだち', 'friend'));
  sgMyFamily().forEach(m => pool.push(dsItem(m.jp, 'my ' + m.en)));
  if (sgW('どうりょう')) pool.push(dsItem('どうりょう', 'colleague'));
  SENTENCE_NAME_POOL.slice(0, 6).forEach(n => pool.push({ jp: n.jp, ro: sgW(n.jp).ro, en: n.en })); // names capitalised, as in the sentences
  return pool;
}

function dsTimePool() {
  const pool = [];
  Object.entries(SG_TIMES).forEach(([jp, t]) => { if (!t.long) pool.push(dsItem(jp, typeof t.en === 'string' ? t.en : t.en.fut)); });
  SG_DAYS.forEach(([jp, en]) => { const it = dsItem(jp, 'on ' + en); if (it) { it.jp += 'に'; it.ro += ' ni'; it.key = jp; pool.push(it); } });
  return pool;
}

function dsColumns(mode) {
  if (mode === 'being') return dsBeingColumns();
  const who = { role: 'Who', particle: 'は', note: 'Leave it out if it\'s obvious', items: dsPick(dsWhoPool(true), ['わたし', 'ともだち'], 7) };
  const when = { role: 'When', particle: '(に)', note: 'に only after days: どようびに', items: dsPick(dsTimePool(), ['きのう', 'きょう', 'あした', 'しゅうまつ', 'まいにち'], 11) };
  const freq = { role: 'How often', particle: '–', note: 'あまり / ぜんぜん → verb ends ません · もう → 〜ました', items: L3_FREQ_WORDS.map(f => ({ jp: f.jp, ro: f.romaji, en: f.en })).concat(sgW('もう') ? [{ jp: 'もう', ro: 'mou', en: 'already / yet' }] : []) };
  const compPool = dsWhoPool(false);
  const comp = { role: 'With whom', particle: 'と', note: 'ひとりで = on my own (no と)', items: [{ jp: 'ひとりで', ro: 'hitori de', en: 'on my own' }].concat(dsPick(compPool, ['ともだち'], 6)) };
  if (mode === 'do') {
    const placeSet = new Set();
    SG_OBJECT_VERBS.forEach(V => V.places.forEach(p => { if (!SG_PLACE_EN[p] || !SG_PLACE_EN[p][1]) placeSet.add(p); }));
    // Lesson 5: tools share the で column (はしで, ペンで, えいごで).
    const placeCards = dsPick([...placeSet].map(p => dsItem(p, (l3PlaceItem(p) || {}).en)), ['うち', 'レストラン', 'こうえん', 'カフェ', 'としょかん'], 8);
    const toolCards = dsPick(Object.keys(SG_TOOLS).map(t => dsItem(t)), ['はし', 'ペン', 'パソコン', 'えいご'], 6);
    const where = { role: 'Place / tool', particle: 'で', note: 'a place — or a tool or language: はしで, えいごで', items: placeCards.concat(toolCards) };
    // What + verb: objects grouped under their verb.
    const PLAN = [['たべます', 4], ['のみます', 2], ['みます', 2], ['ききます', 2], ['よみます', 2], ['かきます', 2], ['きります', 2], ['かいます', 2], ['します', 4]];
    const usedObjs = new Set(); // スポーツ is both watched and done - list it once
    const groups = [];
    PLAN.forEach(([v, k]) => {
      if (!sgW(v)) return;
      const objs = [];
      SG_OBJECT_VERBS.filter(V => V.v === v && !V.routine).forEach(V => V.objs.forEach(o => { const it = dsItem(o[0], V.phrase ? o[1] : o[1]); if (it) objs.push(it); }));
      const pick = dsPick(objs.filter(o => !usedObjs.has(o.jp)), [], k);
      pick.forEach(o => usedObjs.add(o.jp));
      if (pick.length) groups.push({ verb: dsItem(v), items: pick });
    });
    const what = { role: 'What', particle: 'を', note: 'Each thing is listed under its verb', wide: true, groups };
    // Verbs that don't need a thing from column 6 (those are listed there).
    const verb = dsVerbColumn([['おきます', 'get up'], ['ねます', 'go to bed'], ['はたらきます', 'work'], ['べんきょうします', 'study'],
      ['やすみます', 'rest / day off'], ['うんどうします', 'exercise'], ['およぎます', 'swim'], ['うたいます', 'sing'],
      ['あいます', 'meet (ともだちに)'], ['とります', 'take (photos)']], 7);
    return [who, when, freq, comp, where, what, verb];
  }
  if (mode === 'give') {
    // Giving & receiving (L3 Lesson 4, 2026-10-20). Same slot colours as the
    // card: column 4 is the other person (に), and there's no slot-5 column.
    const occ = L3C_OCCASIONS.concat([{ jp: 'たんじょうび', en: 'on / for a birthday' }]).map(o => {
      const it = dsItem(o.jp, o.en); if (it) { it.jp += 'に'; it.ro += ' ni'; } return it; });
    const times = dsPick(dsTimePool().filter(t => ['きのう', 'あした', 'しゅうまつ', 'せんしゅう', 'らいしゅう', 'まいにち'].includes(t.jp)), [], 6);
    const whenG = { role: 'When', particle: '(に)', note: 'に after days and occasions: たんじょうびに, クリスマスに', wide: true,
      items: dsPick(occ, ['たんじょうびに', 'クリスマスに', 'ははのひに', 'ちちのひに'], 8).concat(times) };
    const people = [dsItem('ともだち', 'a friend'), dsItem('せんせい', 'the teacher'), dsItem('どうりょう', 'a colleague'), dsItem('じょうし', 'my boss')]
      .concat(sgMyFamily().map(m => dsItem(m.jp, 'my ' + m.en)), SENTENCE_NAME_POOL.slice(0, 4).map(n => ({ jp: n.jp, ro: sgW(n.jp).ro, en: n.en })));
    const person = { role: 'To / from whom', particle: 'に', note: 'に = to (あげます) or from (もらいます)', items: dsPick(people, ['ともだち', 'はは', 'せんせい', 'どうりょう'], 9) };
    const pair = (a, b, en) => sgW(a) && sgW(b) ? { jp: a + ' / ' + b, ro: sgW(a).ro + ' / ' + sgW(b).ro, en } : (sgW(a) ? dsItem(a) : null);
    const grp = (verb, objs, k) => { const items = dsPick(objs.map(o => dsItem(o[0], o[2].replace(/^(a|an) /, ''))), [], k); return verb && items.length ? { verb, items } : null; };
    const groups = [
      grp(pair('あげます', 'もらいます', 'give / receive'), L3C_GIFTS, 6),
      grp(pair('かします', 'かります', 'lend / borrow'), L3C_LENDS, 4),
      grp(pair('おしえます', 'ならいます', 'teach / learn'), L3C_SKILLS, 4),
      grp(pair('かきます', 'おくります', 'write / send'), [['てがみ', '', 'letter'], ['メール', '', 'email'], ['カード', '', 'card'], ['レポート', '', 'report'], ['しゃしん', '', 'photos']], 4),
    ].filter(Boolean);
    const what = { role: 'What', particle: 'を', note: 'Each thing is listed under its verbs', wide: true, groups };
    const verb = dsVerbColumn([['あげます', 'give'], ['もらいます', 'receive'], ['かします', 'lend'], ['かります', 'borrow'],
      ['おしえます', 'teach'], ['ならいます', 'learn'], ['かきます', 'write'], ['おくります', 'send'], ['かけます', 'phone (でんわを かけます)']], 9, true);
    // Lesson 6: means で (メールで, にほんごで) for writing, sending and phoning.
    const means = { role: 'With what', particle: 'で', note: 'write, send, phone', items: ['メール', 'パソコン', 'スマホ', 'けいたい', 'ペン', 'にほんご', 'えいご'].map(t => dsItem(t)).filter(Boolean) };
    const cols = [who, whenG, freq, person, means, what, verb];
    [1, 2, 3, 4, 5, 6, 7].forEach((slot, i) => { cols[i].slot = slot; });
    return cols;
  }
  const how = { role: 'How', particle: 'で', note: 'あるいて = on foot (no で)', items: dsPick(SG_TRANSPORT.map(t => dsItem(t[0], t[1].replace(/^by /, '').replace(/^on foot$/, 'on foot'))), ['でんしゃ', 'バス', 'くるま'], 8) };
  const destPool = Object.entries(SG_DEST).map(([jp, v]) => dsItem(jp, v[0].replace(/^to (the |a |an )?/, '')));
  const whereTo = { role: 'Where to', particle: 'に', note: 'へ works too', wide: true, items: dsPick(destPool, ['えき', 'がっこう', 'かいしゃ', 'スーパー', 'レストラン', 'こうえん', 'えいがかん', 'デパート'], 24) };
  const verb = dsVerbColumn([['いきます', 'go'], ['きます', 'come'], ['かえります', 'go home']], 3);
  return [who, when, freq, comp, how, whereTo, verb];
}

// Verb column: the endings, shown on one example verb.
// Verb column (2026-10-13, Andrew: "nothing that lists some handy verbs"):
// handy verbs as cards, then one compact block of the endings.
function dsVerbColumn(verbs, max, noInvite) {
  // The first four always appear; the rest are a random pick, like the other columns.
  const pool = verbs.map(([jp, en]) => dsItem(jp, en)).filter(Boolean);
  const lead = dsPick(pool, verbs.slice(0, 4).map(v => v[0]), max);
  const ends = [['ます', 'do / will do'], ['ません', "don't"], ['ました', 'did'], ['ませんでした', "didn't"],
    ['ませんか', "why don't we…?"], ['ましょう', "let's…"]].slice(0, noInvite ? 4 : 6);
  return { role: 'Verb', particle: '。/か', note: 'take off ます, add an ending · か for a question', lead, ends };
}

function dsCardHtml(it, extraClass) {
  const len = [...it.jp].length;
  const size = len >= 8 ? ' xlong' : len >= 6 ? ' long' : '';
  return `<div class="ds-card${extraClass ? ' ' + extraClass : ''}"><div class="ds-jp${size}">${markSmallKana(it.jp)}</div><div class="ds-ro">${it.ro}</div><div class="ds-en">${it.en}</div></div>`;
}

function buildDeskSheets() {
  const el = document.getElementById('desk-sheets');
  if (!el) return;
  const pages = [
    { mode: 'do', title: 'Doing something', sub: 'Sentence order', ex: 'わたしは どようびに ともだちと カフェで コーヒーを のみました。' },
    { mode: 'go', title: 'Going somewhere', sub: 'Sentence order', ex: 'わたしは しゅうまつ ははと でんしゃで デパートに いきます。' },
    { mode: 'give', title: 'Giving & receiving', sub: 'Sentence order', ex: 'わたしは たんじょうびに ともだちに ぼうしを もらいました。' },
    { mode: 'being', title: 'Being (X is Y)', sub: 'Sentence order', ex: 'あには いしゃです。 えいがは おもしろいです。' },
  ];
  el.innerHTML = pages.map(p => {
    const cols = dsColumns(p.mode);
    const colHtml = cols.map((c, i) => {
      const head = `<div class="ds-head"><div class="ds-head-top"><span class="ds-num">${i + 1}</span><span class="ds-role">${c.role}</span><span class="ds-particle">${c.particle}</span></div></div>`;
      const note = c.note ? `<div class="ds-note">${markSmallKana(c.note)}</div>` : '';
      let body = '';
      if (c.groups) body = c.groups.map(g => `<div class="ds-group-head"><span class="ds-jp">${markSmallKana(g.verb.jp)}</span> <span class="ds-ro">${g.verb.ro}</span> · <span class="ds-en">${g.verb.en}</span></div>` + g.items.map(x => dsCardHtml(x)).join('')).join('');
      else if (c.ends) body = c.lead.map(x => dsCardHtml(x, 'ds-verb')).join('')
        + `<div class="ds-ends">${c.ends.map(([e, en]) => `<div class="ds-end"><span class="ds-end-jp">〜${markSmallKana(e)}</span><span class="ds-end-en">${en}</span></div>`).join('')}</div>`;
      else body = c.items.map(x => dsCardHtml(x)).join('');
      return `<div class="ds-col${c.wide ? ' wide' : ''}" style="--slot:var(--slot-${c.slot || i + 1})">${head}${note}${body}</div>`;
    }).join('');
    return `<div class="ds-page"><div class="ds-page-title">${p.title}<span>${p.sub}</span><span class="ds-example">e.g. ${p.ex}</span></div><div class="ds-cols">${colHtml}</div></div>`;
  }).join('');
}

function showDeskSheets() {
  buildDeskSheets();
  showScreen('desk-sheets');
  window.scrollTo(0, 0);
}

// Desk-sheet / builder columns for Being.
function dsBeingColumns(who) {
  const things = [...new Set(BEING_THINGS.flatMap(g => g.objs))].filter(o => sgW(o)).map(o => dsItem(o, beingTopicEn(o)));
  const whoCol = { role: 'Who / what', particle: 'は', note: 'a person, a place, or a thing to describe', items: dsPick(dsWhoPool(true), ['わたし', 'ともだち', 'はは'], 6).concat(dsPick(things, ['マンチェスター'], 6)) };
  const when = { role: 'When', particle: '–', note: 'with jobs · きょねん → でした', items: ['いま', 'きょねん', 'らいねん'].map(j => dsItem(j)).filter(Boolean) };
  const degree = { role: 'How much', particle: '–', note: 'あまり → negative', items: Object.keys(BEING_DEGREE).filter(d => sgW(d)).map(d => ({ jp: d, ro: BEING_DEGREE[d].ro, en: d === 'とても' ? 'very' : 'not very (+ negative)' })) };
  const allAdjs = [...new Set(BEING_THINGS.flatMap(g => g.adjs).concat(BEING_PEOPLE_ADJS, BEING_ADJ_NOUN_PEOPLE, BEING_ADJ_NOUN_PLACES))].filter(a => sgW(a));
  const adjCard = a => ({ jp: a, ro: sgW(a).ro, en: beingAdjEn(a) });
  const describe = { role: 'Describing (+ noun)', particle: 'な', note: 'before a noun: な-words add な (しずかな まち), い-words don\'t (おもしろい ひと)', items: dsPick(allAdjs.map(adjCard), ['しんせつ', 'にぎやか', 'おもしろい', 'ゆうめい'], 9) };
  const jobs = dsPick(beingJobs().map(j => ({ jp: j.jp, ro: j.romaji, en: beingEnWord(j) })), ['がくせい', 'いしゃ', 'かいしゃいん'], 8);
  const nations = dsPick(beingNations(), ['イギリスじん', 'にほんじん'], 4);
  const adjs = dsPick(allAdjs.map(adjCard), ['おもしろい', 'きれい', 'しずか', 'むずかしい'], 10);
  const nouns = ['ひと', 'まち'].filter(n => sgW(n)).map(n => dsItem(n));
  const what = { role: 'What they are / what it\'s like', particle: '–', note: 'then です — い-words change their own ending: おもしろくないです', wide: true,
    groups: [{ verb: { jp: 'しごと', ro: 'shigoto', en: 'jobs' }, items: jobs }, { verb: { jp: '〜じん', ro: '~jin', en: 'nationality' }, items: nations },
      { verb: { jp: 'どんな？', ro: 'donna', en: 'describing' }, items: adjs }, { verb: { jp: 'ひと・まち', ro: 'hito, machi', en: 'person, town' }, items: nouns }].filter(g => g.items.length) };
  const verb = { role: 'です', particle: '。/か', note: 'です and its endings · か for a question', lead: [{ jp: 'です', ro: 'desu', en: 'is / am / are' }],
    ends: [['です', 'is / am / are'], ['じゃありません', "isn't"], ['でした', 'was'], ['じゃありませんでした', "wasn't"], ['〜くないです', "isn't (い-words)"], ['〜かったです', 'was (い-words)'], ['〜くなかったです', "wasn't (い-words)"]] };
  const cols = [whoCol, when, degree, describe, what, verb];
  [1, 2, 3, 5, 6, 7].forEach((slot, i) => { cols[i].slot = slot; });
  return cols;
}
