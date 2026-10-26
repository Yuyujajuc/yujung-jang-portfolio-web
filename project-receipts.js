/* Project 3 receipts only. Coordinates are Figma's unrotated top-left origins.
   Vertical offsets follow the nearby live content, not a fixed page height. */
(() => {
  if (new URLSearchParams(location.search).get('id') !== 'thisplace-alot') return;
  const root = document.querySelector('.pb-page');
  if (!root) return;
  const placements = [
    { file: 5, label: 'Statement', anchor: 'title', x: 1236.437, offset: -5, rotation: 7.83, height: 2257 },
    { file: 7, label: 'UI Mockups', anchor: 'animation.gif', x: 988, offset: 153.663, rotation: -8.14, height: 1494 },
    { file: 1, label: 'Animation', anchor: '3.jpg', x: 80.717, offset: -102.095, rotation: 7.08, height: 1391 },
    { file: 4, label: 'Inanimate', anchor: '5.jpg', x: 1140, offset: 299.390, rotation: -11.09, height: 1678 },
    { file: 3, label: 'Fauna', anchor: '7.jpg', x: 351.174, offset: 24, rotation: 11.21, height: 1594 },
    { file: 6, label: 'Full Map', anchor: '11.jpg', x: 72, offset: 341.018, rotation: -14.48, height: 1398 }
  ];
  const layer = document.createElement('aside');
  layer.className = 'project-receipts';
  layer.setAttribute('aria-label', 'Project receipts');
  root.classList.add('has-receipts');
  const entries = placements.map(data => {
    const anchor = data.anchor === 'title' ? root.querySelector('.pb-title') :
      root.querySelector(`.pb-gallery img[src="images/thisplace-alot/${data.anchor}"]`)?.closest('.pb-block');
    if (!anchor) return null;
    const img = document.createElement('img');
    img.src = `images/thisplace-alot/receipt-${data.file}.jpg`;
    img.alt = `${data.label} — This Place Is a Lot project receipt`;
    img.width = 899;
    img.height = data.height;
    img.decoding = 'async';
    img.style.transform = `rotate(${data.rotation}deg)`;
    img.dataset.receipt = String(data.file);
    layer.append(img);
    return { data, anchor, img };
  }).filter(Boolean);
  root.append(layer);
  let pending = false;
  function position() {
    pending = false;
    const bounds = root.getBoundingClientRect();
    const scale = bounds.width / 1440;
    for (const { data, anchor, img } of entries) {
      img.style.width = `${184 * scale}px`;
      img.style.left = `${data.x * scale}px`;
      img.style.top = `${anchor.getBoundingClientRect().top - bounds.top + data.offset * scale}px`;
    }
  }
  function schedule() {
    if (!pending) { pending = true; requestAnimationFrame(position); }
  }
  const observer = new ResizeObserver(schedule);
  observer.observe(root);
  root.querySelectorAll('.pb-info, .pb-gallery > .pb-block').forEach(node => observer.observe(node));
  root.addEventListener('load', schedule, true);
  window.addEventListener('resize', schedule);
  document.fonts?.ready.then(schedule);
  position();
})();
