import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';
import { BrowserRouter } from 'react-router';

// MSWを完全に無効化（コメントアウト）
const enableMocking = async () => {
  // MSWを使用しない
  return;

  // 以下はMSWを有効にする場合のコード（現在は無効）
  // if (import.meta.env.PROD) return;
  // const { worker } = await import('../src/mock/browser');
  // await worker.start();
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
