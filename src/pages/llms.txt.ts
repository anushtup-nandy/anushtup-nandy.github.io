import type { APIContext } from 'astro';
import { getCollection } from 'astro:content';
import { site } from '../data/site';
import { experience } from '../data/experience';
import { projects } from '../data/projects';
import { publications } from '../data/publications';
import { isoDate } from '../utils';

/**
 * /llms.txt — the llmstxt.org index answer engines read instead of scraping
 * rendered HTML. Generated from the same data the pages render, so it cannot
 * drift out of date.
 */
export async function GET({ site: origin }: APIContext): Promise<Response> {
  const url = (path: string) => new URL(path, origin).href;
  const strip = (html: string) => html.replace(/<[^>]+>/g, '');

  const posts = (await getCollection('blog', ({ data }) => !data.draft)).sort(
    (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf()
  );

  const body = `# ${site.name}

> ${site.role}. ${site.positioning}

Contact: ${site.email} · ${site.location}
GitHub: ${site.socials.github}
LinkedIn: ${site.socials.linkedin}

## Experience
${experience.map((r) => `- **${r.title}**, ${r.org} (${r.period}): ${r.detail}`).join('\n')}

## Publications
${publications.map((p) => `- [${p.title}](${url(p.pdf)}): ${strip(p.authors)}. ${p.venue}`).join('\n')}

## Projects
${projects.map((p) => `- **${p.title}** (${p.badge}; ${p.tags.join(', ')}): ${p.description}${p.github ? ` — ${p.github}` : ''}`).join('\n')}

## Writing
${posts.length
  ? posts.map((p) => `- [${p.data.title}](${url(`/blog/${p.id}/`)}) (${isoDate(p.data.pubDate)}): ${p.data.description}`).join('\n')
  : '- No published posts yet.'}

## Optional
- [Full site](${url('/')})
- [RSS feed](${url('/rss.xml')})
- [Sitemap](${url('/sitemap-index.xml')})
`;

  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
