import ProgressBarIcon from '@public/images/progress-bar.svg?react';
import { cn } from '@utils/util';

type ProgressBarProps = React.HTMLAttributes<HTMLDivElement> & {
  progressBarPercentage: number;
  progressBarMinPercentage?: number;
};

export default function ProgressBar({ progressBarPercentage, progressBarMinPercentage = 0, className, ...props }: ProgressBarProps): JSX.Element {
  return (
    <div
      className={cn('min-w-6 min-h-6 max-w-6 max-h-6 rounded-full', className)}
      {...props}
    >
      <ProgressBarIcon
        style={{ '--progressBarPercentage': Math.max(progressBarPercentage, progressBarMinPercentage) } as React.CSSProperties}
        className="[&_circle:nth-child(2)]:[stroke-dashoffset:calc(440_-_(440_*_var(--progressBarPercentage))_/_100)] [&_circle:nth-child(2)]:[stroke-dasharray:440] [&_circle:nth-child(2)]:transition-all [&_circle:nth-child(2)]:duration-300 [&_circle:nth-child(2)]:stroke-custom-progressbar [&_circle]:w-full [&_circle]:h-full [&_circle]:stroke-black/5 [&_circle:nth-child(1)]:[stroke-width:9] [&_circle:nth-child(2)]:[stroke-width:10] [&_circle]:[stroke-linecap:round] [&_circle]:translate-x-[5px] [&_circle]:translate-y-[5px] -rotate-90"
      />
      <progress
        value={progressBarPercentage}
        //@ts-ignore
        min="0"
        max="100"
        className="hidden"
      />
    </div>
  );
}
