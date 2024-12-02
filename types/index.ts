export type UserRole = 'SENDER' | 'TRAVELER';

export interface User {
  id: string;
  name: string;
  email: string;
  image?: string;
  role: UserRole;
}

export interface TravelDetails {
  id: string;
  userId: string;
  departure: string;
  arrival: string;
  departureTime: Date;
  arrivalTime: Date;
  price: number;
}

export interface DeliveryRequest {
  id: string;
  senderId: string;
  travelerId: string;
  status: 'PENDING' | 'ACCEPTED' | 'REJECTED' | 'COMPLETED';
  documentImage: string;
  price: number;
  createdAt: Date;
}