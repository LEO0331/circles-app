import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ command, isPreview }) => {
  const publicUrl = process.env.PUBLIC_URL === '.' ? './' : process.env.PUBLIC_URL;
  const base = command === 'serve' && !isPreview
    ? '/'
    : publicUrl || '/circles-app/';

  return {
    base,
    plugins: [react()],
    // Preserve the existing service worker's CRA environment variables.
    define: {
      'process.env.PUBLIC_URL': JSON.stringify(base.replace(/\/$/, ''))
    },
    build: {
      outDir: 'build',
      target: 'es2015'
    },
    server: { host: '127.0.0.1' },
    preview: { host: '127.0.0.1' }
  };
});
