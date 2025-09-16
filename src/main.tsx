import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';
import { BrowserRouter } from 'react-router';

async function enableMocking() {
  // MSWを無効化して実際のAPIを使用
  console.log('MSW: Disabled - using real API');
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
