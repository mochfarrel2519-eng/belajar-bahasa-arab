const STORAGE_KEY = 'arabic-learning-progress-v1';

const letters = [
  ['ا','Alif','a'], ['ب','Ba','b'], ['ت','Ta','t'], ['ث','Tsa','ts'], ['ج','Jim','j'], ['ح','Ha','h'], ['خ','Kha','kh'], ['د','Dal','d'],
  ['ذ','Dzal','dz'], ['ر','Ra','r'], ['ز','Zai','z'], ['س','Sin','s'], ['ش','Syin','sy'], ['ص','Shad','sh'], ['ض','Dhad','dh'], ['ط','Tha','th'],
  ['ظ','Zha','zh'], ['ع','Ain','‘'], ['غ','Ghain','gh'], ['ف','Fa','f'], ['ق','Qaf','q'], ['ك','Kaf','k'], ['ل','Lam','l'], ['م','Mim','m'],
  ['ن','Nun','n'], ['و','Wawu','w'], ['ه','Ha','h'], ['ء','Hamzah','‘'], ['ي','Ya','y']
];

const extra = {
  kosakata: [
    ['كتاب','Kitab','buku'], ['قلم','Qalam','pulpen'], ['بيت','Bayt','rumah'], ['ماء','Ma’','air'],
    ['مدرسة','Madrasah','sekolah'], ['علم','Ilm','ilmu'], ['باب','Bab','pintu'], ['طعام','Ta’am','makanan'],
    ['لغة','Lughah','bahasa'], ['زهرية','Zahriyah','vas bunga'], ['مفتاح','Miftah','kunci'], ['قمر','Qamar','bulan']
  ],
  hadits: [
    {
      arabic: 'إِنَّمَا الأَعْمَالُ بِالنِّيَّاتِ، وَإِنَّمَا لِكُلِّ امْرِئٍ مَا نَوَى',
      transliteration: 'Innamal-a‘mālu bin-niyyāt, wa innamā likulli imri’in mā nawā.',
      translation: 'Sesungguhnya amal perbuatan itu bergantung pada niatnya. Setiap orang memperoleh sesuai niatnya: ada yang berhijrah untuk Allah dan Rasul-Nya, dan ada yang berhijrah untuk meraih dunia atau menikahi wanita.',
      meaning: 'Hadits ini menegaskan bahwa niat menjadi dasar penilaian amal. Amal lahiriah perlu disertai niat yang lurus agar bernilai ibadah di sisi Allah.',
      narrator: 'Umar bin Khattab radhiyallahu ‘anhu',
      source: 'Sahih al-Bukhari 1',
      url: 'https://sunnah.com/bukhari:1'
    },
    {
      arabic: 'الدِّينُ النَّصِيحَةُ. قُلْنَا: لِمَنْ؟ قَالَ: لِلَّهِ وَلِكِتَابِهِ وَلِرَسُولِهِ وَلِأَئِمَّةِ الْمُسْلِمِينَ وَعَامَّتِهِمْ',
      transliteration: 'Ad-dīnu an-nasīhah. Qulnā: Liman? Qāla: Lillāhi wa likitābihī wa lirasūlihī wa li-a’immatil-muslimīna wa ‘āmmatihim.',
      translation: 'Agama adalah nasihat. Kami bertanya, “Untuk siapa?” Beliau menjawab, “Untuk Allah, kitab-Nya, Rasul-Nya, para pemimpin kaum Muslimin, dan seluruh kaum Muslimin.”',
      meaning: 'Nasihat mencakup keikhlasan kepada Allah, memperlakukan kitab dan Rasul-Nya sesuai ajaran Islam, mematuhi pemimpin dalam kebaikan, serta menginginkan kebaikan bagi sesama Muslim.',
      narrator: 'Tamim ad-Dari radhiyallahu ‘anhu',
      source: 'Sahih Muslim 55a',
      url: 'https://sunnah.com/muslim:55a'
    },
    {
      arabic: 'خَيْرُكُمْ مَنْ تَعَلَّمَ الْقُرْآنَ وَعَلَّمَهُ',
      transliteration: 'Khairukum man ta‘allamal-Qur’āna wa ‘allamahū.',
      translation: 'Sebaik-baik kalian adalah orang yang mempelajari Al-Qur’an dan mengajarkannya.',
      meaning: 'Hadits mendorong umat untuk membaca, memahami, menghafal, dan menyampaikan Al-Qur’an dengan benar. Aktivitas belajar dan mengajar sama-sama bernilai ibadah.',
      narrator: 'Utsman bin Affan radhiyallahu ‘anhu',
      source: 'Sahih al-Bukhari 5027',
      url: 'https://sunnah.com/bukhari:5027'
    },
    {
      arabic: 'الْمُسْلِمُ مَنْ سَلِمَ الْمُسْلِمُونَ مِنْ لِسَانِهِ وَيَدِهِ',
      transliteration: 'Al-Muslimu man salimal-Muslimūna min lisānihī wa yadih.',
      translation: 'Seorang Muslim adalah orang yang kaum Muslimin lain selamat dari gangguan lisan dan tangannya.',
      meaning: 'Keutuhan seorang Muslim terlihat dari sikap menjaga keamanan orang lain. Jangan menyakiti dengan perkataan, ancaman, kekerasan, atau perbuatan yang merugikan.',
      narrator: 'Abdullah bin Amr radhiyallahu ‘anhuma',
      source: 'Sahih al-Bukhari 10',
      url: 'https://sunnah.com/bukhari:10'
    },
    {
      arabic: 'لَا ضَرَرَ وَلَا ضِرَارَ',
      transliteration: 'Lā darara wa lā dirār.',
      translation: 'Tidak boleh menimbulkan bahaya atau mudarat, dan tidak boleh membalas mudarat dengan mudarat lainnya.',
      meaning: 'Islam melarang perbuatan yang merugikan diri sendiri atau orang lain. Prinsip ini menjadi dasar larangan bahaya serta penyelesaian sengketa secara adil.',
      narrator: 'Abu Sa’id al-Khudri radhiyallahu ‘anhu',
      source: 'Sunan Ibnu Majah 2340',
      url: 'https://sunnah.com/ibnmajah:2340'
    },
    {
      arabic: 'الإِيمَانُ بِضْعٌ وَسَبْعُونَ أَوْ بِضْعٌ وَسِتُّونَ شُعْبَةً، فَأَفْضَلُهَا قَوْلُ لَا إِلَهَ إِلَّا اللَّهُ، وَأَدْنَاهَا إِمَاطَةُ الأَذَى عَنِ الطَّرِيقِ، وَالْحَيَاءُ شُعْبَةٌ مِنَ الإِيمَانِ',
      transliteration: 'Al-īmānu bid‘un wa sab‘ūna aw bid‘un wa sittūna shu‘bat(an)...',
      translation: 'Iman memiliki lebih dari tujuh puluh cabang—ada riwayat lebih dari enam puluh cabang. Paling tinggi adalah ucapan laa ilaaha illallah, paling rendah menyingkirkan gangguan dari jalan, dan malu adalah salah satu cabang iman.',
      meaning: 'Iman bukan hanya keyakinan dalam hati, tetapi juga ucapan dan amal. Cabang-cabangnya mencakup ibadah besar maupun kebaikan kecil dalam kehidupan sehari-hari.',
      narrator: 'Abu Hurairah radhiyallahu ‘anhu',
      source: 'Sahih Muslim 35a',
      url: 'https://sunnah.com/muslim:35a'
    },
    {
      arabic: 'لَا يُؤْمِنُ أَحَدُكُمْ حَتَّى يُحِبَّ لِأَخِيهِ مَا يُحِبُّ لِنَفْسِهِ',
      transliteration: 'Lā yu’minu aḥadukum hattā yuhibba li-akhīhi mā yuhibbu linafsih.',
      translation: 'Tidak sempurna iman seseorang dari kalian sampai ia mencintai untuk saudaranya apa yang ia cintai untuk dirinya sendiri.',
      meaning: 'Hadits ini mengajarkan rasa persaudaraan, kejujuran, empati, dan larangan untuk menginginkan kebaikan hanya bagi diri sendiri.',
      narrator: 'Anas bin Malik radhiyallahu ‘anhu',
      source: 'Sahih al-Bukhari 13',
      url: 'https://sunnah.com/bukhari:13'
    },
    {
      arabic: 'تَبَسُّمُكَ فِي وَجْهِ أَخِيكَ لَكَ صَدَقَةٌ',
      transliteration: 'Tabassumuka fī wajhi akhīka laka ṣadaqah.',
      translation: 'Senyum manismu di hadapan saudaramu adalah sedekah bagimu.',
      meaning: 'Keimanan juga tampak dalam perilaku ringan yang membawa kebaikan. Ekspresi ramah dapat menguatkan hubungan sosial dan dianggap sebagai sedekah.',
      narrator: 'Abu Dzar al-Ghifari radhiyallahu ‘anhu',
      source: 'Jami‘ at-Tirmidzi 1956',
      url: 'https://sunnah.com/tirmidhi:1956'
    },
    {
      arabic: 'مَنْ كَانَ يُؤْمِنُ بِاللَّهِ وَالْيَوْمِ الْآخِرِ فَلْيَقُلْ خَيْرًا أَوْ لِيَصْمُتْ',
      transliteration: 'Man kāna yu’minu billāhi wal-yaumil-ākhiri falyaqul khairan aw liyaṣmut.',
      translation: 'Barang siapa beriman kepada Allah dan hari akhir, hendaklah berkata baik atau diam.',
      meaning: 'Hadits ini mengajarkan pengendalian lisan. Jika perkataan belum tentu baik, diam lebih aman daripada mengucapkan sesuatu yang menyakiti atau menimbulkan fitnah.',
      narrator: 'Abu Hurairah radhiyallahu ‘anhu',
      source: 'Sahih al-Bukhari 6018',
      url: 'https://sunnah.com/bukhari:6018'
    }
  ],
  tajwid: [
    ['Idzhar','Harus dibaca jelas'], ['Ikhfa','Harus dibaca samar'], ['Idgham','Harus dibaca melebur'],
    ['Iqlab','Mengubah bunyi nun mati atau tanwin menjadi mim'], ['Mad Thabi‘i','Mad asli sepanjang dua harakat'],
    ['Mad Jaiz Munfasil','Mad yang diperbolehkan dipanjangkan di tempat terpisah'], ['Qalqalah','Bunyi pantulan pada huruf qalqalah'],
    ['Gunnah','Dengungan pada nun atau mim bertasydid']
  ],
  fikih: [
    ['الوضوء','Wudhu','Membasuh muka, kedua tangan, mengusap kepala, dan membasuh kedua kaki dengan urutan tertentu.'],
    ['الصلاة','Salat','Ibadah wajib lima waktu yang dimulai dengan takbir dan diakhiri salam.'],
    ['الصيام','Puasa','Menahan makan, minum, dan hal yang membatalkan dari terbit fajar hingga terbenam matahari.'],
    ['الزكاة','Zakat','Harta wajib diberikan kepada golongan yang berhak jika telah memenuhi nisab dan haul.'],
    ['الحج','Haji','Ibadah ke Baitullah pada musim tertentu yang wajib bagi yang mampu.'],
    ['الطهارة','Thaharah','Bersuci dari hadas dan najis menggunakan air atau cara yang disyariatkan.'],
    ['الجنابة','Janabah','Keadaan hadas besar yang berakhir setelah mandi wajib sesuai syariat.']
  ]
};

