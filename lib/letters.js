import { LETTERS } from '../content/letters';

export const LETTERS_PER_PAGE = 20;

export function getAllLetters() {
  return [...LETTERS].sort((a, b) => new Date(b.date) - new Date(a.date));
}

export function getLetterBySlug(slug) {
  return LETTERS.find((l) => l.slug === slug) || null;
}

export function getAllSlugs() {
  return LETTERS.map((l) => l.slug);
}

export function getLettersPage(page = 1) {
  const all = getAllLetters();
  const totalPages = Math.ceil(all.length / LETTERS_PER_PAGE);
  const start = (page - 1) * LETTERS_PER_PAGE;
  const items = all.slice(start, start + LETTERS_PER_PAGE);
  return { items, page, totalPages, total: all.length };
}

export function getFeaturedLetters(limit = 4) {
  return getAllLetters()
    .filter((l) => l.featured)
    .slice(0, limit);
}

export function getLettersByType(type) {
  return getAllLetters().filter((l) => l.type === type);
}
