"use client";

import { Profile, profileSchema } from "@/src/lib/schemas/register";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import TextFieldComponent from "@/src/app/components/TextField";
import SelectionComponent from "./SelectionComponent";
import { DatePickerComponent } from "@/src/app/components/DatePicker";
import { Button, Spinner, toast } from "@heroui/react";
import { getUserLocation } from "@/src/app/server/actions/region";
import { useTransition } from "react";
import { FaMapPin } from "react-icons/fa";
import { createMember } from "@/src/app/server/actions/members";
import { useRouter } from "next/navigation";

function MoreInfoForm() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const method = useForm<Profile>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      city: "",
      country: "",
      dateOfBirth: "",
      description: "",
      gender: "male",
    },
  });

  const {
    handleSubmit,
    setValue,
    formState: { isSubmitting },
  } = method;
  const createNewMemberHandler = async (data: Profile) => {
    const res = await createMember(data);

    if (!res.success) {
      toast.danger(res.message);
    } else {
      console.log(res);
      router.push("/register/verify-email");
      router.refresh();
      return;
    }
  };
  const getRegion = () => {
    startTransition(async () => {
      const res = await getUserLocation();
      const { city, country } = res;
      if (city) setValue("city", city, { shouldValidate: true });
      if (country) setValue("country", country, { shouldValidate: true });
    });
  };
  return (
    <div>
      <form
        onSubmit={handleSubmit(createNewMemberHandler)}
        className="space-y-3 w-full"
      >
        <FormProvider {...method}>
          <div className="flex gap-2 *:flex-1 items-end relative">
            <div className="flex flex-wrap md:flex-nowrap gap-2">
              <TextFieldComponent<Profile>
                name="city"
                placeHolder="enter your city"
                label="City"
              />
              <TextFieldComponent<Profile>
                name="country"
                placeHolder="enter your country"
                label="country"
              />
            </div>
            <button
              type="button" // حتما type="button" باشه که فرم رو سابمیت نکنه
              onClick={getRegion}
              disabled={isPending}
              className="absolute right-0 top-3.5 -translate-y-1/2 flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-xl bg-sky-500 text-white shadow-sm shadow-sky-500/30 hover:bg-sky-600 active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-200 cursor-pointer"
            >
              {isPending ? (
                <Spinner size="sm" className="w-3.5 h-3.5 text-white" />
              ) : (
                <FaMapPin className="w-3.5 h-3.5" />
              )}
              <span>Auto Fill</span>
            </button>
          </div>
          <TextFieldComponent<Profile>
            name="description"
            placeHolder="enter your description"
            label="description"
            isArea={true}
          />
          <div className="flex items-end justify-center gap-2 flex-wrap md:flex-nowrap">
            <DatePickerComponent<Profile>
              name="dateOfBirth"
              label="Date of birth"
            />

            <SelectionComponent />
          </div>
        </FormProvider>
        <Button
          type="submit"
          isDisabled={isSubmitting}
          className="w-full font-medium py-3 rounded-2xl bg-gradient-to-r from-sky-500 to-blue-600 text-white shadow-lg shadow-sky-500/25 hover:shadow-sky-500/40 hover:from-sky-600 hover:to-blue-700 active:scale-[0.98] disabled:opacity-70 transition-all duration-500 cursor-pointer"
        >
          {isSubmitting ? "Creating Profile..." : "Create Profile"}
        </Button>
      </form>
    </div>
  );
}

export default MoreInfoForm;
