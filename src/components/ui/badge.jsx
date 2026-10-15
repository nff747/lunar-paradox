import * as React from "react";
import { cva } from "class-variance-authority";
import { cn } from "../../lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-purple-400",
  {
    variants: {
      variant: {
        default:
          "border-purple-500/30 bg-purple-500/20 text-purple-200 backdrop-blur-sm",
        secondary:
          "border-white/10 bg-white/5 text-zinc-300",
        destructive:
          "border-rose-500/30 bg-rose-500/20 text-rose-300",
        outline:
          "text-zinc-300 border-white/20",
        success:
          "border-emerald-500/30 bg-emerald-500/20 text-emerald-300",
        cosmic:
          "border-indigo-400/40 bg-gradient-to-r from-purple-500/20 to-indigo-500/20 text-indigo-200 shadow-sm shadow-purple-500/20",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

function Badge({ className, variant, ...props }) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
