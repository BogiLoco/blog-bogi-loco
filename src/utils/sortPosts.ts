import type { CollectionEntry } from 'astro:content';

type AnyPost = CollectionEntry<
  'ai' | 'ai-security' | 'testing-ai' | 'qa-automation' | 'notes'
>;

/** Newest-first, published-only (excludes draft: true). */
export function sortPosts(posts: AnyPost[]): AnyPost[] {
  return posts
    .filter((post) => !post.data.draft)
    .sort((a, b) => b.data.publishDate.valueOf() - a.data.publishDate.valueOf());
}
