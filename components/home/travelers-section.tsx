"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, ArrowRight } from "lucide-react";
import { formatDate, formatDuration } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Traveler {
  id: string;
  name: string;
  image: string;
  departure: string;
  arrival: string;
  departureTime: string;
  arrivalTime: string;
  price: number;
  rating: string;
  completedDeliveries: number;
}

interface TravelersSectionProps {
  initialTravelers: Traveler[];
}

export function TravelersSection({ initialTravelers }: TravelersSectionProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDestination, setSelectedDestination] = useState<string | null>(null);
  const [travelers] = useState(initialTravelers);

  // Get unique destinations
  const destinations = Array.from(
    new Set(travelers.flatMap((t) => [t.departure, t.arrival]))
  ).sort();

  const filteredTravelers = travelers.filter((traveler) => {
    const searchLower = searchTerm.toLowerCase();
    const matchesSearch =
      traveler.departure.toLowerCase().includes(searchLower) ||
      traveler.arrival.toLowerCase().includes(searchLower) ||
      traveler.name.toLowerCase().includes(searchLower);

    const matchesDestination = !selectedDestination || 
      traveler.departure === selectedDestination ||
      traveler.arrival === selectedDestination;

    return matchesSearch && matchesDestination;
  });

  return (
    <section className="py-12">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <h2 className="text-3xl font-bold mb-4 md:mb-0">Available Travelers</h2>
        <div className="flex w-full md:w-auto gap-4 flex-col sm:flex-row">
          <div className="relative flex-1 sm:w-72">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search by city or name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>
          <Select
            value={selectedDestination || undefined}
            onValueChange={setSelectedDestination}
          >
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Filter by city" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All cities</SelectItem>
              {destinations.map((city) => (
                <SelectItem key={city} value={city}>
                  {city}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredTravelers.map((traveler) => (
          <Card key={traveler.id} className="flex flex-col hover:shadow-lg transition-shadow">
            <CardHeader className="flex-none">
              <div className="flex items-center gap-4">
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
              </div>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col justify-between">
              <div className="space-y-6">
                <div className="flex items-center justify-between space-x-4">
                  <div className="min-w-0">
                    <div className="font-medium truncate">{traveler.departure}</div>
                    <div className="text-sm text-muted-foreground">
                      {formatDate(traveler.departureTime)}
                    </div>
                  </div>
                  <ArrowRight className="h-4 w-4 flex-none text-muted-foreground" />
                  <div className="min-w-0 text-right">
                    <div className="font-medium truncate">{traveler.arrival}</div>
                    <div className="text-sm text-muted-foreground">
                      {formatDate(traveler.arrivalTime)}
                    </div>
                  </div>
                </div>
                <div className="flex justify-between items-center pt-2 border-t">
                  <div className="text-sm text-muted-foreground">
                    {formatDuration(traveler.departureTime, traveler.arrivalTime)}
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
    </section>
  );
}