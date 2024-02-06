import { createContext, ReactNode, useState, useEffect } from 'react';
import Router from 'next/router'


type AuthContextData = {
  tempUnit: string;
  handleChangeTempUnit: (temp: string) => void;
}



type AuthProviderProps = {
  children: ReactNode;
}

export const AuthContenxt = createContext({} as AuthContextData)


export function AuthProvider({ children }: AuthProviderProps) {

  const [tempUnit, setTempUnit] = useState('');
  useEffect(() => {
    setTempUnit('tempC')
  }, [])

  function handleChangeTempUnit(temp: string) {
    setTempUnit(temp === tempUnit ? '' : temp);
    //setIsActive(prevState => !prevState);
  }

  return (
    <AuthContenxt.Provider value={{ tempUnit, handleChangeTempUnit }}>
      {children}
    </AuthContenxt.Provider>
  )
}