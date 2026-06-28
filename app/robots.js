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
    sitemap: 'https://batdacademy.com/sitemap.xml',
  };
}