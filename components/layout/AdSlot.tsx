import { cn } from "@/lib/cn";

type AdPlacement = "top" | "inline" | "bottom";

interface AdSlotProps {
  placement: AdPlacement;
  className?: string;
}

const heights: Record<AdPlacement, string> = {
  top: "min-h-[90px] md:min-h-[120px]",
  inline: "min-h-[250px]",
  bottom: "min-h-[90px] md:min-h-[120px]",
};

export function AdSlot({ placement, className }: AdSlotProps) {
  const adClient = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;
  const adSlot = process.env[`NEXT_PUBLIC_ADSENSE_SLOT_${placement.toUpperCase()}`];

  if (!adClient || !adSlot) {
    return null;
  }

  return (
    <div className={cn("w-full", heights[placement], className)}>
      <ins
        className="adsbygoogle block w-full h-full"
        data-ad-client={adClient}
        data-ad-slot={adSlot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}
