import type { Metadata } from "next";
import { Urbanist } from "next/font/google";
import { Toaster } from "sonner";

import { Providers } from "@/lib/providers";

import "./globals.css";
import { LandingNavBar } from "@/feature/navbar";

const inter = Urbanist({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TEAM 1 best team",
  description: "Team 1 should win.",
  icons: {
    icon: "./jouvireLogo.svg", // TODO ADD
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Providers>
      <html lang="en">
        <head />

        <body
          suppressHydrationWarning
          className={`${inter.className} overflow-x-hidden w-[100vw]`}
        >
          <div className="flex flex-col">
            <Toaster
              richColors
              position="bottom-right"
              expand={false}
              closeButton
            />
            <LandingNavBar />
            <div className="w-full font-worksans">
              <div>{children}</div>
            </div>
          </div>
        </body>
      </html>
    </Providers>
  );
}
