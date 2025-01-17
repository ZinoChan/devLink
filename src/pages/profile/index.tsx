import PhonePreview from "@/components/phone-preview";
import { useQuery } from "@apollo/client";
import { QueryResult } from "@/components/query-results";
import ProfileForm from "./profile-form";
import { usePreviewStore } from "@/lib/zustand";
import { GET_USER_LINKS } from "@/gql/links";
import Loader from "@/components/loader";
import ErrState from "@/components/error";

const ProfileDetails = () => {
  const { updateLinks, updateUser } = usePreviewStore();
  const { data, loading, error } = useQuery(GET_USER_LINKS, {
    onCompleted: (data) => {
      updateLinks(data.links);
      updateUser(data.users[0]);
    },
  });

  return (
    <QueryResult
      data={data}
      loading={loading}
      error={error}
      LoaderComponent={<Loader message="Getting your data..." />}
      ErrComponent={<ErrState message="Failed to get your data" />}
    >
      <section className=" lg:grid grid-cols-3 gap-6">
        <PhonePreview />
        <ProfileForm />
      </section>
    </QueryResult>
  );
};

export default ProfileDetails;
