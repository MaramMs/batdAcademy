import { SITE_URL } from "@/lib/seoMeta";

export default function robots() {
  return {
    rules: {
      userAgent: '*',
      disallow: [
        '/show_course_content_pdf/',
        '/*?page=',
        '/print',
        '/post/print/',
        '/*registerInternalCourse',
      ],
    },
    sitemap: [`${SITE_URL}/en/sitemap.xml`, `${SITE_URL}/ar/sitemap.xml`],
  };
}