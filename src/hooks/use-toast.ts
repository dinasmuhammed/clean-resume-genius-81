
import { toast as sonnerToast, type ToastT } from "sonner";

// Define our own Toast type since sonner's type is imported as ToastT
type Toast = Omit<ToastT, 'id'> & {
  variant?: "default" | "destructive" | "success";
  id?: string | number;
  // Add the type property that's being destructured in the toaster component
  type?: string;
};

// Define the unified return type for useToast
export interface UseToastReturnType {
  toast: (props: Toast) => string | number;
  toasts: Toast[];
}

export function toast(props: Toast) {
  const { variant, id = crypto.randomUUID(), ...rest } = props;
  
  // Add variant-specific styling
  let className = "";
  if (variant === "destructive") {
    className = "bg-destructive text-destructive-foreground";
  } else if (variant === "success") {
    className = "bg-green-500 text-white";
  }
  
  return sonnerToast(rest.title as string, {
    ...rest,
    id,
    className,
  });
}

// Create a wrapper around sonner's toast functionality
const toasts: Toast[] = []; // This is just a placeholder as sonner handles the actual toast state

export const useToast = (): UseToastReturnType => {
  return {
    toast,
    toasts,
  };
};
