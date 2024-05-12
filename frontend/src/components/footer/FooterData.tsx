import * as React from "react";
import Image from "next/image";
import { FaFacebook } from "react-icons/fa";
import { FaYoutube, FaInstagram } from "react-icons/fa6";
import { BsTelegram } from "react-icons/bs";

import { AiOutlineTikTok } from "react-icons/ai";

function FooterData({ isVisible = true }) {
  return (
    <div className="flex flex-col gap-6 pb-8 h-[337px] bg-[#051c93] px-16 text-white rounded-t-2xl">
      <div
        className={`w-full ${isVisible ? "pt-12" : "pt-6"} flex items-center justify-between overflow-visible relative`}
      >
        {isVisible && (
          <div className="absolute scale-x-[-1] top-[-120px] left-[-100px] w-[382px] h-[159px]">
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

        <div className="p-4">
          <ul>
            <li className="py-2 hover:cursor-pointer hover:text-blue-200">
              Про університет
            </li>
            <li className="py-2 hover:cursor-pointer hover:text-blue-200">
              Інші сайти НАУ
            </li>
            <li className="py-2 hover:cursor-pointer hover:text-blue-200">
              Корисні посилання
            </li>
            <li className="py-2 hover:cursor-pointer hover:text-blue-200">
              Контакти
            </li>
          </ul>
        </div>

        <div className="flex gap-4 w-[300px]">
          <FaFacebook className="hover:cursor-pointer w-10 h-10" />
          <div className="hover:cursor-pointer bg-red-400 rounded-full w-10 w-10 flex items-center justify-center">
            <FaInstagram className="w-6 h-6" />
          </div>
          <AiOutlineTikTok className="hover:cursor-pointer w-10 h-10 bg-black rounded-full" />
          <div className="hover:cursor-pointer bg-red-500 rounded-full w-10 w-10 flex items-center justify-center">
            <FaYoutube className="w-6 h-6" />
          </div>
          <BsTelegram className="hover:cursor-pointer w-10 h-10 text-[#00b0f2] bg-white rounded-full" />
        </div>
      </div>

      <div className="flex items-end border-t-2 text-sm justify-between h-[50px]">
        <p>© Національний авіаційний університет</p>
        <p>03058, Україна м.Київ, просп. Гузара Любомира 1 </p>
      </div>
    </div>
  );
}

export default FooterData;
