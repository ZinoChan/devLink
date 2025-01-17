import { LinkType, UserType } from "@/types";
import { PhoneIllustration } from "../phone-illu";
import UserAvatar from "./user-avatar";
import UserInfo from "./user-info";
import UserLinks from "./user-links";
import { LinksInput } from "@/validation/link.schema";
import { ProfileInput } from "@/validation/profile.schema";

type PreviewComponentProps = {
  variant: "phone" | "normal";
  user: UserType | ProfileInput;
  links: LinkType[] | LinksInput[];
  isLoading?: boolean;
};

export default function PreviewComponent({
  variant = "phone",
  user,
  links,
  isLoading = false,
}: PreviewComponentProps) {
  const { first_name, last_name, email, profile_picture_url } = user;
  const containerStyles = {
    phone:
      "bg-white sticky top-2 p-6 rounded-md shadow-sm hidden lg:flex items-center justify-center",
    normal: "bg-white w-80 p-6 rounded-md mx-auto relative z-50 top-10",
  };

  const profileContainerStyles = {
    phone: "w-max relative",
    normal: "w-full",
  };

  const contentContainerStyles = {
    phone: "absolute w-9/12 top-16 left-1/2 -translate-x-1/2",
    normal: "",
  };

  return (
    <div className={containerStyles[variant]}>
      <div className={profileContainerStyles[variant]}>
        {variant === "phone" && <PhoneIllustration />}
        <div className={contentContainerStyles[variant]}>
          <div className="bg-grey-light w-24 h-24 mx-auto rounded-full p-1">
            <UserAvatar
              isLoading={isLoading}
              profile_picture_url={profile_picture_url || ""}
            />
          </div>
          <div className="text-center mt-4 mb-8">
            <UserInfo
              first_name={first_name || ""}
              last_name={last_name || ""}
              isLoading={isLoading}
              email={email}
            />
          </div>
          <div className="flex flex-col">
            <UserLinks links={links} isLoading={isLoading} />
          </div>
        </div>
      </div>
    </div>
  );
}
