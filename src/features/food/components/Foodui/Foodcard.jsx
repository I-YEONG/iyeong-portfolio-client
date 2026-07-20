import * as React from "react";

import { cn } from "@/utils/cn";

const FoodCard = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("rounded-lg border bg-food-Foodcard text-food-Foodcard-foreground shadow-sm", className)} {...props} />
));
FoodCard.displayName = "Card";

const FoodCardHeader = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex flex-col space-y-1.5 p-6", className)} {...props} />
));
FoodCardHeader.displayName = "CardHeader";

const FoodCardTitle = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("text-2xl font-semibold leading-none tracking-tight", className)} {...props} />
));
FoodCardTitle.displayName = "CardTitle";

const FoodCardDescription = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("text-sm text-food-muted-foreground", className)} {...props} />
));
FoodCardDescription.displayName = "CardDescription";

const FoodCardContent = React.forwardRef(({ className, ...props }, ref) => <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />);
FoodCardContent.displayName = "CardContent";

const FoodCardFooter = React.forwardRef(({ className, ...props }, ref) => <div ref={ref} className={cn("flex items-center p-6 pt-0", className)} {...props} />);
FoodCardFooter.displayName = "CardFooter";

export { FoodCard, FoodCardHeader, FoodCardFooter, FoodCardTitle, FoodCardDescription, FoodCardContent };
