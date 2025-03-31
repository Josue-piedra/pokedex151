import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next'; // Importa useTranslation

export const usePokemons = (page: number, query: string) => {
  const { t } = useTranslation('common'); // Usamos 'common' para las traducciones

  const [pokemonList, setPokemonList] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null); // Agregamos un estado de error

  useEffect(() => {
    const fetchPokemons = async () => {
      setLoading(true);
      setError(null); // Resetear error al comenzar una nueva búsqueda
      const limit = 18; // Puedes ajustar cuántos Pokémon quieres por página
      const offset = (page - 1) * limit; // Paginación basada en la página actual

      try {
        // Si hay una búsqueda, incluye el parámetro 'search'
        let url = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`;
        if (query.trim()) {
          url = `https://pokeapi.co/api/v2/pokemon/${query.toLowerCase()}`;
        }
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(t('fetch_error')); // Traducción del error
        }
        const data = await response.json();
        if (data.results) {
          setPokemonList(data.results); // Guardamos los resultados si hay
        } else {
          // Si la búsqueda no devuelve resultados, lanzamos un error
          setError(t('pokemon_not_found')); 
        }
      } catch (error) {
        setError(t('fetch_error')); // Asignamos el mensaje de error traducido
        console.error('Error fetching Pokémon:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemons();
  }, [page, query, t]); // Añadir 't' como dependencia para manejar cambios en las traducciones

  return { pokemonList, loading, error };
};

// feat(pokemon): Solicitar Pokémon con paginación y búsqueda por nombre
// fix(pokemon): Manejar errores de forma clara y proporcionar retroalimentación de error
