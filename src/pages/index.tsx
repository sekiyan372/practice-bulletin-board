import {
  Box,
  Button,
  Flex,
  FormControl,
  Heading,
  Input,
  Text,
  Textarea,
  useToast,
} from '@chakra-ui/react'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import type { NextPage } from 'next'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'

import { ErrorMessage } from '~/components/Text'
import { db } from '~/db/firebase'
import { isEnv, POST_DEV, POST_PROD } from '~/utils'

const Home: NextPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: 'onChange' })
  const toast = useToast()

  const onSubmit: SubmitHandler<FieldValues> = async (values) => {
    const { name, text } = values

    try {
      const collectionRef = collection(db, isEnv() ? POST_PROD : POST_DEV)
      await addDoc(collectionRef, {
        name: name,
        text: text,
        createdAt: serverTimestamp(),
      })

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
            {errors.name && (
              <ErrorMessage>{errors.name.message?.toString()}</ErrorMessage>
            )}

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
            {errors.text && (
              <ErrorMessage>{errors.text.message?.toString()}</ErrorMessage>
            )}
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
      </Box>
    </>
  )
}

export default Home
