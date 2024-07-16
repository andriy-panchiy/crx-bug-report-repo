import '@public/css/widgets.css';
import 'swiper/css';

import { useAppDispatch, useAppSelector } from '@app/redux/hooks';
import { hideWidget } from '@app/redux/slices/widgetsSlice';
import { RootState } from '@app/redux/store';
import { Button } from '@components/ui/button';
import EthicalBrands from '@components/widgets/EthicalBrands';
import TreeIcon from '@public/images/TreeIcon.svg?react';
import { cn } from '@utils/util';
import { time } from '@utils/utils';
import { X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react';

export default function RightColumnAds(): JSX.Element {
  const dispatch = useAppDispatch();
  const { RightColumnAds } = useAppSelector((state: RootState) => state.widgets);
  const [activeSlide, setActiveSlide] = useState<number>(0);
  const swiper = useRef<SwiperClass>(null);

  useEffect(() => {
    swiper.current.swiper.update();

    if (!RightColumnAds.slider.slides.length) {
      dispatch(hideWidget({ widget: 'RightColumnAds' }));
    }
  }, [RightColumnAds.slider.slides]);

  return (
    <div
      id="RightColumnAds"
      className={cn('flex flex-col gap-2 px-3 relative', !RightColumnAds.isShown ? 'hidden' : null)}
    >
      <Swiper
        slidesPerView={1}
        onSlideChange={(swiper: SwiperClass) => setActiveSlide(swiper.realIndex)}
        loop={true}
        allowTouchMove={false}
        autoplay={{
          delay: 2 * time.minute,
          disableOnInteraction: false,
        }}
        ref={swiper}
        modules={[Autoplay]}
        className="w-full"
      >
        {RightColumnAds.slider.slides.map((slide) => (
          <SwiperSlide
            key={slide.id}
            className="w-full"
          >
            <Link
              to={slide.href}
              target="_blank"
            >
              <img
                src={slide.src}
                alt={slide.alt}
                className="w-full h-full object-cover"
              />
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
      <Button className="w-full flex flex-row gap-1 bg-custom-text-ad-button hover:bg-custom-text-ad-button/90 text-custom-secondary px-3">
        <TreeIcon className="min-w-3.5 max-w-3.5 min-h-3.5 max-h-3.5 text-custom-secondary" />
        <span className="font-Inter font-medium text-[10px]">This ad funds trees</span>
      </Button>
      <EthicalBrands />
      {RightColumnAds.slider.slides.length ? (
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-5 top-2 min-w-6 min-h-6 max-w-6 max-h-6 z-[99999] hover:bg-black/30"
          onClick={() => dispatch(hideWidget({ widget: 'RightColumnAds' }))}
        >
          <X className="min-w-4 min-h-4 max-w-4 max-h-4 text-white/50" />
        </Button>
      ) : null}
    </div>
  );
}
