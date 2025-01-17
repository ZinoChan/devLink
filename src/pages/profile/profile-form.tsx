import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import ImageUpload from "@/components/image-uploader";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { ProfileInput, profileSchema } from "@/validation/profile.schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePreviewStore, UserType } from "@/lib/zustand";
import { gql, useMutation } from "@apollo/client";
import { UPDATE_USER_PROFILE } from "@/gql/users";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { debounce } from "@/lib/utils";

export default function ProfileForm() {
  const { user, updateUser } = usePreviewStore();
  const [updateProfile, { loading: isUpdating, error: updateError }] =
    useMutation(UPDATE_USER_PROFILE, {
      onCompleted: (data) => {
        if (data.update_users_by_pk) {
          updateUser(data.update_users_by_pk);
        }
        toast.success("Profile updated successfully!");
      },
      update: (cache, { data }) => {
        if (!data?.update_users_by_pk) return;
        cache.modify({
          fields: {
            users() {
              cache.writeFragment({
                data: data.update_users_by_pk,
                fragment: gql`
                  fragment UpdateUser on users {
                    id
                    first_name
                    last_name
                    email
                    profile_picture_url
                  }
                `,
              });
            },
          },
        });
      },
    });

  const form = useForm<ProfileInput>({
    resolver: zodResolver(profileSchema),
    values: {
      id: user.id,
      first_name: user.first_name || "",
      last_name: user.last_name || "",
      email: user.email || "",
      profile_picture_url: user.profile_picture_url || "",
    },
  });

  const onSubmit = (values: ProfileInput) => {
    updateProfile({
      variables: {
        id: user?.id,
        first_name: values.first_name,
        last_name: values.last_name,
        email: values.email,
        profile_picture_url: values.profile_picture_url,
      },
    });
  };
  useEffect(() => {
    const debouncedUpdateUser = debounce((value: UserType) => {
      if (value) {
        updateUser(value);
      }
    }, 300);

    const subscription = form.watch((value) => {
      debouncedUpdateUser(value);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [updateUser, form]);
  return (
    <div className="bg-white rounded-lg sm:p-8 p-4 relative col-span-2 md:pt-10">
      {updateError && (
        <div className="bg-red-100 p-3 border-red-500 rounded-sm mb-4">
          <p className="text-red-500">{updateError.message}</p>
        </div>
      )}
      <div className="mb-6">
        <h3 className="text-xl font-semibold">Profile Details</h3>
        <p className="text-sm text-gray-500">
          Add your details to create a personal touch to your profile.
        </p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="bg-grey-light rounded-md p-4 mb-4 sm:flex-row flex-col sm:space-y-0 space-y-4 flex items-center justify-between">
            <Label className="text-grey">Profile picture</Label>

            <FormField
              control={form.control}
              name="profile_picture_url"
              render={() => <ImageUpload name="profile_picture_url" />}
            />
            <p className="text-grey text-xs max-w-48">
              Image must be below 1024x1024px. Use PNG or JPG format.
            </p>
          </div>
          <div className="bg-grey-light rounded-md p-4">
            <FormField
              control={form.control}
              name="first_name"
              render={({ field }) => (
                <FormItem className="sm:grid grid-cols-2 gap-12 items-center justify-between">
                  <FormLabel>First name*</FormLabel>
                  <div>
                    <FormControl>
                      <Input placeholder="e.g. John" {...field} />
                    </FormControl>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="last_name"
              render={({ field }) => (
                <FormItem className="sm:grid grid-cols-2 gap-12 items-center justify-between">
                  <FormLabel>Last name*</FormLabel>
                  <div>
                    <FormControl>
                      <Input placeholder="e.g. Applesseed" {...field} />
                    </FormControl>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="sm:grid grid-cols-2 gap-12 items-center justify-between">
                  <FormLabel>Email*</FormLabel>
                  <div>
                    <FormControl>
                      <Input placeholder="e.g. email@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
          </div>

          <footer className="text-right min-w-32 mt-4 border-t border-t-borders p-4 w-full lg:py-6 lg:px-10">
            <Button type="submit" disabled={isUpdating}>
              {isUpdating ? "Saving..." : "Save"}
            </Button>
          </footer>
        </form>
      </Form>
    </div>
  );
}
