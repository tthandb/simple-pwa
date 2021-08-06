import {
  Container,
  Stack,
  Spinner, Center, Heading, Button, Box,

} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import {
  Switch, useHistory,
} from 'react-router-dom'
import Header from '../../components/Header'
import { getCustomers } from '../../utils/apis'
import CustomersTable from './CustomersTable'
import NotificationMessage from '../../components/NotificationMessage'
import Pagination from './Pagination'
import CustomerForm from '../CustomerForm'
import PrivateRoute from '../../components/PrivateRoute'
import { sendLog } from '../../utils/logger'

const Home = () => {
  const history = useHistory()
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPage: 1,
    elementPerPage: 10,
    paginationArray: [] as number [],
  })
  const [currentCustomers, setCurrentCustomers] = useState([])
  const {
    isLoading, isSuccess, isError, data, error, refetch,
  } = useQuery<any>('customers', getCustomers)

  const handleAddNew = () => {
    history.push('/home/new-customer')
  }

  const createPageArray = (
    currentPage: number, totalPage: number, elementPerPage: number,
  ) => {
    let arr: number[] = []
    const paginationLength = 9
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
    sendLog('info', `Pagination bar: ${arr.toString()}`).then()
    return arr
  }

  const changeCurrentPage = (currentPage: number) => {
    sendLog('info', `Change to page #${currentPage}`).then()
    const lastCustomerId = currentPage * pagination.elementPerPage
    const firstCustomerId = lastCustomerId - pagination.elementPerPage
    const totalPage = Math.ceil(data.length / pagination.elementPerPage)
    const paginationArray = createPageArray(currentPage,
      totalPage, pagination.elementPerPage)
    setPagination({ ...pagination, currentPage, paginationArray })
    setCurrentCustomers(data.slice(firstCustomerId, lastCustomerId))
  }

  const backUpCurrentPage = () => {
    sessionStorage.setItem('current_page', pagination.currentPage.toString())
  }

  useEffect(() => {
    sendLog('info', 'Home page mount').then()
    if (isSuccess && data) {
      const totalPage = Math.ceil(data.length / pagination.elementPerPage)
      const currentPage = sessionStorage.getItem('current_page')
      let paginationArray: number[]
      if (currentPage) {
        paginationArray = createPageArray(+currentPage, totalPage, pagination.elementPerPage)
        setPagination({ ...pagination, currentPage: +currentPage, paginationArray })
        changeCurrentPage(+currentPage)
        sessionStorage.clear()
      } else {
        paginationArray = createPageArray(pagination.currentPage,
          totalPage, pagination.elementPerPage)
        setCurrentCustomers(data.slice(0, pagination.elementPerPage))
        setPagination({ ...pagination, totalPage, paginationArray })
      }
    }
  }, [data])

  useEffect(() => {
    sendLog('info', 'Customers list displayed on current page', JSON.stringify(currentCustomers)).then()
  }, [currentCustomers])

  return (

    <Box>
      <Header />
      <Container
        maxW="container.xl"
        height="55rem"
        backgroundColor="gray.200"
        p="0"
        shadow="lg"
      >
        <Switch>
          <PrivateRoute path="/home/:id" component={CustomerForm} />
          <PrivateRoute path="/home">
            {isError && (<NotificationMessage status="error" message={String(error)} />)}
            <Stack p="1rem">
              <Stack direction="row" spacing="1rem" align="center" justify="space-between" mb="1rem">
                <Heading color="teal.400">CUSTOMERS LIST</Heading>
                <Button colorScheme="teal" variant="solid" size="md" onClick={handleAddNew}>
                  Add
                </Button>
              </Stack>
              {isLoading ? (
                <Center>
                  <Spinner
                    thickness="4px"
                    speed="0.65s"
                    emptyColor="gray.200"
                    color="blue.500"
                    size="xl"
                  />
                </Center>
              )
                : (
                  <Stack alignItems="center">
                    <Box minH="35rem" w="100%">
                      <CustomersTable
                        data={currentCustomers}
                        refetch={refetch}
                        backUpCurrentPage={backUpCurrentPage}
                      />
                    </Box>
                    <Pagination
                      totalPage={pagination.totalPage}
                      currentPage={pagination.currentPage}
                      paginationArray={pagination.paginationArray}
                      changeCurrentPage={changeCurrentPage}
                    />
                  </Stack>
                )}
            </Stack>
          </PrivateRoute>
        </Switch>
      </Container>
    </Box>
  )
}

export default Home
