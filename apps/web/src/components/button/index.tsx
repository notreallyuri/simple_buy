import { cn } from "@acme/utils";
import Link from "next/link";
import { forwardRef } from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "secondary" | "authPrimary" | "authSecondary";
  href?: string;
  className?: string;
  link?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      label,
      type = "button",
      variant = "primary",
      href = "/",
      className,
      link = false,
      ...props
    },
    ref,
  ) => {
    if (link) {
      return (
        <Link href={href} className={cn("")}>
          {label}
        </Link>
      );
    }

    return (
      <button
        type={type}
        className={cn(
          "cursor-pointer transition-all",
          variant === "primary" && "",
          variant === "secondary" && "",
          variant === "authPrimary" &&
            "h-10 w-full rounded-lg bg-indigo-500 hover:opacity-70",
          className,
        )}
        ref={ref}
        {...props}
      >
        {label}
      </button>
    );
  },
);

Button.displayName = "Button";
