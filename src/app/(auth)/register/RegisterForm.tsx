"use client";
import { registerSchema, RegisterSchemaType } from "@/src/lib/schemas/register";
import {
  Button,
  Card,
  CardHeader,
  FieldError,
  Input,
  TextField,
} from "@heroui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { GiPadlock } from "react-icons/gi";

function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterSchemaType>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const submitHandler = (data: RegisterSchemaType) => {
    console.log({ data });
  };
  return (
    <Card className="w-md shadow-xl">
      <CardHeader className="flex items-center justify-center flex-col">
        <div className="flex items-center flex-col gap-2">
          <div className="flex items-center gap-3">
            <GiPadlock size={30} />
            <h1 className="text-3xl font-semibold">Register</h1>
          </div>
          <p className="text-foreground/60">sign up a new acco unt</p>
        </div>
      </CardHeader>
      <form
        className="flex flex-col px-6 py-4 gap-4"
        onSubmit={handleSubmit(submitHandler)}
      >
        <TextField aria-label="name" isInvalid={!!errors.name}>
          <Input
            type="string"
            placeholder="enter your name"
            {...register("name")}
          />
          <FieldError>{errors.name?.message}</FieldError>
        </TextField>
        <TextField aria-label="email" isInvalid={!!errors.email}>
          <Input
            type="email"
            placeholder="enter your email"
            {...register("email")}
          />
          <FieldError>{errors.email?.message}</FieldError>
        </TextField>
        <TextField isInvalid={Boolean(errors.password)} aria-label="password">
          <Input
            type="password"
            placeholder="enter your password"
            {...register("password")}
          />
          <FieldError>{errors.password?.message}</FieldError>
        </TextField>
        <TextField
          isInvalid={Boolean(errors.confirmPassword)}
          aria-label="confirmPassword"
        >
          <Input
            type="password"
            placeholder="enter your confirmPassword"
            {...register("confirmPassword")}
          />
          <FieldError>{errors.confirmPassword?.message}</FieldError>
        </TextField>
        <Button type="submit" className={"w-full"}>
          submit
        </Button>
      </form>
    </Card>
  );
}

export default RegisterForm;
