import React from "react";
import { cn } from "@/lib/utils";

type Variant = "default" | "outline" | "ghost" | "hero" | "accent";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  size?: "sm" | "md" | "lg";
  asChild?: boolean;
};

const base =
  "inline-flex items-center justify-center rounded-xl font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";

const variantStyles: Record<Variant, string> = {
  default: "bg-primary text-[color:hsl(var(--primary-foreground))] hover:opacity-90",
  outline:
    "border border-border bg-transparent text-foreground hover:bg-secondary",
  ghost: "bg-transparent text-foreground hover:bg-secondary",
  hero:
    "bg-[hsl(var(--primary))] text-[color:hsl(var(--primary-foreground))] shadow-soft hover:opacity-90",
  accent:
    "bg-[hsl(var(--accent))] text-[color:hsl(var(--accent-foreground))] hover:opacity-90",
};

const sizeStyles = {
  sm: "px-3 py-2 text-sm",
  md: "px-4 py-2.5",
  lg: "px-5 py-3 text-base",
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "md", asChild, ...props }, ref) => {
    const Comp: any = asChild ? ("a" as any) : "button";
    return (
      <Comp
        ref={ref}
        className={cn(base, variantStyles[variant], sizeStyles[size], className)}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export default Button;
