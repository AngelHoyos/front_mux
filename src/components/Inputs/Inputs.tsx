import React, { useId } from "react";
import type { InputProps } from "../../models/Inputs/Inputs.mode";

export const Inputs: React.FC<InputProps> = ({
  label,
  error,
  errorMessage,
  id,
  className,
  ...rest
}) => {
  const autoId = useId();
  const inputId = id || autoId;
  return (
    <div className="flex flex-col gap-1 w-full">
      {label && (
        <label htmlFor={inputId} className="text-sm font-medium">
          {label}
        </label>
      )}

      <input
        id={inputId}
        className={`border rounded px-3 text-sm outline-none transition-all ${
          error ? "border-red-500" : "border-gray-300"
        } ${className || ""} `}
        {...rest}
      />
      {error && errorMessage && (
        <span className="text-xs text-red-500">{errorMessage}</span>
      )}
    </div>
  );
};
