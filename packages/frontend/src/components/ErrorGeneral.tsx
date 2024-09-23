"use client";

import Image from "next/image";
import React from "react";

import errorImage from "../../public/ErrorImage.png";

function ErrorGeneral() {
  return (
    <div className="bg-lunaError min-h-screen px-10 lg:px-24">
      <div className="flex flex-col lg:flex-row gap-4 justify-center items-center min-h-screen">
        <Image
          src={errorImage}
          width={484}
          height={500}
          alt="error picture"
          className="order-1 lg:order-last"
        />
        <div className="flex gap-4 flex-col items-center lg:items-start order-last lg:order-1">
          <p className="text-6xl lg:text-8xl font-semibold text-errorText">
            Oops!
          </p>
          <p className="text-lg lg:text-2xl text-center lg:text-left">
            We are sorry, but it looks like something went wrong. Please click
            the button below to return to the homepage.
          </p>

          <button
            className="w-36 h-12 bg-[#ad5173] rounded-md text-white"
            type="button"
          >
            Back To Home
          </button>
          <p className="text-lg lg:text-2xl text-center lg:text-left font-bold">
            If the issue persists, feel free to contact help@gic.com! <br />
            Thanks!
          </p>
        </div>
      </div>
    </div>
  );
}

export default ErrorGeneral;
