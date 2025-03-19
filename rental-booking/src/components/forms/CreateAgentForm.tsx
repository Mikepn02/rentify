import { AgentFormDefaultValues } from "@/constants";
import { AgentFormValidation } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormControl } from "../ui/form";
import { z } from "zod";
import CustomFormField, { FormFieldType } from "./CustomFormField";
import { FileUploader } from "../ui/FileUploader";
import { Button } from "../ui/button";
import { useState } from "react";

const CreateAgentForm = () => {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof AgentFormValidation>>({
    resolver: zodResolver(AgentFormValidation),
    defaultValues: AgentFormDefaultValues,
  });

  const onSubmit = async (values: z.infer<typeof AgentFormValidation>) => {
    setIsLoading(true);
    try {
      const formData = new FormData();

      if (values.profileImage && values.profileImage.length > 0) {
        formData.append("profileImage", values.profileImage);
      }

      formData.append("name", values.name);
      formData.append("email", values.email);
      formData.append("phoneNumber", values.phoneNumber);
      formData.append("role", values.role);
      formData.append("about", values.about);

      console.log("Form Data: ", formData);
      console.log("Form Data: ", Object.fromEntries(formData));
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  console.log(form.formState.errors);
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex-1 space-y-12"
      >
        <section className="space-y-4">
          <p className="text-primary-light text-lg font-bold">
            Create Your Agent
          </p>
        </section>

        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="name"
          label="Names"
          placeholder="Enter Agent Name"
        />
        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="email"
          label="Email"
          placeholder="Enter Agent Email"
        />

        <CustomFormField
          fieldType={FormFieldType.PHONE_INPUT}
          control={form.control}
          name="phoneNumber"
          label="Phone Number"
          placeholder="(555) 123-456"
        />

        <CustomFormField
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name="role"
          label="Role"
          placeholder="Enter Agent role"
        />

        <CustomFormField
          fieldType={FormFieldType.TEXTAREA}
          control={form.control}
          name="about"
          label="About Agent"
          placeholder="Enter more information about agent"
        />

        <section className="space-y-6">
          <CustomFormField
            fieldType={FormFieldType.SKELETON}
            control={form.control}
            name="profileImage"
            label="Profile Image"
            renderSkeleton={(field) => (
              <FormControl>
                <FileUploader
                  files={field.value ? [field.value] : []} // Ensure only one file is stored
                  onChange={(files) => field.onChange(files[0])} // Store only a single file
                />
              </FormControl>
            )}
          />
        </section>

        <Button
          type="submit"
          disabled={isLoading}
          className="w-full bg-primary-light hover:bg-primary-light"
        >
          {isLoading ? "Submitting..." : "Submit Property"}
        </Button>
      </form>
    </Form>
  );
};

export default CreateAgentForm;
