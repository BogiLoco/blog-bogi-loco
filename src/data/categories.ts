// Must match the collection keys in src/content/config.ts.
export const CATEGORIES = [
  {
    key: 'ai',
    label: 'AI',
    description: 'General AI engineering: models, tooling, and systems design.',
  },
  {
    key: 'ai-security',
    label: 'AI Security',
    description: 'Prompt injection, jailbreaks, red-teaming, and adversarial testing of AI systems.',
  },
  {
    key: 'testing-ai',
    label: 'Testing AI',
    description: 'Evaluation, benchmarking, and QA methodology for AI/LLM systems.',
  },
  {
    key: 'qa-automation',
    label: 'QA Automation',
    description: 'Using AI in test automation, CI/CD, and QA tooling.',
  },
  {
    key: 'notes',
    label: 'Notes',
    description: 'Short TILs and observations.',
  },
] as const;

export type CategoryKey = (typeof CATEGORIES)[number]['key'];
