import { InputHTMLAttributes } from 'react';

export default function Checkbox({
    className = '',
    ...props
}: InputHTMLAttributes<HTMLInputElement>) {
    return (
      <input
        {...props}
        type="checkbox"
        className={
          "checkbox checkbox-sm checked:bg-orange-900 checked:text-white border-gray-300 shadow-sm focus:ring-orange-500 dark:border-gray-700 dark:bg-gray-900 dark:focus:ring-orange-600 dark:focus:ring-offset-gray-800 " +
          className
        }
      />
    );
}

