"use client";

import { getIcon } from "@/lib/utils";

export function RoomFeatures({
  features,
}: {
  features: {
    icon: string;
    text: string;
  }[];
}) {
  return (
    <div className="mt-4 sm:mt-6">
      <div className="flex flex-wrap gap-3 sm:gap-6">
        {features.map((feature, index) => (
          <div key={index} className="flex items-center gap-1.5 sm:gap-2">
            {getIcon(feature.icon)}
            <span className="text-xs font-semibold text-gray-600 capitalize sm:text-sm">
              {feature.text}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
