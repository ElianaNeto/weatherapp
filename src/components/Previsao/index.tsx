import React, { useContext, useState } from 'react'
import Image from 'next/image'
import styles from './styles.module.scss'
import { getDayOfWeek, getIconByCode, getMonthName, removeDot } from '@/utils/modules/date'
import { ClimaActualProps } from '../ClimaActual';
import { FaLocationArrow } from 'react-icons/fa';
import ProgressBar from 'react-bootstrap/ProgressBar';
import { AuthContenxt } from '@/contexts/AuthContext';


interface PrevisaoHora {
  time: string;
  temp_c: number;
  condition: {
    icon: string;
    text: string;
  };
}

interface PrevisaoDia {
  date: string;
  day: {
    maxtemp_c: number;
    mintemp_c: number;
    maxtemp_f: number;
    mintemp_f: number;
    condition: {
      icon: string;
      text: string;
      code: number;
    };
  };
}

interface PrevisaoProps {
  previsoesHoras: PrevisaoHora[];
  previsoesDias: PrevisaoDia[];
  clima: ClimaActualProps["clima"];
}


export function Previsao({ previsoesHoras, previsoesDias, clima }: PrevisaoProps) {

  // const [tempUnit, setTempUnit] = useState('tempC');
  const { tempUnit } = useContext(AuthContenxt)
  const { handleChangeTempUnit } = useContext(AuthContenxt)


  return (
    <div className={styles.containerPrevisao}>
      {/*<h4>Previsao para os proximos dias</h4>*/}
      <div className={styles.tempUnit}>
        <button
          type="button"
          className={styles.tempC}
          onClick={() => handleChangeTempUnit('tempC')}
          style={{
            backgroundColor: tempUnit === 'tempC' ? '#E7E7EB' : '#585676',
            color: tempUnit === 'tempC' ? '#110E3C' : '#e7e7eb'
          }}
        >
          °C
        </button>

        <button
          type="button"
          className={styles.tempF}
          onClick={() => handleChangeTempUnit('tempF')}
          style={{
            backgroundColor: tempUnit === 'tempF' ? '#E7E7EB' : '#585676',
            color: tempUnit === 'tempF' ? '#110E3C' : '#e7e7eb'
          }}
        >°F</button>

      </div>
      <ul>
        { //Proximos dias
          
          previsoesDias.map((prev, index) => (

            <li key={index}>
              <span>{getDayOfWeek(prev.date)} </span>
              {/*<Image src={'https:' + prev.day.condition.icon} alt={prev.day.condition.text} width={64} height={64} />*/}
              <Image src={`/icons/day/${getIconByCode(prev.day.condition.code)}.svg`} alt={prev.day.condition.text} width={64} height={64} />

              {
                tempUnit === 'tempC' ?
                  <div className={styles.tempContainer}>
                    <p className={styles.tempMax}>{removeDot(prev.day.maxtemp_c)}°C</p>
                    <p className={styles.tempMin}>{removeDot(prev.day.mintemp_c)}°C</p>
                  </div>
                  :
                  <div className={styles.tempContainer}>
                    <p className={styles.tempMax}>{removeDot(prev.day.maxtemp_f)}°F</p>
                    <p className={styles.tempMin}>{removeDot(prev.day.mintemp_f)}°F</p>
                  </div>
              }

            </li>
          ))
        }
      </ul>

      <h2>Today’s Hightlights </h2>
      <div className={styles.container}>
        <div className={styles.first}>
          <div className={styles.windContainer}>
            <p className={styles.weatherTitle}>Wind status</p>

            <p className={styles.weatherInfo}>{clima.current?.wind_mph} <span>mph</span></p>


            <div className={styles.windDir}>
              <div
                style={{ transform: `rotate(${clima.current?.wind_degree}deg)` }}><FaLocationArrow /></div>

              <p>{clima.current?.wind_dir}</p>
            </div>
          </div>

          <div className={styles.humiContainer}>
            <p className={styles.weatherTitle}>Humidity</p>
            <p className={styles.weatherInfo}>{clima.current?.humidity} <span>%</span></p>


            <div className='progressContainer'>
              <div className='progresslabel'>
                <p>0</p>
                <p>50</p>
                <p>100</p>

              </div>
              <ProgressBar now={clima.current?.humidity} />
              <span>%</span>
            </div>
          </div>

          
        </div>

        <div className={styles.second}>
        <div className={styles.visibilityContainer}>
            <p className={styles.weatherTitle}>Visibility</p>
            <p className={styles.weatherInfo}>{clima.current?.vis_miles} <span>miles</span></p>
          </div>

          <div className={styles.pressureContainer}>
            <p className={styles.weatherTitle}>Air Pressure</p>
            <p className={styles.weatherInfo}>{clima.current?.pressure_mb} <span>mb</span></p>
          </div>
        </div>

      </div>


    </div>


  )
}
