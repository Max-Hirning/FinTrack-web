import { Eye, EyeOff } from "lucide-react";
import * as React from "react"
import { cn } from "shared/lib"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
    containerStyles?: string;
  }

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, containerStyles, ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false);
    const isPassword = showPassword ? 'text' : 'password';

    const togglePasswordVisibility = () => setShowPassword(state => !state);

    return (
      <div className={cn('relative', containerStyles)}>
        <input
          type={type === 'password' ? isPassword : type}
          className={cn(
            "flex h-10 w-full rounded-md border focus:border-primary focus:border-2 focus-visible:outline-none focus-visible:ring-ring focus-visible:ring-offset-2 border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50",
            props["aria-invalid"] && "border-destructive focus:border-destructive placeholder:text-red-400 text-destructive bg-red-50",
            className
          )}
          ref={ref}
          {...props}
        />
        {type === 'password' && (
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
          >
            {showPassword ? (
              <EyeOff size={20} className="text-foreground" />
            ) : (
              <Eye size={20} className="text-foreground" />
            )}
          </button>
        )}
      </div>
    )
  }
)
Input.displayName = "Input"

export { Input }
