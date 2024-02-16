"use client"
// import type { Metadata } from "next";
// import { Inter } from "next/font/google";
import Footer from '../../../components/footer/footer';
import Navbar from '../../../components/navbar/navbar';
import { AuthContextProvider } from '../../../context/AuthContext';
import '../globals.css';


export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body style={{minHeight:'100vh',height:'fit-content',background:"#fff"}}>
        <AuthContextProvider>
        <Navbar />
        <main>{children}</main>
        <Footer />
        </AuthContextProvider>
      </body>
    </html>
  );
}
