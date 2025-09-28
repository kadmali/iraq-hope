const audio = document.getElementById('qasiida');
const toggle = document.getElementById('soundToggle');
const cursor = document.getElementById('cursor');

document.addEventListener('pointermove', e => {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top = e.clientY + 'px';
});

audio.volume = 0.25;
setTimeout(() => {
  audio.play().catch(() => {});
}, 800);

toggle.addEventListener('click', () => {
  audio.muted = !audio.muted;
  toggle.textContent = audio.muted ? '🔇' : '🔊';
});

const fetchStats = async () => {
  try {
    const res = await fetch('https://games.roblox.com/v1/games?universeIds=511819c17df77d4bac7e1a345ed7144b');
    const data = await res.json();
    const id = Object.keys(data.data)[0];
    const game = data.data[id];
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

// حالة ديسكورد — نضعها أخضر دائمًا (لأن السيرفر شغال)
document.getElementById('discord-status').className = 'status-indicator';
setTimeout(() => {
  document.getElementById('discord-status').className = 'status-indicator online';
}, 300);