import { Inter } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Common/Footer/Footer";
import Navbar from "@/components/Common/NavBar/NavBar";
import NextTopLoader from "nextjs-toploader";
// import { AuthUserProvider } from "@/context/auth";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_BASEURL || "http://localhost:3000"
  ),
  title: "TU Search Directory",
  description:
    "TU Search Directory - where you can search for professors and students of Tribhuvan University",
  generator: "Next.js",
  applicationName: "TU Search Directory",
  referrer: "origin-when-cross-origin",
  keywords: [
    "TU Search Directory",
    "sandip",
    "sharad",
    "saphal",
    "sijan",
    "Next.js",
    "React",
  ],

  authors: [
    { name: "Sandip Katel" },
    {
      name: "Sandp Katel",
      url: "https://TU-Search-Directory-website.vercel.app",
    },
  ],
  creator: "Sandip Katel",
  publisher: "Byte Brahma",

  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
    other: {
      rel: "apple-touch-icon-precomposed",
      url: "/logo.png",
    },
  },

  openGraph: {
    title: "TU Search Directory",
    description:
      "TU Search Directory - where you can search for professors and students of Tribhuvan University",
    url: "/logo.png",
    siteName: "TU Search Directory",
    images: [
      {
        url: "/logo.png", // Must be an absolute URL
        width: 800,
        height: 600,
      },
      {
        url: "/logo.png", // Must be an absolute URL
        width: 1800,
        height: 1600,
        alt: "TU Search Directory",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="theme-color" content="#0b0191" />
        <meta name="mobile-web-app-capable" content="yes" />
      </head>
      <body className={`${inter.className} min-h-screen `}>
        {/* <AuthUserProvider> */}
          <div className=" h-screen w-full fixed top-0 left-0 -z-50 bg-gradient-to-b from-white to-blue-100"></div>
          <NextTopLoader
            color="#050447"
            initialPosition={0.08}
            crawlSpeed={200}
            height={3}
            crawl={true}
            showSpinner={true}
            easing="ease"
            speed={200}
            shadow="0 0 10px #050447,0 0 5px #050447"
          />
          <Navbar />

          {/* <FirstLoadPage children={children} /> */}
            <div className=" min-h-screen overflow-x-hidden">{children}</div>
            <Footer />
        {/* </AuthUserProvider> */}
      </body>
    </html>
  );
}
