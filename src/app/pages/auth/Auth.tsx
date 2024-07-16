import { useAppDispatch } from '@app/redux/hooks';
import { hideWidget } from '@app/redux/slices/widgetsSlice';
import { Button } from '@components/ui/button';
import { EnumURL } from '@enums/EnumURL';
import GoogleIcon from '@public/images/google.svg?react';
import Logo from '@public/images/logo-wide-white.svg?react';
import { X } from 'lucide-react';

type AuthProps = {
  isOverlay?: boolean;
};

export default function Auth({ isOverlay }: AuthProps): JSX.Element {
  const dispatch = useAppDispatch();

  return (
    <div
      className="h-screen py-32 flex flex-col items-center gap-3 !bg-cover"
      style={{ background: `url('${chrome.runtime.getURL('/images/wildhero_bg.png')}') no-repeat` }}
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
        <p className="font-Inter text-[35px] leading-[44px] mb-[10px]">Sign into Gmail</p>
        <p className="font-Inter text-[19px] leading-[24px] mb-[26px] text-white/80">Start planting trees today!</p>
        <Button
          role="button"
          variant="outline"
          className="w-full text-custom-primary text-[17px] leading-[22px] font-normal p-6 rounded-lg flex flex-row gap-3"
          asChild
        >
          <a href={EnumURL.auth.url}>
            <GoogleIcon className="min-h-6 max-w-6 max-h-6" />
            <span>Continue with Google</span>
          </a>
        </Button>
      </main>
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-2 top-2 min-w-6 min-h-6 max-w-6 max-h-6 z-[99999]"
        onClick={() => (isOverlay ? dispatch(hideWidget({ widget: 'Overlay' })) : window.close())}
      >
        <X className="min-w-4 min-h-4 max-w-4 max-h-4 text-black/25" />
      </Button>
    </div>
  );
}
