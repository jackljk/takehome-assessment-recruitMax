import { cn } from '@/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';
import { type LucideIcon } from 'lucide-react';
import { type ButtonHTMLAttributes, forwardRef } from 'react';

interface IconButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof iconButtonVariants>,
    VariantProps<typeof iconVariants> {
  icon: LucideIcon;
}

const iconButtonVariants = cva(
  'border-2 rounded-md transition-all flex items-center justify-center ',
  {
    variants: {
      variant: {
        primary:
          'hover:border-brand-secondary-500 hover:bg-brand-secondary-100 border-slate-100',
        destructive: 'hover:border-red-500 hover:bg-red-100 border-red-50',
      },
      size: {
        xs: 'p-0.5',
        sm: 'p-1',
        md: 'p-1.5',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
);

// Separate CVA for icon styles
const iconVariants = cva('', {
  variants: {
    iconSize: {
      xs: 'size-3',
      sm: 'size-4',
      md: 'size-5',
      lg: 'size-6',
      xl: 'size-7',
    },
    iconFill: {
      none: '',
      white: 'fill-white',
      current: 'fill-current',
      destructive: 'text-red-500 fill-red-500',
    },
  },
  defaultVariants: {
    iconSize: 'md',
    iconFill: 'white',
  },
});

const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    { className, variant, size, iconSize, iconFill, icon: Icon, ...props },
    ref
  ) => {
    return (
      <button
        className={cn(iconButtonVariants({ variant, size }), className)}
        ref={ref}
        {...props}
      >
        <Icon className={iconVariants({ iconSize, iconFill })} />
      </button>
    );
  }
);

IconButton.displayName = 'IconButton';

export default IconButton;
