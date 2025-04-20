import { Geist, Geist_Mono } from "next/font/google";
import "./styles/globals.css";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Panda Market",
  description: "판다마켓 디스크립션",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body
        className=
        {`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="sm:mt-17.5 flex flex-col ">
          <Header />
          <main>{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
