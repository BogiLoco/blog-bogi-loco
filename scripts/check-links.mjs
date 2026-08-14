#!/usr/bin/env node
// Extracts all markdown links + `sources[].url` frontmatter entries from
// published (draft:false) posts and checks they return a non-error status.
//
// Usage: node scripts/check-links.mjs
//
import { readdirSync, readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const CONTENT_DIR = join(__dirname, '..', 'src', 'content');
const CATEGORIES = ['ai', 'ai-security', 'testing-ai', 'qa-automation', 'notes'];

function extractUrls(raw) {
  const urls = new Set();

  // markdown links [text](url)
  for (const match of raw.matchAll(/\]\((https?:\/\/[^\s)]+)\)/g)) {
    urls.add(match[1]);
  }
  // frontmatter sources: url: "..."
  for (const match of raw.matchAll(/url:\s*["'](https?:\/\/[^"']+)["']/g)) {
    urls.add(match[1]);
  }

  return [...urls];
}

async function checkUrl(url) {
  try {
    const res = await fetch(url, { method: 'HEAD', redirect: 'follow' });
    return { url, ok: res.ok, status: res.status };
  } catch (err) {
    return { url, ok: false, status: 'error', error: err.message };
  }
}

async function main() {
  const results = [];

  for (const category of CATEGORIES) {
    const dir = join(CONTENT_DIR, category);
    let files = [];
    try {
      files = readdirSync(dir);
    } catch {
      continue;
    }

    for (const file of files) {
      if (!file.endsWith('.mdx') && !file.endsWith('.md')) continue;
      const raw = readFileSync(join(dir, file), 'utf-8');
      if (/draft:\s*true/.test(raw)) continue; // skip drafts

      const urls = extractUrls(raw);
      for (const url of urls) {
        const result = await checkUrl(url);
        results.push({ file: `${category}/${file}`, ...result });
      }
    }
  }

  const broken = results.filter((r) => !r.ok);

  console.log(`Checked ${results.length} links across published posts.`);
  if (broken.length > 0) {
    console.log(`\n❌ ${broken.length} broken link(s):`);
    for (const b of broken) {
      console.log(`  ${b.file} -> ${b.url} (${b.status}${b.error ? `: ${b.error}` : ''})`);
    }
    process.exitCode = 1;
  } else {
    console.log('✅ All links OK.');
  }
}

main();
