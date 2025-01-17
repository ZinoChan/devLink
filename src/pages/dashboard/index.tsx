import PhonePreview from "@/components/phone-preview";
import LinkForm from "./link-form";
import { useLinksData } from "@/hooks/useLinksData";
import { QueryResult } from "@/components/query-results";
import { Links } from "@/__generated__/graphql";

export default function Dashboard() {
  const { data, loading, error } = useLinksData();

  return (
    <section className="items-start lg:grid grid-cols-3 gap-6">
      <QueryResult
        loading={loading}
        error={error}
        LoaderComponent={<p>Loading...</p>}
        ErrComponent={<p>Error...</p>}
        data={data}
      >
        <PhonePreview />
        <LinkForm serverLinks={(data?.links as Links[]) || []} />
      </QueryResult>
    </section>
  );
}
