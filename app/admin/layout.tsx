"use client";

import UserContext from "@/context/userContext";
import { Metadata } from "next";
import { useContext } from "react";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "전자제품 리뷰사이트",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const userContext = useContext(UserContext);
  if (!userContext || userContext.userName === "") {
    return <></>;
  }
  if (userContext.role !== "ADMIN") {
    return notFound();
  }
  return children;
}
