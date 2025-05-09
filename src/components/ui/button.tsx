
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary-700 text-white hover:bg-primary-800",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-primary-700 bg-background hover:bg-primary-50 text-primary-700",
        secondary:
          "bg-secondary text-primary-700 hover:bg-secondary/80",
        ghost: "hover:bg-secondary/20 text-primary-700",
        link: "text-accent-500 underline-offset-4 hover:underline",
        cta: "bg-[#0EA5E9] text-white hover:bg-[#0EA5E9]/90 shadow-sm",
        accent: "bg-accent-500 text-white hover:bg-accent-600",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        xl: "h-12 rounded-md px-8 text-base",
        icon: "h-10 w-10",
        mobile: "w-full h-11 rounded-md px-4 py-3", // Added mobile-optimized size
      },
      fullWidth: {
        true: "w-full",
      },
      responsive: {
        true: "w-full sm:w-auto", // Added responsive width variant
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
    compoundVariants: [
      {
        responsive: true,
        className: "flex items-center justify-center",
      },
    ],
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  fullWidth?: boolean
  responsive?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, fullWidth, responsive, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, fullWidth, responsive, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
