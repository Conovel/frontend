import { setupWorker } from 'msw';
import { novelListHandlers } from '../features/NovelList/mocks/handlers';

const handlers = [...novelListHandlers];

export const worker = setupWorker(...handlers);
