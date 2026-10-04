import logoSvg from '../assets/logo.svg?raw';
import nameSvg from '../assets/name.svg?raw';

export function Logo({ className = '' }) {
  return <span className={`inline-block [&>svg]:h-full [&>svg]:w-full ${className}`} dangerouslySetInnerHTML={{ __html: logoSvg }} />;
}

// Hand-drawn "Samir Nassiri" signature; real text is exposed to screen readers / SEO
export function Signature({ className = '' }) {
  return (
    <h1 className={className}>
      <span className="sr-only">Samir Nassiri</span>
      <span className="sig block" aria-hidden="true" dangerouslySetInnerHTML={{ __html: nameSvg }} />
    </h1>
  );
}
