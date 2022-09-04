import { Box, Icon, MenuItem } from '@chakra-ui/react'
import NextLink from 'next/link'
import type { FC } from 'react'
import { memo } from 'react'
import type { IconType } from 'react-icons'

type Props = {
  href: string
  icon: IconType
  text: string
}

export const HeaderLink: FC<Props> = memo(({ href, icon, text }) => {
  return (
    <Box display="inline-block" px="10">
      <Icon as={icon} />
      <NextLink href={href} passHref>
        {text}
      </NextLink>
    </Box>
  )
})

export const HeaderMenuLink: FC<Props> = memo(({ href, icon, text }) => {
  return (
    <NextLink href={href} passHref>
      <MenuItem icon={<Icon as={icon} />}>{text}</MenuItem>
    </NextLink>
  )
})
