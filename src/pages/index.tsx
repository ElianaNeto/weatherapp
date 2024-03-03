import styles from '../../styles/Home.module.scss'
import { useState, useEffect, } from 'react';
import { Busca } from '@/components/Busca';
import { Previsao } from '@/components/Previsao';
import { ClimaActual } from '@/components/ClimaActual';
import { MdMyLocation } from "react-icons/md";
import { api } from '@/services/api';


export default function Home() {

  const [cidade, setCidade] = useState("");
  const [dadosDoClima, setDadosDoClima] = useState({});
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
      const respostaDef = await api.get(`/current.json?key=${apikey}&q=${lat},${lon}&aqi=no`)
      const respostaPrevisaoDef = await api.get(`/forecast.json?key=${apikey}&q=${lat},${lon}&days=10&aqi=no&alerts=no`)

      setCidade(respostaDef.data.location.name);
      setDadosDoClima(respostaDef.data)
      setPrevisaoDias(respostaPrevisaoDef.data.forecast.forecastday.slice(1, 6))
      setPrevisaoHoras(respostaPrevisaoDef.data.forecast.forecastday?.[0].hour.slice(0, 5))

    })
  }

  const buscarClima = async () => {
    try {
      const apikey = process.env.NEXT_PUBLIC_API_KEY;

      const respostaClima = await api.get(`/current.json?key=${apikey}&q=${cidade}&aqi=no`)
      const respostaPrevisao = await api.get(`/forecast.json?key=${apikey}&q=${cidade}&days=7&aqi=no&alerts=no`)
      setDadosDoClima(respostaClima.data)
      setPrevisaoDias(respostaPrevisao.data.forecast.forecastday.slice(1, 6))
      setPrevisaoHoras(respostaPrevisao.data.forecast.forecastday?.[0].hour.slice(0, 5))
      const newCity = [...historico, cidade]
      setHistorco(newCity);
      setShowBusca(false)
    } catch (error) {
      console.log("Erro ao buscar clima: ", error)
    }

  };

  return (
    <div className={styles.mainContainer}>
      <div className={styles.secondContainer}>
        <Busca cidade={cidade} historico={historico} setCidade={setCidade} buscarClima={buscarClima} open={showBusca} onClose={handleBusca} />
        <div className={`${"modal"} ${!showBusca ? "display-block" : "display-none"}`}>
          <div className='buscaDiv'>
            <button className={styles.btnShowBusca} onClick={handleBusca}>Search for places</button>
            <button className={styles.realLocation} onClick={handleLocation}><MdMyLocation /></button>
          </div>

        </div>
        {
          !showBusca && dadosDoClima && (
            <ClimaActual clima={dadosDoClima} />
          )
        }

      </div>
      <Previsao previsoesHoras={previsaoHoras} previsoesDias={previsaoDias} clima={dadosDoClima} />
    </div>
  )
}
