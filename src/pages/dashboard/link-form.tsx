import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { LinksSchema, LinksValues } from "@/validation/link.schema";
import { platforms } from "@/constants/data";
import { useMutation, useQuery } from "@apollo/client";
import {
  GET_USER_LINKS,
  INSERT_AND_DELETE_LINKS,
  UPDATE_LINK,
} from "@/graphql/links";
import toast from "react-hot-toast";
import { useEffect } from "react";
import { categorizeLink } from "@/helpers/categorizedLinks";
import { AlertCircle, Loader2 } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { usePreviewStore } from "@/lib/zustand";
import { Icons } from "@/components/icons";
import { PlatformLink } from "@/types/links.types";

export default function LinkForm() {
  const updateStoreLinks = usePreviewStore((state) => state.updateLinks);
  const {
    data,
    loading: queryLoading,
    error: queryError,
  } = useQuery(GET_USER_LINKS, {
    onError: (error) => {
      toast.error("Failed to load your links. Please refresh the page.");
      console.error("Error fetching links:", error);
    },
  });

  const [
    insertAndDeleteLinks,
    { loading: mutationLoading, error: mutationError },
  ] = useMutation(INSERT_AND_DELETE_LINKS, {
    onError: (error) => {
      console.error("Mutation error:", error);
      toast.error("Failed to save links. Please try again.");
    },
    onCompleted: () => {
      toast.success("Links saved successfully!");
    },
    refetchQueries: [{ query: GET_USER_LINKS }],
  });

  const [updateLink, { loading: updateLoading, error: updateError }] =
    useMutation(UPDATE_LINK, {
      onError: (error) => {
        console.error("Update mutation error:", error);
        toast.error("Failed to update links. Please try again.");
      },
      onCompleted: () => {
        toast.success("Links updated successfully!");
      },
      refetchQueries: [{ query: GET_USER_LINKS }],
    });

  const form = useForm<LinksValues>({
    resolver: zodResolver(LinksSchema),
    defaultValues: {
      links: data?.links || [],
    },
  });

  useEffect(() => {
    const subscription = form.watch((value) => {
      if (value.links) {
        updateStoreLinks(
          value.links.filter((link) => link !== undefined) as PlatformLink[]
        );
      }
    });

    return () => subscription.unsubscribe();
  }, [updateStoreLinks, form]);

  useEffect(() => {
    if (data?.links) {
      form.reset(
        {
          links: data.links,
        },
        { keepDefaultValues: true }
      );
    }
  }, [data, form]);

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "links",
    keyName: "customId",
  });

  const onSubmit = async (values: LinksValues) => {
    try {
      const { newLinks, updatedLinks, deletedLinks } = categorizeLink(
        values.links ?? [],
        data?.links ?? []
      );
      if (
        newLinks.length === 0 &&
        updatedLinks.length === 0 &&
        deletedLinks.length === 0
      )
        return;
      const insertAndDeleteMutation = insertAndDeleteLinks({
        variables: {
          insertObjects: newLinks.map((link, index) => ({
            ...link,
            display_order: index,
          })),
          deleteIds: deletedLinks,
        },
      });

      const updateMutations = updatedLinks.map((link) =>
        updateLink({
          variables: {
            id: link.id,
            data: {
              platform: link.platform,
              url: link.url,
              display_order: link.display_order,
            },
          },
        })
      );
      await Promise.all([insertAndDeleteMutation, ...updateMutations]);
    } catch (error) {
      console.log("Error inserting links:", error);
    }
  };

  if (queryLoading) {
    return (
      <div
        className="flex items-center justify-center min-h-[400px]"
        role="status"
        aria-label="Loading links"
      >
        <Loader2 className="h-8 w-8 animate-spin text-purple" />
        <span className="sr-only">Loading links...</span>
      </div>
    );
  }

  if (queryError) {
    return (
      <Alert variant="destructive" role="alert">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          Failed to load your links. Please refresh the page or try again later.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="bg-white rounded-lg pt-6 relative col-span-2 md:pt-10">
      <div className="mb-10 px-6 md:px-10">
        <h1 className="font-bold text-2xl text-dark-grey mb-2 md:text-[32px] leading-[1.5]">
          Customize your links
        </h1>
        <p className="text-grey">
          Add/edit/remove links below and then share all your profiles with the
          world!
        </p>
      </div>

      <div className="px-6 md:px-10">
        <Button
          type="button"
          variant="outline"
          className="w-full font-semibold text-purple border border-purple h-[46px]"
          onClick={() => append({ platform: "github", url: "" })}
        >
          + Add new link
        </Button>
      </div>

      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid grid-rows-[auto,1fr,auto] lg:block lg:overflow-y-auto"
      >
        {fields.length > 0 ? (
          <div className="px-6 space-y-4 mt-6 md:px-10">
            {fields.map((field, index) => (
              <div
                key={field.customId}
                className="bg-grey-light rounded-md p-4 space-y-3"
              >
                <div className="flex justify-between items-center">
                  <h3 className="font-bold text-grey">Link #{index + 1}</h3>
                  <Button
                    type="button"
                    variant="ghost"
                    className="text-grey hover:text-red-500"
                    onClick={() => remove(index)}
                  >
                    Remove
                  </Button>
                </div>

                <Select
                  defaultValue={form.watch(`links.${index}.platform`)}
                  onValueChange={(value: keyof typeof Icons) =>
                    form.setValue(`links.${index}.platform`, value)
                  }
                >
                  <SelectTrigger className="bg-white h-12">
                    <SelectValue placeholder="Select platform" />
                  </SelectTrigger>
                  <SelectContent>
                    {platforms.map((platform) => (
                      <SelectItem key={platform} value={platform}>
                        {platform}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {form.formState.errors.links?.[index]?.platform && (
                  <p className="text-red-500 text-sm">
                    {form.formState.errors.links[index]?.platform?.message}
                  </p>
                )}

                <Input
                  placeholder="e.g. https://www.github.com/johnappleseed"
                  {...form.register(`links.${index}.url`)}
                  className="bg-white h-12 focus:shadow-purple-glow"
                />
                {form.formState.errors.links?.[index]?.url && (
                  <p className="text-red-500 text-sm">
                    {form.formState.errors.links[index]?.url?.message}
                  </p>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="px-6 mt-6 text-center mb-6 md:px-10 md:mb-0">
            <div className="bg-light-grey rounded-lg py-[46px] px-5 md:py-20 lg:py-16">
              <div>
                <h2 className="mb-6 font-bold text-dark-grey text-2xl md:text-[32px]">
                  Let's get you started
                </h2>
                <p className="text-grey max-w-[488px] mx-auto">
                  Use the "Add new link" button to get started. Once you have
                  more than one link, you can reorder and edit them. We're here
                  to help you share your profiles with everyone!
                </p>
              </div>
            </div>
          </div>
        )}
        {(mutationError || updateError) && (
          <Alert
            variant="destructive"
            className="mx-6 md:mx-10 mt-4"
            role="alert"
          >
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Failed to save your changes. Please try again.
            </AlertDescription>
          </Alert>
        )}
        <footer className="text-right min-w-32 mt-4 border-t border-t-borders p-4 w-full lg:py-6 lg:px-10">
          <Button type="submit" disabled={mutationLoading || updateLoading}>
            {mutationLoading || updateLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              "Save"
            )}
          </Button>
        </footer>
      </form>
    </div>
  );
}
