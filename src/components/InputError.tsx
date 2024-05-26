import { FieldError } from "react-hook-form";

export default function InputError({
  error,
  className,
}: {
  error?: FieldError | string;
  className?: string;
}) {
  const css = `text-red-600 dark:text-red-500 ${className}`;
  if (typeof error === "string") {
    return <p className={css}>{error}</p>;
  }
  return error && error?.message ? (
    <p className={css}>{error.message}</p>
  ) : null;
}