const quizQuestions = [
  { question: 'Apa arti huruf Arab “ق” dalam bahasa Indonesia?', options: ['Ba','Qaf','Mim','Dal'], answer: 'Qaf' },
  { question: 'Apa arti kata “ماء”?', options: ['Makanan','Air','Rumah','Buku'], answer: 'Air' },
  { question: 'Manakah arti “الدين النصيحة”?', options: ['Agama adalah nasihat','Hari adalah berkah','Ilmu itu cahaya','Salat itu tiang'], answer: 'Agama adalah nasihat' },
  { question: 'Qalqalah adalah bunyi…', options: ['Pantulan','Samar','Panjang','Jelas'], answer: 'Pantulan' },
  { question: 'Ibadah salat wajib dilaksanakan berapa waktu sehari?', options: ['Tiga','Empat','Lima','Tujuh'], answer: 'Lima' },
  { question: 'Apa arti kata “بيت”?', options: ['Rumah','Pintu','Sekolah','Pulpen'], answer: 'Rumah' },
  { question: 'Huruf hijaiyah “ث” dibaca…', options: ['Tsa','Dza','Sin','Fa'], answer: 'Tsa' },
  { question: 'Bersuci untuk menghilangkan hadas disebut…', options: ['Thaharah','Zakat','Puasa','Haji'], answer: 'Thaharah' },
  { question: 'Hadits “إنما الأعمال بالنيات” membahas tentang…', options: ['Niat','Jual beli','Musafir','Adzan'], answer: 'Niat' },
  { question: 'Ikhfa berarti bunyi dibaca…', options: ['Samar','Tertekan','Pantulan','Meleleh'], answer: 'Samar' }
];

