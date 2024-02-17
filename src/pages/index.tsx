import styles from '../../styles/Home.module.scss'

import { useState, useEffect, } from 'react';
import axios from 'axios';
import { Busca } from '@/components/Busca';
import { Previsao } from '@/components/Previsao';
import { ClimaActual } from '@/components/ClimaActual';
import { MdMyLocation } from "react-icons/md";


export default function Home() {

  const [cidade, setCidade] = useState("");
  const [clima, setClima] = useState({});
  const [historico, setHistorco] = useState<string[]>([]);
  const [previsaoDias, setPrevisaoDias] = useState([])
  const [previsaoHoras, setPrevisaoHoras] = useState([])
  const [showBusca, setShowBusca] = useState(false);


  const handleBusca = () => {
    setShowBusca(!showBusca);
  }

  const handleLocation = async () => {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const apikey = process.env.NEXT_PUBLIC_API_KEY;
      const lat = position.coords.latitude
      const lon = position.coords.longitude

      //usar a localizaco
      const respostaDef = await axios.get(`https://api.weatherapi.com/v1/current.json?key=${apikey}&q=${lat},${lon}&aqi=no`, {
        headers: {
          'Access-Control-Allow-Origin': '*'
        }
      })
      const respostaPrevisaoDef = await axios.get(`https://api.weatherapi.com/v1/forecast.json?key=${apikey}&q=${lat},${lon}&days=10&aqi=no&alerts=no`, {
        headers: {
          'Access-Control-Allow-Origin': '*'
        }
      })

      setCidade(respostaDef.data.location.name);
      setClima(respostaDef.data)
      setPrevisaoDias(respostaPrevisaoDef.data.forecast.forecastday.slice(1, 6))
      setPrevisaoHoras(respostaPrevisaoDef.data.forecast.forecastday?.[0].hour.slice(0, 5))

    })
  }


  useEffect(() => {
    handleLocation();
  },)


  const buscarClima = async () => {
    try {
      const apikey = process.env.NEXT_PUBLIC_API_KEY;

      const respostaClima = await axios.get(`https://api.weatherapi.com/v1/current.json?key=${apikey}&q=${cidade}&aqi=no`, { headers: {
        'Access-Control-Allow-Origin': '*'
      }})
      const respostaPrevisao = await axios.get(`https://api.weatherapi.com/v1/forecast.json?key=${apikey}&q=${cidade}&days=7&aqi=no&alerts=no`, { headers: {
        'Access-Control-Allow-Origin': '*'
      }})
      setClima(respostaClima.data)
      setPrevisaoDias(respostaPrevisao.data.forecast.forecastday.slice(1, 6))
      setPrevisaoHoras(respostaPrevisao.data.forecast.forecastday?.[0].hour.slice(0, 5))
      const newCity = [...historico, cidade]
      setHistorco(newCity);
      setShowBusca(false)
    } catch (error) {
      console.log("Erro ao buscar clima: ", error)
    }

  };
  //console.log(clima)
  //console.log(previsaoDias)
  //console.log("historico: " + historico)
  //console.log(previsaoHoras)

  return (
    <div className={styles.mainContaner}>
      <div className={styles.secondContainer}>
        <Busca cidade={cidade} historico={historico} setCidade={setCidade} buscarClima={buscarClima} open={showBusca} onClose={handleBusca} />
        <div className={`${"modal"} ${!showBusca ? "display-block" : "display-none"}`}>
          <div className='buscaDiv'>
            <button className={styles.btnShowBusca} onClick={handleBusca}>Seach for places</button>
            <button className={styles.realLocation} onClick={handleLocation}><MdMyLocation /></button>
          </div>

        </div>
        {
          showBusca === false && (
            <ClimaActual clima={clima} />
          )
        }

      </div>
      <Previsao previsoesHoras={previsaoHoras} previsoesDias={previsaoDias} clima={clima} />
    </div>
  )
}
