import { setupServer } from 'msw/node';
import { handlers } from '../features/NovelList/mocks/handlers';

export const server = setupServer(...handlers);
