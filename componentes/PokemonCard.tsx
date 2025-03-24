'use client';

import Link from 'next/link';

interface Pokemon {
  name: string;
  url?: string;
  id?: number;
}

const PokemonCard = ({ pokemon }: { pokemon: Pokemon }) => {
  let pokemonId: string | number = pokemon.id || '';
  if (!pokemonId && pokemon.url) {
    const parts = pokemon.url.split('/');
    pokemonId = parts[parts.length - 2];
  }

  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-2xl hover:scale-105 transition-all transform w-full h-72 sm:h-80 flex flex-col justify-between m-4">
      <Link href={`/pokemon/${pokemonId}`}>
        <div className="text-center flex flex-col justify-between h-full">
          <h2 className="font-extrabold text-2xl text-white capitalize mb-4">{pokemon.name}</h2>
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
