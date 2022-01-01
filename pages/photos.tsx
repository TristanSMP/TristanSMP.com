import { collection, getDocs, query } from 'firebase/firestore'
import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import { firestore } from '../utils'

type Post = {
  author: number
  caption: string
  imageURL: string
}

type DiscordLookupResult = {
  discordId: number
  error: boolean
  uuid: string
  discordTag: string
  discordName: string
  username: string
}

const fstore = firestore.getFirestore()

const Photos: NextPage = () => {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  async function getPosts() {
    try {
      const q = query(collection(fstore, 'photos'))
      setPosts((await (await getDocs(q)).docs.map((d) => d.data())) as Post[])

      setLoading(false)
    } catch (error) {
      alert('Error Fetching Posts!')
      console.log(error)
    }
  }

  useEffect(() => {
    getPosts()
  }, [])

  while (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blurple drop-shadow-2xl" />
      </div>
    )
  }

  return (
    <>
      <div>
        <section className="px-2 py-32 md:px-0">
          <div className="container items-center px-8 mx-auto xl:px-5">
            <div className="flex flex-wrap items-center sm:-mx-3">
              {posts.map((post: Post) => (
                <div
                  className="w-1/2 px-3 mb-6"
                  key={`${post.author}-${post.caption}`}
                >
                  <div className="h-full">
                    <div className="block relative h-full">
                      <img
                        className="h-full w-full object-cover rounded-lg"
                        src={post.imageURL}
                        alt={post.caption}
                      />
                    </div>
                  </div>
                  <p className="text-2xl text-center text-secondary">
                    {post.caption}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  )
}

export default Photos