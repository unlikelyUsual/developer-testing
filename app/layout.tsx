import { Box } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Provider } from "./components/Provider";
import "./globals.css";
import "./override.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Property Search",
  description: "A simple app to search the property",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider>
          <Box m="6">{children}</Box>
        </Provider>
      </body>
    </html>
  );
}
