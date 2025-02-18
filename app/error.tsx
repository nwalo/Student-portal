// app/error.tsx
"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const ErrorPage = ({ error, reset }: { error: Error; reset: () => void }) => {
  const router = useRouter();

  useEffect(() => {
    // Optionally log the error to an error tracking service (e.g., Sentry)
    console.error("An error occurred:", error);
    toast.error("An error occurred:" + String(error));
  }, [error]);

  return (
    <div className="h-full flex flex-col justify-center items-center">
      <h1>Something went wrong!</h1>
      <p>{error.message || "An unknown error occurred."}</p>
      <div className="flex gap-3 justify-center my-10">
        <Button onClick={() => reset()}>Try again</Button>
        <Button onClick={() => router.push("/")}>Go to Home</Button>
      </div>
    </div>
  );
};

export default ErrorPage;
