/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useState, useEffect } from "react";
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
import useProperties from "@/hooks/useProperties";
import { Property } from "@/@types/types";

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

type PropertyFormProps = {
  action: "create" | "update";
  property?: Property;
  onSuccess?: () => void;
};

const PropertyForm = ({ action, property, onSuccess }: PropertyFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const { createProperty, updateProperty } = useProperties();

  const form = useForm<z.infer<typeof PropertyFormValidation>>({
    resolver: zodResolver(PropertyFormValidation),
    defaultValues: {
      title: property?.title || "",
      location: property?.location || "",
      price: property?.price || 0,
      type: property?.type || "",
      area: property?.area || 0,
      bedrooms: property?.bedrooms || 0,
      bathrooms: property?.bathrooms || 0,
      description: property?.description || "",
      amenities: property?.amenities || [],
      available: property?.available || false,
      // For update, leave the images as URLs (strings) rather than converting to empty Files.
      images: property?.images || [],
    },
  });

  // Optionally reset the form when the property changes (useful for editing)
  useEffect(() => {
    if (property && action === "update") {
      form.reset({
        ...property,
        images: property.images || [],
      });
    }
  }, [property, form, action]);

  const onSubmit = async (values: z.infer<typeof PropertyFormValidation>) => {
    setIsLoading(true);
    try {
      if (action === "create") {
        await createProperty(values);
      } else if (action === "update" && property?.id) {
        await updateProperty(property.id, values);
      }
      
      if (onSuccess) onSuccess();
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex-1 space-y-8">
        <section className="space-y-4">
          <p className="text-primary-light text-lg font-bold">
            {action === "create" ? "Create A Rental Property" : "Update Property"}
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
          name="area"
          label="Area (sq ft)"
          placeholder="Enter property area"
        />

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

        <Button
          type="submit"
          disabled={isLoading}
          className="w-full bg-primary-light hover:bg-primary-light"
        >
          {isLoading
            ? "Submitting..."
            : action === "create"
            ? "Create Property"
            : "Update Property"}
        </Button>
      </form>
    </Form>
  );
};

export default PropertyForm;
