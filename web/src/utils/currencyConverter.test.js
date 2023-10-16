import { usdToHuf } from './currencyConverter'; // Import the usdToHuf function

describe('usdToHuf Function', () => {
  it('should convert a non-HUF currency to HUF', () => {
    const input = {
      currency: 'USD',
      amount: 100,
    };

    const expectedOutput = {
      currency: 'HUF',
      amount: 36500, // 100 * 365
    };

    const result = usdToHuf(input);

    expect(result).toEqual(expectedOutput);
  });

  it('should leave HUF currency unchanged', () => {
    const input = {
      currency: 'HUF',
      amount: 1000,
    };

    const expectedOutput = {
      currency: 'HUF',
      amount: 1000,
    };

    const result = usdToHuf(input);

    expect(result).toEqual(expectedOutput);
  });
});