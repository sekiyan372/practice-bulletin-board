import { NextApiHandler } from 'next'

import { db } from '~/db/firebaseAdmin'
import { isEnv, POST_DEV, POST_PROD } from '~/utils'

const getHandler: NextApiHandler = async (_, res) => {
  const getData = await db.collection(isEnv() ? POST_PROD : POST_DEV).get()
  const posts = getData.docs.map((doc) => doc.data())
  res.status(200).json(posts)
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
