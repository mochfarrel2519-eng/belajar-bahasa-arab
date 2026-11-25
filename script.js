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
      translation: 'Sesungguhnya amal itu bergantung pada niatnya, dan setiap orang mendapatkan sesuai dengan apa yang ia niatkan.',
      narrator: 'Umar bin Khattab radhiyallahu ‘anhu', source: 'Sahih al-Bukhari 1', url: 'https://sunnah.com/bukhari:1'
    },
    {
      arabic: 'الدِّينُ النَ��صِيحَةُ. قُلْنَا: لِمَنْ؟ قَالَ: لِلَّهِ وَلِكِتَابِهِ وَلِرَسُولِهِ وَلِأَئِمَّةِ الْمُسْلِمِينَ وَعَامَّتِهِمْ',
      translation: 'Agama adalah nasihat. Kami bertanya, “Untuk siapa?” Beliau menjawab, “Untuk Allah, kitab-Nya, Rasul-Nya, para pemimpin kaum Muslimin, dan kaum Muslimin pada umumnya.”',
      narrator: 'Tamim ad-Dari radhiyallahu ‘anhu', source: 'Sahih Muslim 55a', url: 'https://sunnah.com/muslim:55a'
    },
    {
      arabic: 'خَيْرُكُمْ مَنْ تَعَلَّمَ الْقُرْآنَ وَعَلَّمَهُ',
      translation: 'Sebaik-baik kalian adalah orang yang mempelajari Al-Qur’an dan mengajarkannya.',
      narrator: 'Utsman bin Affan radhiyallahu ‘anhu', source: 'Sahih al-Bukhari 5027', url: 'https://sunnah.com/bukhari:5027'
    },
    {
      arabic: 'الْمُسْلِمُ مَنْ سَلِمَ الْمُسْلِمُونَ مِنْ لِسَانِهِ وَيَدِهِ',
      translation: 'Seorang Muslim adalah orang yang kaum Muslimin selamat dari gangguan lisan dan tangannya.',
      narrator: 'Abdullah bin Amr radhiyallahu ‘anhuma', source: 'Sahih al-Bukhari 10', url: 'https://sunnah.com/bukhari:10'
    },
    {
      arabic: 'لَا ضَرَرَ وَلَا ضِرَارَ',
      translation: 'Tidak boleh menimbulkan bahaya bagi diri sendiri maupun orang lain.',
      narrator: 'Diriwayatkan dari Abu Sa’id al-Khudri radhiyallahu ‘anhu', source: 'Sunan Ibn Majah 2340', url: 'https://sunnah.com/ibnmajah:2340'
    },
    {
      arabic: 'الإِيمَانُ بِضْعٌ وَسَبْعُونَ شُعْبَةً، فَأَفْضَلُهَا قَوْلُ لَا إِلَهَ إِلَّا اللَّهُ، وَأَدْنَاهَا إِمَاطَةُ الأَذَى عَنِ الطَّرِيقِ، وَالْحَيَاءُ شُعْبَةٌ مِنَ الإِيمَانِ',
      translation: 'Iman memiliki lebih dari tujuh puluh cabang. Yang paling utama adalah ucapan “Laa ilaaha illallah”, yang paling rendah menyingkirkan gangguan dari jalan, dan malu adalah salah satu cabang iman.',
      narrator: 'Abu Hurairah radhiyallahu ‘anhu', source: 'Sahih Muslim 35a', url: 'https://sunnah.com/muslim:35a'
    },
    {
      arabic: 'لَا يُؤْمِنُ أَحَدُكُمْ حَتَّى يُحِبَّ لِأَخِيهِ مَا يُحِبُّ لِنَفْسِهِ',
      translation: 'Tidak sempurna iman salah seorang dari kalian sampai ia mencintai untuk saudaranya apa yang ia cintai untuk dirinya sendiri.',
      narrator: 'Anas bin Malik radhiyallahu ‘anhu', source: 'Sahih al-Bukhari 13', url: 'https://sunnah.com/bukhari:13'
    }
  ],
  tajwid: [
    ['Idzhar','Harus dibaca jelas'], ['Ikhfa','Harus dibaca samar'], ['Idgham','Harus dibaca melebur'],
    ['Iqlab','Mengubah bunyi nun mati atau tanwin menjadi mim'], ['Mad Thabi‘i','Mad asli sepanjang dua harakat'],
    ['Mad Jaiz Munfasil','Mad yang diperbolehkan dipanjangkan di tempat terpisah'], ['Qalqalah','Bunyi pantulan pada huruf qalqalah'],
    ['Gunnah','Dengungan pada nun atau mim bertasydid']
  ],
  fikih: [
    ['الوضوء','Wudhu','Membersihkan anggota badan tertentu sebelum salat'], ['الصلاة','Salat','Ibadah wajib lima waktu'],
    ['الصيام','Puasa','Menahan diri dari hal yang membatalkan'], ['الزكاة','Zakat','Kewajiban memberikan harta kepada yang berhak'],
    ['الحج','Haji','Ibadah ke Baitullah pada waktu tertentu'], ['الطهارة','Thaharah','Bersuci dari hadas dan najis'],
    ['الجنابة','Janabah','Keadaan hadas besar yang perlu mandi wajib']
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

function todayKey() {
  const d = new Date();
  return `${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()}`;
}

function updateVisitStreak() {
  const today = todayKey();
  if (lastVisit === today) return;
  if (lastVisit) {
    const previous = new Date(lastVisit);
    const todayDate = new Date(today);
    const diff = Math.round((todayDate - previous) / 86400000);
    streak = diff === 1 ? streak + 1 : 1;
  } else {
    streak = 1;
  }
  lastVisit = today;
  saveProgress();
}

function saveProgress() {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify({ xp, streak, lastVisit })); } catch (_) { /* Storage may be disabled. */ }
}

