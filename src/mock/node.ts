import { setupServer } from 'msw/node';
import { novelListHandlers } from '../features/NovelList/mocks/handlers';
import { novelViewHandlers } from '../features/NovelView/mocks/handlers';

const handlers = [...novelListHandlers, ...novelViewHandlers];

export const server = setupServer(...handlers);
