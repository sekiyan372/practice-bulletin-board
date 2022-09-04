import type { NextApiRequest, NextApiResponse } from 'next'

import { getPhotoRallies } from '~/feature/photoRally'
import type { PhotoRally } from '~/types/photoRallyTypes'

const getHandler = async (_: NextApiRequest, res: NextApiResponse) => {
  try {
    //アルバムの投稿作品を取得
    const photoRallies: PhotoRally[] = await getPhotoRallies()

    //データ取得成功時のレスポンス
    res.status(200).json({ photoRallies })
  } catch (e) {
    //データ取得失敗のレスポンス
    res.status(500).send({ httpStatus: 500, message: 'failed to fetch data' })
  }
}

//HTTPメソッドに合わせて分岐し、期待値外のメソッドが送られてきた場合は405エラーを返却する
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case 'GET':
      await getHandler(req, res)
      break
    default:
      res
        .status(405)
        .json({ error: { httpStatus: 405, message: 'Method Not Allowed' } })
  }
}

export default handler
