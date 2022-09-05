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
import type { Spot } from '~/types/photoRallyTypes'
import { TEXT_END, TEXT_START } from '~/utils'

dayjs.locale(ja)

const PhotoRallyIndex: NextPage = () => {
  const columns = useMemo<Column<Spot>[]>(
    () => [
      {
        Header: '名前',
        accessor: (params: Spot) => params.ja.name,
        disableSortBy: true,
      },
      {
        Header: '説明',
        accessor: (params: Spot) =>
          `${params.ja.description.substring(TEXT_START, TEXT_END)}...`,
        disableSortBy: true,
      },
      {
        Header: '作成日',
        accessor: (params: Spot) =>
          dayjs(params.createdAt).format('YYYY/MM/DD HH:mm:ss'),
        disableSortBy: true,
      },
    ],
    []
  )

  const fetcher = useCallback(async (url: string): Promise<Spot[]> => {
    const res: AxiosResponse<{ photoRallies: Spot[] }> = await axios(url)
    return res.data.photoRallies
  }, [])
  const { data, error } = useSWR<Spot[], Error>('/api/spots', fetcher)
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data: data ?? [] })

  return (
    <>
      <AlertHealthCheckFailed error={error} />
      <Heading textAlign="center" m="50px" color="gray.800">
        スポット一覧
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
