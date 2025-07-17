import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';

async function enableMocking() {
  if (!import.meta.env.PROD) {
    try {
      console.log('Starting MSW...');
      const { worker } = await import('./mock/browser');
      console.log('MSW worker imported, starting...');
      await worker.start({
        onUnhandledRequest: 'bypass',
        serviceWorker: {
          url: '/mockServiceWorker.js',
        },
      });
      console.log('MSW started successfully');
    } catch (error) {
      console.error('Failed to start MSW:', error);
    }
  } else {
    console.log('MSW disabled in production');
  }
}

// MSWの初期化を待ってからアプリケーションを起動
enableMocking().then(() => {
  const root = createRoot(document.getElementById('root')!);
  root.render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
});
