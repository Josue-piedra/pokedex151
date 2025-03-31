// next.config.mjs
import pkg from './next-i18next.config.mjs'; // Import the default export
const { i18n } = pkg; // Destructure to get the i18n configuration

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  i18n, // Use the extracted i18n configuration
};
