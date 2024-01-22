import React from 'react'

interface BuscaProps {
  cidade: string;
  setCidade: (nome: string) => void;
  buscarClima: () => void;
}

export function Busca({ cidade, setCidade, buscarClima }: BuscaProps) {
  return (
    <div>
      <input value={cidade} onChange={(e) => setCidade(e.target.value)} type="text" placeholder='Digite uma cidade ...' />
      <button onClick={buscarClima}>Buscar</button>
    </div>
  )
}
