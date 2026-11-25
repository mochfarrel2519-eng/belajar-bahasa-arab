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
      translation: 'Sesungguhnya amal perbuatan itu bergantung pada niatnya. Setiap orang memperoleh sesuai niatnya.',
      meaning: 'Niat menjadi dasar penilaian amal. Luruskan tujuan sebelum beribadah atau melakukan kebaikan, dan jaga niat agar tidak semata-mata mencari pujian.',
      narrator: 'Umar bin Khattab radhiyallahu ‘anhu', source: 'Sahih al-Bukhari 1', url: 'https://sunnah.com/bukhari:1'
    },
    {
      arabic: 'الدِّينُ النَّصِيحَةُ. قُلْنَا: لِمَنْ؟ قَالَ: لِلَّهِ وَلِكِتَابِهِ وَلِرَسُولِهِ وَلِأَئِمَّةِ الْمُسْلِمِينَ وَعَامَّتِهِمْ',
      transliteration: 'Ad-dīnu an-naṣīḥah. Qulnā: liman? Qāla: lillāhi wa likitābihī wa lirasūlihī wa li-a’immatil-muslimīna wa ‘āmmatihim.',
      translation: 'Agama adalah nasihat. Kami bertanya, “Untuk siapa?” Beliau menjawab, “Untuk Allah, kitab-Nya, Rasul-Nya, para pemimpin kaum Muslimin, dan seluruh kaum Muslimin.”',
      meaning: 'Nasihat mencakup keikhlasan kepada Allah, menghormati petunjuk Al-Qur’an dan Rasul, serta menginginkan kebaikan bagi masyarakat dengan cara yang bijak.',
      narrator: 'Tamim ad-Dari radhiyallahu ‘anhu', source: 'Sahih Muslim 55a', url: 'https://sunnah.com/muslim:55a'
    },
    {
      arabic: 'خَيْرُكُمْ مَنْ تَعَلَّمَ الْقُرْآنَ وَعَلَّمَهُ',
      transliteration: 'Khairukum man ta‘allamal-Qur’āna wa ‘allamahū.',
      translation: 'Sebaik-baik kalian adalah orang yang mempelajari Al-Qur’an dan mengajarkannya.',
      meaning: 'Belajar dan mengajarkan Al-Qur’an merupakan amal utama. Pelajari bacaannya dengan benar, pahami maknanya, lalu ajarkan sesuai kemampuan dan dengan amanah.',
      narrator: 'Utsman bin Affan radhiyallahu ‘anhu', source: 'Sahih al-Bukhari 5027', url: 'https://sunnah.com/bukhari:5027'
    },
    {
      arabic: 'الْمُسْلِمُ مَنْ سَلِمَ الْمُسْلِمُونَ مِنْ لِسَانِهِ وَيَدِهِ',
      transliteration: 'Al-Muslimu man salimal-Muslimūna min lisānihī wa yadih.',
      translation: 'Seorang Muslim adalah orang yang kaum Muslimin lain selamat dari gangguan lisan dan tangannya.',
      meaning: 'Jagalah orang lain dari ucapan yang menyakitkan, fitnah, ancaman, kekerasan, maupun tindakan yang merugikan. Prinsip ini juga menjadi pengingat untuk bertanggung jawab di ruang digital.',
      narrator: 'Abdullah bin Amr radhiyallahu ‘anhuma', source: 'Sahih al-Bukhari 10', url: 'https://sunnah.com/bukhari:10'
    },
    {
      arabic: 'لَا ضَرَرَ وَلَا ضِرَارَ',
      transliteration: 'Lā ḍarara wa lā ḍirār.',
      translation: 'Tidak boleh menimbulkan bahaya dan tidak boleh membalas bahaya dengan bahaya.',
      meaning: 'Ajaran ini menjadi kaidah umum untuk mencegah tindakan yang merugikan diri sendiri maupun orang lain. Penerapan hukum pada kasus tertentu memerlukan penjelasan ulama.',
      narrator: 'Diriwayatkan dari beberapa jalur, termasuk Abu Sa’id al-Khudri radhiyallahu ‘anhu', source: 'Sunan Ibn Majah 2340', url: 'https://sunnah.com/ibnmajah:2340'
    },
    {
      arabic: 'الإِيمَانُ بِضْعٌ وَسَبْعُونَ شُعْبَةً، فَأَفْضَلُهَا قَوْلُ لَا إِلَهَ إِلَّا اللَّهُ، وَأَدْنَاهَا إِمَاطَةُ الأَذَى عَنِ الطَّرِيقِ، وَالْحَيَاءُ شُعْبَةٌ مِنَ الإِيمَانِ',
      transliteration: 'Al-īmānu biḍ‘un wa sab‘ūna shu‘bah; fa-afḍaluhā qawlu lā ilāha illallāh...',
      translation: 'Iman memiliki lebih dari tujuh puluh cabang. Yang paling utama adalah ucapan laa ilaaha illallah, yang paling rendah menyingkirkan gangguan dari jalan, dan malu adalah salah satu cabang iman.',
      meaning: 'Iman mencakup keyakinan, ucapan, dan perbuatan. Kebaikan sederhana seperti menyingkirkan benda berbahaya dari jalan juga bernilai dan bermanfaat bagi orang banyak.',
      narrator: 'Abu Hurairah radhiyallahu ‘anhu', source: 'Sahih Muslim 35a', url: 'https://sunnah.com/muslim:35a'
    },
    {
      arabic: 'لَا يُؤْمِنُ أَحَدُكُمْ حَتَّى يُحِبَّ لِأَخِيهِ مَا يُحِبُّ لِنَفْسِهِ',
      transliteration: 'Lā yu’minu aḥadukum ḥattā yuḥibba li-akhīhi mā yuḥibbu linafsih.',
      translation: 'Tidak sempurna iman seseorang sampai ia mencintai untuk saudaranya apa yang ia cintai untuk dirinya sendiri.',
      meaning: 'Hadits ini mengajarkan empati dan persaudaraan: perlakukan orang lain dengan adil, dukung kebaikan mereka, dan hindari iri serta merugikan sesama.',
      narrator: 'Anas bin Malik radhiyallahu ‘anhu', source: 'Sahih al-Bukhari 13', url: 'https://sunnah.com/bukhari:13'
    },
    {
      arabic: 'تَبَسُّمُكَ فِي وَجْهِ أَخِيكَ لَكَ صَدَقَةٌ',
      transliteration: 'Tabassumuka fī wajhi akhīka laka ṣadaqah.',
      translation: 'Senyummu di hadapan saudaramu bernilai sedekah bagimu.',
      meaning: 'Sedekah tidak terbatas pada harta. Sikap ramah dan menyenangkan yang tulus dapat menjadi kebaikan sosial.',
      narrator: 'Abu Dzar radhiyallahu ‘anhu', source: 'Jami‘ at-Tirmidzi 1956', url: 'https://sunnah.com/tirmidhi:1956', grade: 'Hasan menurut penilaian Darussalam yang dicantumkan Sunnah.com.'
    },
    {
      arabic: 'مَنْ كَانَ يُؤْمِنُ بِاللَّهِ وَالْيَوْمِ الْآخِرِ فَلْيَقُلْ خَيْرًا أَوْ لِيَصْمُتْ',
      transliteration: 'Man kāna yu’minu billāhi wal-yaumil-ākhiri falyaqul khairan aw liyaṣmut.',
      translation: 'Barang siapa beriman kepada Allah dan hari akhir, hendaklah berkata baik atau diam.',
      meaning: 'Sebelum berbicara atau mengirim pesan, pertimbangkan manfaat dan dampaknya. Jika tidak membawa kebaikan, diam lebih selamat.',
      narrator: 'Abu Hurairah radhiyallahu ‘anhu', source: 'Sahih al-Bukhari 6018', url: 'https://sunnah.com/bukhari:6018'
    },
    {
      arabic: 'مَنْ سَلَكَ طَرِيقًا يَلْتَمِسُ فِيهِ عِلْمًا سَهَّلَ اللَّهُ لَهُ بِهِ طَرِيقًا إِلَى الْجَنَّةِ',
      transliteration: 'Man salaka ṭarīqan yaltamisu fīhi ‘ilman sahhalallāhu lahu bihi ṭarīqan ilal-jannah.',
      translation: 'Siapa yang menempuh jalan untuk mencari ilmu, Allah akan memudahkan baginya jalan menuju surga.',
      meaning: 'Mencari ilmu yang bermanfaat memerlukan usaha, kesabaran, dan adab. Hadits ini memberi motivasi untuk terus belajar dan mengamalkan ilmu.',
      narrator: 'Abu Hurairah radhiyallahu ‘anhu', source: 'Sahih Muslim 2699a', url: 'https://sunnah.com/muslim:2699a'
    },
    {
      arabic: 'كُنْ فِي الدُّنْيَا كَأَنَّكَ غَرِيبٌ أَوْ عَابِرُ سَبِيلٍ',
      transliteration: 'Kun fid-dunyā ka’annaka gharībun aw ‘ābiru sabīl.',
      translation: 'Jadilah di dunia seakan-akan engkau orang asing atau seorang pengembara.',
      meaning: 'Hadits ini mengingatkan agar menggunakan waktu dan kehidupan dengan bijak, tidak lalai dari tanggung jawab, serta menyiapkan bekal berupa amal baik.',
      narrator: 'Abdullah bin Umar radhiyallahu ‘anhuma', source: 'Sahih al-Bukhari 6412', url: 'https://sunnah.com/bukhari:6412'
    },
    {
      arabic: 'أَحَبُّ الأَعْمَالِ إِلَى اللَّهِ أَدْوَمُهَا وَإِنْ قَلَّ',
      transliteration: 'Aḥabbul-a‘māli ilallāhi adwamuhā wa in qalla.',
      translation: 'Amal yang paling dicintai Allah adalah yang dilakukan terus-menerus meskipun sedikit.',
      meaning: 'Kebiasaan baik yang konsisten lebih mudah dijaga daripada semangat besar yang cepat terputus. Mulailah dari amalan kecil yang mampu dilakukan secara rutin.',
      narrator: 'Aisyah radhiyallahu ‘anha', source: 'Sahih al-Bukhari 6464', url: 'https://sunnah.com/bukhari:6464'
    }
  ],
  tajwid: [
    ['Idzhar','Harus dibaca jelas'], ['Ikhfa','Harus dibaca samar'], ['Idgham','Harus dibaca melebur'],
    ['Iqlab','Mengubah bunyi nun mati atau tanwin menjadi mim'], ['Mad Thabi‘i','Mad asli sepanjang dua harakat'],
    ['Mad Jaiz Munfasil','Mad yang diperbolehkan dipanjangkan di tempat terpisah'], ['Qalqalah','Bunyi pantulan pada huruf qalqalah'],
    ['Gunnah','Dengungan pada nun atau mim bertasydid']
  ],
  fikih: [
    { arabic: 'الطهارة', title: 'Thaharah: bersuci', summary: 'Bersuci dari hadas dan najis adalah dasar penting sebelum sejumlah ibadah.', details: 'Kenali perbedaan hadas dan najis. Wudu digunakan untuk mengangkat hadas kecil; mandi wajib untuk hadas besar; tayamum menjadi keringanan dalam keadaan tertentu ketika air tidak tersedia atau penggunaannya membahayakan. Pastikan air dan tempat bersuci suci serta layak digunakan.', practice: 'Periksa kebersihan badan, pakaian, dan tempat salat. Pelajari pembatal wudu dan tata cara bersuci sesuai panduan mazhab yang diikuti.', evidence: 'Al-Qur’an, Al-Ma’idah 5:6', url: 'https://quran.com/5/6' },
    { arabic: 'الوضوء', title: 'Wudu', summary: 'Wudu adalah bersuci dengan air sebelum salat dan ibadah tertentu.', details: 'Ayat wudu menyebut membasuh wajah, tangan sampai siku, mengusap kepala, dan membasuh kaki sampai mata kaki. Niat, urutan, kesinambungan, batas anggota, dan hal yang membatalkan memiliki rincian fikih; sebagian detailnya berbeda antarmazhab.', practice: 'Gunakan air secukupnya, ratakan air pada anggota wudu, dan hindari terburu-buru hingga ada bagian yang terlewat.', evidence: 'Al-Qur’an, Al-Ma’idah 5:6', url: 'https://quran.com/5/6' },
    { arabic: 'التيمم', title: 'Tayamum', summary: 'Tayamum adalah keringanan bersuci menggunakan debu atau permukaan bumi yang suci dalam kondisi yang dibenarkan.', details: 'Tayamum dapat berlaku ketika air tidak ditemukan atau penggunaannya menimbulkan bahaya, dengan syarat dan tata cara yang dijelaskan dalam fikih. Ketentuan jenis media, niat, dan batas usapan perlu dipelajari dari panduan mazhab.', practice: 'Jangan mengganti wudu dengan tayamum tanpa alasan yang dibenarkan. Jika ragu tentang kondisi kesehatan atau ketersediaan air, tanyakan kepada ahli fikih.', evidence: 'Al-Qur’an, An-Nisa 4:43', url: 'https://quran.com/4/43' },
    { arabic: 'الصلاة', title: 'Salat wajib', summary: 'Salat adalah ibadah harian yang memiliki waktu, syarat, rukun, dan tata cara tertentu.', details: 'Salat lima waktu dilaksanakan pada waktunya dengan bersuci, menutup aurat, menghadap kiblat, niat, dan rangkaian gerakan serta bacaan. Rukun dan beberapa detail praktik dapat berbeda menurut mazhab.', practice: 'Pelajari gerakan dan bacaan secara bertahap dari guru yang tepercaya. Perhatikan masuknya waktu dan usahakan salat dengan khusyuk.', evidence: 'Al-Qur’an, An-Nisa 4:103', url: 'https://quran.com/4/103' },
    { arabic: 'الصيام', title: 'Puasa Ramadan', summary: 'Puasa Ramadan adalah menahan diri dari hal-hal yang membatalkan sejak fajar hingga matahari terbenam disertai niat.', details: 'Puasa melatih takwa, disiplin, dan kepedulian. Ada rukhsah bagi keadaan tertentu seperti sakit atau perjalanan dengan aturan penggantian yang perlu dipelajari. Rincian pembatal puasa dan qada dapat berbeda dalam penerapan fikih.', practice: 'Pastikan waktu imsak dan berbuka dari sumber lokal yang tepercaya. Tanyakan kepada tenaga kesehatan dan ahli agama bila kondisi kesehatan memerlukan pertimbangan khusus.', evidence: 'Al-Qur’an, Al-Baqarah 2:183', url: 'https://quran.com/2/183' },
    { arabic: 'الزكاة', title: 'Zakat', summary: 'Zakat adalah kewajiban harta tertentu yang disalurkan kepada golongan penerima yang berhak sesuai ketentuan.', details: 'Jenis harta, nisab, haul, kadar, serta penerima zakat memiliki pembahasan fikih yang rinci. Zakat fitrah dan zakat maal juga memiliki ketentuan yang berbeda.', practice: 'Catat aset dan kewajiban secara teliti. Untuk menghitung zakat harta, gunakan panduan lembaga zakat tepercaya atau konsultasikan kepada ahli.', evidence: 'Al-Qur’an, Al-Baqarah 2:43', url: 'https://quran.com/2/43' },
    { arabic: 'الحج', title: 'Haji', summary: 'Haji adalah ibadah ke Baitullah pada waktu tertentu dan diwajibkan sekali seumur hidup bagi Muslim yang mampu.', details: 'Kemampuan mencakup aspek fisik, keamanan, dan bekal perjalanan. Ihram, wukuf, tawaf, sa’i, dan tahallul termasuk rangkaian manasik; rincian wajib, rukun, dan dam harus dipelajari dari pembimbing resmi.', practice: 'Ikuti arahan pembimbing haji dan ketentuan otoritas setempat. Jangan hanya mengandalkan ringkasan materi untuk menentukan sah atau tidaknya manasik.', evidence: 'Al-Qur’an, Ali ‘Imran 3:97', url: 'https://quran.com/3/97' },
    { arabic: 'الغسل', title: 'Mandi wajib', summary: 'Mandi wajib adalah cara bersuci dari hadas besar agar dapat kembali melakukan ibadah yang mensyaratkan kesucian.', details: 'Secara umum, air harus mengenai seluruh tubuh disertai niat menurut rincian mazhab. Sebab yang mewajibkan mandi dan tata caranya memiliki penjelasan khusus; pelajari dari guru atau kitab dasar yang tepercaya.', practice: 'Pastikan tidak ada bagian tubuh yang terhalang air dan gunakan air secara wajar. Untuk keadaan khusus, mintalah penjelasan ahli.', evidence: 'Al-Qur’an, Al-Ma’idah 5:6', url: 'https://quran.com/5/6' },
    { arabic: 'آدَابُ الطَّلَبِ', title: 'Adab menuntut ilmu agama', summary: 'Belajar agama dilakukan dengan niat baik, sumber tepercaya, sikap rendah hati, dan kesediaan bertanya.', details: 'Materi pada aplikasi ini bersifat pengantar, bukan fatwa. Untuk persoalan pribadi atau hukum yang kompleks, rujuk guru/ulama yang kompeten. Hormati adanya perbedaan pendapat fikih yang memiliki dasar.', practice: 'Catat pertanyaan, cek rujukan, hindari menyebarkan hukum tanpa konteks, dan amalkan ilmu secara bertahap.', evidence: 'Pengantar belajar; rujuk guru dan sumber ilmiah', url: 'https://quran.com/20/114' }
  ]
};

