import type {Metadata} from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Code AI - Generate Your Code',
  description: 'Generate, test, and preview code for your projects with the power of AI.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark h-full">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;900&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased h-full">
          {children}
      </body>
    </html>
  );
}
