
// =============================================================================
// FUTURE DIRECTION - mechanism not yet started, written down so it survives
// conversation compaction rather than living only as chat history. Last
// updated 2026-08-26. This is a plan for infrastructure Andrew wants built
// out BEFORE L3 arrives, so L3 becomes a data-entry exercise (add tagged
// vocab, mostly to a separate data file) rather than an app-design exercise.
//
// IMPORTANT CORRECTION (2026-08-26): earlier framing of this plan wrongly
// treated L1/L2 as parked until L3 alongside the real, explicit "don't merge
// L1+L2 into one visible bucket yet" instruction. Those are not the same
// thing. The merge (a UI change classmates would see) stays parked. The
// underlying tag infrastructure (invisible, additive, same as every
// combined-tag test built so far) does not need to wait for L3 at all -
// Andrew wants it built out for ALL 1289 words, L1/L2 included, before L3
// lands. Progress so far: every L1/L2 item (442 words, 24 categories) now
// carries `tags:['L1'|'L2', <category-derived-topic>]` (e.g.
// tags:['L1','greetings'], tags:['L2','food-drink-l2']) - see the tagging
// pass below dated 2026-08-26. This is pure data prep: nothing reads these
// tags yet, categoryTierVisible and the screen-level filters below (see
// point 1) are untouched, so nothing anywhere behaves differently. Topic-tag
// names were deliberately chosen not to collide with the live Trip/Andrew
// combined-test tags (food-drink-l2 vs food-drink, question-location vs
// question-word, etc.) so none of the six shipped combined pools picked up
// unexpected new members.
//
// FIRST REAL FLIP, PILOTED (2026-08-26): vocab-weather is the first category
// whose own display is genuinely sourced via tag query rather than reading
// `items` directly - not a parallel test card, an actual change to how the
// real Weather screen resolves. See the `tagQuery` branch added to
// resolveVocabCategory (deliberately separate from getThemePool's version -
// that one decorates items with level/groupKey for the theme-pool border-
// colour feature, which would have been a visible regression on a single-
// category screen that's never shown tier-coloured borders). Verified byte-
// for-byte identical to the pre-flip output before shipping. Note this only
// changes the tile-selection/browse screen (resolveVocabCategory) - the
// "random words at this level" picker (startRandomMatch) and "All
// vocabulary" pool (getAllVocabPool) still read `VOCAB[key].items` directly
// and were deliberately left untouched for this pilot; a full migration
// would need those updated too. Weather was picked because nothing else
// carries the 'weather' tag, so there's no merging to reason about - pure
// proof the mechanism itself works before trying it somewhere riskier.
//
// RANDOM POOLS REBUILT (2026-08-27): startRandomMatch's Level 1/2 branch and
// getAllVocabPool were the last two places reading VOCAB[key].items
// directly and gating by a category's own `level` property - the bucket
// model this whole file has been moving away from. Rebuilt from scratch
// rather than patched: "what would Random - Level 1 look like if tags were
// the only thing that existed" turned out to be "every item tagged 'L1',
// full stop" - see scanVocabByTag, shared by both functions now. Andrew/
// Trip stayed on the old per-category level match deliberately (they've
// never had a universal per-item tier tag the way L1/L2 now do - see point
// 2 below, still open). Proved this actually matters, not just tidier:
// tagged an existing L1 word forward with an extra 'L2' tag, no data moved
// or duplicated, and it correctly appeared in both levels' random pools
// immediately - confirming bring-forward (point 1 below) needs no "moving"
// mechanism at all once a pool is a genuine tag query.
//
// ALL 24 L1/L2 CATEGORIES FLIPPED (2026-08-27): every Level 1 and Level 2
// category now carries `tagQuery: ['L1'|'L2', <topic>]` (e.g.
// ['L1','places']) instead of relying on `items` alone. This needed one
// mechanism addition first: `tagQueryMatches()` now accepts either a single
// tag string (unchanged - Weather, the six combined cards) or an array,
// matched as AND rather than OR. The array form is what makes this safe -
// a plain single-tag query on 'places' would also catch Trip prep's
// まち/やすみ and Materials - Shops' 夏季無休 (all three carry 'places' too),
// but ['L1','places'] only matches items that ALSO carry 'L1', which none
// of those three do. Every one of the 24 was simulated and verified
// byte-for-byte and order-for-order identical to its pre-flip output before
// applying, including the six ordinalOrder categories (Numbers, Animals-l2/
// zodiac, Time, Days, Months, Days of the month) - the tagQuery branch
// originally always alphabetized, which would have silently scrambled
// those six the moment they were flipped; it now checks cat.ordinalOrder
// first, same as the includeItems branch below already did.
//
// This was safe to do with zero visible change specifically because every
// L1/L2 category already has hasReference:true, so the tile-selection/
// drill-start screen (buildVocabTileGrid, showVocabTileSelection) and the
// category-list word count were already reading through
// resolveVocabCategory, not `v.items` directly - the flip only changes
// what resolveVocabCategory does internally, not who calls it.
//
// What this does NOT cover, confirmed still reading VOCAB[key].items
// directly and still gating on the category's own `level` property rather
// than per-item tags: startRandomMatch() ("random words at this level")
// and getAllVocabPool() ("All vocabulary" / Random - Everything). Fixing
// those two is separate, scoped work - not blocked on any missing
// mechanism, just not done yet.
//
// Also surfaced while planning this: most of the hand-picked Collections
// (theme-transport-uk, theme-world, theme-items-clothing-general,
// theme-core-grammar, theme-getting-around) were simple unions of whole
// categories that already had their own topic tag, so they became
// tagQuery {any:[...]} lookups with zero new tags on any word - done
// 2026-08-27, see tagQueryMatches and getThemePool's dividerGroup handling
// for the OR branch. theme-survival-vocab did NOT convert the same way:
// it used to be "all of Trip prep + all of Emergency" as whole categories,
// but Trip prep never had one tag of its own to build a query from
// (deliberately dissolved into food-drink/emergency/shopping/adjectives/
// places/stations by purpose). Rather than invent a tag just to preserve
// the old boundary, both source categories were checked word-by-word and
// found to already be fully covered elsewhere (every trip-prep and
// emergency-survival word has a real purpose tag and shows up in an
// existing Collection or combined pool) - so the Collection, and both
// source categories as standalone browsable tiles, were retired instead of
// rebuilt. See the standaloneCard: false comments on vocab-trip-prep and
// vocab-emergency-survival - the words themselves were never touched, only
// the now-redundant container screens.
//
// Calendar & time (theme-days-times) turned out not to be a mechanism
// question at all, on reflection (2026-08-27) - the "no tagQuery variant
// can express fixed multi-source ordering" limitation was real, but
// fixable (respect ordinalOrder within an {any:[...]} group, make the
// divider optional). The actual question was whether mixing Days/Months/
// Days-of-month/Time into one drill deck was ever worth doing, and it
// wasn't: unlike Core grammar or Getting around, these four don't get
// confused with each other or used together in one sentence, each is
// already a solid standalone category, and pickDistractorItems draws
// distractors from the whole combined pool by text shape alone - so a
// "Monday" question could get a month name as an obviously-wrong option,
// undermining the whole point of distractor biasing. Removed rather than
// fixed - see the REMOVED comment at its old spot in THEMES. The four
// source categories themselves are completely untouched.
//
// TRIP/ANDREW REORG - DIRECTION SET, NOT YET STARTED (2026-08-27): refines
// point 2 below, decided in conversation and written down here specifically
// because it won't survive into the next chat otherwise (Andrew's own words,
// checking in: "chat #1 decided this with me, and this is chat #4 so that
// memory will probably be gone by now" - this file is the only continuity
// that actually works across sessions, so anything load-bearing gets written
// here, not left as something "we talked about").
//
// The real axis was never Trip vs Andrew vs Materials - it's TAUGHT vs
// EVERYTHING ELSE. Materials was always just the evidence source for
// Andrew-tier words (see the old "Andrew mode currently has no VOCAB
// categories of its own" comment near buildMatchCategoryList - Materials
// WAS Andrew's content, just not framed that way). Trip was a mix of
// curated-in-advance and evidenced content, bucketed together because it
// applied "on the actual trip", not because it shared a nature with
// Materials. Direction: Trip disappears entirely as a toggle/pill/concept.
// Andrew's current 682 words (all of today's "Materials" categories) move
// into one new tier that also absorbs what's left of Trip - not called
// "Experienced" (working name only, rejected already - most Trip content
// was curated/anticipated rather than actually encountered, so the name
// has to cover passive as well as active exposure). Andrew itself goes back
// to what it was always meant to be - Andrew's own words: "a dumping ground
// for things that are being tested" - and ends up with next to nothing in
// it once this lands, toggle kept, just not much behind it for now.
//
// Blocker found and measured, not assumed: 335 of the 682 Materials words
// store `jp` as kanji only, no kana form at all - roughly half the tier
// literally can't be drilled in kana today. Adding kana equivalents is a
// prerequisite for folding this content in alongside taught levels, not
// an optional polish step - checked with a quick scan (kanjiRe.test(jp) &&
// !kanaRe.test(jp)) rather than guessed at.
//
// Kanji-primary-display switching ("we already have this as hiragana, what
// do you want to do?" the moment a course-taught kanji matches an existing
// kana word) is already covered by point 4 below (script promotion) - nothing
// new to design there, just not yet needed: no kanji has been taught in the
// course as of 2026-08-27, katakana is barely established. When it starts
// coming up, the operating instruction is exactly point 4 - swap jp/altForm,
// flip altIsStandard, don't duplicate the word.
//
// Separate, not-yet-scoped thread surfaced in the same conversation: the
// existing Kanji drill (distinct from this VOCAB/kana system) started as
// "survival kanji" and grew close to full N5 coverage, missing 白 (white),
// which "didn't have anywhere to sit." Andrew's read: probably ought to
// just be N5 minus that gap, and the drilling mechanism itself might be
// due a refresh - hasn't been touched in roughly 200 versions. Not
// investigated yet this session - no assumptions made about its structure,
// needs its own look before treating it as scoped work.
//
// Sequencing: this reorg comes before revisiting the six "(combined test)"
// cards (Stations, Food & drink, Shopping, Accommodation, Emergency,
// Signage - all still live, several sitting right next to their narrower
// Trip/Andrew original). Most of those exist specifically to bridge Trip
// and Andrew content, which this reorg dissolves - deciding their fate
// first would likely mean redoing that decision once there's one tier
// instead of two.
//
// TAUGHT/UNTAUGHT DIRECTION CONFIRMED + CATEGORISATION ANALYSIS (2026-08-28):
// this section is written to be binding, not just informative - if a future
// suggestion (from Andrew or from a future chat) conflicts with what's below,
// that's a signal to flag the conflict and ask for it to be justified, not to
// quietly go along with it. This is the record of what's actually been
// decided vs what's still open.
//
// DECIDED: the organising axis is taught vs untaught, not Trip vs Andrew vs
// Materials. "Taught" and "untaught" are confirmed as the working terms -
// not claimed to be the perfect words, but good enough to build against,
// because they differentiate exactly the right thing. Do not silently
// reintroduce Trip or Materials as concepts once this lands.
//
// DECIDED: kanji drilling stays its own mechanism (separate DATA-shaped
// item, separate drill screen) - it is NOT being merged into the VOCAB/tag
// item shape. It becomes one more screen surfaced under the untaught toggle,
// nothing about its underlying data model changes. Scoring is already
// shared with kana via the single kanaScores store (verified in code, not
// assumed) - no work needed there.
//
// DECIDED: Andrew mode reverts to being a workbench/test area, and sits
// OUTSIDE the taught/untaught axis entirely - it is not "untaught content",
// it's a scratch space. Its current 682 Materials words move into the new
// untaught tier; Andrew itself ends up near-empty once that happens.
//
// DECIDED: this is deliberately NOT a do-it-all-at-once change. Rough order
// of near-term payoff to slower background work: (1) merge Trip+Materials
// content into one tag-queryable untaught tier - the piece with real
// near-term payoff, since it retires the Trip toggle, the Andrew-as-content
// toggle, and several duplicate mechanisms in one move; (2) kana backfill
// for the 335/682 Materials words that are currently kanji-only (see
// 2026-08-27 entry above) - grunt data-entry work, no urgency, can happen
// any time; (3) kanji surfacing under the untaught toggle - no urgency,
// no kanji is taught in the course yet; (4) Collections redesigned from
// scratch - explicitly held until after (1) lands, not before.
//
// CATEGORISATION ANALYSIS - what a from-scratch split of the current
// Trip+Materials pool (843 items: 161 across 9 Trip categories, 682 across
// 10 Materials/Andrew categories) looks like, done by comparing tags already
// on those items against the topic tags already used in L1/L2's tagQuery
// declarations (checked in code, not guessed):
//   - Every one of the 843 items already carries a topic tag - this is not
//     starting from an untagged pile, it's deciding what to keep vs merge.
//   - Two genuine duplicates found: `shopping` (70, ex-Trip) and `shops`
//     (70, ex-Materials) are the same concept under two names - merge to
//     one tag. Same pattern with `entertainment` (41) and
//     `materials-entertainment` (68) - merge, pending a check that their
//     content actually overlaps rather than genuinely splitting.
//   - `trip` (39 items) is a generic catch-all tag with nothing left to
//     mean once Trip stops being a concept - drop it, same reasoning as
//     retiring Trip prep/Survival vocab (2026-08-27 entries above).
//   - `accommodation` is already shared correctly across the old Trip
//     category and Materials — Hotel: Facilities (87 items combined) -
//     evidence the tagging habit already anticipated cross-tier reuse
//     without anyone deciding to do that on purpose.
//   - Naming inconsistency flagged, NOT decided: L1 topic tags are plain
//     (places, objects, colours), L2's mostly carry a `-l2` suffix
//     (food-drink-l2, verbs-l2, adjectives-l2), seemingly just to dodge
//     collisions rather than a deliberate rule. The untaught pool's tags
//     (food-drink, adjectives, places) match L1's plain style better. Full
//     cross-tier tag-naming alignment is a bigger, separate decision - not
//     blocking anything above, but don't assume it's settled either way.
//   - Several tags have no taught equivalent and shouldn't be forced into
//     one: appliances (113), stations (99), airport, signage,
//     tourist-phrases, question-word, weather, street, directions,
//     emergency. These are genuinely new domains the taught course hasn't
//     reached - that's expected, not a gap to fix.
//   - `food-drink` (269 items - a third of the whole pool, from iterative
//     menu-scanning on the actual trip) is too large to be one flat
//     drilling category - same "distractor pool too broad" problem that
//     retired Calendar & time. Needs an internal re-split (by dish/drink
//     type or similar) before it's usable, not just relabelling.
//
// TAUGHT/UNTAUGHT STATUS TAG - DONE (2026-08-28): every VOCAB item now
// carries a coarse status tag alongside its precise level tag - `taught`
// on all 446 L1/L2 items, `untaught` on all 843 Trip/Materials items.
// Purely additive (verified: every item's other fields byte-identical,
// exactly one tag added per item, nothing removed, nothing double-tagged) -
// no existing query result changes, because nothing queried these tag
// values before now. The reason to do this ahead of the actual topic-tag
// alignment: once a topic tag like `food-drink` is shared across tiers,
// `food-drink`+`L1`, `food-drink`+`L2`, `food-drink`+`taught`, and
// `food-drink`+`untaught` are all plain two-element AND queries - the
// mechanism already built handles all four without a compound AND-of-OR
// query shape, purely because `taught`/`untaught` are now real tags on the
// items, not just a level value. `taught`/`untaught` are working values,
// not claimed to be final/user-facing - cheap to rename or resurface with
// friendlier wording later (course/non-course, learnt/additional, and
// similar were all considered and rejected as worse than these two).
//
// TOPIC TAG INVENTORY + ADD-TIME RULE (2026-08-28), also binding per the
// note at the top of this section:
//
// 42 distinct topic tags exist across the app today (checked in code):
// accommodation, adjectives(-l2), airport, animals-l2, appliances, cities,
// clothing, colours, countries, days-l2, days-of-month-l2, directions,
// emergency, entertainment, family-l2, food-drink(-l2), general-l2,
// greetings, horse-racing, materials-entertainment, months-l2, numbers,
// objects, occupations, places, places-to-go, places-uk, question-location,
// question-word, shopping, shops, signage, stations, street, time-l2,
// tourist-phrases, transport, trip, verbs-l2, weather.
// After the clear, already-justified merges (food-drink-l2->food-drink,
// adjectives-l2->adjectives, shops->shopping, materials-entertainment->
// entertainment, trip retired) that's 36. Found while counting: this
// alignment idea already has a working precedent nobody had named yet -
// every vocab-adjectives-l2 item, and 4 of vocab-question-location's, are
// already dual-tagged with a second, unsuffixed tag (`adjectives`,
// `question-word`) purely so the Core grammar Collection's OR-query could
// reach across tiers. Same instinct, done by hand, before this conversation.
//
// NOT merging (related, but genuinely different enough to leave alone):
// the "places" cluster (places, places-to-go, places-uk, street, stations,
// airport, accommodation) and the "question" cluster (question-location,
// question-word) both have real internal differences (UK-specific vs
// generic vs transit vs lodging) that a forced merge would flatten. Leave
// separate unless a specific case makes the split feel wrong.
//
// There is no fixed target count to reach - untaught content keeps growing
// from real encounters (that's why food-drink ballooned) and future taught
// levels will add their own domains, so the number will keep moving. The
// thing that has to stay fixed is the PROCESS: when a new word is being
// added anywhere, check it against the tag list above first. If it fits
// cleanly, use the existing tag. If it's a genuine near-miss, flag it and
// ask rather than silently forcing it into the nearest tag or silently
// creating a near-duplicate. If it doesn't fit anything and doesn't look
// like the start of a new cluster, tag it `uncategorised` rather than
// reach for a vague catch-all - `trip` (2026-08-28 entry above) is the
// worked example of what happens when that check gets skipped.
//
// NOT built, but cheap whenever it's wanted: a recency-based "words from
// the last fortnight" pool - `dateAdded` already exists on all 1289 items
// (checked, 100% coverage), so this is a plain filter over existing data,
// not a new tagging mechanism, and would surface anything regardless of
// whether its topic tag ended up right or wrong.
//
// POSSIBLE FUTURE: KANSAI RETURN FOR AN INTENSIVE N5 COURSE (2026-08-29) -
// a direction, not a settled plan. Andrew is aiming to return to the Kansai
// region within roughly the next year for an intensive course (current
// student-visa requirement: N5 plus 150 hours of attended lessons) - but
// Japanese government rules on this keep changing, so treat the timeline
// and even the requirement itself as liable to shift, not fixed.
//
// If/when it happens, it changes what Andrew mode actually needs to be.
// Everything above assumed Andrew mode ends up near-empty - a workbench,
// per Andrew's own description of what it was always meant to be. An
// intensive personal N5 course breaks that assumption: Andrew's own
// learning pace would diverge entirely from the shared classmates' pace
// that L1/L2/L3... are built around, so Andrew mode could end up holding a
// real, substantial, fast-moving personal curriculum running in parallel
// to - not merged with - what classmates see as "taught". That's not an
// architecture problem (multi-tagging plus the existing visibility gate
// already generalise to "taught, but only for Andrew" without new
// mechanism), but it is a real reframing of what Andrew mode is FOR, worth
// reassessing if and when the timeline actually firms up rather than
// designed for now on spec.
//
// It also sharpens two things already written above: the Kansai-specific
// untaught words (Manganji pepper, water eggplant, Kyoto-style cooking
// terms - flagged as "unlikely to recur" on 2026-08-29 before this) are
// wrong to treat as narrow if this happens - they'd be exactly the region
// he's returning to. And the N5-minus-white kanji drill refresh floated
// earlier stops being an abstract itch and gets an actual dated target to
// build toward, with a much faster kanji-teaching cadence than anything
// this app's bring-forward mechanism has been exercised at so far.
//
// STANDING RULE (2026-08-30): if a word's stored data is found to be wrong
// during any other work - not just readings, any field - fix it on sight
// rather than just flagging it for later. Andrew's own reasoning: "if you
// find a word that's wrong it should be fixed. Otherwise I won't know it's
// wrong and I could learn the wrong thing." Applies generally, not just to
// this kanji project.
//
// PER-KANJI READING BREAKDOWN - SHIPPED, PARTIAL COVERAGE (2026-08-30):
// method proven sound (see the 2026-08-29 entries in session history for
// how - exhaustive alignment checking, zero ambiguous cases found across
// 141 mixed words). Pushed to 504 of 558 unique characters covered. One
// genuine data typo was found and fixed on sight, per standing instruction
// (found wrong = fixed immediately, not just flagged, since leaving it
// would mean teaching the wrong thing): 余裕 was stored as romaji "yoyou",
// corrected to "yoyuu" - which also let it resolve cleanly (余=yo, 裕=yuu).
// A second fix followed the same day: the chouon mark (ー) was originally
// unhandled by the kana-to-romaji converter (it bailed rather than
// resolving it), which was diagnosed as the actual reason 鳥レバー and
// similar words were blocked - not kanji/katakana mixing, as first
// suspected. Fixed by having ー repeat the last vowel already built within
// that kana run; unlocked 4 of the 13 chouon-containing candidates (the
// other 9 have separate, additional blockers). Final state: 378 of 514
// kanji-only untaught words have a fully verified per-character reading.
//
// Live in the app now: every solved word's VOCAB entry carries a
// `kanjiReading: [{char, reading}, ...]` array. The romaji-reveal hint
// button (see revealRomaji(), built 2026-08-29) shows the segmented
// per-character reading for these words instead of the old whole-word
// romaji, which was the actual problem being solved - whole-word romaji
// duplicated what the multiple-choice options already showed, so it was a
// pure giveaway rather than a hint. Kana-only words are untouched, still
// get the original whole-word reveal exactly as before.
//
// BLOCK-REASON MESSAGES - SHIPPED (2026-08-30): the remaining 136 blocked
// words no longer just show a greyed-out button. Each was mechanically
// (not guessed) sorted into one of five categories - MISSING_CHAR (34, one
// of the word's kanji has no recorded reading yet), HAS_OTHER_SYMBOL (12,
// contains a placeholder/symbol like 〜 with no fixed reading of its own),
// GEMINATION (16, a real sound-doubling pattern - つ/ち assimilating into
// the next consonant, e.g. 発車=hassha, 列車=ressha, all three 北海道
// words - genuinely teachable, just not modelled by the matching script),
// NO_ALIGNMENT (23, structure more complex than the tool currently
// handles), IRREGULAR (51, no clean decomposition at all - 山手線's hidden
// "no", Chinese-loan dish readings like 白湯/麻辣湯/麻雀, well-known
// irregulars like 時計). Each word carries a `kanjiReadingBlocked: '...'`
// string with a category-appropriate explanation. The button is now
// enabled for every kanji word that has EITHER a reading OR a block-reason
// (in practice, all 514) - only a word audited by neither would still show
// disabled. Clicking it on a blocked word shows the reason text and does
// NOT count as a hint (no penalty), since it explains rather than answers.
// Andrew's framing for why this matters: "that way we have consistent help
// even if it's just telling the user why it can't help."
//
// DICTIONARY GAP FOUND AND FIXED (2026-08-30): Andrew spot-checked 先発
// (senpatsu) in the running app and noticed it had neither a reading nor a
// reason - a real bug, not covered by the five categories above. Root
// cause: it had been sorted into IRREGULAR, but it isn't irregular at all -
// 発 was just missing "patsu" as a candidate reading (先=sen + 発=patsu is
// completely standard). That prompted a full re-audit rather than a single
// patch: rebuilt the segment/gemination solver from the method description
// above and re-ran it across all 514 words with the dictionary widened by
// seven more evidenced readings, each independently checked against a real
// word already in this data before being trusted (same zero-guessing bar
// as the original 504): 発+patsu (先発, 開発局), 開+kai (開発局), 整+sei
// (調整), 口+kou (経口補水液, 口腔外科 - alongside its existing kun'yomi
// guchi/kuchi), 外+ge (口腔外科 - a genuine second on'yomi, go-on vs kan-on
// gai), 声+sei and 声+goe (音声切換, 大声 - on'yomi and rendaku kun'yomi
// alongside existing koe), 漬+zu (茶漬け - rendaku, the character's own
// portion once the trailing け supplies "ke" separately).
//
// Verified via full regression check across the whole dataset (not just
// the flagged words): all 378 previously-solved words still resolve to
// the exact same reading sequence with the wider dictionary (0
// regressions), and no word gained a second, ambiguous valid decomposition
// (0 new ambiguity) - the wider candidate set only unlocked words that were
// genuinely blocked before. 28 words became newly solvable in total; 12 of
// those were applied (378 -> 390 solved, 136 -> 124 blocked): 先発,
// おろしポン酢, かやくご飯, 茶漬け, 大切なもの, 開発局, 経口補水液,
// 入れてください, 音声切換, 大声, 調整, 口腔外科. Category counts among
// the remaining 124: IRREGULAR 43 (was 51), NO_ALIGNMENT 19 (was 23),
// GEMINATION 16, MISSING_CHAR 34, HAS_OTHER_SYMBOL 12.
//
// The other 16 of the 28 (発車します, 発酵, 列車, 一品, 達成, 設置,
// 実行委員会, 鉄橋, 熱中症, 別邸, 設定温度, 決済, コード決済, 脱水, 設定,
// 決定 - exactly the existing GEMINATION set) were deliberately NOT
// applied even though the solver technically reconstructs their romaji.
// The reconstruction works by fragmenting a real reading across a
// gemination boundary (e.g. 列 -> "re", 車 -> "ssha", when 列's actual
// reading is retsu) - displaying that as the character's "reading" would
// teach a fake reading that doesn't exist on its own, which is worse than
// the current honest "follows a sound-doubling rule not built yet"
// message. Left as GEMINATION, unchanged.
//
// Next step if resumed: chase the remaining fixable gaps still hiding
// inside IRREGULAR/NO_ALIGNMENT (43 + 19 = 62 words) using the same
// evidence-based method just demonstrated - find a plausible standard
// reading for a component character, verify it against a real word
// already in the data (self-consistency, not guessing), then re-run the
// full-dataset regression + ambiguity check before applying anything.
// Separately, consider whether GEMINATION deserves an actual UI treatment
// (e.g. showing the real base readings with a note about the sound change,
// rather than either a fragment or a flat "not modelled" message) instead
// of staying permanently unresolved.
//
// DISPLAY FORMAT FIX (2026-08-30): Andrew tested お知らせ and found the
// hint just said "shi" with nothing tying it to the word - fair confusion,
// not a data bug. kanjiReading has only ever covered the KANJI portion of
// a word (the design intent, documented above: kana is already directly
// readable so it's deliberately left out) - for a mostly-kana word like
// お知らせ (お+知+らせ) that means the hint was always going to be a small
// fragment, but showing bare "shi" with no character attached made it look
// like a wrong or truncated answer rather than an explanation of one
// specific kanji. 106 of the 390 solved words are this kind of mixed
// kanji+kana word, so this wasn't a one-off - every one of them displayed
// this way. Fixed by changing the display from bare hyphenated romaji
// ("shi") to character(reading) pairs ("知(shi)") in revealRomaji() - for
// a pure-kanji word this still reads as the whole word broken down (e.g.
// 駅(eki) 事(ji) 務(mu) 室(shitsu)), but for a mixed word it's now
// unambiguous that this explains one part, not the whole pronunciation.
// No data changed, no version-of-truth changed - display only.
//
// MERGE STEP 1: PROVENANCE + COLOUR-BY-TAG - SHIPPED (2026-08-31): the
// first two concrete pieces of the Trip/Materials merge (see "THE FLIP"
// below and the 2026-08-27/28 entries above). Both were explicit yes's from
// Andrew, done ahead of deciding food-drink's fate or anything else in the
// merge - these two move the actual data/mechanism forward regardless of
// what else gets decided later.
//
// Provenance: every one of the 843 untaught items now carries either
// `encountered` or `curated` as a tag (682 / 161 - exactly the existing
// Materials/Trip split, checked in code not assumed: Materials items
// already had a `source:{location,date,file}` object from a real
// photograph, Trip items had none at all). The 161 `curated` items each
// gained a `source:{location:'Curated - added as a useful word (no
// specific sighting logged)'}` so the existing context-card mechanism
// (`q.seenAs || q.source`, unchanged) now shows something for every
// merged word, not just the photographed two-thirds. Wording note: this
// says "no specific sighting logged", not "never encountered" - Andrew's
// correction, since a curated word may well have been seen in real life,
// it just was never individually logged as a sighting the way Materials
// words were. Don't drift back to the stronger claim.
//
// Colour by tag: `LEVEL_BORDER_COLORS`'s `trip`/`andrew` keys (read
// straight off the category-level `level` value) became `curated`/
// `encountered` (same hex values - #9b59d0 purple, #43a047 green stay
// exactly as they were, Andrew's call to keep them since they already work
// well). A new `itemColorKey(item)` helper checks the item's own tags
// first and only falls back to `item.level` for taught items (1/2, which
// this doesn't touch). Verified pooled items keep their `.tags` array
// intact through buildCategoryItems (Object.assign spreads the raw VOCAB
// item over the synthesized level/groupKey fields) so this works without
// changing how items get pooled. `level` itself still reads `'trip'`/
// `'andrew'` on categories for now - full per-item `level` (point 1 in THE
// FLIP below) is separate, larger, still not started.
//
// Verified: 843 = 682 encountered + 161 curated, zero items with both tags
// or neither, zero taught items touched, 1289 total items unchanged,
// syntax checked, colour output for a taught L1/L2 item and each of
// curated/encountered simulated and matches the pre-change purple/green
// exactly.
//
// SERVICE-OPS TAG - SHIPPED (2026-08-31): the non-food slice of "Materials —
// Restaurants: Ordering & policy" (vocab-materials-restaurants-ops) plus the
// scattered lookalikes found elsewhere now carry a `service-ops` tag,
// pulling this content together by what it actually IS (shop/business
// operations - tax, hours, staff, payment, coupons, waste disposal) rather
// than leaving it identified only by "got photographed in a restaurant".
// Andrew's framing, quoted because it's the actual reasoning: "a good way
// of pulling the data together in a more useful way than just 'seen in a
// restaurant'". 51 items moved OUT of food-drink and into service-ops (they
// were never food/drink content, just mistagged by location - 税込, 営業時間,
// 従業員, クーポン, 閉店します and the like); the other 22 genuinely
// food/dining items in that category (menu, all-you-can-eat, refill, happy
// hour, the four cooking verbs) stayed in food-drink untouched. A further
// 15 items across stations/airport/shops/entertainment/hotel-appliances/
// hotel-facilities/street got `service-ops` added alongside their existing
// topic tag (dual-tagged, same precedent as adjectives-l2/question-location
// already use) - manually vetted against a raw keyword scan that also threw
// up several false positives (a supermarket brand name, a feudal lord, a
// texture word) which were deliberately left untagged. Final count: 66
// items tagged `service-ops`, food-drink(-l2) dropped from 278 to 227.
// Verified: 1289 items unchanged, zero items carry both food-drink and
// service-ops, encountered/curated (682/161) and kanjiReading (390/124)
// both unaffected, syntax checked.
//
// FOOD-DRINK SUB-SPLIT - SHIPPED (2026-08-31): the remaining 227 genuine
// food/drink items (after service-ops carved out the non-food 51 the same
// day) each gained exactly one sub-tag, added alongside the existing
// food-drink(-l2) tag rather than replacing it - same dual-tagging pattern
// as service-ops and adjectives-l2/question-location before it. Final
// split, every item checked by hand against its English gloss (not a blind
// keyword pass - the first automated attempt mis-sorted 肉汁/デミハンバーグ/
// 茶漬け into `drink` on a stray "juice"/"tea" substring match, caught and
// fixed before shipping): `food-type` 134 (dishes/ingredients, including
// named dishes whose name bakes in a cooking method - 唐揚げ, 焼鳥, いか焼き
// stayed food-type rather than preparation, per the caveat from the
// original analysis), `food-adjective` 36 (taste/quality/marketing
// descriptors - 濃厚, 激ウマ, 定番, ジューシー), `dining-phrase` 21 (full
// sentences and ordering/policy nouns that don't describe a food or drink
// itself - "bill, please", メニュー, 食べ放題, ワンオーダー制 - a category
// not in the original four-way plan, added because forcing these into
// food-type would have been wrong, not because Andrew asked for a fifth
// bucket; flagged here rather than silently expanding scope), `drink` 19,
// `preparation` 17 (kept narrow - standalone cooking verbs/processes only:
// 焼く/煮る/揚げる/炒める, 発酵, 熟成, 自家製, 燻製 - not named dishes).
//
// Verified: every one of the 227 has exactly one sub-tag, zero non-food
// items picked up a sub-tag by mistake, the duplicate jp collision (さけ
// meaning both "sake" and "salmon", two different items) resolved into
// `drink` and `food-type` correctly, all prior counts unchanged
// (service-ops 66, encountered/curated 682/161, kanjiReading 390/124),
// 1289 items total, syntax checked.
//
// FIRST TWO CATEGORY RETIREMENTS - SHIPPED (2026-08-31): Stations & trains
// and Accommodation are the first "TEST: ... combined" cards promoted to
// real, permanent ones, and the first two old standalone categories
// actually retired - the concrete start of point 2/3 below (Trip/Andrew
// membership as a per-item tag, categories as pure display), not a new
// decision. Andrew's framing: "nothing is lost, every word is still
// drillable" - true and checked, not assumed. Materials — Stations & trains
// (89/89 items already carried `stations`) and Trip's own Accommodation
// (14/14 carried `accommodation`, and Materials — Hotel: Facilities' 76 are
// covered too - 73 via `accommodation`, the other 3 already homed under
// food-drink from the split above) both got `standaloneCard: false` - data
// untouched, only the standalone tile is gone. `theme-stations-combined`
// and `theme-accommodation-combined` lost their "(combined test)" labels
// and "TEST:" card prefixes, and moved to their own section in Andrew
// mode's list, above the divider for the four combined pools still marked
// TEST (food-drink, shopping, emergency, signage) - a visible signal for
// which categories are real vs still provisional, not just a comment.
//
// STILL BLOCKED FROM RETIRING (see the SERVICE-OPS and FOOD-DRINK
// SUB-SPLIT entries above for the numbers): Food & drink's "Ordering &
// policy" half needs a service-ops drilling screen built before Materials —
// Restaurants: Ordering & policy can retire (51 of its 73 items have no
// screen showing them right now, only the tag). Shopping needs 12
// Materials-shops items (駐車場, 道民, 固く, 長時間, 勉強, 給電, こちら,
// 捨てる, ペット, ご同伴, カラス, 可能性 - parking/pets/crows/notices) sorted
// into `signage` or elsewhere before Materials-shops is fully covered.
// Emergency and Signage aren't "retire a whole category" cases at all -
// both are stitched from fragments of several categories, not one
// dominant source, so there's no single old category waiting to retire
// behind either of them.
//
// Naming note from the same conversation, worth keeping: `untaught` is the
// gate (whether this content shows at all, given course progress);
// `encountered`/`curated` are the descriptive tags on the content's nature
// (2026-08-31 provenance entry above); "Materials" was a category-list
// label that doesn't get renamed once this lands, it dissolves - once every
// category is named by what it's about (Stations & trains, Food & drink,
// same as everything else already is), there's no umbrella brand left
// needing a word. Andrew's own long-term framing, to keep in view: one set
// of tag-driven drilling categories inside Andrew mode that already
// includes what used to be Trip content, Trip retired as a toggle/concept
// entirely once nothing needs it any more, and the result folded into the
// untaught toggle. Not a new decision - this is what the 2026-08-27 reorg
// entry and THE FLIP below already describe; today's retirements are that
// plan actually starting to happen rather than just being written down.
//
// FOUR MORE RETIREMENTS + CARDS RESTYLED - SHIPPED (2026-08-31): the four
// remaining "TEST: ... combined" cards all graduated the same day as
// Stations & trains and Accommodation, closing out this round of Materials
// retirements. Emergency & survival needed zero further data work - it was
// already 100% covered by `emergency` and already had standaloneCard:false
// set back on 2026-08-27, so promoting it was just a label/card change.
// Food & drink and Shopping were promoted once their last coverage gaps
// closed: `theme-service-ops` is a brand-new drilling screen (66 items) so
// the 51 service-ops words carved out of Materials — Restaurants: Ordering
// & policy have somewhere to live, and the last 12 Materials-shops items
// (駐車場, 道民, 固く, 長時間, 勉強, 給電, こちら, 捨てる, ペット, ご同伴,
// カラス, 可能性 - parking/pets/crows/notices) got tagged `signage`. That
// same 12-item fix also completed Signage & warnings' coverage, so it
// promoted alongside the other three as a same-day consequence rather than
// needing separate work. Retired as standalone tiles (standaloneCard:false):
// Materials — Restaurants: Food & menu (141/141 covered), Materials —
// Restaurants: Ordering & policy (73/73 covered by food-drink+service-ops),
// Materials — Shops & everyday purchases (70/70 covered by
// shopping+signage). vocab-signage-warnings (11/11) was already covered and
// retired the same way. Corrected a stale comment on
// theme-accommodation-combined while in the area: it had claimed Materials
// — Hotel: Facilities was already standaloneCard:false, which was never
// actually true - fixed the comment to say so plainly rather than leaving
// wrong data in place, but did NOT silently retire that category too since
// it wasn't part of today's scope; flagged as a ready-when-wanted follow-up
// instead.
//
// Card styling also changed, per Andrew's explicit instruction: all seven
// promoted categories (the five above plus the two from earlier today) now
// render with buildCategoryTile() - the same ".match-card-select"
// white-text, word-count, confidence-swatch style every real Materials
// category has always used - instead of the gold ".vocab-ref-card" link
// style the TEST cards wore. buildCategoryTile() is the inline
// card-building code from the old Object.keys(VOCAB).forEach, extracted
// into a standalone function precisely so it could be reused for THEMES
// keys too - resolveVocabCategory/getCategoryAverageScore already worked
// generically for a theme key (no new plumbing needed, see resolveVocabCategory's
// THEME_CACHE branch), so the extraction was the only real work. They're
// also rendered first now, above even the Appliances reference card, so
// they're the first thing Andrew mode shows - the old gold "TEST:" section
// and its per-card comments are gone entirely, not just relabelled.
//
// Verified: 1289 items total unchanged, taught/untaught 446/843, service-ops
// 66, encountered/curated 682/161, kanjiReading 390/124, food sub-tags
// (food-type 134, drink 19, preparation 17, food-adjective 36, dining-phrase
// 21, 227 total) all unchanged from their last-shipped counts. 8 categories
// now carry standaloneCard:false in total (trip-prep, accommodation,
// emergency-survival, signage-warnings, materials-stations,
// materials-restaurants-food, materials-restaurants-ops, materials-shops).
// Syntax checked.
//
// HOTEL: FACILITIES RETIRED - SHIPPED (2026-08-31): closes out the stale-
// comment flag from the entry just above. Materials — Hotel: Facilities &
// stay (vocab-materials-hotel-facilities) got standaloneCard:false - all 76
// of its items were already covered (73 via `accommodation`, the other 3 -
// いか焼き, うまいもん, ご当地 - via `food-drink`), so this was purely
// catching up the code to what the data already supported, no new tagging
// needed. theme-accommodation-combined's comment corrected to describe both
// retirements as done rather than one done/one flagged. Also discussed with
// Andrew: Collections (the dedicated tab, `#match-theme-view`, hand-written
// HTML cards) and today's promoted Andrew-mode cards both resolve through
// the same THEMES/tagQuery mechanism - the only differences are UI wiring
// (static hand-authored cards with a separate swatch-refresh pass, vs
// buildCategoryTile() generating the whole card fresh each render) and
// visibility scope (Collections is its own tab, visible to everyone;
// today's promoted cards are Andrew-mode only). Agreed direction: aligning
// the two - most likely moving Andrew's promoted cards onto the same
// static-card pattern Collections uses, or vice versa - is a sensible next
// unification, not started tonight.
//
// Verified: 1289 items total unchanged, taught/untaught 446/843, all prior
// tag counts unchanged. 9 categories now carry standaloneCard:false in
// total (trip-prep, accommodation, emergency-survival, signage-warnings,
// materials-stations, materials-restaurants-food, materials-restaurants-ops,
// materials-shops, materials-hotel-facilities). Syntax checked.
//
// ENTERTAINMENT SPLIT + QUESTION WORDS RETIRED - SHIPPED (2026-08-31): a
// follow-on the same day, after checking which of the four remaining
// single-source Materials categories (Airport, Street, Entertainment,
// Hotel: Appliances) were actually clean to convert. Airport (18/18) and
// Street (21/21) turned out wholesale-tagged already; Entertainment wasn't
// (68 items, only 39 tagged `entertainment`) - the other 29 were a mixed
// bag: 10 already properly tagged `emergency` (a heatstroke-warning block
// from 2026-08-27, already drillable via theme-emergency-combined, so
// nothing to do there), and 19 genuinely homeless. Of those 19: 14 turned
// out to be a self-introduction/profile-card set (name, date of birth,
// height, weight, hobby, special skill, strong point, charm point,
// favourite food/word/colour, important thing, debut, company) all
// photographed together at the Sapporo TV Tower gift shop - almost
// certainly a mascot or character profile board, not travel vocabulary at
// all. Tagged `profile-words`, new theme-profile-words screen built for
// them. The remaining 5 were genuine strays with no natural cluster of
// their own: 鉄道駅 got the existing `stations` tag, 停止線/開発局 (both
// roadside signage from Muroran) got the existing `street` tag, and
// 市役所/名称 got `places` - the loosest fit of the batch, flagged as such
// rather than pretended otherwise (名称 in particular is a bare label word
// with no thematic home at all, folded in here because two words don't
// justify their own tag).
//
// With every item covered, Materials - Entertainment retired
// (standaloneCard:false) and theme-entertainment-combined promoted to a
// real Andrew-mode card - a genuine two-source combine, not a solo flip,
// since vocab-tourist-phrases already had 2 items independently tagged
// `entertainment` (41 total, not 39).
//
// Reference - Question words also retired the same day, but differently
// from everything else so far: not because a new Andrew card replaced it,
// but because Collections' own "Question words" card (theme-question-
// words, live since 2026-08-27) already pulls in all 13 of its items
// alongside the 4 taught L2 duplicates. This is the case Andrew flagged
// directly: wherever a set overlaps with taught vocab, Collections and
// Andrew's own list are going to show the same content through two
// different doors, and the fix there isn't a new Andrew card, it's
// pointing at the Collections card that already exists. No card added to
// Andrew's promoted list for this one - Collections is genuinely the place
// for it now.
//
// Airport, Street, and Hotel: Appliances remain as they are - all three
// are wholesale-tagged single-source categories with nothing to combine
// into, so unlike everything above they're candidates for the lighter
// FLIP PILOT-style in-place conversion (tagQuery on the VOCAB entry
// itself, same tile, nothing promoted or retired) rather than the promote-
// and-retire pattern used throughout this session - not done tonight.
//
// Verified: 1289 items total unchanged. entertainment 41 (39 in Materials
// - Entertainment + 2 in vocab-tourist-phrases, both pre-existing),
// profile-words 14 (new), stations 100 (+1), street 23 (+2), places 20
// (+2), emergency 36 unchanged in total but its per-category breakdown now
// includes materials-entertainment:10 as expected. 11 categories now carry
// standaloneCard:false in total (the 9 above plus materials-entertainment
// and reference-question-words). Syntax checked. (Also caught and fixed a
// self-inflicted bug while tagging: a first-draft script inserted the new
// tags outside the tags:[] array entirely, corrupting 19 lines - caught by
// the coverage-verification script immediately after running it, before
// any further edits were built on top, and fixed with a second pass before
// moving on.)
//
// AIRPORT/STREET/HOTEL:APPLIANCES FLIPPED - SHIPPED (2026-08-31): the three
// remaining single-source Materials categories, converted the FLIP PILOT
// way (tagQuery on the VOCAB entry itself, see vocab-weather from
// 2026-08-26) rather than promote-and-retire - there's nothing to combine
// them with, so each keeps its own tile in its own spot, just sourced by a
// tag scan now instead of reading `items` directly. Hotel: Appliances was
// a pure zero-risk conversion (113/113 already tagged `appliances`, no
// includeItems to worry about). Airport and Street each had one word
// wired in from vocab-accommodation via includeItems (にもつ/luggage,
// よやく/reservation) - a mechanism that doesn't survive a tagQuery flip,
// since resolveVocabCategory's tagQuery branch returns before ever
// checking includeItems, so leaving both in place would have silently
// dropped both words. Fixed by tagging にもつ `airport` and よやく `street`
// directly instead, so they show up in the scan exactly as they used to.
// にもつ is a clean fit; よやく is honestly a looser one - "reservation"
// isn't really street/neighbourhood vocabulary, it was only ever wired
// into this list for practical reasons - kept anyway rather than left
// stranded, flagged rather than pretended otherwise.
//
// One genuine behavioural difference worth flagging, not silently
// absorbed: includeItems never checked the tier-visibility gate (then
// categoryTierVisible, since renamed to itemTierVisible), so にもつ/よやく
// always appeared in Airport/Street regardless of the Trip vocab toggle's
// state. A tagQuery scan does respect it (see
// scanVocabByTag/resolveVocabCategory), so post-flip, both words only
// appear in Airport/Street when Trip vocab is also switched on. Whether
// that's a regression or actually the more consistent behaviour (every
// other Trip-tier word already obeys that toggle) depends on how the two
// toggles actually get used day to day - not resolved here, just flagged
// for whoever notices にもつ or よやく missing from those two lists with
// Trip vocab off.
//
// Verified: 1289 items total unchanged. airport 19 (18 in Materials -
// Airport + にもつ), street 24 (21 in Materials - Street + 2 from today's
// Entertainment split + よやく), appliances 113 unchanged. 11 categories
// still carry standaloneCard:false (none of today's three retire - they
// keep their tiles). Syntax checked.
//
// With this, every Materials category with a real merge partner has been
// promoted, and every genuinely single-source one has been flipped. What's
// left under Andrew, apart from reference-only cards (the Appliances
// reference view and the two notes links), is nothing else needing this
// kind of conversion - the tag-driven, single-flat-store model from THE
// FLIP below is now the live mechanism for essentially all of it.
//
// TAG CLEANUP + ALPHABETICAL ORDER - SHIPPED (2026-08-31): a same-day
// follow-up after Andrew questioned two of the tag choices from the
// Airport/Street flip above. よやく ("reservation") had been tagged
// `street` to preserve its old includeItems link into Materials - Street -
// but Andrew pointed out it fits Hotel/Accommodation better, and he was
// right: よやく already carries `accommodation` natively (it lives in
// vocab-accommodation) and Accommodation is a genuinely better home, so the
// `street` tag was dropped rather than kept as a compromise. にもつ
// ("luggage") stayed dual-tagged `airport` + `accommodation` - unlike
// よやく, luggage is genuinely relevant to both (you deal with it at
// check-in as much as at a hotel), so that one wasn't a loose fit needing
// correction.
//
// Also alphabetized Andrew mode's whole category list, per Andrew's
// request that it "tidy things up" - previously the nine promoted theme
// cards rendered first as a fixed block, then Airport/Hotel: Appliances/
// Street rendered separately via the generic VOCAB forEach, a split that
// only existed because the theme cards needed visual emphasis while they
// were new. Now that every tile renders identically via buildCategoryTile,
// that split served no purpose - combined both sources into one array,
// sorted by label, and skip the three plain VOCAB categories in the
// generic forEach so they don't render twice. Dropped the "Materials — "
// prefix from Airport/Hotel: Appliances/Street's labels as part of this -
// otherwise all three would have sorted together under "M" instead of
// interleaving properly (Airport under A, Hotel under H, Street under S).
// This is also the last piece of "Materials" branding disappearing from
// visible labels, matching the naming note from the 2026-08-31 retirement
// entry above: the word dissolves once nothing needs an umbrella term any
// more, this was simply the last place it was still showing.
//
// Verified: 1289 items unchanged, street back to 23 (21 + 2 from the
// entertainment split, よやく's tag removed), airport still 19 (18 + にもつ,
// unchanged). Alphabetized order checked by evaluating the real VOCAB/
// THEMES objects, not just reasoned about: Accommodation, Airport &
// flights, Emergency & survival, Entertainment, Food & drink, Hotel:
// Appliances & machines, Profile & self-introduction words, Service & shop
// operations, Shopping, Signage & warnings, Stations & trains, Street &
// neighbourhood. Syntax checked.
//
// REFERENCE SCREENS FOLDED INTO SELECTION SCREENS - SHIPPED (2026-08-31):
// Andrew's proposal, from the same conversation that flagged the Collections/
// Andrew overlap earlier today: instead of a standalone reference card
// hand-placed above a category's tile in the list, show the reference link
// on that category's own tile-selection screen instead - heading, then the
// reference link(s), then "tap a word to select it for drilling", then the
// grid, exactly as he described it. Applies to five reference screens that
// were previously separate cards: Time vocabulary's two (day/week/month/
// year, minute endings), Days of the month, Days of the week (in order),
// Animals' zodiac clock (all Level 2), and Appliances reference (Andrew).
//
// Mechanism: a new CATEGORY_REFERENCE_LINKS map (category key -> array of
// {label, fn}) read by showVocabTileSelection, which now populates a
// #vocab-tile-selection-ref-links container between the heading and the
// "tap a word" line every time it opens a category - empty and invisible
// for categories with no reference screen, one or more `.vocab-ref-card`
// links otherwise. The five reference functions' internal
// vocabRefBackTarget (also showVocabReference, the generic one used for
// Days of the week) changed from 'match-settings' to 'vocab-tile-selection'
// so Back returns to the selection screen they were opened from rather than
// jumping past it to the top-level list - the exact same back-target
// pattern hiragana/katakana's own reference screens already used, not a
// new idea for this codebase, just applied to five more screens.
//
// The old standalone cards are gone: the four inline `if (key === ...)`
// blocks inside the Object.keys(VOCAB).forEach loop, and the separate
// Appliances reference card that used to sit above that loop in Andrew
// mode. Nothing about the reference screens themselves changed - same
// titles, same content, same showScreen('vocab-reference') target - only
// where the link to reach them lives.
//
// Why this is better, not just different: a reference card's position in
// the old list had to be kept in sync by hand with wherever its category
// ended up - a problem that would only have gotten worse now that Andrew
// mode's list is alphabetized by label rather than fixed. Tying the
// reference to the category's own selection screen instead means it just
// always travels with its category, wherever that category's tile happens
// to sit in whichever list. Andrew's own framing: "wherever we put those
// selection screens we know the relevant reference screens will go with
// them" - exactly the property this delivers.
//
// Verified: 1289 items unchanged (this was a pure UI change, no VOCAB data
// touched), 11 categories still carry standaloneCard:false, all six
// vocabRefBackTarget updates present, no leftover references to the five
// removed inline card variables anywhere in the file. Syntax checked.
//
// LABEL TWEAK - SHIPPED (2026-08-31): 'Hotel: Appliances & machines' ->
// 'Hotel appliances & machines' (colon dropped, lowercase "appliances"),
// per Andrew. Still sorts to the same spot alphabetically (checked against
// the live VOCAB/THEMES data, not just reasoned about).
//
// REFERENCE LINK STYLING FIX - SHIPPED (2026-08-31): Andrew flagged that
// the folded-in reference link (left-justified, barely-there default
// .vocab-ref-card border) sat awkwardly above the centred "tap a word to
// select it for drilling" line - unbalanced page. Fix: gold border on that
// row always, not just on :hover, scoped to
// #vocab-tile-selection-ref-links .vocab-ref-card only so every other
// .vocab-ref-card in the app (Grammar notes hub, the two notes links, any
// future reference card) keeps its normal look. No layout or alignment
// change - the full-width highlight alone restores the visual balance,
// per Andrew's own read of the fix.
//
// GETTING AROUND GATING BUG FIXED + THREE MORE TRIP RETIREMENTS - SHIPPED
// (2026-08-31): Andrew asked what was left in Trip before the whole section
// could retire, and specifically wanted the Getting around bug fixed first,
// ahead of any more retirements. Bug: theme-getting-around's whole card
// used to hide unless Trip vocab was switched on (same pattern as the
// removed Survival vocab card), but only its `directions` slice is
// actually Trip-tier - `transport` and `places-to-go` are ordinary taught
// Level 2 content. getThemePool already drops Trip-tier items from a
// tagQuery pool on its own via the tier-visibility gate (then
// categoryTierVisible, since renamed to itemTierVisible - the exact
// mechanism theme-question-words relies on for its Andrew-tier slice) - so hiding
// the whole card was needlessly hiding L2 words too, for anyone who had
// Trip vocab switched off. Fixed by removing the card-level show/hide
// entirely; it's unconditionally visible now, same as Question words.
//
// With that fixed, retired the three Trip categories that were fully
// covered elsewhere: Food and drink (36/36 items via `food-drink`,
// already the promoted Food & drink card), Money and shopping (16/16 via
// `shopping`, already the promoted Shopping card), Directions and
// navigation (20/20 via `directions`, already Getting around above).
// Each had an includeItems cross-reference or two pulling in a word from
// elsewhere that hadn't been checked against the relevant tag yet - found
// and fixed three real gaps rather than just trusting the category's own
// items were the whole story: クレジットカード ("credit card", lived in
// Materials — Hotel: Appliances, tagged `appliances` only) got `shopping`
// added; ホーム ("platform") and まっすぐ ("straight", both from Materials
// — Stations, tagged `stations` only) got `directions` added. None of the
// three were ever at real risk of being lost - all three already had a
// home via their existing tag - but without the fix they'd have quietly
// dropped out of the specific Shopping/Getting-around views rather than
// showing up where they belonged.
//
// Weather (9 items) and Tourist phrases (16 items) are deliberately left
// as their own standalone Trip-tier tiles "for now" (Andrew's words) -
// both are single-source with no merge partner and no Collections card of
// their own yet (weather already got the lighter FLIP PILOT tagQuery
// conversion back on 2026-08-26; tourist-phrases hasn't). With this, every
// other Trip category is either retired or was never really Trip-only
// content to begin with (theme-getting-around's L2 slice) - Weather and
// Tourist phrases are the only two things standing between here and Trip
// actually going away as a section, and that's staying a deliberate,
// visible choice rather than something either flipped or force-merged
// today.
//
// Verified: 1289 items unchanged, 14 categories now carry
// standaloneCard:false in total (the 11 from earlier today plus these
// three). No dangling references to the removed theme-getting-around-card
// id anywhere in the file. Syntax checked.
//
// TRIP + ANDREW MERGED INTO "UNTAUGHT" - SHIPPED (2026-08-31): this is
// point (1) from the 2026-08-28 DECIDED entry above, and item 2 of THE FLIP
// list below - the piece both entries flagged as having "real near-term
// payoff" and being worth doing ahead of a full item-level rewrite of
// `level`. Landed the same day as the Getting Around fix and the three Trip
// retirements above, closing out the whole reorg thread that started
// 2026-08-27.
//
// What changed: every VOCAB category that was `level: 'andrew'` or `level:
// 'trip'` (19 categories, 843 items - Weather and Tourist phrases included,
// the two that stayed standalone-only above) is now `level: 'untaught'`.
// Trip vocabulary and Andrew mode - two toggles, two pills, two settings
// cards - collapsed into one: showUntaught (settings), level-pill-untaught,
// show-untaught-toggle-card. showTripVocab is gone outright. showAndrewMode
// survives as its own toggle/pill/card, reset to false for every user as
// part of the migration, and genuinely empty now - no VOCAB category uses
// level:'andrew' any more - ready to be the staging tier for L3 content
// later, exactly the role it was always meant to play (see its own
// settings-card description and the 2026-08-28 DECIDED entry above).
// Existing users migrate once, on load: showUntaught defaults to null
// (distinct from false, so this can only fire once) and resolves to
// showAndrewMode||showTripVocab the first time their saved settings are
// read, mirroring the showCustomContent precedent this file already had.
//
// Andrew asked directly whether the whole mechanism could work by tag
// rather than by category - it can, and does, exactly as far as it's
// useful to: every one of the 843 items already carries the 'untaught'
// item tag (100% coverage, verified again here before this shipped - see
// the 2026-08-28 TAUGHT/UNTAUGHT STATUS TAG entry for when that tag was
// added), so startRandomMatch's Untaught branch is now a genuine tag query
// - scanVocabByTag('untaught') - the same shape L1/L2 already use, instead
// of the old raw per-category `.level` walk (that walk still exists, but
// only as Andrew's fallback, since Andrew has no per-item tier tag of its
// own yet - there's nothing at level:'andrew' to tag). At the time this
// shipped, categoryTierVisible still took a category's `level`, not an
// item - `level` on a VOCAB category was still doing real work, just a
// narrower job than before: routing ("which screen does this category's
// own tile belong on"), not gating. That gap closed later the same day -
// see the PER-ITEM, NOT PER-CATEGORY entry further down, which converted
// categoryTierVisible itself (renamed itemTierVisible) to check the item's
// own tag directly too, everywhere it's called. The two approaches never
// disagreed even before that (verified: 843 untaught-tagged items exist,
// all and only inside untaught-level categories, zero elsewhere) - going
// category-level vs item-level only diverges for a word that needs to live
// in two tiers genuinely at once, which nothing currently does.
//
// Also moved as part of this: the two external notes links (sentence
// structure, Japanese vs English) out of Andrew mode and into the Level 2
// Grammar notes hub, gated by showUntaught rather than by which tab is
// open - a deliberate reversal of the 2026-08-31 decision to keep them
// Andrew-only (see showGrammarNotesHub's own comment). Andrew's reasoning:
// that decision was made back when most of this tagging/merging mechanism
// wasn't in place and the old Andrew/Trip staging split was still doing
// real work; now that every word is properly curated or encountered and
// gated by one toggle, there's no reason left to keep them out of the
// Level 2 view. Settings screen and instructions.html both rewritten to
// match - no remaining mention of "Trip vocabulary" as a live toggle
// anywhere in either file, checked directly rather than assumed.
//
// Verified: 1289 items unchanged; 20 `level:` fields updated (19 VOCAB
// categories plus theme-getting-around's decorative one); zero categories
// left at level:'andrew' or level:'trip'; 843/843 untaught items still
// carry the 'untaught' tag; zero remaining functional references to
// showTripVocab/toggleShowTripVocab/applyShowTripVocabVisibility/
// level-pill-trip/show-trip-vocab-toggle-card anywhere in index.html
// (historical comments describing the old mechanism are the only survivors,
// and read correctly as past tense). Settings migration simulated end to
// end for six cases (new user, previously off, Trip-only, Andrew-only,
// both on, already-migrated) - all resolve exactly as designed, idempotent
// on repeat runs. Syntax checked.
//
// THE FLIP: every drilling screen gets created the same way, and buckets stop
// mattering. Concretely, that means:
//
// 1. `level` stops being a category-level property (`level: 1`, `level:
//    'trip'`, etc. on a whole VOCAB entry) and becomes a per-item property.
//    Today `categoryTierVisible(cat.level)` gates a whole category at once;
//    it would need to gate per item instead, the same way Trip/Andrew
//    already works for tag pools (see the tagQuery branch of getThemePool -
//    a tagged item in an Andrew-only category already disappears from a tag
//    pool the moment Andrew mode is off, without the pool needing to know
//    that itself). Level should become "the most recent level this word was
//    genuinely re-taught at" (see the "bring forward" idea below), not "the
//    level it was first introduced at" - dateAdded keeps serving as the
//    historical record of first introduction, level moves forward. Screen
//    navigation is the other place this lives today, confirmed by reading
//    the actual code (not assumed): `(v.level || 1) !== currentMatchLevel`
//    appears twice, gating both the Vocab screen's category list and the
//    "random words at this level" picker - both compare a category's level
//    to whichever screen you're on. These two lines are the concrete places
//    that would need rewriting to read from an item's tags instead.
//
// 2. Trip/Andrew membership becomes a per-item tag too, not a category-level
//    gate. Today a category is either Trip-tier or Andrew-tier as a whole;
//    the goal is for Trip and Andrew to eventually merge into one pill/toggle
//    (Andrew mode is what surfaces the word, not which category it happens
//    to sit in). The four combined-tag test cards built in August 2026
//    (Stations, Food & drink, Shopping, Accommodation - see the
//    theme-*-combined THEMES entries and their "TEST ONLY" comments) proved
//    the query mechanism itself works and behaves correctly under every
//    Trip/Andrew toggle combination. What they did NOT test: making this the
//    ONLY way a word is found, with the old per-category Trip/Andrew gating
//    retired rather than running in parallel.
//
// 3. Categories stop being storage-plus-display and become pure display -
//    every screen (today's Level 1, Level 2, Trip, Andrew mode, and today's
//    hand-picked Collections) gets built the same way a tagQuery theme is
//    built now: a named, curated query over one flat item store, resolved
//    fresh each time. `includeItems` (the cross-reference mechanism used
//    before tags existed) becomes fully unnecessary once every word just
//    carries the tags it needs, wherever it physically lives - there should
//    be nothing left to cross-reference by then.
//
// 4. "Bring forward" for level: level updates in place (not duplicated) only
//    when a word is genuinely re-taught something new - a new conjugation,
//    or a script promotion (kana primary -> kanji primary, swapping
//    jp/altForm and flipping altIsStandard) - not incidental reuse in an
//    example sentence (that's what `seenAs` is for). This needs real L3
//    content to prove against before it can be built for real.
//
// 5. Once the shape above settles, the vocab data (VOCAB/THEMES) is a good
//    candidate to split into its own file, separate from the app logic
//    (index.html's screens/scoring/drilling code), with independent
//    versioning between the two - the app loads a given data file version
//    rather than the two being bumped in lockstep every time. This is what
//    "L3 becomes mostly a data-entry exercise" means in practice.
//
// Before starting: trace through exactly what currently assumes "a category
// has one level" - the L1/L2/Trip/Andrew screen navigation, the settings
// toggles, and buildCategoryItems all do today. Explicitly deferred until
// after the current pass of additive topic-tagging (Stations/Food-drink/
// Shopping/Accommodation and whatever else gets tagged before this starts) -
// and deferred until L3 exists, so classmates using the app between L2 and
// L3 aren't disrupted by an L1/L2 merge landing before they're ready for it.
//
// STATUS CHECK - HOW FLIPPED ARE WE (2026-08-31): Andrew asked directly,
// after the Trip/Andrew merge above shipped. Audited each point against the
// actual code rather than assumed, since several turned out to already be
// further along than this comment block gives them credit for - fixing one
// thing for its own reason quietly finished another.
//
//   Point 1 (level per-item, not per-category) - MOSTLY DONE at the time
//   this was written, since fully closed the same day - see the PER-ITEM,
//   NOT PER-CATEGORY entry further down. Every L1/L2 category (24 of them)
//   already resolves its own tile via tagQuery, not raw `.items` - turns
//   out this had already happened in earlier work, not something the merge
//   above did. Untaught's random-drill pool is now genuinely tag-based too
//   (scanVocabByTag('untaught')). Screen navigation (which tab a category's
//   tile lands on) is still a category `.level` compare, by design - see
//   the PER-ITEM entry for why that's a routing concern, not a gating one,
//   and was deliberately left alone. "Bring forward" (level updates in
//   place on genuine re-teaching) doesn't exist and, per a later
//   conversation with Andrew the same day, doesn't need to: forward-tagging
//   a word (e.g. tags:['L1','L3']) already makes it show up in both
//   levels' tag-query pools with zero extra mechanism, so there was never
//   really a gap here to close.
//
//   Point 2 (Trip/Andrew merge) - DONE, see the entry directly above this
//   one.
//
//   Point 3 (pure display, includeItems unnecessary) - MOSTLY DONE, two
//   loose ends. 28 of 43 VOCAB categories are pure tagQuery now (all L1/L2
//   plus Weather/Airport/Street/Hotel:Appliances from the FLIP PILOT
//   passes). Not yet flipped: Polite tourist phrases - the one remaining
//   live, standalone-tile category still reading `.items` directly, same
//   shape Airport/Street/Hotel:Appliances were in before their FLIP PILOT
//   conversion (2026-08-26/31) - same recipe would apply. `includeItems` is
//   still real, working code too: at least one live category still uses it
//   to reference words stored in Money & shopping and Materials - Shops.
//   Six retired categories (vocab-trip-prep, vocab-food-drink, vocab-
//   accommodation, vocab-money-shopping, vocab-directions-navigation,
//   vocab-materials-shops) still declare their own includeItems arrays, but
//   those are dead now - nothing calls their own tile any more since they
//   retired, so those six arrays are safe to delete whenever it's worth the
//   diff, purely cosmetic.
//
//   Points 4 and 5 (bring-forward, split data into its own file) - NOT
//   STARTED, correctly, both explicitly waiting on real L3 content existing
//   to design against.
//
// PRE-L3 PUNCH LIST CLEARED - SHIPPED (2026-08-31): Andrew asked for all
// three items below done as soon as possible, specifically so L2 could be
// considered complete and ready for L3 to start. All three landed the same
// day they were flagged:
//
//   (a) Polite tourist phrases flipped to tagQuery - last of the four
//       single-source untaught categories to get the FLIP PILOT treatment
//       (Airport/Street/Hotel:Appliances were 2026-08-26/31). No
//       includeItems in or out (checked), all 16 items already carried
//       `tourist-phrases`, used nowhere else - bare tagQuery, zero new
//       tagging needed, item count unchanged (16/16 verified).
//
//   (b) The six dead includeItems arrays deleted (vocab-trip-prep,
//       vocab-food-drink, vocab-accommodation, vocab-money-shopping,
//       vocab-directions-navigation, vocab-materials-shops) - each had been
//       unreachable since its own tile retired, confirmed before removing
//       by grepping every one of the six keys for any reference outside
//       its own definition (none found). While doing this, also found and
//       fixed six more stale "see includeItems above/below" comments left
//       over from the earlier Airport/Street/よやく flips (2026-08-26/31)
//       that were already pointing at nothing before today - not part of
//       the original ask, fixed anyway since they were found in passing.
//
//   (c) Food & drink split into five - Andrew's call was separate cards,
//       "for now". theme-food-drink-combined (218 items, by far the
//       biggest pool in the app, mixing dish/drink nouns, adjectives, prep
//       verbs, and full phrases as each other's multiple-choice
//       distractors) became five tagQuery cards: Food (128, food-type),
//       Drink (16, drink), Dining phrases (21, dining-phrase), Food
//       descriptions (36, food-adjective), Preparation & cooking (17,
//       preparation). Every one of the 218 items already carried exactly
//       one of these five sub-tags (checked directly - the "53 untagged"
//       count from the original flagging turned out to be an incomplete
//       filter on my part, not a real gap; food-adjective and preparation
//       were already there, just not checked for) - zero new tagging
//       needed, a pure regrouping. Each query AND'd with `food-drink`
//       deliberately (not left bare) to keep this a lossless split of the
//       same 218 items rather than widening scope - food-type/drink are
//       also dual-tagged on 9 taught vocab-food-drink-l2 words, which a
//       bare query would have pulled in for free; noted but not done,
//       since blending taught content in is a placement decision too
//       (Collections vs. staying Untaught-only, like Getting around vs.
//       the other combined cards), not just a tagging one.
//
// Verified: 1289 items unchanged throughout. Every one of the resulting 18
// Untaught tiles (13 theme keys + 5 plain VOCAB categories) resolves to a
// real, non-zero item count - checked directly against the live data, not
// assumed. instructions.html rewritten to match (Food & drink's one bullet
// replaced with the five new ones, Polite tourist phrases' entry unchanged
// since its label didn't change). Syntax checked throughout.
//
// PER-ITEM, NOT PER-CATEGORY - SHIPPED (2026-08-31): closes the gating half
// of THE FLIP point 1, the same day it was flagged as the one remaining
// piece of point 1. Andrew's framing: genuine drilling by item tags rather
// than the category a word happens to sit in should be doable, and it was.
// categoryTierVisible(cat.level) - a per-category pre-filter called from
// four places (getThemePool's buildCategoryItems, resolveVocabCategory's
// tagQuery branch, submitVocabSearch, scanVocabByTag) - is now
// itemTierVisible(item), checking the item's own tag directly instead.
// Straightforward because the data was already 100% clean going in (every
// untaught item already carries 'untaught', verified before this shipped,
// same fact the earlier tag-vs-category discussion relied on) - this was a
// pure mechanism swap, not a data-fixing exercise. Zero behaviour change
// today, by construction: since category membership and item tags already
// agreed on every single item, moving the check from one to the other
// can't change what any scan returns - the only thing this buys is
// correctness going forward, for the day a word needs to live in two tiers
// at once (currently: nothing does).
//
// Also settles the "bring forward" half of point 1, in a follow-up
// conversation the same day: Andrew pointed out that a word simply getting
// tagged with both levels (e.g. tags:['L1','L3']) already makes it show up
// correctly in both levels' random-drill pools via the existing tag-query
// mechanism (scanVocabByTag/getThemePool), with zero extra machinery
// needed. There was never a real gap here - "level moves forward" was
// solving a problem forward-tagging already solves more simply. Point 4
// (bring-forward) stays flagged as not started, but the concern it existed
// to address turns out to already be covered.
//
// Screen navigation (buildMatchCategoryList/setMatchLevel comparing
// `(v.level || 1)` against currentMatchLevel) is deliberately untouched -
// that's "which tab does this category's own tile live under", a routing
// question a category needs exactly one answer to, not a gating question
// that makes sense per item. Point 1's original text bundled routing and
// gating together as one "level becomes per-item" ask; in practice they
// turned out to be two different concerns, and only the gating one
// actually needed to change.
//
// Verified: every one of the 18 Untaught tiles from the entry above still
// resolves to the exact same item count as before this change (checked
// directly, not assumed) - confirming the swap really is behaviour-neutral
// today. Search, Collections, Random - Everything, and every Untaught
// category tile all route through one of the four converted call sites,
// so nothing was left on the old per-category check. Syntax checked.
// =============================================================================

