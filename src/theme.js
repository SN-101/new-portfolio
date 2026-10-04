import { useCallback, useEffect, useState } from 'react';
import { flushSync } from 'react-dom';

const KEY = 'theme'; // 'light' | 'dark' | (absent = follow the browser/system)
const media = () => window.matchMedia('(prefers-color-scheme: dark)');

const read = () => {
  try {
    const v = localStorage.getItem(KEY);
    return v === 'light' || v === 'dark' ? v : 'system';
  } catch { return 'system'; }
};
const isDark = (mode) => (mode === 'system' ? media().matches : mode === 'dark');
const apply = (mode) => {
  const dark = isDark(mode);
  document.documentElement.classList.toggle('dark', dark);
};

export function useTheme() {
  const [mode, setMode] = useState(read);

  // Keep following the system while mode === 'system'
  useEffect(() => {
    apply(mode);
    if (mode !== 'system') return;
    const m = media();
    const onChange = () => apply('system');
    m.addEventListener('change', onChange);
    return () => m.removeEventListener('change', onChange);
  }, [mode]);

  const choose = useCallback((next, origin) => {
    try {
      if (next === 'system') localStorage.removeItem(KEY);
      else localStorage.setItem(KEY, next);
    } catch { /* storage blocked */ }

    const run = () => { apply(next); flushSync(() => setMode(next)); };
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const same = isDark(next) === document.documentElement.classList.contains('dark');
    if (!document.startViewTransition || reduce || same) return run();

    // Circular reveal from the clicked control
    const x = origin?.x ?? window.innerWidth / 2;
    const y = origin?.y ?? 0;
    const r = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));
    document.startViewTransition(run).ready.then(() =>
      document.documentElement.animate(
        { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${r}px at ${x}px ${y}px)`] },
        { duration: 550, easing: 'ease-in-out', pseudoElement: '::view-transition-new(root)' }
      )
    );
  }, []);

  return [mode, choose];
}
