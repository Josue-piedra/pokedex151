import { useState, useEffect } from 'react';

export const usePokemons = (page: number, query: string) => {
  const [pokemonList, setPokemonList] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchPokemons = async () => {
      setLoading(true);
      try {
        // Solo traemos los primeros 151 Pokémon
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=151`);
        const data = await response.json();
        setPokemonList(data.results); // Guardamos los 151 Pokémon
      } catch (error) {
        console.error('Error fetching Pokémon:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemons();
  }, [page, query]); // Si cambia la página o la búsqueda, vuelve a hacer la solicitud

  return { pokemonList, loading };
};
