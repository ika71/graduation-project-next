"use client";

import UserContext from "@/context/userContext";
import { notFound } from "next/navigation";
import { useContext } from "react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const userContext = useContext(UserContext);
  if (!userContext) {
    return <div>Loading...</div>;
  }
  if (userContext.role !== "ADMIN") {
    return notFound();
  }
  return children;
}
