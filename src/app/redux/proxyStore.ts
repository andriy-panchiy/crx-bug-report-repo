import type { RootState } from '@app/redux/store';
import { applyMiddleware, Store } from '@eduardoac-skimlinks/webext-redux';
import { thunk } from 'redux-thunk';

const middlewares = [thunk];

export const proxyStore: Store<RootState> = applyMiddleware(new Store(), ...middlewares);

export default proxyStore;
