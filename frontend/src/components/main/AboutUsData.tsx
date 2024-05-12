import * as React from "react";
import AboutUsDataBlock from "@/components/main/AboutUsDataBlock";

function AboutUsData() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex flex-col gap-8">
        <h1 className="text-center font-bold text-3xl">Про нас</h1>

        <div className="flex items-center h-[459px] gap-8">
          <AboutUsDataBlock
            title={"Вся корисна інформація в одному місці"}
            description={
              "Більше не потрібно перечитувати безліч каналів, блукати на офіційному сайті, бо ВСЕ вже тут!"
            }
            icon={"/image_1.svg"}
          />

          <AboutUsDataBlock
            title={"Щоденні оновлення"}
            description={
              "Не переживай, ти завжди будеш в курсі справ! Розклад, корисні матеріали, посилання на необхідні джерела - усе актуально та в одному місці."
            }
            icon={"/image_2.svg"}
          />

          <AboutUsDataBlock
            title={"Надійно захищено"}
            description={
              "Вхід вібувається за допомогою корпоративної пошти та паролю, тому доступ до кабінету маєш тільки ти."
            }
            icon={"/image_3.svg"}
          />
        </div>
      </div>
    </div>
  );
}

export default AboutUsData;
