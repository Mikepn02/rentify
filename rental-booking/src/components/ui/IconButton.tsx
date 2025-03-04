import { cn } from '@/lib/utils'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import React from 'react'


const IconButtonVariants = cva(
    "flex items-center justify-center rounded-full",
    {
        variants: {
            variant: {
                sm: "h-12 w-12",
                lg: "h-[46.77px] w-[46.77px]",
                xl: ""
            },
        },
        defaultVariants: {
            variant: "sm"
        }
    }
)


export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>,
VariantProps<typeof IconButtonVariants> {
    asChild?: boolean
}
const IconButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, asChild = false, ...props }, ref) => {
      const Comp = asChild ? Slot : "button";
      return (
        <Comp
          className={cn(
            IconButtonVariants({ variant, className }),
            "focus-visible:ring-1"
          )}
          ref={ref}
          {...props}
        />
      );
    }
  );
  
  IconButton.displayName = "IconButton";
  
  export { IconButton, IconButtonVariants };