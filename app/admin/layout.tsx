"use client";

import UserContext from "@/context/userContext";
import { useContext } from "react";
import { notFound } from "next/navigation";

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
