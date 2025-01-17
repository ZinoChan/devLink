import PhonePreview from "@/components/phone-preview";
import { SocialPlatform } from "@/enums/social-platform.enum";
import { LinkType, UserType } from "@/types";
import { UserData, userDataSchema } from "@/validation/user.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";

type Props = {
  children: React.ReactNode;
  links: LinkType[];
  profile: UserType | undefined;
};

export default function FormLayout({ children, links, profile }: Props) {
  const methods = useForm<UserData>({
    resolver: zodResolver(userDataSchema),
    defaultValues: {
      profile: {
        id: profile?.id,
        first_name: profile?.first_name || "",
        last_name: profile?.last_name || "",
        email: profile?.email || "",
        profile_picture_url: profile?.profile_picture_url || "",
      },
      links: links.map((link) => ({
        platform: link.platform as SocialPlatform,
        url: link.url,
        id: link.id,
      })),
    },
  });
  return (
    <FormProvider {...methods}>
      <PhonePreview
        user={methods.watch("profile")}
        links={methods.watch("links")}
      />
      {children}
    </FormProvider>
  );
}
