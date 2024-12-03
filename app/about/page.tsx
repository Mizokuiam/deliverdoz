import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package2, Plane, Shield, CreditCard, Clock, Globe2 } from "lucide-react";

const features = [
  {
    icon: Package2,
    title: "Secure Document Delivery",
    description: "Send important documents safely across destinations with trusted travelers."
  },
  {
    icon: Plane,
    title: "Global Network",
    description: "Connect with travelers worldwide for efficient and reliable delivery services."
  },
  {
    icon: Shield,
    title: "Verified Users",
    description: "All users undergo verification processes to ensure security and trust."
  },
  {
    icon: CreditCard,
    title: "Secure Payments",
    description: "Protected transactions with transparent pricing and refund policies."
  },
  {
    icon: Clock,
    title: "Real-time Updates",
    description: "Track your document's journey with instant status notifications."
  },
  {
    icon: Globe2,
    title: "International Coverage",
    description: "Send documents locally or internationally with competitive rates."
  }
];

const pricing = [
  {
    type: "International",
    details: [
      "10+ hours: $100",
      "7-10 hours: $80",
      "<7 hours: $60"
    ]
  },
  {
    type: "Domestic",
    details: [
      "Standard: $25",
      "<3 hours: $30"
    ]
  }
];

export default function AboutPage() {
  return (
    <div className="container py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight mb-4">About DeliverDoz</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Connecting senders with travelers to deliver documents securely and efficiently across destinations.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <Card key={index} className="border-2">
              <CardHeader>
                <Icon className="h-12 w-12 mb-4 text-primary" />
                <CardTitle>{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="space-y-12">
        <section>
          <h2 className="text-3xl font-bold text-center mb-8">Pricing</h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {pricing.map((category, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle>{category.type} Delivery</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {category.details.map((detail, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <span className="text-primary">•</span>
                        {detail}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">Service Fees & Policies</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Service Fees</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li>Short trips (&lt;6 hours): 2.5%</li>
                  <li>Long trips (&gt;6 hours): 5%</li>
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Refund Policy</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li>Full refund for uncollected packages</li>
                  <li>50% refund for sender cancellations (minus service fees)</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </div>
  );
}