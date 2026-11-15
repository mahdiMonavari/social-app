"use client";

import {
  Calendar,
  DateField,
  DatePicker,
  FieldError,
  Label,
} from "@heroui/react";
import { getLocalTimeZone, parseDate, today } from "@internationalized/date";
import {
  type FieldPathByValue,
  type FieldValues,
  useController,
} from "react-hook-form";

type Props<T extends FieldValues> = {
  name: FieldPathByValue<T, string>;
  label?: string;
};

function parseFormDate(value: unknown) {
  if (typeof value !== "string" || !value) return null;

  try {
    return parseDate(value);
  } catch {
    return null;
  }
}

export function DatePickerComponent<T extends FieldValues>({
  name,
  label = "Date",
}: Props<T>) {
  const { field, fieldState } = useController<T>({ name });
  const maxDate = today(getLocalTimeZone());

  return (
    <DatePicker
      className="max-w-72 w-full"
      name={field.name}
      value={parseFormDate(field.value)}
      onChange={(date) => field.onChange(date?.toString() ?? "")}
      onBlur={field.onBlur}
      maxValue={maxDate}
      isInvalid={fieldState.invalid}
      validationBehavior="aria"
    >
      <Label>{label}</Label>

      <DateField.Group fullWidth>
        <DateField.Input>
          {(segment) => <DateField.Segment segment={segment} />}
        </DateField.Input>

        <DateField.Suffix>
          <DatePicker.Trigger>
            <DatePicker.TriggerIndicator />
          </DatePicker.Trigger>
        </DateField.Suffix>
      </DateField.Group>

      <FieldError>{fieldState.error?.message}</FieldError>

      <DatePicker.Popover>
        <Calendar aria-label={label} maxValue={maxDate}>
          <Calendar.Header>
            <Calendar.YearPickerTrigger>
              <Calendar.YearPickerTriggerHeading />
              <Calendar.YearPickerTriggerIndicator />
            </Calendar.YearPickerTrigger>
            <Calendar.NavButton slot="previous" />
            <Calendar.NavButton slot="next" />
          </Calendar.Header>

          <Calendar.Grid>
            <Calendar.GridHeader>
              {(day) => <Calendar.HeaderCell>{day}</Calendar.HeaderCell>}
            </Calendar.GridHeader>
            <Calendar.GridBody>
              {(date) => <Calendar.Cell date={date} />}
            </Calendar.GridBody>
          </Calendar.Grid>

          <Calendar.YearPickerGrid>
            <Calendar.YearPickerGridBody>
              {({ year }) => <Calendar.YearPickerCell year={year} />}
            </Calendar.YearPickerGridBody>
          </Calendar.YearPickerGrid>
        </Calendar>
      </DatePicker.Popover>
    </DatePicker>
  );
}
