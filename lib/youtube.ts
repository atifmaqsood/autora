/** youtube.com/watch?v=, /shorts/, /embed/, /live/ and youtu.be links. */
export const YOUTUBE_URL =
  /^https?:\/\/(?:www\.|m\.)?(?:youtube\.com\/(?:watch\?(?:.*&)?v=|shorts\/|embed\/|live\/)|youtu\.be\/)([\w-]{6,})/i;

/**
 * The privacy-friendly embed URL for a YouTube link (playing muted, on a
 * loop), or null if it isn't one. Looping one video needs `playlist=<id>`.
 */
export function youtubeEmbedUrl(url: string | null | undefined): string | null {
  const id = url?.trim().match(YOUTUBE_URL)?.[1];
  return id
    ? `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&mute=1&loop=1&playlist=${id}&playsinline=1&rel=0`
    : null;
}
