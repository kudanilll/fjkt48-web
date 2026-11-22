interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className = "",
}: SectionHeadingProps) {
  return (
    <div
      className={`space-y-2 ${
        align === "center" ? "text-center mx-auto max-w-2xl" : "max-w-xl"
      } ${className}`}
    >
      {eyebrow && (
        <p className="text-xs font-semibold uppercase tracking-widest text-crimson-600 dark:text-crimson-400">
          {eyebrow}
        </p>
      )}
      <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-50">
        {title}
      </h2>
      {description && (
        <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
}
