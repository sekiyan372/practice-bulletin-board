import {
  Box,
  Heading,
  Skeleton,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react'
import type { AxiosResponse } from 'axios'
import axios from 'axios'
import dayjs from 'dayjs'
import ja from 'dayjs/locale/ja'
import type { NextPage } from 'next'
import NextLink from 'next/link'
import { useCallback, useMemo } from 'react'
import type { Column } from 'react-table'
import { useTable } from 'react-table'
import useSWR from 'swr'

import { AlertHealthCheckFailed } from '~/components/Alert'
import type { Album } from '~/types/albumTypes'

dayjs.locale(ja)

const ContestIndex: NextPage = () => {
  const columns = useMemo<Column<Album>[]>(
    () => [
      {
        Header: 'タイトル',
        accessor: (params: Album) => params.ja.name,
        disableSortBy: true,
      },
      {
        Header: '開始日時',
        accessor: (params: Album) =>
          dayjs(params.startAt).format('YYYY/MM/DD HH:mm:ss'),
        disableSortBy: true,
      },
      {
        Header: '終了日時',
        accessor: (params: Album) =>
          dayjs(params.endAt).format('YYYY/MM/DD HH:mm:ss'),
        disableSortBy: true,
      },
      {
        Header: '作成日',
        accessor: (params: Album) =>
          dayjs(params.createdAt).format('YYYY/MM/DD HH:mm:ss'),
        disableSortBy: true,
      },
    ],
    []
  )

  const fetcher = useCallback(async (url: string): Promise<Album[]> => {
    const res: AxiosResponse<{ albums: Album[] }> = await axios(url)
    return res.data.albums
  }, [])
  const { data, error } = useSWR('/api/albums', fetcher)

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data: data ?? [] })

  return (
    <>
      <AlertHealthCheckFailed error={error} />
      <Heading textAlign="center" m="50px" color="gray.800">
        アルバム一覧
      </Heading>

      <Box p="10">
        <Skeleton isLoaded={!!data}>
          <Table {...getTableProps()}>
            <Thead>
              {headerGroups.map((headerGroup, index) => (
                <Tr {...headerGroup.getHeaderGroupProps()} key={index}>
                  {headerGroup.headers.map((column, index) => (
                    <Th key={index}>{column.render('Header')}</Th>
                  ))}
                </Tr>
              ))}
            </Thead>
            <Tbody {...getTableBodyProps()}>
              {rows.map((row, rowIndex) => {
                prepareRow(row)
                return (
                  <NextLink
                    href={`/album/${row.original.id}`}
                    passHref
                    key={rowIndex}
                  >
                    <Tr
                      {...row.getRowProps()}
                      _hover={{ cursor: 'pointer', opacity: 0.5 }}
                    >
                      {row.cells.map((cell, cellIndex) => (
                        <Td {...cell.getCellProps()} key={cellIndex}>
                          {cell.render('Cell')}
                        </Td>
                      ))}
                    </Tr>
                  </NextLink>
                )
              })}
            </Tbody>
          </Table>
        </Skeleton>
      </Box>
    </>
  )
}

export default ContestIndex