import * as React from "react";

import { cn } from "@/utils/cn";

const FoodInput = React.forwardRef(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        "flex h-10 w-full rounded-md border border-food-ring bg-food-background px-3 py-2 text-base ring-offset-food-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-food-foreground placeholder:text-food-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-food-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className,
      )}
      ref={ref}
      {...props}
    />
  );
});
FoodInput.displayName = "Input";

export { FoodInput };
