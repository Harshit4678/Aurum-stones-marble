import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import WhatsAppButton from "../components/WhatsAppButton";
import { Toaster } from "sonner";

export const metadata = {
  title: "AURUM STONES India | Marble Decor",
  description: "Luxury handcrafted stone decor from India",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="font-sans">
        <Navbar />
        <main className="min-h-screen">
          <Toaster
            position="top-center"
            richColors
            toastOptions={{
              className:
                "bg-gradient-to-r from-[#fdfcfb] to-[#e2d1c3] text-[#333] rounded-[14px] shadow-md font-serif px-4 py-3 sm:px-6 sm:py-4 sm:text-base text-sm",
            }}
          />

          {children}
        </main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
