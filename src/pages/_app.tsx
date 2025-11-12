import type { AppProps } from "next/app";
import { I18nProvider } from "@/lib/i18n";
import Header from "@/components/Header";
import "@/styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <I18nProvider>
      <div className="min-h-screen bg-gray-50">
        <main>
          <Component {...pageProps} />
        </main>
      </div>
    </I18nProvider>
  );
}
