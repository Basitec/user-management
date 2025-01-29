"use client"
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
import React, { Suspense } from 'react'
import { Provider } from "react-redux";
import store from '@/store/index'
import Head from "next/head";
const layout = ({children}) => {
  return (
    <html lang="en">
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>User Management Application</title>
       
      </Head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#00000095] w-[100%] bg-[url("/bgImage3.jpg")] bg-center bg-cover bg-no-repeat bg-blend-darken bg-fixed `}
      >
        <Provider store={store}>
        <Suspense>
        {children}
        </Suspense>
        </Provider>
      </body>
    </html>
  )
}

export default layout


// export default function RootLayout({ children }) {
//   return (
//     <html lang="en">
//       <body
//         className={`${geistSans.variable} ${geistMono.variable} antialiased`}
//       >
//         {children}
//       </body>
//     </html>
//   );
// }
