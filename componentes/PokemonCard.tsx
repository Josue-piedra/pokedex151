'use client';

import { useTranslation } from 'react-i18next'; // Importa el hook useTranslation
import Link from 'next/link';

interface Pokemon {
  name: string;
  url?: string;
  id?: number;
}

const PokemonCard = ({ pokemon }: { pokemon: Pokemon }) => {
  const { t } = useTranslation('common'); // Usamos 'common' para acceder a las traducciones

  // fix(id): Corrige obtención del ID del Pokémon desde la URL
  let pokemonId: string | number = pokemon.id || '';
  if (!pokemonId && pokemon.url) {
    const parts = pokemon.url.split('/');
    pokemonId = parts[parts.length - 2];
  }

  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-2xl hover:scale-105 transition-all transform w-full h-72 sm:h-80 flex flex-col justify-between m-4">
      {/* feat(routing): Agregar enlace a la página de detalles del Pokémon */}
      <Link href={`/pokemon/${pokemonId}`} aria-label={t('viewDetails', { name: pokemon.name })}>
        <div className="text-center flex flex-col justify-between h-full">
          <h2 className="font-extrabold text-2xl text-white capitalize mb-4">
            {t('pokemon_name', { name: pokemon.name })} {/* Traducción dinámica del nombre del Pokémon */}
          </h2>
          {/* feat(ui): Muestra imagen del Pokémon usando la API de sprites */}
          <img
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`}
            alt={pokemon.name}
            className="mx-auto w-48 h-48 object-contain transition-all transform hover:scale-110"
          />
        </div>
      </Link>
    </div>
  );
};

export default PokemonCard;

// fix(id): Corregir la obtención del ID del Pokémon desde la URL
// feat(routing): Agregar enlace a la página de detalles del Pokémon
// feat(ui): Mostrar imagen del Pokémon usando la API de sprites
