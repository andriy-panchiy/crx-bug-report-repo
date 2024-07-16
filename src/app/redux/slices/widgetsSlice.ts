import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface CounterState {
  CommunityTrees: {
    isShown: boolean;
    value: number;
  };
  HowItWorks: {
    isShown: boolean;
  };
  RightColumnAds: {
    isShown: boolean;
    slider: {
      slides: {
        id: number;
        src: string;
        href: string;
        alt: string;
      }[];
    };
  };
  TreeCounter: {
    isShown: boolean;
    value: number;
  };
  EthicalBrands: {
    isShown: boolean;
  };
  Overlay: {
    isShown: boolean;
  };
}

export const initialState: CounterState = {
  CommunityTrees: { isShown: true, value: 0 },
  HowItWorks: { isShown: true },
  RightColumnAds: {
    isShown: true,
    slider: {
      slides: [
        { id: 0, src: chrome.runtime.getURL('/images/ad1.png'), href: 'https://www.grove.co/', alt: 'Slide 1' },
        {
          id: 1,
          src: chrome.runtime.getURL('/images/ad2.png'),
          href: 'https://www.arcadia.com/community-solar/treecard-solar?irclickid=0P52UNzdzxyKWqS3K9zXh33uUkCxUBVc2VLhyY0&irgwc=1&utm_source=treecard&utm_medium=partner&promo=impacttreecard50',
          alt: 'Slide 2',
        },
        { id: 2, src: chrome.runtime.getURL('/images/ad3.png'), href: 'https://geologie.com/', alt: 'Slide 3' },
        { id: 3, src: chrome.runtime.getURL('/images/ad4.png'), href: 'https://geologie.com/', alt: 'Slide 4' },
        { id: 4, src: chrome.runtime.getURL('/images/ad5.png'), href: 'https://www.homechef.com/', alt: 'Slide 5' },
      ],
    },
  },
  TreeCounter: { isShown: true, value: 0 },
  EthicalBrands: { isShown: true },
  Overlay: { isShown: true },
};

export const widgetsSlice = createSlice({
  name: 'widgets',
  initialState,
  reducers: {
    setState: <K extends keyof CounterState>(state: CounterState, action: PayloadAction<{ key: K; state: CounterState[K] }>) => {
      state[action.payload.key] = action.payload.state;
    },
    setValue: (state: CounterState, action: PayloadAction<{ widget: 'TreeCounter' | 'CommunityTrees'; value: number }>) => {
      state[action.payload.widget].value = action.payload.value;
    },
    increment: (state: CounterState, action: PayloadAction<{ widget: 'TreeCounter' | 'CommunityTrees' }>) => {
      state[action.payload.widget].value += 1;
    },
    decrement: (state: CounterState, action: PayloadAction<{ widget: 'TreeCounter' | 'CommunityTrees' }>) => {
      state[action.payload.widget].value -= 1;
    },
    incrementByAmount: (state: CounterState, action: PayloadAction<{ widget: 'TreeCounter' | 'CommunityTrees'; value: number }>) => {
      state[action.payload.widget].value += action.payload.value;
    },
    showWidget: (state: CounterState, action: PayloadAction<{ widget: keyof CounterState }>) => {
      state[action.payload.widget].isShown = true;
    },
    hideWidget: (state: CounterState, action: PayloadAction<{ widget: keyof CounterState }>) => {
      state[action.payload.widget].isShown = false;
    },
    toggleWidget: (state: CounterState, action: PayloadAction<{ widget: keyof CounterState }>) => {
      state[action.payload.widget].isShown = !state[action.payload.widget].isShown;
    },
  },
});

export const { setState, setValue, increment, decrement, incrementByAmount, showWidget, hideWidget, toggleWidget } = widgetsSlice.actions;

export default widgetsSlice.reducer;
