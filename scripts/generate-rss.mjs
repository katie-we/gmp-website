import { LETTERS } from '../content/letters.js';
import { SITE } from '../data/site.js';
import { writeFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

// Ensure out/ exists (it's created by next build, but just in case)
mkdirSync(join(__dirname, '../out'), { recursive: true });

const sorted = [...LETTERS].sort((a, b) => new Date(b.date) - new Date(a.date));

const items = sorted.map(l => `
  <item>
    <title><![CDATA[${l.title}]]></title>
    <link>${SITE.url}/letters/${l.slug}/</link>
    <guid isPermaLink="true">${SITE.url}/letters/${l.slug}/</guid>
    <pubDate>${new Date(l.date).toUTCString()}</pubDate>
    <description><![CDATA[${l.excerpt || l.dek || ''}]]></description>
  </item>`).join('');

const feed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${SITE.name}</title>
    <link>${SITE.url}</link>
    <description>${SITE.description}</description>
    <language>en-us</language>
    <atom:link href="${SITE.url}/feed.xml" rel="self" type="application/rss+xml" />
    ${items}
  </channel>
</rss>`;

writeFileSync(join(__dirname, '../out/feed.xml'), feed);
console.log(`RSS feed generated: out/feed.xml (${sorted.length} items)`);
