import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { PropertyFormValidation } from "@/lib/validation";
import { Form, FormControl } from "../ui/form";
import CustomFormField, { FormFieldType } from "./CustomFormField";
import { SelectItem } from "../ui/select";
import "react-phone-number-input/style.css";
import { Button } from "../ui/button";
import { FileUploader } from "../ui/FileUploader";

const propertyTypeOptions = [
  { value: "apartment", label: "Apartment" },
  { value: "villa", label: "Villa" },
  { value: "house", label: "House" },
  { value: "studio", label: "Studio" },
];

const amenitiesOptions = [
  { value: "wifi", label: "WiFi" },
  { value: "parking", label: "Parking" },
  { value: "pool", label: "Swimming Pool" },
  { value: "gym", label: "Gym" },
];

const PropertyForm = () => {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof PropertyFormValidation>>({
    resolver: zodResolver(PropertyFormValidation),
    defaultValues: {
      available: false,
    },
  });

  const onSubmit = async (values: z.infer<typeof PropertyFormValidation>) => {
    setIsLoading(true);
    try {
      const formData = new FormData();

      if (values.images && values.images.length > 0) {
        values.images.forEach((file) => formData.append("images", file));
      }

      formData.append("type", values.type);
      formData.append("amenities", JSON.stringify(values.amenities));
      formData.append("price", values.price.toString());
      formData.append("bedrooms", values.bedrooms.toString());
      formData.append("bathrooms", values.bathrooms.toString());
      formData.append("available", values.available.toString());

      console.log("Form Data:", Object.fromEntries(formData));
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsLoading(false);
    }
  };

  console.log("Form Errors:", form.formState.errors);


  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex-1 space-y-12"
      >
        <section className="space-y-4">
          <p className="text-primary-light text-lg font-bold">
            Create A Rental Property here
          </p>
        </section>

        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="title"
          label="Property Name"
          placeholder="Enter property name"
        />

        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="location"
          label="Location"
          placeholder="Enter property location"
        />

        <CustomFormField
          fieldType={FormFieldType.NUMBER_INPUT}
          control={form.control}
          name="price"
          label="Price"
          placeholder="Enter property price"
        />

        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="email"
          label="Email"
          placeholder="johndoe@gmail.com"
        />

        <CustomFormField
          fieldType={FormFieldType.PHONE_INPUT}
          control={form.control}
          name="phone"
          label="Phone number"
          placeholder="(555) 123-4567"
        />

        <CustomFormField
          fieldType={FormFieldType.SELECT}
          control={form.control}
          name="type"
          label="Property Type"
          placeholder="Select a property type"
        >
          {propertyTypeOptions.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </CustomFormField>

        <CustomFormField
          fieldType={FormFieldType.NUMBER_INPUT}
          control={form.control}
          name="bedrooms"
          label="Bedrooms"
          placeholder="Enter number of bedrooms"
        />

        <CustomFormField
          fieldType={FormFieldType.NUMBER_INPUT}
          control={form.control}
          name="bathrooms"
          label="Bathrooms"
          placeholder="Enter number of bathrooms"
        />

        <CustomFormField
          fieldType={FormFieldType.TEXTAREA}
          control={form.control}
          name="description"
          label="Description"
          placeholder="Describe the property"
        />

        <CustomFormField
          fieldType={FormFieldType.MULTI_SELECT}
          control={form.control}
          name="amenities"
          label="Amenities"
          placeholder="Select amenities"
        >
          {amenitiesOptions.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </CustomFormField>

        <section className="space-y-6">
          <CustomFormField
            fieldType={FormFieldType.SKELETON}
            control={form.control}
            name="images"
            label="Property Images"
            renderSkeleton={(field) => (
              <FormControl>
                <FileUploader
                  files={field.value || []}
                  onChange={(files) => field.onChange(files)}
                />
              </FormControl>
            )}
          />
        </section>

        <CustomFormField
          fieldType={FormFieldType.CHECKBOX}
          control={form.control}
          name="available"
          label="Available for Rent"
        />

        <Button type="submit" disabled={isLoading} className="w-full bg-primary-light hover:bg-primary-light">
          {isLoading ? "Submitting..." : "Submit Property"}
        </Button>
      </form>
    </Form>
  );
};

export default PropertyForm;
