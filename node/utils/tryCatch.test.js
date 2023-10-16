import { tryCatch } from './tryCatch';

describe('tryCatch Middleware', () => {
  const req = {};
  const res = {};
  const next = jest.fn();
  test('It should call the controller function successfully', async () => {
    const controller = jest.fn().mockResolvedValue('Success');

    const middleware = tryCatch(controller);

    await middleware(req, res, next);

    expect(controller).toHaveBeenCalled();
    expect(next).not.toHaveBeenCalled();
  });

  test('It should call the next function if an error occurs in the controller', async () => {
    const controller = jest.fn().mockRejectedValue(new Error('Some error'));

    const middleware = tryCatch(controller);

    await middleware(req, res, next);

    expect(controller).toHaveBeenCalled();
    expect(next).toHaveBeenCalledWith(expect.any(Error));
  });
});