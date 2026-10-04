import { SiPython, SiQt, SiJavascript, SiReact, SiNodedotjs, SiHtml5, SiTailwindcss, SiBootstrap, SiMysql, SiSqlite, SiGit, SiGithub, SiXampp, SiPhpmyadmin, SiJson } from 'react-icons/si';
import { FaCss3Alt, FaDatabase } from 'react-icons/fa';
import { VscVscode } from 'react-icons/vsc';
import { FiPackage } from 'react-icons/fi';

export const asset = (p) => encodeURI(import.meta.env.BASE_URL + p);

export const SITE = {
  email: 'samirnassiri67@gmail.com',
  github: 'https://github.com/sn-101/',
  linkedin: 'https://linkedin.com/in/samir-nassiri-ba4638282/',
  whatsapp: 'https://wa.me/212695901226',
  phone: '+212 695 901 226',
};

// EmailJS values are public by design (same ones used by the previous version)
export const EMAILJS = { service: 'service_665cu5q', template: 'template_yquyyyq', publicKey: 'vAodR1HFl2lZJYfhe' };

// One resume per language. If a file is missing, the English one is downloaded.
export const CV = {
  en: 'documents/Samir Nassiri CV Resume EN.pdf',
  fr: 'documents/Samir Nassiri CV Resume FR.pdf',
  ar: 'documents/Samir Nassiri CV Resume AR.pdf',
};

// Text (title/description) lives in src/locales/*.json under projects.items.<id>
export const projects = [
  { id: 'lahlou', type: 'desktop', tech: ['Python', 'PyQt5', 'MySQL', 'SSL', 'Nuitka'], image: 'documents/FrigoLahlouERP.webp', title: 'Frigo Lahlou ERP' },
  { id: 'slimani', type: 'desktop', tech: ['Python', 'PyQt5', 'SQLite', 'AES-256', 'Nuitka'], image: 'documents/FrigoSlimaniERP.webp', title: 'Frigo Slimani ERP' },
  { id: 'eprim', type: 'web', tech: ['React.js', 'Tailwind CSS'], github: 'https://github.com/SN-101/EPRIM', live: 'https://eprim.netlify.app/', image: 'documents/EPRIM.webp', title: 'EPRIM' },
  { id: 'ksar', type: 'web', tech: ['HTML', 'CSS', 'JavaScript', 'JSON'], github: 'https://github.com/Municipality-of-Ksar-Toulal/front-end', live: 'https://municipality-of-ksar-toulal.github.io/front-end/', image: 'documents/Municipality ksar Toulal.webp' },
  { id: 'store', type: 'web', tech: ['HTML', 'CSS', 'Bootstrap', 'JavaScript', 'JSON'], github: 'https://github.com/SN-101/Online-Store', live: 'https://sn-101.github.io/Online-Store', image: 'documents/Online Store.webp' },
  { id: 'cvOnline', type: 'web', tech: ['HTML', 'CSS', 'JavaScript', 'JSON'], github: 'https://github.com/SN-101/cv-online', live: 'https://sn-101.github.io/cv-online/', image: 'documents/CV online.webp' },
  { id: 'game', type: 'web', tech: ['HTML', 'CSS', 'JavaScript'], github: 'https://github.com/SN-101/Childhood-Game', live: 'https://sn-101.github.io/Childhood-Game/', image: 'documents/Rock, Paper, Scissors.webp' },
  { id: 'oldPortfolio', type: 'web', tech: ['HTML', 'CSS'], github: 'https://github.com/SN-101/portfolio', live: 'https://sn-101.github.io/portfolio/', image: 'documents/my first portfolio.webp' },
];

// c = brand colour of the icon (null = follow the text colour)
export const skillGroups = [
  { id: 'desktop', skills: [
    { n: 'Python', i: SiPython, c: '#3776AB' },
    { n: 'PyQt5', i: SiQt, c: '#41CD52' },
    { n: 'Nuitka', i: FiPackage, c: '#0EA5E9' },
  ] },
  { id: 'web', skills: [
    { n: 'HTML', i: SiHtml5, c: '#E34F26' },
    { n: 'CSS', i: FaCss3Alt, c: '#1572B6' },
    { n: 'JavaScript', i: SiJavascript, c: '#D9A800' },
    { n: 'React.js', i: SiReact, c: '#08A4C8' },
    { n: 'Node.js', i: SiNodedotjs, c: '#5FA04E' },
    { n: 'Tailwind CSS', i: SiTailwindcss, c: '#0E9CB8' },
    { n: 'Bootstrap', i: SiBootstrap, c: '#7952B3' },
    { n: 'JSON', i: SiJson, c: null },
  ] },
  { id: 'data', skills: [
    { n: 'MySQL', i: SiMysql, c: '#4479A1' },
    { n: 'SQLite', i: SiSqlite, c: '#0F80CC' },
    { n: 'Access', i: FaDatabase, c: '#A4373A' },
  ] },
  { id: 'tools', skills: [
    { n: 'Git', i: SiGit, c: '#F05032' },
    { n: 'GitHub', i: SiGithub, c: null },
    { n: 'VS Code', i: VscVscode, c: '#007ACC' },
    { n: 'XAMPP', i: SiXampp, c: '#FB7A24' },
    { n: 'phpMyAdmin', i: SiPhpmyadmin, c: '#F89C0E' },
  ] },
];
