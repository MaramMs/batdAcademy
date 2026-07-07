function escapeXml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export function toIsoLastmod(value) {
  const date = value ? new Date(value) : null;
  return date && !isNaN(date.getTime())
    ? date.toISOString()
    : new Date().toISOString();
}

export function buildResourceEntries(items, { toPath, priority, changefreq }) {
  const entries = [];
  for (const item of items) {
    const loc = toPath(item);
    if (!loc) continue;
    entries.push({
      loc,
      lastmod: toIsoLastmod(item?.updated_at),
      changefreq,
      priority,
    });
  }
  return entries;
}

export function buildUrlsetXml(entries) {
  const body = entries
    .map(
      ({ loc, lastmod, changefreq, priority }) => `<url>
<loc>${escapeXml(loc)}</loc>
<lastmod>${lastmod}</lastmod>
<changefreq>${changefreq}</changefreq>
<priority>${priority}</priority>
</url>`
    )
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${body}
</urlset>`;
}

export function buildSitemapIndexXml(sitemaps) {
  const body = sitemaps
    .map(
      ({ loc, lastmod }) => `<sitemap>
<loc>${escapeXml(loc)}</loc>
<lastmod>${lastmod}</lastmod>
</sitemap>`
    )
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${body}
</sitemapindex>`;
}
