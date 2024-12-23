import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/Header";
import FinanceContextProvider from "@/lib/store/finance-context";
import { ToastContainer } from "react-toastify";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Balanço Financeiro",
  description:
    "Bem-vindo(a) ao seu balanço financeiro! Aqui, você pode facilmente registrar suas despesas, visualizar suas metas de economia e manter o controle do seu dinheiro de um jeito simples e descomplicado. Conte com a nossa ajuda para entender melhor o seu fluxo financeiro e alcançar a tranquilidade que você merece!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <FinanceContextProvider>
          <Header />
          {children}
        </FinanceContextProvider>
        <ToastContainer  position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark" />
      </body>
    </html>
  );
}