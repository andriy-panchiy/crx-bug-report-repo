import '@public/css/widgets.css';

import { useAppSelector } from '@app/redux/hooks';
import { RootState } from '@app/redux/store';
import ProgressBar from '@components/custom/ProgressBar';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@components/ui/tooltip';
import Megaphone from '@public/images/megaphone.svg?react';
import Phone from '@public/images/phone.svg?react';
import { cn } from '@utils/util';
import { useEffect, useRef } from 'react';
import Reel from 'react-reel';

type TreeCounterProps = React.HTMLAttributes<HTMLDivElement> & {};

export default function TreeCounter({ className, ...props }: TreeCounterProps): JSX.Element {
  const { TreeCounter } = useAppSelector((state: RootState) => state.widgets);
  const progressBarPercentage = +(TreeCounter.value - Math.floor(TreeCounter.value)).toFixed(2) * 100;
  const numberTicker = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (numberTicker.current?.dataset.value && TreeCounter.value > +numberTicker.current.dataset.value) {
      numberTicker.current.classList.add('pulse');
      setTimeout(() => {
        numberTicker.current?.classList.remove('pulse');
      }, 300);
    }
  }, [TreeCounter.value]);

  return (
    <div
      id="TreeCounter"
      className={cn('extension-widget flex flex-row items-center justify-end gap-2', className)}
      {...props}
    >
      <p className="font-Inter font-medium text-[11px] uppercase tracking-px">Your trees</p>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger className="flex flex-row rounded-full bg-black/5 items-center relative">
            <ProgressBar
              className="min-w-7.5 min-h-7.5 max-w-7.5 max-h-7.5"
              progressBarPercentage={progressBarPercentage}
            />
            <img
              src={chrome.runtime.getURL('/images/TreeCounter.png')}
              className="min-w-7.5 min-h-7.5 max-w-7.5 max-h-7.5 p-1.5 absolute top-0 left-0"
              alt=""
            />
            <div
              ref={numberTicker}
              data-value={TreeCounter.value}
              className="font-Inter font-semibold text-custom-secondary text-[16px] px-2 [&.pulse]:text-custom-progressbar"
            >
              <Reel text={String(new Intl.NumberFormat().format(TreeCounter.value))} />
            </div>
          </TooltipTrigger>
          <TooltipContent
            side="bottom"
            align="end"
            className="bg-white border-white/5 relative rounded-xl flex flex-col p-5 shadow-custom-bottom"
          >
            <p className="w-full font-Infer font-semibold text-custom-text-primary text-[16px] mb-1.5">How It Works</p>
            <p className="w-full flex flex-row items-center font-Infer font-medium text-custom-text-secondary text-[14px] leading-5 mb-2 truncate">
              <Megaphone className="mr-2.5 min-w-4 min-h-4 max-w-4 max-h-4 text-custom-text-secondary" />
              <span>Trees are funded by ethical brand ads</span>
            </p>
            <p className="w-full flex flex-row items-center font-Infer font-medium text-custom-text-secondary text-[14px] leading-5 mb-2 truncate">
              <Phone className="mr-2.5 min-w-4 min-h-4 max-w-4 max-h-4 text-custom-text-secondary" />
              <span>Around 50 app sessions funds a tree</span>
            </p>
            <p className="w-full flex flex-row items-center font-Infer font-medium text-custom-text-primary-forest text-[12px] leading-5 mb-2 px-4 py-2.5 bg-custom-background rounded-lg">
              <Phone className="mr-2.5 min-w-6 min-h-6 max-w-6 max-h-6 text-custom-text-primary-forest" />
              <span>
                Head over to the Wildhero app to <br /> learn about your impact and <br /> cleanup carbon!
              </span>
            </p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}
