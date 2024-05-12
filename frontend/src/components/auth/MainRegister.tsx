"use client";

import * as React from "react";
import { useState } from "react";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { PiWarningCircleFill } from "react-icons/pi";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
// @ts-ignore
import { zodResolver } from "@hookform/resolvers/zod";
import EmailField from "@/components/auth/EmailField";
import InputError from "@/components/InputError";
import SelectComponent from "@/components/SelectComponent";

interface IFormInput {
  email: string;
}

const schema = z
  .object({
    email: z.string().email("Invalid email address"),
  })
  .refine((data) => data.email.length <= 255, {
    message: "Email address must be less than 255 characters",
    path: ["email"],
  });

function MainRegister() {
  const router = useRouter();

  const [selectedType, setSelectedType] = React.useState<string>("Я студент");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [serverError, setServerError] = useState<string | null | undefined>(
    null,
  );

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IFormInput>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    setIsLoading(true);
    setServerError(null);

    try {
      const res = await signIn("credentials", {
        email: data.email,
        redirect: false,
      });

      if (res?.status === 200) {
        reset();
        router.push(`/`);
      } else {
        setServerError(res?.error);
      }
    } catch (error: any) {
      setServerError(error?.message);
    } finally {
      setIsLoading(false);
    }
  };

  // * Google login
  const googleLogin = async () => {
    await signIn("google", {
      callbackUrl: `/`,
      redirect: true,
    });
  };

  return (
    <div className="flex overflow-hidden relative items-center justify-center h-auto py-10 w-full">
      <div className="p-8 flex flex-col gap-6 bg-white rounded-xl">
        <h1 className="text-center text-xl font-bold">Авторизація</h1>

        <div className="flex gap-2 flex-col">
          <p>Обери варіант із запропонованих</p>

          <div className="border-2 border-[#e5eaff] rounded-lg">
            <button
              type="button"
              onClick={() => setSelectedType("Я студент")}
              className={`${selectedType === "Я студент" ? "bg-[#f1f3ff] text-[#223383]" : "bg-white text-black"}  hover:bg-[#c0c2cc] text-sm font-semibold rounded-l-lg p-2 sm:w-[160px] max-sm:w-full max-xl:basis-full shadow-none transition-all duration-300 ease-in-out`}
            >
              Я студент
            </button>

            <button
              type="button"
              onClick={() => setSelectedType("Я абітурієнт")}
              className={`${selectedType === "Я абітурієнт" ? "bg-[#f1f3ff] text-[#223383]" : "bg-white text-black"}  hover:bg-[#c0c2cc] text-sm font-semibold rounded-r-lg p-2 sm:w-[160px] max-sm:w-full max-xl:basis-full shadow-none transition-all duration-300 ease-in-out`}
            >
              Я абітурієнт
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <EmailField
            control={control}
            name={"email"}
            label={
              selectedType === "Я абітурієнт"
                ? "Електронна пошта"
                : "Корпоративна пошта"
            }
            isLoading={isLoading}
            error={errors.email?.message}
            placeholder={
              selectedType === "Я абітурієнт"
                ? "somebody@gmail.com"
                : "1111111@stud.nau.edu.ua"
            }
          />

          {serverError && (
            <div
              className="flex my-2 justify-start text-center gap-1 p-3 text-base text-red-500 font-semibold rounded-lg bg-red-50"
              role="alert"
            >
              <PiWarningCircleFill className="h-5 w-5" />
              <InputError messages={serverError} />
            </div>
          )}

          <button
            disabled={isLoading}
            className={`inline-flex mt-4 w-full items-center justify-center rounded-md px-1 py-1 font-semibold leading-7 text-white hover:bg-[#072adf]  ${
              isLoading ? "bg-slate-900" : "bg-[#051c93]"
            }`}
          >
            {isLoading ? "Завантаження..." : "Авторизуватися"}
          </button>
        </form>

        <div className="flex items-center gap-2">
          <p className="border-b flex-1"></p>
          <p>або</p>
          <p className="border-b flex-1"></p>
        </div>

        <div className="flex gap-4">
          <button
            type="button"
            className="relative inline-flex p-1.5 w-full items-center justify-center rounded-md bg-[#f9f5ff] font-semibold text-gray-700 transition-all duration-200 hover:bg-gray-100 hover:text-black focus:bg-gray-100 focus:text-black focus:outline-none"
            onClick={googleLogin}
          >
            <Image
              src="/google_icon.png"
              height={30}
              width={30}
              alt="Google Icon"
              className="mr-3"
            />
            Google
          </button>
        </div>
      </div>

      <div className="absolute top-[250px] right-[-100px] w-[382px] h-[159px]">
        <Image
          src={"/colors-water-vapor.svg"}
          alt={"Cloud_2 Logo"}
          fill={true}
          priority
          style={{
            objectFit: "contain",
          }}
          sizes="159px"
        />
      </div>

      <div className="z-100 absolute top-[100px] left-[-150px] w-[382px] h-[159px]">
        <Image
          src={"/colors-water-vapor.svg"}
          alt={"Cloud_2 Logo"}
          fill={true}
          priority
          style={{
            objectFit: "contain",
          }}
          sizes="159px"
        />
      </div>
    </div>
  );
}

export default MainRegister;
