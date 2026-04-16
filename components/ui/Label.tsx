import { cn } from "@/lib/cn";
import type { LabelHTMLAttributes, ReactNode } from "react";

interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  children: ReactNode;
}

export function Label({ className, children, ...props }: LabelProps) {
  return (
    <label
      className={cn(
        "block text-sm font-medium text-slate-700 mb-1.5",
        className,
      )}
      {...props}
    >
      {children}
    </label>
  );
}
