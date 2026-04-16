"use client";

import { cn } from "@/lib/cn";

export interface RadioOption<T extends string> {
  value: T;
  label: string;
  description?: string;
}

interface RadioGroupProps<T extends string> {
  name: string;
  value: T;
  onChange: (value: T) => void;
  options: RadioOption<T>[];
  className?: string;
}

export function RadioGroup<T extends string>({
  name,
  value,
  onChange,
  options,
  className,
}: RadioGroupProps<T>) {
  return (
    <div className={cn("grid grid-cols-1 sm:grid-cols-2 gap-2", className)}>
      {options.map((option) => {
        const checked = option.value === value;
        return (
          <label
            key={option.value}
            className={cn(
              "flex cursor-pointer items-start gap-3 rounded-md border p-3 transition-colors",
              checked
                ? "border-[var(--primary)] bg-[var(--primary)]/5"
                : "border-[var(--border)] hover:bg-slate-50",
            )}
          >
            <input
              type="radio"
              name={name}
              value={option.value}
              checked={checked}
              onChange={() => onChange(option.value)}
              className="mt-1"
            />
            <span>
              <span className="block font-medium text-slate-900">
                {option.label}
              </span>
              {option.description && (
                <span className="block text-sm text-slate-500 mt-0.5">
                  {option.description}
                </span>
              )}
            </span>
          </label>
        );
      })}
    </div>
  );
}
