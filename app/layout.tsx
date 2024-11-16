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
