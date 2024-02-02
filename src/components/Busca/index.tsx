import React from 'react'
import styles from './styles.module.scss'
import { IoClose } from "react-icons/io5";


interface BuscaProps {
  cidade: string;
  setCidade: (nome: string) => void;
  buscarClima: () => void;
  open: boolean;
  onClose: () => void;
}

export function Busca({ cidade, setCidade, buscarClima, open, onClose }: BuscaProps) {
  return (
    <div className={`${"modal"} ${open ? "display-block" : "display-none"}`}>
      <div className="modal-main">

        <div className="modal-body">
          <button type="button" className={styles.btn} onClick={onClose}><IoClose /></button>

          <div className={styles.buscaContainer}>
            <input value={cidade} onChange={(e) => setCidade(e.target.value)} type="text" placeholder='search location' />
            <button className={styles.busca} onClick={buscarClima}>Search</button>
          </div>
        </div>

      </div>

    </div>

  )
}
