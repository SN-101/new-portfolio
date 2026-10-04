export default function Section({ id, title, subtitle, className = '', children }) {
  return (
    <section id={id} className={`py-24 sm:py-32 ${className}`}>
      <div className="mx-auto max-w-6xl px-5">
        <div className="mb-14 max-w-2xl">
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">{title}</h2>
          {subtitle && <p className="mt-4 text-lg text-muted">{subtitle}</p>}
        </div>
        {children}
      </div>
    </section>
  );
}
