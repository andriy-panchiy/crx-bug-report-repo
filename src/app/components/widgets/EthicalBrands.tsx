import '@public/css/widgets.css';

import { EnumURL } from '@app/enums/EnumURL';
import { useAppDispatch, useAppSelector } from '@app/redux/hooks';
import { hideWidget } from '@app/redux/slices/widgetsSlice';
import { RootState } from '@app/redux/store';
import { Button } from '@components/ui/button';
import { cn } from '@utils/util';
import { X } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function EthicalBrands(): JSX.Element {
  const dispatch = useAppDispatch();
  const { EthicalBrands } = useAppSelector((state: RootState) => state.widgets);

  return (
    <div
      id="EthicalBrands"
      className={cn('extension-widget relative', !EthicalBrands.isShown ? 'hidden' : null)}
    >
      <div className="bg-white border border-black/5 rounded-xl flex flex-col p-3">
        <p className="font-Infer font-medium text-custom-text-primary text-[11px] mb-2 w-[calc(100%_-_var(--w-6))]">We only show ads for ethical brands.</p>
        <Link
          to={EnumURL.learn_more.url}
          target={EnumURL.learn_more.target}
          className="font-Infer font-semibold text-custom-text-how-it-works text-[11px]"
        >
          Learn more
        </Link>
      </div>
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-2 top-2 min-w-6 min-h-6 max-w-6 max-h-6 z-[99999]"
        onClick={() => dispatch(hideWidget({ widget: 'EthicalBrands' }))}
      >
        <X className="min-w-4 min-h-4 max-w-4 max-h-4 text-black/25" />
      </Button>
    </div>
  );
}
