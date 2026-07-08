import React from 'react';

function PokemonCard({ pokemon, isFavorite, onToggleFavorite }) {
  const pokemonId = pokemon.url.split('/')[6];
  const imageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonId}.png`;

  return (
    <div className="bg-purple-200/60 border border-purple-300 p-6 rounded-2xl shadow-sm flex flex-col items-center justify-center transition-all duration-200 hover:shadow-md hover:border-purple-400">
      
      <div className="w-28 h-28 flex justify-center items-center mb-4">
        <img 
          src={imageUrl} 
          alt={pokemon.name} 
          className="w-full h-full object-contain transform transition-transform duration-200 hover:scale-110"
          loading="lazy"
        />
      </div>

      <div className="text-center mb-4">
        <h3 className="text-base font-bold text-purple-900 capitalize tracking-wide">
          {pokemon.name}
        </h3>
        <span className="text-xs font-medium text-purple-500 block mt-1">
          #{pokemonId.padStart(3, '0')}
        </span>
      </div>

      <button
        onClick={() => onToggleFavorite(pokemon)}
        className={`w-full py-2 px-4 rounded-xl text-xs font-bold transition-all duration-150 flex items-center justify-center gap-2 cursor-pointer shadow-sm ${
          isFavorite
            ? 'bg-yellow-400 text-yellow-950 hover:bg-yellow-300'
            : 'bg-purple-100 text-purple-700 hover:bg-purple-200/80 border border-purple-300/40'
        }`}
      >
        <span>{isFavorite ? '★' : '☆'}</span>
        <span>{isFavorite ? 'Favorito' : 'Guardar'}</span>
      </button>

    </div>
  );
}

export default PokemonCard;