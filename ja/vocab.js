// Japanese Drill - the course vocabulary.
// Split out of index.html on 2026-10-08 so lessons can be added without
// touching the app's code (and the code changed without touching the words).
// index.html loads this with a plain <script src="vocab.js"> BEFORE its own
// script, then reads window.JP_DRILL_VOCAB as VOCAB. A .js file rather than
// .json so it also loads when the app is opened straight from disk (file://),
// where fetch() is blocked - same approach as Strokes' lookup-extra.js.
//
// Each category: { level, label, tagQuery, items: [...] }. Each item:
//   jp, romaji, en, tags[], dateAdded, and optionally altForm (+ altIsStandard /
//   altAfterAnswer), speakAs, kanjiReading, seenAs, source.
// Scores are keyed on jp|en - changing either resets that word's score.
// After editing: bump CACHE_VERSION in sw.js (and the footer version in
// index.html) so phones pick up the new words, and upload vocab.js + sw.js.
window.JP_DRILL_VOCAB = {
  'vocab-greetings': {
    level: 1,
    hasReference: true,
    label: 'Greetings & phrases',
    chars: 'はじめまして こんにちは…',
    tagQuery: ['L1','greetings'],
    items: [
      {jp:'いただきます', romaji:'itadakimasu', en:'(said before eating)', tags:['L1','greetings','taught'], dateAdded:'2026-08-01'},
      {jp:'わかりますか', romaji:'wakarimasu ka', en:'Do you understand?', tags:['L1','greetings','taught'], dateAdded:'2026-08-01'},
      {jp:'すみません', romaji:'sumimasen', en:'Excuse me / sorry', tags:['L1','greetings','taught'], dateAdded:'2026-08-01'},
      {jp:'ともだち', romaji:'tomodachi', en:'Friend', tags:['L1','greetings','taught','genki','genki-1-1','L3','family-l3','l3-2'], dateAdded:'2026-08-01'},
      {jp:'こんばんは', romaji:'konbanwa', en:'Good evening', tags:['L1','greetings','taught'], dateAdded:'2026-08-01'},
      {jp:'おはようございます', romaji:'ohayou gozaimasu', en:'Good morning', tags:['L1','greetings','taught'], dateAdded:'2026-08-01'},
      {jp:'おやすみなさい', romaji:'oyasuminasai', en:'Good night', tags:['L1','greetings','taught'], dateAdded:'2026-08-01'},
      {jp:'さようなら', romaji:'sayounara', en:'Goodbye', tags:['L1','greetings','taught'], dateAdded:'2026-08-01'},
      {jp:'こんにちは', romaji:'konnichiwa', en:'Hello', tags:['L1','greetings','taught'], dateAdded:'2026-08-01'},
      {jp:'わかりません', romaji:'wakarimasen', en:"I don't understand", tags:['L1','greetings','taught'], dateAdded:'2026-08-01'},
      {jp:'どうぞよろしくおねがいします', romaji:'douzo yoroshiku onegaishimasu', en:'I look forward to working with you', tags:['L1','greetings','taught'], dateAdded:'2026-08-01'},
      {jp:'ただいま', romaji:'tadaima', en:"I'm home", tags:['L1','greetings','taught'], dateAdded:'2026-08-01'},
      {jp:'いってきます', romaji:'ittekimasu', en:"I'm off (leaving home)", tags:['L1','greetings','taught'], dateAdded:'2026-08-01'},
      {jp:'はじめまして', romaji:'hajimemashite', en:'Nice to meet you', tags:['L1','greetings','taught'], dateAdded:'2026-08-01'},
      {jp:'よろしくおねがいします', romaji:'yoroshiku onegaishimasu', en:'Nice to meet you / please treat me well', tags:['L1','greetings','taught'], dateAdded:'2026-08-01'},
      {jp:'いいえ', romaji:'iie', en:'No / not at all', tags:['L1','greetings','taught'], dateAdded:'2026-08-01'},
      {jp:'いいえ、わかりません', romaji:'iie wakarimasen', en:"No, I don't understand", tags:['L1','greetings','taught'], dateAdded:'2026-08-01'},
      {jp:'もういちどおねがいします', romaji:'mou ichido onegaishimasu', en:'Once more please', tags:['L1','greetings','taught'], dateAdded:'2026-08-01'},
      {jp:'おねがいします', romaji:'onegai shimasu', en:'Please', tags:['L1','greetings','taught','genki','genki-1-2'], dateAdded:'2026-08-01'},
      {jp:'ください', romaji:'kudasai', en:'Please give me', tags:['L1','greetings','taught','genki','genki-1-2'], dateAdded:'2026-08-01'},
      {jp:'ゆっくりいってください', romaji:'yukkuri itte kudasai', en:'Please speak slowly', tags:['L1','greetings','taught'], dateAdded:'2026-08-01'},
      {jp:'ちょっとまってください', romaji:'chotto matte kudasai', en:'Please wait', tags:['L1','greetings','taught'], dateAdded:'2026-08-01'},
      {jp:'またあした', romaji:'mata ashita', en:'See you tomorrow', tags:['L1','greetings','taught'], dateAdded:'2026-08-01'},
      {jp:'いってらっしゃい', romaji:'itterasshai', en:'Take care (to someone leaving)', tags:['L1','greetings','taught'], dateAdded:'2026-08-01'},
      {jp:'ありがとうございます', romaji:'arigatou gozaimasu', en:'Thank you', tags:['L1','greetings','taught'], dateAdded:'2026-08-01'},
      {jp:'ごちそうさまでした', romaji:'gochisousama deshita', en:'Thank you for the meal (after eating)', tags:['L1','greetings','taught'], dateAdded:'2026-08-01'},
      {jp:'ありがとうございました', romaji:'arigatou gozaimashita', en:'Thank you very much', tags:['L1','greetings','taught'], dateAdded:'2026-08-01'},
      {jp:'ちがいます', romaji:'chigaimasu', en:"That's wrong / That's different", tags:['L1','greetings','taught'], dateAdded:'2026-08-01'},
      {jp:'おかえりなさい', romaji:'okaerinasai', en:'Welcome home', tags:['L1','greetings','taught'], dateAdded:'2026-08-01'},
      {jp:'すばらしい', romaji:'subarashii', en:'Wonderful / splendid', tags:['L1','greetings','taught'], altForm:'素晴らしい', altIsStandard:true, dateAdded:'2026-08-01'},
      {jp:'はい、わかります', romaji:'hai wakarimasu', en:'Yes, I understand', tags:['L1','greetings','taught'], dateAdded:'2026-08-01'},
      {jp:'どういたしまして', romaji:'douitashimashite', en:"You're welcome", tags:['L1','greetings','taught'], dateAdded:'2026-08-01'},
    ],
  },
  'vocab-countries': {
    level: 1,
    hasReference: true,
    label: 'Countries',
    chars: 'にほん フランス…',
    tagQuery: ['L1','countries'],
    items: [
      {jp:'オーストラリア', romaji:'oosutoraria', en:'Australia', tags:['L1','countries','taught','genki','genki-1-1'], altForm:'おーすとらりあ', dateAdded:'2026-08-01'},
      {jp:'ブラジル', romaji:'burajiru', en:'Brazil', tags:['L1','countries','taught'], altForm:'ぶらじる', altAfterAnswer:true, dateAdded:'2026-08-01'},
      {jp:'カナダ', romaji:'kanada', en:'Canada', tags:['L1','countries','taught','genki','genki-1-1'], altForm:'かなだ', altAfterAnswer:true, dateAdded:'2026-08-01'},
      {jp:'ちゅうごく', romaji:'chuugoku', en:'China', tags:['L1','countries','taught','genki','genki-1-1','genki-1-2'], dateAdded:'2026-08-01'},
      {jp:'エジプト', romaji:'ejiputo', en:'Egypt', tags:['L1','countries','taught','genki','genki-1-1'], altForm:'えじぷと', altAfterAnswer:true, dateAdded:'2026-08-01'},
      {jp:'フランス', romaji:'furansu', en:'France', tags:['L1','countries','taught'], altForm:'ふらんす', altAfterAnswer:true, dateAdded:'2026-08-01'},
      {jp:'ドイツ', romaji:'doitsu', en:'Germany', tags:['L1','countries','taught'], altForm:'どいつ', altAfterAnswer:true, dateAdded:'2026-08-01'},
      {jp:'インド', romaji:'indo', en:'India', tags:['L1','countries','taught','genki','genki-1-1'], altForm:'いんど', altAfterAnswer:true, dateAdded:'2026-08-01'},
      {jp:'インドネシア', romaji:'indoneshia', en:'Indonesia', tags:['L1','countries','taught'], altForm:'いんどねしあ', altAfterAnswer:true, dateAdded:'2026-08-01'},
      {jp:'イラン', romaji:'iran', en:'Iran', tags:['L1','countries','taught'], altForm:'いらん', altAfterAnswer:true, dateAdded:'2026-08-01'},
      {jp:'イタリア', romaji:'itaria', en:'Italy', tags:['L1','countries','taught'], altForm:'いたりあ', altAfterAnswer:true, dateAdded:'2026-08-01'},
      {jp:'にほん', romaji:'nihon', en:'Japan', tags:['L1','countries','taught','genki','genki-1-1'], dateAdded:'2026-08-01'},
      {jp:'かんこく', romaji:'kankoku', en:'Korea', tags:['L1','countries','taught','genki','genki-1-1','genki-1-2'], dateAdded:'2026-08-01'},
      {jp:'マレーシア', romaji:'mareeshia', en:'Malaysia', tags:['L1','countries','taught'], altForm:'まれーしあ', dateAdded:'2026-08-01'},
      {jp:'メキシコ', romaji:'mekishiko', en:'Mexico', tags:['L1','countries','taught'], altForm:'めきしこ', altAfterAnswer:true, dateAdded:'2026-08-01'},
      {jp:'フィリピン', romaji:'firipin', en:'Philippines', tags:['L1','countries','taught','genki','genki-1-1'], altForm:'ふぃりぴん', altAfterAnswer:true, dateAdded:'2026-08-01'},
      {jp:'ポーランド', romaji:'poorando', en:'Poland', tags:['L1','countries','taught'], altForm:'ぽーらんど', dateAdded:'2026-08-01'},
      {jp:'ロシア', romaji:'roshia', en:'Russia', tags:['L1','countries','taught'], altForm:'ろしあ', altAfterAnswer:true, dateAdded:'2026-08-01'},
      {jp:'サウジアラビア', romaji:'saujiarabia', en:'Saudi Arabia', tags:['L1','countries','taught'], altForm:'さうじあらびあ', altAfterAnswer:true, dateAdded:'2026-08-01'},
      {jp:'シンガポール', romaji:'shingapooru', en:'Singapore', tags:['L1','countries','taught'], altForm:'しんがぽーる', dateAdded:'2026-08-01'},
      {jp:'スペイン', romaji:'supein', en:'Spain', tags:['L1','countries','taught'], altForm:'すぺいん', altAfterAnswer:true, dateAdded:'2026-08-01'},
      {jp:'スイス', romaji:'suisu', en:'Switzerland', tags:['L1','countries','taught'], altForm:'すいす', altAfterAnswer:true, dateAdded:'2026-08-01'},
      {jp:'タイ', romaji:'tai', en:'Thailand', tags:['L1','countries','taught'], altForm:'たい', altAfterAnswer:true, dateAdded:'2026-08-01'},
      {jp:'イギリス', romaji:'igirisu', en:'UK / England', tags:['L1','countries','taught','genki','genki-1-1','genki-1-2'], altForm:'いぎりす', altAfterAnswer:true, dateAdded:'2026-08-01'},
      {jp:'アメリカ', romaji:'amerika', en:'USA', tags:['L1','countries','taught','genki','genki-1-1'], altForm:'あめりか', altAfterAnswer:true, dateAdded:'2026-08-01'},
      {jp:'ベトナム', romaji:'betonamu', en:'Vietnam', tags:['L1','countries','taught'], altForm:'べとなむ', altAfterAnswer:true, dateAdded:'2026-08-01'},
    ],
  },
  'vocab-occupations': {
    level: 1,
    hasReference: true,
    label: 'Occupations',
    chars: 'せんせい いしゃ…',
    tagQuery: ['L1','occupations'],
    items: [
      {jp:'かいけいし', romaji:'kaikeishi', en:'accountant', tags:['L1','occupations','taught'], dateAdded:'2026-08-01'},
      {jp:'ぎんこういん', romaji:'ginkouin', en:'banker', tags:['L1','occupations','taught'], dateAdded:'2026-08-01'},
      {jp:'こうむいん', romaji:'koumuin', en:'civil servant', tags:['L1','occupations','taught'], dateAdded:'2026-08-01'},
      {jp:'かいしゃいん', romaji:'kaishain', en:'company employee', tags:['L1','occupations','taught','genki','genki-1-1'], dateAdded:'2026-08-01'},
      {jp:'デザイナー', romaji:'dezainaa', en:'designer', tags:['L1','occupations','taught'], altForm:'でざいなー', dateAdded:'2026-08-01'},
      {jp:'いしゃ', romaji:'isha', en:'doctor', tags:['L1','occupations','taught','genki','genki-1-1'], dateAdded:'2026-08-01'},
      {jp:'エンジニア', romaji:'enjinia', en:'engineer', tags:['L1','occupations','taught'], altForm:'えんじにあ', altAfterAnswer:true, dateAdded:'2026-08-01'},
      {jp:'べんごし', romaji:'bengoshi', en:'lawyer', tags:['L1','occupations','taught','genki','genki-1-1'], dateAdded:'2026-08-01'},
      {jp:'けんきゅうしゃ', romaji:'kenkyuusha', en:'researcher', tags:['L1','occupations','taught'], dateAdded:'2026-08-01'},
      {jp:'ひしょ', romaji:'hisho', en:'secretary', tags:['L1','occupations','taught'], dateAdded:'2026-08-01'},
      {jp:'しゃいん', romaji:'shain', en:'staff member / employee', tags:['L1','occupations','taught'], dateAdded:'2026-08-01'},
      {jp:'がくせい', romaji:'gakusei', en:'student', tags:['L1','occupations','taught','genki','genki-1-1','L3','occupations-l3','l3-2'], dateAdded:'2026-08-01'},
      {jp:'きょうし', romaji:'kyoushi', en:'teacher (formal)', tags:['L1','occupations','taught'], dateAdded:'2026-08-01'},
      {jp:'せんせい', romaji:'sensei', en:'teacher / instructor', tags:['L1','occupations','taught','genki','genki-1-1'], dateAdded:'2026-08-01'},
    ],
  },
  // GENKI LESSON 1-1 moved out (2026-10-02) into a private vocab pack
  // (genki-vocab.json, loaded per device via Settings > Private vocab - see
  // PRIVATE VOCAB PACKS below VOCAB) so textbook lists never ship in the
  // published app. Words already taught in the course keep their
  // 'genki'+'genki-1-1' tags where they live, so the Genki tile still shows
  // them alongside the pack's own words when the pack is loaded. なに/なん,
  // now taught in Level 3, moved to vocab-frequency-l3 at the same time.
  'vocab-objects': {
    level: 1,
    hasReference: true,
    label: 'Everyday items',
    chars: 'かさ ほん とけい…',
    tagQuery: ['L1','objects'],
    items: [
      {jp:'かばん', romaji:'kaban', en:'bag', tags:['L1','objects','taught','genki','genki-1-2'], dateAdded:'2026-08-01'},
      {jp:'ボールペン', romaji:'boorupen', en:'ballpoint pen', tags:['L1','objects','taught'], altForm:'ぼーるぺん', dateAdded:'2026-08-01'},
      {jp:'ほん', romaji:'hon', en:'book', tags:['L1','objects','taught','genki','genki-1-2','L3','general-l3','l3-2'], dateAdded:'2026-08-01'},
      {jp:'めいし', romaji:'meishi', en:'business card', tags:['L1','objects','taught'], dateAdded:'2026-08-01'},
      {jp:'カード', romaji:'kaado', en:'card', tags:['L1','objects','taught'], altForm:'かーど', dateAdded:'2026-08-01'},
      {jp:'いす', romaji:'isu', en:'chair', tags:['L1','objects','taught'], dateAdded:'2026-08-01'},
      {jp:'チョコレート', romaji:'chokoreeto', en:'chocolate', tags:['L1','objects','taught','L3','gifts-l3','l3-3'], altForm:'ちょこれーと', dateAdded:'2026-08-01'},
      {jp:'たばこ', romaji:'tabako', en:'cigarettes', tags:['L1','objects','taught'], dateAdded:'2026-08-01'},
      {jp:'コーヒー', romaji:'koohii', en:'coffee', tags:['L1','objects','taught','L3','food-drink-l3','l3-1','genki','genki-1-3','drink'], altForm:'こーひー', dateAdded:'2026-08-01'},
      {jp:'コンピューター', romaji:'konpyuutaa', en:'computer', tags:['L1','objects','taught','genki','genki-1-1','genki-1-2'], altForm:'こんぴゅーたー', dateAdded:'2026-08-01'},
      {jp:'りょうり', romaji:'ryouri', en:'cooking', tags:['L1','objects','taught','L3','hobbies-l3','l3-1'], dateAdded:'2026-08-01'},
      {jp:'つくえ', romaji:'tsukue', en:'desk', tags:['L1','objects','taught'], dateAdded:'2026-08-01'},
      {jp:'じしょ', romaji:'jisho', en:'dictionary', tags:['L1','objects','taught'], dateAdded:'2026-08-01'},
      {jp:'れきし', romaji:'rekishi', en:'history', tags:['L1','objects','taught','genki','genki-1-1','genki-1-2'], dateAdded:'2026-08-01'},
      {jp:'かぎ', romaji:'kagi', en:'key', tags:['L1','objects','taught'], dateAdded:'2026-08-01'},
      {jp:'ざっし', romaji:'zasshi', en:'magazine', tags:['L1','objects','taught','genki','genki-1-3','L3','general-l3','l3-2'], dateAdded:'2026-08-01'},
      {jp:'ちず', romaji:'chizu', en:'map', tags:['L1','objects','taught'], dateAdded:'2026-08-01'},
      {jp:'にく', romaji:'niku', en:'meat', tags:['L1','objects','taught','L3','food-drink-l3','l3-1','genki','genki-1-2','food-type'], dateAdded:'2026-08-01'},
      {jp:'シャープペンシル', romaji:'shaapupenshiru', en:'mechanical pencil', tags:['L1','objects','taught'], altForm:'しゃーぷぺんしる', dateAdded:'2026-08-01'},
      {jp:'けいたい', romaji:'keitai', en:'mobile phone', tags:['L1','objects','taught','L3','tools-l3','l3-5'], dateAdded:'2026-08-01'},
      {jp:'しんぶん', romaji:'shinbun', en:'newspaper', tags:['L1','objects','taught','genki','genki-1-2','L3','general-l3','l3-2'], dateAdded:'2026-08-01'},
      {jp:'ノート', romaji:'nooto', en:'notebook', tags:['L1','objects','taught','genki','genki-1-2'], altForm:'のーと', dateAdded:'2026-08-01'},
      {jp:'ペン', romaji:'pen', en:'pen', tags:['L1','objects','taught','genki','genki-1-2','L3','tools-l3','l3-5'], altForm:'ぺん', altAfterAnswer:true, dateAdded:'2026-08-01'},
      {jp:'えんぴつ', romaji:'enpitsu', en:'pencil', tags:['L1','objects','taught','L3','tools-l3','l3-5'], dateAdded:'2026-08-01'},
      {jp:'てちょう', romaji:'techou', en:'pocket notebook', tags:['L1','objects','taught'], dateAdded:'2026-08-01'},
      {jp:'さいふ', romaji:'saifu', en:'purse / wallet', tags:['L1','objects','taught','genki','genki-1-2','L3','gifts-l3','l3-3'], dateAdded:'2026-08-01'},
      {jp:'ラジオ', romaji:'rajio', en:'radio', tags:['L1','objects','taught','L3','hobbies-l3','l3-2'], altForm:'らじお', dateAdded:'2026-08-01'},
      {jp:'テープ', romaji:'teepu', en:'tape', tags:['L1','objects','taught'], altForm:'てーぷ', dateAdded:'2026-08-01'},
      {jp:'テレビ', romaji:'terebi', en:'television', tags:['L1','objects','taught','genki','genki-1-3'], altForm:'てれび', dateAdded:'2026-08-01'},
      {jp:'かさ', romaji:'kasa', en:'umbrella', tags:['L1','objects','taught','genki','genki-1-2'], dateAdded:'2026-08-01'},
      {jp:'とけい', romaji:'tokei', en:'watch / clock', tags:['L1','objects','taught','genki','genki-1-2'], dateAdded:'2026-08-01'},
      // Clothing & accessories merged in here 2026-10-08 (only 4 words; same jp|en, scores kept).
      {jp:'ぼうし', romaji:'boushi', en:'hat', tags:['L1','objects','taught','genki','genki-1-2','L3','gifts-l3','l3-3'], dateAdded:'2026-08-01'},
      {jp:'ジーンズ', romaji:'jiinzu', en:'jeans', tags:['L1','objects','taught','genki','genki-1-2'], altForm:'じーんず', dateAdded:'2026-08-01'},
      {jp:'ネクタイ', romaji:'nekutai', en:'necktie', tags:['L1','objects','taught'], altForm:'ねくたい', altAfterAnswer:true, dateAdded:'2026-08-01'},
      {jp:'くつ', romaji:'kutsu', en:'shoes', tags:['L1','objects','taught','genki','genki-1-2','L3','general-l3','l3-2'], dateAdded:'2026-08-01'},
    ],
  },
  'vocab-places': {
    level: 1,
    hasReference: true,
    label: 'Places & around the building',
    chars: 'うち じむしょ かいだん…',
    tagQuery: ['L1','places'],
    items: [
      {jp:'しょくどう', romaji:'shokudou', en:'canteen / cafeteria', tags:['L1','places','taught','L3','places-l3','l3-2'], dateAdded:'2026-08-01'},
      {jp:'きょうしつ', romaji:'kyoushitsu', en:'classroom', tags:['L1','places','taught','L3','places-l3','l3-2'], dateAdded:'2026-08-01'},
      {jp:'くに', romaji:'kuni', en:'country / nation', tags:['L1','places','taught'], dateAdded:'2026-08-01'},
      {jp:'エレベーター', romaji:'erebeetaa', en:'elevator / lift', tags:['L1','places','taught'], altForm:'えれべーたー', dateAdded:'2026-08-01'},
      {jp:'エスカレーター', romaji:'esukareetaa', en:'escalator', tags:['L1','places','taught'], altForm:'えすかれーたー', dateAdded:'2026-08-01'},
      {jp:'かい', romaji:'kai', en:'floor / storey', tags:['L1','places','taught'], dateAdded:'2026-08-01'},
      {jp:'うち', romaji:'uchi', en:'home / house', tags:['L1','places','taught','genki','genki-1-3'], dateAdded:'2026-08-01'},
      {jp:'かいぎしつ', romaji:'kaigishitsu', en:'meeting room', tags:['L1','places','taught'], dateAdded:'2026-08-01'},
      {jp:'じむしょ', romaji:'jimusho', en:'office', tags:['L1','places','taught','L3','places-l3','l3-2'], dateAdded:'2026-08-01'},
      {jp:'オフィス', romaji:'ofisu', en:'office (loanword)', tags:['L1','places','taught'], altForm:'おふぃす', altAfterAnswer:true, dateAdded:'2026-08-01'},
      {jp:'うけつけ', romaji:'uketsuke', en:'reception', tags:['L1','places','taught'], dateAdded:'2026-08-01'},
      {jp:'へや', romaji:'heya', en:'room', tags:['L1','places','taught','L3','places-l3','l3-2'], dateAdded:'2026-08-01'},
      {jp:'うりば', romaji:'uriba', en:'sales counter / department', tags:['L1','places','taught'], dateAdded:'2026-08-01'},
      {jp:'かいだん', romaji:'kaidan', en:'stairs', tags:['L1','places','taught'], dateAdded:'2026-08-01'},
      // Katakana since 2026-10-01 - L1 had it in hiragana (pre-katakana), but
      // it's always トイレ in real life/on signs. Also tagged into L3 General,
      // replacing the separate L3 entry added 2026-09-29.
      {jp:'トイレ', romaji:'toire', en:'toilet', tags:['L1','places','taught','L3','general-l3','l3-1','genki','genki-1-2'], dateAdded:'2026-08-01'},
    ],
  },
  'vocab-numbers': {
    level: 1,
    hasReference: true,
    noMeaningMode: true,
    ordinalOrder: true, // 1,2,3... - alphabetizing "eight"/"eighteen"/"eighty" etc would scramble it
    label: 'Numbers',
    chars: 'いち に さん…',
    tagQuery: ['L1','numbers'],
    items: [
      {jp:'いち', romaji:'ichi', en:'1', tags:['L1','numbers','taught'], dateAdded:'2026-08-01'},
      {jp:'に', romaji:'ni', en:'2', tags:['L1','numbers','taught'], dateAdded:'2026-08-01'},
      {jp:'さん', romaji:'san', en:'3', tags:['L1','numbers','taught'], dateAdded:'2026-08-01'},
      {jp:'よん', romaji:'yon', en:'4', tags:['L1','numbers','taught'], dateAdded:'2026-08-01'},
      {jp:'ご', romaji:'go', en:'5', tags:['L1','numbers','taught'], dateAdded:'2026-08-01'},
      {jp:'ろく', romaji:'roku', en:'6', tags:['L1','numbers','taught'], dateAdded:'2026-08-01'},
      {jp:'なな', romaji:'nana', en:'7', tags:['L1','numbers','taught'], dateAdded:'2026-08-01'},
      {jp:'はち', romaji:'hachi', en:'8', tags:['L1','numbers','taught'], dateAdded:'2026-08-01'},
      {jp:'きゅう', romaji:'kyuu', en:'9', tags:['L1','numbers','taught'], dateAdded:'2026-08-01'},
      {jp:'じゅう', romaji:'juu', en:'10', tags:['L1','numbers','taught'], dateAdded:'2026-08-01'},
      {jp:'にじゅう', romaji:'nijuu', en:'20', tags:['L1','numbers','taught'], dateAdded:'2026-08-01'},
      {jp:'さんじゅう', romaji:'sanjuu', en:'30', tags:['L1','numbers','taught'], dateAdded:'2026-08-01'},
      {jp:'よんじゅう', romaji:'yonjuu', en:'40', tags:['L1','numbers','taught'], dateAdded:'2026-08-01'},
      {jp:'ごじゅう', romaji:'gojuu', en:'50', tags:['L1','numbers','taught'], dateAdded:'2026-08-01'},
      {jp:'ろくじゅう', romaji:'rokujuu', en:'60', tags:['L1','numbers','taught'], dateAdded:'2026-08-01'},
      {jp:'ななじゅう', romaji:'nanajuu', en:'70', tags:['L1','numbers','taught'], dateAdded:'2026-08-01'},
      {jp:'はちじゅう', romaji:'hachijuu', en:'80', tags:['L1','numbers','taught'], dateAdded:'2026-08-01'},
      {jp:'きゅうじゅう', romaji:'kyuujuu', en:'90', tags:['L1','numbers','taught'], dateAdded:'2026-08-01'},
      {jp:'ひゃく', romaji:'hyaku', en:'100', tags:['L1','numbers','taught'], dateAdded:'2026-08-01'},
      {jp:'にひゃく', romaji:'nihyaku', en:'200', tags:['L1','numbers','taught'], dateAdded:'2026-08-01'},
      {jp:'さんびゃく', romaji:'sanbyaku', en:'300', tags:['L1','numbers','taught'], dateAdded:'2026-08-01'},
      {jp:'よんひゃく', romaji:'yonhyaku', en:'400', tags:['L1','numbers','taught'], dateAdded:'2026-08-01'},
      {jp:'ごひゃく', romaji:'gohyaku', en:'500', tags:['L1','numbers','taught'], dateAdded:'2026-08-01'},
      {jp:'ろっぴゃく', romaji:'roppyaku', en:'600', tags:['L1','numbers','taught'], dateAdded:'2026-08-01'},
      {jp:'ななひゃく', romaji:'nanahyaku', en:'700', tags:['L1','numbers','taught'], dateAdded:'2026-08-01'},
      {jp:'はっぴゃく', romaji:'happyaku', en:'800', tags:['L1','numbers','taught'], dateAdded:'2026-08-01'},
      {jp:'きゅうひゃく', romaji:'kyuuhyaku', en:'900', tags:['L1','numbers','taught'], dateAdded:'2026-08-01'},
      {jp:'せん', romaji:'sen', en:'1,000', tags:['L1','numbers','taught'], dateAdded:'2026-08-01'},
      {jp:'にせん', romaji:'nisen', en:'2,000', tags:['L1','numbers','taught'], dateAdded:'2026-08-01'},
      {jp:'さんぜん', romaji:'sanzen', en:'3,000', tags:['L1','numbers','taught'], dateAdded:'2026-08-01'},
      {jp:'よんせん', romaji:'yonsen', en:'4,000', tags:['L1','numbers','taught'], dateAdded:'2026-08-01'},
      {jp:'ごせん', romaji:'gosen', en:'5,000', tags:['L1','numbers','taught'], dateAdded:'2026-08-01'},
      {jp:'ろくせん', romaji:'rokusen', en:'6,000', tags:['L1','numbers','taught'], dateAdded:'2026-08-01'},
      {jp:'ななせん', romaji:'nanasen', en:'7,000', tags:['L1','numbers','taught'], dateAdded:'2026-08-01'},
      {jp:'はっせん', romaji:'hassen', en:'8,000', tags:['L1','numbers','taught'], dateAdded:'2026-08-01'},
      {jp:'きゅうせん', romaji:'kyuusen', en:'9,000', tags:['L1','numbers','taught'], dateAdded:'2026-08-01'},
      {jp:'まん', romaji:'man', en:'10,000', tags:['L1','numbers','taught'], dateAdded:'2026-08-01'},
      {jp:'じゅうまん', romaji:'juuman', en:'100,000', tags:['L1','numbers','taught'], dateAdded:'2026-08-01'},
      {jp:'ひゃくまん', romaji:'hyakuman', en:'1,000,000', tags:['L1','numbers','taught'], dateAdded:'2026-08-01'},
      {jp:'いちおく', romaji:'ichioku', en:'100,000,000', tags:['L1','numbers','taught'], dateAdded:'2026-08-01'},
    ],
  },
  'vocab-colours': {
    level: 1,
    hasReference: true,
    // Not from the textbook, but harmless and useful enough for everyone
    // that it doesn't need gating - see buildMatchCategoryList's use of
    // `note` for how this shows up as "Not covered in lessons" rather than
    // the usual plain word count.
    note: 'Not covered in lessons',
    label: 'Colours',
    chars: 'あか あお きいろ…',
    tagQuery: ['L1','colours'],
    items: [
      {jp:'くろ', romaji:'kuro', en:'black', tags:['L1','colours','taught'], dateAdded:'2026-08-01'},
      {jp:'あお', romaji:'ao', en:'blue', tags:['L1','colours','taught'], dateAdded:'2026-08-01'},
      {jp:'ちゃいろ', romaji:'chairo', en:'brown', tags:['L1','colours','taught'], dateAdded:'2026-08-01'},
      {jp:'みどり', romaji:'midori', en:'green', tags:['L1','colours','taught'], dateAdded:'2026-08-01'},
      {jp:'オレンジ', romaji:'orenji', en:'orange', tags:['L1','colours','taught'], altForm:'おれんじ', dateAdded:'2026-08-01'},
      {jp:'ピンク', romaji:'pinku', en:'pink', tags:['L1','colours','taught'], altForm:'ぴんく', dateAdded:'2026-08-01'},
      {jp:'むらさき', romaji:'murasaki', en:'purple', tags:['L1','colours','taught'], dateAdded:'2026-08-01'},
      {jp:'あか', romaji:'aka', en:'red', tags:['L1','colours','taught'], dateAdded:'2026-08-01'},
      {jp:'しろ', romaji:'shiro', en:'white', tags:['L1','colours','taught'], dateAdded:'2026-08-01'},
      {jp:'きいろ', romaji:'kiiro', en:'yellow', tags:['L1','colours','taught'], dateAdded:'2026-08-01'},
    ],
  },
  'vocab-general-l2': {
    level: 2,
    hasReference: true,
    label: 'General vocabulary',
    chars: 'ごみばこ きせつ かぞく',
    tagQuery: ['L2','general-l2'],
    items: [
      {jp:'ひとりで', romaji:'hitoride', en:'alone', tags:['L2','general-l2','taught','L3','general-l3','l3-2'], dateAdded:'2026-08-01'},
      // From the old Horse racing category (removed 2026-10-08 - never taught;
      // the only word in it with everyday use). Same jp|en, so its score is kept.
      {jp:'レース', romaji:'reesu', en:'race', tags:['L2','general-l2','taught'], altForm:'れーす', dateAdded:'2026-08-01'},
      {jp:'あさごはん', romaji:'asagohan', en:'breakfast', tags:['L2','general-l2','taught','genki','genki-1-3'], altForm:'朝ご飯', altIsStandard:true, dateAdded:'2026-08-01'},
      {jp:'ばんごはん', romaji:'bangohan', en:'dinner', tags:['L2','general-l2','taught','genki','genki-1-3'], altForm:'晩ご飯', altIsStandard:true, dateAdded:'2026-08-01'},
      {jp:'かぞく', romaji:'kazoku', en:'family', tags:['L2','general-l2','taught'], altForm:'家族', altIsStandard:true, dateAdded:'2026-08-01'},
      {jp:'にほんごのじゅぎょう', romaji:'nihongo no jugyou', en:'Japanese language class', tags:['L2','general-l2','taught'], altForm:'日本語の授業', altIsStandard:true, dateAdded:'2026-08-01'},
      {jp:'ひるごはん', romaji:'hirugohan', en:'lunch', tags:['L2','general-l2','taught','genki','genki-1-3'], altForm:'昼ご飯', altIsStandard:true, dateAdded:'2026-08-01'},
      {jp:'ひるやすみ', romaji:'hiruyasumi', en:'lunch break', tags:['L2','general-l2','taught'], altForm:'昼休み', altIsStandard:true, dateAdded:'2026-08-01'},
      {jp:'かいぎ', romaji:'kaigi', en:'meeting', tags:['L2','general-l2','taught'], altForm:'会議', altIsStandard:true, dateAdded:'2026-08-01'},
      {jp:'えいが', romaji:'eiga', en:'movie', tags:['L2','general-l2','taught','L3','hobbies-l3','l3-1','genki','genki-1-3'], altForm:'映画', altIsStandard:true, dateAdded:'2026-08-01'},
      {jp:'パーティー', romaji:'paatii', en:'party', tags:['L2','general-l2','taught','L3','hobbies-l3','l3-1'], dateAdded:'2026-08-01'},
      {jp:'ごはん', romaji:'gohan', en:'rice / meal', tags:['L2','general-l2','taught','L3','food-drink-l3','l3-1','food-type'], altForm:'ご飯', altIsStandard:true, seenAs:'ごはん also labels the rice preset button on a microwave (Tokyu Stay Kyoto) - same word, not a separate one', dateAdded:'2026-08-01'},
      {jp:'ごみばこ', romaji:'gomibako', en:'rubbish bin', tags:['L2','general-l2','taught'], altForm:'ゴミ箱', altIsStandard:true, dateAdded:'2026-08-01'},
      {jp:'はさみ', romaji:'hasami', en:'scissors', tags:['L2','general-l2','taught','L3','tools-l3','l3-5'], dateAdded:'2026-08-01'},
      {jp:'きせつ', romaji:'kisetsu', en:'season', tags:['L2','general-l2','taught'], altForm:'季節', altIsStandard:true, dateAdded:'2026-08-01'},
      {jp:'しょうゆ', romaji:'shouyu', en:'soy sauce', tags:['L2','general-l2','taught','L3','food-drink-l3','l3-2','food-type','gifts-l3','l3-3'], altForm:'醤油', altIsStandard:true, dateAdded:'2026-08-01'},
      {jp:'とうふ', romaji:'toufu', en:'tofu', tags:['L2','general-l2','taught'], altForm:'豆腐', altIsStandard:true, dateAdded:'2026-08-01'},
      {jp:'じどうはんばいき', romaji:'jidouhanbaiki', en:'vending machine', tags:['L2','general-l2','taught'], altForm:'自動販売機', altIsStandard:true, dateAdded:'2026-08-01'},
      {jp:'しごと', romaji:'shigoto', en:'work / job', tags:['L2','general-l2','taught'], altForm:'仕事', altIsStandard:true, dateAdded:'2026-08-01'},
      // Week 6 additions - the rest of that lesson's object/place/other
      // words that aren't food (see Food and drink) or family (see Family).
      // Duplicates already taught elsewhere were left out rather than
      // re-added here: しんぶん/たばこ/かばん (Everyday items, L1), しょくどう
      // (Places, L1), しゅうまつ (Time vocabulary, L2).
      {jp:'おんがく', romaji:'ongaku', en:'music', tags:['L2','general-l2','taught','genki','genki-1-3','L3','hobbies-l3','l3-2'], altForm:'音楽', altIsStandard:true, dateAdded:'2026-08-13'},
      {jp:'Eメール', romaji:'ii meeru', en:'email', tags:['L2','general-l2','taught'], dateAdded:'2026-08-13'},
      {jp:'しゃしん', romaji:'shashin', en:'photograph / photography', tags:['L2','general-l2','taught','L3','hobbies-l3','l3-1'], altForm:'写真', altIsStandard:true, dateAdded:'2026-08-13'},
      {jp:'テニス', romaji:'tenisu', en:'tennis', tags:['L2','general-l2','taught','L3','hobbies-l3','l3-1','genki','genki-1-3'], dateAdded:'2026-08-13'},
      {jp:'ゲーム', romaji:'geemu', en:'game', tags:['L2','general-l2','taught','L3','hobbies-l3','l3-1'], dateAdded:'2026-08-13'},
      {jp:'スポーツ', romaji:'supootsu', en:'sports', tags:['L2','general-l2','taught','genki','genki-1-3','L3','hobbies-l3','l3-2'], dateAdded:'2026-08-13'},
      {jp:'しゅくだい', romaji:'shukudai', en:'homework', tags:['L2','general-l2','taught'], altForm:'宿題', altIsStandard:true, dateAdded:'2026-08-13'},
      {jp:'てがみ', romaji:'tegami', en:'letter', tags:['L2','general-l2','taught'], altForm:'手紙', altIsStandard:true, dateAdded:'2026-08-13'},
      {jp:'カフェ', romaji:'kafe', en:'café', tags:['L2','general-l2','taught','genki','genki-1-3'], dateAdded:'2026-08-13'},
      {jp:'パブ', romaji:'pabu', en:'pub', tags:['L2','general-l2','taught'], dateAdded:'2026-08-13'},
      {jp:'おはなみ', romaji:'ohanami', en:'flower viewing', tags:['L2','general-l2','taught','L3','hobbies-l3','l3-1'], altForm:'お花見', altIsStandard:true, dateAdded:'2026-08-13'},
      // Moved in from Trip's "Useful words for the trip" - now taught in the
      // lesson, so it only needs to live here (see the Week 6 relocation
      // note above vocab-trip-prep). ビール/ワイン made the same move, into
      // the new Food and drink (L2) category below.
      {jp:'みず', romaji:'mizu', en:'water', tags:['L2','general-l2','taught','genki','genki-1-3','drink'], altForm:'水', altIsStandard:true, dateAdded:'2026-08-13'},
    ],
  },
  // New in Week 6 - the app's first dedicated family-member vocabulary.
  // かぞく (family, the generic word) already lives in General vocabulary;
  // these are the individual members that came with it this week. Kept in
  // the lesson's own logical order (parents, older siblings, younger
  // siblings, grandparents) rather than pre-alphabetized, same reasoning as
  // Materials - resolveVocabCategory alphabetizes for display regardless.
  'vocab-family-l2': {
    level: 2,
    hasReference: true,
    label: 'Family',
    chars: 'おとうさん おかあさん おにいさん…',
    tagQuery: ['L2','family-l2'],
    items: [
      {jp:'おとうさん', romaji:'otousan', en:'father (someone else\'s)', tags:['L2','family-l2','taught','genki','genki-1-1','genki-1-2','L3','family-l3','l3-2'], altForm:'お父さん', altIsStandard:true, dateAdded:'2026-08-13'},
      {jp:'おかあさん', romaji:'okaasan', en:'mother (someone else\'s)', tags:['L2','family-l2','taught','genki','genki-1-1','genki-1-2','L3','family-l3','l3-2'], altForm:'お母さん', altIsStandard:true, dateAdded:'2026-08-13'},
      {jp:'おにいさん', romaji:'oniisan', en:'older brother (someone else\'s)', tags:['L2','family-l2','taught','genki','genki-1-1','L3','family-l3','l3-2'], altForm:'お兄さん', altIsStandard:true, dateAdded:'2026-08-13'},
      {jp:'おねえさん', romaji:'oneesan', en:'older sister (someone else\'s)', tags:['L2','family-l2','taught','genki','genki-1-1','L3','family-l3','l3-2'], altForm:'お姉さん', altIsStandard:true, dateAdded:'2026-08-13'},
      {jp:'おとうと', romaji:'otouto', en:'my younger brother', tags:['L2','family-l2','taught','genki','genki-1-1','L3','family-l3','l3-2'], altForm:'弟', altIsStandard:true, dateAdded:'2026-08-13'},
      {jp:'いもうと', romaji:'imouto', en:'my younger sister', tags:['L2','family-l2','taught','genki','genki-1-1','L3','family-l3','l3-2'], altForm:'妹', altIsStandard:true, dateAdded:'2026-08-13'},
      {jp:'おじいさん', romaji:'ojiisan', en:'grandfather (someone else\'s)', tags:['L2','family-l2','taught','L3','family-l3','l3-2'], altForm:'お祖父さん', altIsStandard:true, dateAdded:'2026-08-13'},
      {jp:'おばあさん', romaji:'obaasan', en:'grandmother (someone else\'s)', tags:['L2','family-l2','taught','L3','family-l3','l3-2'], altForm:'お祖母さん', altIsStandard:true, dateAdded:'2026-08-13'},
    ],
  },
  // New in Week 6 - the first dedicated L2 food/drink category (the
  // existing "Food and drink" is Trip-tier only). おさけ (alcohol) is kept
  // as its own entry even though さけ already means "sake / alcohol" in
  // Trip's "Useful words for the trip" and "salmon" in Trip's Food and
  // drink - different kana, and merging them got confusing fast, so all
  // three stay separate for now.
  'vocab-food-drink-l2': {
    level: 2,
    hasReference: true,
    label: 'Food & drink',
    chars: 'りんご パン たまご…',
    tagQuery: ['L2','food-drink-l2'],
    items: [
      {jp:'りんご', romaji:'ringo', en:'apple', tags:['L2','food-drink-l2','taught','food-type','L3','food-drink-l3','l3-1'], dateAdded:'2026-08-13'},
      {jp:'パン', romaji:'pan', en:'bread', tags:['L2','food-drink-l2','taught','food-type','L3','food-drink-l3','l3-1'], dateAdded:'2026-08-13'},
      {jp:'たまご', romaji:'tamago', en:'egg', tags:['L2','food-drink-l2','taught','food-type','L3','food-drink-l3','l3-1'], dateAdded:'2026-08-13'},
      {jp:'くだもの', romaji:'kudamono', en:'fruit', tags:['L2','food-drink-l2','taught','food-type','L3','food-drink-l3','l3-1'], dateAdded:'2026-08-13'},
      {jp:'シリアル', romaji:'shiriaru', en:'cereal', tags:['L2','food-drink-l2','taught','food-type','L3','food-drink-l3','l3-1'], dateAdded:'2026-08-13'},
      {jp:'トースト', romaji:'toosuto', en:'toast', tags:['L2','food-drink-l2','taught','food-type'], dateAdded:'2026-08-13'},
      {jp:'おさけ', romaji:'osake', en:'alcohol', tags:['L2','food-drink-l2','taught','drink','L3','food-drink-l3','l3-1','genki','genki-1-3'], dateAdded:'2026-08-13'},
      // Moved in from Trip tier, now that the lesson covers them - see the
      // Week 6 relocation note above vocab-trip-prep/vocab-food-drink.
      {jp:'ビール', romaji:'biiru', en:'beer', tags:['L2','food-drink-l2','taught','drink','L3','food-drink-l3','l3-1'], altForm:'びーる', dateAdded:'2026-08-13'},
      {jp:'ワイン', romaji:'wain', en:'wine', tags:['L1','objects','L2','food-drink-l2','taught','drink'], altForm:'わいん', altAfterAnswer:true, dateAdded:'2026-08-13'},
    ],
  },
  'vocab-question-location': {
    level: 2,
    hasReference: true,
    label: 'Question & location words',
    chars: 'なん だれ どこ…',
    tagQuery: ['L2','question-location'],
    items: [
      {jp:'ここ', romaji:'koko', en:'here', tags:['L2','question-location','taught','genki','genki-1-2'], dateAdded:'2026-08-01'},
      {jp:'いくら', romaji:'ikura', en:'how much', tags:['question-word','L2','question-location','taught','genki','genki-1-2'], dateAdded:'2026-08-01'},
      {jp:'あそこ', romaji:'asoko', en:'over there', tags:['L2','question-location','taught','genki','genki-1-2'], dateAdded:'2026-08-01'},
      {jp:'そこ', romaji:'soko', en:'there', tags:['L2','question-location','taught','genki','genki-1-2'], dateAdded:'2026-08-01'},
      // なん (nan) is a distinct reading of 何 from なに (nani) used in the
      // Reference - Question words category - not the same word, kept
      // separate rather than tagged together.
      {jp:'なん', romaji:'nan', en:'what', tags:['question-word','L2','question-location','taught'], dateAdded:'2026-08-01'},
      {jp:'いつ', romaji:'itsu', en:'when', tags:['question-word','L2','question-location','taught','genki','genki-1-3'], dateAdded:'2026-08-01'},
      {jp:'どこ', romaji:'doko', en:'where', tags:['question-word','L2','question-location','taught','genki','genki-1-2'], dateAdded:'2026-08-01'},
      {jp:'だれ', romaji:'dare', en:'who', tags:['question-word','L2','question-location','taught','genki','genki-1-2'], dateAdded:'2026-08-01'},
    ],
  },
  'vocab-verbs-l2': {
    level: 2,
    hasReference: true,
    label: 'Verbs',
    chars: 'ねます おきます…',
    tagQuery: ['L2','verbs-l2'],
    items: [
      {jp:'きます', romaji:'kimasu', en:'to come', tags:['L2','verbs-l2','taught'], dateAdded:'2026-08-01'},
      {jp:'おわります', romaji:'owarimasu', en:'to finish', tags:['L2','verbs-l2','taught'], dateAdded:'2026-08-01'},
      {jp:'おきます', romaji:'okimasu', en:'to get up', tags:['L2','verbs-l2','taught'], dateAdded:'2026-08-01'},
      {jp:'いきます', romaji:'ikimasu', en:'to go', tags:['L2','verbs-l2','taught','L3','verbs-l3','l3-1'], dateAdded:'2026-08-01'},
      {jp:'やすみます', romaji:'yasumimasu', en:'to rest / take a day off', tags:['L2','verbs-l2','taught'], dateAdded:'2026-08-01'},
      {jp:'かえります', romaji:'kaerimasu', en:'to return / go home', tags:['L2','verbs-l2','taught'], dateAdded:'2026-08-01'},
      {jp:'ねます', romaji:'nemasu', en:'to sleep / go to bed', tags:['L2','verbs-l2','taught'], dateAdded:'2026-08-01'},
      {jp:'べんきょうします', romaji:'benkyoushimasu', en:'to study', tags:['L2','verbs-l2','taught','L3','verbs-l3','l3-1'], dateAdded:'2026-08-01'},
      {jp:'はたらきます', romaji:'hatarakimasu', en:'to work', tags:['L2','verbs-l2','taught'], dateAdded:'2026-08-01'},
      // Week 6 - the first batch of object-taking verbs (を marks the
      // object - see the new "を - the object particle" grammar note).
      // あいます is the one exception in this set: it takes に, not を
      // (ともだちにあいます, not ともだちをあいます) - called out on the same
      // grammar note rather than in this gloss, so the drill answer stays
      // plain like every other verb here.
      {jp:'たべます', romaji:'tabemasu', en:'to eat', tags:['L2','verbs-l2','taught','L3','verbs-l3','l3-1'], dateAdded:'2026-08-13'},
      {jp:'のみます', romaji:'nomimasu', en:'to drink', tags:['L2','verbs-l2','taught','L3','verbs-l3','l3-1'], dateAdded:'2026-08-13'},
      {jp:'よみます', romaji:'yomimasu', en:'to read', tags:['L2','verbs-l2','taught','L3','verbs-l3','l3-1'], dateAdded:'2026-08-13'},
      {jp:'みます', romaji:'mimasu', en:'to watch / see', tags:['L2','verbs-l2','taught','L3','verbs-l3','l3-1'], dateAdded:'2026-08-13'},
      {jp:'ききます', romaji:'kikimasu', en:'to listen', tags:['L2','verbs-l2','taught','L3','verbs-l3','l3-1'], dateAdded:'2026-08-13'},
      {jp:'かきます', romaji:'kakimasu', en:'to write', tags:['L2','verbs-l2','taught','L3','verbs-l3','l3-1'], dateAdded:'2026-08-13'},
      {jp:'かいます', romaji:'kaimasu', en:'to buy', tags:['L2','verbs-l2','taught','L3','verbs-l3','l3-1'], dateAdded:'2026-08-13'},
      {jp:'すいます', romaji:'suimasu', en:'to smoke', tags:['L2','verbs-l2','taught'], dateAdded:'2026-08-13'},
      {jp:'とります', romaji:'torimasu', en:'to take (a photo)', tags:['L2','verbs-l2','taught','L3','verbs-l3','l3-1'], dateAdded:'2026-08-13'},
      {jp:'します', romaji:'shimasu', en:'to do / play', tags:['L2','verbs-l2','taught','L3','verbs-l3','l3-1'], dateAdded:'2026-08-13'},
      {jp:'あいます', romaji:'aimasu', en:'to meet', tags:['L2','verbs-l2','taught','L3','verbs-l3','l3-3'], dateAdded:'2026-08-13'},
    ],
  },
  // The 12 everyday zodiac animal words - these were actually covered in
  // the lessons (the zodiac clock came up when discussing 午前/午後 - see
  // below), just never built out into their own category at the time.
  // Also the same 12 used in the traditional zodiac clock (十二支), which is
  // where 午前/午後 (gozen/gogo, above) actually come from - 午 (uma, horse)
  // marks noon, so "before the horse" is AM and "after the horse" is PM.
  // See the reference card below for the zodiac reading/hour-block side of
  // that, kept separate from this drillable vocabulary since five of the
  // twelve zodiac readings (ね/う/たつ/み/い) aren't the everyday word for
  // the animal and teaching them as if they were would be actively wrong.
  // ねこ (cat) is added as a 13th, bonus entry - famously not one of the 12
  // zodiac animals (missed the Buddha's meeting, as the story goes), so
  // it's deliberately not part of the zodiac-clock reference card below,
  // just the single most useful animal word to actually have if a cat
  // wanders past.
  'vocab-animals-l2': {
    level: 2,
    hasReference: true,
    ordinalOrder: true, // zodiac order, ties to the zodiac-clock reference page - cat stays as the 13th, non-zodiac entry at the end
    label: 'Animals',
    chars: 'いぬ ねこ うま…',
    tagQuery: ['L2','animals-l2'],
    items: [
      {jp:'ねずみ', romaji:'nezumi', en:'mouse / rat', tags:['L2','animals-l2','taught'], dateAdded:'2026-08-01'},
      {jp:'うし', romaji:'ushi', en:'cow / ox', tags:['L2','animals-l2','taught'], altForm:'牛', altIsStandard:true, dateAdded:'2026-08-01'},
      {jp:'とら', romaji:'tora', en:'tiger', tags:['L2','animals-l2','taught'], altForm:'虎', altIsStandard:true, dateAdded:'2026-08-01'},
      // altForm added 2026-08-15 - ウサギ turned up on a nature-trail quiz
      // board (batch 6 part 2) rather than a duplicate entry, same reasoning
      // as たれ/おすすめ elsewhere: katakana is a common styling choice for
      // animal names on this kind of signage, not a different word.
      {jp:'うさぎ', romaji:'usagi', en:'rabbit', tags:['L2','animals-l2','taught'], altForm:'ウサギ (also seen written in katakana, e.g. on nature signage)', dateAdded:'2026-08-01'},
      {jp:'りゅう', romaji:'ryuu', en:'dragon', tags:['L2','animals-l2','taught'], altForm:'竜', altIsStandard:true, dateAdded:'2026-08-01'},
      {jp:'へび', romaji:'hebi', en:'snake', tags:['L2','animals-l2','taught'], altForm:'蛇', altIsStandard:true, dateAdded:'2026-08-01'},
      {jp:'うま', romaji:'uma', en:'horse', tags:['L2','animals-l2','taught'], altForm:'馬', altIsStandard:true, dateAdded:'2026-08-01'},
      {jp:'ひつじ', romaji:'hitsuji', en:'sheep', tags:['L2','animals-l2','taught'], altForm:'羊', altIsStandard:true, dateAdded:'2026-08-01'},
      {jp:'さる', romaji:'saru', en:'monkey', tags:['L2','animals-l2','taught'], altForm:'猿', altIsStandard:true, dateAdded:'2026-08-01'},
      {jp:'とり', romaji:'tori', en:'bird', tags:['L2','animals-l2','taught'], altForm:'鳥', altIsStandard:true, dateAdded:'2026-08-01'},
      {jp:'いぬ', romaji:'inu', en:'dog', tags:['L2','animals-l2','taught'], altForm:'犬', altIsStandard:true, dateAdded:'2026-08-01'},
      {jp:'いのしし', romaji:'inoshishi', en:'boar / wild pig', tags:['L2','animals-l2','taught'], altForm:'猪', altIsStandard:true, dateAdded:'2026-08-01'},
      {jp:'ねこ', romaji:'neko', en:'cat', tags:['L2','animals-l2','taught'], altForm:'猫', altIsStandard:true, dateAdded:'2026-08-01'},
    ],
  },
  // First adjectives to enter Vocab (kana drilling) - ながい/みじかい and
  // ふるい/あたらしい already existed as kanji readings for the Kanji drill,
  // but had no kana-only home until now. Kept as two antonym pairs plus
  // かわいい, rather than trying to build a bigger adjectives set from
  // scratch - matches what's actually shown up in lessons so far.
  'vocab-adjectives-l2': {
    level: 2,
    hasReference: true,
    label: 'Adjectives',
    chars: 'ながい みじかい…',
    tagQuery: ['L2','adjectives-l2'],
    items: [
      {jp:'あたらしい', romaji:'atarashii', en:'new', tags:['L2','adjectives-l2','adjectives','taught','L4','adjectives-l4'], altForm:'新しい', altIsStandard:true, dateAdded:'2026-08-01'},
      {jp:'かわいい', romaji:'kawaii', en:'cute', tags:['L2','adjectives-l2','adjectives','taught','L3','adjectives-l3','l3-3','L4','adjectives-l4'], altForm:'可愛い', altIsStandard:true, dateAdded:'2026-08-01'},
      {jp:'ふるい', romaji:'furui', en:'old (things)', tags:['L2','adjectives-l2','adjectives','taught','L4','adjectives-l4'], altForm:'古い', altIsStandard:true, dateAdded:'2026-08-01'},
      {jp:'ながい', romaji:'nagai', en:'long', tags:['L2','adjectives-l2','adjectives','taught','L4','adjectives-l4'], altForm:'長い', altIsStandard:true, dateAdded:'2026-08-01'},
      {jp:'みじかい', romaji:'mijikai', en:'short', tags:['L2','adjectives-l2','adjectives','taught','L4','adjectives-l4'], altForm:'短い', altIsStandard:true, dateAdded:'2026-08-01'},
    ],
  },
  'vocab-transport': {
    level: 2,
    hasReference: true,
    label: 'Transport',
    chars: 'くるま じてんしゃ ふね…',
    tagQuery: ['L2','transport'],
    items: [
      {jp:'ひこうき', romaji:'hikouki', en:'airplane', tags:['L2','transport','taught'], dateAdded:'2026-08-01'},
      {jp:'じてんしゃ', romaji:'jitensha', en:'bicycle', tags:['L2','transport','taught','genki','genki-1-2'], dateAdded:'2026-08-01'},
      {jp:'ふね', romaji:'fune', en:'boat / ship', tags:['L2','transport','taught'], dateAdded:'2026-08-01'},
      {jp:'バス', romaji:'basu', en:'bus', tags:['L2','transport','taught'], altForm:'ばす', dateAdded:'2026-08-01'},
      {jp:'くるま', romaji:'kuruma', en:'car', tags:['L2','transport','taught'], dateAdded:'2026-08-01'},
      {jp:'ヘリコプター', romaji:'herikoputaa', en:'helicopter', tags:['L2','transport','taught'], altForm:'へりこぷたー', dateAdded:'2026-08-01'},
      {jp:'バイク', romaji:'baiku', en:'motorbike (casual)', tags:['L2','transport','taught'], altForm:'ばいく', dateAdded:'2026-08-01'},
      {jp:'オートバイ', romaji:'ootobai', en:'motorbike (formal)', tags:['L2','transport','taught'], altForm:'おーとばい', dateAdded:'2026-08-01'},
      {jp:'あるいて', romaji:'aruite', en:'on foot', tags:['L2','transport','taught'], dateAdded:'2026-08-01'},
      // altForm added 2026-08-14 - 地下鉄 is what actually showed up on real
      // Sapporo signage (batch 6), so rather than add a duplicate Materials
      // entry for a word already taught here, the real kanji got folded
      // into this existing entry instead.
      {jp:'ちかてつ', romaji:'chikatetsu', en:'subway', tags:['L2','transport','taught'], altForm:'地下鉄', altIsStandard:true, dateAdded:'2026-08-01'},
      {jp:'タクシー', romaji:'takushii', en:'taxi', tags:['L2','transport','taught'], altForm:'たくしー', dateAdded:'2026-08-01'},
      {jp:'でんしゃ', romaji:'densha', en:'train', tags:['L2','transport','taught'], dateAdded:'2026-08-01'},
      {jp:'トラック', romaji:'torakku', en:'truck', tags:['L2','transport','taught'], altForm:'とらっく', dateAdded:'2026-08-01'},
    ],
  },
  'vocab-places-to-go': {
    level: 2,
    hasReference: true,
    label: 'Places to go',
    chars: 'こうえん えいがかん…',
    tagQuery: ['L2','places-to-go'],
    items: [
      {jp:'ゆうえんち', romaji:'yuuenchi', en:'amusement park', tags:['L2','places-to-go','taught'], dateAdded:'2026-08-01'},
      {jp:'びじゅつかん', romaji:'bijutsukan', en:'art museum', tags:['L2','places-to-go','taught','L3','places-l3','l3-2'], dateAdded:'2026-08-01'},
      {jp:'バレエ', romaji:'baree', en:'ballet', tags:['L2','places-to-go','taught'], altForm:'ばれえ', dateAdded:'2026-08-01'},
      {jp:'ぎんこう', romaji:'ginkou', en:'bank', tags:['L2','places-to-go','taught','genki','genki-1-2'], altForm:'銀行', altIsStandard:true, dateAdded:'2026-08-01'},
      {jp:'ほんや', romaji:'honya', en:'bookshop', tags:['L2','places-to-go','taught'], dateAdded:'2026-08-01'},
      // altForm added 2026-08-14 - same reasoning as ちかてつ above: real
      // kanji from batch 6 signage folded into the existing entry rather
      // than duplicated as a new Materials word.
      {jp:'バスてい', romaji:'basutei', en:'bus stop', tags:['L2','places-to-go','taught'], altForm:'バス停', altIsStandard:true, dateAdded:'2026-08-01'},
      {jp:'きっさてん', romaji:'kissaten', en:'café', tags:['L2','places-to-go','taught','L3','places-l3','l3-2'], dateAdded:'2026-08-01'},
      {jp:'カメラや', romaji:'kameraya', en:'camera shop', tags:['L2','places-to-go','taught'], altForm:'かめらや', dateAdded:'2026-08-01'},
      {jp:'えいがかん', romaji:'eigakan', en:'cinema', tags:['L2','places-to-go','taught','L3','places-l3','l3-2'], dateAdded:'2026-08-01'},
      {jp:'かいしゃ', romaji:'kaisha', en:'company / office', tags:['L2','places-to-go','taught'], altForm:'会社', altIsStandard:true, dateAdded:'2026-08-01'},
      {jp:'コンビニ', romaji:'konbini', en:'convenience store', tags:['L2','places-to-go','taught','genki','genki-1-2'], altForm:'こんびに', dateAdded:'2026-08-01'},
      {jp:'デパート', romaji:'depaato', en:'department store', tags:['L2','places-to-go','taught','L3','places-l3','l3-2'], altForm:'でぱーと', dateAdded:'2026-08-01'},
      {jp:'はなび', romaji:'hanabi', en:'fireworks', tags:['L2','places-to-go','taught'], dateAdded:'2026-08-01'},
      {jp:'ジム', romaji:'jimu', en:'gym', tags:['L2','places-to-go','taught','L3','places-l3','l3-2'], altForm:'じむ', dateAdded:'2026-08-01'},
      {jp:'びょういん', romaji:'byouin', en:'hospital', tags:['L2','places-to-go','taught'], dateAdded:'2026-08-01'},
      {jp:'としょかん', romaji:'toshokan', en:'library', tags:['L2','places-to-go','taught','genki','genki-1-2','L3','places-l3','l3-2'], dateAdded:'2026-08-01'},
      {jp:'ミュージカル', romaji:'myuujikaru', en:'musical', tags:['L2','places-to-go','taught'], altForm:'みゅーじかる', dateAdded:'2026-08-01'},
      {jp:'オペラ', romaji:'opera', en:'opera', tags:['L2','places-to-go','taught','L3','hobbies-l3','l3-2'], altForm:'おぺら', dateAdded:'2026-08-01'},
      {jp:'こうえん', romaji:'kouen', en:'park', tags:['L2','places-to-go','taught','L3','places-l3','l3-2'], altForm:'公園', altIsStandard:true, dateAdded:'2026-08-01'},
      // Lesson 2 (2026-10-06): the handout's しばい is this same word without the
      // polite お - tagged forward rather than added twice (two cards both
      // meaning "play" would each be a right answer to the other).
      {jp:'おしばい', romaji:'oshibai', en:'play (theatre)', tags:['L2','places-to-go','taught','L3','hobbies-l3','l3-2'], altForm:'お芝居', altIsStandard:true, dateAdded:'2026-08-01'},
      {jp:'プール', romaji:'puuru', en:'pool', tags:['L2','places-to-go','taught','L3','places-l3','l3-2'], altForm:'ぷーる', dateAdded:'2026-08-01'},
      {jp:'ゆうびんきょく', romaji:'yuubinkyoku', en:'post office', tags:['L2','places-to-go','taught','genki','genki-1-2'], dateAdded:'2026-08-01'},
      {jp:'レストラン', romaji:'resutoran', en:'restaurant', tags:['L2','places-to-go','taught','L3','places-l3','l3-2'], altForm:'れすとらん', dateAdded:'2026-08-01'},
      {jp:'ロックコンサート', romaji:'rokkukonsaato', en:'rock concert', tags:['L2','places-to-go','taught'], altForm:'ろっくこんさーと', dateAdded:'2026-08-01'},
      {jp:'がっこう', romaji:'gakkou', en:'school', tags:['L2','places-to-go','taught','genki','genki-1-3'], dateAdded:'2026-08-01'},
      {jp:'えき', romaji:'eki', en:'station', tags:['L2','places-to-go','taught','L3','places-l3','l3-2'], dateAdded:'2026-08-01'},
      {jp:'スーパー', romaji:'suupaa', en:'supermarket', tags:['L2','places-to-go','taught','L3','places-l3','l3-2'], altForm:'すーぱー', dateAdded:'2026-08-01'},
      {jp:'だいがく', romaji:'daigaku', en:'university', tags:['L2','places-to-go','taught','genki','genki-1-1'], altForm:'大学', altIsStandard:true, dateAdded:'2026-08-01'},
    ],
  },
  'vocab-places-uk': {
    level: 2,
    hasReference: true,
    label: 'UK Places',
    chars: 'エディンバラ ブライトン…',
    tagQuery: ['L2','places-uk'],
    items: [
      {jp:'アバディーン', romaji:'abadiin', en:'Aberdeen', tags:['L2','places-uk','taught'], altForm:'あばでぃーん', dateAdded:'2026-08-01'},
      {jp:'バース', romaji:'baasu', en:'Bath', tags:['L2','places-uk','taught'], altForm:'ばーす', dateAdded:'2026-08-01'},
      {jp:'ベルファスト', romaji:'berufasuto', en:'Belfast', tags:['L2','places-uk','taught'], altForm:'べるふぁすと', dateAdded:'2026-08-01'},
      {jp:'バーミンガム', romaji:'baamingamu', en:'Birmingham', tags:['L2','places-uk','taught'], altForm:'ばーみんがむ', dateAdded:'2026-08-01'},
      {jp:'ブライトン', romaji:'buraiton', en:'Brighton', tags:['L2','places-uk','taught'], altForm:'ぶらいとん', dateAdded:'2026-08-01'},
      {jp:'ブリストル', romaji:'burisutoru', en:'Bristol', tags:['L2','places-uk','taught'], altForm:'ぶりすとる', dateAdded:'2026-08-01'},
      {jp:'ケンブリッジ', romaji:'kenburijji', en:'Cambridge', tags:['L2','places-uk','taught'], altForm:'けんぶりっじ', dateAdded:'2026-08-01'},
      {jp:'カーディフ', romaji:'kaadifu', en:'Cardiff', tags:['L2','places-uk','taught'], altForm:'かーでぃふ', dateAdded:'2026-08-01'},
      {jp:'コッツウォルズ', romaji:'kottsuworuzu', en:'Cotswolds', tags:['L2','places-uk','taught'], altForm:'こっつうぉるず', dateAdded:'2026-08-01'},
      {jp:'コベントリー', romaji:'kobentorii', en:'Coventry', tags:['L2','places-uk','taught'], altForm:'こべんとりー', dateAdded:'2026-08-01'},
      {jp:'エディンバラ', romaji:'edinbara', en:'Edinburgh', tags:['L2','places-uk','taught'], altForm:'えでぃんばら', dateAdded:'2026-08-01'},
      {jp:'グラスゴー', romaji:'gurasugoo', en:'Glasgow', tags:['L2','places-uk','taught'], altForm:'ぐらすごー', dateAdded:'2026-08-01'},
      {jp:'ハムステッドヒース', romaji:'hamusuteddo hiisu', en:'Hampstead Heath', tags:['L2','places-uk','taught'], altForm:'はむすてっどひーす', dateAdded:'2026-08-01'},
      {jp:'リーズ', romaji:'riizu', en:'Leeds', tags:['L2','places-uk','taught'], altForm:'りーず', dateAdded:'2026-08-01'},
      {jp:'レスター', romaji:'resutaa', en:'Leicester', tags:['L2','places-uk','taught'], altForm:'れすたー', dateAdded:'2026-08-01'},
      {jp:'リバプール', romaji:'ribapuuru', en:'Liverpool', tags:['L2','places-uk','taught'], altForm:'りばぷーる', dateAdded:'2026-08-01'},
      {jp:'ロンドン', romaji:'rondon', en:'London', tags:['L2','places-uk','taught'], altForm:'ろんどん', altAfterAnswer:true, dateAdded:'2026-08-01'},
      {jp:'マンチェスター', romaji:'manchesutaa', en:'Manchester', tags:['L2','places-uk','taught'], altForm:'まんちぇすたー', dateAdded:'2026-08-01'},
      {jp:'ニューカッスル', romaji:'nyuukassuru', en:'Newcastle', tags:['L2','places-uk','taught'], altForm:'にゅーかっする', dateAdded:'2026-08-01'},
      {jp:'ノッティンガム', romaji:'nottingamu', en:'Nottingham', tags:['L2','places-uk','taught'], altForm:'のってぃんがむ', dateAdded:'2026-08-01'},
      {jp:'オックスフォード', romaji:'okkusufoodo', en:'Oxford', tags:['L2','places-uk','taught'], altForm:'おっくすふぉーど', dateAdded:'2026-08-01'},
      {jp:'ポーツマス', romaji:'pootsumasu', en:'Portsmouth', tags:['L2','places-uk','taught'], altForm:'ぽーつます', dateAdded:'2026-08-01'},
      {jp:'リッチモンド', romaji:'ricchimondo', en:'Richmond', tags:['L2','places-uk','taught'], altForm:'りっちもんど', dateAdded:'2026-08-01'},
      {jp:'シェフィールド', romaji:'shefiirudo', en:'Sheffield', tags:['L2','places-uk','taught'], altForm:'しぇふぃーるど', dateAdded:'2026-08-01'},
      {jp:'シャーウッドの森', romaji:'shaawuddo no mori', en:'Sherwood Forest', tags:['L2','places-uk','taught'], altForm:'しゃーうっどのもり', dateAdded:'2026-08-01'},
      {jp:'サウサンプトン', romaji:'sausanputon', en:'Southampton', tags:['L2','places-uk','taught'], altForm:'さうさんぷとん', dateAdded:'2026-08-01'},
      {jp:'ウィンブルドン', romaji:'winburudon', en:'Wimbledon', tags:['L2','places-uk','taught'], altForm:'うぃんぶるどん', dateAdded:'2026-08-01'},
      {jp:'ウィンザー', romaji:'winzaa', en:'Windsor', tags:['L2','places-uk','taught'], altForm:'うぃんざー', dateAdded:'2026-08-01'},
      {jp:'ヨーク', romaji:'yooku', en:'York', tags:['L2','places-uk','taught'], altForm:'よーく', dateAdded:'2026-08-01'},
    ],
  },
  // Tokyo was already sitting in here as the one domestic outlier among
  // otherwise-international cities, so the rest of the week-5 reference's
  // Japanese-places list (Kyoto/Osaka/Hokkaido/Yokohama/Nagoya) joins it here
  // rather than getting a whole separate category for five entries -
  // especially since these are actual likely stops on the trip.
  'vocab-cities': {
    level: 2,
    hasReference: true,
    label: 'World cities',
    chars: 'とうきょう パリ…',
    tagQuery: ['L2','cities'],
    items: [
      {jp:'バンコク', romaji:'bankoku', en:'Bangkok', tags:['L2','cities','taught'], altForm:'ばんこく', altAfterAnswer:true, dateAdded:'2026-08-01'},
      {jp:'ほっかいどう', romaji:'hokkaidou', en:'Hokkaido', tags:['L2','cities','taught'], dateAdded:'2026-08-01'},
      {jp:'ホノルル', romaji:'honoruru', en:'Honolulu', tags:['L2','cities','taught'], altForm:'ほのるる', altAfterAnswer:true, dateAdded:'2026-08-01'},
      {jp:'きょうと', romaji:'kyouto', en:'Kyoto', tags:['L2','cities','taught'], dateAdded:'2026-08-01'},
      {jp:'ロサンゼルス', romaji:'rosanzerusu', en:'Los Angeles', tags:['L2','cities','taught'], altForm:'ろさんぜるす', altAfterAnswer:true, dateAdded:'2026-08-01'},
      {jp:'メキシコシティー', romaji:'mekishiko shitii', en:'Mexico City', tags:['L2','cities','taught'], altForm:'めきしこしてぃー', dateAdded:'2026-08-01'},
      {jp:'モスクワ', romaji:'mosukuwa', en:'Moscow', tags:['L2','cities','taught'], altForm:'もすくわ', altAfterAnswer:true, dateAdded:'2026-08-01'},
      {jp:'なごや', romaji:'nagoya', en:'Nagoya', tags:['L2','cities','taught'], dateAdded:'2026-08-01'},
      {jp:'ニューヨーク', romaji:'nyuuyooku', en:'New York', tags:['L2','cities','taught'], altForm:'にゅーよーく', dateAdded:'2026-08-01'},
      {jp:'おおさか', romaji:'oosaka', en:'Osaka', tags:['L2','cities','taught'], dateAdded:'2026-08-01'},
      {jp:'パリ', romaji:'pari', en:'Paris', tags:['L2','cities','taught'], altForm:'ぱり', altAfterAnswer:true, dateAdded:'2026-08-01'},
      {jp:'サンパウロ', romaji:'sanpauro', en:'Sao Paulo', tags:['L2','cities','taught'], altForm:'さんぱうろ', altAfterAnswer:true, dateAdded:'2026-08-01'},
      {jp:'ソウル', romaji:'souru', en:'Seoul', tags:['L2','cities','taught'], altForm:'そうる', altAfterAnswer:true, dateAdded:'2026-08-01'},
      {jp:'シドニー', romaji:'shidonii', en:'Sydney', tags:['L2','cities','taught'], altForm:'しどにー', dateAdded:'2026-08-01'},
      {jp:'とうきょう', romaji:'toukyou', en:'Tokyo', tags:['L2','cities','taught'], dateAdded:'2026-08-01'},
      {jp:'トロント', romaji:'toronto', en:'Toronto', tags:['L2','cities','taught'], altForm:'とろんと', altAfterAnswer:true, dateAdded:'2026-08-01'},
      {jp:'よこはま', romaji:'yokohama', en:'Yokohama', tags:['L2','cities','taught'], dateAdded:'2026-08-01'},
    ],
  },
  'vocab-time-l2': {
    level: 2,
    hasReference: true,
    ordinalOrder: true, // grouped by function (qualifiers, AM/PM, then week/month/year past-present-future triads) - alphabetizing would break those groupings
    label: 'Time vocabulary',
    chars: 'から まで に ごぜん ごご…',
    tagQuery: ['L2','time-l2'],
    items: [
      {jp:'から', romaji:'kara', en:'from', tags:['L2','time-l2','taught'], dateAdded:'2026-08-01'},
      {jp:'まで', romaji:'made', en:'until', tags:['L2','time-l2','taught'], dateAdded:'2026-08-01'},
      {jp:'に', romaji:'ni', en:'at', tags:['L2','time-l2','taught'], dateAdded:'2026-08-01'},
      {jp:'ごろ', romaji:'goro', en:'about / around (used with times)', tags:['L2','time-l2','taught','genki','genki-1-3'], dateAdded:'2026-08-01'},
      {jp:'ごぜん', romaji:'gozen', en:'AM / morning (before noon)', tags:['L2','time-l2','taught','genki','genki-1-1'], dateAdded:'2026-08-01'},
      {jp:'ごご', romaji:'gogo', en:'PM / afternoon (after noon)', tags:['L2','time-l2','taught','genki','genki-1-1'], dateAdded:'2026-08-01'},
      {jp:'きょう', romaji:'kyou', en:'today', tags:['L2','time-l2','taught','genki','genki-1-3'], dateAdded:'2026-08-01'},
      {jp:'あした', romaji:'ashita', en:'tomorrow', tags:['L2','time-l2','taught','genki','genki-1-3'], dateAdded:'2026-08-01'},
      {jp:'きのう', romaji:'kinou', en:'yesterday', tags:['L2','time-l2','taught'], dateAdded:'2026-08-01'},
      {jp:'いま', romaji:'ima', en:'now', tags:['L2','time-l2','taught','genki','genki-1-1'], dateAdded:'2026-08-01'},
      {jp:'つぎ', romaji:'tsugi', en:'next', tags:['L2','time-l2','taught'], dateAdded:'2026-08-01'},
      {jp:'ふん', romaji:'fun', en:'minutes', tags:['L2','time-l2','taught'], dateAdded:'2026-08-01'},
      {jp:'じかん', romaji:'jikan', en:'hours / time', tags:['L2','time-l2','taught'], dateAdded:'2026-08-01'},
      {jp:'あさ', romaji:'asa', en:'morning', tags:['L2','time-l2','taught','genki','genki-1-3'], altForm:'朝', altIsStandard:true, dateAdded:'2026-08-01'},
      {jp:'ひる', romaji:'hiru', en:'midday / noon', tags:['L2','time-l2','taught'], altForm:'昼', altIsStandard:true, dateAdded:'2026-08-01'},
      {jp:'ばん', romaji:'ban', en:'evening', tags:['L2','time-l2','taught'], altForm:'晩', altIsStandard:true, dateAdded:'2026-08-01'},
      {jp:'よる', romaji:'yoru', en:'evening / night', tags:['L2','time-l2','taught'], dateAdded:'2026-08-01'},
      {jp:'まいにち', romaji:'mainichi', en:'every day', tags:['L2','time-l2','taught','L3','frequency-l3','l3-1','genki','genki-1-3'], dateAdded:'2026-08-01'},
      {jp:'おととい', romaji:'ototoi', en:'the day before yesterday', tags:['L2','time-l2','taught'], dateAdded:'2026-08-01'},
      {jp:'あさって', romaji:'asatte', en:'the day after tomorrow', tags:['L2','time-l2','taught'], dateAdded:'2026-08-01'},
      {jp:'ときどき', romaji:'tokidoki', en:'sometimes', tags:['L2','time-l2','taught','L3','frequency-l3','l3-1','genki','genki-1-3','frequency'], dateAdded:'2026-08-01'},
      {jp:'せんしゅう', romaji:'senshuu', en:'last week', tags:['L2','time-l2','taught'], dateAdded:'2026-08-01'},
      {jp:'こんしゅう', romaji:'konshuu', en:'this week', tags:['L2','time-l2','taught','L3','frequency-l3','time-l3','l3-6'], dateAdded:'2026-08-01'},
      {jp:'らいしゅう', romaji:'raishuu', en:'next week', tags:['L2','time-l2','taught'], dateAdded:'2026-08-01'},
      {jp:'しゅうまつ', romaji:'shuumatsu', en:'weekend', tags:['L2','time-l2','taught','genki','genki-1-3'], altForm:'週末', altIsStandard:true, dateAdded:'2026-08-01'},
      {jp:'せんげつ', romaji:'sengetsu', en:'last month', tags:['L2','time-l2','taught'], dateAdded:'2026-08-01'},
      {jp:'こんげつ', romaji:'kongetsu', en:'this month', tags:['L2','time-l2','taught','L3','frequency-l3','time-l3','l3-6'], dateAdded:'2026-08-01'},
      {jp:'らいげつ', romaji:'raigetsu', en:'next month', tags:['L2','time-l2','taught'], dateAdded:'2026-08-01'},
      {jp:'きょねん', romaji:'kyonen', en:'last year', tags:['L2','time-l2','taught'], dateAdded:'2026-08-01'},
      {jp:'ことし', romaji:'kotoshi', en:'this year', tags:['L2','time-l2','taught','L3','frequency-l3','time-l3','l3-6'], dateAdded:'2026-08-01'},
      {jp:'らいねん', romaji:'rainen', en:'next year', tags:['L2','time-l2','taught'], dateAdded:'2026-08-01'},
      {jp:'たんじょうび', romaji:'tanjoubi', en:'birthday', tags:['L2','time-l2','taught','L3','occasions-l3','l3-4'], altForm:'誕生日', altIsStandard:true, dateAdded:'2026-08-01'},
    ],
  },
  'vocab-days-l2': {
    level: 2,
    hasReference: true,
    ordinalOrder: true, // Monday-Sunday - there's already a reference card showing this exact order
    label: 'Days of the week',
    chars: 'かようび どようび…',
    tagQuery: ['L2','days-l2'],
    items: [
      {jp:'げつようび', romaji:'getsuyoubi', en:'Monday', tags:['L2','days-l2','taught'], altForm:'月曜日', altIsStandard:true, dateAdded:'2026-08-01'},
      {jp:'かようび', romaji:'kayoubi', en:'Tuesday', tags:['L2','days-l2','taught'], altForm:'火曜日', altIsStandard:true, dateAdded:'2026-08-01'},
      {jp:'すいようび', romaji:'suiyoubi', en:'Wednesday', tags:['L2','days-l2','taught'], altForm:'水曜日', altIsStandard:true, dateAdded:'2026-08-01'},
      {jp:'もくようび', romaji:'mokuyoubi', en:'Thursday', tags:['L2','days-l2','taught'], altForm:'木曜日', altIsStandard:true, dateAdded:'2026-08-01'},
      {jp:'きんようび', romaji:'kinyoubi', en:'Friday', tags:['L2','days-l2','taught'], altForm:'金曜日', altIsStandard:true, dateAdded:'2026-08-01'},
      {jp:'どようび', romaji:'doyoubi', en:'Saturday', tags:['L2','days-l2','taught','genki','genki-1-3'], altForm:'土曜日', altIsStandard:true, dateAdded:'2026-08-01'},
      {jp:'にちようび', romaji:'nichiyoubi', en:'Sunday', tags:['L2','days-l2','taught','genki','genki-1-3'], altForm:'日曜日', altIsStandard:true, dateAdded:'2026-08-01'},
    ],
  },
  // Same situation as Adjectives above - month names already existed as
  // kanji readings (一月-十二月) for the Kanji drill, but had no kana-only
  // home. Completely regular (number + がつ, with April/July using the
  // し/しち readings rather than よん/なな - see KANJI_READINGS for the
  // kanji-drill side of these same 12 words), so no reference card needed;
  // the irregular part of the calendar is the DAYS of the month, not the
  // months themselves - see the reference card above Time vocabulary below.
  'vocab-months-l2': {
    level: 2,
    hasReference: true,
    ordinalOrder: true, // January-December
    label: 'Months',
    chars: 'いちがつ にがつ…',
    tagQuery: ['L2','months-l2'],
    items: [
      {jp:'いちがつ', romaji:'ichigatsu', en:'January', tags:['L2','months-l2','taught'], dateAdded:'2026-08-01'},
      {jp:'にがつ', romaji:'nigatsu', en:'February', tags:['L2','months-l2','taught'], dateAdded:'2026-08-01'},
      {jp:'さんがつ', romaji:'sangatsu', en:'March', tags:['L2','months-l2','taught'], dateAdded:'2026-08-01'},
      {jp:'しがつ', romaji:'shigatsu', en:'April', tags:['L2','months-l2','taught'], dateAdded:'2026-08-01'},
      {jp:'ごがつ', romaji:'gogatsu', en:'May', tags:['L2','months-l2','taught'], dateAdded:'2026-08-01'},
      {jp:'ろくがつ', romaji:'rokugatsu', en:'June', tags:['L2','months-l2','taught'], dateAdded:'2026-08-01'},
      {jp:'しちがつ', romaji:'shichigatsu', en:'July', tags:['L2','months-l2','taught'], dateAdded:'2026-08-01'},
      {jp:'はちがつ', romaji:'hachigatsu', en:'August', tags:['L2','months-l2','taught'], dateAdded:'2026-08-01'},
      {jp:'くがつ', romaji:'kugatsu', en:'September', tags:['L2','months-l2','taught'], dateAdded:'2026-08-01'},
      {jp:'じゅうがつ', romaji:'juugatsu', en:'October', tags:['L2','months-l2','taught'], dateAdded:'2026-08-01'},
      {jp:'じゅういちがつ', romaji:'juuichigatsu', en:'November', tags:['L2','months-l2','taught'], dateAdded:'2026-08-01'},
      {jp:'じゅうにがつ', romaji:'juunigatsu', en:'December', tags:['L2','months-l2','taught'], dateAdded:'2026-08-01'},
    ],
  },
  // Same 31 readings as the DAYS_OF_MONTH reference table above (see
  // showDaysOfMonthReference()), but as an actual drillable category -
  // added after Andrew pointed out that an irregular set like this is
  // exactly the kind of thing worth testing yourself on, not just looking
  // up. noMeaningMode (same as Numbers) since the "meaning" here is just
  // the ordinal - no separate sound/meaning distinction worth toggling.
  // hasReference:true so the tile-selection screen lets specific days be
  // picked out to drill in isolation - e.g. just the five irregular ones
  // (14th/19th/20th/24th/29th) if that's what actually needs practice.
  'vocab-days-of-month-l2': {
    level: 2,
    hasReference: true,
    noMeaningMode: true,
    ordinalOrder: true, // 1st-31st - alphabetical would put "14th" before "1st"
    label: 'Days of the month',
    chars: 'ついたち ふつか…',
    tagQuery: ['L2','days-of-month-l2'],
    items: [
      {jp:'ついたち', romaji:'tsuitachi', en:'1st', tags:['L2','days-of-month-l2','taught'], dateAdded:'2026-08-01'},
      {jp:'ふつか', romaji:'futsuka', en:'2nd', tags:['L2','days-of-month-l2','taught'], dateAdded:'2026-08-01'},
      {jp:'みっか', romaji:'mikka', en:'3rd', tags:['L2','days-of-month-l2','taught'], dateAdded:'2026-08-01'},
      {jp:'よっか', romaji:'yokka', en:'4th', tags:['L2','days-of-month-l2','taught'], dateAdded:'2026-08-01'},
      {jp:'いつか', romaji:'itsuka', en:'5th', tags:['L2','days-of-month-l2','taught'], dateAdded:'2026-08-01'},
      {jp:'むいか', romaji:'muika', en:'6th', tags:['L2','days-of-month-l2','taught'], dateAdded:'2026-08-01'},
      {jp:'なのか', romaji:'nanoka', en:'7th', tags:['L2','days-of-month-l2','taught'], dateAdded:'2026-08-01'},
      {jp:'ようか', romaji:'youka', en:'8th', tags:['L2','days-of-month-l2','taught'], dateAdded:'2026-08-01'},
      {jp:'ここのか', romaji:'kokonoka', en:'9th', tags:['L2','days-of-month-l2','taught'], dateAdded:'2026-08-01'},
      {jp:'とおか', romaji:'tooka', en:'10th', tags:['L2','days-of-month-l2','taught'], dateAdded:'2026-08-01'},
      {jp:'じゅういちにち', romaji:'juuichinichi', en:'11th', tags:['L2','days-of-month-l2','taught'], dateAdded:'2026-08-01'},
      {jp:'じゅうににち', romaji:'juuninichi', en:'12th', tags:['L2','days-of-month-l2','taught'], dateAdded:'2026-08-01'},
      {jp:'じゅうさんにち', romaji:'juusannichi', en:'13th', tags:['L2','days-of-month-l2','taught'], dateAdded:'2026-08-01'},
      {jp:'じゅうよっか', romaji:'juuyokka', en:'14th', tags:['L2','days-of-month-l2','taught'], dateAdded:'2026-08-01'},
      {jp:'じゅうごにち', romaji:'juugonichi', en:'15th', tags:['L2','days-of-month-l2','taught'], dateAdded:'2026-08-01'},
      {jp:'じゅうろくにち', romaji:'juurokunichi', en:'16th', tags:['L2','days-of-month-l2','taught'], dateAdded:'2026-08-01'},
      {jp:'じゅうしちにち', romaji:'juushichinichi', en:'17th', tags:['L2','days-of-month-l2','taught'], dateAdded:'2026-08-01'},
      {jp:'じゅうはちにち', romaji:'juuhachinichi', en:'18th', tags:['L2','days-of-month-l2','taught'], dateAdded:'2026-08-01'},
      {jp:'じゅうくにち', romaji:'juukunichi', en:'19th', tags:['L2','days-of-month-l2','taught'], dateAdded:'2026-08-01'},
      {jp:'はつか', romaji:'hatsuka', en:'20th', tags:['L2','days-of-month-l2','taught'], dateAdded:'2026-08-01'},
      {jp:'にじゅういちにち', romaji:'nijuuichinichi', en:'21st', tags:['L2','days-of-month-l2','taught'], dateAdded:'2026-08-01'},
      {jp:'にじゅうににち', romaji:'nijuuninichi', en:'22nd', tags:['L2','days-of-month-l2','taught'], dateAdded:'2026-08-01'},
      {jp:'にじゅうさんにち', romaji:'nijuusannichi', en:'23rd', tags:['L2','days-of-month-l2','taught'], dateAdded:'2026-08-01'},
      {jp:'にじゅうよっか', romaji:'nijuuyokka', en:'24th', tags:['L2','days-of-month-l2','taught'], dateAdded:'2026-08-01'},
      {jp:'にじゅうごにち', romaji:'nijuugonichi', en:'25th', tags:['L2','days-of-month-l2','taught'], dateAdded:'2026-08-01'},
      {jp:'にじゅうろくにち', romaji:'nijuurokunichi', en:'26th', tags:['L2','days-of-month-l2','taught'], dateAdded:'2026-08-01'},
      {jp:'にじゅうしちにち', romaji:'nijuushichinichi', en:'27th', tags:['L2','days-of-month-l2','taught'], dateAdded:'2026-08-01'},
      {jp:'にじゅうはちにち', romaji:'nijuuhachinichi', en:'28th', tags:['L2','days-of-month-l2','taught'], dateAdded:'2026-08-01'},
      {jp:'にじゅうくにち', romaji:'nijuukunichi', en:'29th', tags:['L2','days-of-month-l2','taught'], dateAdded:'2026-08-01'},
      {jp:'さんじゅうにち', romaji:'sanjuunichi', en:'30th', tags:['L2','days-of-month-l2','taught'], dateAdded:'2026-08-01'},
      {jp:'さんじゅういちにち', romaji:'sanjuuichinichi', en:'31st', tags:['L2','days-of-month-l2','taught'], dateAdded:'2026-08-01'},
    ],
  },
  // LEVEL 3 LESSON 1 (2026-09-29) - first L3 content. Words already in the app
  // (L1/L2, Genki 1-1, trip/untaught lists) were TAGGED FORWARD in place with
  // 'L3' + '<cat>-l3' + 'l3-1' (untaught -> taught), not duplicated; each
  // category below reads by tagQuery, so its own `items` hold only the words
  // new to the app. New words are kana, with kanji as altForm (no kanji taught yet).
  'vocab-food-drink-l3': {
    level: 3,
    hasReference: true,
    label: 'Food & drink',
    chars: 'ピザ カレー ジュース…',
    tagQuery: ['L3','food-drink-l3'],
    items: [
      {jp:'ピザ', romaji:'piza', en:'pizza', tags:['L3','food-drink-l3','taught','l3-1','food-type'], dateAdded:'2026-09-29'},
      {jp:'パンケーキ', romaji:'pankeeki', en:'pancake', tags:['L3','food-drink-l3','taught','l3-1','food-type'], dateAdded:'2026-09-29'},
      {jp:'なっとう', romaji:'nattou', en:'natto (fermented soybeans)', tags:['L3','food-drink-l3','taught','l3-1','food-type'], altForm:'納豆', altIsStandard:true, dateAdded:'2026-09-29'},
      {jp:'バナナ', romaji:'banana', en:'banana', tags:['L3','food-drink-l3','taught','l3-1','food-type'], dateAdded:'2026-09-29'},
      {jp:'ヨーグルト', romaji:'yooguruto', en:'yoghurt', tags:['L3','food-drink-l3','taught','l3-1','food-type'], dateAdded:'2026-09-29'},
      {jp:'サンドイッチ', romaji:'sandoicchi', en:'sandwich', tags:['L3','food-drink-l3','taught','l3-1','food-type'], dateAdded:'2026-09-29'},
      {jp:'パスタ', romaji:'pasuta', en:'pasta', tags:['L3','food-drink-l3','taught','l3-1','food-type'], dateAdded:'2026-09-29'},
      {jp:'カレー', romaji:'karee', en:'curry', tags:['L3','food-drink-l3','taught','l3-1','food-type'], dateAdded:'2026-09-29'},
      {jp:'ステーキ', romaji:'suteeki', en:'steak', tags:['L3','food-drink-l3','taught','l3-1','food-type'], dateAdded:'2026-09-29'},
      {jp:'オムレツ', romaji:'omuretsu', en:'omelette', tags:['L3','food-drink-l3','taught','l3-1','food-type'], dateAdded:'2026-09-29'},
      {jp:'スープ', romaji:'suupu', en:'soup', tags:['L3','food-drink-l3','taught','l3-1','food-type'], dateAdded:'2026-09-29'},
      {jp:'やさい', romaji:'yasai', en:'vegetables', tags:['L3','food-drink-l3','taught','l3-1','food-type','genki','genki-1-2'], altForm:'野菜', altIsStandard:true, dateAdded:'2026-09-29'},
      {jp:'さかな', romaji:'sakana', en:'fish', tags:['L3','food-drink-l3','taught','l3-1','food-type','genki','genki-1-2'], altForm:'魚', altIsStandard:true, dateAdded:'2026-09-29'},
      {jp:'かい', romaji:'kai', en:'shellfish', tags:['L3','food-drink-l3','taught','l3-1','food-type'], altForm:'貝', altIsStandard:true, dateAdded:'2026-09-29'},
      {jp:'ジュース', romaji:'juusu', en:'juice', tags:['L3','food-drink-l3','taught','l3-1','drink'], dateAdded:'2026-09-29'},
      {jp:'スポーツドリンク', romaji:'supootsu dorinku', en:'sports drink', tags:['L3','food-drink-l3','taught','l3-1','drink'], dateAdded:'2026-09-29'},
      {jp:'にほんちゃ', romaji:'nihoncha', en:'Japanese tea', tags:['L3','food-drink-l3','taught','l3-1','drink'], altForm:'日本茶', altIsStandard:true, dateAdded:'2026-09-29'},
      {jp:'こうちゃ', romaji:'koucha', en:'black tea', tags:['L3','food-drink-l3','taught','l3-1','drink'], altForm:'紅茶', altIsStandard:true, dateAdded:'2026-09-29'},
      {jp:'ぎゅうにゅう', romaji:'gyuunyuu', en:'milk', tags:['L3','food-drink-l3','taught','l3-1','drink'], altForm:'牛乳', altIsStandard:true, dateAdded:'2026-09-29'},
      {jp:'のみもの', romaji:'nomimono', en:'drinks / beverages', tags:['L3','food-drink-l3','taught','l3-1','drink'], altForm:'飲み物', altIsStandard:true, dateAdded:'2026-09-29'},
      // Lesson 2 (2026-10-06): ramen types and the class's short サンド (sandwich) forms.
      {jp:'みそ', romaji:'miso', en:'miso', tags:['L3','food-drink-l3','taught','l3-2','food-type'], altForm:'味噌', altIsStandard:true, dateAdded:'2026-10-06'},
      {jp:'とんこつ', romaji:'tonkotsu', en:'tonkotsu (pork-bone broth)', tags:['L3','food-drink-l3','taught','l3-2','food-type'], altForm:'豚骨', altIsStandard:true, dateAdded:'2026-10-06'},
      {jp:'たまごサンド', romaji:'tamago sando', en:'egg sandwich', tags:['L3','food-drink-l3','taught','l3-2','food-type'], dateAdded:'2026-10-06'},
      {jp:'ツナサンド', romaji:'tsuna sando', en:'tuna sandwich', tags:['L3','food-drink-l3','taught','l3-2','food-type'], dateAdded:'2026-10-06'},
      {jp:'ハムサンド', romaji:'hamu sando', en:'ham sandwich', tags:['L3','food-drink-l3','taught','l3-2','food-type'], dateAdded:'2026-10-06'},
      // Lesson 3 (2026-10-13, from class)
      {jp:'アイスコーヒー', romaji:'aisu koohii', en:'iced coffee', tags:['L3','food-drink-l3','taught','l3-3','drink'], dateAdded:'2026-10-13'},
      // Lesson 5 (2026-10-27)
      {jp:'スパゲッティ', romaji:'supagetti', en:'spaghetti', tags:['L3','food-drink-l3','food-type','taught','l3-5'], dateAdded:'2026-10-27'},
      {jp:'ポテトチップス', romaji:'poteto chippusu', en:'crisps', tags:['L3','food-drink-l3','food-type','taught','l3-5'], dateAdded:'2026-10-27'},
      {jp:'ハンバーガー', romaji:'hanbaagaa', en:'hamburger', tags:['L3','food-drink-l3','food-type','taught','l3-5','genki','genki-1-3'], dateAdded:'2026-10-27'},
      {jp:'すいか', romaji:'suika', en:'watermelon', tags:['L3','food-drink-l3','food-type','taught','l3-5'], altForm:'西瓜', dateAdded:'2026-10-27'},
      {jp:'ぶどう', romaji:'budou', en:'grapes', tags:['L3','food-drink-l3','food-type','taught','l3-5'], altForm:'葡萄', dateAdded:'2026-10-27'},
      {jp:'コロッケ', romaji:'korokke', en:'croquette', tags:['L3','food-drink-l3','food-type','loanwords-l3','taught','l3-5'], dateAdded:'2026-10-27'},
      {jp:'シュークリーム', romaji:'shuukuriimu', en:'cream puff', tags:['L3','food-drink-l3','food-type','loanwords-l3','taught','l3-5'], dateAdded:'2026-10-27'},
      {jp:'ソフトクリーム', romaji:'sofuto kuriimu', en:'soft-serve ice cream', tags:['L3','food-drink-l3','food-type','loanwords-l3','taught','l3-5'], dateAdded:'2026-10-27'},
      {jp:'ショートケーキ', romaji:'shooto keeki', en:'strawberry sponge cake', tags:['L3','food-drink-l3','food-type','loanwords-l3','taught','l3-5'], dateAdded:'2026-10-27'},
    ],
  },
  'vocab-verbs-l3': {
    level: 3,
    hasReference: true,
    label: 'Verbs',
    chars: 'たべます のみます みます…',
    tagQuery: ['L3','verbs-l3'],
    items: [
      // Lesson 1: all tagged forward from Level 2 Verbs. Lesson 2 (2026-10-06) adds these.
      {jp:'およぎます', romaji:'oyogimasu', en:'to swim', tags:['L3','verbs-l3','taught','l3-2'], altForm:'泳ぎます', altIsStandard:true, dateAdded:'2026-10-06'},
      {jp:'うんどうします', romaji:'undoushimasu', en:'to exercise', tags:['L3','verbs-l3','taught','l3-2'], altForm:'運動します', altIsStandard:true, dateAdded:'2026-10-06'},
      {jp:'うたいます', romaji:'utaimasu', en:'to sing', tags:['L3','verbs-l3','taught','l3-2'], altForm:'歌います', altIsStandard:true, dateAdded:'2026-10-06'},
      // Lesson 4 (2026-10-20): giving and receiving - three give/receive pairs, plus
      // the getting-in-touch verbs. All take Person に (to the giver, from the receiver).
      {jp:'あげます', romaji:'agemasu', en:'to give', tags:['L3','verbs-l3','taught','l3-4'], dateAdded:'2026-10-20'},
      {jp:'もらいます', romaji:'moraimasu', en:'to receive', tags:['L3','verbs-l3','taught','l3-4'], altForm:'貰います', dateAdded:'2026-10-20'},
      {jp:'かします', romaji:'kashimasu', en:'to lend', tags:['L3','verbs-l3','taught','l3-4'], altForm:'貸します', altIsStandard:true, dateAdded:'2026-10-20'},
      {jp:'かります', romaji:'karimasu', en:'to borrow', tags:['L3','verbs-l3','taught','l3-4','homophones-l3'], altForm:'借ります', altIsStandard:true, dateAdded:'2026-10-20'},
      {jp:'おしえます', romaji:'oshiemasu', en:'to teach', tags:['L3','verbs-l3','taught','l3-4'], altForm:'教えます', altIsStandard:true, dateAdded:'2026-10-20'},
      {jp:'ならいます', romaji:'naraimasu', en:'to learn (from someone)', tags:['L3','verbs-l3','taught','l3-4'], altForm:'習います', altIsStandard:true, dateAdded:'2026-10-20'},
      {jp:'かけます', romaji:'kakemasu', en:'to make (a phone call)', tags:['L3','verbs-l3','taught','l3-4'], altForm:'掛けます', dateAdded:'2026-10-20'},
      {jp:'おくります', romaji:'okurimasu', en:'to send', tags:['L3','verbs-l3','taught','l3-4'], altForm:'送ります', altIsStandard:true, dateAdded:'2026-10-20'},
      {jp:'きります', romaji:'kirimasu', en:'to cut', tags:['L3','verbs-l3','taught','l3-5'], altForm:'切ります', altIsStandard:true, dateAdded:'2026-10-27'},
      {jp:'かえします', romaji:'kaeshimasu', en:'to give back / return (a thing)', tags:['L3','verbs-l3','taught','l3-4'], altForm:'返します', altIsStandard:true, dateAdded:'2026-10-20'},
      // Lesson 6 (2026-11-03)
      {jp:'はいります', romaji:'hairimasu', en:'to enter / get into (おふろに はいります = have a bath)', tags:['L3','verbs-l3','taught','l3-6'], altForm:'入ります', altIsStandard:true, dateAdded:'2026-11-03'},
      // Lesson 6 (2026-11-04, from class)
      {jp:'ほんやくします', romaji:'honyaku shimasu', en:'to translate (writing)', tags:['L3','verbs-l3','taught','l3-6'], altForm:'翻訳します', altIsStandard:true, dateAdded:'2026-11-04'},
      {jp:'つうやくします', romaji:'tsuuyaku shimasu', en:'to interpret (speech)', tags:['L3','verbs-l3','taught','l3-6'], altForm:'通訳します', altIsStandard:true, dateAdded:'2026-11-04'},
      {jp:'けします', romaji:'keshimasu', en:'to erase / to switch off', tags:['L3','verbs-l3','taught','l3-6'], altForm:'消します', altIsStandard:true, dateAdded:'2026-11-04'},
    ],
  },
  'vocab-hobbies-l3': {
    level: 3,
    hasReference: true,
    label: 'Hobbies & activities',
    chars: 'しゅみ テニス りょこう…',
    tagQuery: ['L3','hobbies-l3'],
    items: [
      {jp:'しゅみ', romaji:'shumi', en:'hobby', tags:['L3','hobbies-l3','taught','l3-1'], altForm:'趣味', altIsStandard:true, dateAdded:'2026-09-29'},
      {jp:'ゴルフ', romaji:'gorufu', en:'golf', tags:['L3','hobbies-l3','taught','l3-1'], dateAdded:'2026-09-29'},
      {jp:'サッカー', romaji:'sakkaa', en:'football (soccer)', tags:['L3','hobbies-l3','taught','l3-1'], dateAdded:'2026-09-29'},
      {jp:'スキー', romaji:'sukii', en:'skiing', tags:['L3','hobbies-l3','taught','l3-1'], dateAdded:'2026-09-29'},
      {jp:'すいえい', romaji:'suiei', en:'swimming', tags:['L3','hobbies-l3','taught','l3-1'], altForm:'水泳', altIsStandard:true, dateAdded:'2026-09-29'},
      {jp:'じゅうどう', romaji:'juudou', en:'judo', tags:['L3','hobbies-l3','taught','l3-1'], altForm:'柔道', altIsStandard:true, dateAdded:'2026-09-29'},
      {jp:'カラオケ', romaji:'karaoke', en:'karaoke', tags:['L3','hobbies-l3','taught','l3-1'], dateAdded:'2026-09-29'},
      {jp:'どくしょ', romaji:'dokusho', en:'reading (books)', tags:['L3','hobbies-l3','taught','l3-1'], altForm:'読書', altIsStandard:true, dateAdded:'2026-09-29'},
      {jp:'ガーデニング', romaji:'gaadeningu', en:'gardening', tags:['L3','hobbies-l3','taught','l3-1'], dateAdded:'2026-09-29'},
      {jp:'ピアノ', romaji:'piano', en:'piano', tags:['L3','hobbies-l3','taught','l3-1'], dateAdded:'2026-09-29'},
      {jp:'ドライブ', romaji:'doraibu', en:'drive (for pleasure)', tags:['L3','hobbies-l3','taught','l3-1'], dateAdded:'2026-09-29'},
      {jp:'ダンス', romaji:'dansu', en:'dance / dancing', tags:['L3','hobbies-l3','taught','l3-1'], dateAdded:'2026-09-29'},
      {jp:'ウォーキング', romaji:'wookingu', en:'walking', tags:['L3','hobbies-l3','taught','l3-1'], dateAdded:'2026-09-29'},
      {jp:'DIY', romaji:'dii ai wai', en:'DIY (do-it-yourself)', tags:['L3','hobbies-l3','taught','l3-1'], dateAdded:'2026-09-29'},
      {jp:'りょこう', romaji:'ryokou', en:'travel', tags:['L3','hobbies-l3','taught','l3-1'], altForm:'旅行', altIsStandard:true, dateAdded:'2026-09-29'},
      {jp:'バーベキュー', romaji:'baabekyuu', en:'barbecue', tags:['L3','hobbies-l3','taught','l3-1'], dateAdded:'2026-09-29'},
      {jp:'ピクニック', romaji:'pikunikku', en:'picnic', tags:['L3','hobbies-l3','taught','l3-1'], dateAdded:'2026-09-29'},
      {jp:'アフタヌーンティー', romaji:'afutanuun tii', en:'afternoon tea', tags:['L3','hobbies-l3','taught','l3-1'], dateAdded:'2026-09-29'},
      {jp:'サイクリング', romaji:'saikuringu', en:'cycling', tags:['L3','hobbies-l3','taught','l3-1'], dateAdded:'2026-09-29'},
      {jp:'ジョギング', romaji:'jogingu', en:'jogging', tags:['L3','hobbies-l3','taught','l3-2'], dateAdded:'2026-10-06'},
      {jp:'ドラマ', romaji:'dorama', en:'TV drama', tags:['L3','hobbies-l3','taught','l3-2'], dateAdded:'2026-10-06'},
      {jp:'コンサート', romaji:'konsaato', en:'concert', tags:['L3','hobbies-l3','taught','l3-2'], dateAdded:'2026-10-06'},
      {jp:'ポップス', romaji:'poppusu', en:'pop music', tags:['L3','hobbies-l3','taught','l3-2'], dateAdded:'2026-10-06'},
      // Lesson 3 (2026-10-13) - activities to invite people to
      {jp:'かいもの', romaji:'kaimono', en:'shopping', tags:['L3','hobbies-l3','taught','l3-3'], altForm:'買い物', altIsStandard:true, dateAdded:'2026-10-13'},
      {jp:'デート', romaji:'deeto', en:'date (romantic)', tags:['L3','hobbies-l3','taught','l3-3','genki','genki-1-3'], dateAdded:'2026-10-13'},
      {jp:'かんこう', romaji:'kankou', en:'sightseeing', tags:['L3','hobbies-l3','taught','l3-3'], altForm:'観光', altIsStandard:true, dateAdded:'2026-10-13'},
      {jp:'キャンプ', romaji:'kyanpu', en:'camping', tags:['L3','hobbies-l3','taught','l3-3'], dateAdded:'2026-10-13'},
      {jp:'バードウォッチング', romaji:'baado wocchingu', en:'birdwatching', tags:['L3','hobbies-l3','taught','l3-3'], dateAdded:'2026-10-13'},
      {jp:'ハイキング', romaji:'haikingu', en:'hiking', tags:['L3','hobbies-l3','taught','l3-3'], dateAdded:'2026-10-13'},
      {jp:'やまのぼり', romaji:'yamanobori', en:'mountain climbing', tags:['L3','hobbies-l3','taught','l3-3'], altForm:'山登り', altIsStandard:true, dateAdded:'2026-10-13'},
      {jp:'マーケット', romaji:'maaketto', en:'market', tags:['L3','hobbies-l3','taught','l3-3'], dateAdded:'2026-10-13'},
      {jp:'おまつり', romaji:'omatsuri', en:'festival', tags:['L3','hobbies-l3','taught','l3-3'], altForm:'お祭り', altIsStandard:true, dateAdded:'2026-10-13'},
      {jp:'げきじょう', romaji:'gekijou', en:'theatre (the building)', tags:['L3','hobbies-l3','taught','l3-3'], altForm:'劇場', altIsStandard:true, dateAdded:'2026-10-13'},
    ],
  },
  'vocab-frequency-l3': {
    level: 3,
    hasReference: true,
    label: 'Frequency, time & linking words',
    chars: 'いつも よく ぜんぜん…',
    tagQuery: ['L3','frequency-l3'],
    items: [
      {jp:'いつも', romaji:'itsumo', en:'always', tags:['L3','frequency-l3','taught','l3-1','frequency'], dateAdded:'2026-09-29'},
      {jp:'よく', romaji:'yoku', en:'often', tags:['L3','frequency-l3','taught','l3-1','genki','genki-1-3','frequency'], dateAdded:'2026-09-29'},
      {jp:'あまり', romaji:'amari', en:'not often / seldom (+ negative verb)', tags:['L3','frequency-l3','taught','l3-1','genki','genki-1-3','frequency'], dateAdded:'2026-09-29'},
      {jp:'ぜんぜん', romaji:'zenzen', en:'never / not at all (+ negative verb)', tags:['L3','frequency-l3','taught','l3-1','genki','genki-1-3','frequency'], altForm:'全然', altIsStandard:true, dateAdded:'2026-09-29'},
      {jp:'それから', romaji:'sorekara', en:'and then / after that', tags:['L3','frequency-l3','taught','l3-1'], dateAdded:'2026-09-29'},
      {jp:'そして', romaji:'soshite', en:'and / and also', tags:['L3','frequency-l3','taught','l3-1'], dateAdded:'2026-09-29'},
      {jp:'なにも', romaji:'nanimo', en:'nothing (+ negative verb)', tags:['L3','frequency-l3','taught','l3-1'], altForm:'何も', altIsStandard:true, dateAdded:'2026-09-29'},
      {jp:'だれにも', romaji:'dare ni mo', en:'to nobody (+ negative verb)', tags:['L3','frequency-l3','taught','l3-4'], altForm:'誰にも', altIsStandard:true, dateAdded:'2026-10-20'},
      {jp:'まいあさ', romaji:'maiasa', en:'every morning', tags:['L3','frequency-l3','taught','l3-1','time-l3'], altForm:'毎朝', altIsStandard:true, dateAdded:'2026-09-29'},
      {jp:'けさ', romaji:'kesa', en:'this morning', tags:['L3','frequency-l3','taught','l3-1','time-l3'], altForm:'今朝', altIsStandard:true, dateAdded:'2026-09-29'},
      {jp:'こんばん', romaji:'konban', en:'tonight / this evening', tags:['L3','frequency-l3','taught','l3-1','time-l3','genki','genki-1-3'], altForm:'今晩', altIsStandard:true, dateAdded:'2026-09-29'},
      {jp:'やすみのひ', romaji:'yasumi no hi', en:'day off', tags:['L3','frequency-l3','taught','l3-1','time-l3'], altForm:'休みの日', altIsStandard:true, dateAdded:'2026-09-29'},
      // moved from the Genki category (now a private pack) 2026-10-02:
      {jp:'なん', romaji:'nan', en:'what (before です/だ, or counters like 何時)', tags:['genki','genki-1-1','taught','L3','frequency-l3','l3-1'], dateAdded:'2026-09-12'},
      {jp:'なに', romaji:'nani', en:'what (elsewhere — before を/が, standalone)', tags:['genki','genki-1-1','taught','L3','frequency-l3','l3-1','question-word'], dateAdded:'2026-09-12'},
      // Lesson 6 (2026-11-03): もう / まだ and time words
      {jp:'もう', romaji:'mou', en:'already / (not) yet (+ ました)', tags:['L3','frequency-l3','time-l3','taught','l3-6'], dateAdded:'2026-11-03'},
      {jp:'まだ', romaji:'mada', en:'not yet / still (いいえ、まだです)', tags:['L3','frequency-l3','time-l3','taught','l3-6'], dateAdded:'2026-11-03'},
      {jp:'これから', romaji:'korekara', en:'from now / (just) about to', tags:['L3','frequency-l3','time-l3','taught','l3-6'], dateAdded:'2026-11-03'},
      {jp:'まいしゅう', romaji:'maishuu', en:'every week', tags:['L3','frequency-l3','time-l3','taught','l3-6'], altForm:'毎週', altIsStandard:true, dateAdded:'2026-11-03'},
      {jp:'まいつき', romaji:'maitsuki', en:'every month', tags:['L3','frequency-l3','time-l3','taught','l3-6'], altForm:'毎月', altIsStandard:true, dateAdded:'2026-11-03'},
      {jp:'まいとし', romaji:'maitoshi', en:'every year', tags:['L3','frequency-l3','time-l3','taught','l3-6'], altForm:'毎年', altIsStandard:true, dateAdded:'2026-11-03'},
      // Lesson 6 calendar sheet (2026-11-04): the bare words behind せんしゅう / こんげつ / ことし / まいにち
      {jp:'しゅう', romaji:'shuu', en:'week', tags:['L3','frequency-l3','time-l3','taught','l3-6'], altForm:'週', altIsStandard:true, dateAdded:'2026-11-04'},
      {jp:'つき', romaji:'tsuki', en:'month (also: the moon)', tags:['L3','frequency-l3','time-l3','taught','l3-6'], altForm:'月', altIsStandard:true, dateAdded:'2026-11-04'},
      {jp:'とし', romaji:'toshi', en:'year', tags:['L3','frequency-l3','time-l3','taught','l3-6'], altForm:'年', altIsStandard:true, dateAdded:'2026-11-04'},
      {jp:'ひ', romaji:'hi', en:'day', tags:['L3','frequency-l3','time-l3','taught','l3-6'], altForm:'日', altIsStandard:true, dateAdded:'2026-11-04'},
    ],
  },
  'vocab-general-l3': {
    level: 3,
    hasReference: true,
    label: 'General vocabulary',
    chars: 'ニュース メール うみ…',
    tagQuery: ['L3','general-l3'],
    items: [
      {jp:'ニュース', romaji:'nyuusu', en:'news', tags:['L3','general-l3','taught','l3-1'], dateAdded:'2026-09-29'},
      {jp:'レポート', romaji:'repooto', en:'report', tags:['L3','general-l3','taught','l3-1'], dateAdded:'2026-09-29'},
      {jp:'メール', romaji:'meeru', en:'email', tags:['L3','general-l3','taught','l3-1'], dateAdded:'2026-09-29'},
      {jp:'セルフィー', romaji:'serufii', en:'selfie', tags:['L3','general-l3','taught','l3-1'], dateAdded:'2026-09-29'},
      {jp:'ビデオ', romaji:'bideo', en:'video', tags:['L3','general-l3','taught','l3-1'], dateAdded:'2026-09-29'},
      {jp:'べんきょう', romaji:'benkyou', en:'study', tags:['L3','general-l3','taught','l3-1'], altForm:'勉強', altIsStandard:true, dateAdded:'2026-09-29'},
      {jp:'うみ', romaji:'umi', en:'sea / seaside', tags:['L3','places-l3','taught','l3-1','l3-2','places-to-go'], altForm:'海', altIsStandard:true, dateAdded:'2026-09-29'},
      {jp:'けいろうのひ', romaji:'keirou no hi', en:'Respect for the Aged Day (Sept)', tags:['L3','general-l3','taught','l3-1'], altForm:'敬老の日', altIsStandard:true, dateAdded:'2026-09-29'},
      {jp:'もみじがり', romaji:'momijigari', en:'autumn-leaf viewing', tags:['L3','general-l3','taught','l3-1'], altForm:'紅葉狩り', altIsStandard:true, dateAdded:'2026-09-29'},
      {jp:'おつきみ', romaji:'otsukimi', en:'moon viewing (Sept)', tags:['L3','general-l3','taught','l3-1'], altForm:'お月見', altIsStandard:true, dateAdded:'2026-09-29'},
      // Lesson 2 (2026-10-06):
      {jp:'ふく', romaji:'fuku', en:'clothes', tags:['L3','general-l3','taught','l3-2'], altForm:'服', altIsStandard:true, dateAdded:'2026-10-06'},
      {jp:'はな', romaji:'hana', en:'flower', tags:['L3','general-l3','taught','l3-2'], altForm:'花', altIsStandard:true, dateAdded:'2026-10-06'},
      {jp:'ハロウィン', romaji:'harowin', en:'Halloween (Oct 31)', tags:['L3','general-l3','taught','l3-2','occasions-l3'], dateAdded:'2026-10-06'},
      {jp:'ころもがえ', romaji:'koromogae', en:'seasonal change of clothes (Oct 1)', tags:['L3','general-l3','taught','l3-2'], altForm:'衣替え', altIsStandard:true, dateAdded:'2026-10-06'},
      // Lesson 3 (2026-10-13): languages - taught as "country + ご"; えいご is the
      // irregular one (not イギリスご). Both were in the private Genki pack (same
      // jp|en, so scores carry over) and were removed from it.
      {jp:'にほんご', romaji:'nihongo', en:'Japanese language', tags:['L3','general-l3','taught','l3-3','genki','genki-1-1'], altForm:'日本語', altIsStandard:true, dateAdded:'2026-10-13'},
      {jp:'えいご', romaji:'eigo', en:'English (language)', tags:['L3','general-l3','taught','l3-3','genki','genki-1-2'], altForm:'英語', altIsStandard:true, dateAdded:'2026-10-13'},
      {jp:'ぶんぼうぐ', romaji:'bunbougu', en:'stationery', tags:['L3','general-l3','taught','l3-3'], altForm:'文房具', altIsStandard:true, dateAdded:'2026-10-13'},
      // Lesson 4 (2026-10-20): from the lend/borrow pictures, the contact verbs and the
      // homework reading. Languages again as "country + ご".
      {jp:'でんわ', romaji:'denwa', en:'telephone / phone call', tags:['L3','general-l3','taught','l3-4','genki','genki-1-1'], altForm:'電話', altIsStandard:true, dateAdded:'2026-10-20'},
      {jp:'おかね', romaji:'okane', en:'money', tags:['L3','general-l3','taught','l3-4'], altForm:'お金', altIsStandard:true, dateAdded:'2026-10-20'},
      {jp:'いえ', romaji:'ie', en:'house / home', tags:['L3','general-l3','taught','l3-4','genki','genki-1-3'], altForm:'家', altIsStandard:true, dateAdded:'2026-10-20'},
      {jp:'バッテリー', romaji:'batterii', en:'battery', tags:['L3','general-l3','taught','l3-4'], dateAdded:'2026-10-20'},
      {jp:'うた', romaji:'uta', en:'song', tags:['L3','general-l3','taught','l3-4'], altForm:'歌', altIsStandard:true, dateAdded:'2026-10-20'},
      {jp:'ドイツご', romaji:'doitsugo', en:'German (language)', tags:['L3','general-l3','taught','l3-4'], altForm:'ドイツ語', altIsStandard:true, dateAdded:'2026-10-20'},
      {jp:'ちゅうごくご', romaji:'chuugokugo', en:'Chinese (language)', tags:['L3','general-l3','taught','l3-4'], altForm:'中国語', altIsStandard:true, dateAdded:'2026-10-20'},
      {jp:'しんちょう', romaji:'shinchou', en:'height (of a person)', tags:['L3','general-l3','taught','l3-4'], altForm:'身長', altIsStandard:true, dateAdded:'2026-10-20'},
      {jp:'センチ', romaji:'senchi', en:'centimetre', tags:['L3','general-l3','taught','l3-4'], dateAdded:'2026-10-20'},
      {jp:'メートル', romaji:'meetoru', en:'metre', tags:['L3','general-l3','taught','l3-4'], dateAdded:'2026-10-20'},
      // Lesson 5 (2026-10-27): listening, reading and the long-vowel homework
      {jp:'むかし', romaji:'mukashi', en:'long ago', tags:['L3','general-l3','taught','l3-5'], altForm:'昔', altIsStandard:true, dateAdded:'2026-10-27'},
      {jp:'コスプレ', romaji:'kosupure', en:'cosplay', tags:['L3','general-l3','taught','l3-5'], dateAdded:'2026-10-27'},
      {jp:'チョコ', romaji:'choko', en:'chocolate (short for チョコレート)', tags:['L3','general-l3','food-type','taught','l3-5'], dateAdded:'2026-10-27'},
      {jp:'マシュマロ', romaji:'mashumaro', en:'marshmallow', tags:['L3','general-l3','food-type','taught','l3-5'], dateAdded:'2026-10-27'},
      {jp:'れいぞうこ', romaji:'reizouko', en:'fridge', tags:['L3','general-l3','objects','taught','l3-5'], altForm:'冷蔵庫', altIsStandard:true, dateAdded:'2026-10-27'},
      {jp:'せんぷうき', romaji:'senpuuki', en:'electric fan', tags:['L3','general-l3','objects','taught','l3-5'], altForm:'扇風機', altIsStandard:true, dateAdded:'2026-10-27'},
      {jp:'ふうとう', romaji:'fuutou', en:'envelope', tags:['L3','general-l3','objects','taught','l3-5'], altForm:'封筒', altIsStandard:true, dateAdded:'2026-10-27'},
      {jp:'ぞう', romaji:'zou', en:'elephant', tags:['L3','general-l3','taught','l3-5'], altForm:'象', altIsStandard:true, dateAdded:'2026-10-27'},
      {jp:'こおり', romaji:'koori', en:'ice', tags:['L3','general-l3','taught','l3-5'], altForm:'氷', altIsStandard:true, dateAdded:'2026-10-27'},
      {jp:'おおかみ', romaji:'ookami', en:'wolf', tags:['L3','general-l3','taught','l3-5'], altForm:'狼', dateAdded:'2026-10-27'},
      // Lesson 6 (2026-11-03)
      {jp:'さんぽ', romaji:'sanpo', en:'a walk (さんぽを します = go for a walk)', tags:['L3','general-l3','taught','l3-6'], altForm:'散歩', altIsStandard:true, dateAdded:'2026-11-03'},
      {jp:'おふろ', romaji:'ofuro', en:'bath', tags:['L3','general-l3','taught','l3-6'], altForm:'お風呂', altIsStandard:true, dateAdded:'2026-11-03'},
      {jp:'しんかんせん', romaji:'shinkansen', en:'bullet train', tags:['L3','general-l3','transport','taught','l3-6'], altForm:'新幹線', altIsStandard:true, dateAdded:'2026-11-03'},
      {jp:'カレンダー', romaji:'karendaa', en:'calendar', tags:['L3','general-l3','objects','taught','l3-6'], dateAdded:'2026-11-03'},
      {jp:'あの', romaji:'ano', en:'that … (over there) — before a noun', tags:['L3','general-l3','taught','l3-6','genki','genki-1-2'], dateAdded:'2026-11-03'},
      {jp:'この', romaji:'kono', en:'this … — before a noun', tags:['L3','general-l3','taught','l3-6','genki','genki-1-2'], dateAdded:'2026-11-03'},
      {jp:'〜ちゃん', romaji:'~chan', en:'friendly name ending (children, close friends)', tags:['L3','general-l3','taught','l3-6'], dateAdded:'2026-11-03'},
      // Lesson 6 (2026-11-04, from class): word parts - けしゴム, もみじがり
      {jp:'ほんやく', romaji:'honyaku', en:'translation (written)', tags:['L3','general-l3','taught','l3-6'], altForm:'翻訳', altIsStandard:true, dateAdded:'2026-11-04'},
      {jp:'つうやく', romaji:'tsuuyaku', en:'interpreting / an interpreter (spoken)', tags:['L3','general-l3','taught','l3-6'], altForm:'通訳', altIsStandard:true, dateAdded:'2026-11-04'},
      {jp:'け', romaji:'ke', en:'a hair, body hair, fur', tags:['L3','general-l3','taught','l3-6'], altForm:'毛', altIsStandard:true, dateAdded:'2026-11-04'},
      {jp:'ゴム', romaji:'gomu', en:'rubber', tags:['L3','general-l3','taught','l3-6'], dateAdded:'2026-11-04'},
      {jp:'もみじ', romaji:'momiji', en:'maple / autumn leaves', tags:['L3','general-l3','taught','l3-6'], altForm:'紅葉', altIsStandard:true, dateAdded:'2026-11-04'},
    ],
  },
  // LEVEL 3 LESSON 2 (2026-10-06) - three new L3 categories. As in Lesson 1,
  // words already in the app are tagged forward (family-l3 / places-l3 /
  // occupations-l3 + 'l3-2'); `items` here hold only words new to the app.
  // Family: plain forms for YOUR OWN family ("my ..."), polite forms for
  // SOMEONE ELSE'S - the English says which, so the two never read as the
  // same answer. しゅじん/おっと and かない/つま are both taught; told apart
  // as traditional/neutral. The L2 family words were re-glossed to match
  // (scores for those 8 reset - agreed with Andrew).
  'vocab-family-l3': {
    level: 3,
    hasReference: true,
    label: 'Family & people',
    chars: 'ちち はは おくさん…',
    tagQuery: ['L3','family-l3'],
    items: [
      {jp:'ちち', romaji:'chichi', en:'my father', tags:['L3','family-l3','taught','l3-2'], altForm:'父', altIsStandard:true, dateAdded:'2026-10-06'},
      {jp:'はは', romaji:'haha', en:'my mother', tags:['L3','family-l3','taught','l3-2'], altForm:'母', altIsStandard:true, dateAdded:'2026-10-06'},
      {jp:'あに', romaji:'ani', en:'my older brother', tags:['L3','family-l3','taught','l3-2'], altForm:'兄', altIsStandard:true, dateAdded:'2026-10-06'},
      {jp:'あね', romaji:'ane', en:'my older sister', tags:['L3','family-l3','taught','l3-2'], altForm:'姉', altIsStandard:true, dateAdded:'2026-10-06'},
      {jp:'そふ', romaji:'sofu', en:'my grandfather', tags:['L3','family-l3','taught','l3-2'], altForm:'祖父', altIsStandard:true, dateAdded:'2026-10-06'},
      {jp:'そぼ', romaji:'sobo', en:'my grandmother', tags:['L3','family-l3','taught','l3-2'], altForm:'祖母', altIsStandard:true, dateAdded:'2026-10-06'},
      {jp:'しゅじん', romaji:'shujin', en:'my husband (traditional)', tags:['L3','family-l3','taught','l3-2'], altForm:'主人', altIsStandard:true, dateAdded:'2026-10-06'},
      {jp:'おっと', romaji:'otto', en:'my husband (neutral)', tags:['L3','family-l3','taught','l3-2'], altForm:'夫', altIsStandard:true, dateAdded:'2026-10-06'},
      {jp:'かない', romaji:'kanai', en:'my wife (traditional)', tags:['L3','family-l3','taught','l3-2'], altForm:'家内', altIsStandard:true, dateAdded:'2026-10-06'},
      {jp:'つま', romaji:'tsuma', en:'my wife (neutral)', tags:['L3','family-l3','taught','l3-2'], altForm:'妻', altIsStandard:true, dateAdded:'2026-10-06'},
      {jp:'むすこ', romaji:'musuko', en:'my son', tags:['L3','family-l3','taught','l3-2'], altForm:'息子', altIsStandard:true, dateAdded:'2026-10-06'},
      {jp:'むすめ', romaji:'musume', en:'my daughter', tags:['L3','family-l3','taught','l3-2'], altForm:'娘', altIsStandard:true, dateAdded:'2026-10-06'},
      {jp:'おとうとさん', romaji:'otoutosan', en:'younger brother (someone else\'s)', tags:['L3','family-l3','taught','l3-2'], altForm:'弟さん', altIsStandard:true, dateAdded:'2026-10-06'},
      {jp:'いもうとさん', romaji:'imoutosan', en:'younger sister (someone else\'s)', tags:['L3','family-l3','taught','l3-2'], altForm:'妹さん', altIsStandard:true, dateAdded:'2026-10-06'},
      {jp:'ごしゅじん', romaji:'goshujin', en:'husband (someone else\'s)', tags:['L3','family-l3','taught','l3-2'], altForm:'ご主人', altIsStandard:true, dateAdded:'2026-10-06'},
      {jp:'おくさん', romaji:'okusan', en:'wife (someone else\'s)', tags:['L3','family-l3','taught','l3-2'], altForm:'奥さん', altIsStandard:true, dateAdded:'2026-10-06'},
      {jp:'むすこさん', romaji:'musukosan', en:'son (someone else\'s)', tags:['L3','family-l3','taught','l3-2'], altForm:'息子さん', altIsStandard:true, dateAdded:'2026-10-06'},
      {jp:'むすめさん', romaji:'musumesan', en:'daughter (someone else\'s)', tags:['L3','family-l3','taught','l3-2'], altForm:'娘さん', altIsStandard:true, dateAdded:'2026-10-06'},
      {jp:'どうりょう', romaji:'douryou', en:'colleague', tags:['L3','family-l3','taught','l3-2'], altForm:'同僚', altIsStandard:true, dateAdded:'2026-10-06'},
      // Lesson 3 (2026-10-13)
      {jp:'かのじょ', romaji:'kanojo', en:'girlfriend / she', tags:['L3','family-l3','taught','l3-3'], altForm:'彼女', altIsStandard:true, dateAdded:'2026-10-13'},
      // Lesson 4 (2026-10-20)
      {jp:'じょうし', romaji:'joushi', en:'boss', tags:['L3','family-l3','taught','l3-4'], altForm:'上司', altIsStandard:true, dateAdded:'2026-10-20'},
      {jp:'みなさん', romaji:'minasan', en:'everyone', tags:['L3','family-l3','taught','l3-4'], altForm:'皆さん', altIsStandard:true, dateAdded:'2026-10-20'},
    ],
  },
  // Places & rooms: places where an action happens (で), from the lesson's
  // picture pages. いま here is "living room" (居間) - a different word from
  // いま "now" (今) that sounds the same; the kanji after answering tells them apart.
  'vocab-places-l3': {
    level: 3,
    hasReference: true,
    label: 'Places & rooms',
    chars: 'やま にわ だいどころ…',
    tagQuery: ['L3','places-l3'],
    items: [
      {jp:'やま', romaji:'yama', en:'mountain', tags:['L3','places-l3','taught','l3-2','places-to-go'], altForm:'山', altIsStandard:true, dateAdded:'2026-10-06'},
      {jp:'ビーチ', romaji:'biichi', en:'beach', tags:['L3','places-l3','taught','l3-2','places-to-go'], dateAdded:'2026-10-06'},
      {jp:'バー', romaji:'baa', en:'bar', tags:['L3','places-l3','taught','l3-2','places-to-go'], dateAdded:'2026-10-06'},
      {jp:'クラブ', romaji:'kurabu', en:'club (nightclub)', tags:['L3','places-l3','taught','l3-2','places-to-go'], dateAdded:'2026-10-06'},
      {jp:'きょうかい', romaji:'kyoukai', en:'church', tags:['L3','places-l3','taught','l3-2','places-to-go'], altForm:'教会', altIsStandard:true, dateAdded:'2026-10-06'},
      {jp:'どうぶつえん', romaji:'doubutsuen', en:'zoo', tags:['L3','places-l3','taught','l3-2','places-to-go'], altForm:'動物園', altIsStandard:true, dateAdded:'2026-10-06'},
      {jp:'いなか', romaji:'inaka', en:'countryside', tags:['L3','places-l3','taught','l3-2','places-to-go'], altForm:'田舎', altIsStandard:true, dateAdded:'2026-10-06'},
      {jp:'いま', romaji:'ima', en:'living room', tags:['L3','places-l3','taught','l3-2'], altForm:'居間', altIsStandard:true, dateAdded:'2026-10-06'},
      {jp:'だいどころ', romaji:'daidokoro', en:'kitchen', tags:['L3','places-l3','taught','l3-2'], altForm:'台所', altIsStandard:true, dateAdded:'2026-10-06'},
      {jp:'にわ', romaji:'niwa', en:'garden', tags:['L3','places-l3','taught','l3-2'], altForm:'庭', altIsStandard:true, dateAdded:'2026-10-06'},
      {jp:'ふろば', romaji:'furoba', en:'bathroom (with the bath)', tags:['L3','places-l3','taught','l3-2'], altForm:'風呂場', altIsStandard:true, dateAdded:'2026-10-06'},
      {jp:'しんしつ', romaji:'shinshitsu', en:'bedroom', tags:['L3','places-l3','taught','l3-2'], altForm:'寝室', altIsStandard:true, dateAdded:'2026-10-06'},
      // Lesson 3 (2026-10-13) - meeting points and places from the dialogues
      {jp:'かいさつ', romaji:'kaisatsu', en:'ticket gates', tags:['L3','places-l3','taught','l3-3'], altForm:'改札', altIsStandard:true, dateAdded:'2026-10-13'},
      {jp:'きっぷうりば', romaji:'kippu uriba', en:'ticket office / ticket machines', tags:['L3','places-l3','taught','l3-3'], altForm:'切符売り場', altIsStandard:true, dateAdded:'2026-10-13'},
      {jp:'キオスク', romaji:'kiosuku', en:'kiosk (station shop)', tags:['L3','places-l3','taught','l3-3'], dateAdded:'2026-10-13'},
      {jp:'ロビー', romaji:'robii', en:'lobby', tags:['L3','places-l3','taught','l3-3'], dateAdded:'2026-10-13'},
      {jp:'ねこカフェ', romaji:'neko kafe', en:'cat café', tags:['L3','places-l3','taught','l3-3'], altForm:'猫カフェ', altIsStandard:true, dateAdded:'2026-10-13'},
      {jp:'ぎんざ', romaji:'ginza', en:'Ginza (Tokyo)', tags:['L3','places-l3','taught','l3-3'], dateAdded:'2026-10-13'},
      {jp:'しぶや', romaji:'shibuya', en:'Shibuya (Tokyo)', tags:['L3','places-l3','taught','l3-3'], dateAdded:'2026-10-13'},
      {jp:'あきはばら', romaji:'akihabara', en:'Akihabara (Tokyo)', tags:['L3','places-l3','taught','l3-3'], dateAdded:'2026-10-13'},
      // Lesson 5 (2026-10-27)
      {jp:'はくぶつかん', romaji:'hakubutsukan', en:'museum', tags:['L3','places-to-go','places-l3','taught','l3-5'], altForm:'博物館', altIsStandard:true, dateAdded:'2026-10-27'},
    ],
  },
  // Occupations: the homework reading task (Lesson 2).
  'vocab-occupations-l3': {
    level: 3,
    hasReference: true,
    label: 'Occupations',
    chars: 'かんごし てんいん がか…',
    tagQuery: ['L3','occupations-l3'],
    items: [
      {jp:'じむいん', romaji:'jimuin', en:'office worker (clerical)', tags:['L3','occupations-l3','taught','l3-2'], altForm:'事務員', altIsStandard:true, dateAdded:'2026-10-06'},
      {jp:'ぼくし', romaji:'bokushi', en:'minister / pastor (Protestant)', tags:['L3','occupations-l3','taught','l3-2'], altForm:'牧師', altIsStandard:true, dateAdded:'2026-10-06'},
      {jp:'しんぷ', romaji:'shinpu', en:'priest (Catholic)', tags:['L3','occupations-l3','taught','l3-2'], altForm:'神父', altIsStandard:true, dateAdded:'2026-10-06'},
      {jp:'てんいん', romaji:'tenin', en:'shop assistant', tags:['L3','occupations-l3','taught','l3-2'], altForm:'店員', altIsStandard:true, dateAdded:'2026-10-06'},
      {jp:'はなや', romaji:'hanaya', en:'florist / flower shop', tags:['L3','occupations-l3','taught','l3-2'], altForm:'花屋', altIsStandard:true, dateAdded:'2026-10-06'},
      {jp:'けんちくし', romaji:'kenchikushi', en:'architect', tags:['L3','occupations-l3','taught','l3-2'], altForm:'建築士', altIsStandard:true, dateAdded:'2026-10-06'},
      {jp:'ぜいりし', romaji:'zeirishi', en:'tax accountant', tags:['L3','occupations-l3','taught','l3-2'], altForm:'税理士', altIsStandard:true, dateAdded:'2026-10-06'},
      {jp:'かんごし', romaji:'kangoshi', en:'nurse', tags:['L3','occupations-l3','taught','l3-2','genki','genki-1-1'], altForm:'看護師', altIsStandard:true, dateAdded:'2026-10-06'},
      {jp:'まんがか', romaji:'mangaka', en:'manga artist', tags:['L3','occupations-l3','taught','l3-2'], altForm:'漫画家', altIsStandard:true, dateAdded:'2026-10-06'},
      {jp:'がか', romaji:'gaka', en:'painter (artist)', tags:['L3','occupations-l3','taught','l3-2'], altForm:'画家', altIsStandard:true, dateAdded:'2026-10-06'},
      {jp:'けいさつかん', romaji:'keisatsukan', en:'police officer', tags:['L3','occupations-l3','taught','l3-2'], altForm:'警察官', altIsStandard:true, dateAdded:'2026-10-06'},
      {jp:'けいびいん', romaji:'keibiin', en:'security guard', tags:['L3','occupations-l3','taught','l3-2'], altForm:'警備員', altIsStandard:true, dateAdded:'2026-10-06'},
      {jp:'やくざいし', romaji:'yakuzaishi', en:'pharmacist', tags:['L3','occupations-l3','taught','l3-2'], altForm:'薬剤師', altIsStandard:true, dateAdded:'2026-10-06'},
      {jp:'ほいくし', romaji:'hoikushi', en:'nursery teacher', tags:['L3','occupations-l3','taught','l3-2'], altForm:'保育士', altIsStandard:true, dateAdded:'2026-10-06'},
      {jp:'おんがくか', romaji:'ongakuka', en:'musician', tags:['L3','occupations-l3','taught','l3-2'], altForm:'音楽家', altIsStandard:true, dateAdded:'2026-10-06'},
    ],
  },
  // Lesson 3 (2026-10-13): presents and souvenirs from the birthday-gift and
  // moving-in pages. Most also carry 'objects', so they join Everyday items.
  // Tagged forward: ぼうし, チョコレート, さいふ, おみやげ, タオル, しょうゆ.
  'vocab-gifts-l3': {
    level: 3,
    hasReference: true,
    label: 'Gifts & souvenirs',
    chars: 'プレゼント ハンカチ おかし…',
    tagQuery: ['L3','gifts-l3'],
    items: [
      {jp:'プレゼント', romaji:'purezento', en:'present / gift', tags:['L3','gifts-l3','taught','l3-3','objects'], dateAdded:'2026-10-13'},
      {jp:'キーホルダー', romaji:'kiihorudaa', en:'keyring', tags:['L3','gifts-l3','taught','l3-3','objects'], dateAdded:'2026-10-13'},
      {jp:'マグカップ', romaji:'magu kappu', en:'mug', tags:['L3','gifts-l3','taught','l3-3','objects'], dateAdded:'2026-10-13'},
      {jp:'ぬいぐるみ', romaji:'nuigurumi', en:'soft toy', tags:['L3','gifts-l3','taught','l3-3','objects'], dateAdded:'2026-10-13'},
      {jp:'ハンカチ', romaji:'hankachi', en:'handkerchief', tags:['L3','gifts-l3','taught','l3-3','objects'], dateAdded:'2026-10-13'},
      {jp:'スマホケース', romaji:'sumaho keesu', en:'phone case', tags:['L3','gifts-l3','taught','l3-3','objects'], dateAdded:'2026-10-13'},
      {jp:'ポーチ', romaji:'poochi', en:'pouch / small bag', tags:['L3','gifts-l3','taught','l3-3','objects'], dateAdded:'2026-10-13'},
      {jp:'おかし', romaji:'okashi', en:'sweets / snacks', tags:['L3','gifts-l3','taught','l3-3'], altForm:'お菓子', altIsStandard:true, dateAdded:'2026-10-13'},
      {jp:'せっけん', romaji:'sekken', en:'soap', tags:['L3','gifts-l3','taught','l3-3','objects'], altForm:'石鹸', dateAdded:'2026-10-13'},
      {jp:'ラップ', romaji:'rappu', en:'cling film', tags:['L3','gifts-l3','taught','l3-3','objects'], dateAdded:'2026-10-13'},
      // Lesson 4 (2026-10-20): gift items, things around the home, and the
      // culture quiz's gifts to avoid (くつした, はちうえ, ろうそく...).
      {jp:'ケーキ', romaji:'keeki', en:'cake', tags:['L3','gifts-l3','taught','l3-4','food-type'], dateAdded:'2026-10-20'},
      {jp:'カップ', romaji:'kappu', en:'cup', tags:['L3','gifts-l3','taught','l3-4','objects','tools-l3','l3-5'], dateAdded:'2026-10-20'},
      {jp:'グラス', romaji:'gurasu', en:'glass (for drinking)', tags:['L3','gifts-l3','taught','l3-4','objects'], dateAdded:'2026-10-20'},
      {jp:'CD', romaji:'shii dii', en:'CD', tags:['L3','gifts-l3','taught','l3-4','objects'], dateAdded:'2026-10-20'},
      {jp:'シャツ', romaji:'shatsu', en:'shirt', tags:['L3','gifts-l3','taught','l3-4','objects'], dateAdded:'2026-10-20'},
      {jp:'コート', romaji:'kooto', en:'coat', tags:['L3','gifts-l3','taught','l3-4','objects'], dateAdded:'2026-10-20'},
      {jp:'コースター', romaji:'koosutaa', en:'coaster', tags:['L3','gifts-l3','taught','l3-4','objects'], dateAdded:'2026-10-20'},
      {jp:'え', romaji:'e', en:'picture / painting', tags:['L3','gifts-l3','taught','l3-4','objects'], altForm:'絵', altIsStandard:true, dateAdded:'2026-10-20'},
      {jp:'にんぎょう', romaji:'ningyou', en:'doll', tags:['L3','gifts-l3','taught','l3-4','objects'], altForm:'人形', altIsStandard:true, dateAdded:'2026-10-20'},
      {jp:'おきもの', romaji:'okimono', en:'ornament', tags:['L3','gifts-l3','taught','l3-4','objects'], altForm:'置物', altIsStandard:true, dateAdded:'2026-10-20'},
      {jp:'おさら', romaji:'osara', en:'plate', tags:['L3','gifts-l3','taught','l3-4','objects'], altForm:'お皿', altIsStandard:true, dateAdded:'2026-10-20'},
      {jp:'はちうえ', romaji:'hachiue', en:'potted plant', tags:['L3','gifts-l3','taught','l3-4','objects'], altForm:'鉢植え', altIsStandard:true, dateAdded:'2026-10-20'},
      {jp:'くつした', romaji:'kutsushita', en:'socks', tags:['L3','gifts-l3','taught','l3-4','objects'], altForm:'靴下', altIsStandard:true, dateAdded:'2026-10-20'},
      {jp:'きく', romaji:'kiku', en:'chrysanthemum', tags:['L3','gifts-l3','taught','l3-4'], altForm:'菊', altIsStandard:true, dateAdded:'2026-10-20'},
      {jp:'パジャマ', romaji:'pajama', en:'pyjamas', tags:['L3','gifts-l3','taught','l3-4','objects'], dateAdded:'2026-10-20'},
      {jp:'ろうそく', romaji:'rousoku', en:'candle', tags:['L3','gifts-l3','taught','l3-4','objects'], altForm:'蝋燭', dateAdded:'2026-10-20'},
      {jp:'ベルト', romaji:'beruto', en:'belt', tags:['L3','gifts-l3','taught','l3-4','objects'], dateAdded:'2026-10-20'},
      {jp:'ナイフ', romaji:'naifu', en:'knife', tags:['L3','gifts-l3','taught','l3-4','objects','tools-l3','l3-5'], dateAdded:'2026-10-20'},
    ],
  },
  // Lesson 3: adjectives for reacting to things (かわいいですね!). Words only -
  // adjective forms were dropped (Andrew, 2026-10-09). きれい/すてき are な-adjectives.
  'vocab-adjectives-l3': {
    level: 3,
    hasReference: true,
    label: 'Adjectives',
    chars: 'おもしろい かっこいい きれい…',
    tagQuery: ['L3','adjectives-l3'],
    items: [
      {jp:'おもしろい', romaji:'omoshiroi', en:'interesting / fun', tags:['L3','adjectives-l3','taught','l3-3','L4','adjectives-l4','adjectives'], altForm:'面白い', altIsStandard:true, dateAdded:'2026-10-13'},
      {jp:'いい', romaji:'ii', en:'good', tags:['L3','adjectives-l3','taught','l3-3','genki','genki-1-3','L4','adjectives-l4','adjectives'], dateAdded:'2026-10-13'},
      {jp:'かっこいい', romaji:'kakkoii', en:'cool / stylish', tags:['L3','adjectives-l3','taught','l3-3','L4','adjectives-l4','adjectives'], dateAdded:'2026-10-13'},
      {jp:'きれい', romaji:'kirei', en:'beautiful / pretty', tags:['L3','adjectives-l3','taught','l3-3','L4','adjectives-l4','adjectives','adj-na'], altForm:'綺麗', dateAdded:'2026-10-13'},
      {jp:'すてき', romaji:'suteki', en:'lovely / wonderful', tags:['L3','adjectives-l3','taught','l3-3','L4','adjectives-l4','adjectives','adj-na'], altForm:'素敵', dateAdded:'2026-10-13'},
      // From class: cold to the touch (drinks, water, hands) - さむい is cold weather.
      {jp:'つめたい', romaji:'tsumetai', en:'cold (to the touch)', tags:['L3','adjectives-l3','taught','l3-3','L4','adjectives-l4','adjectives'], altForm:'冷たい', altIsStandard:true, dateAdded:'2026-10-13'},
      // Lesson 4 (2026-10-20). あかい / しろい from the gifts to avoid (red flowers, a white handkerchief).
      {jp:'すごい', romaji:'sugoi', en:'amazing / great', tags:['L3','adjectives-l3','taught','l3-4','L4','adjectives-l4','adjectives'], altForm:'凄い', dateAdded:'2026-10-20'},
      {jp:'あかい', romaji:'akai', en:'red', tags:['L3','adjectives-l3','taught','l3-4','L4','adjectives-l4','adjectives'], altForm:'赤い', altIsStandard:true, dateAdded:'2026-10-20'},
      {jp:'しろい', romaji:'shiroi', en:'white', tags:['L3','adjectives-l3','taught','l3-4','L4','adjectives-l4','adjectives'], altForm:'白い', altIsStandard:true, dateAdded:'2026-10-20'},
    ],
  },
  // Lesson 3: inviting, arranging to meet, and set phrases for gifts.
  // ええ/ちょっと/じゃあ/どうですか/いい/デート were in the private Genki pack
  // (same jp|en, so scores carry over) and were removed from it.
  'vocab-phrases-l3': {
    level: 3,
    hasReference: true,
    label: 'Phrases & replies',
    chars: 'いっしょに いいですね ちょっと…',
    tagQuery: ['L3','phrases-l3'],
    items: [
      {jp:'いっしょに', romaji:'issho ni', en:'together', tags:['L3','phrases-l3','taught','l3-3'], altForm:'一緒に', altIsStandard:true, dateAdded:'2026-10-13'},
      {jp:'ええ', romaji:'ee', en:'yes (softer than はい)', tags:['L3','phrases-l3','taught','l3-3','genki','genki-1-3'], dateAdded:'2026-10-13'},
      {jp:'ちょっと', romaji:'chotto', en:'a little', tags:['L3','phrases-l3','taught','l3-3','genki','genki-1-3'], dateAdded:'2026-10-13'},
      {jp:'〜は ちょっと…', romaji:'~wa chotto...', en:'…is a bit… (polite no)', tags:['L3','phrases-l3','taught','l3-3'], dateAdded:'2026-10-13'},
      {jp:'いいですね', romaji:'ii desu ne', en:'that sounds good', tags:['L3','phrases-l3','taught','l3-3'], dateAdded:'2026-10-13'},
      {jp:'いいですよ', romaji:'ii desu yo', en:'that\'s fine (agreeing)', tags:['L3','phrases-l3','taught','l3-3'], dateAdded:'2026-10-13'},
      {jp:'わかりました', romaji:'wakarimashita', en:'understood / OK', tags:['L3','phrases-l3','taught','l3-3'], dateAdded:'2026-10-13'},
      {jp:'じゃあ', romaji:'jaa', en:'well then / in that case', tags:['L3','phrases-l3','taught','l3-3','genki','genki-1-2'], dateAdded:'2026-10-13'},
      {jp:'どうですか', romaji:'dou desu ka', en:'how about …? / how is …?', tags:['L3','phrases-l3','taught','l3-3','genki','genki-1-3'], dateAdded:'2026-10-13'},
      {jp:'よかったですね', romaji:'yokatta desu ne', en:'that\'s nice! / good for you', tags:['L3','phrases-l3','taught','l3-3'], dateAdded:'2026-10-13'},
      {jp:'こちらこそ', romaji:'kochira koso', en:'likewise (me too)', tags:['L3','phrases-l3','taught','l3-3'], dateAdded:'2026-10-13'},
      {jp:'これから よろしく おねがいします', romaji:'korekara yoroshiku onegaishimasu', en:'I look forward to knowing you (new neighbours)', tags:['L3','phrases-l3','taught','l3-3'], dateAdded:'2026-10-13'},
      {jp:'ひっこしの ごあいさつです', romaji:'hikkoshi no goaisatsu desu', en:'a hello gift - I\'ve just moved in', tags:['L3','phrases-l3','taught','l3-3'], dateAdded:'2026-10-13'},
      {jp:'これ、おみやげです', romaji:'kore, omiyage desu', en:'this is a souvenir (for you)', tags:['L3','phrases-l3','taught','l3-3'], dateAdded:'2026-10-13'},
      // Lesson 4 (2026-10-20): visiting a friend's home.
      {jp:'いらっしゃい', romaji:'irasshai', en:'welcome! (to my home)', tags:['L3','phrases-l3','taught','l3-4'], dateAdded:'2026-10-20'},
      {jp:'どうぞ おあがりください', romaji:'douzo oagari kudasai', en:'please come in (step up inside)', tags:['L3','phrases-l3','taught','l3-4'], altForm:'どうぞ お上がりください', altIsStandard:true, dateAdded:'2026-10-20'},
      {jp:'おじゃまします', romaji:'ojama shimasu', en:'sorry to intrude (said entering a home)', tags:['L3','phrases-l3','taught','l3-4'], altForm:'お邪魔します', altIsStandard:true, dateAdded:'2026-10-20'},
      {jp:'〜は いかがですか', romaji:'~wa ikaga desu ka', en:'would you like …? (polite offer)', tags:['L3','phrases-l3','taught','l3-4'], dateAdded:'2026-10-20'},
      // Lesson 6 (2026-11-03)
      {jp:'じゃ', romaji:'ja', en:'well then', tags:['L3','phrases-l3','taught','l3-6'], dateAdded:'2026-11-03'},
    ],
  },
  // LEVEL 3 LESSON 4 (2026-10-20): occasions for giving presents (たんじょうびに…).
  // Tagged forward: たんじょうび (L2), ハロウィン (L3 General), and おしょうがつ /
  // クリスマス (were untaught tourist words). おしょうがつ re-glossed to tell it
  // apart from しんねん (it had no course score to lose).
  'vocab-occasions-l3': {
    level: 3,
    hasReference: true,
    label: 'Occasions',
    chars: 'たんじょうび クリスマス おみまい…',
    tagQuery: ['L3','occasions-l3'],
    items: [
      {jp:'しんねん', romaji:'shinnen', en:'New Year (the new year)', tags:['L3','occasions-l3','taught','l3-4'], altForm:'新年', altIsStandard:true, dateAdded:'2026-10-20'},
      {jp:'バレンタインデー', romaji:'barentaindee', en:'Valentine\'s Day', tags:['L3','occasions-l3','taught','l3-4'], dateAdded:'2026-10-20'},
      {jp:'イースター', romaji:'iisutaa', en:'Easter', tags:['L3','occasions-l3','taught','l3-4'], dateAdded:'2026-10-20'},
      {jp:'ははのひ', romaji:'haha no hi', en:'Mother\'s Day', tags:['L3','occasions-l3','taught','l3-4'], altForm:'母の日', altIsStandard:true, dateAdded:'2026-10-20'},
      {jp:'ちちのひ', romaji:'chichi no hi', en:'Father\'s Day', tags:['L3','occasions-l3','taught','l3-4'], altForm:'父の日', altIsStandard:true, dateAdded:'2026-10-20'},
      {jp:'おみまい', romaji:'omimai', en:'visiting someone ill / a get-well gift', tags:['L3','occasions-l3','taught','l3-4'], altForm:'お見舞い', altIsStandard:true, dateAdded:'2026-10-20'},
      {jp:'けっこんいわい', romaji:'kekkon iwai', en:'wedding present', tags:['L3','occasions-l3','taught','l3-4'], altForm:'結婚祝い', altIsStandard:true, dateAdded:'2026-10-20'},
    ],
  },
  // LEVEL 3 LESSON 5 (2026-10-27, Minna no Nihongo ch.7): the tools and
  // devices used with tool で (はしで たべます, パソコンで かきます). Several
  // older words are tagged forward into it (て, ナイフ, えんぴつ, ペン,
  // はさみ, けいたい, スマホ, カップ). The sentence engine's SG_TOOLS uses them.
  'vocab-tools-l3': {
    level: 3,
    hasReference: true,
    label: 'Tools & devices',
    chars: 'はし フォーク はさみ…',
    tagQuery: ['L3','tools-l3'],
    items: [
      {jp:'はし', romaji:'hashi', en:'chopsticks', tags:['L3','tools-l3','objects','taught','l3-5'], altForm:'箸', altIsStandard:true, dateAdded:'2026-10-27'},
      {jp:'フォーク', romaji:'fooku', en:'fork', tags:['L3','tools-l3','objects','taught','l3-5'], dateAdded:'2026-10-27'},
      {jp:'スプーン', romaji:'supuun', en:'spoon', tags:['L3','tools-l3','objects','taught','l3-5'], dateAdded:'2026-10-27'},
      {jp:'トング', romaji:'tongu', en:'tongs', tags:['L3','tools-l3','objects','taught','l3-5'], dateAdded:'2026-10-27'},
      {jp:'はしおき', romaji:'hashioki', en:'chopstick rest', tags:['L3','tools-l3','objects','taught','l3-5'], altForm:'箸置き', altIsStandard:true, dateAdded:'2026-10-27'},
      {jp:'コップ', romaji:'koppu', en:'glass / tumbler', tags:['L3','tools-l3','objects','taught','l3-5'], dateAdded:'2026-10-27'},
      {jp:'しお', romaji:'shio', en:'salt', tags:['L3','tools-l3','food-type','taught','l3-5'], altForm:'塩', altIsStandard:true, dateAdded:'2026-10-27'},
      {jp:'こしょう', romaji:'koshou', en:'pepper', tags:['L3','tools-l3','food-type','taught','l3-5'], altForm:'胡椒', dateAdded:'2026-10-27'},
      {jp:'ふで', romaji:'fude', en:'calligraphy brush', tags:['L3','tools-l3','objects','taught','l3-5'], altForm:'筆', altIsStandard:true, dateAdded:'2026-10-27'},
      {jp:'シャーペン', romaji:'shaapen', en:'mechanical pencil', tags:['L3','tools-l3','objects','taught','l3-5'], dateAdded:'2026-10-27'},
      {jp:'ほうちょう', romaji:'houchou', en:'kitchen knife', tags:['L3','tools-l3','objects','taught','l3-5'], altForm:'包丁', altIsStandard:true, dateAdded:'2026-10-27'},
      {jp:'ピザカッター', romaji:'piza kattaa', en:'pizza cutter', tags:['L3','tools-l3','objects','taught','l3-5'], dateAdded:'2026-10-27'},
      {jp:'かみ', romaji:'kami', en:'paper', tags:['L3','tools-l3','objects','taught','l3-5','homophones-l3'], altForm:'紙', altIsStandard:true, dateAdded:'2026-10-27'},
      {jp:'メモ', romaji:'memo', en:'note / memo', tags:['L3','tools-l3','objects','taught','l3-5'], dateAdded:'2026-10-27'},
      {jp:'でんごん', romaji:'dengon', en:'message (left for someone)', tags:['L3','tools-l3','taught','l3-5'], altForm:'伝言', altIsStandard:true, dateAdded:'2026-10-27'},
      {jp:'パソコン', romaji:'pasokon', en:'computer / laptop', tags:['L3','tools-l3','objects','taught','l3-5'], dateAdded:'2026-10-27'},
      {jp:'タブレット', romaji:'taburetto', en:'tablet', tags:['L3','tools-l3','objects','taught','l3-5'], dateAdded:'2026-10-27'},
      // Lesson 6 (2026-11-03): stationery from the 〜は にほんごで なんですか practice
      {jp:'パンチ', romaji:'panchi', en:'hole punch', tags:['L3','tools-l3','loanwords-l3','objects','taught','l3-6'], dateAdded:'2026-11-03'},
      {jp:'セロテープ', romaji:'seroteepu', en:'sticky tape', tags:['L3','tools-l3','loanwords-l3','objects','taught','l3-6'], dateAdded:'2026-11-03'},
      {jp:'けしゴム', romaji:'keshigomu', en:'eraser', tags:['L3','tools-l3','objects','taught','l3-6'], altForm:'消しゴム', altIsStandard:true, dateAdded:'2026-11-03'},
    ],
  },
  // Lesson 5: Japanese-made English (和製英語) - the "〜は えいごで なんですか"
  // practice. Tagged forward: コンセント, レンジ, コインランドリー, フライドポテト.
  'vocab-loanwords-l3': {
    level: 3,
    hasReference: true,
    label: 'Japanese-made English',
    chars: 'マンション レンジ ホッチキス…',
    tagQuery: ['L3','loanwords-l3'],
    items: [
      {jp:'レントゲン', romaji:'rentogen', en:'X-ray', tags:['L3','loanwords-l3','taught','l3-5'], dateAdded:'2026-10-27'},
      {jp:'バイキング', romaji:'baikingu', en:'all-you-can-eat buffet', tags:['L3','loanwords-l3','taught','l3-5'], dateAdded:'2026-10-27'},
      {jp:'カンニング', romaji:'kanningu', en:'cheating (in an exam)', tags:['L3','loanwords-l3','taught','l3-5'], dateAdded:'2026-10-27'},
      {jp:'ペットボトル', romaji:'petto botoru', en:'plastic drinks bottle', tags:['L3','loanwords-l3','objects','taught','l3-5'], dateAdded:'2026-10-27'},
      {jp:'ホッチキス', romaji:'hocchikisu', en:'stapler', tags:['L3','loanwords-l3','objects','taught','l3-5'], dateAdded:'2026-10-27'},
      {jp:'エコバッグ', romaji:'eko baggu', en:'reusable shopping bag', tags:['L3','loanwords-l3','objects','taught','l3-5'], dateAdded:'2026-10-27'},
      {jp:'アンケート', romaji:'ankeeto', en:'survey / questionnaire', tags:['L3','loanwords-l3','taught','l3-5'], dateAdded:'2026-10-27'},
      {jp:'テレワーク', romaji:'terewaaku', en:'working from home', tags:['L3','loanwords-l3','taught','l3-5'], dateAdded:'2026-10-27'},
      {jp:'パーカー', romaji:'paakaa', en:'hoodie', tags:['L3','loanwords-l3','objects','taught','l3-5'], dateAdded:'2026-10-27'},
      {jp:'ビニールぶくろ', romaji:'biniiru bukuro', en:'plastic bag', tags:['L3','loanwords-l3','objects','taught','l3-5'], altForm:'ビニール袋', altIsStandard:true, dateAdded:'2026-10-27'},
      {jp:'シール', romaji:'shiiru', en:'sticker', tags:['L3','loanwords-l3','objects','taught','l3-5'], dateAdded:'2026-10-27'},
      {jp:'ワンピース', romaji:'wanpiisu', en:'dress', tags:['L3','loanwords-l3','objects','taught','l3-5'], dateAdded:'2026-10-27'},
      {jp:'ワイシャツ', romaji:'waishatsu', en:'dress shirt', tags:['L3','loanwords-l3','objects','taught','l3-5'], dateAdded:'2026-10-27'},
      {jp:'ベビーカー', romaji:'bebiikaa', en:'pushchair', tags:['L3','loanwords-l3','taught','l3-5'], dateAdded:'2026-10-27'},
      {jp:'ワクチン', romaji:'wakuchin', en:'vaccine', tags:['L3','loanwords-l3','taught','l3-5'], dateAdded:'2026-10-27'},
      {jp:'マンション', romaji:'manshon', en:'block of flats / a flat', tags:['L3','loanwords-l3','taught','l3-5'], dateAdded:'2026-10-27'},
      {jp:'アルバイト', romaji:'arubaito', en:'part-time job', tags:['L3','loanwords-l3','taught','l3-5'], dateAdded:'2026-10-27'},
      {jp:'モーニングサービス', romaji:'mooningu saabisu', en:'breakfast set (at a café)', tags:['L3','loanwords-l3','taught','l3-5'], dateAdded:'2026-10-27'},
      {jp:'ハイタッチ', romaji:'haitacchi', en:'high five', tags:['L3','loanwords-l3','taught','l3-5'], dateAdded:'2026-10-27'},
      {jp:'トランプ', romaji:'toranpu', en:'playing cards', tags:['L3','loanwords-l3','objects','taught','l3-5'], dateAdded:'2026-10-27'},
      {jp:'ガソリンスタンド', romaji:'gasorin sutando', en:'petrol station', tags:['L3','loanwords-l3','taught','l3-5'], dateAdded:'2026-10-27'},
    ],
  },
  // Lesson 6 (2026-11-04): words that sound the same. Kept AFTER the
  // categories that hold かみ = paper (tools) and かります = borrow (verbs), so
  // the sentence engine's lookup (first taught match) still finds those.
  'vocab-homophones-l3': {
    level: 3,
    hasReference: true,
    label: 'Same sound, different word',
    chars: 'かみ かみ かみ…',
    tagQuery: ['L3','homophones-l3'],
    items: [
      {jp:'かみ', romaji:'kami', en:'hair (on your head)', tags:['L3','homophones-l3','taught','l3-6'], altForm:'髪', altIsStandard:true, dateAdded:'2026-11-04'},
      {jp:'かみ', romaji:'kami', en:'god', tags:['L3','homophones-l3','taught','l3-6'], altForm:'神', altIsStandard:true, dateAdded:'2026-11-04'},
      {jp:'かります', romaji:'karimasu', en:'to hunt / to pick (もみじがり, いちごがり)', tags:['L3','homophones-l3','verbs-l3','taught','l3-6'], altForm:'狩ります', altIsStandard:true, dateAdded:'2026-11-04'},
    ],
  },
  // ==== LEVEL 4 (2026-11-04) ====
  // Lesson 8 of Minna no Nihongo (adjectives), added AHEAD of the class from
  // the textbook's usual Lesson 8 list so Andrew meets them first. Tagged
  // l4-preview: when the real handout arrives, reconcile (keep, re-gloss or
  // move) and drop the tag. adj-na marks な-adjectives (the engine and the
  // Adjective forms drill read it); everything else tagged adjectives is an
  // い-adjective. Older adjectives are tagged forward into adjectives-l4 too,
  // so all the adjectives drill together.
  'vocab-adjectives-l4': {
    level: 4,
    hasReference: true,
    label: 'Adjectives',
    chars: 'おおきい きれい しずか…',
    tagQuery: ['L4','adjectives-l4'],
    items: [
      {jp:'ハンサム', romaji:'hansamu', en:'handsome', tags:['L4','adjectives-l4','adjectives','adj-na','taught','l4-1','l4-preview'], dateAdded:'2026-11-04'},
      {jp:'しずか', romaji:'shizuka', en:'quiet', tags:['L4','adjectives-l4','adjectives','adj-na','taught','l4-1','l4-preview'], altForm:'静か', altIsStandard:true, dateAdded:'2026-11-04'},
      {jp:'にぎやか', romaji:'nigiyaka', en:'lively, busy (of a place)', tags:['L4','adjectives-l4','adjectives','adj-na','taught','l4-1','l4-preview'], dateAdded:'2026-11-04'},
      {jp:'ゆうめい', romaji:'yuumei', en:'famous', tags:['L4','adjectives-l4','adjectives','adj-na','taught','l4-1','l4-preview'], altForm:'有名', altIsStandard:true, dateAdded:'2026-11-04'},
      {jp:'しんせつ', romaji:'shinsetsu', en:'kind, helpful', tags:['L4','adjectives-l4','adjectives','adj-na','taught','l4-1','l4-preview'], altForm:'親切', altIsStandard:true, dateAdded:'2026-11-04'},
      {jp:'げんき', romaji:'genki', en:'well, energetic', tags:['L4','adjectives-l4','adjectives','adj-na','taught','l4-1','l4-preview'], altForm:'元気', altIsStandard:true, dateAdded:'2026-11-04'},
      {jp:'ひま', romaji:'hima', en:'free (not busy)', tags:['L4','adjectives-l4','adjectives','adj-na','taught','l4-1','l4-preview'], altForm:'暇', altIsStandard:true, dateAdded:'2026-11-04'},
      {jp:'べんり', romaji:'benri', en:'convenient', tags:['L4','adjectives-l4','adjectives','adj-na','taught','l4-1','l4-preview'], altForm:'便利', altIsStandard:true, dateAdded:'2026-11-04'},
      {jp:'わるい', romaji:'warui', en:'bad', tags:['L4','adjectives-l4','adjectives','taught','l4-1','l4-preview'], altForm:'悪い', altIsStandard:true, dateAdded:'2026-11-04'},
      {jp:'むずかしい', romaji:'muzukashii', en:'difficult', tags:['L4','adjectives-l4','adjectives','taught','l4-1','l4-preview'], altForm:'難しい', altIsStandard:true, dateAdded:'2026-11-04'},
      {jp:'やさしい', romaji:'yasashii', en:'easy / kind (people)', tags:['L4','adjectives-l4','adjectives','taught','l4-1','l4-preview'], altForm:'易しい', altIsStandard:true, dateAdded:'2026-11-04'},
      {jp:'ひくい', romaji:'hikui', en:'low, short (height)', tags:['L4','adjectives-l4','adjectives','taught','l4-1','l4-preview'], altForm:'低い', altIsStandard:true, dateAdded:'2026-11-04'},
      {jp:'たのしい', romaji:'tanoshii', en:'fun, enjoyable', tags:['L4','adjectives-l4','adjectives','taught','l4-1','l4-preview'], altForm:'楽しい', altIsStandard:true, dateAdded:'2026-11-04'},
      {jp:'くろい', romaji:'kuroi', en:'black', tags:['L4','adjectives-l4','adjectives','taught','l4-1','l4-preview'], altForm:'黒い', altIsStandard:true, dateAdded:'2026-11-04'},
      {jp:'あおい', romaji:'aoi', en:'blue', tags:['L4','adjectives-l4','adjectives','taught','l4-1','l4-preview'], altForm:'青い', altIsStandard:true, dateAdded:'2026-11-04'},
    ],
  },
  'vocab-general-l4': {
    level: 4,
    hasReference: true,
    label: 'General vocabulary',
    chars: 'とても ところ さくら…',
    tagQuery: ['L4','general-l4'],
    items: [
      {jp:'ひと', romaji:'hito', en:'person', tags:['L4','general-l4','taught','l4-1','l4-preview'], altForm:'人', altIsStandard:true, dateAdded:'2026-11-04'},
      {jp:'さくら', romaji:'sakura', en:'cherry blossom', tags:['L4','general-l4','taught','l4-1','l4-preview'], altForm:'桜', altIsStandard:true, dateAdded:'2026-11-04'},
      {jp:'ところ', romaji:'tokoro', en:'place', tags:['L4','general-l4','taught','l4-1','l4-preview'], altForm:'所', altIsStandard:true, dateAdded:'2026-11-04'},
      {jp:'せいかつ', romaji:'seikatsu', en:'(daily) life', tags:['L4','general-l4','taught','l4-1','l4-preview'], altForm:'生活', altIsStandard:true, dateAdded:'2026-11-04'},
      {jp:'とても', romaji:'totemo', en:'very', tags:['L4','general-l4','taught','l4-1','l4-preview'], dateAdded:'2026-11-04'},
      {jp:'〜が', romaji:'~ga', en:'but (〜ですが、〜です)', tags:['L4','general-l4','taught','l4-1','l4-preview'], dateAdded:'2026-11-04'},
      {jp:'そろそろ しつれいします', romaji:'sorosoro shitsurei shimasu', en:'I should be going (politely leaving)', tags:['L4','general-l4','phrases-l4','taught','l4-1','l4-preview'], dateAdded:'2026-11-04'},
      {jp:'また いらっしゃって ください', romaji:'mata irasshatte kudasai', en:'please come again', tags:['L4','general-l4','phrases-l4','taught','l4-1','l4-preview'], dateAdded:'2026-11-04'},
    ],
  },
  // みず (water) moved out to Level 2's General vocabulary in Week 6, now
  // that the lesson covers it - see the relocation note there. Lesson
  // content takes precedence over Trip/Andrew tier once something's been
  // formally taught, so it only needs to exist in one place.
  // standaloneCard: false (2026-08-27) - default is true (every category
  // gets its own tile), explicitly turned off here. NOT the same thing as
  // "this word data is retired" - all 23 words already carry a real
  // purpose tag (adjectives/food-drink/emergency/places/shopping/stations,
  // see below) and are still fully drillable through those Collections/
  // combined tags. Checked first: nothing else references this category
  // except the also-removed theme-survival-vocab (deleted outright, not
  // flagged - it was a pure view with no storage of its own, unlike this).
  // `items` below is left completely untouched and is still the one
  // physical home for these words. Every scan that reads by tag
  // (resolveVocabCategory, getThemePool, scanVocabByTag, the Trip random
  // pool) has no idea this flag exists and keeps including these words
  // exactly as before - nothing about the words changed, only whether this
  // specific category still gets its own tile in the list.
  // DEAD includeItems REMOVED (2026-08-31) - this category retired as its
  // own tile back on 2026-08-27 (standaloneCard:false below), so nothing
  // has called resolveVocabCategory('vocab-trip-prep') for tile-selection
  // purposes since then; its old includeItems array (きっぷ/kippu from
  // Materials — Stations, のみもの/nomimono from Materials — Hotel:
  // Appliances) had been unreachable ever since, just still sitting in the
  // data. Both referenced words are still exactly where they always were
  // and still fully drillable through their own real categories/tags -
  // nothing about the words themselves changed, only this dead reference
  // to them.
  'vocab-trip-prep': {
    level: 'untaught',
    hasReference: true,
    standaloneCard: false,
    label: 'Useful words for the trip',
    chars: 'すし きっぷ たすけて…',
    items: [
      {jp:'おおきい', romaji:'ookii', en:'big', tags:['trip','adjectives','taught','curated','te-shops','tourist','L4','adjectives-l4','l4-1'], source: {location: 'Curated - added as a useful word (no specific sighting logged)'}, dateAdded:'2026-08-01'},
      {jp:'やすい', romaji:'yasui', en:'cheap', tags:['trip','adjectives','taught','curated','te-shops','tourist','L4','adjectives-l4','l4-1'], source: {location: 'Curated - added as a useful word (no specific sighting logged)'}, dateAdded:'2026-08-01'},
      // のみもの moved to vocab-materials-hotel-appliances (real-world
      // evidenced copy, seen as a microwave preset button) - not
      // duplicated here, drillable from its real home instead.
      {jp:'いりぐち', romaji:'iriguchi', en:'entrance', tags:['trip','stations','taught','curated','te-around','L3','places-l3','l3-3','tourist'], source: {location: 'Curated - added as a useful word (no specific sighting logged)'}, dateAdded:'2026-08-01'},
      {jp:'でぐち', romaji:'deguchi', en:'exit', tags:['trip','stations','taught','curated','te-around','L3','places-l3','l3-3','tourist'], altForm:'出口', altIsStandard:true, source: {location: 'Curated - added as a useful word (no specific sighting logged)'}, dateAdded:'2026-08-01'},
      {jp:'たかい', romaji:'takai', en:'expensive / tall, high', tags:['trip','adjectives','taught','curated','genki','genki-1-2','te-shops','tourist','L4','adjectives-l4','l4-1'], source: {location: 'Curated - added as a useful word (no specific sighting logged)'}, dateAdded:'2026-08-01'},
      {jp:'たべもの', romaji:'tabemono', en:'food', tags:['trip','food-drink','taught','curated','food-type','L3','food-drink-l3','l3-1','te-food','tourist'], source: {location: 'Curated - added as a useful word (no specific sighting logged)'}, dateAdded:'2026-08-01'},
      {jp:'おちゃ', romaji:'ocha', en:'green tea', tags:['trip','food-drink','taught','curated','drink','L3','food-drink-l3','l3-1','genki','genki-1-3','te-food','tourist'], source: {location: 'Curated - added as a useful word (no specific sighting logged)'}, dateAdded:'2026-08-01'},
      {jp:'たすけて', romaji:'tasukete', en:'help!', tags:['phrase','trip','emergency','untaught','curated','te-phrases','tourist'], source: {location: 'Curated - added as a useful word (no specific sighting logged)'}, dateAdded:'2026-08-01'},
      {jp:'いたい', romaji:'itai', en:'it hurts / ouch', tags:['trip','emergency','untaught','curated','te-health','tourist'], source: {location: 'Curated - added as a useful word (no specific sighting logged)'}, dateAdded:'2026-08-01'},
      {jp:'くすり', romaji:'kusuri', en:'medicine', tags:['trip','emergency','taught','curated','L3','food-drink-l3','l3-1','te-health','tourist'], source: {location: 'Curated - added as a useful word (no specific sighting logged)'}, dateAdded:'2026-08-01'},
      {jp:'けいさつ', romaji:'keisatsu', en:'police', tags:['trip','emergency','untaught','curated','te-health','tourist'], source: {location: 'Curated - added as a useful word (no specific sighting logged)'}, dateAdded:'2026-08-01'},
      {jp:'ラーメン', romaji:'raamen', en:'ramen', tags:['trip','food-drink','taught','curated','food-type','L3','food-drink-l3','l3-1','te-food','tourist'], altForm:'らーめん', source: {location: 'Curated - added as a useful word (no specific sighting logged)'}, dateAdded:'2026-08-01'},
      {jp:'やすみ', romaji:'yasumi', en:'rest / day off / closed', tags:['trip','places','untaught','curated','te-weather','tourist'], source: {location: 'Curated - added as a useful word (no specific sighting logged)'}, dateAdded:'2026-08-01'},
      {jp:'さけ', romaji:'sake', en:'sake / alcohol', tags:['trip','food-drink','untaught','curated','drink','te-food','tourist'], source: {location: 'Curated - added as a useful word (no specific sighting logged)'}, dateAdded:'2026-08-01'},
      {jp:'みせ', romaji:'mise', en:'shop', tags:['trip','shopping','untaught','curated','te-shops','tourist'], source: {location: 'Curated - added as a useful word (no specific sighting logged)'}, dateAdded:'2026-08-01'},
      {jp:'ちいさい', romaji:'chiisai', en:'small', tags:['trip','adjectives','taught','curated','te-shops','tourist','L4','adjectives-l4','l4-1'], source: {location: 'Curated - added as a useful word (no specific sighting logged)'}, dateAdded:'2026-08-01'},
      {jp:'そば', romaji:'soba', en:'soba noodles', tags:['trip','food-drink','taught','curated','food-type','te-food','L3','food-drink-l3','l3-3','tourist'], source: {location: 'Curated - added as a useful word (no specific sighting logged)'}, dateAdded:'2026-08-01'},
      // altForm added 2026-08-15 - お土産 seen on real signage (batch 6 part
      // 2, Osaka hotel lobby), same "fold the real form in rather than
      // duplicate" call made for ちかてつ/バスてい in batch 6 part 1.
      {jp:'おみやげ', romaji:'omiyage', en:'souvenir', tags:['trip','shopping','taught','curated','te-shops','L3','gifts-l3','l3-3','tourist'], altForm:'お土産', altIsStandard:true, source: {location: 'Curated - added as a useful word (no specific sighting logged)'}, dateAdded:'2026-08-01'},
      {jp:'すし', romaji:'sushi', en:'sushi', tags:['trip','food-drink','curated','food-type','taught','L3','food-drink-l3','l3-2','te-food','tourist'], source: {location: 'Curated - added as a useful word (no specific sighting logged)'}, dateAdded:'2026-08-01'},
      {jp:'てんぷら', romaji:'tenpura', en:'tempura', tags:['trip','food-drink','taught','curated','food-type','L3','food-drink-l3','l3-1','te-food','tourist'], source: {location: 'Curated - added as a useful word (no specific sighting logged)'}, dateAdded:'2026-08-01'},
      // きっぷ moved out - the same word, kanji form already folded in, is
      // stored (and drillable) under Materials — Stations instead, not
      // duplicated here.
      {jp:'まち', romaji:'machi', en:'town', tags:['trip','places','taught','curated','te-around','tourist','L4','general-l4','l4-1'], source: {location: 'Curated - added as a useful word (no specific sighting logged)'}, dateAdded:'2026-08-01'},
      {jp:'のりかえ', romaji:'norikae', en:'transfer / change trains', tags:['trip','stations','untaught','curated','te-around','tourist'], source: {location: 'Curated - added as a useful word (no specific sighting logged)'}, dateAdded:'2026-08-01'},
      {jp:'うどん', romaji:'udon', en:'udon noodles', tags:['trip','food-drink','taught','curated','food-type','te-food','L3','food-drink-l3','l3-3','tourist'], source: {location: 'Curated - added as a useful word (no specific sighting logged)'}, dateAdded:'2026-08-01'},
      // Tourist essentials additions (2026-10-11) - Little words (te-little) and Hotel & travel kit (te-hotel), from the Portuguese-test gap list.
      {jp:'たぶん', romaji:'tabun', en:'maybe / probably', tags:['trip','te-little','taught','curated','L3','phrases-l3','l3-3','tourist'], altForm:'多分', altIsStandard:true, source: {location: 'Curated - added as a useful word (no specific sighting logged)'}, dateAdded:'2026-10-11'},
      {jp:'もちろん', romaji:'mochiron', en:'of course', tags:['trip','te-little','untaught','curated','tourist'], source: {location: 'Curated - added as a useful word (no specific sighting logged)'}, dateAdded:'2026-10-11'},
      {jp:'なるほど', romaji:'naruhodo', en:'I see', tags:['trip','te-little','untaught','curated','tourist'], source: {location: 'Curated - added as a useful word (no specific sighting logged)'}, dateAdded:'2026-10-11'},
      {jp:'そうですね', romaji:'sou desu ne', en:'that\'s right / let me see', tags:['trip','te-little','untaught','curated','genki','genki-1-3','tourist'], source: {location: 'Curated - added as a useful word (no specific sighting logged)'}, dateAdded:'2026-10-11'},
      {jp:'そうですか', romaji:'sou desu ka', en:'is that so? / I see', tags:['trip','te-little','untaught','curated','tourist'], source: {location: 'Curated - added as a useful word (no specific sighting logged)'}, dateAdded:'2026-10-11'},
      {jp:'ほんとうですか', romaji:'hontou desu ka', en:'really?', tags:['trip','te-little','untaught','curated','tourist'], altForm:'本当ですか', altIsStandard:true, source: {location: 'Curated - added as a useful word (no specific sighting logged)'}, dateAdded:'2026-10-11'},
      {jp:'えーと', romaji:'eeto', en:'um, let me think', tags:['trip','te-little','untaught','curated','tourist'], source: {location: 'Curated - added as a useful word (no specific sighting logged)'}, dateAdded:'2026-10-11'},
      {jp:'あのう', romaji:'anou', en:'um, excuse me (getting attention)', tags:['trip','te-little','untaught','curated','tourist'], source: {location: 'Curated - added as a useful word (no specific sighting logged)'}, dateAdded:'2026-10-11'},
      {jp:'ところで', romaji:'tokoro de', en:'by the way', tags:['trip','te-little','untaught','curated','tourist'], source: {location: 'Curated - added as a useful word (no specific sighting logged)'}, dateAdded:'2026-10-11'},
      {jp:'はんぶん', romaji:'hanbun', en:'half', tags:['trip','te-little','untaught','curated','tourist'], altForm:'半分', altIsStandard:true, source: {location: 'Curated - added as a useful word (no specific sighting logged)'}, dateAdded:'2026-10-11'},
      {jp:'もっと', romaji:'motto', en:'more', tags:['trip','te-little','untaught','curated','tourist'], source: {location: 'Curated - added as a useful word (no specific sighting logged)'}, dateAdded:'2026-10-11'},
      {jp:'すこし', romaji:'sukoshi', en:'a little', tags:['trip','te-little','untaught','curated','tourist'], altForm:'少し', altIsStandard:true, source: {location: 'Curated - added as a useful word (no specific sighting logged)'}, dateAdded:'2026-10-11'},
      {jp:'たくさん', romaji:'takusan', en:'a lot', tags:['trip','te-little','untaught','curated','tourist'], source: {location: 'Curated - added as a useful word (no specific sighting logged)'}, dateAdded:'2026-10-11'},
      {jp:'ぜんぶ', romaji:'zenbu', en:'all / everything', tags:['trip','te-little','untaught','curated','tourist'], altForm:'全部', altIsStandard:true, source: {location: 'Curated - added as a useful word (no specific sighting logged)'}, dateAdded:'2026-10-11'},
      {jp:'じゅうぶん', romaji:'juubun', en:'enough', tags:['trip','te-little','untaught','curated','tourist'], altForm:'十分', altIsStandard:true, source: {location: 'Curated - added as a useful word (no specific sighting logged)'}, dateAdded:'2026-10-11'},
      {jp:'まだです', romaji:'mada desu', en:'not yet', tags:['trip','te-little','untaught','curated','tourist'], source: {location: 'Curated - added as a useful word (no specific sighting logged)'}, dateAdded:'2026-10-11'},
      {jp:'あとで', romaji:'ato de', en:'later', tags:['trip','te-little','taught','curated','tourist','L3','frequency-l3','time-l3','l3-6'], altForm:'後で', altIsStandard:true, source: {location: 'Curated - added as a useful word (no specific sighting logged)'}, dateAdded:'2026-10-11'},
      {jp:'もうすぐ', romaji:'mou sugu', en:'soon', tags:['trip','te-little','untaught','curated','tourist'], source: {location: 'Curated - added as a useful word (no specific sighting logged)'}, dateAdded:'2026-10-11'},
      {jp:'おなかが すきました', romaji:'onaka ga sukimashita', en:'I\'m hungry', tags:['trip','te-little','untaught','curated','tourist'], source: {location: 'Curated - added as a useful word (no specific sighting logged)'}, dateAdded:'2026-10-11'},
      {jp:'のどが かわきました', romaji:'nodo ga kawakimashita', en:'I\'m thirsty', tags:['trip','te-little','untaught','curated','tourist'], source: {location: 'Curated - added as a useful word (no specific sighting logged)'}, dateAdded:'2026-10-11'},
      {jp:'ねむい', romaji:'nemui', en:'sleepy', tags:['trip','te-little','untaught','curated','tourist'], altForm:'眠い', altIsStandard:true, source: {location: 'Curated - added as a useful word (no specific sighting logged)'}, dateAdded:'2026-10-11'},
      {jp:'つかれました', romaji:'tsukaremashita', en:'I\'m tired', tags:['trip','te-little','untaught','curated','tourist'], altForm:'疲れました', altIsStandard:true, source: {location: 'Curated - added as a useful word (no specific sighting logged)'}, dateAdded:'2026-10-11'},
      {jp:'いそがしい', romaji:'isogashii', en:'busy', tags:['trip','te-little','taught','curated','tourist','L4','adjectives-l4','adjectives','l4-1'], altForm:'忙しい', altIsStandard:true, source: {location: 'Curated - added as a useful word (no specific sighting logged)'}, dateAdded:'2026-10-11'},
      {jp:'じゅうでんき', romaji:'juudenki', en:'charger', tags:['trip','te-hotel','untaught','curated','tourist'], altForm:'充電器', altIsStandard:true, source: {location: 'Curated - added as a useful word (no specific sighting logged)'}, dateAdded:'2026-10-11'},
      {jp:'コンセント', romaji:'konsento', en:'socket', tags:['trip','te-hotel','taught','curated','tourist','L3','loanwords-l3','l3-5'], source: {location: 'Curated - added as a useful word (no specific sighting logged)'}, dateAdded:'2026-10-11'},
      {jp:'へんかんプラグ', romaji:'henkan puragu', en:'plug adapter', tags:['trip','te-hotel','untaught','curated','tourist'], altForm:'変換プラグ', altIsStandard:true, source: {location: 'Curated - added as a useful word (no specific sighting logged)'}, dateAdded:'2026-10-11'},
      {jp:'モバイルバッテリー', romaji:'mobairu batterii', en:'power bank', tags:['trip','te-hotel','untaught','curated','tourist'], source: {location: 'Curated - added as a useful word (no specific sighting logged)'}, dateAdded:'2026-10-11'},
      {jp:'パスワード', romaji:'pasuwaado', en:'password', tags:['trip','te-hotel','untaught','curated','tourist'], source: {location: 'Curated - added as a useful word (no specific sighting logged)'}, dateAdded:'2026-10-11'},
      {jp:'イヤホン', romaji:'iyahon', en:'earphones', tags:['trip','te-hotel','untaught','curated','tourist'], source: {location: 'Curated - added as a useful word (no specific sighting logged)'}, dateAdded:'2026-10-11'},
      {jp:'はブラシ', romaji:'haburashi', en:'toothbrush', tags:['trip','te-hotel','untaught','curated','tourist'], altForm:'歯ブラシ', altIsStandard:true, source: {location: 'Curated - added as a useful word (no specific sighting logged)'}, dateAdded:'2026-10-11'},
      {jp:'とうじょうけん', romaji:'toujouken', en:'boarding pass', tags:['trip','te-hotel','untaught','curated','tourist'], altForm:'搭乗券', altIsStandard:true, source: {location: 'Curated - added as a useful word (no specific sighting logged)'}, dateAdded:'2026-10-11'},
      {jp:'スーツケース', romaji:'suutsukeesu', en:'suitcase', tags:['trip','te-hotel','untaught','curated','tourist'], source: {location: 'Curated - added as a useful word (no specific sighting logged)'}, dateAdded:'2026-10-11'},
    ],
  },
  // First category built in what was originally the Andrew-mode staging
  // tier - graduated to level:'trip', and now merged with the rest of
  // Andrew/Trip into level:'untaught' (see showUntaught), gated but open
  // to anyone, not just Andrew. A few entries carry
  // altForm+altIsStandard where the
  // hiragana form genuinely collides with another word (さけ is also
  // "sake/alcohol" in vocab-trip-prep, たい is also "Thailand" in
  // vocab-countries) - the kanji disambiguates on the feedback screen.
  // Specific fish species deliberately have no kanji altForm even where one
  // exists (鮪, 海老 etc.) - those characters are obscure enough that real
  // menus almost always show them in kana/katakana instead.
  'vocab-food-drink': {
    level: 'untaught',
    hasReference: true,
    // standaloneCard: false (2026-08-31) - retired as its own tile now that
    // theme-food/-drink/-dining-phrases/-food-descriptions/-food-preparation
    // (the five-way split of what was theme-food-drink-combined, same day)
    // fully subsume it between them: all 36 items here carry `food-drink`.
    // Data stays exactly where it is, only the standalone tile goes away.
    // Its old includeItems array (menyuu/okawari from Materials —
    // Restaurants: Ordering & policy, shabushabu/sukiyaki from Materials —
    // Restaurants: Food & menu) was removed the same day - dead the moment
    // this retired, since nothing calls resolveVocabCategory on this key
    // for tile-selection any more; all four words are still exactly where
    // they always were and still fully drillable through their own real
    // categories/tags.
    standaloneCard: false,
    label: 'Food & drink',
    chars: 'ぎょうざ さしみ からい…',
    items: [
      {jp:'ぎゅうにく', romaji:'gyuuniku', en:'beef', tags:['food-drink','taught','curated','food-type','L3','food-drink-l3','l3-1','te-food','tourist'], altForm:'牛肉', altIsStandard:true, source: {location: 'Curated - added as a useful word (no specific sighting logged)'}, dateAdded:'2026-08-01'},
      {jp:'おべんとう', romaji:'obentou', en:'bento (boxed lunch)', tags:['food-drink','untaught','curated','food-type','te-food','tourist'], source: {location: 'Curated - added as a useful word (no specific sighting logged)'}, dateAdded:'2026-08-01'},
      {jp:'おかいけい おねがいします', romaji:'okaikei onegaishimasu', en:'bill, please', tags:['phrase','food-drink','untaught','curated','dining-phrase','te-phrases','tourist'], source: {location: 'Curated - added as a useful word (no specific sighting logged)'}, dateAdded:'2026-08-01'},
      {jp:'とりにく', romaji:'toriniku', en:'chicken (meat)', tags:['food-drink','taught','curated','food-type','L3','food-drink-l3','l3-1','te-food','tourist'], altForm:'鶏肉', altIsStandard:true, source: {location: 'Curated - added as a useful word (no specific sighting logged)'}, dateAdded:'2026-08-01'},
      {jp:'カレーライス', romaji:'kareeraisu', en:'curry rice', tags:['food-drink','untaught','curated','food-type','te-food','tourist'], altForm:'かれーらいす', source: {location: 'Curated - added as a useful word (no specific sighting logged)'}, dateAdded:'2026-08-01'},
      {jp:'おいしい', romaji:'oishii', en:'delicious / tasty', tags:['food-drink','taught','curated','food-adjective','genki','genki-1-2','te-food','tourist','L4','adjectives-l4','adjectives','l4-1'], source: {location: 'Curated - added as a useful word (no specific sighting logged)'}, dateAdded:'2026-08-01'},
      {jp:'デザート', romaji:'dezaato', en:'dessert', tags:['food-drink','untaught','curated','food-type','te-food','tourist'], altForm:'でざーと', source: {location: 'Curated - added as a useful word (no specific sighting logged)'}, dateAdded:'2026-08-01'},
      {jp:'ぎょうざ', romaji:'gyouza', en:'gyoza / dumplings', tags:['food-drink','taught','curated','food-type','L3','food-drink-l3','l3-1','te-food','tourist'], source: {location: 'Curated - added as a useful word (no specific sighting logged)'}, dateAdded:'2026-08-01'},
      {jp:'にほんしゅ', romaji:'nihonshu', en:'Japanese sake / rice wine', tags:['food-drink','untaught','curated','drink','te-food','tourist'], source: {location: 'Curated - added as a useful word (no specific sighting logged)'}, dateAdded:'2026-08-01'},
      {jp:'かつどん', romaji:'katsudon', en:'katsudon (pork cutlet rice bowl)', tags:['food-drink','untaught','curated','food-type','te-food','tourist'], source: {location: 'Curated - added as a useful word (no specific sighting logged)'}, dateAdded:'2026-08-01'},
      {jp:'ラム', romaji:'ramu', en:'lamb', tags:['food-drink','untaught','curated','food-type','te-food','tourist'], altForm:'らむ', source: {location: 'Curated - added as a useful word (no specific sighting logged)'}, dateAdded:'2026-08-01'},
      // メニュー moved out - stored (and drillable) under Materials —
      // Restaurants: Ordering & policy instead, which already had its own
      // seenAs; its hiragana altForm (めにゅー) was copied across there so
      // that doesn't get lost.
      {jp:'ミルク', romaji:'miruku', en:'milk', tags:['food-drink','untaught','curated','drink','te-food','tourist'], altForm:'みるく', source: {location: 'Curated - added as a useful word (no specific sighting logged)'}, dateAdded:'2026-08-01'},
      {jp:'みそしる', romaji:'misoshiru', en:'miso soup', tags:['food-drink','untaught','curated','food-type','te-food','tourist'], source: {location: 'Curated - added as a useful word (no specific sighting logged)'}, dateAdded:'2026-08-01'},
      {jp:'なべ', romaji:'nabe', en:'nabe / hot pot', tags:['food-drink','untaught','curated','food-type','te-food','tourist'], source: {location: 'Curated - added as a useful word (no specific sighting logged)'}, dateAdded:'2026-08-01'},
      {jp:'たこ', romaji:'tako', en:'octopus', tags:['food-drink','taught','curated','food-type','L3','food-drink-l3','l3-1','te-food','tourist'], source: {location: 'Curated - added as a useful word (no specific sighting logged)'}, dateAdded:'2026-08-01'},
      {jp:'おこのみやき', romaji:'okonomiyaki', en:'okonomiyaki (savoury pancake)', tags:['food-drink','untaught','curated','food-type','te-food','tourist'], source: {location: 'Curated - added as a useful word (no specific sighting logged)'}, dateAdded:'2026-08-01'},
      {jp:'おにぎり', romaji:'onigiri', en:'onigiri / rice ball', tags:['food-drink','untaught','curated','food-type','te-food','tourist'], source: {location: 'Curated - added as a useful word (no specific sighting logged)'}, dateAdded:'2026-08-01'},
      {jp:'ウーロンちゃ', romaji:'uuroncha', en:'oolong tea', tags:['food-drink','untaught','curated','drink','te-food','tourist'], source: {location: 'Curated - added as a useful word (no specific sighting logged)'}, dateAdded:'2026-08-01'},
      {jp:'オレンジジュース', romaji:'orenji juusu', en:'orange juice', tags:['food-drink','untaught','curated','drink','te-food','tourist'], altForm:'おれんじじゅーす', source: {location: 'Curated - added as a useful word (no specific sighting logged)'}, dateAdded:'2026-08-01'},
      {jp:'おやこどん', romaji:'oyakodon', en:'oyakodon (chicken & egg rice bowl)', tags:['food-drink','untaught','curated','food-type','te-food','tourist'], source: {location: 'Curated - added as a useful word (no specific sighting logged)'}, dateAdded:'2026-08-01'},
      {jp:'ぶたにく', romaji:'butaniku', en:'pork', tags:['food-drink','taught','curated','food-type','L3','food-drink-l3','l3-1','te-food','tourist'], altForm:'豚肉', altIsStandard:true, source: {location: 'Curated - added as a useful word (no specific sighting logged)'}, dateAdded:'2026-08-01'},
      {jp:'さけ', romaji:'sake', en:'salmon', tags:['food-drink','untaught','curated','food-type','te-food','tourist'], altForm:'鮭', altIsStandard:true, source: {location: 'Curated - added as a useful word (no specific sighting logged)'}, dateAdded:'2026-08-01'},
      {jp:'さしみ', romaji:'sashimi', en:'sashimi / raw fish', tags:['food-drink','untaught','curated','food-type','te-food','tourist'], source: {location: 'Curated - added as a useful word (no specific sighting logged)'}, dateAdded:'2026-08-01'},
      {jp:'たい', romaji:'tai', en:'sea bream', tags:['food-drink','untaught','curated','food-type','te-food','tourist'], altForm:'鯛', altIsStandard:true, source: {location: 'Curated - added as a useful word (no specific sighting logged)'}, dateAdded:'2026-08-01'},
      {jp:'うに', romaji:'uni', en:'sea urchin', tags:['food-drink','untaught','curated','food-type','te-food','tourist'], source: {location: 'Curated - added as a useful word (no specific sighting logged)'}, dateAdded:'2026-08-01'},
      // おかわり/しゃぶしゃぶ/すきやき moved out - stored (and drillable) under
      // Materials — Restaurants instead, which already had its own copies
      // of all three.
      {jp:'べつべつに', romaji:'betsubetsuni', en:'separately (splitting the bill)', tags:['food-drink','untaught','curated','dining-phrase','te-food','tourist'], source: {location: 'Curated - added as a useful word (no specific sighting logged)'}, dateAdded:'2026-08-01'},
      {jp:'ていしょく', romaji:'teishoku', en:'set meal', tags:['food-drink','untaught','curated','food-type','te-food','tourist'], altForm:'定食', altIsStandard:true, source: {location: 'Curated - added as a useful word (no specific sighting logged)'}, dateAdded:'2026-08-01'},
      {jp:'えび', romaji:'ebi', en:'shrimp / prawn', tags:['food-drink','taught','curated','food-type','L3','food-drink-l3','l3-1','te-food','tourist'], source: {location: 'Curated - added as a useful word (no specific sighting logged)'}, dateAdded:'2026-08-01'},
      {jp:'からい', romaji:'karai', en:'spicy', tags:['food-drink','untaught','curated','food-adjective','te-food','tourist'], source: {location: 'Curated - added as a useful word (no specific sighting logged)'}, dateAdded:'2026-08-01'},
      {jp:'いか', romaji:'ika', en:'squid', tags:['food-drink','taught','curated','food-type','L3','food-drink-l3','l3-1','te-food','tourist'], source: {location: 'Curated - added as a useful word (no specific sighting logged)'}, dateAdded:'2026-08-01'},
      {jp:'あまい', romaji:'amai', en:'sweet', tags:['food-drink','untaught','curated','food-adjective','te-food','tourist'], source: {location: 'Curated - added as a useful word (no specific sighting logged)'}, dateAdded:'2026-08-01'},
      // altForm added 2026-08-15 - たこ焼き seen on real signage (batch 6
      // part 2, Osaka hotel lobby food promo).
      {jp:'たこやき', romaji:'takoyaki', en:'takoyaki (octopus balls)', tags:['food-drink','untaught','curated','food-type','te-food','tourist'], altForm:'たこ焼き', altIsStandard:true, source: {location: 'Curated - added as a useful word (no specific sighting logged)'}, dateAdded:'2026-08-01'},
      {jp:'てんどん', romaji:'tendon', en:'tempura rice bowl (tendon)', tags:['food-drink','untaught','curated','food-type','te-food','tourist'], source: {location: 'Curated - added as a useful word (no specific sighting logged)'}, dateAdded:'2026-08-01'},
      {jp:'まぐろ', romaji:'maguro', en:'tuna', tags:['food-drink','untaught','curated','food-type','te-food','tourist'], source: {location: 'Curated - added as a useful word (no specific sighting logged)'}, dateAdded:'2026-08-01'},
      {jp:'やきとり', romaji:'yakitori', en:'yakitori (grilled chicken skewers)', tags:['food-drink','taught','curated','food-type','te-food','tourist','L3','food-drink-l3','l3-5'], source: {location: 'Curated - added as a useful word (no specific sighting logged)'}, dateAdded:'2026-08-01'},
      {jp:'はまち', romaji:'hamachi', en:'yellowtail', tags:['food-drink','untaught','curated','food-type','te-food','tourist'], source: {location: 'Curated - added as a useful word (no specific sighting logged)'}, dateAdded:'2026-08-01'},
    ],
  },
  'vocab-accommodation': {
    level: 'untaught',
    hasReference: true,
    // standaloneCard: false (2026-08-31) - retired as its own tile now that
    // theme-accommodation-combined fully subsumes it: all 14 items here
    // carry `accommodation`, and Materials - Hotel: Facilities is covered
    // too (73 of 76 tagged accommodation, the other 3 - いか焼き, うまいもん,
    // ご当地 - already have a home under food-drink from the food split).
    // Data stays exactly where it is, only the standalone tile goes away.
    // See "Accommodation" in THEMES for the replacement. Its old
    // includeItems array (furonto/front desk, from Materials — Hotel:
    // Facilities) was removed 2026-08-31 - dead the moment this retired,
    // since nothing calls resolveVocabCategory on this key for
    // tile-selection any more; フロント is still exactly where it always
    // was and still fully drillable through Accommodation above.
    standaloneCard: false,
    label: 'Accommodation',
    chars: 'ホテル よやく タオル…',
    items: [
      {jp:'もうふ', romaji:'moufu', en:'blanket', tags:['accommodation','untaught','curated','te-hotel','tourist'], source: {location: 'Curated - added as a useful word (no specific sighting logged)'}, dateAdded:'2026-08-01'},
      {jp:'チェックイン', romaji:'chekkuin', en:'check-in', tags:['accommodation','untaught','curated','te-hotel','tourist'], source: {location: 'Curated - added as a useful word (no specific sighting logged)'}, dateAdded:'2026-08-01'},
      // seenAs added 2026-08-15 - real context from an Osaka hotel door
      // status card (batch 6 part 2), rather than adding a duplicate entry
      // for the same word with nothing new except where it was seen.
      {jp:'チェックアウト', romaji:'chekkuauto', en:'check-out', tags:['accommodation','untaught','curated','te-hotel','tourist'], seenAs:'チェックアウトしました - checked out (door status card)', source: {location: 'Curated - added as a useful word (no specific sighting logged)'}, dateAdded:'2026-08-01'},
      {jp:'ダブルルーム', romaji:'daburu ruumu', en:'double room', tags:['accommodation','untaught','curated','te-hotel','tourist'], source: {location: 'Curated - added as a useful word (no specific sighting logged)'}, dateAdded:'2026-08-01'},
      {jp:'りょうきん', romaji:'ryoukin', en:'fee / charge', tags:['accommodation','untaught','curated','te-hotel','tourist'], altForm:'料金', altIsStandard:true, source: {location: 'Curated - added as a useful word (no specific sighting logged)'}, dateAdded:'2026-08-01'},
      // フロント moved to vocab-materials-hotel-facilities (real-world
      // evidenced copy) - stored (and drillable) there instead.
      {jp:'ホテル', romaji:'hoteru', en:'hotel', tags:['accommodation','untaught','curated','te-hotel','tourist'], source: {location: 'Curated - added as a useful word (no specific sighting logged)'}, dateAdded:'2026-08-01'},
      {jp:'キーカード', romaji:'kii kaado', en:'key card', tags:['accommodation','untaught','curated','te-hotel','tourist'], source: {location: 'Curated - added as a useful word (no specific sighting logged)'}, dateAdded:'2026-08-01'},
      {jp:'にもつ', romaji:'nimotsu', en:'luggage', tags:['accommodation','taught','curated','airport','te-hotel','tourist','L3','general-l3','l3-6'], altForm:'荷物', altIsStandard:true, source: {location: 'Curated - added as a useful word (no specific sighting logged)'}, dateAdded:'2026-08-01'},
      {jp:'まくら', romaji:'makura', en:'pillow', tags:['accommodation','untaught','curated','te-hotel','tourist'], altForm:'枕', altIsStandard:true, source: {location: 'Curated - added as a useful word (no specific sighting logged)'}, dateAdded:'2026-08-01'},
      {jp:'よやく', romaji:'yoyaku', en:'reservation', tags:['accommodation','untaught','curated','te-hotel','tourist'], altForm:'予約', altIsStandard:true, seenAs:'予約 also labels the delayed-start timer button on a washing machine (Tokyu Stay Kyoto) - same underlying idea, "set this to happen later," not a separate word', source: {location: 'Curated - added as a useful word (no specific sighting logged)'}, dateAdded:'2026-08-01'},
      {jp:'へやの ばんごう', romaji:'heya no bangou', en:'room number', tags:['accommodation','untaught','curated','te-hotel','tourist'], source: {location: 'Curated - added as a useful word (no specific sighting logged)'}, dateAdded:'2026-08-01'},
      {jp:'シングルルーム', romaji:'shinguru ruumu', en:'single room', tags:['accommodation','untaught','curated','te-hotel','tourist'], source: {location: 'Curated - added as a useful word (no specific sighting logged)'}, dateAdded:'2026-08-01'},
      {jp:'タオル', romaji:'taoru', en:'towel', tags:['accommodation','taught','curated','te-hotel','L3','gifts-l3','l3-3','tourist'], source: {location: 'Curated - added as a useful word (no specific sighting logged)'}, dateAdded:'2026-08-01'},
      {jp:'ワイファイ', romaji:'waifai', en:'wifi', tags:['accommodation','untaught','curated','te-hotel','tourist'], source: {location: 'Curated - added as a useful word (no specific sighting logged)'}, dateAdded:'2026-08-01'},
    ],
  },
  'vocab-money-shopping': {
    level: 'untaught',
    hasReference: true,
    // standaloneCard: false (2026-08-31) - retired as its own tile now that
    // theme-shopping-combined fully subsumes it: all 16 items here carry
    // `shopping`. Of its 2 includeItems cross-references, one (クレジット
    // カード, "credit card", from Materials — Hotel: Appliances) didn't
    // carry `shopping` yet - tagged it directly rather than let it quietly
    // drop out of the shopping-themed view when this tile retires. Data
    // stays exactly where it is, only the standalone tile goes away. The
    // includeItems array itself was removed the same day - dead the moment
    // this retired, since nothing calls resolveVocabCategory on this key
    // for tile-selection any more; both おつり and クレジットカード are still
    // exactly where they always were and still fully drillable through
    // their own real categories/tags.
    standaloneCard: false,
    label: 'Money & shopping',
    chars: 'げんきん わりびき サイズ…',
    items: [
      {jp:'げんきん', romaji:'genkin', en:'cash', tags:['shopping','untaught','curated','te-shops','tourist'], altForm:'現金', altIsStandard:true, source: {location: 'Curated - added as a useful word (no specific sighting logged)'}, dateAdded:'2026-08-01'},
      {jp:'げんきんのみ', romaji:'genkin nomi', en:'cash only', tags:['shopping','untaught','curated','te-shops','tourist'], altForm:'現金のみ', altIsStandard:true, source: {location: 'Curated - added as a useful word (no specific sighting logged)'}, dateAdded:'2026-08-01'},
      // おつり moved to vocab-materials-shops (real-world evidenced copy)
      // - stored (and drillable) there instead.
      {jp:'しょうひぜい', romaji:'shouhizei', en:'consumption tax', tags:['shopping','untaught','curated','te-shops','tourist'], altForm:'消費税', altIsStandard:true, source: {location: 'Curated - added as a useful word (no specific sighting logged)'}, dateAdded:'2026-08-01'},
      // クレジットカード moved to vocab-materials-hotel-appliances (real-
      // world evidenced copy) - stored (and drillable) there instead.
      {jp:'りょうがえ', romaji:'ryougae', en:'currency exchange', tags:['shopping','untaught','curated','te-shops','tourist'], altForm:'両替', altIsStandard:true, source: {location: 'Curated - added as a useful word (no specific sighting logged)'}, dateAdded:'2026-08-01'},
      {jp:'わりびき', romaji:'waribiki', en:'discount', tags:['shopping','untaught','curated','te-shops','tourist'], altForm:'割引', altIsStandard:true, source: {location: 'Curated - added as a useful word (no specific sighting logged)'}, dateAdded:'2026-08-01'},
      {jp:'カードは つかえますか', romaji:'kaado wa tsukaemasu ka', en:'do you accept cards?', tags:['phrase','shopping','untaught','curated','te-phrases','tourist'], source: {location: 'Curated - added as a useful word (no specific sighting logged)'}, dateAdded:'2026-08-01'},
      {jp:'りょうしゅうしょ', romaji:'ryoushuusho', en:'formal receipt', tags:['shopping','untaught','curated','te-shops','tourist'], altForm:'領収書', altIsStandard:true, source: {location: 'Curated - added as a useful word (no specific sighting logged)'}, dateAdded:'2026-08-01'},
      {jp:'ラッピング', romaji:'rappingu', en:'gift wrap', tags:['shopping','untaught','curated','te-shops','tourist'], source: {location: 'Curated - added as a useful word (no specific sighting logged)'}, dateAdded:'2026-08-01'},
      {jp:'いくらですか', romaji:'ikura desu ka', en:'how much is this?', tags:['phrase','shopping','untaught','curated','te-phrases','tourist'], source: {location: 'Curated - added as a useful word (no specific sighting logged)'}, dateAdded:'2026-08-01'},
      {jp:'しなぎれ', romaji:'shinagire', en:'out of stock / sold out', tags:['shopping','untaught','curated','te-shops','tourist'], altForm:'品切れ', altIsStandard:true, source: {location: 'Curated - added as a useful word (no specific sighting logged)'}, dateAdded:'2026-08-01'},
      {jp:'しはらい', romaji:'shiharai', en:'payment', tags:['shopping','untaught','curated','te-shops','tourist'], altForm:'支払い', altIsStandard:true, source: {location: 'Curated - added as a useful word (no specific sighting logged)'}, dateAdded:'2026-08-01'},
      {jp:'ねだん', romaji:'nedan', en:'price', tags:['shopping','untaught','curated','te-shops','tourist'], altForm:'値段', altIsStandard:true, source: {location: 'Curated - added as a useful word (no specific sighting logged)'}, dateAdded:'2026-08-01'},
      {jp:'レシート', romaji:'reshiito', en:'receipt', tags:['shopping','untaught','curated','te-shops','tourist'], source: {location: 'Curated - added as a useful word (no specific sighting logged)'}, dateAdded:'2026-08-01'},
      {jp:'サイズ', romaji:'saizu', en:'size', tags:['shopping','untaught','curated','te-shops','tourist'], source: {location: 'Curated - added as a useful word (no specific sighting logged)'}, dateAdded:'2026-08-01'},
      {jp:'めんぜい', romaji:'menzei', en:'tax-free', tags:['shopping','untaught','curated','te-shops','tourist'], altForm:'免税', altIsStandard:true, source: {location: 'Curated - added as a useful word (no specific sighting logged)'}, dateAdded:'2026-08-01'},
      {jp:'しちゃく', romaji:'shichaku', en:'trying on (clothes)', tags:['shopping','untaught','curated','te-shops','tourist'], altForm:'試着', altIsStandard:true, source: {location: 'Curated - added as a useful word (no specific sighting logged)'}, dateAdded:'2026-08-01'},
      // Tourist essentials additions (2026-10-11) - shops and the two things said at the till (te-shops).
      {jp:'パンや', romaji:'pan-ya', en:'bakery', tags:['shopping','te-shops','untaught','curated','tourist'], altForm:'パン屋', altIsStandard:true, source: {location: 'Curated - added as a useful word (no specific sighting logged)'}, dateAdded:'2026-10-11'},
      {jp:'びよういん', romaji:'biyouin', en:'hair salon', tags:['shopping','te-shops','untaught','curated','tourist'], altForm:'美容院', altIsStandard:true, source: {location: 'Curated - added as a useful word (no specific sighting logged)'}, dateAdded:'2026-10-11'},
      {jp:'とこや', romaji:'tokoya', en:'barber', tags:['shopping','te-shops','untaught','curated','tourist'], altForm:'床屋', altIsStandard:true, source: {location: 'Curated - added as a useful word (no specific sighting logged)'}, dateAdded:'2026-10-11'},
      {jp:'ドラッグストア', romaji:'doraggu sutoa', en:'drugstore', tags:['shopping','te-shops','untaught','curated','tourist'], source: {location: 'Curated - added as a useful word (no specific sighting logged)'}, dateAdded:'2026-10-11'},
      {jp:'100円ショップ', romaji:'hyaku-en shoppu', en:'100-yen shop', tags:['shopping','te-shops','untaught','curated','tourist'], speakAs:'ひゃくえんショップ', kanjiReading: [{char:'円',reading:'en'}], source: {location: 'Curated - added as a useful word (no specific sighting logged)'}, dateAdded:'2026-10-11'},
      {jp:'いじょうで よろしいですか', romaji:'ijou de yoroshii desu ka', en:'is that everything? (said at the till)', tags:['shopping','te-shops','untaught','curated','tourist'], source: {location: 'Curated - added as a useful word (no specific sighting logged)'}, dateAdded:'2026-10-11'},
      {jp:'ふくろは ごりようですか', romaji:'fukuro wa goriyou desu ka', en:'do you need a bag? (said at the till)', tags:['shopping','te-shops','untaught','curated','tourist'], source: {location: 'Curated - added as a useful word (no specific sighting logged)'}, dateAdded:'2026-10-11'},
    ],
  },
  'vocab-directions-navigation': {
    level: 'untaught',
    hasReference: true,
    // standaloneCard: false (2026-08-31) - retired as its own tile now that
    // theme-getting-around fully subsumes it: all 20 items here carry
    // `directions`. Of its 2 includeItems cross-references (ホーム/platform
    // and まっすぐ/straight, both from Materials — Stations), neither
    // carried `directions` yet - tagged both directly rather than let them
    // quietly drop out of Getting around's pool when this tile retires
    // (they're still fully covered by `stations` too, so nothing was ever
    // truly at risk of being lost, just of not showing up in this
    // specific view). Data stays exactly where it is, only the standalone
    // tile goes away. The includeItems array itself was removed the same
    // day - dead the moment this retired, since nothing calls
    // resolveVocabCategory on this key for tile-selection any more; both
    // words are still exactly where they always were and still fully
    // drillable through Getting around/Stations & trains.
    standaloneCard: false,
    label: 'Directions & navigation',
    chars: 'ひだり みぎ まっすぐ…',
    items: [
      {jp:'かど', romaji:'kado', en:'corner', tags:['directions','untaught','curated','te-around','tourist'], altForm:'角', altIsStandard:true, source: {location: 'Curated - added as a useful word (no specific sighting logged)'}, dateAdded:'2026-08-01'},
      {jp:'とおい', romaji:'tooi', en:'far', tags:['directions','untaught','curated','te-around','tourist'], source: {location: 'Curated - added as a useful word (no specific sighting logged)'}, dateAdded:'2026-08-01'},
      {jp:'ICカード', romaji:'ai shii kaado', en:'IC (transit) card', tags:['stations','directions','untaught','curated','te-around','tourist'], source: {location: 'Curated - added as a useful word (no specific sighting logged)'}, dateAdded:'2026-08-01'},
      {jp:'あんないじょ', romaji:'annaijo', en:'information desk', tags:['directions','untaught','curated','te-around','tourist'], altForm:'案内所', altIsStandard:true, source: {location: 'Curated - added as a useful word (no specific sighting logged)'}, dateAdded:'2026-08-01'},
      {jp:'こうさてん', romaji:'kousaten', en:'intersection', tags:['directions','untaught','curated','te-around','tourist'], altForm:'交差点', altIsStandard:true, source: {location: 'Curated - added as a useful word (no specific sighting logged)'}, dateAdded:'2026-08-01'},
      {jp:'ひだり', romaji:'hidari', en:'left', tags:['directions','untaught','curated','te-around','tourist'], source: {location: 'Curated - added as a useful word (no specific sighting logged)'}, dateAdded:'2026-08-01'},
      {jp:'ちかい', romaji:'chikai', en:'near', tags:['directions','untaught','curated','te-around','tourist'], source: {location: 'Curated - added as a useful word (no specific sighting logged)'}, dateAdded:'2026-08-01'},
      {jp:'かたみちきっぷ', romaji:'katamichi kippu', en:'one-way ticket', tags:['stations','directions','untaught','curated','te-around','tourist'], source: {location: 'Curated - added as a useful word (no specific sighting logged)'}, dateAdded:'2026-08-01'},
      {jp:'おうだんほどう', romaji:'oudanhodou', en:'pedestrian crossing', tags:['directions','untaught','curated','te-around','tourist'], altForm:'横断歩道', altIsStandard:true, source: {location: 'Curated - added as a useful word (no specific sighting logged)'}, dateAdded:'2026-08-01'},
      // ホーム moved to vocab-materials-stations (real-world evidenced
      // copy) - stored (and drillable) there instead.
      {jp:'おうふくきっぷ', romaji:'oufuku kippu', en:'return ticket', tags:['stations','directions','untaught','curated','te-around','tourist'], source: {location: 'Curated - added as a useful word (no specific sighting logged)'}, dateAdded:'2026-08-01'},
      {jp:'みぎ', romaji:'migi', en:'right', tags:['directions','untaught','curated','te-around','tourist'], source: {location: 'Curated - added as a useful word (no specific sighting logged)'}, dateAdded:'2026-08-01'},
      {jp:'ろせんず', romaji:'rosenzu', en:'route map', altForm:'路線図', altIsStandard:true, tags:['stations','directions','untaught','curated','te-around','tourist'], source: {location: 'Curated - added as a useful word (no specific sighting logged)'}, dateAdded:'2026-08-01'},
      // まっすぐ moved to vocab-materials-stations (real-world evidenced
      // copy) - stored (and drillable) there instead.
      {jp:'かいさつぐち', romaji:'kaisatsuguchi', en:'ticket gate', altForm:'改札口', altIsStandard:true, tags:['stations','directions','untaught','curated','te-around','tourist'], source: {location: 'Curated - added as a useful word (no specific sighting logged)'}, dateAdded:'2026-08-01'},
      {jp:'しんごう', romaji:'shingou', en:'traffic light', tags:['directions','untaught','curated','te-around','tourist'], altForm:'信号', altIsStandard:true, source: {location: 'Curated - added as a useful word (no specific sighting logged)'}, dateAdded:'2026-08-01'},
      {jp:'えきは どこですか', romaji:'eki wa doko desu ka', en:'where is the station?', tags:['phrase','stations','directions','untaught','curated','te-phrases','tourist'], source: {location: 'Curated - added as a useful word (no specific sighting logged)'}, dateAdded:'2026-08-01'},
      {jp:'なんばんせん ですか', romaji:'nanbansen desu ka', en:'which platform is it?', tags:['phrase','stations','directions','untaught','curated','te-phrases','tourist'], source: {location: 'Curated - added as a useful word (no specific sighting logged)'}, dateAdded:'2026-08-01'},
      {jp:'きた', romaji:'kita', en:'north', tags:['directions','untaught','curated','te-around','tourist'], altForm:'北', altIsStandard:true, source: {location: 'Curated - added as a useful word (no specific sighting logged)'}, dateAdded:'2026-08-12'},
      {jp:'みなみ', romaji:'minami', en:'south', tags:['directions','untaught','curated','te-around','tourist'], altForm:'南', altIsStandard:true, source: {location: 'Curated - added as a useful word (no specific sighting logged)'}, dateAdded:'2026-08-12'},
      {jp:'ひがし', romaji:'higashi', en:'east', tags:['directions','untaught','curated','te-around','tourist'], altForm:'東', altIsStandard:true, source: {location: 'Curated - added as a useful word (no specific sighting logged)'}, dateAdded:'2026-08-12'},
      {jp:'にし', romaji:'nishi', en:'west', tags:['directions','untaught','curated','te-around','tourist'], altForm:'西', altIsStandard:true, source: {location: 'Curated - added as a useful word (no specific sighting logged)'}, dateAdded:'2026-08-12'},
      // Tourist essentials additions (2026-10-11) - exits, position words and the words you hear in directions (te-around).
      {jp:'北口', romaji:'kita-guchi', en:'north exit', tags:['stations','te-around','untaught','curated','tourist'], speakAs:'きたぐち', kanjiReading: [{char:'北',reading:'kita'},{char:'口',reading:'guchi'}], source: {location: 'Curated - added as a useful word (no specific sighting logged)'}, dateAdded:'2026-10-11'},
      {jp:'南口', romaji:'minami-guchi', en:'south exit', tags:['stations','te-around','untaught','curated','tourist'], speakAs:'みなみぐち', kanjiReading: [{char:'南',reading:'minami'},{char:'口',reading:'guchi'}], source: {location: 'Curated - added as a useful word (no specific sighting logged)'}, dateAdded:'2026-10-11'},
      {jp:'東口', romaji:'higashi-guchi', en:'east exit', tags:['stations','te-around','untaught','curated','tourist'], speakAs:'ひがしぐち', kanjiReading: [{char:'東',reading:'higashi'},{char:'口',reading:'guchi'}], source: {location: 'Curated - added as a useful word (no specific sighting logged)'}, dateAdded:'2026-10-11'},
      {jp:'うえ', romaji:'ue', en:'on / above (〜のうえ)', tags:['directions','te-around','untaught','curated','tourist'], altForm:'上', altIsStandard:true, source: {location: 'Curated - added as a useful word (no specific sighting logged)'}, dateAdded:'2026-10-11'},
      {jp:'した', romaji:'shita', en:'under / below (〜のした)', tags:['directions','te-around','untaught','curated','tourist'], altForm:'下', altIsStandard:true, source: {location: 'Curated - added as a useful word (no specific sighting logged)'}, dateAdded:'2026-10-11'},
      {jp:'まえ', romaji:'mae', en:'in front (〜のまえ)', tags:['directions','te-around','untaught','curated','tourist'], altForm:'前', altIsStandard:true, source: {location: 'Curated - added as a useful word (no specific sighting logged)'}, dateAdded:'2026-10-11'},
      {jp:'うしろ', romaji:'ushiro', en:'behind (〜のうしろ)', tags:['directions','te-around','untaught','curated','tourist'], altForm:'後ろ', altIsStandard:true, source: {location: 'Curated - added as a useful word (no specific sighting logged)'}, dateAdded:'2026-10-11'},
      {jp:'なか', romaji:'naka', en:'inside (〜のなか)', tags:['directions','te-around','untaught','curated','tourist'], altForm:'中', altIsStandard:true, source: {location: 'Curated - added as a useful word (no specific sighting logged)'}, dateAdded:'2026-10-11'},
      {jp:'そと', romaji:'soto', en:'outside (〜のそと)', tags:['directions','te-around','untaught','curated','tourist'], altForm:'外', altIsStandard:true, source: {location: 'Curated - added as a useful word (no specific sighting logged)'}, dateAdded:'2026-10-11'},
      {jp:'よこ', romaji:'yoko', en:'beside (〜のよこ)', tags:['directions','te-around','untaught','curated','tourist'], altForm:'横', altIsStandard:true, source: {location: 'Curated - added as a useful word (no specific sighting logged)'}, dateAdded:'2026-10-11'},
      {jp:'あいだ', romaji:'aida', en:'between (AとBのあいだ)', tags:['directions','te-around','untaught','curated','tourist'], altForm:'間', altIsStandard:true, source: {location: 'Curated - added as a useful word (no specific sighting logged)'}, dateAdded:'2026-10-11'},
      {jp:'ちかく', romaji:'chikaku', en:'near / nearby (〜のちかく)', tags:['directions','te-around','untaught','curated','tourist'], altForm:'近く', altIsStandard:true, source: {location: 'Curated - added as a useful word (no specific sighting logged)'}, dateAdded:'2026-10-11'},
      {jp:'むこう', romaji:'mukou', en:'over there / the other side', tags:['directions','te-around','untaught','curated','tourist'], altForm:'向こう', altIsStandard:true, source: {location: 'Curated - added as a useful word (no specific sighting logged)'}, dateAdded:'2026-10-11'},
      {jp:'むかい', romaji:'mukai', en:'opposite / across from (〜のむかい)', tags:['directions','te-around','untaught','curated','tourist'], altForm:'向かい', altIsStandard:true, source: {location: 'Curated - added as a useful word (no specific sighting logged)'}, dateAdded:'2026-10-11'},
      {jp:'はんたいがわ', romaji:'hantaigawa', en:'the other side', tags:['directions','te-around','untaught','curated','tourist'], altForm:'反対側', altIsStandard:true, source: {location: 'Curated - added as a useful word (no specific sighting logged)'}, dateAdded:'2026-10-11'},
      {jp:'つきあたり', romaji:'tsukiatari', en:'the end of the road', tags:['directions','te-around','untaught','curated','tourist'], altForm:'突き当たり', altIsStandard:true, source: {location: 'Curated - added as a useful word (no specific sighting logged)'}, dateAdded:'2026-10-11'},
      {jp:'みち', romaji:'michi', en:'road / street', tags:['directions','te-around','untaught','curated','tourist'], altForm:'道', altIsStandard:true, source: {location: 'Curated - added as a useful word (no specific sighting logged)'}, dateAdded:'2026-10-11'},
      {jp:'まがって', romaji:'magatte', en:'turn (まがります)', tags:['directions','te-around','untaught','curated','tourist'], altForm:'曲がって', altIsStandard:true, source: {location: 'Curated - added as a useful word (no specific sighting logged)'}, dateAdded:'2026-10-11'},
      {jp:'わたって', romaji:'watatte', en:'cross (わたります)', tags:['directions','te-around','untaught','curated','tourist'], altForm:'渡って', altIsStandard:true, source: {location: 'Curated - added as a useful word (no specific sighting logged)'}, dateAdded:'2026-10-11'},
    ],
  },
  // standaloneCard: false (2026-08-27) - same reasoning as vocab-trip-prep
  // above: all 16 words already carry tags:['emergency'], which is a
  // strict subset of the existing 'emergency' combined pool (36 words -
  // these 16 plus trip-prep's 4 plus scattered Materials items), so
  // nothing here is only findable through this specific category. `items`
  // untouched, still the physical home for these words.
  'vocab-emergency-survival': {
    level: 'untaught',
    hasReference: true,
    standaloneCard: false,
    label: 'Emergency & survival',
    chars: 'じしん けが たいふう…',
    items: [
      {jp:'じこ', romaji:'jiko', en:'accident', tags:['emergency','untaught','curated','te-health','tourist'], altForm:'事故', altIsStandard:true, source: {location: 'Curated - added as a useful word (no specific sighting logged)'}, dateAdded:'2026-08-01'},
      {jp:'アレルギー', romaji:'arerugii', en:'allergy', tags:['emergency','taught','curated','L3','food-drink-l3','l3-1','te-health','tourist'], source: {location: 'Curated - added as a useful word (no specific sighting logged)'}, dateAdded:'2026-08-01'},
      {jp:'きゅうきゅうしゃ', romaji:'kyuukyuusha', en:'ambulance', tags:['emergency','untaught','curated','te-health','tourist'], altForm:'救急車', altIsStandard:true, source: {location: 'Curated - added as a useful word (no specific sighting logged)'}, dateAdded:'2026-08-01'},
      {jp:'だいじょうぶですか', romaji:'daijoubu desu ka', en:'are you okay?', tags:['phrase','emergency','untaught','curated','te-phrases','tourist'], source: {location: 'Curated - added as a useful word (no specific sighting logged)'}, dateAdded:'2026-08-01'},
      {jp:'じしん', romaji:'jishin', en:'earthquake', tags:['emergency','untaught','curated','te-health','tourist'], altForm:'地震', altIsStandard:true, source: {location: 'Curated - added as a useful word (no specific sighting logged)'}, dateAdded:'2026-08-01'},
      {jp:'たいしかん', romaji:'taishikan', en:'embassy', tags:['emergency','untaught','curated','te-health','tourist'], altForm:'大使館', altIsStandard:true, source: {location: 'Curated - added as a useful word (no specific sighting logged)'}, dateAdded:'2026-08-01'},
      {jp:'きんきゅう', romaji:'kinkyuu', en:'emergency', tags:['emergency','untaught','curated','te-health','tourist'], altForm:'緊急', altIsStandard:true, source: {location: 'Curated - added as a useful word (no specific sighting logged)'}, dateAdded:'2026-08-01'},
      {jp:'ひじょうぐち', romaji:'hijouguchi', en:'emergency exit', tags:['emergency','untaught','curated','te-health','tourist'], altForm:'非常口', altIsStandard:true, source: {location: 'Curated - added as a useful word (no specific sighting logged)'}, dateAdded:'2026-08-01'},
      {jp:'かじ', romaji:'kaji', en:'fire (emergency)', tags:['emergency','untaught','curated','te-health','tourist'], altForm:'火事', altIsStandard:true, source: {location: 'Curated - added as a useful word (no specific sighting logged)'}, dateAdded:'2026-08-01'},
      {jp:'なくしました', romaji:'nakushimashita', en:'I lost (something)', tags:['phrase','emergency','untaught','curated','te-phrases','tourist'], source: {location: 'Curated - added as a useful word (no specific sighting logged)'}, dateAdded:'2026-08-01'},
      {jp:'けが', romaji:'kega', en:'injury', tags:['emergency','untaught','curated','te-health','tourist'], altForm:'怪我', altIsStandard:true, source: {location: 'Curated - added as a useful word (no specific sighting logged)'}, dateAdded:'2026-08-01'},
      {jp:'パスポート', romaji:'pasupooto', en:'passport', tags:['emergency','untaught','curated','te-health','tourist'], source: {location: 'Curated - added as a useful word (no specific sighting logged)'}, dateAdded:'2026-08-01'},
      {jp:'やっきょく', romaji:'yakkyoku', en:'pharmacy', tags:['emergency','untaught','curated','te-health','tourist'], altForm:'薬局', altIsStandard:true, source: {location: 'Curated - added as a useful word (no specific sighting logged)'}, dateAdded:'2026-08-01'},
      {jp:'けいさつを よんでください', romaji:'keisatsu wo yonde kudasai', en:'please call the police', tags:['phrase','emergency','untaught','curated','te-phrases','tourist'], source: {location: 'Curated - added as a useful word (no specific sighting logged)'}, dateAdded:'2026-08-01'},
      {jp:'つなみ', romaji:'tsunami', en:'tsunami', tags:['emergency','untaught','curated','te-health','tourist'], altForm:'津波', altIsStandard:true, source: {location: 'Curated - added as a useful word (no specific sighting logged)'}, dateAdded:'2026-08-01'},
      {jp:'たいふう', romaji:'taifuu', en:'typhoon', tags:['emergency','untaught','curated','te-health','tourist'], altForm:'台風', altIsStandard:true, source: {location: 'Curated - added as a useful word (no specific sighting logged)'}, dateAdded:'2026-08-01'},
      // Tourist essentials additions (2026-10-11) - body, pharmacy (te-health). かぜ here is the cold; かぜ = wind is in Weather.
      {jp:'あたま', romaji:'atama', en:'head', tags:['emergency','te-health','untaught','curated','tourist'], altForm:'頭', altIsStandard:true, source: {location: 'Curated - added as a useful word (no specific sighting logged)'}, dateAdded:'2026-10-11'},
      {jp:'おなか', romaji:'onaka', en:'stomach', tags:['emergency','te-health','untaught','curated','tourist'], source: {location: 'Curated - added as a useful word (no specific sighting logged)'}, dateAdded:'2026-10-11'},
      {jp:'のど', romaji:'nodo', en:'throat', tags:['emergency','te-health','untaught','curated','tourist'], source: {location: 'Curated - added as a useful word (no specific sighting logged)'}, dateAdded:'2026-10-11'},
      {jp:'は', romaji:'ha', en:'tooth', tags:['emergency','te-health','untaught','curated','tourist'], altForm:'歯', altIsStandard:true, source: {location: 'Curated - added as a useful word (no specific sighting logged)'}, dateAdded:'2026-10-11'},
      {jp:'て', romaji:'te', en:'hand', tags:['emergency','te-health','taught','curated','tourist','L3','tools-l3','l3-5'], altForm:'手', altIsStandard:true, source: {location: 'Curated - added as a useful word (no specific sighting logged)'}, dateAdded:'2026-10-11'},
      {jp:'あし', romaji:'ashi', en:'foot / leg', tags:['emergency','te-health','untaught','curated','tourist'], altForm:'足', altIsStandard:true, source: {location: 'Curated - added as a useful word (no specific sighting logged)'}, dateAdded:'2026-10-11'},
      {jp:'め', romaji:'me', en:'eye', tags:['emergency','te-health','untaught','curated','tourist'], altForm:'目', altIsStandard:true, source: {location: 'Curated - added as a useful word (no specific sighting logged)'}, dateAdded:'2026-10-11'},
      {jp:'みみ', romaji:'mimi', en:'ear', tags:['emergency','te-health','untaught','curated','tourist'], altForm:'耳', altIsStandard:true, source: {location: 'Curated - added as a useful word (no specific sighting logged)'}, dateAdded:'2026-10-11'},
      {jp:'はな', romaji:'hana', en:'nose', tags:['emergency','te-health','untaught','curated','tourist'], altForm:'鼻', altIsStandard:true, source: {location: 'Curated - added as a useful word (no specific sighting logged)'}, dateAdded:'2026-10-11'},
      {jp:'くち', romaji:'kuchi', en:'mouth', tags:['emergency','te-health','untaught','curated','tourist'], altForm:'口', altIsStandard:true, source: {location: 'Curated - added as a useful word (no specific sighting logged)'}, dateAdded:'2026-10-11'},
      {jp:'せなか', romaji:'senaka', en:'back (of the body)', tags:['emergency','te-health','untaught','curated','tourist'], altForm:'背中', altIsStandard:true, source: {location: 'Curated - added as a useful word (no specific sighting logged)'}, dateAdded:'2026-10-11'},
      {jp:'あたまが いたいです', romaji:'atama ga itai desu', en:'I have a headache', tags:['emergency','te-health','untaught','curated','tourist'], source: {location: 'Curated - added as a useful word (no specific sighting logged)'}, dateAdded:'2026-10-11'},
      {jp:'ねつ', romaji:'netsu', en:'fever', tags:['emergency','te-health','untaught','curated','tourist'], altForm:'熱', altIsStandard:true, source: {location: 'Curated - added as a useful word (no specific sighting logged)'}, dateAdded:'2026-10-11'},
      {jp:'せき', romaji:'seki', en:'cough', tags:['emergency','te-health','untaught','curated','tourist'], source: {location: 'Curated - added as a useful word (no specific sighting logged)'}, dateAdded:'2026-10-11'},
      {jp:'かぜ', romaji:'kaze', en:'a cold (illness)', tags:['emergency','te-health','untaught','curated','tourist'], altForm:'風邪', altIsStandard:true, source: {location: 'Curated - added as a useful word (no specific sighting logged)'}, dateAdded:'2026-10-11'},
      {jp:'かぜぐすり', romaji:'kazegusuri', en:'cold medicine', tags:['emergency','te-health','untaught','curated','tourist'], altForm:'風邪薬', altIsStandard:true, source: {location: 'Curated - added as a useful word (no specific sighting logged)'}, dateAdded:'2026-10-11'},
      {jp:'いたみどめ', romaji:'itamidome', en:'painkiller', tags:['emergency','te-health','untaught','curated','tourist'], altForm:'痛み止め', altIsStandard:true, source: {location: 'Curated - added as a useful word (no specific sighting logged)'}, dateAdded:'2026-10-11'},
      {jp:'ばんそうこう', romaji:'bansoukou', en:'plaster', tags:['emergency','te-health','untaught','curated','tourist'], source: {location: 'Curated - added as a useful word (no specific sighting logged)'}, dateAdded:'2026-10-11'},
      {jp:'日焼け止め', romaji:'hiyakedome', en:'sunscreen', tags:['emergency','te-health','untaught','curated','tourist'], speakAs:'ひやけどめ', kanjiReading: [{char:'日',reading:'hi'},{char:'焼',reading:'ya'},{char:'止',reading:'do'}], source: {location: 'Curated - added as a useful word (no specific sighting logged)'}, dateAdded:'2026-10-11'},
    ],
  },
  // FLIP PILOT (2026-08-26) - the first category whose display is actually
  // sourced via tag query instead of reading `items` directly (see the
  // `tagQuery` check added to resolveVocabCategory, and the FUTURE DIRECTION
  // note above VOCAB). `items` below is still the one physical home for
  // these 9 words - the flip is about how they're DISPLAYED, not where
  // they're STORED. Weather was picked as the pilot because it's completely
  // self-contained (nothing anywhere else carries the 'weather' tag), so the
  // tag-query result is provably identical to reading `items` directly -
  // verified byte-for-byte before shipping, including confirming the result
  // carries none of the `level`/`groupKey` decoration that theme-pooled
  // (multi-source) tag queries add for their border-colour feature - that
  // decoration would have been a real, visible regression here (Weather
  // tiles would've gained a purple border they've never had) if reused
  // as-is from getThemePool's version of this same query logic.
  'vocab-weather': {
    level: 'untaught',
    hasReference: true,
    label: 'Weather & seasons',
    chars: 'あめ ゆき はる…',
    tagQuery: { all: ['weather'], none: ['tourist'] },  // tourist words live under the Tourist pill (2026-10-15)
    items: [
      {jp:'くもり', romaji:'kumori', en:'cloudy', tags:['weather','untaught','curated','te-weather','tourist'], altForm:'曇り', altIsStandard:true, source: {location: 'Curated - added as a useful word (no specific sighting logged)'}, dateAdded:'2026-08-01'},
      {jp:'さむい', romaji:'samui', en:'cold (weather)', tags:['weather','taught','curated','te-weather','tourist','L4','adjectives-l4','adjectives','l4-1'], source: {location: 'Curated - added as a useful word (no specific sighting logged)'}, dateAdded:'2026-08-01'},
      {jp:'あつい', romaji:'atsui', en:'hot (weather)', tags:['weather','taught','curated','te-weather','tourist','L4','adjectives-l4','adjectives','l4-1'], source: {location: 'Curated - added as a useful word (no specific sighting logged)'}, dateAdded:'2026-08-01'},
      {jp:'むしあつい', romaji:'mushiatsui', en:'humid', tags:['weather','untaught','curated','te-weather','tourist'], altForm:'蒸し暑い', altIsStandard:true, source: {location: 'Curated - added as a useful word (no specific sighting logged)'}, dateAdded:'2026-08-01'},
      {jp:'あめ', romaji:'ame', en:'rain', tags:['weather','untaught','curated','te-weather','tourist'], altForm:'雨', altIsStandard:true, source: {location: 'Curated - added as a useful word (no specific sighting logged)'}, dateAdded:'2026-08-01'},
      {jp:'ゆき', romaji:'yuki', en:'snow', tags:['weather','untaught','curated','te-weather','tourist'], altForm:'雪', altIsStandard:true, source: {location: 'Curated - added as a useful word (no specific sighting logged)'}, dateAdded:'2026-08-01'},
      {jp:'はれ', romaji:'hare', en:'sunny / clear', tags:['weather','untaught','curated','te-weather','tourist'], altForm:'晴れ', altIsStandard:true, source: {location: 'Curated - added as a useful word (no specific sighting logged)'}, dateAdded:'2026-08-01'},
      {jp:'きおん', romaji:'kion', en:'temperature', tags:['weather','untaught','curated','te-weather','tourist'], altForm:'気温', altIsStandard:true, source: {location: 'Curated - added as a useful word (no specific sighting logged)'}, dateAdded:'2026-08-01'},
      {jp:'かぜ', romaji:'kaze', en:'wind', tags:['weather','untaught','curated','te-weather','tourist'], altForm:'風', altIsStandard:true, source: {location: 'Curated - added as a useful word (no specific sighting logged)'}, dateAdded:'2026-08-01'},
      // SEASONS (2026-09-01) - folded into Weather rather than getting their
      // own card: 4 words felt too thin on their own, and "weather and
      // seasons" is a standard, natural pairing (same thematic unit most
      // Japanese courses group them into). Extra `seasons` tag alongside
      // `weather` so they stay individually queryable later if that's ever
      // useful, but tagQuery: 'weather' above already picks them up as-is -
      // no query change needed, this is purely additive. altForm/
      // altIsStandard follow the same convention as every other word in
      // this category (kana tested, kanji revealed as "Normally shown as"
      // after answering) - matches the kanji-general colours entries'
      // finding that all four season kanji are N4 (word itself is N5), same
      // jlptsensei.com verification approach, see that comment for detail.
      {jp:'はる', romaji:'haru', en:'spring', tags:['weather','seasons','taught','curated','te-weather','tourist','L3','general-l3','l3-6'], altForm:'春', altIsStandard:true, source: {location: 'Curated - added as a useful word (no specific sighting logged)'}, dateAdded:'2026-09-01'},
      {jp:'なつ', romaji:'natsu', en:'summer', tags:['weather','seasons','taught','curated','te-weather','tourist','L3','general-l3','l3-6'], altForm:'夏', altIsStandard:true, source: {location: 'Curated - added as a useful word (no specific sighting logged)'}, dateAdded:'2026-09-01'},
      {jp:'あき', romaji:'aki', en:'autumn', tags:['weather','seasons','taught','curated','te-weather','tourist','L3','general-l3','l3-6'], altForm:'秋', altIsStandard:true, source: {location: 'Curated - added as a useful word (no specific sighting logged)'}, dateAdded:'2026-09-01'},
      {jp:'ふゆ', romaji:'fuyu', en:'winter', tags:['weather','seasons','taught','curated','te-weather','tourist','L3','general-l3','l3-6'], altForm:'冬', altIsStandard:true, source: {location: 'Curated - added as a useful word (no specific sighting logged)'}, dateAdded:'2026-09-01'},
      // Tourist essentials additions (2026-10-11) - New Year and Christmas (te-weather).
      {jp:'おしょうがつ', romaji:'oshougatsu', en:'New Year (the holiday)', tags:['weather','seasons','te-weather','taught','curated','tourist','L3','occasions-l3','l3-4'], altForm:'お正月', altIsStandard:true, source: {location: 'Curated - added as a useful word (no specific sighting logged)'}, dateAdded:'2026-10-11'},
      {jp:'クリスマス', romaji:'kurisumasu', en:'Christmas', tags:['weather','seasons','te-weather','taught','curated','tourist','L3','occasions-l3','l3-4'], source: {location: 'Curated - added as a useful word (no specific sighting logged)'}, dateAdded:'2026-10-11'},
    ],
  },
  'vocab-signage-warnings': {
    level: 'untaught',
    hasReference: true,
    // standaloneCard: false (2026-08-31) - retired as its own tile now that
    // theme-signage-combined fully subsumes it: all 11 items here carry
    // `signage` (wholesale-tagged), and Materials-shops' 16 signage-flavoured
    // items (4 originally + 12 sorted out of the "neither shopping nor
    // signage" leftover pile the same day) are covered too. Data stays
    // exactly where it is, only the standalone tile goes away.
    standaloneCard: false,
    label: 'Signage & warnings',
    chars: 'きんえん おす ちゅうい…',
    items: [
      {jp:'ちゅうい', romaji:'chuui', en:'caution', tags:['signage','untaught','curated','te-weather','tourist'], altForm:'注意', altIsStandard:true, source: {location: 'Curated - added as a useful word (no specific sighting logged)'}, dateAdded:'2026-08-01'},
      {jp:'しようちゅう', romaji:'shiyouchuu', en:'in use / occupied', tags:['signage','untaught','curated','te-weather','tourist'], altForm:'使用中', altIsStandard:true, source: {location: 'Curated - added as a useful word (no specific sighting logged)'}, dateAdded:'2026-08-01'},
      {jp:'たちいりきんし', romaji:'tachiiri kinshi', en:'no entry', tags:['signage','untaught','curated','te-weather','tourist'], altForm:'立入禁止', altIsStandard:true, source: {location: 'Curated - added as a useful word (no specific sighting logged)'}, dateAdded:'2026-08-01'},
      {jp:'さつえいきんし', romaji:'satsuei kinshi', en:'no photography', tags:['signage','untaught','curated','te-weather','tourist'], altForm:'撮影禁止', altIsStandard:true, source: {location: 'Curated - added as a useful word (no specific sighting logged)'}, dateAdded:'2026-08-01'},
      {jp:'きんえん', romaji:'kinen', en:'no smoking', tags:['signage','untaught','curated','te-weather','tourist'], altForm:'禁煙', altIsStandard:true, source: {location: 'Curated - added as a useful word (no specific sighting logged)'}, dateAdded:'2026-08-01'},
      {jp:'こしょうちゅう', romaji:'koshouchuu', en:'out of order', tags:['signage','untaught','curated','te-weather','tourist'], altForm:'故障中', altIsStandard:true, source: {location: 'Curated - added as a useful word (no specific sighting logged)'}, dateAdded:'2026-08-01'},
      {jp:'ひく', romaji:'hiku', en:'pull', tags:['signage','untaught','curated','te-weather','tourist'], altForm:'引く', altIsStandard:true, source: {location: 'Curated - added as a useful word (no specific sighting logged)'}, dateAdded:'2026-08-01'},
      {jp:'おす', romaji:'osu', en:'push', tags:['signage','untaught','curated','te-weather','tourist'], altForm:'押す', altIsStandard:true, source: {location: 'Curated - added as a useful word (no specific sighting logged)'}, dateAdded:'2026-08-01'},
      {jp:'ていきゅうび', romaji:'teikyuubi', en:'regular closing day', tags:['signage','untaught','curated','te-weather','tourist'], altForm:'定休日', altIsStandard:true, source: {location: 'Curated - added as a useful word (no specific sighting logged)'}, dateAdded:'2026-08-01'},
      {jp:'スタッフのみ', romaji:'sutaffu nomi', en:'staff only', tags:['signage','untaught','curated','te-weather','tourist'], source: {location: 'Curated - added as a useful word (no specific sighting logged)'}, dateAdded:'2026-08-01'},
      {jp:'ゆかが ぬれています', romaji:'yuka ga nureteimasu', en:'wet floor', tags:['phrase','signage','untaught','curated','te-phrases','tourist'], source: {location: 'Curated - added as a useful word (no specific sighting logged)'}, dateAdded:'2026-08-01'},
    ],
  },
  // Last of the 7 originally-sketched Andrew-mode categories. Deliberately
  // doesn't touch vocab-greetings - nothing gets moved out of there (see the
  // Extra/showAndrewMode visibility discussion: Level 1 content is always
  // visible to everyone, so anything relocated out of it into an Andrew/Extra
  // -gated category would be a real loss for anyone with Extra switched off).
  // Only genuinely new phrases live here - restaurant/photo/small-talk lines
  // that Greetings, Money and shopping, Directions and navigation, and
  // Emergency and survival don't already cover.
  // FLIP PILOT (2026-08-31) - last of the four single-source untaught
  // categories to get this treatment (Airport/Street/Hotel:Appliances were
  // 2026-08-26/31). No includeItems cross-references in or out (checked -
  // nothing else in the file references vocab-tourist-phrases), and all 16
  // items already carry `tourist-phrases`, used nowhere else in the app
  // (checked), so the bare tag is safe with no AND scoping needed. Several
  // of these also carry `food-drink`+`dining-phrase` (かんぱい, "do you have
  // an English menu?", and others) and so also appear under the new Dining
  // phrases card from the food-drink split above - intentional overlap,
  // same as every other dual-tagged word in the app, one shared score
  // either way.
  'vocab-tourist-phrases': {
    level: 'untaught',
    hasReference: true,
    label: 'Polite tourist phrases',
    chars: 'かんぱい おげんきですか…',
    tagQuery: { all: ['tourist-phrases'], none: ['tourist'] },  // tourist words live under the Tourist pill (2026-10-15)
    items: [
      {jp:'おさきに どうぞ', romaji:'osaki ni douzo', en:'after you', tags:['trip','tourist-phrases','phrase','untaught','curated','te-phrases','tourist'], source: {location: 'Curated - added as a useful word (no specific sighting logged)'}, dateAdded:'2026-08-01'},
      {jp:'ベジタリアンの りょうりは ありますか', romaji:'bejitarian no ryouri wa arimasu ka', en:'any vegetarian dishes?', tags:['trip','tourist-phrases','phrase','food-drink','untaught','curated','dining-phrase','te-phrases','tourist'], source: {location: 'Curated - added as a useful word (no specific sighting logged)'}, dateAdded:'2026-08-01'},
      {jp:'かんぱい', romaji:'kanpai', en:'cheers!', tags:['trip','tourist-phrases','phrase','food-drink','untaught','curated','dining-phrase','te-phrases','tourist'], altForm:'乾杯', altIsStandard:true, source: {location: 'Curated - added as a useful word (no specific sighting logged)'}, dateAdded:'2026-08-01'},
      {jp:'おめでとうございます', romaji:'omedetou gozaimasu', en:'congratulations', tags:['trip','tourist-phrases','phrase','untaught','curated','te-phrases','tourist'], source: {location: 'Curated - added as a useful word (no specific sighting logged)'}, dateAdded:'2026-08-01'},
      {jp:'しゃしんを とって いただけますか', romaji:'shashin wo totte itadakemasu ka', en:'could you take a photo (for us)?', tags:['trip','tourist-phrases','phrase','entertainment','untaught','curated','te-phrases','tourist'], source: {location: 'Curated - added as a useful word (no specific sighting logged)'}, dateAdded:'2026-08-01'},
      {jp:'かいて いただけますか', romaji:'kaite itadakemasu ka', en:'could you write it down, please?', tags:['trip','tourist-phrases','phrase','untaught','curated','te-phrases','tourist'], source: {location: 'Curated - added as a useful word (no specific sighting logged)'}, dateAdded:'2026-08-01'},
      {jp:'えいごの メニューは ありますか', romaji:'eigo no menyuu wa arimasu ka', en:'do you have an English menu?', tags:['trip','tourist-phrases','phrase','food-drink','untaught','curated','dining-phrase','te-phrases','tourist'], source: {location: 'Curated - added as a useful word (no specific sighting logged)'}, dateAdded:'2026-08-01'},
      {jp:'えいごを はなせますか', romaji:'eigo wo hanasemasu ka', en:'do you speak English?', tags:['trip','tourist-phrases','phrase','untaught','curated','te-phrases','tourist'], source: {location: 'Curated - added as a useful word (no specific sighting logged)'}, dateAdded:'2026-08-01'},
      {jp:'おげんきですか', romaji:'ogenki desu ka', en:'how are you?', tags:['trip','tourist-phrases','phrase','untaught','curated','te-phrases','tourist'], source: {location: 'Curated - added as a useful word (no specific sighting logged)'}, dateAdded:'2026-08-01'},
      {jp:'おいくつですか', romaji:'o ikutsu desu ka', en:'how old are you? (polite)', tags:['trip','tourist-phrases','phrase','untaught','curated','te-phrases','tourist'], source: {location: 'Curated - added as a useful word (no specific sighting logged)'}, dateAdded:'2026-08-01'},
      {jp:'にほんごが あまり はなせません', romaji:'nihongo ga amari hanasemasen', en:"I can't speak much Japanese", tags:['trip','tourist-phrases','phrase','untaught','curated','te-phrases','tourist'], source: {location: 'Curated - added as a useful word (no specific sighting logged)'}, dateAdded:'2026-08-01'},
      {jp:'しゃしんを とっても いいですか', romaji:'shashin wo tottemo ii desu ka', en:'is it okay to take a photo?', tags:['trip','tourist-phrases','phrase','entertainment','untaught','curated','te-phrases','tourist'], source: {location: 'Curated - added as a useful word (no specific sighting logged)'}, dateAdded:'2026-08-01'},
      {jp:'このせきは あいていますか', romaji:'kono seki wa aiteimasu ka', en:'is this seat taken?', tags:['trip','tourist-phrases','phrase','food-drink','untaught','curated','dining-phrase','te-phrases','tourist'], source: {location: 'Curated - added as a useful word (no specific sighting logged)'}, dateAdded:'2026-08-01'},
      {jp:'おいしかったです', romaji:'oishikatta desu', en:'it was delicious (after eating)', tags:['trip','tourist-phrases','phrase','food-drink','untaught','curated','dining-phrase','te-phrases','tourist'], source: {location: 'Curated - added as a useful word (no specific sighting logged)'}, dateAdded:'2026-08-01'},
      {jp:'おすすめは なんですか', romaji:'osusume wa nan desu ka', en:'what do you recommend?', tags:['trip','tourist-phrases','phrase','food-drink','untaught','curated','dining-phrase','te-phrases','tourist'], source: {location: 'Curated - added as a useful word (no specific sighting logged)'}, dateAdded:'2026-08-01'},
      {jp:'トイレは どこですか', romaji:'toire wa doko desu ka', en:'where is the toilet?', tags:['trip','tourist-phrases','phrase','untaught','curated','te-phrases','tourist'], source: {location: 'Curated - added as a useful word (no specific sighting logged)'}, dateAdded:'2026-08-01'},
      // Added 2026-10-01 for a Level 1 classmate's trip (Tourist essentials):
      {jp:'おてあらいは どこですか', romaji:'otearai wa doko desu ka', en:'where is the toilet? (politer - signs often say お手洗い)', tags:['trip','tourist-phrases','phrase','untaught','curated','te-phrases','tourist'], altForm:'お手洗いは どこですか', altIsStandard:true, source: {location: 'Curated - added as a useful word (no specific sighting logged)'}, dateAdded:'2026-10-01'},
      {jp:'これを ください', romaji:'kore wo kudasai', en:'this one, please (pointing)', tags:['trip','tourist-phrases','phrase','shopping','untaught','curated','te-phrases','tourist'], source: {location: 'Curated - added as a useful word (no specific sighting logged)'}, dateAdded:'2026-10-01'},
      {jp:'おみずを ください', romaji:'omizu wo kudasai', en:'water, please', tags:['trip','tourist-phrases','phrase','food-drink','dining-phrase','untaught','curated','te-phrases','tourist'], source: {location: 'Curated - added as a useful word (no specific sighting logged)'}, dateAdded:'2026-10-01'},
      {jp:'もちかえりで おねがいします', romaji:'mochikaeri de onegai shimasu', en:'to take away, please', tags:['trip','tourist-phrases','phrase','food-drink','dining-phrase','untaught','curated','te-phrases','tourist'], source: {location: 'Curated - added as a useful word (no specific sighting logged)'}, dateAdded:'2026-10-01'},
      {jp:'みているだけです', romaji:'mite iru dake desu', en:'I\'m just looking', tags:['trip','tourist-phrases','phrase','shopping','untaught','curated','te-phrases','tourist'], source: {location: 'Curated - added as a useful word (no specific sighting logged)'}, dateAdded:'2026-10-01'},
      {jp:'ふくろは いりません', romaji:'fukuro wa irimasen', en:'I don\'t need a bag', tags:['trip','tourist-phrases','phrase','shopping','untaught','curated','te-phrases','tourist'], source: {location: 'Curated - added as a useful word (no specific sighting logged)'}, dateAdded:'2026-10-01'},
      {jp:'だいじょうぶです', romaji:'daijoubu desu', en:'I\'m fine / no thank you', tags:['trip','tourist-phrases','phrase','untaught','curated','te-phrases','tourist'], source: {location: 'Curated - added as a useful word (no specific sighting logged)'}, dateAdded:'2026-10-01'},
      {jp:'いらっしゃいませ', romaji:'irasshaimase', en:'welcome! (said by staff - no reply needed)', tags:['trip','tourist-phrases','phrase','shopping','untaught','curated','genki','genki-1-2','te-phrases','tourist'], source: {location: 'Curated - added as a useful word (no specific sighting logged)'}, dateAdded:'2026-10-01'},
      {jp:'なんめいさまですか', romaji:'nanmei-sama desu ka', en:'how many people? (asked by restaurant staff)', tags:['trip','tourist-phrases','phrase','food-drink','dining-phrase','untaught','curated','te-phrases','tourist'], source: {location: 'Curated - added as a useful word (no specific sighting logged)'}, dateAdded:'2026-10-01'},
      {jp:'ふたりです', romaji:'futari desu', en:'two people (answering)', tags:['trip','tourist-phrases','phrase','food-drink','dining-phrase','untaught','curated','te-phrases','tourist'], source: {location: 'Curated - added as a useful word (no specific sighting logged)'}, dateAdded:'2026-10-01'},
      {jp:'あたためますか', romaji:'atatamemasu ka', en:'shall I heat it up? (convenience store staff)', tags:['trip','tourist-phrases','phrase','shopping','untaught','curated','te-phrases','tourist'], source: {location: 'Curated - added as a useful word (no specific sighting logged)'}, dateAdded:'2026-10-01'},
      {jp:'きっぷは どこで かえますか', romaji:'kippu wa doko de kaemasu ka', en:'where can I buy a ticket?', tags:['trip','tourist-phrases','phrase','directions','untaught','curated','te-phrases','tourist'], source: {location: 'Curated - added as a useful word (no specific sighting logged)'}, dateAdded:'2026-10-01'},
      {jp:'みちに まよいました', romaji:'michi ni mayoimashita', en:'I\'m lost', tags:['trip','tourist-phrases','phrase','directions','untaught','curated','te-phrases','tourist'], source: {location: 'Curated - added as a useful word (no specific sighting logged)'}, dateAdded:'2026-10-01'},
      {jp:'ちかくに コンビニは ありますか', romaji:'chikaku ni konbini wa arimasu ka', en:'is there a convenience store nearby?', tags:['trip','tourist-phrases','phrase','directions','untaught','curated','te-phrases','tourist'], source: {location: 'Curated - added as a useful word (no specific sighting logged)'}, dateAdded:'2026-10-01'},
      {jp:'この じゅうしょまで おねがいします', romaji:'kono juusho made onegai shimasu', en:'to this address, please (taxi)', tags:['trip','tourist-phrases','phrase','directions','untaught','curated','te-phrases','tourist'], source: {location: 'Curated - added as a useful word (no specific sighting logged)'}, dateAdded:'2026-10-01'},
      {jp:'よやくを しています', romaji:'yoyaku wo shite imasu', en:'I have a reservation', tags:['trip','tourist-phrases','phrase','accommodation','untaught','curated','te-phrases','tourist'], source: {location: 'Curated - added as a useful word (no specific sighting logged)'}, dateAdded:'2026-10-01'},
      {jp:'にもつを あずかって いただけますか', romaji:'nimotsu wo azukatte itadakemasu ka', en:'could you keep my luggage?', tags:['trip','tourist-phrases','phrase','accommodation','untaught','curated','te-phrases','tourist'], source: {location: 'Curated - added as a useful word (no specific sighting logged)'}, dateAdded:'2026-10-01'},
      {jp:'ぐあいが わるいです', romaji:'guai ga warui desu', en:'I feel unwell', tags:['trip','tourist-phrases','phrase','emergency','untaught','curated','te-phrases','tourist'], source: {location: 'Curated - added as a useful word (no specific sighting logged)'}, dateAdded:'2026-10-01'},
      {jp:'びょういんは どこですか', romaji:'byouin wa doko desu ka', en:'where is the hospital?', tags:['trip','tourist-phrases','phrase','emergency','untaught','curated','te-phrases','tourist'], source: {location: 'Curated - added as a useful word (no specific sighting logged)'}, dateAdded:'2026-10-01'},
      {jp:'にほんごが すこし わかります', romaji:'nihongo ga sukoshi wakarimasu', en:'I understand a little Japanese', tags:['trip','tourist-phrases','phrase','untaught','curated','te-phrases','tourist'], source: {location: 'Curated - added as a useful word (no specific sighting logged)'}, dateAdded:'2026-10-01'},
    ],
  },
  // "Materials" - authentic vocab pulled from Andrew's own trip photos (see
  // japan_vocab_consolidated_20260810.json), as opposed to every category
  // above which is prospective/textbook vocab. Andrew mode only, level:
  // 'andrew' - no gating beyond that, since it's already Andrew-only.
  // Every item carries a `source` object (location/date/file) recording which
  // photo it came from - shown in full (including filename, on its own line)
  // in the .context-card built in renderQuestion, kept complete in the data
  // in case a future version wants to do more with it (e.g. linking back to
  // the photo itself). `seenAs`, where present, is the real sentence/sign context
  // the word was actually seen in - shown on the card itself before
  // answering and again in the post-answer feedback, since it's pure
  // background that can only help memory, not something to gate behind
  // getting the question right.
  'vocab-materials-stations': {
    level: 'untaught',
    hasReference: true,
    // standaloneCard: false (2026-08-31) - retired as its own tile now that
    // theme-stations-combined fully subsumes it (all 89 items here carry
    // the `stations` tag, verified in code before retiring, zero gaps) and
    // adds the station-specific words from Directions and navigation and
    // trip-prep on top. Data stays exactly where it is - every tag scan and
    // includeItems reference still finds it - only the standalone tile
    // goes away. See "Stations & trains" in THEMES for the replacement.
    standaloneCard: false,
    label: 'Materials — Stations & trains',
    chars: 'インターホン 駅事務室 連絡用…',
    items: [
      {jp:'インターホン', romaji:'intahon', en:'intercom', tags:['stations','untaught','encountered'], seenAs:'インターホン（駅事務室連絡用） - as labeled on the sign: intercom for contacting the station office', source:{location:'Kojiya Station (Keikyu)', date:'2026-08-08', file:'PXL_20260807_233744426.jpg'}, dateAdded:'2026-08-10'},
      {jp:'駅事務室', romaji:'eki jimushitsu', en:'station office', tags:['stations','untaught','encountered'], source:{location:'Kojiya Station (Keikyu)', date:'2026-08-08', file:'PXL_20260807_233744426.jpg'}, dateAdded:'2026-08-10', kanjiReading: [{char:'駅',reading:'eki'},{char:'事',reading:'ji'},{char:'務',reading:'mu'},{char:'室',reading:'shitsu'}]},
      {jp:'連絡用', romaji:'renraku-you', en:'for contacting / for communication', tags:['stations','untaught','encountered'], source:{location:'Kojiya Station (Keikyu)', date:'2026-08-08', file:'PXL_20260807_233744426.jpg'}, dateAdded:'2026-08-10', kanjiReading: [{char:'連',reading:'ren'},{char:'絡',reading:'raku'},{char:'用',reading:'you'}]},
      {jp:'呼び出し', romaji:'yobidashi', en:'call / summon / page', tags:['stations','untaught','encountered'], altForm:'呼びだし (as shown on the sign, mixed kana)', source:{location:'Kojiya Station (Keikyu)', date:'2026-08-08', file:'PXL_20260807_233744426.jpg'}, dateAdded:'2026-08-10', kanjiReading: [{char:'呼',reading:'yo'},{char:'出',reading:'da'}]},
      {jp:'ご案内', romaji:'go-annai', en:'notice / information', tags:['stations','untaught','encountered'], source:{location:'Kojiya Station (Keikyu)', date:'2026-08-08', file:'PXL_20260807_233755061.jpg'}, dateAdded:'2026-08-10', kanjiReadingBlocked: 'One of this word\'s kanji doesn\'t have a recorded reading yet'},
      {jp:'車いす', romaji:'kuruma-isu', en:'wheelchair', tags:['stations','untaught','encountered'], altForm:'車椅子 (full kanji form)', source:{location:'Kojiya Station (Keikyu)', date:'2026-08-08', file:'PXL_20260807_233755061.jpg'}, dateAdded:'2026-08-10', kanjiReading: [{char:'車',reading:'kuruma'}]},
      {jp:'ご利用', romaji:'go-riyou', en:'use (polite)', tags:['stations','untaught','encountered'], source:{location:'Kojiya Station (Keikyu)', date:'2026-08-08', file:'PXL_20260807_233755061.jpg'}, dateAdded:'2026-08-10', kanjiReadingBlocked: 'One of this word\'s kanji doesn\'t have a recorded reading yet'},
      {jp:'お客様', romaji:'okyaku-sama', en:'customer / passenger', tags:['stations','untaught','encountered'], source:{location:'Kojiya Station (Keikyu)', date:'2026-08-08', file:'PXL_20260807_233755061.jpg'}, dateAdded:'2026-08-10', kanjiReadingBlocked: 'One of this word\'s kanji doesn\'t have a recorded reading yet'},
      {jp:'西口', romaji:'nishi-guchi', en:'west exit', tags:['stations','untaught','encountered'], source:{location:'Kojiya Station (Keikyu)', date:'2026-08-08', file:'PXL_20260807_233755061.jpg'}, dateAdded:'2026-08-10', kanjiReading: [{char:'西',reading:'nishi'},{char:'口',reading:'guchi'}]},
      {jp:'改札', romaji:'kaisatsu', en:'ticket gate', tags:['stations','untaught','encountered'], source:{location:'Kojiya Station (Keikyu)', date:'2026-08-08', file:'PXL_20260807_233755061.jpg'}, dateAdded:'2026-08-10', kanjiReading: [{char:'改',reading:'kai'},{char:'札',reading:'satsu'}]},
      {jp:'お廻り下さい', romaji:'o-mawari kudasai', en:'please go around / detour', tags:['stations','untaught','encountered'], altForm:'お回りください (more common modern spelling)', seenAs:'車いすをご利用のお客様は西口改札へお廻り下さい。- full notice: wheelchair users please go around to the west exit gate', source:{location:'Kojiya Station (Keikyu)', date:'2026-08-08', file:'PXL_20260807_233755061.jpg'}, dateAdded:'2026-08-10', kanjiReading: [{char:'廻',reading:'mawa'},{char:'下',reading:'kuda'}]},
      {jp:'〜階ホームです', romaji:'~-kai hoomu desu', en:'(this) is the ~ floor platform', tags:['stations','untaught','encountered'], seenAs:'ここは3階ホームです - as shown on the sign: this is the 3rd floor platform', source:{location:'Keikyu Kamata Station', date:'2026-08-08', file:'PXL_20260808_081130279.jpg'}, dateAdded:'2026-08-10', kanjiReadingBlocked: 'Contains a placeholder or symbol with no fixed reading of its own'},
      {jp:'ホーム', romaji:'hoomu', en:'platform (train)', tags:['stations','untaught','encountered','directions'], source:{location:'Keikyu Kamata Station', date:'2026-08-08', file:'PXL_20260808_081130279.jpg'}, dateAdded:'2026-08-10'},
      {jp:'方面', romaji:'houmen', en:'bound for / direction', tags:['stations','untaught','encountered'], source:{location:'Keikyu Kamata Station', date:'2026-08-08', file:'PXL_20260808_081130279.jpg'}, dateAdded:'2026-08-10', kanjiReading: [{char:'方',reading:'hou'},{char:'面',reading:'men'}]},
      {jp:'〜方面への列車', romaji:'~ houmen e no ressha', en:'train bound for ~', tags:['stations','untaught','encountered'], source:{location:'Keikyu Kamata Station', date:'2026-08-08', file:'PXL_20260808_081130279.jpg'}, dateAdded:'2026-08-10', kanjiReadingBlocked: 'Contains a placeholder or symbol with no fixed reading of its own'},
      {jp:'列車', romaji:'ressha', en:'train', tags:['stations','untaught','encountered'], source:{location:'Keikyu Kamata Station', date:'2026-08-08', file:'PXL_20260808_081130279.jpg'}, dateAdded:'2026-08-10', kanjiReadingBlocked: 'Follows a regular sound-doubling rule not built yet - not irregular, just not modelled'},
      {jp:'発車します', romaji:'hassha shimasu', en:'will depart', tags:['stations','untaught','encountered'], seenAs:'品川・新橋方面への列車は2階ホームから発車します。- full sign: trains bound for Shinagawa/Shimbashi depart from the 2nd floor platform', source:{location:'Keikyu Kamata Station', date:'2026-08-08', file:'PXL_20260808_081130279.jpg'}, dateAdded:'2026-08-10', kanjiReadingBlocked: 'Follows a regular sound-doubling rule not built yet - not irregular, just not modelled'},
      {jp:'お並びいただき', romaji:'onarabi itadaki', en:'please line up (queue)', tags:['stations','untaught','encountered'], source:{location:'Keikyu Kamata Station', date:'2026-08-08', file:'PXL_20260808_081130279.jpg'}, dateAdded:'2026-08-10', kanjiReadingBlocked: 'This word\'s structure is more complex than this tool currently handles'},
      {jp:'中央', romaji:'chuuou', en:'center / middle', tags:['stations','untaught','encountered'], seenAs:'中央はお空けください - please leave the center open (queueing announcement)', source:{location:'Keikyu Kamata Station', date:'2026-08-08', file:'PXL_20260808_081130279.jpg'}, dateAdded:'2026-08-10', kanjiReading: [{char:'中',reading:'chuu'},{char:'央',reading:'ou'}]},
      {jp:'お空けください', romaji:'o-ake kudasai', en:'please leave (a space) open', tags:['stations','untaught','encountered'], source:{location:'Keikyu Kamata Station', date:'2026-08-08', file:'PXL_20260808_081130279.jpg'}, dateAdded:'2026-08-10', kanjiReadingBlocked: 'This word\'s structure is more complex than this tool currently handles'},
      // 出口 from this photo removed - same word as the existing でぐち
      // (Trip), now folded in there as its altForm instead.
      {jp:'山手線', romaji:'Yamanote-sen', en:'Yamanote Line', tags:['stations','untaught','encountered'], seenAs:'山手線（内回り）田町・新橋・東京・上野方面 - route header: Yamanote Line (inner loop), bound for Tamachi/Shimbashi/Tokyo/Ueno', source:{location:'Shinagawa Station', date:'2026-08-08', file:'PXL_20260808_082737195.jpg'}, dateAdded:'2026-08-10', kanjiReadingBlocked: 'Irregular reading - doesn\'t break into standard sounds, worth memorising as a whole word'},
      {jp:'内回り', romaji:'uchimawari', en:'inner loop (counter-clockwise)', tags:['stations','untaught','encountered'], source:{location:'Shinagawa Station', date:'2026-08-08', file:'PXL_20260808_082737195.jpg'}, dateAdded:'2026-08-10', kanjiReadingBlocked: 'One of this word\'s kanji doesn\'t have a recorded reading yet'},
      {jp:'約〜分後', romaji:'yaku ~fun go', en:'in approximately ~ minutes', tags:['stations','untaught','encountered'], seenAs:'山手線 約2分後 東京・上野方面 - live arrival board: Yamanote Line, in about 2 minutes, bound for Tokyo/Ueno', source:{location:'Shinagawa Station', date:'2026-08-08', file:'PXL_20260808_082737195.jpg'}, dateAdded:'2026-08-10', kanjiReadingBlocked: 'Contains a placeholder or symbol with no fixed reading of its own'},
      {jp:'バイト', romaji:'baito', en:'part-time job', tags:['stations','untaught','encountered'], source:{location:'JR train, in transit (Shinagawa-Tamachi)', date:'2026-08-08', file:'PXL_20260808_083357653.jpg'}, dateAdded:'2026-08-10'},
      {jp:'求人', romaji:'kyuujin', en:'job listing / recruitment', tags:['stations','untaught','encountered','service-ops'], source:{location:'JR train, in transit (Shinagawa-Tamachi)', date:'2026-08-08', file:'PXL_20260808_083357653.jpg'}, dateAdded:'2026-08-10', kanjiReading: [{char:'求',reading:'kyuu'},{char:'人',reading:'jin'}]},
      {jp:'まとめサイト', romaji:'matome saito', en:'aggregator / summary site', tags:['stations','untaught','encountered'], source:{location:'JR train, in transit (Shinagawa-Tamachi)', date:'2026-08-08', file:'PXL_20260808_083357653.jpg'}, dateAdded:'2026-08-10'},
      {jp:'アクセス数', romaji:'akusesu-suu', en:'number of visits / access count', tags:['stations','untaught','encountered'], source:{location:'JR train, in transit (Shinagawa-Tamachi)', date:'2026-08-08', file:'PXL_20260808_083357653.jpg'}, dateAdded:'2026-08-10', kanjiReading: [{char:'数',reading:'suu'}]},
      {jp:'マナー', romaji:'manaa', en:'manners / etiquette', tags:['stations','untaught','encountered'], source:{location:'JR train, in transit (Shinagawa-Tamachi)', date:'2026-08-08', file:'PXL_20260808_083357653.jpg'}, dateAdded:'2026-08-10'},
      {jp:'車内', romaji:'shanai', en:'inside the train / vehicle', tags:['stations','untaught','encountered'], source:{location:'JR train, in transit (Shinagawa-Tamachi)', date:'2026-08-08', file:'PXL_20260808_083357653.jpg'}, dateAdded:'2026-08-10', kanjiReading: [{char:'車',reading:'sha'},{char:'内',reading:'nai'}]},
      {jp:'携帯電話', romaji:'keitai denwa', en:'mobile phone', tags:['stations','untaught','encountered'], source:{location:'JR train, in transit (Shinagawa-Tamachi)', date:'2026-08-08', file:'PXL_20260808_083357653.jpg'}, dateAdded:'2026-08-10', kanjiReading: [{char:'携',reading:'kei'},{char:'帯',reading:'tai'},{char:'電',reading:'den'},{char:'話',reading:'wa'}]},
      {jp:'ご協力ください', romaji:'gokyouryoku kudasai', en:'please cooperate', tags:['stations','untaught','encountered'], seenAs:'車内の携帯電話のご利用マナーにご協力ください。- please observe mobile phone etiquette on the train (full announcement)', source:{location:'JR train, in transit (Shinagawa-Tamachi)', date:'2026-08-08', file:'PXL_20260808_083357653.jpg'}, dateAdded:'2026-08-10', kanjiReading: [{char:'協',reading:'kyou'},{char:'力',reading:'ryoku'}]},
      {jp:'とことん', romaji:'tokoton', en:'thoroughly / to the utmost', tags:['stations','untaught','encountered'], seenAs:'とことん期待を超える。とことん感動を届けていく。まじめに、まっすぐ - we thoroughly exceed expectations, thoroughly deliver inspiration. Sincere and straightforward (company slogan)', source:{location:'Akihabara Station (JR platform)', date:'2026-08-08', file:'PXL_20260808_110228284.jpg'}, dateAdded:'2026-08-10'},
      {jp:'ゼネコン', romaji:'zenekon', en:'general contractor (construction)', tags:['stations','untaught','encountered'], source:{location:'Akihabara Station (JR platform)', date:'2026-08-08', file:'PXL_20260808_110228284.jpg'}, dateAdded:'2026-08-10'},
      {jp:'組', romaji:'gumi', en:'company / group / crew (suffix)', tags:['stations','untaught','encountered'], source:{location:'Akihabara Station (JR platform)', date:'2026-08-08', file:'PXL_20260808_110228284.jpg'}, dateAdded:'2026-08-10', kanjiReading: [{char:'組',reading:'gumi'}]},
      {jp:'建築', romaji:'kenchiku', en:'architecture / construction', tags:['stations','untaught','encountered'], source:{location:'Akihabara Station (JR platform)', date:'2026-08-08', file:'PXL_20260808_110228284.jpg'}, dateAdded:'2026-08-10', kanjiReading: [{char:'建',reading:'ken'},{char:'築',reading:'chiku'}]},
      {jp:'土木', romaji:'doboku', en:'civil engineering', tags:['stations','untaught','encountered'], source:{location:'Akihabara Station (JR platform)', date:'2026-08-08', file:'PXL_20260808_110228284.jpg'}, dateAdded:'2026-08-10', kanjiReading: [{char:'土',reading:'do'},{char:'木',reading:'boku'}]},
      {jp:'環境', romaji:'kankyou', en:'environment', tags:['stations','untaught','encountered'], source:{location:'Akihabara Station (JR platform)', date:'2026-08-08', file:'PXL_20260808_110228284.jpg'}, dateAdded:'2026-08-10', kanjiReading: [{char:'環',reading:'kan'},{char:'境',reading:'kyou'}]},
      {jp:'期待', romaji:'kitai', en:'expectation', tags:['stations','untaught','encountered'], source:{location:'Akihabara Station (JR platform)', date:'2026-08-08', file:'PXL_20260808_110228284.jpg'}, dateAdded:'2026-08-10', kanjiReading: [{char:'期',reading:'ki'},{char:'待',reading:'tai'}]},
      {jp:'超える', romaji:'koeru', en:'to exceed / surpass', tags:['stations','untaught','encountered'], source:{location:'Akihabara Station (JR platform)', date:'2026-08-08', file:'PXL_20260808_110228284.jpg'}, dateAdded:'2026-08-10', kanjiReading: [{char:'超',reading:'ko'}]},
      {jp:'感動', romaji:'kandou', en:'deeply moved / inspiration', tags:['stations','untaught','encountered'], source:{location:'Akihabara Station (JR platform)', date:'2026-08-08', file:'PXL_20260808_110228284.jpg'}, dateAdded:'2026-08-10', kanjiReading: [{char:'感',reading:'kan'},{char:'動',reading:'dou'}]},
      {jp:'届ける', romaji:'todokeru', en:'to deliver', tags:['stations','untaught','encountered'], source:{location:'Akihabara Station (JR platform)', date:'2026-08-08', file:'PXL_20260808_110228284.jpg'}, dateAdded:'2026-08-10', kanjiReading: [{char:'届',reading:'todo'}]},
      {jp:'まじめ', romaji:'majime', en:'serious / sincere / diligent', tags:['stations','untaught','encountered'], source:{location:'Akihabara Station (JR platform)', date:'2026-08-08', file:'PXL_20260808_110228284.jpg'}, dateAdded:'2026-08-10'},
      {jp:'まっすぐ', romaji:'massugu', en:'straight / straightforward', tags:['stations','untaught','encountered','directions','te-around','tourist'], source:{location:'Akihabara Station (JR platform)', date:'2026-08-08', file:'PXL_20260808_110228284.jpg'}, dateAdded:'2026-08-10'},
      {jp:'自由席', romaji:'jiyuuseki', en:'non-reserved seat', tags:['stations','untaught','encountered'], source:{location:'Sapporo Station', date:'2026-08-10', file:'PXL_20260810_013928238.jpg'}, dateAdded:'2026-08-10', kanjiReading: [{char:'自',reading:'ji'},{char:'由',reading:'yuu'},{char:'席',reading:'seki'}]},
      {jp:'乗車口', romaji:'jousha-guchi', en:'boarding entrance', tags:['stations','untaught','encountered'], source:{location:'Sapporo Station', date:'2026-08-10', file:'PXL_20260810_013928238.jpg'}, dateAdded:'2026-08-10', kanjiReading: [{char:'乗',reading:'jou'},{char:'車',reading:'sha'},{char:'口',reading:'guchi'}]},
      {jp:'号車', romaji:'gousha', en:'train car number', tags:['stations','untaught','encountered'], source:{location:'Sapporo Station', date:'2026-08-10', file:'PXL_20260810_013928238.jpg'}, dateAdded:'2026-08-10', kanjiReading: [{char:'号',reading:'gou'},{char:'車',reading:'sha'}]},
      {jp:'起きる', romaji:'okiru', en:'to wake up / get up', tags:['stations','untaught','encountered'], source:{location:'JR train, in transit (Sapporo-Otaru)', date:'2026-08-10', file:'PXL_20260810_022129975.jpg'}, dateAdded:'2026-08-10', kanjiReading: [{char:'起',reading:'o'}]},
      {jp:'朝陽', romaji:'asahi', en:'morning sun', tags:['stations','untaught','encountered'], altForm:'朝日 (more common kanji form)', source:{location:'JR train, in transit (Sapporo-Otaru)', date:'2026-08-10', file:'PXL_20260810_022129975.jpg'}, dateAdded:'2026-08-10', kanjiReading: [{char:'朝',reading:'asa'},{char:'陽',reading:'hi'}]},
      {jp:'代わりに', romaji:'kawari ni', en:'instead of / in place of', tags:['stations','untaught','encountered'], source:{location:'JR train, in transit (Sapporo-Otaru)', date:'2026-08-10', file:'PXL_20260810_022129975.jpg'}, dateAdded:'2026-08-10', kanjiReadingBlocked: 'This word\'s structure is more complex than this tool currently handles'},
      {jp:'生活', romaji:'seikatsu', en:'daily life / living', tags:['stations','untaught','encountered'], source:{location:'JR train, in transit (Sapporo-Otaru)', date:'2026-08-10', file:'PXL_20260810_022129975.jpg'}, dateAdded:'2026-08-10', kanjiReading: [{char:'生',reading:'sei'},{char:'活',reading:'katsu'}]},
      {jp:'リズム', romaji:'rizumu', en:'rhythm', tags:['stations','untaught','encountered'], source:{location:'JR train, in transit (Sapporo-Otaru)', date:'2026-08-10', file:'PXL_20260810_022129975.jpg'}, dateAdded:'2026-08-10'},
      {jp:'整える', romaji:'totonoeru', en:'to arrange / regulate', tags:['stations','untaught','encountered'], source:{location:'JR train, in transit (Sapporo-Otaru)', date:'2026-08-10', file:'PXL_20260810_022129975.jpg'}, dateAdded:'2026-08-10', kanjiReading: [{char:'整',reading:'totono'}]},
      {jp:'快適', romaji:'kaiteki', en:'comfortable', tags:['stations','untaught','encountered'], source:{location:'JR train, in transit (Sapporo-Otaru)', date:'2026-08-10', file:'PXL_20260810_022247922.jpg'}, dateAdded:'2026-08-10', kanjiReading: [{char:'快',reading:'kai'},{char:'適',reading:'teki'}]},
      // 車内/shanai from this photo dropped - exact repeat of the entry
      // already added from the Shinagawa-Tamachi train a few days earlier.
      {jp:'ガタゴト', romaji:'gatagoto', en:'clickety-clack (train sound)', tags:['stations','untaught','encountered'], source:{location:'JR train, in transit (Sapporo-Otaru)', date:'2026-08-10', file:'PXL_20260810_022247922.jpg'}, dateAdded:'2026-08-10'},
      {jp:'スタンプラリー', romaji:'sutanpu rarii', en:'stamp rally', tags:['stations','untaught','encountered'], source:{location:'JR train, in transit (Sapporo-Otaru)', date:'2026-08-10', file:'PXL_20260810_022247922.jpg'}, dateAdded:'2026-08-10'},
      {jp:'住民', romaji:'juumin', en:'resident / inhabitant', tags:['stations','untaught','encountered'], source:{location:'JR train, in transit (Sapporo-Otaru)', date:'2026-08-10', file:'PXL_20260810_022247922.jpg'}, dateAdded:'2026-08-10', kanjiReading: [{char:'住',reading:'juu'},{char:'民',reading:'min'}]},
      {jp:'会いに行こう', romaji:'ai ni ikou', en:'let\'s go meet', tags:['stations','untaught','encountered'], source:{location:'JR train, in transit (Sapporo-Otaru)', date:'2026-08-10', file:'PXL_20260810_022247922.jpg'}, dateAdded:'2026-08-10', kanjiReadingBlocked: 'This word\'s structure is more complex than this tool currently handles'},
      {jp:'当駅', romaji:'toueki', en:'this station', tags:['stations','untaught','encountered'], source:{location:'Otaru Station', date:'2026-08-10', file:'PXL_20260810_024627628.jpg'}, dateAdded:'2026-08-10', kanjiReading: [{char:'当',reading:'tou'},{char:'駅',reading:'eki'}]},
      {jp:'より先', romaji:'yori saki', en:'beyond / from...onward', tags:['stations','untaught','encountered'], source:{location:'Otaru Station', date:'2026-08-10', file:'PXL_20260810_024627628.jpg'}, dateAdded:'2026-08-10', kanjiReadingBlocked: 'Irregular reading - doesn\'t break into standard sounds, worth memorising as a whole word'},
      {jp:'エリア外', romaji:'earia gai', en:'outside the (coverage) area', tags:['stations','untaught','encountered'], source:{location:'Otaru Station', date:'2026-08-10', file:'PXL_20260810_024627628.jpg'}, dateAdded:'2026-08-10', kanjiReadingBlocked: 'This word\'s structure is more complex than this tool currently handles'},
      {jp:'使えません', romaji:'tsukaemasen', en:'cannot be used', tags:['stations','untaught','encountered'], source:{location:'Otaru Station', date:'2026-08-10', file:'PXL_20260810_024627628.jpg'}, dateAdded:'2026-08-10', kanjiReading: [{char:'使',reading:'tsuka'}]},
      {jp:'きっぷ', romaji:'kippu', en:'ticket', tags:['stations','taught','encountered','L3','general-l3','l3-6'], altForm:'切符 (kanji form)', source:{location:'Otaru Station', date:'2026-08-10', file:'PXL_20260810_024627628.jpg'}, dateAdded:'2026-08-10'},
      {jp:'買い求める', romaji:'kaimotomeru', en:'to purchase', tags:['stations','untaught','encountered'], seenAs:'当駅にて「きっぷ」をお買い求めください。- please purchase a ticket at this station', source:{location:'Otaru Station', date:'2026-08-10', file:'PXL_20260810_024627628.jpg'}, dateAdded:'2026-08-10', kanjiReading: [{char:'買',reading:'ka'},{char:'求',reading:'moto'}]},
      {jp:'食べらさる', romaji:'taberasaru', en:'can\'t help but eat (Hokkaido dialect)', tags:['stations','untaught','encountered'], source:{location:'Sapporo (subway/train car)', date:'2026-08-13', file:'PXL_20260813_003723150.jpg'}, dateAdded:'2026-08-14', kanjiReading: [{char:'食',reading:'ta'}]},
      {jp:'北海道米', romaji:'Hokkaidou-mai', en:'Hokkaido-grown rice', tags:['stations','untaught','encountered'], source:{location:'Sapporo (subway/train car)', date:'2026-08-13', file:'PXL_20260813_003723150.jpg'}, dateAdded:'2026-08-14', kanjiReadingBlocked: 'Irregular reading - doesn\'t break into standard sounds, worth memorising as a whole word'},
      {jp:'安全', romaji:'anzen', en:'safety', tags:['stations','untaught','encountered'], source:{location:'Sapporo (bus)', date:'2026-08-13', file:'PXL_20260813_005721923.jpg'}, dateAdded:'2026-08-14', kanjiReading: [{char:'安',reading:'an'},{char:'全',reading:'zen'}]},
      {jp:'停止後', romaji:'teishigo', en:'after stopping', tags:['stations','untaught','encountered'], source:{location:'Sapporo (bus)', date:'2026-08-13', file:'PXL_20260813_005721923.jpg'}, dateAdded:'2026-08-14', kanjiReading: [{char:'停',reading:'tei'},{char:'止',reading:'shi'},{char:'後',reading:'go'}]},
      {jp:'移動しない', romaji:'idou shinai', en:'do not move', tags:['stations','untaught','encountered'], seenAs:'安全のため停止後扉が開くまで移動しないようにお願いします。- for safety, please do not move until the doors open after stopping', source:{location:'Sapporo (bus)', date:'2026-08-13', file:'PXL_20260813_005721923.jpg'}, dateAdded:'2026-08-14', kanjiReading: [{char:'移',reading:'i'},{char:'動',reading:'dou'}]},
      {jp:'お降りの方', romaji:'oori no kata', en:'those getting off', tags:['stations','untaught','encountered'], source:{location:'Sapporo (bus)', date:'2026-08-13', file:'PXL_20260813_030441338.jpg'}, dateAdded:'2026-08-14', kanjiReadingBlocked: 'This word\'s structure is more complex than this tool currently handles'},
      {jp:'押してください', romaji:'oshite kudasai', en:'please press', tags:['stations','untaught','encountered'], source:{location:'Sapporo (bus)', date:'2026-08-13', file:'PXL_20260813_030441338.jpg'}, dateAdded:'2026-08-14', kanjiReadingBlocked: 'This word\'s structure is more complex than this tool currently handles'},
      {jp:'おまかせ下さい', romaji:'omakase kudasai', en:'please leave it to us', tags:['stations','untaught','encountered'], source:{location:'Makomanai Station, Sapporo', date:'2026-08-13', file:'PXL_20260813_030444946.jpg'}, dateAdded:'2026-08-14', kanjiReading: [{char:'下',reading:'kuda'}]},
      {jp:'お出かけの足', romaji:'odekake no ashi', en:'your transportation for going out', tags:['stations','untaught','encountered'], source:{location:'Makomanai Station, Sapporo', date:'2026-08-13', file:'PXL_20260813_030444946.jpg'}, dateAdded:'2026-08-14', kanjiReadingBlocked: 'This word\'s structure is more complex than this tool currently handles'},
      {jp:'みんなの', romaji:'minna no', en:'everyone\'s', tags:['stations','untaught','encountered'], source:{location:'Makomanai Station, Sapporo', date:'2026-08-13', file:'PXL_20260813_033016237.jpg'}, dateAdded:'2026-08-14'},
      {jp:'のりば', romaji:'noriba', en:'boarding point / platform', tags:['stations','untaught','encountered'], source:{location:'Makomanai Station, Sapporo', date:'2026-08-13', file:'PXL_20260813_033016237.jpg'}, dateAdded:'2026-08-14'},
      {jp:'北改札口', romaji:'kita kaisatsuguchi', en:'north ticket gate', tags:['stations','untaught','encountered'], source:{location:'Makomanai Station, Sapporo', date:'2026-08-13', file:'PXL_20260813_033016237.jpg'}, dateAdded:'2026-08-14', kanjiReading: [{char:'北',reading:'kita'},{char:'改',reading:'kai'},{char:'札',reading:'satsu'},{char:'口',reading:'guchi'}]},
      {jp:'系統', romaji:'keitou', en:'(bus) route / line', tags:['stations','untaught','encountered'], source:{location:'Makomanai Station, Sapporo', date:'2026-08-13', file:'PXL_20260813_033026992.jpg'}, dateAdded:'2026-08-14', kanjiReading: [{char:'系',reading:'kei'},{char:'統',reading:'tou'}]},
      {jp:'手を離さない', romaji:'te wo hanasanai', en:'don\'t let go of your hand', tags:['stations','untaught','encountered'], source:{location:'Makomanai Station, Sapporo', date:'2026-08-13', file:'PXL_20260813_033132901.jpg'}, dateAdded:'2026-08-14', kanjiReading: [{char:'手',reading:'te'},{char:'離',reading:'hana'}]},
      {jp:'離す', romaji:'hanasu', en:'to let go / release', tags:['stations','untaught','encountered'], source:{location:'Makomanai Station, Sapporo', date:'2026-08-13', file:'PXL_20260813_033132901.jpg'}, dateAdded:'2026-08-14', kanjiReading: [{char:'離',reading:'hana'}]},
      {jp:'たてかけない', romaji:'tatekakenai', en:'don\'t lean objects (against it)', tags:['stations','untaught','encountered'], source:{location:'Osaka Monorail, Itami Airport', date:'2026-08-14', file:'PXL_20260814_043118193.jpg'}, dateAdded:'2026-08-15'},
      {jp:'乗り出さない', romaji:'noridasanai', en:'don\'t lean out / over', tags:['stations','untaught','encountered'], source:{location:'Osaka Monorail, Itami Airport', date:'2026-08-14', file:'PXL_20260814_043118193.jpg'}, dateAdded:'2026-08-15', kanjiReading: [{char:'乗',reading:'no'},{char:'出',reading:'da'}]},
      {jp:'かけ込み禁止', romaji:'kakekomi kinshi', en:'no rushing in (e.g. through closing doors)', tags:['stations','signage','untaught','encountered'], source:{location:'Osaka Monorail, Itami Airport', date:'2026-08-14', file:'PXL_20260814_043118193.jpg'}, dateAdded:'2026-08-15', kanjiReadingBlocked: 'One of this word\'s kanji doesn\'t have a recorded reading yet'},
      {jp:'広げて', romaji:'hirogete', en:'widening / making more room', tags:['stations','untaught','encountered'], seenAs:'少しスペースを広げております。- we are making a little more space (priority area for luggage, strollers, etc.)', source:{location:'Osaka Monorail (train)', date:'2026-08-14', file:'PXL_20260814_050231807.jpg'}, dateAdded:'2026-08-15', kanjiReading: [{char:'広',reading:'hiro'}]},
      {jp:'反対側', romaji:'hantaigawa', en:'opposite side', tags:['stations','untaught','encountered'], source:{location:'Osaka train (door indicator)', date:'2026-08-14', file:'PXL_20260814_050617517.jpg'}, dateAdded:'2026-08-15', kanjiReading: [{char:'反',reading:'han'},{char:'対',reading:'tai'},{char:'側',reading:'gawa'}]},
      {jp:'開きます', romaji:'hirakimasu', en:'will open (polite)', tags:['stations','untaught','encountered','service-ops'], source:{location:'Osaka train (door indicator)', date:'2026-08-14', file:'PXL_20260814_050617517.jpg'}, dateAdded:'2026-08-15', kanjiReading: [{char:'開',reading:'hira'}]},
      // 携帯電話 and ご協力 from this photo were skipped - already exact
      // duplicates elsewhere (携帯電話 is already in this very category;
      // ご協力 is in Materials — Shops).
      {jp:'歩行', romaji:'hokou', en:'walking', tags:['stations','untaught','encountered'], source:{location:'Kintetsu Railway', date:'2026-08-17', file:'PXL_20260817_024515967.jpg'}, dateAdded:'2026-08-17', kanjiReading: [{char:'歩',reading:'ho'},{char:'行',reading:'kou'}]},
      {jp:'大変危険', romaji:'taihen kiken', en:'extremely dangerous', tags:['stations','untaught','encountered'], source:{location:'Kintetsu Railway', date:'2026-08-17', file:'PXL_20260817_024515967.jpg'}, dateAdded:'2026-08-17', kanjiReading: [{char:'大',reading:'tai'},{char:'変',reading:'hen'},{char:'危',reading:'ki'},{char:'険',reading:'ken'}]},
      {jp:'おやめください', romaji:'oyame kudasai', en:'please stop / refrain from', tags:['stations','untaught','encountered'], source:{location:'Kintetsu Railway', date:'2026-08-17', file:'PXL_20260817_024515967.jpg'}, dateAdded:'2026-08-17'},
      {jp:'事故防止', romaji:'jiko boushi', en:'accident prevention', tags:['stations','emergency','untaught','encountered'], source:{location:'Kintetsu Railway', date:'2026-08-17', file:'PXL_20260817_024515967.jpg'}, dateAdded:'2026-08-17', kanjiReading: [{char:'事',reading:'ji'},{char:'故',reading:'ko'},{char:'防',reading:'bou'},{char:'止',reading:'shi'}]},
      // きっぷ and 列車 from this photo were skipped - already exact
      // duplicates in this same category.
      {jp:'座席', romaji:'zaseki', en:'seat', tags:['stations','untaught','encountered'], source:{location:'Hiroshima Station', date:'2026-08-20', file:'PXL_20260820_022523457.jpg'}, dateAdded:'2026-08-21', kanjiReading: [{char:'座',reading:'za'},{char:'席',reading:'seki'}]},
    ],
  },
  'vocab-materials-airport': {
    level: 'untaught',
    hasReference: true,
    // tagQuery (2026-08-31) - FLIP PILOT style, same reasoning as Hotel:
    // Appliances above: nothing to combine with, so this keeps its own
    // tile, just tag-scan-sourced now. All 18 items already carried
    // `airport` wholesale. This replaces the old includeItems reference to
    // にもつ (vocab-accommodation, "luggage") - that mechanism doesn't
    // survive a tagQuery flip (resolveVocabCategory's tagQuery branch
    // returns before ever checking includeItems, so leaving both in place
    // would have silently dropped にもつ from this tile). Tagged にもつ
    // `airport` directly instead, kept alongside its native `accommodation`
    // tag rather than replaced by it - unlike よやく on vocab-materials-
    // street (see that comment), luggage genuinely is dual-relevant: it
    // matters at check-in/security as much as at a hotel, so both tags
    // earn their place here rather than one being a compromise for the
    // other.
    tagQuery: { all: ['airport'], none: ['tourist'] },  // tourist words live under the Tourist pill (2026-10-15)
    label: 'Airport & flights',
    chars: '先発 定刻 共同運航便…',
    items: [
      {jp:'先発', romaji:'senpatsu', en:'departing first / first (flight)', tags:['airport','untaught','encountered'], source:{location:'Haneda Airport', date:'2026-08-09', file:'PXL_20260809_015726482.jpg'}, dateAdded:'2026-08-10', kanjiReading: [{char:'先',reading:'sen'}, {char:'発',reading:'patsu'}]},
      {jp:'定刻', romaji:'teikoku', en:'on schedule / on time', tags:['airport','untaught','encountered'], source:{location:'Haneda Airport', date:'2026-08-09', file:'PXL_20260809_015726482.jpg'}, dateAdded:'2026-08-10', kanjiReading: [{char:'定',reading:'tei'},{char:'刻',reading:'koku'}]},
      {jp:'共同運航便', romaji:'kyoudou unkou-bin', en:'codeshare flight', tags:['airport','untaught','encountered'], source:{location:'Haneda Airport', date:'2026-08-09', file:'PXL_20260809_015726482.jpg'}, dateAdded:'2026-08-10', kanjiReading: [{char:'共',reading:'kyou'},{char:'同',reading:'dou'},{char:'運',reading:'un'},{char:'航',reading:'kou'},{char:'便',reading:'bin'}]},
      {jp:'札幌', romaji:'Sapporo', en:'Sapporo (city)', tags:['airport','untaught','encountered'], source:{location:'Haneda Airport', date:'2026-08-09', file:'PXL_20260809_015726482.jpg'}, dateAdded:'2026-08-10', kanjiReadingBlocked: 'Irregular reading - doesn\'t break into standard sounds, worth memorising as a whole word'},
      // 荷物 moved to vocab-accommodation (Trip-canonical copy, already
      // has the kana/kanji altForm structure) - stored (and drillable)
      // there instead.
      {jp:'キャスター', romaji:'kyasutaa', en:'caster / wheel', tags:['airport','untaught','encountered'], source:{location:'Haneda Airport', date:'2026-08-09', file:'PXL_20260809_020136832.jpg'}, dateAdded:'2026-08-10'},
      {jp:'〜付き', romaji:'~-tsuki', en:'equipped with / including (suffix)', tags:['airport','untaught','encountered'], source:{location:'Haneda Airport', date:'2026-08-09', file:'PXL_20260809_020136832.jpg'}, dateAdded:'2026-08-10', kanjiReadingBlocked: 'Contains a placeholder or symbol with no fixed reading of its own'},
      {jp:'バギー', romaji:'bagii', en:'buggy / stroller', tags:['airport','untaught','encountered'], source:{location:'Haneda Airport', date:'2026-08-09', file:'PXL_20260809_020136832.jpg'}, dateAdded:'2026-08-10'},
      {jp:'機内', romaji:'kinai', en:'inside the aircraft / in-cabin', tags:['airport','untaught','encountered'], source:{location:'Haneda Airport', date:'2026-08-09', file:'PXL_20260809_020136832.jpg'}, dateAdded:'2026-08-10', kanjiReading: [{char:'機',reading:'ki'},{char:'内',reading:'nai'}]},
      {jp:'お持ち込み', romaji:'omochikomi', en:'bringing in / carrying in', tags:['airport','untaught','encountered'], source:{location:'Haneda Airport', date:'2026-08-09', file:'PXL_20260809_020136832.jpg'}, dateAdded:'2026-08-10', kanjiReading: [{char:'持',reading:'mo'},{char:'込',reading:'ko'}]},
      {jp:'搭乗口', romaji:'toujouguchi', en:'boarding gate', tags:['airport','untaught','encountered'], seenAs:'大きな荷物、キャスター付きバッグ、ベビーバギーは機内にお持ち込み頂けません。搭乗口係員までお知らせください。- large baggage, wheeled bags, and strollers cannot be brought into the cabin; please inform the boarding gate staff (gate announcement)', source:{location:'Haneda Airport', date:'2026-08-09', file:'PXL_20260809_020136832.jpg'}, dateAdded:'2026-08-10', kanjiReading: [{char:'搭',reading:'tou'},{char:'乗',reading:'jou'},{char:'口',reading:'guchi'}]},
      {jp:'係員', romaji:'kakariin', en:'staff member / attendant', tags:['airport','untaught','encountered','service-ops'], source:{location:'Haneda Airport', date:'2026-08-09', file:'PXL_20260809_020136832.jpg'}, dateAdded:'2026-08-10', kanjiReading: [{char:'係',reading:'kakari'},{char:'員',reading:'in'}]},
      {jp:'お知らせ', romaji:'oshirase', en:'notification / letting (someone) know', tags:['airport','untaught','encountered'], source:{location:'Haneda Airport', date:'2026-08-09', file:'PXL_20260809_020136832.jpg'}, dateAdded:'2026-08-10', kanjiReading: [{char:'知',reading:'shi'}]},
      {jp:'オニオンスープ', romaji:'onion soup', en:'onion soup', tags:['airport','untaught','encountered'], source:{location:'In-flight (Haneda-Sapporo)', date:'2026-08-09', file:'PXL_20260809_025202447.jpg'}, dateAdded:'2026-08-10'},
      {jp:'ブレンドコーヒー', romaji:'burendo koohii', en:'blend coffee', tags:['airport','untaught','encountered'], source:{location:'In-flight (Haneda-Sapporo)', date:'2026-08-09', file:'PXL_20260809_025202447.jpg'}, dateAdded:'2026-08-10'},
      {jp:'麦茶', romaji:'mugicha', en:'barley tea', tags:['airport','untaught','encountered'], source:{location:'In-flight (Haneda-Sapporo)', date:'2026-08-09', file:'PXL_20260809_025202447.jpg'}, dateAdded:'2026-08-10', kanjiReading: [{char:'麦',reading:'mugi'},{char:'茶',reading:'cha'}]},
      {jp:'アップル', romaji:'appuru', en:'apple', tags:['airport','untaught','encountered'], source:{location:'In-flight (Haneda-Sapporo)', date:'2026-08-09', file:'PXL_20260809_025202447.jpg'}, dateAdded:'2026-08-10'},
      {jp:'ミネラル', romaji:'mineraru', en:'mineral', tags:['airport','untaught','encountered'], source:{location:'In-flight (Haneda-Sapporo)', date:'2026-08-09', file:'PXL_20260809_025202447.jpg'}, dateAdded:'2026-08-10'},
      {jp:'ウォーター', romaji:'wootaa', en:'water', tags:['airport','untaught','encountered'], source:{location:'In-flight (Haneda-Sapporo)', date:'2026-08-09', file:'PXL_20260809_025202447.jpg'}, dateAdded:'2026-08-10'},
    ],
  },
  'vocab-materials-restaurants-food': {
    level: 'untaught',
    hasReference: true,
    // standaloneCard: false (2026-08-31) - retired as its own tile now that
    // theme-food/-drink/-dining-phrases/-food-descriptions/-food-preparation
    // (the five-way split of what was theme-food-drink-combined, same day)
    // fully subsume it between them (all 141 items here carry `food-drink`,
    // verified with zero gaps). Data stays exactly where it is, only the
    // standalone tile goes away.
    standaloneCard: false,
    label: 'Materials — Restaurants: Food & menu',
    chars: '最強 油そば 秘伝…',
    items: [
      {jp:'最強', romaji:'saikyou', en:'strongest / the best', tags:['food-drink','untaught','encountered','food-adjective'], source:{location:'Kanda', date:'2026-08-08', file:'PXL_20260808_084941221.jpg'}, dateAdded:'2026-08-10', kanjiReading: [{char:'最',reading:'sai'},{char:'強',reading:'kyou'}]},
      {jp:'油そば', romaji:'aburasoba', en:'abura soba (broth-less ramen)', tags:['food-drink','untaught','encountered','food-type'], source:{location:'Kanda', date:'2026-08-08', file:'PXL_20260808_084941221.jpg'}, dateAdded:'2026-08-10', kanjiReading: [{char:'油',reading:'abura'}]},
      {jp:'秘伝', romaji:'hiden', en:'secret (recipe)', tags:['food-drink','untaught','encountered','food-adjective'], source:{location:'Kanda', date:'2026-08-08', file:'PXL_20260808_084941221.jpg'}, dateAdded:'2026-08-10', kanjiReading: [{char:'秘',reading:'hi'},{char:'伝',reading:'den'}]},
      {jp:'醤油', romaji:'shouyu', en:'soy sauce', tags:['food-drink','untaught','encountered','food-type'], source:{location:'Kanda', date:'2026-08-08', file:'PXL_20260808_084941221.jpg'}, dateAdded:'2026-08-10', kanjiReading: [{char:'醤',reading:'shou'},{char:'油',reading:'yu'}]},
      {jp:'北海道産', romaji:'Hokkaidou-san', en:'produced in Hokkaido', tags:['food-drink','untaught','encountered','food-adjective'], source:{location:'Kanda', date:'2026-08-08', file:'PXL_20260808_084941221.jpg'}, dateAdded:'2026-08-10', kanjiReadingBlocked: 'Irregular reading - doesn\'t break into standard sounds, worth memorising as a whole word'},
      {jp:'小麦', romaji:'komugi', en:'wheat', tags:['food-drink','untaught','encountered','food-type'], source:{location:'Kanda', date:'2026-08-08', file:'PXL_20260808_084941221.jpg'}, dateAdded:'2026-08-10', kanjiReadingBlocked: 'Irregular reading - doesn\'t break into standard sounds, worth memorising as a whole word'},
      {jp:'麺', romaji:'men', en:'noodles', tags:['food-drink','untaught','encountered','food-type'], source:{location:'Kanda', date:'2026-08-08', file:'PXL_20260808_084941221.jpg'}, dateAdded:'2026-08-10', kanjiReading: [{char:'麺',reading:'men'}]},
      {jp:'究極', romaji:'kyuukyoku', en:'ultimate', tags:['food-drink','untaught','encountered','food-adjective'], source:{location:'Kanda', date:'2026-08-08', file:'PXL_20260808_084941221.jpg'}, dateAdded:'2026-08-10', kanjiReading: [{char:'究',reading:'kyuu'},{char:'極',reading:'kyoku'}]},
      {jp:'1番人気', romaji:'ichiban ninki', en:'most popular', tags:['food-drink','untaught','encountered','food-adjective'], source:{location:'Kanda', date:'2026-08-08', file:'PXL_20260808_084941221.jpg'}, dateAdded:'2026-08-10', kanjiReadingBlocked: 'Contains a placeholder or symbol with no fixed reading of its own'},
      {jp:'定番', romaji:'teiban', en:'standard / classic (item)', tags:['food-drink','untaught','encountered','food-adjective'], source:{location:'Kanda', date:'2026-08-08', file:'PXL_20260808_084941221.jpg'}, dateAdded:'2026-08-10', kanjiReading: [{char:'定',reading:'tei'},{char:'番',reading:'ban'}]},
      {jp:'復刻版', romaji:'fukkokuban', en:'reissued / revival edition', tags:['food-drink','untaught','encountered','food-adjective'], source:{location:'Kanda', date:'2026-08-08', file:'PXL_20260808_084941221.jpg'}, dateAdded:'2026-08-10', kanjiReadingBlocked: 'Irregular reading - doesn\'t break into standard sounds, worth memorising as a whole word'},
      {jp:'激ウマ', romaji:'geki uma', en:'insanely delicious', tags:['food-drink','untaught','encountered','food-adjective'], source:{location:'Kanda', date:'2026-08-08', file:'PXL_20260808_084941221.jpg'}, dateAdded:'2026-08-10', kanjiReading: [{char:'激',reading:'geki'}]},
      {jp:'炙り', romaji:'aburi', en:'flame-seared / torched', tags:['food-drink','untaught','encountered','preparation'], source:{location:'Kanda', date:'2026-08-08', file:'PXL_20260808_084941221.jpg'}, dateAdded:'2026-08-10', kanjiReading: [{char:'炙',reading:'abu'}]},
      {jp:'チャーシュー', romaji:'chaashuu', en:'char siu (braised pork)', tags:['food-drink','untaught','encountered','food-type'], source:{location:'Kanda', date:'2026-08-08', file:'PXL_20260808_084941221.jpg'}, dateAdded:'2026-08-10'},
      {jp:'痺れる', romaji:'shibireru', en:'to go numb / tingle (spicy sensation)', tags:['food-drink','untaught','encountered','food-adjective'], source:{location:'Kanda / Akihabara', date:'2026-08-08', file:'PXL_20260808_091437118.jpg'}, dateAdded:'2026-08-10', kanjiReading: [{char:'痺',reading:'shibi'}]},
      {jp:'飲み干す', romaji:'nomihosu', en:'to drink up / drain (a cup)', tags:['food-drink','untaught','encountered','preparation'], source:{location:'Kanda / Akihabara', date:'2026-08-08', file:'PXL_20260808_091437118.jpg'}, dateAdded:'2026-08-10', kanjiReading: [{char:'飲',reading:'no'},{char:'干',reading:'ho'}]},
      {jp:'特製', romaji:'tokusei', en:'specially made / house special', tags:['food-drink','untaught','encountered','food-adjective'], source:{location:'Kanda / Akihabara', date:'2026-08-08', file:'PXL_20260808_091437118.jpg'}, dateAdded:'2026-08-10', kanjiReading: [{char:'特',reading:'toku'},{char:'製',reading:'sei'}]},
      {jp:'麻辣湯', romaji:'maaratan', en:'mala tang', tags:['food-drink','untaught','encountered','food-type'], source:{location:'Kanda / Akihabara', date:'2026-08-08', file:'PXL_20260808_091437118.jpg'}, dateAdded:'2026-08-10', kanjiReadingBlocked: 'Irregular reading - doesn\'t break into standard sounds, worth memorising as a whole word'},
      {jp:'汁無し', romaji:'shirunashi', en:'without broth / dry style', tags:['food-drink','untaught','encountered','preparation'], source:{location:'Kanda / Akihabara', date:'2026-08-08', file:'PXL_20260808_091437118.jpg'}, dateAdded:'2026-08-10', kanjiReadingBlocked: 'Irregular reading - doesn\'t break into standard sounds, worth memorising as a whole word'},
      {jp:'花椒', romaji:'kashou', en:'Sichuan peppercorn', tags:['food-drink','untaught','encountered','food-type'], source:{location:'Kanda / Akihabara', date:'2026-08-08', file:'PXL_20260808_091437118.jpg'}, dateAdded:'2026-08-10', kanjiReading: [{char:'花',reading:'ka'},{char:'椒',reading:'shou'}]},
      {jp:'酸辣', romaji:'sanra', en:'hot and sour', tags:['food-drink','untaught','encountered','food-adjective'], source:{location:'Kanda / Akihabara', date:'2026-08-08', file:'PXL_20260808_091437118.jpg'}, dateAdded:'2026-08-10', kanjiReading: [{char:'酸',reading:'san'},{char:'辣',reading:'ra'}]},
      {jp:'熟成', romaji:'jukusei', en:'aged / matured', tags:['food-drink','untaught','encountered','preparation'], source:{location:'Kanda / Akihabara', date:'2026-08-08', file:'PXL_20260808_091437118.jpg'}, dateAdded:'2026-08-10', kanjiReading: [{char:'熟',reading:'juku'},{char:'成',reading:'sei'}]},
      {jp:'黒酢', romaji:'kurozu', en:'black vinegar', tags:['food-drink','untaught','encountered','food-type'], source:{location:'Kanda / Akihabara', date:'2026-08-08', file:'PXL_20260808_091437118.jpg'}, dateAdded:'2026-08-10', kanjiReading: [{char:'黒',reading:'kuro'},{char:'酢',reading:'zu'}]},
      {jp:'爽快', romaji:'soukai', en:'refreshing / invigorating', tags:['food-drink','untaught','encountered','food-adjective'], source:{location:'Kanda / Akihabara', date:'2026-08-08', file:'PXL_20260808_091437118.jpg'}, dateAdded:'2026-08-10', kanjiReading: [{char:'爽',reading:'sou'},{char:'快',reading:'kai'}]},
      {jp:'辛さ', romaji:'karasa', en:'spiciness', tags:['food-drink','untaught','encountered','food-adjective'], source:{location:'Kanda / Akihabara', date:'2026-08-08', file:'PXL_20260808_091437118.jpg'}, dateAdded:'2026-08-10', kanjiReading: [{char:'辛',reading:'kara'}]},
      {jp:'濃厚', romaji:'noukou', en:'rich / thick (flavor)', tags:['food-drink','untaught','encountered','food-adjective'], source:{location:'Kanda / Akihabara', date:'2026-08-08', file:'PXL_20260808_091437118.jpg'}, dateAdded:'2026-08-10', kanjiReading: [{char:'濃',reading:'nou'},{char:'厚',reading:'kou'}]},
      {jp:'白湯', romaji:'paitan', en:'clear/white bone broth', tags:['food-drink','untaught','encountered','food-type'], source:{location:'Kanda / Akihabara', date:'2026-08-08', file:'PXL_20260808_091437118.jpg'}, dateAdded:'2026-08-10', kanjiReadingBlocked: 'Irregular reading - doesn\'t break into standard sounds, worth memorising as a whole word'},
      {jp:'コラーゲン', romaji:'koragen', en:'collagen', tags:['food-drink','untaught','encountered','food-type'], source:{location:'Kanda / Akihabara', date:'2026-08-08', file:'PXL_20260808_091437118.jpg'}, dateAdded:'2026-08-10'},
      {jp:'ダシ', romaji:'dashi', en:'soup stock / broth', tags:['food-drink','untaught','encountered','food-type'], source:{location:'Kanda / Akihabara', date:'2026-08-08', file:'PXL_20260808_091437118.jpg'}, dateAdded:'2026-08-10'},
      {jp:'骨', romaji:'hone', en:'bone', tags:['food-drink','untaught','encountered','food-type'], speakAs:'ほね', source:{location:'Kanda / Akihabara', date:'2026-08-08', file:'PXL_20260808_091437118.jpg'}, dateAdded:'2026-08-10', kanjiReading: [{char:'骨',reading:'hone'}]},
      {jp:'発酵', romaji:'hakkou', en:'fermented', tags:['food-drink','untaught','encountered','preparation'], source:{location:'Kanda / Akihabara', date:'2026-08-08', file:'PXL_20260808_091437118.jpg'}, dateAdded:'2026-08-10', kanjiReadingBlocked: 'Follows a regular sound-doubling rule not built yet - not irregular, just not modelled'},
      {jp:'高菜', romaji:'takana', en:'pickled mustard greens', tags:['food-drink','untaught','encountered','food-type'], source:{location:'Kanda / Akihabara', date:'2026-08-08', file:'PXL_20260808_091437118.jpg'}, dateAdded:'2026-08-10', kanjiReading: [{char:'高',reading:'taka'},{char:'菜',reading:'na'}]},
      {jp:'ヴィーガン', romaji:'viigan', en:'vegan', tags:['food-drink','untaught','encountered','food-adjective'], source:{location:'Kanda / Akihabara', date:'2026-08-08', file:'PXL_20260808_091437118.jpg'}, dateAdded:'2026-08-10'},
      {jp:'刺激', romaji:'shigeki', en:'stimulation / excitement', tags:['food-drink','untaught','encountered','food-adjective'], source:{location:'Kanda / Akihabara', date:'2026-08-08', file:'PXL_20260808_091437118.jpg'}, dateAdded:'2026-08-10', kanjiReading: [{char:'刺',reading:'shi'},{char:'激',reading:'geki'}]},
      {jp:'飢える', romaji:'ueru', en:'to starve / hunger for', tags:['food-drink','untaught','encountered','food-adjective'], seenAs:'世界はこの刺激に飢えている - the world is starving for this stimulation (tagline)', source:{location:'Kanda / Akihabara', date:'2026-08-08', file:'PXL_20260808_091437118.jpg'}, dateAdded:'2026-08-10', kanjiReading: [{char:'飢',reading:'u'}]},
      {jp:'しゃぶしゃぶ', romaji:'shabushabu', en:'shabu-shabu (hot pot)', tags:['food-drink','untaught','encountered','food-type'], source:{location:'Akihabara', date:'2026-08-08', file:'PXL_20260808_092746556.jpg'}, dateAdded:'2026-08-10'},
      {jp:'すきやき', romaji:'sukiyaki', en:'sukiyaki', tags:['food-drink','untaught','encountered','food-type'], source:{location:'Akihabara', date:'2026-08-08', file:'PXL_20260808_092746556.jpg'}, dateAdded:'2026-08-10'},
      {jp:'自家製', romaji:'jikasei', en:'homemade / house-made', tags:['food-drink','untaught','encountered','preparation'], source:{location:'Akihabara', date:'2026-08-08', file:'PXL_20260808_092746556.jpg'}, dateAdded:'2026-08-10', kanjiReading: [{char:'自',reading:'ji'},{char:'家',reading:'ka'},{char:'製',reading:'sei'}]},
      {jp:'たれ', romaji:'tare', en:'sauce', tags:['food-drink','untaught','encountered','food-type'], altForm:'タレ (also seen written in katakana)', source:{location:'Akihabara', date:'2026-08-08', file:'PXL_20260808_092746556.jpg'}, dateAdded:'2026-08-10'},
      {jp:'割下', romaji:'warishita', en:'seasoned sukiyaki sauce/broth', tags:['food-drink','untaught','encountered','food-type'], source:{location:'Akihabara', date:'2026-08-08', file:'PXL_20260808_092746556.jpg'}, dateAdded:'2026-08-10', kanjiReadingBlocked: 'Irregular reading - doesn\'t break into standard sounds, worth memorising as a whole word'},
      {jp:'生つくね', romaji:'nama tsukune', en:'raw-marinated chicken meatball (skewer)', tags:['food-drink','untaught','encountered','food-type'], source:{location:'Sapporo (izakaya)', date:'2026-08-09', file:'PXL_20260809_092359849.jpg'}, dateAdded:'2026-08-10', kanjiReading: [{char:'生',reading:'nama'}]},
      {jp:'串カツ', romaji:'kushikatsu', en:'deep-fried skewers', tags:['food-drink','untaught','encountered','food-type'], source:{location:'Sapporo (izakaya)', date:'2026-08-09', file:'PXL_20260809_092359849.jpg'}, dateAdded:'2026-08-10', kanjiReading: [{char:'串',reading:'kushi'}]},
      {jp:'焼鳥', romaji:'yakitori', en:'grilled chicken skewers', tags:['food-drink','untaught','encountered','food-type'], source:{location:'Sapporo (izakaya)', date:'2026-08-09', file:'PXL_20260809_092359849.jpg'}, dateAdded:'2026-08-10', kanjiReading: [{char:'焼',reading:'yaki'},{char:'鳥',reading:'tori'}]},
      {jp:'甘味', romaji:'kanmi', en:'sweets / dessert', tags:['food-drink','untaught','encountered','food-type'], source:{location:'Sapporo (izakaya)', date:'2026-08-09', file:'PXL_20260809_092359849.jpg'}, dateAdded:'2026-08-10', kanjiReading: [{char:'甘',reading:'kan'},{char:'味',reading:'mi'}]},
      {jp:'揚げ物', romaji:'agemono', en:'fried food', tags:['food-drink','untaught','encountered','food-type'], source:{location:'Sapporo (izakaya)', date:'2026-08-09', file:'PXL_20260809_092359849.jpg'}, dateAdded:'2026-08-10', kanjiReading: [{char:'揚',reading:'a'},{char:'物',reading:'mono'}]},
      {jp:'刺身', romaji:'sashimi', en:'sashimi', tags:['food-drink','untaught','encountered','food-type'], source:{location:'Sapporo (izakaya)', date:'2026-08-09', file:'PXL_20260809_092359849.jpg'}, dateAdded:'2026-08-10', kanjiReading: [{char:'刺',reading:'sashi'},{char:'身',reading:'mi'}]},
      {jp:'サラダ', romaji:'sarada', en:'salad', tags:['food-drink','taught','encountered','food-type','L3','food-drink-l3','l3-1'], source:{location:'Sapporo (izakaya)', date:'2026-08-09', file:'PXL_20260809_092359849.jpg'}, dateAdded:'2026-08-10'},
      {jp:'おすすめ', romaji:'osusume', en:'recommended', tags:['food-drink','untaught','encountered','food-adjective'], altForm:'オススメ (also seen written in katakana)', source:{location:'Sapporo (izakaya)', date:'2026-08-09', file:'PXL_20260809_092359849.jpg'}, dateAdded:'2026-08-10'},
      {jp:'当店名物', romaji:'touten meibutsu', en:'restaurant\'s signature dish', tags:['food-drink','untaught','encountered','food-adjective'], source:{location:'Sapporo (izakaya)', date:'2026-08-09', file:'PXL_20260809_092359849.jpg'}, dateAdded:'2026-08-10', kanjiReading: [{char:'当',reading:'tou'},{char:'店',reading:'ten'},{char:'名',reading:'mei'},{char:'物',reading:'butsu'}]},
      {jp:'大盛', romaji:'oomori', en:'large portion', tags:['food-drink','untaught','encountered','food-adjective'], source:{location:'Sapporo (izakaya)', date:'2026-08-09', file:'PXL_20260809_092359849.jpg'}, dateAdded:'2026-08-10', kanjiReading: [{char:'大',reading:'oo'},{char:'盛',reading:'mori'}]},
      {jp:'生ビール', romaji:'nama biiru', en:'draft beer', tags:['food-drink','untaught','encountered','drink'], source:{location:'Sapporo (izakaya)', date:'2026-08-09', file:'PXL_20260809_092359849.jpg'}, dateAdded:'2026-08-10', kanjiReading: [{char:'生',reading:'nama'}]},
      {jp:'ハイボール', romaji:'haiboru', en:'highball', tags:['food-drink','untaught','encountered','drink'], source:{location:'Sapporo (izakaya)', date:'2026-08-09', file:'PXL_20260809_092359849.jpg'}, dateAdded:'2026-08-10'},
      {jp:'日替わり', romaji:'higawari', en:'daily special', tags:['food-drink','untaught','encountered','food-adjective'], source:{location:'Sapporo (izakaya)', date:'2026-08-09', file:'PXL_20260809_092406118.jpg'}, dateAdded:'2026-08-10', kanjiReadingBlocked: 'One of this word\'s kanji doesn\'t have a recorded reading yet'},
      {jp:'とんかつ', romaji:'tonkatsu', en:'pork cutlet', tags:['food-drink','untaught','encountered','food-type','genki','genki-1-2'], source:{location:'Sapporo (izakaya)', date:'2026-08-09', file:'PXL_20260809_092406118.jpg'}, dateAdded:'2026-08-10'},
      {jp:'国産米', romaji:'kokusan mai', en:'domestically produced rice', tags:['food-drink','untaught','encountered','food-type'], source:{location:'Sapporo (izakaya)', date:'2026-08-09', file:'PXL_20260809_092406118.jpg'}, dateAdded:'2026-08-10', kanjiReading: [{char:'国',reading:'koku'},{char:'産',reading:'san'},{char:'米',reading:'mai'}]},
      {jp:'ソフトドリンク', romaji:'sofuto dorinku', en:'soft drink', tags:['food-drink','untaught','encountered','drink'], source:{location:'Sapporo (izakaya)', date:'2026-08-09', file:'PXL_20260809_092406118.jpg'}, dateAdded:'2026-08-10'},
      {jp:'サワー', romaji:'sawaa', en:'sour (alcoholic drink)', tags:['food-drink','untaught','encountered','drink'], source:{location:'Sapporo (izakaya)', date:'2026-08-09', file:'PXL_20260809_092412154.jpg'}, dateAdded:'2026-08-10'},
      {jp:'三大名物', romaji:'san dai meibutsu', en:'"three great specialties" (top signature items)', tags:['food-drink','untaught','encountered','food-adjective'], source:{location:'JR Inn Sapporo (hotel, researching restaurants)', date:'2026-08-09', file:'PXL_20260809_102915964.jpg'}, dateAdded:'2026-08-10', kanjiReading: [{char:'三',reading:'san'},{char:'大',reading:'dai'},{char:'名',reading:'mei'},{char:'物',reading:'butsu'}]},
      {jp:'ヤキトン', romaji:'yakiton', en:'grilled pork skewers', tags:['food-drink','untaught','encountered','food-type'], source:{location:'JR Inn Sapporo (hotel, researching restaurants)', date:'2026-08-09', file:'PXL_20260809_102915964.jpg'}, dateAdded:'2026-08-10'},
      {jp:'シロ', romaji:'shiro', en:'pork intestine (offal skewer)', tags:['food-drink','untaught','encountered','food-type'], source:{location:'JR Inn Sapporo (hotel, researching restaurants)', date:'2026-08-09', file:'PXL_20260809_102915964.jpg'}, dateAdded:'2026-08-10'},
      {jp:'鳥レバー', romaji:'tori rebaa', en:'chicken liver', tags:['food-drink','untaught','encountered','food-type'], source:{location:'JR Inn Sapporo (hotel, researching restaurants)', date:'2026-08-09', file:'PXL_20260809_102915964.jpg'}, dateAdded:'2026-08-10', kanjiReading: [{char:'鳥',reading:'tori'}]},
      {jp:'ささみ', romaji:'sasami', en:'chicken breast / tenderloin', tags:['food-drink','untaught','encountered','food-type'], source:{location:'JR Inn Sapporo (hotel, researching restaurants)', date:'2026-08-09', file:'PXL_20260809_102915964.jpg'}, dateAdded:'2026-08-10'},
      {jp:'わさび', romaji:'wasabi', en:'wasabi', tags:['food-drink','untaught','encountered','food-type'], source:{location:'JR Inn Sapporo (hotel, researching restaurants)', date:'2026-08-09', file:'PXL_20260809_102915964.jpg'}, dateAdded:'2026-08-10'},
      {jp:'梅しそ', romaji:'ume shiso', en:'plum and shiso (flavor combo)', tags:['food-drink','untaught','encountered','food-type'], source:{location:'JR Inn Sapporo (hotel, researching restaurants)', date:'2026-08-09', file:'PXL_20260809_102915964.jpg'}, dateAdded:'2026-08-10', kanjiReading: [{char:'梅',reading:'ume'}]},
      {jp:'おろしポン酢', romaji:'oroshi ponzu', en:'grated daikon with ponzu sauce', tags:['food-drink','untaught','encountered','food-type'], source:{location:'JR Inn Sapporo (hotel, researching restaurants)', date:'2026-08-09', file:'PXL_20260809_102915964.jpg'}, dateAdded:'2026-08-10', kanjiReading: [{char:'酢',reading:'zu'}]},
      {jp:'レバ刺し', romaji:'reba sashi', en:'raw liver sashimi', tags:['food-drink','untaught','encountered','food-type'], source:{location:'JR Inn Sapporo (hotel, researching restaurants)', date:'2026-08-09', file:'PXL_20260809_102915964.jpg'}, dateAdded:'2026-08-10', kanjiReadingBlocked: 'Irregular reading - doesn\'t break into standard sounds, worth memorising as a whole word'},
      {jp:'角ハイボール', romaji:'kaku haiboru', en:'"Kaku" whisky highball', tags:['food-drink','untaught','encountered','drink'], source:{location:'JR Inn Sapporo (hotel, researching restaurants)', date:'2026-08-09', file:'PXL_20260809_102915964.jpg'}, dateAdded:'2026-08-10', kanjiReadingBlocked: 'This word\'s structure is more complex than this tool currently handles'},
      {jp:'野菜', romaji:'yasai', en:'vegetables', tags:['food-drink','untaught','encountered','food-type'], source:{location:'JR Inn Sapporo (hotel, researching restaurants)', date:'2026-08-09', file:'PXL_20260809_103035424.jpg'}, dateAdded:'2026-08-10', kanjiReading: [{char:'野',reading:'ya'},{char:'菜',reading:'sai'}]},
      {jp:'鶏', romaji:'tori', en:'chicken', tags:['food-drink','untaught','encountered','food-type'], speakAs:'とり', source:{location:'JR Inn Sapporo (hotel, researching restaurants)', date:'2026-08-09', file:'PXL_20260809_103035424.jpg'}, dateAdded:'2026-08-10', kanjiReading: [{char:'鶏',reading:'tori'}]},
      {jp:'飯', romaji:'meshi', en:'rice / meal', tags:['food-drink','untaught','encountered','food-type'], speakAs:'めし', source:{location:'JR Inn Sapporo (hotel, researching restaurants)', date:'2026-08-09', file:'PXL_20260809_103035424.jpg'}, dateAdded:'2026-08-10', kanjiReading: [{char:'飯',reading:'meshi'}]},
      {jp:'果実酒', romaji:'kajitsushu', en:'fruit liqueur', tags:['food-drink','untaught','encountered','drink'], source:{location:'JR Inn Sapporo (hotel, researching restaurants)', date:'2026-08-09', file:'PXL_20260809_103035424.jpg'}, dateAdded:'2026-08-10', kanjiReading: [{char:'果',reading:'ka'},{char:'実',reading:'jitsu'},{char:'酒',reading:'shu'}]},
      {jp:'焼酎', romaji:'shouchu', en:'shochu (Japanese spirit)', tags:['food-drink','untaught','encountered','drink'], source:{location:'JR Inn Sapporo (hotel, researching restaurants)', date:'2026-08-09', file:'PXL_20260809_103035424.jpg'}, dateAdded:'2026-08-10', kanjiReading: [{char:'焼',reading:'shou'},{char:'酎',reading:'chu'}]},
      {jp:'日本酒', romaji:'nihonshu', en:'sake (Japanese rice wine)', tags:['food-drink','untaught','encountered','drink'], source:{location:'JR Inn Sapporo (hotel, researching restaurants)', date:'2026-08-09', file:'PXL_20260809_103035424.jpg'}, dateAdded:'2026-08-10', kanjiReading: [{char:'日',reading:'ni'},{char:'本',reading:'hon'},{char:'酒',reading:'shu'}]},
      {jp:'出来立て', romaji:'dekitate', en:'freshly made', tags:['food-drink','untaught','encountered','preparation'], source:{location:'Yayoiken, Sapporo Station area', date:'2026-08-11', file:'PXL_20260811_111851441.jpg'}, dateAdded:'2026-08-11', kanjiReading: [{char:'出',reading:'de'},{char:'来',reading:'ki'},{char:'立',reading:'ta'}]},
      {jp:'こだわり', romaji:'kodawari', en:'particular commitment to quality', tags:['food-drink','untaught','encountered','food-adjective'], source:{location:'Yayoiken, Sapporo Station area', date:'2026-08-11', file:'PXL_20260811_111851441.jpg'}, dateAdded:'2026-08-11'},
      // 定食 from this photo removed - same word as the existing ていしょく
      // (Trip), now folded in there as its altForm instead.
      {jp:'特', romaji:'toku', en:'special (prefix)', tags:['food-drink','untaught','encountered','food-adjective'], source:{location:'Yayoiken, Sapporo Station area', date:'2026-08-11', file:'PXL_20260811_111921577.jpg'}, dateAdded:'2026-08-11', kanjiReading: [{char:'特',reading:'toku'}]},
      {jp:'コーラ', romaji:'koora', en:'cola', tags:['food-drink','untaught','encountered','drink'], source:{location:'Yayoiken, Sapporo Station area', date:'2026-08-11', file:'PXL_20260811_111943166.jpg'}, dateAdded:'2026-08-11'},
      {jp:'相性抜群', romaji:'aishou batsugun', en:'excellent pairing / great match', tags:['food-drink','untaught','encountered','food-adjective'], source:{location:'Yayoiken, Sapporo', date:'2026-08-12', file:'PXL_20260812_105641436.jpg'}, dateAdded:'2026-08-14', kanjiReadingBlocked: 'Irregular reading - doesn\'t break into standard sounds, worth memorising as a whole word'},
      {jp:'フライドポテト', romaji:'furaido poteto', en:'french fries', tags:['food-drink','taught','encountered','food-type','L3','food-drink-l3','loanwords-l3','l3-5'], source:{location:'Yayoiken, Sapporo', date:'2026-08-12', file:'PXL_20260812_105641436.jpg'}, dateAdded:'2026-08-14'},
      {jp:'サバ', romaji:'saba', en:'mackerel', tags:['food-drink','untaught','encountered','food-type'], source:{location:'Yayoiken, Sapporo', date:'2026-08-12', file:'PXL_20260812_105645435.jpg'}, dateAdded:'2026-08-14'},
      {jp:'塩焼', romaji:'shioyaki', en:'salt-grilled', tags:['food-drink','untaught','encountered','preparation'], source:{location:'Yayoiken, Sapporo', date:'2026-08-12', file:'PXL_20260812_105645435.jpg'}, dateAdded:'2026-08-14', kanjiReading: [{char:'塩',reading:'shio'},{char:'焼',reading:'yaki'}]},
      {jp:'ジューシー', romaji:'juushii', en:'juicy', tags:['food-drink','untaught','encountered','food-adjective'], source:{location:'Yayoiken, Sapporo', date:'2026-08-12', file:'PXL_20260812_105645435.jpg'}, dateAdded:'2026-08-14'},
      {jp:'肉汁', romaji:'nikujiru', en:'meat juice', tags:['food-drink','untaught','encountered','food-type'], source:{location:'Yayoiken, Sapporo', date:'2026-08-12', file:'PXL_20260812_105645435.jpg'}, dateAdded:'2026-08-14', kanjiReading: [{char:'肉',reading:'niku'},{char:'汁',reading:'jiru'}]},
      {jp:'たまらない', romaji:'tamaranai', en:'irresistible', tags:['food-drink','untaught','encountered','food-adjective'], source:{location:'Yayoiken, Sapporo', date:'2026-08-12', file:'PXL_20260812_105645435.jpg'}, dateAdded:'2026-08-14'},
      {jp:'チキン南蛮', romaji:'chikin nanban', en:'fried chicken with tartar sauce', tags:['food-drink','untaught','encountered','food-type'], source:{location:'Yayoiken, Sapporo', date:'2026-08-12', file:'PXL_20260812_105645435.jpg'}, dateAdded:'2026-08-14', kanjiReadingBlocked: 'One of this word\'s kanji doesn\'t have a recorded reading yet'},
      {jp:'デミハンバーグ', romaji:'demi hanbaagu', en:'hamburger steak with demi-glace sauce', tags:['food-drink','untaught','encountered','food-type'], source:{location:'Yayoiken, Sapporo', date:'2026-08-12', file:'PXL_20260812_105645435.jpg'}, dateAdded:'2026-08-14'},
      {jp:'人気コンビ', romaji:'ninki konbi', en:'popular combo', tags:['food-drink','untaught','encountered','food-adjective'], source:{location:'Yayoiken, Sapporo', date:'2026-08-12', file:'PXL_20260812_105653120.jpg'}, dateAdded:'2026-08-14', kanjiReading: [{char:'人',reading:'nin'},{char:'気',reading:'ki'}]},
      {jp:'なす味噌', romaji:'nasu miso', en:'eggplant miso', tags:['food-drink','untaught','encountered','food-type'], source:{location:'Yayoiken, Sapporo', date:'2026-08-12', file:'PXL_20260812_105653120.jpg'}, dateAdded:'2026-08-14', kanjiReadingBlocked: 'One of this word\'s kanji doesn\'t have a recorded reading yet'},
      {jp:'焼魚', romaji:'yakizakana', en:'grilled fish', tags:['food-drink','untaught','encountered','food-type'], source:{location:'Yayoiken, Sapporo', date:'2026-08-12', file:'PXL_20260812_105653120.jpg'}, dateAdded:'2026-08-14', kanjiReading: [{char:'焼',reading:'yaki'},{char:'魚',reading:'zakana'}]},
      {jp:'懐かしい', romaji:'natsukashii', en:'nostalgic', tags:['food-drink','untaught','encountered','food-adjective'], source:{location:'Yayoiken, Sapporo', date:'2026-08-12', file:'PXL_20260812_105653120.jpg'}, dateAdded:'2026-08-14', kanjiReading: [{char:'懐',reading:'natsu'}]},
      {jp:'エビフライ', romaji:'ebi furai', en:'fried shrimp', tags:['food-drink','untaught','encountered','food-type'], source:{location:'Yayoiken, Sapporo', date:'2026-08-12', file:'PXL_20260812_105653120.jpg'}, dateAdded:'2026-08-14'},
      // 大盛 and おにぎり from this photo were skipped - already exact
      // duplicates (大盛 already in this category; おにぎり already covered
      // by the Trip-tier Food & drink category).
      {jp:'かけ', romaji:'kake', en:'plain broth udon/soba (no toppings)', tags:['food-drink','untaught','encountered','food-type'], source:{location:'Shinsekai, Osaka', date:'2026-08-17', file:'PXL_20260817_014500496.jpg'}, dateAdded:'2026-08-17'},
      {jp:'月見', romaji:'tsukimi', en:'moon-viewing (raw egg topping)', tags:['food-drink','untaught','encountered','food-type'], source:{location:'Shinsekai, Osaka', date:'2026-08-17', file:'PXL_20260817_014500496.jpg'}, dateAdded:'2026-08-17', kanjiReading: [{char:'月',reading:'tsuki'},{char:'見',reading:'mi'}]},
      {jp:'きつね', romaji:'kitsune', en:'fried tofu topping', tags:['food-drink','untaught','encountered','food-type'], source:{location:'Shinsekai, Osaka', date:'2026-08-17', file:'PXL_20260817_014500496.jpg'}, dateAdded:'2026-08-17'},
      {jp:'たぬき', romaji:'tanuki', en:'tempura scraps topping', tags:['food-drink','untaught','encountered','food-type'], source:{location:'Shinsekai, Osaka', date:'2026-08-17', file:'PXL_20260817_014500496.jpg'}, dateAdded:'2026-08-17'},
      {jp:'かき揚げ', romaji:'kakiage', en:'mixed vegetable/seafood tempura fritter', tags:['food-drink','untaught','encountered','food-type'], source:{location:'Shinsekai, Osaka', date:'2026-08-17', file:'PXL_20260817_014500496.jpg'}, dateAdded:'2026-08-17', kanjiReading: [{char:'揚',reading:'a'}]},
      {jp:'いなり', romaji:'inari', en:'inari sushi (fried tofu pouch)', tags:['food-drink','untaught','encountered','food-type'], source:{location:'Shinsekai, Osaka', date:'2026-08-17', file:'PXL_20260817_014500496.jpg'}, dateAdded:'2026-08-17'},
      {jp:'かやくご飯', romaji:'kayaku gohan', en:'mixed rice (with vegetables/meat)', tags:['food-drink','untaught','encountered','food-type'], source:{location:'Shinsekai, Osaka', date:'2026-08-17', file:'PXL_20260817_014500496.jpg'}, dateAdded:'2026-08-17', kanjiReading: [{char:'飯',reading:'han'}]},
      {jp:'ざるうどん', romaji:'zaru udon', en:'cold udon served on a tray', tags:['food-drink','untaught','encountered','food-type'], source:{location:'Shinsekai, Osaka', date:'2026-08-17', file:'PXL_20260817_014500496.jpg'}, dateAdded:'2026-08-17'},
      {jp:'じゃがいも', romaji:'jagaimo', en:'potato', tags:['food-drink','untaught','encountered','food-type'], source:{location:'Tenjinbashi-suji Shopping Street, Osaka', date:'2026-08-17', file:'PXL_20260817_064540897.jpg'}, dateAdded:'2026-08-17'},
      {jp:'さつま芋', romaji:'satsumaimo', en:'sweet potato', tags:['food-drink','untaught','encountered','food-type'], source:{location:'Tenjinbashi-suji Shopping Street, Osaka', date:'2026-08-17', file:'PXL_20260817_064540897.jpg'}, dateAdded:'2026-08-17', kanjiReading: [{char:'芋',reading:'imo'}]},
      {jp:'紅しょうが', romaji:'beni shouga', en:'red pickled ginger', tags:['food-drink','untaught','encountered','food-type'], source:{location:'Tenjinbashi-suji Shopping Street, Osaka', date:'2026-08-17', file:'PXL_20260817_064540897.jpg'}, dateAdded:'2026-08-17', kanjiReadingBlocked: 'Contains a placeholder or symbol with no fixed reading of its own'},
      {jp:'かぼちゃ', romaji:'kabocha', en:'pumpkin', tags:['food-drink','untaught','encountered','food-type'], source:{location:'Tenjinbashi-suji Shopping Street, Osaka', date:'2026-08-17', file:'PXL_20260817_064540897.jpg'}, dateAdded:'2026-08-17'},
      {jp:'ししとう', romaji:'shishitou', en:'shishito pepper', tags:['food-drink','untaught','encountered','food-type'], source:{location:'Tenjinbashi-suji Shopping Street, Osaka', date:'2026-08-17', file:'PXL_20260817_064540897.jpg'}, dateAdded:'2026-08-17'},
      {jp:'げそ', romaji:'geso', en:'squid legs (skewer)', tags:['food-drink','untaught','encountered','food-type'], source:{location:'Tenjinbashi-suji Shopping Street, Osaka', date:'2026-08-17', file:'PXL_20260817_064540897.jpg'}, dateAdded:'2026-08-17'},
      {jp:'うずら卵', romaji:'uzura tamago', en:'quail egg', tags:['food-drink','untaught','encountered','food-type'], source:{location:'Tenjinbashi-suji Shopping Street, Osaka', date:'2026-08-17', file:'PXL_20260817_064540897.jpg'}, dateAdded:'2026-08-17', kanjiReading: [{char:'卵',reading:'tamago'}]},
      {jp:'どて焼き', romaji:'doteyaki', en:'beef tendon simmered in miso', tags:['food-drink','untaught','encountered','food-type'], source:{location:'Tenjinbashi-suji Shopping Street, Osaka', date:'2026-08-17', file:'PXL_20260817_064540897.jpg'}, dateAdded:'2026-08-17', kanjiReadingBlocked: 'Irregular reading - doesn\'t break into standard sounds, worth memorising as a whole word'},
      {jp:'ゴボ天', romaji:'gobou ten', en:'burdock root tempura', tags:['food-drink','untaught','encountered','food-type'], source:{location:'Tenjinbashi-suji Shopping Street, Osaka', date:'2026-08-17', file:'PXL_20260817_064540897.jpg'}, dateAdded:'2026-08-17', kanjiReadingBlocked: 'Irregular reading - doesn\'t break into standard sounds, worth memorising as a whole word'},
      {jp:'こんにゃく', romaji:'konnyaku', en:'konjac (jelly-like root vegetable)', tags:['food-drink','untaught','encountered','food-type'], source:{location:'Tenjinbashi-suji Shopping Street, Osaka', date:'2026-08-17', file:'PXL_20260817_064540897.jpg'}, dateAdded:'2026-08-17'},
      {jp:'厚あげ', romaji:'atsuage', en:'thick fried tofu', tags:['food-drink','untaught','encountered','food-type'], altForm:'厚揚げ (full kanji form)', source:{location:'Tenjinbashi-suji Shopping Street, Osaka', date:'2026-08-17', file:'PXL_20260817_064540897.jpg'}, dateAdded:'2026-08-17', kanjiReading: [{char:'厚',reading:'atsu'}]},
      {jp:'冷奴', romaji:'hiyayakko', en:'cold tofu (dish)', tags:['food-drink','untaught','encountered','food-type'], source:{location:'Tenjinbashi-suji Shopping Street, Osaka', date:'2026-08-17', file:'PXL_20260817_064540897.jpg'}, dateAdded:'2026-08-17', kanjiReadingBlocked: 'Irregular reading - doesn\'t break into standard sounds, worth memorising as a whole word'},
      {jp:'造り', romaji:'tsukuri', en:'sashimi / sliced raw fish', tags:['food-drink','untaught','encountered','food-type'], source:{location:'Kyomachiya Obanzai Kohaku, Kyoto', date:'2026-08-23', file:'PXL_20260823_121038547.jpg'}, dateAdded:'2026-08-24', kanjiReading: [{char:'造',reading:'tsuku'}]},
      {jp:'唐揚げ', romaji:'karaage', en:'Japanese-style deep-fried (usually chicken)', tags:['food-drink','untaught','encountered','food-type'], source:{location:'Kyomachiya Obanzai Kohaku, Kyoto', date:'2026-08-23', file:'PXL_20260823_121038547.jpg'}, dateAdded:'2026-08-24', kanjiReadingBlocked: 'Irregular reading - doesn\'t break into standard sounds, worth memorising as a whole word'},
      {jp:'塩こうじ', romaji:'shio kouji', en:'salt kouji (fermented seasoning)', tags:['food-drink','untaught','encountered','food-type'], source:{location:'Kyomachiya Obanzai Kohaku, Kyoto', date:'2026-08-23', file:'PXL_20260823_121038547.jpg'}, dateAdded:'2026-08-24', kanjiReading: [{char:'塩',reading:'shio'}]},
      {jp:'西京味噌', romaji:'saikyo miso', en:'sweet white miso (Kyoto style)', tags:['food-drink','untaught','encountered','food-type'], source:{location:'Kyomachiya Obanzai Kohaku, Kyoto', date:'2026-08-23', file:'PXL_20260823_121038547.jpg'}, dateAdded:'2026-08-24', kanjiReadingBlocked: 'One of this word\'s kanji doesn\'t have a recorded reading yet'},
      {jp:'牛すじ', romaji:'gyuusuji', en:'beef tendon', tags:['food-drink','untaught','encountered','food-type'], source:{location:'Kyomachiya Obanzai Kohaku, Kyoto', date:'2026-08-23', file:'PXL_20260823_121038547.jpg'}, dateAdded:'2026-08-24', kanjiReading: [{char:'牛',reading:'gyuu'}]},
      {jp:'よだれ鶏', romaji:'yodare dori', en:'"drooling chicken" - spicy Sichuan-style chicken dish', tags:['food-drink','untaught','encountered','food-type'], source:{location:'Kyomachiya Obanzai Kohaku, Kyoto', date:'2026-08-23', file:'PXL_20260823_121038547.jpg'}, dateAdded:'2026-08-24', kanjiReading: [{char:'鶏',reading:'dori'}]},
      {jp:'黒七味', romaji:'kuro shichimi', en:'black shichimi spice blend', tags:['food-drink','untaught','encountered','food-type'], source:{location:'Kyomachiya Obanzai Kohaku, Kyoto', date:'2026-08-23', file:'PXL_20260823_121038547.jpg'}, dateAdded:'2026-08-24', kanjiReading: [{char:'黒',reading:'kuro'},{char:'七',reading:'shichi'},{char:'味',reading:'mi'}]},
      {jp:'燻製', romaji:'kunsei', en:'smoked', tags:['food-drink','untaught','encountered','preparation'], source:{location:'Kyomachiya Obanzai Kohaku, Kyoto', date:'2026-08-23', file:'PXL_20260823_121038547.jpg'}, dateAdded:'2026-08-24', kanjiReading: [{char:'燻',reading:'kun'},{char:'製',reading:'sei'}]},
      {jp:'茶漬け', romaji:'chazuke', en:'rice with tea/dashi poured over it', tags:['food-drink','untaught','encountered','food-type'], source:{location:'Kyomachiya Obanzai Kohaku, Kyoto', date:'2026-08-23', file:'PXL_20260823_121038547.jpg'}, dateAdded:'2026-08-24', kanjiReading: [{char:'茶',reading:'cha'}, {char:'漬',reading:'zu'}]},
      {jp:'削り立て', romaji:'kezuritate', en:'freshly shaved/shredded', tags:['food-drink','untaught','encountered','preparation'], source:{location:'Kyomachiya Obanzai Kohaku, Kyoto', date:'2026-08-23', file:'PXL_20260823_121038547.jpg'}, dateAdded:'2026-08-24', kanjiReading: [{char:'削',reading:'kezu'},{char:'立',reading:'ta'}]},
      {jp:'鰹節', romaji:'katsuobushi', en:'dried bonito flakes', tags:['food-drink','untaught','encountered','food-type'], source:{location:'Kyomachiya Obanzai Kohaku, Kyoto', date:'2026-08-23', file:'PXL_20260823_121038547.jpg'}, dateAdded:'2026-08-24', kanjiReading: [{char:'鰹',reading:'katsuo'},{char:'節',reading:'bushi'}]},
      // 甘味 from this photo skipped - exact duplicate already covered
      // above (Sapporo izakaya entry).
      {jp:'白桃', romaji:'hakutou', en:'white peach', tags:['food-drink','untaught','encountered','food-type'], source:{location:'Kyomachiya Obanzai Kohaku, Kyoto', date:'2026-08-23', file:'PXL_20260823_121038547.jpg'}, dateAdded:'2026-08-24', kanjiReading: [{char:'白',reading:'haku'},{char:'桃',reading:'tou'}]},
      {jp:'お品書き', romaji:'oshinagaki', en:'menu / bill of fare', tags:['food-drink','untaught','encountered','dining-phrase'], source:{location:'Kyomachiya Obanzai Kohaku, Kyoto', date:'2026-08-23', file:'PXL_20260823_121045375.jpg'}, dateAdded:'2026-08-24', kanjiReadingBlocked: 'One of this word\'s kanji doesn\'t have a recorded reading yet'},
      {jp:'おばんざい', romaji:'obanzai', en:'Kyoto-style everyday home cooking', tags:['food-drink','untaught','encountered','food-type'], seenAs:'京都のおばんざいとは、いつものおかずをずらっとまとうひととき - Kyoto obanzai means a spread of everyday home side dishes', source:{location:'Kyomachiya Obanzai Kohaku, Kyoto', date:'2026-08-23', file:'PXL_20260823_121045375.jpg'}, dateAdded:'2026-08-24'},
      {jp:'田楽', romaji:'dengaku', en:'miso-glazed grilled dish style', tags:['food-drink','untaught','encountered','food-type'], source:{location:'Kyomachiya Obanzai Kohaku, Kyoto', date:'2026-08-23', file:'PXL_20260823_121045375.jpg'}, dateAdded:'2026-08-24', kanjiReading: [{char:'田',reading:'den'},{char:'楽',reading:'gaku'}]},
      {jp:'揚げ浸し', romaji:'age hitashi', en:'deep-fried and marinated in dashi', tags:['food-drink','untaught','encountered','food-type'], source:{location:'Kyomachiya Obanzai Kohaku, Kyoto', date:'2026-08-23', file:'PXL_20260823_121045375.jpg'}, dateAdded:'2026-08-24', kanjiReading: [{char:'揚',reading:'a'},{char:'浸',reading:'hita'}]},
      {jp:'煮っころがし', romaji:'nikkorogashi', en:'simmered (rolling-pan) style dish', tags:['food-drink','untaught','encountered','food-type'], source:{location:'Kyomachiya Obanzai Kohaku, Kyoto', date:'2026-08-23', file:'PXL_20260823_121045375.jpg'}, dateAdded:'2026-08-24', kanjiReading: [{char:'煮',reading:'ni'}]},
      {jp:'おから', romaji:'okara', en:'soy pulp (from tofu-making)', tags:['food-drink','untaught','encountered','food-type'], source:{location:'Kyomachiya Obanzai Kohaku, Kyoto', date:'2026-08-23', file:'PXL_20260823_121045375.jpg'}, dateAdded:'2026-08-24'},
      {jp:'胡麻和え', romaji:'goma ae', en:'mixed with sesame dressing', tags:['food-drink','untaught','encountered','food-type'], source:{location:'Kyomachiya Obanzai Kohaku, Kyoto', date:'2026-08-23', file:'PXL_20260823_121045375.jpg'}, dateAdded:'2026-08-24', kanjiReadingBlocked: 'One of this word\'s kanji doesn\'t have a recorded reading yet'},
      {jp:'湯葉', romaji:'yuba', en:'tofu skin', tags:['food-drink','untaught','encountered','food-type'], source:{location:'Kyomachiya Obanzai Kohaku, Kyoto', date:'2026-08-23', file:'PXL_20260823_121045375.jpg'}, dateAdded:'2026-08-24', kanjiReading: [{char:'湯',reading:'yu'},{char:'葉',reading:'ba'}]},
      // 厚揚げ from this photo skipped - script-variant duplicate of the
      // existing 厚あげ entry above, now enriched with this full-kanji form
      // as its altForm.
      {jp:'たいたん', romaji:'taitan', en:'simmered dish (Kyoto dialect)', tags:['food-drink','untaught','encountered','food-type'], source:{location:'Kyomachiya Obanzai Kohaku, Kyoto', date:'2026-08-23', file:'PXL_20260823_121045375.jpg'}, dateAdded:'2026-08-24'},
      {jp:'漬物', romaji:'tsukemono', en:'pickles', tags:['food-drink','untaught','encountered','food-type'], source:{location:'Kyomachiya Obanzai Kohaku, Kyoto', date:'2026-08-23', file:'PXL_20260823_121045375.jpg'}, dateAdded:'2026-08-24', kanjiReading: [{char:'漬',reading:'tsuke'},{char:'物',reading:'mono'}]},
      {jp:'出汁巻き玉子', romaji:'dashimaki tamago', en:'Japanese rolled omelette', tags:['food-drink','untaught','encountered','food-type'], source:{location:'Kyomachiya Obanzai Kohaku, Kyoto', date:'2026-08-23', file:'PXL_20260823_121045375.jpg'}, dateAdded:'2026-08-24', kanjiReadingBlocked: 'One of this word\'s kanji doesn\'t have a recorded reading yet'},
      {jp:'万願寺唐辛子', romaji:'manganji tougarashi', en:'Manganji sweet pepper (Kyoto specialty)', tags:['food-drink','untaught','encountered','food-type'], source:{location:'Kyomachiya Obanzai Kohaku, Kyoto', date:'2026-08-23', file:'PXL_20260823_121045375.jpg'}, dateAdded:'2026-08-24', kanjiReadingBlocked: 'Irregular reading - doesn\'t break into standard sounds, worth memorising as a whole word'},
      {jp:'柚子胡椒', romaji:'yuzu koshou', en:'yuzu pepper paste', tags:['food-drink','untaught','encountered','food-type'], source:{location:'Kyomachiya Obanzai Kohaku, Kyoto', date:'2026-08-23', file:'PXL_20260823_121045375.jpg'}, dateAdded:'2026-08-24', kanjiReadingBlocked: 'Irregular reading - doesn\'t break into standard sounds, worth memorising as a whole word'},
      {jp:'水茄子', romaji:'mizunasu', en:'water eggplant (Kyoto/Osaka specialty)', tags:['food-drink','untaught','encountered','food-type'], source:{location:'Kyomachiya Obanzai Kohaku, Kyoto', date:'2026-08-23', file:'PXL_20260823_121045375.jpg'}, dateAdded:'2026-08-24', kanjiReadingBlocked: 'Irregular reading - doesn\'t break into standard sounds, worth memorising as a whole word'},
      {jp:'炭酸水', romaji:'tansansui', en:'carbonated / sparkling water', tags:['food-drink','untaught','encountered','drink'], source:{location:'Kyomachiya Obanzai Kohaku, Kyoto', date:'2026-08-23', file:'PXL_20260824_014521143.jpg'}, dateAdded:'2026-08-24', kanjiReading: [{char:'炭',reading:'tan'},{char:'酸',reading:'san'},{char:'水',reading:'sui'}]},
      {jp:'盛り合わせ', romaji:'moriawase', en:'assortment / mixed platter', tags:['food-drink','untaught','encountered','food-type'], source:{location:'Kyomachiya Obanzai Kohaku, Kyoto', date:'2026-08-23', file:'PXL_20260824_014521143.jpg'}, dateAdded:'2026-08-24', kanjiReadingBlocked: 'Irregular reading - doesn\'t break into standard sounds, worth memorising as a whole word'},
      {jp:'あさり', romaji:'asari', en:'baby clams', tags:['food-drink','untaught','encountered','food-type'], source:{location:'Kyomachiya Obanzai Kohaku, Kyoto', date:'2026-08-23', file:'PXL_20260824_014521143.jpg'}, dateAdded:'2026-08-24'},
      {jp:'カリカリ', romaji:'karikari', en:'crispy / crunchy', tags:['food-drink','untaught','encountered','food-adjective'], source:{location:'Kyomachiya Obanzai Kohaku, Kyoto', date:'2026-08-23', file:'PXL_20260824_014521143.jpg'}, dateAdded:'2026-08-24'},
    ],
  },
  'vocab-materials-restaurants-ops': {
    level: 'untaught',
    hasReference: true,
    // standaloneCard: false (2026-08-31) - retired as its own tile now that
    // theme-service-ops and the five-way food-drink split (theme-food/
    // -drink/-dining-phrases/-food-descriptions/-food-preparation, split
    // from theme-food-drink-combined the same day) fully subsume it between
    // them: all 73 items here carry `food-drink` or `service-ops` (verified
    // with zero gaps). Data stays exactly where it is, only the standalone
    // tile goes away.
    standaloneCard: false,
    label: 'Materials — Restaurants: Ordering & policy',
    chars: '税込 メニュー キンキン…',
    items: [
      {jp:'税込', romaji:'zeikomi', en:'tax included (as opposed to 税別, tax excluded)', tags:['service-ops','untaught','encountered'], source:{location:'Kanda', date:'2026-08-08', file:'PXL_20260808_084941221.jpg'}, dateAdded:'2026-08-10', kanjiReadingBlocked: 'Irregular reading - doesn\'t break into standard sounds, worth memorising as a whole word'},
      {jp:'メニュー', romaji:'menyuu', en:'menu', tags:['food-drink','untaught','encountered','dining-phrase','genki','genki-1-2'], altForm:'めにゅー', seenAs:'4か国語メニューあり - menus available in 4 languages', source:{location:'Kanda', date:'2026-08-08', file:'PXL_20260808_084941221.jpg'}, dateAdded:'2026-08-10'},
      {jp:'キンキン', romaji:'kinkin', en:'ice-cold', tags:['food-drink','untaught','encountered','food-adjective'], seenAs:'キンキンに冷えてます - it\'s ice-cold in here (shop AC signage)', source:{location:'Kanda', date:'2026-08-08', file:'PXL_20260808_084941221.jpg'}, dateAdded:'2026-08-10'},
      {jp:'選ぶ', romaji:'erabu', en:'to choose', tags:['service-ops','untaught','encountered'], seenAs:'選んで、痺れて、飲み干して！- choose it, feel the tingle, drink it down! (headline)', source:{location:'Kanda / Akihabara', date:'2026-08-08', file:'PXL_20260808_091437118.jpg'}, dateAdded:'2026-08-10', kanjiReading: [{char:'選',reading:'era'}]},
      {jp:'営業時間', romaji:'eigyou jikan', en:'business hours', tags:['service-ops','untaught','encountered'], source:{location:'Akihabara', date:'2026-08-08', file:'PXL_20260808_092746556.jpg'}, dateAdded:'2026-08-10', kanjiReading: [{char:'営',reading:'ei'},{char:'業',reading:'gyou'},{char:'時',reading:'ji'},{char:'間',reading:'kan'}]},
      {jp:'月〜金', romaji:'getsu ~ kin', en:'Monday to Friday', tags:['service-ops','untaught','encountered'], speakAs:'げつ　きん', source:{location:'Akihabara', date:'2026-08-08', file:'PXL_20260808_092746556.jpg'}, dateAdded:'2026-08-10', kanjiReadingBlocked: 'Contains a placeholder or symbol with no fixed reading of its own'},
      {jp:'土・日・祝', romaji:'do, nichi, shuku', en:'Saturday, Sunday, holidays', tags:['service-ops','untaught','encountered'], speakAs:'ど　にち　しゅく', source:{location:'Akihabara', date:'2026-08-08', file:'PXL_20260808_092746556.jpg'}, dateAdded:'2026-08-10', kanjiReadingBlocked: 'Contains a placeholder or symbol with no fixed reading of its own'},
      {jp:'お通しなし', romaji:'otooshi nashi', en:'no compulsory appetizer charge', tags:['food-drink','untaught','encountered','dining-phrase'], source:{location:'Sapporo (izakaya)', date:'2026-08-09', file:'PXL_20260809_092359849.jpg'}, dateAdded:'2026-08-10', kanjiReadingBlocked: 'This word\'s structure is more complex than this tool currently handles'},
      {jp:'お席料なし', romaji:'oseki ryou nashi', en:'no seating charge', tags:['food-drink','untaught','encountered','dining-phrase'], source:{location:'Sapporo (izakaya)', date:'2026-08-09', file:'PXL_20260809_092359849.jpg'}, dateAdded:'2026-08-10', kanjiReading: [{char:'席',reading:'seki'},{char:'料',reading:'ryou'}]},
      {jp:'食べ放題', romaji:'tabehoudai', en:'all-you-can-eat', tags:['food-drink','untaught','encountered','dining-phrase'], source:{location:'Sapporo (izakaya)', date:'2026-08-09', file:'PXL_20260809_092359849.jpg'}, dateAdded:'2026-08-10', kanjiReadingBlocked: 'One of this word\'s kanji doesn\'t have a recorded reading yet'},
      {jp:'飲み放題', romaji:'nomihoudai', en:'all-you-can-drink', tags:['food-drink','untaught','encountered','dining-phrase'], source:{location:'Sapporo (izakaya)', date:'2026-08-09', file:'PXL_20260809_092359849.jpg'}, dateAdded:'2026-08-10', kanjiReadingBlocked: 'One of this word\'s kanji doesn\'t have a recorded reading yet'},
      {jp:'ランチ', romaji:'ranchi', en:'lunch', tags:['food-drink','untaught','encountered','food-type'], source:{location:'Sapporo (izakaya)', date:'2026-08-09', file:'PXL_20260809_092406118.jpg'}, dateAdded:'2026-08-10'},
      {jp:'おかわり', romaji:'okawari', en:'seconds / refill', tags:['food-drink','untaught','encountered','dining-phrase'], source:{location:'Sapporo (izakaya)', date:'2026-08-09', file:'PXL_20260809_092406118.jpg'}, dateAdded:'2026-08-10'},
      {jp:'ハッピーアワー', romaji:'happii awaa', en:'happy hour', tags:['food-drink','untaught','encountered','dining-phrase'], source:{location:'Sapporo (izakaya)', date:'2026-08-09', file:'PXL_20260809_092406118.jpg'}, dateAdded:'2026-08-10'},
      {jp:'昼呑み', romaji:'hiru nomi', en:'daytime drinking', tags:['food-drink','untaught','encountered','dining-phrase'], source:{location:'Sapporo (izakaya)', date:'2026-08-09', file:'PXL_20260809_092412154.jpg'}, dateAdded:'2026-08-10', kanjiReadingBlocked: 'One of this word\'s kanji doesn\'t have a recorded reading yet'},
      {jp:'オトク', romaji:'otoku', en:'a good deal / bargain', tags:['service-ops','untaught','encountered'], altForm:'お得 (kanji form)', source:{location:'Sapporo (izakaya)', date:'2026-08-09', file:'PXL_20260809_092412154.jpg'}, dateAdded:'2026-08-10'},
      {jp:'一品', romaji:'ippin', en:'a single dish / a la carte item', tags:['food-drink','untaught','encountered','dining-phrase'], source:{location:'JR Inn Sapporo (hotel, researching restaurants)', date:'2026-08-09', file:'PXL_20260809_103035424.jpg'}, dateAdded:'2026-08-10', kanjiReadingBlocked: 'Follows a regular sound-doubling rule not built yet - not irregular, just not modelled'},
      {jp:'各位', romaji:'kakui', en:'"to all" / everyone (formal address)', tags:['service-ops','untaught','encountered'], source:{location:'JR Inn Sapporo (Cafe de Crie)', date:'2026-08-10', file:'PXL_20260810_002319977.jpg'}, dateAdded:'2026-08-10', kanjiReading: [{char:'各',reading:'kaku'},{char:'位',reading:'i'}]},
      // 快適 removed - duplicate of the Materials — Stations & trains
      // entry (same date, earlier in file order; dedup rule for two
      // Materials copies).
      {jp:'行為', romaji:'koui', en:'act / conduct', tags:['service-ops','untaught','encountered'], source:{location:'JR Inn Sapporo (Cafe de Crie)', date:'2026-08-10', file:'PXL_20260810_002319977.jpg'}, dateAdded:'2026-08-10', kanjiReading: [{char:'行',reading:'kou'},{char:'為',reading:'i'}]},
      {jp:'持ち込み', romaji:'mochikomi', en:'bringing in (items)', tags:['food-drink','untaught','encountered','dining-phrase'], source:{location:'JR Inn Sapporo (Cafe de Crie)', date:'2026-08-10', file:'PXL_20260810_002319977.jpg'}, dateAdded:'2026-08-10', kanjiReading: [{char:'持',reading:'mo'},{char:'込',reading:'ko'}]},
      {jp:'ワンオーダー制', romaji:'wan oodaa sei', en:'one-order-minimum policy', tags:['food-drink','untaught','encountered','dining-phrase'], source:{location:'JR Inn Sapporo (Cafe de Crie)', date:'2026-08-10', file:'PXL_20260810_002319977.jpg'}, dateAdded:'2026-08-10', kanjiReadingBlocked: 'This word\'s structure is more complex than this tool currently handles'},
      {jp:'勧誘', romaji:'kanyuu', en:'solicitation / canvassing', tags:['service-ops','untaught','encountered'], source:{location:'JR Inn Sapporo (Cafe de Crie)', date:'2026-08-10', file:'PXL_20260810_002319977.jpg'}, dateAdded:'2026-08-10', kanjiReading: [{char:'勧',reading:'kan'},{char:'誘',reading:'yuu'}]},
      {jp:'営業活動', romaji:'eigyou katsudou', en:'business / sales activities', tags:['service-ops','untaught','encountered'], source:{location:'JR Inn Sapporo (Cafe de Crie)', date:'2026-08-10', file:'PXL_20260810_002319977.jpg'}, dateAdded:'2026-08-10', kanjiReading: [{char:'営',reading:'ei'},{char:'業',reading:'gyou'},{char:'活',reading:'katsu'},{char:'動',reading:'dou'}]},
      {jp:'占拠', romaji:'senkyo', en:'occupation / monopolizing (seats)', tags:['service-ops','untaught','encountered'], source:{location:'JR Inn Sapporo (Cafe de Crie)', date:'2026-08-10', file:'PXL_20260810_002319977.jpg'}, dateAdded:'2026-08-10', kanjiReading: [{char:'占',reading:'sen'},{char:'拠',reading:'kyo'}]},
      {jp:'頻繁', romaji:'hinpan', en:'frequent', tags:['service-ops','untaught','encountered'], source:{location:'JR Inn Sapporo (Cafe de Crie)', date:'2026-08-10', file:'PXL_20260810_002319977.jpg'}, dateAdded:'2026-08-10', kanjiReading: [{char:'頻',reading:'hin'},{char:'繁',reading:'pan'}]},
      {jp:'席移動', romaji:'seki idou', en:'moving seats', tags:['service-ops','untaught','encountered'], source:{location:'JR Inn Sapporo (Cafe de Crie)', date:'2026-08-10', file:'PXL_20260810_002319977.jpg'}, dateAdded:'2026-08-10', kanjiReading: [{char:'席',reading:'seki'},{char:'移',reading:'i'},{char:'動',reading:'dou'}]},
      {jp:'声かけ', romaji:'koekake', en:'speaking to / calling out to (someone)', tags:['service-ops','untaught','encountered'], source:{location:'JR Inn Sapporo (Cafe de Crie)', date:'2026-08-10', file:'PXL_20260810_002319977.jpg'}, dateAdded:'2026-08-10', kanjiReading: [{char:'声',reading:'koe'}]},
      {jp:'不燃ゴミ', romaji:'funen gomi', en:'non-burnable trash', tags:['service-ops','untaught','encountered'], source:{location:'JR Inn Sapporo (Cafe de Crie)', date:'2026-08-10', file:'PXL_20260810_002323581.jpg'}, dateAdded:'2026-08-10', kanjiReading: [{char:'不',reading:'fu'},{char:'燃',reading:'nen'}]},
      {jp:'フタ', romaji:'futa', en:'lid', tags:['service-ops','untaught','encountered'], source:{location:'JR Inn Sapporo (Cafe de Crie)', date:'2026-08-10', file:'PXL_20260810_002323581.jpg'}, dateAdded:'2026-08-10'},
      {jp:'ストロー', romaji:'sutoroo', en:'straw', tags:['service-ops','untaught','encountered'], source:{location:'JR Inn Sapporo (Cafe de Crie)', date:'2026-08-10', file:'PXL_20260810_002323581.jpg'}, dateAdded:'2026-08-10'},
      {jp:'等', romaji:'nado', en:'etc. / and so on', tags:['service-ops','untaught','encountered'], speakAs:'など', source:{location:'JR Inn Sapporo (Cafe de Crie)', date:'2026-08-10', file:'PXL_20260810_002323581.jpg'}, dateAdded:'2026-08-10', kanjiReading: [{char:'等',reading:'nado'}]},
      {jp:'いっぱい', romaji:'ippai', en:'full', tags:['service-ops','untaught','encountered'], source:{location:'JR Inn Sapporo (Cafe de Crie)', date:'2026-08-10', file:'PXL_20260810_002326764.jpg'}, dateAdded:'2026-08-10'},
      {jp:'奥', romaji:'oku', en:'back / inner part', tags:['service-ops','untaught','encountered'], source:{location:'JR Inn Sapporo (Cafe de Crie)', date:'2026-08-10', file:'PXL_20260810_002326764.jpg'}, dateAdded:'2026-08-10', kanjiReading: [{char:'奥',reading:'oku'}]},
      {jp:'下げ台', romaji:'sagedai', en:'bussing station / tray return counter', tags:['service-ops','untaught','encountered'], seenAs:'こちらがいっぱいの時は奥の下げ台をご利用ください。- when this is full, please use the bussing station in the back', source:{location:'JR Inn Sapporo (Cafe de Crie)', date:'2026-08-10', file:'PXL_20260810_002326764.jpg'}, dateAdded:'2026-08-10', kanjiReading: [{char:'下',reading:'sa'},{char:'台',reading:'dai'}]},
      {jp:'炊飯', romaji:'suihan', en:'rice cooking', tags:['food-drink','untaught','encountered','preparation'], source:{location:'Yayoiken, Sapporo Station area', date:'2026-08-11', file:'PXL_20260811_111851441.jpg'}, dateAdded:'2026-08-11', kanjiReading: [{char:'炊',reading:'sui'},{char:'飯',reading:'han'}]},
      {jp:'火力', romaji:'karyoku', en:'heat / flame power', tags:['food-drink','untaught','encountered','preparation'], source:{location:'Yayoiken, Sapporo Station area', date:'2026-08-11', file:'PXL_20260811_111851441.jpg'}, dateAdded:'2026-08-11', kanjiReading: [{char:'火',reading:'ka'},{char:'力',reading:'ryoku'}]},
      {jp:'対流', romaji:'tairyuu', en:'convection', tags:['food-drink','untaught','encountered','preparation'], source:{location:'Yayoiken, Sapporo Station area', date:'2026-08-11', file:'PXL_20260811_111851441.jpg'}, dateAdded:'2026-08-11', kanjiReading: [{char:'対',reading:'tai'},{char:'流',reading:'ryuu'}]},
      {jp:'焼く', romaji:'yaku', en:'to grill / bake', tags:['food-drink','untaught','encountered','preparation'], source:{location:'Yayoiken, Sapporo Station area', date:'2026-08-11', file:'PXL_20260811_111851441.jpg'}, dateAdded:'2026-08-11', kanjiReadingBlocked: 'Irregular reading - doesn\'t break into standard sounds, worth memorising as a whole word'},
      {jp:'煮る', romaji:'niru', en:'to boil / simmer', tags:['food-drink','untaught','encountered','preparation'], source:{location:'Yayoiken, Sapporo Station area', date:'2026-08-11', file:'PXL_20260811_111851441.jpg'}, dateAdded:'2026-08-11', kanjiReading: [{char:'煮',reading:'ni'}]},
      {jp:'揚げる', romaji:'ageru', en:'to deep-fry', tags:['food-drink','untaught','encountered','preparation'], source:{location:'Yayoiken, Sapporo Station area', date:'2026-08-11', file:'PXL_20260811_111851441.jpg'}, dateAdded:'2026-08-11', kanjiReading: [{char:'揚',reading:'a'}]},
      {jp:'炒める', romaji:'itameru', en:'to stir-fry', tags:['food-drink','untaught','encountered','preparation'], source:{location:'Yayoiken, Sapporo Station area', date:'2026-08-11', file:'PXL_20260811_111851441.jpg'}, dateAdded:'2026-08-11', kanjiReading: [{char:'炒',reading:'ita'}]},
      {jp:'おかわり自由', romaji:'okawari jiyuu', en:'free refills', tags:['food-drink','untaught','encountered','dining-phrase'], source:{location:'Yayoiken, Sapporo Station area', date:'2026-08-11', file:'PXL_20260811_111851441.jpg'}, dateAdded:'2026-08-11', kanjiReading: [{char:'自',reading:'ji'},{char:'由',reading:'yuu'}]},
      {jp:'移動', romaji:'idou', en:'move', tags:['service-ops','untaught','encountered'], source:{location:'Yayoiken, Sapporo Station area', date:'2026-08-11', file:'PXL_20260811_111859054.jpg'}, dateAdded:'2026-08-11', kanjiReading: [{char:'移',reading:'i'},{char:'動',reading:'dou'}]},
      {jp:'従業員', romaji:'juugyouin', en:'employee / staff', tags:['service-ops','untaught','encountered'], source:{location:'Yayoiken, Sapporo Station area', date:'2026-08-11', file:'PXL_20260811_111859054.jpg'}, dateAdded:'2026-08-11', kanjiReading: [{char:'従',reading:'juu'},{char:'業',reading:'gyou'},{char:'員',reading:'in'}]},
      {jp:'お声掛け', romaji:'o-koekake', en:'calling out to (someone)', tags:['service-ops','untaught','encountered'], source:{location:'Yayoiken, Sapporo Station area', date:'2026-08-11', file:'PXL_20260811_111859054.jpg'}, dateAdded:'2026-08-11', kanjiReadingBlocked: 'One of this word\'s kanji doesn\'t have a recorded reading yet'},
      {jp:'ご用', romaji:'goyou', en:'business / need (polite)', tags:['service-ops','untaught','encountered'], source:{location:'Yayoiken, Sapporo Station area', date:'2026-08-11', file:'PXL_20260811_111859054.jpg'}, dateAdded:'2026-08-11', kanjiReading: [{char:'用',reading:'you'}]},
      {jp:'内税', romaji:'uchizei', en:'tax included (as opposed to 外税, tax added separately)', tags:['service-ops','untaught','encountered'], source:{location:'Yayoiken, Sapporo Station area', date:'2026-08-11', file:'PXL_20260811_111921577.jpg'}, dateAdded:'2026-08-11', kanjiReading: [{char:'内',reading:'uchi'},{char:'税',reading:'zei'}]},
      {jp:'当日限り有効', romaji:'toujitsu kagiri yuukou', en:'valid today only', tags:['service-ops','untaught','encountered'], source:{location:'Yayoiken, Sapporo Station area', date:'2026-08-11', file:'PXL_20260811_111921577.jpg'}, dateAdded:'2026-08-11', kanjiReadingBlocked: 'One of this word\'s kanji doesn\'t have a recorded reading yet'},
      {jp:'新規', romaji:'shinki', en:'new', tags:['service-ops','untaught','encountered'], source:{location:'Yayoiken, Sapporo', date:'2026-08-12', file:'PXL_20260812_105641436.jpg'}, dateAdded:'2026-08-14', kanjiReading: [{char:'新',reading:'shin'},{char:'規',reading:'ki'}]},
      {jp:'会員', romaji:'kaiin', en:'member', tags:['service-ops','untaught','encountered'], source:{location:'Yayoiken, Sapporo', date:'2026-08-12', file:'PXL_20260812_105641436.jpg'}, dateAdded:'2026-08-14', kanjiReading: [{char:'会',reading:'kai'},{char:'員',reading:'in'}]},
      {jp:'募集中', romaji:'boshuuchuu', en:'currently recruiting', tags:['service-ops','untaught','encountered'], source:{location:'Yayoiken, Sapporo', date:'2026-08-12', file:'PXL_20260812_105641436.jpg'}, dateAdded:'2026-08-14', kanjiReading: [{char:'募',reading:'bo'},{char:'集',reading:'shuu'},{char:'中',reading:'chuu'}]},
      {jp:'達成', romaji:'tassei', en:'achievement', tags:['service-ops','untaught','encountered'], source:{location:'Yayoiken, Sapporo', date:'2026-08-12', file:'PXL_20260812_105641436.jpg'}, dateAdded:'2026-08-14', kanjiReadingBlocked: 'Follows a regular sound-doubling rule not built yet - not irregular, just not modelled'},
      {jp:'選べる', romaji:'eraberu', en:'can choose', tags:['service-ops','untaught','encountered'], source:{location:'Yayoiken, Sapporo', date:'2026-08-12', file:'PXL_20260812_105641436.jpg'}, dateAdded:'2026-08-14', kanjiReading: [{char:'選',reading:'era'}]},
      {jp:'クーポン', romaji:'kuupon', en:'coupon', tags:['service-ops','untaught','encountered'], source:{location:'Yayoiken, Sapporo', date:'2026-08-12', file:'PXL_20260812_105641436.jpg'}, dateAdded:'2026-08-14'},
      {jp:'ダウンロード', romaji:'daunroodo', en:'download', tags:['service-ops','untaught','encountered'], source:{location:'Yayoiken, Sapporo', date:'2026-08-12', file:'PXL_20260812_105641436.jpg'}, dateAdded:'2026-08-14'},
      {jp:'となり', romaji:'tonari', en:'next to / neighboring', tags:['service-ops','untaught','encountered','te-around','tourist'], source:{location:'JR Inn Sapporo (Cafe de Crie)', date:'2026-08-13', file:'PXL_20260812_234344125.jpg'}, dateAdded:'2026-08-14'},
      {jp:'レジ', romaji:'reji', en:'cash register', tags:['service-ops','untaught','encountered'], source:{location:'JR Inn Sapporo (Cafe de Crie)', date:'2026-08-13', file:'PXL_20260812_234344125.jpg'}, dateAdded:'2026-08-14'},
      {jp:'どうぞ', romaji:'douzo', en:'please / go ahead', tags:['service-ops','taught','encountered','genki','genki-1-2','L3','phrases-l3','l3-3'], source:{location:'JR Inn Sapporo (Cafe de Crie)', date:'2026-08-13', file:'PXL_20260812_234344125.jpg'}, dateAdded:'2026-08-14'},
      {jp:'四連休', romaji:'yon renkyuu', en:'four-day consecutive holiday', tags:['service-ops','untaught','encountered'], source:{location:'Shinsekai, Osaka', date:'2026-08-17', file:'PXL_20260817_044520696.jpg'}, dateAdded:'2026-08-17', kanjiReading: [{char:'四',reading:'yon'},{char:'連',reading:'ren'},{char:'休',reading:'kyuu'}]},
      {jp:'材料', romaji:'zairyou', en:'ingredients / materials', tags:['food-drink','untaught','encountered','food-type'], source:{location:'Shinsekai, Osaka', date:'2026-08-17', file:'PXL_20260817_044520696.jpg'}, dateAdded:'2026-08-17', kanjiReading: [{char:'材',reading:'zai'},{char:'料',reading:'ryou'}]},
      {jp:'閉店します', romaji:'heiten shimasu', en:'will close (the shop)', tags:['service-ops','untaught','encountered'], seenAs:'明日より四連休の為、材料なくなり次第閉店します。- from tomorrow is a four-day holiday, so we\'ll close as soon as we run out of ingredients', source:{location:'Shinsekai, Osaka', date:'2026-08-17', file:'PXL_20260817_044520696.jpg'}, dateAdded:'2026-08-17', kanjiReadingBlocked: 'Irregular reading - doesn\'t break into standard sounds, worth memorising as a whole word'},
      // 消費税 and ご案内 from this batch were skipped - already exact
      // duplicates (消費税 in Materials - Shops; ご案内 in Materials -
      // Stations & trains, same word).
      {jp:'引き換え', romaji:'hikikae', en:'exchange / redemption (of a receipt/voucher)', tags:['service-ops','untaught','encountered'], source:{location:'Starbucks Itsukushima Omotesando, Miyajima', date:'2026-08-19', file:'PXL_20260819_085448079.jpg'}, dateAdded:'2026-08-21', kanjiReadingBlocked: 'Irregular reading - doesn\'t break into standard sounds, worth memorising as a whole word'},
      {jp:'お渡し', romaji:'owatashi', en:'handing over (polite)', tags:['service-ops','untaught','encountered'], seenAs:'ご注文のドリンクと引き換えに、このレシートをバリスタにお渡しください。- please hand this receipt to the barista in exchange for your ordered drink', source:{location:'Starbucks Itsukushima Omotesando, Miyajima', date:'2026-08-19', file:'PXL_20260819_085448079.jpg'}, dateAdded:'2026-08-21', kanjiReading: [{char:'渡',reading:'wata'}]},
      {jp:'総合計', romaji:'sougoukei', en:'grand total', tags:['service-ops','untaught','encountered'], source:{location:'Starbucks Itsukushima Omotesando, Miyajima', date:'2026-08-19', file:'PXL_20260819_085453043.jpg'}, dateAdded:'2026-08-21', kanjiReading: [{char:'総',reading:'sou'},{char:'合',reading:'gou'},{char:'計',reading:'kei'}]},
      {jp:'支払方法', romaji:'shiharai houhou', en:'payment method', tags:['service-ops','untaught','encountered'], source:{location:'Starbucks Itsukushima Omotesando, Miyajima', date:'2026-08-19', file:'PXL_20260819_085453043.jpg'}, dateAdded:'2026-08-21', kanjiReadingBlocked: 'Irregular reading - doesn\'t break into standard sounds, worth memorising as a whole word'},
      {jp:'一括支払', romaji:'ikkatsu shiharai', en:'lump-sum payment (not installments)', tags:['service-ops','untaught','encountered'], source:{location:'Starbucks Itsukushima Omotesando, Miyajima', date:'2026-08-19', file:'PXL_20260819_085453043.jpg'}, dateAdded:'2026-08-21', kanjiReadingBlocked: 'Irregular reading - doesn\'t break into standard sounds, worth memorising as a whole word'},
      {jp:'寄付', romaji:'kifu', en:'donation', tags:['service-ops','untaught','encountered'], source:{location:'Starbucks Itsukushima Omotesando, Miyajima', date:'2026-08-19', file:'PXL_20260819_085453043.jpg'}, dateAdded:'2026-08-21', kanjiReading: [{char:'寄',reading:'ki'},{char:'付',reading:'fu'}]},
      {jp:'手動', romaji:'shudou', en:'manual (operated by hand)', tags:['service-ops','untaught','encountered'], source:{location:'Starbucks Itsukushima Omotesando, Miyajima', date:'2026-08-19', file:'PXL_20260819_085503726.jpg'}, dateAdded:'2026-08-21', kanjiReading: [{char:'手',reading:'shu'},{char:'動',reading:'dou'}]},
      {jp:'解錠', romaji:'gejou', en:'unlocking', tags:['service-ops','untaught','encountered'], source:{location:'Starbucks Itsukushima Omotesando, Miyajima', date:'2026-08-19', file:'PXL_20260819_085503726.jpg'}, dateAdded:'2026-08-21', kanjiReadingBlocked: 'Irregular reading - doesn\'t break into standard sounds, worth memorising as a whole word'},
      {jp:'ご理解', romaji:'gorikai', en:'understanding (polite)', tags:['service-ops','untaught','encountered'], source:{location:'Starbucks Itsukushima Omotesando, Miyajima', date:'2026-08-19', file:'PXL_20260819_085503726.jpg'}, dateAdded:'2026-08-21', kanjiReading: [{char:'理',reading:'ri'},{char:'解',reading:'kai'}]},
      {jp:'おまかせ', romaji:'omakase', en:"chef's choice / leave it to the chef", tags:['service-ops','untaught','encountered'], source:{location:'Kyomachiya Obanzai Kohaku, Kyoto', date:'2026-08-23', file:'PXL_20260824_014521143.jpg'}, dateAdded:'2026-08-24'},
      {jp:'出来次第', romaji:'dekishidai', en:"as soon as it's ready", tags:['service-ops','untaught','encountered'], source:{location:'Kyomachiya Obanzai Kohaku, Kyoto', date:'2026-08-23', file:'PXL_20260824_014521143.jpg'}, dateAdded:'2026-08-24', kanjiReading: [{char:'出',reading:'de'},{char:'来',reading:'ki'},{char:'次',reading:'shi'},{char:'第',reading:'dai'}]},
      {jp:'小計', romaji:'shoukei', en:'subtotal', tags:['service-ops','untaught','encountered'], source:{location:'Kyomachiya Obanzai Kohaku, Kyoto', date:'2026-08-23', file:'PXL_20260824_014521143.jpg'}, dateAdded:'2026-08-24', kanjiReading: [{char:'小',reading:'shou'},{char:'計',reading:'kei'}]},
    ],
  },
  'vocab-materials-shops': {
    level: 'untaught',
    hasReference: true,
    // standaloneCard: false (2026-08-31) - retired as its own tile now that
    // theme-shopping-combined and theme-signage-combined between them fully
    // subsume it: all 70 items here carry `shopping` or `signage` (the
    // final 12 - parking/pets/crows/notices - were tagged `signage` this
    // same day to close the gap). Data stays exactly where it is, only the
    // standalone tile goes away. Its old includeItems array (しょうひぜい
    // from Money and shopping, ちゅうい from Signage and warnings) was
    // removed the same day - dead the moment this retired, since nothing
    // calls resolveVocabCategory on this key for tile-selection any more;
    // both words are still exactly where they always were and still fully
    // drillable through Shopping/Signage & warnings.
    standaloneCard: false,
    label: 'Materials — Shops & everyday purchases',
    chars: '生活家電 テレビ オーディオ…',
    items: [
      {jp:'生活家電', romaji:'seikatsu kaden', en:'household appliances', tags:['shopping','shops','untaught','encountered'], source:{location:'Akihabara (Yodobashi Akiba)', date:'2026-08-08', file:'PXL_20260808_040406586.jpg'}, dateAdded:'2026-08-10', kanjiReading: [{char:'生',reading:'sei'},{char:'活',reading:'katsu'},{char:'家',reading:'ka'},{char:'電',reading:'den'}]},
      {jp:'テレビ', romaji:'terebi', en:'TV', tags:['shopping','shops','untaught','encountered'], source:{location:'Akihabara (Yodobashi Akiba)', date:'2026-08-08', file:'PXL_20260808_040406586.jpg'}, dateAdded:'2026-08-10'},
      {jp:'オーディオ', romaji:'oodio', en:'audio', tags:['shopping','shops','untaught','encountered'], source:{location:'Akihabara (Yodobashi Akiba)', date:'2026-08-08', file:'PXL_20260808_040406586.jpg'}, dateAdded:'2026-08-10'},
      {jp:'カメラ', romaji:'kamera', en:'camera', tags:['L1','objects','shopping','shops','taught','encountered','L3','general-l3','l3-1'], altForm:'かめら', altAfterAnswer:true, source:{location:'Akihabara (Yodobashi Akiba)', date:'2026-08-08', file:'PXL_20260808_040406586.jpg'}, dateAdded:'2026-08-10'},
      {jp:'時計', romaji:'tokei', en:'clock / watch', tags:['shopping','shops','untaught','encountered'], source:{location:'Akihabara (Yodobashi Akiba)', date:'2026-08-08', file:'PXL_20260808_040406586.jpg'}, dateAdded:'2026-08-10', kanjiReadingBlocked: 'Irregular reading - doesn\'t break into standard sounds, worth memorising as a whole word'},
      {jp:'パソコン周辺機器', romaji:'pasokon shuuhen kiki', en:'PC peripherals', tags:['shopping','shops','untaught','encountered'], source:{location:'Akihabara (Yodobashi Akiba)', date:'2026-08-08', file:'PXL_20260808_040406586.jpg'}, dateAdded:'2026-08-10', kanjiReadingBlocked: 'One of this word\'s kanji doesn\'t have a recorded reading yet'},
      // 携帯電話 (mobile phone) from this photo removed - exact duplicate,
      // already covered in Materials - Stations & trains (added same day,
      // earlier in file order, so that one wins per the materials-vs-
      // materials dedup rule).
      {jp:'修理受付', romaji:'shuuri uketsuke', en:'repair reception desk', tags:['shopping','shops','untaught','encountered'], source:{location:'Akihabara (Yodobashi Akiba)', date:'2026-08-08', file:'PXL_20260808_040406586.jpg'}, dateAdded:'2026-08-10', kanjiReading: [{char:'修',reading:'shuu'},{char:'理',reading:'ri'},{char:'受',reading:'uke'},{char:'付',reading:'tsuke'}]},
      {jp:'お客様案内窓口', romaji:'okyakusama annai madoguchi', en:'customer information counter', tags:['shopping','shops','untaught','encountered'], source:{location:'Akihabara (Yodobashi Akiba)', date:'2026-08-08', file:'PXL_20260808_040406586.jpg'}, dateAdded:'2026-08-10', kanjiReadingBlocked: 'One of this word\'s kanji doesn\'t have a recorded reading yet'},
      {jp:'駐車場', romaji:'chuushajou', en:'parking lot', tags:['shops','untaught','encountered','signage'], source:{location:'Akihabara (Yodobashi Akiba)', date:'2026-08-08', file:'PXL_20260808_040406586.jpg'}, dateAdded:'2026-08-10', kanjiReading: [{char:'駐',reading:'chuu'},{char:'車',reading:'sha'},{char:'場',reading:'jou'}]},
      {jp:'現在フロア', romaji:'genzai furoa', en:'current floor ("you are here")', tags:['shopping','shops','untaught','encountered'], source:{location:'Akihabara (Yodobashi Akiba)', date:'2026-08-08', file:'PXL_20260808_040406586.jpg'}, dateAdded:'2026-08-10', kanjiReadingBlocked: 'One of this word\'s kanji doesn\'t have a recorded reading yet'},
      {jp:'ダイソー', romaji:'Daisou', en:'Daiso (100-yen shop brand)', tags:['shopping','shops','untaught','encountered'], source:{location:'Akihabara (Yodobashi Akiba)', date:'2026-08-08', file:'PXL_20260808_040406586.jpg'}, dateAdded:'2026-08-10'},
      {jp:'リラクゼーション', romaji:'rirakuzeeshon', en:'relaxation', tags:['shopping','shops','untaught','encountered'], source:{location:'Akihabara (Yodobashi Akiba)', date:'2026-08-08', file:'PXL_20260808_040406586.jpg'}, dateAdded:'2026-08-10'},
      {jp:'サロン', romaji:'saron', en:'salon', tags:['shopping','shops','untaught','encountered'], source:{location:'Akihabara (Yodobashi Akiba)', date:'2026-08-08', file:'PXL_20260808_040406586.jpg'}, dateAdded:'2026-08-10'},
      {jp:'クイックガレージ', romaji:'kuikku gareeji', en:'Quick Garage (repair shop name)', tags:['shopping','shops','untaught','encountered'], source:{location:'Akihabara (Yodobashi Akiba)', date:'2026-08-08', file:'PXL_20260808_040406586.jpg'}, dateAdded:'2026-08-10'},
      {jp:'天然水', romaji:'tennensui', en:'natural water', tags:['shopping','shops','untaught','encountered'], source:{location:'Shinagawa Station (JR platform)', date:'2026-08-08', file:'PXL_20260808_082750191.jpg'}, dateAdded:'2026-08-10', kanjiReading: [{char:'天',reading:'ten'},{char:'然',reading:'nen'},{char:'水',reading:'sui'}]},
      {jp:'さわやか', romaji:'sawayaka', en:'refreshing', tags:['shopping','shops','untaught','encountered'], source:{location:'Shinagawa Station (JR platform)', date:'2026-08-08', file:'PXL_20260808_082750191.jpg'}, dateAdded:'2026-08-10'},
      {jp:'味わい', romaji:'ajiwai', en:'flavor / taste', tags:['shopping','shops','untaught','encountered'], source:{location:'Shinagawa Station (JR platform)', date:'2026-08-08', file:'PXL_20260808_082750191.jpg'}, dateAdded:'2026-08-10', kanjiReading: [{char:'味',reading:'aji'}]},
      {jp:'シャイン', romaji:'shain', en:'"shine" (as in Shine Muscat grape)', tags:['shopping','shops','untaught','encountered'], source:{location:'Shinagawa Station (JR platform)', date:'2026-08-08', file:'PXL_20260808_082750191.jpg'}, dateAdded:'2026-08-10'},
      {jp:'マスカット', romaji:'masukatto', en:'muscat (grape)', tags:['shopping','shops','untaught','encountered'], source:{location:'Shinagawa Station (JR platform)', date:'2026-08-08', file:'PXL_20260808_082750191.jpg'}, dateAdded:'2026-08-10'},
      {jp:'無糖', romaji:'mutou', en:'sugar-free', tags:['shopping','shops','untaught','encountered'], source:{location:'Shinagawa Station (JR platform)', date:'2026-08-08', file:'PXL_20260808_082750191.jpg'}, dateAdded:'2026-08-10', kanjiReading: [{char:'無',reading:'mu'},{char:'糖',reading:'tou'}]},
      {jp:'カフェインゼロ', romaji:'kafein zero', en:'caffeine-free', tags:['shopping','shops','untaught','encountered'], source:{location:'Shinagawa Station (JR platform)', date:'2026-08-08', file:'PXL_20260808_082750191.jpg'}, dateAdded:'2026-08-10'},
      {jp:'大容量', romaji:'dai youryou', en:'large volume / capacity', tags:['shopping','shops','untaught','encountered'], source:{location:'Shinagawa Station (JR platform)', date:'2026-08-08', file:'PXL_20260808_082750191.jpg'}, dateAdded:'2026-08-10', kanjiReading: [{char:'大',reading:'dai'},{char:'容',reading:'you'},{char:'量',reading:'ryou'}]},
      {jp:'自販機限定', romaji:'jihanki gentei', en:'vending-machine exclusive', tags:['shopping','shops','untaught','encountered'], source:{location:'Shinagawa Station (JR platform)', date:'2026-08-08', file:'PXL_20260808_082750191.jpg'}, dateAdded:'2026-08-10', kanjiReading: [{char:'自',reading:'ji'},{char:'販',reading:'han'},{char:'機',reading:'ki'},{char:'限',reading:'gen'},{char:'定',reading:'tei'}]},
      {jp:'キャンペーン', romaji:'kyanpeen', en:'campaign / promotion', tags:['shopping','shops','untaught','encountered'], source:{location:'Shinagawa Station (JR platform)', date:'2026-08-08', file:'PXL_20260808_082750191.jpg'}, dateAdded:'2026-08-10'},
      {jp:'貯める', romaji:'tameru', en:'to save / collect (points)', tags:['shopping','shops','untaught','encountered'], source:{location:'Shinagawa Station (JR platform)', date:'2026-08-08', file:'PXL_20260808_082750191.jpg'}, dateAdded:'2026-08-10', kanjiReading: [{char:'貯',reading:'ta'}]},
      {jp:'対象商品', romaji:'taishou shouhin', en:'eligible / target product', tags:['shopping','shops','untaught','encountered'], seenAs:'対象商品を飲んで、貯めて、応募！- drink the eligible products, collect (stamps), and enter! (campaign tagline)', source:{location:'Shinagawa Station (JR platform)', date:'2026-08-08', file:'PXL_20260808_082750191.jpg'}, dateAdded:'2026-08-10', kanjiReading: [{char:'対',reading:'tai'},{char:'象',reading:'shou'},{char:'商',reading:'shou'},{char:'品',reading:'hin'}]},
      {jp:'応募', romaji:'oubo', en:'apply / enter (a promotion)', tags:['shopping','shops','untaught','encountered'], source:{location:'Shinagawa Station (JR platform)', date:'2026-08-08', file:'PXL_20260808_082750191.jpg'}, dateAdded:'2026-08-10', kanjiReading: [{char:'応',reading:'ou'},{char:'募',reading:'bo'}]},
      {jp:'電子マネー', romaji:'denshi manee', en:'e-money', tags:['shopping','shops','untaught','encountered'], seenAs:'sign said 交通系電子マネー (transit e-money) - shortened to the reusable core term', source:{location:'Shinagawa Station (JR platform)', date:'2026-08-08', file:'PXL_20260808_082750191.jpg'}, dateAdded:'2026-08-10', kanjiReading: [{char:'電',reading:'den'},{char:'子',reading:'shi'}]},
      {jp:'おつり', romaji:'otsuri', en:'change (money)', tags:['shopping','shops','untaught','encountered'], altForm:'お釣り (kanji form)', source:{location:'Shinagawa Station (JR platform)', date:'2026-08-08', file:'PXL_20260808_082750191.jpg'}, dateAdded:'2026-08-10'},
      {jp:'返却', romaji:'henkyaku', en:'return (an item)', tags:['shopping','shops','untaught','encountered'], source:{location:'Shinagawa Station (JR platform)', date:'2026-08-08', file:'PXL_20260808_082750191.jpg'}, dateAdded:'2026-08-10', kanjiReading: [{char:'返',reading:'hen'},{char:'却',reading:'kyaku'}]},
      {jp:'まいばすけっと', romaji:'maibasuketto', en:'"My Basket" (discount supermarket chain)', tags:['shopping','shops','untaught','encountered'], seenAs:'brand name written entirely in hiragana - good reading practice', source:{location:'Kanda', date:'2026-08-08', file:'PXL_20260808_085728020.jpg'}, dateAdded:'2026-08-10'},
      {jp:'道民', romaji:'doumin', en:'Hokkaido resident', tags:['shops','untaught','encountered','signage'], seenAs:'prefecture-resident pattern, cf. 都民 = Tokyo resident', source:{location:'Sapporo', date:'2026-08-09', file:'PXL_20260809_061147225.jpg'}, dateAdded:'2026-08-10', kanjiReading: [{char:'道',reading:'dou'},{char:'民',reading:'min'}]},
      {jp:'ポイント', romaji:'pointo', en:'points (loyalty points)', tags:['shopping','shops','untaught','encountered','service-ops'], source:{location:'Sapporo', date:'2026-08-09', file:'PXL_20260809_061147225.jpg'}, dateAdded:'2026-08-10'},
      {jp:'使えます', romaji:'tsukaemasu', en:'can be used', tags:['shopping','shops','untaught','encountered'], source:{location:'Sapporo', date:'2026-08-09', file:'PXL_20260809_061147225.jpg'}, dateAdded:'2026-08-10', kanjiReading: [{char:'使',reading:'tsuka'}]},
      {jp:'取扱店舗', romaji:'toriatsukai tenpo', en:'participating stores', tags:['shopping','shops','untaught','encountered'], source:{location:'Sapporo', date:'2026-08-09', file:'PXL_20260809_061147225.jpg'}, dateAdded:'2026-08-10', kanjiReading: [{char:'取',reading:'tori'},{char:'扱',reading:'atsukai'},{char:'店',reading:'ten'},{char:'舗',reading:'po'}]},
      {jp:'手数料', romaji:'tesuuryou', en:'fee / commission', tags:['shopping','shops','untaught','encountered','service-ops'], source:{location:'Sapporo', date:'2026-08-09', file:'PXL_20260809_061147225.jpg'}, dateAdded:'2026-08-10', kanjiReading: [{char:'手',reading:'te'},{char:'数',reading:'suu'},{char:'料',reading:'ryou'}]},
      {jp:'金融機関', romaji:'kinyuu kikan', en:'financial institution', tags:['shopping','shops','untaught','encountered'], source:{location:'Sapporo', date:'2026-08-09', file:'PXL_20260809_061147225.jpg'}, dateAdded:'2026-08-10', kanjiReading: [{char:'金',reading:'kin'},{char:'融',reading:'yuu'},{char:'機',reading:'ki'},{char:'関',reading:'kan'}]},
      {jp:'銀行', romaji:'ginkou', en:'bank', tags:['shopping','shops','untaught','encountered'], source:{location:'Sapporo', date:'2026-08-09', file:'PXL_20260809_061147225.jpg'}, dateAdded:'2026-08-10', kanjiReading: [{char:'銀',reading:'gin'},{char:'行',reading:'kou'}]},
      {jp:'からあげ', romaji:'karaage', en:'Japanese fried chicken', tags:['food-drink','shops','untaught','encountered','food-type'], source:{location:'Sapporo', date:'2026-08-09', file:'PXL_20260809_061147225.jpg'}, dateAdded:'2026-08-10'},
      {jp:'増量中', romaji:'zouryouchuu', en:'quantity increased (limited time)', tags:['shopping','shops','untaught','encountered'], source:{location:'Sapporo', date:'2026-08-09', file:'PXL_20260809_061147225.jpg'}, dateAdded:'2026-08-10', kanjiReading: [{char:'増',reading:'zou'},{char:'量',reading:'ryou'},{char:'中',reading:'chuu'}]},
      {jp:'持込品', romaji:'mochikomihin', en:'items brought in (from outside)', tags:['signage','shops','untaught','encountered'], source:{location:'Apia Sapporo (KFC)', date:'2026-08-09', file:'PXL_20260809_111435576.jpg'}, dateAdded:'2026-08-10', kanjiReadingBlocked: 'Irregular reading - doesn\'t break into standard sounds, worth memorising as a whole word'},
      {jp:'飲食', romaji:'inshoku', en:'eating and drinking / food & beverage', tags:['food-drink','shops','untaught','encountered','food-type'], source:{location:'Apia Sapporo (KFC)', date:'2026-08-09', file:'PXL_20260809_111435576.jpg'}, dateAdded:'2026-08-10', kanjiReading: [{char:'飲',reading:'in'},{char:'食',reading:'shoku'}]},
      {jp:'固く', romaji:'kataku', en:'strictly / firmly', tags:['shops','untaught','encountered','signage'], source:{location:'Apia Sapporo (KFC)', date:'2026-08-09', file:'PXL_20260809_111435576.jpg'}, dateAdded:'2026-08-10', kanjiReading: [{char:'固',reading:'kata'}]},
      {jp:'お断り', romaji:'okotowari', en:'to refuse / decline', tags:['signage','shops','untaught','encountered'], seenAs:'勉強等の長時間のご利用はお断り致します - long-term use for studying etc. is not permitted (seat-squatting notice)', source:{location:'Apia Sapporo (KFC)', date:'2026-08-09', file:'PXL_20260809_111435576.jpg'}, dateAdded:'2026-08-10', kanjiReading: [{char:'断',reading:'kotowa'}]},
      {jp:'長時間', romaji:'choujikan', en:'long time / extended period', tags:['shops','untaught','encountered','signage'], source:{location:'Apia Sapporo (KFC)', date:'2026-08-09', file:'PXL_20260809_111435576.jpg'}, dateAdded:'2026-08-10', kanjiReading: [{char:'長',reading:'chou'},{char:'時',reading:'ji'},{char:'間',reading:'kan'}]},
      {jp:'勉強', romaji:'benkyou', en:'studying', tags:['shops','untaught','encountered','signage'], source:{location:'Apia Sapporo (KFC)', date:'2026-08-09', file:'PXL_20260809_111435576.jpg'}, dateAdded:'2026-08-10', kanjiReading: [{char:'勉',reading:'ben'},{char:'強',reading:'kyou'}]},
      {jp:'給電', romaji:'kyuuden', en:'power supply', tags:['shops','untaught','encountered','signage'], source:{location:'Apia Sapporo (KFC)', date:'2026-08-09', file:'PXL_20260809_111435576.jpg'}, dateAdded:'2026-08-10', kanjiReading: [{char:'給',reading:'kyuu'},{char:'電',reading:'den'}]},
      {jp:'オリジナルチキン', romaji:'orijinaru chikin', en:'original chicken (KFC signature product)', tags:['shopping','shops','untaught','encountered'], source:{location:'Apia Sapporo (KFC)', date:'2026-08-09', file:'PXL_20260809_112215107.jpg'}, dateAdded:'2026-08-10'},
      {jp:'お買上', romaji:'okaiage', en:'purchase (polite)', tags:['shopping','shops','untaught','encountered'], source:{location:'Apia Sapporo (KFC)', date:'2026-08-09', file:'PXL_20260809_112215107.jpg'}, dateAdded:'2026-08-10', kanjiReadingBlocked: 'Irregular reading - doesn\'t break into standard sounds, worth memorising as a whole word'},
      {jp:'合計', romaji:'goukei', en:'total', tags:['shopping','shops','untaught','encountered','service-ops'], source:{location:'Apia Sapporo (KFC)', date:'2026-08-09', file:'PXL_20260809_112215107.jpg'}, dateAdded:'2026-08-10', kanjiReading: [{char:'合',reading:'gou'},{char:'計',reading:'kei'}]},
      // 消費税 moved to vocab-money-shopping (Trip-canonical copy) - stored
      // (and drillable) there instead.
      {jp:'対象', romaji:'taishou', en:'applicable / subject to', tags:['shopping','shops','untaught','encountered'], source:{location:'Apia Sapporo (KFC)', date:'2026-08-09', file:'PXL_20260809_112215107.jpg'}, dateAdded:'2026-08-10', kanjiReading: [{char:'対',reading:'tai'},{char:'象',reading:'shou'}]},
      {jp:'登録番号', romaji:'touroku bangou', en:'registration number', tags:['shopping','shops','untaught','encountered'], source:{location:'Apia Sapporo (KFC)', date:'2026-08-09', file:'PXL_20260809_112215107.jpg'}, dateAdded:'2026-08-10', kanjiReading: [{char:'登',reading:'tou'},{char:'録',reading:'roku'},{char:'番',reading:'ban'},{char:'号',reading:'gou'}]},
      {jp:'注文番号', romaji:'chuumon bangou', en:'order number', tags:['shopping','shops','untaught','encountered'], source:{location:'Apia Sapporo (KFC)', date:'2026-08-09', file:'PXL_20260809_112215107.jpg'}, dateAdded:'2026-08-10', kanjiReading: [{char:'注',reading:'chuu'},{char:'文',reading:'mon'},{char:'番',reading:'ban'},{char:'号',reading:'gou'}]},
      {jp:'領収証', romaji:'ryoushuushou', en:'receipt / proof of payment', tags:['shopping','shops','untaught','encountered','service-ops'], source:{location:'Apia Sapporo (KFC)', date:'2026-08-09', file:'PXL_20260809_112215107.jpg'}, dateAdded:'2026-08-10', kanjiReading: [{char:'領',reading:'ryou'},{char:'収',reading:'shuu'},{char:'証',reading:'shou'}]},
      {jp:'トレー', romaji:'toree', en:'tray', tags:['shopping','shops','untaught','encountered'], source:{location:'Apia Sapporo (KFC)', date:'2026-08-09', file:'PXL_20260809_112853677.jpg'}, dateAdded:'2026-08-10'},
      {jp:'バスケット', romaji:'basuketto', en:'basket', tags:['shopping','shops','untaught','encountered'], source:{location:'Apia Sapporo (KFC)', date:'2026-08-09', file:'PXL_20260809_112853677.jpg'}, dateAdded:'2026-08-10'},
      {jp:'こちら', romaji:'kochira', en:'here / this way', tags:['shops','untaught','encountered','signage'], source:{location:'Apia Sapporo (KFC)', date:'2026-08-09', file:'PXL_20260809_112853677.jpg'}, dateAdded:'2026-08-10'},
      {jp:'お返しください', romaji:'okaeshi kudasai', en:'please return (an item)', tags:['shopping','shops','untaught','encountered'], seenAs:'トレーとバスケットは、こちらへお返しください。- please return trays and baskets here (sign)', source:{location:'Apia Sapporo (KFC)', date:'2026-08-09', file:'PXL_20260809_112853677.jpg'}, dateAdded:'2026-08-10', kanjiReadingBlocked: 'This word\'s structure is more complex than this tool currently handles'},
      {jp:'捨てる', romaji:'suteru', en:'to throw away / discard', tags:['shops','untaught','encountered','signage'], source:{location:'Apia Sapporo (KFC)', date:'2026-08-09', file:'PXL_20260809_112853677.jpg'}, dateAdded:'2026-08-10', kanjiReading: [{char:'捨',reading:'su'}]},
      // 営業時間 removed - duplicate of the Materials — Restaurants: Ops
      // entry (earlier date, dedup rule for two Materials copies).
      {jp:'夏季無休', romaji:'kaki mukyuu', en:'open all summer, no holidays', tags:['shopping','places','shops','untaught','encountered','service-ops'], source:{location:'Hokkaido (roadside melon stand)', date:'2026-08-11', file:'PXL_20260810_232600071.jpg'}, dateAdded:'2026-08-11', kanjiReading: [{char:'夏',reading:'ka'},{char:'季',reading:'ki'},{char:'無',reading:'mu'},{char:'休',reading:'kyuu'}]},
      {jp:'ペット', romaji:'petto', en:'pet', tags:['shops','taught','encountered','signage','L3','general-l3','l3-4'], source:{location:'Hokkaido (roadside melon stand)', date:'2026-08-11', file:'PXL_20260810_232600071.jpg'}, dateAdded:'2026-08-11'},
      {jp:'ご同伴', romaji:'go-douhan', en:'accompanying / bringing along', tags:['shops','untaught','encountered','signage'], source:{location:'Hokkaido (roadside melon stand)', date:'2026-08-11', file:'PXL_20260810_232600071.jpg'}, dateAdded:'2026-08-11', kanjiReadingBlocked: 'One of this word\'s kanji doesn\'t have a recorded reading yet'},
      // ご遠慮ください removed - duplicate of the Materials — Hotel:
      // Facilities entry (earlier date, dedup rule for two Materials
      // copies).
      {jp:'補助犬', romaji:'hojoken', en:'service / assistance dog', tags:['signage','shops','untaught','encountered'], source:{location:'Hokkaido (roadside melon stand)', date:'2026-08-11', file:'PXL_20260810_232600071.jpg'}, dateAdded:'2026-08-11', kanjiReading: [{char:'補',reading:'ho'},{char:'助',reading:'jo'},{char:'犬',reading:'ken'}]},
      {jp:'カラス', romaji:'karasu', en:'crow', tags:['shops','untaught','encountered','signage'], source:{location:'Hokkaido (roadside melon stand)', date:'2026-08-11', file:'PXL_20260810_232600071.jpg'}, dateAdded:'2026-08-11'},
      // 注意 moved to vocab-signage-warnings (Trip-canonical copy) - stored
      // (and drillable) there instead.
      {jp:'商品', romaji:'shouhin', en:'product / merchandise', tags:['shopping','shops','untaught','encountered'], source:{location:'Hokkaido (roadside melon stand)', date:'2026-08-11', file:'PXL_20260810_232600071.jpg'}, dateAdded:'2026-08-11', kanjiReading: [{char:'商',reading:'shou'},{char:'品',reading:'hin'}]},
      {jp:'可能性', romaji:'kanousei', en:'possibility', tags:['shops','untaught','encountered','signage'], source:{location:'Hokkaido (roadside melon stand)', date:'2026-08-11', file:'PXL_20260810_232600071.jpg'}, dateAdded:'2026-08-11', kanjiReading: [{char:'可',reading:'ka'},{char:'能',reading:'nou'},{char:'性',reading:'sei'}]},
      {jp:'ご協力', romaji:'go-kyouryoku', en:'cooperation', tags:['signage','shops','untaught','encountered'], source:{location:'Hokkaido (roadside melon stand)', date:'2026-08-11', file:'PXL_20260810_232600071.jpg'}, dateAdded:'2026-08-11', kanjiReading: [{char:'協',reading:'kyou'},{char:'力',reading:'ryoku'}]},
      {jp:'朝もぎ', romaji:'asa-mogi', en:'morning-picked', tags:['shopping','shops','untaught','encountered'], source:{location:'Hokkaido (roadside corn stand)', date:'2026-08-11', file:'PXL_20260811_011059135.jpg'}, dateAdded:'2026-08-11', kanjiReading: [{char:'朝',reading:'asa'}]},
      {jp:'ゆでたて', romaji:'yudetate', en:'freshly boiled', tags:['shopping','shops','untaught','encountered'], source:{location:'Hokkaido (roadside corn stand)', date:'2026-08-11', file:'PXL_20260811_011059135.jpg'}, dateAdded:'2026-08-11'},
      {jp:'とうもろこし', romaji:'toumorokoshi', en:'corn', tags:['shopping','shops','untaught','encountered'], source:{location:'Hokkaido (roadside corn stand)', date:'2026-08-11', file:'PXL_20260811_011059135.jpg'}, dateAdded:'2026-08-11'},
    ],
  },
  'vocab-materials-entertainment': {
    level: 'untaught',
    hasReference: true,
    // standaloneCard: false (2026-08-31) - retired as its own tile now that
    // theme-entertainment-combined fully subsumes it: 68 items total, 39
    // carry `entertainment` directly, 10 already carried `emergency` (a
    // heatstroke-warning block, already drillable via theme-emergency-
    // combined), and the other 19 (a self-introduction/profile-card set
    // plus a handful of civic/street odds and ends) got split into
    // `profile-words`/`stations`/`street`/`places` the same day - see the
    // THEMES entries for the full breakdown. Every item has somewhere to
    // be drilled from; nothing lost.
    standaloneCard: false,
    label: 'Materials — Entertainment & sightseeing',
    chars: 'パチンコ 全台 計数機…',
    items: [
      {jp:'パチンコ', romaji:'pachinko', en:'pachinko (pinball-style game)', tags:['entertainment','materials-entertainment','untaught','encountered'], source:{location:'Akihabara', date:'2026-08-08', file:'PXL_20260808_092729915.jpg'}, dateAdded:'2026-08-10'},
      {jp:'全台', romaji:'zendai', en:'all machines / units', tags:['entertainment','materials-entertainment','untaught','encountered'], source:{location:'Akihabara', date:'2026-08-08', file:'PXL_20260808_092729915.jpg'}, dateAdded:'2026-08-10', kanjiReading: [{char:'全',reading:'zen'},{char:'台',reading:'dai'}]},
      {jp:'計数機', romaji:'keisuuki', en:'counting machine', tags:['entertainment','materials-entertainment','untaught','encountered'], source:{location:'Akihabara', date:'2026-08-08', file:'PXL_20260808_092729915.jpg'}, dateAdded:'2026-08-10', kanjiReading: [{char:'計',reading:'kei'},{char:'数',reading:'suu'},{char:'機',reading:'ki'}]},
      {jp:'完備', romaji:'kanbi', en:'fully equipped / complete facilities', tags:['entertainment','materials-entertainment','untaught','encountered'], source:{location:'Akihabara', date:'2026-08-08', file:'PXL_20260808_092729915.jpg'}, dateAdded:'2026-08-10', kanjiReading: [{char:'完',reading:'kan'},{char:'備',reading:'bi'}]},
      {jp:'麻雀', romaji:'maajan', en:'mahjong', tags:['entertainment','materials-entertainment','untaught','encountered'], source:{location:'Akihabara', date:'2026-08-08', file:'PXL_20260808_092729915.jpg'}, dateAdded:'2026-08-10', kanjiReadingBlocked: 'Irregular reading - doesn\'t break into standard sounds, worth memorising as a whole word'},
      {jp:'フリー', romaji:'furii', en:'free / walk-in (seating)', tags:['entertainment','materials-entertainment','untaught','encountered'], source:{location:'Akihabara', date:'2026-08-08', file:'PXL_20260808_092729915.jpg'}, dateAdded:'2026-08-10'},
      {jp:'個室', romaji:'koshitsu', en:'private room', tags:['entertainment','materials-entertainment','untaught','encountered'], source:{location:'Akihabara', date:'2026-08-08', file:'PXL_20260808_092729915.jpg'}, dateAdded:'2026-08-10', kanjiReading: [{char:'個',reading:'ko'},{char:'室',reading:'shitsu'}]},
      {jp:'設置', romaji:'secchi', en:'installation', tags:['entertainment','materials-entertainment','untaught','encountered'], source:{location:'Akihabara', date:'2026-08-08', file:'PXL_20260808_092729915.jpg'}, dateAdded:'2026-08-10', kanjiReadingBlocked: 'Follows a regular sound-doubling rule not built yet - not irregular, just not modelled'},
      {jp:'世界一', romaji:'sekaiichi', en:'world\'s number one / best in the world', tags:['entertainment','materials-entertainment','untaught','encountered'], source:{location:'Akihabara', date:'2026-08-08', file:'PXL_20260808_092729915.jpg'}, dateAdded:'2026-08-10', kanjiReading: [{char:'世',reading:'se'},{char:'界',reading:'kai'},{char:'一',reading:'ichi'}]},
      {jp:'スロット', romaji:'surotto', en:'slot machine', tags:['entertainment','materials-entertainment','untaught','encountered'], source:{location:'Akihabara', date:'2026-08-08', file:'PXL_20260808_092729915.jpg'}, dateAdded:'2026-08-10'},
      {jp:'夏まつり', romaji:'natsu matsuri', en:'summer festival', tags:['entertainment','materials-entertainment','untaught','encountered'], source:{location:'Sapporo (Odori Park)', date:'2026-08-09', file:'PXL_20260809_060005712.jpg'}, dateAdded:'2026-08-10', kanjiReading: [{char:'夏',reading:'natsu'}]},
      {jp:'協賛', romaji:'kyousan', en:'sponsorship', tags:['entertainment','materials-entertainment','untaught','encountered'], source:{location:'Sapporo (Odori Park)', date:'2026-08-09', file:'PXL_20260809_060005712.jpg'}, dateAdded:'2026-08-10', kanjiReading: [{char:'協',reading:'kyou'},{char:'賛',reading:'san'}]},
      {jp:'企業', romaji:'kigyou', en:'company / enterprise', tags:['materials-entertainment','untaught','encountered','profile-words'], source:{location:'Sapporo (Odori Park)', date:'2026-08-09', file:'PXL_20260809_060005712.jpg'}, dateAdded:'2026-08-10', kanjiReading: [{char:'企',reading:'ki'},{char:'業',reading:'gyou'}]},
      {jp:'応援', romaji:'ouen', en:'to support / cheer for', tags:['entertainment','materials-entertainment','untaught','encountered'], source:{location:'Sapporo (Odori Park)', date:'2026-08-09', file:'PXL_20260809_060005712.jpg'}, dateAdded:'2026-08-10', kanjiReading: [{char:'応',reading:'ou'},{char:'援',reading:'en'}]},
      {jp:'実行委員会', romaji:'jikkou iinkai', en:'executive / organizing committee', tags:['entertainment','materials-entertainment','untaught','encountered'], source:{location:'Sapporo (Odori Park)', date:'2026-08-09', file:'PXL_20260809_060005712.jpg'}, dateAdded:'2026-08-10', kanjiReadingBlocked: 'Follows a regular sound-doubling rule not built yet - not irregular, just not modelled'},
      {jp:'エントランス', romaji:'entoransu', en:'entrance', tags:['entertainment','materials-entertainment','untaught','encountered'], source:{location:'Sapporo TV Tower', date:'2026-08-09', file:'PXL_20260809_082903458.jpg'}, dateAdded:'2026-08-10'},
      {jp:'レンタル', romaji:'rentaru', en:'rental', tags:['entertainment','materials-entertainment','untaught','encountered'], source:{location:'Sapporo TV Tower', date:'2026-08-09', file:'PXL_20260809_082903458.jpg'}, dateAdded:'2026-08-10'},
      {jp:'展望台', romaji:'tenboudai', en:'observation deck', tags:['entertainment','materials-entertainment','untaught','encountered'], source:{location:'Sapporo TV Tower', date:'2026-08-09', file:'PXL_20260809_082903458.jpg'}, dateAdded:'2026-08-10', kanjiReading: [{char:'展',reading:'ten'},{char:'望',reading:'bou'},{char:'台',reading:'dai'}]},
      {jp:'入場券', romaji:'nyuujouken', en:'admission ticket', tags:['entertainment','materials-entertainment','untaught','encountered'], source:{location:'Sapporo TV Tower', date:'2026-08-09', file:'PXL_20260809_082903458.jpg'}, dateAdded:'2026-08-10', kanjiReading: [{char:'入',reading:'nyuu'},{char:'場',reading:'jou'},{char:'券',reading:'ken'}]},
      {jp:'売場', romaji:'uriba', en:'sales counter', tags:['entertainment','materials-entertainment','untaught','encountered'], source:{location:'Sapporo TV Tower', date:'2026-08-09', file:'PXL_20260809_082903458.jpg'}, dateAdded:'2026-08-10', kanjiReading: [{char:'売',reading:'uri'},{char:'場',reading:'ba'}]},
      {jp:'業務優先', romaji:'gyoumu yuusen', en:'staff duties take priority', tags:['entertainment','materials-entertainment','untaught','encountered','service-ops'], source:{location:'Sapporo TV Tower', date:'2026-08-09', file:'PXL_20260809_082903458.jpg'}, dateAdded:'2026-08-10', kanjiReading: [{char:'業',reading:'gyou'},{char:'務',reading:'mu'},{char:'優',reading:'yuu'},{char:'先',reading:'sen'}]},
      {jp:'名前', romaji:'namae', en:'name', tags:['materials-entertainment','untaught','encountered','profile-words'], source:{location:'Sapporo TV Tower (gift shop)', date:'2026-08-09', file:'PXL_20260809_084052739.jpg'}, dateAdded:'2026-08-10', kanjiReadingBlocked: 'Irregular reading - doesn\'t break into standard sounds, worth memorising as a whole word'},
      {jp:'生年月日', romaji:'seinengappi', en:'date of birth', tags:['materials-entertainment','untaught','encountered','profile-words'], source:{location:'Sapporo TV Tower (gift shop)', date:'2026-08-09', file:'PXL_20260809_084052739.jpg'}, dateAdded:'2026-08-10', kanjiReadingBlocked: 'Irregular reading - doesn\'t break into standard sounds, worth memorising as a whole word'},
      {jp:'身長', romaji:'shinchou', en:'height', tags:['materials-entertainment','untaught','encountered','profile-words'], source:{location:'Sapporo TV Tower (gift shop)', date:'2026-08-09', file:'PXL_20260809_084052739.jpg'}, dateAdded:'2026-08-10', kanjiReading: [{char:'身',reading:'shin'},{char:'長',reading:'chou'}]},
      {jp:'体重', romaji:'taijuu', en:'weight', tags:['materials-entertainment','untaught','encountered','profile-words'], source:{location:'Sapporo TV Tower (gift shop)', date:'2026-08-09', file:'PXL_20260809_084052739.jpg'}, dateAdded:'2026-08-10', kanjiReading: [{char:'体',reading:'tai'},{char:'重',reading:'juu'}]},
      {jp:'趣味', romaji:'shumi', en:'hobby', tags:['materials-entertainment','untaught','encountered','profile-words'], source:{location:'Sapporo TV Tower (gift shop)', date:'2026-08-09', file:'PXL_20260809_084052739.jpg'}, dateAdded:'2026-08-10', kanjiReading: [{char:'趣',reading:'shu'},{char:'味',reading:'mi'}]},
      {jp:'特技', romaji:'tokugi', en:'special skill', tags:['materials-entertainment','untaught','encountered','profile-words'], source:{location:'Sapporo TV Tower (gift shop)', date:'2026-08-09', file:'PXL_20260809_084052739.jpg'}, dateAdded:'2026-08-10', kanjiReading: [{char:'特',reading:'toku'},{char:'技',reading:'gi'}]},
      {jp:'長所', romaji:'chousho', en:'strong point / merit', tags:['materials-entertainment','untaught','encountered','profile-words'], source:{location:'Sapporo TV Tower (gift shop)', date:'2026-08-09', file:'PXL_20260809_084052739.jpg'}, dateAdded:'2026-08-10', kanjiReading: [{char:'長',reading:'chou'},{char:'所',reading:'sho'}]},
      {jp:'チャームポイント', romaji:'chaamu pointo', en:'charm point (appealing feature)', tags:['materials-entertainment','untaught','encountered','profile-words'], source:{location:'Sapporo TV Tower (gift shop)', date:'2026-08-09', file:'PXL_20260809_084052739.jpg'}, dateAdded:'2026-08-10'},
      {jp:'好きな食べ物', romaji:'suki na tabemono', en:'favorite food', tags:['materials-entertainment','untaught','encountered','profile-words'], source:{location:'Sapporo TV Tower (gift shop)', date:'2026-08-09', file:'PXL_20260809_084052739.jpg'}, dateAdded:'2026-08-10', kanjiReadingBlocked: 'This word\'s structure is more complex than this tool currently handles'},
      {jp:'好きな言葉', romaji:'suki na kotoba', en:'favorite word / motto', tags:['materials-entertainment','untaught','encountered','profile-words'], source:{location:'Sapporo TV Tower (gift shop)', date:'2026-08-09', file:'PXL_20260809_084052739.jpg'}, dateAdded:'2026-08-10', kanjiReadingBlocked: 'This word\'s structure is more complex than this tool currently handles'},
      {jp:'好きな色', romaji:'suki na iro', en:'favorite color', tags:['materials-entertainment','untaught','encountered','profile-words'], source:{location:'Sapporo TV Tower (gift shop)', date:'2026-08-09', file:'PXL_20260809_084052739.jpg'}, dateAdded:'2026-08-10', kanjiReadingBlocked: 'This word\'s structure is more complex than this tool currently handles'},
      {jp:'大切なもの', romaji:'taisetsu na mono', en:'important thing(s)', tags:['materials-entertainment','untaught','encountered','profile-words'], source:{location:'Sapporo TV Tower (gift shop)', date:'2026-08-09', file:'PXL_20260809_084052739.jpg'}, dateAdded:'2026-08-10', kanjiReading: [{char:'大',reading:'tai'}, {char:'切',reading:'setsu'}]},
      {jp:'デビュー', romaji:'debyuu', en:'debut', tags:['materials-entertainment','untaught','encountered','profile-words'], source:{location:'Sapporo TV Tower (gift shop)', date:'2026-08-09', file:'PXL_20260809_084052739.jpg'}, dateAdded:'2026-08-10'},
      // 地獄谷 (jigokudani) - the place name itself is deliberately left out
      // here, same call as the lake/volcano names skipped earlier: real, but
      // only useful locally, not generalizable vocabulary. 温泉 (the actual
      // word "hot spring") is kept below.
      {jp:'温泉', romaji:'onsen', en:'hot spring', tags:['entertainment','materials-entertainment','untaught','encountered'], source:{location:'Jigokudani, Noboribetsu Onsen', date:'2026-08-12', file:'PXL_20260812_003515734.jpg'}, dateAdded:'2026-08-15', kanjiReading: [{char:'温',reading:'on'},{char:'泉',reading:'sen'}]},
      {jp:'湧出', romaji:'yuushutsu', en:'gushing out / spouting (hot spring)', tags:['entertainment','materials-entertainment','untaught','encountered'], source:{location:'Noboribetsu Onsen (Oyunuma quiz trail)', date:'2026-08-12', file:'PXL_20260812_004218905.jpg'}, dateAdded:'2026-08-15', kanjiReading: [{char:'湧',reading:'yuu'},{char:'出',reading:'shutsu'}]},
      {jp:'名勝地', romaji:'meishouchi', en:'scenic spot', tags:['entertainment','materials-entertainment','untaught','encountered'], source:{location:'Noboribetsu Onsen (Oyunuma quiz trail)', date:'2026-08-12', file:'PXL_20260812_004218905.jpg'}, dateAdded:'2026-08-15', kanjiReading: [{char:'名',reading:'mei'},{char:'勝',reading:'shou'},{char:'地',reading:'chi'}]},
      {jp:'景観', romaji:'keikan', en:'scenery / view', tags:['entertainment','materials-entertainment','untaught','encountered'], source:{location:'Noboribetsu Onsen (Oyunuma quiz trail)', date:'2026-08-12', file:'PXL_20260812_004218905.jpg'}, dateAdded:'2026-08-15', kanjiReading: [{char:'景',reading:'kei'},{char:'観',reading:'kan'}]},
      {jp:'国立公園', romaji:'kokuritsu kouen', en:'national park', tags:['entertainment','materials-entertainment','untaught','encountered'], source:{location:'Noboribetsu Onsen (Oyunuma quiz trail)', date:'2026-08-12', file:'PXL_20260812_004218905.jpg'}, dateAdded:'2026-08-15', kanjiReading: [{char:'国',reading:'koku'},{char:'立',reading:'ritsu'},{char:'公',reading:'kou'},{char:'園',reading:'en'}]},
      {jp:'停止線', romaji:'teishisen', en:'stop line (road marking)', tags:['materials-entertainment','untaught','encountered','street'], source:{location:'Muroran (roadside, seen from bus)', date:'2026-08-12', file:'PXL_20260812_013049380.jpg'}, dateAdded:'2026-08-15', kanjiReading: [{char:'停',reading:'tei'},{char:'止',reading:'shi'},{char:'線',reading:'sen'}]},
      {jp:'開発局', romaji:'kaihatsukyoku', en:'development bureau (road authority)', tags:['materials-entertainment','untaught','encountered','street'], source:{location:'Muroran (roadside, seen from bus)', date:'2026-08-12', file:'PXL_20260812_013049380.jpg'}, dateAdded:'2026-08-15', kanjiReading: [{char:'開',reading:'kai'}, {char:'発',reading:'hatsu'}, {char:'局',reading:'kyoku'}]},
      {jp:'動物', romaji:'doubutsu', en:'animal', tags:['entertainment','materials-entertainment','untaught','encountered'], source:{location:'Mt. Usu (Toyako), Hokkaido', date:'2026-08-12', file:'PXL_20260812_042805070.jpg'}, dateAdded:'2026-08-15', kanjiReading: [{char:'動',reading:'dou'},{char:'物',reading:'butsu'}]},
      {jp:'シカ', romaji:'shika', en:'deer', tags:['entertainment','materials-entertainment','untaught','encountered'], source:{location:'Mt. Usu (Toyako), Hokkaido', date:'2026-08-12', file:'PXL_20260812_042805070.jpg'}, dateAdded:'2026-08-15'},
      {jp:'住んでいます', romaji:'sundeimasu', en:'lives / inhabits (polite)', tags:['entertainment','materials-entertainment','untaught','encountered'], source:{location:'Mt. Usu (Toyako), Hokkaido', date:'2026-08-12', file:'PXL_20260812_042805070.jpg'}, dateAdded:'2026-08-15', kanjiReading: [{char:'住',reading:'su'}]},
      {jp:'いない', romaji:'inai', en:'not present / doesn\'t live there', tags:['entertainment','materials-entertainment','untaught','encountered'], source:{location:'Mt. Usu (Toyako), Hokkaido', date:'2026-08-12', file:'PXL_20260812_042805070.jpg'}, dateAdded:'2026-08-15'},
      {jp:'鉄橋', romaji:'tekkyou', en:'iron bridge / railway bridge', tags:['entertainment','materials-entertainment','untaught','encountered'], seenAs:'やませんてつきょう - Yamase Tekkyou (bridge name plaque)', source:{location:'Chitose (Yamase Bridge)', date:'2026-08-12', file:'PXL_20260812_073105020.jpg'}, dateAdded:'2026-08-15', kanjiReadingBlocked: 'Follows a regular sound-doubling rule not built yet - not irregular, just not modelled'},
      // The next 10 words are from a heatstroke warning scale seen on the
      // steep steps up to a waterfall - cartoony/public-facing rather than a
      // formal construction notice, despite how the source photo happened to
      // get auto-categorised. 緊急 (kinkyuu, "emergency") from the same photo
      // set was skipped - already covered by きんきゅう in Emergency &
      // survival (Trip tier), which carries 緊急 as its altForm.
      {jp:'危険', romaji:'kiken', en:'danger', tags:['emergency','materials-entertainment','untaught','encountered'], source:{location:'Nunobiki Park (布引公園), Kobe', date:'2026-08-16', file:'PXL_20260816_083423419.jpg'}, dateAdded:'2026-08-16', kanjiReading: [{char:'危',reading:'ki'},{char:'険',reading:'ken'}]},
      {jp:'厳重警戒', romaji:'genjuu keikai', en:'high alert / strict caution', tags:['emergency','materials-entertainment','untaught','encountered'], source:{location:'Nunobiki Park (布引公園), Kobe', date:'2026-08-16', file:'PXL_20260816_083423419.jpg'}, dateAdded:'2026-08-16', kanjiReading: [{char:'厳',reading:'gen'},{char:'重',reading:'juu'},{char:'警',reading:'kei'},{char:'戒',reading:'kai'}]},
      {jp:'警戒', romaji:'keikai', en:'caution / vigilance', tags:['emergency','materials-entertainment','untaught','encountered'], source:{location:'Nunobiki Park (布引公園), Kobe', date:'2026-08-16', file:'PXL_20260816_083423419.jpg'}, dateAdded:'2026-08-16', kanjiReading: [{char:'警',reading:'kei'},{char:'戒',reading:'kai'}]},
      {jp:'熱中症', romaji:'necchuushou', en:'heatstroke', tags:['emergency','materials-entertainment','untaught','encountered'], source:{location:'Nunobiki Park (布引公園), Kobe', date:'2026-08-16', file:'PXL_20260816_083423419.jpg'}, dateAdded:'2026-08-16', kanjiReadingBlocked: 'Follows a regular sound-doubling rule not built yet - not irregular, just not modelled'},
      {jp:'適度な休憩', romaji:'tekido na kyuukei', en:'moderate / appropriate rest breaks', tags:['emergency','materials-entertainment','untaught','encountered'], source:{location:'Nunobiki Park (布引公園), Kobe', date:'2026-08-16', file:'PXL_20260816_083423419.jpg'}, dateAdded:'2026-08-16', kanjiReadingBlocked: 'One of this word\'s kanji doesn\'t have a recorded reading yet'},
      {jp:'気を付けて', romaji:'ki wo tsukete', en:'be careful / watch out', tags:['emergency','materials-entertainment','untaught','encountered'], source:{location:'Nunobiki Park (布引公園), Kobe', date:'2026-08-16', file:'PXL_20260816_083434642.jpg'}, dateAdded:'2026-08-16', kanjiReading: [{char:'気',reading:'ki'},{char:'付',reading:'tsu'}]},
      {jp:'声掛けて', romaji:'koe kakete', en:'call out / speak up (to get help)', tags:['emergency','materials-entertainment','untaught','encountered'], source:{location:'Nunobiki Park (布引公園), Kobe', date:'2026-08-16', file:'PXL_20260816_083434642.jpg'}, dateAdded:'2026-08-16', kanjiReadingBlocked: 'One of this word\'s kanji doesn\'t have a recorded reading yet'},
      {jp:'経口補水液', romaji:'keikou hosuieki', en:'oral rehydration solution', tags:['emergency','materials-entertainment','untaught','encountered'], source:{location:'Nunobiki Park (布引公園), Kobe', date:'2026-08-16', file:'PXL_20260816_083434642.jpg'}, dateAdded:'2026-08-16', kanjiReading: [{char:'経',reading:'kei'}, {char:'口',reading:'kou'}, {char:'補',reading:'ho'}, {char:'水',reading:'sui'}, {char:'液',reading:'eki'}]},
      {jp:'冷却パック', romaji:'reikyaku pakku', en:'cooling pack', tags:['emergency','materials-entertainment','untaught','encountered'], source:{location:'Nunobiki Park (布引公園), Kobe', date:'2026-08-16', file:'PXL_20260816_083434642.jpg'}, dateAdded:'2026-08-16', kanjiReading: [{char:'冷',reading:'rei'},{char:'却',reading:'kyaku'}]},
      {jp:'閉まってます', romaji:'shimattemasu', en:'is closed', tags:['entertainment','materials-entertainment','untaught','encountered','service-ops'], source:{location:'Nunobiki Park (布引公園), Kobe', date:'2026-08-16', file:'PXL_20260816_083434642.jpg'}, dateAdded:'2026-08-16', kanjiReading: [{char:'閉',reading:'shi'}]},
      // 公園 from this photo was skipped - it's just the kanji form of the
      // existing こうえん (Level 1), folded in as that entry's altForm
      // instead of duplicated here.
      {jp:'市役所', romaji:'shiyakusho', en:'city hall', tags:['materials-entertainment','untaught','encountered','places'], source:{location:'Tondabayashi, Osaka Prefecture', date:'2026-08-17', file:'PXL_20260817_024719225.jpg'}, dateAdded:'2026-08-17', kanjiReading: [{char:'市',reading:'shi'},{char:'役',reading:'yaku'},{char:'所',reading:'sho'}]},
      {jp:'鉄道駅', romaji:'tetsudou eki', en:'railway station', tags:['materials-entertainment','untaught','encountered','stations'], source:{location:'Tondabayashi, Osaka Prefecture', date:'2026-08-17', file:'PXL_20260817_024719225.jpg'}, dateAdded:'2026-08-17', kanjiReading: [{char:'鉄',reading:'tetsu'},{char:'道',reading:'dou'},{char:'駅',reading:'eki'}]},
      {jp:'史跡', romaji:'shiseki', en:'historical site', tags:['entertainment','materials-entertainment','untaught','encountered'], source:{location:'Tondabayashi, Osaka Prefecture', date:'2026-08-17', file:'PXL_20260817_024719225.jpg'}, dateAdded:'2026-08-17', kanjiReading: [{char:'史',reading:'shi'},{char:'跡',reading:'seki'}]},
      {jp:'ようこそ', romaji:'youkoso', en:'welcome', tags:['entertainment','materials-entertainment','untaught','encountered'], source:{location:'Tondabayashi, Osaka Prefecture', date:'2026-08-17', file:'PXL_20260817_024719225.jpg'}, dateAdded:'2026-08-17'},
      {jp:'庭園', romaji:'teien', en:'garden', tags:['entertainment','materials-entertainment','untaught','encountered'], source:{location:'Shukkeien Garden, Hiroshima', date:'2026-08-19', file:'PXL_20260819_025835737.jpg'}, dateAdded:'2026-08-21', kanjiReading: [{char:'庭',reading:'tei'},{char:'園',reading:'en'}]},
      {jp:'藩主', romaji:'hanshu', en:'feudal lord (Edo-period domain ruler)', tags:['entertainment','materials-entertainment','untaught','encountered'], source:{location:'Shukkeien Garden, Hiroshima', date:'2026-08-19', file:'PXL_20260819_025835737.jpg'}, dateAdded:'2026-08-21', kanjiReading: [{char:'藩',reading:'han'},{char:'主',reading:'shu'}]},
      {jp:'別邸', romaji:'bettei', en:'villa / secondary residence', tags:['entertainment','materials-entertainment','untaught','encountered'], source:{location:'Shukkeien Garden, Hiroshima', date:'2026-08-19', file:'PXL_20260819_025835737.jpg'}, dateAdded:'2026-08-21', kanjiReadingBlocked: 'Follows a regular sound-doubling rule not built yet - not irregular, just not modelled'},
      {jp:'避難', romaji:'hinan', en:'evacuation / taking refuge', tags:['emergency','materials-entertainment','untaught','encountered'], source:{location:'Shukkeien Garden, Hiroshima', date:'2026-08-19', file:'PXL_20260819_025835737.jpg'}, dateAdded:'2026-08-21', kanjiReading: [{char:'避',reading:'hi'},{char:'難',reading:'nan'}]},
      {jp:'埋葬', romaji:'maisou', en:'burial / interment', tags:['entertainment','materials-entertainment','untaught','encountered'], source:{location:'Shukkeien Garden, Hiroshima', date:'2026-08-19', file:'PXL_20260819_025835737.jpg'}, dateAdded:'2026-08-21', kanjiReading: [{char:'埋',reading:'mai'},{char:'葬',reading:'sou'}]},
      {jp:'名称', romaji:'meishou', en:'name / designation', tags:['materials-entertainment','untaught','encountered','places'], source:{location:'Shukkeien Garden, Hiroshima', date:'2026-08-19', file:'PXL_20260819_025835737.jpg'}, dateAdded:'2026-08-21', kanjiReading: [{char:'名',reading:'mei'},{char:'称',reading:'shou'}]},
      {jp:'トンビ', romaji:'tonbi', en:'black kite (bird of prey)', tags:['entertainment','materials-entertainment','untaught','encountered'], source:{location:'Kyoto Station area', date:'2026-08-20', file:'PXL_20260820_050611881.jpg'}, dateAdded:'2026-08-21'},
      {jp:'狙っています', romaji:'neratteimasu', en:'is aiming / targeting', tags:['entertainment','materials-entertainment','untaught','encountered'], seenAs:'トンビにご注意下さい。食べ物を狙っています。- please be careful of black kites, they\'re after your food', source:{location:'Kyoto Station area', date:'2026-08-20', file:'PXL_20260820_050611881.jpg'}, dateAdded:'2026-08-21', kanjiReading: [{char:'狙',reading:'nera'}]},
    ],
  },
  'vocab-materials-hotel-appliances': {
    level: 'untaught',
    hasReference: true,
    // tagQuery (2026-08-31) - FLIP PILOT style (see vocab-weather, the
    // first category converted this way on 2026-08-26), not a promote-and-
    // retire: this category has nothing to combine with (no Trip
    // counterpart, no strays elsewhere carrying `appliances`), so unlike
    // everything promoted earlier today it keeps its own tile in this exact
    // spot, just sourced by tag scan instead of reading `items` directly.
    // All 113 items already carried `appliances` wholesale, so this is a
    // zero-visible-change conversion - verified byte-identical to the
    // pre-flip tile. showApplianceDeviceReference() still reads
    // VOCAB['vocab-materials-hotel-appliances'].items directly and is
    // unaffected - tagQuery never mutates or removes the physical items
    // array, it only changes how the tile's own display list is built.
    tagQuery: { all: ['appliances'], none: ['tourist'] },  // tourist words live under the Tourist pill (2026-10-15)
    label: 'Hotel appliances & machines',
    chars: '冷房 設定温度 運転…',
    items: [
      {jp:'冷房', romaji:'reibou', en:'air conditioning / cooling mode', tags:['appliances','untaught','encountered'], devices:['ac'], source:{location:'JR Inn Sapporo (hotel room)', date:'2026-08-10', file:'PXL_20260809_234205137.jpg'}, dateAdded:'2026-08-10', kanjiReading: [{char:'冷',reading:'rei'},{char:'房',reading:'bou'}]},
      {jp:'設定温度', romaji:'settei ondo', en:'set temperature', tags:['appliances','untaught','encountered'], devices:['ac'], source:{location:'JR Inn Sapporo (hotel room)', date:'2026-08-10', file:'PXL_20260809_234205137.jpg'}, dateAdded:'2026-08-10', kanjiReadingBlocked: 'Follows a regular sound-doubling rule not built yet - not irregular, just not modelled'},
      {jp:'運転', romaji:'unten', en:'operation / running (of a machine)', tags:['appliances','untaught','encountered'], devices:['ac'], source:{location:'JR Inn Sapporo (hotel room)', date:'2026-08-10', file:'PXL_20260809_234205137.jpg'}, dateAdded:'2026-08-10', kanjiReading: [{char:'運',reading:'un'},{char:'転',reading:'ten'}]},
      {jp:'停止', romaji:'teishi', en:'stop', tags:['appliances','untaught','encountered'], devices:['ac'], source:{location:'JR Inn Sapporo (hotel room)', date:'2026-08-10', file:'PXL_20260809_234205137.jpg'}, dateAdded:'2026-08-10', kanjiReading: [{char:'停',reading:'tei'},{char:'止',reading:'shi'}]},
      {jp:'風量', romaji:'fuuryou', en:'air volume / fan strength', tags:['appliances','untaught','encountered'], devices:['ac'], source:{location:'JR Inn Sapporo (hotel room)', date:'2026-08-10', file:'PXL_20260809_234205137.jpg'}, dateAdded:'2026-08-10', kanjiReading: [{char:'風',reading:'fuu'},{char:'量',reading:'ryou'}]},
      {jp:'風向', romaji:'fuukou', en:'air direction', tags:['appliances','untaught','encountered'], devices:['ac'], dateAdded:'2026-08-10', source:{location:'JR Inn Sapporo (hotel room)', date:'2026-08-10', file:'PXL_20260809_234205137.jpg'}, kanjiReading: [{char:'風',reading:'fuu'},{char:'向',reading:'kou'}]},
      {jp:'確定', romaji:'kakutei', en:'confirm / finalize', tags:['appliances','untaught','encountered'], devices:['ac'], source:{location:'JR Inn Sapporo (hotel room)', date:'2026-08-10', file:'PXL_20260809_234205137.jpg'}, dateAdded:'2026-08-10', kanjiReading: [{char:'確',reading:'kaku'},{char:'定',reading:'tei'}]},
      {jp:'カードキー', romaji:'kaado kii', en:'card key', tags:['appliances','untaught','encountered'], source:{location:'JR Inn Sapporo (hotel room)', date:'2026-08-10', file:'PXL_20260809_234208029.jpg'}, dateAdded:'2026-08-10'},
      {jp:'入れてください', romaji:'irete kudasai', en:'please insert / put in', tags:['appliances','untaught','encountered'], seenAs:'カードを入れてください - please insert the card', source:{location:'JR Inn Sapporo (hotel room)', date:'2026-08-10', file:'PXL_20260809_234208029.jpg'}, dateAdded:'2026-08-10', kanjiReading: [{char:'入',reading:'i'}]},
      {jp:'オートロック', romaji:'ootorokku', en:'auto-lock', tags:['appliances','untaught','encountered'], devices:['door-lock'], source:{location:'JR Inn Sapporo (hotel room)', date:'2026-08-10', file:'PXL_20260809_234219833.jpg'}, dateAdded:'2026-08-10'},
      {jp:'使用', romaji:'shiyou', en:'use', tags:['appliances','untaught','encountered'], seenAs:'避難にあたっては、絶対にエレベーターを使用しないでください。- when evacuating, absolutely do not use the elevator', source:{location:'JR Inn Sapporo (hotel room)', date:'2026-08-10', file:'PXL_20260809_234219833.jpg'}, dateAdded:'2026-08-10', kanjiReading: [{char:'使',reading:'shi'},{char:'用',reading:'you'}]},
      {jp:'かざす', romaji:'kazasu', en:'to hold (something) over/up to', tags:['appliances','untaught','encountered'], source:{location:'JR Inn Sapporo (hotel)', date:'2026-08-10', file:'PXL_20260810_002426356.jpg'}, dateAdded:'2026-08-10'},
      {jp:'かんたん', romaji:'kantan', en:'easy / simple', tags:['appliances','untaught','encountered'], source:{location:'JR Inn Sapporo (hotel)', date:'2026-08-10', file:'PXL_20260810_002426356.jpg'}, dateAdded:'2026-08-10'},
      {jp:'キャッシュレス', romaji:'kyasshuresu', en:'cashless', tags:['appliances','untaught','encountered'], devices:['laundry'], source:{location:'JR Inn Sapporo (Kita 2-jo)', date:'2026-08-11', file:'PXL_20260811_054148652.jpg'}, dateAdded:'2026-08-11'},
      {jp:'決済', romaji:'kessai', en:'payment / settlement', tags:['appliances','untaught','encountered','service-ops'], devices:['laundry'], source:{location:'JR Inn Sapporo (Kita 2-jo)', date:'2026-08-11', file:'PXL_20260811_054148652.jpg'}, dateAdded:'2026-08-11', kanjiReadingBlocked: 'Follows a regular sound-doubling rule not built yet - not irregular, just not modelled'},
      {jp:'各種', romaji:'kakushu', en:'various types / each kind', tags:['appliances','untaught','encountered'], source:{location:'JR Inn Sapporo (Kita 2-jo)', date:'2026-08-11', file:'PXL_20260811_054148652.jpg'}, dateAdded:'2026-08-11', kanjiReading: [{char:'各',reading:'kaku'},{char:'種',reading:'shu'}]},
      {jp:'クレジットカード', romaji:'kurejitto kaado', en:'credit card', tags:['appliances','untaught','encountered','shopping'], devices:['laundry'], source:{location:'JR Inn Sapporo (Kita 2-jo)', date:'2026-08-11', file:'PXL_20260811_054148652.jpg'}, dateAdded:'2026-08-11'},
      {jp:'コード決済', romaji:'koodo kessai', en:'QR code payment', tags:['appliances','untaught','encountered','service-ops'], devices:['laundry'], source:{location:'JR Inn Sapporo (Kita 2-jo)', date:'2026-08-11', file:'PXL_20260811_054148652.jpg'}, dateAdded:'2026-08-11', kanjiReadingBlocked: 'Follows a regular sound-doubling rule not built yet - not irregular, just not modelled'},
      {jp:'洗濯', romaji:'sentaku', en:'laundry / washing', tags:['appliances','untaught','encountered'], devices:['laundry'], source:{location:'JR Inn Sapporo (Kita 2-jo)', date:'2026-08-11', file:'PXL_20260811_054435165.jpg'}, dateAdded:'2026-08-11', kanjiReading: [{char:'洗',reading:'sen'},{char:'濯',reading:'taku'}]},
      {jp:'順序', romaji:'junjo', en:'order / procedure', tags:['appliances','untaught','encountered'], source:{location:'JR Inn Sapporo (Kita 2-jo)', date:'2026-08-11', file:'PXL_20260811_054435165.jpg'}, dateAdded:'2026-08-11', kanjiReading: [{char:'順',reading:'jun'},{char:'序',reading:'jo'}]},
      {jp:'硬貨', romaji:'kouka', en:'coin', tags:['appliances','untaught','encountered'], devices:['laundry'], source:{location:'JR Inn Sapporo (Kita 2-jo)', date:'2026-08-11', file:'PXL_20260811_054435165.jpg'}, dateAdded:'2026-08-11', kanjiReading: [{char:'硬',reading:'kou'},{char:'貨',reading:'ka'}]},
      {jp:'投入', romaji:'tounyuu', en:'insert / put in', tags:['appliances','untaught','encountered'], devices:['laundry'], source:{location:'JR Inn Sapporo (Kita 2-jo)', date:'2026-08-11', file:'PXL_20260811_054435165.jpg'}, dateAdded:'2026-08-11', kanjiReading: [{char:'投',reading:'tou'},{char:'入',reading:'nyuu'}]},
      {jp:'ソフト剤', romaji:'sofuto zai', en:'fabric softener', tags:['appliances','untaught','encountered'], devices:['laundry'], source:{location:'JR Inn Sapporo (Kita 2-jo)', date:'2026-08-11', file:'PXL_20260811_054435165.jpg'}, dateAdded:'2026-08-11', kanjiReading: [{char:'剤',reading:'zai'}]},
      {jp:'据え付け', romaji:'suetsuke', en:'installation', tags:['appliances','untaught','encountered'], source:{location:'JR Inn Sapporo (Kita 2-jo)', date:'2026-08-11', file:'PXL_20260811_054435165.jpg'}, dateAdded:'2026-08-11', kanjiReading: [{char:'据',reading:'su'},{char:'付',reading:'tsu'}]},
      {jp:'警告', romaji:'keikoku', en:'warning', tags:['emergency','appliances','untaught','encountered'], source:{location:'JR Inn Sapporo (Kita 2-jo)', date:'2026-08-11', file:'PXL_20260811_054435165.jpg'}, dateAdded:'2026-08-11', kanjiReading: [{char:'警',reading:'kei'},{char:'告',reading:'koku'}]},
      {jp:'感電', romaji:'kanden', en:'electric shock', tags:['emergency','appliances','untaught','encountered'], source:{location:'JR Inn Sapporo (Kita 2-jo)', date:'2026-08-11', file:'PXL_20260811_054435165.jpg'}, dateAdded:'2026-08-11', kanjiReading: [{char:'感',reading:'kan'},{char:'電',reading:'den'}]},
      {jp:'操作', romaji:'sousa', en:'operation', tags:['appliances','untaught','encountered'], source:{location:'JR Inn Sapporo (Kita 2-jo)', date:'2026-08-11', file:'PXL_20260811_054440182.jpg'}, dateAdded:'2026-08-11', kanjiReading: [{char:'操',reading:'sou'},{char:'作',reading:'sa'}]},
      {jp:'ドラム', romaji:'doramu', en:'drum', tags:['appliances','untaught','encountered'], devices:['laundry'], source:{location:'JR Inn Sapporo (Kita 2-jo)', date:'2026-08-11', file:'PXL_20260811_054440182.jpg'}, dateAdded:'2026-08-11'},
      {jp:'排気フィルター', romaji:'haiki firutaa', en:'exhaust filter', tags:['appliances','untaught','encountered'], devices:['laundry'], source:{location:'JR Inn Sapporo (Kita 2-jo)', date:'2026-08-11', file:'PXL_20260811_054440182.jpg'}, dateAdded:'2026-08-11', kanjiReadingBlocked: 'Contains a placeholder or symbol with no fixed reading of its own'},
      {jp:'脱水', romaji:'dassui', en:'spin-dry / dehydration', tags:['appliances','untaught','encountered'], devices:['laundry'], source:{location:'JR Inn Sapporo (Kita 2-jo)', date:'2026-08-11', file:'PXL_20260811_054440182.jpg'}, dateAdded:'2026-08-11', kanjiReadingBlocked: 'Follows a regular sound-doubling rule not built yet - not irregular, just not modelled'},
      {jp:'乾燥容量', romaji:'kansou youryou', en:'drying capacity', tags:['appliances','untaught','encountered'], source:{location:'JR Inn Sapporo (Kita 2-jo)', date:'2026-08-11', file:'PXL_20260811_054440182.jpg'}, dateAdded:'2026-08-11', kanjiReading: [{char:'乾',reading:'kan'},{char:'燥',reading:'sou'},{char:'容',reading:'you'},{char:'量',reading:'ryou'}]},
      {jp:'硬貨専用', romaji:'kouka senyou', en:'coins only', tags:['appliances','untaught','encountered'], devices:['laundry'], source:{location:'JR Inn Sapporo (Kita 2-jo)', date:'2026-08-11', file:'PXL_20260811_054440182.jpg'}, dateAdded:'2026-08-11', kanjiReading: [{char:'硬',reading:'kou'},{char:'貨',reading:'ka'},{char:'専',reading:'sen'},{char:'用',reading:'you'}]},
      {jp:'にぎる', romaji:'nigiru', en:'to grip / hold', tags:['appliances','untaught','encountered'], source:{location:'JR Inn Sapporo (Kita 2-jo)', date:'2026-08-11', file:'PXL_20260811_054656071.TS-000.jpg'}, dateAdded:'2026-08-11'},
      {jp:'ゆらす', romaji:'yurasu', en:'to shake / sway', tags:['appliances','untaught','encountered'], source:{location:'JR Inn Sapporo (Kita 2-jo)', date:'2026-08-11', file:'PXL_20260811_054656071.TS-000.jpg'}, dateAdded:'2026-08-11'},
      {jp:'引き抜く', romaji:'hikinuku', en:'to pull out', tags:['appliances','untaught','encountered'], source:{location:'JR Inn Sapporo (Kita 2-jo)', date:'2026-08-11', file:'PXL_20260811_054656071.TS-000.jpg'}, dateAdded:'2026-08-11', kanjiReading: [{char:'引',reading:'hi'},{char:'抜',reading:'nu'}]},
      {jp:'使用上の注意', romaji:'shiyoujou no chuui', en:'usage precautions', tags:['appliances','untaught','encountered'], source:{location:'JR Inn Sapporo (Kita 2-jo)', date:'2026-08-11', file:'PXL_20260811_054656071.TS-000.jpg'}, dateAdded:'2026-08-11', kanjiReadingBlocked: 'One of this word\'s kanji doesn\'t have a recorded reading yet'},
      {jp:'手順', romaji:'tejun', en:'steps / procedure', tags:['appliances','untaught','encountered'], source:{location:'JR Inn Sapporo (Kita 2-jo)', date:'2026-08-11', file:'PXL_20260811_055321883.jpg'}, dateAdded:'2026-08-11', kanjiReading: [{char:'手',reading:'te'},{char:'順',reading:'jun'}]},
      {jp:'スマホ', romaji:'sumaho', en:'smartphone', tags:['appliances','taught','encountered','genki','genki-1-2','L3','general-l3','l3-4','tools-l3','l3-5'], source:{location:'JR Inn Sapporo (Kita 2-jo)', date:'2026-08-11', file:'PXL_20260811_055321883.jpg'}, dateAdded:'2026-08-11'},
      {jp:'北海道限定', romaji:'Hokkaidou gentei', en:'Hokkaido-limited edition', tags:['appliances','untaught','encountered'], source:{location:'JR Inn Sapporo (Kita 2-jo)', date:'2026-08-11', file:'PXL_20260811_055321883.jpg'}, dateAdded:'2026-08-11', kanjiReadingBlocked: 'Irregular reading - doesn\'t break into standard sounds, worth memorising as a whole word'},
      {jp:'出力', romaji:'shutsuryoku', en:'output / power', tags:['appliances','untaught','encountered'], devices:['microwave'], source:{location:'JR Inn Sapporo (Kita 2-jo)', date:'2026-08-11', file:'PXL_20260811_061436925.jpg'}, dateAdded:'2026-08-11', kanjiReading: [{char:'出',reading:'shutsu'},{char:'力',reading:'ryoku'}]},
      {jp:'設定', romaji:'settei', en:'setting', tags:['appliances','untaught','encountered'], devices:['microwave'], source:{location:'JR Inn Sapporo (Kita 2-jo)', date:'2026-08-11', file:'PXL_20260811_061436925.jpg'}, dateAdded:'2026-08-11', kanjiReadingBlocked: 'Follows a regular sound-doubling rule not built yet - not irregular, just not modelled'},
      {jp:'解凍', romaji:'kaitou', en:'defrost', tags:['appliances','untaught','encountered'], devices:['microwave'], source:{location:'JR Inn Sapporo (Kita 2-jo)', date:'2026-08-11', file:'PXL_20260811_061436925.jpg'}, dateAdded:'2026-08-11', kanjiReading: [{char:'解',reading:'kai'},{char:'凍',reading:'tou'}]},
      {jp:'インストール', romaji:'insutooru', en:'install', tags:['appliances','untaught','encountered'], source:{location:'JR Inn Sapporo (hotel)', date:'2026-08-11', file:'PXL_20260811_090603573.jpg'}, dateAdded:'2026-08-11'},
      {jp:'必要', romaji:'hitsuyou', en:'necessary', tags:['appliances','untaught','encountered'], source:{location:'JR Inn Sapporo (hotel)', date:'2026-08-11', file:'PXL_20260811_090603573.jpg'}, dateAdded:'2026-08-11', kanjiReading: [{char:'必',reading:'hitsu'},{char:'要',reading:'you'}]},
      {jp:'洗剤', romaji:'senzai', en:'detergent', tags:['appliances','untaught','encountered'], devices:['laundry'], source:{location:'JR Inn Sapporo (hotel)', date:'2026-08-11', file:'PXL_20260811_090603573.jpg'}, dateAdded:'2026-08-11', kanjiReading: [{char:'洗',reading:'sen'},{char:'剤',reading:'zai'}]},
      {jp:'自動投入', romaji:'jidou tounyuu', en:'automatic dispensing', tags:['appliances','untaught','encountered'], devices:['laundry'], source:{location:'JR Inn Sapporo (hotel)', date:'2026-08-11', file:'PXL_20260811_090603573.jpg'}, dateAdded:'2026-08-11', kanjiReading: [{char:'自',reading:'ji'},{char:'動',reading:'dou'},{char:'投',reading:'tou'},{char:'入',reading:'nyuu'}]},
      {jp:'目安', romaji:'meyasu', en:'guideline / rough estimate', tags:['appliances','untaught','encountered'], source:{location:'JR Inn Sapporo (hotel)', date:'2026-08-11', file:'PXL_20260811_095209622.jpg'}, dateAdded:'2026-08-11', kanjiReading: [{char:'目',reading:'me'},{char:'安',reading:'yasu'}]},
      {jp:'掃除', romaji:'souji', en:'cleaning (e.g. the washing machine)', tags:['appliances','untaught','encountered'], source:{location:'JR Inn Sapporo (hotel)', date:'2026-08-11', file:'PXL_20260811_095209622.jpg'}, dateAdded:'2026-08-11', kanjiReading: [{char:'掃',reading:'sou'},{char:'除',reading:'ji'}]},
      {jp:'暖房', romaji:'danbou', en:'heating', tags:['appliances','untaught','encountered'], devices:['ac'], source:{location:'Super Hotel Premier Osaka Honmachi (room, AC remote)', date:'2026-08-14', file:'PXL_20260814_061846966.jpg'}, dateAdded:'2026-08-15', kanjiReading: [{char:'暖',reading:'dan'},{char:'房',reading:'bou'}]},
      {jp:'除湿', romaji:'joshitsu', en:'dehumidify', tags:['appliances','untaught','encountered'], devices:['ac'], source:{location:'Super Hotel Premier Osaka Honmachi (room, AC remote)', date:'2026-08-14', file:'PXL_20260814_061846966.jpg'}, dateAdded:'2026-08-15', kanjiReading: [{char:'除',reading:'jo'},{char:'湿',reading:'shitsu'}]},
      {jp:'しずか', romaji:'shizuka', en:'quiet (AC fan mode)', tags:['appliances','untaught','encountered'], devices:['ac'], source:{location:'Super Hotel Premier Osaka Honmachi (room, AC remote)', date:'2026-08-14', file:'PXL_20260814_061846966.jpg'}, dateAdded:'2026-08-15'},
      {jp:'パワフル', romaji:'pawafuru', en:'powerful (AC fan mode)', tags:['appliances','untaught','encountered'], devices:['ac'], source:{location:'Super Hotel Premier Osaka Honmachi (room, AC remote)', date:'2026-08-14', file:'PXL_20260814_061846966.jpg'}, dateAdded:'2026-08-15'},
      {jp:'内部クリーン', romaji:'naibu kuriin', en:'internal clean (AC self-clean function)', tags:['appliances','untaught','encountered'], devices:['ac'], source:{location:'Super Hotel Premier Osaka Honmachi (room, AC remote)', date:'2026-08-14', file:'PXL_20260814_061846966.jpg'}, dateAdded:'2026-08-15', kanjiReadingBlocked: 'One of this word\'s kanji doesn\'t have a recorded reading yet'},
      {jp:'決定', romaji:'kettei', en:'confirm / decide (remote button)', tags:['appliances','untaught','encountered'], devices:['ac'], source:{location:'Super Hotel Premier Osaka Honmachi (room, AC remote)', date:'2026-08-14', file:'PXL_20260814_061846966.jpg'}, dateAdded:'2026-08-15', kanjiReadingBlocked: 'Follows a regular sound-doubling rule not built yet - not irregular, just not modelled'},
      {jp:'取消', romaji:'torikeshi', en:'cancel (remote button)', tags:['appliances','untaught','encountered'], devices:['ac'], source:{location:'Super Hotel Premier Osaka Honmachi (room, AC remote)', date:'2026-08-14', file:'PXL_20260814_061846966.jpg'}, dateAdded:'2026-08-15', kanjiReadingBlocked: 'Irregular reading - doesn\'t break into standard sounds, worth memorising as a whole word'},
      // 予約 from this photo was skipped as a standalone item - it's the same
      // kanji/reading already covered by the 予約 entry in Materials -
      // Street, just enriched with a seenAs there showing this delayed-start
      // timer usage as a new example of the same word.
      {jp:'お手入れ', romaji:'oteire', en:'maintenance / care (appliance cleaning cycle)', tags:['appliances','untaught','encountered'], devices:['laundry'], source:{location:'Tokyu Stay Kyoto (hotel, washing machine)', date:'2026-08-20', file:'PXL_20260820_073154857.jpg'}, dateAdded:'2026-08-21', kanjiReading: [{char:'手',reading:'te'},{char:'入',reading:'i'}]},
      {jp:'温水', romaji:'onsui', en:'warm water', tags:['appliances','untaught','encountered'], devices:['laundry'], source:{location:'Tokyu Stay Kyoto (hotel, washing machine)', date:'2026-08-20', file:'PXL_20260820_073154857.jpg'}, dateAdded:'2026-08-21', kanjiReading: [{char:'温',reading:'on'},{char:'水',reading:'sui'}]},
      {jp:'すすぎ', romaji:'susugi', en:'rinse', tags:['appliances','untaught','encountered'], devices:['laundry'], source:{location:'Tokyu Stay Kyoto (hotel, washing machine)', date:'2026-08-20', file:'PXL_20260820_073154857.jpg'}, dateAdded:'2026-08-21'},
      // Also seen on the toilet/bidet panel (warm air dryer function) on
      // 2026-08-25 - same word, no new item, just widened to a second device.
      {jp:'乾燥', romaji:'kansou', en:'drying', tags:['appliances','untaught','encountered'], devices:['laundry','toilet'], source:{location:'Tokyu Stay Kyoto (hotel, washing machine)', date:'2026-08-20', file:'PXL_20260820_073154857.jpg'}, dateAdded:'2026-08-21', kanjiReading: [{char:'乾',reading:'kan'},{char:'燥',reading:'sou'}]},
      {jp:'標準', romaji:'hyoujun', en:'standard (setting)', tags:['appliances','untaught','encountered'], devices:['laundry'], source:{location:'Tokyu Stay Kyoto (hotel, washing machine)', date:'2026-08-20', file:'PXL_20260820_073154857.jpg'}, dateAdded:'2026-08-21', kanjiReading: [{char:'標',reading:'hyou'},{char:'準',reading:'jun'}]},
      {jp:'ドアロック', romaji:'doa rokku', en:'door lock (appliance status)', tags:['appliances','untaught','encountered'], devices:['laundry'], source:{location:'Tokyu Stay Kyoto (hotel, washing machine)', date:'2026-08-20', file:'PXL_20260820_073154857.jpg'}, dateAdded:'2026-08-21'},
      // 設定温度 from this photo skipped - exact duplicate already covered
      // above.
      {jp:'運転/停止', romaji:'unten/teishi', en:'operate / stop', tags:['appliances','untaught','encountered'], devices:['ac'], source:{location:'Tokyu Stay Kyoto (hotel room, AC unit)', date:'2026-08-22', file:'PXL_20260822_003816959.jpg'}, dateAdded:'2026-08-22', kanjiReadingBlocked: 'Contains a placeholder or symbol with no fixed reading of its own'},
      {jp:'運転切換', romaji:'unten kirikae', en:'operation mode switch', tags:['appliances','untaught','encountered'], devices:['ac'], source:{location:'Tokyu Stay Kyoto (hotel room, AC unit)', date:'2026-08-22', file:'PXL_20260822_003816959.jpg'}, dateAdded:'2026-08-22', kanjiReading: [{char:'運',reading:'un'},{char:'転',reading:'ten'},{char:'切',reading:'kiri'},{char:'換',reading:'kae'}]},
      {jp:'風速', romaji:'fuusoku', en:'fan / wind speed', tags:['appliances','untaught','encountered'], devices:['ac'], source:{location:'Tokyu Stay Kyoto (hotel room, AC unit)', date:'2026-08-22', file:'PXL_20260822_003816959.jpg'}, dateAdded:'2026-08-22', kanjiReading: [{char:'風',reading:'fuu'},{char:'速',reading:'soku'}]},
      {jp:'上下風向', romaji:'jouge fuukou', en:'up-down air direction (vane control)', tags:['appliances','untaught','encountered'], devices:['ac'], source:{location:'Tokyu Stay Kyoto (hotel room, AC unit)', date:'2026-08-22', file:'PXL_20260822_003816959.jpg'}, dateAdded:'2026-08-22', kanjiReadingBlocked: 'Irregular reading - doesn\'t break into standard sounds, worth memorising as a whole word'},
      {jp:'ルーバー', romaji:'ruubaa', en:'louver (vent flap)', tags:['appliances','untaught','encountered'], devices:['ac'], source:{location:'Tokyu Stay Kyoto (hotel room, AC unit)', date:'2026-08-22', file:'PXL_20260822_003816959.jpg'}, dateAdded:'2026-08-22'},
      {jp:'換気', romaji:'kanki', en:'ventilation', tags:['appliances','untaught','encountered'], devices:['ac'], source:{location:'Tokyu Stay Kyoto (hotel room, AC unit)', date:'2026-08-22', file:'PXL_20260822_003816959.jpg'}, dateAdded:'2026-08-22', kanjiReadingBlocked: 'Irregular reading - doesn\'t break into standard sounds, worth memorising as a whole word'},
      {jp:'点検', romaji:'tenken', en:'inspection', tags:['appliances','untaught','encountered'], devices:['ac'], source:{location:'Tokyu Stay Kyoto (hotel room, AC unit)', date:'2026-08-22', file:'PXL_20260822_003816959.jpg'}, dateAdded:'2026-08-22', kanjiReading: [{char:'点',reading:'ten'},{char:'検',reading:'ken'}]},
      {jp:'試運転', romaji:'shiunten', en:'test run / trial operation', tags:['appliances','untaught','encountered'], devices:['ac'], source:{location:'Tokyu Stay Kyoto (hotel room, AC unit)', date:'2026-08-22', file:'PXL_20260822_003816959.jpg'}, dateAdded:'2026-08-22', kanjiReading: [{char:'試',reading:'shi'},{char:'運',reading:'un'},{char:'転',reading:'ten'}]},
      {jp:'フィルター清掃', romaji:'firutaa seisou', en:'filter cleaning', tags:['appliances','untaught','encountered'], devices:['ac'], source:{location:'Tokyu Stay Kyoto (hotel room, AC unit)', date:'2026-08-22', file:'PXL_20260822_003816959.jpg'}, dateAdded:'2026-08-22', kanjiReadingBlocked: 'Contains a placeholder or symbol with no fixed reading of its own'},
      {jp:'故障', romaji:'koshou', en:'malfunction / breakdown', tags:['appliances','untaught','encountered'], devices:['ac'], seenAs:'風向、風速がリモコン表示と異なりますが故障ではありません。- the vane/fan speed may differ from the remote display, but this is not a malfunction', source:{location:'Tokyu Stay Kyoto (hotel room, AC unit)', date:'2026-08-22', file:'PXL_20260822_003816959.jpg'}, dateAdded:'2026-08-22', kanjiReading: [{char:'故',reading:'ko'},{char:'障',reading:'shou'}]},
      {jp:'クリア', romaji:'kuria', en:'clear (button)', tags:['appliances','untaught','encountered'], devices:['ac'], source:{location:'Tokyu Stay Kyoto (hotel room, AC unit)', date:'2026-08-22', file:'PXL_20260822_003816959.jpg'}, dateAdded:'2026-08-22'},
      {jp:'画面表示', romaji:'gamen hyouji', en:'screen display (button)', tags:['appliances','untaught','encountered'], devices:['tv-remote'], source:{location:'Tokyu Stay Kyoto (hotel room, TV remote)', date:'2026-08-22', file:'PXL_20260822_125930013.jpg'}, dateAdded:'2026-08-22', kanjiReading: [{char:'画',reading:'ga'},{char:'面',reading:'men'},{char:'表',reading:'hyou'},{char:'示',reading:'ji'}]},
      {jp:'番組表', romaji:'bangumihyou', en:'TV program guide', tags:['appliances','untaught','encountered'], devices:['tv-remote'], source:{location:'Tokyu Stay Kyoto (hotel room, TV remote)', date:'2026-08-22', file:'PXL_20260822_125930013.jpg'}, dateAdded:'2026-08-22', kanjiReading: [{char:'番',reading:'ban'},{char:'組',reading:'gumi'},{char:'表',reading:'hyou'}]},
      {jp:'入力切換', romaji:'nyuuryoku kirikae', en:'input switch', tags:['appliances','untaught','encountered'], devices:['tv-remote'], source:{location:'Tokyu Stay Kyoto (hotel room, TV remote)', date:'2026-08-22', file:'PXL_20260822_125930013.jpg'}, dateAdded:'2026-08-22', kanjiReading: [{char:'入',reading:'nyuu'},{char:'力',reading:'ryoku'},{char:'切',reading:'kiri'},{char:'換',reading:'kae'}]},
      {jp:'音量', romaji:'onryou', en:'volume', tags:['appliances','untaught','encountered'], devices:['tv-remote'], source:{location:'Tokyu Stay Kyoto (hotel room, TV remote)', date:'2026-08-22', file:'PXL_20260822_125930013.jpg'}, dateAdded:'2026-08-22', kanjiReading: [{char:'音',reading:'on'},{char:'量',reading:'ryou'}]},
      {jp:'チャンネル', romaji:'channeru', en:'channel', tags:['appliances','untaught','encountered'], devices:['tv-remote'], source:{location:'Tokyu Stay Kyoto (hotel room, TV remote)', date:'2026-08-22', file:'PXL_20260822_125930013.jpg'}, dateAdded:'2026-08-22'},
      {jp:'字幕', romaji:'jimaku', en:'subtitles', tags:['appliances','untaught','encountered'], devices:['tv-remote'], source:{location:'Tokyu Stay Kyoto (hotel room, TV remote)', date:'2026-08-22', file:'PXL_20260822_125930013.jpg'}, dateAdded:'2026-08-22', kanjiReading: [{char:'字',reading:'ji'},{char:'幕',reading:'maku'}]},
      {jp:'早送り', romaji:'hayaokuri', en:'fast forward', tags:['appliances','untaught','encountered'], devices:['tv-remote'], source:{location:'Tokyu Stay Kyoto (hotel room, TV remote)', date:'2026-08-22', file:'PXL_20260822_125930013.jpg'}, dateAdded:'2026-08-22', kanjiReadingBlocked: 'One of this word\'s kanji doesn\'t have a recorded reading yet'},
      {jp:'早戻し', romaji:'hayamodoshi', en:'rewind', tags:['appliances','untaught','encountered'], devices:['tv-remote'], source:{location:'Tokyu Stay Kyoto (hotel room, TV remote)', date:'2026-08-22', file:'PXL_20260822_125930013.jpg'}, dateAdded:'2026-08-22', kanjiReadingBlocked: 'One of this word\'s kanji doesn\'t have a recorded reading yet'},
      {jp:'一時停止', romaji:'ichiji teishi', en:'pause', tags:['appliances','untaught','encountered'], devices:['tv-remote'], source:{location:'Tokyu Stay Kyoto (hotel room, TV remote)', date:'2026-08-22', file:'PXL_20260822_125930013.jpg'}, dateAdded:'2026-08-22', kanjiReading: [{char:'一',reading:'ichi'},{char:'時',reading:'ji'},{char:'停',reading:'tei'},{char:'止',reading:'shi'}]},
      {jp:'消音', romaji:'shouon', en:'mute', tags:['appliances','untaught','encountered'], devices:['tv-remote'], source:{location:'Tokyu Stay Kyoto (hotel room, TV remote)', date:'2026-08-22', file:'PXL_20260822_125930013.jpg'}, dateAdded:'2026-08-22', kanjiReading: [{char:'消',reading:'shou'},{char:'音',reading:'on'}]},
      {jp:'音声切換', romaji:'onsei kirikae', en:'audio track switch', tags:['appliances','untaught','encountered'], devices:['tv-remote'], source:{location:'Tokyu Stay Kyoto (hotel room, TV remote)', date:'2026-08-22', file:'PXL_20260822_125930013.jpg'}, dateAdded:'2026-08-22', kanjiReading: [{char:'音',reading:'on'}, {char:'声',reading:'sei'}, {char:'切',reading:'kiri'}, {char:'換',reading:'kae'}]},
      {jp:'録画リスト', romaji:'rokuga risuto', en:'recording list', tags:['appliances','untaught','encountered'], devices:['tv-remote'], source:{location:'Tokyu Stay Kyoto (hotel room, TV remote)', date:'2026-08-22', file:'PXL_20260822_125930013.jpg'}, dateAdded:'2026-08-22', kanjiReading: [{char:'録',reading:'roku'},{char:'画',reading:'ga'}]},
      {jp:'飲み物', romaji:'nomimono', en:'drink / beverage (preset button)', tags:['appliances','untaught','encountered'], devices:['microwave'], source:{location:'Tokyu Stay Kyoto (hotel room, microwave)', date:'2026-08-22', file:'PXL_20260822_125942537.jpg'}, dateAdded:'2026-08-22', kanjiReading: [{char:'飲',reading:'no'},{char:'物',reading:'mono'}]},
      // ごはん from this photo skipped as a standalone item - same word
      // already covered by the ごはん entry in Level 2's General vocabulary,
      // just enriched with a seenAs there showing this microwave preset
      // button usage as a new example of the same word.
      {jp:'レンジ', romaji:'renji', en:'microwave (reheat mode)', tags:['appliances','taught','encountered','L3','loanwords-l3','l3-5'], devices:['microwave'], source:{location:'Tokyu Stay Kyoto (hotel room, microwave)', date:'2026-08-22', file:'PXL_20260822_125942537.jpg'}, dateAdded:'2026-08-22'},
      {jp:'弱', romaji:'jaku', en:'weak (power level)', tags:['appliances','untaught','encountered'], devices:['microwave'], source:{location:'Tokyu Stay Kyoto (hotel room, microwave)', date:'2026-08-22', file:'PXL_20260822_125942537.jpg'}, dateAdded:'2026-08-22', kanjiReading: [{char:'弱',reading:'jaku'}]},
      {jp:'強', romaji:'kyou', en:'strong (power level)', tags:['appliances','untaught','encountered'], devices:['microwave'], source:{location:'Tokyu Stay Kyoto (hotel room, microwave)', date:'2026-08-22', file:'PXL_20260822_125942537.jpg'}, dateAdded:'2026-08-22', kanjiReading: [{char:'強',reading:'kyou'}]},
      {jp:'時短', romaji:'jitan', en:'time-saving (mode)', tags:['appliances','untaught','encountered'], devices:['microwave'], source:{location:'Tokyu Stay Kyoto (hotel room, microwave)', date:'2026-08-22', file:'PXL_20260822_125942537.jpg'}, dateAdded:'2026-08-22', kanjiReading: [{char:'時',reading:'ji'},{char:'短',reading:'tan'}]},
      {jp:'冷食時短', romaji:'reishoku jitan', en:'quick-time for frozen food', tags:['appliances','untaught','encountered'], devices:['microwave'], source:{location:'Tokyu Stay Kyoto (hotel room, microwave)', date:'2026-08-22', file:'PXL_20260822_125942537.jpg'}, dateAdded:'2026-08-22', kanjiReading: [{char:'冷',reading:'rei'},{char:'食',reading:'shoku'},{char:'時',reading:'ji'},{char:'短',reading:'tan'}]},
      {jp:'あたためスタート', romaji:'atatame sutaato', en:'start warming/heating (button)', tags:['appliances','untaught','encountered'], devices:['microwave'], source:{location:'Tokyu Stay Kyoto (hotel room, microwave)', date:'2026-08-22', file:'PXL_20260822_125942537.jpg'}, dateAdded:'2026-08-22'},
      {jp:'ドラム式専用', romaji:'doramu shiki senyou', en:'for drum-type (washing machines) only', tags:['appliances','untaught','encountered'], devices:['laundry'], source:{location:'Tokyu Stay Kyoto (hotel, laundry detergent bottle)', date:'2026-08-22', file:'PXL_20260822_125956962.jpg'}, dateAdded:'2026-08-22', kanjiReadingBlocked: 'One of this word\'s kanji doesn\'t have a recorded reading yet'},
      {jp:'洗浄力', romaji:'senjouryoku', en:'cleaning power', tags:['appliances','untaught','encountered'], devices:['laundry'], source:{location:'Tokyu Stay Kyoto (hotel, laundry detergent bottle)', date:'2026-08-22', file:'PXL_20260822_125956962.jpg'}, dateAdded:'2026-08-22', kanjiReading: [{char:'洗',reading:'sen'},{char:'浄',reading:'jou'},{char:'力',reading:'ryoku'}]},
      {jp:'抗菌', romaji:'koukin', en:'antibacterial', tags:['appliances','untaught','encountered'], devices:['laundry'], source:{location:'Tokyu Stay Kyoto (hotel, laundry detergent bottle)', date:'2026-08-22', file:'PXL_20260822_125956962.jpg'}, dateAdded:'2026-08-22', kanjiReading: [{char:'抗',reading:'kou'},{char:'菌',reading:'kin'}]},
      {jp:'防カビ', romaji:'bou kabi', en:'mold prevention', tags:['appliances','untaught','encountered'], devices:['laundry'], source:{location:'Tokyu Stay Kyoto (hotel, laundry detergent bottle)', date:'2026-08-22', file:'PXL_20260822_125956962.jpg'}, dateAdded:'2026-08-22', kanjiReading: [{char:'防',reading:'bou'}]},
      {jp:'プッシュ', romaji:'pusshu', en:'push (pump count unit for dosing)', tags:['appliances','untaught','encountered'], devices:['laundry'], source:{location:'Tokyu Stay Kyoto (hotel, laundry detergent bottle)', date:'2026-08-22', file:'PXL_20260822_125956962.jpg'}, dateAdded:'2026-08-22'},
      {jp:'使用量', romaji:'shiyouryou', en:'amount to use / dosage', tags:['appliances','untaught','encountered'], devices:['laundry'], source:{location:'Tokyu Stay Kyoto (hotel, laundry detergent bottle)', date:'2026-08-22', file:'PXL_20260822_125956962.jpg'}, dateAdded:'2026-08-22', kanjiReading: [{char:'使',reading:'shi'},{char:'用',reading:'you'},{char:'量',reading:'ryou'}]},
      {jp:'自動', romaji:'jidou', en:'automatic', tags:['appliances','untaught','encountered'], devices:['ac'], source:{location:'Tokyu Stay Kyoto (hotel room, AC remote)', date:'2026-08-25', file:'PXL_20260825_131044812.jpg'}, dateAdded:'2026-08-25', kanjiReading: [{char:'自',reading:'ji'},{char:'動',reading:'dou'}]},
      {jp:'ドライ', romaji:'dorai', en:'dry / dehumidify mode', tags:['appliances','untaught','encountered'], devices:['ac'], source:{location:'Tokyu Stay Kyoto (hotel room, AC remote)', date:'2026-08-25', file:'PXL_20260825_131044812.jpg'}, dateAdded:'2026-08-25'},
      {jp:'送風', romaji:'soufuu', en:'fan-only / air blow mode', tags:['appliances','untaught','encountered'], devices:['ac'], source:{location:'Tokyu Stay Kyoto (hotel room, AC remote)', date:'2026-08-25', file:'PXL_20260825_131044812.jpg'}, dateAdded:'2026-08-25', kanjiReading: [{char:'送',reading:'sou'},{char:'風',reading:'fuu'}]},
      {jp:'風ないス', romaji:'kaze nai su', en:'"no direct breeze" mode', tags:['appliances','untaught','encountered'], devices:['ac'], source:{location:'Tokyu Stay Kyoto (hotel room, AC remote)', date:'2026-08-25', file:'PXL_20260825_131044812.jpg'}, dateAdded:'2026-08-25', kanjiReadingBlocked: 'This word\'s structure is more complex than this tool currently handles'},
      {jp:'おやすみ', romaji:'oyasumi', en:'good night (sleep mode)', tags:['appliances','untaught','encountered'], devices:['ac'], source:{location:'Tokyu Stay Kyoto (hotel room, AC remote)', date:'2026-08-25', file:'PXL_20260825_131044812.jpg'}, dateAdded:'2026-08-25'},
      {jp:'室温パトロール', romaji:'shitsuon patorooru', en:'room-temperature patrol (auto-adjust feature)', tags:['appliances','untaught','encountered'], devices:['ac'], source:{location:'Tokyu Stay Kyoto (hotel room, AC remote)', date:'2026-08-25', file:'PXL_20260825_131044812.jpg'}, dateAdded:'2026-08-25', kanjiReading: [{char:'室',reading:'shitsu'},{char:'温',reading:'on'}]},
      {jp:'便座', romaji:'benza', en:'toilet seat', tags:['appliances','untaught','encountered'], devices:['toilet'], source:{location:'Tokyu Stay Kyoto (hotel room, toilet/bidet panel)', date:'2026-08-25', file:'PXL_20260825_134218859.jpg'}, dateAdded:'2026-08-25', kanjiReading: [{char:'便',reading:'ben'},{char:'座',reading:'za'}]},
      {jp:'自動洗浄', romaji:'jidou senjou', en:'automatic cleaning/flush', tags:['appliances','untaught','encountered'], devices:['toilet'], source:{location:'Tokyu Stay Kyoto (hotel room, toilet/bidet panel)', date:'2026-08-25', file:'PXL_20260825_134218859.jpg'}, dateAdded:'2026-08-25', kanjiReading: [{char:'自',reading:'ji'},{char:'動',reading:'dou'},{char:'洗',reading:'sen'},{char:'浄',reading:'jou'}]},
      {jp:'洗浄強さ', romaji:'senjou tsuyosa', en:'wash strength (bidet spray intensity)', tags:['appliances','untaught','encountered'], devices:['toilet'], source:{location:'Tokyu Stay Kyoto (hotel room, toilet/bidet panel)', date:'2026-08-25', file:'PXL_20260825_134218859.jpg'}, dateAdded:'2026-08-25', kanjiReading: [{char:'洗',reading:'sen'},{char:'浄',reading:'jou'},{char:'強',reading:'tsuyo'}]},
      {jp:'洗浄位置', romaji:'senjou ichi', en:'wash position (nozzle position)', tags:['appliances','untaught','encountered'], devices:['toilet'], source:{location:'Tokyu Stay Kyoto (hotel room, toilet/bidet panel)', date:'2026-08-25', file:'PXL_20260825_134218859.jpg'}, dateAdded:'2026-08-25', kanjiReading: [{char:'洗',reading:'sen'},{char:'浄',reading:'jou'},{char:'位',reading:'i'},{char:'置',reading:'chi'}]},
      {jp:'おしり', romaji:'oshiri', en:'rear wash (bidet mode)', tags:['appliances','untaught','encountered'], devices:['toilet'], source:{location:'Tokyu Stay Kyoto (hotel room, toilet/bidet panel)', date:'2026-08-25', file:'PXL_20260825_134218859.jpg'}, dateAdded:'2026-08-25'},
      {jp:'マイルド', romaji:'mairudo', en:'mild (bidet spray mode)', tags:['appliances','untaught','encountered'], devices:['toilet'], source:{location:'Tokyu Stay Kyoto (hotel room, toilet/bidet panel)', date:'2026-08-25', file:'PXL_20260825_134218859.jpg'}, dateAdded:'2026-08-25'},
      {jp:'ビデ', romaji:'bide', en:'bidet (front wash)', tags:['appliances','untaught','encountered'], devices:['toilet'], source:{location:'Tokyu Stay Kyoto (hotel room, toilet/bidet panel)', date:'2026-08-25', file:'PXL_20260825_134218859.jpg'}, dateAdded:'2026-08-25'},
      {jp:'流す', romaji:'nagasu', en:'to flush', tags:['appliances','untaught','encountered'], devices:['toilet'], source:{location:'Tokyu Stay Kyoto (hotel room, toilet/bidet panel)', date:'2026-08-25', file:'PXL_20260825_134218859.jpg'}, dateAdded:'2026-08-25', kanjiReading: [{char:'流',reading:'naga'}]},
      {jp:'ターボ脱臭', romaji:'taabo dasshuu', en:'turbo deodorizing', tags:['appliances','untaught','encountered'], devices:['toilet'], source:{location:'Tokyu Stay Kyoto (hotel room, toilet/bidet panel)', date:'2026-08-25', file:'PXL_20260825_134218859.jpg'}, dateAdded:'2026-08-25', kanjiReadingBlocked: 'One of this word\'s kanji doesn\'t have a recorded reading yet'},
      {jp:'マッサージ', romaji:'massaaji', en:'massage (bidet mode)', tags:['appliances','untaught','encountered'], devices:['toilet'], source:{location:'Tokyu Stay Kyoto (hotel room, toilet/bidet panel)', date:'2026-08-25', file:'PXL_20260825_134218859.jpg'}, dateAdded:'2026-08-25'},
    ],
  },
  'vocab-materials-hotel-facilities': {
    level: 'untaught',
    hasReference: true,
    // standaloneCard: false (2026-08-31) - retired as its own tile now that
    // theme-accommodation-combined fully subsumes it: all 76 items here
    // carry `accommodation` or `food-drink` (73 accommodation, the other 3 -
    // いか焼き, うまいもん, ご当地 - a hotel-lobby local-food advert, homed
    // under food-drink instead), verified with zero gaps. This was flagged
    // as ready-but-not-done on 2026-08-31 (a stale comment on
    // theme-accommodation-combined had wrongly claimed it was already
    // retired); doing the actual retirement now closes that out. Data stays
    // exactly where it is, only the standalone tile goes away.
    standaloneCard: false,
    label: 'Materials — Hotel: Facilities & stay',
    chars: '朝食 混雑 提供…',
    items: [
      {jp:'朝食', romaji:'choushoku', en:'breakfast', tags:['accommodation','untaught','encountered'], source:{location:'JR Inn Sapporo (hotel)', date:'2026-08-09', file:'PXL_20260809_081340205.jpg'}, dateAdded:'2026-08-10', kanjiReading: [{char:'朝',reading:'chou'},{char:'食',reading:'shoku'}]},
      {jp:'混雑', romaji:'konzatsu', en:'congestion / crowding', tags:['accommodation','untaught','encountered'], source:{location:'JR Inn Sapporo (hotel)', date:'2026-08-09', file:'PXL_20260809_081340205.jpg'}, dateAdded:'2026-08-10', kanjiReading: [{char:'混',reading:'kon'},{char:'雑',reading:'zatsu'}]},
      {jp:'提供', romaji:'teikyou', en:'to provide / serve', tags:['accommodation','untaught','encountered'], source:{location:'JR Inn Sapporo (hotel)', date:'2026-08-09', file:'PXL_20260809_081340205.jpg'}, dateAdded:'2026-08-10', kanjiReading: [{char:'提',reading:'tei'},{char:'供',reading:'kyou'}]},
      {jp:'恐れ入りますが', romaji:'osoreirimasu ga', en:'I\'m terribly sorry, but... (polite opener)', tags:['accommodation','untaught','encountered'], source:{location:'JR Inn Sapporo (hotel)', date:'2026-08-09', file:'PXL_20260809_081340205.jpg'}, dateAdded:'2026-08-10', kanjiReadingBlocked: 'This word\'s structure is more complex than this tool currently handles'},
      {jp:'余裕', romaji:'yoyuu', en:'margin / leeway / spare time', tags:['accommodation','untaught','encountered'], source:{location:'JR Inn Sapporo (hotel)', date:'2026-08-09', file:'PXL_20260809_081340205.jpg'}, dateAdded:'2026-08-10', kanjiReading: [{char:'余',reading:'yo'},{char:'裕',reading:'yuu'}]},
      {jp:'ラストオーダー', romaji:'rasuto oodaa', en:'last order', tags:['accommodation','untaught','encountered'], source:{location:'JR Inn Sapporo (hotel)', date:'2026-08-09', file:'PXL_20260809_081340205.jpg'}, dateAdded:'2026-08-10'},
      {jp:'支配人', romaji:'shihainin', en:'manager', tags:['accommodation','untaught','encountered'], source:{location:'JR Inn Sapporo (hotel)', date:'2026-08-09', file:'PXL_20260809_081340205.jpg'}, dateAdded:'2026-08-10', kanjiReading: [{char:'支',reading:'shi'},{char:'配',reading:'hai'},{char:'人',reading:'nin'}]},
      {jp:'避難経路', romaji:'hinan keiro', en:'evacuation route', tags:['accommodation','emergency','untaught','encountered'], source:{location:'JR Inn Sapporo (hotel room)', date:'2026-08-10', file:'PXL_20260809_234219833.jpg'}, dateAdded:'2026-08-10', kanjiReading: [{char:'避',reading:'hi'},{char:'難',reading:'nan'},{char:'経',reading:'kei'},{char:'路',reading:'ro'}]},
      {jp:'消火器', romaji:'shoukaki', en:'fire extinguisher', tags:['accommodation','emergency','untaught','encountered'], source:{location:'JR Inn Sapporo (hotel room)', date:'2026-08-10', file:'PXL_20260809_234219833.jpg'}, dateAdded:'2026-08-10', kanjiReading: [{char:'消',reading:'shou'},{char:'火',reading:'ka'},{char:'器',reading:'ki'}]},
      {jp:'非常時', romaji:'hijouji', en:'emergency / time of emergency', tags:['accommodation','emergency','untaught','encountered'], source:{location:'JR Inn Sapporo (hotel room)', date:'2026-08-10', file:'PXL_20260809_234219833.jpg'}, dateAdded:'2026-08-10', kanjiReading: [{char:'非',reading:'hi'},{char:'常',reading:'jou'},{char:'時',reading:'ji'}]},
      {jp:'係', romaji:'kakari', en:'staff in charge / attendant', tags:['accommodation','untaught','encountered','service-ops'], source:{location:'JR Inn Sapporo (hotel room)', date:'2026-08-10', file:'PXL_20260809_234219833.jpg'}, dateAdded:'2026-08-10', kanjiReading: [{char:'係',reading:'kakari'}]},
      {jp:'指示', romaji:'shiji', en:'instructions', tags:['accommodation','untaught','encountered'], source:{location:'JR Inn Sapporo (hotel room)', date:'2026-08-10', file:'PXL_20260809_234219833.jpg'}, dateAdded:'2026-08-10', kanjiReading: [{char:'指',reading:'shi'},{char:'示',reading:'ji'}]},
      {jp:'扉', romaji:'tobira', en:'door (formal word)', tags:['accommodation','untaught','encountered'], seenAs:'扉に注意 - mind the door', source:{location:'JR Inn Sapporo (hotel room)', date:'2026-08-10', file:'PXL_20260809_234230785.jpg'}, dateAdded:'2026-08-10', kanjiReading: [{char:'扉',reading:'tobira'}]},
      {jp:'大声', romaji:'oogoe', en:'loud voice', tags:['accommodation','untaught','encountered'], source:{location:'JR Inn Sapporo (hotel room)', date:'2026-08-10', file:'PXL_20260809_234230785.jpg'}, dateAdded:'2026-08-10', kanjiReading: [{char:'大',reading:'oo'}, {char:'声',reading:'goe'}]},
      {jp:'会話', romaji:'kaiwa', en:'conversation', tags:['accommodation','untaught','encountered'], source:{location:'JR Inn Sapporo (hotel room)', date:'2026-08-10', file:'PXL_20260809_234230785.jpg'}, dateAdded:'2026-08-10', kanjiReading: [{char:'会',reading:'kai'},{char:'話',reading:'wa'}]},
      {jp:'迷惑', romaji:'meiwaku', en:'trouble / inconvenience', tags:['accommodation','untaught','encountered'], seenAs:'扉を開けたまま大声で会話をされますと、まわりのお客様のご迷惑になりますのでご遠慮ください。- talking loudly with the door open may inconvenience other guests (hotel notice)', source:{location:'JR Inn Sapporo (hotel room)', date:'2026-08-10', file:'PXL_20260809_234230785.jpg'}, dateAdded:'2026-08-10', kanjiReading: [{char:'迷',reading:'mei'},{char:'惑',reading:'waku'}]},
      {jp:'ご遠慮ください', romaji:'goenryo kudasai', en:'please refrain from', tags:['accommodation','untaught','encountered'], source:{location:'JR Inn Sapporo (hotel room)', date:'2026-08-10', file:'PXL_20260809_234230785.jpg'}, dateAdded:'2026-08-10', kanjiReadingBlocked: 'One of this word\'s kanji doesn\'t have a recorded reading yet'},
      {jp:'補充', romaji:'hojuu', en:'replenishment / restocking', tags:['accommodation','untaught','encountered'], source:{location:'JR Inn Sapporo (hotel room)', date:'2026-08-10', file:'PXL_20260809_234235475.jpg'}, dateAdded:'2026-08-10', kanjiReading: [{char:'補',reading:'ho'},{char:'充',reading:'juu'}]},
      {jp:'清掃', romaji:'seisou', en:'cleaning (housekeeping)', tags:['accommodation','untaught','encountered'], source:{location:'JR Inn Sapporo (hotel room)', date:'2026-08-10', file:'PXL_20260809_234235475.jpg'}, dateAdded:'2026-08-10', kanjiReading: [{char:'清',reading:'sei'},{char:'掃',reading:'sou'}]},
      {jp:'不要', romaji:'fuyou', en:'not needed / unnecessary', tags:['accommodation','untaught','encountered'], source:{location:'JR Inn Sapporo (hotel room)', date:'2026-08-10', file:'PXL_20260809_234235475.jpg'}, dateAdded:'2026-08-10', kanjiReading: [{char:'不',reading:'fu'},{char:'要',reading:'you'}]},
      {jp:'入室', romaji:'nyuushitsu', en:'entering a room', tags:['accommodation','untaught','encountered'], source:{location:'JR Inn Sapporo (hotel room)', date:'2026-08-10', file:'PXL_20260809_234235475.jpg'}, dateAdded:'2026-08-10', kanjiReading: [{char:'入',reading:'nyuu'},{char:'室',reading:'shitsu'}]},
      {jp:'ゴミ箱', romaji:'gomibako', en:'trash can', tags:['accommodation','untaught','encountered'], source:{location:'JR Inn Sapporo (hotel room)', date:'2026-08-10', file:'PXL_20260809_234235475.jpg'}, dateAdded:'2026-08-10', kanjiReading: [{char:'箱',reading:'bako'}]},
      {jp:'縛って', romaji:'shibatte', en:'tie up (and...)', tags:['accommodation','untaught','encountered'], source:{location:'JR Inn Sapporo (hotel room)', date:'2026-08-10', file:'PXL_20260809_234235475.jpg'}, dateAdded:'2026-08-10', kanjiReading: [{char:'縛',reading:'shiba'}]},
      {jp:'廊下', romaji:'rouka', en:'hallway / corridor', tags:['accommodation','untaught','encountered'], source:{location:'JR Inn Sapporo (hotel room)', date:'2026-08-10', file:'PXL_20260809_234235475.jpg'}, dateAdded:'2026-08-10', kanjiReadingBlocked: 'Irregular reading - doesn\'t break into standard sounds, worth memorising as a whole word'},
      {jp:'人数分', romaji:'ninzuubun', en:'portion for the number of people', tags:['accommodation','untaught','encountered'], source:{location:'JR Inn Sapporo (hotel room)', date:'2026-08-10', file:'PXL_20260809_234235475.jpg'}, dateAdded:'2026-08-10', kanjiReadingBlocked: 'Irregular reading - doesn\'t break into standard sounds, worth memorising as a whole word'},
      {jp:'清掃不要', romaji:'seisou fuyou', en:'cleaning not needed (door sign)', tags:['accommodation','untaught','encountered'], source:{location:'JR Inn Sapporo (hotel room)', date:'2026-08-10', file:'PXL_20260809_234239066.jpg'}, dateAdded:'2026-08-10', kanjiReading: [{char:'清',reading:'sei'},{char:'掃',reading:'sou'},{char:'不',reading:'fu'},{char:'要',reading:'you'}]},
      {jp:'消毒', romaji:'shoudoku', en:'disinfection / sterilization', tags:['accommodation','untaught','encountered'], source:{location:'JR Inn Sapporo (hotel)', date:'2026-08-10', file:'PXL_20260810_002426356.jpg'}, dateAdded:'2026-08-10', kanjiReading: [{char:'消',reading:'shou'},{char:'毒',reading:'doku'}]},
      {jp:'客室', romaji:'kyakushitsu', en:'guest room', tags:['accommodation','untaught','encountered'], source:{location:'JR Inn Sapporo (hotel)', date:'2026-08-10', file:'PXL_20260810_002521850.jpg'}, dateAdded:'2026-08-10', kanjiReading: [{char:'客',reading:'kyaku'},{char:'室',reading:'shitsu'}]},
      {jp:'大浴場', romaji:'daiyokujou', en:'large communal bath', tags:['accommodation','untaught','encountered'], source:{location:'JR Inn Sapporo (hotel)', date:'2026-08-10', file:'PXL_20260810_002521850.jpg'}, dateAdded:'2026-08-10', kanjiReading: [{char:'大',reading:'dai'},{char:'浴',reading:'yoku'},{char:'場',reading:'jou'}]},
      // 枕 from this photo removed - same word as the existing まくら (Trip),
      // now folded in there as its altForm instead.
      {jp:'自動販売機', romaji:'jidou hanbaiki', en:'vending machine', tags:['accommodation','untaught','encountered'], source:{location:'JR Inn Sapporo (hotel)', date:'2026-08-10', file:'PXL_20260810_002521850.jpg'}, dateAdded:'2026-08-10', kanjiReading: [{char:'自',reading:'ji'},{char:'動',reading:'dou'},{char:'販',reading:'han'},{char:'売',reading:'bai'},{char:'機',reading:'ki'}]},
      {jp:'コインランドリー', romaji:'koin randorii', en:'coin laundry / laundromat', tags:['accommodation','taught','encountered','L3','loanwords-l3','l3-5'], source:{location:'JR Inn Sapporo (hotel)', date:'2026-08-10', file:'PXL_20260810_002521850.jpg'}, dateAdded:'2026-08-10'},
      {jp:'製氷機', romaji:'seihyouki', en:'ice machine', tags:['accommodation','untaught','encountered'], source:{location:'JR Inn Sapporo (hotel)', date:'2026-08-10', file:'PXL_20260810_002521850.jpg'}, dateAdded:'2026-08-10', kanjiReading: [{char:'製',reading:'sei'},{char:'氷',reading:'hyou'},{char:'機',reading:'ki'}]},
      {jp:'電子レンジ', romaji:'denshi renji', en:'microwave', tags:['accommodation','untaught','encountered'], source:{location:'JR Inn Sapporo (hotel)', date:'2026-08-10', file:'PXL_20260810_002521850.jpg'}, dateAdded:'2026-08-10', kanjiReading: [{char:'電',reading:'den'},{char:'子',reading:'shi'}]},
      {jp:'フロント', romaji:'furonto', en:'front desk (reception)', tags:['accommodation','untaught','encountered'], source:{location:'JR Inn Sapporo (hotel)', date:'2026-08-10', file:'PXL_20260810_002521850.jpg'}, dateAdded:'2026-08-10'},
      {jp:'喫煙室', romaji:'kitsuenshitsu', en:'smoking room', tags:['accommodation','untaught','encountered'], source:{location:'JR Inn Sapporo (hotel)', date:'2026-08-10', file:'PXL_20260810_002521850.jpg'}, dateAdded:'2026-08-10', kanjiReading: [{char:'喫',reading:'kitsu'},{char:'煙',reading:'en'},{char:'室',reading:'shitsu'}]},
      {jp:'入浴', romaji:'nyuuyoku', en:'bathing', tags:['accommodation','untaught','encountered'], source:{location:'JR Inn Sapporo (hotel)', date:'2026-08-11', file:'PXL_20260811_085004055.jpg'}, dateAdded:'2026-08-11', kanjiReading: [{char:'入',reading:'nyuu'},{char:'浴',reading:'yoku'}]},
      {jp:'いただけます', romaji:'itadakemasu', en:'you may (do something) - polite potential', tags:['accommodation','untaught','encountered'], seenAs:'ご入浴いただけます。- you may enter for bathing at this time', source:{location:'JR Inn Sapporo (hotel)', date:'2026-08-11', file:'PXL_20260811_085004055.jpg'}, dateAdded:'2026-08-11'},
      {jp:'やわらかめ', romaji:'yawarakame', en:'soft-ish (pillow)', tags:['accommodation','untaught','encountered'], source:{location:'JR Inn Sapporo (pillow corner)', date:'2026-08-11', file:'PXL_20260811_103351617.jpg'}, dateAdded:'2026-08-11'},
      {jp:'ふつう', romaji:'futsuu', en:'normal / medium (pillow)', tags:['accommodation','untaught','encountered'], source:{location:'JR Inn Sapporo (pillow corner)', date:'2026-08-11', file:'PXL_20260811_103351617.jpg'}, dateAdded:'2026-08-11'},
      {jp:'かため', romaji:'katame', en:'firm-ish (pillow)', tags:['accommodation','untaught','encountered'], source:{location:'JR Inn Sapporo (pillow corner)', date:'2026-08-11', file:'PXL_20260811_103351617.jpg'}, dateAdded:'2026-08-11'},
      {jp:'通気性', romaji:'tsuukisei', en:'breathability', tags:['accommodation','untaught','encountered'], source:{location:'JR Inn Sapporo (pillow corner)', date:'2026-08-11', file:'PXL_20260811_103351617.jpg'}, dateAdded:'2026-08-11', kanjiReading: [{char:'通',reading:'tsuu'},{char:'気',reading:'ki'},{char:'性',reading:'sei'}]},
      {jp:'復元性', romaji:'fukugensei', en:'resilience / recovery (of material)', tags:['accommodation','untaught','encountered'], source:{location:'JR Inn Sapporo (pillow corner)', date:'2026-08-11', file:'PXL_20260811_103351617.jpg'}, dateAdded:'2026-08-11', kanjiReading: [{char:'復',reading:'fuku'},{char:'元',reading:'gen'},{char:'性',reading:'sei'}]},
      {jp:'感触', romaji:'kanshoku', en:'texture / feel', tags:['accommodation','untaught','encountered'], source:{location:'JR Inn Sapporo (pillow corner)', date:'2026-08-11', file:'PXL_20260811_103351617.jpg'}, dateAdded:'2026-08-11', kanjiReading: [{char:'感',reading:'kan'},{char:'触',reading:'shoku'}]},
      {jp:'もっちり', romaji:'mocchiri', en:'chewy / springy (pillow texture)', tags:['accommodation','untaught','encountered'], source:{location:'JR Inn Sapporo (pillow corner)', date:'2026-08-11', file:'PXL_20260811_103351617.jpg'}, dateAdded:'2026-08-11'},
      {jp:'ふわふわ', romaji:'fuwafuwa', en:'fluffy (pillow)', tags:['accommodation','untaught','encountered'], source:{location:'JR Inn Sapporo (pillow corner)', date:'2026-08-11', file:'PXL_20260811_103351617.jpg'}, dateAdded:'2026-08-11'},
      {jp:'ザクザク', romaji:'zakuzaku', en:'crunchy / crisp (pillow texture)', tags:['accommodation','untaught','encountered'], source:{location:'JR Inn Sapporo (pillow corner)', date:'2026-08-11', file:'PXL_20260811_103351617.jpg'}, dateAdded:'2026-08-11'},
      {jp:'そばがら', romaji:'sobagara', en:'buckwheat husk (pillow filling)', tags:['accommodation','untaught','encountered'], source:{location:'JR Inn Sapporo (pillow corner)', date:'2026-08-11', file:'PXL_20260811_103351617.jpg'}, dateAdded:'2026-08-11'},
      {jp:'枕カバー', romaji:'makura kabaa', en:'pillow case', tags:['accommodation','untaught','encountered'], source:{location:'JR Inn Sapporo (pillow corner)', date:'2026-08-11', file:'PXL_20260811_103351617.jpg'}, dateAdded:'2026-08-11', kanjiReadingBlocked: 'One of this word\'s kanji doesn\'t have a recorded reading yet'},
      {jp:'次', romaji:'tsugi', en:'next', tags:['accommodation','untaught','encountered'], source:{location:'JR Inn Sapporo (hotel)', date:'2026-08-11', file:'PXL_20260811_103547311.jpg'}, dateAdded:'2026-08-11', kanjiReading: [{char:'次',reading:'tsugi'}]},
      {jp:'希望', romaji:'kibou', en:'wish / request', tags:['accommodation','untaught','encountered'], source:{location:'JR Inn Sapporo (hotel)', date:'2026-08-11', file:'PXL_20260811_103547311.jpg'}, dateAdded:'2026-08-11', kanjiReading: [{char:'希',reading:'ki'},{char:'望',reading:'bou'}]},
      {jp:'預かる', romaji:'azukaru', en:'to keep / hold (something) for someone', tags:['accommodation','untaught','encountered'], source:{location:'JR Inn Sapporo (hotel)', date:'2026-08-11', file:'PXL_20260811_103547311.jpg'}, dateAdded:'2026-08-11', kanjiReading: [{char:'預',reading:'azu'}]},
      {jp:'ご了承ください', romaji:'goryoushou kudasai', en:'please understand / accept', tags:['accommodation','untaught','encountered'], seenAs:'次のお客様がご利用を希望される場合、洗濯物をフロントでお預かりすることがあります。ご了承ください。- if the next guest wishes to use the facility we may need to store your laundry at the front desk', source:{location:'JR Inn Sapporo (hotel)', date:'2026-08-11', file:'PXL_20260811_103547311.jpg'}, dateAdded:'2026-08-11', kanjiReadingBlocked: 'One of this word\'s kanji doesn\'t have a recorded reading yet'},
      {jp:'2泊以上', romaji:'nihaku ijou', en:'2 nights or more', tags:['accommodation','untaught','encountered'], source:{location:'JR Inn Sapporo (hotel)', date:'2026-08-13', file:'PXL_20260813_051947873.jpg'}, dateAdded:'2026-08-14', kanjiReadingBlocked: 'Contains a placeholder or symbol with no fixed reading of its own'},
      {jp:'エコ清掃', romaji:'eko seisou', en:'eco cleaning', tags:['accommodation','untaught','encountered'], source:{location:'JR Inn Sapporo (hotel)', date:'2026-08-13', file:'PXL_20260813_051947873.jpg'}, dateAdded:'2026-08-14', kanjiReading: [{char:'清',reading:'sei'},{char:'掃',reading:'sou'}]},
      {jp:'いか焼き', romaji:'ikayaki', en:'grilled squid', tags:['food-drink','untaught','encountered','food-type'], source:{location:'Super Hotel Premier Osaka Honmachi (lobby)', date:'2026-08-14', file:'PXL_20260814_055446487.jpg'}, dateAdded:'2026-08-15', kanjiReadingBlocked: 'Irregular reading - doesn\'t break into standard sounds, worth memorising as a whole word'},
      {jp:'うまいもん', romaji:'umaimon', en:'delicious food (Osaka dialect)', tags:['food-drink','untaught','encountered','food-adjective'], source:{location:'Super Hotel Premier Osaka Honmachi (lobby)', date:'2026-08-14', file:'PXL_20260814_055446487.jpg'}, dateAdded:'2026-08-15'},
      {jp:'ご当地', romaji:'gotouchi', en:'local / regional (specialty)', tags:['food-drink','untaught','encountered','food-adjective'], source:{location:'Super Hotel Premier Osaka Honmachi (lobby)', date:'2026-08-14', file:'PXL_20260814_055446487.jpg'}, dateAdded:'2026-08-15', kanjiReading: [{char:'当',reading:'tou'},{char:'地',reading:'chi'}]},
      {jp:'暗証番号', romaji:'anshou bangou', en:'PIN / passcode', tags:['accommodation','untaught','encountered'], source:{location:'Super Hotel Premier Osaka Honmachi (room 922 key receipt)', date:'2026-08-14', file:'PXL_20260814_060412583.jpg'}, dateAdded:'2026-08-15', kanjiReading: [{char:'暗',reading:'an'},{char:'証',reading:'shou'},{char:'番',reading:'ban'},{char:'号',reading:'gou'}]},
      {jp:'ご利用期間', romaji:'goriyou kikan', en:'period of use', tags:['accommodation','untaught','encountered'], source:{location:'Super Hotel Premier Osaka Honmachi (room 922 key receipt)', date:'2026-08-14', file:'PXL_20260814_060412583.jpg'}, dateAdded:'2026-08-15', kanjiReadingBlocked: 'One of this word\'s kanji doesn\'t have a recorded reading yet'},
      {jp:'入館', romaji:'nyuukan', en:'entering the building', tags:['accommodation','untaught','encountered'], source:{location:'Super Hotel Premier Osaka Honmachi (room 922 key receipt)', date:'2026-08-14', file:'PXL_20260814_060412583.jpg'}, dateAdded:'2026-08-15', kanjiReading: [{char:'入',reading:'nyuu'},{char:'館',reading:'kan'}]},
      {jp:'くつろぎ', romaji:'kutsurogi', en:'relaxation', tags:['accommodation','untaught','encountered'], seenAs:'ごゆっくりおくつろぎ下さい - please take your time and relax', source:{location:'Super Hotel Premier Osaka Honmachi (room 922 key receipt)', date:'2026-08-14', file:'PXL_20260814_060412583.jpg'}, dateAdded:'2026-08-15'},
      {jp:'珪藻土', romaji:'keisoudo', en:'diatomaceous earth (ceiling material)', tags:['accommodation','untaught','encountered'], source:{location:'Super Hotel Premier Osaka Honmachi (room ceiling plaque)', date:'2026-08-14', file:'PXL_20260814_060827721.jpg'}, dateAdded:'2026-08-15', kanjiReading: [{char:'珪',reading:'kei'},{char:'藻',reading:'sou'},{char:'土',reading:'do'}]},
      {jp:'湿度', romaji:'shitsudo', en:'humidity', tags:['accommodation','untaught','encountered'], source:{location:'Super Hotel Premier Osaka Honmachi (room ceiling plaque)', date:'2026-08-14', file:'PXL_20260814_060827721.jpg'}, dateAdded:'2026-08-15', kanjiReading: [{char:'湿',reading:'shitsu'},{char:'度',reading:'do'}]},
      {jp:'調整', romaji:'chousei', en:'adjustment', tags:['accommodation','untaught','encountered'], source:{location:'Super Hotel Premier Osaka Honmachi (room ceiling plaque)', date:'2026-08-14', file:'PXL_20260814_060827721.jpg'}, dateAdded:'2026-08-15', kanjiReading: [{char:'調',reading:'chou'}, {char:'整',reading:'sei'}]},
      {jp:'断熱性', romaji:'dannetsusei', en:'thermal insulation', tags:['accommodation','untaught','encountered'], source:{location:'Super Hotel Premier Osaka Honmachi (room ceiling plaque)', date:'2026-08-14', file:'PXL_20260814_060827721.jpg'}, dateAdded:'2026-08-15', kanjiReading: [{char:'断',reading:'dan'},{char:'熱',reading:'netsu'},{char:'性',reading:'sei'}]},
      {jp:'健康的', romaji:'kenkouteki', en:'healthy', tags:['accommodation','untaught','encountered'], source:{location:'Super Hotel Premier Osaka Honmachi (room ceiling plaque)', date:'2026-08-14', file:'PXL_20260814_060827721.jpg'}, dateAdded:'2026-08-15', kanjiReading: [{char:'健',reading:'ken'},{char:'康',reading:'kou'},{char:'的',reading:'teki'}]},
      {jp:'化石', romaji:'kaseki', en:'fossil', tags:['accommodation','untaught','encountered'], source:{location:'Super Hotel Premier Osaka Honmachi (room ceiling plaque)', date:'2026-08-14', file:'PXL_20260814_060827721.jpg'}, dateAdded:'2026-08-15', kanjiReading: [{char:'化',reading:'ka'},{char:'石',reading:'seki'}]},
      {jp:'滞在', romaji:'taizai', en:'stay / reside', tags:['accommodation','untaught','encountered'], seenAs:'11時〜15時はお部屋に滞在できません。- you are not allowed to stay in the room between 11:00 and 15:00', source:{location:'Super Hotel Premier Osaka Honmachi (room door card)', date:'2026-08-14', file:'PXL_20260814_061017398.jpg'}, dateAdded:'2026-08-15', kanjiReading: [{char:'滞',reading:'tai'},{char:'在',reading:'zai'}]},
      {jp:'連泊', romaji:'renpaku', en:'consecutive nights\' stay (hotel)', tags:['accommodation','untaught','encountered'], source:{location:'Super Hotel Premier Osaka Honmachi (room door card, continues in PXL_20260814_061037505.jpg)', date:'2026-08-14', file:'PXL_20260814_061034969.jpg'}, dateAdded:'2026-08-15', kanjiReadingBlocked: 'Irregular reading - doesn\'t break into standard sounds, worth memorising as a whole word'},
      {jp:'マグネット', romaji:'magunetto', en:'magnet', tags:['accommodation','untaught','encountered'], source:{location:'Super Hotel Premier Osaka Honmachi (room door card, continues in PXL_20260814_061037505.jpg)', date:'2026-08-14', file:'PXL_20260814_061034969.jpg'}, dateAdded:'2026-08-15'},
      {jp:'ご希望', romaji:'gokibou', en:'your wish / request (polite)', tags:['accommodation','untaught','encountered'], seenAs:'清掃ご希望の場合、こちらのマグネットを11時までにドアの外へ貼ってください。- if you\'d like cleaning, please put this magnet outside the door by 11:00', source:{location:'Super Hotel Premier Osaka Honmachi (room door card, continues in PXL_20260814_061037505.jpg)', date:'2026-08-14', file:'PXL_20260814_061034969.jpg'}, dateAdded:'2026-08-15', kanjiReading: [{char:'希',reading:'ki'},{char:'望',reading:'bou'}]},
      {jp:'行いません', romaji:'okonaimasen', en:'will not carry out / perform (polite negative)', tags:['accommodation','untaught','encountered'], seenAs:'ドアの外にマグネットが貼られていない場合、清掃を行いません。- if the magnet is not on the door, we will not clean', source:{location:'Super Hotel Premier Osaka Honmachi (room door card, continues in PXL_20260814_061037505.jpg)', date:'2026-08-14', file:'PXL_20260814_061034969.jpg'}, dateAdded:'2026-08-15', kanjiReading: [{char:'行',reading:'okona'}]},
      {jp:'お荷物', romaji:'onimotsu', en:'luggage / baggage (polite)', tags:['accommodation','untaught','encountered'], source:{location:'Tokyu Stay Kyoto (hotel)', date:'2026-08-20', file:'PXL_20260820_071712736.jpg'}, dateAdded:'2026-08-21', kanjiReadingBlocked: 'One of this word\'s kanji doesn\'t have a recorded reading yet'},
      {jp:'預かり', romaji:'azukari', en:'keeping / holding (something for someone)', tags:['accommodation','untaught','encountered'], source:{location:'Tokyu Stay Kyoto (hotel)', date:'2026-08-20', file:'PXL_20260820_071712736.jpg'}, dateAdded:'2026-08-21', kanjiReading: [{char:'預',reading:'azu'}]},
      {jp:'届いて', romaji:'todoite', en:'has arrived', tags:['accommodation','untaught','encountered'], seenAs:'下記のものが届いておりますので、フロントまでお越しください。- the following has arrived, so please come to the front desk', source:{location:'Tokyu Stay Kyoto (hotel)', date:'2026-08-20', file:'PXL_20260820_071712736.jpg'}, dateAdded:'2026-08-21', kanjiReading: [{char:'届',reading:'todo'}]},
      {jp:'貴重品', romaji:'kichouhin', en:'valuables', tags:['accommodation','untaught','encountered'], source:{location:'Tokyu Stay Kyoto (hotel)', date:'2026-08-20', file:'PXL_20260820_071712736.jpg'}, dateAdded:'2026-08-21', kanjiReadingBlocked: 'Irregular reading - doesn\'t break into standard sounds, worth memorising as a whole word'},
    ],
  },
  'vocab-materials-street': {
    level: 'untaught',
    hasReference: true,
    // tagQuery (2026-08-31) - FLIP PILOT style, same reasoning as Hotel:
    // Appliances/Airport above. All 21 items already carried `street`
    // wholesale. The old includeItems reference to よやく (vocab-
    // accommodation, "reservation") is NOT replicated here - a first pass
    // tagged よやく `street` directly to preserve it, but that was the
    // wrong fix: よやく already carries `accommodation` natively (it lives
    // in vocab-accommodation) and Accommodation is a genuinely better home
    // for it than Street ever was, so the `street` tag was dropped again
    // the same day rather than kept as a compromise. Nothing lost - よやく
    // is still drillable, just from Accommodation only, which is where it
    // belongs.
    tagQuery: { all: ['street'], none: ['tourist'] },  // tourist words live under the Tourist pill (2026-10-15)
    label: 'Street & neighbourhood',
    chars: '詩人 漂泊 想い出…',
    // Doesn't fit stations/shops/restaurants/entertainment/airport/hotel -
    // this is for signage and notices you run into incidentally while just
    // wandering a town on foot (historical plaques, shopfronts, community
    // noticeboards), as opposed to the other buckets which are all places
    // you go on purpose. Started at 22 words (batch 4), already bigger than
    // Hotel's pre-batch-4 size (7 words), so no need to pad it out from
    // other categories.
    items: [
      {jp:'詩人', romaji:'shijin', en:'poet', tags:['street','untaught','encountered'], source:{location:'Otaru Station', date:'2026-08-10', file:'PXL_20260810_024845118.jpg'}, dateAdded:'2026-08-10', kanjiReading: [{char:'詩',reading:'shi'},{char:'人',reading:'jin'}]},
      {jp:'漂泊', romaji:'hyouhaku', en:'wandering / drifting (life)', tags:['street','untaught','encountered'], source:{location:'Otaru Station', date:'2026-08-10', file:'PXL_20260810_024845118.jpg'}, dateAdded:'2026-08-10', kanjiReading: [{char:'漂',reading:'hyou'},{char:'泊',reading:'haku'}]},
      {jp:'想い出', romaji:'omoide', en:'memories', tags:['street','untaught','encountered'], altForm:'思い出 (more common kanji form)', source:{location:'Otaru Station', date:'2026-08-10', file:'PXL_20260810_024845118.jpg'}, dateAdded:'2026-08-10', kanjiReading: [{char:'想',reading:'omo'},{char:'出',reading:'de'}]},
      {jp:'駅長', romaji:'ekichou', en:'station master', tags:['street','untaught','encountered'], source:{location:'Otaru Station', date:'2026-08-10', file:'PXL_20260810_024845118.jpg'}, dateAdded:'2026-08-10', kanjiReading: [{char:'駅',reading:'eki'},{char:'長',reading:'chou'}]},
      {jp:'歯科', romaji:'shika', en:'dentistry / dental clinic', tags:['street','untaught','encountered'], source:{location:'Otaru', date:'2026-08-10', file:'PXL_20260810_025430730.jpg'}, dateAdded:'2026-08-10', kanjiReading: [{char:'歯',reading:'shi'},{char:'科',reading:'ka'}]},
      // 予約 moved to vocab-accommodation (Trip-canonical copy; its seenAs
      // washing-machine note was copied across) - stored (and drillable)
      // there instead.
      {jp:'受付', romaji:'uketsuke', en:'reception / accepting', tags:['street','untaught','encountered'], source:{location:'Otaru', date:'2026-08-10', file:'PXL_20260810_025430730.jpg'}, dateAdded:'2026-08-10', kanjiReading: [{char:'受',reading:'uke'},{char:'付',reading:'tsuke'}]},
      {jp:'小児', romaji:'shouni', en:'pediatric / small child', tags:['street','untaught','encountered'], source:{location:'Otaru', date:'2026-08-10', file:'PXL_20260810_025430730.jpg'}, dateAdded:'2026-08-10', kanjiReading: [{char:'小',reading:'shou'},{char:'児',reading:'ni'}]},
      {jp:'矯正', romaji:'kyousei', en:'orthodontics / correction', tags:['street','untaught','encountered'], source:{location:'Otaru', date:'2026-08-10', file:'PXL_20260810_025430730.jpg'}, dateAdded:'2026-08-10', kanjiReading: [{char:'矯',reading:'kyou'},{char:'正',reading:'sei'}]},
      {jp:'口腔外科', romaji:'koukou geka', en:'oral surgery', tags:['street','untaught','encountered'], source:{location:'Otaru', date:'2026-08-10', file:'PXL_20260810_025430730.jpg'}, dateAdded:'2026-08-10', kanjiReading: [{char:'口',reading:'kou'}, {char:'腔',reading:'kou'}, {char:'外',reading:'ge'}, {char:'科',reading:'ka'}]},
      {jp:'町会', romaji:'choukai', en:'neighborhood association / town council', tags:['street','untaught','encountered'], source:{location:'Otaru (Shinonome-cho)', date:'2026-08-10', file:'PXL_20260810_043347680.jpg'}, dateAdded:'2026-08-10', kanjiReading: [{char:'町',reading:'chou'},{char:'会',reading:'kai'}]},
      {jp:'掲示板', romaji:'keijiban', en:'bulletin board / notice board', tags:['street','untaught','encountered','service-ops'], source:{location:'Otaru (Shinonome-cho)', date:'2026-08-10', file:'PXL_20260810_043347680.jpg'}, dateAdded:'2026-08-10', kanjiReading: [{char:'掲',reading:'kei'},{char:'示',reading:'ji'},{char:'板',reading:'ban'}]},
      {jp:'夏休み', romaji:'natsuyasumi', en:'summer vacation', tags:['street','untaught','encountered'], source:{location:'Otaru (Shinonome-cho)', date:'2026-08-10', file:'PXL_20260810_043347680.jpg'}, dateAdded:'2026-08-10', kanjiReading: [{char:'夏',reading:'natsu'},{char:'休',reading:'yasu'}]},
      {jp:'ラジオ体操', romaji:'rajio taisou', en:'radio calisthenics', tags:['street','untaught','encountered'], source:{location:'Otaru (Shinonome-cho)', date:'2026-08-10', file:'PXL_20260810_043347680.jpg'}, dateAdded:'2026-08-10', kanjiReading: [{char:'体',reading:'tai'},{char:'操',reading:'sou'}]},
      {jp:'始まります', romaji:'hajimarimasu', en:'will begin', tags:['street','untaught','encountered'], source:{location:'Otaru (Shinonome-cho)', date:'2026-08-10', file:'PXL_20260810_043347680.jpg'}, dateAdded:'2026-08-10', kanjiReading: [{char:'始',reading:'haji'}]},
      {jp:'正面玄関', romaji:'shoumen genkan', en:'main entrance', tags:['street','untaught','encountered'], source:{location:'Otaru (Shinonome-cho)', date:'2026-08-10', file:'PXL_20260810_043347680.jpg'}, dateAdded:'2026-08-10', kanjiReading: [{char:'正',reading:'shou'},{char:'面',reading:'men'},{char:'玄',reading:'gen'},{char:'関',reading:'kan'}]},
      {jp:'集合', romaji:'shuugou', en:'gathering / assembly (meeting point)', tags:['street','untaught','encountered'], source:{location:'Otaru (Shinonome-cho)', date:'2026-08-10', file:'PXL_20260810_043347680.jpg'}, dateAdded:'2026-08-10', kanjiReading: [{char:'集',reading:'shuu'},{char:'合',reading:'gou'}]},
      {jp:'燃やすごみ', romaji:'moyasu gomi', en:'burnable trash', tags:['street','untaught','encountered'], source:{location:'Otaru (Shinonome-cho)', date:'2026-08-10', file:'PXL_20260810_043351907.jpg'}, dateAdded:'2026-08-10', kanjiReadingBlocked: 'This word\'s structure is more complex than this tool currently handles'},
      {jp:'燃やさないごみ', romaji:'moyasanai gomi', en:'non-burnable trash', tags:['street','untaught','encountered'], altForm:'不燃ゴミ (more common fixed term)', source:{location:'Otaru (Shinonome-cho)', date:'2026-08-10', file:'PXL_20260810_043351907.jpg'}, dateAdded:'2026-08-10', kanjiReadingBlocked: 'This word\'s structure is more complex than this tool currently handles'},
      {jp:'透明', romaji:'toumei', en:'transparent / clear', tags:['street','untaught','encountered'], source:{location:'Otaru (Shinonome-cho)', date:'2026-08-10', file:'PXL_20260810_043351907.jpg'}, dateAdded:'2026-08-10', kanjiReading: [{char:'透',reading:'tou'},{char:'明',reading:'mei'}]},
      {jp:'半透明', romaji:'hantoumei', en:'semi-transparent / translucent', tags:['street','untaught','encountered'], source:{location:'Otaru (Shinonome-cho)', date:'2026-08-10', file:'PXL_20260810_043351907.jpg'}, dateAdded:'2026-08-10', kanjiReading: [{char:'半',reading:'han'},{char:'透',reading:'tou'},{char:'明',reading:'mei'}]},
      {jp:'排出', romaji:'haishutsu', en:'disposal / discharge (of waste)', tags:['street','untaught','encountered','service-ops'], source:{location:'Otaru (Shinonome-cho)', date:'2026-08-10', file:'PXL_20260810_043351907.jpg'}, dateAdded:'2026-08-10', kanjiReading: [{char:'排',reading:'hai'},{char:'出',reading:'shutsu'}]},
    ],
  },
  // First real content pulled from an outside reference source rather than
  // the trip itself or a class lesson (an Instagram graphic, not a photo of
  // real signage) - and the first proving ground for the `tags` mechanism
  // (see getThemePool's tagQuery branch and the "Question words" Collection
  // below). Browsable on its own here like any other Andrew-tier category,
  // same words also surface pooled together with the matching L2 lesson
  // words via that Collection - no duplication, single shared score either
  // way. Kanji-primary words from the source graphic were converted to
  // kana-primary + kanji altForm to match the rest of the question-word set
  // (see the L2 duplicates above) rather than standing out as the only
  // kanji-heavy entries in the pool - kanji isn't taught yet, so nothing
  // here should read differently than an ordinary L2 word until it is.
  // A handful of words from the same graphic (大丈夫, 本当, まだ, どう思う,
  // どうしよう, できる, 知ってる, わかった) were deliberately left out - real
  // words, but reaction/set phrases rather than question words themselves,
  // and not part of this tag.
  'vocab-reference-question-words': {
    level: 'untaught',
    hasReference: true,
    // standaloneCard: false (2026-08-31) - retired as its own tile, but
    // unlike every other retirement today, NOT because a new Andrew-mode
    // card was built to replace it. Collections' "Question words" card
    // (theme-question-words, tagQuery:'question-word') has pulled every
    // one of these 13 items in since 2026-08-27, alongside the 4 already-
    // taught L2 duplicates - so an Andrew-only tile showing the exact same
    // 13 words was pure duplication of something Collections already did,
    // not a case of Trip/Andrew content needing a new home. This is the
    // case Andrew was describing: wherever a set overlaps with taught
    // vocab, the Collections/Andrew overlap is expected, and the fix is to
    // point at the one that already exists rather than duplicate it.
    standaloneCard: false,
    label: 'Reference — Question words',
    chars: 'なに どこ いつ…',
    items: [
      {jp:'なに', romaji:'nani', en:'what', altForm:'何', altIsStandard:true, tags:['question-word','untaught','encountered'], source:{location:'Instagram (@tokyowords.jp)', date:'2026-08-20', file:'Screenshot_20260820-122400.jpg'}, dateAdded:'2026-08-22'},
      {jp:'どうして', romaji:'doushite', en:'why', tags:['question-word','untaught','encountered'], source:{location:'Instagram (@tokyowords.jp)', date:'2026-08-20', file:'Screenshot_20260820-122400.jpg'}, dateAdded:'2026-08-22'},
      {jp:'なんじ', romaji:'nanji', en:'what time', altForm:'何時', altIsStandard:true, tags:['question-word','untaught','encountered'], source:{location:'Instagram (@tokyowords.jp)', date:'2026-08-20', file:'Screenshot_20260820-122400.jpg'}, dateAdded:'2026-08-22'},
      {jp:'なぜ', romaji:'naze', en:'why (more formal)', tags:['question-word','untaught','encountered'], source:{location:'Instagram (@tokyowords.jp)', date:'2026-08-20', file:'Screenshot_20260820-122400.jpg'}, dateAdded:'2026-08-22'},
      {jp:'どう', romaji:'dou', en:'how', tags:['question-word','taught','encountered','L4','general-l4','l4-1'], source:{location:'Instagram (@tokyowords.jp)', date:'2026-08-20', file:'Screenshot_20260820-122400.jpg'}, dateAdded:'2026-08-22'},
      {jp:'どっち', romaji:'dotchi', en:'which way / which one (of two)', tags:['question-word','untaught','encountered'], source:{location:'Instagram (@tokyowords.jp)', date:'2026-08-20', file:'Screenshot_20260820-122400.jpg'}, dateAdded:'2026-08-22'},
      {jp:'どれ', romaji:'dore', en:'which one (of three or more)', tags:['question-word','untaught','encountered','genki','genki-1-2'], source:{location:'Instagram (@tokyowords.jp)', date:'2026-08-20', file:'Screenshot_20260820-122400.jpg'}, dateAdded:'2026-08-22'},
      {jp:'どうやって', romaji:'dou yatte', en:'how (do you do it) / how does it work', tags:['question-word','untaught','encountered'], source:{location:'Instagram (@tokyowords.jp)', date:'2026-08-20', file:'Screenshot_20260820-122400.jpg'}, dateAdded:'2026-08-22'},
      {jp:'どんな', romaji:'donna', en:'what kind of', tags:['question-word','taught','L3','frequency-l3','l3-2'], source:{location:'Instagram (@tokyowords.jp)', date:'2026-08-20', file:'Screenshot_20260820-122400.jpg'}, dateAdded:'2026-08-22'},
      {jp:'なにが', romaji:'nani ga', en:'what (as the subject)', tags:['question-word','untaught','encountered'], source:{location:'Instagram (@tokyowords.jp)', date:'2026-08-20', file:'Screenshot_20260820-122400.jpg'}, dateAdded:'2026-08-22'},
      {jp:'なにを', romaji:'nani wo', en:'what (as the object)', altForm:'何を', altIsStandard:true, tags:['question-word','untaught','encountered'], source:{location:'Instagram (@tokyowords.jp)', date:'2026-08-20', file:'Screenshot_20260820-122400.jpg'}, dateAdded:'2026-08-22'},
      {jp:'どのくらい', romaji:'dono kurai', en:'how long / how much (extent)', tags:['question-word','untaught','encountered'], source:{location:'Instagram (@tokyowords.jp)', date:'2026-08-20', file:'Screenshot_20260820-122400.jpg'}, dateAdded:'2026-08-22'},
      {jp:'なんのため', romaji:'nan no tame', en:'what for', altForm:'何のため', altIsStandard:true, tags:['question-word','untaught','encountered'], source:{location:'Instagram (@tokyowords.jp)', date:'2026-08-20', file:'Screenshot_20260820-122400.jpg'}, dateAdded:'2026-08-22'},
    ],
  },
};

// GROUPS (moved here from index.html's THEMES on 2026-10-12, from the
// Portuguese-test handover). Each Group is pure data: label, chars, and how
// its words are found (tagQuery, or latestWords). `show` says where its card
// appears:
//   'groups'        - the Groups pill on the Vocab screen (ordered by newest word)
//   'untaught-top'  - top of the Untaught list (Tourist essentials)
//   'untaught'      - the Untaught list, alphabetical by label
// Optional: note (small line under the label), groupLabels (a heading per
// {any:[...]} section, see Tourist essentials), level (border colour).
// index.html reads this as THEMES and builds every Group card from it, so a
// new Group is an edit here only.
// Themes bring together items from several existing VOCAB categories into one
// selectable/drillable screen, without touching or duplicating the source
// categories' own data. A theme's item pool is computed fresh each time its
// screen is opened (see getThemePool), not stored - so it always reflects the
// current custom-content toggle and the latest source-category contents.
// Deliberately starting with just 2 concrete themes rather than a full set -
// this is the pilot that will show what the mechanism needs to handle before
// more themes get added.
// Each theme declares its source categories either as `groups` (a list of
// visual/divider blocks - every category within one block is merged together
// and alphabetized as a single unit, with a gold divider drawn between
// blocks) or as `noSort: true` with a flat `sources` list (left completely
// untouched, in original insertion order, no dividers) - used for themes
// like Days and times where the taught order IS the content and sorting
// would actively hurt reference use.
window.JP_DRILL_GROUPS = {
  // Converted from groups:[['vocab-transport'],['vocab-places-uk']] to a
  // tagQuery OR (2026-08-27) - both categories already carry their own
  // exclusive topic tag, so this needs no new tagging at all. dividerGroup
  // still separates Transport from UK Places, same as groups did - see the
  // {any:[...]} branch of getThemePool.
  'theme-transport-uk': {
    show: 'groups',
    label: 'Transport & UK Places',
    chars: 'でんしゃ ロンドン…',
    tagQuery: { any: ['transport', 'places-uk'] },
  },
  'theme-world': {
    show: 'groups',
    label: 'Around the world',
    chars: 'アメリカ とうきょう…',
    tagQuery: { any: ['countries', 'cities'] },
  },
  // REMOVED (2026-08-27) - unlike Core grammar or Getting around, Days/
  // Months/Days-of-month/Time don't get used together in a way that makes
  // mixing them a useful drill (you don't confuse "Monday" with "March" the
  // way you might confuse a verb with an adjective), and each of the four
  // is already a solid standalone category (7/12/31/32 words). Checking
  // pickDistractorItems/distractorSimilarity confirmed a real downside too:
  // distractors are drawn from the whole combined pool by pure text shape
  // (first letter + length), with no concept of semantic category - so a
  // "Monday" question could get a month name as a wrong answer, trivially
  // dismissible on sight in meaning mode without knowing any Japanese,
  // undermining the exact thing distractor-biasing exists to prevent. This
  // one had a place when it was built (Months/Days-of-month had no
  // Collection of their own yet) but not a reason to exist now - the four
  // source categories (vocab-days-l2, vocab-months-l2,
  // vocab-days-of-month-l2, vocab-time-l2) are completely untouched and
  // still fully drillable on their own under Level 2, exactly as before.
  //
  // Converted from groups to a tagQuery OR (2026-08-27) - see
  // theme-transport-uk above for why this is safe with no new tagging.
  // (2026-10-07) Latest words - words NEW to the app in the most recent
  // batch: taught words whose dateAdded is within 6 days of the newest taught
  // dateAdded (so it stays full until the next lesson's words arrive). Words
  // that already existed and were only tagged forward keep their old date, so
  // they don't count - Andrew's call: "if it was in L1 or L2 it's an old word".
  'theme-latest-words': {
    show: 'groups',
    label: 'Latest words',
    chars: '',
    latestWords: true,
  },
  // (2026-10-07) Food & drink for TAUGHT words only (the Untaught tab has its
  // own Food and Drink). Two groups: food, then drink.
  'theme-food-drink-taught': {
    show: 'groups',
    label: 'Food & drink',
    chars: 'パン すし おちゃ…',
    tagQuery: { any: ['food-type', 'drink'], all: ['taught'] },
  },
  // (2026-10-07) Level 1 jobs + Level 3 Lesson 2's homework jobs, together.
  'theme-occupations': {
    show: 'groups',
    label: 'Occupations',
    chars: 'いしゃ かんごし てんいん…',
    tagQuery: { any: [['occupations', 'occupations-l3']] }, // one list - a job is a job, whatever level it was taught in
  },
  'theme-items-clothing-general': {
    show: 'groups',
    label: 'Everyday items & general vocab',
    chars: 'かさ くつ かぞく…',
    tagQuery: { any: ['objects', ['general-l2', 'general-l3']] }, // clothing folded into objects 2026-10-08; // general-l3 added 2026-10-01; one General group (2026-10-07)
  },
  // New - Verbs/Adjectives/Question words are all "functional" categories
  // (the words a sentence is built FROM) rather than themed nouns, and none
  // of the three had a Collection either. Grouped (not noSort) since there's
  // no single taught order spanning all three the way the calendar has -
  // each block alphabetizes on its own, with a divider between blocks.
  // Converted from groups to a tagQuery OR (2026-08-27), keeping the
  // divider between Verbs/Adjectives/Question & location - a flat
  // interleaved list mixing verbs and adjectives read badly here in
  // testing, unlike some of the other Collections. Uses 'adjectives-l2'
  // (not the level-agnostic 'adjectives' tag) deliberately, so this stays
  // exactly the same 5 L2 adjectives it always was rather than also
  // pulling in Trip prep's adjectives.
  // Tourist essentials (2026-10-01) - the original hand-picked trip set
  // brought back as one card: every 'curated' word (food & drink,
  // accommodation, money & shopping, directions, emergency, weather,
  // signage, polite tourist phrases, trip prep - ~165 words and phrases),
  // WITHOUT the ~680 photo-sourced 'encountered' words those same topics
  // now share Collections with. Built for classmates going to Japan who
  // only have Level 1, so it leads the Untaught list (see
  // buildMatchCategoryList). Pure tag query - no word data changed. Curated
  // words that have since been taught (e.g. ラーメン, えび) still carry
  // 'curated' and stay in, which is right for a trip list.
  'theme-tourist-essentials': {
    // Tourist pill (2026-10-15): this card leads the Tourist pill, with one
    // card per section after it (theme-te-*, below). Every word here also
    // carries 'tourist', which is what the separate Tourist toggle gates
    // (itemTierVisible) and what keeps these words out of the Untaught pill's
    // cards (their tagQuery has none:['tourist']).
    show: 'tourist-top',
    label: 'All tourist words',
    chars: 'いくらですか えき すし…',
    // Sections (2026-10-11): every word carries exactly one te-* tag naming
    // its section, so the card is a quick reference split under headings
    // (groupLabels, drawn by buildVocabTileGrid). Answer options stay within
    // a section. A new trip word joins by getting one te-* tag. 187 existing
    // words + 79 added from the Portuguese-test gap list = 266.
    tagQuery: { any: ['te-phrases', 'te-little', 'te-food', 'te-around', 'te-hotel', 'te-shops', 'te-health', 'te-weather'] },
    groupLabels: ['Phrases', 'Little words', 'Food & drink', 'Getting around', 'Hotel & travel kit', 'Shops & money', 'Health & emergencies', 'Weather, seasons & signs'],
  },
  // Tourist pill sections (2026-10-15) - one card per te-* section, in the
  // same order as Tourist essentials' headings. show:'tourist' cards keep
  // this data order (they're not alphabetised like the Untaught list).
  'theme-te-phrases': {
    show: 'tourist',
    label: 'Phrases',
    chars: 'いくらですか おねがいします…',
    tagQuery: 'te-phrases',
  },
  'theme-te-little': {
    show: 'tourist',
    label: 'Little words',
    chars: 'たぶん もちろん なるほど…',
    tagQuery: 'te-little',
  },
  'theme-te-food': {
    show: 'tourist',
    label: 'Food & drink',
    chars: 'すし ラーメン おちゃ…',
    tagQuery: 'te-food',
  },
  'theme-te-around': {
    show: 'tourist',
    label: 'Getting around',
    chars: 'えき でぐち まっすぐ…',
    tagQuery: 'te-around',
  },
  'theme-te-hotel': {
    show: 'tourist',
    label: 'Hotel & travel kit',
    chars: 'ホテル コンセント もうふ…',
    tagQuery: 'te-hotel',
  },
  'theme-te-shops': {
    show: 'tourist',
    label: 'Shops & money',
    chars: 'みせ げんきん やすい…',
    tagQuery: 'te-shops',
  },
  'theme-te-health': {
    show: 'tourist',
    label: 'Health & emergencies',
    chars: 'くすり いたい たすけて…',
    tagQuery: 'te-health',
  },
  'theme-te-weather': {
    show: 'tourist',
    label: 'Weather, seasons & signs',
    chars: 'あめ さむい はれ…',
    tagQuery: 'te-weather',
  },
  // Time words (2026-10-01) - L2 Time vocabulary + L3's time expressions
  // (けさ/こんばん/まいあさ/やすみのひ, tagged time-l3; they stay in L3's
  // Frequency & linking category too). Deliberately NOT a revival of the
  // retired Calendar & time: days/months/days-of-month stay out, so the
  // text-shape distractor problem that sank that one doesn't apply - these
  // are all same-slot time expressions that genuinely get confused.
  'theme-time-words': {
    show: 'groups',
    label: 'Time words',
    chars: 'きのう けさ こんばん…',
    // (2026-10-07) + the five frequency words (tag 'frequency'), as their own
    // group first - ときどき is also time-l2, so 'frequency' must come first in
    // this list for all five to sit together. Answer options stay within a
    // group (see drillVocabTileSelection), so "always" is never offered for
    // "tomorrow".
    tagQuery: { any: ['frequency', ['time-l2', 'time-l3']] }, // L2 + L3 time words as one group (2026-10-07)
  },
  'theme-core-grammar': {
    show: 'groups',
    label: 'Core grammar words',
    chars: 'きます あたらしい ここ…',
    // + frequency-l3 (2026-10-01): いつも/よく/ぜんぜん/それから/そして/なにも
    // are sentence-building words in exactly this sense. L3 verbs need no
    // tag of their own here - all are L2 verbs tagged forward, so verbs-l2
    // already covers them.
    tagQuery: { any: [['verbs-l2', 'verbs-l3'], ['adjectives-l2', 'adjectives-l3'], 'question-location', 'frequency-l3'] }, // adjectives-l3 added 2026-10-13 // verbs-l3 added 2026-10-06; all verbs one group (2026-10-07)
  },
  // BUG FIX (2026-08-31) - this card used to be hidden entirely unless Trip
  // vocabulary was switched on (applyShowTripVocabVisibility), even though
  // only its `directions` slice is actually Untaught-tier - `transport` and
  // `places-to-go` are ordinary taught Level 2 content. getThemePool's
  // itemTierVisible check already drops the directions slice from the
  // pool on its own when Untaught is off, the same mechanism theme-
  // question-words relies on for its Untaught-tier slice - so hiding the
  // whole card was needlessly hiding the L2 words too. `level: 'untaught'`
  // below is not read by getThemePool (kept as a field only so this reads
  // the same way VOCAB categories do); the card is unconditionally visible
  // now, same as Question words. Converted from groups to a tagQuery OR
  // (2026-08-27) - divider still separates Transport/Places to go/
  // Directions. Directions' own tag came from the full-coverage baseline
  // pass and is exclusive to that category, so no new tagging needed here.
  'theme-getting-around': {
    show: 'groups',
    level: 'untaught',
    label: 'Getting around',
    chars: 'でんしゃ ひだり きっぷ…',
    // (2026-10-07) L3 Lesson 2's destinations (やま, うみ, どうぶつえん...) now
    // also carry 'places-to-go' so they're here too. The L2 Places to go
    // category is unaffected (it asks for L2 AND places-to-go). Rooms (いま,
    // だいどころ...) deliberately not - you don't "go" to them. パブ/カフェ left
    // as they were: tagging them would also have added them to L2's category.
    tagQuery: { any: ['transport', 'places-to-go', 'directions'] },
  },
  // REMOVED (2026-08-27) - this Collection was always "all of Trip prep +
  // all of Emergency" as whole categories, not a tag concept (see the old
  // comment this replaced: only 4 of trip-prep's 26 words were actually
  // emergency-flavoured, the rest was food/tickets/shops). Once trip-prep
  // itself retired (see vocab-trip-prep - every word already had a real
  // purpose tag), there was no tag left to rebuild this from - the
  // emergency quarter is already the existing 'emergency' combined pool,
  // the rest is already covered by Food & drink/Shopping/Adjectives/
  // Places/Stations. Nothing lost: every word this used to show is still
  // fully drillable through those. If a genuinely tag-shaped "survival"
  // concept is ever wanted, build it fresh from actual use rather than
  // recreating this exact old boundary.
  //
  // First Collection built from a tag rather than a hand-picked list of
  // source categories - see getThemePool's tagQuery branch. Pulls every
  // item anywhere carrying tags:['question-word'], which right now means
  // the 4 already-taught L2 duplicates (いつ/どこ/だれ/いくら, tagged in
  // place in Question & location words - no duplication, same score either
  // way) plus the 13 new ones in Reference - Question words. No level set
  // here deliberately, unlike the Trip-only Collections above: this card
  // always shows, and the pool itself grows or shrinks depending on the
  // Untaught toggle (the 13 reference words carry the 'untaught' tag, so
  // itemTierVisible drops them from the pool the moment Untaught is off,
  // same as it would drop them from their own category -
  // nothing extra to wire on the card itself for that to work).
  'theme-question-words': {
    show: 'groups',
    label: 'Question words',
    chars: 'なに どこ いつ…',
    tagQuery: 'question-word',
  },
  // PROMOTED FROM TEST (2026-08-31) - this was the first proving ground for
  // merging Trip and Andrew via tags instead of two separate gated tiers; it
  // felt right, so it's now the real, standard version rather than living
  // alongside the categories it was tested against. Materials — Stations &
  // trains (vocab-materials-stations, standaloneCard:false now) is fully
  // subsumed - all 89 of its items carry `stations`, verified with zero
  // gaps before retiring it as its own tile. Also pulls in the
  // station-specific words in Directions and navigation (ICカード,
  // かたみちきっぷ, おうふくきっぷ, ろせんず, かいさつぐち, the two "where
  // is/which platform" phrases) and three from trip-prep (いりぐち, でぐち,
  // のりかえ) - words that had no natural home under the old category model
  // without duplication. Nothing deleted: every item still physically lives
  // in its original category, only the standalone tiles for Materials —
  // Stations & trains went away (data + tag scans + includeItems all
  // unaffected by that).
  'theme-stations-combined': {
    show: 'untaught',
    label: 'Stations & trains',
    chars: 'ホーム きっぷ かいさつ…',
    tagQuery: { all: ['stations'], none: ['tourist'] },
  },
  // SPLIT INTO FIVE (2026-08-31) - this single combined card (built earlier
  // the same day, see the superseded comment this replaced) was 218 items
  // by the time it was retired - the single biggest pool in the app by a
  // wide margin, and flagged the same day in the FUTURE DIRECTION log as
  // the "distractor pool too broad" problem that already got Calendar &
  // time retired outright: not just size, but mixing genuinely different
  // parts of speech in one multiple-choice pool (dish/drink nouns,
  // adjectives like からい/あまい, prep verbs like 焼く/煮る, and full dining
  // phrases like かんぱい, all as each other's distractors). Andrew asked
  // for separate cards; the five sub-tags below already existed and already
  // sorted every one of the 218 items with zero gaps (checked directly, not
  // assumed) - splitting needed zero new tagging, just five tagQuery cards
  // instead of one. Each query is AND'd with `food-drink` deliberately, not
  // left bare, to keep this a pure split of the same 218 items rather than
  // widening scope - food-type and drink happen to already be dual-tagged
  // on a handful of taught vocab-food-drink-l2 words too (りんご/パン/たまご/
  // くだもの/シリアル/トースト, おさけ/ビール/ワイン - 9 words, clearly tagged on
  // purpose for cross-tier reuse, same pattern as Core grammar/Question
  // words), which a bare tagQuery would have pulled in as a free bonus -
  // noted here rather than done, since blending taught content in changes
  // more than just the split (these five all currently live under the
  // Untaught tab only, same as the card they replace; a taught+untaught
  // blend would arguably belong in Collections instead, like Getting around
  // does - a placement decision, not just a tagging one, left for later).
  // Nothing deleted: every item still physically lives in its original
  // category, only the standalone Food & drink tile is gone.
  //
  // CONSOLIDATED (2026-09-03) - the "left for later" above is now done, on
  // Andrew's go-ahead ("now the big changes have happened we can do this
  // kind of consolidation"). theme-food and theme-drink only (the two that
  // actually had taught overlap) had their `food-drink` AND-condition
  // dropped - bare `food-type`/`drink` now, same as Core grammar/Question
  // words already do for their own cross-tier tags. Verified directly: this
  // pulls in exactly the 9 words named above (6 into Food, 3 into Drink)
  // and nothing else - no other item anywhere carries food-type or drink
  // without also carrying food-drink. Food goes 128→134, Drink 16→19; still
  // Untaught-tab-only cards for now (a taught word appearing there reads
  // fine - "this word you already know also shows up in the wild" - so no
  // placement change needed after all). Dining phrases/descriptions/
  // preparation are untouched: no taught words carry those three tags.
  'theme-food': {
    show: 'untaught',
    label: 'Food',
    chars: 'たべもの ラーメン すし…',
    tagQuery: { all: ['food-type'], none: ['tourist'] },
  },
  'theme-drink': {
    show: 'untaught',
    label: 'Drink',
    chars: 'おちゃ さけ ウーロンちゃ…',
    tagQuery: { all: ['drink'], none: ['tourist'] },
  },
  'theme-dining-phrases': {
    show: 'untaught',
    label: 'Dining phrases',
    chars: 'かんぱい おかいけい おねがいします…',
    tagQuery: { all: ['food-drink', 'dining-phrase'], none: ['tourist'] },
  },
  'theme-food-descriptions': {
    show: 'untaught',
    label: 'Food descriptions',
    chars: 'おいしい からい あまい…',
    tagQuery: { all: ['food-drink', 'food-adjective'], none: ['tourist'] },
  },
  'theme-food-preparation': {
    show: 'untaught',
    label: 'Preparation & cooking',
    chars: '炙り 発酵 熟成…',
    tagQuery: { all: ['food-drink', 'preparation'], none: ['tourist'] },
  },
  // PROMOTED FROM TEST (2026-08-31) - same reasoning as theme-stations-
  // combined above. Source category vocab-materials-shops is retired as a
  // standalone tile (standaloneCard:false, see VOCAB) now that all 70 of
  // its items carry `shopping` or `signage` (the last 12 - parking lot,
  // pets, crows, studying-in-seat, and other facility/policy notices - were
  // tagged `signage` on 2026-08-31 to close the gap); vocab-money-shopping
  // (Trip) was already tagged wholesale. Nothing deleted.
  'theme-shopping-combined': {
    show: 'untaught',
    label: 'Shopping',
    chars: 'ねだん わりびき レシート…',
    tagQuery: { all: ['shopping'], none: ['tourist'] },
  },
  // NEW (2026-08-31) - the drilling screen for the service-ops tag carved
  // out of the old "Ordering & policy" grouping the same day: generic
  // shop/restaurant/business-operations vocabulary (tax, payment, staff,
  // coupons, waste disposal) that shouldn't be siloed by which kind of
  // premises it was photographed at. 66 items, pulled from across
  // vocab-materials-restaurants-ops (51) and scattered single items in
  // stations/airport/shops/entertainment/hotel-appliances/hotel-
  // facilities/street (15) - see the SERVICE-OPS entry in FUTURE DIRECTION
  // for the full breakdown.
  'theme-service-ops': {
    show: 'untaught',
    label: 'Service & shop operations',
    chars: '税込 営業時間 係員…',
    tagQuery: { all: ['service-ops'], none: ['tourist'] },
  },
  // NEW (2026-08-31) - drilling screen for the `profile-words` tag split out
  // of Materials - Entertainment the same day: 14 words that turned out to
  // be a self-introduction/profile-card set (name, date of birth, height,
  // weight, hobby, special skill, strong point, charm point, favourite
  // food/word/colour, important thing, debut, company) rather than genuine
  // entertainment vocabulary - all 14 photographed together at the Sapporo
  // TV Tower gift shop (likely a mascot/character profile board), plus
  // 企業 from nearby Odori Park the same day that reads as the same set's
  // "company/agency" field. Splitting these out is what let Materials -
  // Entertainment retire cleanly (see theme-entertainment-combined below) -
  // without this tag those 14 words would have been stranded with no
  // drilling screen once Entertainment's own tile stopped showing anything
  // not tagged `entertainment`. Label/tag name are both provisional - "self
  // -introduction" fits the content but "profile-words" was chosen to stay
  // neutral about whether this is a person introducing themselves or a
  // character/mascot profile card, since the true context isn't certain.
  'theme-profile-words': {
    show: 'untaught',
    label: 'Profile & self-introduction words',
    chars: '名前 趣味 デビュー…',
    tagQuery: { all: ['profile-words'], none: ['tourist'] },
  },
  // PROMOTED FROM TEST (2026-08-31) - same reasoning as theme-stations-
  // combined above: felt right, now the real version. Both vocab-
  // accommodation (14/14 items carry `accommodation`) and vocab-materials-
  // hotel-facilities (76/76 - 73 via `accommodation`, the other 3 - いか焼き,
  // うまいもん, ご当地, a hotel-lobby local-food advert - via `food-drink`)
  // are retired as standalone tiles (standaloneCard:false). The latter was
  // briefly a case of a comment claiming a retirement that hadn't actually
  // happened yet (an earlier draft of this comment said so; caught and
  // corrected the same day, then the retirement itself done as a same-day
  // follow-up rather than left dangling). This is also the pairing that
  // motivated the whole tag approach: にもつ and よやく are
  // Trip-canonical words that physically live in vocab-accommodation but
  // get pulled into vocab-materials-airport and vocab-materials-street via
  // includeItems - under the old category model they'd have no natural home
  // under "Accommodation" at all without that wiring. Tagging vocab-
  // accommodation wholesale picks them both up automatically, no extra
  // includeItems bookkeeping needed - still true and unaffected by today's
  // retirement, since includeItems and tag scans both read from the
  // category data directly, not from whether it has a standalone tile.
  'theme-accommodation-combined': {
    show: 'untaught',
    label: 'Accommodation',
    chars: 'ホテル よやく タオル…',
    tagQuery: { all: ['accommodation'], none: ['tourist'] },
  },
  // PROMOTED FROM TEST (2026-08-31) - same reasoning as theme-stations-
  // combined above, and needed no further data work to get here: vocab-
  // emergency-survival already had standaloneCard:false set from
  // 2026-08-27 (before this session), and all 16 of its items plus the 7
  // scattered across four Andrew categories (事故防止 in Materials -
  // Stations, 避難 in Materials - Street, 警告/感電 in Materials - Hotel:
  // Appliances, 避難経路/消火器/非常時 in Materials - Hotel: Facilities)
  // already carried `emergency`. A word can carry more than one topic tag
  // at once - the three Hotel: Facilities items also carry `accommodation`
  // and show up correctly in both combined pools. Nothing deleted.
  'theme-emergency-combined': {
    show: 'untaught',
    label: 'Emergency & survival',
    chars: 'じしん けが たいふう…',
    tagQuery: { all: ['emergency'], none: ['tourist'] },
  },
  // PROMOTED FROM TEST (2026-08-31) - same reasoning as theme-stations-
  // combined above. Source category vocab-signage-warnings is retired as a
  // standalone tile (standaloneCard:false, see VOCAB) - all 11 of its items
  // carry `signage` wholesale. Also pulls in 5 items scattered across
  // Materials - Stations (かけ込み禁止) and Materials - Shops (お断り,
  // 持込品, 補助犬, ご協力), plus the 12 Materials-shops items sorted into
  // `signage` on 2026-08-31 (駐車場, 道民, 固く, 長時間, 勉強, 給電, こちら,
  // 捨てる, ペット, ご同伴, カラス, 可能性) that closed out
  // vocab-materials-shops's coverage gap. Nothing deleted.
  'theme-signage-combined': {
    show: 'untaught',
    label: 'Signage & warnings',
    chars: 'きんえん おす ちゅうい…',
    tagQuery: { all: ['signage'], none: ['tourist'] },
  },
  // NEW / PROMOTED (2026-08-31) - Materials - Entertainment retires as a
  // standalone tile now that the words that didn't fit `entertainment` have
  // somewhere else to go: 39 items keep `entertainment`, 10 already carried
  // `emergency` (a 9-item heatstroke-warning block plus 避難, tagged back on
  // 2026-08-27 and already drillable via theme-emergency-combined), and the
  // remaining 19 split into `profile-words` (14, see THEMES entry above),
  // `stations` (鉄道駅), `street` (停止線, 開発局 - roadside signage from
  // Muroran), and `places` (市役所, 名称 - the loosest fit of the lot; 名称
  // in particular is a standalone label word with no natural home, folded
  // in here rather than left stranded). Unlike the six categories promoted
  // earlier today, this one is a genuine two-source combine, not a solo
  // flip - vocab-tourist-phrases already had 2 items tagged `entertainment`
  // from before this split, so this pool is 41 items, not 39.
  'theme-entertainment-combined': {
    show: 'untaught',
    label: 'Entertainment',
    chars: 'パチンコ 全台 計数機…',
    tagQuery: { all: ['entertainment'], none: ['tourist'] },
  },
  // L1/L2 MERGED GROUPS (2026-11-05) - shown only on the L1/L2 pill (show:'l12'),
  // in the order JP_DRILL_L12_LIST gives. Taught words carrying an L1 or L2 tag
  // (some:, so later L3 words with the same topic tag stay out); a line between parts.
  'theme-l12-things': {
    show: 'l12',
    label: 'Everyday things & transport',
    chars: 'かさ ほん くるま でんしゃ…',
    tagQuery: { any: ['objects', 'transport'], all: ['taught'], some: ['L1', 'L2'] },
  },
  'theme-l12-places': {
    show: 'l12',
    label: 'Places',
    chars: 'うち じむしょ こうえん えいがかん…',
    tagQuery: { any: ['places', 'places-to-go'], all: ['taught'], some: ['L1', 'L2'] },
  },
  'theme-l12-world': {
    show: 'l12',
    label: 'Around the world',
    chars: 'にほん パリ ロンドン…',
    tagQuery: { any: ['countries', 'cities', 'places-uk'], all: ['taught'], some: ['L1', 'L2'] },
  },
  'theme-l12-grammar': {
    show: 'l12',
    label: 'Verbs, adjectives & question words',
    chars: 'たべます ながい どこ…',
    tagQuery: { any: ['verbs-l2', 'adjectives-l2', 'question-location'], all: ['taught'], some: ['L1', 'L2'] },
  },
};

// The L1/L2 pill's list, in order (2026-11-05). Plain categories keep their own
// screens (reference cards, number/calendar order, Colours' colour tiles);
// Time and calendar lists and Family stay on their own on purpose.
window.JP_DRILL_L12_LIST = [
  'vocab-greetings', 'vocab-occupations', 'vocab-family-l2', 'vocab-food-drink-l2',
  'theme-l12-things', 'vocab-colours', 'vocab-animals-l2', 'theme-l12-places',
  'theme-l12-world', 'theme-l12-grammar', 'vocab-general-l2', 'vocab-numbers',
  'vocab-time-l2', 'vocab-days-l2', 'vocab-months-l2', 'vocab-days-of-month-l2',
];
