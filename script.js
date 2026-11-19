const letters = [
  ['ا','Alif','a'], ['ب','Ba','b'], ['ت','Ta','t'], ['ث','Tsa','ts'], ['ج','Jim','j'], ['ح','Ha','h'], ['خ','Kha','kh'], ['د','Dal','d'],
  ['ذ','Dzal','dz'], ['ر','Ra','r'], ['ز','Zai','z'], ['س','Sin','s'], ['ش','Syin','sy'], ['ص','Shad','sh'], ['ض','Dhad','dh'], ['ط','Tha','th'],
  ['ظ','Zha','zh'], ['ع','‘Ain','‘'], ['غ','Ghain','gh'], ['ف','Fa','f'], ['ق','Qaf','q'], ['ك','Kaf','k'], ['ل','Lam','l'], ['م','Mim','m'],
  ['ن','Nun','n'], ['و','Wawu','w'], ['ه','Ha','h'], ['ء','Hamzah','‘'], ['ي','Ya','y']
];

const extra = {
  kosakata: [
    ['كتاب','Kitab','buku'], ['قلم','Qalam','pulpen'], ['بيت','Bayt','rumah'], ['ماء','Ma’','air'], ['مدرسة','Madrasah','sekolah'], ['علم','Ilm','ilmu']
  ],
  hadits: [
    ['الإيمان بضع وستون شعبة','“Iman memiliki lebih dari tujuh puluh cabang.”'],
    ['خيركم من تعلم القرآن وعلمه','“Orang terbaik adalah yang belajar Al-Qur’an dan mengajarkannya.”'],
    ['الدين النصيحة','“Agama adalah nasihat.”']
  ],
  tajwid: [
    ['Idzhar','Harus dibaca jelas'], ['Ikhfa','Harus dibaca samar'], ['Idgham','Harus dibaca melebur'], ['Iqlab','Mengubah bunyi menjadi mim']
  ],
  fikih: [
    ['الوضوء','Wudhu','Membersihkan anggota badan untuk salat'], ['الصلاة','Salat','Ibadah wajib lima waktu'], ['الصيام','Puasa','Menahan diri dari hal yang membatalkan']
  ]
};

let selected = 0;
let xp = 44;
let soundEnabled = true;
const panel = document.getElementById('panel');

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
    selected = Number(btn.dataset.index); renderLetters(); speak(letters[selected][0]);
  }));
  document.getElementById('listenLetter').addEventListener('click', () => speak(ar));
}

function renderCards(type) {
  const items = extra[type];
  panel.innerHTML = `<h2>${type[0].toUpperCase()+type.slice(1)}</h2><p class="subtitle">Materi ringkas untuk dipelajari.</p><div class="cards">${items.map(item => `<article class="card"><span class="ar">${item[0]}</span><strong>${item[1]}</strong><span>${item[2]}</span></article>`).join('')}</div>`;
}

function renderQuiz() {
  const current = letters[Math.floor(Math.random()*letters.length)];
  const wrong = letters.filter(l => l[0] !== current[0]).sort(() => Math.random()-0.5).slice(0,3);
  const options = [current, ...wrong].sort(() => Math.random()-0.5);
  panel.innerHTML = `<h2>Kuis huruf</h2><p class="subtitle">Pilih nama yang tepat untuk huruf berikut.</p><div class="quiz"><div class="arabic" style="font-size:70px">${current[0]}</div><div class="options">${options.map(l=>`<button class="option" data-answer="${l[1]}">${l[1]}</button>`).join('')}</div></div>`;
  document.querySelectorAll('.option').forEach(btn => btn.addEventListener('click', () => {
    const correct = btn.dataset.answer === current[1];
    btn.classList.add(correct?'correct':'wrong');
    if (correct) { xp += 10; document.getElementById('xp').textContent = xp+' XP'; document.getElementById('progress').style.width = Math.min(xp,100)+'%'; }
    document.querySelectorAll('.option').forEach(b => b.disabled=true);
    setTimeout(renderQuiz, 850);
  }));
}

function speak(text) {
  if (!soundEnabled || !('speechSynthesis' in window)) return;
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'ar-SA';
  speechSynthesis.cancel(); speechSynthesis.speak(utterance);
}

function activateTab(type) {
  document.querySelectorAll('.tab').forEach(t => t.classList.toggle('active', t.dataset.tab===type));
  if (type === 'huruf') renderLetters();
  else if (type === 'kuis') renderQuiz();
  else renderCards(type);
}

document.querySelectorAll('.tab').forEach(tab => tab.addEventListener('click', () => activateTab(tab.dataset.tab)));
document.getElementById('practiceBtn').addEventListener('click', () => activateTab('kuis'));
document.getElementById('soundBtn').addEventListener('click', e => {
  soundEnabled = !soundEnabled;
  e.target.textContent = 'Efek suara: ' + (soundEnabled?'hidup':'mati');
});

renderLetters();
