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
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
