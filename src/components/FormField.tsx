import React from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Select } from "./ui/select";
import { Textarea } from "./ui/textarea";
import { CalendarIcon, UploadIcon } from "lucide-react";

interface FormFieldProps {
  label: string;
  type?: "text" | "select" | "textarea" | "date" | "file" | "radio";
  placeholder?: string;
  options?: { value: string; label: string }[];
  radioOptions?: { value: string; label: string }[];
  value?: string;
  onChange?: (value: string) => void;
  required?: boolean;
  className?: string;
}

export const FormField: React.FC<FormFieldProps> = ({
  label,
  type = "text",
  placeholder,
  options,
  radioOptions,
  value,
  onChange,
  required,
  className = "",
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    onChange?.(e.target.value);
  };

  const renderField = () => {
    switch (type) {
      case "select":
        return (
          <Select value={value} onChange={handleChange} placeholder={placeholder}>
            {options?.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
        );
      
      case "textarea":
        return (
          <Textarea
            value={value}
            onChange={handleChange}
            placeholder={placeholder}
            rows={3}
          />
        );
      
      case "date":
        return (
          <div className="relative">
            <Input
              type="date"
              value={value}
              onChange={handleChange}
              className="pr-10"
            />
            <CalendarIcon className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#913472] pointer-events-none" />
          </div>
        );
      
      case "file":
        return (
          <div className="relative">
            <Input
              type="file"
              onChange={handleChange}
              className="pr-10"
              accept="image/*,.pdf"
            />
            <UploadIcon className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#913472] pointer-events-none" />
          </div>
        );
      
      case "radio":
        return (
          <div className="flex gap-4">
            {radioOptions?.map((option) => (
              <label key={option.value} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name={label}
                  value={option.value}
                  checked={value === option.value}
                  onChange={handleChange}
                  className="w-4 h-4 text-[#913472] border-[#913472] focus:ring-[#913472]"
                />
                <span className="text-sm text-[#913472]">{option.label}</span>
              </label>
            ))}
          </div>
        );
      
      default:
        return (
          <Input
            type={type}
            value={value}
            onChange={handleChange}
            placeholder={placeholder}
          />
        );
    }
  };

  return (
    <div className={`space-y-2 ${className}`}>
      <Label className="text-base font-medium">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </Label>
      {renderField()}
    </div>
  );
};