import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";

import { cn } from "@/utils/cn";

const FoodTabs = TabsPrimitive.Root;

const FoodTabsList = React.forwardRef(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn("inline-flex h-10 items-center justify-center rounded-md bg-food-muted p-1 text-food-muted-foreground", className)}
    {...props}
  />
));
FoodTabsList.displayName = TabsPrimitive.List.displayName;

const FoodTabsTrigger = React.forwardRef(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-food-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-food-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-food-background data-[state=active]:text-food-foreground data-[state=active]:shadow-sm",
      className,
    )}
    {...props}
  />
));
FoodTabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

const FoodTabsContent = React.forwardRef(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      "mt-2 ring-offset-food-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-food-ring focus-visible:ring-offset-2",
      className,
    )}
    {...props}
  />
));
FoodTabsContent.displayName = TabsPrimitive.Content.displayName;

export { FoodTabs, FoodTabsList, FoodTabsTrigger, FoodTabsContent };
