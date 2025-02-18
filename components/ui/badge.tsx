import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center uppercase font-black text-white rounded-md border px-2.5 py-0.5 text-[11px] w-[100px] justify-center font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent text-white bg-gray-400",
  {
    variants: {
      variant: {
        default: "bg-yellow-400 text-primary-foreground hover:bg-primary/80",
        secondary:
          " bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          " bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground",
        active: "text-green-600 bg-green-400/20 border-green-400/10",
        pending: "text-yellow-500 bg-yellow-300/20 border-yellow-300/10",
        graduated: "text-purple-600 bg-purple-400/20 border-purple-400/10",
        disabled: "text-red-500 bg-[#FFEDEC] hover:bg-[#FFEDEC]/80",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };

export type BadgeVariantsProps =
  | "default"
  | "secondary"
  | "destructive"
  | "outline"
  | "active"
  | "pending"
  | "graduated"
  | "disabled";
