import '@css/global.css';
import '@public/css/widgets.css';
import 'react-toastify/dist/ReactToastify.css';

import { proxyStore } from '@app/redux/proxyStore';
import extensionWrapper from '@components/custom/extensionWrapper';
import ScrollToTop from '@components/custom/ScrollToTop';
import CommunityTrees from '@components/widgets/CommunityTrees';
import HowItWorks from '@components/widgets/HowItWorks';
import RightColumnAds from '@components/widgets/RightColumnAds';
import TreeCounter from '@components/widgets/TreeCounter';
import Auth from '@pages/auth/Auth';
import AuthLogout from '@pages/auth/AuthLogout';
import AuthSuccess from '@pages/auth/AuthSuccess';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import { QueryParamProvider } from 'use-query-params';
import { ReactRouter6Adapter } from 'use-query-params/adapters/react-router-6';

proxyStore.ready().then(() => {
  extensionWrapper(
    <Router>
      <QueryParamProvider adapter={ReactRouter6Adapter}>
        <ScrollToTop />
        <Routes>
          <Route
            path="/auth"
            element={<Auth />}
          />
          <Route
            path="/auth_success"
            element={<AuthSuccess />}
          />
          <Route
            path="/logout"
            element={<AuthLogout />}
          />
          <Route
            path="/TreeCounter"
            element={<TreeCounter />}
          />
          <Route
            path="/HowItWorks"
            element={<HowItWorks />}
          />
          <Route
            path="/CommunityTrees"
            element={<CommunityTrees />}
          />
          <Route
            path="/RightColumnAds"
            element={<RightColumnAds />}
          />
        </Routes>
      </QueryParamProvider>
    </Router>
  );
});
