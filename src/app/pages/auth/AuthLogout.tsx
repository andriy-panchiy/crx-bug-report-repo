import { useAppDispatch, useAppSelector } from '@app/redux/hooks';
import { setIdToken, setRefreshToken } from '@app/redux/slices/authSlice';
import { debounce } from 'lodash-es';
import { useEffect } from 'react';

export default function AuthLogout(): JSX.Element {
  const dispatch = useAppDispatch();
  const { idToken, refreshToken } = useAppSelector((state) => state.auth);

  const handleGoToGmail = async () => {
    chrome.runtime.sendMessage({ name: 'reload_gmail_tabs' });
    chrome.runtime.sendMessage({ name: 'close_this_tab' });
    chrome.runtime.sendMessage({ name: 'close_extension_auth' });
  };

  useEffect(() => {
    const debouncedLoadData = debounce(handleGoToGmail, 300);

    if (idToken && refreshToken) {
      dispatch(setIdToken(''));
      dispatch(setRefreshToken(''));
    }

    debouncedLoadData();

    return () => debouncedLoadData.cancel();
  }, []);

  return <></>;
}
