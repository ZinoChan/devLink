import * as React from "react";
import { cn } from "@/lib/utils";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, icon, ...props }, ref) => {
    return (
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-grey">
            {icon}
          </div>
        )}
        <input
          type={type}
          className={cn(
            "flex bg-white h-12 w-full rounded-sm border border-grey-borders  px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-neutral-950 placeholder:text-grey-dark/50 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-purple disabled:cursor-not-allowed placeholder:font-main placeholder:text-sm disabled:opacity-50 md:text-sm",
            icon && "pl-10",
            className
          )}
          ref={ref}
          {...props}
        />
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
