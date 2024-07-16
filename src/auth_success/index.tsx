import '@public/css/widgets.css';
import 'react-toastify/dist/ReactToastify.css';

import { proxyStore } from '@app/redux/proxyStore';
import extensionWrapper from '@components/custom/extensionWrapper';
import ScrollToTop from '@components/custom/ScrollToTop';
import AuthSuccess from '@pages/auth/AuthSuccess';
import { BrowserRouter as Router } from 'react-router-dom';
import { QueryParamProvider } from 'use-query-params';
import { ReactRouter6Adapter } from 'use-query-params/adapters/react-router-6';

proxyStore.ready().then(() => {
  extensionWrapper(
    <Router>
      <QueryParamProvider adapter={ReactRouter6Adapter}>
        <ScrollToTop />
        <AuthSuccess />
      </QueryParamProvider>
    </Router>
  );
});
