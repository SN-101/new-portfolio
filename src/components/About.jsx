import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { FiCheck, FiDownload } from 'react-icons/fi';
import Section from './Section';
import { CV, asset } from '../data';

const isPdf = async (url) => {
  try {
    const r = await fetch(url, { method: 'HEAD' });
    return r.ok && (r.headers.get('content-type') || '').includes('pdf');
  } catch { return false; }
};

export default function About() {
  const { t, i18n } = useTranslation();
  const [state, setState] = useState('idle');
  const [note, setNote] = useState(false);

  const download = async () => {
    setState('busy'); setNote(false);
    let file = CV[i18n.resolvedLanguage] ?? CV.en;
    if (file !== CV.en && !(await isPdf(asset(file)))) { file = CV.en; setNote(true); setTimeout(() => setNote(false), 7000); }
    const a = document.createElement('a');
    a.href = asset(file); a.download = file.split('/').pop();
    document.body.append(a); a.click(); a.remove();
    setState('done'); setTimeout(() => setState('idle'), 2500);
  };

  return (
    <Section id="about" title={t('about.title')}>
      <div className="grid items-start gap-14 md:grid-cols-[1fr_320px]">
        <div>
          <div className="max-w-[66ch] space-y-5 text-lg leading-relaxed text-fg/85">
            <p>{t('about.p1')}</p>
            <p>{t('about.p2')}</p>
            <p>{t('about.p3')}</p>
          </div>
          <button
            type="button" onClick={download} disabled={state === 'busy'}
            className="mt-9 inline-flex items-center gap-2.5 rounded-full bg-fg px-6 py-3 font-semibold text-bg transition hover:-translate-y-0.5 hover:opacity-90 disabled:opacity-60"
          >
            <motion.span key={state} initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="grid">
              {state === 'done' ? <FiCheck size={18} /> : <FiDownload size={18} />}
            </motion.span>
            {t('about.cv')}
          </button>
          {note && <p role="status" className="mt-3 text-sm text-muted">{t('about.cvFallback')}</p>}
        </div>

        <div className="relative mx-auto w-full max-w-xs md:max-w-none">
          <span className="absolute inset-0 translate-x-3 translate-y-3 rounded-2xl border-2 border-brand/40 rtl:-translate-x-3" aria-hidden="true" />
          <img
            src={asset('documents/My Picture.webp')} alt={t('about.imgAlt')} loading="lazy" decoding="async"
            className="relative aspect-[4/5] w-full rounded-2xl object-cover"
          />
        </div>
      </div>
    </Section>
  );
}
