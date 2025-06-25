import { cn } from '@/lib/utils';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { type ElementType, forwardRef, type HTMLAttributes } from 'react';

interface TypographyProps<T extends ElementType = ElementType>
  extends HTMLAttributes<HTMLElement>,
    VariantProps<typeof typographyVariants> {
  as?: T;
  asChild?: boolean;
}

const typographyVariants = cva('', {
  variants: {
    variant: {
      h1: 'scroll-m-20 text-lg font-bold tracking-tight sm:text-xl lg:text-2xl',
      h2: 'scroll-m-20 text-base font-bold tracking-tight sm:text-lg lg:text-xl',
      h3: 'scroll-m-20 text-sm font-bold tracking-tight sm:text-base lg:text-lg',
      h4: 'scroll-m-20 text-xs font-bold tracking-tight sm:text-sm lg:text-base',
      header: 'scroll-m-20 text-2xl font-bold tracking-tight',
      p: 'text-sm leading-7 sm:text-base [&:not(:first-child)]:mt-4 sm:[&:not(:first-child)]:mt-6',
      div: 'text-sm sm:text-base [&:not(:first-child)]:mt-4 sm:[&:not(:first-child)]:mt-6',
      lead: 'text-lg text-muted-foreground sm:text-xl lg:text-2xl',
      large: 'text-base font-bold sm:text-lg lg:text-xl',
      small: 'text-xs font-medium leading-none',
      muted: 'text-xs text-muted-foreground sm:text-sm',
    },
    textColor: {
      default: '',
      muted: 'text-muted-foreground',
      destructive: 'text-destructive',
    },
  },
  defaultVariants: {
    variant: 'p',
    textColor: 'default',
  },
});

const componentMap = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  header: 'h2',
  p: 'p',
  div: 'div',
  lead: 'p',
  large: 'div',
  small: 'small',
  muted: 'p',
} as const;

export const Typography = forwardRef<unknown, TypographyProps>(
  ({ className, variant, textColor, asChild = false, as, ...props }, ref) => {
    const safeVariant = variant || 'p';
    let Component;
    if (asChild) {
      Component = Slot;
    } else if (as) {
      Component = as;
    } else {
      Component = componentMap[safeVariant];
    }

    return (
      <Component
        className={cn(typographyVariants({ variant, textColor }), className)}
        ref={ref}
        {...props}
      />
    );
  }
);

Typography.displayName = 'Typography';
