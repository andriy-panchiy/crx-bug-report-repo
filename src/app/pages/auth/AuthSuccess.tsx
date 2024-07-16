import { useAppDispatch } from '@app/redux/hooks';
import { setIdToken, setRefreshToken } from '@app/redux/slices/authSlice';
import { debounce } from 'lodash-es';
import { useEffect } from 'react';
import { StringParam, useQueryParam } from 'use-query-params';

export default function AuthSuccess(): JSX.Element {
  const dispatch = useAppDispatch();

  const [idToken] = useQueryParam('id_token', StringParam);
  const [refreshToken] = useQueryParam('refresh_token', StringParam);

  const handleGoToGmail = async () => {
    chrome.runtime.sendMessage({ name: 'reload_gmail_tabs' });
    chrome.runtime.sendMessage({ name: 'close_this_tab' });
    chrome.runtime.sendMessage({ name: 'close_extension_auth' });
    chrome.runtime.sendMessage({ name: 'go_to_gmail' });
  };

  useEffect(() => {
    const debouncedLoadData = debounce(handleGoToGmail, 300);

    if (idToken && refreshToken) {
      console.log('🚀 ~ useEffect ~ idToken && refreshToken:', idToken, refreshToken);
      dispatch(setIdToken(idToken));
      dispatch(setRefreshToken(refreshToken));
      debouncedLoadData();
    }

    return () => debouncedLoadData.cancel();
  }, [idToken, refreshToken]);

  return <></>;
}