let selected = 0;
let soundEnabled = true;
let quizIndex = 0;
let quizScore = 0;
let quizOrder = [];
const panel = document.getElementById('panel');

let saved;
try { saved = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {}; } catch (_) { saved = {}; }
let xp = Number(saved.xp) || 0;
let streak = Number(saved.streak) || 0;
let lastVisit = saved.lastVisit || '';

function todayKey() { const d = new Date(); return `${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()}`; }

function updateVisitStreak() {
  const today = todayKey();
  if (lastVisit === today) return;
  if (lastVisit) {
    const previous = new Date(lastVisit);
    const todayDate = new Date(today);
    const diff = Math.round((todayDate - previous) / 86400000);
    streak = diff === 1 ? streak + 1 : 1;
  } else streak = 1;
  lastVisit = today;
  saveProgress();
}

function saveProgress() {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify({ xp, streak, lastVisit })); } catch (_) {}
}

function updateStats() {
  document.getElementById('xp').textContent = xp + ' XP';
  document.getElementById('streak').textContent = streak + ' hari beruntun';
  document.getElementById('level').textContent = (Math.floor(xp / 100) + 1) + ' Level';
  document.getElementById('progress').style.width = Math.min(xp % 100, 100) + '%';
}

function renderLetters() {
  const [ar, name, roman] = letters[selected];
  panel.innerHTML = `<h2>28 huruf hijaiyah</h2><p class="subtitle">Ketuk huruf untuk melihat nama dan cara bacanya.</p><div class="letter-card"><div class="arabic">${ar}</div><div class="letter-info"><strong>${name}</strong><span>Dibaca: ${roman}</span></div><button class="listen" id="listenLetter">Dengarkan</button></div><div class="letter-grid">${letters.map((l,i) => `<button class="letter-button ${i===selected?'selected':''}" data-index="${i}">${l[0]}<small>${l[1]}</small></button>`).join('')}</div>`;
  document.querySelectorAll('.letter-button').forEach(btn => btn.addEventListener('click', () => { selected = Number(btn.dataset.index); renderLetters(); speak(letters[selected][0]); }));
  document.getElementById('listenLetter').addEventListener('click', () => speak(ar));
}

