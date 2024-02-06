import { createContext, ReactNode, useState, useEffect } from 'react';
import Router from 'next/router'


type AuthContextData = {
  tempUnit: string
}



type AuthProviderProps = {
  children: ReactNode;
}

export const AuthContenxt = createContext({} as AuthContextData)

export function handleChangeTempUnit(temp: string) {
  setTempUnit(temp === tempUnit ? '' : temp);
  //setIsActive(prevState => !prevState);

}

export function AuthProvider({ children }: AuthProviderProps) {

  const [tempUnit, setTempUnit] = useState('tempC');

  useEffect(() => {
    setTempUnit('tempC')

  }, [])

  return (
    <AuthContenxt.Provider value={{ tempUnit }}>
      {children}
    </AuthContenxt.Provider>
  )
}