// VOCAB lives in vocab.js (split out 2026-10-08), loaded by the <script src>
// just before this script. Same object as before - everything below, the
// private Genki loader included, uses VOCAB exactly as it did when it was
// written inline here.
if (!window.JP_DRILL_VOCAB) {
  document.body.insertAdjacentHTML('afterbegin', '<div style="margin:1rem;padding:1rem;border:1.5px solid #e5484d;border-radius:12px;color:#e5484d;font:600 15px/1.4 sans-serif;text-align:center;">The word list (vocab.js) didn\'t load. Check your connection and reload the page.</div>');
  throw new Error('vocab.js did not load');
}

// PRIVATE VOCAB PACKS (2026-10-02) - extra categories kept OUT of the
// published app (e.g. textbook word lists, which shouldn't sit on a public
// site) and loaded per device from a JSON file via Settings > Private vocab.
// The file is stored in this browser's localStorage and merged into VOCAB
// here, before anything else reads VOCAB. A pack can only ADD categories -
// a key that already exists in the app's own data is skipped, never
// overwritten. Pack categories get privatePack:true and lead the Untaught
// list (see buildMatchCategoryList). File format:
//   {"format":"jp-drill-private-vocab","version":1,"name":"…",
//    "categories":{"vocab-…":{level,label,chars,tagQuery,items:[…]}}}
// with categories shaped exactly like VOCAB entries.
// LEVEL 4 APP (2026-11-04): every storage key starts jpL4 (was jpDrill), so
// this app and the Level 3 app - same web address, so same browser storage -
// never read or overwrite each other's scores and settings. Moving over:
// Settings > Backup in the L3 app, Restore here.
// About the loaded file, for the Settings status line: its own "updated"
// date, and how many of its words the app already has. Those are skipped
// (2026-10-02) - a word that's moved from the private file into the taught
// course would otherwise show twice - and a non-zero count means the file
// on this device is out of date, so Settings flags "check your file".
(function loadPrivateVocab() {
  try {
    const raw = localStorage.getItem(PRIVATE_VOCAB_KEY);
    if (!raw) return;
    const pack = JSON.parse(raw);
    if (validatePrivateVocabPack(pack)) return;
    PRIVATE_VOCAB_INFO.updated = typeof pack.updated === 'string' ? pack.updated : null;
    const appWords = new Set();
    Object.keys(VOCAB).forEach(k => VOCAB[k].items.forEach(i => appWords.add(i.jp + '|' + i.en)));
    Object.keys(pack.categories).forEach(key => {
      if (VOCAB[key]) return; // never override the app's own data
      const cat = pack.categories[key];
      const items = cat.items.filter(i => !appWords.has(i.jp + '|' + i.en));
      PRIVATE_VOCAB_INFO.skipped += cat.items.length - items.length;
      VOCAB[key] = Object.assign({}, cat, { items, privatePack: true });
      PRIVATE_VOCAB_KEYS.push(key);
    });
  } catch (e) { /* storage unavailable or corrupt - app runs without the pack */ }
})();

