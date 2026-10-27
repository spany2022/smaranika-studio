/** The SF monogram from the Smaranika logo, tinted with the current text colour. */
export default function Monogram({ className = "", label }: { className?: string; label?: string }) {
  return (
    <span
      className={`monogram block ${className}`}
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
    />
  );
}
