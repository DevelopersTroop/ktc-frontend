"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { BiLoaderAlt } from "react-icons/bi";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { useCreateGalleryMutation } from "@/app/globalRedux/api/gallery";
import { errorMessage } from "@/lib/toast";
import { SingleImageUploader } from "@/components/shared/image-uploader";

// ✅ Validation Schema
const schema = z.object({
  name: z.string().min(1, "User name is required"),
  email: z.string().email({ message: "User email is required" }),
  title: z.string().min(1, "Title is required"),
  subtitle: z.string().optional(),
  shortDescription: z.string().optional(),
  description: z.string().optional(),
  thumbnail: z.any().optional(),
  wheelProduct: z.string().optional(),
  tireProduct: z.string().optional(),
  suspensionProduct: z.string().optional(),
  rubbing: z.boolean().default(false),
  trimming: z.boolean().default(false),
  frontWheelSpacers: z.string().optional(),
  rearWheelSpacers: z.string().optional(),
  stance: z.string().optional(),
  wheelTitle: z.string().optional(),
  wheelFront: z.string().optional(),
  wheelFrontOffset: z.string().optional(),
  wheelFrontBackspacing: z.string().optional(),
  wheelRear: z.string().optional(),
  wheelRearOffset: z.string().optional(),
  wheelRearBackspacing: z.string().optional(),
  tireTitle: z.string().optional(),
  tireFront: z.string().optional(),
  tireRear: z.string().optional(),
  suspensionBrand: z.string().optional(),
  suspension: z.string().optional(),
  wheelDiameter: z.string().optional(),
  wheelWidth: z.string().optional(),
  tireHeight: z.string().optional(),
  tireWidth: z.string().optional(),
  wheelOffset: z.string().optional(),
  typeOfStance: z.string().optional(),
  spacers: z.string().optional(),
  wheelBrand: z.string().optional(),
  wheelModel: z.string().optional(),
  tireBrand: z.string().optional(),
  tireModel: z.string().optional(),
});

type GalleryFormValues = z.infer<typeof schema>;

export default function AddGalleryForm() {
  const [loading, setLoading] = useState(false);
  const [createGallery] = useCreateGalleryMutation();

  const form = useForm<GalleryFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: "",
      rubbing: false,
      trimming: false,
    },
  });

  const { control, setValue, handleSubmit, reset, watch } = form;
  const values = watch();

  const onSubmit = async (values: GalleryFormValues) => {
    setLoading(true);
    if (!values.thumbnail) {
      setLoading(false);
      return errorMessage("Thumbnail is required");
    }

    try {
      await createGallery(values).unwrap();
      reset();
    } catch {
      errorMessage("Failed to create gallery");
    } finally {
      setLoading(false);
    }
  };

  const renderInput = (
    name: keyof GalleryFormValues,
    label: string,
    placeholder?: string
  ) => (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input placeholder={placeholder || label} {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );

  return (
    <div className="rounded-[10px] border border-stroke bg-white p-4 shadow-1 dark:border-dark-3 dark:bg-boxdark sm:p-7.5">
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Thumbnail */}
          <div className="w-40 h-40 mb-4">
            <SingleImageUploader
              title="Thumbnail"
              field="thumbnail"
              values={values}
              setFieldValue={setValue}
            />
          </div>

          <h3 className="text-lg font-semibold mb-2">User Info</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {renderInput("name", "Name")}
            {renderInput("email", "Email")}
          </div>

          {/* Basic Info */}
          <h3 className="text-lg font-semibold mb-2">Basic Info</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {renderInput("title", "Title")}
            {renderInput("subtitle", "Subtitle")}
            {renderInput("shortDescription", "Short Description")}
            {renderInput("stance", "Stance")}
            {renderInput("typeOfStance", "Type of Stance")}
          </div>

          {/* Wheels Section */}
          <h3 className="text-lg font-semibold mt-4">Wheels</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {renderInput("wheelTitle", "Wheel Title")}
            {renderInput("wheelFront", "Wheel Front")}
            {renderInput("wheelFrontOffset", "Wheel Front Offset")}
            {renderInput("wheelFrontBackspacing", "Wheel Front Backspacing")}
            {renderInput("wheelRear", "Wheel Rear")}
            {renderInput("wheelRearOffset", "Wheel Rear Offset")}
            {renderInput("wheelRearBackspacing", "Wheel Rear Backspacing")}
            {renderInput("wheelDiameter", "Wheel Diameter")}
            {renderInput("wheelWidth", "Wheel Width")}
            {renderInput("wheelOffset", "Wheel Offset")}
            {renderInput("wheelProduct", "Wheel Product")}
            {renderInput("wheelBrand", "Wheel Brand")}
            {renderInput("wheelModel", "Wheel Model")}
          </div>

          {/* Tires Section */}
          <h3 className="text-lg font-semibold mt-4">Tires</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {renderInput("tireTitle", "Tire Title")}
            {renderInput("tireFront", "Tire Front")}
            {renderInput("tireRear", "Tire Rear")}
            {renderInput("tireHeight", "Tire Height")}
            {renderInput("tireWidth", "Tire Width")}
            {renderInput("tireProduct", "Tire Product")}
            {renderInput("tireBrand", "Tire Brand")}
            {renderInput("tireModel", "Tire Model")}
          </div>

          {/* Suspension Section */}
          <h3 className="text-lg font-semibold mt-4">Suspension</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {renderInput("suspensionBrand", "Suspension Brand")}
            {renderInput("suspension", "Suspension")}
            {renderInput("suspensionProduct", "Suspension Product")}
          </div>

          {/* Spacers Section */}
          <h3 className="text-lg font-semibold mt-4">Spacers</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {renderInput(
              "frontWheelSpacers",
              "Front Wheel Spacers",
              "e.g., 10mm"
            )}
            {renderInput(
              "rearWheelSpacers",
              "Rear Wheel Spacers",
              "e.g., 15mm"
            )}
            {renderInput("spacers", "Spacers")}
          </div>

          {/* Checkboxes */}
          <h3 className="text-lg font-semibold mt-4">Options</h3>
          <div className="flex gap-10">
            <FormField
              control={control}
              name="rubbing"
              render={({ field }) => (
                <FormItem className="flex items-center space-x-2">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel>Rubbing</FormLabel>
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="trimming"
              render={({ field }) => (
                <FormItem className="flex items-center space-x-2">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel>Trimming</FormLabel>
                </FormItem>
              )}
            />
          </div>

          {/* Description */}
          <FormField
            control={control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea rows={6} placeholder="Description" {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          {/* Submit */}
          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-red-600 text-white py-2"
          >
            {loading ? (
              <BiLoaderAlt className="animate-spin text-2xl m-auto text-white" />
            ) : (
              "Add Gallery"
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
}