// Groups (THEMES) live in vocab.js as window.JP_DRILL_GROUPS (moved 2026-10-12)
// - see the GROUPS note there for the fields. Each Group brings together words
// from several VOCAB categories into one drillable screen without copying
// them; its word list is worked out fresh each time (see getThemePool).
const L12_LIST = window.JP_DRILL_L12_LIST || [];

// Every source category above is Level 2 or Trip - itemTierVisible
// below is the single gate that applies to any tier an item's tags
// might carry, so adding a new tier later needs no change here.
//
// For noSort themes, items come back in the same flat original order as
// before (unchanged behavior). For grouped themes, each group's categories
// are concatenated, sorted together by `en` (case-insensitive, stable so
// true ties keep their original relative order), and every item is tagged
// with `dividerGroup` = its group's index - buildVocabTileGrid uses that to
// draw a divider between groups.
// Tag-query matching, shared by getThemePool's tagQuery branch below and
// resolveVocabCategory's tagQuery branch: a query is either a single tag
// string (item just needs that one tag - how every tagQuery so far has
// worked, e.g. 'weather', 'shopping') or an array of tags, in which case
// the item needs ALL of them (AND, not OR). The array form is what makes
// a query like ['L1','places'] work - it picks out only the words that
// are both a place AND taught at L1, even though 'places' alone is also
// carried by Trip prep's まち/やすみ and Materials - Shops' 夏季無休, none
// of which are L1 at all. Built 2026-08-26 specifically so L1/L2
// categories can flip to tag queries later without any visible change -
// see the FUTURE DIRECTION note above VOCAB.
// {any:[...]} added 2026-08-27 - OR, item needs ANY ONE of these tags.
// For Collections that are really just a union of a few whole categories
// that already have their own topic tag (Transport+UK Places,
// Countries+Cities, etc.) - see the THEMES entries using this shape.
// Deliberately its own wrapper rather than reusing a bare array for OR -
// a bare array already means AND above, and letting one shape mean two
// different things would be exactly the kind of implicit behavior this
// file has tried to avoid all session.
// IMPORTANT: converting a THEMES entry from `groups:[[...],[...]]` to
// `tagQuery:{any:[...]}` is NOT purely internal the way the L1/L2 AND
// flip was. `groups` alphabetizes within each named group and stamps
// dividerGroup so the UI draws a line between groups (see
// buildCategoryItems/getThemePool below); tagQuery returns one flat,
// fully-interleaved alphabetical list with no dividerGroup at all. Word
// membership can end up identical while the on-screen grouping still
// visibly changes - check that before swapping any Collection over,
// don't assume it's silent just because the AND flip was.


