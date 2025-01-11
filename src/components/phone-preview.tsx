import { PhoneIllustration } from "./phone-illu";
import { LinkPreview } from "./link-preview";
import { usePreviewStore } from "@/lib/zustand";
import { useShallow } from "zustand/shallow";
import { useQuery } from "@apollo/client";
import { Skeleton } from "./ui/skeleton";
import { GET_USER_LINKS } from "@/graphql/links";

export default function PhonePreview() {
  const { loading } = useQuery(GET_USER_LINKS, {
    onCompleted: (data) => {
      usePreviewStore.setState({ user: data.users[0] });
      usePreviewStore.setState({ links: data.links });
    },
  });
  const { user } = usePreviewStore(
    useShallow((state) => ({ user: state.user }))
  );

  const { links } = usePreviewStore((state) => state);

  const { first_name, last_name, email, profile_picture_url } = user;

  return (
    <div className="bg-white sticky top-2 p-6 rounded-md shadow-sm hidden lg:flex  items-center justify-center">
      <div className="w-max relative">
        <PhoneIllustration />
        <div className="absolute w-9/12 top-16 left-1/2 -translate-x-1/2">
          <div className="bg-grey-light w-24 h-24 mx-auto rounded-full p-1">
            {loading && <Skeleton className="w-24 h-24 rounded-full" />}
            {!loading && profile_picture_url && (
              <img
                className="w-24 h-24 rounded-full border-2 border-purple"
                src={profile_picture_url || "/images/default-profile.jpg"}
                alt={`${first_name} ${last_name}`}
              />
            )}
          </div>
          <div className="text-center mt-4 mb-8">
            {!loading ? (
              first_name || last_name ? (
                <h2 className="text-lg font-bold">
                  {first_name} {last_name}
                </h2>
              ) : (
                <div className="bg-grey-light mx-auto rounded w-24 h-4 mb-4" />
              )
            ) : (
              <Skeleton className="w-24 mx-auto h-4 mb-2" />
            )}
            {!loading ? (
              email ? (
                <p className="text-sm text-grey">{email}</p>
              ) : (
                <div className="w-32 h-4 mx-auto bg-grey-light rounded" />
              )
            ) : (
              <Skeleton className="w-32 mx-auto h-4" />
            )}
          </div>
          <div className="flex flex-col">
            {links
              ?.slice(0, 5)
              .map(({ platform }) => (
                <LinkPreview key={platform} platform={platform} />
              ))}
            {(links?.length === 0 || links.length < 2) &&
              [...Array(2)].map((_, idx) => (
                <div
                  key={`placeholder-${idx}`}
                  className="w-full h-12 bg-grey-light rounded-md mt-4"
                />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
