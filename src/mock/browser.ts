import { setupWorker } from 'msw/browser';
import { novelListHandlers } from '../features/NovelList/mocks/handlers';
import { novelViewHandlers } from '../features/NovelView/mocks/handlers';
import { novelInfoHandlers } from '../features/NovelInfo/mocks/handlers';
import { accountSettingsHandlers } from '../features/AccountSettings/mocks/handlers';

const handlers = [
  ...novelListHandlers,
  ...novelViewHandlers,
  ...novelInfoHandlers,
  ...accountSettingsHandlers,
];

export const worker = setupWorker(...handlers);
