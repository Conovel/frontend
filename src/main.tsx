import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';
import { BrowserRouter } from 'react-router';

async function enableMocking() {
  if (!import.meta.env.PROD) {
    const { worker } = await import('../src/mock/browser');
    worker.start();
  }
  // MSWを有効化してモックデータを使用
  console.log('MSW: Enabled - using mock data');
  return Promise.resolve();
}

enableMocking().then(() => {
  console.log('MSW: Mocking setup completed');

  createRoot(document.getElementById('root') as HTMLElement).render(
    <StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </StrictMode>,
  );
});
