import tailwind_config from '@/tailwind.config';
import { clsx, type ClassValue } from 'clsx';
import { extendTailwindMerge } from 'tailwind-merge';

const customTwMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      overflow: [{ overflow: ['initial', 'inherit', 'auto', 'hidden', 'visible', 'scroll'] }],
      'overflow-x': [{ 'overflow-x': ['initial', 'inherit', 'auto', 'hidden', 'visible', 'scroll'] }],
      'overflow-y': [{ 'overflow-y': ['initial', 'inherit', 'auto', 'hidden', 'visible', 'scroll'] }],
      w: [{ w: Object.keys(tailwind_config!.theme!.extend!.width!) as string[] }],
      h: [{ h: Object.keys(tailwind_config!.theme!.extend!.height!) as string[] }],
      'min-w': [{ 'min-w': Object.keys(tailwind_config!.theme!.extend!.minWidth!) as string[] }],
      'min-h': [{ 'min-h': Object.keys(tailwind_config!.theme!.extend!.minHeight!) as string[] }],
      'max-w': [{ 'max-w': Object.keys(tailwind_config!.theme!.extend!.maxWidth!) as string[] }],
      'max-h': [{ 'max-h': Object.keys(tailwind_config!.theme!.extend!.maxHeight!) as string[] }],
      size: [{ size: Object.keys(tailwind_config!.theme!.extend!.size!) as string[] }],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return customTwMerge(clsx(inputs));
}
