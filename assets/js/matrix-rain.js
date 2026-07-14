// matrix-rain.js
(function () {
  const canvas = document.createElement('canvas');
  canvas.id = 'matrix-rain';
  canvas.style.position = 'fixed';
  canvas.style.top = 0;
  canvas.style.left = 0;
  canvas.style.width = '100%';
  canvas.style.height = '100%';
  canvas.style.pointerEvents = 'none'; // clicks pass through to your content
  canvas.style.zIndex = '-1';          // sits behind everything
  document.body.appendChild(canvas);

  const ctx = canvas.getContext('2d');
  let width, height, columns, drops;

  const fontSize = 16;
  const borderWidth = 120; // how wide the "rain zone" is on each side, in px
  const chars = 'アイウエオカキクケコサシスセソタチツテト0123456789ABCDEF';

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    columns = Math.floor(width / fontSize);
    drops = new Array(columns).fill(1);
  }
  resize();
  window.addEventListener('resize', resize);

  function inBorderZone(x) {
    return x < borderWidth || x > width - borderWidth;
  }

  function draw() {
    ctx.fillStyle = 'rgba(10, 0, 20, 0.08)'; // fading trail, dark violet tint
    ctx.fillRect(0, 0, width, height);
    ctx.font = fontSize + 'px monospace';

    for (let i = 0; i < columns; i++) {
      const x = i * fontSize;
      if (!inBorderZone(x)) continue; // only draw near the edges

      const text = chars[Math.floor(Math.random() * chars.length)];
      const y = drops[i] * fontSize;

      ctx.fillStyle = '#9d4edd'; // violet
      ctx.fillText(text, x, y);

      if (y > height && Math.random() > 0.975) drops[i] = 0;
      drops[i]++;
    }
  }

  setInterval(draw, 50);
})();