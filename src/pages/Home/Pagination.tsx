import {
  Button, ButtonGroup,
} from '@chakra-ui/react'
import { uuid } from '../../utils/uuid'

interface IProps {
  totalPage: number,
  currentPage: number,
  paginationArray: number[],
  changeCurrentPage: (currentPage: number) => void,
}

const Pagination = (props: IProps) => {
  const {
    totalPage, currentPage, changeCurrentPage, paginationArray,
  } = props

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
      {paginationArray.map((val) => (
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
