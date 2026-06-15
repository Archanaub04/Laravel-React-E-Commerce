import {
  forwardRef,
  InputHTMLAttributes,
  useEffect,
  useImperativeHandle,
  useRef,
} from "react";

export default forwardRef(function TextInput(
  {
    type = "text",
    className = "",
    isFocused = false,
    ...props
  }: InputHTMLAttributes<HTMLInputElement> & { isFocused?: boolean },
  ref
) {
  const localRef = useRef<HTMLInputElement>(null);

  useImperativeHandle(ref, () => ({
    focus: () => localRef.current?.focus(),
  }));

  useEffect(() => {
    if (isFocused) {
      localRef.current?.focus();
    }
  }, [isFocused]);

  return (
    <input
      {...props}
      type={type}
      className={
        "input rounded-md border border-gray-300 shadow-sm dark:text-gray-300 focus:border-orange-900 focus:ring-1 focus:ring-orange-900 dark:focus:border-orange-600 dark:focus:ring-1 dark:focus:ring-orange-600 focus:outline-none transition-all duration-200 ease-in-out " +
        className
      }
      ref={localRef}
    />
  );
});
