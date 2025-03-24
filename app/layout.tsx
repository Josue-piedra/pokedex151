import './globals.css';
import Link from 'next/link';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="Pokedex Kanto - La mejor colección de Pokémon de la región de Kanto" />
        <title>Pokedex Kanto</title>
      </head>
      <body className="bg-gray-900 text-gray-300 min-h-screen flex flex-col">
        {/* 🔹 ENCABEZADO  */}
        <header className="p-6 bg-gray-800 text-white text-center shadow-md flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-3">
            {/* Ruta relativa a la imagen que está en 'public/images/1033032.png' */}
            <img src="/images/1033032.png" alt="Pokeball Logo" className="w-12 h-12" />
            <h1 className="text-4xl font-bold tracking-wider uppercase">Pokedex Kanto</h1>
          </Link>
        </header>

        {/* 🔹 CONTENIDO PRINCIPAL */}
        <main className="flex-1 container mx-auto p-6">{children}</main>

        {/* 🔹 PIE DE PÁGINA */}
        <footer className="p-6 bg-gray-800 text-white text-center">
          <p className="text-sm">© {new Date().getFullYear()} Pokedex Kanto</p>
          <div className="flex justify-center space-x-6 mt-2">
            <Link href="https://pokeapi.co/" target="_blank" className="hover:underline">PokéAPI</Link>
            <Link href="https://github.com/" target="_blank" className="hover:underline">GitHub</Link>
          </div>
        </footer>
      </body>
    </html>
  );
}