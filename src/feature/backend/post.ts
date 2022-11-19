import { db } from '~/db/firebaseAdmin'
import { postConverter } from '~/feature/backend/postConverter'
import type { Post } from '~/types/post'
import { isEnv, POST_DEV, POST_PROD } from '~/utils'

export const getPosts = async (): Promise<Post[]> => {
  const getData = await db
    .collection(isEnv() ? POST_PROD : POST_DEV)
    .withConverter(postConverter())
    .orderBy('createdAt', 'desc')
    .get()
  const posts = getData.docs.map((doc) => doc.data())
  return posts
}
