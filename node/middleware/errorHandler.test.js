import { errorHandler } from './errorHandler'; // Import the errorHandler function

describe('errorHandler Middleware', () => {
  const req = {};
  const res = {
    status: jest.fn().mockReturnThis(),
    send: jest.fn(),
  };
  const next = jest.fn();

  test('It should handle a ValidationError and return a 400 status with details', () => {
    const validationError = new Error('Validation error');
    validationError.name = 'ValidationError';
    validationError.details = ['Error detail 1', 'Error detail 2'];

    errorHandler(validationError, req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith({
      type: 'ValidationError',
      details: validationError.details,
    });

    expect(next).not.toHaveBeenCalled();
  });

  test('It should handle a non-ValidationError and return a 400 status with the error message', () => {
    const error = new Error('Some other error');

    errorHandler(error, req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith(error.message);
    expect(next).not.toHaveBeenCalled();
  });
});