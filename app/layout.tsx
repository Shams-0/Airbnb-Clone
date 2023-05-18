import './globals.css'
import { Nunito } from 'next/font/google'
import Header from './components/Header/Header'
import { Toaster } from 'react-hot-toast';
import getCurrentUser from './actions/getCurrentUser';

const font = Nunito({ subsets: ['latin'] });

export const metadata = {
  title: 'Airbnb Clone',
  description: 'Airbnb Clone',
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const currentUser = await getCurrentUser()
  return (
    <html lang="en">
      <body className={font.className} suppressHydrationWarning={true}>
        <Toaster />
        <Header currentUser={currentUser} />
        {children}
      </body>
    </html>
  )
}
