"use client";

import { forwardRef, InputHTMLAttributes } from "react";

interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  label: string;
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className = "", label, id, ...props }, ref) => {
    const checkboxId = id || label.toLowerCase().replace(/\s+/g, "-");

    return (
      <div className="flex items-center gap-2">
        <input
          ref={ref}
          type="checkbox"
          id={checkboxId}
          className={`
            w-4 h-4 rounded border-gray-300
            text-verde-agro
            focus:ring-verde-agro/20 focus:ring-offset-0
            cursor-pointer
            ${className}
          `}
          {...props}
        />
        <label htmlFor={checkboxId} className="text-sm text-gray-900 cursor-pointer">
          {label}
        </label>
      </div>
    );
  }
);

Checkbox.displayName = "Checkbox";

export { Checkbox };
export type { CheckboxProps };