import React from 'react'
import Image from 'next/image'
import styles from './styles.module.scss'


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
}


export function Previsao({ previsoesHoras, previsoesDias }: PrevisaoProps) {
  return (
      <div className={styles.containerPrevisao}>
        <h4>Previsao para os proximos dias</h4>
        <ul>
          { //Proximos dias
            previsoesDias.map((prev, index) => (
              <li key={index}>
                <span>{prev.date} </span>
                <Image src={'https:' + prev.day.condition.icon} alt={prev.day.condition.text} width={64} height={64} />
                <div className={styles.tempContainer}>
                  <span>{prev.day.maxtemp_c}°C </span>
                  <span>{prev.day.mintemp_c}°C</span>
                </div>

              </li>
            ))
          }
        </ul>

    </div>


  )
}
