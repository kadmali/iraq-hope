// تفعيل الصوت بأمان
document.body.addEventListener('click', () => {}, { once: true });

const audio = document.getElementById('qasiida');
const btn = document.getElementById('soundBtn');
const panel = document.getElementById('soundPanel');
const playBtn = document.getElementById('playAudioBtn');
const slider = document.getElementById('volumeSlider');
const muteBtn = document.getElementById('muteBtn');
const unmuteBtn = document.getElementById('unmuteBtn');
const closeBtn = document.getElementById('closePanel');
const cursor = document.getElementById('cursor');

// مؤشر مخصص
document.addEventListener('pointermove', e => {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top = e.clientY + 'px';
});

// تشغيل الصوت
playBtn.addEventListener('click', () => {
  audio.volume = slider.value / 100;
  audio.play()
    .then(() => {
      playBtn.textContent = "مشغل الآن 🎧";
      playBtn.disabled = true;
    })
    .catch(e => {
      alert("من فضلك اضغط في أي مكان بالصفحة أولًا، ثم جرّب تشغيل الصوت.");
    });
});

// فتح/إغلاق لوحة الصوت
btn.addEventListener('click', () => panel.classList.toggle('active'));
closeBtn.addEventListener('click', () => panel.classList.remove('active'));

// التحكم بالصوت
slider.addEventListener('input', () => { audio.volume = slider.value / 100; });
muteBtn.addEventListener('click', () => { audio.muted = true; });
unmuteBtn.addEventListener('click', () => { audio.muted = false; });

// =============== جلب إحصائيات روبلوكس ===============
const PLACE_ID = "17668572730"; // لا تغيّره

const fetchStats = async () => {
  try {
    // 1. احصل على Universe ID من Place ID
    const placeRes = await fetch(`https://games.roblox.com/v1/games/multiget?placeIds=${PLACE_ID}`);
    const placeData = await placeRes.json();
    
    if (!placeData || placeData.length === 0) throw new Error("Place not found");
    const universeId = placeData[0].universeId;

    // 2. احصل على الإحصائيات
    const universeRes = await fetch(`https://games.roblox.com/v1/games?universeIds=${universeId}`);
    const universeData = await universeRes.json();
    
    if (!universeData.data || universeData.data.length === 0) throw new Error("Stats not found");

    const game = universeData.data[0];
    document.getElementById('players').textContent = (game.playing || 0).toLocaleString('ar-EG');
    document.getElementById('visits').textContent = (game.visits || 0).toLocaleString('ar-EG');

  } catch (e) {
    console.error("فشل تحميل الإحصائيات:", e);
    document.getElementById('players').textContent = '—';
    document.getElementById('visits').textContent = '—';
  }
};

fetchStats();
setInterval(fetchStats, 30000); // تحديث كل 30 ثانية
