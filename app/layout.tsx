import Header from "@/components/fragments/Header";
import "./globals.css";
import Footer from "@/components/fragments/Footer";
import { Metadata } from "next";
import { UserContextProvider } from "@/context/userContext";

export const metadata: Metadata = {
  title: "전자제품 리뷰사이트",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <UserContextProvider>
      <html lang="ko">
        <body className="flex flex-col min-h-screen">
          <div>
            <Header />
            {children}
          </div>
          <div className="mt-auto">
            <Footer />
          </div>
        </body>
      </html>
    </UserContextProvider>
  );
}
