"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function VerifyRequestPage() {
  const router = useRouter();

  return (
    <div className="container flex items-center justify-center min-h-[calc(100vh-8rem)]">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Check Your Email</CardTitle>
          <CardDescription>
            A verification link has been sent to your email address.
            Please check your inbox and click the link to verify your account.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <p className="text-sm text-muted-foreground">
            If you don't see the email in your inbox, please check your spam folder.
          </p>
          <Button
            variant="outline"
            onClick={() => router.push("/auth/signin")}
          >
            Return to Sign In
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}