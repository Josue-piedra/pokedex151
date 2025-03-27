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
      try {
        // feat(pokemon): Solicita los primeros 151 Pokémon de la API
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=151`);
        if (!response.ok) {
          throw new Error(t('fetch_error')); // Traducción del error
        }
        const data = await response.json();
        setPokemonList(data.results); // Guardamos los primeros 151 Pokémon
      } catch (error) {
        setError(t('fetch_error')); // Asignamos el mensaje de error traducido
        console.error('Error fetching Pokémon:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemons();
  }, [page, query]); // Si cambia la página o la búsqueda, vuelve a hacer la solicitud

  return { pokemonList, loading, error };
};

// feat(pokemon): Cargar los primeros 151 Pokémon desde la API
// fix(pokemon): Manejar correctamente los errores al hacer la solicitud de Pokémon
