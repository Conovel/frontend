import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';
import { BrowserRouter } from 'react-router';

async function enableMocking() {
  if (!import.meta.env.PROD) {
    const { worker } = await import('./mock/browser');
    await worker.start({
      onUnhandledRequest: 'bypass', // 未処理のリクエストはそのまま通す
    });
  }
}

// MSWの初期化を待ってからアプリケーションを起動
enableMocking().then(() => {
  const root = createRoot(document.getElementById('root')!);
  root.render(
    <StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </StrictMode>,
  );
});
