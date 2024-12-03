import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { db } from "@/lib/db";
import { authConfig } from "@/app/api/auth/[...nextauth]/auth.config";

export async function GET() {
  try {
    const session = await getServerSession(authConfig);
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const transactions = await db.deliveryRequest.findMany({
      where: {
        OR: [
          { senderId: session.user.id },
          { travelerId: session.user.id }
        ]
      },
      orderBy: {
        createdAt: 'desc'
      },
      select: {
        id: true,
        createdAt: true,
        price: true,
        status: true,
        travel: {
          select: {
            departure: true,
            arrival: true
          }
        }
      }
    });

    const formattedTransactions = transactions.map(t => ({
      id: t.id,
      date: t.createdAt.toISOString(),
      description: `Delivery from ${t.travel.departure} to ${t.travel.arrival}`,
      amount: t.price,
      status: t.status.toLowerCase()
    }));

    return NextResponse.json(formattedTransactions);
  } catch (error) {
    console.error("[transactions]", error);
    return NextResponse.json(
      { error: "Failed to fetch transactions" },
      { status: 500 }
    );
  }
}