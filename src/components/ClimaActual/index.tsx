import React from 'react'
import Image from 'next/image'
import styles from './styles.module.scss'


interface Condition {
  icon: string;
  text: string;
}

interface CurrentWeather {
  temp_c: number;
  condition: Condition;
  // Add more properties as needed
}

interface Location {
  name: string;
  // Add more properties as needed
}

interface ClimaActualProps {
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
          <h3>{clima.location.name}</h3>
          <Image src={'https:'+clima.current.condition.icon} alt={clima.current.condition.text} width={64} height={64} />
          <p>{`${clima.current.temp_c}°C`}</p>
          <p>{clima.current.condition.text}</p>
        </>
      ) : (
          <div className={styles.containerActualDefault}>
            <p>Sem dados a apresentar</p>
        </div>
      )}
    </div>
  )
}
