import { ProfileInput } from "@/validation/profile.schema";
import { LinksInput } from "@/validation/link.schema";
import PreviewComponent from "./preview";

type PhonePreviewProps = {
  user: ProfileInput;
  links: LinksInput[];
};

export default function PhonePreview({ user, links }: PhonePreviewProps) {
  return <PreviewComponent user={user} links={links} variant="phone" />;
}
