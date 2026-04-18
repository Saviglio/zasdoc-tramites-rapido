type LogoProps = { className?: string; variant?: "onYellow" | "onBlue" | "onWhite" };

const Logo = ({ className = "", variant = "onYellow" }: LogoProps) => {
  // "Zas!" text color and "Doc" pill colors adapt by background
  const zasColor = variant === "onBlue" ? "text-brand-yellow" : "text-brand-blue";
  const pillBg = variant === "onBlue" ? "bg-brand-yellow" : "bg-brand-blue";
  const pillText = variant === "onBlue" ? "text-brand-blue" : "text-brand-yellow";

  return (
    <div className={`inline-flex items-center gap-1.5 font-display font-extrabold ${className}`}>
      <span className={`${zasColor} text-3xl leading-none tracking-tight`}>Zas!</span>
      <span className="relative">
        <span
          className={`${pillBg} ${pillText} text-3xl leading-none rounded-lg px-2.5 py-1 inline-block`}
          style={{ clipPath: "polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 0 100%)" }}
        >
          Doc
        </span>
        <span
          className={`absolute top-0 right-0 w-2.5 h-2.5 ${variant === "onBlue" ? "bg-brand-blue" : "bg-brand-yellow"}`}
          style={{ clipPath: "polygon(0 0, 100% 100%, 100% 0)" }}
        />
      </span>
    </div>
  );
};

export default Logo;
