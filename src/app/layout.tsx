import { Providers } from '@/components/providers'
import { ClerkProvider } from '@clerk/nextjs'
import { Inter } from 'next/font/google'

import '@/assets/styles/globals.scss'
const inter = Inter({ subsets: ['latin'] })

export const metadata = {
	title: 'Softdays Cabin',
	description: '緩緩山海 靜靜小屋',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang='en' suppressHydrationWarning>
			<body className={inter.className}>
				<ClerkProvider>
					<Providers>
						{/* <Header /> */}
						<main className='min-h-screen bg-background'>{children}</main>
					</Providers>
				</ClerkProvider>
			</body>
		</html>
	)
}
