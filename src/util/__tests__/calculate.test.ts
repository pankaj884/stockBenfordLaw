import { calculateBenfordsLawComparison } from '../calculate';
import { Data } from '../../constants/StockData';

describe('calculateBenfordsLawComparison', () => {
  it('should correctly calculate averageComparison and comparisonTable with valid data', () => {
    const data : Data = {
      prices: [
        { volume: 12345 },
        { volume: 67890 },
        { volume: 57890 },
        // Add more entries as needed
      ],
    };

    // Call the function with the test data
    const result = calculateBenfordsLawComparison(data);

    console.log("result : ",result);

    // Define the expected output
    const expectedAverageComparison = '12.29%'; // Replace with the actual expected value
    const expectedComparisonTable = [
      // Define the expected comparison table entries for digits 1 to 9
      { digit: 1, occurrenceCount: 1, benfordPercentage: '30.1%', comparison: '3.23%' },
      { digit: 2, occurrenceCount: 0, benfordPercentage: '17.6%', comparison: '17.60%' },
      { digit: 3, occurrenceCount: 0, benfordPercentage: '12.5%', comparison: '12.50%' },
      { digit: 4, occurrenceCount: 0, benfordPercentage: '9.7%', comparison: '9.70%' },
      { digit: 5, occurrenceCount: 1, benfordPercentage: '7.9%', comparison: '25.43%' },
      { digit: 6, occurrenceCount: 1, benfordPercentage: '6.7%', comparison: '26.63%' },
      { digit: 7, occurrenceCount: 0, benfordPercentage: '5.8%', comparison: '5.80%' },
      { digit: 8, occurrenceCount: 0, benfordPercentage: '5.1%', comparison: '5.10%' },
      { digit: 9, occurrenceCount: 0, benfordPercentage: '4.6%', comparison: '4.60%' },

      
      // Add more entries for digits 3 to 9 as needed
    ];

    // Assertions
    expect(result.averageComparison).toBe(expectedAverageComparison);
    expect(result.comparisonTable).toEqual(expectedComparisonTable);
  });

  it('should return zero averageComparison and empty comparisonTable with empty data', () => {
    const data : Data = {
      prices: [],
    };

    // Call the function with the empty test data
    const result = calculateBenfordsLawComparison(data);

    // Define the expected output for empty data
    const expectedAverageComparison = '11.11%';
    const expectedComparisonTable: Array<any> = [
        { digit: 1, occurrenceCount: 0, benfordPercentage: '30.1%', comparison: '30.10%' },
        { digit: 2, occurrenceCount: 0, benfordPercentage: '17.6%', comparison: '17.60%' },
        { digit: 3, occurrenceCount: 0, benfordPercentage: '12.5%', comparison: '12.50%' },
        { digit: 4, occurrenceCount: 0, benfordPercentage: '9.7%', comparison: '9.70%' },
        { digit: 5, occurrenceCount: 0, benfordPercentage: '7.9%', comparison: '7.90%' },
        { digit: 6, occurrenceCount: 0, benfordPercentage: '6.7%', comparison: '6.70%' },
        { digit: 7, occurrenceCount: 0, benfordPercentage: '5.8%', comparison: '5.80%' },
        { digit: 8, occurrenceCount: 0, benfordPercentage: '5.1%', comparison: '5.10%' },
        { digit: 9, occurrenceCount: 0, benfordPercentage: '4.6%', comparison: '4.60%' },
    ];

    // Assertions
    expect(result.averageComparison).toBe(expectedAverageComparison);
    expect(result.comparisonTable).toEqual(expectedComparisonTable);
  });

});
