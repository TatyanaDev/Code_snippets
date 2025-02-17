import { ReactNode } from 'react'

export default async function RootLayout(props: { children: ReactNode }) {
  const { children } = props

  return (
    <html lang="en">
      <body>
        <main>{children}</main>
      </body>
    </html>
  )
}
