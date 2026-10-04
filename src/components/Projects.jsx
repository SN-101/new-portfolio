import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { FiExternalLink, FiGithub, FiX } from 'react-icons/fi';
import Section from './Section';
import { asset, projects } from '../data';

const FILTERS = ['all', 'desktop', 'web'];

// 3D tilt + cursor spotlight, mouse only (touch and keyboard users get a plain card)
function Tilt({ children, className }) {
  const ref = useRef(null);
  const move = (e) => {
    if (e.pointerType !== 'mouse') return;
    const el = ref.current; const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width; const y = (e.clientY - r.top) / r.height;
    el.style.setProperty('--mx', `${x * 100}%`); el.style.setProperty('--my', `${y * 100}%`);
    el.style.setProperty('--ry', `${(x - 0.5) * 7}deg`); el.style.setProperty('--rx', `${(0.5 - y) * 7}deg`);
  };
  const leave = () => { ref.current.style.setProperty('--rx', '0deg'); ref.current.style.setProperty('--ry', '0deg'); };
  return <div ref={ref} onPointerMove={move} onPointerLeave={leave} className={`tilt relative ${className}`}>{children}</div>;
}

const Tags = ({ list }) => (
  <ul className="flex flex-wrap gap-1.5">
    {list.map((x) => <li key={x} className="rounded-md bg-brand/10 px-2 py-1 text-xs font-semibold text-brand">{x}</li>)}
  </ul>
);

const Links = ({ p, t }) => (
  <>
    {p.github && (
      <a href={p.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 hover:text-brand">
        <FiGithub size={16} /> {t('projects.code')}
      </a>
    )}
    {p.live && (
      <a href={p.live} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 hover:text-brand">
        <FiExternalLink size={16} /> {t('projects.live')}
      </a>
    )}
  </>
);

function Card({ p, onOpen }) {
  const { t } = useTranslation();
  const title = t(`projects.items.${p.id}.title`);
  return (
    <Tilt className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-surface">
      <button type="button" onClick={() => onOpen(p.id)} aria-label={`${t('projects.details')}: ${title}`} className="relative block aspect-[16/10] overflow-hidden bg-bg">
        <img
          src={asset(p.image)} alt={t('projects.shot', { title })} loading="lazy" decoding="async"
          className="size-full object-cover object-top transition duration-700 group-hover:scale-[1.04]"
        />
        <span className="absolute start-3 top-3 rounded-full bg-bg/85 px-2.5 py-1 text-xs font-semibold backdrop-blur">
          {t(`projects.badges.${p.type}`)}
        </span>
      </button>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-lg font-bold">{title}</h3>
        <p className="mb-4 mt-2 line-clamp-3 text-sm leading-relaxed text-muted">{t(`projects.items.${p.id}.desc`)}</p>
        <Tags list={p.tech} />
        <div className="mt-auto flex flex-wrap items-center gap-x-5 gap-y-2 pt-5 text-sm font-semibold">
          <Links p={p} t={t} />
          <button type="button" onClick={() => onOpen(p.id)} className="ms-auto text-brand hover:underline">{t('projects.details')}</button>
        </div>
      </div>
    </Tilt>
  );
}

function Modal({ p, onClose }) {
  const { t } = useTranslation();
  const closeRef = useRef(null);
  const title = t(`projects.items.${p.id}.title`);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    closeRef.current?.focus();
    return () => { document.body.style.overflow = prev; window.removeEventListener('keydown', onKey); };
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-[60] grid place-items-center bg-black/60 p-4 backdrop-blur-sm"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}
    >
      <motion.div
        role="dialog" aria-modal="true" aria-labelledby="project-title" onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, y: 24, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 24, scale: 0.97 }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
        className="relative max-h-[90svh] w-full max-w-3xl overflow-y-auto rounded-2xl border border-line bg-surface shadow-2xl"
      >
        <button ref={closeRef} type="button" onClick={onClose} aria-label={t('projects.close')} className="absolute end-3 top-3 z-10 grid size-9 place-items-center rounded-full bg-bg/85 backdrop-blur">
          <FiX size={18} />
        </button>
        <img src={asset(p.image)} alt={t('projects.shot', { title })} className="aspect-[16/9] w-full object-cover object-top" />
        <div className="p-6 sm:p-8">
          <span className="text-sm font-semibold text-brand">{t(`projects.badges.${p.type}`)}</span>
          <h3 id="project-title" className="mt-1 text-2xl font-extrabold">{title}</h3>
          <p className="mb-5 mt-3 max-w-[66ch] leading-relaxed text-fg/85">{t(`projects.items.${p.id}.desc`)}</p>
          <Tags list={p.tech} />
          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm font-semibold">
            {p.github || p.live ? <Links p={p} t={t} /> : <p className="font-normal text-muted">{t('projects.noPublic')}</p>}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Projects() {
  const { t } = useTranslation();
  const [filter, setFilter] = useState('all');
  const [selected, setSelected] = useState(null);
  const close = useCallback(() => setSelected(null), []);
  const list = projects.filter((p) => filter === 'all' || p.type === filter);
  const current = projects.find((p) => p.id === selected);

  return (
    <Section id="projects" title={t('projects.title')} subtitle={t('projects.subtitle')}>
      <div className="mb-10 flex flex-wrap gap-2" role="group" aria-label={t('projects.title')}>
        {FILTERS.map((f) => (
          <button
            key={f} type="button" onClick={() => setFilter(f)} aria-pressed={filter === f}
            className={`relative rounded-full border px-5 py-2 text-sm font-semibold transition-colors ${filter === f ? 'border-transparent text-white' : 'border-line text-muted hover:text-fg'}`}
          >
            {filter === f && (
              <motion.span layoutId="filter-pill" className="absolute inset-0 -z-0 rounded-full bg-gradient-to-r from-blue-600 to-violet-600" transition={{ type: 'spring', stiffness: 420, damping: 34 }} />
            )}
            <span className="relative">{t(`projects.filters.${f}`)}</span>
          </button>
        ))}
      </div>

      <motion.div layout className="grid gap-6 md:grid-cols-2 lg:grid-cols-6">
        <AnimatePresence mode="popLayout" initial={false}>
          {list.map((p) => (
            <motion.article
              layout key={p.id} initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.3 }} className={p.type === 'desktop' ? 'lg:col-span-3' : 'lg:col-span-2'}
            >
              <Card p={p} onOpen={setSelected} />
            </motion.article>
          ))}
        </AnimatePresence>
      </motion.div>

      <AnimatePresence>{current && <Modal key={current.id} p={current} onClose={close} />}</AnimatePresence>
    </Section>
  );
}
