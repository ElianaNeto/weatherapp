import { useState, useEffect, } from 'react';
import axios from 'axios';
import styles from '../../styles/home.module.scss'
import { Busca } from '@/components/Busca';
import { Previsao } from '@/components/Previsao';
import { ClimaActual } from '@/components/ClimaActual';



export default function Home() {

  const [cidade, setCidade] = useState("");
  const [clima, setClima] = useState([])
  const [previsao, setPrevisao] = useState([])
  const apikey = process.env.VITE_API_KEY;

  console.log(apikey);

  const buscarClima = async () => {
    try {
      const respostaClma = await axios.get(`https://api.weatherapi.com/v1/current.json?key=${apikey}&q=${cidade}&aqi=no`)
      setClima(respostaClma.data)
    } catch (error) {
      console.log("Erro ao buscar clima: ", error)
    }
  };
  console.log(clima)

  return (
    <div>
      <h2>Condicoes climaticas!</h2>
      <Busca cidade={cidade} setCidade={setCidade} buscarClima={buscarClima} />
      <ClimaActual />
      <Previsao />
    </div>
  )

}
