import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';
import { BrowserRouter } from 'react-router';

const enableMocking = async () => {
  if (import.meta.env.PROD) return;
  const { worker } = await import('../src/mock/browser');
  await worker.start();
};

enableMocking().then(() => {
  createRoot(document.getElementById('root') as HTMLElement).render(
    <StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </StrictMode>,
  );
});
