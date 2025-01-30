/* eslint-disable @typescript-eslint/no-var-requires */

const withPWA = require('next-pwa');
const { version } = require('./package.json');

const isProd = process.env.NODE_ENV === 'production';

const pwaConfig = withPWA({
  pwa: {
    dest: 'public',
    disable: !isProd,
  },
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    styledComponents: true,
  },
  images: {
    domains: [],
    remotePatterns: [],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  env: {
    NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
  },
  publicRuntimeConfig: {
    version,
  },
};

module.exports = { ...pwaConfig, ...nextConfig };
