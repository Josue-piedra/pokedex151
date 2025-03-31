// pages/pokemon/[id].tsx

import { GetServerSideProps } from 'next';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from '@/componentes/LanguageSwitcher'; // Importa el LanguageSwitcher

interface PokemonPageProps {
  pokemon: any;
  nextId: number;
  prevId: number;
}

const PokemonPage = ({ pokemon, nextId, prevId }: PokemonPageProps) => {
  const { t } = useTranslation('common');
  const [isShiny, setIsShiny] = useState(false);
  const [speciesData, setSpeciesData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchSpeciesData = async () => {
      try {
        const res = await fetch(pokemon?.species?.url);
        if (!res.ok) throw new Error(t('errorLoadingSpeciesData'));
        const data = await res.json();
        setSpeciesData(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };
    if (pokemon?.species?.url) fetchSpeciesData();
  }, [pokemon, t]);

  const toggleShiny = () => setIsShiny((prev) => !prev);

  const getSprite = (type: 'front' | 'back') => isShiny
    ? pokemon.sprites[`${type}_shiny`]
    : pokemon.sprites[`${type}_default`];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-gray-200 flex flex-col items-center p-8 w-full">
      <header className="text-center mb-6 w-full">
        <h1 className="text-5xl font-bold tracking-wider uppercase text-gray-100">{t('pokedexTitle')}</h1>
      </header>

      <div className="bg-gray-700 p-6 rounded-xl shadow-lg flex flex-col items-center space-y-4 w-full max-w-5xl">
        <h2 className="text-3xl font-semibold capitalize">{pokemon.name} #{pokemon.id}</h2>
        <div className="flex justify-center space-x-10 w-full">
          <img
            src={getSprite('front')}
            alt={`${pokemon.name} (${isShiny ? 'Shiny' : 'Normal'}) front view`}
            className="w-64 h-64 object-contain"
          />
          <img
            src={getSprite('back')}
            alt={`${pokemon.name} (${isShiny ? 'Shiny' : 'Normal'}) back view`}
            className="w-64 h-64 object-contain"
          />
        </div>

        <button
          onClick={toggleShiny}
          className="px-6 py-2 bg-gray-500 hover:bg-gray-600 rounded-lg shadow-md transition w-64 mt-4"
        >
          {isShiny ? t('normalMode') : t('shinyMode')}
        </button>

        <div className="bg-gray-800 p-4 rounded-lg shadow-md w-full max-w-5xl text-center mt-4">
          <h3 className="text-xl font-semibold mb-2">{t('description')}</h3>
          {loading ? (
            <p className="text-gray-400">{t('loadingDescription')}</p>
          ) : error ? (
            <p className="text-red-500">{error}</p> // Mostrar error específico
          ) : (
            <p className="text-gray-300">
              {speciesData?.flavor_text_entries?.find((entry: any) => entry.language.name === 'es')?.flavor_text || t('descriptionNotAvailable')}
            </p>
          )}
        </div>
      </div>

      <div className="bg-gray-700 p-4 rounded-lg shadow-md w-full max-w-5xl mt-4">
        <h3 className="text-xl font-semibold mb-2">{t('abilities')}</h3>
        {pokemon?.abilities?.map((ability: any) => (
          <p key={ability.ability.name} className="text-gray-300">{ability.ability.name}</p>
        ))}
      </div>

      <div className="bg-gray-700 p-4 rounded-lg shadow-md w-full max-w-5xl mt-4">
        <h3 className="text-xl font-semibold mb-2">{t('stats')}</h3>
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

      <div className="bg-gray-700 p-4 rounded-lg shadow-md w-full max-w-5xl mt-4">
        <h3 className="text-xl font-semibold mb-2">{t('moves')}</h3>
        <div className="flex flex-wrap gap-2">
          {pokemon?.moves?.slice(0, 10).map((move: any) => (
            <span key={move.move.name} className="px-4 py-2 bg-gray-600 rounded-full text-sm text-gray-200">
              {move.move.name}
            </span>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8 max-w-5xl w-full">
        <div className="bg-gray-700 p-4 rounded-lg shadow-md w-full">
          <h3 className="text-xl font-semibold mb-2">{t('basicInfo')}</h3>
          <p>{t('height')}: {pokemon.height} dm</p>
          <p>{t('weight')}: {pokemon.weight} hg</p>
          <p>{t('baseExperience')}: {pokemon.base_experience}</p>
        </div>
        <div className="bg-gray-700 p-4 rounded-lg shadow-md w-full">
          <h3 className="text-xl font-semibold mb-2">{t('types')}</h3>
          <div className="flex space-x-2">
            {pokemon.types.map((type: any) => (
              <span key={type.type.name} className="px-4 py-2 bg-gray-600 rounded-full text-sm">
                {type.type.name}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-between mt-6 space-x-4 max-w-5xl w-full">
        <button onClick={() => router.push(`/pokemon/${prevId}`)} className="px-6 py-2 bg-gray-500 rounded-lg shadow-md hover:bg-gray-600">
          {t('previous')}
        </button>
        <button onClick={() => router.push(`/`)} className="px-6 py-2 bg-gray-500 rounded-lg shadow-md hover:bg-gray-600">
          {t('home')}
        </button>
        <button onClick={() => router.push(`/pokemon/${nextId}`)} className="px-6 py-2 bg-gray-500 rounded-lg shadow-md hover:bg-gray-600">
          {t('next')}
        </button>
      </div>

      {/* Pie de página con el LanguageSwitcher */}
      <footer className="w-full flex justify-center mt-8">
        <LanguageSwitcher />
      </footer>
    </div>
  );
};

// Server-side props
export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params as { id: string }; // Obtén el ID desde la URL
  try {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    if (!res.ok) throw new Error('Error fetching Pokémon data');
    const data = await res.json();

    const nextId = parseInt(id) < 151 ? parseInt(id) + 1 : 1;
    const prevId = parseInt(id) > 1 ? parseInt(id) - 1 : 151;

    return {
      props: {
        pokemon: data,
        nextId,
        prevId,
      },
    };
  } catch (error) {
    return { notFound: true }; // Retorna 404 en caso de error
  }
};

export default PokemonPage;
