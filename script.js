document.addEventListener('DOMContentLoaded', () => {
  const quoteText = document.getElementById('quote-text');
  const author = document.getElementById('quote-author');
  const afterQuote = document.getElementById('after-quote');
  const heroText = document.getElementById('hero-text');
  const bg2 = document.getElementById('bg-img2');
  const bg3 = document.getElementById('bg-img3');
  const bg4 = document.getElementById('bg-img4');
  const bg5 = document.getElementById('bg-img5');
  const bg6 = document.getElementById('bg-img6');

  // Titlurile de secțiune care declanșează schimbarea fundalului
  const titluAer = document.querySelector('.titlu-aer');
  const titluApa = document.querySelector('.titlu-apa');
  const titluSol = document.querySelector('.titlu-sol');
  const titluFinal = document.querySelector('.titlu-final');

  // 1. Citatul apare cuvânt cu cuvânt
  const words = quoteText.textContent.trim().split(' ');
  quoteText.textContent = '';
  const step = 0.2;

  words.forEach((word, i) => {
    const span = document.createElement('span');
    span.className = 'cuvant';
    span.textContent = word;
    span.style.animationDelay = (0.8 + i * step) + 's';
    quoteText.appendChild(span);
    if (i < words.length - 1) quoteText.appendChild(document.createTextNode(' '));
  });

  // 2. După cuvinte: apare autorul, apoi mesajul
  const quoteEnd = (0.8 + words.length * step + 0.9) * 1000;
  setTimeout(() => author.classList.add('vizibil'), quoteEnd);
  setTimeout(() => afterQuote.classList.add('arata'), quoteEnd + 1800);

  // Calculează opacitatea unui fundal în funcție de poziția unui element
  function fadeLa(element, fundal) {
    if (!element || !fundal) return;
    const h = window.innerHeight;
    const top = element.getBoundingClientRect().top;
    const progres = (h * 0.8 - top) / (h * 0.5);
    fundal.style.opacity = Math.min(1, Math.max(0, progres));
  }

  // 3. La scroll: hero dispare, apoi apar pe rând fundalurile 2, 3, 4, 5 și 6
  function onScroll() {
    const y = window.scrollY;
    const h = window.innerHeight;

    heroText.style.transform = `translateY(${y * 0.35}px)`;
    heroText.style.opacity = Math.max(0, 1 - y / (h * 0.6));

    // bg-img2 (nasul)
    const progres2 = (y - h * 0.3) / (h * 0.6);
    bg2.style.opacity = Math.min(1, Math.max(0, progres2));

    // bg-img3 (aer) - când ajungi la titlul "Despre aer"
    fadeLa(titluAer, bg3);

    // bg-img4 (apă) - când ajungi la titlul "Despre apă"
    fadeLa(titluApa, bg4);

    // bg-img5 (sol) - când ajungi la titlul "Despre sol"
    fadeLa(titluSol, bg5);

    // bg-img6 (final) - când ajungi la titlul "Concluzie"
    fadeLa(titluFinal, bg6);
  }

  window.addEventListener('scroll', onScroll);
  onScroll();

  // 4. Secțiunile apar la derulare
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('activ');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
});p