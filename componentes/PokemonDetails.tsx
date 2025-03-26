import { GetServerSideProps } from 'next';

interface PokemonDetailsProps {
  pokemon: any;
}

const PokemonDetailsPage = ({ pokemon }: PokemonDetailsProps) => {
  return (
    <div className="p-6">
      {/* feat(ui): Muestra nombre del Pokémon */}
      <h1 className="text-4xl font-bold capitalize mb-4">{pokemon.name}</h1>

      {/* feat(ui): Agrega lista de tipos de Pokémon */}
      <div className="mb-4">
        <h2 className="text-xl font-semibold">Tipos:</h2>
        <ul>
          {pokemon.types.map((type: any) => (
            <li key={type.type.name} className="text-lg">{type.type.name}</li>
          ))}
        </ul>
      </div>

      {/* feat(ui): Muestra altura y peso del Pokémon */}
      <div className="mb-4">
        <h2 className="text-xl font-semibold">Altura y Peso:</h2>
        <p className="text-lg"><strong>Altura:</strong> {pokemon.height} dm</p>
        <p className="text-lg"><strong>Peso:</strong> {pokemon.weight} hg</p>
      </div>

      {/* feat(ui): Muestra estadísticas del Pokémon */}
      <div className="mb-4">
        <h2 className="text-xl font-semibold">Estadísticas:</h2>
        <ul>
          {pokemon.stats.map((stat: any) => (
            <li key={stat.stat.name} className="text-lg">
              <strong>{stat.stat.name}:</strong> {stat.base_stat}
            </li>
          ))}
        </ul>
      </div>

      {/* feat(ui): Muestra los primeros 10 movimientos del Pokémon */}
      <div>
        <h2 className="text-xl font-semibold">Movimientos:</h2>
        <ul>
          {pokemon.moves.slice(0, 10).map((move: any, index: number) => (
            <li key={index} className="text-lg">{move.move.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

// feat(data-fetching): Obtiene detalles del Pokémon desde la API
export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params as { id: string };

  try {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    if (!res.ok) {
      return { notFound: true }; // Manejo de error 404 si el Pokémon no existe
    }
    const data = await res.json();

    return {
      props: {
        pokemon: data,
      },
    };
  } catch (error) {
    return { notFound: true }; // Si hay error, retorna un 404
  }
};

export default PokemonDetailsPage;

// feat(ui): Mostrar detalles del Pokémon, incluyendo tipo, altura, peso, estadísticas y movimientos
// feat(data-fetching): Obtener detalles del Pokémon desde la API de PokeAPI
