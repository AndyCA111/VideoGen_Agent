/* Tooltip positioner for .qhelp badges — panel is position:fixed so it
   escapes the results table's overflow:hidden. */
(function () {
  const MARGIN = 8;

  function place(qhelp) {
    const badge = qhelp.querySelector('.qhelp-badge');
    const body  = qhelp.querySelector('.qhelp-body');
    if (!badge || !body) return;
    // Must be measurable first
    body.style.left = '0px';
    body.style.top  = '0px';
    body.classList.add('on');
    const b = badge.getBoundingClientRect();
    const p = body.getBoundingClientRect();
    // Prefer below the badge, right-edge aligned to badge right
    let left = b.right - p.width;
    if (left < MARGIN) left = MARGIN;
    if (left + p.width > window.innerWidth - MARGIN)
      left = window.innerWidth - MARGIN - p.width;
    let top  = b.bottom + MARGIN;
    // Flip above if no room below
    if (top + p.height > window.innerHeight - MARGIN) {
      top = b.top - p.height - MARGIN;
      body.classList.add('flip');
    } else {
      body.classList.remove('flip');
    }
    body.style.left = left + 'px';
    body.style.top  = top  + 'px';
  }

  function hide(qhelp) {
    const body = qhelp.querySelector('.qhelp-body');
    if (body) body.classList.remove('on');
  }

  function bind(qhelp) {
    qhelp.addEventListener('mouseenter', () => place(qhelp));
    qhelp.addEventListener('mouseleave', () => hide(qhelp));
    qhelp.addEventListener('focusin',    () => place(qhelp));
    qhelp.addEventListener('focusout',   () => hide(qhelp));
  }

  function init() {
    document.querySelectorAll('.qhelp').forEach(bind);
    // reposition open tooltips on scroll/resize
    window.addEventListener('scroll', () => {
      document.querySelectorAll('.qhelp-body.on').forEach(b => {
        const qhelp = b.parentElement;
        if (qhelp) place(qhelp);
      });
    }, { passive: true });
    window.addEventListener('resize', () => {
      document.querySelectorAll('.qhelp-body.on').forEach(b => {
        const qhelp = b.parentElement;
        if (qhelp) place(qhelp);
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
