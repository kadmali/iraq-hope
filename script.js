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
    
    if (!data.data || !data.data[gameId]) {
      throw new Error("No data");
    }

    const players = data.data[gameId].playing;
    document.getElementById('players').textContent = players.toLocaleString('ar-EG');

    const visits = Math.max(800, Math.floor(players * 1.8));
    document.getElementById('visits').textContent = visits.toLocaleString('ar-EG');

  } catch (e) {
    document.getElementById('players').textContent = '---';
    document.getElementById('visits').textContent = '---';
  }
};

fetchStats();
setInterval(fetchStats, 30000);

document.getElementById('discord-status')?.classList.add('online');
