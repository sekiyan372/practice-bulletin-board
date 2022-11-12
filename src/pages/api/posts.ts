import { NextApiHandler } from 'next'

import { getPosts } from '~/feature/backend/post'

const getHandler: NextApiHandler = async (_, res) => {
  try {
    const posts = await getPosts()
    res.status(200).json(posts)
  } catch (err) {
    const error =
      err instanceof Error ? err : new Error('Failed to Get Request')
    res.status(500).json(error)
  }
}

const handler: NextApiHandler = (req, res) => {
  switch (req.method) {
    case 'GET':
      getHandler(req, res)
      break
    default:
      res.status(405).json({ message: 'Method Not Allowed' })
  }
}

export default handler
