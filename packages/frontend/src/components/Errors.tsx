"use client";

import Image from "next/image";
import React from "react";

interface ErrorsProps {
  errorType: keyof typeof errorMessages;
}

// Define the error messages
const errorMessages = {
  pageNotFound: {
    message: "We can’t seem to find the page you’re looking for.",
    code: 404,
    text: "",
  },
};

const Errors: React.FC<ErrorsProps> = ({ errorType }) => {
  const error = errorMessages[errorType];
  return (
    <div className="bg-lunaError min-h-screen px-10 lg:px-24">
      <div className="flex flex-col lg:flex-row gap-4 justify-center items-center min-h-screen">
        <Image
          src="/error.png"
          width={484}
          height={500}
          alt="error picture"
          className="order-1 lg:order-last h-20 w-20"
        />
        <div className="flex gap-4 flex-col items-center lg:items-start order-last lg:order-1">
          <p className="text-6xl lg:text-8xl font-semibold text-errorText">
            Oops!
          </p>
          <p className="text-lg lg:text-2xl text-center lg:text-left">
            {error.message}
          </p>
          <p className="text-base lg:text-xl">
            Error {error.code}
            {error.text && `: ${error.text}`}
          </p>
          <div className="flex gap-4">
            <button
              className="w-20 h-10 bg-[#ad5173] rounded-md text-white"
              type="button"
            >
              Back
            </button>
            <button
              className="w-20 h-10 bg-[#981f1f] rounded-md text-white"
              type="button"
            >
              Report
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Errors;
