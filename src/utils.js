import { keys } from './constants';

// eslint-disable-next-line import/prefer-default-export
export const getStatus = (id) => keys[id] || 'inProgress';
