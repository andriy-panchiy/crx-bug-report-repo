import { proxyStore } from '@app/redux/proxyStore';
import extensionWrapper from '@components/custom/extensionWrapper';

proxyStore.ready().then(() => {
  extensionWrapper(<></>);
});
