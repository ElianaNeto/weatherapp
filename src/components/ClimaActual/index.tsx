import React from 'react'
import Image from 'next/image'
import styles from './styles.module.scss'
import { FaLocationDot } from "react-icons/fa6";


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
  localtime: string;
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
  function getDayOfWeek(dateString: string): string {
    const days: string[] = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    
    // Create a Date object from the input string
    const date: Date = new Date(dateString);
    
    // Get the day of the week (0 for Sunday, 1 for Monday, etc.)
    const dayOfWeekIndex: number = date.getDay();
    
    // Get the day of the month
    const dayOfMonth: number = date.getDate();
    
    // Get the month (0 for January, 1 for February, etc.)
    const monthIndex: number = date.getMonth();
    
    // Return a string with the day, month, and day of the week
    return `${days[dayOfWeekIndex]}, ${dayOfMonth} ${getMonthName(monthIndex)}`;
}

function getMonthName(monthIndex: number): string {
    const months: string[] = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return months[monthIndex];
}

// Example usage:
const dateString: string = "2024-01-31";
const dayOfWeek: string = getDayOfWeek(dateString);
console.log(dayOfWeek); // Output: Wednesday, 31 January



  return (
    <div className={styles.containerActual}>
      {clima.location && clima.current ? (
        <>
          <Image src={'https:' + clima.current.condition.icon} alt={clima.current.condition.text} width={202} height={234} />

          <div className={styles.tempDiv}>
            <p className={styles.tempNum}>{`${clima.current.temp_c}`}</p>
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
