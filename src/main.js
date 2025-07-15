import './style.css';

window.addEventListener('DOMContentLoaded', () => {
  
  const welcomeScreen = document.getElementById('welcomeScreen');
  const startBtn = document.getElementById('startBtn');
  const loadingScreen = document.getElementById('loadingScreen');
  const screen3 = document.getElementById('screen3');
  const audio = document.getElementById('bgMusic');
  audio.loop = true;

  const startIndex = 1000;
  const endIndex = 1991;
  const nbImages = endIndex - startIndex + 1;
  const pageLength = 60;

  let musicStarted = false;

  // Au début, on montre uniquement l'écran d'accueil
  welcomeScreen.style.display = 'flex';  // ou 'block' selon ton CSS
  loadingScreen.style.display = 'none';
  screen3.style.display = 'none';

  let images = [];
  let loadedCount = 0;

  function startMusic() {
    if (!musicStarted) {
      audio.play().then(() => {
        musicStarted = true;
      }).catch(() => {
        // autoplay bloqué, on ignore
      });
    }
  }

  function initScroll() {
    document.body.style.height = `${pageLength * window.innerHeight}px`;

    function onScroll() {
      startMusic();
      const scrollY = window.scrollY;
      const progress = scrollY / ((pageLength - 1) * window.innerHeight);
      let index = Math.floor(progress * nbImages);
      index = Math.max(0, Math.min(index, nbImages - 1));

      const imgs = screen3.children;
      for (let i = 0; i < nbImages; i++) {
        if (i === index) {
          imgs[i].classList.add('visible');
          imgs[i].classList.remove('hidden');
        } else {
          imgs[i].classList.add('hidden');
          imgs[i].classList.remove('visible');
        }
      }
    }

    window.addEventListener('scroll', onScroll);
    onScroll();
  }

  startBtn.addEventListener('click', () => {
    // Dès qu'on clique, on masque accueil, on affiche chargement
    welcomeScreen.style.display = 'none';
    loadingScreen.style.display = 'flex';

    images = [];
    loadedCount = 0;

    const minLoadingDuration = 6000; // Durée minimale du chargement en ms (6s)
    const startTime = performance.now();

    for (let i = startIndex; i <= endIndex; i++) {
      const img = new Image();
      img.src = `adrieng/IMG_7994_${i}.jpg`;
      img.classList.add('hidden');
      img.onload = () => {
        loadedCount++;
        loadingScreen.textContent = `Chargement des images... (${loadedCount} / ${nbImages})`;

        if (loadedCount === nbImages) {
          const elapsedTime = performance.now() - startTime;
          const waitTime = Math.max(0, minLoadingDuration - elapsedTime);
          setTimeout(() => {
            loadingScreen.style.display = 'none';
            screen3.style.display = 'block';
            images.forEach(image => screen3.appendChild(image));
            initScroll();
          }, waitTime);
        }
      };
      images.push(img);
    }
  });

  window.addEventListener('scroll', startMusic);
});
