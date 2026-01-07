const sources = [
  'comics/demo/01.jpg',
  'comics/demo/02.jpg',
  'comics/demo/03.jpg',
  'comics/demo/04.jpg',
  'comics/demo/05.jpg',
  'comics/demo/06.jpg',
  'comics/demo/07.jpg',
  'comics/demo/08.jpg',
  'comics/demo/09.jpg',
  'comics/demo/10.jpg',
  'comics/demo/11.jpg',
  'comics/demo/12.jpg',
  'comics/demo/13.jpg',
  'comics/demo/14.jpg',
];

const container = document.querySelector('.page-container');
let current = 0;
let animating = false;

const pages = sources.map(src => {
  const img = document.createElement('img');
  img.src = src;
  img.className = 'page';
  img.draggable = false;
  container.appendChild(img);
  return img;
});

pages[0].classList.add('center');

function slide(dir) {
  if (animating) return;

  const next = current + dir;
  if (next < 0 || next >= pages.length) return;

  animating = true;

  const currentPage = pages[current];
  const nextPage = pages[next];

  nextPage.className = `page ${dir === 1 ? 'enter-right' : 'enter-left'}`;

  requestAnimationFrame(() => {
    currentPage.className = `page ${dir === 1 ? 'exit-left' : 'exit-right'}`;
    nextPage.className = 'page center';
  });

  setTimeout(() => {
    currentPage.className = 'page';
    current = next;
    animating = false;
  }, 550);
}

// управление
document.getElementById('next')?.addEventListener('click', () => slide(1));
document.getElementById('prev')?.addEventListener('click', () => slide(-1));

document.addEventListener('keydown', e => {
  if (e.key === 'ArrowRight') slide(1);
  if (e.key === 'ArrowLeft') slide(-1);
});

// свайпы
let startX = 0;

container.addEventListener('touchstart', e => {
  startX = e.touches[0].clientX;
});

container.addEventListener('touchend', e => {
  const diff = startX - e.changedTouches[0].clientX;
  if (Math.abs(diff) > 50) slide(diff > 0 ? 1 : -1);
});

