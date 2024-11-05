"use client";

import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Github, Google } from "lucide-react";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-background/80">
      <Card className="w-full max-w-md p-8 space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold">Welcome Back</h1>
          <p className="text-muted-foreground">
            Sign in to continue your adventure
          </p>
        </div>

        <div className="space-y-4">
          <Button
            variant="outline"
            className="w-full"
            onClick={() => signIn("github", { callbackUrl: "/" })}
          >
            <Github className="mr-2 h-4 w-4" />
            Continue with GitHub
          </Button>
          <Button
            variant="outline"
            className="w-full"
            onClick={() => signIn("google", { callbackUrl: "/" })}
          >
            <Google className="mr-2 h-4 w-4" />
            Continue with Google
          </Button>
        </div>
      </Card>
    </div>
  );
}