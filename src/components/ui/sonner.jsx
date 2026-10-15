import { Toaster as Sonner } from "sonner";

const Toaster = ({ ...props }) => {
  return (
    <Sonner
      theme="dark"
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-zinc-950/90 group-[.toaster]:text-zinc-100 group-[.toaster]:border-purple-500/30 group-[.toaster]:backdrop-blur-xl group-[.toaster]:shadow-2xl group-[.toaster]:rounded-2xl group-[.toaster]:p-4",
          description: "group-[.toast]:text-zinc-400 text-xs mt-1",
          actionButton:
            "group-[.toast]:bg-purple-600 group-[.toast]:text-white font-medium text-xs rounded-lg px-3 py-1.5",
          cancelButton:
            "group-[.toast]:bg-white/10 group-[.toast]:text-zinc-300 text-xs rounded-lg px-3 py-1.5",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
