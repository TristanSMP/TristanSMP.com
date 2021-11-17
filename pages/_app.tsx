import 'nextra-theme-blog/style.css'
import Head from 'next/head'

import '../styles/main.css'
import { AppProps } from 'next/dist/shared/lib/router/router'

export default function Nextra({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta content="Tristan SMP" property="og:title" />
        <meta
          content="TristanSMP has been up since July 2021 with some amazing builds!
          Tristan SMP is, the world's most friendly Minecraft SMP with no griefers as their damage is rolled back and banned!
          We have Proximity Chat and a very advanced Anti-Cheat and Anti-XRAY to cancel out cheaters and make it fair for all players.
          We hope you join and have a fun time while you are at it."
          property="og:description"
        />
        <meta content="https://www.tristansmp.com/" property="og:url" />
        <meta
          content="https://www.tristansmp.com/favicon-32x32.png"
          property="og:image"
        />
        <meta content="#ff00e5" data-react-helmet="true" name="theme-color" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="msapplication-TileColor" content="#9f00a7" />
        <meta name="theme-color" content="#ffffff" />
        <link
          rel="alternate"
          type="application/rss+xml"
          title="RSS"
          href="/feed.xml"
        />
        <link
          rel="preload"
          href="/fonts/Inter-roman.latin.var.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </Head>
      <Component {...pageProps} />
    </>
  )
}
