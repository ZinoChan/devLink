import { useQuery } from "@apollo/client";
import { QueryResult } from "@/components/query-results";
import ProfileForm from "./profile-form";
import { GET_USER_LINKS } from "@/gql/links";
import Loader from "@/components/loader";
import ErrState from "@/components/error";
import FormLayout from "@/components/form-layout";

const ProfileDetails = () => {
  const { data, loading, error } = useQuery(GET_USER_LINKS);

  return (
    <section className=" lg:grid grid-cols-3 gap-6">
      <QueryResult
        data={data}
        loading={loading}
        error={error}
        LoaderComponent={<Loader message="Getting your data..." />}
        ErrComponent={<ErrState message="Failed to get your data" />}
      >
        <FormLayout links={data?.links || []} profile={data?.users[0]}>
          <ProfileForm />
        </FormLayout>
      </QueryResult>
    </section>
  );
};

export default ProfileDetails;
