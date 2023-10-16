import validator from './validator'; // Import your validator function

describe('Validator Function', () => {
  test('Valid payload should return no validation errors', () => {
    const validPayload = {
      id: '12345678-1234-1234-1234-123456789012',
      description: 'Valid description',
      amount: 100,
      currency: 'USD',
    };

    const result = validator(validPayload);

    expect(result.error).toBe(undefined);
  });

  test('Invalid payload should return validation error for amount', () => {
    const invalidPayload = {
      id: 'test_id',
      description: 'test..',
      currency: 'USD'
    };

    const result = validator(invalidPayload);

    expect(result.error).toBeDefined();
    expect(result.error.details).toHaveLength(1);
  });

  test('Invalid payload should return validation error for description', () => {
    const invalidPayload = {
      id: 'test_id',
      amount: 5,
      currency: 'USD'
    };

    const result = validator(invalidPayload);

    expect(result.error).toBeDefined();
    expect(result.error.details).toHaveLength(1);
  });
});