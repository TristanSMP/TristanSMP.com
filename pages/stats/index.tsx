import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import confetti from 'canvas-confetti'
import { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { fas } from '@fortawesome/free-solid-svg-icons'

const Home: NextPage = () => {
  return (
    <>
      <Head>
        {/* Primary Meta Tags */}
        <title>tsmp stats</title>
        <meta name="title" content="TSMP Stats Viewer" />
        <meta name="description" content="online tsmp stats viewer." />
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://tristansmp.com/stats" />
        <meta property="og:title" content="TSMP Stats Viewer" />
        <meta property="og:description" content="online tsmp stats viewer." />
        <meta property="og:image" content={''} />
        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://tristansmp.com/stats" />
        <meta property="twitter:title" content="TSMP Stats Viewer" />
        <meta
          property="twitter:description"
          content="online tsmp stats viewer."
        />
        <meta property="twitter:image" content={''} />
      </Head>
      <div>
        <section className="">
          <div className="flex flex-col items-center justify-center h-screen">
            <img
              className="hover:scale-110 transition-all duration-500 ease-in-out hover:drop-shadow-2xl rounded-full"
              src="/images/TLogo.png"
              alt="TSMP Logo"
              width={250}
              height={352}
            />
            <div className="py-8 text-center text-white text-3xl px-10 m-10">
              TSMPstats is a tool for TSMP players to see their stats.
              <form
                className=" items-center justify-center"
                onSubmit={(e) => {
                  // goto /:username
                  e.preventDefault()
                  // @ts-ignore
                  window.location.href = `/stats/${e.target.elements.username.value}`
                }}
              >
                <input
                  className="bg-gray-800 text-white rounded-full px-4 py-2 m-2"
                  type="text"
                  name="username"
                  placeholder="Username"
                />
                <button
                  className="bg-gray-800 text-white rounded-full px-4 py-2 m-2"
                  type="submit"
                >
                  Look-up
                </button>
              </form>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}

export default Home
