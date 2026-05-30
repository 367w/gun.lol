const badges = [
  { title: "Staff", src: "./assets/badges/staff.gif" },
  { title: "Helper", src: "./assets/badges/helper.png" },
  { title: "Premium", src: "./assets/badges/premium.png" },
  { title: "Verified", src: "./assets/badges/verified.gif" },
  { title: "Donor", src: "./assets/badges/donor.png" },
  { title: "Gifter", src: "./assets/badges/gifter.png" },
  { title: "Image Host", src: "./assets/badges/image_host.png" },
  { title: "Domain Legend", src: "./assets/badges/domain_legend.png" },
  { title: "OG", src: "./assets/badges/og.png" },
  { title: "Server Booster", src: "./assets/badges/server_booster.png" },
  { title: "Hone.gg", src: "./assets/badges/hone.png" },
  { title: "Bug Hunter", src: "./assets/badges/bug_hunter.png" },
  { title: "Easter 2026", src: "./assets/badges/easter_2026.png" },
  { title: "Christmas 2025", src: "./assets/badges/christmas_2025.png" },
  { title: "Easter 2025", src: "./assets/badges/easter_2025.png" },
  { title: "Christmas 2024", src: "./assets/badges/christmas_2024.png" },
  { title: "The Million", src: "./assets/badges/the_million.png" },
  { title: "Winner", src: "./assets/badges/winner.png" },
  { title: "Second Place", src: "./assets/badges/second_place.svg" },
  { title: "Third Place", src: "./assets/badges/third_place.svg" }
];

const badgeRow = document.getElementById("badge-row");
badges.forEach((badge, index) => {
  const wrap = document.createElement("span");
  wrap.className = "badge";
  wrap.dataset.title = badge.title;
  wrap.style.animation = `badgePop .45s ${index * 0.025}s both`;
  const img = document.createElement("img");
  img.src = badge.src;
  img.alt = badge.title;
  img.loading = "eager";
  wrap.appendChild(img);
  badgeRow.appendChild(wrap);
});

const style = document.createElement("style");
style.textContent = `
@keyframes badgePop{from{opacity:0;transform:translateY(8px) scale(.7)}to{opacity:1;transform:translateY(0) scale(1)}}
.particle{position:fixed;width:2px;height:2px;border-radius:50%;background:white;pointer-events:none;z-index:-1;box-shadow:0 0 10px white;animation:particle var(--d) linear infinite}
@keyframes particle{from{transform:translate3d(var(--x),110vh,0);opacity:0}12%{opacity:.75}to{transform:translate3d(calc(var(--x) + var(--drift)),-10vh,0);opacity:0}}
`;
document.head.appendChild(style);

for (let i = 0; i < 90; i++) {
  const p = document.createElement("span");
  p.className = "particle";
  p.style.setProperty("--x", `${Math.random() * 100}vw`);
  p.style.setProperty("--drift", `${(Math.random() - 0.5) * 120}px`);
  p.style.setProperty("--d", `${7 + Math.random() * 13}s`);
  p.style.animationDelay = `${Math.random() * -18}s`;
  p.style.opacity = `${0.2 + Math.random() * 0.8}`;
  document.body.appendChild(p);
}

const hexLayer = document.getElementById("hex-particles");
for (let i = 0; i < 26; i++) {
  const hex = document.createElement("span");
  hex.className = "hex-p";
  hex.style.setProperty("--x", `${Math.random() * 100}vw`);
  hex.style.setProperty("--drift", `${(Math.random() - 0.5) * 240}px`);
  hex.style.setProperty("--time", `${10 + Math.random() * 18}s`);
  hex.style.animationDelay = `${Math.random() * -22}s`;
  hex.style.transform = `scale(${0.55 + Math.random() * 1.25})`;
  hexLayer.appendChild(hex);
}

const card = document.getElementById("profile-card");
document.addEventListener("mousemove", (event) => {
  if (window.innerWidth <= 720 || !document.body.classList.contains("entered")) return;
  const rect = card.getBoundingClientRect();
  const x = event.clientX - (rect.left + rect.width / 2);
  const y = event.clientY - (rect.top + rect.height / 2);
  const rotateY = Math.max(-10, Math.min(10, x / 52));
  const rotateX = Math.max(-10, Math.min(10, -y / 52));
  card.style.transform = `translate(-50%, -50%) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
});
card.addEventListener("mouseleave", () => {
  if (window.innerWidth > 720) card.style.transform = "translate(-50%, -50%) rotateX(0) rotateY(0)";
});

const enterScreen = document.getElementById("enter-screen");
const music = document.getElementById("music");
const toggle = document.getElementById("sound-toggle");
const playPause = document.getElementById("play-pause");
const progress = document.getElementById("progress");
const currentTime = document.getElementById("current-time");
const duration = document.getElementById("duration");
const viewCount = document.getElementById("view-count");
let playing = false;

function fmt(seconds) {
  if (!Number.isFinite(seconds)) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}

function animateViews() {
  const target = 748138;
  const durationMs = 1600;
  const start = performance.now();
  function tick(now) {
    const t = Math.min(1, (now - start) / durationMs);
    const eased = 1 - Math.pow(1 - t, 4);
    const value = Math.floor(target * eased);
    viewCount.textContent = value.toLocaleString("en-US");
    if (t < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

async function playMusic() {
  try {
    music.volume = 0.34;
    await music.play();
    playing = true;
    toggle.textContent = "🔊";
    playPause.textContent = "Ⅱ";
  } catch (error) {
    console.warn("Audio blocked:", error);
  }
}

function pauseMusic() {
  music.pause();
  playing = false;
  toggle.textContent = "🔇";
  playPause.textContent = "▶";
}

enterScreen.addEventListener("click", async () => {
  enterScreen.classList.add("closed");
  document.body.classList.add("entered");
  animateViews();
  await playMusic();
});

toggle.addEventListener("click", () => playing ? pauseMusic() : playMusic());
playPause.addEventListener("click", () => playing ? pauseMusic() : playMusic());

music.addEventListener("loadedmetadata", () => {
  duration.textContent = fmt(music.duration || 101);
});

music.addEventListener("timeupdate", () => {
  currentTime.textContent = fmt(music.currentTime);
  if (music.duration) progress.value = (music.currentTime / music.duration) * 100;
});

progress.addEventListener("input", () => {
  if (music.duration) music.currentTime = (progress.value / 100) * music.duration;
});

window.addEventListener("resize", () => {
  if (window.innerWidth <= 720) card.style.transform = "none";
});
