import StreamClientProvider from '@/Providers/StreamClientProvider'
import { Metadata } from 'next';
import React, { ReactNode } from 'react'

export const metadata: Metadata = {
    title: "Discuzz",
    description: "Video conferecing app",
    icons: { icon: '/icons/kayf-logo.png' }
};

const RootLayout = ({ children }: { children: ReactNode }) => {
    return (
        <main>
            <StreamClientProvider>
                {children}
            </StreamClientProvider>
        </main>
    )
}

export default RootLayout
