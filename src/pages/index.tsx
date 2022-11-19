import {
  Box,
  Button,
  Flex,
  FormControl,
  Heading,
  Input,
  Text,
  Textarea,
} from '@chakra-ui/react'
import dayjs from 'dayjs'
import type { NextPage } from 'next'
import { SubmitHandler, useForm } from 'react-hook-form'

import { ErrorMessage } from '~/components/Text'
import { useLogin } from '~/hooks/useLogin'
import { usePost } from '~/hooks/usePost'

type FormValues = {
  name: string
  text: string
}

const Home: NextPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ mode: 'onChange' })

  const { user } = useLogin()
  const { data, sendPost, handleDeletePost } = usePost()

  const onSubmit: SubmitHandler<FormValues> = async (values) => {
    const { name, text } = values
    sendPost(name, text)
  }

  return (
    <>
      <Heading textAlign="center" m="50px" color="gray.800">
        トップページ
      </Heading>

      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl>
          <Box>
            <Input
              id="name"
              placeholder="ハンドルネーム"
              {...register('name', {
                required: {
                  value: true,
                  message: '何も入力されていません',
                },
                maxLength: {
                  value: 30,
                  message: 'ハンドルネームは30文字までです',
                },
              })}
            />
            {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}

            <Textarea
              id="text"
              placeholder="投稿内容を入力してください"
              {...register('text', {
                required: {
                  value: true,
                  message: '何も入力されていません',
                },
                maxLength: {
                  value: 300,
                  message: '投稿は300文字までです',
                },
              })}
            />
            {errors.text && <ErrorMessage>{errors.text.message}</ErrorMessage>}
          </Box>
        </FormControl>

        <Button colorScheme="teal" type="submit">
          投稿
        </Button>
      </form>

      <Heading textAlign="center" m="50px" color="gray.800">
        投稿一覧
      </Heading>
      <Box>
        <Flex>
          <Text p="4">ハンドルネーム</Text>
          <Text p="4">投稿内容</Text>
          <Text p="4">投稿日時</Text>
        </Flex>
        {data?.map((post) => (
          <Flex key={post.id}>
            <Text p="4">{post.name}</Text>
            <Text p="4">{post.text}</Text>
            <Text p="4">
              {dayjs(post.createdAt).format('YYYY/MM/DD HH:mm:ss')}
            </Text>
            {user && (
              <Button
                colorScheme="red"
                onClick={() => handleDeletePost(post.id)}
              >
                削除
              </Button>
            )}
          </Flex>
        ))}
      </Box>
    </>
  )
}

export default Home
