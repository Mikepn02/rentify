/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { Control } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import PhoneInput from "react-phone-number-input";
import { E164Number } from "libphonenumber-js/core";
import { Checkbox } from "../ui/checkbox";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import ReactSelect from "react-select";
import { Eye, EyeOff } from "lucide-react";

export enum FormFieldType {
  INPUT = "input",
  NUMBER_INPUT = "numberInput",
  TEXTAREA = "textarea",
  PHONE_INPUT = "phoneInput",
  CHECKBOX = "checkbox",
  DATE_PICKER = "datePicker",
  SELECT = "select",
  SKELETON = "skeleton",
  MULTI_SELECT = "multiSelect",
}

interface CustomProps {
  control: Control<any>;
  name: string;
  label?: string;
  placeholder?: string;
  iconSrc?: string;
  iconAlt?: string;
  disabled?: boolean;
  dateFormat?: string;
  showTimeSelect?: boolean;
  children?: React.ReactNode;
  renderSkeleton?: (field: any) => React.ReactNode;
  fieldType: FormFieldType;
}

const RenderInput = ({ field, props }: { field: any; props: CustomProps }) => {
  const [showPassword, setShowPassword] = useState(false);
  switch (props.fieldType) {
    case FormFieldType.INPUT:
      return (
        <div className="flex rounded-md border border-primary-light">
          {props.iconSrc && (
            <img
              src={props.iconSrc}
              height={24}
              width={24}
              alt={props.iconAlt || "icon"}
              className="ml-2"
            />
          )}
          <FormControl className="relative flex-1">
            <div>
              <Input
                placeholder={props.placeholder}
                type={
                  (props.name === "password" || props.name === "confirmPassword")  && !showPassword
                    ? "password"
                    : "text"
                }
                {...field}
                className="h-[44px] border-primary-light focus-visible:ring-0 focus-visible:ring-offset-0 border-0"
              />
              {(props.name === "password" || props.name === "confirmPassword") && (
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-3 flex items-center text-gray-500"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              )}
            </div>
          </FormControl>
        </div>
      );

    case FormFieldType.NUMBER_INPUT:
      return (
        <FormControl>
          <Input
            type="number"
            placeholder={props.placeholder}
            {...field}
            className="h-[44px] border-primary-light focus-visible:ring-0 focus-visible:ring-offset-0 border-2"
            onChange={(e) => field.onChange(Number(e.target.value))}
          />
        </FormControl>
      );

    case FormFieldType.TEXTAREA:
      return (
        <FormControl>
          <Textarea
            placeholder={props.placeholder}
            {...field}
            className="h-[44px] border-primary-light focus-visible:ring-0 focus-visible:ring-offset-0 border-2"
          />
        </FormControl>
      );

    case FormFieldType.PHONE_INPUT:
      return (
        <FormControl>
          <PhoneInput
            defaultCountry="RW"
            placeholder={props.placeholder}
            international
            withCountryCallingCode
            value={field.value as E164Number | undefined}
            onChange={field.onChange}
            className="mt-2 h-[44px] rounded-md px-3 text-sm border border-primary-light"
          />
        </FormControl>
      );

    case FormFieldType.CHECKBOX:
      return (
        <div className="flex items-center gap-4">
          <Checkbox
            id={props.name}
            checked={!!field.value}
            onCheckedChange={field.onChange}
            className="text-white data-[state=checked]:bg-blue-500 data-[state=checked]:border-primary-light"
          />
          <label
            htmlFor={props.name}
            className="cursor-pointer text-sm text-primary-light font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70 md:leading-none"
          >
            {props.label}
          </label>
        </div>
      );

    case FormFieldType.SELECT:
      return (
        <FormControl>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <SelectTrigger className="h-[44px] focus:ring-0 focus:ring-offset-0 border-2 border-primary-light">
              <SelectValue>{field.value || props.placeholder}</SelectValue>
            </SelectTrigger>
            <SelectContent>{props.children}</SelectContent>
          </Select>
        </FormControl>
      );

    case FormFieldType.MULTI_SELECT: {
      const childrenArray = React.Children.toArray(props.children);

      return (
        <FormControl>
          <ReactSelect
            isMulti
            options={childrenArray.map((child: any) => ({
              value: child.props.value,
              label: child.props.children,
            }))}
            value={childrenArray
              .filter((child: any) => field.value?.includes(child.props.value))
              .map((child: any) => ({
                value: child.props.value,
                label: child.props.children,
              }))}
            onChange={(selected) =>
              field.onChange(selected.map((option) => option.value))
            }
            className="border-2 border-primary-light rounded-md"
          />
        </FormControl>
      );
    }

    case FormFieldType.SKELETON:
      return props.renderSkeleton ? props.renderSkeleton(field) : null;
    default:
      return null;
  }
};

const CustomFormField = (props: CustomProps) => {
  const { control, name, label } = props;

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex-1">
          {props.fieldType !== FormFieldType.CHECKBOX && label && (
            <FormLabel>{label}</FormLabel>
          )}
          <RenderInput field={field} props={props} />
          <FormMessage className="text-red-400" />
        </FormItem>
      )}
    />
  );
};

export default CustomFormField;
