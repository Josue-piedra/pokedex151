'use client';

const Pagination = ({
    currentPage,
    totalPages,
    onPageChange,
}: {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}) => {
    return (
        <div className="flex justify-center items-center mt-8 space-x-6">
            {/* Botón de página anterior */}
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}  // Deshabilitar si estamos en la primera página
                className="px-8 py-3 bg-blue-600 text-white rounded-full text-xl disabled:bg-gray-500 hover:bg-blue-700 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all"
            >
                Anterior
            </button>

            {/* Texto mostrando el número de la página actual y el total de páginas */}
            <span className="text-xl text-white mx-[100px] font-semibold"> {/* Aproximadamente 2 cm de espacio */}
                {currentPage} de {totalPages}
            </span>

            {/* Botón de página siguiente */}
            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}  // Deshabilitar si estamos en la última página
                className="px-8 py-3 bg-blue-600 text-white rounded-full text-xl disabled:bg-gray-500 hover:bg-blue-700 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all"
            >
                Siguiente
            </button>
        </div>
    );
};

export default Pagination;
