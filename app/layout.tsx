// Layout.tsx

import './globals.css';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from '@/componentes/LanguageSwitcher'; // Asegúrate de importar el LanguageSwitcher

export default function Layout({ children }: { children: React.ReactNode }) {
  const { i18n } = useTranslation();  // Usamos useTranslation para acceder a la configuración de idioma

  return (
    <html lang={i18n.language}> {/* Establece dinámicamente el idioma según el contexto */}
      <head>
        {/* feat(seo): Agrega meta etiquetas para mejorar SEO y accesibilidad */}
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="Pokedex Kanto - La mejor colección de Pokémon de la región de Kanto" />
        <title>Pokedex Kanto</title>
      </head>
      <body className="bg-gray-900 text-gray-300 min-h-screen flex flex-col">
        {/* feat(layout): Añade estructura base con encabezado, contenido y pie de página */}
        <header className="p-6 bg-gray-800 text-white text-center shadow-md flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-3">
            {/* Ruta relativa a la imagen que está en 'public/images/1033032.png' */}
            <img src="/images/1033032.png" alt="Pokeball Logo" className="w-12 h-12" />
            <h1 className="text-4xl font-bold tracking-wider uppercase">Pokedex Kanto</h1>
          </Link>
        </header>

        {/* style(ui): Aplica estilos con Tailwind para mejor diseño responsivo */}
        <main className="flex-1 container mx-auto p-6">{children}</main>

        {/* feat(footer): Agrega enlaces a PokéAPI, GitHub y el LanguageSwitcher en el pie de página */}
        <footer className="p-6 bg-gray-800 text-white text-center">
          <p className="text-sm">© {new Date().getFullYear()} Pokedex Kanto</p>
          <div className="flex justify-center space-x-6 mt-2">
            <Link href="https://pokeapi.co/" target="_blank" className="hover:underline">PokéAPI</Link>
            <Link href="https://github.com/" target="_blank" className="hover:underline">GitHub</Link>
          </div>

          {/* LanguageSwitcher en el pie de página */}
          <div className="mt-4">
            <LanguageSwitcher />
          </div>
        </footer>
      </body>
    </html>
  );
}

// feat(layout): Añadir la estructura base para la página (encabezado, contenido y pie de página)
