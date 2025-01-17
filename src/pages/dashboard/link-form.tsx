import { useFieldArray, useFormContext } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { LinksValues } from "@/validation/link.schema";
import { categorizeLink } from "@/helpers/categorizedLinks";
import { LinkFormHeader } from "./link-form-header";
import { LinkField } from "./link-filed";
import { EmptyLinksState } from "./empty-links-state";
import { useLinkMutations } from "@/hooks/useLinkMutations";
import { Loader2 } from "lucide-react";
import { SocialPlatform } from "@/enums/social-platform.enum";
import { Links } from "@/__generated__/graphql";
import { UserData } from "@/validation/user.schema";

export default function LinkForm({ serverLinks }: { serverLinks: Links[] }) {
  const { insertLinks, deleteLinks, updateLinks, loading } = useLinkMutations();
  const methods = useFormContext<UserData>();

  const { fields, append, remove } = useFieldArray({
    control: methods.control,
    name: "links",
    keyName: "customId",
  });

  const onSubmit = async (values: LinksValues) => {
    try {
      const { newLinks, updatedLinks, deletedLinks } = categorizeLink(
        values.links ?? [],
        serverLinks
      );

      if (newLinks.length > 0) {
        await insertLinks({
          variables: {
            links: newLinks.map((link, index) => ({
              ...link,
              display_order: index,
            })),
          },
        });
      }

      if (deletedLinks.length > 0) {
        await deleteLinks({
          variables: { linkIds: deletedLinks },
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
      console.error("Failed to save links:", error);
    }
  };

  return (
    <div className="bg-white rounded-lg pt-6 relative col-span-2 md:pt-10">
      <LinkFormHeader />

      <div className="px-6 md:px-10 sticky top-2 z-20">
        <Button
          type="button"
          variant="outline"
          className="w-full font-semibold bg-white hover:bg-purple-light hover:text-purple text-purple border border-purple py-6 disabled:bg-grey-light disabled:cursor-not-allowed disabled:text-grey-borders disabled:border-grey-borders"
          onClick={() => append({ platform: SocialPlatform.Github, url: "" })}
          disabled={fields.length >= 5}
        >
          + Add new link
        </Button>
      </div>

      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className="grid grid-rows-[auto,1fr,auto] lg:block lg:overflow-y-auto"
      >
        {fields.length > 0 ? (
          <div className="px-6 space-y-4 mt-6 md:px-10">
            {fields.map((field, index) => (
              <LinkField
                key={field.customId}
                index={index}
                form={methods}
                onRemove={() => remove(index)}
              />
            ))}
          </div>
        ) : (
          <EmptyLinksState />
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
    </div>
  );
}
