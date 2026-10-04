import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { FiGlobe, FiMenu, FiMonitor, FiMoon, FiSun, FiX } from 'react-icons/fi';
import Dropdown from './Dropdown';
import { Logo } from './Brand';
import { LANGS, setLanguage } from '../i18n';
import { useTheme } from '../theme';

const SECTIONS = ['home', 'about', 'skills', 'projects', 'contact'];

export default function Navbar() {
  const { t, i18n } = useTranslation();
  const [mode, chooseTheme] = useTheme();
  const [active, setActive] = useState('home');
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' }
    );
    SECTIONS.forEach((id) => { const el = document.getElementById(id); if (el) io.observe(el); });
    return () => io.disconnect();
  }, []);

  const themeItems = [
    { id: 'system', label: t('nav.system'), icon: FiMonitor },
    { id: 'light', label: t('nav.light'), icon: FiSun },
    { id: 'dark', label: t('nav.dark'), icon: FiMoon },
  ];
  const ThemeIcon = themeItems.find((i) => i.id === mode)?.icon ?? FiMonitor;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b backdrop-blur-xl transition-colors ${
        scrolled || open ? 'border-line bg-bg/80' : 'border-transparent bg-transparent'
      }`}
    >
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:start-4 focus:top-4 focus:rounded-lg focus:bg-surface focus:px-3 focus:py-2">
        {t('nav.skip')}
      </a>
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5" aria-label="Main">
        <a href="#home" aria-label={t('nav.home')} className="size-9 text-brand"><Logo className="size-full" /></a>

        <ul className="hidden items-center gap-1 md:flex">
          {SECTIONS.map((id) => (
            <li key={id}>
              <a href={`#${id}`} className={`relative block rounded-full px-4 py-2 text-sm font-medium transition-colors ${active === id ? 'text-brand' : 'text-muted hover:text-fg'}`}>
                {active === id && <motion.span layoutId="nav-pill" className="absolute inset-0 -z-10 rounded-full bg-brand/10" transition={{ type: 'spring', stiffness: 400, damping: 34 }} />}
                {t(`nav.${id}`)}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <Dropdown icon={FiGlobe} label={t('nav.language')} items={LANGS} value={i18n.resolvedLanguage} onSelect={(id) => setLanguage(id)} />
          <Dropdown icon={ThemeIcon} label={t('nav.theme')} items={themeItems} value={mode} onSelect={chooseTheme} />
          <button
            type="button" className="grid size-10 place-items-center rounded-full border border-line bg-surface/70 md:hidden"
            aria-label={open ? t('nav.closeMenu') : t('nav.openMenu')} aria-expanded={open} onClick={() => setOpen((o) => !o)}
          >
            {open ? <FiX size={18} /> : <FiMenu size={18} />}
          </button>
        </div>
      </nav>

      {open && (
        <ul className="border-t border-line bg-bg/95 px-5 py-3 md:hidden">
          {SECTIONS.map((id) => (
            <li key={id}>
              <a href={`#${id}`} onClick={() => setOpen(false)} className={`block rounded-lg px-3 py-3 font-medium ${active === id ? 'text-brand' : 'text-fg'}`}>
                {t(`nav.${id}`)}
              </a>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}
