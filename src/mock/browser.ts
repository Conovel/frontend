import { setupWorker } from 'msw/browser';
import { novelListHandlers } from '../features/NovelList/mocks/handlers';
import { novelViewHandlers } from '../features/NovelView/mocks/handlers';

const handlers = [...novelListHandlers, ...novelViewHandlers];

export const worker = setupWorker(...handlers);
