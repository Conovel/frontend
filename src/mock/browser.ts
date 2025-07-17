import { setupWorker } from 'msw/browser';
import { novelListHandlers } from '../features/NovelList/mocks/handlers';
import { novelViewHandlers } from '../features/NovelView/mocks/handlers';

const handlers = [...novelListHandlers, ...novelViewHandlers];

console.log('MSW handlers:', handlers);
console.log('MSW handlers count:', handlers.length);
console.log(
  'MSW handlers details:',
  handlers.map((h) => ({
    method: h.info.method,
    path: h.info.path,
  })),
);

export const worker = setupWorker(...handlers);
