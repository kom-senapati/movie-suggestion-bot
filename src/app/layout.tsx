import type { Metadata } from "next";
import "./globals.css";
import { Roboto } from "next/font/google";
import { CopilotKit } from "@copilotkit/react-core";

const roboto = Roboto({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Movie Suggestion Bot",
  description: "A bot that recommends movies based on genre and mood.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>📽️</text></svg>"
        />
      </head>
      <body className={roboto.className}>
        <CopilotKit runtimeUrl="/api/copilotkit">{children}</CopilotKit>
      </body>
    </html>
  );
}
