import { useMemo } from 'react'
import { RecoilRoot } from 'recoil'
import { QueryClient, QueryClientProvider } from 'react-query'
import type { AppProps } from 'next/app'
import { CssBaseline, ThemeProvider, createTheme, useMediaQuery } from '@mui/material'


export default function App({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient()

  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? 'dark' : 'light',
        }
      }),
    [prefersDarkMode],
  )

  return (
      <RecoilRoot>
        <ThemeProvider theme={theme}>
          <QueryClientProvider client={queryClient}>
            <CssBaseline />
            <Component {...pageProps} />
          </QueryClientProvider>
        </ThemeProvider>
      </RecoilRoot>
  )
}
