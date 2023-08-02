import { Request, Response, NextFunction } from 'express';
import { fetchHistoricalData } from '../services/yahooFinanceService';
import { calculateBenfordsLawComparison } from '../util/calculate';
import HttpStatusCodes from '../constants/HttpStatusCodes'

export const getBLDataForStock = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const stockName = req.params.stockName;

    const historicalData = await fetchHistoricalData(stockName);

    if (historicalData?.prices?.length) {

      const benfordsLawComparison = calculateBenfordsLawComparison(historicalData);
      res.json(benfordsLawComparison);

    }else{
      res.status(HttpStatusCodes.BAD_REQUEST).json({ error: 'No data found for the given stock name.' });
    }

  } catch (error) {
    next(error);
  }
};