const quizQuestions = [
  { question: 'Apa arti huruf Arab “ق” dalam bahasa Indonesia?', options: ['Ba','Qaf','Mim','Dal'], answer: 'Qaf' },
  { question: 'Apa arti kata “ماء”?', options: ['Makanan','Air','Rumah','Buku'], answer: 'Air' },
  { question: 'Manakah arti “الدين النصيحة”?', options: ['Agama adalah nasihat','Hari adalah berkah','Ilmu itu cahaya','Salat itu tiang'], answer: 'Agama adalah nasihat' },
  { question: 'Qalqalah adalah bunyi…', options: ['Pantulan','Samar','Panjang','Jelas'], answer: 'Pantulan' },
  { question: 'Salat wajib dilaksanakan berapa waktu sehari?', options: ['Tiga','Empat','Lima','Tujuh'], answer: 'Lima' },
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
let quizTimer = null;
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
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify({ xp, streak, lastVisit })); } catch (_) { /* localStorage may be unavailable */ }
}

function updateStats() {
  document.getElementById('xp').textContent = xp + ' XP';
  document.getElementById('streak').textContent = streak + ' hari beruntun';
  document.getElementById('level').textContent = (Math.floor(xp / 100) + 1) + ' Level';
  document.getElementById('progress').style.width = (xp % 100) + '%';
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
    panel.innerHTML = `<h2>${title}</h2><p class="subtitle">${items.length} pilihan hadits: teks Arab, transliterasi, terjemahan, pelajaran, perawi, dan tautan sumber.</p><div class="cards hadith-grid">${items.map((item, index) => `
      <article class="card hadith-card">
        <div class="hadith-number">Hadits ${index + 1} dari ${items.length}</div>
        <span class="ar hadith-arabic" lang="ar" dir="rtl">${item.arabic}</span>
        <details class="hadith-details"><summary>Buka penjelasan lengkap</summary>
          <div class="hadith-section"><strong>Transliterasi</strong><p>${item.transliteration}</p></div>
          <div class="hadith-section"><strong>Terjemahan</strong><p>${item.translation}</p></div>
          <div class="hadith-section"><strong>Makna dan penerapan</strong><p>${item.meaning}</p></div>
          <div class="hadith-section"><strong>Perawi</strong><p>${item.narrator}</p></div>
          ${item.grade ? `<div class="hadith-section"><strong>Keterangan derajat</strong><p>${item.grade}</p></div>` : ''}
        </details>
        <a class="hadith-source" href="${item.url}" target="_blank" rel="noopener noreferrer">Rujukan: ${item.source} ↗</a>
      </article>`).join('')}</div><p class="learning-note">Terjemahan dan uraian merupakan ringkasan untuk belajar. Rujuk teks pada kitab/sumber yang ditautkan; untuk penjelasan hukum, tanyakan kepada guru yang kompeten.</p>`;
    return;
  }
  if (type === 'fikih') {
    panel.innerHTML = `<h2>Fikih</h2><p class="subtitle">${items.length} materi pengantar ibadah dan adab. Buka tiap kartu untuk membaca ringkasan, penjelasan, praktik, dan rujukan.</p><div class="cards fiqh-grid">${items.map((item, index) => `
      <article class="card fiqh-card">
        <div class="fiqh-heading"><span class="ar" lang="ar" dir="rtl">${item.arabic}</span><span class="fiqh-index">Materi ${index + 1}</span></div>
        <h3>${item.title}</h3><p>${item.summary}</p>
        <details class="fiqh-details"><summary>Baca penjelasan lengkap</summary>
          <div class="hadith-section"><strong>Penjelasan</strong><p>${item.details}</p></div>
          <div class="hadith-section"><strong>Contoh penerapan</strong><p>${item.practice}</p></div>
        </details>
        <a class="hadith-source" href="${item.url}" target="_blank" rel="noopener noreferrer">Rujukan: ${item.evidence} ↗</a>
      </article>`).join('')}</div><p class="learning-note">Materi ini pengantar belajar, bukan fatwa. Rincian hukum dapat berbeda menurut mazhab dan keadaan; tanyakan kasus khusus kepada ustaz/ulama tepercaya.</p>`;
    return;
  }
  panel.innerHTML = `<h2>${title}</h2><p class="subtitle">Materi ringkas untuk dipelajari.</p><div class="cards">${items.map(item => {
    if (item.length === 3) return `<article class="card"><span class="ar">${item[0]}</span><strong>${item[1]}</strong><p>${item[2]}</p></article>`;
    return `<article class="card"><span class="ar">${item[0]}</span><p>${item[1]}</p></article>`;
  }).join('')}</div>`;
}

