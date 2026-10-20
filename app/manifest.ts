import type { MetadataRoute } from "next";

/** Web app manifest: name and home-screen icons from public/fav icons. */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "AGTP GROUP",
    short_name: "AGTP GROUP",
    start_url: "/",
    display: "standalone",
    background_color: "#0B1F33",
    theme_color: "#0B1F33",
    icons: [
      { src: "/fav%20icons/android-chrome-192x192.png", sizes: "192x192", type: "image/png" },
      { src: "/fav%20icons/android-chrome-512x512.png", sizes: "512x512", type: "image/png" }
    ]
  };
}
