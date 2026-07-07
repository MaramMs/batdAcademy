import { SITE_URL } from "@/lib/seoMeta";
import { getSitemapSpecializations } from "@/action/sitemap";
import { buildUrlsetXml, buildResourceEntries } from "@/lib/sitemapXml";
import { routing } from "@/i18n/routing";

export const revalidate = 21600; // 6 hours

export async function GET(_request, { params }) {
  const { locale } = await params;
  if (!routing.locales.includes(locale)) {
    return new Response("Not Found", { status: 404 });
  }

  const items = await getSitemapSpecializations(locale);
  const entries = buildResourceEntries(items, {
    priority: 0.8,
    changefreq: "weekly",
    toPath: (item) =>
      item?.id != null && item?.slug
        ? `${SITE_URL}/${locale}/course_training/${item.id}/${encodeURIComponent(item.slug)}`
        : null,
  });

  return new Response(buildUrlsetXml(entries), {
    headers: { "Content-Type": "application/xml" },
  });
}
