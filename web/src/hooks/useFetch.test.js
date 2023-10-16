import { renderHook } from '@testing-library/react-hooks';
import { useFetch } from './useFetch';
import { FETCH_STATUS, BASE_URL, SERVER_ERROR_MSG } from '../utils/constants'

// Mock fetch function
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({}),
    status: 200,
  })
);

describe('useFetch Custom Hook', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should initialize with status IDLE and empty data', () => {
    const { result } = renderHook(() => useFetch());
    const { status, data } = result.current;

    expect(status).toBe(FETCH_STATUS.IDLE);
    expect(data).toEqual([]);
  });

  it('should make a successful fetch', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useFetch());

    await result.current.fetchFn(BASE_URL);

    setTimeout(async () => {
      const { status, data, error } = result.current;
  
      expect(status).toBe(FETCH_STATUS.SUCCESS);
      expect(data).toEqual({});
      expect(error).toBeNull();
    }, 1000)
  });

  it('should handle a failed fetch with server error', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useFetch());

    global.fetch.mockImplementationOnce(() =>
      Promise.resolve({
        json: () => Promise.resolve({ type: 'ServerError' }),
        status: 500,
      })
    );

    await result.current.fetchFn('some-url');

    const { status, data, error } = result.current;

    expect(status).toBe(FETCH_STATUS.ERROR);
    expect(data).toEqual([]);
    expect(error).toEqual([SERVER_ERROR_MSG]);
  });

  it('should handle a failed fetch with validation error', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useFetch());

    global.fetch.mockImplementationOnce(() =>
      Promise.resolve({
        json: () => Promise.resolve({ type: 'ValidationError', details: [{message: 'Invalid data'}] }),
        status: 400,
      })
    );

    await result.current.fetchFn('some-url');

    const { status, data, error } = result.current;

    expect(status).toBe(FETCH_STATUS.ERROR);
    expect(data).toEqual([]);
    expect(error).toEqual(['Invalid data']);
  });

  it('should reset errors and status', () => {
    const { result } = renderHook(() => useFetch());
    result.current.resetErrors();

    const { status, error } = result.current;

    expect(status).toBe(FETCH_STATUS.IDLE);
    expect(error).toBeNull();
  });
});