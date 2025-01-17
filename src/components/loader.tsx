import { LoaderCircle } from "lucide-react";

export default function Loader({
  message = "loading...",
}: {
  message?: string;
}) {
  return (
    <div className="h-[calc(100vh-200px)] col-span-3 flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <LoaderCircle
          className="animate-spin text-purple mx-auto mb-4"
          size={48}
        />
        <p className="text-gray-600">{message}</p>
      </div>
    </div>
  );
}
