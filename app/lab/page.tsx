import Link from 'next/link';

import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { getLabEntries } from '@/lib/lab';

export default function LabIndexPage() {
  const entries = getLabEntries();

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-4">Strategy Lab</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Open experiments from the Vespera studio — algorithmic strategies
          built from first principles, with runnable notebooks, backtests, and
          honest limitations.
        </p>
      </div>

      <div className="max-w-4xl mx-auto space-y-6">
        {entries.map((entry) => (
          <Link key={entry.slug} href={`/lab/${entry.slug}`} className="block">
            <Card className="transition-colors hover:border-primary/50">
              <CardHeader>
                <div className="flex items-center justify-between gap-4">
                  <CardTitle>{entry.title}</CardTitle>
                  <div className="flex gap-2 shrink-0">
                    {entry.tags.map((tag) => (
                      <Badge key={tag} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
                <CardDescription>{entry.summary}</CardDescription>
              </CardHeader>
            </Card>
          </Link>
        ))}
        {entries.length === 0 && (
          <p className="text-center text-muted-foreground">
            No strategies published yet — check back soon.
          </p>
        )}
      </div>
    </div>
  );
}