function shuffled(items) {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

function startQuiz() {
  clearTimeout(quizTimer);
  quizIndex = 0;
  quizScore = 0;
  quizOrder = shuffled(quizQuestions).slice(0, 10);
  renderQuiz();
}

function renderQuiz() {
  if (quizIndex >= quizOrder.length) {
    const percentage = Math.round((quizScore / quizOrder.length) * 100);
    panel.innerHTML = `<div class="quiz result"><h2>Hasil Kuis</h2><strong>${quizScore}/${quizOrder.length}</strong><p>Nilai akhir: ${percentage}</p><p>${percentage >= 70 ? 'Bagus! Kamu sudah menguasai materi dasar.' : 'Terus belajar, hasilmu akan semakin baik!'}</p><p>XP dari jawaban benar sudah disimpan.</p><button class="restart" id="restartQuiz">Ulangi Kuis</button></div>`;
    document.getElementById('restartQuiz').addEventListener('click', startQuiz);
    return;
  }
  const current = quizOrder[quizIndex];
  panel.innerHTML = `<h2>Kuis</h2><p class="subtitle">Jawab 10 soal dari huruf Hijaiyah, kosakata, hadits, tajwid, dan fikih.</p><div class="quiz"><div class="quiz-meta"><span>Soal ${quizIndex + 1} dari ${quizOrder.length}</span><span>Skor ${quizScore}</span></div><h3>${current.question}</h3><div class="options">${shuffled(current.options).map(option => `<button class="option" data-answer="${option}">${option}</button>`).join('')}</div></div>`;
  document.querySelectorAll('.option').forEach(btn => btn.addEventListener('click', () => {
    if (btn.disabled) return;
    const correct = btn.dataset.answer === current.answer;
    btn.classList.add(correct ? 'correct' : 'wrong');
    if (correct) { quizScore++; xp += 10; saveProgress(); updateStats(); }
    document.querySelectorAll('.option').forEach(b => b.disabled = true);
    quizTimer = setTimeout(() => { quizIndex++; renderQuiz(); }, 650);
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
  clearTimeout(quizTimer);
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
