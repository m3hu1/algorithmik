import { ThemeProvider } from "@/components/contexts/theme-provider";
import { Navbar } from "@/components/navbar";
import { JetBrains_Mono } from "next/font/google";
import { Inter } from "next/font/google";
import { Footer } from "@/components/footer";
import "@/styles/globals.css";

const fontSans = Inter({
  display: "swap",
  variable: "--font-regular",
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

const fontCode = JetBrains_Mono({
  variable: "--font-code",
  subsets: ["latin"],
})

export const metadata = {
  title: "Algorithmik",
  description: "Learn Data Structures and Algorithms",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "Algorithmik",
    description: "Learn Data Structures and Algorithms",
    url: "https://algorithmik.in", // Replace with your actual URL
    siteName: "Algorithmik",
    images: [
      {
        url: "/android-chrome-512x512.png", // Ensure this path is correct
        width: 800,
        height: 600,
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${fontSans.variable} ${fontCode.variable} font-regular antialiased`}
        suppressHydrationWarning
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          <main className="sm:container mx-auto w-[90vw] h-auto scroll-smooth">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
