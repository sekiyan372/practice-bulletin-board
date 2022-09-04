import type { NextApiRequest, NextApiResponse } from 'next'

import { getContests } from '~/feature/contest'
import type { Contest } from '~/types/contestTypes'

const getHandler = async (_: NextApiRequest, res: NextApiResponse) => {
  try {
    //アルバムの投稿作品を取得
    const contests: Contest[] = await getContests()

    //データ取得成功時のレスポンス
    res.status(200).json({ contests })
  } catch (e) {
    //データ取得失敗のレスポンス
    res.status(500).send({ httpStatus: 500, message: 'failed to fetch data' })
  }
}

//HTTPメソッドに合わせて分岐し、期待値外のメソッドが送られてきた場合は405エラーを返却する
const handler = (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case 'GET':
      getHandler(req, res)
      break
    default:
      res
        .status(405)
        .json({ error: { httpStatus: 405, message: 'Method Not Allowed' } })
  }
}

export default handler
