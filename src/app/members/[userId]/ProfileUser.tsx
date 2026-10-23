"use client";
import { Member } from "@/generated/prisma/client";
import {
  editProfileSchema,
  EditProfileType,
} from "@/src/lib/schemas/editProfile";
import {
  Button,
  FieldError,
  Input,
  TextArea,
  TextField,
  toast,
} from "@heroui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, Path, useForm } from "react-hook-form";
import { editUser } from "../../server/actions/members";

function ProfileUser({ member }: { member: Member }) {
  const { city, country, name, description } = member;

  const {
    handleSubmit,
    control,
    setError,
    reset,
    formState: { isSubmitting, isDirty },
  } = useForm<EditProfileType>({
    resolver: zodResolver(editProfileSchema),
    values: {
      name: name ?? "",
      city: city ?? "",
      country: country ?? "",
      description: description ?? "",
    },
  });

  const onSubmit = async (data: EditProfileType) => {
    const result = await editUser(data);
    if (result.success) {
      toast.success("your data has been updated");
      reset(data);
    } else {
      if (Array.isArray(result.error)) {
        result.error.forEach((issue) =>
          setError(issue.path as Path<unknown>, { message: issue.message }),
        );
      } else {
        toast.danger(result.error);
      }
    }
  };

  return (
    <form
      className="flex flex-col w-full gap-3"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Controller
        name="name"
        control={control}
        render={({ field, fieldState }) => (
          <TextField
            aria-label="name"
            value={field.value}
            onChange={field.onChange}
            onBlur={field.onBlur}
            isInvalid={!!fieldState.error}
          >
            <Input placeholder="enter your name" />
            <FieldError>{fieldState.error?.message}</FieldError>
          </TextField>
        )}
      />

      <Controller
        name="description"
        control={control}
        render={({ field, fieldState }) => (
          <TextField
            aria-label="description"
            value={field.value}
            onChange={field.onChange}
            onBlur={field.onBlur}
            isInvalid={!!fieldState.error}
          >
            <TextArea placeholder="Enter your description" rows={10} />
            <FieldError>{fieldState.error?.message}</FieldError>
          </TextField>
        )}
      />

      <Controller
        name="city"
        control={control}
        render={({ field, fieldState }) => (
          <TextField
            aria-label="city"
            value={field.value}
            onChange={field.onChange}
            onBlur={field.onBlur}
            isInvalid={!!fieldState.error}
          >
            <Input placeholder="enter your city" />
            <FieldError>{fieldState.error?.message}</FieldError>
          </TextField>
        )}
      />

      <Controller
        name="country"
        control={control}
        render={({ field, fieldState }) => (
          <TextField
            aria-label="country"
            value={field.value}
            onChange={field.onChange}
            onBlur={field.onBlur}
            isInvalid={!!fieldState.error}
          >
            <Input placeholder="enter your country" />
            <FieldError>{fieldState.error?.message}</FieldError>
          </TextField>
        )}
      />

      <Button type="submit" isDisabled={!isDirty || isSubmitting}>
        submit
      </Button>
    </form>
  );
}

export default ProfileUser;
