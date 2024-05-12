import * as React from "react";
import Image from "next/image";

function SupportData() {
  return (
    <div className="w-full overflow-hidden  relative flex items-center justify-center h-[80vh]">
      <div className="absolute scale-x-[-1] top-0 right-[-200px] w-[342px] h-[232px]">
        <Image
          src="/colors-brain-shaped-cloud.svg"
          alt={"Cloud_1 Logo"}
          fill={true}
          priority
          style={{
            objectFit: "contain",
          }}
          sizes="232px"
        />
      </div>

      <div className="w-full flex flex-col gap-8">
        <h1 className="text-center font-bold text-3xl">Підтримка</h1>

        <div className="w-full flex items-center justify-around gap-10">
          <div className="flex-none relative w-[300px] h-[175px] sm:w-[368px] sm:h-[213px]">
            <Image
              src={"/image_4.svg"}
              alt={`image_4 Logo`}
              fill={true}
              priority
              style={{
                objectFit: "contain",
              }}
              sizes="(max-width: 640px) 175px, 213px"
            />
          </div>

          <div className="flex flex-col gap-12 text-base">
            <div className="flex flex-col gap-2 text-base">
              <p className="font-semibold">Маєш питання чи проблему? </p>
              <p>Натискай, переходь у чат в телеграмі та пиши!</p>
            </div>

            <button
              type="button"
              className="capitalize flex justify-center gap-2 items-center bg-[#2e409e] hover:bg-[#445eea] text-sm text-white font-semibold rounded-lg p-2 sm:w-[170px] max-sm:w-full max-xl:basis-full shadow-none transition-all duration-300 ease-in-out"
            >
              Написати{" "}
              <div className="flex-none relative w-[15px] h-[15px]">
                <Image
                  src={"/arrow-right.svg"}
                  alt={`image_4 Logo`}
                  fill={true}
                  priority
                  style={{
                    objectFit: "contain",
                  }}
                  sizes="15px"
                />
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SupportData;
