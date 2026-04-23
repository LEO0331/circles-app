export function registerServiceWorker() {
  if (process.env.NODE_ENV !== 'production') {
    return;
  }

  if (!('serviceWorker' in navigator)) {
    return;
  }

  window.addEventListener('load', () => {
    const swUrl = `${process.env.PUBLIC_URL}/sw.js`;
    navigator.serviceWorker.register(swUrl).catch(() => {
      // Keep registration failure non-fatal for app functionality.
    });
  });
}
