import { cn } from "@/lib/cn";
import { forwardRef, type InputHTMLAttributes } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement>;

export const Input = forwardRef<HTMLInputElement, InputProps>(
  function Input({ className, ...props }, ref) {
    return (
      <input
        ref={ref}
        className={cn(
          "flex h-11 w-full rounded-md border border-[var(--border)] bg-white px-3 py-2 text-base",
          "placeholder:text-slate-400",
          "focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent",
          "disabled:opacity-50 disabled:pointer-events-none",
          className,
        )}
        {...props}
      />
    );
  },
);
