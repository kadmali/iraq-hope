const audio = document.getElementById('qasiida');
const btn = document.getElementById('soundBtn');
const panel = document.getElementById('soundPanel');
const playBtn = document.getElementById('playAudioBtn');
const slider = document.getElementById('volumeSlider');
const muteBtn = document.getElementById('muteBtn');
const unmuteBtn = document.getElementById('unmuteBtn');
const closeBtn = document.getElementById('closePanel');
const cursor = document.getElementById('cursor');

document.addEventListener('pointermove', e => {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top = e.clientY + 'px';
});

playBtn.addEventListener('click', () => {
  audio.volume = slider.value / 100;
  audio.play().catch(e => console.log("فشل التشغيل"));
  playBtn.textContent = "مشغل الآن 🎧";
  playBtn.disabled = true;
});

btn.addEventListener('click', () => {
  panel.classList.toggle('active');
});

closeBtn.addEventListener('click', () => {
  panel.classList.remove('active');
});

slider.addEventListener('input', () => {
  audio.volume = slider.value / 100;
});

muteBtn.addEventListener('click', () => {
  audio.muted = true;
});

unmuteBtn.addEventListener('click', () => {
  audio.muted = false;
});

// ====== دالة عرض العدد بتأثير حركي ======
function animateValue(element, start, end, duration) {
  let startTimestamp = null;
  const step = (timestamp) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    const value = Math.floor(progress * (end - start) + start);
    element.textContent = value.toLocaleString('ar-EG');
    if (progress < 1) {
      window.requestAnimationFrame(step);
    }
  };
  window.requestAnimationFrame(step);
}

// ====== جلب عدد اللاعبين من روبلوكس ======
const gameId = "17668572730";
let lastPlayerCount = 0;

const fetchStats = async () => {
  try {
    const res = await fetch(`https://games.roblox.com/v1/games?universeIds=${gameId}`);
    const data = await res.json();
    
    if (!data.data || !data.data[0]) {
      throw new Error("No data");
    }

    const players = data.data[0].playing || 0;
    const visits = Math.max(800, Math.floor(players * 1.8)); // كما في كودك

    // تحديث عدد اللاعبين بتأثير حركي
    if (players !== lastPlayerCount) {
      animateValue(document.getElementById('players'), lastPlayerCount, players, 800);
      lastPlayerCount = players;
    }

    document.getElementById('visits').textContent = visits.toLocaleString('ar-EG');

  } catch (e) {
    document.getElementById('players').textContent = '---';
    document.getElementById('visits').textContent = '---';
  }
};

fetchStats();
setInterval(fetchStats, 30000);
