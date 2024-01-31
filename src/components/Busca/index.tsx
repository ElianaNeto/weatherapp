import React from 'react'
import styles from './styles.module.scss'
import { MdMyLocation } from "react-icons/md";


interface BuscaProps {
  cidade: string;
  setCidade: (nome: string) => void;
  buscarClima: () => void;
}

export function Busca({ cidade, setCidade, buscarClima }: BuscaProps) {
  return (
    <div className={styles.buscaContainer}>
      <input value={cidade} onChange={(e) => setCidade(e.target.value)} type="text" placeholder='Digite uma cidade ...' />
      <button onClick={buscarClima}>Buscar</button>
      <button className={styles.realLocation}><MdMyLocation /></button>
    </div>
  )
}
