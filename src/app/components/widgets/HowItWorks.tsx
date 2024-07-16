import '@public/css/widgets.css';

import { useAppDispatch, useAppSelector } from '@app/redux/hooks';
import { hideWidget } from '@app/redux/slices/widgetsSlice';
import { RootState } from '@app/redux/store';
import { Button } from '@components/ui/button';
import { EnumURL } from '@enums/EnumURL';
import { cn } from '@utils/util';
import { X } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function HowItWorks(): JSX.Element {
  const dispatch = useAppDispatch();
  const { HowItWorks } = useAppSelector((state: RootState) => state.widgets);

  return (
    <div
      id="HowItWorks"
      className={cn('extension-widget px-4', !HowItWorks.isShown ? 'hidden' : null)}
    >
      <div className="bg-white border-white/5 relative rounded-xl flex flex-col p-3">
        <img
          src={chrome.runtime.getURL('/images/TreeMedal.png')}
          className="min-w-12 min-h-12 max-w-12 max-h-12 mb-4"
          alt=""
        />
        <p className="font-Infer font-bold text-custom-text-primary text-[14px] mb-1.5">How It Works</p>
        <p className="font-Infer font-medium text-custom-text-secondary text-[12px] leading-5 mb-2">
          Like other email apps, we make money from ads. We then use ad revenue to plant trees. The result: 4M trees and counting!
        </p>
        <Link
          to={EnumURL.how_it_works.url}
          target={EnumURL.how_it_works.target}
          className="font-Infer font-semibold text-custom-text-how-it-works hover:text-custom-text-how-it-works-hover transition text-[13px]"
        >
          See how we plant trees
        </Link>
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-3 top-3 min-w-6 min-h-6 max-w-6 max-h-6 z-[99999]"
          onClick={() => dispatch(hideWidget({ widget: 'HowItWorks' }))}
        >
          <X className="min-w-4 min-h-4 max-w-4 max-h-4 text-black/25" />
        </Button>
      </div>
    </div>
  );
}
