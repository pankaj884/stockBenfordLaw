import { Request, Response, NextFunction } from 'express';

export const getHistoricalData = (req: Request, res: Response, next: NextFunction) => {
  try {
    const sampleData = {
      message: 'Hello, this is a sample API response!',
    };
    res.json(sampleData);
  } catch (error) {
    next(error);
  }
};
