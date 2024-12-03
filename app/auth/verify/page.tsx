"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

export default function VerifyPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { toast } = useToast();
  const [isVerifying, setIsVerifying] = useState(true);

  useEffect(() => {
    const verifyEmail = async () => {
      const token = searchParams?.get("token");
      
      if (!token) {
        toast({
          title: "Error",
          description: "Invalid verification link",
          variant: "destructive",
        });
        setIsVerifying(false);
        return;
      }

      try {
        const res = await fetch(`/api/auth/verify?token=${token}`);
        if (!res.ok) throw new Error("Failed to verify email");

        toast({
          title: "Success",
          description: "Email verified successfully. You can now sign in.",
        });
        
        router.push("/auth/signin");
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to verify email. Please try again.",
          variant: "destructive",
        });
        setIsVerifying(false);
      }
    };

    verifyEmail();
  }, [searchParams, router, toast]);

  if (isVerifying) {
    return (
      <div className="container flex items-center justify-center min-h-[calc(100vh-8rem)]">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Verifying Email</CardTitle>
            <CardDescription>
              Please wait while we verify your email address...
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  return (
    <div className="container flex items-center justify-center min-h-[calc(100vh-8rem)]">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-destructive">Verification Failed</CardTitle>
          <CardDescription>
            The verification link is invalid or has expired.
            Please request a new verification link.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button
            className="w-full"
            onClick={() => router.push("/auth/signin")}
          >
            Return to Sign In
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}