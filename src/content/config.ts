import { defineCollection, z } from 'astro:content';

const baseSchema = z.object({
  title: z.string(),
  description: z.string().max(160), // meta description / OG
  publishDate: z.date(),
  updatedDate: z.date().optional(),
  draft: z.boolean().default(true),
  tags: z.array(z.string()).default([]),
  category: z.enum(['ai', 'ai-security', 'testing-ai', 'qa-automation', 'notes']),
  heroImage: z.string().optional(),
  ogImage: z.string().optional(),
  readingTime: z.number().optional(), // computed automatically at build time, optional in frontmatter
  sources: z
    .array(
      z.object({
        title: z.string(),
        url: z.string().url(),
      })
    )
    .default([]),
  // for security posts — whether the content includes a PoC
  containsPoc: z.boolean().default(false),
});

const postCollection = defineCollection({
  type: 'content',
  schema: baseSchema,
});

export const collections = {
  ai: postCollection,
  'ai-security': postCollection,
  'testing-ai': postCollection,
  'qa-automation': postCollection,
  notes: postCollection,
};
