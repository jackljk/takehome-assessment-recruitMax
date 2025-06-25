import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const activeVariants = {
  active: 'bg-brand-primary-400 text-white',
  inactive: 'bg-white hover:bg-brand-primary-300 hover:text-white',
  base: 'transition-all',
};

export const getActiveStyles = (
  isActive: boolean,
  additionalClasses?: string
) =>
  cn(
    activeVariants.base,
    isActive ? activeVariants.active : activeVariants.inactive,
    additionalClasses
  );
