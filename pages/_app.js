import '../styles/global.css'
import '../styles/prism.css'
import { ThemeProvider } from 'next-themes'

export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider enableSystem={false} attribute="class">
      
      <Component {...pageProps} />
      
    </ThemeProvider>
  )
}