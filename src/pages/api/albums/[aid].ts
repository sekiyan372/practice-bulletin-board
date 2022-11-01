import type { NextApiRequest, NextApiResponse } from 'next'

import { getAlbumPhotos } from '~/feature/albumPhoto'
import type { AlbumPhoto } from '~/types/albumTypes'

const getHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { aid } = req.query //urlに埋め込まれたid

  try {
    //idが配列を許容するので、配列の時はエラーを吐き出す
    if (Array.isArray(aid) || aid === undefined) throw 'id is notional value.'

    //アルバムの投稿作品を取得
    const photos: AlbumPhoto[] = await getAlbumPhotos(aid)

    //データ取得成功時のレスポンス
    res.status(200).json({ photos })
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
