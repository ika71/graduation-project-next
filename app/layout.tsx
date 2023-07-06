import Header from "@/components/fragments/Header";
import "./globals.css";
import Footer from "@/components/fragments/Footer";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <title>전자제품 리뷰 사이트</title>
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
