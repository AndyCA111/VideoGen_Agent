// Lightweight floating-particles background.
// Blue-orange dot field with slow upward drift, gentle horizontal wander,
// and soft opacity pulsing. Pauses when the tab is hidden.
(function () {
  const canvas = document.getElementById('bg-particles');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  const dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
  let W = 0, H = 0;

  function resize() {
    W = window.innerWidth;
    H = window.innerHeight;
    canvas.width  = Math.floor(W * dpr);
    canvas.height = Math.floor(H * dpr);
    canvas.style.width  = W + 'px';
    canvas.style.height = H + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  // Density scales with viewport area but stays cheap on mobile.
  const targetCount = () => {
    const area = W * H;
    return Math.max(28, Math.min(90, Math.round(area / 22000)));
  };

  // Palette biased to sky-blue and warm-orange to match the gradient.
  const PALETTE = [
    { r:  63, g: 130, b: 246 }, // blue
    { r:  30, g: 100, b: 210 }, // deeper blue
    { r: 255, g: 157, b:  28 }, // orange
    { r: 255, g: 200, b: 120 }, // warm sand
    { r: 255, g: 240, b: 200 }, // pale gold
  ];

  let particles = [];
  function spawn(n) {
    particles = [];
    for (let i = 0; i < n; i++) {
      const c = PALETTE[(Math.random() * PALETTE.length) | 0];
      particles.push({
        x: Math.random() * W,
        y: Math.random() * H,
        r: 1.2 + Math.random() * 3.4,           // radius
        vy: -(0.15 + Math.random() * 0.55),     // slow upward drift
        vx: (Math.random() - 0.5) * 0.20,       // gentle horizontal wander
        wob: Math.random() * Math.PI * 2,       // sine phase for wobble
        wobSpeed: 0.005 + Math.random() * 0.010,
        alphaBase: 0.18 + Math.random() * 0.35,
        alphaPhase: Math.random() * Math.PI * 2,
        alphaSpeed: 0.003 + Math.random() * 0.006,
        color: c,
      });
    }
  }

  function tick() {
    ctx.clearRect(0, 0, W, H);
    ctx.globalCompositeOperation = 'lighter';   // additive → soft luminous feel
    for (const p of particles) {
      p.wob += p.wobSpeed;
      p.alphaPhase += p.alphaSpeed;
      p.y += p.vy;
      p.x += p.vx + Math.sin(p.wob) * 0.15;

      // Wrap around edges.
      if (p.y < -8) { p.y = H + 8; p.x = Math.random() * W; }
      if (p.x < -8) p.x = W + 8;
      if (p.x > W + 8) p.x = -8;

      const alpha = p.alphaBase * (0.6 + 0.4 * Math.sin(p.alphaPhase));
      const { r, g, b } = p.color;

      // Soft-glow gradient per dot.
      const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 4);
      grad.addColorStop(0.00, `rgba(${r},${g},${b},${alpha})`);
      grad.addColorStop(0.35, `rgba(${r},${g},${b},${alpha * 0.55})`);
      grad.addColorStop(1.00, `rgba(${r},${g},${b},0)`);
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r * 4, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalCompositeOperation = 'source-over';
    rafId = requestAnimationFrame(tick);
  }

  let rafId = 0;
  function start() { if (!rafId) rafId = requestAnimationFrame(tick); }
  function stop()  { cancelAnimationFrame(rafId); rafId = 0; }

  window.addEventListener('resize', () => { resize(); spawn(targetCount()); }, { passive: true });
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) stop(); else start();
  });

  // Honour user's reduced-motion preference: draw a single static frame, no animation.
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  resize();
  spawn(targetCount());
  if (prefersReduced) {
    // one-shot render
    ctx.clearRect(0, 0, W, H);
    ctx.globalCompositeOperation = 'lighter';
    for (const p of particles) {
      const { r, g, b } = p.color;
      const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 4);
      grad.addColorStop(0, `rgba(${r},${g},${b},${p.alphaBase})`);
      grad.addColorStop(1, `rgba(${r},${g},${b},0)`);
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r * 4, 0, Math.PI * 2);
      ctx.fill();
    }
  } else {
    start();
  }
})();
