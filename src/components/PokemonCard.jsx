import React from 'react';

function PokemonCard({ pokemon }) {
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

      <div className="text-center">
        <h3 className="text-base font-bold text-purple-900 capitalize tracking-wide">
          {pokemon.name}
        </h3>
        <span className="text-xs font-medium text-purple-500 block mt-1">
          #{pokemonId.padStart(3, '0')}
        </span>
      </div>

    </div>
  );
}

export default PokemonCard;