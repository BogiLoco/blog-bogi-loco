const WORDS_PER_MINUTE = 200;

/** Estimate reading time (in minutes, rounded up) from raw MDX body text. */
export function estimateReadingTime(rawBody: string): number {
  const words = rawBody.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / WORDS_PER_MINUTE));
}
