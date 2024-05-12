"use client";

import * as React from "react";
import { useState } from "react";
import Image from "next/image";
import { PiWarningCircleFill } from "react-icons/pi";
import { useRouter } from "next/navigation";
import InputError from "@/components/InputError";
import SelectComponent from "@/components/SelectComponent";

function RegisterViaGoogle({ selectedType }: { selectedType: string }) {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onSubmit = async (data: any) => {
    console.log("data: " + data);
  };

  return (
    <div className="flex overflow-hidden relative items-center justify-center h-auto py-10 w-full">
      <div className="p-8 flex flex-col gap-6 bg-white rounded-xl">
        <h1 className="text-center text-xl font-bold">Реєстрація</h1>

        <div className="flex flex-col gap-4">
          <SelectComponent
            defValue={"ФКНТ"}
            placeholder={"Факультет комп'ютерних наук та технологій"}
            label={"Факультет"}
          />

          <SelectComponent
            defValue={"СП"}
            placeholder={"Системне програмування"}
            label={"Спеціальність"}
          />

          {selectedType !== "Я абітурієнт" && (
            <SelectComponent
              defValue={"111"}
              placeholder={"111"}
              label={"Група"}
            />
          )}

          <button
            disabled={isLoading}
            type="submit"
            onClick={onSubmit}
            className={`inline-flex mt-4 w-full items-center justify-center rounded-md px-1 py-1 font-semibold leading-7 text-white hover:bg-[#072adf]  ${
              isLoading ? "bg-slate-900" : "bg-[#051c93]"
            }`}
          >
            {isLoading ? "Завантаження..." : "Зареєструватися"}
          </button>
        </div>

        <div className="flex items-center gap-2">
          <p className="border-b flex-1"></p>
          <p>або</p>
          <p className="border-b flex-1"></p>
        </div>
      </div>

      <div className="absolute scale-x-[-1] top-[200px] left-[100px] w-[203px] h-[138px]">
        <Image
          src={"/colors-brain-shaped-cloud.svg"}
          alt={"Cloud_1 Logo"}
          fill={true}
          priority
          style={{
            objectFit: "contain",
          }}
          sizes="138px"
        />
      </div>

      <div className="absolute scale-x-[-1] top-[100px] right-[-100px] w-[290px] h-[197px]">
        <Image
          src={"/colors-brain-shaped-cloud.svg"}
          alt={"Cloud_1 Logo"}
          fill={true}
          priority
          style={{
            objectFit: "contain",
          }}
          sizes="197px"
        />
      </div>

      {selectedType !== "Я абітурієнт" && (
        <div className="absolute top-[620px] right-[-100px] w-[382px] h-[159px]">
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
      )}

      {selectedType !== "Я абітурієнт" && (
        <div className="z-100 absolute top-[550px] left-[-150px] w-[382px] h-[159px]">
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
      )}
    </div>
  );
}

export default RegisterViaGoogle;
