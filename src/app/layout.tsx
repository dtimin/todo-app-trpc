import type { Metadata } from "next";
import "./globals.css";
import QueryProvider from "@/providers/QueryProvider";

export const metadata: Metadata = {
  title: "Todo App - Next.js 14",
  description: "A modern todo application built with Next.js 14, React, TypeScript, and more",
  keywords: ["todo", "task management", "next.js", "react", "typescript"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <QueryProvider>
          <div className="app-container">
            {children}
          </div>
        </QueryProvider>
      </body>
    </html>
  );
}
