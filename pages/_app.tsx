import { appWithTranslation } from 'next-i18next'; // Importa appWithTranslation
import '@/app/globals.css'; // Tu archivo de estilos globales

function MyApp({ Component, pageProps }: { Component: any; pageProps: any }) {
  return <Component {...pageProps} />;
}

export default appWithTranslation(MyApp); // Envuelve tu aplicación con appWithTranslation

//feat(i18n): configura el proveedor de traducción en _app.tsx