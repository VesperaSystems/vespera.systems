import 'server-only';

import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';

const LAB_DIR = path.join(process.cwd(), 'content', 'lab');

export interface LabEntry {
  slug: string;
  title: string;
  summary: string;
  status: 'live' | 'coming-soon';
  tags: string[];
  colabUrl?: string;
  githubUrl?: string;
  order: number;
  content: string;
}

function parseEntry(filePath: string): LabEntry {
  const raw = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(raw);
  return {
    slug: path.basename(filePath, '.md'),
    title: data.title ?? path.basename(filePath, '.md'),
    summary: data.summary ?? '',
    status: data.status === 'coming-soon' ? 'coming-soon' : 'live',
    tags: Array.isArray(data.tags) ? data.tags : [],
    colabUrl: data.colabUrl,
    githubUrl: data.githubUrl,
    order: typeof data.order === 'number' ? data.order : 999,
    content,
  };
}

export function getLabEntries(): LabEntry[] {
  if (!fs.existsSync(LAB_DIR)) return [];
  return fs
    .readdirSync(LAB_DIR)
    .filter((f) => f.endsWith('.md'))
    .map((f) => parseEntry(path.join(LAB_DIR, f)))
    .sort((a, b) => a.order - b.order);
}

export function getLabEntry(slug: string): LabEntry | null {
  const filePath = path.join(LAB_DIR, `${slug}.md`);
  if (!fs.existsSync(filePath) || path.dirname(filePath) !== LAB_DIR) {
    return null;
  }
  return parseEntry(filePath);
}
