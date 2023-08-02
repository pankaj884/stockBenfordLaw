// data.ts
import axios from 'axios';
import { Data } from '../constants/StockData';

export async function fetchHistoricalData(symbol: string): Promise<Data> {

  const rapidApiKey = process.env.RAPIDAPI_KEY; // Replace with your actual RapidAPI key
  const url = `https://yh-finance.p.rapidapi.com/stock/v3/get-historical-data`;

  const response = await axios.get(url, {
    params:{
      symbol
    },
    headers: {
      'x-rapidapi-host': 'yh-finance.p.rapidapi.com',
      'x-rapidapi-key': rapidApiKey,
    },
  });
  return response.data;
}
