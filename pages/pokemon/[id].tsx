import { GetServerSideProps } from 'next';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

interface PokemonPageProps {
  pokemon: any;
  nextId: number;
  prevId: number;
}

// feat: add interactive Pokémon details page with shiny toggle and navigation
const PokemonDetailsPage = ({ pokemon, nextId, prevId }: PokemonPageProps) => {
  const [isShiny, setIsShiny] = useState(false);
  const [speciesData, setSpeciesData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

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

  const toggleShiny = () => setIsShiny((prev) => !prev);
  const getSprite = (type: 'front' | 'back') => isShiny ? pokemon.sprites[`${type}_shiny`] : pokemon.sprites[`${type}_default`];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-gray-200 flex flex-col items-center p-8 w-full">
      <header className="text-center mb-6 w-full">
        <h1 className="text-5xl font-bold tracking-wider uppercase text-gray-100">Pokédex Kanto</h1>
      </header>

      <div className="bg-gray-700 p-6 rounded-xl shadow-lg flex flex-col items-center space-y-4 w-full max-w-5xl">
        <h2 className="text-3xl font-semibold capitalize">{pokemon.name} #{pokemon.id}</h2>
        <div className="flex justify-center space-x-10 w-full">
          <img src={getSprite('front')} alt={pokemon.name} className="w-64 h-64 object-contain" />
          <img src={getSprite('back')} alt={pokemon.name} className="w-64 h-64 object-contain" />
        </div>

        {/* Botón Modo Shiny */}
        <button onClick={toggleShiny} className="px-6 py-2 bg-gray-500 hover:bg-gray-600 rounded-lg shadow-md transition w-64 mt-4">
          {isShiny ? 'Modo Normal' : 'Modo Shiny'}
        </button>

        {/* Descripción */}
        <div className="bg-gray-800 p-4 rounded-lg shadow-md w-full max-w-5xl text-center mt-4">
          <h3 className="text-xl font-semibold mb-2">Descripción</h3>
          {loading ? (
            <p className="text-gray-400">Cargando descripción...</p>
          ) : error ? (
            <p className="text-red-500">Error al cargar la descripción.</p>
          ) : (
            <p className="text-gray-300">
              {speciesData?.flavor_text_entries?.find((entry: any) => entry.language.name === 'es')?.flavor_text || 'Descripción no disponible.'}
            </p>
          )}
        </div>
      </div>

      {/* Habilidades */}
      <div className="bg-gray-700 p-4 rounded-lg shadow-md w-full max-w-5xl mt-4">
        <h3 className="text-xl font-semibold mb-2">Habilidades</h3>
        {pokemon?.abilities?.map((ability: any) => (
          <p key={ability.ability.name} className="text-gray-300">{ability.ability.name}</p>
        ))}
      </div>

      {/* Estadísticas */}
      <div className="bg-gray-700 p-4 rounded-lg shadow-md w-full max-w-5xl mt-4">
        <h3 className="text-xl font-semibold mb-2">Estadísticas</h3>
        <div className="flex space-x-4">
          {pokemon?.stats?.map((stat: any) => (
            <div key={stat.stat.name} className="w-full">
              <div className="flex justify-between">
                <p className="text-gray-300">{stat.stat.name}</p>
                <p className="text-gray-300">{stat.base_stat}</p>
              </div>
              <div className="bg-gray-600 h-2 mt-1 rounded-full">
                <div
                  style={{ width: `${(stat.base_stat / 255) * 100}%` }}
                  className="bg-green-500 h-full rounded-full"
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Movimientos */}
      <div className="bg-gray-700 p-4 rounded-lg shadow-md w-full max-w-5xl mt-4">
        <h3 className="text-xl font-semibold mb-2">Movimientos</h3>
        <div className="flex flex-wrap gap-2">
          {pokemon?.moves?.slice(0, 10).map((move: any) => (
            <span key={move.move.name} className="px-4 py-2 bg-gray-600 rounded-full text-sm text-gray-200">
              {move.move.name}
            </span>
          ))}
        </div>
      </div>

      {/* Información básica y tipos */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8 max-w-5xl w-full">
        <div className="bg-gray-700 p-4 rounded-lg shadow-md w-full">
          <h3 className="text-xl font-semibold mb-2">Información Básica</h3>
          <p>Altura: {pokemon.height} dm</p>
          <p>Peso: {pokemon.weight} hg</p>
          <p>Experiencia Base: {pokemon.base_experience}</p>
        </div>
        <div className="bg-gray-700 p-4 rounded-lg shadow-md w-full">
          <h3 className="text-xl font-semibold mb-2">Tipos</h3>
          <div className="flex space-x-2">
            {pokemon.types.map((type: any) => (
              <span key={type.type.name} className="px-4 py-2 bg-gray-600 rounded-full text-sm">
                {type.type.name}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Navegación */}
      <div className="flex justify-between mt-6 space-x-4 max-w-5xl w-full">
        <button onClick={() => router.push(`/pokemon/${prevId}`)} className="px-6 py-2 bg-gray-500 rounded-lg shadow-md hover:bg-gray-600">
          Anterior
        </button>
        <button onClick={() => router.push(`/`)} className="px-6 py-2 bg-gray-500 rounded-lg shadow-md hover:bg-gray-600">
          Inicio
        </button>
        <button onClick={() => router.push(`/pokemon/${nextId}`)} className="px-6 py-2 bg-gray-500 rounded-lg shadow-md hover:bg-gray-600">
          Siguiente
        </button>
      </div>
    </div>
  );
};

// chore: fetch Pokémon data from API and handle navigation
export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params as { id: string };
  try {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    if (!res.ok) return { notFound: true };
    const data = await res.json();
    return {
      props: {
        pokemon: data,
        nextId: parseInt(id) < 151 ? parseInt(id) + 1 : 1,
        prevId: parseInt(id) > 1 ? parseInt(id) - 1 : 151,
      },
    };
  } catch {
    return { notFound: true };
  }
};

export default PokemonDetailsPage;
