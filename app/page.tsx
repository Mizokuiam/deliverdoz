import { Suspense } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { TravelersSection } from "@/components/home/travelers-section";
import { generateTravelers } from "@/lib/data/travelers";

export default function Home() {
  const travelers = generateTravelers();

  return (
    <div className="container mx-auto px-4">
      <section className="text-center py-16">
        <h1 className="text-4xl font-bold tracking-tight sm:text-6xl mb-6">
          Secure Document Delivery Made Simple
        </h1>
        <p className="text-xl text-muted-foreground mb-8">
          Connect with travelers and send your documents safely across destinations
        </p>
        <div className="flex justify-center gap-4">
          <Button asChild size="lg">
            <Link href="/send">Send a Document</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/travel">Become a Traveler</Link>
          </Button>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 py-12 border-y">
        <div className="text-center">
          <h3 className="text-lg font-semibold mb-2">Secure Delivery</h3>
          <p className="text-muted-foreground">
            Your documents are handled with utmost care and security
          </p>
        </div>
        <div className="text-center">
          <h3 className="text-lg font-semibold mb-2">Global Network</h3>
          <p className="text-muted-foreground">
            Connect with travelers worldwide for efficient delivery
          </p>
        </div>
        <div className="text-center">
          <h3 className="text-lg font-semibold mb-2">Affordable Rates</h3>
          <p className="text-muted-foreground">
            Competitive pricing based on distance and duration
          </p>
        </div>
      </section>

      <Suspense fallback={<div>Loading travelers...</div>}>
        <TravelersSection initialTravelers={travelers} />
      </Suspense>
    </div>
  );
}