// Alphabetical by English meaning, case-insensitive, stable (true ties keep
// their original relative order) - same comparator as the grouped-theme sort
// above. Used to sort a plain VOCAB category's tile-selection view without
// touching the underlying stored array (see resolveVocabCategory) - that way
// Materials keeps its chronological/photo-order items array (dateAdded,
// source, etc. all still make sense read in that order) while what the user
// actually browses to pick words to drill is always alphabetical, same as
// every other category. Computed fresh each call rather than pre-sorted by
// hand in the data - cheap at this scale, and removes the maintenance chore
// of manually re-alphabetizing VOCAB every time a word gets added or edited
// (which is exactly how Level 1/2 ended up out of order before).

// Synthesized theme "categories" are kept in their own cache, deliberately
// separate from VOCAB itself - merging them into VOCAB would make every
// Object.keys(VOCAB) scan (startRandomMatchEverything, buildMatchCategoryList,
// etc.) double-count items that a theme pulls in from existing categories.
// Rebuilt on every call rather than memoized long-term, so a theme screen
// always reflects the current custom-content toggle state.

// Search across whatever's currently visible (L1/L2 always, Trip/Andrew if
// switched on - see itemTierVisible) - matches against en and romaji
// only, deliberately not seenAs: that's incidental sentence context, not
// vocab that was actually taught or added on purpose, and searching it
// would surface words by way of unrelated background text. Enter/submit
// only, not live-as-you-type - a live version would be re-filtering a
// results screen out from under you on every keystroke, which is exactly
// the kind of thing that's obvious in hindsight and easy to miss up front.
//
// Matching is word-start, not plain substring - checked against the real
// data before landing here: a plain substring search for "up" pulled back
// 20 words, but only 6 were actually about "up" (get up, wake up, line up,
// drink up, tie up, hold up to) - the other 14 were coincidence, "up"
// happening to sit inside Spain (supein), soup, occupied, supermarket,
// support, and so on, with no connection to the query at all. Splitting
// each field into words and requiring the query to be the START of one of
// them fixes that (up no longer matches the middle of "occupied") while
// staying far more flexible than matching only the start of the whole
// field the way it might look from the outside - "cred" still finds
// "credit card", "pillo" still finds every pillow entry, "exit" still finds
// exit/west exit/emergency exit. A multi-word query (e.g. "west exit")
// requires every word typed to start some word in the entry, not the exact
// phrase - so word order/spacing in what you type doesn't have to match
// the entry exactly either.
// The × only shows while there's something to clear.


let drillByMeaning = false;

// Independent of drillByMeaning (which decides whether romaji or English is
// prominent) - this decides which SIDE is the question and which is the
// answer options. Combined, the two give four modes for the price of two
// toggles: JP shown/pick romaji (default), JP shown/pick English, romaji
// shown/pick JP, English shown/pick JP. Deliberately a different variable
// name from the existing kana-only `reversed` flag (hiragana/katakana
// direction), which this has nothing to do with.

// Alternative to picking from four options: type the romaji reading
// yourself (see chooseTyped()). Kana -> romaji only, by design (Andrew,
// 2026-09-22) - typing English meanings back was considered and rejected,
// since those are free prose (commas, brackets, alternate phrasings) and
// can't be matched reliably, unlike romaji which is a small, near-canonical
// answer space. Only meaningful in the plain forward reading question, so
// it's mutually exclusive with both drillByMeaning and vocabReversed -
// turning this on switches those off (and vice versa), enforced below in
// syncVocabModeToggles() rather than left as three independently-clickable
// toggles that could combine into a state with no matching UI.
// TYPING JAPANESE + LISTENING (2026-10-07): typing now also works reversed -
// see the English, type the Japanese (chooseTypedJapanese) - so Type and
// Reverse no longer switch each other off. listenMode hides the word and
// plays it instead (forward word questions only), so it can't combine with
// Reverse, and needs sound on. Rules, in one place:
//   Highlight meaning - off while reversed or typing (as before)
//   Reverse           - off while listening
//   Type              - off while highlighting the meaning
//   Listen            - off while reversed, or with sound off

// DICE PAGE SWITCHES (2026-10-11): the dice page keeps its OWN copy of the
// four switches (randomModes). They used to be the shared globals above,
// which every category drill overwrites with its own per-category settings -
// so after drilling a category with Reverse on, the dice page showed Reverse
// off but ran its next drill reversed. Copied into the globals only when the
// dice page's Start is pressed (applyRandomModes). Found by the Portuguese
// test app, confirmed in L3.

function toggleDrillByMeaning() {
  randomModes.meaning = !randomModes.meaning;
  if (randomModes.meaning) randomModes.type = false;
  syncVocabModeToggles();
}


// Shared by all three vocab-mode toggles above - keeps their 'selected'
// state and their mutual-exclusion greying in one place instead of three
// slightly-drifting copies. "Highlight the meaning" has no effect while
// reversed (reversed always shows English regardless of it) or while typing
// the answer (typed mode is always the plain forward reading question);
// "Reverse the drill direction" and "Type the reading" grey each other out
// the same way, for the same reason.

// Canonicalizes a typed romaji answer (and the stored answer it's compared
// against) so learners aren't marked wrong for reasonable spelling
// differences that don't reflect an actual reading mistake: case, leading/
// trailing/doubled whitespace, trailing punctuation, macrons vs doubled
// vowels, the "oo"-for-loanwords vs "ou"-for-native-words split our own
// data isn't consistent about (boorupen vs arigatou), and the classic
// kunrei-shiki/Hepburn consonant pairs (si/shi, ti/chi, tu/tsu, zi/ji,
// hu/fu). Comparison-only - never used for display, so the app's own
// canonical spelling (e.g. "boorupen") is always what's shown back.
function canonicalizeRomaji(str) {
  return (str || '')
    .toLowerCase()
    .trim()
    .replace(/[.!?,]+$/g, '')
    .replace(/\s+/g, ' ')
    .replace(/ā/g, 'aa').replace(/ī/g, 'ii').replace(/ū/g, 'uu')
    .replace(/ē/g, 'ee').replace(/ō/g, 'ou')
    .replace(/oo/g, 'ou')
    .replace(/si/g, 'shi').replace(/ti/g, 'chi').replace(/tu/g, 'tsu')
    .replace(/zi/g, 'ji').replace(/hu/g, 'fu');
}


// Fisher-Yates (2026-10-10). The old sort(() => Math.random() - 0.5) is a
// known biased shuffle: with 4 answer options the first one (the correct
// answer, since options are built as [answer, ...distractors]) landed in
// position 1 about 28% of the time and position 4 only 19%, instead of 25%
// each - Andrew noticed 6 of 12 correct answers in position 1.

// Sokuon (small tsu - doubles the following consonant) and the small kana
// used to build combination sounds (きゃ etc) or katakana loanword combos
// (ファ, ティ etc) print visibly smaller than their neighbours in real
// Japanese typography. The font renders them a little smaller already, but
// not by enough to read clearly - wrapping them in their own span with a
// deliberately reduced size makes the distinction obvious (e.g. つ vs っ,
// や vs ゃ) rather than relying on subtle font metrics alone.
const SMALL_KANA_CHARS = new Set([
  'っ','ッ','ゃ','ゅ','ょ','ャ','ュ','ョ',
  'ぁ','ぃ','ぅ','ぇ','ぉ','ァ','ィ','ゥ','ェ','ォ','ゎ','ヮ',
]);


// Wraps any small kana found in a string in a <span class="small-kana">, for
// use anywhere real Japanese text is inserted via innerHTML. Safe to call on
// any string, including ones with none of these characters - a no-op then.
// Small kana sized right: the language's display rule now (LANG.displayHtml,
// lang/ja.js), which the core uses too. The name stays for its many callers.
function markSmallKana(text) { return displayWordHtml(text); }

// Finds where the drilled word sits inside its own seenAs example sentence,
// so it can be highlighted - checked against the real data before building
// this: a plain substring search alone covers about 70% of entries as-is.
// Most of the rest are verb/adjective conjugation (お買い求めください for
// 買い求める, 選んで for 選ぶ) - Japanese conjugation only ever changes the
// tail, the kanji stem stays put, so stripping 1-2 characters off the end
// and retrying catches most of those too. What's left after that - 〜
// placeholder words like 〜階ホームです standing in for an already-filled-in
// number, and the couple of seenAs notes that describe the word rather than
// quote a sentence containing it (まいばすけっと, 道民) - genuinely has
// nothing to find, so this returns null and the sentence renders unhighlighted,
// same as before this existed. Checked separately: every long, hard-to-scan
// entry (searched by Andrew's own example) matched on the first plain
// attempt - it's exactly the short entries, easy to read at a glance anyway,
// where the fallback doesn't land.

// Renders a seenAs sentence with the drilled word highlighted where it can
// be found (see findSeenAsHighlightRange) - splits the plain string into
// before/match/after around the found range *before* running markSmallKana
// on each piece separately, so small-kana wrapping (っ/ゃ/ゅ/ょ etc) still
// happens correctly inside and outside the highlighted span rather than
// getting confused by HTML already injected into the string.

// Rough plausibility score between two option strings (romaji or English
// gloss, whichever field is being tested) - same starting letter counts as a
// strong signal of shared "sound", similar length as a weaker one. Used to
// bias distractor selection toward options that are actually confusable,
// rather than pure-random words from the pool.

// Picks distractors that are guaranteed distinct from the correct item AND
// from each other, on whichever field is actually shown/matched for the
// current drill mode - not just romaji. Without this, two different words
// that happen to share an English gloss could produce duplicate visible
// options, and since both would carry the same dataset.value in meaning
// mode, tapping either would register as correct.
//
// Classmate feedback: pure-random distractors from the whole pool are often
// so dissimilar (wildly different length or starting sound) that you can
// eliminate wrong options on sight without actually recognising the word -
// e.g. the Japanese prompt starts with "ga" and only one of four random
// romaji options happens to start with "g". Biasing toward more confusable
// candidates (matching first letter/length) forces genuine recognition
// instead, without pulling in words from outside the existing pool.


// Tile-selection reference for flat vocab categories (Colours, Trip-prep) —
// no sections/pills needed since these are single unordered lists, unlike kanji.
const vocabTileDrillMode = {}; // categoryKey -> boolean, remembered independently per category
// categoryKey -> boolean. When true, a "Select random 20" pick is active: the
// real selection (used for drilling) is a genuine random 20, but every tile
// is shown as selected and made non-interactive, so there's no visual way to
// tell which 20 were actually picked. Only relevant for theme screens.

function toggleVocabTileDrillMode() {
  const categoryKey = vocabTileCategory;
  vocabTileDrillMode[categoryKey] = !vocabTileDrillMode[categoryKey];
  if (vocabTileDrillMode[categoryKey]) vocabTileTypeAnswerMode[categoryKey] = false;
  syncVocabTileModeToggles(categoryKey);
}


// Per-category twin of the global syncVocabModeToggles (see its own
// comment) - same three-way mutual exclusion (typed answers only make sense
// for the plain forward reading question), just reading/writing the
// per-categoryKey objects above instead of the three bare globals, since
// every one of these already persists independently per category.

// Maps a category key to the reference screen(s) that belong with it -
// REFERENCE SCREENS FOLDED IN (2026-08-31). Used to be five separate
// ".vocab-ref-card" links hand-placed in buildMatchCategoryList, positioned
// just above their category's own tile in the list - correct, but fragile:
// the reference card's position had to be kept in sync by hand with wherever
// its category ended up in the list (a problem the same day's alphabetical-
// order change would have made worse, since a category's list position now
// depends on its label rather than being fixed). Andrew's proposal: instead
// of tying the reference to a position in the list, tie it to the category
// itself and show it on that category's own tile-selection screen - "tap a
// word to select it for drilling" screen, reference link included. Applies
// equally to L2 (four of these five) and Andrew (one) since both route
// through this same function. Each function here still sets its own
// vocabRefBackTarget internally (now 'vocab-tile-selection' instead of
// 'match-settings' - see each function's own definition) so Back returns to
// the selection screen it was opened from, not the top-level category list -
// same precedent already used for hiragana/katakana's own reference screens.
Object.assign(CATEGORY_REFERENCE_LINKS, { // the core's, from APP.categoryLinks
  'vocab-time-l2': [
    { label: 'Day / week / month / year — reference', fn: showTimeUnitsReference },
    { label: 'Minute endings (1–10) — reference', fn: showMinuteReference },
  ],
  'vocab-days-of-month-l2': [
    { label: 'Days of the month (1st–31st) — reference', fn: showDaysOfMonthReference },
  ],
  'vocab-days-l2': [
    { label: 'Days of the week (in order) — reference', fn: () => showVocabReference('vocab-days-l2') },
  ],
  'vocab-animals-l2': [
    { label: '12 zodiac animals & the clock — reference', fn: showZodiacClockReference },
  ],
  'vocab-materials-hotel-appliances': [
    { label: 'Appliances reference', fn: showApplianceDeviceReference },
  ],
});


