import axios from 'axios'
import { NextApiRequest, NextApiResponse } from 'next'

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { username } = req.query
  if (!username) {
    res.status(400).json({ error: 'username is required' })
    return
  }
  const response = await axios.get(
    `https://api.mojang.com/users/profiles/minecraft/${username}`
  )
  if (response.status !== 200) {
    return res.status(404).json({ error: 'username not found' })
  }
  const trimUUID: string = await response.data.id
  const uuid: string =
    trimUUID.slice(0, 8) +
    '-' +
    trimUUID.slice(8, 12) +
    '-' +
    trimUUID.slice(12, 16) +
    '-' +
    trimUUID.slice(16, 20) +
    '-' +
    trimUUID.slice(20, 32)

  res.json({ uuid: uuid })
}
