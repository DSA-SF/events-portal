import "../styles/globals.css";


export default function RootLayout({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children,
  pageProps
}: {
  children: React.ReactNode,
  pageProps: any
}) {
  return (
      <html lang="en">
        <body>
          {children}
        </body>
      </html>
  )
}
