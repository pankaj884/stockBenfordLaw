// stockController.test.ts
import { Request, Response, NextFunction } from 'express';
import { createRequest, createResponse } from "node-mocks-http";
import HttpStatusCodes from '../../constants/HttpStatusCodes';
import { getBLDataForStock } from '../stockController';
import {fetchHistoricalData} from '../../services/yahooFinanceService'; // Import the service module
import {calculateBenfordsLawComparison} from '../../util/calculate'; // Import the service module
import { Data, Entry } from '../../constants/StockData';


// Mock fetchHistoricalData and calculateBenfordsLawComparison
jest.mock('../../services/yahooFinanceService', () => ({
  fetchHistoricalData: jest.fn(),
}));
jest.mock('../../util/calculate', () => ({
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

  it('should correctly calculate averageComparison and comparisonTable',async  () => {
   // Mock historical data with prices
   const historicalData = {
      prices: [
        { volume: 12345 },
        { volume: 67890 },
        { volume: 57890 },
        { volume: 47890 },
        { volume: 27890 },
        { volume: 37890 },
        { volume: 67890 },
        { volume: 77890 },
        { volume: 87890 },
        { volume: 97890 },
        { volume: 67890 },
        { volume: 67890 },
        { volume: 17890 },
        { volume: 37890 },
        { volume: 47890 },
        { volume: 57890 },
        { volume: 17890 },
        { volume: 37890 },
        { volume: 67890 },
      ],
    };
    // Mock the functions
    (fetchHistoricalData as jest.Mock).mockResolvedValue(historicalData);
    (calculateBenfordsLawComparison as jest.Mock).mockReturnValue({ 
      averageComparison: '10%',
      comparisonTable: [
        { digit: 1, occurrenceCount: 5, benfordPercentage: '30.1%', comparison: '20.1%' },
        // Add more mock entries as needed
      ]});

    // Send a mock request
    const mockRes = createResponse();
    const mockReq = createRequest({
      params: { stockName: 'AAPL' }
    });

    await getBLDataForStock(mockReq, mockRes, mockNext);

    // Assertions
    expect(fetchHistoricalData).toHaveBeenCalledWith('AAPL');
    expect(calculateBenfordsLawComparison).toHaveBeenCalledWith(historicalData);


      // Verify the response data
    const responseData = mockRes._getJSONData();

    console.log("responseData :  ",responseData);

    expect(responseData).toHaveProperty('averageComparison');
    expect(responseData).toHaveProperty('comparisonTable');

    expect(mockNext).not.toHaveBeenCalled();
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
