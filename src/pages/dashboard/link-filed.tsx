import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { platforms } from "@/constants/data";
import { SocialPlatform } from "@/enums/social-platform.enum";
import { usePreviewStore } from "@/lib/zustand";
import { LinksValues } from "@/validation/link.schema";
import { UseFormReturn } from "react-hook-form";

interface LinkFieldProps {
  index: number;
  form: UseFormReturn<LinksValues>;
  onRemove: () => void;
}

export function LinkField({ index, form, onRemove }: LinkFieldProps) {
  const { updateLinks: updateStoreLinks } = usePreviewStore();

  const handlePlatformChange = (value: SocialPlatform) => {
    form.setValue(`links.${index}.platform`, value, {
      shouldValidate: true,
    });

    const currentLinks = form.getValues("links");
    if (currentLinks) {
      updateStoreLinks(
        currentLinks.map((link, i) => ({
          ...link,
          display_order: i,
        }))
      );
    }
  };

  return (
    <div className="bg-grey-light rounded-md p-4 space-y-3">
      <div className="flex justify-between items-center">
        <h3 className="font-bold text-grey">Link #{index + 1}</h3>
        <Button
          type="button"
          variant="ghost"
          className="text-grey hover:text-red-500"
          onClick={onRemove}
        >
          Remove
        </Button>
      </div>

      <Select
        defaultValue={form.watch(`links.${index}.platform`)}
        onValueChange={handlePlatformChange}
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
  );
}
