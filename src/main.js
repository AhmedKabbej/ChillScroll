import './style.css';

window.addEventListener('DOMContentLoaded', () => {
    
  const welcomeScreen = document.getElementById('welcomeScreen');
  const startBtn = document.getElementById('startBtn');
  const screen3 = document.getElementById('screen3');
  const audio = document.getElementById('bgMusic');
  audio.loop = true;

  const startIndex = 1000;
  const endIndex = 1991;
  const nbImages = endIndex - startIndex + 1;
  const pageLength = 60;

  let musicStarted = false;

  function startMusic() {
    if (!musicStarted) {
      audio.play().then(() => {
        musicStarted = true;
      }).catch(() => {
        // autoplay bloqué, ne rien faire
      });
    }
  }

  function initScroll() {
    welcomeScreen.style.display = 'none';
    screen3.style.display = 'block';
    document.body.style.height = `${pageLength * window.innerHeight}px`;

    if (!screen3.hasChildNodes()) {
      for (let i = startIndex; i <= endIndex; i++) {
        const img = document.createElement('img');
        img.src = `/adrieng/IMG_7994_${i}.jpg`;
        img.classList.add('hidden');
        screen3.appendChild(img);
      }
    }

    function onScroll() {
      startMusic();
      const scrollY = window.scrollY;
      const progress = scrollY / ((pageLength - 1) * window.innerHeight);
      let index = Math.floor(progress * nbImages);

      index = Math.max(0, Math.min(index, nbImages - 1));

      const images = screen3.children;
      for (let i = 0; i < nbImages; i++) {
        if (i === index) {
          images[i].classList.add('visible');
          images[i].classList.remove('hidden');
        } else {
          images[i].classList.add('hidden');
          images[i].classList.remove('visible');
        }
      }
    }

    window.addEventListener('scroll', onScroll);
    onScroll();
  }

  startBtn.addEventListener('click', initScroll);
  window.addEventListener('scroll', startMusic); 
});