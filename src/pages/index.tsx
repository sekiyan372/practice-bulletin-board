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

import { useAuthContext } from '~/components/Provider'
import { ErrorMessage } from '~/components/Text'
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

  const { data, sendPost, handleDeletePost } = usePost()
  const user = useAuthContext()

  const onSubmit: SubmitHandler<FormValues> = async (values) => {
    const { name, text } = values
    sendPost(name, text)
  }

  return (
    <>
      <Box pt="10" px="6">
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl>
            <Box>
              <Input
                id="name"
                my="2"
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
              {errors.name && (
                <ErrorMessage>{errors.name.message?.toString()}</ErrorMessage>
              )}

              <Textarea
                id="text"
                my="2"
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
              {errors.text && (
                <ErrorMessage>{errors.text.message?.toString()}</ErrorMessage>
              )}
            </Box>
          </FormControl>

          <Box textAlign="center">
            <Button colorScheme="teal" type="submit">
              投稿
            </Button>
          </Box>
        </form>
      </Box>

      <Heading textAlign="center" m="50px" color="gray.800">
        投稿一覧
      </Heading>
      <Box>
        {data?.map((post) => (
          <>
            <Flex key={post.id}>
              <Text p="4">{post.name}</Text>
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
            <Box pl="4">
              <Text p="4">{post.text}</Text>
            </Box>
          </>
        ))}
      </Box>
    </>
  )
}

export default Home