// Level-colour borders, for theme screens only (items pooled from several
// source categories at once, so a tile's own level isn't otherwise visible).
// Deliberately distinct from --accent (gold), which .selected already owns -
// same border-slot handoff the Colours category already does: level colour
// while unselected, gold once selected.
//
// COLOUR BY TAG, NOT BUCKET (2026-08-31): keys were originally `trip`/
// `andrew`, read straight off the category-level `level` value. Andrew's
// call: keep the purple/green (they work well), but stop deriving them from
// which category a word happened to live in and derive them from a real
// per-item property instead - exactly the `encountered`/`curated` tags
// added the same day (see the FUTURE DIRECTION entry below for the full
// reasoning). Same two colours, same split (encountered was `andrew`,
// curated was `trip`), just tag-sourced now. `1`/`2` are untouched - taught
// levels aren't part of this change.
// GENKI COLOUR (2026-09-12): rose/pink (#d1568f) - green was ruled out (too
// close to both --green/confidence and 'encountered' above), teal had
// already been tried elsewhere and rejected, red reads as "wrong answer"
// everywhere else in the app, and yellow either crowds --accent (gold) or
// runs too bright. Pink was the first hue in the wheel not already claimed
// by another indicator in this app. Genki's own pill retired 2026-09-28
// (Lesson 1-1 folded into Untaught instead - see buildMatchCategoryList),
// but this key stays live: its word tiles are still bordered pink inside
// their own category screen.
// LEVEL 3 COLOUR (2026-09-28): brown (#a0684d) - the one hue in
// COLOUR_HUES not already claimed by another indicator (green/yellow both
// ruled out above for the same reasons Genki's pick avoided them).
// (2026-10-15) L3 changed brown -> teal: next to L2's orange on the Grammar page the
// two read as one colour, brighter and darker. Brown went to the Grammar pill.
// (2026-11-05) Taught levels a touch brighter and drawn 2px; L4 added (it had no
// edge at all). Tourist (curated) bronze and Untaught (encountered) slate are
// deliberately dimmer and drawn dashed - see applyLevelTileEdge.
Object.assign(LEVEL_BORDER_COLORS, { 1: '#5b9bff', 2: '#ff9a52', 3: '#2ec4b6', 4: '#a888f0', curated: '#a5865f', encountered: '#6b7a88', genki: '#d1568f' }); // the core's, from APP.levelColors

// Resolves which LEVEL_BORDER_COLORS key applies to a pooled item. Untaught
// items carry `encountered`/`curated` as a real tag now (not inferred from
// category/level), so this checks tags first; taught items have neither
// tag, so this falls through to the old level-based key (1 or 2) exactly as
// before. Pooled items always carry their own `tags` array intact (see
// buildCategoryItems - Object.assign spreads the raw VOCAB item over the
// synthesized level/groupKey fields, so `.tags` survives untouched).
// (2026-11-05) Taught words go first: 51 taught words also carry a
// curated/encountered provenance tag (あき, もみじがり…) and were showing the
// Tourist/Untaught colour. A taught word now shows the level it was first
// taught at (lowest L tag), falling back to its category's level.
// Japanese's colour rule, used by the core's itemColorKey (APP.itemColorKey).
function jaItemColorKey(item) {
  const tags = item.tags || [];
  if (tags.includes('taught')) {
    const lv = tags.map(t => /^L(\d)$/.exec(t)).filter(Boolean).map(m => +m[1]);
    return lv.length ? Math.min(...lv) : item.level;
  }
  if (tags.includes('curated')) return 'curated';
  if (tags.includes('encountered')) return 'encountered';
  return item.level;
}

// Level edge on a pooled tile: 2px in the level colour; Tourist/Untaught
// (and the private Genki pack) dashed so they read as extras, not levels.
// Selected tiles drop back to the normal solid accent edge.


// Colours category only: border shows the tile's own hue, at an intensity that
// scales with confidence (dim/grey at low scores, vivid at high scores).
// Black and white use a grayscale range instead, since "saturation of black"
// isn't a meaningful thing to show.

// KEYBOARD/SCREEN-READER ACCESS - KNOWN GAP, NOT YET ACTIONED (2026-09-05):
// the actual drill-answer screen (renderQuestion, further down) is fine -
// its options are real <button> elements, plus handleDrillKeydown gives
// digits 1-4 and space/enter as documented shortcuts, so tab/Enter/Space
// and the shortcut keys both already work there.
//
// What's NOT covered: the tiles this function builds (one plain <div
// class="kana-ref-card"> per word, onclick set in JS, no tabindex, no
// keyboard equivalent at all) - used here to choose which words go into a
// drill, potentially dozens per category. Same story for the ~38 other
// onclick divs elsewhere in this file (Settings toggles, category/screen
// navigation cards) - none of them are reachable by keyboard, and unlike
// the drill screen there's no shortcut-key fallback for any of them either.
//
// A real fix needs more than tabindex: role="checkbox" + aria-checked here
// (selecting a tile is a toggle, not a navigation), role="switch" for the
// Settings toggles, role="button" for plain navigation cards, a keydown
// handler translating Enter/Space into the existing click handler, and
// keeping aria-checked in sync at every place the code already toggles the
// selected/on state - roughly 15-20 different toggle functions scattered
// through the file, not one place - plus a focus-visible CSS outline, since
// only hover styling exists today. Rough estimate ~150-250 lines total,
// spread thin across 20+ locations rather than contained to one function,
// the opposite shape to a normal feature addition here.
//
// Deliberately not built speculatively - nobody's asked for it and the
// core drilling loop is already keyboard-usable. Revisit if it actually
// comes up (a classmate on a laptop/screen-reader, say), rather than before.
//
// Categories whose word screen offers "Show romaji instead of kana"
// (2026-10-01) - Tourist essentials, so a classmate going to Japan with
// little kana can use the page as a phrasebook. Grid display only.
// The Tourist pill's section cards (2026-10-15) offer it too.
const ROMAJI_VIEW_CATEGORIES = ['theme-tourist-essentials', 'theme-te-phrases', 'theme-te-little', 'theme-te-food', 'theme-te-around',
  'theme-te-hotel', 'theme-te-shops', 'theme-te-health', 'theme-te-weather'];
function toggleTileShowRomaji() {
  appSettings.tileShowRomaji = !appSettings.tileShowRomaji;
  saveSettings();
  const card = document.getElementById('vocab-tile-romaji-card');
  if (card) card.classList.toggle('selected', appSettings.tileShowRomaji);
  updateTileSelectionSubText(vocabTileCategory);
  buildVocabTileGrid(vocabTileCategory);
  refreshKanaScoreShading('vocab-tile-grid');
}

// What holding a card shows (APP.tilePeekHint).
function jaTilePeekHint(categoryKey) {
  let peek = 'Hold a card to see its reading.';
  let hasVerb = false;
  try { hasVerb = resolveVocabCategory(categoryKey).items.some(isVerbItem); } catch (e) { /* no items yet */ }
  if (hasVerb) peek += ' On a verb, slide towards the bubble and let go to see all its forms.';
  return peek;
}
// Speaks the card's kana (or its speakAs override) with a Japanese voice -
// same settings as the drill's hint button (speakCurrent). Picks a ja voice
// explicitly where one is listed, since some Android browsers ignore
// utter.lang alone; if the device has none, says so on the toggle card
// rather than reading Japanese in an English voice without explanation.

function tileKanaFontSize(jp) {
  const len = [...jp].length;
  return len <= 4 ? '28px' : len <= 8 ? '20px' : len <= 12 ? '16px' : '13px';
}
function tileRomajiFontSize(romaji) {
  const rlen = romaji.length;
  return rlen <= 10 ? '22px' : rlen <= 18 ? '17px' : rlen <= 26 ? '14px' : '12px';
}
// HOLD TO PEEK (2026-10-02) - hold any word card ~half a second and a
// bubble shows its kana, romaji and English (and, if sound is on, says it);
// let go and it disappears. A bubble rather than changing the card text,
// because the holding finger covers the card. A peek, not a toggle, so the
// list keeps testing you on the kana. A finger that starts moving is a
// scroll, which cancels the hold; the click that follows a peek is
// swallowed so it doesn't also select the card.
// Placement: above the card if it fits, else beside it on the roomier
// side (away from the finger), else below - always clamped on-screen.
// What a held word's bubble shows (APP.peekFill): the word, its reading and
// meaning, and on a verb, a hint to slide for all forms (the arrow is set
// once the bubble's side is known). Kana (2026-10-16, from the Kanji
// Strokes app) are drawn stroke by stroke instead, with romaji and stroke
// count; contracted kana (きゃ) are two characters side by side. Returns the
// drawing to start once the bubble is placed.
function jaPeekFill(b, item) {
  const verbHint = isVerbItem(item) ? '<div class="peek-hint"><span class="peek-arrow">↑</span> slide here for all forms</div>' : '';
  if (item.glyphs) {
    const total = item.glyphs.reduce((t, g) => t + g.length, 0);
    const lay = peekGlyphLayout(item.chars || [], item.glyphs.length);
    b.classList.add('peek-kana');
    b.innerHTML = `<svg class="peek-svg" viewBox="0 0 ${lay.width} 109" style="width:${Math.round(84 * lay.width / 109)}px" aria-hidden="true"></svg><div class="peek-kana-text"><div class="peek-romaji">${item.romaji}</div><div class="peek-en">${total} stroke${total === 1 ? '' : 's'}</div></div>`;
    return () => playPeekStrokes(b.querySelector('.peek-svg'), item.glyphs, lay);
  }
  b.innerHTML = `<div class="peek-jp">${markSmallKana(item.jp)}</div><div class="peek-romaji">${item.romaji}</div><div class="peek-en">${item.en}</div>${verbHint}`;
  const wordStrip = peekWordStrip(item);
  if (wordStrip) { b.insertBefore(wordStrip.svg, b.querySelector('.peek-hint')); return () => playPeekWord(wordStrip); }
  return null;
}


// Restores a tile's resting border colour after deselection - Colours uses
// its own hue/confidence style, theme tiles use their source level's colour,
// everything else has no special resting border at all.


// Selecting everything for real is also the "reveal" action out of a random-20
// disguise - genuinely selecting every item makes the distinction moot, so
// this always clears vocabTileRandomMode on its way through.

// How many tiles "Random N" picks for a given category. Themes are always
// far bigger than any single category and never shrink below the point
// where a random pick stops meaning anything, so they keep a flat 20
// regardless of size (see currentRandomPickSize). Regular categories scale
// instead: below 21 items, Select all already covers it and a random pick
// wouldn't meaningfully reduce anything, so there's no button at all.

// Single source of truth for "how big is this category's random pick, if it
// has one at all" - used by showVocabTileSelection (to show/hide and label
// the card), toggleRandomVocabTiles (to do the actual picking) and
// updateRandomVocabTilesLabel (to word the button), so the three can never
// drift out of sync with each other.

// "Select random N" - N depends on category size (see currentRandomPickSize).
// Toggles between two states:
//  - off: normal per-tile selection, exactly like Select all/individual taps.
//  - on: a genuine random N (or all, if the category has fewer than N items)
//    is chosen and used for drilling, but every tile renders as selected and
//    becomes untappable - deliberately no visual way to tell which N were
//    actually picked. Toggling off clears the selection and restores normal
//    per-tile interaction (see buildVocabTileGrid for the rendering side).

// Both cards sit at rest with a plain, quiet border (no permanent emphasis)
// and only pick up the gold "selected" fill while their action is genuinely
// the one currently active - doubles as the answer to "which mode am I in",
// without needing to read either label closely.


// NAVIGATION HISTORY (2026-10-16, Andrew: "make it feel like a proper app").
// Every screen change is recorded here, so Back - the "← Page" button at the
// top-left of inner pages, the phone's own back gesture, and the settings cog
// tapped a second time - always goes exactly one step up. Rules:
//  - The four tab pages (かな / 漢字 / Numbers / Vocab) are roots: arriving at
//    one starts history afresh, and Back there does nothing (so you can't
//    leave the app by accident). Switching Vocab pills doesn't add history.
//  - The drill and results screens are never stepped back INTO: Back from
//    either goes to wherever the drill was started. (Settings opened mid-drill
//    is the exception - Back returns to the drill.)
//  - Going to the screen that's already one step back counts as going back
//    (results -> "Change words" -> the word list), so history never doubles up.
// Going back calls each screen's own show function (NAV_RESTORE) so its lists
// and score colours are redrawn up to date.
const NAV_RESTORE = {
  'match-settings': () => { showScreen('match-settings'); setMatchLevel(currentMatchLevel); },
  'vocab-tile-selection': () => showVocabTileSelection(vocabTileCategory),
  'kana-selection': () => showKanaSelection(),
  'hiragana-selection': () => showHiraganaSelection(activeHiraganaSection),
  'katakana-selection': () => showKatakanaSelection(activeKatakanaSection),
  'kanji-index': () => showKanjiIndex(),
  'kanji-selection': () => showKanjiSelection(),
  'numbers': () => showNumbersScreen(),
  'counter-quiz-selection': () => showCounterQuizSelection(),
  'settings': () => showSettingsScreen(),
  'grammar': () => showGrammarPage(),
  'build': () => showBuildPage(),
};
// The cog opens Settings, and tapped again closes it (back to where you were).
// "← Food & drink" at the top-left of every inner page, naming where Back goes.

// ROTATION (2026-10-23, Andrew): the manifest used to lock the installed
// app to portrait, which also stopped the Sentence builder turning sideways
// on Android. Now the manifest allows any orientation and the app locks
// itself back to portrait everywhere except the builder and the desk sheets.
// Where the browser won't lock (iPhone/iPad, or not installed) the whole app
// simply follows the device, as it did on the iPad already.
const ROTATE_OK_SCREENS = ['sentence-builder', 'desk-sheets'];
function applyScreenOrientation(id) {
  const so = screen.orientation;
  if (!so || typeof so.lock !== 'function') return;
  try {
    if (ROTATE_OK_SCREENS.includes(id)) { if (typeof so.unlock === 'function') so.unlock(); }
    else so.lock('portrait').catch(() => {});
  } catch (e) { /* not allowed here - fine */ }
}
// Leaving a screen: stop the Sentence order card mid-step-through; turn
// the screen the right way for where it's going (APP.beforeShowScreen).
function jaBeforeShowScreen(id) {
  if (l3cPlay) l3cStopPlay();
  applyScreenOrientation(id);
}

// Which tab is lit (APP.pillFor): the section you're in - the main page at
// the bottom of the history (2026-10-16), so a grammar card lights Grammar
// and the kana dakuten chart lights かな, not Vocab. Failing that, the
// screen's own tab, or for shared screens (drill, results, counter quiz...)
// whichever tab launched them - not Numbers by default, which once lit
// Numbers while drilling Vocab. Looked up by tab id, not position, so the
// tab row's order can change. Settings has its own button, not a tab.
function jaPillFor(id) {
  if (id === 'settings') return null;
  const NAV_TAB = { 'kana-selection': 'nav-kana', 'kanji-index': 'nav-kanji', 'numbers': 'nav-numbers', 'match-settings': 'nav-match', 'build': 'nav-build', 'grammar': 'nav-grammar' };
  const navRoot = NAV_ROOTS.includes(id) ? id : (navStack[0] || NAV_HOME[id]);
  if (NAV_TAB[navRoot]) return NAV_TAB[navRoot];
  if (id === 'kana-selection' || id === 'hiragana-selection' || id === 'katakana-selection') return 'nav-kana';
  if (id === 'kanji-selection' || id === 'kanji-index') return 'nav-kanji';
  if (id === 'match-settings' || id === 'vocab-reference' || id === 'vocab-tile-selection') return 'nav-match';
  const pillIdByOrigin = { 'kana-selection': 'nav-kana', 'hiragana-selection': 'nav-kana', 'katakana-selection': 'nav-kana',
    'kanji-selection': 'nav-kanji', 'kanji-index': 'nav-kanji', 'numbers': 'nav-numbers', 'match-settings': 'nav-match', 'vocab-tile-selection': 'nav-match' };
  return pillIdByOrigin[lastSettingsScreen] || 'nav-numbers';
}

// The すうじ tab doubles as Resume for a drill left part way (any kind - the
// drill screen is shared). While actually in a numbers drill it stays すうじ
// and leaves for the Numbers page (it once said Resume there and just showed
// the drill again, with no way out). (APP.onShowScreen)
function jaOnShowScreen(id) {
  const navNumbers = document.getElementById('nav-numbers');
  if (navNumbers) {
    const inNumbersDrill = id === 'drill' && isPendingDrillNumbers();
    navNumbers.textContent = inNumbersDrill ? 'すうじ' : (isPendingDrillNumbers() ? 'Resume' : 'すうじ');
    navNumbers.onclick = inNumbersDrill ? showNumbersScreen : tryResumeOrNumbers;
    navNumbers.classList.remove('sub-screen');
  }
}


// Back from a drill to the kana tables or kanji: clear what was selected,
// so the new score shading shows (APP.clearSelection; the core clears the
// word tiles).
function jaClearSelection(lastSettingsScreen) {
  if (lastSettingsScreen === 'hiragana-selection') {
    hiraganaSelectedRows[activeHiraganaSection].clear();
    const grid = document.getElementById('hiragana-grid-' + activeHiraganaSection);
    if (grid) grid.querySelectorAll('.kana-ref-row.selected').forEach(r => r.classList.remove('selected'));
    const btn = document.getElementById('hira-selection-drill-btn');
    if (btn) btn.disabled = true;
    updateSelectAllHiraganaLabel();
  } else if (lastSettingsScreen === 'katakana-selection') {
    katakanaSelectedRows[activeKatakanaSection].clear();
    const grid = document.getElementById('katakana-grid-' + activeKatakanaSection);
    if (grid) grid.querySelectorAll('.kana-ref-row.selected').forEach(r => r.classList.remove('selected'));
    const btn = document.getElementById('kata-selection-drill-btn');
    if (btn) btn.disabled = true;
    updateSelectAllKatakanaLabel();
  } else if (lastSettingsScreen === 'kanji-selection') {
    kanjiSelectedTiles[activeKanjiSection].clear();
    const grid = document.getElementById('kanji-grid-' + activeKanjiSection);
    if (grid) grid.querySelectorAll('.kana-ref-card.selected').forEach(t => t.classList.remove('selected'));
    const btn = document.getElementById('kanji-selection-drill-btn');
    if (btn) btn.disabled = true;
    updateSelectAllKanjiLabel();
  }
}

function tryResume() {
  if (deck.length > 0 && current < deck.length) showScreen('drill');
  else goBackToSettings();
}


// Drill missed only: the kana and kanji missed, rebuilt from DATA (the core
// adds the other kinds, kept as they were asked - APP.rebuildMissed).
function jaRebuildMissed(missedSet) {
  // Rebuild regular DATA items. Kanji/survival items don't carry a static
  // `options` array (unlike kana, which does) - their options are only ever
  // generated at drill-start time from their own section's pool, then
  // discarded, so a raw pull from DATA would otherwise leave them with no
  // answer options at all. Regenerate them the same way drillKanjiSelection
  // does.
  const all = [];
  Object.keys(DATA).forEach(k => {
    const pool = DATA[k];
    pool.forEach(q => {
      if (!missedSet.has(q.char + '|' + q.answer)) return;
      const withGroup = Object.assign({groupKey: k}, q);
      if (q.disp === 'kanji' || q.disp === 'survival') {
        withGroup.options = buildKanjiOptionsFromPool(q, pool);
      }
      all.push(withGroup);
    });
  });
  return all;
}


// GLOBAL SOUND SWITCH (2026-10-02) - the header's speaker button. Every
// sound the app makes goes through soundAllowed(): the drill's speak button,
// "Tap a card to hear it", hold-to-peek, and even the silent warm-up
// utterance on page load (some phones pause music for any speech at all).
// Muted also greys out the controls that would otherwise make a sound.
// iPad/iPhone (2026-10-02): Safari ignores speech that doesn't start inside a
// tap, and hold-to-peek speaks from a timer. Speaking one silent utterance
// during the first real tap/click "unlocks" speech for the rest of the
// visit, so timer-started speech works afterwards. Also: Safari can drop an
// utterance queued straight after cancel(), so only cancel when something
// is actually speaking or queued.
if (SPEECH_SUPPORTED) {
  ['touchend', 'click', 'keydown'].forEach(t =>
    document.addEventListener(t, unlockSpeech, { capture: true, passive: true }));
}
// Japanese's speech is the core's now (speakTarget: LANG.code, LANG.rate,
// LANG.pickVoice, and recovery when the browser leaves speech stuck). The
// name stays for the twenty places that call it.
function speakJapanese(text) { return speakTarget(text); }

/* ---------- App settings (on-device only, no sync) ----------------------- */
// Defaults are chosen to exactly match the app's behaviour before this
// existed, so installing this doesn't change anything for anyone until they
// actually visit Settings and change something themselves.
// gbpJpyRate: approximate, editable "£1 = ¥___" rate used by the Money
// section's currency converter and shopping-cost tools. Deliberately not
// fetched live - this app makes zero network calls anywhere else, and a
// fixed rate you can nudge yourself before/during the trip is more reliable
// than a fetch that can fail or behave differently offline. 215 was
// approximately the mid-market GBP/JPY rate as of build time (July 2026);
// it'll drift, which is exactly why it's an editable field, not a constant.

