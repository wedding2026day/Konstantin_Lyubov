const startBtn = document.getElementById("startBtn");
const startScreen = document.getElementById("startScreen");
const siteContent = document.getElementById("siteContent");

const bgMusic = document.getElementById("bgMusic");
const musicBtn = document.getElementById("musicBtn");

const openFormBtn = document.getElementById("openFormBtn");
const block6FormWrap = document.getElementById("block6FormWrap");
const block6Form = document.getElementById("block6Form");

const revealItems = document.querySelectorAll(".reveal");

/* стартовый экран */
if (startBtn && startScreen && siteContent) {
  startBtn.addEventListener("click", function () {
    startScreen.classList.add("hide");
    siteContent.classList.add("show");

    if (bgMusic) {
      bgMusic.play().catch(() => {});
      if (musicBtn) {
        musicBtn.classList.remove("off");
      }
    }
  });
}

/* музыка */
if (musicBtn && bgMusic) {
  musicBtn.addEventListener("click", function () {
    if (bgMusic.paused) {
      bgMusic.play().catch(() => {});
      musicBtn.classList.remove("off");
    } else {
      bgMusic.pause();
      musicBtn.classList.add("off");
    }
  });
}

/* анкета показать / скрыть */
if (openFormBtn && block6FormWrap) {
  openFormBtn.addEventListener("click", function () {
    block6FormWrap.classList.toggle("show");
  });
}

/* отправка формы на почту без перехода */
const partnerRadios = document.querySelectorAll('input[name="Гость"]');
const partnerField = document.getElementById('partnerField');
const partnerInput = partnerField.querySelector('input');

partnerRadios.forEach(radio => {
  radio.addEventListener('change', () => {
    if (radio.value === 'Буду с парой' && radio.checked) {
      partnerField.classList.add('show');
      partnerInput.required = true;
    } else {
      partnerField.classList.remove('show');
      partnerInput.required = false;
      partnerInput.value = '';
    }
  });
});

const allergyRadios = document.querySelectorAll('input[name="Аллергия"]');
const allergyField = document.getElementById('allergyField');
const allergyInput = allergyField.querySelector('input');

allergyRadios.forEach(radio => {
  radio.addEventListener('change', () => {
    if (radio.value === 'Да' && radio.checked) {
      allergyField.classList.add('show');
      allergyInput.required = true;
    } else {
      allergyField.classList.remove('show');
      allergyInput.required = false;
      allergyInput.value = '';
    }
  });
});

/* плавное появление блоков */
if (revealItems.length) {
  const observer = new IntersectionObserver(
    function (entries) {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
        }
      });
    },
    {
      threshold: 0.15
    }
  );

  revealItems.forEach((item) => {
    observer.observe(item);
  });
}

/* таймер */
const daysEl = document.getElementById("days");
const hoursEl = document.getElementById("hours");
const minutesEl = document.getElementById("minutes");
const secondsEl = document.getElementById("seconds");

/* поставь свою дату свадьбы */
const weddingDate = new Date("2026-07-11T00:00:00").getTime();

function updateTimer() {
  const now = new Date().getTime();
  const distance = weddingDate - now;

  if (distance <= 0) {
    if (daysEl) daysEl.textContent = "00";
    if (hoursEl) hoursEl.textContent = "00";
    if (minutesEl) minutesEl.textContent = "00";
    if (secondsEl) secondsEl.textContent = "00";
    return;
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((distance / (1000 * 60)) % 60);
  const seconds = Math.floor((distance / 1000) % 60);

  if (daysEl) daysEl.textContent = String(days).padStart(2, "0");
  if (hoursEl) hoursEl.textContent = String(hours).padStart(2, "0");
  if (minutesEl) minutesEl.textContent = String(minutes).padStart(2, "0");
  if (secondsEl) secondsEl.textContent = String(seconds).padStart(2, "0");
}

if (daysEl && hoursEl && minutesEl && secondsEl) {
  updateTimer();
  setInterval(updateTimer, 1000);
}