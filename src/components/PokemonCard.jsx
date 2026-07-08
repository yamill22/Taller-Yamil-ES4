import React from 'react';

function PokemonCard({ pokemon, isFavorite, onToggleFavorite, onBlockPokemon }) {
  const pokemonId = pokemon.url.split('/')[6];
  const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonId}.png`;

  return (
    <div className="bg-purple-200/60 border border-purple-300 p-4 sm:p-5 rounded-2xl shadow-sm flex flex-col items-center justify-between transition-all duration-200 hover:shadow-md hover:border-purple-400">
      
      <div className="w-24 h-24 sm:w-28 sm:h-28 flex justify-center items-center mb-3 sm:mb-4">
        <img 
          src={imageUrl} 
          alt={pokemon.name} 
          className="w-full h-full object-contain transform transition-transform duration-200 hover:scale-110"
          loading="lazy"
        />
      </div>

      <div className="text-center mb-3 sm:mb-4">
        <h3 className="text-sm sm:text-base font-bold text-purple-900 capitalize tracking-wide">
          {pokemon.name}
        </h3>
        <span className="text-[11px] sm:text-xs font-medium text-purple-500 block mt-0.5">
          #{pokemonId.padStart(3, '0')}
        </span>
      </div>

      <div className="flex flex-col xs:grid xs:grid-cols-2 gap-2 w-full">
        <button
          onClick={() => onToggleFavorite(pokemon)}
          className={`py-2 px-1.5 rounded-xl text-[11px] font-bold transition-all duration-150 flex items-center justify-center gap-1 cursor-pointer shadow-sm w-full ${
            isFavorite
              ? 'bg-yellow-400 text-yellow-950 hover:bg-yellow-300'
              : 'bg-purple-100 text-purple-700 hover:bg-purple-200/80 border border-purple-300/40'
          }`}
        >
          <span>{isFavorite ? '★' : '☆'}</span>
          <span>{isFavorite ? 'Fav' : 'Guardar'}</span>
        </button>

        <button
          onClick={() => onBlockPokemon(pokemon.name)}
          className="py-2 px-1.5 rounded-xl text-[11px] font-bold bg-red-100 hover:bg-red-200 text-red-700 border border-red-200/50 transition-all duration-150 flex items-center justify-center gap-1 cursor-pointer shadow-sm w-full"
          title="Ocultar Pokémon de la lista"
        >
          <span>🚫</span>
          <span>Bloquear</span>
        </button>
      </div>

    </div>
  );
}

export default PokemonCard;