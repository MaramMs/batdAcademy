import { SITE_URL } from "@/lib/seoMeta";
import { buildSitemapIndexXml } from "@/lib/sitemapXml";
import { routing } from "@/i18n/routing";

export const revalidate = 21600; // 6 hours

export async function GET(_request, { params }) {
  const { locale } = await params;
  if (!routing.locales.includes(locale)) {
    return new Response("Not Found", { status: 404 });
  }

  const now = new Date().toISOString();
  const base = `${SITE_URL}/${locale}`;
  const sitemaps = [
    { loc: `${base}/sitemap-courses.xml`, lastmod: now },
    { loc: `${base}/sitemap-categories.xml`, lastmod: now },
    { loc: `${base}/sitemap-specializations.xml`, lastmod: now },
    { loc: `${base}/sitemap-posts.xml`, lastmod: now },
  ];

  return new Response(buildSitemapIndexXml(sitemaps), {
    headers: { "Content-Type": "application/xml" },
  });
}
