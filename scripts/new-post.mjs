#!/usr/bin/env node
// Scaffolds a new blog post with valid frontmatter.
//
// Usage:
//   node scripts/new-post.mjs "My Post Title" --category ai-security
//   node scripts/new-post.mjs --list-tags
//
import { readdirSync, readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const CONTENT_DIR = join(__dirname, '..', 'src', 'content');
const CATEGORIES = ['ai', 'ai-security', 'testing-ai', 'qa-automation', 'notes'];

function slugify(title) {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

function listExistingTags() {
  const tags = new Set();
  for (const category of CATEGORIES) {
    const dir = join(CONTENT_DIR, category);
    if (!existsSync(dir)) continue;
    for (const file of readdirSync(dir)) {
      if (!file.endsWith('.mdx') && !file.endsWith('.md')) continue;
      const raw = readFileSync(join(dir, file), 'utf-8');
      const match = raw.match(/tags:\s*\[([^\]]*)\]/);
      if (match) {
        match[1]
          .split(',')
          .map((t) => t.trim().replace(/["']/g, ''))
          .filter(Boolean)
          .forEach((t) => tags.add(t));
      }
    }
  }
  return [...tags].sort();
}

const args = process.argv.slice(2);

if (args.includes('--list-tags')) {
  const tags = listExistingTags();
  console.log('Existing tags:\n' + tags.map((t) => `  - ${t}`).join('\n'));
  process.exit(0);
}

const title = args[0];
if (!title || title.startsWith('--')) {
  console.error('Usage: node scripts/new-post.mjs "Post Title" --category <category>');
  process.exit(1);
}

const categoryFlagIndex = args.indexOf('--category');
const category = categoryFlagIndex !== -1 ? args[categoryFlagIndex + 1] : null;

if (!category || !CATEGORIES.includes(category)) {
  console.error(`--category must be one of: ${CATEGORIES.join(', ')}`);
  process.exit(1);
}

const slug = slugify(title);
const targetDir = join(CONTENT_DIR, category);
if (!existsSync(targetDir)) mkdirSync(targetDir, { recursive: true });

const targetFile = join(targetDir, `${slug}.mdx`);
if (existsSync(targetFile)) {
  console.error(`File already exists: ${targetFile}`);
  process.exit(1);
}

const today = new Date().toISOString().split('T')[0];

const frontmatter = `---
title: "${title}"
description: ""
publishDate: ${today}
draft: true
tags: []
category: "${category}"
sources: []
containsPoc: false
---

<!-- Hook: grab attention in 2-3 sentences, no heading — flows straight after the frontmatter. -->

<!-- Context: background before the specifics, no heading. -->

<!-- Core content: the actual how/what. Use ### subheadings as needed, no top-level heading. -->

## Practical takeaways

## Sources
`;

writeFileSync(targetFile, frontmatter, 'utf-8');
console.log(`Created ${targetFile}`);
console.log('Existing tags for reference:');
console.log(listExistingTags().map((t) => `  - ${t}`).join('\n') || '  (none yet)');
