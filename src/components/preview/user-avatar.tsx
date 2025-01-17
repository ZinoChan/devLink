import { Skeleton } from "@/components/ui/skeleton";

type UserAvatarProps = {
  isLoading: boolean;
  profile_picture_url?: string;
  first_name?: string;
  last_name?: string;
};

export default function UserAvatar({
  isLoading,
  profile_picture_url,
  first_name,
  last_name,
}: UserAvatarProps) {
  if (isLoading) {
    return <Skeleton className="w-24 h-24 rounded-full" />;
  }

  if (profile_picture_url) {
    return (
      <img
        className="w-24 h-24 object-cover object-top rounded-full border-2 border-purple"
        src={profile_picture_url}
        alt={`${first_name} ${last_name}`}
      />
    );
  }

  return <div className="w-24 h-24 rounded-full bg-grey-light" />;
}
