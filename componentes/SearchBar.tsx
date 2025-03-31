'use client';

import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next'; // Importar useTranslation

const SearchBar = ({ setQuery }: { setQuery: React.Dispatch<React.SetStateAction<string>> }) => {
  const { t } = useTranslation('common'); // Usamos 'common' para acceder a las traducciones

  const [input, setInput] = useState('');

  const handleSearch = () => {
    // Si el input está vacío, restablecemos la búsqueda
    setQuery(input.trim() || ''); 
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    // Ejecuta la búsqueda cuando se presiona Enter
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  useEffect(() => {
    // Si el input está vacío, restablecemos el estado de la búsqueda
    if (input.trim() === '') {
      setQuery('');
    }
  }, [input, setQuery]);

  return (
    <div className="mb-4 flex justify-left space-x-2">
      {/* feat(search): Agrega barra de búsqueda para filtrar Pokémon por nombre */}
      <input
        type="text"
        value={input}
        onChange={handleChange}
        onKeyDown={handleKeyDown}  // Ejecuta la búsqueda cuando presionas Enter
        className="w-80 p-2 rounded-md border border-gray-700 bg-gray-800 text-white"
        placeholder={t('search_placeholder')} // Traducción del placeholder
        aria-label={t('searchPlaceholder')} // Agrega accesibilidad al campo de búsqueda
      />
    </div>
  );
};

export default SearchBar;

// fix(search): Optimizar manejo de búsqueda y restablecimiento al estar vacío
// feat(search): Añadir barra de búsqueda para filtrar Pokémon por nombre