function updateStats() {
  document.getElementById('xp').textContent = xp + ' XP';
  document.getElementById('streak').textContent = streak + ' hari beruntun';
  document.getElementById('level').textContent = (Math.floor(xp / 100) + 1) + ' Level';
  document.getElementById('progress').style.width = Math.min(xp % 100, 100) + '%';
}

function renderLetters() {
  const [ar, name, roman] = letters[selected];
  panel.innerHTML = `
    <h2>28 huruf hijaiyah</h2>
    <p class="subtitle">Ketuk huruf untuk melihat nama dan cara bacanya.</p>
    <div class="letter-card">
      <div class="arabic">${ar}</div>
      <div class="letter-info"><strong>${name}</strong><span>Dibaca: ${roman}</span></div>
      <button class="listen" id="listenLetter">Dengarkan</button>
    </div>
    <div class="letter-grid">
      ${letters.map((l,i) => `<button class="letter-button ${i===selected?'selected':''}" data-index="${i}">${l[0]}<small>${l[1]}</small></button>`).join('')}
    </div>`;
  document.querySelectorAll('.letter-button').forEach(btn => btn.addEventListener('click', () => {
    selected = Number(btn.dataset.index);
    renderLetters();
    speak(letters[selected][0]);
  }));
  document.getElementById('listenLetter').addEventListener('click', () => speak(ar));
}

function renderCards(type) {
  const items = extra[type];
  const title = type[0].toUpperCase() + type.slice(1);
  if (type === 'hadits') {
    panel.innerHTML = `<h2>${title}</h2><p class="subtitle">Pilihan hadits, terjemahan, perawi, serta rujukan kitab dan nomor. Terjemahan disajikan secara ringkas.</p><div class="cards">${items.map(item => `
      <article class="card hadith-card">
        <span class="ar" lang="ar" dir="rtl">${item.arabic}</span>
        <p>${item.translation}</p>
        <p class="hadith-narrator">${item.narrator}</p>
        <a class="hadith-source" href="${item.url}" target="_blank" rel="noopener noreferrer">Sumber: ${item.source} ↗</a>
      </article>`).join('')}</div>`;
    return;
  }
  panel.innerHTML = `<h2>${title}</h2><p class="subtitle">Materi ringkas untuk dipelajari.</p><div class="cards">${items.map(item => {
    if (item.length === 3) {
      return `<article class="card"><span class="ar">${item[0]}</span><strong>${item[1]}</strong><p>${item[2]}</p></article>`;
    }
    return `<article class="card"><span class="ar">${item[0]}</span><p>${item[1]}</p></article>`;
  }).join('')}</div>`;
}

function shuffled(items) {
  return [...items].sort(() => Math.random() - 0.5);
}

function startQuiz() {
  quizIndex = 0;
  quizScore = 0;
  quizOrder = shuffled(quizQuestions).slice(0, 10);
  renderQuiz();
}

function renderQuiz() {
  if (quizIndex >= quizOrder.length) {
    const percentage = Math.round((quizScore / quizOrder.length) * 100);
    panel.innerHTML = `<div class="quiz result"><h2>Hasil Kuis</h2><strong>${quizScore}/${quizOrder.length}</strong><p>Nilai akhir: ${percentage}</p><p>${percentage >= 70 ? 'Bagus! Kamu sudah menguasai materi dasar.' : 'Terus belajar, hasilmu akan semakin baik!'}</p><button class="restart" id="restartQuiz">Ulangi Kuis</button></div>`;
    document.getElementById('restartQuiz').addEventListener('click', startQuiz);
    return;
  }

  const current = quizOrder[quizIndex];
  panel.innerHTML = `<h2>Kuis</h2><p class="subtitle">Jawab soal untuk mendapatkan XP.</p><div class="quiz"><div class="quiz-meta"><span>Soal ${quizIndex + 1} dari ${quizOrder.length}</span><span>Skor ${quizScore}</span></div><h3>${current.question}</h3><div class="options">${shuffled(current.options).map(option => `<button class="option" data-answer="${option}">${option}</button>`).join('')}</div></div>`;

  document.querySelectorAll('.option').forEach(btn => btn.addEventListener('click', () => {
    const correct = btn.dataset.answer === current.answer;
    btn.classList.add(correct ? 'correct' : 'wrong');
    if (correct) {
      quizScore++;
      xp += 10;
      saveProgress();
      updateStats();
    }
    document.querySelectorAll('.option').forEach(b => b.disabled = true);
    setTimeout(() => { quizIndex++; renderQuiz(); }, 700);
  }));
}

function speak(text) {
  if (!soundEnabled || !('speechSynthesis' in window)) return;
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'ar-SA';
  speechSynthesis.cancel();
  speechSynthesis.speak(utterance);
}

function activateTab(type) {
  document.querySelectorAll('.tab').forEach(t => t.classList.toggle('active', t.dataset.tab === type));
  if (type === 'huruf') renderLetters();
  else if (type === 'kuis') startQuiz();
  else renderCards(type);
}

document.querySelectorAll('.tab').forEach(tab => tab.addEventListener('click', () => activateTab(tab.dataset.tab)));
document.getElementById('practiceBtn').addEventListener('click', () => activateTab('kuis'));
document.getElementById('soundBtn').addEventListener('click', e => {
  soundEnabled = !soundEnabled;
  e.target.textContent = 'Efek suara: ' + (soundEnabled ? 'hidup' : 'mati');
});

updateVisitStreak();
updateStats();
renderLetters();
