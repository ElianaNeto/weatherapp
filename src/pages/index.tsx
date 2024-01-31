import { useState, useEffect, } from 'react';
import axios from 'axios';
import styles from '../../styles/home.module.scss'

import { Busca } from '@/components/Busca';
import { Previsao } from '@/components/Previsao';
import { ClimaActual } from '@/components/ClimaActual';
import dotenv from 'dotenv';

dotenv.config();


export default function Home() {

  const [cidade, setCidade] = useState("");
  const [clima, setClima] = useState([])
  const [previsaoDias, setPrevisaoDias] = useState([])
  const [previsaoHoras, setPrevisaoHoras] = useState([])
  const apikey = process.env.NEXT_PUBLIC_API_KEY;

  console.log(apikey);

  const buscarClima = async () => {
    try {
      const respostaClima = await axios.get(`https://api.weatherapi.com/v1/current.json?key=${apikey}&q=${cidade}&aqi=no`)
      const respostaPrevisao = await axios.get(`https://api.weatherapi.com/v1/forecast.json?key=${apikey}&q=${cidade}&days=7&aqi=no&alerts=no`)
      setClima(respostaClima.data)
      setPrevisaoDias(respostaPrevisao.data.forecast.forecastday.slice(1, 6))
      setPrevisaoHoras(respostaPrevisao.data.forecast.forecastday?.[0].hour.slice(0, 5))
    } catch (error) {
      console.log("Erro ao buscar clima: ", error)
    }

  };
  console.log(clima)
  console.log(previsaoDias)
  //console.log(previsaoHoras)

  return (
    <div className={styles.mainContaner}>
      <div className={styles.secondContainer}>
        <Busca cidade={cidade} setCidade={setCidade} buscarClima={buscarClima} />
        <ClimaActual clima={clima} />
      </div>
      <Previsao previsoesHoras={previsaoHoras} previsoesDias={previsaoDias} />
    </div>
  )
}
