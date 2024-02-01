import React, { forwardRef, ForwardedRef, InputHTMLAttributes } from "react";

import './InputForm.style.css'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  inputClassName?: string;
  labelClassName?: string;
  labelColor?: string;
}

const CustomInput: React.ForwardRefRenderFunction<HTMLInputElement, InputProps> = (
  { label, inputClassName, labelColor, labelClassName, ...inputProps },
  ref: ForwardedRef<HTMLInputElement>
) => {
  return (
    <div className="flex flex-col font-kanit" >
      {label && (
        <label
          className={` ${labelClassName || ''}`}
          htmlFor={inputProps.id}
          style={{ color: labelColor }}
        >
          {label}
        </label>
      )}
      <input 
      className={`bg-white border border-gray-300 text-black sm:text-sm rounded-lg w-full p-2.5 ${inputClassName || ''}`} 
      required 
      ref={ref} 
      {...inputProps} 
      />
    </div>
  );
};

const Input = forwardRef<HTMLInputElement, InputProps>(CustomInput);

export default Input;
