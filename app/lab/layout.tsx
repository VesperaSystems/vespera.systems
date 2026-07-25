import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Strategy Lab - Vespera Systems',
  description:
    'The Vespera quant lab: algorithmic trading strategies built from first principles, with runnable notebooks, backtests, and honest limitations.',
};

export default function LabLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="min-h-screen bg-background">{children}</div>;
}
