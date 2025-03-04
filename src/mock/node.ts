import { setupServer } from 'msw/node';
import { novelListHandlers } from '../features/NovelList/mocks/handlers';

const handlers = [...novelListHandlers];

export const server = setupServer(...handlers);
