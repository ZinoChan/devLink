import { PhoneIllustration } from "./phone-illu";
import { LinkPreview } from "./link-preview";
import { usePreviewStore } from "@/lib/zustand";
import { SocialPlatform } from "@/enums/social-platform.enum";
export default function PhonePreview() {
  const { user, links } = usePreviewStore();
  const { first_name, last_name, email, profile_picture_url } = user;

  return (
    <div className="bg-white sticky top-2 p-6 rounded-md shadow-sm hidden lg:flex  items-center justify-center">
      <div className="w-max relative">
        <PhoneIllustration />
        <div className="absolute w-9/12 top-16 left-1/2 -translate-x-1/2">
          <div className="bg-grey-light w-24 h-24 mx-auto rounded-full p-1">
            {profile_picture_url && (
              <img
                className="w-24 h-24 rounded-full border-2 border-purple"
                src={profile_picture_url || "/images/default-profile.jpg"}
                alt={`${first_name} ${last_name}`}
              />
            )}
          </div>
          <div className="text-center mt-4 mb-8">
            {first_name || last_name ? (
              <h2 className="text-lg font-bold">
                {first_name} {last_name}
              </h2>
            ) : (
              <div className="bg-grey-light mx-auto rounded w-24 h-4 mb-4" />
            )}
            {email ? (
              <p className="text-sm text-grey">{email}</p>
            ) : (
              <div className="w-32 h-4 mx-auto bg-grey-light rounded" />
            )}
          </div>
          <div className="flex flex-col">
            {links
              ?.slice(0, 5)
              .map(({ platform, url }, idx) => (
                <LinkPreview
                  key={`${url}-${platform}-${idx}`}
                  platform={platform as SocialPlatform}
                />
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
