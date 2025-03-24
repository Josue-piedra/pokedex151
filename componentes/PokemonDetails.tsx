import { GetServerSideProps } from 'next';

interface PokemonDetailsProps {
  pokemon: any;
}

const PokemonDetailsPage = ({ pokemon }: PokemonDetailsProps) => {
  return (
    <div className="p-6">
      {/* NOMBRE DEL POKÉMON */}
      <h1 className="text-4xl font-bold capitalize mb-4">{pokemon.name}</h1>

      {/* TIPOS */}
      <div className="mb-4">
        <h2 className="text-xl font-semibold">Tipos:</h2>
        <ul>
          {pokemon.types.map((type: any) => (
            <li key={type.type.name} className="text-lg">{type.type.name}</li>
          ))}
        </ul>
      </div>

      {/* ALTURA Y PESO */}
      <div className="mb-4">
        <h2 className="text-xl font-semibold">Altura y Peso:</h2>
        <p className="text-lg"><strong>Altura:</strong> {pokemon.height} dm</p>
        <p className="text-lg"><strong>Peso:</strong> {pokemon.weight} hg</p>
      </div>

      {/* ESTADÍSTICAS */}
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

      {/* MOVIMIENTOS */}
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
