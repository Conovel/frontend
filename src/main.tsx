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
  return Promise.resolve();
}

enableMocking().then(() => {
  createRoot(document.getElementById('root') as HTMLElement).render(
    <StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </StrictMode>,
  );
});
