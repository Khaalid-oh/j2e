import Image from "next/image";
import Link from "next/link";

export function Wordmark({ footer = false }: { footer?: boolean }) {
  return (
    <Link
      href="/"
      aria-label="Journey to Excellence — Home"
      className={`relative inline-flex h-[55px] w-[134px] shrink-0 ${footer ? "footer-wordmark" : ""}`}
    >
      <Image
        src="/images/j2e/wordmark.svg"
        alt="Journey to Excellence"
        width={136}
        height={57}
        unoptimized
        className={`absolute -left-px -top-px max-w-none ${footer ? "hidden md:block" : ""}`}
      />
      {footer && (
        <Image
          src="/images/j2e/wordmark-mobile-footer.svg"
          alt="Journey to Excellence"
          width={174}
          height={56}
          unoptimized
          className="absolute left-0 top-0 max-w-none md:hidden"
        />
      )}
    </Link>
  );
}

export function JourneyMotif({
  size = 120,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  return (
    <div
      className={`shrink-0 ${className}`}
      style={{ width: size, height: size }}
    >
      <Image
        src="/images/j2e/journey-motif.svg"
        alt=""
        width={240}
        height={240}
        unoptimized
        style={{
          transform: `scale(${size / 240})`,
          transformOrigin: "top left",
          maxWidth: "none",
        }}
      />
    </div>
  );
}

type IconName =
  "arrow-up-right" | "arrow-right" | "minus" | "plus" | "play" | "menu" | "x";
export function Icon({
  name = "arrow-up-right",
  tone = "ink",
  className = "",
}: {
  name?: IconName;
  tone?: "ink" | "paper";
  className?: string;
}) {
  return (
    <Image
      src={`/images/j2e/${name}-${tone}.svg`}
      alt=""
      width={24}
      height={24}
      unoptimized
      className={`shrink-0 ${className}`}
      aria-hidden="true"
    />
  );
}
