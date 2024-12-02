import { addHours } from "date-fns";

const cities = {
  US: ["New York", "Los Angeles", "Chicago", "Miami", "San Francisco", "Boston", "Seattle"],
  Europe: ["London", "Paris", "Amsterdam", "Berlin", "Rome", "Madrid", "Barcelona"],
  Asia: ["Tokyo", "Singapore", "Hong Kong", "Dubai", "Seoul", "Bangkok", "Shanghai"],
};

const generateRandomPrice = (duration: number) => {
  if (duration >= 10) return 100;
  if (duration >= 7) return 80;
  return 60;
};

export const generateTravelers = () => {
  const travelers = [];
  const baseDate = new Date();
  const avatars = [
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
    "https://images.unsplash.com/photo-1527980965255-d3b416303d12",
    "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde",
    "https://images.unsplash.com/photo-1438761681033-6461ffad8d80",
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e",
  ];

  const names = [
    "Alice Johnson", "Bob Smith", "Carol White", "David Brown", "Emma Davis",
    "Frank Wilson", "Grace Lee", "Henry Chen", "Isabel Kim", "Jack Taylor",
    "Kelly Wang", "Liam Parker", "Maria Garcia", "Noah Martinez", "Olivia Anderson",
    "Peter Zhang", "Quinn Foster", "Rachel Cohen", "Sam Patel", "Tara Murphy",
    "Uma Kapoor", "Victor Nguyen", "Wendy Liu", "Xavier Rodriguez", "Yuki Tanaka",
    "Zoe Williams", "Adam Clarke", "Beth Kumar", "Chris Wong", "Diana Kim",
  ];

  for (let i = 0; i < 30; i++) {
    const departureRegion = Object.keys(cities)[Math.floor(Math.random() * 3)];
    let arrivalRegion;
    do {
      arrivalRegion = Object.keys(cities)[Math.floor(Math.random() * 3)];
    } while (arrivalRegion === departureRegion);

    const departure = cities[departureRegion as keyof typeof cities][
      Math.floor(Math.random() * cities[departureRegion as keyof typeof cities].length)
    ];
    const arrival = cities[arrivalRegion as keyof typeof cities][
      Math.floor(Math.random() * cities[arrivalRegion as keyof typeof cities].length)
    ];

    const departureTime = addHours(baseDate, Math.floor(Math.random() * 168));
    const flightDuration = Math.floor(Math.random() * 15) + 5;
    const arrivalTime = addHours(departureTime, flightDuration);

    travelers.push({
      id: `${i + 1}`,
      name: names[i],
      image: avatars[i % avatars.length],
      departure,
      arrival,
      departureTime: departureTime.toISOString(),
      arrivalTime: arrivalTime.toISOString(),
      price: generateRandomPrice(flightDuration),
      rating: (4 + Math.random()).toFixed(1),
      completedDeliveries: Math.floor(Math.random() * 50) + 5,
    });
  }

  return travelers;
};

export const TRAVELERS_DATA = generateTravelers();