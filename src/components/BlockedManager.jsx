import React from 'react';

function BlockedManager({ isOpen, onClose, blockedList, onUnblockPokemon, onUnblockAll }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-purple-950/40 backdrop-blur-xs z-50 flex items-center justify-center p-4">
      <div className="bg-purple-50 rounded-2xl border border-purple-200 shadow-2xl max-w-md w-full max-h-[80vh] flex flex-col p-6">
        
        <div className="flex items-center justify-between border-b border-purple-200 pb-4 mb-4">
          <div className="flex items-center gap-2">
            <span className="text-lg">🚫</span>
            <h2 className="text-lg font-bold text-purple-900">Pokémon Bloqueados</h2>
            <span className="bg-red-100 text-red-800 text-xs font-bold px-2 py-0.5 rounded-full">
              {blockedList.length}
            </span>
          </div>
          <button onClick={onClose} className="text-purple-400 hover:text-purple-700 text-xl font-bold cursor-pointer">
            ✕
          </button>
        </div>

        <div className="flex-1 overflow-y-auto space-y-3 pr-1">
          {blockedList.length === 0 ? (
            <div className="text-center py-12 text-purple-400">
              <p className="text-sm">No tienes ningún Pokémon bloqueado actualmente.</p>
            </div>
          ) : (
            blockedList.map((name) => (
              <div key={name} className="flex items-center justify-between bg-red-50/50 border border-red-100 p-3 rounded-xl">
                <div className="flex items-center gap-2">
                  <span className="text-xs">🚫</span>
                  <span className="text-sm font-bold text-purple-950 capitalize">{name}</span>
                </div>
                <button
                  onClick={() => onUnblockPokemon(name)}
                  className="text-xs bg-purple-200 hover:bg-purple-300 text-purple-800 font-bold px-3 py-1 rounded-lg transition-colors cursor-pointer"
                >
                  Desbloquear
                </button>
              </div>
            ))
          )}
        </div>

        {blockedList.length > 0 && (
          <div className="border-t border-purple-200 pt-4 mt-4 flex gap-3">
            <button
              onClick={onUnblockAll}
              className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold py-2.5 px-4 rounded-xl text-xs transition-colors cursor-pointer text-center"
            >
              Desbloquear Todos
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default BlockedManager;