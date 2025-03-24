import { GetServerSideProps } from 'next';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';  // Usamos useRouter para la navegación eficiente

interface PokemonPageProps {
  pokemon: any;
  nextId: number;
  prevId: number;
}

const PokemonDetailsPage = ({ pokemon, nextId, prevId }: PokemonPageProps) => {
  const [isShiny, setIsShiny] = useState(false);
  const [speciesData, setSpeciesData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // Función para ir al siguiente Pokémon
  const goToNextPokemon = () => {
    router.push(`/pokemon/${nextId}`);
  };

  // Función para ir al Pokémon anterior
  const goToPrevPokemon = () => {
    router.push(`/pokemon/${prevId}`);
  };

  // Función para volver al inicio (página principal)
  const goToHome = () => {
    router.push(`/`);
  };

  // Obtener la descripción del Pokémon
  useEffect(() => {
    const fetchSpeciesData = async () => {
      try {
        const res = await fetch(pokemon?.species?.url);
        if (!res.ok) throw new Error('Error al cargar los datos del Pokémon');
        const data = await res.json();
        setSpeciesData(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };
    if (pokemon?.species?.url) fetchSpeciesData();
  }, [pokemon]);

  const toggleShiny = () => setIsShiny(!isShiny);

  // Obtener las imágenes según el modo (normal o shiny)
  const getFrontSprite = () => {
    if (pokemon?.sprites) {
      return isShiny
        ? pokemon.sprites.front_shiny ?? '/path/to/default_image.png'
        : pokemon.sprites.front_default ?? '/path/to/default_image.png';
    }
    return '/path/to/default_image.png'; // Imagen por defecto si `pokemon` o `sprites` no están disponibles
  };

  const getBackSprite = () => {
    if (pokemon?.sprites) {
      return isShiny
        ? pokemon.sprites.back_shiny ?? '/path/to/default_image.png'
        : pokemon.sprites.back_default ?? '/path/to/default_image.png';
    }
    return '/path/to/default_image.png'; // Imagen por defecto si `pokemon` o `sprites` no están disponibles
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
      {/* 🔹 ENCABEZADO */}
      <header className="p-6 bg-gray-800 text-white text-center shadow-md">
        <h1 className="text-5xl font-bold tracking-wider capitalize">{pokemon.name}</h1>
        <p className="text-2xl">#{pokemon.id}</p>
      </header>

      {/* 🔹 IMÁGENES DEL POKÉMON */}
      <div className="flex justify-center items-center space-x-16 mb-8">
        <img
          src={getFrontSprite()}
          alt={`${pokemon?.name || 'Pokémon desconocido'} Front`}
          className="w-80 h-80 rounded-lg shadow-xl transform transition-all hover:scale-105"
        />
        <img
          src={getBackSprite()}
          alt={`${pokemon?.name || 'Pokémon desconocido'} Back`}
          className="w-80 h-80 rounded-lg shadow-xl transform transition-all hover:scale-105"
        />
      </div>

      {/* 🔹 BOTÓN PARA CAMBIAR ENTRE SHINY Y NORMAL */}
      <div className="flex justify-center mb-6">
        <button
          onClick={toggleShiny}
          className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white text-xl font-semibold rounded-full shadow-lg transition-all"
        >
          {isShiny ? 'Modo Normal' : 'Modo Shiny'}
        </button>
      </div>

      {/* 🔹 DESCRIPCIÓN DEL POKÉMON */}
      {loading && <p className="text-gray-300 text-xl">Cargando descripción...</p>}
      {error && <p className="text-red-500 text-xl">{error}</p>}
      {speciesData && !loading && (
        <div className="bg-gray-800 p-6 rounded-2xl shadow-md mt-8 w-full md:w-2/3">
          <h2 className="text-3xl font-semibold text-white mb-4">Descripción</h2>
          <p className="text-gray-300 text-lg text-justify">
            {speciesData.flavor_text_entries?.find(
              (entry: any) => entry.language.name === 'es'
            )?.flavor_text || 'Descripción no disponible.'}
          </p>
        </div>
      )}

      {/* 🔹 INFORMACIÓN DEL POKÉMON */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full px-6 mt-12">
        {/* Información básica */}
        <div className="bg-gray-800 p-8 rounded-2xl shadow-md">
          <h2 className="text-3xl font-semibold text-white mb-6">Información Básica</h2>
          <div className="text-xl text-gray-300">
            <p><span className="font-bold text-blue-400">Altura:</span> {pokemon?.height || 'Desconocida'} dm</p>
            <p><span className="font-bold text-blue-400">Peso:</span> {pokemon?.weight || 'Desconocido'} hg</p>
            <p><span className="font-bold text-blue-400">Experiencia Base:</span> {pokemon?.base_experience || 'Desconocida'}</p>
          </div>
        </div>

        {/* Tipos */}
        <div className="bg-gray-800 p-8 rounded-2xl shadow-md">
          <h2 className="text-3xl font-semibold text-white mb-6">Tipos</h2>
          <div className="flex flex-wrap gap-6 mt-4">
            {pokemon?.types?.map((type: any, index: number) => (
              <span
                key={index}
                className="bg-gray-700 text-gray-200 px-6 py-3 rounded-full text-xl capitalize shadow-md transition-transform transform hover:scale-105"
              >
                {type.type.name}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* MOVIMIENTOS */}
      <div className="bg-gray-800 p-8 rounded-2xl shadow-md w-full mt-12">
        <h2 className="text-3xl font-semibold text-white mb-6">Movimientos</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
          {pokemon?.moves?.slice(0, 12).map((move: any, index: number) => (
            <span
              key={index}
              className="bg-gray-700 text-gray-300 px-6 py-3 rounded-lg text-xl capitalize shadow-md transition-transform transform hover:scale-105"
            >
              {move.move.name}
            </span>
          ))}
        </div>
      </div>

      {/* 🔹 PÁGINA DE NAVEGACIÓN */}
      <div className="flex justify-between container mx-auto p-6 mt-8">
        <button
          onClick={goToPrevPokemon}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md"
        >
          Pokémon Anterior
        </button>
        <button
          onClick={goToNextPokemon}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md"
        >
          Próximo Pokémon
        </button>
      </div>

      {/* 🔹 BOTÓN PARA VOLVER A LA PÁGINA PRINCIPAL */}
      <div className="flex justify-center mb-6">
        <button
          onClick={goToHome}
          className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md"
        >
          Volver a la Página Principal
        </button>
      </div>

      {/* 🔹 PIE DE PÁGINA */}
      <footer className="p-6 bg-gray-800 text-white text-center mt-auto">
        <p className="text-sm">© {new Date().getFullYear()} Pokedex Kanto</p>
        <div className="flex justify-center space-x-6 mt-2">
          <a href="https://pokeapi.co/" target="_blank" className="hover:underline">PokéAPI</a>
          <a href="https://github.com/" target="_blank" className="hover:underline">GitHub</a>
        </div>
      </footer>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params as { id: string };

  try {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    if (!res.ok) {
      return { notFound: true }; // Manejo de error 404 si el Pokémon no existe
    }
    const data = await res.json();

    // Navegación entre los Pokémon (circular)
    const nextId = parseInt(id) < 151 ? parseInt(id) + 1 : 1;
    const prevId = parseInt(id) > 1 ? parseInt(id) - 1 : 151;

    return {
      props: {
        pokemon: data,
        nextId,
        prevId
      }
    };
  } catch (error) {
    return { notFound: true }; // Si hay error, retorna un 404
  }
};

export default PokemonDetailsPage;
