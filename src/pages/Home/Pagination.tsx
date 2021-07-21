import {
  Box, Button, ButtonGroup, HStack, Link, Text,
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { uuid } from '../../utils/uuid'

interface IProps {
  totalPage: number,
  currentPage: number,
  elementPerPage: number,
  changeCurrentPage: (currentPage: number) => void,
}

const Pagination = (props: IProps) => {
  const {
    totalPage, currentPage, elementPerPage, changeCurrentPage,
  } = props
  const paginationLength = 9
  const createPageArray = () => {
    let arr: number[] = []

    if (currentPage < paginationLength) {
      if (totalPage < elementPerPage) arr = [...Array(totalPage + 1).keys()].slice(1)
      else arr = [...Array(paginationLength + 1).keys()].slice(1)
    } else if (totalPage - currentPage < (paginationLength - 1) / 2) {
      for (let i = (paginationLength - 1); i >= 0; --i) {
        arr.push(totalPage - i)
      }
    } else {
      for (let i = (paginationLength - 1) / 2; i > 0; --i) {
        arr.push(currentPage - i)
      }
      for (let i = 0; i < (paginationLength - 1) / 2 + 1; ++i) {
        arr.push(currentPage + i)
      }
    }
    return arr
  }

  const selectPage = (e: string) => {
    changeCurrentPage(+e)
  }

  const goToFirstPage = () => {
    if (currentPage > 1) {
      changeCurrentPage(1)
    }
  }

  const goToLastPage = () => {
    if (currentPage < totalPage) {
      changeCurrentPage(totalPage)
    }
  }

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      changeCurrentPage(currentPage - 1)
    }
  }

  const goToNextPage = () => {
    if (currentPage < totalPage) {
      changeCurrentPage(currentPage + 1)
    }
  }

  return (
    <ButtonGroup>
      <Button isDisabled={currentPage === 1} onClick={() => goToFirstPage()}>&laquo;</Button>
      <Button isDisabled={currentPage === 1} onClick={() => goToPreviousPage()}>&lt;</Button>
      {createPageArray().map((val) => (
        <Button
          key={uuid()}
          value={val}
          isActive={val === currentPage}
          onClick={(e) => selectPage(e.currentTarget.value)}
        >
          {val}
        </Button>
      ))}
      <Button isDisabled={currentPage === totalPage} onClick={() => goToNextPage()}>&gt;</Button>
      <Button isDisabled={currentPage === totalPage} onClick={() => goToLastPage()}>&raquo;</Button>
    </ButtonGroup>
  )
}
export default Pagination
