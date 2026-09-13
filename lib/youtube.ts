/* ─── YouTube URL parsing helpers (watch / shorts / youtu.be links) ───────── */
// Used by the /videography page to derive thumbnails and privacy-enhanced
// embed URLs from a single canonical `videoUrl` stored in the data layer.

/**
 * Extracts the 11-character YouTube video ID from a watch, shorts, youtu.be,
 * or embed URL. Returns null for empty/invalid input (e.g. "pending upload"
 * placeholders in the data layer).
 */
export function getYouTubeId(url: string): string | null {
  if (!url) return null;

  try {
    const parsed = new URL(url);
    const host = parsed.hostname.replace(/^www\./, '');

    if (host === 'youtu.be') {
      return parsed.pathname.split('/').filter(Boolean)[0] ?? null;
    }

    if (host === 'youtube.com' || host === 'm.youtube.com' || host === 'music.youtube.com') {
      if (parsed.pathname.startsWith('/shorts/')) {
        return parsed.pathname.split('/shorts/')[1]?.split('/')[0] ?? null;
      }
      if (parsed.pathname.startsWith('/embed/')) {
        return parsed.pathname.split('/embed/')[1]?.split('/')[0] ?? null;
      }
      if (parsed.searchParams.has('v')) {
        return parsed.searchParams.get('v');
      }
    }

    return null;
  } catch {
    return null;
  }
}

/**
 * Static thumbnail for a YouTube video. Uses `hqdefault` (guaranteed to
 * exist for every public upload) rather than `maxresdefault` (frequently
 * missing on older/lower-res uploads and silently 404s).
 */
export function getYouTubeThumbnail(url: string): string | null {
  const id = getYouTubeId(url);
  return id ? `https://i.ytimg.com/vi/${id}/hqdefault.jpg` : null;
}

/**
 * Privacy-enhanced (youtube-nocookie.com) embed URL for the lightbox player.
 */
export function getYouTubeEmbedUrl(url: string, autoplay = true): string | null {
  const id = getYouTubeId(url);
  if (!id) return null;

  const params = new URLSearchParams({
    rel: '0',
    modestbranding: '1',
    playsinline: '1',
  });
  if (autoplay) params.set('autoplay', '1');

  return `https://www.youtube-nocookie.com/embed/${id}?${params.toString()}`;
}
