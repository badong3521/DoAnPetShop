import { ProvidersWrapper } from "./ProvidersWrapper";
import "./globals.css";
import { Footer } from "@components/Footer";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-br" data-theme="dark">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body>
        <ProvidersWrapper>{children}</ProvidersWrapper>
        <Footer />
      </body>
    </html>
  );
}
