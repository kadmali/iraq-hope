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

function animateValue(e, s, n, t = 800) {
  let a = null;
  const r = i => {
    a || (a = i);
    const l = Math.min((i - a) / t, 1);
    const o = Math.floor(l * (n - s) + s);
    e.textContent = o.toLocaleString('ar-EG');
    l < 1 && requestAnimationFrame(r);
  };
  requestAnimationFrame(r);
}

const PLACE_ID = "17668572730";
let currentPlayers = 0;

const fetchPlayers = async () => {
  try {
    const placeRes = await fetch(`https://games.roblox.com/v1/games/multiget?placeIds=${PLACE_ID}`);
    const placeData = await placeRes.json();
    if (!placeData || placeData.length === 0 || !placeData[0].universeId) throw new Error("Place not found");
    const universeId = placeData[0].universeId;
    const gameRes = await fetch(`https://games.roblox.com/v1/games?universeIds=${universeId}`);
    const gameData = await gameRes.json();
    if (!gameData.data || gameData.data.length === 0) throw new Error("Game data not found");
    const players = gameData.data[0].playing || 0;
    const visits = Math.max(800, Math.floor(players * 1.8));
    if (players !== currentPlayers) {
      animateValue(document.getElementById('players'), currentPlayers, players, 900);
      currentPlayers = players;
    }
    document.getElementById('visits').textContent = visits.toLocaleString('ar-EG');
  } catch (err) {
    document.getElementById('players').textContent = '—';
    document.getElementById('visits').textContent = '—';
  }
};

fetchPlayers();
setInterval(fetchPlayers, 25000);
