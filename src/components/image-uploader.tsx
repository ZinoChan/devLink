import React, { useState } from "react";
import { FormControl, FormItem, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { useFormContext } from "react-hook-form";
import { Image, Loader2 } from "lucide-react";
import toast from "react-hot-toast";

const ImageUpload = ({ name = "profile_picture_url" }) => {
  const [loading, setLoading] = useState(false);
  const { setValue, watch } = useFormContext();
  const currentValue = watch(name) || "";

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", import.meta.env.VITE_UPLOAD_PRESET);

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Upload failed");
      }

      const data = await response.json();
      setValue(name, data.secure_url, {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true,
      });
    } catch (error) {
      toast.error("Failed to upload image");
      console.error("Error uploading image:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <FormItem className="space-y-4">
      <FormControl>
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
              id="imageInput"
            />
            <label htmlFor="imageInput">
              <Button
                type="button"
                variant="ghost"
                style={{ backgroundImage: `url(${currentValue})` }}
                className={`${currentValue ? "text-white" : "bg-purple-light text-purple"} overflow-hidden relative bg-cover w-48 hover:bg-purple/20 hover:text-purple rounded-md flex items-center justify-center h-48`}
                onClick={() => document.getElementById("imageInput")?.click()}
                disabled={loading}
              >
                {loading ? (
                  <Loader2 className="animate-spin w-4 h-4" />
                ) : (
                  <div
                    className={`absolute inset-0 flex flex-col space-y-2 items-center justify-center ${currentValue ? "bg-black/50" : ""}`}
                  >
                    <Image className="!size-8" />
                    <p className="font-semibold">+ Upload Image</p>
                  </div>
                )}
              </Button>
            </label>
          </div>
        </div>
      </FormControl>
      <FormMessage />
    </FormItem>
  );
};

export default ImageUpload;
