import axios, { AxiosError } from "axios";

export const api = axios.create({
    baseURL: 'https://api.weatherapi.com/v1',
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  })
