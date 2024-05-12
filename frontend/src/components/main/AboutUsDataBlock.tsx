import * as React from "react";
import Image from "next/image";

function AboutUsDataBlock({
  icon,
  title,
  description,
}: {
  icon: string;
  title: string;
  description: string;
}) {
  return (
    <div className="flex flex-col h-full rounde-d-xl gap-8 items-center p-8 bg-[#f1f3ff] w-[332px]">
      <div className="flex-none relative w-[150px] h-[125px] sm:w-[200px] sm:h-[155px]">
        <Image
          src={icon}
          alt={`${title} Logo`}
          fill={true}
          priority
          style={{
            objectFit: "contain",
          }}
          sizes="(max-width: 640px) 125px, 155px"
        />
      </div>

      <h2 className="text-center font-semibold text-xl h-[56px]">{title}</h2>

      <p className="text-start">{description}</p>
    </div>
  );
}

export default AboutUsDataBlock;
