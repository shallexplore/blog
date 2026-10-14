(function () {
  if (!window.gsap || !window.ScrollTrigger) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  gsap.registerPlugin(ScrollTrigger);

  /* Controls */
  const SMOOTH_SCROLL = true;   // set false to disable Lenis on the blog
  const DURATION = 0.8;
  const DISTANCE = 30;
  const STAGGER = 0.1;

  /* Smooth scroll, synced with GSAP */
  if (SMOOTH_SCROLL && window.Lenis) {
    const lenis = new Lenis({
      lerp: 0.1,
      prevent: (node) =>
        node.closest('.fslightbox-container, dialog, [role="dialog"], [aria-modal="true"]')
    });
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((t) => lenis.raf(t * 1000));
    gsap.ticker.lagSmoothing(0);
  }

  /* Blog title block, on load */
  gsap.timeline({ defaults: { ease: 'power3.out' } })
    .from('main .content > header h1', { y: DISTANCE, opacity: 0, duration: DURATION })
    .from('main .content > header .description', { y: 20, opacity: 0, duration: 0.6 }, '-=0.5');

  /* Sidebar fade */
  gsap.from('aside', { opacity: 0, duration: 1, delay: 0.3, ease: 'power2.out' });

  /* Content blocks (post list, post body wrapper), fade up once in view */
    /* Individual post cards when marked, else the whole content block */
  const cards = gsap.utils.toArray('[data-reveal]');
  const blocks = cards.length
    ? cards
    : gsap.utils.toArray('main .content > *:not(header):not(footer)');
  gsap.set(blocks, { opacity: 0, y: DISTANCE });
  ScrollTrigger.batch(blocks, {
    start: 'top 92%',
    once: true,
    onEnter: (els) =>
      gsap.to(els, {
        opacity: 1, y: 0, duration: DURATION,
        ease: 'power3.out', stagger: STAGGER, overwrite: true
      })
  });
  ScrollTrigger.batch(blocks, {
    start: 'top 92%',
    once: true,
    onEnter: (els) =>
      gsap.to(els, {
        opacity: 1, y: 0, duration: DURATION,
        ease: 'power3.out', stagger: STAGGER, overwrite: true
      })
  });

  window.addEventListener('load', () => ScrollTrigger.refresh());
})();