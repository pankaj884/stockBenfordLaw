// stockController.test.ts
import { Request, Response, NextFunction } from 'express';
import { createRequest, createResponse } from "node-mocks-http";
import HttpStatusCodes from '../constants/HttpStatusCodes';
import { getBLDataForStock } from './stockController';
import {fetchHistoricalData} from '../services/yahooFinanceService'; // Import the service module
import {calculateBenfordsLawComparison} from '../util/calculate'; // Import the service module


// Mock fetchHistoricalData and calculateBenfordsLawComparison
jest.mock('../services/yahooFinanceService', () => ({
  fetchHistoricalData: jest.fn(),
}));
jest.mock('../util/calculate', () => ({
  calculateBenfordsLawComparison: jest.fn(),
}));

describe('getBLDataForStock', () => {
  const mockRequest = {
    params: { stockName: 'AAPL' },
  } as unknown as Request; // Change the type assertion to unknown as Request


  const mockResponse = {
    json: jest.fn(),
    status: jest.fn(),
  } as unknown as Response;
  const mockNext = jest.fn() as NextFunction;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return benfordsLawComparison when data is available', async () => {
    // Mock historical data with prices
    const historicalData = {
      prices: [
        { volume: 12345 },
        { volume: 67890 },
        // Add more data points for testing
      ],
    };
    // Mock the functions
    (fetchHistoricalData as jest.Mock).mockResolvedValue(historicalData);
    (calculateBenfordsLawComparison as jest.Mock).mockReturnValue({ /* Mocked benfordsLawComparison */ });

    // Send a mock request
    await getBLDataForStock(mockRequest, mockResponse, mockNext);

    // Assertions
    expect(fetchHistoricalData).toHaveBeenCalledWith('AAPL');
    expect(calculateBenfordsLawComparison).toHaveBeenCalledWith(historicalData);


    expect(mockResponse.json).toHaveBeenCalled();
    expect(mockResponse.status).not.toHaveBeenCalled();
    expect(mockNext).not.toHaveBeenCalled();
  });

  it('should return error when no data is available', async () => {
    // Mock historical data with no prices
    const historicalData = {
      prices: [],
    };
    // Mock the functions
    (fetchHistoricalData as jest.Mock).mockResolvedValue(historicalData);

    // Update the mockResponse to include a mock implementation for json function

    const mockRes = createResponse();
    const mockReq = createRequest({
      params: { stockName: 'AAPL' }
    });
    // Send a mock request
    await getBLDataForStock(mockReq, mockRes, mockNext);

    // Assertions
    expect(fetchHistoricalData).toHaveBeenCalledWith('AAPL');
    expect(calculateBenfordsLawComparison).not.toHaveBeenCalled();
    expect(mockRes.statusCode).toEqual(HttpStatusCodes.BAD_REQUEST)
    expect(mockRes._getJSONData()).toEqual({ error: 'No data found for the given stock name.' });
    expect(mockNext).not.toHaveBeenCalled();
  });

  it('should handle API error', async () => {
    // Mock API error
    const mockError = new Error('API Error');
    (fetchHistoricalData as jest.Mock).mockRejectedValue(mockError);

    // Send a mock request
    await getBLDataForStock(mockRequest, mockResponse, mockNext);

    // Assertions
    expect(fetchHistoricalData).toHaveBeenCalledWith('AAPL');
    expect(calculateBenfordsLawComparison).not.toHaveBeenCalled();
    expect(mockResponse.json).not.toHaveBeenCalled();
    expect(mockResponse.status).not.toHaveBeenCalled();
    expect(mockNext).toHaveBeenCalledWith(mockError);
  });
});
