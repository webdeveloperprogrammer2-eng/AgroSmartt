import "./globals.css";
import Providers from "./providers";

// Маълумоти саҳифа (пештар дар index.html буд) — Next.js онро худаш
// ба <head> мегузорад.
export const metadata = {
  title: "AgroSmart.tj",
  description:
    "AgroSmart.tj — платформаи кишоварзӣ: бозори маҳсулот, иҷораи замин, дорувори ва дархостҳои харидорон.",
  icons: { icon: "/favicon.svg" },
};

export const viewport = {
  themeColor: "#0E9F4A",
};

// Қолаби асосии тамоми сайт — дар ҳар саҳифа истифода мешавад
export default function RootLayout({ children }) {
  return (
    <html lang="tg">
      <head>
        {/* FontAwesome ва шрифт — асосан барои саҳифаи "Маълумоти бештар" */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap"
        />
      </head>
      <body>
        <Providers>{children}</Providers>
        <noscript>Барои кор кардани AgroSmart.tj JavaScript-ро фаъол кунед.</noscript>
      </body>
    </html>
  );
}
