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
import { getCustomers } from '../../utils/api'
import CustomersTable from './CustomersTable'
import NotificationMessage from '../../components/NotificationMessage'
import Pagination from './Pagination'
import CustomerForm from '../CustomerForm'
import PrivateRoute from '../../components/PrivateRoute'

const Home = () => {
  const history = useHistory()
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPage: 1,
    elementPerPage: 10,
  })
  const [currentCustomers, setCurrentCustomers] = useState([])
  const {
    isLoading, isSuccess, isError, data, error, refetch,
  } = useQuery<any>('customers', getCustomers)

  const handleAddNew = () => {
    history.push('/home/new-customer')
  }

  const changeCurrentPage = (currentPage: number) => {
    const lastProductId = currentPage * pagination.elementPerPage
    const firstProductId = lastProductId - pagination.elementPerPage
    setPagination({ ...pagination, currentPage })
    setCurrentCustomers(data.slice(firstProductId, lastProductId))
  }

  const backUpCurrentPage = () => {
    sessionStorage.setItem('current_page', pagination.currentPage.toString())
  }

  useEffect(() => {
    if (isSuccess && data) {
      const totalPage = Math.ceil(data.length / pagination.elementPerPage)
      const currentPage = sessionStorage.getItem('current_page')
      if (currentPage) {
        setPagination({ ...pagination, currentPage: +currentPage })
        changeCurrentPage(+currentPage)
        sessionStorage.clear()
      } else {
        setCurrentCustomers(data.slice(0, pagination.elementPerPage))
        setPagination({ ...pagination, totalPage })
      }
    }
  }, [data])
  console.log(pagination)
  return (
    <Container
      maxW="container.xl"
      height="60rem"
      backgroundColor="gray.200"
      p={0}
    >
      <Header />
      <Switch>
        <PrivateRoute path="/home/:id" exact={false} component={CustomerForm} />
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
                <Box minH="40rem" w="100%">
                  <CustomersTable
                    data={currentCustomers}
                    refetch={refetch}
                    backUpCurrentPage={backUpCurrentPage}
                  />
                </Box>
                <Pagination
                  totalPage={pagination.totalPage}
                  currentPage={pagination.currentPage}
                  elementPerPage={pagination.elementPerPage}
                  changeCurrentPage={changeCurrentPage}
                />
              </Stack>
            )}
          {isError && (<NotificationMessage status="error" message={String(error)} />)}
        </Stack>
      </Switch>

    </Container>
  )
}

export default Home
