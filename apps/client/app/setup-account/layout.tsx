import { SetupStepProvider } from 'components/SetupStepProvider'

export default function Layout ({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="light">
      <body>
        <header>
          {
            // Mismo header que landing
          }
        </header>
        <SetupStepProvider>
          {children}
        </SetupStepProvider>
        <footer>
          {
            // Mismo footer que landing
          }
        </footer>
      </body>
    </html>
  )
}
