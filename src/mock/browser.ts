import { setupWorker } from 'msw/browser';
import { novelListHandlers } from '../features/NovelList/mocks/handlers';
import { novelViewHandlers } from '../features/NovelView/mocks/handlers';
import { novelInfoHandlers } from '../features/NovelInfo/mocks/handlers';

const handlers = [
  ...novelListHandlers,
  ...novelViewHandlers,
  ...novelInfoHandlers,
];

export const worker = setupWorker(...handlers);
