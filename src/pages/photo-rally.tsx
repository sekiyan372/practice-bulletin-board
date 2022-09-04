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
import { useCallback, useMemo } from 'react'
import type { Column } from 'react-table'
import { useTable } from 'react-table'
import useSWR from 'swr'

import { AlertHealthCheckFailed } from '~/components/Alert'
import type { PhotoRally } from '~/types/photoRallyTypes'

dayjs.locale(ja)

const PhotoRallyIndex: NextPage = () => {
  const columns = useMemo<Column<PhotoRally>[]>(
    () => [
      {
        Header: 'タイトル',
        accessor: (params: PhotoRally) => params.ja.name,
        disableSortBy: true,
      },
      {
        Header: '開催日',
        accessor: (params: PhotoRally) =>
          dayjs(params.date).format('YYYY/MM/DD(dd)'),
        disableSortBy: true,
      },
      {
        Header: '作成日',
        accessor: (params: PhotoRally) =>
          dayjs(params.createdAt).format('YYYY/MM/DD HH:mm:ss'),
        disableSortBy: true,
      },
    ],
    []
  )

  const fetcher = useCallback(async (url: string): Promise<PhotoRally[]> => {
    const res: AxiosResponse<{ photoRallies: PhotoRally[] }> = await axios(url)
    return res.data.photoRallies
  }, [])
  const { data, error } = useSWR('/api/photoRallies', fetcher)
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data: data ?? [] })

  return (
    <>
      <AlertHealthCheckFailed error={error} />
      <Heading textAlign="center" m="50px" color="gray.800">
        フォトラリー管理
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
                  <Tr {...row.getRowProps()} key={rowIndex}>
                    {row.cells.map((cell, cellIndex) => (
                      <Td {...cell.getCellProps()} key={cellIndex}>
                        {cell.render('Cell')}
                      </Td>
                    ))}
                  </Tr>
                )
              })}
            </Tbody>
          </Table>
        </Skeleton>
      </Box>
    </>
  )
}

export default PhotoRallyIndex
