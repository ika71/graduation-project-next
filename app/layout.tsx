import Header from "@/components/fragments/Header";
import "./globals.css";
import "@mantine/core/styles.css";
import "@mantine/tiptap/styles.css";
import Footer from "@/components/fragments/Footer";
import { Metadata } from "next";
import { UserContextProvider } from "@/context/userContext";
import { MantineProvider } from "@mantine/core";

export const metadata: Metadata = {
  title: "전자제품 리뷰사이트",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className="flex flex-col min-h-screen">
        <div>
          <UserContextProvider>
            <Header />
            <MantineProvider>{children}</MantineProvider>
          </UserContextProvider>
        </div>
        <div className="mt-auto">
          <Footer />
        </div>
      </body>
    </html>
  );
}
