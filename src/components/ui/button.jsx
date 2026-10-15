import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import { cn } from "../../lib/utils";
import { audioManager } from "../../utils/audio";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 disabled:pointer-events-none disabled:opacity-50 select-none cursor-pointer",
  {
    variants: {
      variant: {
        default:
          "bg-white/10 hover:bg-white/20 text-white border border-white/15 backdrop-blur-md shadow-lg shadow-black/40 hover:border-purple-400/40 hover:shadow-purple-500/20 active:scale-[0.98]",
        cosmic:
          "bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-500 hover:from-purple-500 hover:to-indigo-500 text-white font-semibold shadow-lg shadow-purple-600/30 hover:shadow-purple-500/50 border border-purple-400/30 hover:scale-[1.02] active:scale-[0.98]",
        outline:
          "border border-white/20 bg-transparent hover:bg-white/10 text-white hover:border-white/40",
        secondary:
          "bg-purple-950/40 text-purple-200 border border-purple-800/40 hover:bg-purple-900/50 hover:border-purple-600/60",
        ghost:
          "hover:bg-white/10 text-zinc-300 hover:text-white",
        link:
          "text-purple-400 underline-offset-4 hover:underline",
        danger:
          "bg-rose-950/40 text-rose-300 border border-rose-800/50 hover:bg-rose-900/60",
      },
      size: {
        default: "h-10 px-5 py-2",
        sm: "h-8 rounded-lg px-3 text-xs",
        lg: "h-12 rounded-2xl px-7 text-base tracking-wide",
        icon: "h-10 w-10 p-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

const Button = React.forwardRef(({ className, variant, size, asChild = false, playSound = true, onClick, ...props }, ref) => {
  const Comp = asChild ? Slot : "button";

  const handleClick = (e) => {
    if (playSound && audioManager) {
      audioManager.playChime();
    }
    if (onClick) onClick(e);
  };

  return (
    <Comp
      className={cn(buttonVariants({ variant, size, className }))}
      ref={ref}
      onClick={handleClick}
      {...props}
    />
  );
});
Button.displayName = "Button";

export { Button, buttonVariants };
