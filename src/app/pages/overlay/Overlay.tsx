import '@public/css/widgets.css';

import Auth from '@app/pages/auth/Auth';
import { useAppSelector } from '@app/redux/hooks';
import { RootState } from '@app/redux/store';
import { EnumURL } from '@enums/EnumURL';
import Logo from '@public/images/logo-wide-white.svg?react';
import { cn } from '@utils/util';
import { LoaderCircle } from 'lucide-react';

type OverlayProps = React.HTMLAttributes<HTMLDivElement> & {};

export default function Overlay({ className, ...props }: OverlayProps): JSX.Element {
  const { idToken } = useAppSelector((state: RootState) => state.auth);

  if (!idToken) return <Auth isOverlay={true} />;

  return (
    <div
      id="Overlay"
      className={cn('extension-widget py-32 flex flex-col items-center gap-3 !bg-cover', className)}
      style={{ background: `url('${chrome.runtime.getURL('/images/wildhero_bg.png')}') no-repeat` }}
      {...props}
    >
      <a
        target="_blank"
        href={EnumURL.root.url}
        title="Start planting trees today!"
        className="mb-[8px]"
      >
        <Logo className="h-6" />
      </a>
      <main className="flex flex-col px-[45px] py-[35px] rounded-3xl backdrop-blur-sm items-center bg-white/10 text-white">
        <p className="font-Inter text-[35px] leading-[44px] mb-[10px]">Welcome to Wildhero</p>
        <p className="font-Inter text-[19px] leading-[24px] mb-[26px] text-white/80">Get ready to plant trees...</p>
        <LoaderCircle className="min-w-8 min-h-8 max-w-8 max-h-8 animate-spin" />
      </main>
    </div>
  );
}