function renderCards(type) {
  const items = extra[type];
  const title = type[0].toUpperCase() + type.slice(1);
  if (type === 'hadits') {
    panel.innerHTML = `<h2>${title}</h2><p class="subtitle">Pelajari teks Arab, cara baca, terjemahan, penjelasan, perawi, dan rujukan resmi.</p><div class="cards hadith-grid">${items.map((item, index) => `
      <article class="card hadith-card">
        <div class="hadith-number">Hadits ${index + 1}</div>
        <span class="ar hadith-arabic" lang="ar" dir="rtl">${item.arabic}</span>
        <details class="hadith-details"><summary>Pelajari hadits</summary>
          <div class="hadith-section"><strong>Transliterasi</strong><p>${item.transliteration}</p></div>
          <div class="hadith-section"><strong>Terjemahan ringkas</strong><p>${item.translation}</p></div>
          <div class="hadith-section"><strong>Makna &amp; penerapan</strong><p>${item.meaning}</p></div>
          <div class="hadith-section"><strong>Perawi</strong><p>${item.narrator}</p></div>
        </details>
        <a class="hadith-source" href="${item.url}" target="_blank" rel="noopener noreferrer">Sumber: ${item.source} ↗</a>
      </article>`).join('')}</div>`;
    return;
  }
  panel.innerHTML = `<h2>${title}</h2><p class="subtitle">Materi ringkas untuk dipelajari.</p><div class="cards">${items.map(item => {
    if (item.length === 3) return `<article class="card"><span class="ar">${item[0]}</span><strong>${item[1]}</strong><p>${item[2]}</p></article>`;
    return `<article class="card"><span class="ar">${item[0]}</span><p>${item[1]}</p></article>`;
  }).join('')}</div>`;
}

