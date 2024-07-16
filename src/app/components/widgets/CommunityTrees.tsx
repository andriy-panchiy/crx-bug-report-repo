import '@public/css/widgets.css';

import { API } from '@app/api/elm-api';
import { useAppDispatch, useAppSelector } from '@app/redux/hooks';
import { hideWidget, setValue } from '@app/redux/slices/widgetsSlice';
import { RootState } from '@app/redux/store';
import TreeIcon from '@public/images/TreeIcon.svg?react';
import { doInterval } from '@utils/utils';
import { useEffect } from 'react';
import Reel from 'react-reel';

export default function CommunityTrees(): JSX.Element {
  const dispatch = useAppDispatch();
  const { CommunityTrees } = useAppSelector((state: RootState) => state.widgets);
  const { idToken } = useAppSelector((state: RootState) => state.auth);

  useEffect(() => {
    const handleGetTreesPlanted = async () => {
      try {
        const response = await API.stats.getTreesPlanted();
        const value = response.data?.count;
        if (value) {
          dispatch(setValue({ widget: 'CommunityTrees', value: Number(value) }));
        }
      } catch (error) {
        console.log('🚀 ~ handleCounter ~ error:', error);
        dispatch(hideWidget({ widget: 'CommunityTrees' }));
        clearInterval(GetTreesPlantedTimer);
      }
    };

    const handleGetUserImpact = async () => {
      try {
        const response = await API.jwt.getUserImpact();
        const value = response.data?.trees?.planted?.displayAmount;
        if (value) {
          dispatch(setValue({ widget: 'TreeCounter', value: Number(value) }));
        }
      } catch (error) {
        console.log('🚀 ~ handleCounter ~ error:', error);
        clearInterval(GetUserImpactTimer);
      }
    };

    const GetTreesPlantedTimer = doInterval(() => {
      handleGetTreesPlanted();
    }, 5000);

    const GetUserImpactTimer = doInterval(() => {
      if (idToken) handleGetUserImpact();
    }, 5000);
  }, []);

  return (
    <div
      id="CommunityTrees"
      className="extension-widget px-4 py-2"
    >
      <div className="h-full bg-white border-white/5 rounded-xl flex flex-col p-3">
        <p className="font-Infer font-medium text-custom-tertiary text-[11px] mb-1 tracking-px uppercase">Community trees</p>
        <div className="h-full w-full flex flex-row items-center gap-1">
          <TreeIcon className="min-w-6 max-w-6 min-h-6 max-h-6 text-custom-secondary" />
          <div className="font-Inter font-semibold text-custom-secondary text-[18px]">
            <Reel text={String(new Intl.NumberFormat().format(CommunityTrees.value))} />
          </div>
        </div>
      </div>
    </div>
  );
}
