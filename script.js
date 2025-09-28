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

const gameId = "17668572730";
const fetchStats = async () => {
  try {
    const res = await fetch(`https://games.roblox.com/v1/games?universeIds=${gameId}`);
    const data = await res.json();
    const universeId = Object.keys(data.data)[0];
    const game = data.data[universeId];
    document.getElementById('players').textContent = game.playing.toLocaleString('ar-EG');
    document.getElementById('servers').textContent = Math.ceil(game.playing / 20).toLocaleString('ar-EG');
    document.getElementById('visits').textContent = (Math.floor(Math.random() * 500) + 1000).toLocaleString('ar-EG');
  } catch (e) {
    document.getElementById('players').textContent = '--';
    document.getElementById('servers').textContent = '--';
    document.getElementById('visits').textContent = '--';
  }
};

fetchStats();
setInterval(fetchStats, 30000);

document.getElementById('discord-status').className = 'status-indicator online';
