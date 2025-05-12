import { setupWorker } from 'msw/browser';
import { novelListHandlers } from '../features/NovelList/mocks/handlers';

const handlers = [...novelListHandlers];

export const worker = setupWorker(...handlers);

// Configure MSW to ignore all requests to localhost:3000
worker.events.on('request:start', ({ request }) => {
  if (request.url.startsWith('http://localhost:3000')) {
    return false; // Skip MSW interception for localhost:3000
  }
});
