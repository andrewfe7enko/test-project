// Телеграм API (работает в webview). За пределами Телеграма код не падает.
const tg = window.Telegram?.WebApp;
if (tg) {
  tg.expand();
  tg.ready();
}

const gameSelect = document.getElementById('gameSelect');
const analyzeBtn = document.getElementById('analyzeBtn');
const resetBtn = document.getElementById('resetBtn');
const fileInput = document.getElementById('fileInput');
const dropzone  = document.getElementById('dropzone');
const preview   = document.getElementById('preview');

const progress  = document.getElementById('progress');
const pText     = document.getElementById('pText');
const barFill   = document.getElementById('barFill');

const resultBox = document.getElementById('result');
const rGame = document.getElementById('rGame');
const rIdx  = document.getElementById('rIdx');
const rSpins= document.getElementById('rSpins');
const rProb = document.getElementById('rProb');

// Активируем "Анализ", когда выбранна игра и есть картинка
function updateAnalyzeState() {
  analyzeBtn.disabled = !(gameSelect.value && preview.src && preview.style.display === 'block');
}
gameSelect.addEventListener('change', updateAnalyzeState);

// Зона загрузки
dropzone.addEventListener('click', () => fileInput.click());
dropzone.addEventListener('dragover', (e) => { e.preventDefault(); dropzone.classList.add('hover'); });
dropzone.addEventListener('dragleave', () => dropzone.classList.remove('hover'));
dropzone.addEventListener('drop', (e) => {
  e.preventDefault(); dropzone.classList.remove('hover');
  if (e.dataTransfer.files?.[0]) handleFile(e.dataTransfer.files[0]);
});
fileInput.addEventListener('change', (e) => {
  if (e.target.files?.[0]) handleFile(e.target.files[0]);
});

function handleFile(file){
  if (!file.type.startsWith('image/')) return;
  const reader = new FileReader();
  reader.onload = () => {
    preview.src = reader.result;
    preview.style.display = 'block';
    if (tg?.HapticFeedback) tg.HapticFeedback.impactOccurred('light');
    updateAnalyzeState();
  };
  reader.readAsDataURL(file);
}

// Кнопка "Анализ" — имитация прогресса и рандомные цифры
analyzeBtn.addEventListener('click', () => {
  progress.classList.remove('hidden');
  resultBox.classList.add('hidden');
  pText.textContent = 'Анализ…';

  let pct = 0;
  barFill.style.width = '0%';
  const timer = setInterval(() => {
    pct = Math.min(100, pct + Math.floor(Math.random()*15)+5);
    barFill.style.width = pct + '%';
    if (pct >= 100) {
      clearInterval(timer);
      setTimeout(showResults, 250);
    }
  }, 180);
});

function showResults(){
  // Случайные значения: можно настроить диапазоны как угодно
  const idx   = randInt(10, 999);     // "Индекс ×"
  const spins = randInt(3, 180);      // прогноз спинов
  const prob  = randInt(5, 98);       // псевдо-вероятность %

  rGame.textContent = gameSelect.value;
  rIdx.textContent  = idx;
  rSpins.textContent= spins;
  rProb.textContent = prob + '%';

  progress.classList.add('hidden');
  resultBox.classList.remove('hidden');

  if (tg?.HapticFeedback) tg.HapticFeedback.notificationOccurred('success');
  if (tg?.MainButton) {
    // Показать/изменить главную кнопку Telegram (необязательно)
    tg.MainButton.setText('Готово').show().onClick(() => tg.close());
  }
}

function randInt(min,max){ return Math.floor(Math.random()*(max-min+1))+min; }

// "Ещё раз" — сброс
resetBtn.addEventListener('click', () => {
  gameSelect.value = '';
  preview.removeAttribute('src');
  preview.style.display = 'none';
  resultBox.classList.add('hidden');
  progress.classList.add('hidden');
  barFill.style.width = '0%';
  analyzeBtn.disabled = true;
  if (tg?.HapticFeedback) tg.HapticFeedback.impactOccurred('light');
});

// Кнопка "Назад" (внутри webview можно повесить аппаратную кнопку Telegram)
document.getElementById('backBtn').addEventListener('click', (e) => {
  e.preventDefault();
  if (tg?.BackButton){ tg.BackButton.show(); tg.BackButton.onClick(() => tg.close()); }
  else window.history.back();
});
