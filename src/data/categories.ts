// Must match the collection keys in src/content/config.ts.
// `visible: false` hides a category from nav/category-grid listings, but
// its /categories/[key] page and posts still build — flip to true when ready.
export const CATEGORIES = [
  {
    key: 'ai',
    label: 'AI',
    description: 'General AI engineering: models, tooling, and systems design.',
    visible: false,
  },
  {
    key: 'ai-security',
    label: 'AI Security',
    description: 'Prompt injection, jailbreaks, red-teaming, and adversarial testing of AI systems.',
    visible: true,
  },
  {
    key: 'testing-ai',
    label: 'Testing AI',
    description: 'Evaluation, benchmarking, and QA methodology for AI/LLM systems.',
    visible: true,
  },
  {
    key: 'qa-automation',
    label: 'QA Automation',
    description: 'Using AI in test automation, CI/CD, and QA tooling.',
    visible: false,
  },
  {
    key: 'notes',
    label: 'Notes',
    description: 'Short TILs and observations.',
    visible: false,
  },
] as const;

export const VISIBLE_CATEGORIES = CATEGORIES.filter((c) => c.visible);

export type CategoryKey = (typeof CATEGORIES)[number]['key'];
