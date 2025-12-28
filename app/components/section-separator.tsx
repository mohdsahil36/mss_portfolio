export function SectionSeparator() {
  return (
    <div className="my-6">
      <div
        className="h-6 md:h-8 w-full"
        style={{
          backgroundImage:
            "repeating-linear-gradient(-45deg, transparent, transparent 8px, hsl(var(--foreground) / 0.3) 8px, hsl(var(--foreground) / 0.3) 10px)",
        }}
      />
    </div>
  );
}
