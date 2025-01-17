import { TriangleAlert } from "lucide-react";

export default function ErrState({
  message = "Failed to load content...",
}: {
  message?: string;
}) {
  return (
    <div className="h-[calc(100vh-200px)] col-span-3 w-full flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <TriangleAlert
          className="animate-pulse text-red mx-auto mb-4"
          size={48}
        />
        <p className="text-gray-600">{message}</p>
      </div>
    </div>
  );
}
