export default function Footer() {
  return (
    <footer className="border-t">
      <div className="container py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">About DeliverDoz</h3>
            <p className="text-sm text-muted-foreground">
              Connecting senders with travelers for secure document delivery across destinations.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Policies</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Full refund for uncollected packages</li>
              <li>50% refund for sender cancellations</li>
              <li>Service fees: 2.5-5% based on trip duration</li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Email: support@deliverdoz.com</li>
              <li>Phone: +1 (555) 123-4567</li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} DeliverDoz. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}