// WHAT'S NEW FLAG (2026-09-01) - HOW TO ADD AN ENTRY, so this stays
// consistent across sessions and not just something Andrew has to remember
// to ask for correctly each time:
//   1. Add a new dated <div class="entry"> block at the TOP of
//      changelog.html (most recent first), written the way the two
//      existing entries there are - plain language, what changed and why
//      someone would care, not an internal diff. Curated, not automatic -
//      routine fixes/tidying don't get their own line, only things
//      actually worth telling classmates about.
//   2. Bump LATEST_CHANGELOG_ENTRY below to match that entry's date (or
//      some other value that changes - the only requirement is that it's
//      different from whatever it was before). This is the ONLY thing that
//      triggers the green settings-cog flag (.settings-btn.has-update) -
//      it deliberately does NOT track the version stamp in the footer,
//      which bumps on every small edit, far more often than there's
//      anything worth announcing.
// That's it - two edits, always together. Anyone whose stored
// lastSeenChangelog doesn't match this value sees the flag until they open
// Settings, which clears it (see showSettingsScreen()) - reading the
// changelog itself is optional, opening Settings is what counts as "noticed".
try {
  const savedSettings = JSON.parse(localStorage.getItem(SETTINGS_KEY));
  if (savedSettings && typeof savedSettings === 'object') {
    // One-time migration: showKanji/showExtra replace the old single
    // showCustomContent switch (Kanji and Extra vocab used to be gated
    // together - now they're independent). If this is the first load since
    // upgrading, savedSettings will have the old key but not the new ones,
    // so carry its value across to both. Once that's happened, savedSettings
    // will have showKanji/showExtra of its own from then on (see
    // saveSettings() below), so this condition never fires again and the
    // two toggles are free to diverge.
    const migratingFromCustomContent = ('showCustomContent' in savedSettings) &&
      !('showKanji' in savedSettings) && !('showExtra' in savedSettings);
    if (migratingFromCustomContent) {
      savedSettings.showKanji = savedSettings.showCustomContent;
      savedSettings.showExtra = savedSettings.showCustomContent;
    }

    // One-time migration (2026-08-31): Trip and Andrew mode merged into a
    // single "Untaught" tier - every word that used to live behind either
    // toggle already carries the 'untaught' item tag (100% coverage,
    // verified directly against VOCAB before this shipped), so gating now
    // happens by tag, not by category level. showUntaught defaults to null
    // so this migration can tell "never set" apart from "explicitly off":
    // if savedSettings doesn't have it yet, resolve it once from whichever
    // of the two old toggles was on (either one being on meant this content
    // was visible), then never touch it again. showAndrewMode itself resets
    // to false for everyone as part of this - "Andrew mode" survives as its
    // own toggle/pill, but empty, staged and ready for L3 content later (see
    // that toggle's own settings-card description). showTripVocab is
    // dropped entirely; if a returning user's saved JSON still has it, it's
    // just an inert leftover key that's never read again, same as
    // showCustomContent above.
    const migratingToUntaught = !('showUntaught' in savedSettings);
    if (migratingToUntaught) {
      savedSettings.showUntaught = !!(savedSettings.showAndrewMode || savedSettings.showTripVocab);
      savedSettings.showAndrewMode = false;
    }

    // One-time migration (2026-09-28): Genki tier folded into Untaught -
    // same shape as the migration just above. Anyone who already had
    // Genki switched on keeps seeing Lesson 1-1's not-yet-taught words,
    // just via showUntaught now instead of its own showGenki toggle (see
    // itemTierVisible). showGenki itself is dropped after this - an inert
    // leftover key if it's still in an old saved JSON, same as
    // showTripVocab/showCustomContent above.
    const migratingGenkiToUntaught = 'showGenki' in savedSettings;
    if (migratingGenkiToUntaught && savedSettings.showGenki) {
      savedSettings.showUntaught = true;
    }
    // Bug fixed 2026-10-15: showGenki was never actually removed, so it was
    // copied into appSettings and saved back every time - and because it was
    // still there on the next load, this migration ran on EVERY load and
    // switched Untaught back on whenever someone had turned it off. Delete it
    // so the migration really is one-time (it then saves without the key).
    if (migratingGenkiToUntaught) delete savedSettings.showGenki;

    // One-time (2026-10-15): tourist words split out of Untaught under their
    // own toggle. Anyone who had Untaught on keeps seeing them - showTourist
    // starts as a copy of showUntaught. Runs once because the key then exists.
    const migratingTourist = !('showTourist' in savedSettings) || savedSettings.showTourist === null;
    if (migratingTourist) savedSettings.showTourist = !!savedSettings.showUntaught;

    Object.assign(appSettings, savedSettings);
    if (migratingFromCustomContent || migratingToUntaught || migratingGenkiToUntaught || migratingTourist) saveSettings();
  }
} catch (e) {
  // localStorage unavailable or corrupt — fall back to defaults silently
}


// Single source of truth for "is this item's tier currently visible" - used
// anywhere that scans across every category regardless of level (Random -
// Everything, theme pools, search), so Untaught and Andrew-mode content
// stay gated the same way everywhere rather than each call site
// re-deriving its own version of this check (and risking one of them
// forgetting a tier).
//
// PER-ITEM, NOT PER-CATEGORY - SHIPPED (2026-08-31): this used to be
// categoryTierVisible(level), called once per source category to decide
// whether to skip its `items` entirely. That was always a stand-in for
// what the words themselves already say about themselves: every untaught
// item already carries the 'untaught' tag (100% coverage, verified before
// this shipped), so checking the item's own tag directly is both more
// accurate and one step closer to THE FLIP point 1 above VOCAB ("level
// stops being a category-level property and becomes a per-item one").
// Andrew raised this directly after the Trip/Andrew merge shipped -
// wanted genuine per-item gating rather than a per-category shortcut that
// only worked because the data happened to be clean. The "bring forward"
// half of point 1 (level updating in place when a word's re-taught) turned
// out not to be a real blocker either, in the same conversation - a word
// simply gets tagged with both levels (e.g. ['L1','L3']) and the existing
// tag-query mechanism already finds it in both without any extra work, so
// there was never a need for level to literally move.
//
// 'andrew' is dormant as of 2026-08-31 - no item currently carries that
// tag (checked: 0/1289), since Andrew mode has no content to gate yet -
// but the branch stays wired up and ready for whenever L3 content lands
// here and gets tagged the same way untaught content already is.

// Walks every VOCAB category once and keeps items matching a tag query -
// the same scanning shape resolveVocabCategory and getThemePool's tagQuery
// branches already use, pulled out here so startRandomMatch (below) can
// reuse it instead of copying the loop a third time. Added 2026-08-27 so
// "Random - Level 1/2" is a genuine tag query (item has tag 'L1'/'L2')
// rather than a bucket walk (category's own level property) - the
// difference matters the moment a word is tagged forward to a later level
// (e.g. tags:['L1','L3',...]) without moving its physical storage: a tag
// query finds it in both level's random pools automatically, a bucket walk
// never would, since the word's home category only has one level stamp.

// BUG FIX (2026-09-12): every real VOCAB category has at least 4 physical
// items, so pickDistractorItems(cat.items, ...) always had 3 others to draw
// from - fine for normal drilling. Search results are different: they're
// whatever matched the query, which is very often just 1-3 words (that's
// the point of search), and drillVocabTileSelection was handing
// pickDistractorItems that same tiny match set as its own distractor pool.
// Searching "mother" (one match) produced a drill card with no wrong
// options at all - not a search bug, a distractor-pool bug that search
// happens to expose because it's the only place a category's own item
// pool can legitimately be smaller than 4. Confirmed identical in the
// frozen L2 build (same code, untouched there), so this has been present
// since before the flip - not something the Genki work introduced.
//
// Fix: search drilling draws distractors from every visible word instead
// of just the match set. Normal categories are untouched - they keep using
// their own items as the distractor pool, which is deliberately thematic
// (see pickDistractorItems above).


// Kanji used to share a "custom content" switch with Extra vocab; they're
// now independent, and hidden entirely (not just greyed out) when off.
function applyShowKanjiVisibility() {
  const on = appSettings.showKanji;
  const kanjiPill = document.getElementById('nav-kanji');
  if (kanjiPill) kanjiPill.style.display = on ? '' : 'none';
  // The old theme-all-kanji-card toggle lived here until the card itself
  // moved to screen-kanji-selection (2026-09-22) - no longer needed, since
  // that whole screen is already unreachable the moment nav-kanji above is
  // hidden.
  // If Kanji gets switched off while its selection screen happens to be
  // open, there's nothing sensible left showing - fall back to Vocab.
  const kanjiScreen = document.getElementById('screen-kanji-selection');
  const kanjiIndex = document.getElementById('screen-kanji-index');
  if (!on && ((kanjiScreen && kanjiScreen.classList.contains('visible')) || (kanjiIndex && kanjiIndex.classList.contains('visible')))) showMatchSettings();
  const card = document.getElementById('show-kanji-toggle-card');
  if (card) card.classList.toggle('selected', on);
}

function toggleShowKanji() {
  appSettings.showKanji = !appSettings.showKanji;
  saveSettings();
  applyShowKanjiVisibility();
}


// See displayScore() / decayedScore() near confidenceBand below for what
// this actually gates - decay itself always runs (it's what drill
// selection reads), this only decides whether colours read the decayed
// value or the raw last-measured one. No live re-render of colours already
// on screen when toggled - same convention as every other display setting
// here (showKanji, etc.): it takes effect next time that screen renders,
// not retroactively on the one you're looking at.


// See LATEST_CHANGELOG_ENTRY above appSettings for the full explanation.


// Untaught vocabulary - everything not covered in the taught Level 1/2
// course: words specific to travelling to Japan (food, money, directions,
// emergencies, tourist phrases), plus real words and phrases pulled from
// photos taken on the trip itself (signs, menus, receipts, announcements).
// Until 2026-08-31 this was two separate tiers - "Trip vocabulary" and
// "Andrew mode" - split by where the content came from (curated ahead of
// time vs encountered and photographed). That distinction is already
// captured per-word by the curated/encountered tags (see LEVEL_BORDER_COLORS
// and itemColorKey), so keeping two toggles doing the same visibility job
// stopped earning its keep - merged into this one tier instead. Every word
// that lives here carries the 'untaught' item tag, which is what
// scanVocabByTag('untaught') in startRandomMatch reads directly, and what
// itemTierVisible below gates for every other scan by checking the same
// tag on each item. Same hide-entirely, off-by-default pattern as the
// rest of the gated tiers.
function applyShowUntaughtVisibility() {
  const on = appSettings.showUntaught;
  const untaughtPill = document.getElementById('level-pill-untaught');
  if (untaughtPill) untaughtPill.style.display = on ? '' : 'none';
  if (!on && currentMatchLevel === 'untaught') setMatchLevel('theme');
  const card = document.getElementById('show-untaught-toggle-card');
  if (card) card.classList.toggle('selected', on);
  applyOptionalPillRow();
}

function toggleShowUntaught() {
  appSettings.showUntaught = !appSettings.showUntaught;
  saveSettings();
  applyShowUntaughtVisibility();
}

// Tourist words (2026-10-15) - their own toggle and pill, split from Untaught.
function applyShowTouristVisibility() {
  const on = !!appSettings.showTourist;
  const pill = document.getElementById('level-pill-tourist');
  if (pill) pill.style.display = on ? '' : 'none';
  if (!on && currentMatchLevel === 'tourist') setMatchLevel('theme');
  const card = document.getElementById('show-tourist-toggle-card');
  if (card) card.classList.toggle('selected', on);
  applyOptionalPillRow();
}
function toggleShowTourist() {
  appSettings.showTourist = !appSettings.showTourist;
  saveSettings();
  applyShowTouristVisibility();
}
// The second pill row only shows when it has a pill in it.
function applyOptionalPillRow() {
  const row = document.getElementById('vocab-optional-filter-row');
  if (row) row.style.display = (appSettings.showTourist || appSettings.showUntaught) ? '' : 'none';
}

// Genki vocabulary (2026-09-12) - working through the Genki textbook
// alongside the course, to fill gaps and get ahead of Level 3. Originally
// its own hide-entirely tier (own pill, own settings toggle) same as
// Untaught; retired 2026-09-28 now that Level 3 is actually starting -
// Lesson 1-1 was folded into Untaught as its first tile instead, and on
// 2026-10-02 moved out of the published app altogether into a private
// vocab pack (see PRIVATE VOCAB PACKS) - future Genki lessons go in that
// file, never in index.html. A Genki word that gets taught in class moves
// into the app (keeping its genki tags) and out of the file.


// Registers/unregisters the service worker to match the setting - called on
// every toggle, and once at startup so a stray registration from a previous
// session (e.g. the setting was on, then somehow got turned off without this
// running) gets cleaned up rather than silently lingering. Turning it off
// actively unregisters and clears the cache, rather than just leaving an
// old worker running unmanaged.

function toggleWorkOffline() {
  appSettings.workOffline = !appSettings.workOffline;
  saveSettings();
  applyWorkOfflineUI();
  syncServiceWorkerRegistration();
}


// INSTALL CARD (2026-10-13). A browser reports whether the page is running
// as an installed home-screen app (display-mode standalone, or Safari's
// navigator.standalone). When it isn't, Settings shows how to install for
// this phone. Android Chrome offers its own install prompt
// (beforeinstallprompt), so there the card gets an Install button.
window.addEventListener('beforeinstallprompt', e => { e.preventDefault(); deferredInstallPrompt = e; refreshInstallCard(); });
window.addEventListener('appinstalled', () => { deferredInstallPrompt = null; refreshInstallCard(); });


/* ---------- Kana confidence tracking (on-device only, no sync) ---------- */
// Tracks a -2..+2 score per single kana character, based on right/wrong
// answers during hiragana/katakana drilling (base/diacritic/youon groups
// only — not word/number/time/kanji). Shown as tile shading on the
// reference screens; doesn't affect drilling, scoring, or selection.
try {
  kanaScores = JSON.parse(localStorage.getItem(KANA_SCORE_KEY)) || {};
} catch (e) {
  kanaScores = {};
}

// One-off migration: gym/pool/supermarket were stored hiragana-primary
// (backwards from how they're actually written) and have swapped to
// katakana-primary. Scores are keyed on jp+'|'+en, so without this the
// swap would silently reset anyone's existing progress on these 3 words
// back to neutral. Carries the old score across to the new key once,
// then leaves the stale key in place (harmless, never read again).
const SCORE_KEY_RENAMES = [
  ['じむ|gym', 'ジム|gym'],
  ['ぷーる|pool', 'プール|pool'],
  ['すーぱー|supermarket', 'スーパー|supermarket'],
  ['しゃーうっどのもり|Sherwood Forest', 'シャーウッドの森|Sherwood Forest'],
];
SCORE_KEY_RENAMES.forEach(([oldKey, newKey]) => {
  if (oldKey in kanaScores && !(newKey in kanaScores)) {
    kanaScores[newKey] = kanaScores[oldKey];
  }
});

// One-off migration (2026-09-01): every entry used to be a bare number.
// DECAY (see decayedScore() below) needs to know when a score was last
// actually earned, not just what it was, so entries are now
// {score, lastSeen} instead. lastSeen defaults to right now for anything
// migrated here, deliberately - there's no way to know when an existing
// score was really last touched, and defaulting to "now" means nobody's
// colours or drill weighting shift the moment this ships; decay only ever
// starts counting forward from here. Runs before recordKanaResult ever
// writes a new-shape entry, so by the time anything reads kanaScores[key]
// elsewhere in the app, every entry (old or new) is already in the new
// shape - no scattered "is this the old or new shape" checks needed
// anywhere else in the codebase.
Object.keys(kanaScores).forEach((key) => {
  if (typeof kanaScores[key] === 'number') {
    kanaScores[key] = { score: kanaScores[key], lastSeen: Date.now() };
  }
});


// PRODUCTION SCORES (2026-10-22, Andrew). Typing the answer yourself (romaji,
// Japanese, a verb form) is a different skill from picking it out of four, so
// it has its own score and can never cost a recognition green:
//   - a correct typed answer still ADDS to the recognition score as before;
//     a wrong or nearly-right one leaves recognition alone;
//   - the production score is graded upwards, like the Strokes app: exact = 1,
//     nearly (one slip) = 0.6, after a hint = at most 0.5, wrong = 0.
// prodScores[key] = { p: 0..1, n: attempts, lastSeen }. p climbs a third of
// the way towards each attempt's credit, and a lower credit only pulls it
// down a tenth of the way, so a bad day barely dents it. Same keys as
// kanaScores (getScoreKey).
const PROD_SCORE_KEY = 'jpL4ProdScores';
let prodScores = {};
try { prodScores = JSON.parse(localStorage.getItem(PROD_SCORE_KEY)) || {}; } catch (e) { prodScores = {}; }
function saveProdScores() {
  try { localStorage.setItem(PROD_SCORE_KEY, JSON.stringify(prodScores)); } catch (e) { /* fail silently */ }
}
// The production score is retired (2026-11-08, decided in the mapping doc:
// one score in every app). Kept as a name for the builder, which still calls it.
function recordProduction(key, credit) { /* retired */ }
// Edit distance (insert / delete / swap one letter), for "nearly".
function editDistance(a, b) {
  a = [...a]; b = [...b];
  let prev = Array.from({ length: b.length + 1 }, (_, j) => j);
  for (let i = 1; i <= a.length; i++) {
    const cur = [i];
    for (let j = 1; j <= b.length; j++) cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
    prev = cur;
  }
  return prev[b.length];
}
// Nearly = one slip on a word of 4+ letters (romaji) or 3+ kana, two slips
// from 9+ letters. Anything shorter has to be exact - one letter is the
// whole word there.
function isNearly(typed, target, kana) {
  if (!typed || !target) return false;
  const len = [...target].length;
  const allow = kana ? (len >= 3 ? 1 : 0) : (len >= 9 ? 2 : len >= 4 ? 1 : 0);
  return allow > 0 && editDistance(typed, target) <= allow;
}
// One typed answer: production credit, and recognition only ever goes up.
// Returns the credit (1 / 0.6 / 0.5 / 0.3 / 0).
// One typed answer (2026-11-08, decided: the core's rule). Right adds, as
// any right answer; one slip ("nearly") gets half credit; a miss costs a
// little (0.25) - something you produce yourself, typed or said.
// Returns the old production credit, which nothing shows any more.
function recordTypedAnswer(q, result) { // result: 'exact' | 'nearly' | 'wrong'
  if (result === 'wrong') recordKanaResult(q, false, false, true);
  else recordKanaResult(q, true, result === 'nearly', true);
  return result === 'exact' ? 1 : result === 'nearly' ? 0.6 : 0;
}
// Average production over a list of vocab items (untried words count as 0),
// and whether any have been tried - for the thin bar under a category card.
function getItemsProduction(items) {
  let total = 0, tried = 0;
  (items || []).forEach(it => { const e = prodScores[it.jp + '|' + it.en]; if (e) { total += e.p; tried++; } });
  return { avg: items && items.length ? total / items.length : 0, tried };
}

// BACKUP/RESTORE - SHIPPED (2026-09-12, see downloadScoresBackup() below
// for the real implementation). Kept the original plan below as-is for the
// reasoning trail (why Tier 1 was chosen over live sync, and what Tiers 2/3
// would look like if this ever gets reopened).
//
// BACKUP/RESTORE - DIRECTION SET, NOT YET STARTED (2026-09-05): the debug
// export box below only solves "copy the JSON off a phone for me to look
// at" - it was never meant as a real backup path, and isn't one: it's
// hidden, one-way (no import), and a copy of it left sitting on the same
// device is no safer than the localStorage it's copying, so it doesn't
// protect against the actual risk (device lost/wiped/replaced) at all.
//
// Andrew's ideal is live cross-device sync via Google Drive/OneDrive, but
// that's a materially bigger thing than it sounds: real two-way sync means
// deciding what happens when two devices have both been used offline and
// then reconnect (whose answers win, or do they merge per-word), plus
// account auth, plus behaviour before the first sync ever completes. Scoped
// out for now as disproportionate to the actual problem, not rejected
// outright - see the tiered plan below, worth revisiting if real cross-
// device *live* use ever becomes the actual pain point rather than backup.
//
// Chosen instead (Tier 1 of a 3-tier plan discussed 2026-09-05): turn this
// same export box into a real, visible "Back up my progress" button that
// downloads kanaScores as a dated .json file, plus a matching "Restore from
// backup" file picker that reads one back in (JSON.parse in a try/catch,
// a sanity check it looks like a scores object, a confirm() before
// overwriting - same confirm() pattern already used for the interrupted-
// session prompt above). No cloud integration in the app at all - the user
// saves the file wherever they already trust things to survive (their
// phone's Drive/OneDrive app, email to self), so the app leans on
// infrastructure that already exists rather than building any. Estimated
// ~60-80 lines of actual HTML/CSS/JS, touching only this settings card and
// kanaScores/saveKanaScores() - isolated from drilling, scoring and
// selection.
//
// Rejected-for-now escalations, in case this gets reopened later:
//   - Tier 2: same download, but via the Web Share API on phones so it
//     goes straight to the OS share sheet (Drive/OneDrive/Files/Mail)
//     instead of a plain file download. Small, additive, feature-detected
//     fallback to Tier 1 - fine to add whenever, not blocked on anything.
//   - Tier 3: opportunistic one-way push of a snapshot to a fixed file in
//     the user's Drive whenever scores change and the device is online,
//     pulled down once on a new device. Deliberately NOT two-way sync -
//     latest write simply overwrites, no merge/conflict logic needed,
//     because there's only ever one direction at a time. Real cost isn't
//     the sync logic (same try/fail-silently shape as everything else
//     localStorage already does here), it's the one-time setup: an OAuth
//     client registration and a sign-in step. Would sit behind its own
//     Settings toggle, default off, same shape as "Work offline" - changes
//     nothing for anyone who leaves it alone.
//
// SHIPPED (2026-09-12) - see the BACKUP/RESTORE comment above appSettings
// for the original plan; built now because the L3 move is a real, concrete
// reason rather than a hypothetical one. Replaces the old hidden debug
// export box outright rather than sitting alongside it - same underlying
// data, this is just the real version of the same idea.
//
// Exports the in-memory kanaScores object, not raw localStorage - the two
// can briefly disagree (the bare-number-to-{score,lastSeen} migration above
// mutates kanaScores on load but only reaches localStorage on the next
// actual score write), so reading kanaScores directly is what guarantees
// the file always reflects the current shape.


// Deliberately a plain overwrite, not a merge - restoring is a rare,
// explicit "I need my old data back" action (new device, cleared storage),
// not routine two-way sync, so there's no real scenario where merging two
// independently-progressed score sets would even make sense. The confirm()
// is the same pattern already used for the interrupted-session prompt.


// Private vocab file: load (replaces any pack already on this device),
// remove, and the status line in Settings. Both reload the page so every
// list, collection and search picks the change up cleanly.
updatePrivateVocabStatus();

/* ---------- In-progress drill persistence (survives a killed page) ------ */
// On mobile, a second "back" press doesn't just background the app - it ends
// the browsing session outright (tab/WebView context genuinely closes), and
// sessionStorage is cleared the moment that happens, by spec. That's exactly
// what real-device testing showed: v068 (sessionStorage) never once offered
// a resume prompt, because the data was wiped before the page ever reloaded.
// localStorage has no such session-lifetime limit - it survives a real close
// the same as a backgrounded kill - so this uses that instead. Drills are
// short, so a session left untouched for more than an hour is treated as
// stale and silently discarded rather than offered back (real interruptions
// are noticed within seconds, not resumed an hour later).


// Checked once at page load. A native confirm() is used deliberately here
// rather than a custom banner - it needs zero new HTML/CSS, so it can't
// interact badly with any existing screen, and it's a one-off decision the
// user makes at most once per interrupted drill.


// Kana characters always mean the same sound, so the character itself is a
// safe score key. A few kanji (火/水/木, etc.) are reused across categories
// with genuinely different meanings (Tuesday vs fire, for example) — for
// those, character alone would silently blend two different scores together,
// so kanji use char+answer as the key instead.


