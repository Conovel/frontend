import { setupWorker } from 'msw/browser';
import { handlers } from '../features/NovelList/mocks/handlers';

export const worker = setupWorker(...handlers);
