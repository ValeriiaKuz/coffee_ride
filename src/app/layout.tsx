import "./globals.scss";
import type { Metadata } from "next";
import React from "react";
import Header from "../components/header/header";
import Footer from "../components/footer/footer";
import { Providers } from "../servicies/providers/providers";
import Cities from "@/src/app/coffee-points/@modal/cities/page";
import { poppins400 } from "@/src/fonts/fonts";

export const metadata: Metadata = {
  title: "Coffee Ride",
  description: "Coffee Ride - guide to local cafes.",
};
export default function RootLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={poppins400.className}>
        <div id="pop-ups">{modal}</div>
        <Providers>
          <Header />
          <Cities />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
