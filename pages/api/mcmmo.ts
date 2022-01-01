import axios from 'axios'
import { NextApiRequest, NextApiResponse } from 'next'

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { uuid } = req.query
  if (!uuid) {
    res.status(400).json({ error: 'uuid is required' })
    return
  }
  try {
    const response = await axios.get(
      `https://api.tristansmp.com/players/uuid/${uuid}/mcmmo`
    )

    const json = await response.data
    res.json(json)
  } catch {
    return res.status(404).json({ error: 'uuid not found' })
  }
}
