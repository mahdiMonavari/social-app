import { FieldError, Input, Label, TextArea, TextField } from "@heroui/react";
import React from "react";
import { FieldValues, Path, useController } from "react-hook-form";

type Props<T extends FieldValues> = {
  name: Path<T>;
  label?: string;
  type?: React.HTMLInputTypeAttribute;
  placeHolder?: string;
  isArea?: boolean;
};

function TextFieldComponent<T extends FieldValues>({
  name,
  label,
  type = "text",
  placeHolder,
  isArea,
}: Props<T>) {
  const { field, fieldState } = useController({ name });

  return (
    <>
      {isArea ? (
        <TextField aria-label={String(name)} isInvalid={!!fieldState.error}>
          {label && <Label className="py-1">{label}</Label>}
          <TextArea
            aria-label={label}
            placeholder={placeHolder}
            rows={5}
            className="w-full"
            {...field}
          />
          <FieldError>{fieldState.error?.message}</FieldError>
        </TextField>
      ) : (
        <TextField aria-label={String(name)} isInvalid={!!fieldState.error}>
          {label && <Label className="py-1">{label}</Label>}
          <Input {...field} type={type} placeholder={placeHolder} />
          <FieldError>{fieldState.error?.message}</FieldError>
        </TextField>
      )}
    </>
  );
}

export default TextFieldComponent;
