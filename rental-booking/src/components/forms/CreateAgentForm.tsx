import { AgentFormDefaultValues } from "@/constants"
import { AgentFormValidation } from "@/lib/validation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Form, FormControl } from "../ui/form";
import { z } from "zod"
import CustomFormField, { FormFieldType } from "./CustomFormField"
import { FileUploader } from "../ui/FileUploader";


const CreateAgentForm = () => {

  const form = useForm<z.infer<typeof AgentFormValidation>>({
     resolver: zodResolver(AgentFormValidation),
     defaultValues: AgentFormDefaultValues
  })

  const onSubmit = async(values: z.infer<typeof AgentFormValidation>) => {
    try{
      console.log(values)
    }catch(error){
      console.log(error);
    }
  }
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
          name="names"
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
          name="phone"
          label="Phone Number"
          placeholder="(555) 123-456"
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
            name="images"
            label="Profile Image"
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
       </form>
    </Form>
  )
}

export default CreateAgentForm