import { useTranslation } from 'react-i18next';
import { FiGithub, FiLinkedin, FiMail } from 'react-icons/fi';
import { Logo } from './Brand';
import { SITE } from '../data';

export default function Footer() {
  const { t } = useTranslation();
  const social = [
    { k: 'github', icon: FiGithub, href: SITE.github },
    { k: 'linkedin', icon: FiLinkedin, href: SITE.linkedin },
    { k: 'email', icon: FiMail, href: `mailto:${SITE.email}` },
  ];
  return (
    <footer className="border-t border-line py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 px-5 sm:flex-row sm:items-center">
        <div className="flex items-center gap-3">
          <Logo className="size-9 text-brand" />
          <div>
            <p className="font-bold">{t('footer.name')}</p>
            <p className="text-sm text-muted">{t('footer.description')}</p>
          </div>
        </div>
        <ul className="flex gap-2">
          {social.map(({ k, icon: Icon, href }) => (
            <li key={k}>
              <a href={href} target="_blank" rel="noopener noreferrer" aria-label={t(`contact.labels.${k}`)} className="grid size-10 place-items-center rounded-full border border-line transition hover:border-brand/60 hover:text-brand">
                <Icon size={18} />
              </a>
            </li>
          ))}
        </ul>
      </div>
      <p className="mx-auto mt-8 max-w-6xl px-5 text-sm text-muted">{t('footer.rights', { year: new Date().getFullYear() })}</p>
    </footer>
  );
}
