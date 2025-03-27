import NextI18Next from 'next-i18next';

const nextConfig = {
  reactStrictMode: true,
  i18n: {
    locales: ['en', 'es'], // Idiomas disponibles
    defaultLocale: 'en', // Idioma por defecto
  },
};

export default nextConfig;
