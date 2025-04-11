
import { toast as sonnerToast, type Toast } from "sonner";

type ToastProps = Toast & {
  variant?: "default" | "destructive" | "success";
};

export function toast(props: ToastProps) {
  const { variant, ...rest } = props;
  
  // Add variant-specific styling
  let className = "";
  if (variant === "destructive") {
    className = "bg-destructive text-destructive-foreground";
  } else if (variant === "success") {
    className = "bg-green-500 text-white";
  }
  
  return sonnerToast(rest.title as string, {
    ...rest,
    className,
  });
}

export const useToast = () => {
  return {
    toast,
  };
};
