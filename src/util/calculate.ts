// calculate.ts
import { Data, Entry } from '../constants/StockData';
import { BENFORD_PERCENTAGES } from '../constants/BenfordPercentage';

interface BenfordsLawResult {
  averageComparison: string;
  comparisonTable: Array<{
    digit: number;
    occurrenceCount: number;
    benfordPercentage: string;
    comparison: string;
  }>;
}

export function calculateBenfordsLawComparison(data: Data): BenfordsLawResult {
  const leadingDigitCounts: number[] = new Array(10).fill(0);
  const totalCount: number | undefined = data?.prices?.length;

  data?.prices.forEach((entry: Entry) => {
    const volume: number = entry.volume;
    const leadingDigit: number = calculateLeadingDigit(volume);
    if (leadingDigit >= 1 && leadingDigit <= 9) {
      leadingDigitCounts[leadingDigit]++;
    }
  });

  const comparisonTable: Array<{
    digit: number;
    occurrenceCount: number;
    benfordPercentage: string;
    comparison: string;
  }> = [];

  let totalComparisonValue = 0; // Variable to store the sum of comparison values

  for (let digit = 1; digit <= 9; digit++) {
    const benfordPercentage: number = BENFORD_PERCENTAGES[digit];
    const occurrenceCount: number = leadingDigitCounts[digit];
    const comparison: string = Math.abs((occurrenceCount / totalCount!) * 100 - benfordPercentage).toFixed(2) + '%';
    comparisonTable.push({ digit, occurrenceCount, benfordPercentage: benfordPercentage + '%', comparison });

    // Accumulate the comparison value to calculate the sum
    totalComparisonValue += parseFloat(comparison);
  }

  const averageComparison = (totalComparisonValue / 9).toFixed(2) + '%'; // Divide by the number of elements (9 digits)

  return {
    averageComparison,
    comparisonTable,
  };
}

function calculateLeadingDigit(number: number): number {
  return parseInt(number.toString()[0]);
}