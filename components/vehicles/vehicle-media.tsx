import { BrochureViewer } from "@/components/parts/brochure-viewer";
import { Reveal } from "@/components/ui/scroll-reveal";
import { VehicleVideo } from "@/components/vehicles/vehicle-video";
import { youtubeEmbedUrl } from "@/lib/youtube";
import type { Vehicle } from "@/lib/vehicles/types";

/**
 * The vehicle's brochure button and video (an uploaded file or a YouTube
 * link), side by side. Shows only what the admin added; the video starts
 * when it scrolls into view.
 */
export function VehicleMedia({ vehicle, title }: { vehicle: Vehicle; title: string }) {
  const embed = youtubeEmbedUrl(vehicle.youtubeUrl);
  const hasVideo = Boolean(vehicle.videoUrl || embed);
  if (!vehicle.brochureUrl && !hasVideo) return null;

  return (
    <Reveal className="pt-8">
      <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
        <div className="shrink-0">
          {vehicle.brochureUrl && <BrochureViewer url={vehicle.brochureUrl} title={title} />}
        </div>
        {hasVideo && (
          <VehicleVideo videoUrl={vehicle.videoUrl} embedUrl={embed} title={title} />
        )}
      </div>
    </Reveal>
  );
}
