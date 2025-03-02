import "./globals.css";
import { CryptoProvider } from "./context/CryptoContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        <CryptoProvider>
          <Navbar />
          <main className="flex-grow">{children}</main>
          <Footer />
        </CryptoProvider>
      </body>
    </html>
  );
}
