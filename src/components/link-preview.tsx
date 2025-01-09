import { ArrowRight, AtSign } from "lucide-react";
import { Icons } from "./icons";

const platformStyles: Record<string, string> = {
  github: "bg-[#1A1A1A] text-white",
  frontendmentor: "bg-white shadow-inset border border-gray-300 text-gray-700",
  twitter: "bg-[#43B7E9] text-white",
  linkedin: "bg-[#2D68FF] text-white",
  youtube: "bg-[#EE3939] text-white",
  facebook: "bg-[#2442AC] text-white",
  twitch: "bg-[#EE3FC8] text-white",
  devto: "bg-[#333333] text-white",
  codepen: "bg-[#333333] text-white",
  gitlab: "bg-[#EB4925] text-white",
  hashnode: "bg-[#0330D1] text-white",
  stackoverflow: "bg-[#EC7100] text-white",
};

export function LinkPreview({ platform }: { platform: keyof typeof Icons }) {
  const platformClass = platformStyles[platform] || "bg-gray-800 text-white";
  const Icon = Icons[platform] || AtSign;

  return (
    <button
      className={`flex items-center w-full h-[44px] px-4 py-4 mb-5 last:mb-0 rounded-lg text-sm relative cursor-pointer ${platformClass}`}
    >
      <div className="flex-shrink-0 mr-2">
        <div
          className={`block selectIconDiv ${
            platform === "frontendmentor"
              ? "filter-none"
              : "filter invert brightness-0"
          }`}
        >
          <Icon />
        </div>
      </div>
      {platform}
      <ArrowRight size={16} className="ml-auto" />
    </button>
  );
}
