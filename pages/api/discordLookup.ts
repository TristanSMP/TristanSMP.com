import axios from 'axios'
import { NextApiRequest, NextApiResponse } from 'next'

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query
  if (!id) {
    res.status(400).json({ error: 'id is required' })
    return
  }
  try {
    const response = await axios.get(
      `https://api.tristansmp.com/discord/users/id/${id}/player`
    )

    const json = await response.data
    res.json(json)
  } catch {
    return res.status(404).json({ error: 'id not found' })
  }
}
