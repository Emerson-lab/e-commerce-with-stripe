import './globals.css'
import type { Metadata } from 'next'
import { Oxygen } from 'next/font/google'
import Header from 'src/components/ui/layout/header'
import { cn } from 'src/lib/utils'

const oxygen = Oxygen({ weight: ["300", "400", "700"], subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'e-commerce-Next.js13.5',
  description: 'e-commerce-with-stripe-2023',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={cn(oxygen.className, "min-h-screen flex flex-col")}>
        <Header />
        <main className='flex-grow'>
          {children}
        </main>
      </body>
    </html>
  )
}
