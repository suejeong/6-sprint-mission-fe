import { Geist, Geist_Mono } from "next/font/google";
import "./styles/globals.css";


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
  description: "판다마켓에 어서오세요",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body
        className=
        {`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div>
          {children}
        </div>
      </body>
    </html>
  );
}
