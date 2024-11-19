'use client';

import { Button } from "@/ui/components";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {

  useEffect(() => {
    // Optionally log the error to an error reporting service
    console.error(error);
  }, [error]);
  
  return (
    <main>
      <h2>Something went wrong!</h2>
      <Button
        label="Try again"
        onClick={
          () => reset()
        }
      />
    </main>
  )
}