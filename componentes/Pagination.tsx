'use client';

import { useTranslation } from 'react-i18next'; // Importa useTranslation

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}) => {
  const { t } = useTranslation('common'); // Usa 'common' para acceder a las traducciones

  return (
    <div className="flex justify-center items-center mt-8 space-x-6">
      {/* feat(ui): Agregar botón para ir a la página anterior */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}  // Deshabilitar si estamos en la primera página
        className="px-8 py-3 bg-blue-600 text-white rounded-full text-xl disabled:bg-gray-500 hover:bg-blue-700 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all"
      >
        {t('previous')} {/* Traducción del texto "Anterior" */}
      </button>

      {/* feat(ui): Muestra número de página actual y total */}
      <span className="text-xl text-white mx-[100px] font-semibold">
        {currentPage} {t('of')} {totalPages} {/* Traducción del texto "de" */}
      </span>

      {/* feat(ui): Agregar botón para ir a la página siguiente */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}  // Deshabilitar si estamos en la última página
        className="px-8 py-3 bg-blue-600 text-white rounded-full text-xl disabled:bg-gray-500 hover:bg-blue-700 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all"
      >
        {t('next')} {/* Traducción del texto "Siguiente" */}
      </button>
    </div>
  );
};

export default Pagination;

// feat(ui): Agregar botones de paginación para navegar entre las páginas
