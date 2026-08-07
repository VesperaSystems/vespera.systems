import { GraphDisplay } from '@/components/graph/graph-display';
import { getClientGraphConfig } from '@/lib/client-graphs';

export const metadata = {
  title: 'Graph',
  description: 'Interactive relationship graph — an open experiment from the Vespera studio.',
};

export default function GraphPage() {
  return <GraphDisplay config={getClientGraphConfig('demo')} />;
}
