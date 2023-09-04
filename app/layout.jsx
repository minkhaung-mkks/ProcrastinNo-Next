import '@/styles/style.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Procrsati-No',
  description: 'No more "5 more mins", no more "tomorrow", keep track of all you need to do on Procrasti-No',
  manifest: '/site.webmanifest',
  icons: {
    icon: [
      { url: '/assets/favicons/favicon.ico' },
      { url: '/assets/favicons/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/assets/favicons/favicon-16x16.png', sizes: '16x16', type: 'image/png' }
    ],
    apple: '/assets/favicons/apple-icon.png',
    other: {
      rel: 'apple-touch-icon',
      url: '/assets/favicons/apple-touch-icon.png',
    },
  }

}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
