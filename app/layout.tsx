import type { Metadata } from 'next'
import localFont from 'next/font/local'
import '../ui/styles/global.scss'
import React from "react";
import { UserContextProvider } from './lib/UserContextProvider';

const Satoshi = localFont({ src: '../public/fonts/satoshi/Satoshi-Medium.otf' })

export const metadata: Metadata = {
  title: 'Travit Admin',
  description: 'Travit by Maasivo',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='es'>
      <body className={Satoshi.className}>
        <UserContextProvider>
          {children}
        </UserContextProvider>
      </body>
    </html>
  )
}
