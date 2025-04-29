import { ReactNode } from 'react'
import '@/styles/global.css'
import { FavoritesProvider } from '@/context/FavoritesContext'
import { Toaster } from 'react-hot-toast'



export const metadata = {
  title: 'Fetch Dog Matcher',
  description: 'Find your pawfect dog with filters, favorites, and more.',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50 text-gray-800">
      <Toaster position="top-center" reverseOrder={false} />
        <FavoritesProvider>
          {children}
        </FavoritesProvider>
      </body>
    </html>
  )
}
