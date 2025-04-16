function runStory(pages, nextPage) {
    const storyText = document.getElementById("storyText");
    const nextBtn = document.getElementById("nextBtn");
    let pageIndex = 0;
  
    function showPage(index) {
      storyText.style.opacity = 0;
      setTimeout(() => {
        storyText.textContent = pages[index];
        storyText.style.opacity = 1;
      }, 300);
    }
  
    nextBtn.addEventListener("click", () => {
      pageIndex++;
      if (pageIndex < pages.length) {
        showPage(pageIndex);
      } else {
        if (nextPage) {
          window.location.href = nextPage;
        } else {
          nextBtn.disabled = true;
          nextBtn.style.background = "#ccc";
          nextBtn.style.cursor = "not-allowed";
        }
      }
    });
  
    window.onload = () => showPage(0);
  }
  // Dark/Light Mode Toggle
const toggleBtn = document.getElementById("mode-toggle");
const body = document.body;

// Load previous mode from localStorage
if (localStorage.getItem("theme") === "dark") {
  body.classList.add("dark-mode");
  toggleBtn.textContent = "☀️";
}

// Toggle theme
toggleBtn.addEventListener("click", () => {
  body.classList.toggle("dark-mode");
  const isDark = body.classList.contains("dark-mode");
  toggleBtn.textContent = isDark ? "☀️" : "🌙";
  localStorage.setItem("theme", isDark ? "dark" : "light");
});

// Dummy chapter navigation function
function nextChapter(link) {
  window.location.href = link;
}

// Sword Cursor Trail Effect
const canvas = document.getElementById("cursorTrail");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let trail = [];

document.addEventListener("mousemove", (e) => {
  trail.push({ x: e.clientX, y: e.clientY, time: Date.now() });
});

function animateTrail() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const now = Date.now();
  trail = trail.filter((p) => now - p.time < 300);

  for (let i = 0; i < trail.length; i++) {
    ctx.beginPath();
    ctx.arc(trail[i].x, trail[i].y, 2, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255, 0, 0, ${(1 - (now - trail[i].time) / 300)})`;
    ctx.fill();
  }
  requestAnimationFrame(animateTrail);
}

animateTrail();
// Enable horizontal scrolling with mouse wheel
const chapter = document.querySelector('.chapter');

chapter.addEventListener('wheel', function(event) {
  if (event.deltaY !== 0) {
    event.preventDefault();
    chapter.scrollLeft += event.deltaY;
  }
}, { passive: false });
