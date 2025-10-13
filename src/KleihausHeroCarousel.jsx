import { useEffect, useMemo, useRef, useState } from \"react\";

export default function KleihausHeroCarousel({
  slides = [],
  autoplayMs = 4500,
  heightClass = \"h-[68vh] md:h-[72vh]\",
}) {
  const [index, setIndex] = useState(0);
  const [isPaused, setPaused] = useState(false);
  const trackRef = useRef(null);
  const timerRef = useRef(null);

  const safeSlides = useMemo(() => (Array.isArray(slides) ? slides.filter(s => s && s.src) : []), [slides]);
  const len = safeSlides.length;

  useEffect(() => {
    if (!len || isPaused) return;
    timerRef.current = setInterval(() => setIndex(i => (i + 1) % len), Math.max(1800, autoplayMs));
    return () => clearInterval(timerRef.current);
  }, [len, autoplayMs, isPaused]);

  useEffect(() => {
    const onKey = e => {
      if (e.key === \"ArrowRight\") setIndex(i => (i + 1) % len);
      if (e.key === \"ArrowLeft\") setIndex(i => (i - 1 + len) % len);
    };
    window.addEventListener(\"keydown\", onKey);
    return () => window.removeEventListener(\"keydown\", onKey);
  }, [len]);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    let startX = 0, diff = 0;
    const down = e => { startX = (e.touches?.[0]?.clientX ?? e.clientX) || 0; };
    const move = e => { const x = (e.touches?.[0]?.clientX ?? e.clientX) || 0; diff = x - startX; };
    const up = () => {
      const THRESH = 40;
      if (diff < -THRESH) setIndex(i => (i + 1) % len);
      if (diff > THRESH) setIndex(i => (i - 1 + len) % len);
      startX = 0; diff = 0;
    };
    el.addEventListener(\"touchstart\", down, { passive: true });
    el.addEventListener(\"touchmove\", move, { passive: true });
    el.addEventListener(\"touchend\", up);
    el.addEventListener(\"mousedown\", down);
    window.addEventListener(\"mousemove\", move);
    window.addEventListener(\"mouseup\", up);
    return () => {
      el.removeEventListener(\"touchstart\", down);
      el.removeEventListener(\"touchmove\", move);
      el.removeEventListener(\"touchend\", up);
      el.removeEventListener(\"mousedown\", down);
      window.removeEventListener(\"mousemove\", move);
      window.removeEventListener(\"mouseup\", up);
    };
  }, [len]);

  if (!len) return null;

  return (
    <section
      className={\`relative w-full \${heightClass} overflow-hidden rounded-none md:rounded-2xl bg-neutral-200\`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-roledescription=\"carousel\"
      aria-label=\"Kleihaus hero slider\"
    >
      <div
        ref={trackRef}
        className=\"absolute inset-0 flex transition-transform duration-700 ease-out\"
        style={{ transform: \`translateX(-\${index * 100}%)\` }}
      >
        {safeSlides.map((s, i) => (
          <article
            key={i}
            className=\"relative min-w-full h-full\"
            role=\"group\"
            aria-roledescription=\"slide\"
            aria-label={\`\${i + 1} of \${len}\`}
          >
            <img
              src={s.src}
              alt={s.alt || \`Kleihaus slide \${i + 1}\`}
              className=\"absolute inset-0 w-full h-full object-cover\"
              loading={i === 0 ? \"eager\" : \"lazy\"}
              decoding=\"async\"
            />
            <div className=\"absolute inset-0 bg-gradient-to-r from-black/40 via-black/20 to-transparent\" />
            <div className=\"absolute right-4 bottom-3 md:right-6 md:bottom-5 text-white/80 text-lg md:text-2xl font-semibold tracking-wide select-none\">Kleihaus</div>
          </article>
        ))}
      </div>
      <div className=\"absolute left-1/2 -translate-x-1/2 bottom-3 md:bottom-5 flex gap-2\">
        {safeSlides.map((_, i) => (
          <button
            key={i}
            aria-label={\`Go to slide \${i + 1}\`}
            onClick={() => setIndex(i)}
            className={\`h-2.5 w-2.5 rounded-full border border-white/80 transition \${i === index ? \"bg-white\" : \"bg-white/30 hover:bg-white/50\"}\`}
          />
        ))}
      </div>
    </section>
  );
}
