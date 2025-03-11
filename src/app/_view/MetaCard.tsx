import { cn } from "lazy-cn";
import type { ComponentProps } from "react";

export function MetaCard(
  { className, ...props }: ComponentProps<"section">
) {
  return (
    <section className={cn("meta-field-card", className)} {...props}>
      <div key={Math.random()} className="meta-field-card-content">
        {props.children}
      </div>
    </section>
  )
}