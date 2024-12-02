"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { TRAVELERS_DATA } from "@/lib/data/travelers";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { formatDate, formatDuration } from "@/lib/utils";

export default function TravelPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [travelers] = useState(TRAVELERS_DATA);

  const filteredTravelers = travelers.filter((traveler) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      traveler.departure.toLowerCase().includes(searchLower) ||
      traveler.arrival.toLowerCase().includes(searchLower) ||
      traveler.name.toLowerCase().includes(searchLower)
    );
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <h1 className="text-3xl font-bold mb-4 md:mb-0">Available Travelers</h1>
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search by city or name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredTravelers.map((traveler) => (
          <Card key={traveler.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center gap-4">
              <Avatar className="h-12 w-12">
                <AvatarImage src={traveler.image} alt={traveler.name} />
                <AvatarFallback>{traveler.name[0]}</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-lg">{traveler.name}</CardTitle>
                <div className="text-sm text-muted-foreground">
                  ⭐ {traveler.rating} • {traveler.completedDeliveries} deliveries
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between text-sm">
                  <div>
                    <div className="font-medium">{traveler.departure}</div>
                    <div className="text-muted-foreground">
                      {formatDate(traveler.departureTime)}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">{traveler.arrival}</div>
                    <div className="text-muted-foreground">
                      {formatDate(traveler.arrivalTime)}
                    </div>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <div className="text-sm text-muted-foreground">
                    Duration: {formatDuration(traveler.departureTime, traveler.arrivalTime)}
                  </div>
                  <div className="font-semibold">${traveler.price}</div>
                </div>
                <Button className="w-full">Request Delivery</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredTravelers.length === 0 && (
        <div className="text-center py-12">
          <p className="text-lg text-muted-foreground">No travelers found matching your search.</p>
        </div>
      )}
    </div>
  );
}