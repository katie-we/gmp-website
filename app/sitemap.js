import { getAllLetters } from '../lib/letters';
import { SITE } from '../data/site';

const STATIC_PAGES = [
  { url: `${SITE.url}/`,          lastModified: '2026-05-21' },
  { url: `${SITE.url}/practices/`, lastModified: '2026-05-21' },
  { url: `${SITE.url}/letters/`,   lastModified: '2026-05-21' },
  { url: `${SITE.url}/about/`,     lastModified: '2026-05-21' },
];

export default function sitemap() {
  const letters = getAllLetters();
  const letterUrls = letters.map((letter) => ({
    url: `${SITE.url}/letters/${letter.slug}/`,
    lastModified: letter.date,
  }));

  return [...STATIC_PAGES, ...letterUrls];
}
