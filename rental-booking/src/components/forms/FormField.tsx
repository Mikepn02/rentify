import { zodResolver } from "@hookform/resolvers/zod";
import {
  useForm,
  SubmitHandler,
  FieldValues,
  DefaultValues,
  Path,
  PathValue,
} from "react-hook-form";
import CreditCardInput from "react-credit-card-input";
import { ZodSchema } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

interface CustomFormProps<T extends FieldValues> {
  schema: ZodSchema<T>;
  onSubmit: SubmitHandler<T>;
  fields: Array<{
    name: keyof T;
    label: string;
    placeholder: string;
    type?: string;
    description?: string;
    formType?: string;
  }>;
}

export function CustomForm<T extends FieldValues>({
  schema,
  onSubmit,
  fields,
}: CustomFormProps<T>) {
  const form = useForm<T>({
    resolver: zodResolver(schema),
    defaultValues: {} as DefaultValues<T>,
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {fields.map((field) => (
          <FormField
            key={field.name as string}
            control={form.control}
            name={field.name as Path<T>}
            render={({ field: formField }) => (
              <FormItem>
                <FormLabel>{field.label}</FormLabel>
                <FormControl>
                  {field.type === "booking-form" ? (
                    <div className="space-y-2"> {/* Ensures spacing below the label */}
                      <CreditCardInput
                        cardNumberInputProps={{
                          value:
                            form.watch(field.name as Path<T>)?.cardNumber || "",
                          onChange: (e) =>
                            form.setValue(
                              `${String(field.name)}.cardNumber` as Path<T>,
                              e.target.value as unknown as PathValue<T, Path<T>>
                            ),
                        }}
                        cardExpiryInputProps={{
                          value:
                            form.watch(field.name as Path<T>)?.cardExpiry || "",
                          onChange: (e) =>
                            form.setValue(
                              `${String(field.name)}.cardExpiry` as Path<T>,
                              e.target.value as unknown as PathValue<T, Path<T>>
                            ),
                        }}
                        cardCVCInputProps={{
                          value:
                            form.watch(field.name as Path<T>)?.cardCVC || "",
                          onChange: (e) =>
                            form.setValue(
                              `${String(field.name)}.cardCVC` as Path<T>,
                              e.target.value as unknown as PathValue<T, Path<T>>
                            ),
                        }}
                        fieldClassName="input border p-2 rounded-md w-full"
                      />
                    </div>
                  ) : (
                    <Input
                      type={field.type || "textarea"}
                      placeholder={field.placeholder}
                      {...formField}
                    />
                  )}
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
