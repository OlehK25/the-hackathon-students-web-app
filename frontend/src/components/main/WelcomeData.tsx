"use client";

import * as React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

function WelcomeData() {
  const router = useRouter();

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="absolute top-[100px] left-[100px] w-[342px] h-[232px]">
        <Image
          src={"/colors-brain-shaped-cloud.svg"}
          alt={"Cloud_1 Logo"}
          fill={true}
          priority
          style={{
            objectFit: "contain",
          }}
          sizes="232px"
        />
      </div>

      <div className="absolute top-[350px] right-[100px] w-[382px] h-[159px]">
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

      <div className="w-[600px] flex flex-col gap-8">
        <h1 className="text-center font-bold text-4xl">Вітаємо на борту!</h1>

        <p className="text-center text-lg">
          Ти студент чи абітурієнт? Втомився шукати інформацію по всій мережі?
          Забудь про це! Тут ти знайдеш все, що тобі потрібно в один клік.
        </p>

        <div className="pt-8 flex flex-col items-center justify-center gap-4">
          <button
            type="button"
            onClick={() => router.push("/login")}
            className="capitalize bg-[#2e409e] hover:bg-[#445eea] text-sm text-white font-semibold rounded-lg p-2 sm:w-[195px] max-sm:w-full max-xl:basis-full shadow-none transition-all duration-300 ease-in-out"
          >
            Увійти
          </button>

          <button
            type="button"
            onClick={() => router.push("/register")}
            className="capitalize bg-[#e5eaff] hover:bg-[#e5e6ff] text-sm text-[#2e409e] font-semibold rounded-lg p-2 sm:w-[195px] max-sm:w-full max-xl:basis-full shadow-none transition-all duration-300 ease-in-out"
          >
            Зареєструватися
          </button>
        </div>
      </div>
    </div>
  );
}

export default WelcomeData;
