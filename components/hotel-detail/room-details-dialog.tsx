"use client";

import type { RoomCardProps } from "@/app/(protected)/hotel-detail/types";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  IconArrowAutofitWidth,
  IconBath,
  IconBed,
  IconFriends,
  IconSmoking,
  IconSmokingNo,
  IconSnowflake,
} from "@tabler/icons-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";

interface RoomDetailsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  room: RoomCardProps | null;
  showThumbnails?: boolean;
}

const RoomDetailsDialog: React.FC<RoomDetailsDialogProps> = ({
  open,
  onOpenChange,
  room,
  showThumbnails = false,
}) => {
  const [mainApi, setMainApi] = useState<CarouselApi>();
  const [thumbnailApi, setThumbnailApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!mainApi) return;

    setCount(mainApi.scrollSnapList().length);
    setCurrent(mainApi.selectedScrollSnap() + 1);

    mainApi.on("select", () => {
      setCurrent(mainApi.selectedScrollSnap() + 1);
    });
  }, [mainApi]);

  // Reset state when dialog opens
  useEffect(() => {
    if (open) {
      setCurrent(1);
    }
  }, [open]);

  if (!room) return null;

  // Thumbnail navigation functions (simplified for showing all images)
  const handleThumbnailClick = (index: number) => {
    mainApi?.scrollTo(index);
  };

  // Determine grid layout based on image count
  const getThumbnailGridCols = () => {
    if (room.images.length <= 2) return "grid-cols-2";
    if (room.images.length === 3) return "grid-cols-3";
    return "grid-cols-4";
  };

  const shouldShowThumbnails = showThumbnails && room.images.length > 1;

  const getIcon = (iconName: string) => {
    const icons = {
      Square: <IconArrowAutofitWidth className="h-5 w-5 text-gray-600" />,
      Users: <IconFriends className="h-5 w-5 text-gray-600" />,
      Cigarette: <IconSmoking className="h-5 w-5 text-gray-600" />,
      CigaretteOff: <IconSmokingNo className="h-5 w-5 text-gray-600" />,
      Bed: <IconBed className="h-5 w-5 text-gray-600" />,
    };
    return icons[iconName as keyof typeof icons] || null;
  };

  // Mock room details data based on the image
  const roomDetails = {
    size: "40 sqm",
    guests: "2 Guests",
    amenities: [
      {
        icon: <IconSmokingNo className="h-5 w-5 text-gray-600" />,
        text: "Non Smoking",
      },
      { icon: <IconBath className="h-5 w-5 text-gray-600" />, text: "Bathtub" },
      {
        icon: <IconSnowflake className="h-5 w-5 text-gray-600" />,
        text: "Refrigerator",
      },
    ],
    aboutRoom: [
      "1 Double Bed or 2 Twin Beds",
      "Internet - Free wired internet access",
      "Entertainment - LCD television with cable channels",
      "Food & Drink - Mini-fridge, minibar (fees may apply), coffee/tea maker, and 24-hour room service",
      "Bathroom - Private bathroom, shower, bathrobes, and slippers",
      "Practical - Day bed, safe, and iron/ironing board",
      "Comfort - Air conditioning and daily housekeeping",
      "Accessibility - Wheelchair accessible",
      "Need to Know - No rollaway/extra beds available, bed sheets not available",
      "Non-Smoking",
    ],
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] min-w-7xl overflow-y-auto bg-white px-8">
        <DialogHeader>
          <DialogTitle className="text-left text-2xl font-bold">
            {room.name}
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Main Image Carousel */}
          <div className="space-y-4">
            <div className="relative">
              <Carousel setApi={setMainApi} className="w-full">
                <CarouselContent>
                  {room.images.map((image, index) => (
                    <CarouselItem key={index}>
                      <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
                        <Image
                          src={image}
                          alt={`${room.name} - Image ${index + 1}`}
                          fill
                          className="object-cover"
                          sizes="(max-width: 1024px) 100vw, 50vw"
                        />
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                {room.images.length > 1 && (
                  <>
                    <CarouselPrevious className="left-2 h-8 w-8 bg-white/90 shadow-md hover:bg-white" />
                    <CarouselNext className="right-2 h-8 w-8 bg-white/90 shadow-md hover:bg-white" />
                  </>
                )}
              </Carousel>

              {/* Image counter */}
              <div className="absolute right-2 bottom-2 rounded bg-black/50 px-2 py-1 text-sm text-white">
                {current} / {count}
              </div>
            </div>

            {/* Thumbnail Gallery */}
            {shouldShowThumbnails && (
              <div className="space-y-2">
                {room.images.length <= 4 ? (
                  /* Simple grid for 4 or fewer images */
                  <div className={`grid gap-2 ${getThumbnailGridCols()}`}>
                    {room.images.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => handleThumbnailClick(index)}
                        className={`relative aspect-square overflow-hidden rounded border-2 transition-all ${
                          current === index + 1
                            ? "border-blue-500"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <Image
                          src={image}
                          alt={`Thumbnail ${index + 1}`}
                          fill
                          className="object-cover"
                          sizes="100px"
                        />
                      </button>
                    ))}
                  </div>
                ) : (
                  /* Scrollable carousel showing all images */
                  <div className="relative">
                    <Carousel
                      setApi={setThumbnailApi}
                      className="w-full"
                      opts={{
                        align: "start",
                        slidesToScroll: 2,
                      }}
                    >
                      <CarouselContent className="-ml-2">
                        {room.images.map((image, index) => (
                          <CarouselItem key={index} className="basis-1/4 pl-2">
                            <button
                              onClick={() => handleThumbnailClick(index)}
                              className={`relative aspect-square w-full overflow-hidden rounded border-2 transition-all ${
                                current === index + 1
                                  ? "border-blue-500"
                                  : "border-gray-200 hover:border-gray-300"
                              }`}
                            >
                              <Image
                                src={image}
                                alt={`Thumbnail ${index + 1}`}
                                fill
                                className="object-cover"
                                sizes="100px"
                              />
                            </button>
                          </CarouselItem>
                        ))}
                      </CarouselContent>
                      <CarouselPrevious className="left-0 h-6 w-6 bg-white/90 shadow-md hover:bg-white" />
                      <CarouselNext className="right-0 h-6 w-6 bg-white/90 shadow-md hover:bg-white" />
                    </Carousel>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Room Information Section */}
          <div className="space-y-6">
            <div>
              <h3 className="mb-4 text-lg font-semibold">Room Information</h3>
              <div className="grid grid-cols-3 gap-4">
                <div className="flex items-center gap-2">
                  <IconArrowAutofitWidth className="h-5 w-5 text-gray-600" />
                  <span className="text-sm">{roomDetails.size}</span>
                </div>
                <div className="flex items-center gap-2">
                  <IconFriends className="h-5 w-5 text-gray-600" />
                  <span className="text-sm">{roomDetails.guests}</span>
                </div>
                {roomDetails.amenities.map((amenity, index) => (
                  <div key={index} className="flex items-center gap-2">
                    {amenity.icon}
                    <span className="text-sm">{amenity.text}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="mb-4 text-lg font-semibold">About This Room</h3>
              <div className="space-y-3">
                {roomDetails.aboutRoom.map((detail, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <div className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gray-400" />
                    <span className="text-sm leading-relaxed text-gray-700">
                      {detail.includes(" - ") ? (
                        <>
                          <span className="font-medium">
                            {detail.split(" - ")[0]}
                          </span>
                          {" - "}
                          {detail.split(" - ").slice(1).join(" - ")}
                        </>
                      ) : (
                        detail
                      )}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RoomDetailsDialog;
