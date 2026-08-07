import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export default function FAQPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-4">Frequently Asked Questions</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Find answers to common questions about vespera and Vespera Systems
        </p>
      </div>

      <div className="max-w-4xl mx-auto space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>What is vespera?</CardTitle>
            <CardDescription>
              vespera is a free, open-source command-line tool for deal due
              diligence. Point it at a dataroom and it reads the documents,
              extracts key metrics, flags contradictions between documents,
              scores the deal against your investment thesis, and suggests an
              indicative valuation range. Install it with{' '}
              <code>pip install vespera</code>.
            </CardDescription>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Is it really free?</CardTitle>
            <CardDescription>
              Yes — Apache-2.0 licensed, no accounts, no tiers, no trials.
              Vespera is built inside Daniel Molloy Ltd, a technical
              due-diligence consultancy; the consultancy makes its money on
              services, not the tool.
            </CardDescription>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Where do my documents go?</CardTitle>
            <CardDescription>
              Nowhere. vespera runs local models via Ollama on your own
              machine. There is no cloud upload, no third-party AI provider,
              and no telemetry on your documents — confidential deal material
              never leaves your laptop.
            </CardDescription>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Can you integrate it into our firm&apos;s workflow?</CardTitle>
            <CardDescription>
              Yes. Daniel Molloy Ltd — the consultancy behind Vespera — does
              integration and advisory work for investment firms, from wiring
              vespera into your deal process to full technical due-diligence
              engagements. Start at{' '}
              <a
                href="https://danielmolloy.com"
                className="font-medium underline"
              >
                danielmolloy.com
              </a>
              .
            </CardDescription>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>What is the Strategy Lab?</CardTitle>
            <CardDescription>
              An open side project of the studio: algorithmic trading
              experiments published with their method, runnable notebooks, and
              backtests. It is research in the open, not a product — nothing in
              the lab is investment advice.
            </CardDescription>
          </CardHeader>
        </Card>

        <div className="text-center mt-12">
          <h2 className="text-2xl font-bold mb-4">Still have questions?</h2>
          <p className="text-muted-foreground mb-4">
            Get in touch and we&apos;ll help you get set up — or point you at
            the right person for integration work.
          </p>
          <a
            href="mailto:hello@vespera.systems"
            className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
          >
            Contact us
          </a>
        </div>
      </div>
    </div>
  );
}
