// Lightbox — click any .lb-img to open fullscreen
(function() {
  const overlay = document.createElement('div');
  overlay.id = 'lb';
  overlay.style.cssText = `
    display:none; position:fixed; inset:0; z-index:9999;
    background:rgba(0,0,0,0.92); cursor:zoom-out;
    align-items:center; justify-content:center; padding:2rem;
  `;
  const img = document.createElement('img');
  img.style.cssText = `
    max-width:90vw; max-height:90vh; object-fit:contain;
    border:none; display:block; cursor:default;
  `;
  const close = document.createElement('button');
  close.innerHTML = '&times;';
  close.style.cssText = `
    position:fixed; top:1.5rem; right:2rem; background:none;
    border:none; color:#f2f0eb; font-size:2rem; cursor:pointer;
    opacity:0.6; line-height:1; padding:0;
  `;
  close.onmouseenter = () => close.style.opacity = '1';
  close.onmouseleave = () => close.style.opacity = '0.6';
  overlay.appendChild(img);
  overlay.appendChild(close);
  document.body.appendChild(overlay);

  function open(src, alt) {
    img.src = src;
    img.alt = alt || '';
    overlay.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  }
  function closeLB() {
    overlay.style.display = 'none';
    document.body.style.overflow = '';
    img.src = '';
  }

  overlay.addEventListener('click', function(e) { if (e.target === overlay) closeLB(); });
  close.addEventListener('click', closeLB);
  document.addEventListener('keydown', function(e) { if (e.key === 'Escape') closeLB(); });

  // Attach to all images with lb-img class on load
  document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.lb-img').forEach(function(el) {
      el.style.cursor = 'zoom-in';
      el.addEventListener('click', function() {
        const src = el.querySelector('img') ? el.querySelector('img').src : el.src;
        const alt = el.querySelector('img') ? el.querySelector('img').alt : el.alt;
        open(src, alt);
      });
    });
  });
})();
