import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Signature } from './Brand';
import { asset } from '../data';

const stagger = { hide: {}, show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } } };
const item = { hide: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } } };

function Roles({ items }) {
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI((v) => v + 1), 3000);
    return () => clearInterval(id);
  }, []);
  const text = items[i % items.length];
  return (
    <div className="relative h-6 flex-1 overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.span
          key={text} initial={{ y: 14, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -14, opacity: 0 }}
          transition={{ duration: 0.3 }} className="absolute inset-x-0 truncate"
        >
          {text}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}

// Window chrome: desktop apps and websites are shown as what they are
function Frame({ title, src, className = '' }) {
  return (
    <div className={`overflow-hidden rounded-xl border border-line bg-surface shadow-2xl shadow-brand/10 ${className}`}>
      <div className="flex h-8 items-center gap-1.5 border-b border-line bg-bg/70 px-3">
        <i className="size-2.5 rounded-full bg-rose-400/80" />
        <i className="size-2.5 rounded-full bg-amber-400/80" />
        <i className="size-2.5 rounded-full bg-emerald-400/80" />
        <span dir="ltr" className="ms-3 truncate text-[11px] text-muted">{title}</span>
      </div>
      <img src={asset(src)} alt="" decoding="async" className="aspect-[16/10] w-full object-cover object-top" />
    </div>
  );
}

export default function Hero() {
  const { t } = useTranslation();
  const ref = useRef(null);
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 520], [1, 0]);
  const lift = useTransform(scrollY, [0, 520], [0, -40]);
  const roles = t('hero.roles', { returnObjects: true });

  const onMove = (e) => {
    if (e.pointerType !== 'mouse' || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    ref.current.style.setProperty('--sx', `${e.clientX - r.left}px`);
    ref.current.style.setProperty('--sy', `${e.clientY - r.top}px`);
  };

  return (
    <section id="home" ref={ref} onPointerMove={onMove} className="relative isolate overflow-hidden">
      <div className="hero-grid absolute inset-0 -z-20" aria-hidden="true" />
      <div className="hero-spot absolute inset-0 -z-10" aria-hidden="true" />

      <div className="mx-auto grid min-h-[100svh] max-w-6xl items-center gap-14 px-5 pb-20 pt-28 lg:grid-cols-[1.05fr_0.95fr]">
        <motion.div style={{ opacity, y: lift }}>
          <motion.div variants={stagger} initial="hide" animate="show">
            <motion.div variants={item} className="max-w-[560px] text-fg">
              <Signature />
            </motion.div>
            <motion.p variants={item} className="mt-8 max-w-xl text-xl font-semibold leading-snug sm:text-2xl">
              {t('hero.title')}
            </motion.p>
            <motion.p variants={item} className="mt-4 max-w-xl text-lg text-muted">{t('hero.intro')}</motion.p>
            <motion.div variants={item} className="mt-6 flex max-w-xl items-center gap-3 text-sm font-semibold text-brand">
              <span className="h-px w-8 shrink-0 bg-brand/60" aria-hidden="true" />
              <Roles items={roles} />
            </motion.div>
            <motion.div variants={item} className="mt-10 flex flex-wrap gap-3">
              <a href="#projects" className="rounded-full bg-gradient-to-r from-blue-600 to-violet-600 px-7 py-3.5 font-semibold text-white shadow-lg shadow-blue-600/25 transition hover:-translate-y-0.5 hover:shadow-xl">
                {t('hero.ctaProjects')}
              </a>
              <a href="#contact" className="rounded-full border border-line bg-surface/70 px-7 py-3.5 font-semibold transition hover:-translate-y-0.5 hover:border-brand/60">
                {t('hero.ctaContact')}
              </a>
            </motion.div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto w-full max-w-xl pb-10 lg:pb-14"
        >
          <Frame title="Frigo Lahlou ERP" src="documents/FrigoLahlouERP.webp" className="ms-auto w-[92%]" />
          <Frame title="eprim.netlify.app" src="documents/EPRIM.webp" className="absolute bottom-0 start-0 hidden w-[52%] sm:block" />
        </motion.div>
      </div>
    </section>
  );
}