// Single source of truth for every confidence display in the app - one
// item's score, the numbers/times aggregate, and a whole category's average
// all read from these same eight bands, so moving a boundary or changing
// the band count is one edit that reaches every screen at once, rather than
// three separate constants that can quietly drift apart from each other.
//
// The bands themselves were shaped around a single item's reachable
// milestones (each item moves in +0.5/-0.75 steps and clamps at +/-2, so it
// only ever lands on one of a small fixed set of values - 0, 0.5, 1, 1.5, 2
// climbing; 0, -0.75, -1.5, -2 falling). Reusing an evenly-spaced scale
// there meant a pure streak of wrong answers jumped straight from -0.75 to
// -1.5, which already cleared the old top threshold - so the true floor
// showed the exact same shade as -1.5, and a third wrong answer produced no
// visible change at all. These boundaries sit at the actual milestones
// instead, so every single correct or wrong answer shows a new shade until
// the item is genuinely capped. The two directions end up with a different
// number of bands - 3 falling, 4 climbing - because +0.5 fits one more step
// into the +/-2 range than -0.75 does before hitting the cap.
//
// The numbers/times aggregate and category averages don't share that
// discrete-jump problem (both move in much smaller steps or blend many
// items together, so they're already close to continuous) - they simply
// reuse the same boundaries for consistency, not because they needed them.


// WEIGHTED RANDOM SELECTION - SHIPPED (2026-09-01): the random-20 drills
// (buildVocabReadingDeck, buildRandomKanjiPool) used to draw a plain uniform
// shuffle().slice(0, 20) - a word missed five times in a row had exactly the
// same odds of coming up next round as one answered correctly twenty times
// straight. The per-item confidence score below already existed (it's the
// same number driving every score-* swatch in the app) but nothing fed it
// back into what actually gets drilled. This closes that loop: item weight
// is a function of its own confidence score, so weaker and never-seen items
// come up more often, without making a well-known word literally impossible
// to see again. Deliberately NOT applied to the "genuine random N" tile
// disguise (toggleRandomVocabTiles) - that one's whole point is an honest,
// unbiased surprise pick, not a study aid, so it keeps its plain shuffle.
// Time-based decay (a word learned solid a month ago is more due for review
// than one learned solid yesterday) was a deliberate next step, not this one,
// at the time this shipped - see the DECAY entry below for where it landed
// once kanaScores actually had a last-seen timestamp to build it on.
//
// weightFn maps a score to a weight = 2^(-score): half the weight for every
// whole point higher (more confident), double for every whole point lower.
// Never-drilled items are treated as the worst score on the scale (-2, the
// same floor a losing streak reaches) rather than as neutral, so brand-new
// words get surfaced promptly instead of waiting behind ones already being
// actively practiced. Across the full -2..+2 range that's a 16:1 spread
// between the neediest and the most confident item - enough to meaningfully
// bias the deck without ever fully retiring a strong item from review.

// Efraimidis-Spirakis A-ES algorithm: each item gets a key = random()^(1/w),
// and the N largest keys win. This is a genuine weighted draw, not a biased
// shuffle-then-slice - an item with double another's weight really is about
// twice as likely to be picked, at any weight ratio, not just at the
// extremes. Falls back to a plain shuffle when the whole pool already fits
// in n (weighting a full-pool draw would change nothing but the order).
// Final shuffle of the winners means the deck's own item order doesn't leak
// which ones were weighted heaviest.

// DECAY - SHIPPED (2026-09-01): closes the gap the WEIGHTED RANDOM
// SELECTION entry above flagged as a deliberate next step, not that one -
// "a word learned solid a month ago is more due for review than one learned
// solid yesterday" now actually happens. kanaScores[key] is never
// overwritten by decay itself - it stays {score, lastSeen}, the raw truth
// as of the last real answer (see recordKanaResult). This computes a
// derived "as of right now" value on top of that, which selection weight
// always reads, and which colour display reads only when
// appSettings.decayAffectsColours is on (see displayScore() below and its
// call sites - kanaScoreClass, the numbers/times/counters consistency
// swatches, the two Colours category tile-border sites, and the
// items-average functions feeding category swatches).
//
// Asymmetric by design, worked through with Andrew before building this:
//   - Positive scores decay toward zero, exponentially, halving every
//     DECAY_HALF_LIFE_DAYS. Tuned once actually felt out (2026-09-01): the
//     real lever isn't the half-life itself but how long a maxed-out word
//     (score 2) takes to visibly drop its FIRST shade band, since the 8
//     bands are discrete and the score moves continuously underneath them -
//     that's ~19% of one half-life (2 needs to fall below 1.75 to leave the
//     top band, and 2 * 2^(-0.1926) = 1.75). The first half-life tried (21
//     days) meant a visible fade after only ~4 days of neglect, which felt
//     like active pressure rather than a gentle nudge; 10 days felt like
//     the right amount of slack, which is what 50 gives. Landed at the
//     upper end of the range that math suggested (a rough "words needed per
//     day to keep the whole pool fresh" sanity check put the reasonable
//     range around 40-65 days for the current ~1293-word pool) rather than
//     the middle, deliberately - L3 only adds more words to maintain, never
//     fewer, so erring toward more slack now ages better than erring toward
//     less. Easy to retune again once it's been lived with for longer.
//     Decay represents fading CERTAINTY, not demonstrated
//     failure, so it erodes toward neutral (0, "no current evidence either
//     way") and never overshoots past it - the exponential form makes that
//     automatic, it asymptotically approaches 0 and mathematically cannot
//     cross it.
//   - Negative scores never decay. A negative score is evidence of actual
//     measured struggle, not just staleness - there's no fading certainty
//     for time to erode, since the certainty here is "this was gotten
//     wrong", which doesn't become less true by not being asked again.
//     Only a real new answer moves it, in either direction.
//   - Standard SRS models (SM-2, FSRS) don't have this problem to solve -
//     they track a single unipolar "retrievability" (0 to 1), which is the
//     direct equivalent of the positive-decay case here, and floors at 0
//     the same way. There's no established precedent for the negative side
//     because those models have no negative state at all; this app's
//     bipolar score (tracking demonstrated difficulty as a distinct signal
//     from staleness) is the reason the question exists here in the first
//     place, not something borrowed from elsewhere.

// Picks which version of a stored entry's score to actually show, per the
// decayAffectsColours setting - decayedScore() when it's on, the raw
// last-measured value when it's off. Drill-selection weight always calls
// decayedScore() directly instead of this (see buildVocabReadingDeck/
// buildRandomKanjiPool) - what gets drilled more and what colour gets shown
// are two separate questions, and only the second one is a matter of taste.


function continuousScoreClass(score) {
  const band = confidenceBand(score);
  return band ? 'score-' + band : '';
}

// Whole-category average, for the category-select cards (Level 1/Level 2/
// Extra tabs). Never-drilled items are excluded from the average entirely
// (not counted as neutral/zero) - a category nobody has touched yet should
// show no shading at all, same convention as kanaScoreClass for single items.
// Returns null when zero items in the category have been drilled.
function getCategoryAverageScore(categoryKey) {
  // Routed through resolveVocabCategory (not raw VOCAB[categoryKey]) so a
  // category using includeItems gets a swatch that reflects the referenced
  // word's score too, not just its own stored items.
  const v = resolveVocabCategory(categoryKey);
  if (!v) return null;
  return getItemsAverageScore(v.items);
}

// Same "never-drilled items excluded, not counted as neutral/zero" average as
// getCategoryAverageScore, but taking a raw items array directly - lets theme
// pools (which span several VOCAB categories, not just one) reuse the exact
// same averaging rule rather than needing their own separate scoring logic.

// Per-category confidence SPREAD, for the compact bar on each category tile
// (buildCategoryTile) - same eight bands as confidenceBand/getItemsAverageScore
// above, but counted per band rather than averaged into one number, plus an
// explicit untested count (getItemsAverageScore just excludes those). Same
// jp+'|'+en key convention as getItemsAverageScore, so this only ever needs
// to agree with the average, never reimplement its own scoring rule.

// Untested segment drawn first (when shown), then the seven-way climb from
// neg3 to pos4 - same left-to-right ordering as the kanji app's own
// progress bar, for anyone who's used both.

// Fills in one tile's bar element in place. showUntested is passed in fresh
// each call rather than stored anywhere - see buildCategoryTile for why
// (per-tile, not persisted: it lives only in that tile's own closure and
// resets the moment the list re-renders).


// Wires (once) and refreshes a cat-bar element that lives on STATIC HTML
// (Collections' cards - buildCategoryTile's own tiles don't need this, see
// its comment: those are recreated fresh on every render, so a plain local
// closure variable already gives the same "resets when you leave and come
// back" behaviour for free). Collections' cards are never rebuilt, so the
// tap-to-toggle-untested state is kept on the element itself
// (barEl._showUntested) - it survives repeated refreshes (scores changing
// elsewhere) but still forgets itself on a full page reload, same as the
// category tiles' own per-tile/non-persisted behaviour.

function categoryConfidenceClass(avg) {
  const band = confidenceBand(avg);
  return band ? 'cat-conf-' + band : '';
}


const CAT_CONF_CLASSES = CONFIDENCE_BANDS.map(b => 'cat-conf-' + b);

// For the Theme tab's (Collections') static cards - same per-category
// confidence SPREAD bar as buildCategoryTile's own tiles (2026-09-22),
// computed over each theme's freshly-computed pool (getThemePool) rather
// than a single VOCAB category's items, "so it's calculated in a very
// similar way to the others" per Andrew - just a different item source.
// Builds the Groups pill's cards from the data (2026-10-12) - replaces the
// cards that used to be written into the HTML by hand.
renderGroupCards();


// Group order (2026-10-07): Latest words always first, then the rest by the
// newest word in each (dateAdded, of the words currently visible), most
// recent at the top; ties alphabetical. So a Group that's just had words
// added rises, and ones nobody has touched in a while drift down.

// RANDOM PAGE (2026-10-07) - the die pill. One choice at a time, then Start.
// The three "everything" drills and the per-level randoms all live here now,
// so Groups and the level pages are purely things you pick words from.
// Untaught without the tourist words (they have their own pill since 2026-10-15).
const UNTAUGHT_ONLY_QUERY = { all: ['untaught'], none: ['tourist'] };
// Random's "still untested" count, split by kind when Untaught or Tourist is
// on: "(312 of 1,550 · 40 taught, 272 untaught)". Only the kinds with words
// left are named (Andrew, 2026-10-16); with none left it's "(0 of 1,558)".
// (APP.untestedCount)
function jaUntestedCount() {
  const uniq = list => { const m = new Map(); list.forEach(i => m.set(i.jp + '|' + i.en, i)); return [...m.values()]; };
  const all = uniq(getAllVocabPool()), un = uniq(getUntestedVocabItems());
  const fmt = n => n.toLocaleString('en-GB');
  let txt = ` (${fmt(un.length)} of ${fmt(all.length)}`;
  if (appSettings.showUntaught || appSettings.showTourist) {
    const has = (i, tag) => (i.tags || []).includes(tag);
    const t = un.filter(i => has(i, 'taught')).length;
    const tour = un.filter(i => has(i, 'untaught') && has(i, 'tourist')).length;
    const parts = [];
    if (t) parts.push(`${fmt(t)} taught`);
    if (appSettings.showTourist && tour) parts.push(`${fmt(tour)} tourist`);
    if (appSettings.showUntaught && un.length - t - tour) parts.push(`${fmt(un.length - t - tour)} untaught`);
    if (parts.length) txt += ' · ' + parts.join(', ');
  }
  return txt + ')';
}


// Reference grids are built once and cached, but scores change as drilling
// happens elsewhere — this re-applies shading to the existing tiles each time
// the reference screen is shown, without touching row-selection state.

// Chrome/Safari sometimes clip the very start of the first utterance while the
// speech engine "warms up". Priming it silently as soon as the page loads
// means it's already warm by the time the hint button is actually tapped.
updateSoundButton();
if (soundAllowed()) {
  const primer = new SpeechSynthesisUtterance(' ');
  primer.volume = 0;
  window.speechSynthesis.speak(primer);
  window.speechSynthesis.getVoices();
}


// Works out what Japanese text should actually be spoken for the current
// question, since the character on screen isn't always the pronounceable side
// (e.g. reversed mode shows romaji; number/time questions show digits).


function revealRomaji() {
  const q = deck[current];
  if (q && q.disp === 'particle') {
    const el = document.getElementById('q-romaji-reveal');
    if (!el) return;
    if (!answered && !hintUsedThisQuestion) {
      hintUsedThisQuestion = true;
      hints++;
      document.getElementById('stat-hints').textContent = hints;
    }
    el.textContent = q.roBlank;
    el.style.display = 'block';
    return;
  }
  if (!q || !q.answerRomaji) return;
  const el = document.getElementById('q-romaji-reveal');
  if (!el) return;
  const hasKanji = KANJI_CHAR_RE.test(q.char);
  // Kanji words without either a verified per-character breakdown or a
  // recorded reason why one isn't available don't get a reveal at all (the
  // button is disabled before this can even fire - see renderQuestion)
  // rather than falling back to the old whole-word romaji, which was found
  // to just hand over the literal answer in reading-practice mode. Kana-only
  // words have no such problem and keep the original whole-word reveal.
  if (hasKanji && !q.kanjiReading && !q.kanjiReadingBlocked) return;
  // Showing the block-reason text isn't a hint towards the answer - it just
  // explains why no reading help is available for this word - so it doesn't
  // cost anything, unlike an actual reading reveal.
  const isReasonOnly = hasKanji && !q.kanjiReading && q.kanjiReadingBlocked;
  if (!isReasonOnly && !answered && !hintUsedThisQuestion) {
    hintUsedThisQuestion = true;
    hints++;
    document.getElementById('stat-hints').textContent = hints;
  }
  if (hasKanji && q.kanjiReading) {
    // Segmented per-kanji reading, shown as character(reading) pairs rather
    // than bare hyphenated romaji. For a mixed kanji+kana word (e.g. お知らせ)
    // kanjiReading only ever covers the KANJI portion - the kana (お, らせ)
    // is already directly readable and deliberately left out, so the pairing
    // makes clear this is "here's how to read 知", not "here's the whole
    // word's pronunciation". Found necessary in practice (2026-08-30): a
    // bare "shi" for お知らせ looked like a wrong or incomplete answer with
    // nothing tying it back to which part of the word it explained. For a
    // pure-kanji word this still shows every character, so it reads as the
    // complete word broken down (e.g. 駅(eki) 事(ji) 務(mu) 室(shitsu)).
    el.textContent = q.kanjiReading.map(p => `${p.char}(${p.reading})`).join(' ');
  } else if (hasKanji && q.kanjiReadingBlocked) {
    el.textContent = q.kanjiReadingBlocked;
  } else {
    el.textContent = q.answerRomaji;
  }
  el.style.display = 'block';
}

// Shared typed-answer input (romaji forward, Japanese reversed).
// stopPropagation on Enter matters: the global handleDrillKeydown listener
// also reacts to Enter (to advance past an answered question) - without it,
// the same keypress that submits would also fire Next, skipping the feedback.
// Enter is ignored while a Japanese keyboard is still composing (isComposing),
// since there Enter just confirms the kana/kanji conversion.

// LISTENING (2026-10-07) - the word is hidden behind a play button and said
// as the question appears (a moment later, so the cancel() in renderQuestion
// can't swallow it on iPhone). Replaying is free - it's the question, not a
// hint. revealListenWord() puts the word back once answered.
// Kana answer size: as big as fits on one line in a half-width option.
function optKanaSize(text) {
  const n = [...String(text || '')].filter(ch => !SMALL_KANA_CHARS.has(ch)).length;
  return n <= 5 ? 20 : n <= 7 ? 17 : n <= 9 ? 15 : 13;
}

