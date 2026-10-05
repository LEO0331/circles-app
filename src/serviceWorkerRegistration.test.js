/** @jest-environment jsdom */
import { registerServiceWorker } from './serviceWorkerRegistration';

describe('service worker registration', () => {
  const originalEnv = { ...process.env };

  afterEach(() => {
    process.env = { ...originalEnv };
    jest.restoreAllMocks();
    delete navigator.serviceWorker;
  });

  test('does not register a worker during development', () => {
    process.env.NODE_ENV = 'development';
    const listen = jest.spyOn(window, 'addEventListener');

    registerServiceWorker();

    expect(listen).not.toHaveBeenCalled();
  });

  test.each(['/circles-app', '.'])('registers under production base %s', async base => {
    process.env.NODE_ENV = 'production';
    process.env.PUBLIC_URL = base;
    const register = jest.fn().mockRejectedValue(new Error('offline'));
    Object.defineProperty(navigator, 'serviceWorker', {
      configurable: true,
      value: { register }
    });
    const listen = jest.spyOn(window, 'addEventListener').mockImplementation(() => {});

    registerServiceWorker();
    const onLoad = listen.mock.calls.find(([event]) => event === 'load')[1];
    onLoad();
    await Promise.resolve();

    expect(register).toHaveBeenCalledWith(`${base}/sw.js`);
  });
});
