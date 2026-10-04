import { useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { useTranslation } from 'react-i18next';
import { FiAlertCircle, FiCheckCircle, FiGithub, FiLinkedin, FiMail, FiSend } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import Section from './Section';
import { EMAILJS, SITE } from '../data';

const input = 'w-full rounded-xl border border-line bg-surface px-4 py-3 outline-none transition placeholder:text-muted/70 focus:border-brand focus:ring-2 focus:ring-brand/30';

export default function Contact() {
  const { t } = useTranslation();
  const form = useRef(null);
  const lastSent = useRef(0);
  const timer = useRef(0);
  const [busy, setBusy] = useState(false);
  const [toast, setToast] = useState(null);

  const notify = (type, msg) => {
    setToast({ type, msg });
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setToast(null), 5500);
  };

  const submit = async (e) => {
    e.preventDefault();
    const f = form.current;
    if (f.elements.company.value) { f.reset(); return notify('ok', t('contact.ok')); } // honeypot: bots fill hidden fields
    if (Date.now() - lastSent.current < 30000) return notify('err', t('contact.wait'));
    setBusy(true);
    try {
      await emailjs.sendForm(EMAILJS.service, EMAILJS.template, f, { publicKey: EMAILJS.publicKey });
      lastSent.current = Date.now(); f.reset(); notify('ok', t('contact.ok'));
    } catch (err) {
      console.error('EmailJS error:', err); notify('err', t('contact.fail'));
    } finally { setBusy(false); }
  };

  const links = [
    { k: 'email', icon: FiMail, value: SITE.email, href: `mailto:${SITE.email}` },
    { k: 'github', icon: FiGithub, value: 'github.com/sn-101', href: SITE.github },
    { k: 'linkedin', icon: FiLinkedin, value: 'linkedin.com/in/samir-nassiri-ba4638282', href: SITE.linkedin },
    { k: 'whatsapp', icon: FaWhatsapp, value: SITE.phone, href: SITE.whatsapp },
  ];

  return (
    <Section id="contact" title={t('contact.title')} subtitle={t('contact.subtitle')} className="border-t border-line bg-surface/60">
      <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr]">
        <form ref={form} onSubmit={submit} className="space-y-5" aria-label={t('contact.formTitle')}>
          <h3 className="text-xl font-bold">{t('contact.formTitle')}</h3>
          <div>
            <label htmlFor="name" className="mb-2 block text-sm font-semibold">{t('contact.name')}</label>
            <input id="name" name="name" type="text" required autoComplete="name" placeholder={t('contact.namePh')} className={input} />
          </div>
          <div>
            <label htmlFor="email" className="mb-2 block text-sm font-semibold">{t('contact.email')}</label>
            <input id="email" name="email" type="email" dir="ltr" required autoComplete="email" placeholder={t('contact.emailPh')} className={`${input} text-start`} />
          </div>
          <div>
            <label htmlFor="message" className="mb-2 block text-sm font-semibold">{t('contact.message')}</label>
            <textarea id="message" name="message" rows={5} required placeholder={t('contact.messagePh')} className={`${input} resize-y`} />
          </div>
          <input name="company" type="text" tabIndex={-1} autoComplete="off" aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 opacity-0" />
          <button
            type="submit" disabled={busy}
            className="inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-blue-600 to-violet-600 px-7 py-3.5 font-semibold text-white shadow-lg shadow-blue-600/25 transition hover:-translate-y-0.5 disabled:opacity-60"
          >
            <FiSend size={18} className="rtl:-scale-x-100" />
            {busy ? t('contact.sending') : t('contact.send')}
          </button>
        </form>

        <div>
          <h3 className="mb-5 text-xl font-bold">{t('contact.direct')}</h3>
          <ul className="space-y-3">
            {links.map(({ k, icon: Icon, value, href }) => (
              <li key={k}>
                <a href={href} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 rounded-xl border border-line bg-surface p-4 transition hover:border-brand/50">
                  <span className="grid size-11 shrink-0 place-items-center rounded-lg bg-brand/10 text-brand"><Icon size={20} /></span>
                  <span className="min-w-0">
                    <span className="block text-sm font-semibold">{t(`contact.labels.${k}`)}</span>
                    <bdi className="block truncate text-sm text-muted">{value}</bdi>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <AnimatePresence>
        {toast && (
          <motion.div
            role="status" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }}
            className={`fixed inset-x-4 bottom-6 z-[80] mx-auto flex max-w-md items-center gap-3 rounded-xl px-5 py-4 text-sm font-semibold text-white shadow-2xl ${toast.type === 'ok' ? 'bg-emerald-600' : 'bg-rose-600'}`}
          >
            {toast.type === 'ok' ? <FiCheckCircle size={20} /> : <FiAlertCircle size={20} />}
            {toast.msg}
          </motion.div>
        )}
      </AnimatePresence>
    </Section>
  );
}
