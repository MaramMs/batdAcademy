import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin(
  './i18n/request.js'
);

/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  reactCompiler: true,
  sassOptions: {
    prependData: `@import "@/sass/helpers/index";`
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'batdacademy.simplesdev.space',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'batdacademy.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
// async redirects() {
  //   return [
  //     // 1. معالجة روابط محددة قديمة تغير مسارها بالكامل
  //     // {
  //     //   source: '/old-about-us-page',
  //     //   destination: '/about',
  //     //   permanent: true, // تعني 301 Redirect
  //     // },
  //   ];
  // },
};

export default withNextIntl(nextConfig);
