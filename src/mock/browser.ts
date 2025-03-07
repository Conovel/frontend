import { setupWorker } from 'msw/browser';
import { novelListHandlers } from '../features/NovelList/mocks/handlers';

const handlers = [...novelListHandlers];

export const worker = setupWorker(...handlers);
