import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  type Control,
  type FieldPath,
  type FieldValues,
} from 'react-hook-form';

type SelectOption = {
  value: string;
  label: string;
};
type Options = SelectOption[] | string[] | readonly string[];

type FormSelectProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  control: Control<TFieldValues>;
  name: TName;
  placeholder?: string;
  options: Options;
  className?: string;
  required?: boolean;
  disabled?: boolean;
  label?: string;
};

export function FormSelect<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  control,
  name,
  placeholder = 'Select an option',
  options,
  className = '',
  required = false,
  disabled = false,
  label,
}: FormSelectProps<TFieldValues, TName>) {
  const normalizedOptions = options.map((option) => {
    if (typeof option === 'string') {
      return { value: option, label: option };
    }
    return option;
  });

  return (
    <FormField
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <FormItem>
          {label && <FormLabel required={required}>{label}</FormLabel>}
          <FormControl>
            <Select
              onValueChange={field.onChange}
              value={field.value}
              name={field.name}
              disabled={disabled}
              aria-required={required}
            >
              <SelectTrigger
                className={`w-full ${
                  error
                    ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                    : ''
                } ${className}`}
              >
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
              <SelectContent>
                {normalizedOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
