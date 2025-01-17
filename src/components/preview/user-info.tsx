import { Skeleton } from "@/components/ui/skeleton";

type UserInfoProps = {
  isLoading: boolean;
  first_name?: string;
  last_name?: string;
  email?: string;
};

export default function UserInfo({
  isLoading,
  first_name,
  last_name,
  email,
}: UserInfoProps) {
  if (isLoading) {
    return (
      <>
        <Skeleton className="w-32 h-6 mx-auto mb-2" />
        <Skeleton className="w-40 h-4 mx-auto" />
      </>
    );
  }

  return (
    <>
      {first_name || last_name ? (
        <h2 className="text-lg font-bold">
          {first_name} {last_name}
        </h2>
      ) : (
        <div className="bg-grey-light mx-auto rounded w-32 h-6 mb-2" />
      )}
      {email ? (
        <p className="text-sm text-grey">{email}</p>
      ) : (
        <div className="w-40 h-4 mx-auto bg-grey-light rounded" />
      )}
    </>
  );
}
