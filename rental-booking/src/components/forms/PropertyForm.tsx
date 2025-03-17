import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { PropertyFormDefaultValues } from "@/constants";
import { PropertyFormValidation } from "@/lib/validation";
import { Form, FormControl } from "../ui/form";
import CustomFormField, { FormFieldType } from "./CustomFormField";
import { FileUploader } from "../ui/FileUploader";
import { SelectItem } from "../ui/select";
import "react-phone-number-input/style.css";

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
    defaultValues: PropertyFormDefaultValues,
  });

  const onSubmit = async (values: z.infer<typeof PropertyFormValidation>) => {
    setIsLoading(true);
    try {
      console.log({
        ...values,
        type: values.type, // Already stored as string
        amenities: Array.isArray(values.amenities)
          ? values.amenities
          : [values.amenities],
      });
    } catch (error) {
      console.log("error: ", error);
    } finally {
      setIsLoading(false);
    }
  };

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
          fieldType={FormFieldType.INPUT}
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

        {/* Property Type - Single Select */}
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

        <div className="flex flex-col gap-6 xl:flex-row">
          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="bedrooms"
            label="Bedrooms"
            placeholder="Enter number of bedrooms"
          />

          <CustomFormField
            fieldType={FormFieldType.INPUT}
            control={form.control}
            name="bathrooms"
            label="Bathrooms"
            placeholder="Enter number of bathrooms"
          />
        </div>

        <CustomFormField
          fieldType={FormFieldType.TEXTAREA}
          control={form.control}
          name="description"
          label="Description"
          placeholder="Describe the property"
        />

        {/* Amenities - Multi Select */}
        <CustomFormField
          fieldType={FormFieldType.SELECT}
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
                <FileUploader files={field.value} onChange={field.onChange} />
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

        <button
          type="submit"
          className="bg-primary-light text-white px-6 py-2 rounded-md w-full"
          disabled={isLoading}
        >
          {isLoading ? "Submitting..." : "Submit Property"}
        </button>
      </form>
    </Form>
  );
};

export default PropertyForm;
