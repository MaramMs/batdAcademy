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
    experimental: {
    browsersListQuery: 'chrome >= 87, firefox >= 78, safari >= 14, edge >= 88'
  }
};

export default withNextIntl(nextConfig);