function shuffled(items) { return [...items].sort(() => Math.random() - 0.5); }

function startQuiz() { quizIndex = 0; quizScore = 0; quizOrder = shuffled(quizQuestions).slice(0, 10); renderQuiz(); }

function renderQuiz() {
  if (quizIndex >= quizOrder.length) {
    const percentage = Math.round((quizScore / quizOrder.length) * 100);
    xp += quizScore * 2;
    saveProgress();
    updateStats();
    panel.innerHTML = `<div class="quiz result"><h2>Hasil Kuis</h2><strong>${quizScore}/${quizOrder.length}</strong><p>Nilai akhir: ${percentage}</p><p>${percentage >= 70 ? 'Bagus! Kamu sudah menguasai materi dasar.' : 'Terus belajar, hasilmu akan semakin baik!'}</p><button class="restart" id="restartQuiz">Ulangi Kuis</button></div>`;
    document.getElementById('restartQuiz').addEventListener('click', startQuiz);
    return;
  }
  const current = quizOrder[quizIndex];
  panel.innerHTML = `<h2>Kuis</h2><p class="subtitle">Jawab soal untuk mendapatkan XP.</p><div class="quiz"><div class="quiz-meta"><span>Soal ${quizIndex + 1} dari ${quizOrder.length}</span><span>Skor ${quizScore}</span></div><h3>${current.question}</h3><div class="options">${shuffled(current.options).map(option => `<button class="option" data-answer="${option}">${option}</button>`).join('')}</div></div>`;
  document.querySelectorAll('.option').forEach(btn => btn.addEventListener('click', () => {
    const correct = btn.dataset.answer === current.answer;
    btn.classList.add(correct ? 'correct' : 'wrong');
    if (correct) { quizScore++; xp += 10; saveProgress(); updateStats(); }
    document.querySelectorAll('.option').forEach(b => b.disabled = true);
    setTimeout(() => { quizIndex++; renderQuiz(); }, 700);
  }));
}

function speak(text) {
  if (!soundEnabled || !('speechSynthesis' in window)) return;
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'ar-SA';
  speechSynthesis.cancel(); speechSynthesis.speak(utterance);
}

function activateTab(type) {
  document.querySelectorAll('.tab').forEach(t => t.classList.toggle('active', t.dataset.tab === type));
  if (type === 'huruf') renderLetters();
  else if (type === 'kuis') startQuiz();
  else renderCards(type);
}

document.querySelectorAll('.tab').forEach(tab => tab.addEventListener('click', () => activateTab(tab.dataset.tab)));
document.getElementById('practiceBtn').addEventListener('click', () => activateTab('kuis'));
document.getElementById('soundBtn').addEventListener('click', e => { soundEnabled = !soundEnabled; e.target.textContent = 'Efek suara: ' + (soundEnabled ? 'hidup' : 'mati'); });

updateVisitStreak();
updateStats();
renderLetters();
