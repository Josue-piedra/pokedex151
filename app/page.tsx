'use client';

import { useState } from 'react';
import { useTranslation } from 'react-i18next';  // Importamos el hook de traducción
import { usePokemons } from '@/hooks/usePokemons';
import PokemonCard from '@/componentes/PokemonCard';
import Pagination from '@/componentes/Pagination';
import SearchBar from '@/componentes/SearchBar';
import LanguageSwitcher from '@/componentes/LanguageSwitcher';  // Importamos el LanguageSwitcher

const HomePage = () => {
  const { t } = useTranslation('common');  // Usamos 'common' como el archivo de traducción
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');
  const { pokemonList, loading } = usePokemons(page, query);

  // Filtrar los Pokémon por nombre
  const filteredPokemons = pokemonList.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(query.toLowerCase())
  );

  const cardsPerPage = 18;
  const displayedPokemons = filteredPokemons.slice((page - 1) * cardsPerPage, page * cardsPerPage);
  const totalPages = Math.ceil(filteredPokemons.length / cardsPerPage);

  return (
    <div className="w-full h-full p-0">
      <div className="text-left py-6 px-6 sm:px-12 lg:px-24 text-white">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-6xl font-extrabold">{t('kantoPokemons')}</h1> {/* Traducimos el título */}
          <LanguageSwitcher />  {/* Agregamos el LanguageSwitcher */}
        </div>
        <SearchBar setQuery={setQuery} />
      </div>

      {loading ? (
        <p className="text-white text-center text-3xl">{t('loading')}</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-8 p-6">
          {displayedPokemons.length > 0 ? (
            displayedPokemons.map((pokemon, index) => (
              <PokemonCard key={pokemon.name || index} pokemon={pokemon} />
            ))
          ) : (
            <p className="text-white text-center col-span-full text-3xl">{t('noPokemonsFound')}</p>
          )}
        </div>
      )}

      <div className="text-center mt-15">
        <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
      </div>
    </div>
  );
};

export default HomePage;
