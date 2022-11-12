import { useToast } from '@chakra-ui/react'
import axios, { AxiosResponse } from 'axios'
import useSWR from 'swr'

import { createPost } from '~/feature/frontend/post'
import type { Post } from '~/types/post'

type UsePostReturn = {
  data: Post[] | undefined
  sendPost: (name: string, text: string) => void
}

export const usePost = (): UsePostReturn => {
  const fetcher = async (url: string): Promise<Post[]> => {
    const response: AxiosResponse<Post[]> = await axios.get(url)
    return response.data
  }
  const { data } = useSWR('/api/posts', fetcher)

  const toast = useToast()

  const sendPost = (name: string, text: string) => {
    try {
      createPost(name, text)

      toast({
        title: '投稿が完了しました',
        status: 'success',
        duration: 2000,
        isClosable: true,
      })
    } catch (err) {
      toast({
        title: '投稿に失敗しました',
        status: 'error',
        duration: 2000,
        isClosable: true,
      })
    }
  }

  return { data, sendPost }
}
