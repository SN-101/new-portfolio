import { useTranslation } from 'react-i18next';
import Section from './Section';
import { skillGroups } from '../data';

function Chip({ s }) {
  const Icon = s.i;
  return (
    <span className="inline-flex items-center gap-2.5 rounded-xl border border-line bg-surface py-2 pe-4 ps-2 text-sm font-semibold transition hover:-translate-y-0.5 hover:border-brand/50">
      <span
        className="grid size-8 place-items-center rounded-lg"
        style={{ background: s.c ? `${s.c}24` : 'rgb(var(--fg) / 0.08)', color: s.c ?? 'currentColor' }}
      >
        <Icon size={18} aria-hidden="true" />
      </span>
      {s.n}
    </span>
  );
}

export default function Skills() {
  const { t } = useTranslation();
  return (
    <Section id="skills" title={t('skills.title')} subtitle={t('skills.subtitle')} className="border-y border-line bg-surface/60">
      <dl className="divide-y divide-line border-y border-line">
        {skillGroups.map((g) => (
          <div key={g.id} className="grid gap-4 py-7 md:grid-cols-[200px_1fr]">
            <dt className="text-sm font-semibold text-muted">{t(`skills.groups.${g.id}`)}</dt>
            <dd className="flex flex-wrap gap-3">{g.skills.map((s) => <Chip key={s.n} s={s} />)}</dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}
