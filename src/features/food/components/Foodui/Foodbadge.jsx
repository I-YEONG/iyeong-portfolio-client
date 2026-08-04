import * as React from "react";
import { cva } from "class-variance-authority";

import { cn } from "@/utils/cn";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-food-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-food-primary text-food-primary-foreground hover:bg-food-primary/80",
        secondary: "border-transparent bg-food-secondary text-food-secondary-foreground hover:bg-food-secondary/80",
        destructive: "border-transparent bg-food-destructive text-food-destructive-foreground hover:bg-food-destructive/80",
        outline: "text-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

const FoodBadge = ({ className, variant, ...props }) => {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
};

export { FoodBadge, badgeVariants };
