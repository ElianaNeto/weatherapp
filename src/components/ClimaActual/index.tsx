import React from 'react'
import Image from 'next/image'
import styles from './styles.module.scss'
import { FaLocationDot } from "react-icons/fa6";
import night from '../../../public/cloudy-night-3.svg'
import { getDayOfWeek, getMonthName, removeDot } from '@/utils/modules/date'



export interface Condition {
  icon: string;
  text: string;
}

export interface CurrentWeather {
  temp_c: number;
  condition: Condition;
  wind_mph: number;
  wind_kph: number;
  wind_degree: number;
  wind_dir: string;
  pressure_mb: number;
  pressure_in: number;
  precip_mm: number;
  precip_in: number;
  humidity: number;
  cloud: number;
  feelslike_c: number;
  feelslike_f: number;
  vis_km: number;
  vis_miles: number;
  uv: number;
  gust_mph: number;
  gust_kph: number;
  // Add more properties as needed
}

export interface Location {
  name: string;
  localtime: string;
  // Add more properties as needed
}

export interface ClimaActualProps {
  clima: {
    location?: Location;
    current?: CurrentWeather;
    // Add more properties as needed
  };
}


export function ClimaActual({ clima }: ClimaActualProps) {
  return (
    <div className={styles.containerActual}>
      {clima.location && clima.current ? (
        <>
          <Image src={'https:' + clima.current.condition.icon} alt={clima.current.condition.text} width={202} height={234} />

          <div className={styles.tempDiv}>
            <p className={styles.tempNum}>{removeDot(clima.current.temp_c)}</p>
            <p className={styles.tempC}>°C</p>
          </div>

          <p className={styles.conditionName}>{clima.current.condition.text}</p>
          <p className={styles.day}>Today • {getDayOfWeek(clima.location.localtime)}</p>
          <div className={styles.locationDiv}>
            <FaLocationDot color='#88869D' width={24} height={24} />
            <p className={styles.location}>{clima.location.name}</p>
          </div>


        </>
      ) : (
        <div className={styles.containerActualDefault}>
          <p>Sem dados a apresentar do clima actual</p>
        </div>
      )}
    </div>
  )
}
