import Link from 'next/link';
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import rehypeKatex from 'rehype-katex';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import 'katex/dist/katex.min.css';

import { RunsSection } from '@/components/lab/runs-section';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { getLabEntries, getLabEntry } from '@/lib/lab';

export function generateStaticParams() {
  return getLabEntries().map((entry) => ({ slug: entry.slug }));
}

export default async function LabEntryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const entry = getLabEntry(slug);
  if (!entry) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-3xl mx-auto">
        <Link
          href="/lab"
          className="text-sm text-muted-foreground hover:text-foreground"
        >
          ← Strategy Lab
        </Link>

        <div className="mt-4 mb-8">
          <h1 className="text-4xl font-bold mb-3">{entry.title}</h1>
          <p className="text-xl text-muted-foreground mb-4">{entry.summary}</p>
          <div className="flex flex-wrap items-center gap-2">
            {entry.tags.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
          <div className="flex flex-wrap gap-3 mt-6">
            {entry.colabUrl && (
              <Button asChild>
                <a
                  href={entry.colabUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  ▶ Open in Colab
                </a>
              </Button>
            )}
            {entry.githubUrl && (
              <Button asChild variant="outline">
                <a
                  href={entry.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View source on GitHub
                </a>
              </Button>
            )}
          </div>
        </div>

        <article className="prose prose-neutral dark:prose-invert max-w-none prose-table:text-sm">
          <ReactMarkdown
            remarkPlugins={[remarkGfm, remarkMath]}
            rehypePlugins={[rehypeKatex]}
          >
            {entry.content}
          </ReactMarkdown>
        </article>

        <RunsSection strategy={entry.slug} />
      </div>
    </div>
  );
}
