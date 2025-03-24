'use client';

import { useState, useEffect } from 'react';

const SearchBar = ({ setQuery }: { setQuery: React.Dispatch<React.SetStateAction<string>> }) => {
  const [input, setInput] = useState('');

  const handleSearch = () => {
    if (input.trim() === '') {
      // Si el input está vacío, mostramos todos los Pokémon (reestablecemos la búsqueda)
      setQuery('');
    } else {
      // Si el input no está vacío, hacemos la búsqueda
      setQuery(input.trim());
    }
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
    if (input.trim() === '') {
      // Si no hay texto en el input, podemos restablecer el estado de la búsqueda
      setQuery('');
    }
  }, [input, setQuery]);

  return (
    <div className="mb-4 flex justify-left space-x-2">
      {/* Input de búsqueda */}
      <input
        type="text"
        value={input}
        onChange={handleChange}
        onKeyDown={handleKeyDown}  // Ejecuta la búsqueda cuando presionas Enter
        className="w-80 p-2 rounded-md border border-gray-700 bg-gray-800 text-white"
        placeholder="Busca un Pokémon..."
      />
    </div>
  );
};

export default SearchBar;
