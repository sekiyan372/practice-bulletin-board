//本番環境(production)だったらtrue
//それ以外(development or test)だったらfalse
export const isEnv = (): boolean => {
  return process.env.NODE_ENV === 'production'
}

export const POST_PROD = 'post_prod'
export const POST_DEV = 'post_dev'
