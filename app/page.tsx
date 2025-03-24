'use client';

import { useState } from 'react';
import { usePokemons } from '@/hooks/usePokemons'; // Asegúrate de que el hook esté correctamente importado
import PokemonCard from '@/componentes/PokemonCard';
import Pagination from '@/componentes/Pagination';
import SearchBar from '@/componentes/SearchBar';

const HomePage = () => {
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState(''); // Estado para la búsqueda
  const { pokemonList, loading } = usePokemons(page, query); // Sin error

  // Filtrar los Pokémon por el nombre basado en el query
  const filteredPokemons = pokemonList.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(query.toLowerCase())
  );

  // Número de tarjetas por página (18 tarjetas por página: 3 filas de 6)
  const cardsPerPage = 18;

  // Asegurarnos de que solo se muestren los Pokémon correspondientes a la página actual
  const displayedPokemons = filteredPokemons.slice((page - 1) * cardsPerPage, page * cardsPerPage);

  // Número total de páginas (9 páginas si hay 151 Pokémon)
  const totalPages = Math.ceil(filteredPokemons.length / cardsPerPage);

  return (
    <div className="w-full h-full p-0">
      <div className="text-left py-6 px-6 sm:px-12 lg:px-24 text-white">
        <h1 className="text-6xl font-extrabold mb-8">Pokémons de Kanto</h1>
        {/* Barra de búsqueda */}
        <SearchBar setQuery={setQuery} />
      </div>

      {/* Mostrar cargando mientras obtenemos los datos */}
      {loading ? (
        <p className="text-white text-center text-3xl">Cargando...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-8 p-6">
          {displayedPokemons.length > 0 ? (
            displayedPokemons.map((pokemon, index) => (
              <PokemonCard key={pokemon.name || index} pokemon={pokemon} />
            ))
          ) : (
            <p className="text-white text-center col-span-full text-3xl">No se encontraron Pokémon.</p>
          )}
        </div>
      )}

      {/* Paginación */}
      <div className="text-center mt-15">
        <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
      </div>
    </div>
  );
};

export default HomePage;
