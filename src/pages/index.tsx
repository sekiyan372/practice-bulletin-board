import {
  Box,
  Button,
  Flex,
  FormControl,
  Heading,
  Textarea,
} from '@chakra-ui/react'
import type { NextPage } from 'next'
import { useForm } from 'react-hook-form'

import { ErrorMessage } from '~/components/Text'

const Home: NextPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: 'onChange' })

  return (
    <>
      <Heading textAlign="center" m="50px" color="gray.800">
        トップページ
      </Heading>

      <form onSubmit={handleSubmit((data) => console.log(data))}>
        <Flex>
          <FormControl>
            <Box>
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
          <Button ml="4" colorScheme="teal" type="submit">
            投稿
          </Button>
        </Flex>
      </form>
    </>
  )
}

export default Home
