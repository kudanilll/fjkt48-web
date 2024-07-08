"use client";
import Loader from "@/components/ui/loader";

export default function Loading() {
  return (
    <div
      aria-label="loading"
      className="flex items-center justify-center min-h-screen p-4">
      <Loader />
    </div>
  );
}
