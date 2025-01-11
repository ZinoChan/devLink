import PhonePreview from "@/components/phone-preview";
import LinkForm from "./link-form";

export default function Dashboard() {
  return (
    <section className="items-start lg:grid grid-cols-3 gap-6">
      <PhonePreview />
      <LinkForm />
    </section>
  );
}
