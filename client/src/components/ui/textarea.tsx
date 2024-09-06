import * as React from "react"
import { cn } from "@/lib/utils"

const Textarea = ({ className, inputValue, setInputValue }) => {
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <input
      className={cn(
        "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      type="text"
      placeholder="मुझसे कुछ भी पूछें!"
      value={inputValue}
      onChange={handleInputChange}
    />
  );
};

Textarea.displayName = "Textarea";

export { Textarea };
