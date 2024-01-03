"use client";
import { Metadata } from "next";
import PageWrapper from "@/app/page-wrapper";
import { monthStringArray, getCurrentDay, getCurrentMonth, getCurrentYear } from "@/utils/get-time";

// Test Json
import { test } from "./test.json";

export const metadata: Metadata = {
  title: "FJKT48 | Live",
};

export default function LivePage() {
  return (
    <PageWrapper>
      <h1 className="text-2xl font-poppins font-semibold mb-2">Showroom Member</h1>
      <h1 className="text-2xl font-poppins font-semibold mb-2">Idn Member</h1>
    </PageWrapper>
  );
}