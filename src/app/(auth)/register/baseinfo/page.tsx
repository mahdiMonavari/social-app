"use client";
import { registerSchema, RegisterSchemaType } from "@/src/lib/schemas/register";
import { Button } from "@heroui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import TextFieldComponent from "@/src/app/components/TextField";
import { authClient } from "@/src/lib/auth-client";
import { useRouter } from "next/navigation";
import { GoogleSignInButton } from "@/src/app/components/GoogleButton";

function RegisterForm() {
  const router = useRouter();
  const method = useForm<RegisterSchemaType>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      name: "",
    },
  });
  const {
    handleSubmit,
    formState: { isSubmitting },
  } = method;
  const submitHandler = async (data: RegisterSchemaType) => {
    const { email, name, password } = data;
    await authClient.signUp.email(
      {
        email,
        name,
        password,
      },
      {
        onSuccess: () => {
          router.push("/register/moreinfo");
          router.refresh();
        },
        onError: (error) => {
          console.log(error.error.message);
        },
      },
    );
  };
  return (
    <form
      className="flex flex-col px-4 gap-2"
      onSubmit={handleSubmit(submitHandler)}
    >
      <FormProvider {...method}>
        <TextFieldComponent
          name="name"
          placeHolder="enter your name"
          label="Desplay name"
        />
        <TextFieldComponent
          name="email"
          placeHolder="enter your email"
          label="Email"
        />
        <TextFieldComponent
          name="password"
          placeHolder="enter your password"
          label="Password"
          type="password"
        />
        <TextFieldComponent
          name="confirmPassword"
          placeHolder="enter your password agine"
          label="Comfirm Password"
          type="password"
        />
        <Button
          isPending={isSubmitting}
          type="submit"
          onClick={handleSubmit(submitHandler)}
          className={"w-full mt-4"}
        >
          next
        </Button>
      </FormProvider>
      <div className="block h-px my-2 w-full bg-gray-700"></div>
      <GoogleSignInButton />
    </form>
  );
}

export default RegisterForm;
