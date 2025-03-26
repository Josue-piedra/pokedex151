import { useState, useEffect } from 'react';

export const usePokemons = (page: number, query: string) => {
  const [pokemonList, setPokemonList] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchPokemons = async () => {
      setLoading(true);
      try {
        // feat(pokemon): Solicita los primeros 151 Pokémon de la API
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=151`);
        const data = await response.json();
        setPokemonList(data.results); // Guardamos los primeros 151 Pokémon
      } catch (error) {
        console.error('Error fetching Pokémon:', error);
        // fix(pokemon): Maneja error de fetch correctamente
      } finally {
        setLoading(false);
      }
    };

    fetchPokemons();
  }, [page, query]); // Si cambia la página o la búsqueda, vuelve a hacer la solicitud

  return { pokemonList, loading };
};

// feat(pokemon): Cargar los primeros 151 Pokémon desde la API
// fix(pokemon): Manejar correctamente los errores al hacer la solicitud de Pokémon
