import React from 'react'
import Image from 'next/image'
import styles from './styles.module.scss'
import { getDayOfWeek, getMonthName, removeDot } from '@/utils/modules/date'
import { ClimaActualProps } from '../ClimaActual';
import { FaLocationArrow } from 'react-icons/fa';
import ProgressBar from 'react-bootstrap/ProgressBar';



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
    condition: {
      icon: string;
      text: string;
    };
  };
}

interface PrevisaoProps {
  previsoesHoras: PrevisaoHora[];
  previsoesDias: PrevisaoDia[];
  clima: ClimaActualProps;
}


export function Previsao({ previsoesHoras, previsoesDias, clima }: PrevisaoProps) {

  return (
    <div className={styles.containerPrevisao}>
      {/*<h4>Previsao para os proximos dias</h4>*/}
      <ul>
        { //Proximos dias
          previsoesDias.map((prev, index) => (
            <li key={index}>
              <span>{getDayOfWeek(prev.date)} </span>
              <Image src={'https:' + prev.day.condition.icon} alt={prev.day.condition.text} width={64} height={64} />
              <div className={styles.tempContainer}>
                <p className={styles.tempMax}>{removeDot(prev.day.maxtemp_c)}°C</p>
                <p className={styles.tempMin}>{removeDot(prev.day.mintemp_c)}°C</p>
              </div>
            </li>
          ))
        }
      </ul>

      <h2>Today’s Hightlights </h2>
      <div className={styles.container}>
        <div className={styles.windContainer}>
          <p className={styles.titleWind}>Wind status</p>

          <p className={styles.windmph}>{clima.current?.wind_mph} <span>mph</span></p>


          <div className={styles.windDir}>
            <div><FaLocationArrow /></div>

            <p>{clima.current?.wind_dir}</p>
          </div>
        </div>


        <div className={styles.humiContainer}>
          <p className={styles.titleWind}>Humidity</p>
          <p className={styles.windmph}>{clima.current?.humidity} <span>%</span></p>


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
        <div className={styles.windContainer}>C</div>
        <div className={styles.windContainer}>D</div>
      </div>


    </div>


  )
}
