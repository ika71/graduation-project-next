import Header from "@/components/fragments/Header";
import "./globals.css";
import Footer from "@/components/fragments/Footer";
import { Metadata } from "next";

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
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
