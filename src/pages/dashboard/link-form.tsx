import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { LinksSchema, LinksValues } from "@/validation/link.schema";
import { useEffect } from "react";
import { categorizeLink } from "@/helpers/categorizedLinks";
import { Loader2 } from "lucide-react";
import { usePreviewStore } from "@/lib/zustand";
import { PlatformLink } from "@/types/links.types";
import FormSkeleton from "./form-skeleton";
import { useLinksData } from "@/hooks/useLinksData";
import { LinkFormHeader } from "./link-form-header";
import { LinkField } from "./link-filed";
import { EmptyLinksState } from "./empty-links-state";
import LinkErrAlert from "./link-err-alert";

export default function LinkForm() {
  const {
    data,
    queryLoading,
    queryError,
    insertLinks,
    deleteLinks,
    updateLinks,
    loading,
    error,
  } = useLinksData();

  const updateStoreLinks = usePreviewStore((state) => state.updateLinks);

  const form = useForm<LinksValues>({
    resolver: zodResolver(LinksSchema),
    defaultValues: {
      links: data?.links || [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "links",
    keyName: "customId",
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
      form.reset({ links: data.links }, { keepDefaultValues: true });
    }
  }, [data, form]);

  const onSubmit = async (values: LinksValues) => {
    try {
      const { newLinks, updatedLinks, deletedLinks } = categorizeLink(
        values.links ?? [],
        data?.links ?? []
      );

      if (deletedLinks.length > 0) {
        await deleteLinks({
          variables: { ids: deletedLinks },
        });
      }
      if (newLinks.length > 0) {
        await insertLinks({
          variables: {
            links: newLinks.map((link, index) => ({
              ...link,
              display_order: index,
            })),
          },
          optimisticResponse: {
            insert_links: {
              __typename: "links-insertion-response",
              returning: newLinks.map((link, index) => ({
                id: `optimistic-${Date.now()}-${index}`,
                platform: link.platform,
                url: link.url,
                display_order: index,
              })),
            },
          },
        });
      }

      if (updatedLinks.length > 0) {
        await Promise.all(
          updatedLinks.map((link) =>
            updateLinks({
              variables: {
                id: link.id,
                data: {
                  platform: link.platform,
                  url: link.url,
                  display_order: link.display_order,
                },
              },
            })
          )
        );
      }
    } catch (error) {
      console.log("Error inserting links:", error);
    }
  };

  if (queryError) return <LinkErrAlert />;

  return (
    <div className="bg-white rounded-lg pt-6 relative col-span-2 md:pt-10">
      <LinkFormHeader />

      {queryLoading ? (
        <FormSkeleton />
      ) : (
        <>
          <div className="px-6 md:px-10 sticky top-2 z-20">
            <Button
              type="button"
              variant="outline"
              className="w-full font-semibold bg-white hover:bg-purple-light hover:text-purple text-purple border border-purple py-6 disabled:bg-grey-light disabled:cursor-not-allowed disabled:text-grey-borders disabled:border-grey-borders"
              onClick={() => append({ platform: "github", url: "" })}
              disabled={fields.length >= 5}
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
                  <LinkField
                    key={field.customId}
                    index={index}
                    form={form}
                    onRemove={() => remove(index)}
                  />
                ))}
              </div>
            ) : (
              <EmptyLinksState />
            )}

            {error && (
              <LinkErrAlert message="Failed to save your changes. Please try again." />
            )}

            <footer className="text-right min-w-32 mt-4 border-t border-t-borders p-4 w-full lg:py-6 lg:px-10">
              <Button type="submit" disabled={loading}>
                {loading ? (
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
        </>
      )}
    </div>
  );
}
