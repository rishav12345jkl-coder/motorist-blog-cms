import * as React from 'react';
import { cn } from '@/lib/utils';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  label?: string;
  helperText?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = 'text', label, error, helperText, id, ...props }, ref) => {
    const inputId = id || React.useId();

    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label htmlFor={inputId} className="block text-xs font-semibold uppercase tracking-wider text-neutral-700">
            {label}
          </label>
        )}
        <input
          id={inputId}
          type={type}
          ref={ref}
          className={cn(
            'flex h-10 w-full rounded-btn border bg-white px-3.5 py-2 text-sm text-brand-charcoal placeholder:text-neutral-400 transition-colors duration-150',
            'border-surface-border-medium focus:border-brand-amber focus:outline-none focus:ring-2 focus:ring-brand-amber/20',
            'disabled:cursor-not-allowed disabled:bg-surface-subtle disabled:opacity-60',
            error && 'border-feedback-error focus:border-feedback-error focus:ring-feedback-error/20',
            className
          )}
          {...props}
        />
        {error ? (
          <p className="text-xs font-medium text-feedback-error">{error}</p>
        ) : helperText ? (
          <p className="text-xs text-neutral-500">{helperText}</p>
        ) : null}
      </div>
    );
  }
);

Input.displayName = 'Input';
