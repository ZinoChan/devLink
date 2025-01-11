import { Skeleton } from "@/components/ui/skeleton";

export default function FormSkeleton() {
  return (
    <div className="px-6">
      <Skeleton className="w-full h-12 mb-4 rounded-md" />
      <Skeleton className="w-full h-44 mb-4 rounded-md" />
      <Skeleton className="w-full h-44 mb-4 rounded-md" />
    </div>
  );
}
