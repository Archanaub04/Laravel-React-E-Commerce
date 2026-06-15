import { ButtonHTMLAttributes } from "react";

function hasCustomRounded(className: string) {
  return /\brounded(-[a-z]+)?\b/.test(className);
}

function hasCustomCase(className: string) {
  return /\b(?:uppercase|lowercase|capitalize|normal-case)\b/.test(className);
}

export default function PrimaryButton({
  className = "",
  disabled,
  children,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  const finalClassName = [
    "inline-flex items-center border border-transparent bg-orange-800 px-4 py-2 text-xs font-semibold  tracking-widest text-white transition duration-150 ease-in-out hover:bg-orange-700 focus:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 active:bg-orange-800 dark:bg-orange-200 dark:text-orange-700 dark:hover:bg-white dark:focus:bg-white dark:focus:ring-offset-orange-700 dark:active:bg-orange-300",
    disabled ? "opacity-25" : "",
    hasCustomRounded(className) ? "" : "rounded-md",
    hasCustomCase(className) ? "text-[13px]" : "uppercase",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button {...props} className={finalClassName} disabled={disabled}>
      {children}
    </button>
  );
}
