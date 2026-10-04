import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FiCheck } from 'react-icons/fi';

// Small accessible menu used by both the language and theme controls
export default function Dropdown({ icon: Icon, label, items, value, onSelect }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!open) return;
    const away = (e) => { if (!ref.current?.contains(e.target)) setOpen(false); };
    const esc = (e) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('pointerdown', away);
    document.addEventListener('keydown', esc);
    return () => { document.removeEventListener('pointerdown', away); document.removeEventListener('keydown', esc); };
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button
        type="button" aria-label={label} aria-haspopup="menu" aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        className="grid size-10 place-items-center rounded-full border border-line bg-surface/70 text-fg transition hover:border-brand/60 hover:text-brand"
      >
        <Icon size={18} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.ul
            role="menu" initial={{ opacity: 0, scale: 0.96, y: -4 }} animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -4 }} transition={{ duration: 0.14 }}
            className="absolute end-0 top-12 z-50 min-w-40 origin-top-right overflow-hidden rounded-xl border border-line bg-surface p-1 shadow-xl rtl:origin-top-left"
          >
            {items.map(({ id, label: text, icon: ItemIcon }) => (
              <li key={id} role="none">
                <button
                  role="menuitemradio" aria-checked={value === id}
                  onClick={(e) => { onSelect(id, { x: e.clientX, y: e.clientY }); setOpen(false); }}
                  className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-start text-sm transition hover:bg-brand/10"
                >
                  {ItemIcon && <ItemIcon size={16} className="text-muted" />}
                  <span className="flex-1">{text}</span>
                  {value === id && <FiCheck size={15} className="text-brand" />}
                </button>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
