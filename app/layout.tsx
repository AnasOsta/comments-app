import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Providers from "./components/Providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateMetadata() {
  return {
    keywords:
      "comments system, interactive comments, Next.js, Prisma, NextAuth, bcrypt, React, Supabase, full-stack, web development",
    title:
      "CommentsSite - Interactive Comments System Built with Next.js and Prisma",
    description:
      "CommentsSite is a full-stack interactive comments application featuring user authentication with NextAuth, data management with Prisma and Supabase, and frontend built with Next.js and Tailwind CSS. Learn how to create, reply, and manage comments with secure login and real-time updates.",
    icons: {
      shortcut: "/favicon.png",
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          <Navbar />
          {children}
        </Providers>
      </body>
    </html>
  );
}
