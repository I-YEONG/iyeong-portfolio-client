import * as React from "react";

import { cn } from "@/utils/cn";

const FoodTextarea = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        "flex min-h-[80px] w-full rounded-md border border-food-ring bg-food-background px-3 py-2 text-base ring-offset-food-background placeholder:text-food-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-food-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className,
      )}
      ref={ref}
      {...props}
    />
  );
});
FoodTextarea.displayName = "Textarea";

export { FoodTextarea };
