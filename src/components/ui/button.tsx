import * as React from 'react';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'accent' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg' | 'icon';
  isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', isLoading = false, children, disabled, ...props }, ref) => {
    const baseStyles = 'inline-flex items-center justify-center font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-amber focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none rounded-btn active:scale-[0.98]';

    const variants = {
      primary: 'bg-brand-charcoal text-white hover:bg-brand-contrast border border-brand-charcoal shadow-sm',
      accent: 'bg-brand-amber text-white hover:bg-brand-amber-hover shadow-sm hover:shadow',
      secondary: 'bg-white text-brand-charcoal border border-surface-border-medium hover:bg-surface-subtle shadow-sm',
      ghost: 'bg-transparent text-neutral-700 hover:bg-surface-subtle hover:text-brand-charcoal',
      danger: 'bg-feedback-error text-white hover:bg-red-600 shadow-sm',
    };

    const sizes = {
      sm: 'h-8 px-3 text-xs tracking-wider uppercase font-semibold',
      md: 'h-10 px-4 py-2 text-sm',
      lg: 'h-12 px-6 text-base font-semibold',
      icon: 'h-9 w-9 p-0',
    };

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin text-current" />}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