// TYPED JAPANESE (2026-10-07) - reversed + Type. Lenient the same way the
// romaji check is: spaces and punctuation ignored, hiragana and katakana
// treated as the same (びーる for ビール counts, with a note of the usual
// spelling), and the kanji form counts too, since phone and Mac keyboards
// convert to kanji on their own (食べます for たべます).
function normaliseTypedJapanese(str) {
  return (str || '').normalize('NFKC')
    .replace(/[\s。、．，.,!?！？・〜~「」()（）]/g, '')
    .replace(/[\u30A1-\u30F6]/g, ch => String.fromCharCode(ch.charCodeAt(0) - 0x60));
}
function chooseTypedJapanese(rawInput, q) {
  if (answered) return;
  answered = true;
  const input = document.getElementById('type-answer-input');
  const submitBtn = document.getElementById('type-answer-submit');
  if (input) input.disabled = true;
  if (submitBtn) submitBtn.disabled = true;
  const typed = normaliseTypedJapanese(rawInput);
  const forms = [q.char, q.altForm, q.speakAs, ...(VERB_TYPING_KANJI[q.char] || []), ...String(q.char).split(/\s*[\/／]\s*/)].filter(Boolean);
  const isCorrect = !!typed && forms.some(f => normaliseTypedJapanese(f) === typed);
  const nearly = !isCorrect && forms.some(f => isNearly(typed, normaliseTypedJapanese(f), true));
  if (input) input.classList.add(isCorrect ? 'correct' : nearly ? 'nearly' : 'wrong');
  // Right, but not as it's usually written (other script, or kana for a word
  // normally in kanji) - say how it's normally written.
  const asTyped = (rawInput || '').normalize('NFKC').replace(/\s/g, '');
  const usual = (q.altIsStandard && q.altForm) ? q.altForm : q.char;
  let note = '';
  if (isCorrect && (asTyped === String(usual).replace(/\s/g, '') || (VERB_TYPING_KANJI[q.char] || []).includes(asTyped))) note = '';
  else if (isCorrect && asTyped !== String(q.char).replace(/\s/g, '')) note = `<div class="feedback-standard-note">Usually written: ${markSmallKana(usual)}</div>`;
  else if (q.altIsStandard && q.altForm) note = `<div class="feedback-standard-note">Normally shown as: ${markSmallKana(q.altForm)}</div>`;
  else if (q.altAfterAnswer && q.altForm) note = `<div class="feedback-standard-note">Also seen as: ${markSmallKana(q.altForm)}</div>`;
  recordTypedAnswer(q, isCorrect ? 'exact' : nearly ? 'nearly' : 'wrong');
  const fb = document.getElementById('q-feedback');
  if (isCorrect) {
    score++;
    fb.innerHTML = 'Correct!' + note;
    fb.className = 'feedback good';
  } else if (nearly) {
    score++;
    fb.innerHTML = `Nearly! — check it: "${markSmallKana(q.char)}" (${q.answerRomaji})` + note;
    fb.className = 'feedback nearly';
  } else {
    wrong++;
    fb.innerHTML = `Not quite — the answer is "${markSmallKana(q.char)}" (${q.answerRomaji})` + note;
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


// Alternative to choose() for typeAnswerMode (see toggleTypeAnswerMode) -
// same scoring/state-machine shape (answered guard, recordKanaResult,
// missed/missedItems, score/wrong, feedback text, Next button reveal) but
// comparing a typed string via canonicalizeRomaji() instead of a clicked
// button's dataset.value, and disabling the input/Check button instead of
// a set of .opt buttons. Word-drill only (isWord && !vocabReversed &&
// !drillByMeaning is enforced by the toggles' mutual exclusion, so `answer`
// here is always q.answerRomaji) - the reversed/kanji/number/time/counter
// question types never reach this function.
function chooseTyped(rawInput, answer, char) {
  if (answered) return;
  answered = true;
  const input = document.getElementById('type-answer-input');
  const submitBtn = document.getElementById('type-answer-submit');
  if (input) input.disabled = true;
  if (submitBtn) submitBtn.disabled = true;
  const typedCanon = canonicalizeRomaji(rawInput), answerCanon = canonicalizeRomaji(answer);
  const isCorrect = typedCanon === answerCanon;
  const nearly = !isCorrect && isNearly(typedCanon, answerCanon, false);
  if (input) input.classList.add(isCorrect ? 'correct' : nearly ? 'nearly' : 'wrong');
  // Reveal the materials context card that renderQuestion held back for
  // typeAnswerMode (see the comment there) - content's already populated
  // by renderQuestion, this just un-hides it now that answering is done
  // and the keyboard's about to close. Guarded on the body actually having
  // content, since renderQuestion leaves it empty (and the card hidden)
  // for every non-Materials question.
  const contextCard = document.getElementById('q-context-card');
  const contextCardBody = document.getElementById('q-context-card-body');
  if (contextCard && contextCardBody && contextCardBody.innerHTML.trim()) {
    contextCard.style.display = 'block';
  }
  const fb = document.getElementById('q-feedback');
  const currentQ = deck[current];
  const hint = (currentQ && currentQ.hint) ? ` (${currentQ.hint})` : '';
  const standardNote = (currentQ && currentQ.altIsStandard && currentQ.altForm)
    ? `<div class="feedback-standard-note">Normally shown as: ${markSmallKana(currentQ.altForm)}</div>`
    : (currentQ && currentQ.altAfterAnswer && currentQ.altForm)
    ? `<div class="feedback-standard-note">Also seen as: ${markSmallKana(currentQ.altForm)}</div>`
    : '';
  recordTypedAnswer(currentQ, isCorrect ? 'exact' : nearly ? 'nearly' : 'wrong');
  revealListenWord(currentQ);
  // Show the accepted spelling either way, not just on a miss - per Andrew,
  // the point is to teach the canonical romanization, and what was typed
  // may have matched only after canonicalizeRomaji() folded away a real
  // spelling difference (case, long vowels, si/shi-style variants, etc).
  if (isCorrect) {
    score++;
    fb.innerHTML = `Correct! — accepted spelling: "${answer}"` + hint + standardNote;
    fb.className = 'feedback good';
  } else if (nearly) {
    score++;
    fb.innerHTML = `Nearly! — check the spelling: "${answer}"` + hint + standardNote;
    fb.className = 'feedback nearly';
  } else {
    wrong++;
    fb.innerHTML = `Not quite — the answer is "${answer}"` + hint + standardNote;
    fb.className = 'feedback bad';
    const missedKey = char + '|' + answer;
    if (!missed.includes(missedKey)) {
      missed.push(missedKey);
      if (currentQ && (currentQ.disp === 'number' || currentQ.disp === 'word' || currentQ.disp === 'time' || currentQ.disp === 'counter' || currentQ.disp === 'verbform' || currentQ.disp === 'particle' || currentQ.disp === 'sokuon')) missedItems.push(currentQ);
    }
  }
  document.getElementById('stat-correct').textContent = score;
  document.getElementById('stat-wrong').textContent = wrong;
  const nextBtn = document.getElementById('next-btn');
  nextBtn.style.visibility = 'visible';
  nextBtn.innerHTML = (current + 1 < deck.length ? 'Next →' : 'See results →') + '<span class="kbd-hint">space</span>';
}


// Collections is the default landing view for Vocab now that Read has
// retired - see setMatchLevel/showMatchSettings.


// Builds one real, permanent category tile - the ".match-card-select"
// white-text style Materials cards have always used (group name, chars,
// word count, confidence swatch), as opposed to the plain gold-link
// ".vocab-ref-card" style used for reference/notes/TEST links. Shared by
// both real VOCAB categories and promoted THEMES keys (2026-08-31) - this
// used to be inline inside the Object.keys(VOCAB).forEach below, only ever
// called for VOCAB keys; extracted so promoted theme cards (Stations,
// Accommodation, Emergency, Food & drink, Shopping, Signage, Service &
// shop ops) render identically instead of keeping their old gold-link
// TEST styling. resolveVocabCategory/getCategoryAverageScore already work
// generically for a THEMES key (see resolveVocabCategory's THEME_CACHE
// branch), so this needed zero special-casing beyond checking THEMES[key]
// to decide the label/chars source and the click handler.

// The Vocab page's level pills (APP.matchLevel). Untaught, Tourist and
// Andrew show only when their setting is on (the pills are hidden too);
// Grammar is its own tab (2026-10-16); the old L1 and L2 pills are one
// (2026-11-05).
function jaPickMatchLevel(level) {
  if (level === 'andrew') return null; // Andrew mode, removed 2026-11-08
  if (level === 'untaught' && !appSettings.showUntaught) return null;
  if (level === 'grammar') { showGrammarPage(); return null; }
  if (level === 'tourist' && !appSettings.showTourist) return null;
  if (level === 1 || level === 2) return 'l12';
  return level;
}
function jaMatchLevelPills(level) {
  document.getElementById('level-pill-12').classList.toggle('active', level === 'l12');
  document.getElementById('level-pill-3').classList.toggle('active', level === 3);
  document.getElementById('level-pill-4').classList.toggle('active', level === 4);
  ['untaught', 'tourist'].forEach(k => {
    const p = document.getElementById('level-pill-' + k);
    if (p) p.classList.toggle('active', level === k);
  });
}

// A level's list of word lists (APP.matchLevel.list). Untaught, Andrew and
// Tourist reuse the same list view as the levels, so a new category only
// needs its level (or a Group its show:) in vocab.js to appear.
function jaLevelList(container, level) {
  // A line at the top saying this page can be switched off (2026-10-15) -
  // mainly so Untaught users know Tourist has its own switch.
  const offNote = text => { const d = document.createElement('div'); d.className = 'tier-off-note'; d.textContent = text; container.appendChild(d); };
  if (level === 'untaught') offNote('You can turn this page off in Settings (Untaught vocabulary).');
  if (level === 'tourist') offNote('You can turn this page off in Settings (Tourist words).');
  if (level === 'untaught') {
    // Private word lists (Genki) first, on a device where the file has been
    // loaded; then one alphabetical set of the Untaught Groups (show:
    // 'untaught') and categories (level:'untaught'). Cards whose words are
    // all tourist words are empty here (those are on Tourist), so left out.
    PRIVATE_VOCAB_KEYS.forEach(key => container.appendChild(buildCategoryTile(key)));
    container.appendChild(document.createElement('div')).className = 'section-divider';
    const untaughtThemeKeys = Object.keys(THEMES).filter(key => THEMES[key].show === 'untaught');
    const untaughtVocabKeys = Object.keys(VOCAB).filter(key =>
      (VOCAB[key].level || 1) === 'untaught' && VOCAB[key].standaloneCard !== false);
    untaughtThemeKeys.concat(untaughtVocabKeys)
      .filter(key => resolveVocabCategory(key).items.length > 0)
      .map(key => ({ key, label: (THEMES[key] || VOCAB[key]).label }))
      .sort((a, b) => a.label.localeCompare(b.label))
      .forEach(({ key }) => container.appendChild(buildCategoryTile(key)));
    container.appendChild(document.createElement('div')).className = 'section-divider';
  }
  // L1/L2: one list in JP_DRILL_L12_LIST's order - the old L1 and L2
  // categories, a few merged into Groups (show:'l12'). Each card has small
  // L1/L2 badges for where its words come from.
  if (level === 'l12') {
    L12_LIST.filter(key => VOCAB[key] || THEMES[key]).forEach(key => {
      const card = buildCategoryTile(key);
      const lvls = VOCAB[key] ? [VOCAB[key].level || 1]
        : [...new Set(resolveVocabCategory(key).items.map(itemColorKey))].filter(l => l === 1 || l === 2).sort();
      const count = card.querySelector('.group-count');
      if (count && lvls.length) count.insertAdjacentHTML('beforeend',
        '<span class="cat-lvl-badges">' + lvls.map(l => `<span class="gp-lvl gp-lvl-${l}">L${l}</span>`).join('') + '</span>');
      container.appendChild(card);
    });
    return;
  }
  // Tourist: "All tourist words" first, then one card per section in data
  // order (theme-te-* in vocab.js, show:'tourist').
  if (level === 'tourist') {
    Object.keys(THEMES).filter(key => THEMES[key].show === 'tourist-top')
      .forEach(key => container.appendChild(buildCategoryTile(key)));
    container.appendChild(document.createElement('div')).className = 'section-divider';
    Object.keys(THEMES).filter(key => THEMES[key].show === 'tourist')
      .forEach(key => container.appendChild(buildCategoryTile(key)));
    return;
  }
  // Every other level: its categories in vocab.js order (Untaught's are
  // above already). standaloneCard:false keeps a category as storage for
  // tag scans without a card of its own. (Reference cards - the zodiac
  // clock, days in order - are on their own category's screen.)
  Object.keys(VOCAB).forEach(key => {
    const v = VOCAB[key];
    if ((v.level || 1) !== level) return;
    if (level === 'untaught') return;
    if (v.standaloneCard === false) return;
    container.appendChild(buildCategoryTile(key));
  });
}


// selectRandomMatchCard removed 2026-10-07 - level randoms moved to the Random page (selectRandomChoice).

// Where the vocab-reference screen's Back button returns to - reference
// screens get opened from several different places (Vocab > L2, and now the
// Hiragana/Katakana selection screens), so this can't be hardcoded the way
// it used to be (always straight back to Vocab settings).


/* ---------- Random counter challenge ---------- */


/* ---------- end Random counter challenge ---------- */


// を / で two jobs / question word + も cards moved to grammar.js (2026-10-12).

// LEVEL 2 SENTENCE ORDER CARDS RETIRED (2026-10-15, Andrew): the motion and
// を + object cards had their own sentence builder; the Level 3 Sentence order
// card covers everything they did (and きます joined its Going somewhere mode),
// so there is now one builder - the daily-sentence engine (sg*). Only the
// names list below was shared and stays.


// Frequency words card: grammar.js ('frequency'). L3_FREQ_WORDS above stays -
// the sentence engine uses it (SG_FREQ).


// Level 3 plain grammar cards (を additions, と/や, それから, なん/なに, どんな,
// place + で, family, お/ご, noun + します) moved to grammar.js (2026-10-12).

function showVocabReference(categoryKey) {
  // vocab-tile-selection (2026-08-31, was match-settings) - this generic
  // function's only caller right now (Days of the week, via
  // CATEGORY_REFERENCE_LINKS) opens it from that category's own selection
  // screen, so Back should land there, not the list. Revisit if this
  // function ever gains a second caller from a different context.
  vocabRefBackTarget = 'vocab-tile-selection';
  const v = VOCAB[categoryKey];
  document.getElementById('vocab-ref-title').textContent = v.label;
  const list = document.getElementById('vocab-ref-list');
  list.className = '';
  list.innerHTML = '';
  v.items.forEach(item => {
    const row = document.createElement('div');
    row.className = 'vocab-ref-row two-col';
    row.innerHTML = `
      <div class="vocab-ref-col-left">
        <div class="vocab-ref-jp">${markSmallKana(item.jp)}</div>
        ${item.altForm ? `<div class="vocab-ref-alt">${markSmallKana(item.altForm)}</div>` : ''}
      </div>
      <div class="vocab-ref-col-right">
        <div class="vocab-ref-en">${item.en}</div>
        <div class="vocab-ref-romaji">${item.romaji}</div>
      </div>
    `;
    list.appendChild(row);
  });
  showScreen('vocab-reference');
}

// Human-readable labels for the device tags used in Materials — Hotel:
// Appliances & machines' items (see the `devices` array on each item). Fixed
// display order below, not alphabetical - climate control first since every
// hotel room has it, more niche panels after.
const APPLIANCE_DEVICE_LABELS = {
  'ac': 'Air conditioning',
  'tv-remote': 'TV remote',
  'laundry': 'Laundry', // was "Washing machine" - widened to cover the
                         // machine's own panel plus things like detergent
                         // bottle labels once those started showing up too.
  'microwave': 'Microwave',
  'door-lock': 'Door lock / key card',
  'toilet': 'Toilet / bidet',
};
const APPLIANCE_DEVICE_ORDER = ['ac', 'tv-remote', 'laundry', 'microwave', 'door-lock', 'toilet'];

// Reference-only cross-cut of Materials — Hotel: Appliances & machines,
// grouped by which physical panel/remote/dispenser each word was actually
// seen on. Deliberately NOT its own VOCAB category and NOT drillable here -
// the words stay stored, scored, and randomly drillable purely as ordinary
// members of vocab-materials-hotel-appliances; this page just filters and
// groups that one category's items fresh every time it's opened, so it
// always reflects the category's current state with no duplication and no
// extra scoring plumbing. Deliberately simpler than the includeItems
// mechanism (Trip vs Materials) - that one exists because a word needed to
// be drilled from two different category screens, which meant two categories
// both needed to see it. Here nothing needs to be drilled by device - Andrew
// wants an at-a-glance "what does this button mean" lookup, not a separate
// drillable deck per appliance - so a plain filtered read of one category is
// enough, and device labels don't have to live in VOCAB at all.
// Words with no `devices` tag (general hotel-appliance vocab that isn't
// literally printed on a panel/button/dispenser - payment logistics,
// warnings in prose, etc.) simply don't appear here. That's intentional for
// now; revisit if a future category of "not on a panel but still worth a
// reference" word shows up.
function showApplianceDeviceReference() {
  // vocab-tile-selection (2026-08-31, was match-settings) - opens from
  // Hotel: Appliances & machines' own selection screen now (see
  // CATEGORY_REFERENCE_LINKS), so Back should land there, not the list.
  vocabRefBackTarget = 'vocab-tile-selection';
  document.getElementById('vocab-ref-title').textContent = 'Appliances reference';
  const list = document.getElementById('vocab-ref-list');
  list.className = 'tight-list';
  list.innerHTML = '';
  const items = VOCAB['vocab-materials-hotel-appliances'].items;
  APPLIANCE_DEVICE_ORDER.forEach(device => {
    const matches = items.filter(item => item.devices && item.devices.includes(device));
    if (!matches.length) return;
    const heading = document.createElement('div');
    heading.className = 'appliance-device-heading';
    heading.textContent = APPLIANCE_DEVICE_LABELS[device] || device;
    list.appendChild(heading);
    // Alphabetical within each device (by en) - this page is meant to give
    // an overall picture of a device's vocabulary, not to mirror any one
    // physical panel's button layout (which varies remote to remote anyway,
    // and the same word can come from more than one photographed panel).
    matches.slice().sort((a, b) => a.en.localeCompare(b.en)).forEach(item => {
      const row = document.createElement('div');
      row.className = 'vocab-ref-row two-col';
      row.innerHTML = `
        <div class="vocab-ref-col-left">
          <div class="vocab-ref-jp">${markSmallKana(item.jp)}</div>
          ${item.altForm ? `<div class="vocab-ref-alt">${markSmallKana(item.altForm)}</div>` : ''}
        </div>
        <div class="vocab-ref-col-right">
          <div class="vocab-ref-en">${item.en}</div>
          <div class="vocab-ref-romaji">${item.romaji}</div>
        </div>
      `;
      list.appendChild(row);
    });
  });
  showScreen('vocab-reference');
}


function startRandomMatch() { startRandomForLevel(currentMatchLevel); }
function startRandomForLevel(level) {
  // Level 1/2/Untaught: a genuine tag query via scanVocabByTag (see comment
  // there) - every item tagged 'L1'/'L2'/'untaught' anywhere, not "every
  // item stored in a category whose own level happens to match". This is
  // what makes a word tagged forward (e.g. ['L1','L3',...]) show up in
  // multiple levels' random pools with no extra work, the moment
  // forward-tagging is used. Untaught joined this pattern 2026-08-31 when
  // Andrew/Trip merged into a single tier - every word that used to need
  // the old per-category level walk below already carries the 'untaught'
  // item tag (100% coverage, verified before this shipped), so it no
  // longer needs its own special case.
  //
  // Andrew: still a per-category level match, deliberately not a tag
  // query - Andrew mode has never had a universal per-item tier tag of its
  // own (there's currently nothing at level:'andrew' to tag - it's an
  // empty staging tier), so this raw walk stays as the fallback for
  // whatever L3 content lands here next, until that content gets a proper
  // tag of its own the way Untaught just did.
  let allItems;
  if (level === 1 || level === 2 || level === 3 || level === 4) {
    allItems = scanVocabByTag('L' + level);
  } else if (level === 'untaught') {
    allItems = scanVocabByTag(UNTAUGHT_ONLY_QUERY);
  } else if (level === 'tourist') {
    allItems = scanVocabByTag('tourist');
  } else {
    // Level 3 moved to the tag scan above (2026-09-29) once it had content -
    // most L3 words are tagged forward from other categories, so walking
    // level:3 categories' own items would miss them.
    allItems = [];
    Object.keys(VOCAB).forEach(key => {
      if ((VOCAB[key].level || 1) !== level) return;
      VOCAB[key].items.forEach(item => allItems.push(item));
    });
  }
  startVocabReadingDeck(allItems, 'random-level-' + level);
}


// Pulled out of startRandomMatchEverything so the "All vocabulary" card on
// the Themes screen can compute its confidence swatch from the exact same
// pool the drill itself draws its 20 from, rather than a second copy of
// "every category" that could quietly drift out of sync with it.

// Mirrors the optional-tier tag checks in itemTierVisible (Untaught/Genki/
// Andrew, including the Genki-but-already-taught carve-out) but as a fixed
// rule rather than one that moves with the live Settings toggles - kept
// manually in sync with itemTierVisible if a new tier is ever added there.

// "All vocabulary" on the Themes screen is meant to be exactly that - the
// standard taught course content - regardless of whatever optional tiers
// happen to be switched on in Settings right now (Andrew, 2026-09-22).
// Kanji/Andrew/Genki words leaking in here whenever their toggle was on was
// the actual problem being solved: those already have their own dedicated
// "random from everything" cards (Kanji's, Untaught's), and a kanji word
// turning up here is one the new "type the reading" toggle can't reasonably
// ask for a romaji reading of. Unlike getAllVocabPool above, this doesn't
// move with the toggles - it's always just the taught pool. (Not applied to
// getWeakestVocabItems/getUntestedVocabItems below - those are about
// surfacing YOUR actual weak/untested words, which should include optional-
// tier content you've genuinely been drilling if you've switched it on.)


// The 20 lowest-scoring words that have actually been drilled at least
// once - untested words are deliberately excluded here (they're their own
// separate card, getUntestedVocabItems below) rather than folded in as
// "worse than the worst tested score", so the two cards never overlap.
// A harder, deterministic version of the same soft weighting
// startRandomMatchEverything's own draw already applies via selectionWeight
// - sorted-and-sliced instead of randomly biased, so "weakest" is a
// guarantee, not just a likelihood.

// Every word with no kanaScores entry at all - not "worst score", genuinely
// never answered once. Handed to buildVocabReadingDeck's own weighted
// sampler unsliced: every item here gets the identical undrilled weight
// (see selectionWeight's undefined-score floor), so its weighted draw is
// already an unbiased random 20 among them - no separate sampling needed.

// Both guard against an empty pool (everything drilled at least once, for
// Untested - or, in principle, nothing drilled yet at all, for Weakest) by
// simply not starting a drill with nothing in it, rather than launching a
// broken empty deck. Not expected to come up for a while on a real course,
// but cheap to guard against either way.
// UNTESTED 20 PRIORITY (2026-10-15, Andrew): fill the 20 in tier order -
// taught words first, then tourist words, then private-pack words (Genki),
// then the rest of Untaught - random within each tier. Only tiers that are
// switched on are in the pool at all. Before this, the ~900 untaught words
// swamped the few untested taught ones.
function untestedTier(item, privateKeys) {
  const tags = item.tags || [];
  if (tags.includes('taught')) return 0;
  if (tags.includes('tourist')) return 1;
  if (privateKeys.has(item.jp + '|' + item.en)) return 2;
  return 3;
}
function pickUntested20() {
  const privateKeys = new Set();
  PRIVATE_VOCAB_KEYS.forEach(k => (VOCAB[k].items || []).forEach(i => privateKeys.add(i.jp + '|' + i.en)));
  const seen = new Set(), tiers = [[], [], [], []];
  getUntestedVocabItems().forEach(item => {
    const key = item.jp + '|' + item.en;
    if (seen.has(key)) return;
    seen.add(key);
    tiers[untestedTier(item, privateKeys)].push(item);
  });
  const picked = [];
  tiers.forEach(t => { if (picked.length < 20) picked.push(...shuffle(t).slice(0, 20 - picked.length)); });
  return picked;
}


// SENTENCE OF THE DAY (2026-10-06) - builds a short sentence or a
// question-and-answer pair from TAUGHT vocab only, using fixed patterns
// whose slots each carry their own rules (tense, particles, which places
// and times make sense together). Words are looked up by kana among taught
// items (l3TaughtItem) so romaji always matches the drills; any word that
// isn't found simply drops out of its pool. English is written per pattern
// rather than derived from glosses, which aren't sentence-ready.
//
// Grammar used = what the course has covered: は topic, を object, に
// destination / time / person met, で place of action / transport, と "with"
// and "and", や "things like", の possession, から/まで with times,
// frequency words (negative verb after あまり/ぜんぜん), ます / ません /
// ました / ませんでした, です, and question words なに/どこ/だれ/いつ/なんじ.
// Lesson 2 (2026-10-06) added どんな ("what kind of"), place で + verb
// questions (どこ で…か / PLACE で なに を しますか), and my-family vs
// someone-else's-family words (see SG_FAMILY / SG_MY_FAMILY).
//
// Kana is written with a space between every word AND before each particle
// (ともだち は がっこう に いきます) so it lines up word-for-word with the
// romaji - Andrew's request while continuous kana is still hard to parse.
//
// GROWING IT: each lesson, add the new taught words to the lists below
// (verb objects/places, SG_DEST, SG_TIMES, SG_JOBS...) with any rule they
// need, then generate a few thousand sentences in a headless browser
// (sgRand can be swapped for a seeded generator) and read/scan them
// before release - see the handover note. Untaught words are skipped
// automatically, so adding ahead of the course is harmless.


try { sbParts = JSON.parse(localStorage.getItem(SB_PARTS_KEY)) || {}; } catch (e) { sbParts = {}; }
try { sbPartsR = JSON.parse(localStorage.getItem(SB_PARTS_KEY_R)) || {}; } catch (e) { sbPartsR = {}; }


applyAllSettingsUI();
syncServiceWorkerRegistration();
// Runs the real setMatchLevel init (not just buildMatchCategoryList) so the
// default Collections view starts fully set up - active pill state, the
// showing-theme-colours pill-text tint, and the confidence swatches on every
// card - rather than only looking right after leaving and coming back.
setMatchLevel(currentMatchLevel);

updateDirectionVisibility();
updateNumberTimeSwatches();
populateTimeToolSelects();
resetTimeToolToNow();
setNumbersSection(currentNumbersSection);
populateCounterToolPills();
// The number input only shows "1" via placeholder (not a real value), but
// on some browsers a page refresh can restore an actual leftover value into
// a number input without firing its own 'input' event - either way, syncing
// the output once on load (rather than waiting for the user's first
// keystroke) means whatever's visibly in the box always matches what's
// shown below it.
updateCounterTool();
populateMoneyRate();
setMoneyDirection(moneyDirection);
tryRestoreDrillSession();
maybeShowDailyCard();

// Keyboard shortcuts for the drill screen, for anyone on a laptop/desktop:
// digits 1-4 pick the matching option (always exactly 4 per question), and
// Space/Enter advances once answered - purely additive, since taps on mobile
// never fire keydown events, so this has zero effect there.
function handleDrillKeydown(e) {
  if (e.ctrlKey || e.metaKey || e.altKey) return;
  const drillScreen = document.getElementById('screen-drill');
  if (!drillScreen || !drillScreen.classList.contains('visible')) return;
  if (!answered) {
    const idx = ['1', '2', '3', '4', '5', '6', '7', '8', '9'].indexOf(e.key);
    if (idx === -1) return;
    const opts = document.querySelectorAll('#q-options .opt');
    if (opts[idx]) {
      e.preventDefault();
      opts[idx].click();
    }
  } else if (e.key === ' ' || e.key === 'Enter') {
    const nextBtn = document.getElementById('next-btn');
    if (nextBtn && nextBtn.style.visibility === 'visible') {
      e.preventDefault();
      nextBtn.click();
    }
  }
}
window.addEventListener('keydown', handleDrillKeydown);

// The browser's own back button has no way to know it's "inside" this app —
// screens here are just shown/hidden, not separate pages — so pressing back
// out of habit would otherwise leave the page entirely and wipe whatever
// drill was in progress. This traps it: every back/forward press just lands
// straight back on this same page instead of leaving it. In-app navigation
// (nav pills, the Back/Change groups/Quit buttons already in the app) is
// unaffected and remains the real way to move around.
// Since 2026-10-16 the back gesture goes one step back in the app (navBack);
// on a tab's main page it still does nothing, so the app can't be left by
// accident. History is kept one entry deep and re-armed after every press.
history.pushState({ trap: true }, '');
window.addEventListener('popstate', () => {
  history.pushState({ trap: true }, '');
  navBack();
});
