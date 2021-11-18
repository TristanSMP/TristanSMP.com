import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext
} from 'next/document'

import Script from 'next/script'

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    const meta = {}

    return (
      <Html lang="en">
        <Head>
          
          <script
   async
    src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8863904909693060"
 />
 <script
          dangerouslySetInnerHTML={{
            __html: `
               (adsbygoogle = window.adsbygoogle || []).push({
                   google_ad_client: "8863904909693060",
                   enable_page_level_ads: true
              });
                `
          }}
 />
          <meta name="robots" content="follow, index" />
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
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:site" content="@twisttaan" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
