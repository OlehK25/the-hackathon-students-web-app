"use client";

import * as React from "react";
import { Controller } from "react-hook-form";
import { PiWarningCircleFill } from "react-icons/pi";
import dynamic from "next/dynamic";

const InputError = dynamic(() => import("../InputError"));

function EmailField({
  control,
  name,
  label,
  isLoading,
  error,
  placeholder,
}: {
  control: any;
  name: string;
  label: string;
  isLoading: boolean;
  error: any;
  placeholder: string;
}) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <div className="my-2">
          <label
            htmlFor={name}
            className="text-sm block py-1 font-medium text-gray-900"
          >
            {label}
          </label>

          <input
            id={name}
            placeholder={placeholder}
            type="email"
            className="bg-gray-50 text-black p-2 border border-[#bfc0c1] w-full rounded-lg"
            disabled={isLoading}
            {...field}
          />

          {error && (
            <div
              className="flex my-2 justify-start text-center gap-1 p-3 text-base text-red-500 font-semibold rounded-lg bg-red-50"
              role="alert"
            >
              <PiWarningCircleFill className="h-5 w-5" />
              <InputError messages={error} />
            </div>
          )}
        </div>
      )}
    />
  );
}

export default EmailField;
