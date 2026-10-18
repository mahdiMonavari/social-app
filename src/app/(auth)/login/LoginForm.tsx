"use client";
import { loginSchema, LoginSchemaType } from "@/src/lib/schemas/login";
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

function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const submitHandler = (data: LoginSchemaType) => {
    console.log({ data });
  };
  return (
    <Card className="w-md shadow-xl">
      <CardHeader className="flex items-center justify-center flex-col">
        <div className="flex items-center flex-col gap-2">
          <div className="flex items-center gap-3">
            <GiPadlock size={30} />
            <h1 className="text-3xl font-semibold">Login</h1>
          </div>
          <p className="text-foreground/60">welcome back</p>
        </div>
      </CardHeader>
      <form
        className="flex flex-col px-6 py-4 gap-4"
        onSubmit={handleSubmit(submitHandler)}
      >
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
        <Button type="submit" className={"w-full"}>
          submit
        </Button>
      </form>
    </Card>
  );
}

export default LoginForm;
