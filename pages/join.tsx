import type { NextPage } from 'next'
import Link from 'next/link'

const Join: NextPage = () => {
  return (
    <>
      <div>
        <section className="px-2 py-32 md:px-0">
          <div className="container items-center px-8 mx-auto xl:px-5">
            <div className="flex flex-wrap items-center sm:-mx-3">
              <h1 className="font-bold text-5xl">TSMP Join Instructions</h1>
              <p className="text-xl w-screen">
                Everything for TSMP (TristanSMP) is powered by Discord. You{' '}
                <strong>must</strong> have a Discord account and have joined the{' '}
                <Link href="https://discord.gg/VKaNS86wEN">
                  <a className="hover:text-blue-500 underline">
                    Discord server
                  </a>
                </Link>{' '}
                to join.
              </p>
              <br />
              <p className="text-xl w-screen">
                Once you have joined the Discord server, you will be{' '}
                <span className="font-bold">pinged</span> with the instructions
                on how to apply for TSMP. Make sure you submit the application
                once your in the server as you will automatically be given a
                channel for the staff team to review and ask further questions
                to you once the application is submitted.
              </p>
              <br />
              <p className="text-xl w-screen">
                Keep in mind if you are accepted{' '}
                <span className="font-italic">(which most people are)</span>{' '}
                that you will be given a role in the TSMP Discord server that
                syncs with the TSMP Minecraft server. Meaning if you left the
                TSMP Discord server, you will be removed from the TSMP Minecraft
                server. This is also how we are able to quickly punish people
                that are reported in our{' '}
                <Link href="/info/punish">
                  <a className="hover:text-blue-500 underline">
                    punishment system
                  </a>
                </Link>
                .
              </p>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}

export default Join
