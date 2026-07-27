import * as React from "react";
import * as SelectPrimitive from "@radix-ui/react-select";
import { Check, ChevronDown, ChevronUp } from "lucide-react";

import { cn } from "@/utils/cn";

const FoodSelect = SelectPrimitive.Root;

const FoodSelectGroup = SelectPrimitive.Group;

const FoodSelectValue = SelectPrimitive.Value;

const FoodSelectTrigger = React.forwardRef(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Trigger
    ref={ref}
    className={cn(
      "flex h-10 w-full items-center justify-between rounded-md border border-food-ring bg-food-background px-3 py-2 text-sm ring-offset-food-background data-[placeholder]:text-food-muted-foreground focus:outline-none focus:ring-2 focus:ring-food-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",
      className,
    )}
    {...props}>
    {children}
    <SelectPrimitive.Icon asChild>
      <ChevronDown className="w-4 h-4 opacity-50" />
    </SelectPrimitive.Icon>
  </SelectPrimitive.Trigger>
));
FoodSelectTrigger.displayName = SelectPrimitive.Trigger.displayName;

const FoodSelectScrollUpButton = React.forwardRef(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollUpButton ref={ref} className={cn("flex cursor-default items-center justify-center py-1", className)} {...props}>
    <ChevronUp className="w-4 h-4" />
  </SelectPrimitive.ScrollUpButton>
));
FoodSelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName;

const FoodSelectScrollDownButton = React.forwardRef(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollDownButton ref={ref} className={cn("flex cursor-default items-center justify-center py-1", className)} {...props}>
    <ChevronDown className="w-4 h-4" />
  </SelectPrimitive.ScrollDownButton>
));
FoodSelectScrollDownButton.displayName = SelectPrimitive.ScrollDownButton.displayName;

const FoodSelectContent = React.forwardRef(({ className, children, position = "popper", ...props }, ref) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      ref={ref}
      className={cn(
        "relative z-50 max-h-[--radix-Foodselect-content-available-height] min-w-[8rem] overflow-y-auto overflow-x-hidden rounded-md border bg-food-popover text-food-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-[--radix-Foodselect-content-transform-origin]",
        position === "popper" &&
          "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
        className,
      )}
      position={position}
      {...props}>
      {/* 여기서부터 수정되었습니다 */}
      <FoodSelectScrollUpButton />
      <SelectPrimitive.Viewport
        className={cn("p-1", position === "popper" && "h-[var(--radix-Foodselect-trigger-height)] w-full min-w-[var(--radix-Foodselect-trigger-width)]")}>
        {children}
      </SelectPrimitive.Viewport>
      <FoodSelectScrollDownButton />
      {/* 여기까지 수정되었습니다 */}
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
));
FoodSelectContent.displayName = SelectPrimitive.Content.displayName;

const FoodSelectLabel = React.forwardRef(({ className, ...props }, ref) => (
  <SelectPrimitive.Label ref={ref} className={cn("py-1.5 pl-8 pr-2 text-sm font-semibold", className)} {...props} />
));
FoodSelectLabel.displayName = SelectPrimitive.Label.displayName;

const FoodSelectItem = React.forwardRef(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex w-full cursor-default Foodselect-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-food-accent focus:text-food-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className,
    )}
    {...props}>
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <SelectPrimitive.ItemIndicator>
        <Check className="w-4 h-4" />
      </SelectPrimitive.ItemIndicator>
    </span>

    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
));
FoodSelectItem.displayName = SelectPrimitive.Item.displayName;

const FoodSelectSeparator = React.forwardRef(({ className, ...props }, ref) => (
  <SelectPrimitive.Separator ref={ref} className={cn("-mx-1 my-1 h-px bg-food-muted", className)} {...props} />
));
FoodSelectSeparator.displayName = SelectPrimitive.Separator.displayName;

export {
  FoodSelect,
  FoodSelectGroup,
  FoodSelectValue,
  FoodSelectTrigger,
  FoodSelectContent,
  FoodSelectLabel,
  FoodSelectItem,
  FoodSelectSeparator,
  FoodSelectScrollUpButton,
  FoodSelectScrollDownButton,
};
